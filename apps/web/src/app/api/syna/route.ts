import { createHmac } from "crypto";
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_SYNA, SYSTEM_MODO_EMPRESA } from "@/lib/syna/conocimiento";
import { SYSTEM_DEMO_EMPRESA, bloqueEmpresa, type EmpresaDemo } from "@/lib/syna/demo-empresa";

/* Syna en el sitio (09-10-2026): responde dudas de quien visita synaptechspa.cl
   con Claude Haiku 5.5 y streaming. Prompt de sistema en lib/syna/conocimiento.ts.
   Costo (Haiku 5.5: US$0,10 / 0,50 por millón de tokens de entrada / salida;
   el prompt de sistema va cacheado y se lee a 0,1x):
   - mensajes de hasta 600 caracteres, conversaciones de hasta 12 turnos y
     respuestas de hasta 700 tokens;
   - 20 mensajes cada 10 minutos por IP (en memoria de la instancia: frena el
     abuso casual, no un ataque distribuido);
   - solo responde a pedidos desde el propio sitio;
   - SYNA_WEB_APAGADA=1 en Vercel la apaga sin deploy de código.
   Sin ANTHROPIC_API_KEY responde 503 y el chat ofrece WhatsApp.
   Demo de /empresas (28-10-2026): con `demo` en el cuerpo responde como el
   agente de la empresa que describió el visitante (lib/syna/demo-empresa.ts),
   con el mismo freno por IP y respuestas más cortas.
   Modo empresa (28-10-2026): `modo: "empresa"` (el chat en /empresas) suma
   SYSTEM_MODO_EMPRESA: Syna le cuenta a cualquier empresa cómo la ayudaría.
   Conversaciones guardadas (28-10-2026): al terminar cada respuesta, la
   conversación va a la función synaWebGuardar de la plataforma, firmada con
   SYNA_WEB_SECRET (functions/syna-web.js en Barberia-Elegance). Sin el
   secreto no se guarda nada y el chat funciona igual. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODELO = "claude-haiku-5-5";
const MAX_CARACTERES = 600;
const MAX_TURNOS = 12;
const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 20;

const visitas = new Map<string, number[]>();
function permitido(ip: string) {
  const ahora = Date.now();
  const recientes = (visitas.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (recientes.length >= MAX_POR_VENTANA) { visitas.set(ip, recientes); return false; }
  recientes.push(ahora);
  visitas.set(ip, recientes);
  if (visitas.size > 5000) visitas.clear(); // tope de memoria de la instancia
  return true;
}

function origenValido(req: Request) {
  const origen = req.headers.get("origin") ?? "";
  if (!origen) return false;
  try {
    const host = new URL(origen).hostname;
    return host === "synaptechspa.cl" || host.endsWith(".synaptechspa.cl") || host === "localhost" || host.endsWith(".vercel.app");
  } catch { return false; }
}

type Turno = { role: "user" | "assistant"; content: string };
function validar(cuerpo: unknown): Turno[] | null {
  const lista = (cuerpo as { mensajes?: unknown })?.mensajes;
  if (!Array.isArray(lista) || lista.length === 0 || lista.length > MAX_TURNOS * 2) return null;
  const turnos: Turno[] = [];
  for (const m of lista) {
    const role = (m as Turno)?.role, content = (m as Turno)?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const texto = content.trim().slice(0, role === "user" ? MAX_CARACTERES : 4000);
    if (!texto) return null;
    turnos.push({ role, content: texto });
  }
  if (turnos[0].role !== "user" || turnos[turnos.length - 1].role !== "user") return null;
  return turnos;
}

/* La empresa de la demo: texto corto, lo escribe el visitante. */
function empresaDemo(cuerpo: unknown): EmpresaDemo | null {
  const d = (cuerpo as { demo?: Record<string, unknown> })?.demo;
  if (!d || typeof d !== "object") return null;
  const t = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const e = { nombre: t(d.nombre, 60), rubro: t(d.rubro, 40), descripcion: t(d.descripcion, 300) };
  return e.nombre || e.descripcion ? e : null;
}

/* Guardar la conversación en la plataforma. Nunca rompe el chat: si falla o
   tarda más de 3 s, se pierde ese guardado y el próximo trae todo de nuevo. */
const URL_GUARDAR = process.env.SYNA_WEB_GUARDAR_URL ?? "https://us-central1-barberia-elegance.cloudfunctions.net/synaWebGuardar";
async function guardar(datos: Record<string, unknown>) {
  const secreto = process.env.SYNA_WEB_SECRET;
  if (!secreto) return;
  const cuerpo = JSON.stringify(datos);
  try {
    const r = await fetch(URL_GUARDAR, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-syna-firma": createHmac("sha256", secreto).update(cuerpo).digest("hex") },
      body: cuerpo,
      signal: AbortSignal.timeout(3000),
    });
    if (!r.ok) console.warn(`[syna-web] guardar ${r.status}`);
  } catch (e) { console.warn("[syna-web] guardar falló", (e as Error).message); }
}

const texto = (s: string, status = 200) => new Response(s, { status, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });

/* El chat pregunta esto al cargar: sin llave o apagado, la burbuja no se muestra. */
export async function GET() {
  const activa = process.env.SYNA_WEB_APAGADA !== "1" && !!process.env.ANTHROPIC_API_KEY;
  return new Response(JSON.stringify({ activa }), { headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60, s-maxage=60" } });
}

export async function POST(req: Request) {
  if (process.env.SYNA_WEB_APAGADA === "1" || !process.env.ANTHROPIC_API_KEY) return texto("no-disponible", 503);
  if (!origenValido(req)) return texto("origen", 403);
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "sin-ip";
  if (!permitido(ip)) return texto("limite", 429);

  let turnos: Turno[] | null = null;
  let demo: EmpresaDemo | null = null;
  let extra: { sesion?: unknown; pagina?: unknown; modo?: unknown } = {};
  try { const cuerpo = await req.json(); turnos = validar(cuerpo); demo = empresaDemo(cuerpo); extra = cuerpo ?? {}; } catch { /* cuerpo inválido */ }
  if (!turnos) return texto("pedido", 400);
  const modo = demo ? "demo" : extra.modo === "empresa" ? "empresa" : "sitio";
  const sesion = typeof extra.sesion === "string" && /^[A-Za-z0-9-]{16,64}$/.test(extra.sesion) ? extra.sesion : null;
  const pagina = typeof extra.pagina === "string" && extra.pagina.startsWith("/") ? extra.pagina.slice(0, 200) : "/";
  const pais = req.headers.get("x-vercel-ip-country") ?? "";

  const client = new Anthropic();
  const stream = client.messages.stream({
    model: MODELO,
    max_tokens: demo ? 350 : 700,
    output_config: { effort: "low" },
    system: demo
      ? [{ type: "text", text: SYSTEM_DEMO_EMPRESA, cache_control: { type: "ephemeral" } }, { type: "text", text: bloqueEmpresa(demo) }]
      : modo === "empresa"
        ? [{ type: "text", text: SYSTEM_SYNA }, { type: "text", text: SYSTEM_MODO_EMPRESA, cache_control: { type: "ephemeral" } }]
        : [{ type: "text", text: SYSTEM_SYNA, cache_control: { type: "ephemeral" } }],
    messages: turnos,
  });

  const codificador = new TextEncoder();
  const cuerpo = new ReadableStream<Uint8Array>({
    async start(controller) {
      let algo = false;
      let respuesta = "";
      try {
        for await (const ev of stream) {
          if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") {
            algo = true;
            respuesta += ev.delta.text;
            controller.enqueue(codificador.encode(ev.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" && !algo) {
          controller.enqueue(codificador.encode("Eso no lo puedo responder por acá. Si quieres, conversa con el equipo por [WhatsApp](https://wa.me/56983568212)."));
        }
        const u = final.usage;
        console.log(`[syna-web]${demo ? "[demo]" : ""} in=${u.input_tokens} cache_read=${u.cache_read_input_tokens ?? 0} cache_write=${u.cache_creation_input_tokens ?? 0} out=${u.output_tokens} stop=${final.stop_reason} turnos=${turnos!.length}`);
      } catch (e) {
        if (e instanceof Anthropic.RateLimitError) console.error("[syna-web] 429 de Anthropic");
        else if (e instanceof Anthropic.APIError) console.error(`[syna-web] error ${e.status}: ${e.message}`);
        else console.error("[syna-web] error", e);
        if (!algo) controller.enqueue(codificador.encode("Se me cortó la conexión. ¿Me lo vuelves a preguntar? También puedes escribirle al equipo por [WhatsApp](https://wa.me/56983568212)."));
      } finally {
        if (sesion && respuesta.trim()) {
          await guardar({ sesion, modo, pagina, pais, empresa: demo, turnos: [...turnos!, { role: "assistant", content: respuesta }] });
        }
        controller.close();
      }
    },
    cancel() { stream.abort(); },
  });

  return new Response(cuerpo, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" } });
}

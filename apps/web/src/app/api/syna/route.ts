import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_SYNA } from "@/lib/syna/conocimiento";

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
   Sin ANTHROPIC_API_KEY responde 503 y el chat ofrece WhatsApp. */

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
  try { turnos = validar(await req.json()); } catch { /* cuerpo inválido */ }
  if (!turnos) return texto("pedido", 400);

  const client = new Anthropic();
  const stream = client.messages.stream({
    model: MODELO,
    max_tokens: 700,
    output_config: { effort: "low" },
    system: [{ type: "text", text: SYSTEM_SYNA, cache_control: { type: "ephemeral" } }],
    messages: turnos,
  });

  const codificador = new TextEncoder();
  const cuerpo = new ReadableStream<Uint8Array>({
    async start(controller) {
      let algo = false;
      try {
        for await (const ev of stream) {
          if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") {
            algo = true;
            controller.enqueue(codificador.encode(ev.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" && !algo) {
          controller.enqueue(codificador.encode("Eso no lo puedo responder por acá. Si quieres, conversa con el equipo por [WhatsApp](https://wa.me/56983568212)."));
        }
        const u = final.usage;
        console.log(`[syna-web] in=${u.input_tokens} cache_read=${u.cache_read_input_tokens ?? 0} cache_write=${u.cache_creation_input_tokens ?? 0} out=${u.output_tokens} stop=${final.stop_reason} turnos=${turnos!.length}`);
      } catch (e) {
        if (e instanceof Anthropic.RateLimitError) console.error("[syna-web] 429 de Anthropic");
        else if (e instanceof Anthropic.APIError) console.error(`[syna-web] error ${e.status}: ${e.message}`);
        else console.error("[syna-web] error", e);
        if (!algo) controller.enqueue(codificador.encode("Se me cortó la conexión. ¿Me lo vuelves a preguntar? También puedes escribirle al equipo por [WhatsApp](https://wa.me/56983568212)."));
      } finally {
        controller.close();
      }
    },
    cancel() { stream.abort(); },
  });

  return new Response(cuerpo, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" } });
}

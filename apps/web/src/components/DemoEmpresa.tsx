"use client";
import { useEffect, useRef, useState } from "react";
import { waLink } from "@/content/catalogo";

/* Demo de /empresas (28-10-2026): el visitante describe su empresa (o elige
   un ejemplo) y le escribe al agente como si fuera su cliente. Habla con
   /api/syna en modo demo (lib/syna/demo-empresa.ts). Los ejemplos salen de
   los rubros que pidieron agentes en la reunión de CORFO del 27-10:
   alimentos, logística, páginas web y atención al cliente. */

type Turno = { role: "user" | "assistant"; content: string };
type Ejemplo = { rubro: string; nombre: string; descripcion: string; sugeridas: string[] };

const EJEMPLOS: Ejemplo[] = [
  {
    rubro: "Alimentos", nombre: "Delicias del Valle",
    descripcion: "Producimos y distribuimos pastelería y panadería congelada para cafeterías y restaurantes de la Región de Valparaíso. Pedido mínimo y despacho dos veces por semana.",
    sugeridas: ["Quiero hacer un pedido para mi cafetería", "¿Cuál es el pedido mínimo?", "¿Despachan a Quilpué?"],
  },
  {
    rubro: "Logística", nombre: "RutaSur Logística",
    descripcion: "Despachos de última milla y fletes para pymes, en Santiago y regiones. Retiramos en la bodega del cliente; la tarifa depende de la comuna y del tamaño.",
    sugeridas: ["Necesito cotizar un flete de Viña a Santiago", "Quiero agendar un retiro", "¿Dónde viene mi envío?"],
  },
  {
    rubro: "Páginas web", nombre: "Pixel Norte",
    descripcion: "Diseñamos páginas web y tiendas online para pymes: sitio informativo, tienda online y mantención mensual. La primera reunión es sin costo.",
    sugeridas: ["¿Cuánto cuesta una tienda online?", "Quiero agendar una reunión", "¿En cuánto tiempo la tienen lista?"],
  },
  {
    rubro: "Atención al cliente", nombre: "Ópticas Mirador",
    descripcion: "Cadena de ópticas con 6 sucursales. Atendemos dudas de horarios, garantías, exámenes de la vista y el estado de los lentes encargados.",
    sugeridas: ["Quiero agendar un examen de la vista", "¿Qué garantía tienen los lentes?", "Mis lentes no han llegado"],
  },
  {
    rubro: "Inmobiliaria", nombre: "Altos del Puerto",
    descripcion: "Vendemos departamentos en verde y en blanco en Viña del Mar y Concón, de 1 a 3 dormitorios. Agendamos visitas al piloto con un ejecutivo.",
    sugeridas: ["¿Tienen departamentos de 2 dormitorios?", "Quiero visitar el piloto", "¿Aceptan subsidio?"],
  },
];
const SUGERIDAS_PROPIAS = ["Hola, quiero cotizar", "¿Tienen hora esta semana?", "Quiero hablar con una persona"];
const MAX_MENSAJES = 8;

const CAMPO = "w-full min-w-0 bg-white border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-ink transition-colors";

/* El modelo escribe "[link de pago]" en vez de un link: acá se ve como el botón. */
function Burbuja({ s }: { s: string }) {
  const partes = s.replace(/\*\*([^*]+)\*\*/g, "$1").split("[link de pago]");
  return (
    <>
      {partes.map((p, i) => (
        <span key={i}>
          {p}
          {i < partes.length - 1 && (
            <span className="inline-flex items-center gap-1.5 my-1 px-3 py-1.5 rounded-lg bg-[#009EE3] text-white text-[13px] font-semibold">Pagar con Mercado Pago</span>
          )}
        </span>
      ))}
    </>
  );
}

export default function DemoEmpresa() {
  const [activa, setActiva] = useState<boolean | null>(null);
  const [empresa, setEmpresa] = useState({ nombre: "", rubro: "", descripcion: "" });
  const [sugeridas, setSugeridas] = useState<string[]>(SUGERIDAS_PROPIAS);
  const [enChat, setEnChat] = useState(false);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [entrada, setEntrada] = useState("");
  const [esperando, setEsperando] = useState(false);
  const caja = useRef<HTMLDivElement>(null);
  const telefono = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/syna").then((r) => r.json()).then((j) => setActiva(!!j.activa)).catch(() => setActiva(false));
  }, []);
  useEffect(() => {
    caja.current?.scrollTo({ top: caja.current.scrollHeight });
  }, [turnos]);

  const usarEjemplo = (e: Ejemplo) => {
    setEmpresa({ nombre: e.nombre, rubro: e.rubro, descripcion: e.descripcion });
    setSugeridas(e.sugeridas);
  };
  const empezar = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!empresa.nombre.trim() || !empresa.descripcion.trim()) return;
    if (!EJEMPLOS.some((e) => e.nombre === empresa.nombre)) setSugeridas(SUGERIDAS_PROPIAS);
    setTurnos([]);
    setEnChat(true);
    /* En el celular el teléfono queda abajo del formulario: se centra para que
       los botones flotantes (Syna y WhatsApp) no tapen el de enviar. */
    if (window.innerWidth < 1024) setTimeout(() => telefono.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  };
  const quieroEste = () => {
    window.dispatchEvent(new CustomEvent("empresa-demo", { detail: { empresa: empresa.nombre } }));
    document.getElementById("cuentanos")?.scrollIntoView({ behavior: "smooth" });
  };

  const enviados = turnos.filter((t) => t.role === "user").length;
  const agotada = enviados >= MAX_MENSAJES;

  async function enviar(mensaje: string) {
    const q = mensaje.trim().slice(0, 600);
    if (!q || esperando || agotada) return;
    const historial: Turno[] = [...turnos, { role: "user", content: q }];
    setTurnos([...historial, { role: "assistant", content: "" }]);
    setEntrada("");
    setEsperando(true);
    const escribir = (t: string) => setTurnos((prev) => { const c = [...prev]; c[c.length - 1] = { role: "assistant", content: t }; return c; });
    try {
      const res = await fetch("/api/syna", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mensajes: historial, demo: empresa }) });
      if (!res.ok || !res.body) {
        escribir(res.status === 429 ? "Fueron varios mensajes seguidos: dame unos minutos y seguimos." : "Ahora no puedo responder. Prueba de nuevo en un rato.");
        return;
      }
      const lector = res.body.getReader();
      const dec = new TextDecoder();
      let acumulado = "";
      for (;;) {
        const { value, done } = await lector.read();
        if (done) break;
        acumulado += dec.decode(value, { stream: true });
        escribir(acumulado);
      }
      if (!acumulado.trim()) escribir("No me llegó la respuesta. ¿Me lo escribes de nuevo?");
    } catch {
      escribir("Se cortó la conexión. ¿Me lo escribes de nuevo?");
    } finally {
      setEsperando(false);
    }
  }

  return (
    <section id="demo" className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)] gap-10 lg:gap-16 items-center">
        <div className="min-w-0">
          <p className="eyebrow mb-4">Pruébalo ahora</p>
          <h2 className="text-ink">Conversa con el agente de tu empresa.</h2>
          <p className="text-text-secondary text-lg mt-4 leading-relaxed">
            Cuéntale a qué se dedica tu empresa y escríbele como si fueras tu cliente. Usa datos de
            ejemplo: con tu cuenta, responde con tu catálogo, tus precios y tu agenda.
          </p>

          {!enChat ? (
            <form onSubmit={empezar} className="mt-8 flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-ink mb-2">Elige un ejemplo o escribe el tuyo</p>
                <div className="flex flex-wrap gap-2">
                  {EJEMPLOS.map((e) => (
                    <button key={e.rubro} type="button" onClick={() => usarEjemplo(e)} aria-pressed={empresa.nombre === e.nombre}
                      className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${empresa.nombre === e.nombre ? "bg-ink text-white border-ink" : "border-ink/15 text-ink hover:border-ink/40"}`}>
                      {e.rubro}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input value={empresa.nombre} onChange={(e) => setEmpresa((x) => ({ ...x, nombre: e.target.value.slice(0, 60) }))} placeholder="Nombre de tu empresa" aria-label="Nombre de tu empresa" required className={CAMPO} />
                <input value={empresa.rubro} onChange={(e) => setEmpresa((x) => ({ ...x, rubro: e.target.value.slice(0, 40) }))} placeholder="Rubro" aria-label="Rubro" className={CAMPO} />
              </div>
              <textarea value={empresa.descripcion} onChange={(e) => setEmpresa((x) => ({ ...x, descripcion: e.target.value.slice(0, 300) }))} rows={3} required
                placeholder="¿A qué se dedica? Qué vendes u ofreces, a quién y dónde." aria-label="A qué se dedica tu empresa" className={`${CAMPO} resize-none`} />
              <button type="submit" disabled={!empresa.nombre.trim() || !empresa.descripcion.trim() || activa === false}
                className="self-start bg-ink text-white font-semibold px-7 py-3.5 rounded-full hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Probar el agente
              </button>
              {activa === false && (
                <p className="text-sm text-text-muted">
                  La demo no está disponible en este momento. <a href={waLink("Hola, quiero ver una demo del agente de IA para mi empresa")} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4">Pídela por WhatsApp</a>.
                </p>
              )}
            </form>
          ) : (
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button type="button" onClick={quieroEste}
                className="inline-flex justify-center items-center bg-ink text-white font-semibold px-7 py-3.5 rounded-full hover:bg-black transition-colors">
                Quiero este agente para mi empresa
              </button>
              <button type="button" onClick={() => { setEnChat(false); setTurnos([]); }}
                className="inline-flex justify-center items-center border border-ink/15 text-ink font-semibold px-7 py-3.5 rounded-full hover:border-ink/40 transition-colors">
                Probar con otra empresa
              </button>
            </div>
          )}
        </div>

        {/* El teléfono: un chat al estilo WhatsApp con el nombre de la empresa. */}
        <div ref={telefono} className="min-w-0 mx-auto w-full max-w-[420px]">
          <div className="rounded-[36px] border-[7px] border-ink bg-[#ECE5DD] overflow-hidden shadow-[0_30px_70px_-20px_rgba(15,26,43,.45)] flex flex-col h-[560px]">
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold shrink-0">{(empresa.nombre.trim()[0] ?? "E").toUpperCase()}</span>
              <div className="min-w-0">
                <p className="font-semibold leading-tight truncate">{empresa.nombre.trim() || "Tu empresa"}</p>
                <p className="text-[12px] text-white/70 leading-tight">{esperando ? "escribiendo…" : "en línea"}</p>
              </div>
            </div>
            <div ref={caja} className="flex-1 overflow-y-auto px-3 py-4 space-y-2 text-[14px] leading-relaxed" aria-live="polite">
              {!enChat && (
                <p className="mx-auto w-fit max-w-[90%] text-center text-[12.5px] text-[#54656F] bg-white/80 rounded-lg px-3 py-2">
                  Describe tu empresa a la izquierda y toca <strong>Probar el agente</strong>.
                </p>
              )}
              {enChat && (
                <p className="mx-auto w-fit max-w-[90%] text-center text-[12px] text-[#54656F] bg-[#FFF3C4] rounded-lg px-3 py-1.5">
                  Demo con datos de ejemplo. Escríbele como si fueras tu cliente.
                </p>
              )}
              {turnos.map((t, i) => t.role === "user" ? (
                <div key={i} className="ml-auto w-fit max-w-[82%] rounded-lg rounded-tr-none bg-[#D9FDD3] text-[#111B21] px-3 py-2 whitespace-pre-wrap shadow-sm">{t.content}</div>
              ) : (
                <div key={i} className="w-fit max-w-[85%] rounded-lg rounded-tl-none bg-white text-[#111B21] px-3 py-2 whitespace-pre-wrap shadow-sm">
                  {t.content ? <Burbuja s={t.content} /> : <span className="inline-flex gap-1 py-1" aria-label="Escribiendo"><span className="w-1.5 h-1.5 rounded-full bg-[#54656F]/50 animate-bounce" /><span className="w-1.5 h-1.5 rounded-full bg-[#54656F]/50 animate-bounce [animation-delay:120ms]" /><span className="w-1.5 h-1.5 rounded-full bg-[#54656F]/50 animate-bounce [animation-delay:240ms]" /></span>}
                </div>
              ))}
              {enChat && turnos.length === 0 && (
                <div className="flex flex-col items-end gap-2 pt-2">
                  {sugeridas.map((s) => (
                    <button key={s} type="button" onClick={() => enviar(s)} className="text-[13px] font-semibold text-[#075E54] bg-white rounded-full px-3 py-1.5 shadow-sm hover:bg-[#F0F2F5] text-left">{s}</button>
                  ))}
                </div>
              )}
              {agotada && !esperando && (
                <p className="mx-auto w-fit max-w-[90%] text-center text-[12.5px] text-[#54656F] bg-white/80 rounded-lg px-3 py-2">
                  Hasta acá llega la demo. ¿Lo quieres con los datos reales de tu empresa? <button type="button" onClick={quieroEste} className="font-semibold text-[#075E54] underline">Cuéntanos</button>
                </p>
              )}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); enviar(entrada); }} className="bg-[#F0F2F5] px-2.5 py-2 flex items-center gap-2">
              <input value={entrada} onChange={(e) => setEntrada(e.target.value.slice(0, 600))} disabled={!enChat || agotada}
                placeholder={enChat ? "Escribe como tu cliente…" : "Primero describe tu empresa"} aria-label="Mensaje"
                className="flex-1 min-w-0 rounded-full bg-white px-4 py-2.5 text-[14px] focus:outline-none disabled:opacity-60" />
              <button type="submit" disabled={!enChat || esperando || agotada || !entrada.trim()} aria-label="Enviar"
                className="w-10 h-10 shrink-0 rounded-full bg-[#00A884] text-white flex items-center justify-center disabled:opacity-40">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path d="M3 10l14-7-5 14-2-6-7-1z" /></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

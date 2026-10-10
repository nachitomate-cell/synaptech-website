"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* Chat de Syna en el sitio (09-10-2026). Habla con /api/syna (Claude Haiku
   5.5) y muestra la respuesta a medida que llega. La conversación vive en
   sessionStorage solo como comodidad: si el navegador no lo deja, igual
   funciona. Siempre hay salida a una persona por WhatsApp. */

type Turno = { role: "user" | "assistant"; content: string };
const WA = "https://wa.me/56983568212?text=" + encodeURIComponent("Hola, vengo del chat de la página y quiero hablar con alguien del equipo");
const CLAVE = "syna-chat-v1";
const SUGERIDAS = [
  "¿Cuánto cuesta y qué incluye?",
  "¿Cómo funciona el asistente de WhatsApp?",
  "Uso AgendaPro, ¿cómo me cambio?",
  "¿Emite boletas de honorarios?",
];

/* Markdown mínimo y seguro: [texto](url), **negrita**, listas con "- " y saltos
   de línea. Nada de HTML crudo. */
function Texto({ s }: { s: string }) {
  const lineas = s.split("\n");
  return (
    <>
      {lineas.map((l, i) => {
        const lista = /^\s*[-•]\s+/.test(l);
        const partes: React.ReactNode[] = [];
        const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
        let m: RegExpExecArray | null, desde = 0, k = 0;
        const linea = lista ? l.replace(/^\s*[-•]\s+/, "") : l;
        while ((m = re.exec(linea))) {
          if (m.index > desde) partes.push(linea.slice(desde, m.index));
          if (m[1]) {
            const url = m[2];
            const seguro = url.startsWith("/") || url.startsWith("https://");
            partes.push(seguro
              ? <a key={k++} href={url} target={url.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer" className="underline underline-offset-2 font-semibold">{m[1]}</a>
              : m[1]);
          } else partes.push(<strong key={k++}>{m[3]}</strong>);
          desde = m.index + m[0].length;
        }
        if (desde < linea.length) partes.push(linea.slice(desde));
        if (!l.trim()) return <div key={i} className="h-2" />;
        return lista
          ? <p key={i} className="flex gap-2"><span aria-hidden>•</span><span>{partes}</span></p>
          : <p key={i}>{partes}</p>;
      })}
    </>
  );
}

export default function SynaChat() {
  const [abierto, setAbierto] = useState(false);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [entrada, setEntrada] = useState("");
  const [esperando, setEsperando] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activa, setActiva] = useState(false);
  const fin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    fetch("/api/syna").then((r) => r.json()).then((j) => setActiva(!!j.activa)).catch(() => setActiva(false));
    try { const g = sessionStorage.getItem(CLAVE); if (g) setTurnos(JSON.parse(g)); } catch { /* sin storage */ }
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    try { sessionStorage.setItem(CLAVE, JSON.stringify(turnos.slice(-24))); } catch { /* sin storage */ }
    fin.current?.scrollIntoView({ block: "end" });
  }, [turnos]);

  async function enviar(pregunta: string) {
    const q = pregunta.trim().slice(0, 600);
    if (!q || esperando) return;
    const nuevo: Turno = { role: "user", content: q };
    const historial: Turno[] = [...turnos, nuevo].slice(-24);
    setTurnos([...historial, { role: "assistant", content: "" }]);
    setEntrada("");
    setEsperando(true);
    const escribir = (t: string) => setTurnos((prev) => { const c: Turno[] = [...prev]; c[c.length - 1] = { role: "assistant", content: t }; return c; });
    try {
      const res = await fetch("/api/syna", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mensajes: historial }) });
      if (!res.ok || !res.body) {
        escribir(res.status === 429
          ? "Me hiciste varias preguntas seguidas y necesito una pausa corta. Mientras, puedes [hablar con el equipo por WhatsApp](" + WA + ")."
          : "Ahora no puedo responder por acá. [Escríbele al equipo por WhatsApp](" + WA + ") y te contestan al tiro.");
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
      if (!acumulado.trim()) escribir("No me llegó la respuesta. ¿Me lo preguntas de nuevo?");
    } catch {
      escribir("Se me cortó la conexión. ¿Me lo preguntas de nuevo? También puedes [escribirle al equipo por WhatsApp](" + WA + ").");
    } finally {
      setEsperando(false);
    }
  }

  if (!activa) return null;
  return (
    <>
      {/* Botón fijo y compacto, del mismo tamaño que el de WhatsApp y en la misma
          fila, a su izquierda (10-10-2026: la píldora "Pregúntale a Syna" encima
          del botón de WhatsApp tapaba contenido, sobre todo en el celular). El
          nombre aparece solo al pasar el mouse. */}
      {!abierto && (
        <button type="button" onClick={() => setAbierto(true)}
          className={`group fixed bottom-6 right-[88px] z-50 w-14 h-14 rounded-full bg-ink shadow-lg hover:scale-105 flex items-center justify-center transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
          aria-label="Abrir el chat con Syna, el asistente con IA">
          <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><Image src="/assets/synaptech-icon.png" alt="" width={26} height={26} /></span>
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink text-white text-[13px] font-semibold px-3 py-1.5 shadow-lg opacity-0 translate-x-1 transition-all duration-200 hidden sm:block group-hover:opacity-100 group-hover:translate-x-0">
            Pregúntale a Syna
          </span>
        </button>
      )}

      {abierto && (
        <div role="dialog" aria-label="Chat con Syna"
          className="fixed z-[60] inset-x-3 bottom-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[380px] h-[min(600px,calc(100dvh-24px))] flex flex-col rounded-[24px] bg-white shadow-[0_24px_60px_-12px_rgba(15,26,43,.45)] border border-border-subtle overflow-hidden">
          <header className="flex items-center gap-3 px-4 py-3 bg-ink text-white">
            <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0"><Image src="/assets/synaptech-icon.png" alt="" width={24} height={24} /></span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-tight">Syna</p>
              <p className="text-[12px] text-white/65 leading-tight">Asistente con IA de SynapTech</p>
            </div>
            <button type="button" onClick={() => setAbierto(false)} className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center" aria-label="Cerrar el chat">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" /></svg>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-[14.5px] leading-relaxed" aria-live="polite">
            <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-mist text-ink px-3.5 py-2.5">
              Hola, soy Syna. Respondo dudas sobre SynapTech: precios, cómo funciona, la mudanza desde otra agenda, boletas… ¿Qué te gustaría saber?
            </div>
            {turnos.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {SUGERIDAS.map((s) => (
                  <button key={s} type="button" onClick={() => enviar(s)} className="text-[13px] font-semibold text-ink border border-ink/15 rounded-full px-3 py-1.5 hover:border-ink transition-colors text-left">{s}</button>
                ))}
              </div>
            )}
            {turnos.map((t, i) => t.role === "user" ? (
              <div key={i} className="ml-auto max-w-[85%] w-fit rounded-2xl rounded-tr-md bg-ink text-white px-3.5 py-2.5 whitespace-pre-wrap">{t.content}</div>
            ) : (
              <div key={i} className="max-w-[88%] w-fit rounded-2xl rounded-tl-md bg-mist text-ink px-3.5 py-2.5 space-y-1">
                {t.content ? <Texto s={t.content} /> : <span className="inline-flex gap-1" aria-label="Escribiendo"><span className="w-1.5 h-1.5 rounded-full bg-ink/40 animate-bounce" /><span className="w-1.5 h-1.5 rounded-full bg-ink/40 animate-bounce [animation-delay:120ms]" /><span className="w-1.5 h-1.5 rounded-full bg-ink/40 animate-bounce [animation-delay:240ms]" /></span>}
              </div>
            ))}
            <div ref={fin} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); enviar(entrada); }} className="border-t border-border-subtle p-3">
            <div className="flex items-end gap-2">
              <textarea value={entrada} onChange={(e) => setEntrada(e.target.value.slice(0, 600))} rows={1}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviar(entrada); } }}
                placeholder="Escribe tu pregunta…" aria-label="Tu pregunta"
                className="flex-1 resize-none max-h-28 rounded-2xl border border-border-subtle px-3.5 py-2.5 text-[14.5px] focus:outline-none focus:border-ink" />
              <button type="submit" disabled={esperando || !entrada.trim()} aria-label="Enviar"
                className="w-10 h-10 shrink-0 rounded-full bg-ink text-white flex items-center justify-center disabled:opacity-40">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path d="M3 10l14-7-5 14-2-6-7-1z" /></svg>
              </button>
            </div>
            <p className="text-[11px] text-text-muted mt-2">
              Responde con IA y puede equivocarse. ¿Prefieres una persona? <a href={WA} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 font-semibold text-ink">WhatsApp</a>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

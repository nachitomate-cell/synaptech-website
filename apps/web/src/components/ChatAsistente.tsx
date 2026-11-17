"use client";
import { useEffect, useRef, useState } from "react";

/* La conversación del asistente, escribiéndose sola (17-11-2026). Idea tomada
   de notpato.app: cuatro burbujas explican el producto mejor que una lista de
   funciones. Un cliente escribe de noche, el asistente le ofrece horas libres
   con precio, toma la reserva y la cita cae en la agenda.

   El texto de la confirmación es el mismo de la captura real del panel
   (public/panel/recorte-syna-agenda.webp), con el día cambiado a "mañana".
   No prometer acá nada que el asistente no haga.

   Reglas (las mismas de Aparece.tsx):
   - El HTML del servidor sale COMPLETO y visible: Google y quien no tiene
     JavaScript leen la conversación entera.
   - Solo se anima si al cargar está bajo la pantalla y no se pidió "reducir
     movimiento". Las burbujas ocupan su lugar desde el principio (se ocultan
     con opacidad), así que la caja no salta de alto.
   - Una sola vez; al final queda un botón para verla de nuevo. */

type Burbuja =
  | { de: "cliente" | "local"; texto: string; hora: string }
  | { de: "agenda"; texto: string };

const CONVERSACION: Burbuja[] = [
  { de: "cliente", texto: "hola, tení hora mañana pa corte + barba?", hora: "23:41" },
  { de: "local", texto: "¡Hola, Sebastián! Mañana sábado con Benjamín tengo 10:30, 12:00 y 16:30. Corte + barba son $18.000. ¿Cuál te acomoda?", hora: "23:41" },
  { de: "cliente", texto: "la de las 12", hora: "23:42" },
  { de: "local", texto: "¡Listo, Sebastián! ✅ Quedaste agendado mañana sábado a las 12:00 con Benjamín para Corte + barba ($18.000). Te esperamos en Av. Los Aromos 1450. Si necesitas cambiarla, me escribes por aquí.", hora: "23:42" },
  { de: "agenda", texto: "Agendó sáb 12:00 · Corte + barba · con Benjamín" },
];

/* Cuánto espera antes de mostrar cada burbuja (ms). Las del local llevan antes
   los tres puntitos de "escribiendo". */
const PAUSA = { cliente: 900, local: 1500, agenda: 700 } as const;
const ESCRIBIENDO = 1300;

export default function ChatAsistente() {
  const ref = useRef<HTMLDivElement>(null);
  /* null = sin animación (todo visible). Un número = cuántas burbujas se ven. */
  const [vistas, setVistas] = useState<number | null>(null);
  const [escribiendo, setEscribiendo] = useState(false);
  const [corrida, setCorrida] = useState(0);

  // ¿Se anima? Solo si está bajo la pantalla al cargar.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;
    setVistas(0);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setCorrida((c) => c + 1); io.disconnect(); }
    }, { rootMargin: "0px 0px -25% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // La secuencia.
  useEffect(() => {
    if (corrida === 0) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 300;
    CONVERSACION.forEach((b, i) => {
      if (b.de === "local") {
        t += 500;
        timers.push(setTimeout(() => setEscribiendo(true), t));
        t += ESCRIBIENDO;
      } else {
        t += PAUSA[b.de];
      }
      timers.push(setTimeout(() => { setEscribiendo(false); setVistas(i + 1); }, t));
    });
    return () => timers.forEach(clearTimeout);
  }, [corrida]);

  const ve = (i: number) => vistas === null || i < vistas;
  const terminado = vistas === null || vistas >= CONVERSACION.length;
  const siguienteEsLocal = vistas !== null && CONVERSACION[vistas]?.de === "local";

  const repetir = () => { setVistas(0); setEscribiendo(false); setCorrida((c) => c + 1); };

  return (
    <div ref={ref} className="w-full max-w-[400px] mx-auto text-left">
      <div className="rounded-[28px] overflow-hidden border border-white/10 bg-[#0B141A] shadow-[0_30px_80px_-24px_rgba(156,204,60,.35)]">
        {/* Cabecera estilo WhatsApp */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#1F2C34]">
          <span aria-hidden className="grid place-items-center w-10 h-10 rounded-full bg-[#9CCC3C] text-[#0B141A] font-display font-bold text-[15px]">BN</span>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-white leading-tight truncate">Barbería Norte</p>
            <p className="text-[12px] text-[#25D366] leading-tight">en línea</p>
          </div>
          <span className="ml-auto text-[11px] font-semibold text-white/45 bg-white/[.06] rounded-full px-2.5 py-1">Asistente IA</span>
        </div>

        {/* Conversación */}
        <div className="px-3 sm:px-4 pt-4 pb-5 flex flex-col gap-2 text-[14.5px] leading-snug"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px)", backgroundSize: "14px 14px" }}>
          {CONVERSACION.map((b, i) => {
            const visible = ve(i);
            const clase = `transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`;
            const puntos = escribiendo && siguienteEsLocal && vistas === i;
            if (b.de === "agenda") {
              return (
                <p key={i} className={`self-center mt-2 inline-flex items-center gap-2 rounded-2xl border border-[#9CCC3C]/40 bg-[#9CCC3C]/10 px-3 py-1.5 text-[12.5px] text-[#B8E36A] ${clase}`}>
                  <svg aria-hidden viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="12" height="11" rx="2" /><path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" strokeLinecap="round" /></svg>
                  <span><b className="font-semibold">Ya está en tu agenda</b> · {b.texto.replace("Agendó ", "")}</span>
                </p>
              );
            }
            const cliente = b.de === "cliente";
            return (
              <div key={i} className={`relative max-w-[86%] ${cliente ? "self-end" : "self-start"}`}>
                {puntos && (
                  <span aria-hidden className="absolute left-0 top-0 inline-flex gap-1 rounded-2xl rounded-tl-md bg-[#1F2C34] px-3.5 py-3">
                    {[0, 1, 2].map((d) => <span key={d} className="chat-punto w-1.5 h-1.5 rounded-full bg-white/60" style={{ animationDelay: `${d * 160}ms` }} />)}
                  </span>
                )}
                <div className={`rounded-2xl px-3 pt-2 pb-1.5 ${cliente ? "bg-[#005C4B] text-white rounded-tr-md" : "bg-[#1F2C34] text-white/95 rounded-tl-md"} ${clase}`}>
                  <p>{b.texto}</p>
                  <p className="text-right text-[10.5px] text-white/45 mt-0.5">{b.hora}{cliente && <span className="text-[#53BDEB]"> ✓✓</span>}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className={`mt-3 text-center text-[13px] text-white/45 transition-opacity duration-500 ${terminado ? "opacity-100" : "opacity-0"}`}>
        Respondió solo, en el WhatsApp del local, a las 23:41.
        {vistas !== null && terminado && (
          <> <button type="button" onClick={repetir} className="text-white/70 underline underline-offset-4 decoration-white/30 hover:decoration-white">Verlo de nuevo</button></>
        )}
      </p>
    </div>
  );
}

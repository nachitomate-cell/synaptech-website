"use client";
import { useEffect, useRef, useState } from "react";

/* La tarjeta del club, viva (17-11-2026). Una tarjeta de Wallet hecha en HTML
   con 9 de 10 sellos: al verse, se completa el décimo y entra el aviso del
   premio ("Al cliente le llega un aviso cuando desbloquea un premio",
   verificado en /fidelizacion). Local y cliente ficticios, los mismos del chat
   de la portada.

   Mismas reglas que ChatAsistente/Aparece: el servidor pinta el estado FINAL
   (10 sellos y el aviso); solo se anima si al cargar está bajo la pantalla y
   sin "reducir movimiento". */
const TOTAL = 10;

export default function TarjetaClub() {
  const ref = useRef<HTMLDivElement>(null);
  const [completa, setCompleta] = useState(true);
  const [aviso, setAviso] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;
    setCompleta(false); setAviso(false);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      timers.push(setTimeout(() => setCompleta(true), 900));
      timers.push(setTimeout(() => setAviso(true), 1700));
    }, { rootMargin: "0px 0px -20% 0px" });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  const llenos = completa ? TOTAL : TOTAL - 1;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[420px] pb-16 sm:pb-20">
      {/* La tarjeta */}
      <div className="relative rounded-[26px] bg-[#0F1A2B] text-white p-6 sm:p-7 shadow-[0_30px_70px_-24px_rgba(15,26,43,.55)] overflow-hidden">
        <div aria-hidden className="absolute -right-16 -top-16 w-56 h-56 rounded-full opacity-30 blur-2xl" style={{ background: "radial-gradient(closest-side, #9CCC3C, transparent)" }} />
        <div className="relative flex items-center gap-3">
          <span aria-hidden className="grid place-items-center w-11 h-11 rounded-full bg-[#9CCC3C] text-[#0F1A2B] font-display font-bold">BN</span>
          <div className="min-w-0">
            <p className="font-semibold leading-tight">Barbería Norte</p>
            <p className="text-[12px] text-white/55 leading-tight">Club de clientes</p>
          </div>
          <span className="ml-auto text-[11px] font-bold tracking-[0.14em] px-2.5 py-1 rounded-full bg-gradient-to-r from-[#F5D77A] to-[#C9A23F] text-[#3a2c06]">GOLD</span>
        </div>

        <p className="relative mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">Cliente</p>
        <p className="relative text-lg font-semibold">Sebastián R.</p>

        <ol aria-label={`${llenos} de ${TOTAL} sellos`} className="relative mt-5 grid grid-cols-5 gap-2.5 sm:gap-3 list-none p-0">
          {Array.from({ length: TOTAL }, (_, i) => {
            const lleno = i < llenos;
            const premio = i === TOTAL - 1;
            return (
              <li key={i} className={`aspect-square rounded-full grid place-items-center transition-all duration-500 ${
                lleno ? (premio ? "bg-[#F5D77A] text-[#3a2c06] scale-100" : "bg-[#9CCC3C] text-[#0F1A2B]") : "border-2 border-dashed border-white/25 text-white/40 scale-95"}`}>
                {premio ? (
                  <svg aria-hidden viewBox="0 0 24 24" className="w-1/2 h-1/2" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M5 12v8h14v-8M12 8v12M12 8c-1.5-3-5-3.5-5-1s3 1 5 1c2 0 5 1.5 5-1s-3.5-2-5 1z" strokeLinejoin="round" /></svg>
                ) : lleno ? (
                  <svg aria-hidden viewBox="0 0 16 16" className="w-1/2 h-1/2" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="relative mt-6 flex items-center justify-between text-[13px]">
          <span className="text-white/70">{llenos} de {TOTAL} sellos</span>
          <span className={`font-semibold transition-colors ${completa ? "text-[#F5D77A]" : "text-white/55"}`}>
            {completa ? "Premio listo: corte gratis" : "Te falta 1 para tu corte gratis"}
          </span>
        </div>
        <p className="relative mt-5 pt-4 border-t border-white/10 text-[11px] text-white/40">En Google Wallet y Apple Wallet</p>
      </div>

      {/* El aviso del premio */}
      <div aria-live="polite" className={`absolute left-4 right-0 sm:left-10 sm:-right-8 bottom-0 transition-all duration-700 ease-out ${
        aviso ? "opacity-100 translate-y-0 rotate-[-2deg]" : "opacity-0 translate-y-6 rotate-0"}`}>
        <div className="flex items-start gap-3 rounded-2xl bg-white/95 backdrop-blur px-4 py-3.5 shadow-[0_18px_40px_-12px_rgba(15,26,43,.35)] border border-black/5">
          <span aria-hidden className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-[#FFF4D1] text-[#B88A14]">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 003.4 0" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-ink">Barbería Norte <span className="font-normal text-text-muted">· ahora</span></p>
            <p className="text-[13.5px] text-text-secondary leading-snug">Completaste tu tarjeta: tu próximo corte va por la casa.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

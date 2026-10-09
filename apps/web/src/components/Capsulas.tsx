"use client";
import { useEffect, useRef, useState } from "react";
import { CAPSULAS, capsula, type Capsula } from "@/content/capsulas";

/* Reproductor de cápsulas: todas son verticales (9:16), así que se abren en un
   visor a pantalla completa como una historia. El video solo se descarga al
   tocar la tarjeta: en la página quedan las portadas (jpg de ~15-45 KB). */

function Visor({ c, onClose }: { c: Capsula; onClose: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.play().catch(() => {});
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={c.titulo}
      className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}>
      <div className="relative h-full max-h-[86vh] aspect-[9/16] max-w-full" onClick={(e) => e.stopPropagation()}>
        <video ref={ref} src={`/capsulas/${c.id}.mp4`} poster={`/capsulas/${c.id}.jpg`}
          controls playsInline preload="auto" className="w-full h-full rounded-2xl bg-black object-contain" />
        <button onClick={onClose} aria-label="Cerrar"
          className="absolute -top-3 -right-3 sm:-right-12 sm:top-0 w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <p className="absolute -bottom-9 inset-x-0 text-center text-white/80 text-sm">{c.titulo} · {c.duracion}</p>
      </div>
    </div>
  );
}

function IconoPlay({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
  );
}

export function TarjetaCapsula({ c, compacta = false }: { c: Capsula; compacta?: boolean }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <>
      <button onClick={() => setAbierta(true)}
        className={`group text-left shrink-0 ${compacta ? "w-[150px]" : "w-[190px] sm:w-[210px]"}`}>
        <span className="relative block aspect-[9/16] rounded-2xl overflow-hidden bg-[#0d1424]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/capsulas/${c.id}.jpg`} alt="" loading="lazy" decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/95 text-ink flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
            <IconoPlay className="w-6 h-6 ml-0.5" />
          </span>
          <span className="absolute right-2.5 top-2.5 text-[11px] font-semibold text-white bg-black/55 rounded-full px-2 py-0.5">{c.duracion}</span>
        </span>
        <span className="block mt-3 font-semibold text-ink text-[15px] leading-snug">{c.titulo}</span>
        {!compacta && <span className="block text-sm text-text-muted leading-snug mt-0.5">{c.bajada}</span>}
      </button>
      {abierta && <Visor c={c} onClose={() => setAbierta(false)} />}
    </>
  );
}

/* Botón de texto "▶ Ver cápsula" para las tarjetas de la home. */
export function BotonCapsula({ id, texto = "Ver cápsula" }: { id: string; texto?: string }) {
  const [abierta, setAbierta] = useState(false);
  const c = capsula(id);
  if (!c) return null;
  return (
    <>
      <button onClick={() => setAbierta(true)}
        className="inline-flex items-center gap-2 font-semibold text-ink hover:text-accent transition-colors">
        <span className="w-7 h-7 rounded-full bg-lime flex items-center justify-center"><IconoPlay className="w-3.5 h-3.5 ml-0.5" /></span>
        {texto} <span className="text-text-muted font-normal text-sm">{c.duracion}</span>
      </button>
      {abierta && <Visor c={c} onClose={() => setAbierta(false)} />}
    </>
  );
}

/* Fila de cápsulas con scroll horizontal (estilo historias). */
export function FilaCapsulas({ ids, compacta = false }: { ids?: string[]; compacta?: boolean }) {
  const lista = ids ? ids.map(capsula).filter(Boolean) as Capsula[] : CAPSULAS;
  return (
    <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x [scrollbar-width:thin]">
      {lista.map((c) => <div key={c.id} className="snap-start"><TarjetaCapsula c={c} compacta={compacta} /></div>)}
    </div>
  );
}

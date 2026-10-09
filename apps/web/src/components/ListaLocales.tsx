"use client";
import { useState } from "react";
import type { LocalDirectorio } from "@/lib/directorio";

/* Grilla de locales del directorio con filtro por rubro. Las fichas vienen
   del directorio en vivo (lib/directorio.ts); las fotos se sirven desde
   /directorio/img por el rewrite de next.config.mjs. */

const FILTROS = [
  { id: "todos", label: "Todos" },
  { id: "barberia", label: "Barberías" },
  { id: "salon", label: "Peluquerías y salones" },
] as const;

export default function ListaLocales({ locales }: { locales: LocalDirectorio[] }) {
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]["id"]>("todos");
  const lista = filtro === "todos" ? locales : locales.filter((l) => l.rubro === filtro);

  return (
    <>
      <div role="tablist" aria-label="Rubro" className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 [scrollbar-width:none]">
        {FILTROS.map((f) => {
          const n = f.id === "todos" ? locales.length : locales.filter((l) => l.rubro === f.id).length;
          return (
            <button key={f.id} role="tab" aria-selected={filtro === f.id} onClick={() => setFiltro(f.id)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-[15px] font-semibold transition-colors ${
                filtro === f.id ? "bg-ink text-white" : "bg-mist text-text-secondary hover:text-ink"
              }`}>
              {f.label} <span className={filtro === f.id ? "text-white/60" : "text-text-muted"}>{n}</span>
            </button>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {lista.map((l) => (
          <article key={l.tid} className="rounded-[24px] bg-white border border-border-subtle overflow-hidden flex flex-col hover:shadow-card-hover transition-shadow">
            <div className="relative aspect-[16/10] bg-mist">
              {l.imagen && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={l.imagen} alt={`${l.nombre}${l.barrio ? ` en ${l.barrio}` : ""}`} loading="lazy" decoding="async"
                  className="absolute inset-0 w-full h-full object-cover" />
              )}
              {l.barrio && (
                <span className="absolute left-3 top-3 bg-white/95 text-ink text-xs font-semibold px-2.5 py-1 rounded-full">{l.barrio}</span>
              )}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-bold text-ink text-lg leading-snug">{l.nombre}</h3>
                  <p className="text-sm text-text-muted mt-0.5">
                    {[l.direccion, l.comuna].filter(Boolean).join(" · ")}
                  </p>
                </div>
                {l.rating && (
                  <p className="shrink-0 text-sm font-semibold text-ink flex items-center gap-1" title={l.opiniones ? `${l.opiniones} opiniones en Google` : undefined}>
                    <svg className="w-4 h-4 text-[#F5A623]" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    {l.rating.toFixed(1)}
                    {l.opiniones && <span className="font-normal text-text-muted">({l.opiniones})</span>}
                  </p>
                )}
              </div>
              <a href={l.reservar} target="_blank" rel="noopener"
                className="mt-5 inline-flex justify-center items-center bg-ink text-white font-semibold px-5 py-3 rounded-full hover:bg-black transition-colors">
                Reservar hora
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

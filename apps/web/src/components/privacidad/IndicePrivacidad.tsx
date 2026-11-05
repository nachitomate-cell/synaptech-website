"use client";

import { useEffect, useState } from "react";

export type EntradaIndice = { id: string; titulo: string };

/* Índice de /privacidad (05-11-2026). En escritorio va fijo al costado y
   resalta la sección que se está leyendo (scroll-spy con IntersectionObserver).
   En el celular es un desplegable arriba del contenido, que se cierra solo al
   elegir. Los saltos usan los #id de cada sección (estables: los enlazan el
   aviso de cookies y otras páginas). */
function useSeccionActiva(idsEntrada: string[]) {
  const clave = idsEntrada.join(",");
  const [activa, setActiva] = useState(idsEntrada[0] ?? "");
  useEffect(() => {
    const ids = clave.split(",");
    /* La sección activa es la ÚLTIMA cuyo título ya cruzó la línea de lectura
       (35% de la pantalla). Con IntersectionObserver la marca se quedaba en la
       sección anterior cuando el título nuevo estaba a media pantalla. */
    let pendiente = 0;
    const medir = () => {
      pendiente = 0;
      const linea = window.innerHeight * 0.35;
      let actual = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= linea) actual = id;
      }
      // Al fondo de la página, la última sección (puede no alcanzar la línea).
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) actual = ids[ids.length - 1] ?? actual;
      setActiva(actual);
    };
    const alMover = () => { if (!pendiente) pendiente = requestAnimationFrame(medir); };
    medir();
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    return () => {
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
      if (pendiente) cancelAnimationFrame(pendiente);
    };
  }, [clave]);
  return activa;
}

export function IndiceLateral({ entradas }: { entradas: EntradaIndice[] }) {
  const activa = useSeccionActiva(entradas.map((e) => e.id));
  return (
    <nav aria-label="Índice de la política" className="sticky top-10">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted mb-3">En esta página</p>
      <ol className="space-y-0.5 border-l border-border-subtle">
        {entradas.map((e) => {
          const es = e.id === activa;
          return (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                aria-current={es ? "location" : undefined}
                className={`block -ml-px border-l-2 pl-3 py-1.5 text-[13.5px] leading-snug transition-colors
                  ${es ? "border-accent text-ink font-semibold" : "border-transparent text-text-secondary hover:text-ink hover:border-border-subtle"}`}
              >
                {e.titulo}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function IndiceMovil({ entradas, className = "" }: { entradas: EntradaIndice[]; className?: string }) {
  const activa = useSeccionActiva(entradas.map((e) => e.id));
  const [abierto, setAbierto] = useState(false);
  const actual = entradas.find((e) => e.id === activa)?.titulo ?? "Índice";
  return (
    <nav aria-label="Índice de la política" className={`sticky top-0 z-30 -mx-6 px-6 py-2 bg-bg-primary/95 backdrop-blur border-b border-border-subtle ${className}`}>
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls="indice-movil"
        onClick={() => setAbierto((v) => !v)}
        className="w-full flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-white px-4 py-2.5 text-left"
      >
        <span className="min-w-0">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">En esta página</span>
          <span className="block truncate text-sm font-semibold text-ink">{actual}</span>
        </span>
        <svg aria-hidden="true" className={`w-4 h-4 shrink-0 text-text-muted transition-transform ${abierto ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {abierto && (
        <ol id="indice-movil" className="mt-2 max-h-[60vh] overflow-y-auto rounded-xl border border-border-subtle bg-white py-1 shadow-card">
          {entradas.map((e) => (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                onClick={() => setAbierto(false)}
                aria-current={e.id === activa ? "location" : undefined}
                className={`block px-4 py-2.5 text-sm ${e.id === activa ? "text-ink font-semibold bg-mist" : "text-text-secondary"}`}
              >
                {e.titulo}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}

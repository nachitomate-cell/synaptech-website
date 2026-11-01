"use client";
import { useState } from "react";
import { COMPARATIVA, PLANES, fmt, type Celda as ValorCelda, type PlanId } from "@/content/precios";

/* Tabla "qué incluye cada plan" (escalera de noviembre 2026: cinco planes).
   En escritorio, las cinco columnas lado a lado con Local IA resaltado; en el
   celular no caben, así que se elige el plan con pestañas y se ve una sola
   columna. Todo el texto va en el HTML del servidor (se pinta en el primer
   render), así Google lee la tabla completa. */

function Celda({ v, oscuro }: { v: ValorCelda; oscuro?: boolean }) {
  if (v === true) return (
    <svg className={`w-5 h-5 ${oscuro ? "text-lime" : "text-accent"}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-label="Incluido">
      <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (v === false) return <span className="text-text-muted/60" aria-label="No incluido">—</span>;
  const adicional = /^Adicional|al año$/.test(v);
  return <span className={`text-[13px] leading-tight ${adicional ? (oscuro ? "text-white/55" : "text-text-muted") : "font-semibold"}`}>{v}</span>;
}

const DESTACADO = PLANES.findIndex((p) => p.popular);

export default function TablaPlanes() {
  const [movil, setMovil] = useState<PlanId>(PLANES[DESTACADO].id);
  const iMovil = PLANES.findIndex((p) => p.id === movil);

  return (
    <>
      {/* Escritorio */}
      <table className="hidden md:table w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="text-left align-bottom pb-4 pr-4 w-[34%]" />
            {PLANES.map((p) => (
              <th key={p.id} scope="col" className={`pb-4 px-2 align-bottom ${p.popular ? "bg-ink text-white rounded-t-2xl pt-4" : ""}`}>
                <span className="block font-display font-bold text-lg leading-tight">{p.nombre}</span>
                <span className={`block text-sm font-normal ${p.popular ? "text-white/60" : "text-text-muted"}`}>{fmt(p.mes)} + IVA</span>
              </th>
            ))}
          </tr>
        </thead>
        {COMPARATIVA.map((g) => (
          <tbody key={g.titulo}>
            <tr>
              <th scope="colgroup" className="text-left pt-8 pb-3 font-display font-bold text-ink text-lg">
                {g.titulo}{g.nota && <span className="ml-2 text-sm font-body font-normal text-text-muted">{g.nota}</span>}
              </th>
              {PLANES.map((p, i) => <td key={p.id} className={i === DESTACADO ? "bg-ink" : ""} />)}
            </tr>
            {g.filas.map((f) => (
              <tr key={f.label}>
                <th scope="row" className="text-left font-normal border-t border-border-subtle py-3.5 pr-4 text-[15px] text-text-primary">
                  {f.label}
                  {f.ayuda && <span className="block text-xs text-text-muted mt-0.5">{f.ayuda}</span>}
                </th>
                {f.v.map((v, i) => (
                  <td key={i} className={`py-3.5 px-2 text-center ${i === DESTACADO ? "border-t border-white/10 bg-ink text-white" : "border-t border-border-subtle"}`}>
                    <span className="inline-flex justify-center"><Celda v={v} oscuro={i === DESTACADO} /></span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
        <tfoot><tr><td />{PLANES.map((p, i) => <td key={p.id} className={i === DESTACADO ? "bg-ink rounded-b-2xl h-4" : ""} />)}</tr></tfoot>
      </table>

      {/* Celular */}
      <div className="md:hidden">
        <div role="tablist" aria-label="Plan" className="flex gap-1 p-1 rounded-full bg-mist sticky top-[72px] z-10 overflow-x-auto">
          {PLANES.map((p) => (
            <button key={p.id} role="tab" aria-selected={movil === p.id} onClick={() => setMovil(p.id)}
              className={`shrink-0 px-3.5 py-2.5 rounded-full text-[14px] font-semibold whitespace-nowrap transition-colors ${movil === p.id ? "bg-ink text-white" : "text-text-secondary"}`}>
              {p.nombre}
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-text-muted mt-3">
          {fmt(PLANES[iMovil].mes)} + IVA al mes, {PLANES[iMovil].profesionales === 1 ? "1 profesional" : "por local"}
        </p>
        {COMPARATIVA.map((g) => (
          <div key={g.titulo} className="mt-7">
            <p className="font-display font-bold text-ink text-lg mb-2">{g.titulo}</p>
            <ul>
              {g.filas.map((f) => (
                <li key={f.label} className="flex items-center justify-between gap-4 border-t border-border-subtle py-3">
                  <span className="text-[15px] text-text-primary">
                    {f.label}
                    {f.ayuda && <span className="block text-xs text-text-muted mt-0.5">{f.ayuda}</span>}
                  </span>
                  <span className="shrink-0 text-right"><Celda v={f.v[iMovil]} /></span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

"use client";
import { useState } from "react";
import { COMPARATIVA, PLANES, fmt, type Plan } from "@/content/precios";

/* Tabla "qué incluye cada plan". En escritorio, las tres columnas lado a lado
   con el Pro resaltado; en el celular no caben, así que se elige el plan con
   pestañas y se ve una sola columna. */

function Celda({ v, oscuro }: { v: boolean | string; oscuro?: boolean }) {
  if (v === true) return (
    <svg className={`w-5 h-5 ${oscuro ? "text-lime" : "text-accent"}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-label="Incluido">
      <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (v === false) return <span className="text-text-muted/60" aria-label="No incluido">—</span>;
  return <span className={`text-sm ${v === "Adicional" ? (oscuro ? "text-white/55" : "text-text-muted") : "font-semibold"}`}>{v}</span>;
}

export default function TablaPlanes() {
  const [movil, setMovil] = useState<Plan["id"]>("pro");

  return (
    <>
      {/* Escritorio */}
      <table className="hidden md:table w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="text-left align-bottom pb-4 pr-4 w-[46%]" />
            {PLANES.map((p) => (
              <th key={p.id} className={`pb-4 px-2 align-bottom ${p.popular ? "bg-ink text-white rounded-t-2xl pt-4" : ""}`}>
                <span className="block font-display font-bold text-xl">{p.nombre}</span>
                <span className={`block text-sm font-normal ${p.popular ? "text-white/60" : "text-text-muted"}`}>{fmt(p.mes)} + IVA</span>
              </th>
            ))}
          </tr>
        </thead>
        {COMPARATIVA.map((g) => (
          <tbody key={g.titulo}>
            <tr>
              <th className="text-left pt-8 pb-3 font-display font-bold text-ink text-lg">{g.titulo}</th>
              <td /><td className="bg-ink" /><td />
            </tr>
            {g.filas.map((f) => (
              <tr key={f.label}>
                <td className="border-t border-border-subtle py-3.5 pr-4 text-[15px] text-text-primary">
                  {f.label}
                  {f.ayuda && <span className="block text-xs text-text-muted mt-0.5">{f.ayuda}</span>}
                </td>
                <td className="border-t border-border-subtle py-3.5 px-2 text-center"><span className="inline-flex justify-center"><Celda v={f.basico} /></span></td>
                <td className="border-t border-white/10 py-3.5 px-2 bg-ink text-white text-center"><span className="inline-flex justify-center"><Celda v={f.pro} oscuro /></span></td>
                <td className="border-t border-border-subtle py-3.5 px-2 text-center"><span className="inline-flex justify-center"><Celda v={f.full} /></span></td>
              </tr>
            ))}
          </tbody>
        ))}
        <tfoot><tr><td /><td /><td className="bg-ink rounded-b-2xl h-4" /><td /></tr></tfoot>
      </table>

      {/* Celular */}
      <div className="md:hidden">
        <div role="tablist" aria-label="Plan" className="grid grid-cols-3 gap-1 p-1 rounded-full bg-mist sticky top-[72px] z-10">
          {PLANES.map((p) => (
            <button key={p.id} role="tab" aria-selected={movil === p.id} onClick={() => setMovil(p.id)}
              className={`py-2.5 rounded-full text-[15px] font-semibold transition-colors ${movil === p.id ? "bg-ink text-white" : "text-text-secondary"}`}>
              {p.nombre}
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-text-muted mt-3">{fmt(PLANES.find((p) => p.id === movil)!.mes)} + IVA al mes, por local</p>
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
                  <span className="shrink-0"><Celda v={f[movil]} /></span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

"use client";
import { useState } from "react";
import { ANUAL, fmt } from "@/content/precios";

/* Interruptor Mensual / Anual en la tarjeta del plan que tiene anual
   (17-11-2026, idea de notpato.app). Hoy el único anual publicado es el del
   Local IA (admin-panel/src/lib/precios.js, id 'anual': $399.000 al año,
   equivale a 8 meses). Si se publican anuales de otros planes, se agregan a
   content/precios.ts y la tarjeta los toma de ahí.

   El servidor pinta "Mensual" (el precio de siempre, el que lee Google y el
   JSON-LD); el anual aparece solo al tocar. */
export default function PrecioConAnual({ mes, oscuro }: { mes: number; oscuro: boolean }) {
  const [anual, setAnual] = useState(false);
  const porMes = Math.round(ANUAL.anio / 12);
  const mesesGratis = 12 - ANUAL.equivaleMeses;
  const suave = oscuro ? "text-white/60" : "text-text-muted";

  const boton = (activo: boolean) =>
    `px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${
      activo ? (oscuro ? "bg-white text-ink" : "bg-ink text-white") : (oscuro ? "text-white/70 hover:text-white" : "text-text-secondary hover:text-ink")}`;

  return (
    <div className="mt-5">
      <div role="group" aria-label="Forma de pago" className={`inline-flex items-center gap-1 p-1 rounded-full ${oscuro ? "bg-white/10" : "bg-mist"}`}>
        <button type="button" aria-pressed={!anual} onClick={() => setAnual(false)} className={boton(!anual)}>Mensual</button>
        <button type="button" aria-pressed={anual} onClick={() => setAnual(true)} className={boton(anual)}>
          Anual <span className={`ml-1 text-[11px] font-bold ${anual ? "" : oscuro ? "text-lime" : "text-accent"}`}>{mesesGratis} meses gratis</span>
        </button>
      </div>
      <p className="mt-4" aria-live="polite">
        <span className="font-display font-bold text-[40px] tracking-tight leading-none">{fmt(anual ? ANUAL.anio : mes)}</span>
        <span className={`text-sm ml-1 ${suave}`}>+ IVA / {anual ? "año" : "mes"}</span>
      </p>
      {anual && (
        <p className={`text-sm mt-1 ${oscuro ? "text-lime" : "text-accent"} font-semibold`}>
          Equivale a {fmt(porMes)} al mes: pagas {ANUAL.equivaleMeses} meses y usas 12.
        </p>
      )}
    </div>
  );
}

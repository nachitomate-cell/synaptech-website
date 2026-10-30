"use client";

import { useState } from "react";
import { Campo, fmt, num } from "@/components/Herramientas";

/* Cuánto te cuestan las inasistencias (30-10-2026). La cuenta, a la vista:
   citas perdidas a la semana × (1 − % que alcanzas a llenar) × precio promedio,
   por semana, por mes (52/12 semanas) y por año (las semanas que trabajas).
   Si hay comisión, la pérdida se reparte: el % del barbero y el resto del local.
   Ningún número es un dato de mercado: los pone el dueño. */
const SEMANAS_MES = 52 / 12;

export default function CalculadoraInasistencias() {
  const [citas, setCitas] = useState("6");
  const [precio, setPrecio] = useState("18000");
  const [duracion, setDuracion] = useState("45");
  const [semanas, setSemanas] = useState("50");
  const [llenas, setLlenas] = useState("0");
  const [pct, setPct] = useState("50");

  const perdidas = num(citas) * (1 - Math.min(100, num(llenas)) / 100);
  const semana = perdidas * num(precio);
  const mes = semana * SEMANAS_MES;
  const anio = semana * Math.min(53, num(semanas));
  const horasAnio = Math.round((perdidas * num(duracion) * Math.min(53, num(semanas))) / 60);
  const pctBarbero = Math.min(100, num(pct)) / 100;

  return (
    <div className="rounded-[28px] bg-mist p-5 sm:p-8 grid lg:grid-cols-[1.2fr_1fr] gap-8">
      <div className="grid sm:grid-cols-2 gap-4 content-start">
        <Campo label="Citas que no llegan, a la semana" valor={citas} set={setCitas} sufijo="citas" ayuda="En todo el local, incluidas las que cancelan tarde" />
        <Campo label="Precio promedio del servicio" valor={precio} set={setPrecio} ayuda="Lo que habría pagado el cliente" />
        <Campo label="Duración promedio de la cita" valor={duracion} set={setDuracion} sufijo="min" />
        <Campo label="Semanas que trabajas al año" valor={semanas} set={setSemanas} sufijo="semanas" ayuda="Descuenta vacaciones y cierres" />
        <Campo label="Horas que alcanzas a llenar con otro cliente" valor={llenas} set={setLlenas} sufijo="%" ayuda="Si nadie las toma, deja 0" />
        <Campo label="Comisión del barbero" valor={pct} set={setPct} sufijo="%" ayuda="Si arrienda sillón o es tu local solo, pon 100" />
      </div>
      <div className="rounded-[22px] bg-ink text-white p-6 sm:p-7 self-start" aria-live="polite">
        <p className="text-white/60 text-sm">Al año se te van</p>
        <p className="font-display font-bold text-5xl sm:text-6xl tracking-tight mt-1 tabular-nums text-lime">{fmt(anio)}</p>
        <p className="text-white/70 mt-2">{horasAnio.toLocaleString("es-CL")} horas de sillón vacío</p>
        <dl className="mt-6 space-y-2 text-[15px]">
          <div className="flex justify-between gap-4"><dt className="text-white/70">A la semana</dt><dd className="tabular-nums">{fmt(semana)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-white/70">Al mes</dt><dd className="tabular-nums">{fmt(mes)}</dd></div>
          {pctBarbero > 0 && pctBarbero < 1 && <>
            <div className="flex justify-between gap-4 border-t border-white/15 pt-3 mt-3"><dt className="text-white/70">Lo pierde el local, al año</dt><dd className="tabular-nums">{fmt(anio * (1 - pctBarbero))}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-white/70">Lo pierden los barberos, al año</dt><dd className="tabular-nums">{fmt(anio * pctBarbero)}</dd></div>
          </>}
        </dl>
        <p className="text-white/60 text-[13px] mt-5 leading-relaxed">
          Es venta que no entra, con el local abierto y el equipo esperando. Montos con IVA incluido, tal como los cobras.
        </p>
      </div>
    </div>
  );
}

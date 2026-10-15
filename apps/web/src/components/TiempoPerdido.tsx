"use client";

import { useState } from "react";
import { alta } from "@/content/catalogo";

/* "Cuánto tiempo se te va agendando" (11-10-2026). La idea viene del análisis
   de Yeasy ("una cita por teléfono = 4 minutos perdidos"), con palabras y
   cuenta propias: los números los pone el dueño con los dos controles, así
   que no afirmamos ninguna cifra que no podamos sostener. 26 días = un mes
   de lunes a sábado. */
const DIAS_MES = 26;

export default function TiempoPerdido({ origen = "home" }: { origen?: string }) {
  const [citas, setCitas] = useState(20);
  const [min, setMin] = useState(3);
  const minDia = citas * min;
  const horasMes = Math.round((minDia * DIAS_MES) / 60);
  const fmtDia = minDia >= 60 ? `${Math.floor(minDia / 60)} h ${minDia % 60 ? `${minDia % 60} min` : ""}`.trim() : `${minDia} min`;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="rounded-[28px] bg-ink text-white p-6 sm:p-10 md:p-14 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div>
            <p className="text-lime text-[13px] font-semibold uppercase tracking-[0.14em] mb-4">Haz la cuenta</p>
            <h2 className="!text-white !text-[clamp(1.9rem,3.6vw,3rem)] leading-tight">
              Cada cita que agendas por WhatsApp o por teléfono es tiempo que no estás cortando.
            </h2>
            <p className="text-white/70 text-lg mt-5 leading-relaxed max-w-xl">
              Responder, ofrecer horas, esperar la respuesta, confirmar. Mueve los controles con los números de tu local.
            </p>
            <div className="mt-8 space-y-7 max-w-md">
              <label className="block">
                <span className="flex justify-between text-[15px] font-semibold"><span>Citas al día</span><span className="text-lime tabular-nums">{citas}</span></span>
                <input type="range" min={4} max={60} step={1} value={citas} onChange={(e) => setCitas(Number(e.target.value))}
                  className="w-full mt-3 accent-lime" aria-label="Citas al día" />
              </label>
              <label className="block">
                <span className="flex justify-between text-[15px] font-semibold"><span>Minutos que te toma agendar cada una</span><span className="text-lime tabular-nums">{min}</span></span>
                <input type="range" min={1} max={8} step={1} value={min} onChange={(e) => setMin(Number(e.target.value))}
                  className="w-full mt-3 accent-lime" aria-label="Minutos por cita" />
              </label>
            </div>
          </div>
          <div className="rounded-[24px] bg-white/[0.06] border border-white/10 p-7 sm:p-9">
            <p className="text-white/60 text-[15px]">Al día se te van</p>
            <p className="font-display font-bold text-4xl sm:text-5xl tracking-tight mt-1 tabular-nums">{fmtDia}</p>
            <p className="text-white/60 text-[15px] mt-6">Al mes, de lunes a sábado</p>
            <p className="font-display font-bold text-lime text-6xl sm:text-7xl tracking-tight mt-1 tabular-nums">{horasMes} horas</p>
            <p className="text-white/70 mt-6 leading-relaxed">
              Con la reserva online tus clientes eligen hora solos, y con Syna el WhatsApp se responde y agenda mientras atiendes.
            </p>
            <a href={alta(`tiempo-${origen}`)}
              className="mt-7 inline-flex justify-center items-center bg-lime text-ink font-semibold px-7 py-4 rounded-full hover:bg-white transition-colors">
              Pruébalo 1 mes gratis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

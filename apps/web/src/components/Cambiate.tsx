"use client";
import { useState } from "react";
import { AGENDAPRO, PLANES, fmt } from "@/content/precios";
import { waLink } from "@/content/catalogo";
import { BotonCapsula } from "./Capsulas";

/* "Cámbiate desde AgendaPro": mudanza sin costo + comparación de precio por
   número de profesionales. Los precios de AgendaPro salen de
   content/precios.ts (AGENDAPRO), con su fuente y fecha a la vista: si se
   publican, se publican verificables. Con 1 profesional AgendaPro es más
   barato, y la tabla lo dice tal cual. */

const MUDANZA = [
  "Tus clientes con su historial",
  "Tus servicios, precios y duraciones",
  "Tus productos",
  "Tu equipo con sus horarios",
];

export default function Cambiate() {
  const [n, setN] = useState(6);
  const nuestro = PLANES[0].mes;
  const suyo = AGENDAPRO.precio(n);
  const dif = suyo - nuestro;

  return (
    <section id="cambiate" className="py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <p className="eyebrow mb-4">Cámbiate sin perder a nadie</p>
          <h2 className="text-ink">¿Vienes de AgendaPro u otra agenda? Te mudamos gratis.</h2>
          <p className="text-text-secondary text-lg mt-5 leading-relaxed">
            Traemos todo lo que tienes y tu local sigue atendiendo mientras tanto. Ya
            migramos casi 29 mil fichas de clientes.
          </p>
          <ul className="mt-7 grid sm:grid-cols-2 gap-3">
            {MUDANZA.map((m) => (
              <li key={m} className="flex items-center gap-3 bg-mist rounded-2xl px-4 py-3.5 font-semibold text-ink">
                <span className="w-7 h-7 shrink-0 rounded-full bg-lime flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {m}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4 mt-8">
            <a href={waLink("Hola, quiero cambiarme a SynapTech y que me ayuden con la mudanza")} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center bg-ink text-white font-semibold px-6 py-3.5 rounded-full hover:bg-black transition-colors">
              Quiero cambiarme
            </a>
            <BotonCapsula id="reel-migracion-agendapro" texto="Así es la mudanza" />
          </div>
          <p className="text-xs text-text-muted mt-4">28.978 fichas de clientes importadas a la plataforma al 4 de octubre de 2026.</p>
        </div>

        <div className="rounded-[28px] bg-ink text-white p-7 sm:p-10">
          <p className="text-lime text-xs font-bold uppercase tracking-[0.12em]">Compara tu mensualidad</p>
          <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mt-2">¿Cuántos profesionales trabajan en tu local?</h3>

          <div className="mt-7">
            <div className="flex items-baseline justify-between">
              <label htmlFor="profesionales" className="text-white/70">Profesionales</label>
              <span className="font-display font-bold text-4xl text-lime" aria-live="polite">{n}</span>
            </div>
            <input id="profesionales" type="range" min={1} max={15} value={n} onChange={(e) => setN(Number(e.target.value))}
              className="w-full mt-3 accent-[#9CCC3C] h-2 cursor-pointer" />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/[0.06] p-5">
              <p className="text-sm text-white/60">AgendaPro {AGENDAPRO.plan(n)}</p>
              <p className="font-display font-bold text-3xl tracking-tight mt-1">{fmt(suyo)}</p>
              <p className="text-xs text-white/50 mt-1">+ IVA al mes</p>
            </div>
            <div className="rounded-2xl bg-lime text-ink p-5">
              <p className="text-sm text-ink/70">SynapTech Básico</p>
              <p className="font-display font-bold text-3xl tracking-tight mt-1">{fmt(nuestro)}</p>
              <p className="text-xs text-ink/60 mt-1">+ IVA al mes, con profesionales ilimitados</p>
            </div>
          </div>

          <p className="mt-6 text-lg leading-snug min-h-[3.5rem]">
            {dif > 0 ? (
              <>Con {n} profesionales te ahorras <span className="text-lime font-bold">{fmt(dif)} al mes</span>, {fmt(dif * 12)} al año.</>
            ) : (
              <>Si trabajas solo, el plan Individual de AgendaPro cuesta menos. Desde 2 profesionales, SynapTech no cobra por cada uno.</>
            )}
          </p>
          <p className="text-xs text-white/45 mt-5 leading-relaxed">
            Precios netos mensuales publicados en {AGENDAPRO.fuente}, consultados el {AGENDAPRO.fecha}: Individual
            {" "}{fmt(15900)} con 1 profesional y Básico {fmt(34900)} con 2 profesionales más {fmt(5000)} por cada
            profesional extra. Pueden cambiar; revísalos en su sitio.
          </p>
        </div>
      </div>
    </section>
  );
}

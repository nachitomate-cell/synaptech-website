import Link from "next/link";
import type { Metadata } from "next";
import { CASES_DATA } from "./data";

export const metadata: Metadata = {
  title: "Casos de Éxito — Synaptech",
  description:
    "Proyectos reales en producción: HealthTech, retail, educación y belleza. Conoce cómo Synaptech transforma operaciones con software a medida.",
};

const ACCENT_BG: Record<string, string> = {
  "#10b981": "rgba(16,185,129,0.08)",
  "#f59e0b": "rgba(245,158,11,0.08)",
  "#3b82f6": "rgba(59,130,246,0.08)",
  "#8b5cf6": "rgba(139,92,246,0.08)",
  "#f43f5e": "rgba(244,63,94,0.08)",
};

export default function CasosPage() {
  return (
    <main className="min-h-screen bg-bg-primary pt-28 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <Link href="/#casos" className="inline-flex items-center gap-2 font-mono text-[11px] text-text-muted hover:text-accent transition-colors mb-6">
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 8H3M7 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver al inicio
          </Link>
          <p className="eyebrow mb-5">Casos de Éxito</p>
          <h1 className="text-text-primary max-w-2xl">
            Proyectos reales,{" "}
            <em className="italic text-accent not-italic font-display">en producción</em>.
          </h1>
          <p className="mt-5 text-text-secondary text-lg max-w-xl leading-relaxed font-body">
            Cinco industrias, cinco soluciones a medida. Cada proyecto parte de un diagnóstico
            real y termina en un sistema que opera día a día.
          </p>
        </div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CASES_DATA.map((c, i) => (
            <Link
              key={c.slug}
              href={`/casos/${c.slug}`}
              className={`group block bg-bg-secondary border border-border-subtle rounded-2xl p-8 hover:border-accent/30 transition-all hover:-translate-y-1 duration-200 ${i === 0 ? "md:col-span-2" : ""}`}
              style={{ background: ACCENT_BG[c.accentColor] ?? undefined }}
            >
              <div className="flex flex-col gap-4 h-full">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">{c.sector}</span>
                    <h2 className="font-display text-xl font-semibold text-text-primary mt-1.5 leading-snug">
                      {c.titulo}
                    </h2>
                  </div>
                  <span
                    className="shrink-0 font-mono text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                    style={{ color: c.accentColor, borderColor: `${c.accentColor}40`, background: `${c.accentColor}12` }}
                  >
                    {c.estado}
                  </span>
                </div>

                <p className="font-mono text-[11px] text-text-muted">{c.cliente}</p>

                <p className="text-sm text-text-secondary leading-relaxed">{c.descripcion}</p>

                <div className="flex flex-wrap gap-1.5 mt-1">
                  {c.stack.map((t) => (
                    <span key={t} className="font-mono text-[10px] text-text-muted border border-border-subtle px-2.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-2 flex items-center gap-1.5 text-sm font-medium group-hover:gap-3 transition-all"
                  style={{ color: c.accentColor }}>
                  Ver caso completo
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center border border-border-subtle rounded-2xl p-12 bg-bg-secondary">
          <p className="eyebrow mb-4">¿Tienes un proyecto similar?</p>
          <h2 className="text-text-primary mb-6 max-w-lg mx-auto">
            Conversemos sobre{" "}
            <em className="italic text-accent not-italic font-display">tu desafío</em>.
          </h2>
          <a
            href="/#diagnostico"
            className="inline-flex items-center gap-2 bg-accent text-black font-bold text-sm px-7 py-3.5 rounded-lg shadow-lime hover:bg-accent-dim hover:text-white hover:scale-[1.02] transition-all"
          >
            Diagnóstico Gratis
          </a>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASES_DATA } from "../data";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return CASES_DATA.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const caso = CASES_DATA.find((c) => c.slug === params.slug);
  if (!caso) return {};
  return {
    title: `${caso.titulo} — ${caso.cliente} · Synaptech`,
    description: caso.descripcion,
  };
}

export default function CasoPage({ params }: Props) {
  const caso = CASES_DATA.find((c) => c.slug === params.slug);
  if (!caso) notFound();

  return (
    <main className="min-h-screen bg-bg-primary pt-28 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted mb-10">
          <Link href="/" className="hover:text-accent transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/casos" className="hover:text-accent transition-colors">Casos</Link>
          <span>/</span>
          <span className="text-text-primary">{caso.cliente}</span>
        </div>

        {/* Hero */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted border border-border-subtle px-3 py-1 rounded-full">
              {caso.sector}
            </span>
            <span
              className="font-mono text-[10px] font-semibold px-3 py-1 rounded-full border"
              style={{ color: caso.accentColor, borderColor: `${caso.accentColor}40`, background: `${caso.accentColor}12` }}
            >
              {caso.estado}
            </span>
            <span className="font-mono text-[10px] text-text-muted">desde {caso.año}</span>
          </div>

          <h1 className="text-text-primary mb-4 max-w-3xl">{caso.titulo}</h1>
          <p className="font-mono text-sm text-text-muted">{caso.cliente}</p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* Descripción */}
            <section>
              <p className="eyebrow mb-4">El proyecto</p>
              <p className="text-text-secondary text-lg leading-relaxed font-body">{caso.descripcion}</p>
            </section>

            {/* Problema */}
            <section className="bg-bg-secondary border border-border-subtle rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="6.5"/>
                    <path d="M8 5v4M8 11v.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h2 className="font-display text-lg font-semibold text-text-primary">El desafío</h2>
              </div>
              <p className="text-text-secondary leading-relaxed font-body">{caso.problema}</p>
            </section>

            {/* Solución */}
            <section className="bg-bg-secondary border border-border-subtle rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center border"
                  style={{ background: `${caso.accentColor}15`, borderColor: `${caso.accentColor}30` }}>
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                    style={{ color: caso.accentColor }}>
                    <path d="M13 4 6 11l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="font-display text-lg font-semibold text-text-primary">La solución</h2>
              </div>
              <p className="text-text-secondary leading-relaxed font-body">{caso.solucion}</p>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            {/* Stack */}
            <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-4">Stack tecnológico</h3>
              <div className="flex flex-col gap-2.5">
                {caso.stack.map((t) => (
                  <div key={t} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: caso.accentColor }} />
                    <span className="font-mono text-sm text-text-primary">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Estado */}
            <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-4">Estado actual</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shadow-[0_0_6px_rgba(163,230,53,0.6)]" style={{ background: caso.accentColor }} />
                <span className="font-mono text-sm text-text-primary">{caso.estado}</span>
              </div>
              <p className="font-mono text-[11px] text-text-muted mt-2">Operando desde {caso.año}</p>
            </div>

            {/* CTA sidebar */}
            <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-6">
              <p className="font-mono text-xs text-text-muted mb-3 leading-relaxed">
                ¿Tienes un desafío similar?
              </p>
              <a
                href="/#diagnostico"
                className="block w-full text-center bg-accent text-black font-bold text-sm px-5 py-3 rounded-lg hover:bg-accent-dim hover:text-white transition-all shadow-lime"
              >
                Diagnóstico Gratis
              </a>
            </div>
          </aside>
        </div>

        {/* Navigation between cases */}
        <div className="border-t border-border-subtle pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/casos"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-muted hover:text-accent transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 8H3M7 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Ver todos los casos
          </Link>
          <a href="/#contacto"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-muted hover:text-accent transition-colors">
            Conversar sobre un proyecto
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}

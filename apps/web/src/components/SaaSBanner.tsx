import Link from "next/link";

export default function SaaSBanner() {
  return (
    <div className="border-y border-accent/20 bg-accent/[0.03]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          <div className="shrink-0 w-7 h-7 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2v6l4 4-4 4v6M18 2v6l-4 4 4 4v6"/>
            </svg>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest">Producto</span>
            <span className="font-mono text-[10px] text-border-subtle">·</span>
            <span className="text-sm font-semibold text-text-primary">Agenda Profesional para Barberías</span>
            <span className="hidden sm:inline font-mono text-[10px] text-border-subtle">—</span>
            <span className="hidden sm:inline font-mono text-[11px] text-text-muted">1.341 clientes · 12 locales · 1er mes gratis</span>
          </div>
        </div>

        <Link
          href="/saas-comercial"
          className="shrink-0 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent
            border border-accent/30 rounded-lg px-4 py-2 hover:bg-accent hover:text-black transition-all"
        >
          Ver plataforma
          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

      </div>
    </div>
  );
}

import Image from "next/image";

const LINKS = {
  "Empresa":   [{ l: "Servicios", h: "#servicios" }, { l: "Metodología", h: "#metodologia" }, { l: "Casos de éxito", h: "#casos" }],
  "Recursos":  [{ l: "Intelligence Unit", h: "#blog" }, { l: "Diagnóstico Gratis", h: "#diagnostico" }, { l: "Acceso Clientes", h: "#acceso" }],
  "Contacto":  [{ l: "hola@synaptech.cl", h: "mailto:hola@synaptech.cl" }, { l: "Viña del Mar, Chile", h: "#contacto" }],
};

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-subtle">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 mb-14">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <Image src="/assets/synaptech-icon.png" alt="" width={28} height={28}
                className="opacity-80 filter brightness-0 invert" />
              <span className="font-mono font-semibold text-[17px] text-text-primary">synaptech</span>
            </div>
            <p className="font-mono text-xs text-text-muted leading-relaxed max-w-xs">
              Tecnología con Alma Digital. Agencia chilena de software a medida,
              IA y automatización para empresas B2B.
            </p>
            <div className="flex gap-3 mt-2">
              {[
                { label: "LinkedIn", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01 M7.55 4h8.9A3.55 3.55 0 0 1 20 7.55v8.9A3.55 3.55 0 0 1 16.45 20H7.55A3.55 3.55 0 0 1 4 16.45V7.55A3.55 3.55 0 0 1 7.55 4z" },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-border-subtle flex items-center justify-center text-text-muted hover:border-accent/40 hover:text-accent transition-all">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={s.path} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h6 className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-text-primary mb-5">
                {heading}
              </h6>
              <ul className="flex flex-col gap-3">
                {links.map(l => (
                  <li key={l.l}>
                    <a href={l.h}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors font-body">
                      {l.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-subtle pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-text-muted">
            © {YEAR} Synaptech SpA · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
            <span className="font-mono text-[11px] text-text-muted">Sistemas operativos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

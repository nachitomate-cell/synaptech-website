import Image from "next/image";

const LINKS = {
  "Empresa":   [{ l: "Servicios", h: "#servicios" }, { l: "Metodología", h: "#proceso" }, { l: "Casos de éxito", h: "/casos" }],
  "Recursos":  [{ l: "Diagnóstico Gratis", h: "#diagnostico" }, { l: "Precios", h: "#inversion" }, { l: "FAQ", h: "#faq" }, { l: "Contacto", h: "#contacto" }],
  "Contacto":  [
    { l: "hola@synaptech.cl", h: "mailto:hola@synaptech.cl" },
    { l: "+569 83568212", h: "tel:+56983568212" },
    { l: "Viña del Mar, Valparaíso, Chile", h: "#contacto" },
  ],
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
              <a href="https://wa.me/56983568212" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg border border-border-subtle flex items-center justify-center text-text-muted hover:border-accent/40 hover:text-accent transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a href="https://instagram.com/synaptechspa" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-lg border border-border-subtle flex items-center justify-center text-text-muted hover:border-accent/40 hover:text-accent transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
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
          <div className="flex items-center gap-4">
            <a href="/privacidad" className="font-mono text-[11px] text-text-muted hover:text-accent transition-colors">Privacidad</a>
            <a href="/terminos" className="font-mono text-[11px] text-text-muted hover:text-accent transition-colors">Términos</a>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
              <span className="font-mono text-[11px] text-text-muted">Sistemas operativos</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

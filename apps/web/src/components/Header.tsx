"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FAMILIAS, RUBROS, SIGNUP_URL } from "@/content/catalogo";

/* Menú al estilo Square: cada familia abre un panel ancho con todo lo que
   contiene. Los productos y rubros salen de content/catalogo.ts, el mismo
   catálogo que pinta la home y el footer. */

type Panel = "productos" | "rubros" | "recursos" | null;

const RECURSOS = [
  { label: "Encuentra un local", desc: "Barberías y salones con reserva online", href: "/locales" },
  { label: "Cómo funciona",  desc: "Cada módulo, paso a paso, con capturas reales", href: "/como-funciona" },
  { label: "Cápsulas en video", desc: "Todo el panel en videos de menos de 2 minutos", href: "/como-funciona#capsulas" },
  { label: "Blog",           desc: "Guías para hacer crecer tu local", href: "/blog" },
  { label: "Clientes",       desc: "Lo que dicen los locales que ya lo usan", href: "/#testimonios" },
  { label: "Integraciones",  desc: "Pagos, WhatsApp, SII, Wallet y más", href: "/#integraciones" },
  { label: "Preguntas frecuentes", desc: "Precios, prueba, datos y contrato", href: "/#faq" },
  { label: "Nosotros",       desc: "Quiénes somos y desde dónde trabajamos", href: "/nosotros" },
  { label: "Contacto",       desc: "Escríbenos o llámanos", href: "/contacto" },
];

const PANEL_LABELS: { id: Exclude<Panel, null>; label: string }[] = [
  { id: "productos", label: "Productos" },
  { id: "rubros",    label: "Rubros" },
  { id: "recursos",  label: "Recursos" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header() {
  const [panel, setPanel]           = useState<Panel>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub]   = useState<Panel>(null);
  const [scrolled, setScrolled]     = useState(false);
  const wrapRef  = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar todo al navegar, al hacer clic afuera y con Escape.
  useEffect(() => { setPanel(null); setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setPanel(null);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setPanel(null); setMobileOpen(false); } };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, []);

  // Sin scroll del fondo con el menú móvil abierto.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const cerrar = () => { setPanel(null); setMobileOpen(false); };

  return (
    <header ref={wrapRef}
      className={`fixed top-0 inset-x-0 z-[60] bg-white transition-shadow ${scrolled || panel ? "shadow-[0_1px_0_#E3E6DF]" : ""}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 h-16 flex items-center gap-8">

        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={cerrar}>
          <Image src="/assets/synaptech-icon.png" alt="" width={30} height={30} />
          <span className="font-display font-bold text-[19px] tracking-tight text-ink">SynapTech</span>
        </Link>

        {/* Escritorio */}
        <nav className="hidden lg:flex items-center gap-1 flex-1" aria-label="Navegación principal">
          {PANEL_LABELS.map((p) => (
            <button key={p.id}
              onClick={() => setPanel((v) => (v === p.id ? null : p.id))}
              onMouseEnter={() => panel && setPanel(p.id)}
              aria-expanded={panel === p.id}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[15px] font-medium transition-colors ${
                panel === p.id ? "bg-mist text-ink" : "text-text-secondary hover:text-ink"
              }`}>
              {p.label}<Chevron open={panel === p.id} />
            </button>
          ))}
          <Link href="/como-funciona" onClick={cerrar}
            className={`whitespace-nowrap px-3 py-2 rounded-full text-[15px] font-medium transition-colors ${pathname === "/como-funciona" ? "text-ink" : "text-text-secondary hover:text-ink"}`}>
            Cómo funciona
          </Link>
          <Link href="/precios" onClick={cerrar}
            className={`px-3 py-2 rounded-full text-[15px] font-medium transition-colors ${pathname === "/precios" ? "text-ink" : "text-text-secondary hover:text-ink"}`}>
            Precios
          </Link>
          {/* En pantallas medianas no cabe: queda dentro de Recursos. */}
          <Link href="/locales" onClick={cerrar}
            className={`hidden xl:inline-flex whitespace-nowrap px-3 py-2 rounded-full text-[15px] font-medium transition-colors ${pathname === "/locales" ? "text-ink" : "text-text-secondary hover:text-ink"}`}>
            Encuentra un local
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a href="https://app.synaptechspa.cl/"
            className="px-4 py-2 rounded-full text-[15px] font-medium text-text-secondary hover:text-ink transition-colors">
            Ingresar
          </a>
          <a href={`${SIGNUP_URL}?ref=header`}
            className="bg-ink text-white text-[15px] font-semibold px-5 py-2.5 rounded-full hover:bg-black transition-colors">
            Empezar gratis
          </a>
        </div>

        <button className="lg:hidden ml-auto p-2 -mr-2 text-ink" onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={mobileOpen}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Paneles de escritorio */}
      {panel && (
        <div className="hidden lg:block absolute inset-x-0 top-16 bg-white border-t border-border-subtle shadow-[0_24px_48px_-12px_rgba(15,26,43,0.18)]">
          <div className="max-w-screen-xl mx-auto px-10 py-8">
            {panel === "productos" && (
              <div className="grid grid-cols-5 gap-8">
                {FAMILIAS.map((f) => (
                  <div key={f.id}>
                    <Link href={`/#${f.id}`} onClick={cerrar}
                      className="block font-display font-bold text-[15px] text-ink hover:text-accent mb-3">
                      {f.nombre}
                    </Link>
                    <ul className="flex flex-col gap-3">
                      {f.items.map((it) => (
                        <li key={it.label}>
                          <Link href={`/#${f.id}`} onClick={cerrar} className="group block">
                            <span className="block text-[14px] text-text-primary group-hover:text-accent leading-snug">{it.label}</span>
                            <span className="block text-[12.5px] text-text-muted leading-snug mt-0.5">{it.desc}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {panel === "rubros" && (
              <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                {RUBROS.map((r) => (
                  <Link key={r.id} href={r.href ?? `/#rubro-${r.id}`} onClick={cerrar} className="group block">
                    <span className="block font-display font-bold text-[15px] text-ink group-hover:text-accent">{r.nombre}</span>
                    <span className="block text-[13px] text-text-muted leading-snug mt-1">{r.titular}</span>
                  </Link>
                ))}
              </div>
            )}

            {panel === "recursos" && (
              <div className="grid grid-cols-4 gap-x-8 gap-y-6">
                {RECURSOS.map((r) => (
                  <Link key={r.label} href={r.href} onClick={cerrar} className="group block">
                    <span className="block font-display font-bold text-[15px] text-ink group-hover:text-accent">{r.label}</span>
                    <span className="block text-[13px] text-text-muted leading-snug mt-1">{r.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menú móvil: pantalla completa con acordeones */}
      {mobileOpen && (
        <nav className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-white overflow-y-auto border-t border-border-subtle"
          aria-label="Navegación móvil">
          <ul className="px-4 sm:px-6 py-2">
            {PANEL_LABELS.map((p) => (
              <li key={p.id} className="border-b border-border-subtle">
                <button onClick={() => setMobileSub((v) => (v === p.id ? null : p.id))}
                  aria-expanded={mobileSub === p.id}
                  className="w-full flex items-center justify-between py-4 text-[17px] font-semibold text-ink">
                  {p.label}<Chevron open={mobileSub === p.id} />
                </button>
                {mobileSub === p.id && (
                  <div className="pb-4 flex flex-col gap-4">
                    {p.id === "productos" && FAMILIAS.map((f) => (
                      <Link key={f.id} href={`/#${f.id}`} onClick={cerrar}>
                        <span className="block font-semibold text-[15px] text-ink">{f.nombre}</span>
                        <span className="block text-[13px] text-text-muted">{f.items.map((i) => i.label).join(" · ")}</span>
                      </Link>
                    ))}
                    {p.id === "rubros" && RUBROS.map((r) => (
                      <Link key={r.id} href={r.href ?? `/#rubro-${r.id}`} onClick={cerrar}
                        className="block font-medium text-[15px] text-text-primary">{r.nombre}</Link>
                    ))}
                    {p.id === "recursos" && RECURSOS.map((r) => (
                      <Link key={r.label} href={r.href} onClick={cerrar}
                        className="block font-medium text-[15px] text-text-primary">{r.label}</Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <li className="border-b border-border-subtle">
              <Link href="/como-funciona" onClick={cerrar} className="block py-4 text-[17px] font-semibold text-ink">Cómo funciona</Link>
            </li>
            <li className="border-b border-border-subtle">
              <Link href="/precios" onClick={cerrar} className="block py-4 text-[17px] font-semibold text-ink">Precios</Link>
            </li>
            <li className="border-b border-border-subtle">
              <Link href="/locales" onClick={cerrar} className="block py-4 text-[17px] font-semibold text-ink">Encuentra un local</Link>
            </li>
          </ul>
          <div className="px-4 sm:px-6 py-6 flex flex-col gap-3">
            <a href={`${SIGNUP_URL}?ref=header-movil`}
              className="block text-center bg-ink text-white font-semibold py-3.5 rounded-full">
              Empezar gratis
            </a>
            <a href="https://app.synaptechspa.cl/"
              className="block text-center border border-border-subtle text-ink font-semibold py-3.5 rounded-full">
              Ingresar
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

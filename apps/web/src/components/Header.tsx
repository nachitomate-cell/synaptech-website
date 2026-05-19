"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_MAIN = [
  { label: "Servicios",   href: "#servicios" },
  { label: "Casos",       href: "/casos" },
  { label: "Nosotros",    href: "/nosotros" },
  { label: "Contacto",    href: "#contacto" },
];

const NAV_PRODUCTS = [
  {
    label: "Agenda Profesional",
    href: "/agenda-profesional",
    desc: "Reservas, agenda y gestión de clientes",
  },
  {
    label: "Fidelización de Clientes",
    href: "/agenda-profesional#fidelizacion",
    desc: "Sellos digitales, premios y Google Wallet",
  },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("/");
  const cls =
    "text-[13px] text-text-secondary hover:text-text-primary transition-colors font-body tracking-wide whitespace-nowrap";
  return isExternal ? (
    <Link href={href} className={cls}>{label}</Link>
  ) : (
    <a href={href} className={cls}>{label}</a>
  );
}

export default function Header() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [dropOpen, setDropOpen]       = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black/70 border-b border-border-subtle"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-6">

        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Image src="/assets/synaptech-icon.png" alt="" width={28} height={28} className="opacity-90" />
          <span className="font-mono font-semibold text-[17px] tracking-tight text-text-primary group-hover:text-accent transition-colors">
            synaptech
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_MAIN.map((n) => (
            <NavLink key={n.href} href={n.href} label={n.label} />
          ))}

          {/* Products dropdown */}
          <div ref={dropRef} className="relative">
            <button
              onClick={() => setDropOpen((v) => !v)}
              className={`flex items-center gap-1 text-[13px] font-body tracking-wide transition-colors whitespace-nowrap ${
                dropOpen ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Productos
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
                viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {dropOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-xl border border-border-subtle overflow-hidden shadow-2xl"
                style={{ background: "rgba(10,10,10,0.96)", backdropFilter: "blur(20px)" }}
              >
                <div className="p-1.5">
                  {NAV_PRODUCTS.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      onClick={() => setDropOpen(false)}
                      className="flex flex-col gap-0.5 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-[13px] font-medium text-text-primary group-hover:text-accent transition-colors">
                        {p.label}
                      </span>
                      <span className="text-[11px] text-text-muted font-mono">
                        {p.desc}
                      </span>
                    </Link>
                  ))}
                </div>
                {/* Bottom accent line */}
                <div className="h-px mx-4 mb-3 mt-1" style={{ background: "linear-gradient(90deg, transparent, rgba(163,230,53,0.3), transparent)" }} />
                <div className="px-4 pb-3">
                  <span className="font-mono text-[10px] text-text-muted/50 uppercase tracking-widest">
                    Plataformas SynapTech
                  </span>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <a
            href="mailto:hola@synaptech.cl?subject=Acceso%20Clientes"
            className="font-mono text-xs text-text-muted hover:text-accent transition-colors whitespace-nowrap"
          >
            Acceso Clientes
          </a>
          <a
            href="#diagnostico"
            className="bg-accent text-black font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-accent-dim hover:text-white hover:scale-[1.02] transition-all shadow-[0_0_18px_rgba(163,230,53,0.2)] whitespace-nowrap"
          >
            Diagnóstico Gratis
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 text-text-secondary shrink-0"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menú"
        >
          <span className={`block w-5 h-px bg-current transition-all origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-all origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-secondary border-t border-border-subtle">
          <div className="px-6 py-5 flex flex-col gap-1">
            {NAV_MAIN.map((n) => (
              n.href.startsWith("/") ? (
                <Link key={n.href} href={n.href} onClick={() => setMobileOpen(false)}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors py-2.5 border-b border-border-subtle/50">
                  {n.label}
                </Link>
              ) : (
                <a key={n.href} href={n.href} onClick={() => setMobileOpen(false)}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors py-2.5 border-b border-border-subtle/50">
                  {n.label}
                </a>
              )
            ))}

            {/* Products group in mobile */}
            <div className="pt-1">
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted/60 pt-2 pb-3">
                Productos
              </p>
              {NAV_PRODUCTS.map((p) => (
                <Link key={p.href} href={p.href} onClick={() => setMobileOpen(false)}
                  className="flex flex-col gap-0.5 py-2.5 border-b border-border-subtle/50 group">
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    {p.label}
                  </span>
                  <span className="font-mono text-[10px] text-text-muted/60">{p.desc}</span>
                </Link>
              ))}
            </div>

            <a href="#diagnostico" onClick={() => setMobileOpen(false)}
              className="bg-accent text-black font-bold text-sm px-5 py-3 rounded-lg text-center mt-3">
              Diagnóstico Gratis
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

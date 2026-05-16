"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV = [
  { label: "Servicios",              href: "#servicios" },
  { label: "Metodología",            href: "#metodologia" },
  { label: "Casos",                  href: "/casos" },
  { label: "Agenda Profesional",     href: "/agenda-profesional" },
  { label: "Fidelización de Clientes", href: "/agenda-profesional#fidelizacion" },
  { label: "Contacto",               href: "#contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black/70 border-b border-border-subtle"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-8">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Image src="/assets/synaptech-icon.png" alt="" width={28} height={28} className="opacity-90" />
          <span className="font-mono font-semibold text-[17px] tracking-tight text-text-primary group-hover:text-accent transition-colors">
            synaptech
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) =>
            n.href.startsWith("/") ? (
              <Link key={n.href} href={n.href}
                className="text-[13px] text-text-secondary hover:text-text-primary transition-colors font-body tracking-wide">
                {n.label}
              </Link>
            ) : (
              <a key={n.href} href={n.href}
                className="text-[13px] text-text-secondary hover:text-text-primary transition-colors font-body tracking-wide">
                {n.label}
              </a>
            )
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <a href="mailto:hola@synaptech.cl?subject=Acceso%20Clientes" className="font-mono text-xs text-text-muted hover:text-accent transition-colors">
            Acceso Clientes
          </a>
          <a href="#diagnostico"
            className="bg-accent text-black font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-accent-dim hover:text-white hover:scale-[1.02] transition-all shadow-lime">
            Diagnóstico Gratis
          </a>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2 text-text-secondary"
          onClick={() => setOpen(!open)} aria-label="Menú">
          <span className={`block w-5 h-px bg-current transition-all origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-all origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-bg-secondary border-t border-border-subtle px-6 py-5 flex flex-col gap-5">
          {NAV.map((n) =>
            n.href.startsWith("/") ? (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                {n.label}
              </Link>
            ) : (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                {n.label}
              </a>
            )
          )}
          <a href="#diagnostico" onClick={() => setOpen(false)}
            className="bg-accent text-black font-bold text-sm px-5 py-3 rounded-lg text-center mt-1">
            Diagnóstico Gratis
          </a>
        </div>
      )}
    </header>
  );
}

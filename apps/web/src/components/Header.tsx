"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_MAIN = [
  { label: "Precios",     href: "#precios" },
  { label: "Barberías",   href: "/saas-comercial", accent: true },
  { label: "Casos",       href: "/casos" },
  { label: "Blog",        href: "/blog" },
  { label: "Nosotros",    href: "/nosotros" },
  { label: "Contacto",    href: "/contacto" },
];

const NAV_PRODUCTS = [
  {
    label: "Portales Clínicos",
    href: "/portales-clinicos",
    desc: "Gestión médica y portal de pacientes",
  },
  {
    label: "SaaS Comercial",
    href: "/saas-comercial",
    desc: "Reservas, agenda y gestión de clientes",
  },
  {
    label: "Fidelización de Clientes",
    href: "/fidelizacion",
    desc: "Sellos digitales, premios y Google Wallet",
  },
];

export default function Header() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [dropOpen, setDropOpen]         = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const dropRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

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

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("#")) return activeSection === href.slice(1);
    return pathname === href || pathname.startsWith(href + "/");
  };

  const linkCls = (href: string, accent?: boolean) =>
    `text-[13px] font-body tracking-wide whitespace-nowrap transition-colors ${
      isActive(href)
        ? "text-accent"
        : accent
        ? "text-accent/80 hover:text-accent font-semibold"
        : "text-text-secondary hover:text-text-primary"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black/70 border-b border-border-subtle"
          : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-accent opacity-70"
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-6">

        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Image src="/assets/synaptech-icon.png" alt="" width={28} height={28} className="opacity-90" />
          <span className="font-mono font-semibold text-[17px] tracking-tight text-text-primary group-hover:text-accent transition-colors">
            synaptech
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal">
          <ul className="flex items-center gap-6 m-0 p-0 list-none">
            {NAV_MAIN.map((n) => (
              <li key={n.href}>
                {n.href.startsWith("/") ? (
                  <Link href={n.href} className={linkCls(n.href, n.accent)}>{n.label}</Link>
                ) : (
                  <a href={n.href} className={linkCls(n.href, n.accent)}>{n.label}</a>
                )}
              </li>
            ))}

            {/* Products dropdown */}
            <li ref={dropRef} className="relative">
              <button
                onClick={() => setDropOpen((v) => !v)}
                className={`flex items-center gap-1 text-[13px] font-body tracking-wide transition-colors whitespace-nowrap ${
                  dropOpen ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                }`}
                aria-expanded={dropOpen}
                aria-haspopup="true"
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
                  <ul className="p-1.5 list-none m-0">
                    {NAV_PRODUCTS.map((p) => (
                      <li key={p.href}>
                        <Link
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
                      </li>
                    ))}
                  </ul>
                  <div className="h-px mx-4 mb-3 mt-1" style={{ background: "linear-gradient(90deg, transparent, rgba(163,230,53,0.3), transparent)" }} />
                  <div className="px-4 pb-3">
                    <span className="font-mono text-[10px] text-text-muted/50 uppercase tracking-widest">
                      Plataformas SynapTech
                    </span>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <a
            href="mailto:hola@synaptechspa.cl?subject=Acceso%20Clientes"
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
        <nav className="md:hidden bg-bg-secondary border-t border-border-subtle" aria-label="Navegación móvil">
          <ul className="px-6 py-5 flex flex-col gap-1 list-none m-0">
            {NAV_MAIN.map((n) => (
              <li key={n.href}>
                {n.href.startsWith("/") ? (
                  <Link href={n.href} onClick={() => setMobileOpen(false)}
                    className={`block text-sm transition-colors py-2.5 border-b border-border-subtle/50 ${isActive(n.href) ? "text-accent" : n.accent ? "text-accent/80 font-semibold hover:text-accent" : "text-text-secondary hover:text-text-primary"}`}>
                    {n.label}
                  </Link>
                ) : (
                  <a href={n.href} onClick={() => setMobileOpen(false)}
                    className={`block text-sm transition-colors py-2.5 border-b border-border-subtle/50 ${isActive(n.href) ? "text-accent" : n.accent ? "text-accent/80 font-semibold hover:text-accent" : "text-text-secondary hover:text-text-primary"}`}>
                    {n.label}
                  </a>
                )}
              </li>
            ))}

            {/* Products group in mobile */}
            <li className="pt-1">
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted/60 pt-2 pb-3 m-0">
                Productos
              </p>
              <ul className="flex flex-col list-none m-0 p-0">
                {NAV_PRODUCTS.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} onClick={() => setMobileOpen(false)}
                      className="flex flex-col gap-0.5 py-2.5 border-b border-border-subtle/50 group">
                      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                        {p.label}
                      </span>
                      <span className="font-mono text-[10px] text-text-muted/60">{p.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="mt-3">
              <a href="#diagnostico" onClick={() => setMobileOpen(false)}
                className="block bg-accent text-black font-bold text-sm px-5 py-3 rounded-lg text-center">
                Diagnóstico Gratis
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

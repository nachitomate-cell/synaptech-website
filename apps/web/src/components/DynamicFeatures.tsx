"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const MODULES = [
  { id: "agenda",   name: "Agenda",   label: "Vista del día dividida en Mañana / Tarde",  img: "/agenda.png"   },
  { id: "chat",     name: "Chat",     label: "Mensajería interna con tus clientes",        img: "/chat.png"     },
  { id: "clientes", name: "Clientes", label: "CRM con historial de visitas y contacto",    img: "/clientes.png" },
  { id: "equipo",   name: "Equipo",   label: "Gestión de barberos, fotos y horarios",      img: "/equipo.png"   },
  { id: "look",     name: "Look",     label: "Estilos destacados para la sala de espera",  img: "/look.png"     },
  { id: "lookbook", name: "Lookbook", label: "Galería gestionable desde el panel admin",   img: "/lookbook.png" },
];

export default function DynamicFeatures() {
  const [active, setActive] = useState(MODULES[0]);

  return (
    <section className="py-24 border-t border-border-subtle">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="eyebrow mb-5">Módulos en acción</p>
          <h2 className="text-text-primary mb-4">
            Cada pantalla,{" "}
            <em className="text-accent not-italic font-display">pensada</em>
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Explorá cada módulo y ve cómo se ve en la plataforma real.
          </p>
        </div>

        {/* Desktop layout: list left + image right */}
        <div className="hidden md:grid md:grid-cols-[280px_1fr] gap-6 items-stretch">

          {/* Module list */}
          <div className="flex flex-col gap-1.5">
            {MODULES.map((m) => {
              const isActive = m.id === active.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActive(m)}
                  className={`group text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                    isActive
                      ? "border-accent/40 bg-accent/5 shadow-[0_0_20px_-8px_rgba(163,230,53,0.35)]"
                      : "border-border-subtle bg-transparent hover:border-accent/20 hover:bg-bg-elevated"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Active indicator dot */}
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${
                        isActive ? "bg-accent scale-125" : "bg-border-subtle group-hover:bg-accent/40"
                      }`}
                    />
                    <div className="min-w-0">
                      <p
                        className={`font-mono font-semibold text-sm transition-colors duration-200 ${
                          isActive ? "text-accent" : "text-text-secondary group-hover:text-text-primary"
                        }`}
                      >
                        {m.name}
                      </p>
                      <p
                        className={`text-[11px] leading-snug mt-0.5 transition-colors duration-200 truncate ${
                          isActive ? "text-text-secondary" : "text-text-muted"
                        }`}
                      >
                        {m.label}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Image display */}
          <div className="relative bracket bg-bg-elevated border border-border-subtle rounded-2xl overflow-hidden min-h-[420px]">
            {/* Corner label */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                {active.name}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.img}
                  alt={active.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 70vw"
                  priority
                />
                {/* Subtle bottom gradient so the image fades into the bg */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-elevated to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile layout: horizontal slider + image below */}
        <div className="md:hidden flex flex-col gap-5">

          {/* Horizontal pill slider */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {MODULES.map((m) => {
              const isActive = m.id === active.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActive(m)}
                  className={`snap-start shrink-0 px-4 py-2 rounded-full border font-mono text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border-subtle text-text-muted bg-transparent"
                  }`}
                >
                  {m.name}
                </button>
              );
            })}
          </div>

          {/* Active label on mobile */}
          <p className="font-mono text-[11px] text-text-muted uppercase tracking-widest px-1">
            {active.label}
          </p>

          {/* Image */}
          <div className="relative bracket bg-bg-elevated border border-border-subtle rounded-2xl overflow-hidden aspect-[4/3]">
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                {active.name}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.img}
                  alt={active.name}
                  fill
                  className="object-cover object-top"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-bg-elevated to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}

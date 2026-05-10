"use client";
import { motion } from "framer-motion";
import NeuralCanvas from "./NeuralCanvas";

const METRICS = [
  { value: "+50",  label: "proyectos" },
  { value: "98%",  label: "retención" },
  { value: "3",    label: "países" },
  { value: "4",    label: "industrias" },
];

const rise = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Ambient radial */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% -5%, rgba(163,230,53,0.07), transparent 60%)" }} />
      {/* Grid texture */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(#27272a 1px,transparent 1px),linear-gradient(90deg,#27272a 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

      {/* Main grid */}
      <div className="relative z-10 flex-1 flex items-center max-w-screen-xl mx-auto w-full px-6 md:px-12 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 w-full items-center">

          {/* Left: copy */}
          <div>
            <motion.p {...rise(0)} className="eyebrow mb-7">
              Viña del Mar · Chile · Software B2B
            </motion.p>

            <motion.h1 {...rise(0.1)} className="text-text-primary mb-8">
              Tecnología con{" "}
              <em className="italic text-accent not-italic font-display">
                Alma
              </em>{" "}
              Digital
            </motion.h1>

            <motion.p {...rise(0.22)} className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-10 font-body">
              Desarrollamos software a medida, IA y automatización para clínicas,
              retail, educación y belleza. Operaciones inteligentes desde el primer día.
            </motion.p>

            <motion.div {...rise(0.34)} className="flex flex-wrap gap-4">
              <a href="#diagnostico"
                className="inline-flex items-center gap-2 bg-accent text-black font-bold text-sm px-7 py-3.5 rounded-lg shadow-lime hover:bg-accent-dim hover:text-white hover:scale-[1.02] transition-all">
                Diagnóstico Gratis
              </a>
              <a href="#servicios"
                className="inline-flex items-center gap-2 text-text-secondary border border-border-subtle px-6 py-3.5 rounded-lg text-sm font-medium hover:border-accent/40 hover:text-text-primary transition-all">
                Conocer servicios
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right: neural canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="hidden lg:block h-[460px] rounded-2xl border border-border-subtle overflow-hidden bracket"
            style={{ background: "rgba(163,230,53,0.015)" }}
          >
            <NeuralCanvas />
          </motion.div>
        </div>
      </div>

      {/* Metrics bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 border-t border-border-subtle"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-border-subtle">
          {METRICS.map((m) => (
            <div key={m.label} className="flex flex-col items-center py-7 px-4 gap-1.5">
              <span className="font-mono font-semibold text-[2rem] leading-none text-accent">{m.value}</span>
              <span className="font-mono text-[11px] text-text-muted uppercase tracking-widest">{m.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

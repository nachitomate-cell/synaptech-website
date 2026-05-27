"use client";
import { motion, useScroll, useTransform, animate, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import NeuralCanvas from "./NeuralCanvas";

/* ── Animated counter — counts from 0 to target on viewport enter ── */
function AnimatedCount({ value }: { value: string }) {
  const ref   = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const num    = parseInt(value.replace(/\D/g, ""), 10);
    const prefix = value.match(/^\D*/)?.[0]  ?? "";
    const suffix = value.match(/\D+$/)?.[0]  ?? "";
    const ctrl   = animate(0, num, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${prefix}${Math.round(v)}${suffix}`),
    });
    return ctrl.stop;
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

const WORDS: { text: string; delay: number; accent: boolean }[] = [
  { text: "Tecnología", delay: 0.05, accent: false },
  { text: "con",        delay: 0.13, accent: false },
  { text: "Alma",       delay: 0.21, accent: true  },
  { text: "Digital",    delay: 0.29, accent: false },
];

const METRICS = [
  { value: "+5",   label: "proyectos\nentregados" },
  { value: "100%", label: "en\nproducción"        },
  { value: "4",    label: "industrias\natendidas"  },
];

const rise = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

export default function Hero() {
  const { scrollY }    = useScroll();
  const auroraY        = useTransform(scrollY, [0, 600], [0,  -90]);
  const auroraOpacity  = useTransform(scrollY, [0, 450], [1, 0.1]);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Aurora background — three drifting orbs ── */}
      <motion.div
        aria-hidden
        style={{ y: auroraY, opacity: auroraOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Primary lime orb */}
        <div style={{
          position: "absolute", top: "-28%", left: "12%",
          width: "66%", height: "66%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163,230,53,0.09) 0%, transparent 70%)",
          filter: "blur(52px)",
          animation: "aurora-drift 16s ease-in-out infinite",
        }} />
        {/* Secondary cyan orb */}
        <div style={{
          position: "absolute", top: "18%", right: "-8%",
          width: "44%", height: "54%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "aurora-drift 21s ease-in-out infinite reverse",
          animationDelay: "-8s",
        }} />
        {/* Bottom warmth orb */}
        <div style={{
          position: "absolute", bottom: "2%", left: "32%",
          width: "42%", height: "38%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163,230,53,0.04) 0%, transparent 70%)",
          filter: "blur(64px)",
          animation: "aurora-drift 13s ease-in-out infinite",
          animationDelay: "-4s",
        }} />
      </motion.div>

      {/* Grid texture */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: "linear-gradient(#27272a 1px,transparent 1px),linear-gradient(90deg,#27272a 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Main content grid ── */}
      <div className="relative z-10 flex-1 flex items-center max-w-screen-xl mx-auto w-full px-6 md:px-12 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 w-full items-center">

          {/* Left: copy */}
          <div>
            <motion.p {...rise(0)} className="eyebrow mb-7">
              Viña del Mar · Chile · Software B2B
            </motion.p>

            {/* Word-by-word blur reveal */}
            <h1 className="text-text-primary mb-8">
              {WORDS.map((w) => (
                <motion.span
                  key={w.text}
                  className={`inline-block mr-[0.22em] last:mr-0 ${
                    w.accent ? "italic text-accent font-display" : ""
                  }`}
                  initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: w.delay }}
                >
                  {w.text}
                </motion.span>
              ))}
            </h1>

            <motion.p {...rise(0.36)}
              className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-10 font-body">
              Desarrollamos software a medida, IA y automatización para clínicas,
              retail, educación y belleza. Operaciones inteligentes desde el primer día.
            </motion.p>

            <motion.div {...rise(0.46)} className="flex flex-wrap gap-4">
              <a href="#diagnostico"
                className="inline-flex items-center gap-2 bg-accent text-black font-bold text-sm px-7 py-3.5 rounded-lg shadow-lime hover:bg-accent-dim hover:text-white hover:scale-[1.02] transition-all">
                Diagnóstico Gratis
              </a>
              <a href="/saas-comercial"
                className="inline-flex items-center gap-2 text-text-secondary border border-border-subtle px-6 py-3.5 rounded-lg text-sm font-medium hover:border-accent/40 hover:text-text-primary transition-all">
                Agenda para barberías
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right: neural canvas with breathing glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="hidden lg:block h-[460px] rounded-2xl border border-border-subtle overflow-hidden bracket"
            style={{
              background: "rgba(163,230,53,0.015)",
              animation: "canvas-glow 7s ease-in-out infinite",
            }}
          >
            <NeuralCanvas />
          </motion.div>
        </div>
      </div>

      {/* ── Metrics bar with animated counters ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="relative z-10 border-t border-border-subtle"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 grid grid-cols-3 divide-x divide-border-subtle">
          {METRICS.map((m) => (
            <div key={m.label} className="flex flex-col items-center py-7 px-4 gap-1.5">
              <span className="font-mono font-semibold text-[2rem] leading-none text-accent">
                <AnimatedCount value={m.value} />
              </span>
              <span className="font-mono text-[11px] text-text-muted uppercase tracking-widest text-center whitespace-pre-line">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

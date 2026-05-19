"use client";
import { motion } from "framer-motion";

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
});

const TIMELINE = [
  {
    year: "2025",
    tag: "El origen",
    title: "Un enfermero y una hoja de cálculo",
    body: "Antes de SynapTech existía un prototipo silencioso: un dashboard financiero construido para el padre de Ignacio Mateluna. Sin título de ingeniero, sin equipo. Solo la misma precisión que la enfermería exige y la certeza de que los problemas reales merecen soluciones reales. Ese prototipo nunca llegó a producción — pero encendió algo.",
    accent: "#a3e635",
  },
  {
    year: "15 ABR 2026",
    tag: "Fundación",
    title: "SynapTech SpA. Un fundador. Cero socios.",
    body: "La empresa nace en Viña del Mar con una sola convicción: que las pymes chilenas merecen software tan ambicioso como el de las grandes ligas. Sin inversionistas, sin red de contactos corporativos. Solo una SpA, un portátil y un estándar de exigencia clínica aplicado al código.",
    accent: "#a3e635",
    highlight: true,
  },
  {
    year: "ABR 2026",
    tag: "Primer cliente",
    title: "Patio Curauma — fidelización sin fricción",
    body: "La primera llamada real. Un centro comercial quería digitalizar su programa de puntos sin obligar a nadie a descargar una app. El resultado: PWA instalable, sellos digitales en Google Wallet, notificaciones redactadas por IA y un mapa interactivo del mall. En producción desde el primer día.",
    accent: "#f59e0b",
  },
  {
    year: "MAY 2026",
    tag: "HealthTech",
    title: "ViñaMed — la clínica en el navegador",
    body: "Portal clínico con visor DICOM integrado. Médicos y tecnólogos médicos con perfiles digitales, reportes ecográficos accesibles sin instalar nada. Ignacio construyó para la salud lo que la salud le enseñó a construir: flujos precisos, sin margen de error.",
    accent: "#10b981",
  },
  {
    year: "MAY 2026",
    tag: "EdTech",
    title: "Colegio Diego Thompson — pagos al 100%",
    body: "PWA institucional con automatización de pagos Webpay. Mensualidades, eventos y comunicaciones centralizadas. Cero papel, cero morosidad invisible. Una institución que opera con la confianza de tener su flujo económico bajo control.",
    accent: "#3b82f6",
  },
  {
    year: "MAY 2026",
    tag: "Belleza · SaaS",
    title: "Elegance, Ferraza y Gitana — una arquitectura, tres marcas",
    body: "La apuesta más ambiciosa hasta la fecha: un SaaS multi-tenant que sirve a tres negocios distintos bajo un mismo sistema. Dashboard con más de 20 módulos, 15 automatizaciones serverless, agenda pública y BarberTV para la sala de espera. Todo en producción.",
    accent: "#c084fc",
  },
];

const STATS = [
  { value: "33",   unit: "días",        label: "del primer cliente\na la cuarta industria" },
  { value: "5+",   unit: "proyectos",   label: "100% en\nproducción" },
  { value: "4",    unit: "industrias",  label: "salud, retail,\neducación, belleza" },
  { value: "0",    unit: "fallos",      label: "en\nproducción" },
];

function SynapseSVG() {
  return (
    <svg viewBox="0 0 320 320" width="100%" height="100%" aria-hidden>
      <defs>
        <radialGradient id="glow-s" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(163,230,53,0.18)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="blur-s">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* Ambient glow */}
      <ellipse cx="160" cy="160" rx="140" ry="140" fill="url(#glow-s)" />

      {/* Axon lines */}
      {[
        { x1: 60,  y1: 80,  x2: 148, y2: 152 },
        { x1: 260, y1: 70,  x2: 172, y2: 150 },
        { x1: 50,  y1: 240, x2: 148, y2: 168 },
        { x1: 270, y1: 250, x2: 172, y2: 170 },
        { x1: 160, y1: 30,  x2: 160, y2: 145 },
        { x1: 160, y1: 290, x2: 160, y2: 175 },
      ].map((l, i) => (
        <line key={i} {...l}
          stroke="rgba(163,230,53,0.15)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}

      {/* Dendrite nodes */}
      {[
        { cx: 60,  cy: 80  },
        { cx: 260, cy: 70  },
        { cx: 50,  cy: 240 },
        { cx: 270, cy: 250 },
        { cx: 160, cy: 30  },
        { cx: 160, cy: 290 },
      ].map((n, i) => (
        <g key={i}>
          <circle {...n} r="12" fill="rgba(163,230,53,0.06)"
            stroke="rgba(163,230,53,0.2)" strokeWidth="1" />
          <circle {...n} r="5"  fill="rgba(163,230,53,0.35)" />
          <circle {...n} r="2"  fill="rgba(163,230,53,0.9)" />
        </g>
      ))}

      {/* Synapse gap — the moment of connection */}
      <line x1="148" y1="152" x2="172" y2="168"
        stroke="rgba(163,230,53,0)"
        strokeWidth="0"
      />
      {/* Left terminal */}
      <circle cx="148" cy="154" r="8"
        fill="rgba(163,230,53,0.12)"
        stroke="rgba(163,230,53,0.4)" strokeWidth="1.2" />
      <circle cx="148" cy="154" r="3.5" fill="rgba(163,230,53,0.8)" />

      {/* Right terminal */}
      <circle cx="172" cy="166" r="8"
        fill="rgba(163,230,53,0.12)"
        stroke="rgba(163,230,53,0.4)" strokeWidth="1.2" />
      <circle cx="172" cy="166" r="3.5" fill="rgba(163,230,53,0.8)" />

      {/* Neurotransmitter dots in the gap */}
      {[
        { cx: 155, cy: 156 },
        { cx: 160, cy: 161 },
        { cx: 165, cy: 158 },
      ].map((d, i) => (
        <circle key={i} {...d} r="2.5"
          fill="rgba(163,230,53,0.6)"
          filter="url(#blur-s)" />
      ))}

      {/* Label */}
      <text x="160" y="202"
        fill="rgba(163,230,53,0.4)"
        fontSize="7.5"
        fontFamily="var(--font-jetbrains, monospace)"
        textAnchor="middle"
        letterSpacing="0.18em"
        textDecoration="none"
      >
        SYNAPTIC CLEFT
      </text>
    </svg>
  );
}

export default function Historia() {
  return (
    <article>

      {/* ── 1. HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(163,230,53,0.06), transparent 65%)" }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#27272a 1px,transparent 1px),linear-gradient(90deg,#27272a 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="relative z-10 max-w-screen-xl mx-auto w-full px-6 md:px-12 pt-32 pb-20">
          <motion.p {...rise(0)} className="eyebrow mb-8">
            Viña del Mar · Chile · Fundada el 15 de abril de 2026
          </motion.p>

          <motion.h1 {...rise(0.1)} className="text-text-primary mb-8 max-w-4xl">
            Una sinapsis entre{" "}
            <em className="italic text-accent not-italic font-display">
              negocios
            </em>{" "}
            y su potencial.
          </motion.h1>

          <motion.p {...rise(0.22)}
            className="text-text-secondary text-xl md:text-2xl leading-relaxed max-w-2xl font-body">
            La historia de cómo un enfermero universitario decidió que la tecnología
            podía operar con la misma precisión que la medicina — y construyó una empresa para demostrarlo.
          </motion.p>
        </div>
      </section>

      {/* ── 2. ORIGEN PERSONAL ── */}
      <section className="py-28 border-t border-border-subtle">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-20 items-center">

          <div>
            <motion.p {...rise(0)} className="eyebrow mb-6">El fundador</motion.p>
            <motion.h2 {...rise(0.1)} className="text-text-primary mb-8 max-w-xl">
              Ignacio Mateluna
            </motion.h2>

            <motion.div {...rise(0.18)} className="space-y-5 text-text-secondary text-lg leading-relaxed max-w-xl font-body">
              <p>
                Enfermero universitario de formación. Desarrollador de software por convicción.
                El mismo rigor que exige un procedimiento clínico — atención al detalle,
                tolerancia cero al error, claridad bajo presión — es el que aplica a cada línea
                de código que sale de SynapTech.
              </p>
              <p>
                Todo comenzó con un problema concreto: su padre necesitaba una herramienta
                para gestionar sus finanzas. No había nada que se ajustara exactamente a lo que
                necesitaba, así que Ignacio construyó un prototipo. Ese primer dashboard nunca
                llegó a producción, pero plantó una pregunta que no desapareció:
              </p>
              <p className="border-l-2 border-accent/50 pl-5 text-text-primary font-medium">
                ¿Cuántos negocios están operando con herramientas que no fueron hechas para ellos?
              </p>
              <p>
                La respuesta era: demasiados. SynapTech nació para cambiar eso.
              </p>
            </motion.div>
          </div>

          {/* Synapse visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="bracket rounded-2xl border border-border-subtle overflow-hidden aspect-square"
            style={{ background: "rgba(163,230,53,0.012)" }}
          >
            <SynapseSVG />
          </motion.div>
        </div>
      </section>

      {/* ── 3. EL NOMBRE ── */}
      <section className="py-24 border-t border-border-subtle"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(163,230,53,0.025) 50%, transparent 100%)" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 max-w-3xl">
          <motion.p {...rise(0)} className="eyebrow mb-7">Por qué SynapTech</motion.p>

          <motion.h2 {...rise(0.1)} className="text-text-primary mb-10">
            La sinapsis es el{" "}
            <em className="italic text-accent not-italic">instante</em>{" "}
            donde todo ocurre.
          </motion.h2>

          <div className="space-y-6 text-text-secondary text-lg leading-relaxed font-body">
            <motion.p {...rise(0.18)}>
              En el sistema nervioso, la <strong className="text-text-primary font-medium">sinapsis</strong> es
              el espacio entre dos neuronas donde se transmite la señal. No es una conexión física —
              es un salto. Un acto de comunicación preciso e instantáneo que, multiplicado
              por miles de millones, genera pensamiento, movimiento, vida.
            </motion.p>
            <motion.p {...rise(0.24)}>
              Sin sinapsis, un cuerpo es solo materia inerte. Lo mismo ocurre con un negocio
              sin la tecnología adecuada: los datos no hablan entre sí, los procesos no se anticipan,
              las personas operan por intuición en lugar de inteligencia.
            </motion.p>
            <motion.p {...rise(0.3)}>
              <strong className="text-text-primary font-medium">SynapTech es esa conexión.</strong>{" "}
              El punto donde la tecnología deja de ser una herramienta y se convierte
              en el sistema nervioso del negocio — algo que piensa, anticipa y actúa.
              Un nombre nacido de la formación médica de su fundador y de la convicción
              de que los mejores sistemas, biológicos o digitales, funcionan igual:
              con señales claras, conexiones precisas y cero tolerancia al error.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── 4. TIMELINE ── */}
      <section className="py-28 border-t border-border-subtle">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <motion.p {...rise(0)} className="eyebrow mb-5">Cronología</motion.p>
          <motion.h2 {...rise(0.08)} className="text-text-primary mb-20 max-w-xl">
            33 días.{" "}
            <em className="italic text-accent not-italic">Cuatro industrias.</em>
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] md:left-[calc(50%-1px)] top-0 bottom-0 w-px bg-border-subtle" />

            <div className="space-y-16">
              {TIMELINE.map((item, i) => {
                const isRight = i % 2 !== 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isRight ? 24 : -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                    className={`relative flex flex-col md:flex-row ${isRight ? "md:flex-row-reverse" : ""} gap-8 md:gap-0`}
                  >
                    {/* Dot */}
                    <div className="absolute left-0 md:left-1/2 top-1 md:top-3 -translate-x-[5px] md:-translate-x-1/2 z-10">
                      <span
                        className="block w-5 h-5 rounded-full border-2 border-bg-primary"
                        style={{
                          background: item.highlight ? item.accent : "rgba(163,230,53,0.3)",
                          boxShadow: item.highlight ? `0 0 14px ${item.accent}60` : "none",
                        }}
                      />
                    </div>

                    {/* Card */}
                    <div className={`pl-10 md:pl-0 md:w-[46%] ${isRight ? "md:pl-14" : "md:pr-14"}`}>
                      <div
                        className="rounded-2xl border border-border-subtle p-7 hover:border-accent/20 transition-colors"
                        style={{
                          background: item.highlight
                            ? "linear-gradient(135deg, rgba(163,230,53,0.05), rgba(163,230,53,0.02))"
                            : "rgba(17,17,17,0.6)",
                        }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className="font-mono text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded"
                            style={{
                              color: item.accent,
                              background: `${item.accent}12`,
                              border: `1px solid ${item.accent}25`,
                            }}
                          >
                            {item.tag}
                          </span>
                          <span className="font-mono text-[11px] text-text-muted">{item.year}</span>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-text-primary leading-snug mb-3">
                          {item.title}
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. STATS DE IMPACTO ── */}
      <section className="py-24 border-t border-border-subtle">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <motion.p {...rise(0)} className="eyebrow mb-5">Hoy</motion.p>
          <motion.h2 {...rise(0.08)} className="text-text-primary mb-16 max-w-xl">
            Menos de dos meses.{" "}
            <em className="italic text-accent not-italic">Cinco proyectos en producción.</em>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border-subtle border border-border-subtle rounded-2xl overflow-hidden">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                className="flex flex-col items-center py-10 px-6 gap-1 text-center"
                style={{ background: "rgba(17,17,17,0.5)" }}
              >
                <span className="font-mono font-semibold text-[2.8rem] leading-none text-accent">
                  {s.value}
                </span>
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
                  {s.unit}
                </span>
                <span className="font-mono text-[10px] text-text-muted/60 mt-1 whitespace-pre-line">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA FINAL ── */}
      <section className="py-24 border-t border-border-subtle">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <motion.p {...rise(0)} className="eyebrow mb-5">¿Tienes un problema concreto?</motion.p>
            <motion.h2 {...rise(0.08)} className="text-text-primary max-w-lg">
              La primera conversación{" "}
              <em className="italic text-accent not-italic">es gratis.</em>
            </motion.h2>
          </div>
          <motion.div {...rise(0.15)} className="flex flex-wrap gap-4 shrink-0">
            <a href="/#diagnostico"
              className="inline-flex items-center gap-2 bg-accent text-black font-bold text-sm px-7 py-3.5 rounded-lg shadow-[0_0_24px_rgba(163,230,53,0.25)] hover:bg-accent-dim hover:text-white hover:scale-[1.02] transition-all">
              Diagnóstico Gratis
            </a>
            <a href="/"
              className="inline-flex items-center gap-2 text-text-secondary border border-border-subtle px-6 py-3.5 rounded-lg text-sm font-medium hover:border-accent/40 hover:text-text-primary transition-all">
              Ver proyectos
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

    </article>
  );
}

"use client";
import { motion } from "framer-motion";

const ArrowRight = () => (
  <svg className="w-3.5 h-3.5 transition-transform group-hover/lnk:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M9.5 2a2.5 2.5 0 0 1 5 0v.5A2.5 2.5 0 0 1 12 5a2.5 2.5 0 0 1-2.5-2.5V2z"/>
    <path d="M6 9.5A2.5 2.5 0 0 1 3.5 7 2.5 2.5 0 0 1 6 4.5M18 9.5A2.5 2.5 0 0 0 20.5 7 2.5 2.5 0 0 0 18 4.5"/>
    <path d="M3 14.5A2.5 2.5 0 0 1 5.5 12 2.5 2.5 0 0 1 8 14.5M21 14.5A2.5 2.5 0 0 0 18.5 12 2.5 2.5 0 0 0 16 14.5"/>
    <path d="M9 21.5A2.5 2.5 0 0 1 6.5 19a2.5 2.5 0 0 1 2.5-2.5M15 21.5a2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const CpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="7" y="7" width="10" height="10" rx="1"/>
    <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/>
  </svg>
);

const WifiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M5 12.55a11 11 0 0 1 14 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0"/>
    <circle cx="12" cy="20" r="1" fill="currentColor"/>
  </svg>
);

const TrendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);

const SERVICES = [
  {
    n: "01", Icon: BrainIcon,
    title: "IA y Aprendizaje Automático",
    desc: "Modelos predictivos y neuronales para decisiones basadas en datos reales de tu negocio.",
    items: ["Modelos de clasificación y predicción", "NLP y visión por computador", "Dashboards de ML en producción"],
  },
  {
    n: "02", Icon: CpuIcon,
    title: "Automatización Inteligente",
    desc: "Eliminamos trabajo manual repetitivo con flujos inteligentes integrados a tus sistemas actuales.",
    items: ["RPA y orquestación de procesos", "Integraciones API y webhooks", "Alertas y acciones autónomas"],
  },
  {
    n: "03", Icon: WifiIcon,
    title: "Ecosistemas IoT",
    desc: "Conectamos sensores y dispositivos para monitoreo en tiempo real con dashboards personalizados.",
    items: ["Protocolos MQTT/OPC-UA", "Edge computing y gateways", "Visualización y alertas en tiempo real"],
  },
  {
    n: "04", Icon: TrendIcon,
    title: "Consultoría Digital",
    desc: "Estrategias de transformación digital diseñadas para la realidad de la empresa chilena B2B.",
    items: ["Diagnóstico y roadmap tecnológico", "Selección de stack y arquitectura", "Acompañamiento post-lanzamiento"],
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function Services() {
  return (
    <section id="servicios" className="py-32 bg-bg-primary">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="eyebrow mb-5">Nuestros Servicios</p>
          <h2 className="text-text-primary max-w-xl">
            Cuatro disciplinas,{" "}
            <em className="italic text-accent not-italic font-display">un puente</em>.
          </h2>
        </motion.div>

        {/* Bento: first card spans 2 rows on desktop */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ gridAutoRows: "auto" }}
        >
          {SERVICES.map((s, i) => {
            const { Icon } = s;
            const big = i === 0;
            return (
              <motion.article
                key={i}
                variants={cardVariant}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={`group relative bg-bg-secondary border border-border-subtle rounded-2xl p-8 flex flex-col gap-5 overflow-hidden
                  hover:border-accent/50 transition-colors
                  ${big ? "lg:row-span-2" : ""}
                `}
              >
                {/* Inner hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "0 0 60px -20px rgba(163,230,53,0.4) inset" }} />

                {/* Step number */}
                <span className="font-mono text-5xl font-semibold text-bg-elevated group-hover:text-border-subtle transition-colors self-end leading-none select-none">
                  {s.n}
                </span>

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl border border-border-subtle flex items-center justify-center text-accent group-hover:border-accent/40 transition-colors shrink-0">
                  <Icon />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 gap-4">
                  <h3 className="font-display text-xl font-semibold text-text-primary leading-snug">{s.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
                  <ul className="space-y-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="text-accent text-xs mt-0.5 shrink-0">▪</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a href="#contacto" className="group/lnk inline-flex items-center gap-1.5 text-sm text-accent font-medium mt-auto">
                  Ver más <ArrowRight />
                </a>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

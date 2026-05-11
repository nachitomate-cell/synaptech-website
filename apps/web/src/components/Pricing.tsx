"use client";
import { motion } from "framer-motion";

const TIERS = [
  {
    name: "Piloto",
    subtitle: "Prueba de concepto",
    price: "desde CLP $800.000",
    duration: "2–4 semanas",
    description: "Validamos viabilidad técnica y de negocio antes de comprometer un presupuesto mayor.",
    bullets: [
      "Prototipo funcional o prueba técnica",
      "Definición de arquitectura base",
      "Informe de viabilidad y recomendaciones",
    ],
    highlight: false,
  },
  {
    name: "MVP",
    subtitle: "Producto funcional",
    price: "desde CLP $2.500.000",
    duration: "8–12 semanas",
    description: "Sistema completo en producción, listo para operar desde el primer día.",
    bullets: [
      "Producto funcionando en producción",
      "Integraciones requeridas (pagos, WhatsApp, etc.)",
      "60 días de garantía post-lanzamiento",
    ],
    highlight: true,
  },
  {
    name: "Plataforma",
    subtitle: "Solución compleja",
    price: "desde CLP $5.000.000",
    duration: "3–6 meses",
    description: "Para proyectos con múltiples módulos, integraciones complejas o necesidades de escala.",
    bullets: [
      "Arquitectura escalable y documentada",
      "Integraciones múltiples (APIs, sistemas externos)",
      "Plan de mantenimiento y evolución",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="inversion" className="py-32 bg-bg-secondary">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="eyebrow mb-5">Inversión</p>
          <h2 className="text-text-primary max-w-xl">
            Rangos de inversión{" "}
            <em className="italic text-accent not-italic font-display">por tipo de proyecto</em>.
          </h2>
          <p className="mt-5 text-text-secondary text-base leading-relaxed max-w-2xl font-body">
            Publicamos rangos referenciales para que llegues al diagnóstico con expectativas alineadas.
            El proyecto definitivo se cotiza tras conocer tu caso específico.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {TIERS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col gap-5 border transition-all ${
                t.highlight
                  ? "bg-accent/5 border-accent/40"
                  : "bg-bg-primary border-border-subtle"
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-accent text-black font-mono text-[10px] font-bold px-3 py-1 rounded-full">
                    Más frecuente
                  </span>
                </div>
              )}

              <div>
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">{t.subtitle}</p>
                <h3 className="font-display text-2xl font-bold text-text-primary">{t.name}</h3>
              </div>

              <div>
                <p className="font-mono text-lg font-semibold text-accent">{t.price}</p>
                <p className="font-mono text-[11px] text-text-muted mt-0.5">{t.duration}</p>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed font-body">{t.description}</p>

              <ul className="flex flex-col gap-2.5">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M13 4 6 11l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm text-text-secondary font-body">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="font-mono text-[11px] text-text-muted text-center">
          Rangos referenciales en CLP. El proyecto definitivo se cotiza tras el diagnóstico gratuito.
        </p>
      </div>
    </section>
  );
}

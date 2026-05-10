"use client";
import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico y Descubrimiento",
    desc: "Mapeamos sistemas, datos y oportunidades ocultas en tu operación.",
    deliverables: ["Auditoría tecnológica completa", "Mapa de procesos críticos", "Priorización de oportunidades", "Informe ejecutivo"],
  },
  {
    n: "02",
    title: "Arquitectura Inteligente",
    desc: "Diseñamos la solución técnica adecuada a tu negocio y presupuesto.",
    deliverables: ["Documento de arquitectura", "Propuesta técnica detallada", "Stack tecnológico recomendado", "Roadmap por fases"],
  },
  {
    n: "03",
    title: "Implementación e Integración",
    desc: "Construimos y conectamos sistemas en ciclos cortos de entrega.",
    deliverables: ["Sprints de 2 semanas", "Demo funcional por sprint", "Tests de integración", "Deploy en staging"],
  },
  {
    n: "04",
    title: "Optimización y Crecimiento",
    desc: "Medimos el impacto, aprendemos de los datos y escalamos.",
    deliverables: ["Dashboard de KPIs en tiempo real", "Informes de retención", "Plan de escalabilidad", "SLA de soporte"],
  },
];

export default function Process() {
  return (
    <section id="metodologia" className="py-32 bg-bg-secondary overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="eyebrow mb-5">Nuestra Metodología</p>
          <h2 className="text-text-primary max-w-2xl">
            Tu camino hacia la{" "}
            <em className="italic text-accent not-italic font-display">inteligencia</em>.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-border-subtle z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: i % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className={`relative z-10 flex flex-col ${i % 2 !== 0 ? "lg:mt-24" : ""}`}
              >
                {/* Pulsing node */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0px rgba(163,230,53,0.5)",
                        "0 0 0 8px rgba(163,230,53,0)",
                        "0 0 0 0px rgba(163,230,53,0)",
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                    className="w-12 h-12 rounded-full border-2 border-accent bg-bg-secondary flex items-center justify-center"
                  >
                    <span className="font-mono text-[11px] font-semibold text-accent">{s.n}</span>
                  </motion.div>
                </div>

                {/* Card */}
                <div className="bg-bg-primary border border-border-subtle rounded-2xl p-6 flex flex-col gap-3 hover:border-accent/30 transition-colors flex-1">
                  <h3 className="font-display font-semibold text-lg text-text-primary leading-snug">{s.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                  <details className="group/d mt-1">
                    <summary className="text-[11px] font-mono text-text-muted cursor-pointer list-none flex items-center gap-1.5 hover:text-accent transition-colors select-none">
                      <span className="group-open/d:rotate-90 transition-transform inline-block text-[8px]">▶</span>
                      Qué incluye
                    </summary>
                    <ul className="mt-3 space-y-2 pl-1">
                      {s.deliverables.map((d) => (
                        <li key={d} className="text-[11px] text-text-muted flex items-start gap-2">
                          <span className="text-accent shrink-0">▪</span>{d}
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "¿Cuánto demora un proyecto típico?",
    a: "Entre 8 y 12 semanas para un MVP, dependiendo del alcance. En el diagnóstico gratuito te damos un timeline más preciso con hitos claros.",
  },
  {
    q: "¿Trabajan con empresas pequeñas o solo grandes?",
    a: "Trabajamos con empresas de cualquier tamaño que tengan un problema real para resolver. Hemos desarrollado proyectos desde pilotos de 800.000 CLP hasta plataformas de varios millones.",
  },
  {
    q: "¿Cómo cobran? ¿Setup + mensualidad o pago único?",
    a: "Ambos modelos. En el diagnóstico te recomendamos el que mejor se ajuste a tu flujo de caja y al tipo de proyecto. Hay soluciones que tiene más sentido como servicio mensual y otras como entrega única.",
  },
  {
    q: "¿Manejan datos sensibles? (clínicos, financieros, escolares)",
    a: "Sí. Trabajamos bajo la Ley 19.628 chilena y aplicamos buenas prácticas de seguridad: encriptación en tránsito y reposo, auditoría de accesos y backups automatizados. El proyecto ViñaMed, por ejemplo, gestiona datos clínicos y reportes ecográficos en producción.",
  },
  {
    q: "¿Qué pasa después del lanzamiento?",
    a: "Incluimos 60 días de garantía y ajustes post-lanzamiento sin costo adicional. Después hay un plan de mantenimiento opcional para soporte continuo, mejoras menores y monitoreo.",
  },
  {
    q: "¿Trabajan con tecnologías específicas o son agnósticos?",
    a: "Elegimos el stack según el problema. Tenemos especialidad en Next.js, Python/FastAPI, PostgreSQL, React Native e integraciones con Google Wallet, WhatsApp Business y Webpay. No atamos al cliente a tecnologías propietarias.",
  },
  {
    q: "¿Puedo ver un proyecto en vivo antes de contratar?",
    a: "Sí. Si encaja, te conectamos con uno de nuestros clientes actuales para que conozca el sistema funcionando antes de tomar la decisión.",
  },
  {
    q: "¿Cómo empezamos?",
    a: "Con el diagnóstico gratuito de 3 preguntas en este sitio. En menos de 48 horas hábiles te respondemos con una propuesta inicial y alcance estimado. Sin compromiso.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-bg-primary">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="eyebrow mb-5">Preguntas frecuentes</p>
          <h2 className="text-text-primary max-w-xl">
            Todo lo que necesitas{" "}
            <em className="italic text-accent not-italic font-display">saber antes</em>.
          </h2>
        </motion.div>

        <div className="max-w-3xl flex flex-col divide-y divide-border-subtle">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                aria-expanded={open === i}
              >
                <span className="font-display text-[15px] font-medium text-text-primary group-hover:text-accent transition-colors leading-snug">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 w-5 h-5 text-text-muted group-hover:text-accent transition-colors"
                >
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 4v12M4 10h12" strokeLinecap="round"/>
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-sm text-text-secondary leading-relaxed font-body">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

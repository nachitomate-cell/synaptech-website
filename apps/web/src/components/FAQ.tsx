"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealHeading from "./RevealHeading";

const FAQS = [
  {
    q: "¿Qué incluye y cuánto cuesta?",
    a: "Agenda online, ficha de clientes, club de fidelización y panel de administración desde $29.900 + IVA al mes. El asistente con IA por WhatsApp y la tarjeta en Google Wallet vienen en el plan Pro ($49.900 + IVA). El plan anual son $399.000 + IVA, equivalente a ocho meses.",
  },
  {
    q: "¿Necesito tarjeta para probar?",
    a: "No. Creas tu local, cargas tus servicios y tu equipo, y lo pruebas con datos reales sin ingresar medios de pago. Recién eliges plan cuando te sirve.",
  },
  {
    q: "¿Cómo cobro a mis clientes?",
    a: "Como te acomode: Mercado Pago o Flow para reservas y abonos online, la máquina POS de TUU en el mesón, link de pago a distancia, o transferencia pedida desde la misma cita. Todo queda registrado en la caja del día, así que el cierre cuadra sin planillas.",
  },
  {
    q: "¿El asistente con IA responde por mi número?",
    a: "Sí. Se conecta al WhatsApp del local, responde las preguntas de siempre — precios, horarios, dirección, disponibilidad — y agenda la hora dentro de la misma conversación, de día y de noche. Si la conversación se complica, la escala a una persona y avisa al equipo.",
  },
  {
    q: "¿Se puede dividir la comisión de cada profesional?",
    a: "Sí. Cada servicio y cada producto puede tener su porcentaje, y la liquidación de cada profesional sale calculada del cierre de caja. Funciona también con reparto a ayudantes.",
  },
  {
    q: "¿Y los documentos tributarios?",
    a: "Si arriendas sillón, la plataforma emite sola la boleta de honorarios de cada profesional al cerrar la cita — con su propio RUT, pague el cliente como pague, efectivo incluido — y la boleta afecta del local por los productos, según la estructura que indica el SII. Ya está funcionando en locales reales. Requiere que cada profesional autorice la emisión en su nombre ante el SII; es un trámite único y te guiamos paso a paso.",
  },
  {
    q: "¿Sirve si tengo más de un local?",
    a: "Sí. Cada sede tiene su agenda, su equipo y su caja, y puedes moverte entre ellas desde el mismo panel. Para dos o más locales hay precio por volumen.",
  },
  {
    q: "¿Qué pasa si me quiero ir?",
    a: "Te vas cuando quieras, sin permanencia ni multa. Tus datos son tuyos y te los entregamos exportados.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 bg-bg-primary">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="eyebrow mb-5"
          >Preguntas frecuentes</motion.p>
          <RevealHeading className="text-text-primary max-w-xl">
            Todo lo que necesitas{" "}
            <em className="italic text-accent font-display">saber antes</em>.
          </RevealHeading>
        </div>

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

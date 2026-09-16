"use client";
import { motion } from "framer-motion";
import RevealHeading from "./RevealHeading";

/* Lista pública OFICIAL de la plataforma (netos en CLP + IVA, por local).
   Es la misma tabla que cobra el panel (admin-panel/src/lib/precios.js del
   repo Barberia-Elegance) y la que declara el JSON-LD de layout.tsx: si cambia
   una, cambian las tres. Lo que NO viene en ningún plan y se contrata aparte:
   avisos automáticos por WhatsApp (confirmaciones y recordatorios). */
const SIGNUP = "https://crea.synaptechspa.cl/?ref=home-precios";

const PLANS = [
  {
    name: "Básico",
    subtitle: "Agenda y club",
    price: "$29.900",
    description: "Tu local con reservas online las 24 horas y un club de fidelidad que hace volver a los clientes.",
    bullets: [
      "Agenda online 24/7 con tu propia página de reservas",
      "Club de fidelidad: sellos, premios y rangos",
      "Profesionales ilimitados",
      "Caja, comisiones y métricas del local",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    subtitle: "Con asistente IA",
    price: "$49.900",
    description: "Todo el Básico más un asistente con IA que responde y agenda solo por WhatsApp.",
    bullets: [
      "Todo lo del plan Básico",
      "Asistente IA por WhatsApp, conversaciones ilimitadas",
      "Tarjeta de fidelidad en Google Wallet",
      "Plan anual: $399.000 + IVA (equivale a 8 meses)",
    ],
    highlight: true,
  },
  {
    name: "Full",
    subtitle: "WhatsApp e Instagram",
    price: "$69.900",
    description: "Todo el Pro, y el asistente con IA también atiende los mensajes directos de Instagram.",
    bullets: [
      "Todo lo del plan Pro",
      "Asistente IA en Instagram (DM)",
      "Un solo asistente para los dos canales",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="precios" className="py-16 section-blend">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="eyebrow mb-5"
          >Planes y precios</motion.p>
          <RevealHeading className="text-text-primary max-w-xl">
            Un precio por local.{" "}
            <em className="italic text-accent font-display">Sin comisiones por cita</em>.
          </RevealHeading>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-text-secondary text-base leading-relaxed max-w-2xl font-body"
          >
            Suscripción mensual por local. Pruebas 14 días gratis sin tarjeta y el primer mes
            va gratis al activar tu plan.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PLANS.map((t, i) => (
            <motion.div
              key={t.name}
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
                    Más elegido
                  </span>
                </div>
              )}

              <div>
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">{t.subtitle}</p>
                <h3 className="font-display text-2xl font-bold text-text-primary">{t.name}</h3>
              </div>

              <div>
                <p className="font-mono text-3xl font-semibold text-accent">
                  {t.price}<span className="text-base font-normal text-text-muted"> + IVA / mes</span>
                </p>
                <p className="font-mono text-[11px] text-text-muted mt-0.5">por local</p>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed font-body">{t.description}</p>

              <ul className="flex flex-col gap-2.5 flex-1">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M13 4 6 11l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm text-text-secondary font-body">{b}</span>
                  </li>
                ))}
              </ul>

              <a
                href={SIGNUP}
                className={`mt-2 inline-flex items-center justify-center font-bold text-sm px-6 py-3 rounded-lg transition-all ${
                  t.highlight
                    ? "bg-accent text-black shadow-lime hover:bg-accent-dim hover:text-white"
                    : "border border-border-subtle text-text-primary hover:border-accent/40"
                }`}
              >
                Empezar gratis
              </a>
            </motion.div>
          ))}
        </div>

        <p className="font-mono text-[11px] text-text-muted text-center max-w-3xl mx-auto leading-relaxed">
          Precios netos en CLP, se suma IVA. Confirmaciones y recordatorios automáticos por WhatsApp
          se contratan aparte. Dos o más locales: consulta el precio por volumen.
        </p>
      </div>
    </section>
  );
}

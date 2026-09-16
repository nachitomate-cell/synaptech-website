"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import RevealHeading from "./RevealHeading";

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

const CardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <path d="M2 10h20M6 15h4"/>
  </svg>
);

const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <path d="M14 2v6h6M9 13h6M9 17h4"/>
  </svg>
);

const SERVICES = [
  {
    n: "01", Icon: WifiIcon, color: "#c084fc",
    title: "Agenda online 24/7",
    desc: "Tus clientes reservan solos, a cualquier hora, desde su teléfono. Cada profesional ve su día y el local ve todo.",
    items: ["Reserva sin llamadas ni mensajes", "Recordatorios y confirmaciones automáticas", "Agenda por profesional y por sucursal"],
    href: "/saas-comercial",
  },
  {
    n: "02", Icon: BrainIcon, color: "#10b981",
    title: "Asistente con IA en WhatsApp",
    desc: "Responde las preguntas de siempre y agenda la hora dentro de la conversación, en el número del local, de día y de noche.",
    items: ["Atiende y agenda sin que nadie escriba", "Confirma citas y avisa las cancelaciones", "Escala a una persona cuando hace falta"],
    href: "/saas-comercial",
  },
  {
    n: "03", Icon: CardIcon, color: "#38bdf8",
    title: "Pagos por donde quieras",
    desc: "Cobra en el mesón con la máquina, por un link a distancia o en línea al reservar. El abono queda tomado antes de que llegue.",
    items: ["Mercado Pago para reservas y abonos", "Máquina POS TUU integrada al cobro", "Link de pago y transferencia desde la cita"],
    href: "/saas-comercial",
  },
  {
    n: "04", Icon: CpuIcon, color: "#3b82f6",
    title: "Caja y comisiones",
    desc: "Cierra el día cuadrado sin planillas: cada venta queda con su medio de pago y la comisión de cada profesional sale sola.",
    items: ["Cierre de caja y arqueo diario", "Comisión por servicio y por producto", "Liquidación lista para pagar al equipo"],
    href: "/saas-comercial",
  },
  {
    n: "05", Icon: TrendIcon, color: "#f59e0b",
    title: "Club de fidelización",
    desc: "Sellos, rangos y premios para que el cliente vuelva, con su tarjeta guardada en Google Wallet y avisos que llegan al teléfono.",
    items: ["Sellos digitales y premios por visita", "Tarjeta en Google Wallet", "Referidos y campañas de reactivación"],
    href: "/fidelizacion",
  },
  {
    n: "06", Icon: DocIcon, color: "#a78bfa",
    title: "Arriendo de sillón y documentos",
    desc: "Para locales que arriendan sillón: la boleta de honorarios de cada profesional con su propio RUT y la boleta afecta del local, según la estructura del SII. En piloto — escríbenos para ver si tu local califica.",
    items: ["Boleta de honorarios por profesional", "Boleta afecta del local", "Sin máquina obligatoria ni cobro por barbero"],
    href: "/contacto",
  },
];

type Service = typeof SERVICES[0];

/* ── Per-card spotlight that tracks the cursor ── */
function ServiceCard({ s, index }: { s: Service; index: number }) {
  const [spot, setSpot] = useState({ x: "50%", y: "50%", on: false });
  const { Icon } = s;

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 } },
      }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className="group relative bg-bg-secondary border border-border-subtle rounded-2xl p-8 flex flex-col gap-5 overflow-hidden"
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        setSpot({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px`, on: true });
      }}
      onMouseLeave={() => setSpot(p => ({ ...p, on: false }))}
    >
      {/* Cursor-following spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(380px circle at ${spot.x} ${spot.y}, ${s.color}18, transparent 65%)`,
          opacity: spot.on ? 1 : 0,
        }}
      />

      {/* Hover border ring */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${s.color}40` }}
      />

      {/* Step number */}
      <span
        className="relative z-10 font-mono text-5xl font-semibold leading-none select-none self-end"
        style={{ color: `${s.color}1a` }}
      >
        {s.n}
      </span>

      {/* Icon */}
      <div
        className="relative z-10 w-11 h-11 rounded-xl border flex items-center justify-center shrink-0"
        style={{ borderColor: `${s.color}35`, color: s.color, background: `${s.color}0a` }}
      >
        <Icon />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 gap-4">
        <h3 className="font-display text-xl font-semibold text-text-primary leading-snug">{s.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
        <ul className="space-y-2">
          {s.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
              <span className="text-xs mt-0.5 shrink-0" style={{ color: s.color }}>▪</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={(s as any).href ?? "#contacto"}
        className="group/lnk relative z-10 inline-flex items-center gap-1.5 text-sm font-medium mt-auto"
        style={{ color: s.color }}
      >
        {(s as any).href ? "Ver plataforma" : "Ver más"} <ArrowRight />
      </a>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="py-16 bg-bg-primary">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="eyebrow mb-5"
          >La plataforma</motion.p>
          <RevealHeading className="text-text-primary max-w-xl">
            Todo el local,{" "}
            <em className="italic text-accent font-display">en un solo panel</em>.
          </RevealHeading>
        </div>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.n} s={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

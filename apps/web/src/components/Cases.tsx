"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const CASES = [
  {
    client: "ViñaMed",
    industry: "HealthTech",
    title: "Portal de gestión clínica y visor DICOM",
    metric: { value: 73, unit: "%", label: "reducción de no-shows" },
    desc: "Sistema integrado de agenda inteligente, ficha clínica digital y visor de imágenes médicas para policlínicos.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "DICOM.js"],
    from: "#052e16", via: "#18181b", color: "#10b981",
  },
  {
    client: "Patio Curauma",
    industry: "Retail",
    title: "Plataforma de fidelización y análisis de flujo",
    metric: { value: 340, unit: "%", label: "aumento en retención" },
    desc: "App de fidelización con gamificación, push notifications y heatmaps de afluencia en tiempo real.",
    stack: ["React Native", "Node.js", "Redis", "IoT sensors"],
    from: "#451a03", via: "#18181b", color: "#f59e0b",
  },
  {
    client: "Ferraza Industrial",
    industry: "Manufactura",
    title: "Sistema de gestión de inventario y órdenes",
    metric: { value: 58, unit: "%", label: "menos tiempo en despacho" },
    desc: "ERP liviano con trazabilidad completa de piezas, integración con proveedores y app móvil para bodegueros.",
    stack: ["Vue.js", "Django", "MySQL", "Docker"],
    from: "#172554", via: "#18181b", color: "#3b82f6",
  },
  {
    client: "Elegance Studio",
    industry: "Belleza",
    title: "Agenda digital y CRM para salón premium",
    metric: { value: 2.4, unit: "x", label: "ingresos en 6 meses" },
    desc: "Plataforma de reservas, seguimiento de clientes VIP y recordatorios automáticos vía WhatsApp.",
    stack: ["Next.js", "Supabase", "Twilio", "Stripe"],
    from: "#4c0519", via: "#18181b", color: "#f43f5e",
  },
];

function CountUp({ to, unit }: { to: number; unit: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const dur = 1100;
    const start = performance.now();
    const run = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - (1 - t) ** 3;
      const cur = ease * to;
      setVal(Number.isInteger(to) ? Math.round(cur) : parseFloat(cur.toFixed(1)));
      if (t < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, [inView, to]);

  return <span ref={ref}>{val}{unit}</span>;
}

export default function Cases() {
  return (
    <section id="casos" className="py-32 bg-bg-primary">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="eyebrow mb-5">Casos de Éxito</p>
          <h2 className="text-text-primary max-w-xl">
            Transformando negocios,{" "}
            <em className="italic text-accent not-italic font-display">cliente a cliente</em>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CASES.map((c, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden hover:border-accent/30 transition-colors flex flex-col"
            >
              {/* Visual header */}
              <div className="relative h-44 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${c.from} 0%, ${c.via} 60%, #18181b 100%)` }}>
                {/* Wireframe mockup */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 180" preserveAspectRatio="xMidYMid slice" aria-hidden>
                  <rect x="56" y="24" width="308" height="132" rx="4" fill="none" stroke={c.color} strokeWidth="0.7" opacity="0.3"/>
                  <line x1="56" y1="42" x2="364" y2="42" stroke={c.color} strokeWidth="0.5" opacity="0.3"/>
                  <rect x="68" y="52" width="88" height="58" rx="2" fill={c.color} fillOpacity="0.1" stroke={c.color} strokeWidth="0.5" opacity="0.4"/>
                  <rect x="168" y="52" width="88" height="22" rx="2" fill={c.color} fillOpacity="0.08" stroke={c.color} strokeWidth="0.4" opacity="0.35"/>
                  <rect x="168" y="80" width="60" height="8" rx="1" fill={c.color} fillOpacity="0.15" opacity="0.4"/>
                  <rect x="168" y="94" width="80" height="8" rx="1" fill={c.color} fillOpacity="0.1" opacity="0.35"/>
                  <rect x="268" y="52" width="80" height="58" rx="2" fill={c.color} fillOpacity="0.06" stroke={c.color} strokeWidth="0.4" opacity="0.3"/>
                  {[0,1,2,3].map(j => (
                    <rect key={j} x="68" y={120+j*7} width={160+j*18} height="4" rx="1" fill={c.color} fillOpacity="0.1" opacity="0.35"/>
                  ))}
                </svg>
                <span className="absolute top-4 left-4 font-mono text-[10px] font-semibold text-white/40 uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
                  {c.industry}
                </span>
              </div>

              {/* Body */}
              <div className="p-8 flex flex-col flex-1 gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] text-text-muted mb-1.5 uppercase tracking-wider">{c.client}</p>
                    <h3 className="font-display text-xl font-semibold text-text-primary leading-snug">{c.title}</h3>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-display text-4xl font-bold leading-none text-accent">
                      <CountUp to={c.metric.value} unit={c.metric.unit} />
                    </div>
                    <p className="font-mono text-[10px] text-text-muted mt-1 max-w-[90px] text-right leading-tight">{c.metric.label}</p>
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed">{c.desc}</p>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                  {c.stack.map((t) => (
                    <span key={t} className="font-mono text-[10px] text-text-muted border border-border-subtle px-2.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <a href="#contacto"
                  className="inline-flex items-center gap-2 text-sm text-accent font-medium mt-2 group-hover:gap-3 transition-all">
                  Ver caso completo
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

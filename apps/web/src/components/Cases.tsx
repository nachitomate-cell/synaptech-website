"use client";
import { motion } from "framer-motion";

const CASES = [
  {
    client: "ViñaMed",
    industry: "HealthTech · Salud",
    title: "Portal clínico con visor DICOM",
    desc: "Plataforma integral para gestión de perfiles profesionales (médicos y tecnólogos médicos) y visualización de reportes ecográficos en formato DICOM. Flujos clínicos digitalizados de extremo a extremo.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "DICOM.js", "HL7"],
    status: "En producción",
    flagship: true,
    accentColor: "#10b981",
    from: "#022c1e", to: "#0a1a0f",
    Mockup: () => (
      <svg viewBox="0 0 560 220" width="100%" height="100%" aria-hidden
        className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="560" height="220" fill="#051209"/>
        {/* Sidebar */}
        <rect x="0" y="0" width="110" height="220" fill="#030d07"/>
        <rect x="14" y="20" width="82" height="11" rx="3" fill="rgba(16,185,129,0.22)"/>
        {[44,62,80,98,116].map((y, i) => (
          <rect key={i} x="14" y={y} width={i === 0 ? 82 : 62} height="9" rx="3"
            fill={i === 0 ? "rgba(16,185,129,0.16)" : "rgba(255,255,255,0.05)"}/>
        ))}
        {/* DICOM viewer */}
        <rect x="124" y="14" width="256" height="192" rx="6" fill="#030d07"/>
        <circle cx="252" cy="110" r="82" stroke="rgba(16,185,129,0.35)" strokeWidth="1" fill="none"/>
        <circle cx="252" cy="110" r="60" stroke="rgba(16,185,129,0.18)" strokeWidth="1" fill="none"/>
        <ellipse cx="252" cy="94" rx="42" ry="26" fill="rgba(16,185,129,0.06)"
          stroke="rgba(16,185,129,0.2)" strokeWidth="0.8"/>
        <line x1="170" y1="110" x2="334" y2="110" stroke="rgba(16,185,129,0.12)" strokeWidth="0.6"/>
        <line x1="252" y1="28" x2="252" y2="192" stroke="rgba(16,185,129,0.12)" strokeWidth="0.6"/>
        <text x="130" y="28" fill="rgba(16,185,129,0.5)" fontSize="7" fontFamily="monospace">DICOM · ECOGRAFÍA</text>
        {/* Patient data panel */}
        <rect x="394" y="14" width="152" height="192" rx="6" fill="#030d07"/>
        {[
          { l: "Paciente", v: "M. González" },
          { l: "RUT", v: "12.345.678-9" },
          { l: "Fecha", v: "10-05-2026" },
          { l: "Médico", v: "Dr. Soto" },
          { l: "Estado", v: "Procesado" },
        ].map((r, i) => (
          <g key={i}>
            <text x="406" y={34 + i * 32} fill="rgba(255,255,255,0.3)" fontSize="6.5" fontFamily="monospace">{r.l}</text>
            <text x="406" y={47 + i * 32}
              fill={r.l === "Estado" ? "rgba(16,185,129,0.9)" : "rgba(255,255,255,0.7)"}
              fontSize="7.5" fontFamily="monospace" fontWeight="600">{r.v}</text>
          </g>
        ))}
      </svg>
    ),
  },
  {
    client: "Patio Curauma",
    industry: "Retail · Fidelización",
    title: "App de fidelización con Google Wallet",
    desc: "Sistema de sellos digitales con integración nativa a Google Wallet. Recompensas, gamificación y notificaciones push para impulsar visitas recurrentes en el centro comercial.",
    stack: ["React Native", "Google Wallet API", "Node.js", "Firebase"],
    status: "Live desde 2025",
    accentColor: "#f59e0b",
    from: "#1c1000", to: "#100a00",
    Mockup: () => (
      <svg viewBox="0 0 420 200" width="100%" height="100%" aria-hidden
        className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="420" height="200" fill="#110d00"/>
        <defs>
          <linearGradient id="goldG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c9a227"/><stop offset="100%" stopColor="#7a5c0a"/>
          </linearGradient>
        </defs>
        {/* Phone frame */}
        <rect x="140" y="8" width="140" height="184" rx="16" fill="#1a1200"
          stroke="rgba(245,158,11,0.3)" strokeWidth="1.5"/>
        <rect x="154" y="24" width="112" height="152" rx="8" fill="#0d0900"/>
        {/* Google Wallet card */}
        <rect x="160" y="30" width="100" height="62" rx="8" fill="url(#goldG)"/>
        <text x="168" y="48" fill="rgba(255,255,255,0.95)" fontSize="7.5" fontFamily="monospace" fontWeight="700">PATIO CURAUMA</text>
        <text x="168" y="60" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace">Sellos digitales</text>
        {/* Stamp grid */}
        <text x="168" y="76" fill="rgba(255,255,255,0.4)" fontSize="5.5" fontFamily="monospace">Sellos acumulados</text>
        {Array.from({ length: 10 }, (_, j) => (
          <circle key={j} cx={168 + (j % 5) * 19} cy={85 + Math.floor(j / 5) * 18} r="6.5"
            fill={j < 7 ? "rgba(245,158,11,0.8)" : "rgba(255,255,255,0.1)"}
            stroke="rgba(255,255,255,0.2)" strokeWidth="0.7"/>
        ))}
        {/* Bottom nav */}
        <rect x="154" y="156" width="112" height="20" rx="4" fill="#100a00"/>
        {["🏠", "🏆", "📍", "👤"].map((ic, i) => (
          <text key={i} x={168 + i * 27} y="170" fontSize="8" textAnchor="middle">{ic}</text>
        ))}
        {/* BG glows */}
        <circle cx="60" cy="100" r="90" fill="rgba(245,158,11,0.04)"/>
        <circle cx="360" cy="100" r="70" fill="rgba(245,158,11,0.04)"/>
      </svg>
    ),
  },
  {
    client: "Colegio Diego Thompson",
    industry: "EdTech · Educación",
    title: "Portal institucional + automatización de pagos (PWA)",
    desc: "Portal institucional con experiencia PWA (instalable, offline-first) y motor de automatización de pagos para colegiaturas y eventos escolares. Comunicación familia-colegio centralizada.",
    stack: ["Next.js", "PWA", "Webpay", "PostgreSQL"],
    status: "100% pagos digitalizados",
    accentColor: "#3b82f6",
    from: "#03091a", to: "#060e1e",
    Mockup: () => (
      <svg viewBox="0 0 420 200" width="100%" height="100%" aria-hidden
        className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="420" height="200" fill="#060e1a"/>
        <rect x="0" y="0" width="420" height="30" fill="#091220"/>
        <rect x="12" y="10" width="90" height="11" rx="3" fill="rgba(59,130,246,0.5)"/>
        <rect x="334" y="10" width="74" height="11" rx="3" fill="rgba(59,130,246,0.25)"/>
        {/* Calendar */}
        <rect x="12" y="42" width="198" height="150" rx="7" fill="#091220"/>
        <text x="22" y="58" fill="rgba(255,255,255,0.65)" fontSize="8.5" fontFamily="monospace" fontWeight="700">Mayo 2026</text>
        {["L","M","M","J","V"].map((d, i) => (
          <text key={d + i} x={30 + i * 36} y="72" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace" textAnchor="middle">{d}</text>
        ))}
        {Array.from({ length: 15 }, (_, n) => {
          const row = Math.floor(n / 5), col = n % 5;
          const highlight = [4, 9, 11].includes(n);
          const today = n === 9;
          return (
            <g key={n}>
              <rect x={22 + col * 36} y={78 + row * 30} width="26" height="20" rx="4"
                fill={today ? "rgba(59,130,246,0.7)" : highlight ? "rgba(59,130,246,0.18)" : "rgba(255,255,255,0.03)"}/>
              <text x={35 + col * 36} y={93 + row * 30}
                fill={today ? "#fff" : highlight ? "rgba(59,130,246,0.9)" : "rgba(255,255,255,0.35)"}
                fontSize="7.5" fontFamily="monospace" textAnchor="middle">{n + 1}</text>
            </g>
          );
        })}
        {/* Payments list */}
        <rect x="222" y="42" width="186" height="150" rx="7" fill="#091220"/>
        <text x="232" y="58" fill="rgba(255,255,255,0.65)" fontSize="8.5" fontFamily="monospace" fontWeight="700">Pagos Pendientes</text>
        {[
          { label: "Mensualidad Mayo", amt: "$85.000", paid: true },
          { label: "Taller de Arte", amt: "$12.000", paid: false },
          { label: "Excursión", amt: "$25.000", paid: false },
        ].map((p, i) => (
          <g key={i}>
            <rect x="232" y={68 + i * 44} width="166" height="36" rx="5" fill="rgba(255,255,255,0.03)"/>
            <text x="242" y={84 + i * 44} fill="rgba(255,255,255,0.65)" fontSize="7" fontFamily="monospace">{p.label}</text>
            <text x="242" y={97 + i * 44}
              fill={p.paid ? "rgba(52,211,153,0.9)" : "rgba(255,255,255,0.35)"}
              fontSize="8" fontFamily="monospace" fontWeight="700">{p.amt}</text>
            {p.paid && <text x="386" y={88 + i * 44} fill="rgba(52,211,153,0.9)" fontSize="8" textAnchor="middle">✓</text>}
          </g>
        ))}
      </svg>
    ),
  },
  {
    client: "Barbería Ferraza",
    industry: "Belleza · Reservas",
    title: "Plataforma de reservas 24/7 + club de fidelidad",
    desc: "Sistema de reservas de turnos online, gestión de clientes y trabajadores, y club de fidelidad integrado. Disponibilidad 24/7 con confirmaciones automatizadas.",
    stack: ["Next.js", "PostgreSQL", "WhatsApp API", "Webpay"],
    status: "En producción",
    accentColor: "#8b5cf6",
    from: "#0c0a1c", to: "#0e0b20",
    Mockup: () => (
      <svg viewBox="0 0 420 200" width="100%" height="100%" aria-hidden
        className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="420" height="200" fill="#09071a"/>
        <rect x="0" y="0" width="420" height="28" fill="#0c0a1e"/>
        <text x="14" y="18" fill="rgba(139,92,246,0.85)" fontSize="8.5" fontFamily="monospace" fontWeight="700">Ferraza · Agenda semanal</text>
        {["LUN","MAR","MIÉ","JUE","VIE","SÁB"].map((d, i) => (
          <g key={d}>
            <text x={22 + i * 65} y="42" fill="rgba(255,255,255,0.35)" fontSize="6.5" fontFamily="monospace" textAnchor="middle">{d}</text>
            <text x={22 + i * 65} y="54" fill={i === 4 ? "rgba(139,92,246,0.9)" : "rgba(255,255,255,0.5)"}
              fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">{5 + i}</text>
          </g>
        ))}
        {[
          [1,0,1,1,0,1], [0,1,1,0,1,0], [1,1,0,1,1,0],
          [0,0,1,0,1,1], [1,0,0,1,0,1], [0,1,1,0,1,0], [1,0,1,1,0,1],
        ].map((row, ri) => (
          <g key={ri}>
            <text x="10" y={70 + ri * 18} fill="rgba(255,255,255,0.22)" fontSize="6" fontFamily="monospace" textAnchor="middle">
              {(9 + ri).toString().padStart(2,"0")}:00
            </text>
            {row.map((s, ci) => (
              <rect key={ci} x={34 + ci * 65} y={62 + ri * 18} width="52" height="13" rx="3"
                fill={s === 1 ? "rgba(139,92,246,0.55)" : "rgba(255,255,255,0.04)"}
                stroke={s === 1 ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.07)"} strokeWidth="0.5"/>
            ))}
          </g>
        ))}
      </svg>
    ),
  },
  {
    client: "Barbería Elegance",
    industry: "Belleza · Reservas",
    title: "Reservas online y gestión de equipo",
    desc: "Misma base tecnológica que Ferraza, adaptada al flujo de Elegance: agenda 24/7, gestión de barberos, programa de clientes frecuentes y métricas operativas.",
    stack: ["Next.js", "PostgreSQL", "WhatsApp API", "Webpay"],
    status: "En producción",
    accentColor: "#f43f5e",
    from: "#1a0608", to: "#140408",
    Mockup: () => (
      <svg viewBox="0 0 420 200" width="100%" height="100%" aria-hidden
        className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="420" height="200" fill="#110407"/>
        <rect x="0" y="0" width="420" height="28" fill="#180508"/>
        <text x="14" y="18" fill="rgba(244,63,94,0.85)" fontSize="8.5" fontFamily="monospace" fontWeight="700">Elegance · Dashboard</text>
        {[{ l: "Citas hoy", v: "12" }, { l: "Confirmadas", v: "9" }, { l: "Ingresos", v: "$147k" }].map((s, i) => (
          <g key={i}>
            <rect x={14 + i * 132} y="36" width="118" height="46" rx="6"
              fill="rgba(244,63,94,0.07)" stroke="rgba(244,63,94,0.18)" strokeWidth="0.8"/>
            <text x={73 + i * 132} y="58" fill="rgba(244,63,94,0.9)" fontSize="18" fontFamily="monospace" fontWeight="800" textAnchor="middle">{s.v}</text>
            <text x={73 + i * 132} y="73" fill="rgba(255,255,255,0.35)" fontSize="6.5" fontFamily="monospace" textAnchor="middle">{s.l}</text>
          </g>
        ))}
        <text x="14" y="100" fill="rgba(255,255,255,0.4)" fontSize="7.5" fontFamily="monospace">Equipo activo</text>
        {[{ n: "Carlos R.", c: 4 }, { n: "Matías P.", c: 3 }, { n: "Diego S.", c: 5 }].map((b, i) => (
          <g key={i}>
            <rect x="14" y={108 + i * 30} width="392" height="24" rx="4" fill="rgba(255,255,255,0.03)"/>
            <circle cx="30" cy={120 + i * 30} r="7" fill="rgba(244,63,94,0.35)"/>
            <text x="44" y={123 + i * 30} fill="rgba(255,255,255,0.7)" fontSize="7.5" fontFamily="monospace">{b.n}</text>
            {Array.from({ length: 5 }, (_, k) => (
              <rect key={k} x={280 + k * 22} y={113 + i * 30} width="16" height="14" rx="3"
                fill={k < b.c ? "rgba(244,63,94,0.65)" : "rgba(255,255,255,0.05)"}/>
            ))}
          </g>
        ))}
      </svg>
    ),
  },
];

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
          {CASES.map((c, i) => {
            const { Mockup } = c;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={`group bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden
                  hover:border-accent/30 transition-colors flex flex-col
                  ${c.flagship ? "md:col-span-2" : ""}`}
              >
                {/* Visual header */}
                <div
                  className={`relative overflow-hidden ${c.flagship ? "h-52 md:h-64" : "h-44"}`}
                  style={{ background: `linear-gradient(135deg, ${c.from} 0%, ${c.to} 100%)` }}
                >
                  <Mockup />
                  <span className="absolute top-4 left-4 font-mono text-[10px] font-semibold text-white/40
                    uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
                    {c.industry}
                  </span>
                </div>

                {/* Body */}
                <div className="p-8 flex flex-col flex-1 gap-4">
                  <div>
                    <p className="font-mono text-[11px] text-text-muted mb-1.5 uppercase tracking-wider">
                      {c.client}
                    </p>
                    <h3 className="font-display text-xl font-semibold text-text-primary leading-snug">
                      {c.title}
                    </h3>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed">{c.desc}</p>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {c.stack.map((t) => (
                      <span key={t} className="font-mono text-[10px] text-text-muted border border-border-subtle px-2.5 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(163,230,53,0.6)]" />
                      {c.status}
                    </span>
                    <a href="#contacto"
                      className="inline-flex items-center gap-1.5 text-sm text-accent font-medium group-hover:gap-2.5 transition-all">
                      Saber más
                      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

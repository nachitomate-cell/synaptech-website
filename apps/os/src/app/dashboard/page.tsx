"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  CheckCircle2,
  Clock,
  MessageSquare,
  TrendingUp,
  Sparkles,
  Plus,
  ChevronRight,
} from "lucide-react";

// ── Mock data ──────────────────────────────────────────────────────────────

const PULSE_DATA = [
  { day: "Lun", reservas: 12, clientes: 8 },
  { day: "Mar", reservas: 19, clientes: 14 },
  { day: "Mié", reservas: 15, clientes: 11 },
  { day: "Jue", reservas: 27, clientes: 20 },
  { day: "Vie", reservas: 32, clientes: 25 },
  { day: "Sáb", reservas: 38, clientes: 30 },
  { day: "Dom", reservas: 22, clientes: 18 },
];

const STATUS_CARDS = [
  {
    label: "Servicio Activo",
    value: "ViñaMed",
    sub: "Portal clínico · Operativo",
    icon: CheckCircle2,
    color: "text-syn-lime",
    glow: "shadow-lime-glow",
  },
  {
    label: "Próxima Mejora",
    value: "Integración de Pagos",
    sub: "En desarrollo · Sprint 3",
    icon: Clock,
    color: "text-amber-400",
    glow: "shadow-[0_0_16px_rgba(251,191,36,0.25)]",
  },
  {
    label: "Soporte",
    value: "0 tickets",
    sub: "Sin incidencias activas",
    icon: MessageSquare,
    color: "text-emerald-400",
    glow: "shadow-[0_0_16px_rgba(52,211,153,0.20)]",
  },
];

const MODULES = [
  {
    name: "Wallet Pass Fidelización",
    desc: "Programa de lealtad con Google Wallet y sellos digitales.",
    badge: "Disponible",
    badgeColor: "bg-syn-lime/15 text-syn-lime",
  },
  {
    name: "IA de Análisis de Datos",
    desc: "Dashboards predictivos e insights automáticos de tu operación.",
    badge: "Beta",
    badgeColor: "bg-amber-400/10 text-amber-400",
  },
  {
    name: "Reservas Multi-Sucursal",
    desc: "Agenda centralizada para múltiples locales o profesionales.",
    badge: "Disponible",
    badgeColor: "bg-syn-lime/15 text-syn-lime",
  },
  {
    name: "Portal de Pagos Online",
    desc: "Cobros recurrentes, facturación automática y pasarela web.",
    badge: "Próximamente",
    badgeColor: "bg-white/5 text-neutral-400",
  },
];

// ── Animations ─────────────────────────────────────────────────────────────

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: [0.2, 0.7, 0.2, 1] },
});

// ── Component ──────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <motion.div {...fade(0)}>
        <p className="text-xs text-syn-lime font-bold tracking-[0.16em] uppercase mb-1">
          Centro de Control
        </p>
        <h2 className="font-display font-extrabold text-2xl text-white">
          Hola, Ignacio.{" "}
          <span className="text-neutral-400 font-normal">
            Tu ecosistema opera al{" "}
          </span>
          <span className="text-syn-lime">98% de eficiencia.</span>
        </h2>
      </motion.div>

      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATUS_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            {...fade(0.08 * i)}
            className={`bg-[#111]/50 border border-white/[0.06] rounded-2xl p-5 backdrop-blur-xl hover:border-syn-lime/30 transition-all hover:${card.glow}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-neutral-500 font-semibold tracking-wide uppercase">
                {card.label}
              </span>
              <card.icon size={16} className={card.color} />
            </div>
            <p className={`font-display font-bold text-xl ${card.color} mb-1`}>
              {card.value}
            </p>
            <p className="text-neutral-500 text-xs">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Pulse chart + AI insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <motion.div
          {...fade(0.16)}
          className="lg:col-span-2 bg-[#111]/50 border border-white/[0.06] rounded-2xl p-6 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={16} className="text-syn-lime" />
            <h3 className="font-display font-bold text-white text-sm">
              Pulso del Negocio
            </h3>
            <span className="ml-auto text-xs text-neutral-500">Últimos 7 días</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={PULSE_DATA}>
              <defs>
                <linearGradient id="lime-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A4D43C" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#A4D43C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tick={{ fill: "#525252", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "#161616",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  color: "#F5F5F5",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="reservas"
                stroke="#A4D43C"
                strokeWidth={2}
                fill="url(#lime-grad)"
                name="Reservas"
                dot={false}
                activeDot={{ r: 4, fill: "#A4D43C" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI insight */}
        <motion.div
          {...fade(0.22)}
          className="bg-[#111]/50 border border-white/[0.06] rounded-2xl p-6 backdrop-blur-xl flex flex-col"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-syn-lime" />
            <h3 className="font-display font-bold text-white text-sm">
              IA Insight
            </h3>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <p className="text-neutral-400 text-sm leading-relaxed">
              Hemos detectado un{" "}
              <span className="text-syn-lime font-semibold">
                aumento del 34%
              </span>{" "}
              en demanda los{" "}
              <span className="text-white font-semibold">martes y jueves</span>.
              ¿Activamos una campaña de fidelización automática?
            </p>
            <button className="mt-6 w-full py-2.5 rounded-lg border border-syn-lime/40 text-syn-lime text-sm font-semibold hover:bg-syn-lime/10 hover:border-syn-lime transition-all">
              Activar campaña
            </button>
          </div>
        </motion.div>
      </div>

      {/* App Store — Módulos adicionales */}
      <motion.div {...fade(0.28)}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-white">
              Módulos Adicionales
            </h3>
            <p className="text-neutral-500 text-xs mt-0.5">
              Expande las capacidades de tu plataforma
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.name}
              {...fade(0.28 + i * 0.06)}
              className="group bg-[#111]/50 border border-white/[0.06] rounded-2xl p-5 backdrop-blur-xl hover:border-syn-lime/40 hover:shadow-lime-glow transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-syn-lime/10 border border-syn-lime/20 flex items-center justify-center">
                  <Plus size={18} className="text-syn-lime" />
                </div>
                <span
                  className={`text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-full ${mod.badgeColor}`}
                >
                  {mod.badge}
                </span>
              </div>
              <h4 className="font-display font-bold text-white text-sm mb-1.5 leading-snug">
                {mod.name}
              </h4>
              <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                {mod.desc}
              </p>
              <div className="flex items-center gap-1 text-syn-lime text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Saber más <ChevronRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

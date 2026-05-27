import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicFeatures from "@/components/DynamicFeatures";

export const metadata: Metadata = {
  title: "Agenda Profesional para Barberías — Synaptech",
  description:
    "Plataforma SaaS multi-negocio para barberías: reservas online, agenda del barbero, panel de administración y club de fidelización. Confirmación automática por WhatsApp.",
};

const RESERVAS = [
  "Flujo en 5 pasos interactivos optimizado para maximizar conversión móvil",
  "Sistema de calificaciones de Google Maps integrado (Prueba social directa)",
  "Barra de información rápida con botón de WhatsApp dinámico",
  "Detección de sucursales y enrutamiento transparente inteligente",
  "Booking 100% online sin registro obligatorio — nombre, teléfono y listo",
  "Elección de barbero con foto y disponibilidad en tiempo real",
  "Confirmación automática por WhatsApp al cliente",
];

const AGENDA_BARBERO = [
  "Vista personal de citas del día dividida en Mañana / Tarde",
  "Notificaciones push instantáneas al llegar una nueva reserva",
  "Marcar citas como Completada o Cancelada con un toque",
  "Agregar notas privadas por cita",
  "Contacto directo al cliente por WhatsApp desde la agenda",
  "Bloquear horas rápidamente sin entrar al panel admin",
  "Actualización en tiempo real — sin recargar la página",
];

const PANEL_ADMIN = [
  "Agenda visual de todo el equipo con vista por barbero",
  "Gestión completa de servicios, precios y categorías",
  "Módulo Lookbook: Galería gestionable para mostrar tendencias y estilos",
  "Módulo Tienda / Catálogo: Venta de productos de styling con stock local",
  "Aprovisionamiento Express (Fast Onboarding) para nuevos barberos",
  "CRM de clientes con historial de visitas y datos de contacto",
  "Métricas y reportes financieros (Ingresos, tickets, etc.)",
  "Chat interno con miembros / comunidad",
  "Pantalla BarberTV para sala de espera",
];

const FIDELIZACION = [
  "Tarjeta VIP de vidrio esmerilado con destellos 3D (Shimmer)",
  "Grilla de sellos interactiva con física de resortes y respuesta táctil",
  "Gamificación por rangos (Silver, Gold, Platinum) motivando a regresar",
  "Barra de navegación con indicador deslizable matemáticamente fluido",
  "Panel de registro optimizado con escape táctil para no perder reservas",
  "Catálogo de premios canjeables al alcanzar cierta cantidad de sellos",
];

const NOTIFICACIONES = [
  "El barbero recibe una notificación al instante cuando alguien reserva",
  "Funciona con la app cerrada (background)",
  "Compatible con iOS (desde iPhone con PWA instalada) y Android",
  "Sin costo adicional por envío",
];

const TECH_PILLARS = [
  {
    idx: "01",
    label: "Marca Blanca Total",
    desc: "Tu propio subdominio, logotipo y paleta. Cero referencias a plataformas de terceros.",
  },
  {
    idx: "02",
    label: "SEO de Borde",
    desc: "Vercel Edge Middleware inyecta meta tags, logos y miniaturas reales en los resultados de Google al instante.",
  },
  {
    idx: "03",
    label: "Anti-Data Bleed",
    desc: "Aislamiento total de contenido para evitar que Google mezcle tus servicios con los de tu competencia.",
  },
  {
    idx: "04",
    label: "PWA Native Feel",
    desc: "Instalable como app en el celular, con diseño UX/UI de clase mundial, rápido y fluido.",
  },
  {
    idx: "05",
    label: "Fast Onboarding",
    desc: "Scripts de inicialización que permiten lanzar un nuevo negocio en la plataforma en un par de horas.",
  },
];

const ADMIN_FEATURES = [
  { label: "Agenda del equipo",          img: "Vista agenda completa por barbero" },
  { label: "CRM de clientes",            img: "Panel CRM con historial de visitas" },
  { label: "Gestión de servicios",       img: "Catálogo de servicios y precios" },
  { label: "Métricas y reportes",        img: "Dashboard de métricas financieras" },
  { label: "Lookbook de estilos",        img: "Galería lookbook gestionable" },
  { label: "TV Mode — sala de espera",   img: "Pantalla de sala de espera" },
];

function Check() {
  return (
    <svg
      className="w-4 h-4 text-accent shrink-0 mt-0.5"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3 8l3.5 3.5L13 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ImgPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`bracket relative bg-bg-elevated border border-border-subtle rounded-2xl flex flex-col items-center justify-center gap-3 overflow-hidden ${className}`}
    >
      {/* Subtle grid inside placeholder */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(163,230,53,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(163,230,53,0.07) 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-xl border border-border-subtle bg-bg-primary/50 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
        <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest text-center px-6 leading-relaxed">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function AgendaProfesionalPage() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary min-h-screen">

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-28 overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(163,230,53,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(163,230,53,0.04) 1px,transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 55% at 50% 0%,rgba(163,230,53,0.09) 0%,transparent 70%)",
              }}
            />
          </div>

          <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] text-text-muted hover:text-accent transition-colors mb-10"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M13 8H3M7 4l-4 4 4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Volver al inicio
            </Link>

            <p className="eyebrow mb-6">Producto · Barbería SaaS</p>

            <h1 className="text-text-primary max-w-4xl mb-6 animate-fade-up">
              La Plataforma Definitiva{" "}
              <em className="italic text-accent font-display">
                para Barberías
              </em>
            </h1>

            <p className="text-text-secondary text-xl max-w-2xl leading-relaxed font-body mb-12 animate-fade-up" style={{ animationDelay: "80ms" }}>
              Deja de derivar tus clientes a plataformas genéricas. Sistema 100% marca blanca con fidelización gamificada VIP y SEO de borde ultra-veloz.
            </p>

            <div className="flex flex-wrap gap-4 mb-20 animate-fade-up" style={{ animationDelay: "160ms" }}>
              <a
                href="#contacto-agenda"
                className="bg-accent text-black font-bold text-sm px-7 py-3.5 rounded-lg shadow-lime hover:bg-accent-dim hover:text-white hover:scale-[1.02] transition-all"
              >
                Agendar Demo
              </a>
              <a
                href="#reservas"
                className="border border-border-subtle text-text-secondary font-body text-sm px-7 py-3.5 rounded-lg hover:border-accent/50 hover:text-text-primary transition-all inline-flex items-center gap-2"
              >
                Ver características
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 3l5 5-5 5M3 8h10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-10 pt-6 border-t border-border-subtle animate-fade-up" style={{ animationDelay: "240ms" }}>
              {[
                { val: "1.341",  label: "Clientes registrados" },
                { val: "12",     label: "Locales activos" },
                { val: "51",     label: "Profesionales" },
                { val: "93+",    label: "Citas gestionadas" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="font-mono text-accent font-semibold text-lg">
                    {s.val}
                  </span>
                  <span className="font-mono text-[11px] text-text-muted uppercase tracking-widest">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Dynamic Features ── */}
        <DynamicFeatures />

        {/* ── Reservas Online ── */}
        <section id="reservas" className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="eyebrow mb-5">01 — Agendamiento de Alta Conversión</p>
                <h2 className="text-text-primary mb-8">
                  Diseñado para{" "}
                  <em className="italic text-accent font-display">
                    convertir más
                  </em>
                </h2>
                <ul className="space-y-4">
                  {RESERVAS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check />
                      <span className="text-text-secondary text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <ImgPlaceholder
                label="Pantalla de reserva online — selección de barbero y horario"
                className="aspect-[4/3]"
              />
            </div>
          </div>
        </section>

        {/* ── Agenda del Barbero ── */}
        <section id="agenda-barbero" className="py-24 border-t border-border-subtle bg-bg-secondary">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ImgPlaceholder
                label="Vista agenda del barbero — Mañana / Tarde con citas del día"
                className="aspect-[4/3] order-2 lg:order-1"
              />
              <div className="order-1 lg:order-2">
                <p className="eyebrow mb-5">02 — Agenda del Barbero</p>
                <h2 className="text-text-primary mb-8">
                  Tu día en un{" "}
                  <em className="italic text-accent font-display">
                    solo vistazo
                  </em>
                </h2>
                <ul className="space-y-4">
                  {AGENDA_BARBERO.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check />
                      <span className="text-text-secondary text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Panel de Administración ── */}
        <section id="panel-admin" className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="eyebrow mb-5">03 — Panel de Administración</p>
              <h2 className="text-text-primary mb-6">
                Control total{" "}
                <em className="italic text-accent font-display">
                  del negocio
                </em>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Un panel centralizado para gestionar todo: citas, equipo,
                finanzas y comunicación con clientes.
              </p>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
              {ADMIN_FEATURES.map((f) => (
                <ImgPlaceholder
                  key={f.label}
                  label={f.img}
                  className="aspect-[4/3]"
                />
              ))}
            </div>

            {/* Feature bullets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 max-w-3xl mx-auto">
              {PANEL_ADMIN.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check />
                  <span className="text-text-secondary text-sm leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Club de Fidelización ── */}
        <section
          id="fidelizacion"
          className="py-24 border-t border-border-subtle bg-bg-secondary"
        >
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="eyebrow mb-5">04 — Fidelización VIP y Gamificación</p>
                <h2 className="text-text-primary mb-6">
                  Clientes que{" "}
                  <em className="italic text-accent font-display">
                    vuelven siempre
                  </em>
                </h2>
                <p className="text-text-secondary mb-8 leading-relaxed">
                  La tarjeta de fidelización de papel ha muerto. Dale a tus clientes una billetera digital premium con tarjetas 3D interactivas y rangos VIP para disparar tu retención.
                </p>
                <ul className="space-y-4 mb-8">
                  {FIDELIZACION.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check />
                      <span className="text-text-secondary text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tier badges */}
                <div className="flex gap-3 flex-wrap">
                  {[
                    { label: "Silver",   color: "#94a3b8" },
                    { label: "Gold",     color: "#f59e0b" },
                    { label: "Platinum", color: "#a3e635" },
                  ].map((t) => (
                    <span
                      key={t.label}
                      className="font-mono text-[11px] font-semibold px-3.5 py-1.5 rounded-full border"
                      style={{
                        color: t.color,
                        borderColor: `${t.color}55`,
                        background: `${t.color}12`,
                      }}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
              <ImgPlaceholder
                label="Club de fidelización — panel de sellos y catálogo de premios"
                className="aspect-[4/3]"
              />
            </div>
          </div>
        </section>

        {/* ── Notificaciones Push ── */}
        <section id="notificaciones" className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="eyebrow mb-5">05 — Notificaciones Push</p>
                <h2 className="text-text-primary mb-8">
                  Siempre{" "}
                  <em className="italic text-accent font-display">
                    al instante
                  </em>
                </h2>
                <ul className="space-y-4">
                  {NOTIFICACIONES.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check />
                      <span className="text-text-secondary text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Push notification mockup */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-sm bg-bg-elevated border border-border-subtle rounded-3xl p-6 shadow-card-hover animate-float">
                  {/* Notification header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-accent"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider">
                        Tu Barbería
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[10px] text-text-muted">ahora</span>
                      <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse-dot" />
                    </div>
                  </div>

                  <p className="font-body text-sm text-text-primary font-semibold mb-1.5">
                    Nueva reserva recibida
                  </p>
                  <p className="font-body text-sm text-text-secondary leading-relaxed mb-5">
                    Carlos M. reservó{" "}
                    <span className="text-text-primary font-medium">
                      Corte + Barba
                    </span>{" "}
                    para hoy a las{" "}
                    <span className="text-accent font-medium">15:30</span>
                  </p>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-accent text-black font-mono text-[11px] font-semibold py-2.5 rounded-lg hover:bg-accent-dim transition-colors">
                      Ver agenda
                    </button>
                    <button className="flex-1 border border-border-subtle text-text-secondary font-mono text-[11px] py-2.5 rounded-lg hover:border-accent/30 transition-colors">
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Plataforma en números ── */}
        <section className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-xl mx-auto mb-14">
              <p className="eyebrow mb-4">Plataforma en producción</p>
              <h2 className="text-text-primary">
                Números{" "}
                <em className="italic text-accent font-display">reales</em>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-border-subtle rounded-2xl overflow-hidden border border-border-subtle">
              {[
                { val: "93+",    label: "Citas gestionadas",      sub: "y contando"        },
                { val: "12",     label: "Locales activos",         sub: "multi-sede"        },
                { val: "1.341",  label: "Clientes registrados",    sub: "en la plataforma"  },
                { val: "51",     label: "Profesionales",           sub: "en agenda"         },
                { val: "18",     label: "Servicios distintos",     sub: "configurados"      },
                { val: "17%",    label: "Tasa de cancelación",     sub: "vs 35–45% industria" },
                { val: "6%",     label: "Churn de suscripción",    sub: "retención 94%"     },
              ].map((m) => (
                <div key={m.label} className="bg-bg-secondary flex flex-col items-center justify-center gap-1 py-8 px-4 text-center">
                  <span className="font-mono text-accent font-semibold text-2xl leading-none">{m.val}</span>
                  <span className="font-mono text-[10px] text-text-primary uppercase tracking-widest mt-2 leading-tight">{m.label}</span>
                  <span className="font-mono text-[9px] text-text-muted leading-tight">{m.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tecnología ── */}
        <section id="tecnologia" className="py-24 border-t border-border-subtle bg-bg-secondary">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-xl mx-auto mb-16">
              <p className="eyebrow mb-5">06 — SEO Edge & Marca Blanca</p>
              <h2 className="text-text-primary mb-4">
                Domina tu{" "}
                <em className="italic text-accent font-display">
                  comuna en Google
                </em>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Mientras tu competencia aparece con globos genéricos, tu negocio destaca con identidad propia, imágenes reales y meta descripciones automáticas gracias a nuestro Edge Middleware.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {TECH_PILLARS.map((p) => (
                <div
                  key={p.label}
                  className="bracket bg-bg-elevated border border-border-subtle rounded-2xl p-6 hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-3">
                    {p.idx}
                  </p>
                  <p className="font-display text-text-primary font-semibold mb-3 text-lg">
                    {p.label}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Precios ── */}
        <section id="precios" className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-xl mx-auto mb-14">
              <p className="eyebrow mb-5">Precios</p>
              <h2 className="text-text-primary mb-4">
                Simple,{" "}
                <em className="italic text-accent font-display">sin letra chica</em>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                El primer mes es gratis. Sin contratos largos. Cancela cuando quieras.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
              {/* Mensual */}
              <div className="rounded-2xl border border-border-subtle bg-bg-primary p-8 flex flex-col gap-5">
                <div>
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">Suscripción mensual</p>
                  <h3 className="font-display text-2xl font-bold text-text-primary">Mensual</h3>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    { period: "1er mes",          price: "$0",           sub: "completamente gratis",   accent: true  },
                    { period: "2do y 3er mes",     price: "$30.000/mes",  sub: "precio de lanzamiento",  accent: false },
                    { period: "Desde el 4to mes",  price: "$50.000/mes",  sub: "precio regular",         accent: false },
                  ].map((row) => (
                    <div key={row.period} className={`flex items-center justify-between px-4 py-3 rounded-xl border ${row.accent ? "border-accent/30 bg-accent/5" : "border-border-subtle"}`}>
                      <span className="font-mono text-[11px] text-text-muted">{row.period}</span>
                      <div className="text-right">
                        <span className={`font-mono font-semibold text-sm ${row.accent ? "text-accent" : "text-text-primary"}`}>{row.price}</span>
                        <p className="font-mono text-[9px] text-text-muted mt-0.5">{row.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <ul className="flex flex-col gap-2.5 mt-auto">
                  {["Todos los módulos incluidos", "Sin costo de implementación", "Cancela cuando quieras"].map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check />
                      <span className="text-sm text-text-secondary font-body">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Anual */}
              <div className="relative rounded-2xl border border-accent/40 bg-accent/5 p-8 flex flex-col gap-5">
                <div className="absolute -top-3 left-8">
                  <span className="bg-accent text-black font-mono text-[10px] font-bold px-3 py-1 rounded-full">
                    🔥 Mejor valor
                  </span>
                </div>

                <div>
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">Suscripción anual</p>
                  <h3 className="font-display text-2xl font-bold text-text-primary">Anual</h3>
                </div>

                <div>
                  <p className="font-mono text-3xl font-bold text-accent">$30.000<span className="text-lg font-normal text-text-muted">/mes</span></p>
                  <p className="font-mono text-[11px] text-text-muted mt-1">todo el año · $360.000 anuales</p>
                </div>

                <div className="bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3">
                  <p className="font-mono text-[11px] text-text-muted">vs plan mensual regular</p>
                  <p className="font-mono text-accent font-semibold text-sm mt-0.5">Ahorra $240.000 al año</p>
                </div>

                <ul className="flex flex-col gap-2.5 mt-auto">
                  {["Todos los módulos incluidos", "Sin costo de implementación", "Precio fijo garantizado 12 meses"].map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check />
                      <span className="text-sm text-text-secondary font-body">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="font-mono text-[11px] text-text-muted text-center">
              Precios en CLP + IVA · Un local incluido · Locales adicionales con tarifa especial
            </p>
          </div>
        </section>

        {/* ── CTA final ── */}
        <section id="contacto-agenda" className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="bracket border border-border-subtle rounded-2xl p-12 md:p-20 bg-bg-secondary text-center relative overflow-hidden">
              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(ellipse 55% 65% at 50% 100%,rgba(163,230,53,0.07) 0%,transparent 70%)",
                }}
              />
              <div className="relative">
                <p className="eyebrow mb-5">¿Tu barbería está lista?</p>
                <h2 className="text-text-primary max-w-lg mx-auto mb-6">
                  Agenda una demo{" "}
                  <em className="italic text-accent font-display">
                    sin compromiso
                  </em>
                </h2>
                <p className="text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
                  Te mostramos la plataforma en vivo, configurada con los datos
                  de tu negocio. Sin contratos largos, sin letra chica.
                </p>
                <a
                  href="/#contacto"
                  className="inline-flex items-center gap-2 bg-accent text-black font-bold text-sm px-8 py-4 rounded-lg shadow-lime hover:bg-accent-dim hover:text-white hover:scale-[1.02] transition-all"
                >
                  Agendar Demo
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

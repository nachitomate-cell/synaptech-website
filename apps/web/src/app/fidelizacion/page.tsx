import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sistemas de Fidelización Digital — Synaptech",
  description:
    "Tarjetas digitales Google Wallet, sellos gamificados y rangos VIP para retener clientes en barberías, retail y servicios en Chile. Sin app, sin tarjetas de papel.",
  keywords: ["fidelización digital Chile", "tarjeta Google Wallet", "programa de puntos Chile", "sellos digitales", "gamificación clientes", "retención clientes software"],
  alternates: { canonical: "https://synaptechspa.cl/fidelizacion" },
};

const WALLET = [
  "Tarjeta digital nativa en Google Wallet — en el teléfono del cliente en segundos",
  "Diseño de glassmorphism con destellos 3D (Shimmer) que imita una tarjeta VIP real",
  "Actualización en tiempo real: los sellos aparecen en la tarjeta sin recargar",
  "Compatibilidad con Apple Wallet mediante PWA instalable",
  "El cliente nunca pierde la tarjeta — siempre está en su billetera digital",
  "QR único por cliente para escaneo rápido en caja o recepción",
];

const SELLOS = [
  "Grilla interactiva de sellos con física de resortes y respuesta táctil",
  "Configuración flexible: cantidad de sellos para completar tarjeta y valor por visita",
  "Sellos parciales: permite premiar compras por monto en retail o servicios combinados",
  "Historial completo de visitas y canjes con fecha y sucursal",
  "Modo escáner para el staff: sello en un toque sin buscar al cliente en el sistema",
  "Multi-tarjeta: el cliente puede tener tarjetas activas en varios negocios del grupo",
];

const GAMIFICACION = [
  "Rangos automáticos basados en visitas acumuladas: Silver, Gold, Platinum",
  "Beneficios diferenciados por rango: descuentos, acceso anticipado y atención preferente",
  "Barra de progreso motivacional con física fluida que muestra cuánto falta para subir de rango",
  "Notificación push automática al alcanzar un nuevo rango o completar tarjeta",
  "Catálogo de premios canjeables: el cliente elige su recompensa dentro del catálogo",
  "Caducidad configurable de sellos para incentivar visitas frecuentes",
];

const CAMPANAS = [
  "Campañas de reactivación automáticas: mensaje push a clientes inactivos por N días",
  "Recordatorios de rango: '¡Te falta 1 visita para ser Gold!'",
  "Notificación de premio disponible cuando completa la tarjeta",
  "Segmentación por rango para enviar campañas solo a Platinum, por ejemplo",
  "Analytics de apertura y conversión de cada campaña enviada",
  "Sin costo adicional por push — no depende de WhatsApp ni SMS externos",
];

const ANALYTICS = [
  "Dashboard de retención: tasa de recompra, tiempo entre visitas y LTV por cliente",
  "Ranking de clientes más frecuentes y con mayor gasto acumulado",
  "Métricas de conversión del programa: qué % de clientes nuevos se registra",
  "Reporte de canjes: qué premios son los más solicitados y cuándo",
  "Comparativa de retención antes y después del lanzamiento del programa",
  "Exportación a CSV para análisis externo o CRM",
];

const TECH_PILLARS = [
  { idx: "01", label: "Google Wallet API", desc: "Integración nativa con la API de Google Wallet para emitir y actualizar tarjetas en tiempo real." },
  { idx: "02", label: "PWA Instalable", desc: "Sin App Store. El cliente instala la app desde el navegador en iOS y Android con una sola acción." },
  { idx: "03", label: "Push Nativo", desc: "Notificaciones push sin terceros ni costo por envío. Funcionan con la app cerrada en iOS y Android." },
  { idx: "04", label: "Tiempo Real", desc: "Los sellos y cambios de rango se reflejan instantáneamente en la tarjeta del cliente sin recargar." },
  { idx: "05", label: "Marca Blanca Total", desc: "Tu logotipo, tu paleta de colores y tu dominio. Cero referencias a Synaptech ni plataformas externas." },
];

function Check() {
  return (
    <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ImgPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`bracket relative bg-bg-elevated border border-border-subtle rounded-2xl flex flex-col items-center justify-center gap-3 overflow-hidden ${className}`}>
      <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden
        style={{ backgroundImage: "linear-gradient(rgba(163,230,53,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(163,230,53,0.07) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="relative flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-xl border border-border-subtle bg-bg-primary/50 flex items-center justify-center">
          <svg className="w-5 h-5 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
        </div>
        <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest text-center px-6 leading-relaxed">{label}</span>
      </div>
    </div>
  );
}

export default function FidelizacionPage() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary min-h-screen">

        {/* Hero */}
        <section className="relative pt-32 pb-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(163,230,53,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(163,230,53,0.04) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%,rgba(163,230,53,0.09) 0%,transparent 70%)" }} />
          </div>

          <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative">
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-[11px] text-text-muted hover:text-accent transition-colors mb-10">
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 8H3M7 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Volver al inicio
            </Link>

            <p className="eyebrow mb-6">Producto · Fidelización Digital</p>

            <h1 className="text-text-primary max-w-4xl mb-6 animate-fade-up">
              La tarjeta de fidelización{" "}
              <em className="italic text-accent font-display">que el papel nunca pudo ser</em>
            </h1>

            <p className="text-text-secondary text-xl max-w-2xl leading-relaxed font-body mb-12 animate-fade-up" style={{ animationDelay: "80ms" }}>
              Google Wallet, sellos gamificados y rangos VIP. Sin app que descargar, sin tarjetas que perder. Tu cliente lleva tu marca en su billetera digital.
            </p>

            <div className="flex flex-wrap gap-4 mb-20 animate-fade-up" style={{ animationDelay: "160ms" }}>
              <a href="#contacto-fidelizacion" className="bg-accent text-black font-bold text-sm px-7 py-3.5 rounded-lg shadow-lime hover:bg-accent-dim hover:text-white hover:scale-[1.02] transition-all">
                Solicitar Demo
              </a>
              <a href="#wallet" className="border border-border-subtle text-text-secondary font-body text-sm px-7 py-3.5 rounded-lg hover:border-accent/50 hover:text-text-primary transition-all inline-flex items-center gap-2">
                Ver características
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 3l5 5-5 5M3 8h10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <div className="flex flex-wrap gap-10 pt-6 border-t border-border-subtle animate-fade-up" style={{ animationDelay: "240ms" }}>
              {[
                { val: "Google Wallet", label: "Sin App Store" },
                { val: "Tiempo real",   label: "Sellos instantáneos" },
                { val: "Silver → Platinum", label: "Rangos VIP" },
                { val: "Push nativo",   label: "Sin costo extra" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="font-mono text-accent font-semibold text-lg">{s.val}</span>
                  <span className="font-mono text-[11px] text-text-muted uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Google Wallet */}
        <section id="wallet" className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="eyebrow mb-5">01 — Tarjeta Digital en Google Wallet</p>
                <h2 className="text-text-primary mb-8">
                  En su teléfono,{" "}
                  <em className="italic text-accent font-display">siempre contigo</em>
                </h2>
                <ul className="space-y-4">
                  {WALLET.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check />
                      <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ImgPlaceholder label="Tarjeta VIP en Google Wallet — glassmorphism con destellos 3D" className="aspect-[4/3]" />
            </div>
          </div>
        </section>

        {/* Sellos */}
        <section id="sellos" className="py-24 border-t border-border-subtle bg-bg-secondary">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ImgPlaceholder label="Grilla de sellos interactiva — física de resortes y respuesta táctil" className="aspect-[4/3] order-2 lg:order-1" />
              <div className="order-1 lg:order-2">
                <p className="eyebrow mb-5">02 — Sistema de Sellos Digital</p>
                <h2 className="text-text-primary mb-8">
                  La tarjeta de papel,{" "}
                  <em className="italic text-accent font-display">pero premium</em>
                </h2>
                <ul className="space-y-4">
                  {SELLOS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check />
                      <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Gamificación */}
        <section id="rangos" className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="eyebrow mb-5">03 — Rangos VIP y Gamificación</p>
                <h2 className="text-text-primary mb-6">
                  Clientes que{" "}
                  <em className="italic text-accent font-display">quieren subir de nivel</em>
                </h2>
                <p className="text-text-secondary mb-8 leading-relaxed">
                  Los rangos convierten la fidelización en un juego que el cliente quiere ganar. Cada visita tiene un propósito más allá de la compra.
                </p>
                <ul className="space-y-4 mb-8">
                  {GAMIFICACION.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check />
                      <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { label: "Silver",   color: "#94a3b8" },
                    { label: "Gold",     color: "#f59e0b" },
                    { label: "Platinum", color: "#a3e635" },
                  ].map((t) => (
                    <span key={t.label} className="font-mono text-[11px] font-semibold px-3.5 py-1.5 rounded-full border"
                      style={{ color: t.color, borderColor: `${t.color}55`, background: `${t.color}12` }}>
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
              <ImgPlaceholder label="Sistema de rangos VIP — barra de progreso y beneficios por nivel" className="aspect-[4/3]" />
            </div>
          </div>
        </section>

        {/* Campañas */}
        <section id="campanas" className="py-24 border-t border-border-subtle bg-bg-secondary">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ImgPlaceholder label="Panel de campañas — segmentación por rango y métricas de conversión" className="aspect-[4/3] order-2 lg:order-1" />
              <div className="order-1 lg:order-2">
                <p className="eyebrow mb-5">04 — Campañas y Reactivación</p>
                <h2 className="text-text-primary mb-8">
                  Recupera clientes{" "}
                  <em className="italic text-accent font-display">en piloto automático</em>
                </h2>
                <ul className="space-y-4">
                  {CAMPANAS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check />
                      <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics */}
        <section id="analytics" className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="eyebrow mb-5">05 — Analytics de Retención</p>
              <h2 className="text-text-primary mb-6">
                Métricas que{" "}
                <em className="italic text-accent font-display">importan</em>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                No solo sabes cuántas visitas tuviste — sabes quién vuelve, con qué frecuencia y cuánto vale cada cliente en el tiempo.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl mx-auto">
              {ANALYTICS.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check />
                  <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Pillars */}
        <section className="py-24 border-t border-border-subtle bg-bg-secondary">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-xl mx-auto mb-16">
              <p className="eyebrow mb-5">06 — Tecnología</p>
              <h2 className="text-text-primary mb-4">
                Sin fricciones,{" "}
                <em className="italic text-accent font-display">sin descargas</em>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                El cliente no descarga nada. Tú no instalas nada. El programa funciona desde el primer día.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {TECH_PILLARS.map((p) => (
                <div key={p.label} className="bracket bg-bg-elevated border border-border-subtle rounded-2xl p-6 hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-200">
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-3">{p.idx}</p>
                  <p className="font-display text-text-primary font-semibold mb-3 text-lg">{p.label}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industrias */}
        <section className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-xl mx-auto mb-14">
              <p className="eyebrow mb-5">Industrias</p>
              <h2 className="text-text-primary mb-4">
                Para cualquier negocio{" "}
                <em className="italic text-accent font-display">con clientes recurrentes</em>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { sector: "Barberías & Salud",  desc: "Cortes, barba, manicure — clientes que vienen cada semana." },
                { sector: "Retail",              desc: "Puntos por compra, descuentos por rango y reactivación automática." },
                { sector: "Restaurantes & Café", desc: "Tarjeta de sellos digital para reemplazar la tarjeta de cartón." },
                { sector: "Servicios",           desc: "Gimnasios, lavandería, veterinaria — cualquier visita recurrente." },
              ].map((i) => (
                <div key={i.sector} className="bg-bg-secondary border border-border-subtle rounded-2xl p-6 hover:border-accent/30 transition-all">
                  <p className="font-display text-text-primary font-semibold mb-2">{i.sector}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{i.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Caso real */}
        <section className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="eyebrow mb-5">Caso real · Patio Curauma</p>
                <h2 className="text-text-primary mb-6">
                  Club de fidelización{" "}
                  <em className="italic text-accent font-display">en producción</em>
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Centro comercial en Valparaíso con 46 locales participantes. Implementamos una PWA instalable con sellos digitales, Google Wallet, canje de premios, directorio de emprendedores con mapa y notificaciones con IA.
                </p>
                <p className="text-text-secondary leading-relaxed mb-8 italic text-sm border-l-2 border-accent/40 pl-4">
                  "Club Patio Curauma cuenta con más de 215 socios activos, 46 locales participantes y ha entregado más de 328 sellos de fidelización — con una satisfacción promedio de 8.6 / 10 según sus propios usuarios."
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: "+215",    label: "Socios registrados" },
                    { val: "46",      label: "Locales participantes" },
                    { val: "+328",    label: "Sellos entregados" },
                    { val: "8.6/10", label: "Satisfacción NPS" },
                  ].map((m) => (
                    <div key={m.label} className="bg-bg-secondary border border-border-subtle rounded-xl p-5">
                      <p className="font-mono text-accent font-semibold text-xl mb-1">{m.val}</p>
                      <p className="font-mono text-[11px] text-text-muted uppercase tracking-widest">{m.label}</p>
                    </div>
                  ))}
                </div>
                <Link href="/casos/patio-curauma" className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-accent hover:gap-3 transition-all">
                  Ver caso completo
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
              <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-8">
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-6">Stack tecnológico</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Next.js", "Firebase", "PWA", "Google Wallet API", "Gemini AI", "Firestore", "FCM", "Vercel"].map((t) => (
                    <span key={t} className="font-mono text-[11px] text-text-secondary border border-border-subtle rounded-full px-3 py-1.5 bg-bg-elevated">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="border-t border-border-subtle pt-6">
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-4">También incluye</p>
                  <ul className="flex flex-col gap-2.5">
                    {[
                      "15 premios canjeados por socios",
                      "Notificaciones push con IA (Gemini)",
                      "Programa de referidos integrado",
                      "Radar de anomalías en tiempo real",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <svg className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-text-secondary text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contacto-fidelizacion" className="py-24 border-t border-border-subtle bg-bg-secondary">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="bracket border border-border-subtle rounded-2xl p-12 md:p-20 bg-bg-primary text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" aria-hidden
                style={{ background: "radial-gradient(ellipse 55% 65% at 50% 100%,rgba(163,230,53,0.07) 0%,transparent 70%)" }} />
              <div className="relative">
                <p className="eyebrow mb-5">¿Listo para fidelizar?</p>
                <h2 className="text-text-primary max-w-lg mx-auto mb-6">
                  Implementamos tu programa{" "}
                  <em className="italic text-accent font-display">en semanas</em>
                </h2>
                <p className="text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
                  Te mostramos el sistema funcionando con los datos de tu negocio. Sin contratos largos, sin letra chica. Si no hay encaje, te lo decimos de frente.
                </p>
                <a href="/#diagnostico" className="inline-flex items-center gap-2 bg-accent text-black font-bold text-sm px-8 py-4 rounded-lg shadow-lime hover:bg-accent-dim hover:text-white hover:scale-[1.02] transition-all">
                  Solicitar Diagnóstico Gratis
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
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

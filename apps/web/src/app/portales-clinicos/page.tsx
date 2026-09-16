import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  /* Fuera del índice de Google (16-09-2026): esta ruta es herencia de cuando
     SynapTech vendía desarrollo a medida, y era parte de lo que hizo que el
     dominio se evaluara como consultora. No se borra para no romper URLs ya
     indexadas; se saca del índice y del sitemap. */
  robots: { index: false, follow: true },

  title: "Portales clínicos — SynapTech",
  description:
    "Software clínico a medida para centros de salud en Chile: agendamiento online, ficha electrónica, DICOM, facturación SII y gestión Fonasa/Isapre. Caso real: ViñaMed redujo no-shows de 38% a 17%.",
  keywords: ["portal clínico Chile", "software médico a medida", "ficha clínica electrónica", "DICOM Chile", "gestión pacientes digital", "automatización clínica Chile"],
  alternates: { canonical: "https://synaptechspa.cl/portales-clinicos" },
};

const AGENDAMIENTO = [
  "Portal de reservas online 24/7 sin registro obligatorio para el paciente",
  "Recordatorios automáticos por WhatsApp y SMS a 24h y 2h antes de la cita",
  "Reducción comprobada del no-show: de 38% a 17% en 3 meses (caso ViñaMed)",
  "Elección de especialista con foto, especialidad y disponibilidad en tiempo real",
  "Confirmación y cancelación con un toque desde el teléfono del paciente",
  "Multi-sede: gestión unificada de varias sucursales desde un solo panel",
];

const FICHA = [
  "Ficha clínica electrónica estructurada con alertas de alergias y medicamentos",
  "Historial de atenciones con búsqueda instantánea por RUT, nombre o fecha",
  "Auditoría completa: registro de quién accedió y modificó cada documento",
  "Cumplimiento Ley 20.584 (Derechos del Paciente) y exigencias MINSAL",
  "Consentimientos informados digitales con firma electrónica",
  "Carga de documentos adjuntos: exámenes, informes y recetas",
];

const DICOM = [
  "Visualización DICOM integrada directamente en la ficha del paciente",
  "Soporte para radiografías, ecografías, TAC y resonancias magnéticas",
  "Acceso autorizado desde cualquier dispositivo dentro del centro",
  "Almacenamiento seguro con backup automático en la nube",
  "Sin instalar software adicional — funciona en el navegador",
  "Descarga de imágenes en formato estándar para derivaciones",
];

const FACTURACION = [
  "Emisión automática de boletas y facturas electrónicas al SII al momento del pago",
  "Gestión de bonos Fonasa e Isapre: cálculo automático del copago del paciente",
  "Integración con Webpay para cobros online previos a la consulta",
  "Eliminación de doble digitación: el sistema no requiere ingresar datos en múltiples plataformas",
  "Conciliación automática de pagos al cierre del día",
  "Reportes de ingresos por especialidad, médico y tipo de prestación",
];

const PANEL = [
  "Vista de agenda de todo el equipo médico con filtros por especialidad y sala",
  "Bloqueo rápido de horarios por feriados, reuniones o licencias",
  "CRM de pacientes con historial clínico y datos de contacto centralizados",
  "Dashboard de métricas: ocupación, no-shows, ingresos y tiempo promedio de atención",
  "Gestión de salas y equipos: asignación automática según tipo de consulta",
  "Control de acceso por rol: médico, recepcionista, jefe de clínica y administrador",
];

const TECH_PILLARS = [
  { idx: "01", label: "MINSAL Compliant", desc: "Arquitectura que cumple la Ley 20.584 y los requerimientos de auditabilidad del Ministerio de Salud." },
  { idx: "02", label: "DICOM Nativo", desc: "Visualizador DICOM integrado sin plugins externos, accesible desde cualquier navegador moderno." },
  { idx: "03", label: "SII + Previred", desc: "Integración directa con el SII para DTE y con Previred para procesamiento de licencias médicas." },
  { idx: "04", label: "Fonasa / Isapre", desc: "Cálculo automático de copagos y verificación de cobertura en tiempo real." },
  { idx: "05", label: "PWA Instalable", desc: "El equipo médico accede desde cualquier dispositivo sin descargar una app. Funciona sin conexión para ver fichas cacheadas." },
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

export default function PortalesClinicosPage() {
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

            <p className="eyebrow mb-6">Producto · HealthTech</p>

            <h1 className="text-text-primary max-w-4xl mb-6 animate-fade-up">
              El portal clínico que{" "}
              <em className="italic text-accent font-display">tu centro merece</em>
            </h1>

            <p className="text-text-secondary text-xl max-w-2xl leading-relaxed font-body mb-12 animate-fade-up" style={{ animationDelay: "80ms" }}>
              Agendamiento online, ficha electrónica, DICOM y facturación automática al SII — todo integrado, sin papel y sin doble digitación.
            </p>

            <div className="flex flex-wrap gap-4 mb-20 animate-fade-up" style={{ animationDelay: "160ms" }}>
              <a href="#contacto-clinico" className="bg-accent text-black font-bold text-sm px-7 py-3.5 rounded-lg shadow-lime hover:bg-accent-dim hover:text-white hover:scale-[1.02] transition-all">
                Solicitar Demo
              </a>
              <a href="#agendamiento" className="border border-border-subtle text-text-secondary font-body text-sm px-7 py-3.5 rounded-lg hover:border-accent/50 hover:text-text-primary transition-all inline-flex items-center gap-2">
                Ver características
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 3l5 5-5 5M3 8h10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <div className="flex flex-wrap gap-10 pt-6 border-t border-border-subtle animate-fade-up" style={{ animationDelay: "240ms" }}>
              {[
                { val: "−55%",     label: "No-shows (caso ViñaMed)" },
                { val: "2 min",    label: "Tiempo de admisión" },
                { val: "DICOM",    label: "Imágenes integradas" },
                { val: "SII + Fonasa", label: "Facturación automática" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="font-mono text-accent font-semibold text-lg">{s.val}</span>
                  <span className="font-mono text-[11px] text-text-muted uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agendamiento */}
        <section id="agendamiento" className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="eyebrow mb-5">01 — Agendamiento Online</p>
                <h2 className="text-text-primary mb-8">
                  Menos no-shows,{" "}
                  <em className="italic text-accent font-display">más atenciones</em>
                </h2>
                <ul className="space-y-4">
                  {AGENDAMIENTO.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check />
                      <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ImgPlaceholder label="Portal de reservas online — selección de especialista y horario" className="aspect-[4/3]" />
            </div>
          </div>
        </section>

        {/* Ficha Clínica */}
        <section id="ficha" className="py-24 border-t border-border-subtle bg-bg-secondary">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ImgPlaceholder label="Ficha clínica electrónica — historial, alertas y documentos" className="aspect-[4/3] order-2 lg:order-1" />
              <div className="order-1 lg:order-2">
                <p className="eyebrow mb-5">02 — Ficha Clínica Electrónica</p>
                <h2 className="text-text-primary mb-8">
                  Cada paciente,{" "}
                  <em className="italic text-accent font-display">siempre disponible</em>
                </h2>
                <ul className="space-y-4">
                  {FICHA.map((item) => (
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

        {/* DICOM */}
        <section id="dicom" className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="eyebrow mb-5">03 — Integración DICOM</p>
                <h2 className="text-text-primary mb-8">
                  Imágenes diagnósticas{" "}
                  <em className="italic text-accent font-display">en la ficha</em>
                </h2>
                <ul className="space-y-4">
                  {DICOM.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check />
                      <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ImgPlaceholder label="Visualizador DICOM integrado — radiografías y ecografías en ficha" className="aspect-[4/3]" />
            </div>
          </div>
        </section>

        {/* Facturación */}
        <section id="facturacion" className="py-24 border-t border-border-subtle bg-bg-secondary">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ImgPlaceholder label="Módulo de facturación — cobros, bonos y reportes de ingresos" className="aspect-[4/3] order-2 lg:order-1" />
              <div className="order-1 lg:order-2">
                <p className="eyebrow mb-5">04 — Facturación Automática</p>
                <h2 className="text-text-primary mb-8">
                  Sin doble digitación,{" "}
                  <em className="italic text-accent font-display">sin errores</em>
                </h2>
                <ul className="space-y-4">
                  {FACTURACION.map((item) => (
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

        {/* Panel */}
        <section id="panel" className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="eyebrow mb-5">05 — Panel de Administración</p>
              <h2 className="text-text-primary mb-6">
                Control total{" "}
                <em className="italic text-accent font-display">del centro</em>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Un panel centralizado para gestionar médicos, salas, métricas y comunicación — sin exportar a Excel.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl mx-auto">
              {PANEL.map((item) => (
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
              <p className="eyebrow mb-5">06 — Tecnología & Compliance</p>
              <h2 className="text-text-primary mb-4">
                Construido para{" "}
                <em className="italic text-accent font-display">el sector salud</em>
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Cumplimiento regulatorio desde el diseño, no como parche posterior.
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

        {/* Caso real */}
        <section className="py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="eyebrow mb-5">Caso real · ViñaMed</p>
                <h2 className="text-text-primary mb-6">
                  Resultados en{" "}
                  <em className="italic text-accent font-display">90 días</em>
                </h2>
                <p className="text-text-secondary leading-relaxed mb-8">
                  Centro médico de Viña del Mar con 12 profesionales. Implementamos agendamiento online, recordatorios automáticos por WhatsApp, ficha electrónica y visualización DICOM integrada.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { val: "38% → 17%", label: "Tasa de no-shows" },
                    { val: "8 → 2 min",  label: "Tiempo de admisión" },
                    { val: "100%",       label: "Citas digitales" },
                    { val: "0 papeles",  label: "Fichas en proceso" },
                  ].map((m) => (
                    <div key={m.label} className="bg-bg-secondary border border-border-subtle rounded-xl p-5">
                      <p className="font-mono text-accent font-semibold text-xl mb-1">{m.val}</p>
                      <p className="font-mono text-[11px] text-text-muted uppercase tracking-widest">{m.label}</p>
                    </div>
                  ))}
                </div>
                <Link href="/casos/vinamed" className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-accent hover:gap-3 transition-all">
                  Ver caso completo
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
              <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-8">
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-6">Stack tecnológico</p>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Supabase", "DICOM.js", "Resend", "Webpay", "SII DTE", "Fonasa API", "Vercel", "PWA"].map((t) => (
                    <span key={t} className="font-mono text-[11px] text-text-secondary border border-border-subtle rounded-full px-3 py-1.5 bg-bg-elevated">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contacto-clinico" className="py-24 border-t border-border-subtle bg-bg-secondary">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="bracket border border-border-subtle rounded-2xl p-12 md:p-20 bg-bg-primary text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" aria-hidden
                style={{ background: "radial-gradient(ellipse 55% 65% at 50% 100%,rgba(163,230,53,0.07) 0%,transparent 70%)" }} />
              <div className="relative">
                <p className="eyebrow mb-5">¿Tu centro está listo?</p>
                <h2 className="text-text-primary max-w-lg mx-auto mb-6">
                  Diagnóstico gratuito{" "}
                  <em className="italic text-accent font-display">en 48 horas</em>
                </h2>
                <p className="text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
                  Prueba la plataforma con tus datos reales: agenda, fichas, recordatorios y cobros andando. Sin costo y sin tarjeta.
                </p>
                <a href="https://empieza.synaptechspa.cl" className="inline-flex items-center gap-2 bg-accent text-black font-bold text-sm px-8 py-4 rounded-lg shadow-lime hover:bg-accent-dim hover:text-white hover:scale-[1.02] transition-all">
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

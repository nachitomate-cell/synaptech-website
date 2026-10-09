import type { Metadata } from "next";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import { waLink } from "@/content/catalogo";

export const metadata: Metadata = {
  title: "Nosotros | SynapTech, empresa chilena de software para locales de servicio",
  description: "Synaptech SpA (RUT 78.402.009-6) es una empresa chilena de Viña del Mar que construye y opera una plataforma de agenda, cobros, asistente con IA y fidelización para barberías, salones y centros de estética.",
  alternates: { canonical: "https://synaptechspa.cl/nosotros" },
  openGraph: {
    title: "Nosotros | SynapTech",
    description: "Una empresa chilena de producto: una sola plataforma para que los locales de servicio funcionen mejor.",
    url: "https://synaptechspa.cl/nosotros",
  },
};

/* Reescrita el 09-10-2026: la versión anterior contaba la historia como
   agencia ("5 proyectos en producción", "Diagnóstico gratis", "cuatro
   industrias"). SynapTech es UN producto por suscripción (memoria
   project_sitio_corporativo). Hitos con fecha verificada en la memoria. */

const NUMEROS = [
  { v: "+35", l: "locales y sedes en Chile" },
  { v: "+36.000", l: "clientes en sus fichas" },
  { v: "+18.000", l: "citas y reservas agendadas" },
  { v: "2", l: "apps publicadas" },
];

const PRINCIPIOS = [
  { t: "Un solo producto", d: "No hacemos proyectos a medida. Construimos y operamos una plataforma, y cada mejora le llega a todos los locales." },
  { t: "Lo construimos con los locales", d: "La mayoría de lo que hace hoy la plataforma lo pidió alguien que la usa todos los días. La mejoramos cada semana." },
  { t: "Personas al otro lado", d: "El soporte es directo por WhatsApp, con alguien que conoce tu local, no con un formulario." },
  { t: "Tus datos son tuyos", d: "Sin permanencia: si te vas, te entregamos tu información exportada." },
];

const HITOS = [
  { f: "Abril 2026", t: "Nace Synaptech SpA en Viña del Mar." },
  { f: "Agosto 2026", t: "SynapTech Studio, la app para el equipo, llega a la App Store." },
  { f: "Septiembre 2026", t: "La app llega a Google Play y salen las primeras boletas de honorarios con folio real del SII, emitidas solas al cerrar la cita." },
  { f: "Octubre 2026", t: "Partner certificado de Mercado Pago y más de 35 locales y sedes trabajando con la plataforma." },
];

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">Nosotros</p>
            <h1 className="text-ink max-w-5xl">Hacemos el software con el que funcionan los locales de servicio.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
              Somos una empresa chilena de producto, en Viña del Mar. Construimos y operamos
              una sola plataforma —agenda, cobros, asistente con IA y fidelización— para
              barberías, salones y centros de estética.
            </p>
          </div>
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 border-y border-border-subtle">
              {NUMEROS.map((n, i) => (
                <div key={n.l} className={`py-7 px-4 text-center ${i % 2 ? "border-l border-border-subtle" : ""} ${i === 2 ? "md:border-l" : ""} ${i > 1 ? "border-t md:border-t-0 border-border-subtle" : ""}`}>
                  <p className="font-display font-bold text-ink text-3xl sm:text-4xl tracking-tight">{n.v}</p>
                  <p className="text-sm text-text-muted mt-1">{n.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16">
            <div>
              <p className="eyebrow mb-4">El fundador</p>
              <h2 className="text-ink">Ignacio Mateluna</h2>
              <p className="text-text-muted mt-2">Fundador y desarrollador de SynapTech</p>
            </div>
            <div className="space-y-5 text-text-secondary text-lg leading-relaxed">
              <p>
                Enfermero universitario de formación y desarrollador de software por
                convicción. De la clínica trajo una forma de trabajar: atención al detalle,
                cero tolerancia al error y claridad bajo presión.
              </p>
              <p>
                Todo partió con una herramienta que le hizo a su padre para ordenar sus
                finanzas, y con una pregunta que no se fue:
              </p>
              <p className="border-l-4 border-lime pl-5 text-ink font-semibold text-xl">
                ¿Cuántos negocios están operando con herramientas que no fueron hechas para ellos?
              </p>
              <p>
                SynapTech es la respuesta para los locales de servicio: una plataforma
                pensada para cómo trabaja de verdad una barbería, un salón o un centro de
                estética en Chile.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Cómo trabajamos</p>
              <h2 className="text-ink">Lo que puedes esperar de nosotros.</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PRINCIPIOS.map((p) => (
                <article key={p.t} className="rounded-[28px] bg-mist p-7">
                  <h3 className="font-display font-bold text-ink text-xl tracking-tight">{p.t}</h3>
                  <p className="text-text-secondary mt-3 leading-relaxed">{p.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-ink text-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
            <div>
              <p className="eyebrow !text-lime mb-4">Hitos</p>
              <h2 className="text-white">De Viña del Mar a todo Chile.</h2>
            </div>
            <ol className="relative border-l border-white/15 ml-2">
              {HITOS.map((h) => (
                <li key={h.f} className="pl-8 pb-10 last:pb-0 relative">
                  <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-lime ring-4 ring-ink" aria-hidden />
                  <p className="text-lime font-semibold">{h.f}</p>
                  <p className="text-white/85 text-lg mt-1 leading-relaxed">{h.t}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-[28px] border border-border-subtle p-7 sm:p-10">
              <p className="eyebrow mb-4">Datos de la empresa</p>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-[15px]">
                <dt className="text-text-muted">Razón social</dt><dd className="text-ink font-semibold">Synaptech SpA</dd>
                <dt className="text-text-muted">RUT</dt><dd className="text-ink font-semibold">78.402.009-6</dd>
                <dt className="text-text-muted">Domicilio</dt><dd className="text-ink font-semibold">Viña del Mar, Región de Valparaíso</dd>
                <dt className="text-text-muted">Correo</dt><dd><a href="mailto:hola@synaptechspa.cl" className="text-ink font-semibold hover:text-accent">hola@synaptechspa.cl</a></dd>
                <dt className="text-text-muted">Instagram</dt><dd><a href="https://instagram.com/synaptechspa" target="_blank" rel="noopener noreferrer" className="text-ink font-semibold hover:text-accent">@synaptechspa</a></dd>
              </dl>
            </div>
            <div className="rounded-[28px] bg-lime/20 p-7 sm:p-10 flex flex-col justify-between gap-6">
              <div>
                <p className="eyebrow mb-4">Conversemos</p>
                <p className="font-display font-bold text-ink text-2xl sm:text-3xl tracking-tight">¿Quieres ver la plataforma con los datos de tu local?</p>
              </div>
              <a href={waLink("Hola, quiero ver SynapTech con los datos de mi local")} target="_blank" rel="noopener noreferrer"
                className="self-start inline-flex items-center bg-ink text-white font-semibold px-6 py-3.5 rounded-full hover:bg-black transition-colors">
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

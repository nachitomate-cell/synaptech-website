import type { Metadata } from "next";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import Pricing  from "@/components/Pricing";
import Cambiate from "@/components/Cambiate";
import CtaFinal from "@/components/CtaFinal";
import TablaPlanes from "@/components/TablaPlanes";
import { ADICIONALES } from "@/content/precios";

export const metadata: Metadata = {
  title: "Precios de SynapTech | Planes desde $29.900 + IVA por local, profesionales ilimitados",
  description: "Qué incluye cada plan de SynapTech: Básico $29.900, Pro $49.900 con asistente IA por WhatsApp y Full $69.900 con Instagram, más IVA, por local. Profesionales ilimitados, sin comisión por cita, adicionales con precio publicado.",
  alternates: { canonical: "https://synaptechspa.cl/precios" },
};

const PREGUNTAS = [
  { q: "¿Cobran por profesional o por silla?", a: "No. El precio es por local y los profesionales son ilimitados en todos los planes: si mañana sumas a alguien al equipo, tu mensualidad no cambia." },
  { q: "¿Cobran comisión por cita o por reserva?", a: "No. Las citas son ilimitadas y no cobramos nada por reserva. Si cobras online, la comisión es la del medio de pago (Mercado Pago, Flow o TUU), no nuestra." },
  { q: "¿Qué pasa si se acaban las conversaciones del asistente?", a: "Syna no se apaga en silencio: deriva la conversación a una persona de tu equipo y te avisa. Si tu local necesita más, hay tramos de 500 y 1.000 conversaciones al mes." },
  { q: "¿Tengo que pagar el año completo?", a: "No. Los planes son mensuales y sin permanencia. El plan anual es una opción para quien prefiere pagar una vez: $399.000 + IVA por todo el Pro, que equivale a 8 meses." },
  { q: "¿Cómo pago la mensualidad?", a: "Con tarjeta, en un cobro automático mensual por Mercado Pago, o por transferencia a la cuenta de Synaptech SpA." },
  { q: "Tengo más de un local, ¿cuánto cuesta?", a: "Cada sede tiene su agenda, su equipo y su caja, y te mueves entre ellas desde el mismo panel. Para dos o más locales te cotizamos un precio por volumen." },
];

export default function PreciosPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-4">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">Precios</p>
            <h1 className="text-ink max-w-4xl">Claro desde el primer día.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
              Un precio por local, profesionales ilimitados y sin comisión por cita. Todo
              lo que incluye cada plan, y lo que cuesta cada adicional, está escrito acá.
            </p>
          </div>
        </section>

        <Pricing conEnlace={false} />

        {/* Tabla completa */}
        <section id="comparativa" className="py-16 md:py-24 scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Qué incluye cada plan</p>
              <h2 className="text-ink">Todo, punto por punto.</h2>
            </div>

            <TablaPlanes />
          </div>
        </section>

        {/* Adicionales */}
        <section id="adicionales" className="py-16 md:py-24 bg-mist scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Adicionales</p>
              <h2 className="text-ink">Suma solo lo que tu local necesita.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Se agregan a cualquier plan y se pueden quitar cuando quieras. Precios netos, más IVA.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ADICIONALES.map((a) => (
                <article key={a.nombre} className="rounded-[28px] bg-white p-7 flex flex-col">
                  <h3 className="font-display font-bold text-ink text-xl tracking-tight">{a.nombre}</h3>
                  <p className="text-text-secondary mt-2 leading-relaxed flex-1">{a.desc}</p>
                  <p className="mt-5 font-display font-bold text-2xl text-ink tracking-tight">{a.precio}</p>
                  {a.nota && <p className="text-sm text-text-muted mt-1">{a.nota}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <Cambiate />

        {/* Preguntas de precio */}
        <section id="faq-precios" className="py-16 md:py-24 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
            <div>
              <p className="eyebrow mb-4">Preguntas</p>
              <h2 className="text-ink">Lo que nos preguntan antes de partir.</h2>
            </div>
            <div className="divide-y divide-border-subtle border-y border-border-subtle">
              {PREGUNTAS.map((p) => (
                <details key={p.q} className="group py-5">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-ink text-lg">
                    {p.q}
                    <span className="w-8 h-8 shrink-0 rounded-full bg-mist flex items-center justify-center transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="text-text-secondary leading-relaxed mt-3 pr-10">{p.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

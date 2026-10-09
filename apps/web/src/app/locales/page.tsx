import type { Metadata } from "next";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import ListaLocales from "@/components/ListaLocales";
import { obtenerLocales, PAGINAS } from "@/lib/directorio";
import { SIGNUP_URL, waLink } from "@/content/catalogo";

/* Portada del directorio de locales (Red Synaptech). Se regenera una vez al
   día con la lista viva del directorio: ver lib/directorio.ts. */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Encuentra tu barbería o salón | Reserva online en la Red Synaptech",
  description: "Barberías, peluquerías y centros de estética de la Región de Valparaíso que trabajan con SynapTech. Mira sus opiniones y reserva tu hora online, las 24 horas.",
  alternates: { canonical: "https://synaptechspa.cl/locales" },
};

export default async function LocalesPage() {
  const locales = await obtenerLocales();
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-10">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">Red Synaptech · Directorio de locales</p>
            <h1 className="text-ink max-w-4xl">Encuentra tu local y reserva tu hora.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
              Barberías, peluquerías y centros de estética de la Región de Valparaíso que
              trabajan con SynapTech. Todos con reserva online, a cualquier hora.
            </p>
          </div>
        </section>

        {locales.length > 0 && (
          <section className="pb-16 md:pb-24">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <ListaLocales locales={locales} />
              <p className="text-xs text-text-muted mt-6">Notas y cantidad de opiniones según Google.</p>
            </div>
          </section>
        )}

        <section className="py-16 md:py-20 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-8">
              <p className="eyebrow mb-3">Por zona</p>
              <h2 className="text-ink">Los mejores evaluados de cada zona.</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {PAGINAS.map((p) => (
                <a key={p.slug} href={`/${p.slug}`}
                  className="group rounded-[24px] bg-white p-6 sm:p-7 flex items-center justify-between gap-4 hover:shadow-card-hover transition-shadow">
                  <span>
                    <span className="block font-display font-bold text-ink text-xl tracking-tight">{p.titulo}</span>
                    <span className="block text-text-muted mt-1">{p.bajada}</span>
                  </span>
                  <span className="w-10 h-10 shrink-0 rounded-full bg-lime text-ink flex items-center justify-center transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="rounded-[32px] bg-ink text-white p-8 sm:p-12 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
              <div>
                <p className="text-lime text-xs font-bold uppercase tracking-[0.12em]">¿Tienes un local?</p>
                <h2 className="text-white mt-3">Aparece en la Red Synaptech.</h2>
                <p className="text-white/70 text-lg mt-4 leading-relaxed max-w-xl">
                  Los locales que trabajan con SynapTech pueden aparecer en este directorio con su
                  foto, sus opiniones de Google y su reserva online. Y si prefieres no aparecer,
                  no apareces.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <a href={`${SIGNUP_URL}?ref=locales`}
                  className="inline-flex justify-center items-center bg-lime text-ink font-semibold px-7 py-4 rounded-full hover:bg-white transition-colors">
                  Empezar gratis
                </a>
                <a href={waLink("Hola, tengo un local y quiero aparecer en la Red Synaptech")} target="_blank" rel="noopener noreferrer"
                  className="inline-flex justify-center items-center border border-white/25 text-white font-semibold px-7 py-4 rounded-full hover:border-white/60 transition-colors">
                  Hablar por WhatsApp
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

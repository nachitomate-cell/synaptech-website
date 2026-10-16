import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import ListaLocales from "@/components/ListaLocales";
import FaqSeo from "@/components/FaqSeo";
import { obtenerLocales, logoAbsoluto, PAGINAS, type LocalDirectorio } from "@/lib/directorio";
import { porRegion, preguntasDirectorio } from "@/lib/directorio-faq";
import { alta, waLink } from "@/content/catalogo";
import { metaPagina, SITIO } from "@/lib/seo";

/* Portada del directorio de locales (Red Synaptech). Se regenera una vez al
   día con la lista viva del directorio y los datos de cada local que publica
   la plataforma: ver lib/directorio.ts.

   SEO (16-10-2026): todo lo que importa está en el HTML que baja Googlebot sin
   ejecutar JS (la lista se renderiza en el servidor): nombre en <h2>, "{rubro}
   en {comuna}" visible, dirección, servicios y "Reservar hora en {nombre}".
   Debajo, los locales agrupados por región y comuna con enlaces reales, las
   preguntas frecuentes con datos vivos y el JSON-LD (CollectionPage + ItemList
   de LocalBusiness con el MISMO @id que el JSON-LD de la página de cada local). */
export const revalidate = 86400;

const TITULO = "Barberías, peluquerías y spas con reserva online | SynapTech";

export async function generateMetadata() {
  const locales = await obtenerLocales();
  const comunas = new Set(locales.map((l) => l.comuna).filter(Boolean)).size;
  return metaPagina({
    title: TITULO,
    description: `Directorio de ${locales.length} barberías, peluquerías, spas y centros de estética en ${comunas} comunas de Chile. Reserva tu hora online, sin llamar.`,
    path: "/locales",
  });
}

/* Páginas por zona que sirve app.synaptechspa.cl (rewrite en next.config.mjs). */
const ZONAS_POR_REGION: Record<string, string[]> = {
  "Región de Valparaíso": ["barberias-quinta-region", "peluquerias-quinta-region"],
};
const ZONAS_POR_COMUNA: Record<string, string[]> = {
  "Viña del Mar": ["barberias-vina-del-mar", "peluquerias-vina-del-mar"],
};
const tituloZona = (slug: string) => PAGINAS.find((p) => p.slug === slug)?.titulo ?? slug;

function jsonLd(locales: LocalDirectorio[], descripcion: string) {
  const url = `${SITIO}/locales`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage", "@id": `${url}#pagina`, url, name: TITULO, description: descripcion,
        inLanguage: "es-CL", publisher: { "@id": `${SITIO}/#org` }, mainEntity: { "@id": `${url}#lista` },
      },
      {
        "@type": "ItemList", "@id": `${url}#lista`, name: "Locales con reserva online de la Red SynapTech",
        numberOfItems: locales.length, itemListOrder: "https://schema.org/ItemListUnordered",
        itemListElement: locales.map((l, i) => {
          const imagen = logoAbsoluto(l);
          return {
            "@type": "ListItem", position: i + 1,
            item: {
              "@type": l.schemaType,
              // El mismo @id que declara la página del local: Google une las dos entidades.
              "@id": `${l.web}/#negocio`,
              name: l.nombre, url: l.web,
              ...(imagen ? { image: imagen } : {}),
              address: {
                "@type": "PostalAddress", addressCountry: "CL",
                ...(l.direccion ? { streetAddress: l.direccion } : {}),
                ...(l.comuna ? { addressLocality: l.comuna } : {}),
                ...(l.region ? { addressRegion: l.region } : {}),
              },
              ...(l.lat != null && l.lng != null ? { geo: { "@type": "GeoCoordinates", latitude: l.lat, longitude: l.lng } } : {}),
              ...(l.precioMin && l.precioMax ? { priceRange: `$${l.precioMin.toLocaleString("es-CL")} – $${l.precioMax.toLocaleString("es-CL")}` } : {}),
            },
          };
        }),
      },
    ],
  };
}

export default async function LocalesPage() {
  const locales = await obtenerLocales();
  const grupos = porRegion(locales);
  const comunas = grupos.reduce((a, g) => a + g.comunas.length, 0);
  const preguntas = preguntasDirectorio(locales);
  const bajada = `${locales.length} barberías, peluquerías, spas, clínicas estéticas y estudios en ${comunas} comunas de Chile trabajan con SynapTech. Búscalos en el mapa y reserva tu hora online, a cualquier hora y sin llamar.`;
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locales, bajada)) }} />
        <section className="pt-28 md:pt-36 pb-10">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">Red Synaptech · Directorio de locales</p>
            <h1 className="text-ink max-w-4xl">Barberías, peluquerías y spas cerca de ti, con reserva online.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">{bajada}</p>
          </div>
        </section>

        {locales.length > 0 && (
          <section className="pb-16 md:pb-24">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <ListaLocales locales={locales} />
              <p className="text-xs text-text-muted mt-6">Notas y cantidad de opiniones según Google. Mapa © OpenStreetMap y OpenFreeMap.</p>
            </div>
          </section>
        )}

        {grupos.length > 0 && (
          <section className="py-16 md:py-20 border-t border-border-subtle">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <div className="max-w-3xl mb-10">
                <p className="eyebrow mb-3">Por región y comuna</p>
                <h2 className="text-ink">Locales con reserva online en cada comuna.</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
                {grupos.map((g) => (
                  <div key={g.region}>
                    <h3 className="font-display font-bold text-ink text-xl tracking-tight">{g.region}</h3>
                    {ZONAS_POR_REGION[g.region] && (
                      <p className="text-sm mt-1 flex flex-wrap gap-x-4">
                        {ZONAS_POR_REGION[g.region].map((s) => (
                          <a key={s} href={`/${s}`} className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-ink">{tituloZona(s)}</a>
                        ))}
                      </p>
                    )}
                    <ul className="mt-4 space-y-3">
                      {g.comunas.map((c) => (
                        <li key={c.comuna}>
                          <p className="font-semibold text-ink">
                            {c.comuna} <span className="font-normal text-text-muted">· {c.locales.length === 1 ? "1 local" : `${c.locales.length} locales`}</span>
                          </p>
                          <p className="text-[15px] text-text-secondary leading-relaxed">
                            {c.locales.map((l, i) => (
                              <span key={l.id}>
                                {i > 0 && ", "}
                                <a href={`#local-${l.id}`} className="hover:text-ink underline-offset-4 hover:underline">{l.nombre}</a>
                                <span className="text-text-muted"> ({l.etiqueta.toLowerCase()})</span>
                              </span>
                            ))}
                          </p>
                          {ZONAS_POR_COMUNA[c.comuna] && (
                            <p className="text-sm mt-1 flex flex-wrap gap-x-4">
                              {ZONAS_POR_COMUNA[c.comuna].map((s) => (
                                <a key={s} href={`/${s}`} className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-ink">{tituloZona(s)} →</a>
                              ))}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 md:py-20 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-8">
              <p className="eyebrow mb-3">Por zona</p>
              <h2 className="text-ink">Los mejores evaluados de la Región de Valparaíso.</h2>
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

        <FaqSeo titulo="Preguntas frecuentes sobre el directorio" preguntas={preguntas} />

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
                <a href={alta(`locales`)}
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

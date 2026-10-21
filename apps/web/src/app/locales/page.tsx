import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import ListaLocales from "@/components/ListaLocales";
import AdminDirectorio from "@/components/AdminDirectorio";
import FaqSeo from "@/components/FaqSeo";
import TablaPrecios from "@/components/TablaPrecios";
import CtaDuenos from "@/components/CtaDuenos";
import { obtenerLocales, unoPorNegocio, PAGINAS, type LocalDirectorio } from "@/lib/directorio";
import { porRegion, preguntasDirectorio, paisesDe } from "@/lib/directorio-faq";
import { preciosPorComuna, tablaPrecios, zonasDirectorio, slugZona, clp, enZona } from "@/lib/precios";
import { jsonLdDirectorio } from "@/lib/ld-directorio";
import { altaIA, CTA_IA, waLink } from "@/content/catalogo";
import { metaPagina, SITIO } from "@/lib/seo";

/* Portada del directorio de locales (Red Synaptech). Se regenera cada hora con
   la lista viva del directorio y los datos de cada local que publica la
   plataforma: ver lib/directorio.ts.

   SEO: todo lo que importa está en el HTML que baja Googlebot sin ejecutar JS
   (la lista se renderiza en el servidor): nombre en <h2>, "{rubro} en {comuna}"
   visible, dirección, servicios con precio y duración y "Reservar hora en
   {nombre}". Debajo: los locales por región y comuna (con ancla #comuna-x, el
   destino de la ruta de navegación de cada local), precios reales por comuna,
   la matriz rubro × comuna con enlaces a las páginas por zona y a
   /locales/{zona}, las preguntas frecuentes con datos vivos y el JSON-LD.
   "Cerca de mí" y "Buscar al mover el mapa" filtran en el navegador sin tocar
   la URL: la canónica es siempre /locales. */
export const revalidate = 3600;

const TITULO = "Barberías, peluquerías y spas con reserva online | SynapTech";

export async function generateMetadata() {
  const locales = await obtenerLocales();
  const comunas = new Set(locales.map((l) => l.comuna).filter(Boolean)).size;
  return metaPagina({
    title: TITULO,
    description: `Directorio de ${unoPorNegocio(locales).length} barberías, peluquerías, spas y centros de estética en ${comunas} comunas y ciudades de ${paisesDe(locales)}. Precios reales y reserva online, sin llamar.`,
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

/* Matriz rubro × comuna: a dónde lleva cada combinación. La página por zona si
   existe, si no la landing de la comuna (/locales/{comuna}), si no su ancla. */
const RUBROS_MATRIZ: { id: LocalDirectorio["rubro"]; plural: string; zonaVina?: string; zonaRegion?: string }[] = [
  { id: "barberia", plural: "Barberías", zonaVina: "barberias-vina-del-mar", zonaRegion: "barberias-quinta-region" },
  { id: "salon", plural: "Peluquerías y salones", zonaVina: "peluquerias-vina-del-mar", zonaRegion: "peluquerias-quinta-region" },
  { id: "estetica", plural: "Estética, clínicas y spas" },
  { id: "pilates", plural: "Pilates" },
];

export default async function LocalesPage() {
  const locales = await obtenerLocales();
  const negocios = unoPorNegocio(locales);
  const grupos = porRegion(locales);
  const comunas = grupos.reduce((a, g) => a + g.comunas.length, 0);
  const preguntas = preguntasDirectorio(locales);
  const zonas = zonasDirectorio(locales);
  const landing = new Map(zonas.map((z) => [z.nombre, `/locales/${z.slug}`]));
  const preciosComuna = preciosPorComuna(locales);
  const preciosRed = tablaPrecios(locales);
  const bajada = `${negocios.length} barberías, peluquerías, spas, clínicas estéticas y estudios en ${comunas} comunas y ciudades de ${paisesDe(locales)} trabajan con SynapTech. Búscalos en el mapa, compara precios reales y reserva tu hora online, a cualquier hora y sin llamar.`;
  const destinoMatriz = (rubro: (typeof RUBROS_MATRIZ)[number], comuna: string, region: string) => {
    if (comuna === "Viña del Mar" && rubro.zonaVina) return `/${rubro.zonaVina}`;
    if (region === "Región de Valparaíso" && rubro.zonaRegion) return `/${rubro.zonaRegion}`;
    return landing.get(comuna) ?? `#comuna-${slugZona(comuna)}`;
  };
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDirectorio(locales, {
          url: `${SITIO}/locales`, nombre: TITULO, descripcion: bajada,
          migas: [{ nombre: "Inicio", url: `${SITIO}/` }, { nombre: "Locales", url: `${SITIO}/locales` }],
        })) }} />
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
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
                {grupos.map((g) => (
                  <div key={g.region} id={`region-${slugZona(g.region)}`} className="scroll-mt-28">
                    <h3 className="font-display font-bold text-ink text-xl tracking-tight">
                      {landing.get(g.region)
                        ? <a href={landing.get(g.region)} className="hover:underline underline-offset-4">{g.region}</a>
                        : g.region}
                    </h3>
                    {ZONAS_POR_REGION[g.region] && (
                      <p className="text-sm mt-1 flex flex-wrap gap-x-4">
                        {ZONAS_POR_REGION[g.region].map((s) => (
                          <a key={s} href={`/${s}`} className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-ink">{tituloZona(s)}</a>
                        ))}
                      </p>
                    )}
                    <ul className="mt-4 space-y-3">
                      {g.comunas.map((c) => {
                        const n = new Set(c.locales.map((l) => l.tid)).size;
                        return (
                          <li key={c.comuna} id={`comuna-${slugZona(c.comuna)}`} className="scroll-mt-28">
                            <p className="font-semibold text-ink">
                              {landing.get(c.comuna) ? <a href={landing.get(c.comuna)} className="hover:underline underline-offset-4">{c.comuna}</a> : c.comuna}{" "}
                              <span className="font-normal text-text-muted">· {c.locales.length === 1 ? "1 local" : `${c.locales.length} locales`}</span>
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
                            {n <= 2 && (
                              <p className="text-[13px] text-text-muted mt-1">
                                Quedan cupos para posicionar tu negocio en {c.comuna}.{" "}
                                <a href="https://bioo.cl/agenda?utm_source=directorio&utm_medium=seo&utm_campaign=cta-duenos" className="underline underline-offset-2 hover:text-ink">Súmate gratis</a>
                              </p>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                    <CtaDuenos zona={enZona(g.region)} compacto />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {(preciosComuna.length > 0 || preciosRed.length > 0) && (
          <section id="precios" className="py-16 md:py-20 bg-mist scroll-mt-20">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <div className="max-w-3xl mb-8">
                <p className="eyebrow mb-3">Precios reales</p>
                <h2 className="text-ink">Cuánto cuesta un corte, una barba o una limpieza facial en tu comuna.</h2>
                <p className="text-text-secondary text-lg mt-4">Precios referenciales calculados con lo que cada local cobra en su reserva online: el más bajo de cada servicio, en cada local.</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-5">
                {preciosComuna.map((pc) => (
                  <TablaPrecios key={pc.comuna} id={`precios-${slugZona(pc.comuna)}`} titulo={`Precios referenciales de servicios en ${pc.comuna}`} filas={pc.filas} />
                ))}
                {preciosRed.length > 0 && <TablaPrecios titulo="En toda la red SynapTech" filas={preciosRed} />}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 md:py-20 border-t border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-8">
              <p className="eyebrow mb-3">Explora</p>
              <h2 className="text-ink">Rubros y comunas con reserva online.</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {RUBROS_MATRIZ.map((rb) => {
                const cs = new Map<string, string>();
                for (const l of locales) if (l.rubro === rb.id && l.comuna && !cs.has(l.comuna)) cs.set(l.comuna, l.region);
                if (!cs.size) return null;
                return (
                  <div key={rb.id}>
                    <h3 className="font-display font-bold text-ink text-lg tracking-tight mb-2">{rb.plural}</h3>
                    <ul className="space-y-1.5 text-[14.5px]">
                      {[...cs.entries()].sort((a, b) => a[0].localeCompare(b[0], "es")).map(([c, r]) => (
                        <li key={c}><a href={destinoMatriz(rb, c, r)} className="text-text-secondary hover:text-ink hover:underline underline-offset-4">{rb.plural} en {c}</a></li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            {preciosRed.length > 0 && (
              <div className="mt-10">
                <h3 className="font-display font-bold text-ink text-lg tracking-tight mb-3">Servicios más buscados</h3>
                <ul className="flex flex-wrap gap-2">
                  {preciosRed.map((f) => (
                    <li key={f.tipo}><a href="#precios" className="inline-flex items-center gap-1.5 bg-mist rounded-full px-3.5 py-1.5 text-[14px] text-ink hover:bg-lime">{f.nombre} <span className="text-text-muted">desde {clp(f.min)}</span></a></li>
                  ))}
                </ul>
              </div>
            )}
            {zonas.length > 0 && (
              <div className="mt-10">
                <h3 className="font-display font-bold text-ink text-lg tracking-tight mb-3">Directorio por zona</h3>
                <ul className="flex flex-wrap gap-2">
                  {zonas.map((z) => (
                    <li key={z.slug}><a href={`/locales/${z.slug}`} className="inline-flex border border-border-subtle rounded-full px-3.5 py-1.5 text-[14px] text-ink hover:border-ink">{z.nombre} <span className="text-text-muted ml-1">{z.locales.length}</span></a></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

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
                  Los locales que trabajan con SynapTech aparecen en este directorio con su
                  foto, sus opiniones de Google, sus precios y su reserva online. Y si prefieres
                  no aparecer, no apareces.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <a href={altaIA(`locales`)}
                  className="inline-flex justify-center items-center bg-lime text-ink font-semibold px-7 py-4 rounded-full hover:bg-white transition-colors">
                  {CTA_IA}
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
      <AdminDirectorio />
      <Footer />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListaLocales from "@/components/ListaLocales";
import AdminDirectorio from "@/components/AdminDirectorio";
import FaqSeo, { type Pregunta } from "@/components/FaqSeo";
import TablaPrecios from "@/components/TablaPrecios";
import CtaDuenos from "@/components/CtaDuenos";
import EnlacesZonas from "@/components/EnlacesZonas";
import { obtenerLocales, unoPorNegocio } from "@/lib/directorio";
import { tablaPrecios, clp, CON_ARTICULO, zonasDirectorio } from "@/lib/precios";
import { jsonLdDirectorio } from "@/lib/ld-directorio";
import { metaPagina, SITIO } from "@/lib/seo";
import { paginaRubro } from "@/lib/paginas-directorio";

/* Página de un rubro en una zona (/barberias-vina-del-mar, /barberias-quinta-region…),
   con los datos vivos del directorio. Ver lib/paginas-directorio.ts. */
async function datos(slug: string) {
  const p = paginaRubro(slug);
  const todos = await obtenerLocales();
  const locales = todos.filter(p.entra);
  const zona = zonasDirectorio(todos).find((z) => z.slug === p.zonaSlug) ?? null;
  return { p, locales, zona };
}

export async function metadataDirectorio(slug: string) {
  const { p, locales } = await datos(slug);
  return metaPagina({ title: p.title, description: p.description(unoPorNegocio(locales).length), path: `/${p.slug}` });
}

export default async function PaginaDirectorio({ slug }: { slug: string }) {
  const { p, locales, zona } = await datos(slug);
  const negocios = unoPorNegocio(locales);
  const filas = tablaPrecios(locales);
  const url = `${SITIO}/${p.slug}`;
  const comunas = [...new Set(locales.map((l) => l.comuna).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
  const migas = [
    { nombre: "Inicio", url: `${SITIO}/` },
    { nombre: "Locales", url: `${SITIO}/locales` },
    ...(zona ? [{ nombre: zona.nombre, url: `${SITIO}/locales/${zona.slug}` }] : []),
    { nombre: p.h1, url },
  ];
  const mejores = negocios.filter((l) => l.rating && (l.opiniones ?? 0) >= 10)
    .sort((a, b) => b.rating! - a.rating! || b.opiniones! - a.opiniones!).slice(0, 3);
  const preguntas: Pregunta[] = [
    {
      q: `¿Dónde reservar hora online en ${p.plural} de ${p.lugar}?`,
      a: `Hay ${negocios.length} ${p.plural} en ${p.lugar} con reserva online en SynapTech${comunas.length > 1 ? `, en ${comunas.length} comunas (${comunas.join(", ")})` : ""}: eliges el servicio, el profesional y un horario libre en su página, a cualquier hora y sin llamar.`,
    },
    ...filas.slice(0, 3).map((f) => ({
      q: `¿Cuánto cuesta ${CON_ARTICULO[f.tipo] ?? f.nombre.toLowerCase()} en ${p.lugar}?`,
      a: `Entre las ${f.locales.length} ${p.plural} de ${p.lugar} que lo ofrecen, ${f.nombre.toLowerCase()} va desde ${clp(f.min)} hasta ${clp(f.max)}; el valor típico es ${clp(f.mediana)}. Es el precio más bajo de cada local según su reserva online.`,
    })),
    ...(mejores.length ? [{
      q: `¿Cuáles son las ${p.plural} mejor evaluadas de ${p.lugar}?`,
      a: `Según Google: ${mejores.map((l) => `${l.nombre} (${l.rating!.toFixed(1).replace(".", ",")}, ${l.opiniones} opiniones)`).join(", ")}.`,
    }] : []),
  ];
  const descripcion = `${negocios.length} ${p.plural} en ${p.lugar} con reserva online.`;
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDirectorio(locales, { url, nombre: p.h1, descripcion, migas })) }} />
        <section className="pt-28 md:pt-36 pb-10">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <nav aria-label="Ruta de navegación" className="text-sm text-text-muted mb-5 flex flex-wrap gap-1.5">
              {migas.map((m, i) => (
                <span key={m.url}>{i > 0 && <span aria-hidden className="mr-1.5">›</span>}
                  {i < migas.length - 1 ? <a href={m.url.replace(SITIO, "") || "/"} className="hover:text-ink">{m.nombre}</a> : <span aria-current="page" className="text-ink">{m.nombre}</span>}
                </span>
              ))}
            </nav>
            <h1 className="text-ink max-w-4xl">{p.h1} con reserva online ({negocios.length})</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">{p.intro}</p>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <ListaLocales locales={locales} filtro="comuna" />
            <p className="text-xs text-text-muted mt-6">Notas y cantidad de opiniones según Google. Precios según la reserva online de cada local. Mapa © OpenStreetMap y OpenFreeMap.</p>
          </div>
        </section>

        {filas.length > 0 && (
          <section className="py-14 bg-mist">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
              <TablaPrecios titulo={`Precios referenciales en ${p.lugar}`} filas={filas} />
            </div>
          </section>
        )}

        <section className="py-12">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <h2 className="text-ink text-2xl mb-4">Más locales por zona</h2>
            <EnlacesZonas actual={`/${p.slug}`} />
          </div>
        </section>

        <FaqSeo titulo={`Preguntas frecuentes sobre ${p.plural} en ${p.lugar}`} preguntas={preguntas} />

        <section className="pb-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <CtaDuenos zona={p.lugar} />
          </div>
        </section>
      </main>
      <AdminDirectorio />
      <Footer />
    </>
  );
}

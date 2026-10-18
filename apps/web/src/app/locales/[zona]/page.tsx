import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListaLocales from "@/components/ListaLocales";
import AdminDirectorio from "@/components/AdminDirectorio";
import FaqSeo, { type Pregunta } from "@/components/FaqSeo";
import TablaPrecios from "@/components/TablaPrecios";
import CtaDuenos from "@/components/CtaDuenos";
import EnlacesZonas from "@/components/EnlacesZonas";
import { obtenerLocales, unoPorNegocio } from "@/lib/directorio";
import { tablaPrecios, zonasDirectorio, clp, CON_ARTICULO, enZona, type Zona } from "@/lib/precios";
import { jsonLdDirectorio } from "@/lib/ld-directorio";
import { metaPagina, SITIO } from "@/lib/seo";

/* Landings automáticas por zona (16-10-2026): /locales/{región} y
   /locales/{comuna} para las comunas con 3 o más negocios. Se arman solas con
   los datos del directorio (lib/precios.ts → zonasDirectorio): un local nuevo
   suma a su región sin tocar nada, y una comuna aparece sola el día que junta
   tres. Una zona que no existe da 404 de verdad (dynamicParams + notFound),
   no una página vacía con 200 como la competencia. */
export const revalidate = 3600;
export const dynamicParams = true;

async function zonaDe(slug: string): Promise<{ zona: Zona; todas: Zona[] } | null> {
  const todas = zonasDirectorio(await obtenerLocales());
  const zona = todas.find((z) => z.slug === slug);
  return zona ? { zona, todas } : null;
}

export async function generateStaticParams() {
  return zonasDirectorio(await obtenerLocales()).map((z) => ({ zona: z.slug }));
}

const rubrosDe = (z: Zona) => {
  const r = new Set(z.locales.map((l) => l.rubro));
  const partes = [r.has("barberia") && "barberías", r.has("salon") && "peluquerías", r.has("estetica") && "centros de estética y spas", r.has("pilates") && "estudios de pilates"].filter(Boolean) as string[];
  return partes.length > 1 ? `${partes.slice(0, -1).join(", ")} y ${partes[partes.length - 1]}` : partes[0] || "locales";
};
const mayus = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export async function generateMetadata({ params }: { params: { zona: string } }) {
  const d = await zonaDe(params.zona);
  if (!d) return {};
  const n = unoPorNegocio(d.zona.locales).length;
  return metaPagina({
    title: `${mayus(rubrosDe(d.zona))} en ${enZona(d.zona.nombre)} (${n}) | SynapTech`,
    description: `${n} ${rubrosDe(d.zona)} en ${enZona(d.zona.nombre)} con reserva online: precios reales, horarios y ubicación en el mapa. Reserva tu hora sin llamar.`,
    path: `/locales/${d.zona.slug}`,
  });
}

export default async function ZonaPage({ params }: { params: { zona: string } }) {
  const d = await zonaDe(params.zona);
  if (!d) notFound();
  const { zona, todas } = d;
  const negocios = unoPorNegocio(zona.locales);
  const filas = tablaPrecios(zona.locales);
  const url = `${SITIO}/locales/${zona.slug}`;
  const comunas = [...new Set(zona.locales.map((l) => l.comuna).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
  const region = zona.tipo === "comuna" ? todas.find((z) => z.tipo === "region" && z.locales.some((l) => l.comuna === zona.nombre)) : null;
  const relacionadas = todas.filter((z) => z !== zona && (zona.tipo === "region" ? z.tipo === "comuna" && z.locales.some((l) => zona.locales.includes(l)) : z === region || (z.tipo === "comuna" && region && z.locales.some((l) => region.locales.includes(l)))));
  const migas = [
    { nombre: "Inicio", url: `${SITIO}/` },
    { nombre: "Locales", url: `${SITIO}/locales` },
    ...(region ? [{ nombre: region.nombre, url: `${SITIO}/locales/${region.slug}` }] : []),
    { nombre: zona.nombre, url },
  ];
  const mejores = negocios.filter((l) => l.rating && (l.opiniones ?? 0) >= 10).sort((a, b) => b.rating! - a.rating! || b.opiniones! - a.opiniones!).slice(0, 3);
  const preguntas: Pregunta[] = [
    {
      q: `¿Dónde reservar hora online en ${enZona(zona.nombre)}?`,
      a: `Hay ${negocios.length} ${rubrosDe(zona)} en ${enZona(zona.nombre)} con reserva online en SynapTech${comunas.length > 1 ? `, en ${comunas.length} comunas` : ""}: eliges el servicio, el profesional y un horario libre en su página, a cualquier hora y sin llamar.`,
    },
    ...filas.slice(0, 3).map((f) => ({
      q: `¿Cuánto cuesta ${CON_ARTICULO[f.tipo] ?? f.nombre.toLowerCase()} en ${enZona(zona.nombre)}?`,
      a: `Entre los ${f.locales.length} locales de ${enZona(zona.nombre)} que lo ofrecen, ${f.nombre.toLowerCase()} va desde ${clp(f.min)} hasta ${clp(f.max)}; el valor típico es ${clp(f.mediana)}. Es el precio más bajo de cada local según su reserva online.`,
    })),
    ...(mejores.length ? [{
      q: `¿Cuáles son los locales mejor evaluados de ${enZona(zona.nombre)}?`,
      a: `Según Google: ${mejores.map((l) => `${l.nombre} (${l.rating!.toFixed(1).replace(".", ",")}, ${l.opiniones} opiniones)`).join(", ")}.`,
    }] : []),
  ];
  const descripcion = `${negocios.length} ${rubrosDe(zona)} en ${enZona(zona.nombre)} con reserva online.`;
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDirectorio(zona.locales, { url, nombre: `${mayus(rubrosDe(zona))} en ${zona.nombre}`, descripcion, migas })) }} />
        <section className="pt-28 md:pt-36 pb-10">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <nav aria-label="Ruta de navegación" className="text-sm text-text-muted mb-5 flex flex-wrap gap-1.5">
              {migas.map((m, i) => (
                <span key={m.url}>{i > 0 && <span aria-hidden className="mr-1.5">›</span>}
                  {i < migas.length - 1 ? <a href={m.url.replace(SITIO, "") || "/"} className="hover:text-ink">{m.nombre}</a> : <span aria-current="page" className="text-ink">{m.nombre}</span>}
                </span>
              ))}
            </nav>
            <h1 className="text-ink max-w-4xl">{mayus(rubrosDe(zona))} en {enZona(zona.nombre)} con reserva online ({negocios.length})</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
              {descripcion} Compara precios reales, mira su ubicación en el mapa y reserva tu hora en su página, a cualquier hora.
              {comunas.length > 1 && <> Comunas: {comunas.join(", ")}.</>}
            </p>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <ListaLocales locales={zona.locales} />
            <p className="text-xs text-text-muted mt-6">Notas y cantidad de opiniones según Google. Mapa © OpenStreetMap y OpenFreeMap.</p>
          </div>
        </section>

        {filas.length > 0 && (
          <section className="py-14 bg-mist">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
              <TablaPrecios titulo={`Precios referenciales de servicios en ${enZona(zona.nombre)}`} filas={filas} />
            </div>
          </section>
        )}

        {relacionadas.length > 0 && (
          <section className="py-12">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <h2 className="text-ink text-2xl mb-4">{zona.tipo === "region" ? `Por comuna en ${enZona(zona.nombre)}` : "Cerca de aquí"}</h2>
              <ul className="flex flex-wrap gap-2">
                {relacionadas.map((z) => (
                  <li key={z.slug}><a href={`/locales/${z.slug}`} className="inline-flex border border-border-subtle rounded-full px-3.5 py-1.5 text-[14px] text-ink hover:border-ink">{z.nombre} <span className="text-text-muted ml-1">{z.locales.length}</span></a></li>
                ))}
                <li><a href="/locales" className="inline-flex border border-border-subtle rounded-full px-3.5 py-1.5 text-[14px] text-ink hover:border-ink">Todo Chile</a></li>
              </ul>
            </div>
          </section>
        )}

        <section className="pb-12">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <h2 className="text-ink text-2xl mb-4">Más locales por zona</h2>
            <EnlacesZonas actual={`/locales/${zona.slug}`} />
          </div>
        </section>

        <FaqSeo titulo={`Preguntas frecuentes sobre ${enZona(zona.nombre)}`} preguntas={preguntas} />

        <section className="pb-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <CtaDuenos zona={enZona(zona.nombre)} />
          </div>
        </section>
      </main>
      <AdminDirectorio />
      <Footer />
    </>
  );
}


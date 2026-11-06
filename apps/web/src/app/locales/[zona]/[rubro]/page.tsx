import { notFound, permanentRedirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqSeo, { type Pregunta } from "@/components/FaqSeo";
import TablaPrecios from "@/components/TablaPrecios";
import CtaDuenos from "@/components/CtaDuenos";
import { obtenerLocales, corteDesde, type LocalDirectorio } from "@/lib/directorio";
import { tablaPrecios, zonasDirectorio, clp, CON_ARTICULO } from "@/lib/precios";
import { jsonLdDirectorio } from "@/lib/ld-directorio";
import { metaPagina, SITIO } from "@/lib/seo";
import { paginaComunaDe, paginasComuna, vecinas, kmTexto, YA_EXISTE, RADIO_KM, type Cercano } from "@/lib/comunas-rubro";

/* "{Rubro} en {comuna}" (/locales/san-miguel/barberias), 06-11-2026. La lógica y
   el porqué están en lib/comunas-rubro.ts: los locales del rubro en la comuna y,
   si faltan, los más cercanos con su distancia; 404 si no hay 3 negocios a 12 km. */
export const revalidate = 3600;
export const dynamicParams = true;

type Params = { params: { zona: string; rubro: string } };

export async function generateStaticParams() {
  return paginasComuna(await obtenerLocales().catch(() => [])).map((p) => ({ zona: p.comuna.slug, rubro: p.rubro.slug }));
}

async function datos({ zona, rubro }: Params["params"]) {
  const locales = await obtenerLocales().catch(() => [] as LocalDirectorio[]);
  return { p: paginaComunaDe(locales, zona, rubro), locales };
}

const titulo = (nombre: string, comuna: string, hay: boolean) => (hay ? `${nombre} en ${comuna}` : `${nombre} cerca de ${comuna}`);

export async function generateMetadata({ params }: Params) {
  const { p } = await datos(params);
  if (!p) return {};
  const hay = p.enComuna.length > 0;
  return metaPagina({
    title: `${titulo(p.rubro.nombre, p.comuna.nombre, hay)}: precios y reserva online | SynapTech`,
    description: hay
      ? `${p.negocios} ${p.rubro.plural} en ${p.comuna.nombre} y alrededores con reserva online: precios reales, nota de Google y distancia. Reserva tu hora sin llamar.`
      : `Las ${p.rubro.plural} con reserva online más cercanas a ${p.comuna.nombre}: a cuántos km quedan, precios reales y nota de Google. Reserva tu hora sin llamar.`,
    path: `/locales/${p.comuna.slug}/${p.rubro.slug}`,
  });
}

function Tarjeta({ l, comuna }: { l: Cercano; comuna: string }) {
  const corte = corteDesde(l);
  return (
    <li className="rounded-[20px] bg-white border border-border-subtle p-5 flex flex-col">
      <span className="font-display font-bold text-ink text-lg tracking-tight">{l.nombre}</span>
      <span className="text-sm text-text-secondary mt-1">
        {l.etiqueta}{l.comuna ? ` en ${l.comuna}` : ""}
        {l.km != null && <> · {kmTexto(l.km)} del centro de {comuna}</>}
      </span>
      {l.direccion && <span className="text-sm text-text-muted mt-1">{l.direccion}</span>}
      <span className="text-sm text-ink mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {l.rating && <span>★ {l.rating.toFixed(1).replace(".", ",")}{l.opiniones ? ` (${l.opiniones} en Google)` : ""}</span>}
        {corte && <span>Corte desde {corte}</span>}
      </span>
      {l.reserva && (
        <a href={l.url} target="_blank" rel="noopener" className="mt-4 text-sm font-semibold text-ink border-b-2 border-lime self-start pb-0.5 hover:border-ink">
          Reservar hora →
        </a>
      )}
    </li>
  );
}

export default async function Pagina({ params }: Params) {
  const ya = YA_EXISTE[`${params.zona}/${params.rubro}`];
  if (ya) permanentRedirect(ya);
  const { p, locales } = await datos(params);
  if (!p) notFound();
  const { comuna, rubro, enComuna, cercanos } = p;
  const hay = enComuna.length > 0;
  const path = `/locales/${comuna.slug}/${rubro.slug}`;
  const url = `${SITIO}${path}`;
  const todos = [...enComuna, ...cercanos];
  const filas = tablaPrecios(todos);
  const zonaComuna = zonasDirectorio(locales).find((z) => z.tipo === "comuna" && z.slug === comuna.slug);
  const otras = vecinas(paginasComuna(locales), p);
  const h1 = titulo(rubro.nombre, comuna.nombre, hay);
  const migas = [
    { nombre: "Inicio", url: `${SITIO}/` },
    { nombre: "Locales", url: `${SITIO}/locales` },
    ...(zonaComuna ? [{ nombre: comuna.nombre, url: `${SITIO}/locales/${comuna.slug}` }] : []),
    { nombre: h1, url },
  ];
  const masCerca = cercanos[0];
  const descripcion = hay
    ? `${enComuna.length === 1 ? `1 ${rubro.una.replace(/^una? /, "")}` : `${enComuna.length} ${rubro.plural}`} en ${comuna.nombre}${cercanos.length ? ` y ${cercanos.length} más a menos de ${RADIO_KM} km` : ""}, con reserva online.`
    : `Todavía no hay ${rubro.plural} de ${comuna.nombre} con reserva online en SynapTech. Estos son los locales más cercanos, a menos de ${RADIO_KM} km.`;
  const preguntas: Pregunta[] = [
    {
      q: `¿Hay ${rubro.plural} con reserva online en ${comuna.nombre}?`,
      a: hay
        ? `Sí: ${enComuna.map((l) => l.nombre).join(", ")}. Eliges servicio, profesional y horario en su página, a cualquier hora y sin llamar.`
        : `En SynapTech todavía no hay ${rubro.plural} de ${comuna.nombre}. ${masCerca ? `El local más cercano es ${masCerca.nombre}, en ${masCerca.comuna}, ${kmTexto(masCerca.km!)} del centro de ${comuna.nombre}.` : ""}`,
    },
    ...(masCerca ? [{
      q: `¿Qué ${rubro.plural} hay cerca de ${comuna.nombre}?`,
      a: cercanos.slice(0, 4).map((l) => `${l.nombre} (${l.comuna}, ${kmTexto(l.km!).replace(/^a /, "")})`).join(", ") + ".",
    }] : []),
    ...filas.slice(0, 2).map((f) => ({
      q: `¿Cuánto cuesta ${CON_ARTICULO[f.tipo] ?? f.nombre.toLowerCase()} ${hay ? "en" : "cerca de"} ${comuna.nombre}?`,
      a: `Entre ${f.locales.length} locales ${hay ? `de ${comuna.nombre} y alrededores` : `cercanos a ${comuna.nombre}`}, va desde ${clp(f.min)} hasta ${clp(f.max)}; el valor típico es ${clp(f.mediana)}. Es el precio más bajo de cada local según su reserva online.`,
    })),
  ];
  const textoDuenos = hay
    ? `¿Tienes ${rubro.una} en ${comuna.nombre}? Aparece en esta página junto a ${enComuna.length === 1 ? enComuna[0].nombre : `las ${enComuna.length} que ya están`}, con agenda online 24/7.`
    : `¿Tienes ${rubro.una} en ${comuna.nombre}? Todavía no hay ninguna de ${comuna.nombre} en esta página: serías ${rubro.primera}. Crea tu agenda online y aparece aquí.`;
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDirectorio(todos, { url, nombre: h1, descripcion, migas })) }} />
        <section className="pt-28 md:pt-36 pb-10">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <nav aria-label="Ruta de navegación" className="text-sm text-text-muted mb-5 flex flex-wrap gap-1.5">
              {migas.map((m, i) => (
                <span key={m.url}>{i > 0 && <span aria-hidden className="mr-1.5">›</span>}
                  {i < migas.length - 1 ? <a href={m.url.replace(SITIO, "") || "/"} className="hover:text-ink">{m.nombre}</a> : <span aria-current="page" className="text-ink">{m.nombre}</span>}
                </span>
              ))}
            </nav>
            <h1 className="text-ink max-w-4xl">{h1}</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
              {descripcion} Mira a cuántos km quedan, compara precios reales y reserva tu hora en su página.
            </p>
          </div>
        </section>

        {hay && (
          <section className="pb-12">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <h2 className="text-ink text-2xl mb-5">En {comuna.nombre}</h2>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {enComuna.map((l) => <Tarjeta key={l.id} l={l} comuna={comuna.nombre} />)}
              </ul>
            </div>
          </section>
        )}

        {cercanos.length > 0 && (
          <section className="pb-16">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <h2 className="text-ink text-2xl mb-5">{hay ? `Cerca de ${comuna.nombre}` : `Los más cercanos a ${comuna.nombre}`}</h2>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cercanos.map((l) => <Tarjeta key={l.id} l={l} comuna={comuna.nombre} />)}
              </ul>
              <p className="text-xs text-text-muted mt-6">Distancia en línea recta desde el centro de {comuna.nombre}. Notas y opiniones según Google.</p>
            </div>
          </section>
        )}

        <section className="pb-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <CtaDuenos zona={comuna.nombre} texto={textoDuenos} desde={path} titulo={hay ? "Para dueños" : `¿Tu local está en ${comuna.nombre}?`} />
          </div>
        </section>

        {filas.length > 0 && (
          <section className="py-14 bg-mist">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
              <TablaPrecios titulo={`Precios referenciales ${hay ? "en" : "cerca de"} ${comuna.nombre}`} filas={filas} />
            </div>
          </section>
        )}

        <FaqSeo titulo={`${h1}: preguntas frecuentes`} preguntas={preguntas} />

        {otras.length > 0 && (
          <section className="pb-20">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <h2 className="text-ink text-2xl mb-4">{rubro.nombre} en comunas vecinas</h2>
              <ul className="flex flex-wrap gap-2">
                {otras.map((x) => (
                  <li key={x.comuna.slug}>
                    <a href={`/locales/${x.comuna.slug}/${x.rubro.slug}`} className="inline-flex border border-border-subtle rounded-full px-3.5 py-1.5 text-[14px] text-ink hover:border-ink">{x.comuna.nombre}</a>
                  </li>
                ))}
                {zonaComuna && <li><a href={`/locales/${comuna.slug}`} className="inline-flex border border-border-subtle rounded-full px-3.5 py-1.5 text-[14px] text-ink hover:border-ink">Todo en {comuna.nombre}</a></li>}
                <li><a href="/locales" className="inline-flex border border-border-subtle rounded-full px-3.5 py-1.5 text-[14px] text-ink hover:border-ink">Todos los locales</a></li>
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

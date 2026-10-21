import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqSeo from "@/components/FaqSeo";
import { Dolores } from "@/components/Rubro";
import { HeroIA, PasosIA, CifrasIA, EjemplosIA, Despues30, CtaIA } from "@/components/AltaIA";
import { RUBROS_IA, CIUDADES, rubroIA, ciudadIA, faqCiudad, descripcionCiudad, type RubroIA, type CiudadIA } from "@/content/alta-ia";
import { obtenerLocales, type LocalDirectorio } from "@/lib/directorio";
import { nombreRegion } from "@/lib/regiones";
import { slugZona } from "@/lib/precios";
import { metaPagina } from "@/lib/seo";

/* Agenda con asistente IA por rubro y ciudad (8 × 15 = 120 páginas).
   Los locales que se muestran son REALES: los del directorio vivo (los mismos
   datos que /locales y las páginas por zona, lib/directorio.ts), revalidados
   cada hora. Primero los de la comuna; si no hay, los de la región, y se dice;
   si no hay ninguno, no se inventa nada. Sin LocalBusiness ni aggregateRating
   propios: solo BreadcrumbList (MigasIA) y FAQPage (FaqSeo). */
export const revalidate = 3600;
export const dynamicParams = false;
export function generateStaticParams() {
  return RUBROS_IA.flatMap((r) => CIUDADES.map((c) => ({ rubro: r.slug, ciudad: c.slug })));
}

type Params = { params: { rubro: string; ciudad: string } };

export function generateMetadata({ params }: Params) {
  const r = rubroIA(params.rubro), c = ciudadIA(params.ciudad);
  if (!r || !c) return {};
  return metaPagina({
    title: `Agenda con asistente de IA para ${r.plural} en ${c.nombre} | SynapTech`,
    description: descripcionCiudad(r, c),
    path: `/agenda-con-ia/${r.slug}/${c.slug}`,
  });
}

type Cercanos = { ambito: "comuna" | "region" | null; locales: LocalDirectorio[] };

async function localesCercanos(r: RubroIA, c: CiudadIA): Promise<Cercanos> {
  const todos = await obtenerLocales().catch(() => [] as LocalDirectorio[]);
  const delRubro = todos.filter((l) => (l.pais || "CL") === "CL" && r.entra(l));
  const comunas = new Set(c.comunas.map(slugZona));
  const enComuna = delRubro.filter((l) => comunas.has(slugZona(l.comuna)));
  if (enComuna.length) return { ambito: "comuna", locales: enComuna };
  const enRegion = delRubro.filter((l) => slugZona(nombreRegion(l.region)).includes(c.regionClave));
  if (enRegion.length) return { ambito: "region", locales: enRegion };
  return { ambito: null, locales: [] };
}

/** 5 ciudades hermanas: primero las de la misma región. */
function hermanas(c: CiudadIA) {
  const otras = CIUDADES.filter((x) => x.slug !== c.slug);
  return [...otras.filter((x) => x.region === c.region), ...otras.filter((x) => x.region !== c.region)].slice(0, 5);
}

export default async function Pagina({ params }: Params) {
  const r = rubroIA(params.rubro), c = ciudadIA(params.ciudad);
  if (!r || !c) notFound();
  const { ambito, locales } = await localesCercanos(r, c);
  const origen = `ia-${r.slug}-${c.slug}`;
  const preguntas = [...faqCiudad(r, c), ...r.faq];
  return (
    <>
      <Header />
      <main>
        <HeroIA
          eyebrow={`${r.nombre} · ${c.nombre}`}
          titulo={`Agenda con asistente de IA para ${r.plural} en ${c.nombre}.`}
          bajada={`${r.bajada} 30 días gratis del plan Pro. Funciona en ${c.nombre} y en todo Chile.`}
          origen={origen}
          rubro={r.rubro}
          chat={r.ejemplos[0]}
          migas={[
            { nombre: "Inicio", path: "/" },
            { nombre: "Agenda con asistente IA", path: "/agenda-con-asistente-ia" },
            { nombre: r.nombre, path: `/agenda-con-ia/${r.slug}` },
            { nombre: c.nombre, path: `/agenda-con-ia/${r.slug}/${c.slug}` },
          ]}
        />
        <Dolores titulo={`Lo que Syna le resuelve a ${r.tuLocal} en ${c.nombre}.`} items={r.dolores} />
        <EjemplosIA titulo={`Así atiende Syna a tus ${r.cliente}.`} ejemplos={r.ejemplos} />
        <PasosIA />

        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-8">
              <p className="eyebrow mb-4">Locales reales</p>
              {ambito === "comuna" && (
                <>
                  <h2 className="text-ink">Locales de {r.plural} en {c.nombre} que ya agendan con SynapTech.</h2>
                  <p className="text-text-secondary text-lg mt-4 leading-relaxed">Locales de {c.nombre} que están en nuestro directorio. Puedes ver su página de reservas.</p>
                </>
              )}
              {ambito === "region" && (
                <>
                  <h2 className="text-ink">Locales de {r.plural} en la {c.region} que ya agendan con SynapTech.</h2>
                  <p className="text-text-secondary text-lg mt-4 leading-relaxed">
                    Todavía no hay locales de este rubro en {c.nombre} en nuestro directorio. Estos están en la {c.region}.
                  </p>
                </>
              )}
              {ambito === null && (
                <>
                  <h2 className="text-ink">Sé de los primeros en {c.nombre}.</h2>
                  <p className="text-text-secondary text-lg mt-4 leading-relaxed">
                    Todavía no hay locales de {r.plural} de la {c.region} en nuestro directorio. La agenda y el asistente son 100% online:
                    los creas desde {c.nombre} en minutos.
                  </p>
                </>
              )}
            </div>
            {locales.length > 0 && (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {locales.slice(0, 6).map((l) => (
                  <li key={l.id} className="rounded-[20px] bg-white p-5 flex flex-col">
                    <span className="font-display font-bold text-ink text-lg tracking-tight">{l.nombre}</span>
                    <span className="text-sm text-text-secondary mt-1">{l.etiqueta}{l.comuna ? ` en ${l.comuna}` : ""}</span>
                    {l.reserva && (
                      <a href={l.url} target="_blank" rel="noopener" className="mt-4 text-sm font-semibold text-ink border-b-2 border-lime self-start pb-0.5 hover:border-ink">
                        Ver su página de reservas →
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-6">
              <Link href="/locales" className="font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink">Ver todos los locales que usan SynapTech →</Link>
            </p>
          </div>
        </section>

        <CifrasIA />
        <Despues30 origen={origen} rubro={r.rubro} />
        <FaqSeo titulo={`Agenda con IA para ${r.plural} en ${c.nombre}: preguntas frecuentes.`} preguntas={preguntas} />

        <section className="pb-12">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <h2 className="text-ink text-2xl mb-4">{r.nombre} en otras ciudades</h2>
            <ul className="flex flex-wrap gap-3">
              {hermanas(c).map((x) => (
                <li key={x.slug}>
                  <Link href={`/agenda-con-ia/${r.slug}/${x.slug}`} className="inline-block rounded-full bg-mist px-4 py-2 text-ink font-semibold hover:bg-lime/30 transition-colors">
                    {x.nombre}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <Link href={`/agenda-con-ia/${r.slug}`} className="font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink">Agenda con IA para {r.plural} →</Link>
              <Link href="/agenda-con-asistente-ia" className="font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink">Agenda con asistente de IA →</Link>
              {r.pagina && <Link href={r.pagina.href} className="font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink">{r.pagina.texto} →</Link>}
            </p>
          </div>
        </section>

        <CtaIA titulo={`Que Syna responda el WhatsApp de ${r.tuLocal} en ${c.nombre}.`} bajada="Crea tu agenda en minutos. 30 días gratis del plan Pro con el asistente." origen={origen} rubro={r.rubro} />
      </main>
      <Footer />
    </>
  );
}

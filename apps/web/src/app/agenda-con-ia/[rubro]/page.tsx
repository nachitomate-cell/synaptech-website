import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqSeo from "@/components/FaqSeo";
import { Dolores } from "@/components/Rubro";
import { HeroIA, PasosIA, CifrasIA, EjemplosIA, Despues30, CtaIA } from "@/components/AltaIA";
import { RUBROS_IA, CIUDADES, rubroIA } from "@/content/alta-ia";
import { metaPagina } from "@/lib/seo";

/* Agenda con asistente IA por rubro (content/alta-ia.ts): el contenido del
   rubro y los enlaces a sus 15 ciudades. */
export const dynamicParams = false;
export function generateStaticParams() {
  return RUBROS_IA.map((r) => ({ rubro: r.slug }));
}

export function generateMetadata({ params }: { params: { rubro: string } }) {
  const r = rubroIA(params.rubro);
  if (!r) return {};
  return metaPagina({
    title: `Agenda con asistente de IA para ${r.plural} | SynapTech`,
    description: `Syna responde el WhatsApp de ${r.tuLocal} y agenda con tus horas libres reales. 30 días gratis del plan Pro con el asistente.`,
    path: `/agenda-con-ia/${r.slug}`,
  });
}

export default function Pagina({ params }: { params: { rubro: string } }) {
  const r = rubroIA(params.rubro);
  if (!r) notFound();
  const origen = `ia-${r.slug}`;
  return (
    <>
      <Header />
      <main>
        <HeroIA
          eyebrow={`Agenda con asistente IA para ${r.plural}`}
          titulo={`Agenda con asistente de IA para ${r.plural}. 30 días gratis.`}
          bajada={r.bajada}
          origen={origen}
          rubro={r.rubro}
          chat={r.ejemplos[0]}
          migas={[
            { nombre: "Inicio", path: "/" },
            { nombre: "Agenda con asistente IA", path: "/agenda-con-asistente-ia" },
            { nombre: r.nombre, path: `/agenda-con-ia/${r.slug}` },
          ]}
        />
        <Dolores titulo={`Lo que Syna le resuelve a ${r.tuLocal}.`} items={r.dolores} />
        <EjemplosIA titulo={`Así atiende Syna a tus ${r.cliente}.`} ejemplos={r.ejemplos} />
        <PasosIA />
        <CifrasIA />
        <Despues30 origen={origen} rubro={r.rubro} />

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-8">
              <p className="eyebrow mb-4">Por ciudad</p>
              <h2 className="text-ink">Agenda con IA para {r.plural} en tu ciudad.</h2>
              <p className="text-text-secondary text-lg mt-4 leading-relaxed">Es 100% online y funciona en todo Chile.</p>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {CIUDADES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/agenda-con-ia/${r.slug}/${c.slug}`} className="block rounded-2xl bg-mist px-4 py-3 text-ink font-semibold hover:bg-lime/30 transition-colors">
                    {c.nombre}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {r.pagina && <Link href={r.pagina.href} className="font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink">{r.pagina.texto} →</Link>}
              <Link href="/asistente-ia-whatsapp" className="font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink">Todo sobre el asistente →</Link>
            </p>
          </div>
        </section>

        <FaqSeo titulo={`Agenda con IA para ${r.plural}: lo que más nos preguntan.`} preguntas={r.faq} />
        <CtaIA titulo={`Que Syna responda el WhatsApp de ${r.tuLocal}.`} bajada="Crea tu agenda en minutos. 30 días gratis del plan Pro con el asistente." origen={origen} rubro={r.rubro} />
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import FaqSeo   from "@/components/FaqSeo";
import { COMPETIDORES, SYNAPTECH, SYNAPTECH_USD } from "@/content/competidores";
import { metaPagina } from "@/lib/seo";
import { MarcaCompetidor } from "@/components/MarcaCompetidor";
import { TAMANOS, filasMercado, masBaratas, gratisCon, precioFaqDe, respuestaMasBarata, ultimaVerificacion, ultimaVerificacionTexto } from "@/lib/mercado";

/* "Cuánto cuesta una agenda online en Chile" (10-10-2026). Una sola tabla con
   el precio de todas las agendas según el tamaño del equipo, con fuente y
   fecha. Es la página que más le sirve a un buscador con IA: el 10-10, a
   "¿cuánto cuesta AgendaPro en 2026?" Claude contestó "no encontré precios
   oficiales para Chile" (devtools/.../seo/geo/). Todo sale de
   content/competidores.ts vía lib/mercado.ts: nada escrito a mano. */

const N = COMPETIDORES.length + 1;
const FECHA = ultimaVerificacion();
const A = FECHA.slice(0, 4);
const FECHA_TXT = ultimaVerificacionTexto();

export const metadata = metaPagina({
  title: `Precios de agendas online en Chile ${A}: ${N} sistemas`,
  description: `Cuánto cuestan AgendaPro, Fresha, WeiBook, Booksy, AgendaLibre y otras agendas con 1, 3, 6 y 9 profesionales, con la fuente y la fecha de cada precio.`,
  path: "/comparar/precios",
});

const PLURAL = (n: number) => `${n} ${n === 1 ? "profesional" : "profesionales"}`;

export default function PreciosAgendas() {
  const filas = filasMercado();
  const preguntasMarca = COMPETIDORES.map((c) => ({ c, f: precioFaqDe(c) })).filter((x) => x.f);
  const faqGeneral = [
    { q: "¿Cuál es la agenda online más barata en Chile?", a: respuestaMasBarata() },
    { q: "¿Cuánto cuesta SynapTech?", a: `El plan Básico cuesta ${SYNAPTECH.precios[0].valor} al mes por local, con profesionales ilimitados: el precio es el mismo con 1 o con 20 profesionales. El plan Pro, con el asistente con IA que responde y agenda en el WhatsApp del local, cuesta ${SYNAPTECH.pro}. Fuera de Chile: ${SYNAPTECH_USD.precios[0].valor} al mes, o ${SYNAPTECH_USD.ia} con el asistente.` },
    { q: "¿Los precios incluyen IVA?", a: "Depende de cada empresa, y en la tabla va tal como lo publica cada una: \"+ IVA\" cuando lo dice, \"+ imp.\" si dice impuestos, y sin nada cuando su página no lo aclara. Los precios de SynapTech son netos: se suma IVA." },
    { q: "¿Por qué el precio cambia tanto según el número de profesionales?", a: "Porque la mayoría de las agendas cobra por profesional, por usuario o por cuenta. Con un equipo chico la diferencia es poca; con 6 o 9 profesionales puede duplicar la mensualidad. SynapTech cobra por local, con profesionales ilimitados." },
  ];
  const faq = [...faqGeneral, ...preguntasMarca.map((x) => x.f!)];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SynapTech", item: "https://www.synaptechspa.cl" },
          { "@type": "ListItem", position: 2, name: "Comparaciones", item: "https://www.synaptechspa.cl/comparar" },
          { "@type": "ListItem", position: 3, name: "Precios de agendas online", item: "https://www.synaptechspa.cl/comparar/precios" },
        ],
      },
      {
        "@type": "Article",
        headline: `Cuánto cuesta una agenda online en Chile: precios de ${N} sistemas`,
        dateModified: FECHA,
        author: { "@type": "Organization", name: "SynapTech" },
        publisher: { "@type": "Organization", name: "Synaptech SpA", logo: { "@type": "ImageObject", url: "https://www.synaptechspa.cl/icon-512x512.png" } },
        about: COMPETIDORES.map((c) => ({ "@type": "SoftwareApplication", name: c.nombre, url: `https://${c.sitio}` })),
        mainEntityOfPage: "https://www.synaptechspa.cl/comparar/precios",
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <section className="pt-28 md:pt-36 pb-10">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <nav aria-label="Ruta" className="text-sm text-text-muted mb-6">
              <Link href="/comparar" className="hover:text-ink">Comparaciones</Link> <span aria-hidden>›</span> Precios
            </nav>
            <p className="eyebrow mb-5">Precios con fuente · datos al {FECHA_TXT}</p>
            <h1 className="text-ink max-w-4xl !text-[clamp(2.3rem,4.6vw,4rem)]">Cuánto cuesta una agenda online en Chile: precios de {N} sistemas.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-3xl">
              El precio mensual de cada agenda con 1, 3, 6 y 9 profesionales, en el plan más barato que admite ese equipo.
              Cada valor está copiado de la página pública de la empresa, con el enlace y la fecha en que lo revisamos.
              SynapTech va primero porque es la nuestra; donde otra es más barata, la tabla lo muestra.
            </p>
          </div>
        </section>

        {/* Las más baratas según el equipo: la respuesta corta */}
        <section className="pb-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <h2 className="!text-2xl sm:!text-3xl text-ink mb-2">La más barata según el tamaño de tu equipo</h2>
            <p className="text-text-secondary mb-6 max-w-3xl">Entre las que publican el precio en pesos. Los planes gratis van aparte.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TAMANOS.map((n, i) => {
                const gratis = gratisCon(i);
                return (
                  <article key={n} className="rounded-[24px] bg-mist p-5 sm:p-6">
                    <h3 className="!text-lg font-semibold text-ink">Con {PLURAL(n)}</h3>
                    <ol className="mt-4 space-y-2.5 list-none p-0 m-0">
                      {masBaratas(i).map((f, k) => (
                        <li key={f.id} className={`flex items-baseline justify-between gap-3 ${f.id === "synaptech" ? "font-semibold" : ""}`}>
                          <span className="text-ink"><span className="text-text-muted mr-1.5">{k + 1}.</span>{f.nombre}</span>
                          <span className="text-ink tabular-nums whitespace-nowrap text-[15px]">{f.precios[i].valor}</span>
                        </li>
                      ))}
                    </ol>
                    {gratis.length > 0 && <p className="text-[13px] text-text-muted mt-4">Gratis: {gratis.map((f) => `${f.nombre} (${(f.precios[i].nota ?? "").replace(/^Gratis:?\s*/i, "")})`).join(" · ")}</p>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* La tabla completa */}
        <section className="py-14 md:py-20 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <h2 className="text-ink mb-3">Todas las agendas, en una tabla.</h2>
            <p className="text-text-secondary text-lg mb-8 max-w-3xl">Precio al mes. Debajo de cada valor, el plan que corresponde. Las que cobran en dólares van en dólares, sin convertir.</p>
            <div className="overflow-x-auto rounded-[24px] bg-white border border-border-subtle">
              <table className="w-full min-w-[860px] text-left text-[15px]">
                <caption className="sr-only">Precio mensual de {N} agendas online según el número de profesionales</caption>
                <thead>
                  <tr className="text-[13px] uppercase tracking-[0.08em] text-text-muted">
                    <th scope="col" className="px-5 py-4 font-semibold">Agenda</th>
                    {TAMANOS.map((n) => <th key={n} scope="col" className="px-4 py-4 font-semibold">{PLURAL(n)}</th>)}
                    <th scope="col" className="px-5 py-4 font-semibold">Fuente</th>
                  </tr>
                </thead>
                <tbody>
                  {filas.map((f) => (
                    <tr key={f.id} className={f.id === "synaptech" ? "bg-lime/15" : ""}>
                      <th scope="row" className="px-5 py-4 align-top border-t border-border-subtle font-semibold text-ink whitespace-nowrap">
                        {f.c ? <Link href={`/comparar/${f.id}`} className="hover:text-accent">{f.nombre}</Link> : f.nombre}
                      </th>
                      {f.precios.map((p, i) => (
                        <td key={i} className="px-4 py-4 align-top border-t border-border-subtle">
                          <span className="font-semibold text-ink tabular-nums whitespace-nowrap">{p.valor}</span>
                          {p.nota && <span className="block text-[12px] text-text-muted leading-snug mt-0.5">{p.nota}</span>}
                        </td>
                      ))}
                      <td className="px-5 py-4 align-top border-t border-border-subtle text-[13px] text-text-muted">
                        {f.fuente
                          ? <><a href={f.fuente} target="_blank" rel="noopener nofollow" className="underline underline-offset-2 hover:text-ink">{f.c!.sitio}</a><span className="block">{f.fecha}</span></>
                          : <Link href="/precios" className="underline underline-offset-2 hover:text-ink">Lista oficial</Link>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-text-muted mt-4 max-w-3xl">
              SynapTech: plan Básico, por local y con profesionales ilimitados; con el asistente con IA (plan Pro), {SYNAPTECH.pro}.
              Fuera de Chile, {SYNAPTECH_USD.precios[0].valor} o {SYNAPTECH_USD.ia} al mes. Si ves un precio desactualizado, escríbenos y lo volvemos a revisar.
            </p>
          </div>
        </section>

        {/* Una respuesta por marca: es lo que se busca ("cuánto cuesta agendapro") */}
        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <h2 className="text-ink mb-10 max-w-3xl">Cuánto cuesta cada una, y qué se cobra aparte.</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {preguntasMarca.map(({ c, f }) => (
                <article key={c.id} className="rounded-[24px] border border-border-subtle p-6 sm:p-7 flex flex-col">
                  <span className="h-8 flex items-center mb-4"><MarcaCompetidor c={c} chico /></span>
                  <h3 className="!text-xl text-ink">{f!.q}</h3>
                  <p className="text-text-secondary leading-relaxed mt-3">{f!.a}</p>
                  <p className="text-[13px] text-text-muted leading-relaxed mt-3">{c.notaPrecios}</p>
                  <Link href={`/comparar/${c.id}`} className="mt-auto pt-5 font-semibold text-ink hover:text-accent">Alternativa a {c.nombre}: la comparación completa →</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="rounded-[24px] bg-mist p-6 sm:p-8">
              <h2 className="!text-2xl text-ink">Cómo armamos esta tabla</h2>
              <ul className="mt-4 space-y-2 text-text-secondary leading-relaxed list-disc pl-5">
                <li>Solo páginas públicas de cada empresa: sin cuentas, sin demos y sin cotizaciones.</li>
                <li>Para cada tamaño de equipo, el plan más barato que lo admite. Si una calculadora lo permite, la movimos a 3, 6 y 9 y guardamos la captura.</li>
                <li>Lo que una empresa no publica aparece como &quot;No publicado&quot;, nunca como &quot;No&quot;.</li>
                <li>Los precios cambian: cada fila lleva la fecha en que se revisó.</li>
              </ul>
            </div>
          </div>
        </section>

        <FaqSeo titulo="Precios de agendas online: lo que más se pregunta." preguntas={faq} />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

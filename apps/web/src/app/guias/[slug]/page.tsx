import Link from "next/link";
import { notFound } from "next/navigation";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import FaqSeo   from "@/components/FaqSeo";
import { GUIAS, guia, REVISADAS, type BloqueGuia } from "@/content/guias-duenos";
import { WA_AGENCIAS } from "@/content/agencias";
import { LinkWhatsAppConRef } from "@/components/CtaWhatsAppComparar";
import { IconoWa } from "@/components/PlanesAgencia";
import { metaPagina, SITIO } from "@/lib/seo";

/* Una página por guía práctica (content/guias-duenos.ts, 04-11-2026).
   La guía de boletas tiene su propia carpeta estática y gana sobre esta ruta. */

export const dynamicParams = false;
export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const g = guia(params.slug);
  if (!g) return {};
  return metaPagina({ title: g.title, description: g.description, path: `/guias/${g.slug}`, imagen: g.imagen });
}

function Bloque({ b }: { b: BloqueGuia }) {
  if (b.tipo === "p") return <p className="text-text-secondary text-lg leading-relaxed">{b.texto}</p>;
  if (b.tipo === "ojo") {
    return (
      <p className="rounded-[20px] bg-syn-lime-tint border border-lime/40 px-5 py-4 text-ink leading-relaxed">
        <span className="font-semibold">Ojo: </span>{b.texto}
      </p>
    );
  }
  if (b.tipo === "lista") {
    const Tag = b.numerada ? "ol" : "ul";
    return (
      <Tag className={`space-y-3 text-text-secondary text-lg leading-relaxed pl-6 ${b.numerada ? "list-decimal" : "list-disc"} marker:text-accent marker:font-semibold`}>
        {b.items.map((it) => <li key={it}>{it}</li>)}
      </Tag>
    );
  }
  return (
    <div>
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[460px] text-[15px] border-separate border-spacing-0 rounded-[20px] overflow-hidden border border-border-subtle">
          <thead><tr>{b.columnas.map((c, i) => <th key={c} className={`text-left px-4 py-3 font-semibold ${i === 0 ? "bg-mist text-ink" : "bg-ink text-white"}`}>{c}</th>)}</tr></thead>
          <tbody>
            {b.filas.map((f) => (
              <tr key={f.join("|")}>{f.map((v, i) => i === 0
                ? <th key={i} scope="row" className="text-left align-top px-4 py-3 border-t border-border-subtle font-semibold text-ink">{v}</th>
                : <td key={i} className="align-top px-4 py-3 border-t border-border-subtle text-text-secondary">{v}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      {b.nota && <p className="text-sm text-text-muted mt-3">{b.nota}</p>}
    </div>
  );
}

export default function PaginaGuia({ params }: { params: { slug: string } }) {
  const g = guia(params.slug);
  if (!g) notFound();
  const url = `${SITIO}/guias/${g.slug}`;
  /* Primero las de su misma categoría (09-11-2026: las de agencias no deben
     mandar a leer de Google Maps para barberías si hay otras de agencias). */
  const otras = [
    ...GUIAS.filter((o) => o.slug !== g.slug && o.categoria === g.categoria),
    ...GUIAS.filter((o) => o.categoria !== g.categoria),
  ].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "SynapTech", item: SITIO },
        { "@type": "ListItem", position: 2, name: "Guías", item: `${SITIO}/guias` },
        { "@type": "ListItem", position: 3, name: g.titulo, item: url },
      ] },
      { "@type": "Article", headline: g.title, description: g.description,
        datePublished: g.publicada, dateModified: g.publicada,
        author: { "@type": "Organization", name: "SynapTech" },
        publisher: { "@type": "Organization", name: "Synaptech SpA", logo: { "@type": "ImageObject", url: `${SITIO}/assets/synaptech-icon.png` } },
        mainEntityOfPage: url },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <section className="pt-28 md:pt-36 pb-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <nav aria-label="Ruta" className="text-sm text-text-muted mb-6">
              <Link href="/guias" className="hover:text-ink underline-offset-4 hover:underline">Guías</Link> <span aria-hidden>›</span> {g.categoria}
            </nav>
            <p className="eyebrow mb-5">Guía gratis · {g.minutos} min de lectura</p>
            <h1 className="text-ink !text-[clamp(2rem,4.2vw,3.4rem)]">{g.titulo}</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6">{g.intro}</p>
          </div>
        </section>

        <article className="pb-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-14">
            {g.secciones.map((s) => (
              <section key={s.titulo}>
                <h2 className="text-ink !text-[clamp(1.5rem,2.6vw,2.1rem)] mb-5">{s.titulo}</h2>
                <div className="space-y-5">{s.bloques.map((b, i) => <Bloque key={i} b={b} />)}</div>
              </section>
            ))}

            <section className="rounded-[28px] bg-ink text-white p-7 md:p-9">
              <p className="eyebrow !text-lime mb-3">Tu tarea de hoy</p>
              <ol className="space-y-3 list-decimal pl-6 text-white/85 text-lg leading-relaxed marker:text-lime marker:font-semibold">
                {g.tarea.map((t) => <li key={t}>{t}</li>)}
              </ol>
            </section>
          </div>
        </article>

        <section className="py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="rounded-[28px] bg-mist p-7 md:p-9">
              <p className="eyebrow mb-3">Con SynapTech</p>
              <h2 className="text-ink !text-[clamp(1.4rem,2.4vw,1.9rem)]">{g.producto.titulo}</h2>
              <p className="text-text-secondary text-lg mt-4 leading-relaxed">{g.producto.texto}</p>
              <Link href={g.producto.href} className="inline-flex mt-6 bg-ink text-white font-semibold px-6 py-3.5 rounded-full hover:bg-black transition-colors">
                {g.producto.cta}
              </Link>
            </div>
          </div>
        </section>

        <FaqSeo titulo="Preguntas frecuentes." preguntas={g.faq} />

        <section className="pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-ink !text-2xl mb-5">Sigue leyendo</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {otras.map((o) => (
                <Link key={o.slug} href={`/guias/${o.slug}`} className="rounded-[20px] border border-border-subtle p-5 hover:border-ink transition-colors">
                  <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-text-muted">{o.categoria}</p>
                  <p className="font-semibold text-ink mt-2 leading-snug">{o.titulo}</p>
                </Link>
              ))}
            </div>
            <div className="text-sm text-text-muted mt-10">
              {g.fuentes.length > 0 && (
                <>
                  <p className="font-semibold text-text-secondary">Fuentes oficiales, revisadas el {REVISADAS}</p>
                  <ul className="mt-2 space-y-1 list-disc pl-5">
                    {g.fuentes.map((f) => <li key={f.url}><a href={f.url} target="_blank" rel="noopener nofollow" className="underline underline-offset-2 hover:text-ink">{f.texto}</a></li>)}
                  </ul>
                </>
              )}
              <p className="mt-3">Esta guía es información general. Los nombres de locales y los montos son ejemplos.</p>
            </div>
          </div>
        </section>

        {g.cierre === "agencias" ? (
          <section className="py-16 md:py-24 bg-mist">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-ink">¿Vendes por WhatsApp con un equipo?</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                El asistente de SynapTech responde tu WhatsApp e Instagram, reparte los chats entre tus vendedores y deja cada venta en un tablero.
                30 días de prueba, instalación sin costo y sin permanencia.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
                <LinkWhatsAppConRef texto={WA_AGENCIAS}
                  className="inline-flex justify-center items-center gap-2 bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
                  <IconoWa /> Hablar por WhatsApp
                </LinkWhatsAppConRef>
                <Link href="/agencias#planes"
                  className="inline-flex justify-center items-center border border-ink/15 bg-white text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
                  Ver planes para agencias
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <CtaFinal origen={`guia-${g.slug}`} />
        )}
      </main>
      <Footer />
    </>
  );
}

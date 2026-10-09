import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import { COMPETIDORES, competidor, SYNAPTECH, FECHA_VERIFICACION } from "@/content/competidores";
import { SIGNUP_URL, waLink } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";
import { MarcaCompetidor, NombreConPunto } from "@/components/MarcaCompetidor";

/* "SynapTech vs <agenda>" (09-10-2026). Una página por competidor, indexable,
   para quien busca a la competencia en Google. Datos y reglas en
   content/competidores.ts. */

export const dynamicParams = false;
export function generateStaticParams() {
  return COMPETIDORES.map((c) => ({ competidor: c.id }));
}

export function generateMetadata({ params }: { params: { competidor: string } }): Metadata {
  const c = competidor(params.competidor);
  if (!c) return {};
  return metaPagina({
    title: `${c.nombre} vs SynapTech: precios y diferencias (2026)`,
    description: `${c.nombre} o SynapTech: cuánto cuesta con 1, 3, 6 y 9 profesionales, WhatsApp, asistente con IA y boletas. Datos de ${c.sitio} con fuente y fecha.`,
    path: `/comparar/${c.id}`,
  });
}

function Celda({ v }: { v: string | null }) {
  return v === null ? <span className="text-text-muted/80">No publicado</span> : <>{v}</>;
}

const TAMANOS = ["1 profesional", "3 profesionales", "6 profesionales", "9 profesionales"];

export default function CompararCompetidor({ params }: { params: { competidor: string } }) {
  const c = competidor(params.competidor);
  if (!c) notFound();
  const otros = COMPETIDORES.filter((x) => x.id !== c.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SynapTech", item: "https://www.synaptechspa.cl" },
          { "@type": "ListItem", position: 2, name: "Comparaciones", item: "https://www.synaptechspa.cl/comparar" },
          { "@type": "ListItem", position: 3, name: `${c.nombre} vs SynapTech`, item: `https://www.synaptechspa.cl/comparar/${c.id}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Hero */}
        <section className="pt-28 md:pt-36 pb-12">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <nav aria-label="Ruta" className="text-sm text-text-muted mb-6">
              <Link href="/comparar" className="hover:text-ink">Comparaciones</Link> <span aria-hidden>›</span> {c.nombre}
            </nav>
            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
              <div>
                <p className="eyebrow mb-5">Comparación con fuentes · {FECHA_VERIFICACION}</p>
                <h1 className="text-ink !text-[clamp(2.3rem,4.6vw,4rem)]">{c.nombre} vs SynapTech: precios y diferencias.</h1>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-xl">{c.resumen}</p>
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <a href={`${SIGNUP_URL}?ref=comparar-${c.id}`}
                    className="inline-flex justify-center items-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
                    Probar 14 días gratis
                  </a>
                  <a href={waLink(`Hola, hoy uso ${c.nombre} y quiero ver cómo sería cambiarme a SynapTech`)} target="_blank" rel="noopener noreferrer"
                    className="inline-flex justify-center items-center border border-ink/15 text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
                    Vengo de {c.nombre}: hablemos
                  </a>
                </div>
              </div>

              {/* Las dos marcas, frente a frente */}
              <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 sm:gap-5">
                <div className="min-w-0 rounded-[24px] sm:rounded-[28px] bg-mist aspect-[4/3] flex items-center justify-center p-3 sm:p-6">
                  <MarcaCompetidor c={c} />
                </div>
                <span className="font-display font-bold text-text-muted text-xl">vs</span>
                <div className="min-w-0 rounded-[24px] sm:rounded-[28px] bg-ink aspect-[4/3] flex items-center justify-center gap-1.5 sm:gap-2.5 p-3 sm:p-6">
                  <Image src="/assets/synaptech-icon.png" alt="" width={40} height={40} className="w-6 h-6 sm:w-10 sm:h-10 rounded-md" />
                  <span className="font-display font-bold text-white text-base sm:text-3xl tracking-tight">SynapTech</span>
                </div>
                <p className="text-[13px] text-text-muted text-center">{c.origen}</p>
                <span />
                <p className="text-[13px] text-text-muted text-center">Viña del Mar, Chile</p>
              </div>
            </div>
          </div>
        </section>

        {/* Precio según el tamaño del equipo */}
        <section className="py-16 md:py-20 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-8">
              <p className="eyebrow mb-4">Precio según tu equipo</p>
              <h2 className="text-ink">Cuánto pagas al mes en cada una.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">{c.modelo}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {TAMANOS.map((t, i) => (
                <article key={t} className="rounded-[24px] bg-white p-5 sm:p-6">
                  <p className="font-semibold text-ink">{t}</p>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink"><NombreConPunto c={c} /></p>
                      <p className="font-display font-bold text-ink text-xl sm:text-2xl tracking-tight">{c.precios[i].valor}</p>
                      {c.precios[i].nota && <p className="text-[12px] text-text-muted">{c.precios[i].nota}</p>}
                    </div>
                    <div className="rounded-xl bg-lime/20 px-3 py-2">
                      <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-accent">SynapTech</p>
                      <p className="font-display font-bold text-ink text-xl sm:text-2xl tracking-tight">{SYNAPTECH.precios[i].valor}</p>
                      <p className="text-[12px] text-text-muted">{SYNAPTECH.precios[i].nota}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="text-sm text-text-muted mt-5 max-w-3xl">
              {c.notaPrecios} SynapTech Pro, con el asistente con IA, cuesta {SYNAPTECH.pro} al mes, también con profesionales ilimitados.
            </p>
          </div>
        </section>

        {/* Diferencias */}
        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-8">
              <p className="eyebrow mb-4">Punto por punto</p>
              <h2 className="text-ink">Las diferencias que se notan en el día a día.</h2>
            </div>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[640px] text-[15px] border-separate border-spacing-0 rounded-[24px] overflow-hidden border border-border-subtle">
                <thead>
                  <tr>
                    <th className="text-left font-semibold px-5 py-4 bg-mist text-ink w-[26%]"></th>
                    <th className="text-left font-semibold px-5 py-4 bg-mist text-ink w-[37%]">{c.nombre}</th>
                    <th className="text-left font-semibold px-5 py-4 bg-ink text-white w-[37%]">SynapTech</th>
                  </tr>
                </thead>
                <tbody>
                  {c.filas.map((f) => (
                    <tr key={f.tema}>
                      <th scope="row" className="text-left px-5 py-4 align-top border-t border-border-subtle font-semibold text-ink">{f.tema}</th>
                      <td className="px-5 py-4 align-top border-t border-border-subtle text-text-secondary"><Celda v={f.ellos} /></td>
                      <td className="px-5 py-4 align-top border-t border-border-subtle text-ink bg-lime/10">{f.nosotros}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Cuándo elegir cada una */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid md:grid-cols-2 gap-5">
            <article className="rounded-[28px] border border-border-subtle p-7 sm:p-9">
              <p className="eyebrow !text-ink mb-3"><NombreConPunto c={c} /> · cuándo elegirla</p>
              <p className="text-text-secondary text-lg leading-relaxed">{c.cuandoEllos}</p>
            </article>
            <article className="rounded-[28px] bg-ink text-white p-7 sm:p-9">
              <p className="eyebrow !text-lime mb-3">Cuándo elegir SynapTech</p>
              <ul className="space-y-3">
                {c.cuandoNosotros.map((x) => (
                  <li key={x} className="flex gap-3 text-lg leading-relaxed text-white/90">
                    <svg className="w-5 h-5 shrink-0 mt-1.5 text-lime" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {x}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {/* Mudanza + testimonio */}
        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="eyebrow mb-4">Cámbiate sin perder a nadie</p>
              <h2 className="text-ink">¿Vienes de {c.nombre}? Te mudamos gratis.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">{c.migracion}</p>
              <Link href="/como-funciona#capsulas" className="inline-flex items-center gap-1.5 mt-6 font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink">
                Ver la mudanza en video →
              </Link>
            </div>
            {c.testimonio && (
              <figure className="rounded-[28px] bg-white p-7 sm:p-9">
                <blockquote className="flex flex-col gap-2">
                  {c.testimonio.cita.map((b, i) => (
                    <p key={i} className="self-start rounded-2xl rounded-tl-md bg-mist px-4 py-2.5 text-ink leading-relaxed">{b}</p>
                  ))}
                </blockquote>
                <figcaption className="mt-5 text-[14px]">
                  <span className="font-semibold text-ink">{c.testimonio.autor}</span>
                  <span className="text-text-muted"> · {c.testimonio.rol}, {c.testimonio.local}</span>
                  <span className="block text-[12px] text-text-muted mt-0.5">Por WhatsApp, {c.testimonio.fecha}. Texto sin editar.</span>
                </figcaption>
              </figure>
            )}
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="eyebrow mb-4">Preguntas frecuentes</p>
            <h2 className="text-ink mb-8">Sobre {c.nombre} y SynapTech.</h2>
            <div className="divide-y divide-border-subtle border-y border-border-subtle">
              {c.faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-6 font-semibold text-ink text-lg">
                    {f.q}
                    <span className="text-2xl text-text-muted transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="text-text-secondary leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Otras comparaciones + fuentes */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="font-semibold text-ink mb-4">Otras comparaciones</p>
            <ul className="flex flex-wrap gap-2">
              {otros.map((o) => (
                <li key={o.id}>
                  <Link href={`/comparar/${o.id}`} className="inline-flex px-4 py-2 rounded-full bg-mist text-[14px] font-semibold text-text-secondary hover:bg-lime/30 hover:text-ink transition-colors">
                    {o.nombre} vs SynapTech
                  </Link>
                </li>
              ))}
              <li><Link href="/comparar" className="inline-flex px-4 py-2 rounded-full border border-ink/15 text-[14px] font-semibold text-ink hover:border-ink">Todas las preguntas →</Link></li>
            </ul>
            <div className="mt-10 text-[13px] text-text-muted max-w-4xl">
              <p className="font-semibold text-text-secondary">Fuentes, revisadas el {FECHA_VERIFICACION}</p>
              <ul className="mt-2 space-y-1 list-disc pl-5">
                {c.fuentes.map((f) => (
                  <li key={f.url}><a href={f.url} target="_blank" rel="noopener nofollow" className="underline underline-offset-2 hover:text-ink">{f.texto}</a></li>
                ))}
                <li>SynapTech: lista pública de precios en <Link href="/precios" className="underline underline-offset-2 hover:text-ink">/precios</Link> (valores netos, se suma IVA).</li>
              </ul>
              <p className="mt-3">{c.nombre} es una marca de su respectivo dueño, sin relación con Synaptech SpA; su logo se usa solo para identificarla en esta comparación. Si algún dato cambió, escríbenos a hola@synaptechspa.cl y lo corregimos.</p>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

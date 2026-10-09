import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import FaqSeo   from "@/components/FaqSeo";
import { TarjetaCapsula } from "@/components/Capsulas";
import { capsula } from "@/content/capsulas";
import { metaPagina } from "@/lib/seo";
import { BHE_MODELOS, BHE_RETENCION, BHE_EJEMPLO, BHE_FAQ, BHE_FUENTES } from "@/content/guias";

/* Guía "Boleta de honorarios y comisiones en barberías" (09-10-2026).
   Keywords: "boleta de honorarios barbería", "comisiones barberos chile",
   "arriendo de sillón barbería", "software barbería sii". Todo dato tributario
   sale de seo/verificacion-guias-2026-10-09.md (fuentes oficiales con fecha):
   content/guias.ts. No es asesoría tributaria y lo dice. */
export const metadata = metaPagina({
  title: "Boleta de honorarios y comisiones en barberías (2026)",
  description: "Sueldo, comisión o arriendo de sillón: quién emite boleta, cuánto se retiene en 2026, qué lleva IVA y cómo se paga a cada barbero. Con ejemplo en pesos.",
  path: "/guias/boleta-honorarios-y-comisiones-barberos",
});

export default function GuiaBoletas() {
  const leccion = capsula("leccion1-sueldo-comision-arriendo");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Boleta de honorarios y comisiones en barberías (2026)",
    datePublished: "2026-10-09",
    dateModified: "2026-10-09",
    author: { "@type": "Organization", name: "SynapTech" },
    publisher: { "@type": "Organization", name: "Synaptech SpA", logo: { "@type": "ImageObject", url: "https://www.synaptechspa.cl/assets/synaptech-icon.png" } },
    mainEntityOfPage: "https://www.synaptechspa.cl/guias/boleta-honorarios-y-comisiones-barberos",
  };
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <section className="pt-28 md:pt-36 pb-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <nav aria-label="Ruta" className="text-sm text-text-muted mb-6">Guías <span aria-hidden>›</span> Boletas y comisiones</nav>
              <p className="eyebrow mb-5">Guía para dueños de barbería · 2026</p>
              <h1 className="text-ink !text-[clamp(2.2rem,4.4vw,3.8rem)]">Boleta de honorarios, comisiones y arriendo de sillón en barberías.</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-xl">
                Las tres formas de pagarle a tu equipo, quién emite qué documento, cuánto se retiene en 2026 y
                dónde aparece el IVA. Con un ejemplo en pesos.
              </p>
            </div>
            {leccion && <TarjetaCapsula c={leccion} />}
          </div>
        </section>

        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Las tres formas</p>
              <h2 className="text-ink">Sueldo, comisión o arriendo de sillón.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {BHE_MODELOS.map((m) => (
                <article key={m.titulo} className="rounded-[28px] bg-white p-7 flex flex-col">
                  <h3 className="font-display font-bold text-ink text-2xl tracking-tight">{m.titulo}</h3>
                  <p className="text-accent font-semibold mt-1">{m.bajada}</p>
                  <dl className="mt-5 space-y-3 text-[15px]">
                    {m.filas.map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-text-muted">{k}</dt>
                        <dd className="text-text-secondary leading-relaxed mt-0.5">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="eyebrow mb-4">Retención de la boleta de honorarios</p>
            <h2 className="text-ink">{BHE_RETENCION.titulo}</h2>
            <div className="mt-6 space-y-4 text-text-secondary text-lg leading-relaxed">
              {BHE_RETENCION.parrafos.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="eyebrow mb-4">Ejemplo en pesos</p>
            <h2 className="text-ink">{BHE_EJEMPLO.titulo}</h2>
            <p className="text-text-secondary text-lg mt-5 leading-relaxed">{BHE_EJEMPLO.intro}</p>
            <div className="overflow-x-auto mt-6 -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[520px] text-[15px] border-separate border-spacing-0 rounded-[20px] overflow-hidden border border-border-subtle">
                <thead><tr>{BHE_EJEMPLO.columnas.map((c, i) => <th key={c} className={`text-left px-4 py-3 font-semibold ${i === 0 ? "bg-mist text-ink" : "bg-ink text-white"}`}>{c}</th>)}</tr></thead>
                <tbody>
                  {BHE_EJEMPLO.filas.map((f) => (
                    <tr key={f[0]}>{f.map((v, i) => i === 0
                      ? <th key={i} scope="row" className="text-left px-4 py-3 border-t border-border-subtle font-semibold text-ink">{v}</th>
                      : <td key={i} className="px-4 py-3 border-t border-border-subtle text-text-secondary">{v}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-text-muted mt-4">{BHE_EJEMPLO.nota}</p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-ink text-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="eyebrow !text-lime mb-4">Sin planillas</p>
              <h2 className="text-white">Las boletas y la liquidación, solas.</h2>
              <p className="text-white/75 text-lg mt-5 leading-relaxed">
                En SynapTech la boleta de honorarios de cada barbero sale sola al cerrar la cita, con folio real del
                SII, y la liquidación de cada uno se calcula con su porcentaje o su arriendo, propinas y adelantos.
                Todo el mes queda en Excel para tu contador.
              </p>
              <Link href="/barberias" className="inline-flex mt-7 bg-lime text-ink font-semibold px-6 py-3.5 rounded-full hover:bg-white transition-colors">
                Ver el software para barberías
              </Link>
            </div>
            <div className="rounded-[24px] bg-white p-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/panel/comisiones.webp" alt="Liquidación de comisiones por profesional en SynapTech" width={2880} height={1800} loading="lazy" className="w-full h-auto rounded-xl" />
            </div>
          </div>
        </section>

        <FaqSeo titulo="Boletas y comisiones: preguntas frecuentes." preguntas={BHE_FAQ} />

        <section className="pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-sm text-text-muted">
            <p className="font-semibold text-text-secondary">Fuentes oficiales, revisadas el {BHE_RETENCION.fecha}</p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              {BHE_FUENTES.map((f) => <li key={f.url}><a href={f.url} target="_blank" rel="noopener nofollow" className="underline underline-offset-2 hover:text-ink">{f.texto}</a></li>)}
            </ul>
            <p className="mt-3">Esta guía es información general y no reemplaza la asesoría de tu contador.</p>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

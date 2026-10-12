import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import FaqSeo   from "@/components/FaqSeo";
import { metaPagina } from "@/lib/seo";
import { CONSENTIMIENTO_PARTES, CONSENTIMIENTO_TRATAMIENTOS, CONSENTIMIENTO_LEY, CONSENTIMIENTO_FAQ } from "@/content/guias";

/* Guía "Consentimiento informado para estética" (11-10-2026). Keyword:
   "consentimiento informado estética" + facial, corporal, pdf, word, ejemplo, y
   por tratamiento (limpieza facial, peeling, depilación láser, micropigmentación,
   lifting de pestañas): autocompletado de Google Chile del 11-10. Hermana de
   /recursos/ficha-clinica-estetica. Lo legal y el detalle: content/guias.ts. */
export const metadata = metaPagina({
  title: "Consentimiento informado estética: modelo gratis PDF y Word",
  description: "Descarga gratis un consentimiento informado para estética facial y corporal, en PDF y Word, con anexos para limpieza facial, peeling, láser y más.",
  path: "/recursos/consentimiento-informado-estetica",
});

export default function ConsentimientoInformadoEstetica() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Consentimiento informado para estética: modelo gratis facial y corporal",
    datePublished: "2026-10-11",
    dateModified: "2026-10-11",
    author: { "@type": "Organization", name: "SynapTech" },
    publisher: { "@type": "Organization", name: "Synaptech SpA", logo: { "@type": "ImageObject", url: "https://www.synaptechspa.cl/assets/synaptech-icon.png" } },
    mainEntityOfPage: "https://www.synaptechspa.cl/recursos/consentimiento-informado-estetica",
  };
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <section className="pt-28 md:pt-36 pb-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <nav aria-label="Ruta" className="text-sm text-text-muted mb-6">Recursos <span aria-hidden>›</span> Consentimiento informado</nav>
              <p className="eyebrow mb-5">Plantilla gratis · PDF y Word</p>
              <h1 className="text-ink !text-[clamp(2.3rem,4.6vw,4rem)]">Consentimiento informado para estética: modelo gratis.</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-xl">
                Un consentimiento general para tratamientos faciales y corporales, más anexos para limpieza facial,
                peeling, depilación láser, micropigmentación, lifting de pestañas y aparatología corporal.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a href="/recursos/consentimiento-informado-estetica.pdf" download
                  className="inline-flex justify-center items-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
                  Descargar en PDF
                </a>
                <a href="/recursos/consentimiento-informado-estetica.docx" download
                  className="inline-flex justify-center items-center border border-ink/15 text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
                  Descargar en Word
                </a>
              </div>
              <p className="text-sm text-text-muted mt-4">Gratis, sin registro. Dos páginas en tamaño A4; en Word le agregas tu logo y tus tratamientos.</p>
            </div>
            <a href="/recursos/consentimiento-informado-estetica/plantilla" className="block rounded-[28px] bg-mist p-4 sm:p-6 hover:shadow-card-hover transition-shadow" aria-label="Ver la plantilla del consentimiento">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/recursos/consentimiento-informado-estetica-vista.png" alt="Primera página del consentimiento informado para estética, para imprimir" width={794} height={1123} className="w-full h-auto rounded-lg border border-border-subtle shadow-card-hover bg-white" />
            </a>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Qué debe incluir</p>
              <h2 className="text-ink">Las 8 partes de un consentimiento informado.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                No es un trámite: es la constancia de que tu paciente entendió qué le vas a hacer y lo aceptó.
                Si algo sale distinto a lo esperado, es lo que muestra qué se explicó.
              </p>
            </div>
            <ol className="grid md:grid-cols-2 gap-4">
              {CONSENTIMIENTO_PARTES.map((s, i) => (
                <li key={s.t} className="rounded-[24px] bg-white p-6 flex gap-4">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-lime text-ink font-bold flex items-center justify-center">{i + 1}</span>
                  <div>
                    <h3 className="font-display font-bold text-ink text-xl tracking-tight">{s.t}</h3>
                    <p className="text-text-secondary mt-1.5 leading-relaxed">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Por tratamiento</p>
              <h2 className="text-ink">Qué explicar en cada tratamiento.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Ejemplos de lo que suele ir en cada anexo. Complétalos con tu técnica, tus productos y tu equipo:
                tú sabes qué puede pasar en tu cabina.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CONSENTIMIENTO_TRATAMIENTOS.map((t) => (
                <article key={t.id} id={t.id} className="rounded-[24px] border border-border-subtle p-6 scroll-mt-28">
                  <h3 className="font-display font-bold text-ink text-xl tracking-tight">Consentimiento informado para {t.nombre.toLowerCase()}</h3>
                  <p className="text-sm font-semibold text-ink mt-4">Lo que puede pasar</p>
                  <p className="text-text-secondary mt-1 leading-relaxed">{t.efectos}</p>
                  <p className="text-sm font-semibold text-ink mt-4">Cuidados</p>
                  <p className="text-text-secondary mt-1 leading-relaxed">{t.cuidados}</p>
                  {t.ojo && <p className="mt-4 rounded-xl bg-lime/25 px-3.5 py-2.5 text-[15px] text-ink leading-snug">{t.ojo}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="eyebrow mb-4">Lo que dice la normativa</p>
            <h2 className="text-ink">Consentimiento informado en Chile.</h2>
            <div className="mt-6 space-y-4 text-text-secondary text-lg leading-relaxed">
              {CONSENTIMIENTO_LEY.parrafos.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <p className="text-sm text-text-muted mt-6">
              Esto es información general, no asesoría legal. Fuentes revisadas el {CONSENTIMIENTO_LEY.fecha}:{" "}
              {CONSENTIMIENTO_LEY.fuentes.map((f, i) => (
                <span key={f.url}>{i > 0 && " · "}<a href={f.url} target="_blank" rel="noopener nofollow" className="underline underline-offset-2 hover:text-ink">{f.texto}</a></span>
              ))}
            </p>
            <p className="text-text-secondary mt-6">
              El consentimiento va dentro de la ficha de cada paciente: también tenemos la{" "}
              <Link href="/recursos/ficha-clinica-estetica" className="text-ink font-semibold underline underline-offset-2">ficha clínica estética gratis en PDF</Link>.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-ink text-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="eyebrow !text-lime mb-4">Sin papeles</p>
              <h2 className="text-white">Que lo acepte al reservar.</h2>
              <p className="text-white/75 text-lg mt-5 leading-relaxed">
                En SynapTech tu paciente lee y acepta el consentimiento en el último paso de la reserva online, y puedes
                exigirlo para que pueda agendar. Queda guardado en su ficha, junto a sus alergias y la evolución de cada sesión.
              </p>
              <Link href="/funciones/ficha-clinica-digital" className="inline-flex mt-7 bg-lime text-ink font-semibold px-6 py-3.5 rounded-full hover:bg-white transition-colors">
                Ver la ficha clínica digital
              </Link>
            </div>
            <div className="rounded-[24px] bg-white p-2.5 max-w-sm mx-auto lg:mx-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/panel/clinica-reserva-consentimiento.webp" alt="Paso de la reserva online donde la paciente acepta el consentimiento informado" width={780} height={1688} loading="lazy" className="w-full h-auto rounded-xl" />
            </div>
          </div>
        </section>

        <FaqSeo titulo="Consentimiento informado en estética: preguntas frecuentes." preguntas={CONSENTIMIENTO_FAQ} />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

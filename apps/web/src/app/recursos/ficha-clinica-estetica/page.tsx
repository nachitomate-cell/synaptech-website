import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import FaqSeo   from "@/components/FaqSeo";
import { metaPagina } from "@/lib/seo";
import { FICHA_LEY, FICHA_FAQ } from "@/content/guias";

/* Guía "Ficha clínica estética" (09-10-2026). Keyword: "ficha clínica
   estética" (+ facial, corporal, pdf, modelo, descargar), que hoy ganan
   documentos sueltos de Scribd y uDocz (seo/mapa-keywords-2026-10-09.md).
   Lo legal sale de seo/verificacion-guias-2026-10-09.md (fuentes oficiales,
   con fecha): content/guias.ts. */
export const metadata = metaPagina({
  title: "Ficha clínica estética: modelo gratis facial y corporal",
  description: "Descarga gratis una ficha clínica estética en PDF, facial y corporal: anamnesis, fototipo, medidas, consentimiento y evolución por sesión. Qué incluir.",
  path: "/recursos/ficha-clinica-estetica",
});

const SECCIONES = [
  { t: "Datos de la paciente", d: "Nombre completo, RUT, fecha de nacimiento, contacto, contacto de emergencia y motivo de consulta." },
  { t: "Anamnesis", d: "Embarazo o lactancia, enfermedades, alergias, medicamentos, cirugías recientes y tratamientos estéticos anteriores. Es lo que te dice qué no hacer." },
  { t: "Evaluación facial", d: "Fototipo según la escala de Fitzpatrick, tipo de piel y lo que observas: acné, manchas, rosácea, cicatrices o líneas de expresión." },
  { t: "Evaluación corporal", d: "Peso, talla y medidas de las zonas a tratar, más lo que observas: celulitis, flacidez, adiposidad localizada o estrías." },
  { t: "Plan de tratamiento", d: "Qué tratamiento indicas, cuántas sesiones, cada cuánto, y las indicaciones para la casa." },
  { t: "Consentimiento informado", d: "La declaración de que se le explicó el tratamiento, sus efectos y cuidados, con su firma. Incluye qué autoriza sobre las fotos." },
  { t: "Evolución por sesión", d: "Fecha, zona, parámetros y productos usados, cómo reaccionó la piel y quién atendió. Es lo que permite comparar una sesión con la anterior." },
];

export default function FichaClinicaEstetica() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Ficha clínica estética: modelo gratis facial y corporal",
    datePublished: "2026-10-09",
    dateModified: "2026-10-09",
    author: { "@type": "Organization", name: "SynapTech" },
    publisher: { "@type": "Organization", name: "Synaptech SpA", logo: { "@type": "ImageObject", url: "https://www.synaptechspa.cl/assets/synaptech-icon.png" } },
    mainEntityOfPage: "https://www.synaptechspa.cl/recursos/ficha-clinica-estetica",
  };
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <section className="pt-28 md:pt-36 pb-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <nav aria-label="Ruta" className="text-sm text-text-muted mb-6">Recursos <span aria-hidden>›</span> Ficha clínica estética</nav>
              <p className="eyebrow mb-5">Plantilla gratis · PDF</p>
              <h1 className="text-ink !text-[clamp(2.3rem,4.6vw,4rem)]">Ficha clínica estética: modelo gratis, facial y corporal.</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-xl">
                Una ficha completa para imprimir: anamnesis, fototipo, medidas corporales, consentimiento
                informado y evolución por sesión. Abajo te explicamos qué debe tener cada parte.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a href="/recursos/ficha-clinica-estetica.pdf" download
                  className="inline-flex justify-center items-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
                  Descargar la ficha en PDF
                </a>
                <Link href="/clinicas" className="inline-flex justify-center items-center border border-ink/15 text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
                  Llevarla digital
                </Link>
              </div>
              <p className="text-sm text-text-muted mt-4">Gratis, sin registro. Dos páginas en tamaño A4.</p>
            </div>
            <a href="/recursos/ficha-clinica-estetica/plantilla" className="block rounded-[28px] bg-mist p-4 sm:p-6 hover:shadow-card-hover transition-shadow" aria-label="Ver la plantilla de la ficha">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/recursos/ficha-clinica-estetica-vista.png" alt="Primera página de la ficha clínica estética para imprimir" width={794} height={1123} className="w-full h-auto rounded-lg border border-border-subtle shadow-card-hover bg-white" />
            </a>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Qué debe incluir</p>
              <h2 className="text-ink">Las 7 partes de una ficha clínica estética.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                La ficha es la historia de cada paciente en tu centro: qué tiene, qué le hiciste y cómo respondió.
                Bien llevada, te protege a ti y le da seguridad a ella.
              </p>
            </div>
            <ol className="grid md:grid-cols-2 gap-4">
              {SECCIONES.map((s, i) => (
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
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="eyebrow mb-4">Lo que dice la normativa</p>
            <h2 className="text-ink">Ficha clínica y datos de salud en Chile.</h2>
            <div className="mt-6 space-y-4 text-text-secondary text-lg leading-relaxed">
              {FICHA_LEY.parrafos.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <p className="text-sm text-text-muted mt-6">
              Esto es información general, no asesoría legal. Fuentes revisadas el {FICHA_LEY.fecha}:{" "}
              {FICHA_LEY.fuentes.map((f, i) => (
                <span key={f.url}>{i > 0 && " · "}<a href={f.url} target="_blank" rel="noopener nofollow" className="underline underline-offset-2 hover:text-ink">{f.texto}</a></span>
              ))}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-ink text-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="eyebrow !text-lime mb-4">Del papel a la pantalla</p>
              <h2 className="text-white">La misma ficha, digital y siempre a mano.</h2>
              <p className="text-white/75 text-lg mt-5 leading-relaxed">
                En SynapTech cada paciente tiene su ficha con las alergias destacadas, las notas del equipo y la
                evolución de cada sesión, y la puedes imprimir en PDF. El consentimiento se acepta al reservar y se
                puede firmar en pantalla en el centro.
              </p>
              <Link href="/clinicas" className="inline-flex mt-7 bg-lime text-ink font-semibold px-6 py-3.5 rounded-full hover:bg-white transition-colors">
                Ver el software para clínicas estéticas
              </Link>
            </div>
            <div className="rounded-[24px] bg-white p-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/panel/clinica-ficha-paciente.webp" alt="Ficha clínica de una paciente en SynapTech con alergias, notas, consentimiento y evolución" width={2880} height={1800} loading="lazy" className="w-full h-auto rounded-xl" />
            </div>
          </div>
        </section>

        <FaqSeo titulo="Ficha clínica estética: preguntas frecuentes." preguntas={FICHA_FAQ} />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

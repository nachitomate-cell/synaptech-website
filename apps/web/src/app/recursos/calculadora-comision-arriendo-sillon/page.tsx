import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import FaqSeo   from "@/components/FaqSeo";
import CalculadoraSillon from "@/components/CalculadoraSillon";
import { metaPagina } from "@/lib/seo";
import { SILLON_PASOS, SILLON_FAQ, FUENTES_SILLON, FECHA_RECURSOS } from "@/content/recursos";

/* Recurso gratis "Comisión o arriendo de sillón" (30-10-2026). Keywords:
   "arriendo de sillón barbería", "cuánto cobrar arriendo de sillón", "comisión
   barbero", "comisión o arriendo". Distinta de /funciones/comisiones (cuánto
   pagarle a cada uno en el período): esta compara los dos modelos con IVA y la
   retención del 15,25 % de 2026, verificada en el SII (content/recursos.ts). */
const PATH = "/recursos/calculadora-comision-arriendo-sillon";
const TITULO = "Calculadora: comisión o arriendo de sillón en barberías";

export const metadata = metaPagina({
  title: TITULO,
  description: "Calcula gratis qué les deja a ti y a tu barbero la comisión o el arriendo de sillón, con el IVA y la retención del 15,25 % de 2026. Con tus números.",
  path: PATH,
});

export default function CalculadoraComisionArriendo() {
  const url = `https://www.synaptechspa.cl${PATH}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "SynapTech", item: "https://www.synaptechspa.cl" },
        { "@type": "ListItem", position: 2, name: "Barberías", item: "https://www.synaptechspa.cl/barberias" },
        { "@type": "ListItem", position: 3, name: "Comisión o arriendo de sillón", item: url },
      ] },
      {
        "@type": "Article",
        headline: TITULO,
        datePublished: "2026-10-30",
        dateModified: "2026-10-30",
        author: { "@type": "Organization", name: "SynapTech" },
        publisher: { "@type": "Organization", name: "Synaptech SpA", logo: { "@type": "ImageObject", url: "https://www.synaptechspa.cl/assets/synaptech-icon.png" } },
        mainEntityOfPage: url,
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
            <div className="max-w-3xl">
              <nav aria-label="Ruta" className="text-sm text-text-muted mb-6">Recursos <span aria-hidden>›</span> Comisión o arriendo de sillón</nav>
              <p className="eyebrow mb-5">Calculadora gratis · 2026</p>
              <h1 className="text-ink !text-[clamp(2.2rem,4.4vw,3.8rem)]">Comisión o arriendo de sillón: haz la cuenta con tus números.</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-2xl">
                Cuánto le queda al barbero y cuánto al local en cada caso, con el IVA y la retención del 15,25 % de la
                boleta de honorarios en 2026. Y el arriendo en que les conviene a los dos.
              </p>
              <p className="text-sm text-text-muted mt-4">Gratis, sin registro. Los números de ejemplo son los de nuestra guía: cámbialos por los tuyos.</p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <CalculadoraSillon />
          </div>
        </section>

        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Cómo funciona cada una</p>
              <h2 className="text-ink">La misma venta, dos formas de repartirla.</h2>
            </div>
            <ol className="grid md:grid-cols-3 gap-4">
              {SILLON_PASOS.map((s, i) => (
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
            <p className="eyebrow mb-4">Antes de decidir</p>
            <h2 className="text-ink">Lo que la calculadora no ve.</h2>
            <div className="mt-6 space-y-4 text-text-secondary text-lg leading-relaxed">
              <p>
                La cuenta es de un mes y antes de los gastos del local: luz, insumos, productos, la máquina de tarjetas. En
                arriendo el barbero suele poner sus propios insumos, y eso también cuenta.
              </p>
              <p>
                Lo que define si es arriendo, honorarios o contrato es cómo se trabaja, no el nombre del acuerdo. Si el barbero
                cumple el horario que fija el local y sigue sus instrucciones, eso se parece más a un contrato de trabajo, con
                sueldo base y cotizaciones. Revísalo con tu contador.
              </p>
              <p>
                Si el barbero tiene contrato, la cuenta es otra: sueldo base de al menos el ingreso mínimo si cumple jornada,
                comisiones encima y cotizaciones. Las tres formas, con un ejemplo en pesos, están en la{" "}
                <Link href="/guias/boleta-honorarios-y-comisiones-barberos" className="text-ink font-semibold underline underline-offset-2">guía de boleta de honorarios, comisiones y arriendo de sillón</Link>.
              </p>
              <p>
                ¿Ya sabes cómo le pagas a cada uno y solo quieres la liquidación del mes, con propinas y adelantos? Usa la{" "}
                <Link href="/funciones/comisiones" className="text-ink font-semibold underline underline-offset-2">calculadora de comisiones por período</Link>.
                Y si quieres ver cuánto se te va en horas vacías, prueba la{" "}
                <Link href="/recursos/calculadora-inasistencias" className="text-ink font-semibold underline underline-offset-2">calculadora de inasistencias</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-ink text-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="eyebrow !text-lime mb-4">Sin planillas</p>
              <h2 className="text-white">Comisión o arriendo, cada barbero con lo suyo.</h2>
              <p className="text-white/75 text-lg mt-5 leading-relaxed">
                En SynapTech cada barbero tiene su porcentaje o su arriendo, y su liquidación sale sola con propinas y
                adelantos. Con el adicional de facturación, su boleta de honorarios se emite al cerrar la cita, con folio
                real del SII. Sirve igual para salones y peluquerías que arriendan sillón.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-7">
                <Link href="/barberias" className="inline-flex justify-center bg-lime text-ink font-semibold px-6 py-3.5 rounded-full hover:bg-white transition-colors">
                  Ver el software para barberías
                </Link>
                <Link href="/peluquerias" className="inline-flex justify-center border border-white/25 text-white font-semibold px-6 py-3.5 rounded-full hover:border-white transition-colors">
                  Para peluquerías
                </Link>
              </div>
            </div>
            <div className="rounded-[24px] bg-white p-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/panel/comisiones.webp" alt="Liquidación de comisiones por profesional en SynapTech" width={2880} height={1800} loading="lazy" className="w-full h-auto rounded-xl" />
            </div>
          </div>
        </section>

        <FaqSeo titulo="Comisión o arriendo de sillón: preguntas frecuentes." preguntas={SILLON_FAQ} />

        <section className="pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-sm text-text-muted">
            <p className="font-semibold text-text-secondary">Fuentes oficiales, revisadas el {FECHA_RECURSOS}</p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              {FUENTES_SILLON.map((f) => <li key={f.url}><a href={f.url} target="_blank" rel="noopener nofollow" className="underline underline-offset-2 hover:text-ink">{f.texto}</a></li>)}
            </ul>
            <p className="mt-3">Esta calculadora es información general y no reemplaza la asesoría de tu contador.</p>
          </div>
        </section>

        <CtaFinal origen="recurso-sillon" />
      </main>
      <Footer />
    </>
  );
}

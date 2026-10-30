import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import FaqSeo   from "@/components/FaqSeo";
import CalculadoraInasistencias from "@/components/CalculadoraInasistencias";
import { metaPagina } from "@/lib/seo";
import { INASISTENCIA_IDEAS, INASISTENCIA_FAQ } from "@/content/recursos";

/* Recurso gratis "Cuánto te cuestan las inasistencias" (30-10-2026). Keywords:
   "clientes que no llegan barbería", "inasistencias", "no show barbería",
   "cuánto pierdo por clientes que no llegan". No afirma ninguna tasa de
   inasistencia del mercado: los números los pone el dueño, y las ideas para
   bajarlas son práctica de gestión, no estadísticas. */
const PATH = "/recursos/calculadora-inasistencias";
const TITULO = "Calculadora de inasistencias: cuánto pierde tu barbería";

export const metadata = metaPagina({
  title: TITULO,
  description: "Calcula gratis cuánta plata pierdes al año por clientes que no llegan, y cuánto es del local y cuánto del barbero. Con 6 ideas para bajarlas.",
  path: PATH,
});

export default function CalculadoraInasistenciasPage() {
  const url = `https://www.synaptechspa.cl${PATH}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "SynapTech", item: "https://www.synaptechspa.cl" },
        { "@type": "ListItem", position: 2, name: "Barberías", item: "https://www.synaptechspa.cl/barberias" },
        { "@type": "ListItem", position: 3, name: "Calculadora de inasistencias", item: url },
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
              <nav aria-label="Ruta" className="text-sm text-text-muted mb-6">Recursos <span aria-hidden>›</span> Calculadora de inasistencias</nav>
              <p className="eyebrow mb-5">Calculadora gratis</p>
              <h1 className="text-ink !text-[clamp(2.2rem,4.4vw,3.8rem)]">¿Cuánto te cuestan los clientes que no llegan?</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-2xl">
                Cada hora reservada que queda vacía es un servicio que no se cobra. Pon tus números y mira cuánto es a la
                semana, al mes y al año, y cuánto pierde el local y cuánto el barbero.
              </p>
              <p className="text-sm text-text-muted mt-4">Gratis, sin registro. Sirve para barberías, peluquerías y cualquier local que trabaja con hora.</p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <CalculadoraInasistencias />
            <p className="text-sm text-text-muted mt-4 max-w-3xl">
              La cuenta: citas que no llegan a la semana, menos las que alcanzas a llenar, por el precio promedio y por las
              semanas que trabajas. Un mes son 52/12 semanas.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Qué hacer</p>
              <h2 className="text-ink">6 ideas para bajar las inasistencias.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                No hay una sola que lo resuelva. Lo que funciona es que olvidarse sea difícil, avisar sea fácil y faltar
                tenga un costo para el que falla seguido.
              </p>
            </div>
            <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {INASISTENCIA_IDEAS.map((s, i) => (
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
            <p className="eyebrow mb-4">Quién la paga</p>
            <h2 className="text-ink">La hora vacía la pierden los dos.</h2>
            <div className="mt-6 space-y-4 text-text-secondary text-lg leading-relaxed">
              <p>
                Si tu barbero trabaja a comisión, de cada cliente que no llega pierde su porcentaje, y el local el resto. Si
                arrienda sillón, la pierde entera él: el arriendo se paga igual. Por eso bajar las inasistencias le sirve a todo
                el equipo, no solo al dueño.
              </p>
              <p>
                ¿Estás decidiendo cómo pagarle a tu equipo? Compara con tus números en la{" "}
                <Link href="/recursos/calculadora-comision-arriendo-sillon" className="text-ink font-semibold underline underline-offset-2">calculadora de comisión o arriendo de sillón</Link>,
                y revisa qué documento emite cada uno en la{" "}
                <Link href="/guias/boleta-honorarios-y-comisiones-barberos" className="text-ink font-semibold underline underline-offset-2">guía de boleta de honorarios y comisiones</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-ink text-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
            <div>
              <p className="eyebrow !text-lime mb-4">Menos sillones vacíos</p>
              <h2 className="text-white">Recordatorios, abono y cancelación, sin hacerlo a mano.</h2>
              <p className="text-white/75 text-lg mt-5 leading-relaxed">
                En SynapTech cada reserva recibe su confirmación y un recordatorio automático antes de la hora, y el cliente
                puede guardar la cita en su calendario. Para los servicios largos o caros, puedes pedir un abono con Mercado
                Pago al reservar.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-[15px]">
                <Link href="/funciones/recordatorios-whatsapp" className="font-semibold text-white border-b-2 border-lime pb-0.5 hover:border-white">Recordatorios de citas →</Link>
                <Link href="/funciones/abono-al-reservar" className="font-semibold text-white border-b-2 border-lime pb-0.5 hover:border-white">Abono al reservar →</Link>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link href="/barberias" className="inline-flex justify-center bg-lime text-ink font-semibold px-6 py-3.5 rounded-full hover:bg-white transition-colors">
                  Ver el software para barberías
                </Link>
                <Link href="/peluquerias" className="inline-flex justify-center border border-white/25 text-white font-semibold px-6 py-3.5 rounded-full hover:border-white transition-colors">
                  Para peluquerías
                </Link>
              </div>
            </div>
            <div className="max-w-[300px] w-full mx-auto rounded-[32px] bg-white p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/panel/reserva-3-confirmar.webp" alt="Confirmación de la reserva en el celular del cliente" width={780} height={1688} loading="lazy" className="w-full h-auto rounded-[26px]" />
            </div>
          </div>
        </section>

        <FaqSeo titulo="Inasistencias: preguntas frecuentes." preguntas={INASISTENCIA_FAQ} />
        <CtaFinal origen="recurso-inasistencias" />
      </main>
      <Footer />
    </>
  );
}

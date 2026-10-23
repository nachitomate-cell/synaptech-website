import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import FaqSeo   from "@/components/FaqSeo";
import { metaPagina } from "@/lib/seo";

/* Beneficio de fibra Entel para locales SynapTech (23-10-2026, alianza con
   Sergio Ledezma, ejecutivo Entel y dueño de Salón Amanda). La gift card la
   pone Sergio (la compra en Apprecio): SynapTech solo pone el canal. Por eso
   todo termina en SU WhatsApp y la página insiste en contratar con él, no por
   la web de Entel (si no, la venta no queda a su nombre y no hay gift card).
   Va con noindex: es para los locales que llegan desde el panel o el afiche,
   no una página para posicionar con la marca de otro. Sin logo de Entel. */
export const metadata = metaPagina({
  title: "Beneficio para locales SynapTech: fibra Entel + gift card de $20.000",
  description: "Si tu local usa SynapTech, contrata la fibra óptica de Entel con Sergio Ledezma y recibe una gift card de $20.000 para usar en miles de comercios.",
  path: "/beneficios/fibra",
  noindex: true,
});

const WA_SERGIO = "56942788726";
const waSergio = `https://wa.me/${WA_SERGIO}?text=${encodeURIComponent(
  "Hola Sergio, vengo por el beneficio de fibra Entel para locales SynapTech. Mi local es ")}`;

const PASOS = [
  { n: "1", t: "Escríbele a Sergio", d: "Cuéntale cómo se llama tu local y su dirección. Él revisa si hay fibra Entel disponible ahí." },
  { n: "2", t: "Contrata con él", d: "Eliges el plan con Sergio y él gestiona la contratación. Tiene que ser con él, no por la página de Entel." },
  { n: "3", t: "Recibe tu gift card", d: "Sergio te entrega una gift card de $20.000 que puedes usar en miles de comercios." },
];

const FAQ = [
  { q: "¿Quién puede usar el beneficio?", a: "Los locales que tienen su agenda con SynapTech, los que ya la usan y los que se sumen." },
  { q: "¿Por qué tengo que contratar con Sergio?", a: "Porque el beneficio lo entrega él. Si contratas por la página de Entel o en una tienda, la venta no queda a su nombre y no puede darte la gift card." },
  { q: "¿Dónde puedo usar la gift card?", a: "Es una gift card de Apprecio, que se puede canjear en miles de comercios." },
  { q: "¿Qué pasa si no hay fibra en la dirección de mi local?", a: "Sergio lo revisa antes de contratar y te dice si hay cobertura." },
  { q: "¿SynapTech vende internet?", a: "No. SynapTech es la agenda de tu local. La fibra la contratas con Entel a través de Sergio, y la instalación y el servicio son de Entel." },
];

export default function BeneficioFibra() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-12">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">Beneficio para locales SynapTech</p>
            <h1 className="text-ink max-w-4xl">Fibra Entel para tu local, con una gift card de $20.000 de regalo.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-2xl">
              Si tu local usa SynapTech, contrata la fibra óptica de Entel con Sergio Ledezma, ejecutivo Entel,
              y recibe una gift card de $20.000 para usar en miles de comercios.
            </p>
            <a href={waSergio} target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex justify-center items-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
              Escribirle a Sergio por WhatsApp
            </a>
            <p className="text-text-muted text-sm mt-3">+56 9 4278 8726</p>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <ol className="grid sm:grid-cols-3 gap-4 list-none p-0 m-0">
              {PASOS.map((p) => (
                <li key={p.n} className="rounded-[24px] bg-mist p-6 sm:p-7">
                  <span className="w-10 h-10 rounded-full bg-lime text-ink font-display font-bold flex items-center justify-center">{p.n}</span>
                  <h2 className="!text-xl text-ink mt-5">{p.t}</h2>
                  <p className="text-text-secondary mt-2 leading-relaxed">{p.d}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 rounded-[24px] border border-border-subtle p-6 sm:p-7 max-w-3xl">
              <p className="font-semibold text-ink">Condiciones</p>
              <p className="text-text-secondary text-sm leading-relaxed mt-2">
                Válido para locales con agenda SynapTech activa que contraten fibra Entel con Sergio Ledezma.
                La gift card la entrega Sergio. SynapTech no vende ni instala servicios de internet: la contratación,
                la instalación y el servicio son de Entel. Entel es una marca registrada de su titular.
              </p>
            </div>
          </div>
        </section>

        <FaqSeo titulo="Beneficio fibra Entel: preguntas frecuentes." preguntas={FAQ} />
      </main>
      <Footer />
    </>
  );
}

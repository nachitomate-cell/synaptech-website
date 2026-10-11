import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import FaqSeo   from "@/components/FaqSeo";
import { waLink } from "@/content/catalogo";
import { EMBAJADORES, LINK_EMBAJADOR } from "@/content/embajadores";
import { metaPagina } from "@/lib/seo";

/* Programa de embajadores (11-10-2026). Reglas y advertencias en
   content/embajadores.ts: la lista de embajadores solo lleva locales que
   aceptaron aparecer. */
export const metadata = metaPagina({
  title: "Programa de embajadores: recomienda y gana meses gratis",
  description: "¿Tu local usa SynapTech? Recomiéndalo con tu código: el local que llega parte con su primer mes gratis y tú sumas un mes gratis cuando paga.",
  path: "/embajadores",
});

const PASOS = [
  { n: "1", t: "Pide tu código", d: "Es el nombre corto de tu local, por ejemplo EL10. Te lo damos por WhatsApp junto con tu link." },
  { n: "2", t: "Compártelo", d: "Manda tu link a otros dueños, o diles que escriban tu código al registrarse en SynapTech." },
  { n: "3", t: "Ellos parten con un mes gratis", d: "El local que llega con tu código tiene su primer mes sin costo." },
  { n: "4", t: "Tú sumas un mes gratis", d: "Cuando ese local paga su primera mensualidad, tu próximo mes es gratis. Sin tope: un mes por cada local." },
];

const FAQ = [
  { q: "¿Quién puede ser embajador?", a: "Cualquier local que use SynapTech y esté al día. Si eres barbero o estilista con comunidad y todavía no usas la plataforma, escríbenos igual." },
  { q: "¿Cuándo se suma mi mes gratis?", a: "Cuando el local que llegó con tu código paga su primera mensualidad. Ese mes se descuenta de tu próximo cobro." },
  { q: "¿Hay un máximo de recomendaciones?", a: "No. Cada local que llega con tu código y paga su primera mensualidad suma un mes gratis para ti." },
  { q: "¿Qué tiene que hacer el local que recomiendo?", a: "Registrarse en empieza.synaptechspa.cl con tu link, o escribir tu código en el campo \"Código de embajador\". Si ya está registrado, que nos escriba por WhatsApp diciendo que viene de tu parte." },
  { q: "¿Sirve para un local que ya usa SynapTech?", a: "No: el código es para locales nuevos." },
];

export default function Embajadores() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-12">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">Programa de embajadores</p>
            <h1 className="text-ink max-w-4xl">Recomienda SynapTech y gana meses gratis.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-2xl">
              Muchos de los locales que usan SynapTech llegaron porque otro dueño se los recomendó.
              Si tu local ya la usa, cada local que llega de tu parte te regala un mes.
            </p>
            <a href={waLink("Hola, quiero ser embajador de SynapTech. ¿Me pasas mi código?")} target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex justify-center items-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
              Quiero mi código
            </a>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0">
              {PASOS.map((p) => (
                <li key={p.n} className="rounded-[24px] bg-mist p-6 sm:p-7">
                  <span className="w-10 h-10 rounded-full bg-lime text-ink font-display font-bold flex items-center justify-center">{p.n}</span>
                  <h2 className="!text-xl text-ink mt-5">{p.t}</h2>
                  <p className="text-text-secondary mt-2 leading-relaxed">{p.d}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 rounded-[24px] border border-border-subtle p-6 sm:p-7 max-w-3xl">
              <p className="font-semibold text-ink">Así se ve un link de embajador</p>
              <p className="font-mono text-[15px] text-accent mt-2 break-all">{LINK_EMBAJADOR("EL10")}</p>
              <p className="text-text-muted text-sm mt-2">Quien entra por ese link ve tu código ya puesto en el registro.</p>
            </div>
          </div>
        </section>

        {EMBAJADORES.length > 0 && (
          <section className="py-16 md:py-20 bg-mist">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <h2 className="text-ink mb-8">Locales que recomiendan SynapTech.</h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 list-none p-0 m-0">
                {EMBAJADORES.map((e) => (
                  <li key={e.codigo} className="rounded-[20px] bg-white p-5">
                    <p className="font-semibold text-ink">{e.local}</p>
                    <p className="text-text-muted text-sm">{e.ciudad}</p>
                    {e.instagram && <a href={`https://instagram.com/${e.instagram}`} target="_blank" rel="noopener noreferrer" className="text-sm text-accent font-semibold">@{e.instagram}</a>}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <FaqSeo titulo="Programa de embajadores: preguntas frecuentes." preguntas={FAQ} />
      </main>
      <Footer />
    </>
  );
}

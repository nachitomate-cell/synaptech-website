import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import { waLink } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  title: "Nosotros: SynapTech, software chileno para locales",
  description: "SynapTech nació en abril de 2026 como la página de reservas de una barbería. Hoy la usan más de 35 locales y sedes en Chile. Synaptech SpA, Viña del Mar.",
  path: "/nosotros",
});

/* Reescrita dos veces el 09-10-2026. La primera sacó la historia de agencia
   ("5 proyectos en producción", "Diagnóstico gratis", "cuatro industrias"); la
   segunda, a pedido de Ignacio, la dejó en lo que pasó de verdad: sin la
   anécdota del padre ni la pregunta sobre "herramientas que no fueron hechas
   para ellos" (eso es discurso de software a medida). Cada fecha sale del
   historial del repo de la plataforma o de la memoria del proyecto:
     08-04 primer commit (reservas de una barbería) · 13-04 club de sellos ·
     15-04 constitución de la SpA · 21-04 / 08-05 varios locales en la misma
     plataforma · 16-07 asistente IA en el WhatsApp del local · 15-08 App Store
     · 01-09 Google Play · 05-09 primeras BHE con folio real (El 10) · 07-10
     partner certificado de Mercado Pago.
   "+1.300 cambios": 1.320 PRs mergeados en la plataforma al 09-10-2026.
   "31 %": reservas online antes de las 10, después de las 20 o en domingo,
   auditoría del 04-10-2026 (la misma cifra de la postulación al Banco de Chile). */

const NUMEROS = [
  { v: "+35", l: "locales y sedes en Chile" },
  { v: "+36.000", l: "clientes en sus fichas" },
  { v: "+18.000", l: "citas y reservas agendadas" },
  { v: "+1.300", l: "cambios publicados desde abril" },
];

const PRINCIPIOS = [
  { t: "Un solo producto", d: "Todos los locales usan la misma plataforma, por suscripción. Cuando sale una mejora, le llega a todos." },
  { t: "Lo piden los locales", d: "Casi todo lo que hace hoy SynapTech lo pidió alguien que la usa todos los días, y lo que se puede hacer en días, sale en días." },
  { t: "Hablas con quien la hace", d: "El soporte es por WhatsApp, directo con quien construye la plataforma. Sin formularios ni tickets." },
  { t: "Tus datos son tuyos", d: "Sin permanencia: si te vas, te entregamos tu información exportada." },
];

const HITOS = [
  { f: "8 de abril de 2026", t: "Primera versión: la página de reservas de una barbería." },
  { f: "13 de abril", t: "Le sumamos un club de sellos para que los clientes volvieran." },
  { f: "15 de abril", t: "Se constituye Synaptech SpA." },
  { f: "Mayo", t: "La misma plataforma empieza a atender a varios locales, cada uno con su marca y su página de reservas." },
  { f: "16 de julio", t: "El asistente con IA empieza a responder y agendar en el WhatsApp de los propios locales." },
  { f: "15 de agosto", t: "SynapTech Studio, la app para el equipo, llega a la App Store. El 1 de septiembre, a Google Play." },
  { f: "5 de septiembre", t: "Salen las primeras boletas de honorarios con folio real del SII, emitidas solas al cerrar la cita." },
  { f: "7 de octubre", t: "Partner certificado de Mercado Pago. Ya son más de 35 locales y sedes." },
];

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">Nosotros</p>
            <h1 className="text-ink max-w-5xl">Empezó con la agenda de una barbería. Hoy la usan más de 35 locales.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
              SynapTech es una empresa chilena, de Viña del Mar. Hacemos una sola
              plataforma —agenda, cobros, asistente con IA y club de fidelización— y la
              arrendamos por mes a barberías, salones, centros de estética y clínicas.
            </p>
          </div>
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 border-y border-border-subtle">
              {NUMEROS.map((n, i) => (
                <div key={n.l} className={`py-7 px-4 text-center ${i % 2 ? "border-l border-border-subtle" : ""} ${i === 2 ? "md:border-l" : ""} ${i > 1 ? "border-t md:border-t-0 border-border-subtle" : ""}`}>
                  <p className="font-display font-bold text-ink text-3xl sm:text-4xl tracking-tight">{n.v}</p>
                  <p className="text-sm text-text-muted mt-1">{n.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16">
            <div>
              <p className="eyebrow mb-4">Cómo empezó</p>
              <h2 className="text-ink">Ignacio Mateluna</h2>
              <p className="text-text-muted mt-2">Fundador. Programa la plataforma, la vende y atiende a los locales.</p>
            </div>
            <div className="space-y-5 text-text-secondary text-lg leading-relaxed">
              <p>
                Estudió Enfermería en la UNAB y trabajó como enfermero. En abril de 2026
                hizo la página de reservas de una barbería; a los pocos días le sumó un club
                de sellos, y en mayo la misma plataforma ya atendía a varios locales, cada
                uno con su marca.
              </p>
              <p>
                En esos locales se repetía lo mismo: quien corta el pelo es también quien
                contesta el WhatsApp, entre una atención y otra, de noche y los domingos.
                Por eso en julio sumamos el asistente con IA, que responde y agenda en el
                WhatsApp del propio local.
              </p>
              <p className="border-l-4 border-lime pl-5 text-ink font-semibold text-xl">
                El 31 % de las reservas online en SynapTech se hacen antes de las 10, después
                de las 20 o en domingo, cuando nadie en el local puede contestar.
              </p>
              <p>
                SynapTech no tiene inversionistas: crece con lo que pagan los locales. Hoy
                Ignacio está dedicado por completo a la empresa, y casi todo lo que hace la
                plataforma lo pidió alguien que la usa todos los días.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Cómo trabajamos</p>
              <h2 className="text-ink">Lo que puedes esperar de nosotros.</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PRINCIPIOS.map((p) => (
                <article key={p.t} className="rounded-[28px] bg-mist p-7">
                  <h3 className="font-display font-bold text-ink text-xl tracking-tight">{p.t}</h3>
                  <p className="text-text-secondary mt-3 leading-relaxed">{p.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-ink text-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
            <div>
              <p className="eyebrow !text-lime mb-4">Hitos</p>
              <h2 className="text-white">De una barbería a más de 35 locales.</h2>
            </div>
            <ol className="relative border-l border-white/15 ml-2">
              {HITOS.map((h) => (
                <li key={h.f} className="pl-8 pb-10 last:pb-0 relative">
                  <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-lime ring-4 ring-ink" aria-hidden />
                  <p className="text-lime font-semibold">{h.f}</p>
                  <p className="text-white/85 text-lg mt-1 leading-relaxed">{h.t}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-[28px] border border-border-subtle p-7 sm:p-10">
              <p className="eyebrow mb-4">Datos de la empresa</p>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-[15px]">
                <dt className="text-text-muted">Razón social</dt><dd className="text-ink font-semibold">Synaptech SpA</dd>
                <dt className="text-text-muted">RUT</dt><dd className="text-ink font-semibold">78.402.009-6</dd>
                <dt className="text-text-muted">Constituida</dt><dd className="text-ink font-semibold">15 de abril de 2026</dd>
                <dt className="text-text-muted">Región</dt><dd className="text-ink font-semibold">Valparaíso, Chile</dd>
                <dt className="text-text-muted">Correo</dt><dd><a href="mailto:hola@synaptechspa.cl" className="text-ink font-semibold hover:text-accent">hola@synaptechspa.cl</a></dd>
                <dt className="text-text-muted">Instagram</dt><dd><a href="https://instagram.com/synaptechspa" target="_blank" rel="noopener noreferrer" className="text-ink font-semibold hover:text-accent">@synaptechspa</a></dd>
              </dl>
            </div>
            <div className="rounded-[28px] bg-lime/20 p-7 sm:p-10 flex flex-col justify-between gap-6">
              <div>
                <p className="eyebrow mb-4">Conversemos</p>
                <p className="font-display font-bold text-ink text-2xl sm:text-3xl tracking-tight">¿Quieres ver la plataforma con los datos de tu local?</p>
              </div>
              <a href={waLink("Hola, quiero ver SynapTech con los datos de mi local")} target="_blank" rel="noopener noreferrer"
                className="self-start inline-flex items-center bg-ink text-white font-semibold px-6 py-3.5 rounded-full hover:bg-black transition-colors">
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

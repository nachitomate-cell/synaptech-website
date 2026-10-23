import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import FaqSeo   from "@/components/FaqSeo";
import { waLink } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";

/* Integración con Wellhub (23-10-2026, pedido de Ignacio: "habla de la
   integración con Wellhub y encárgate de que aparezca en Google al buscar
   eso"). Indexable, en el sitemap y enlazada desde el inicio (tira de la
   portada, repisa de la plataforma, integraciones), /pilates, el menú y el
   footer.

   Solo lo que la plataforma hace HOY (origin/main de Barberia-Elegance):
   - Integración firmada con Wellhub el 14-10-2026; en producción con un
     estudio de pilates de 7 sedes (check-ins reales desde Ciudad Empresarial).
   - wellhubWebhook + wellhubProcesarEvento: el check-in llega, se anota en la
     reserva y se llama a /access/v1/validate, que es lo que genera el pago al
     local (antes se validaba a mano en el portal). Un gimnasio de Wellhub =
     una sede (wellhub_gyms/{gymId}).
   - Cupos de Wellhub por clase aparte de los directos (cuposWellhub), link de
     reserva por canal (?canal=wellhub), reglamento del convenio aceptado la
     1ª vez, plazo de cancelación propio del convenio.
   - Check-in a la vista por clase, alumna y cita (#1481); faltas sin check-in:
     2 = no reserva por Wellhub hasta que el estudio la desbloquea desde su
     ficha (#1575).
   - El asistente manda el link de convenio a quien dice Wellhub (#1083) y
     acusa el pantallazo del check-in (#1474).
   No se publica precio de la integración: se cotiza por sedes. Logo oficial
   (header de wellhub.com) solo como marca de la integración. */
export const metadata = metaPagina({
  title: "Integración con Wellhub (Gympass) para estudios | SynapTech",
  description: "Conecta Wellhub con la agenda de tu estudio: el check-in de tus alumnas llega solo a su reserva y la visita se valida sola. Para pilates, yoga y gimnasios.",
  path: "/wellhub",
});

const conectar = waLink("Hola, tengo un estudio con Wellhub y quiero conectarlo con SynapTech");

const PASOS = [
  { n: "01", t: "Reserva con su convenio", d: "La alumna elige su clase con el link de Wellhub de tu estudio. Cada clase tiene sus cupos de Wellhub, aparte de los de tus planes." },
  { n: "02", t: "Hace check-in", d: "Llega a la clase y hace check-in en la app de Wellhub, como siempre." },
  { n: "03", t: "Se valida sola", d: "SynapTech recibe el check-in, lo anota en su reserva y valida la visita en Wellhub, que es lo que cuenta para tu pago. Sin entrar al portal." },
];

const FUNCIONES = [
  { t: "Cupos de Wellhub por clase", d: "Decides cuántas camas o lugares de cada clase son para Wellhub, sin quitarle espacio a tus alumnas con plan." },
  { t: "Un link para el convenio", d: "Las alumnas de Wellhub reservan por su propio link, por sede, y la reserva queda marcada como Wellhub." },
  { t: "Reglamento del convenio", d: "La alumna acepta tus reglas la primera vez que reserva por Wellhub, con su propio plazo para cancelar." },
  { t: "Check-in a la vista", d: "En cada clase ves quién ya hizo check-in y a quién le falta, por alumna y en el detalle de su reserva." },
  { t: "Faltas y bloqueo", d: "Si una alumna no hace check-in en dos clases, no puede volver a reservar por Wellhub hasta que la desbloquees desde su ficha." },
  { t: "Varias sedes", d: "Cada gimnasio que tienes en Wellhub queda conectado a su sede, con sus clases y sus cupos." },
  { t: "Asistente con IA", d: "Si una alumna escribe por WhatsApp que viene por Wellhub, el asistente le manda el link del convenio y le confirma el pantallazo del check-in." },
  { t: "Todo en tu panel", d: "Alumnas de plan, de Wellhub y clases de prueba en la misma agenda, cada reserva con su color." },
];

const FAQ = [
  { q: "¿Qué es la integración de SynapTech con Wellhub?", a: "Es la conexión entre la agenda de tu estudio y Wellhub: las alumnas de Wellhub reservan con sus propios cupos, su check-in llega solo a la reserva y SynapTech valida la visita en Wellhub sin que tengas que entrar al portal." },
  { q: "¿Wellhub es lo mismo que Gympass?", a: "Sí. Gympass cambió su nombre a Wellhub en 2024. La integración funciona con tu cuenta de Wellhub actual." },
  { q: "¿La validación de las visitas es automática?", a: "Sí. Cuando la alumna hace check-in en la app de Wellhub, SynapTech lo recibe, lo anota en su reserva y valida la visita en Wellhub." },
  { q: "¿Cómo se activa?", a: "Nos pasas los ID de tus gimnasios en Wellhub y le pides a Wellhub que active la integración con SynapTech. Nosotros dejamos cada gimnasio conectado a su sede." },
  { q: "¿Sirve para un estudio con varias sedes?", a: "Sí. Cada gimnasio de Wellhub queda conectado a su sede, con sus clases y sus cupos. Hoy la usa un estudio de pilates con 7 sedes en Chile." },
  { q: "¿Puedo tener alumnas con plan y de Wellhub en la misma clase?", a: "Sí. Cada clase tiene cupos de Wellhub aparte de los de tus planes, y en la agenda cada reserva se ve con su color." },
  { q: "¿Qué pasa si una alumna no hace check-in?", a: "Su reserva queda marcada sin check-in. Con dos faltas, no puede reservar de nuevo por Wellhub hasta que el estudio la desbloquea desde su ficha." },
  { q: "¿Para qué tipo de negocio sirve?", a: "Para estudios de pilates, yoga, entrenamiento funcional y gimnasios con clases grupales que reciben alumnas de Wellhub." },
];

export default function Wellhub() {
  return (
    <>
      <Header />
      <main>
        {/* ── Portada ── */}
        <section className="relative overflow-hidden bg-[#05080D] text-white pt-36 md:pt-44 pb-24 md:pb-32">
          <div aria-hidden className="absolute left-1/2 top-[85%] -translate-x-1/2 w-[1000px] max-w-[160vw] aspect-[2/1] rounded-full opacity-50 blur-[110px]"
            style={{ background: "radial-gradient(closest-side, rgba(242,73,107,.45), rgba(156,204,60,.3) 60%, transparent)" }} />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-[15px] md:text-[17px] font-semibold tracking-tight text-white/70">
              SynapTech <span className="mx-2 text-white/35">+</span> Wellhub
            </p>
            <h1 className="mt-6 text-white !text-[clamp(2.4rem,5.4vw,4.8rem)]">
              Wellhub, integrado a tu agenda.
              <span className="block bg-gradient-to-r from-[#FF8BA3] via-[#F2496B] to-[#B8E36A] bg-clip-text text-transparent pb-2">
                El check-in se valida solo.
              </span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl mx-auto">
              Integración con Wellhub (antes Gympass) para estudios de pilates, yoga y gimnasios:
              cupos de convenio en cada clase, check-in automático y la visita validada sin entrar al portal.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <a href={conectar} target="_blank" rel="noopener noreferrer"
                className="inline-flex justify-center items-center bg-white text-[#05080D] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors">
                Conectar mi estudio
              </a>
              <a href="#como-funciona" className="text-[#B8E36A] font-semibold hover:underline underline-offset-4">
                Cómo funciona ›
              </a>
            </div>
          </div>
        </section>

        {/* ── Cómo funciona ── */}
        <section id="como-funciona" className="scroll-mt-20 py-24 md:py-32">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="text-center max-w-3xl mx-auto">
              <p className="eyebrow">Cómo funciona</p>
              <h2 className="text-ink mt-5">La integración con Wellhub, en tres pasos.</h2>
            </div>
            <ol className="mt-16 grid md:grid-cols-3 gap-12 md:gap-8 list-none p-0 m-0">
              {PASOS.map((p) => (
                <li key={p.n} className="border-t-[3px] border-ink/10 pt-8">
                  <span className="font-display text-sm font-semibold tracking-[0.2em] text-[#F2496B]">{p.n}</span>
                  <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink">{p.t}</h3>
                  <p className="mt-3 text-text-secondary leading-relaxed">{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Funciones ── */}
        <section className="py-24 md:py-32 bg-[#F5F5F7]">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <h2 className="font-display !text-[clamp(1.8rem,3.4vw,2.8rem)] !leading-tight text-[#1d1d1f] max-w-3xl">
              Todo lo de Wellhub. <span className="text-[#6e6e73]">Dentro de tu panel.</span>
            </h2>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FUNCIONES.map((f) => (
                <div key={f.t} className="rounded-[24px] bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,.05)]">
                  <h3 className="font-display text-xl font-bold tracking-tight text-[#1d1d1f] leading-tight">{f.t}</h3>
                  <p className="mt-3 text-[15px] text-[#6e6e73] leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── En producción ── */}
        <section className="py-24 md:py-32">
          <div className="max-w-screen-lg mx-auto px-4 sm:px-6 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/integraciones/wellhub.svg" alt="Wellhub" width={220} height={43} className="h-10 w-auto mx-auto" />
            <p className="mt-10 font-display font-bold tracking-[-0.045em] leading-none text-ink text-[clamp(4rem,12vw,8rem)]">7 sedes</p>
            <p className="mt-6 text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-snug">
              de un estudio de pilates en Chile ya validan sus visitas de Wellhub con SynapTech.
            </p>
          </div>
        </section>

        <FaqSeo titulo="Integración con Wellhub: preguntas frecuentes." preguntas={FAQ} />

        {/* ── Cierre ── */}
        <section className="relative overflow-hidden py-28 md:py-36 bg-[#05080D] text-white">
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-white">Conecta tu estudio con Wellhub.</h2>
            <p className="mt-6 text-lg text-white/65 leading-relaxed">
              Te ayudamos a activarla y dejamos cada sede con sus clases y sus cupos.
            </p>
            <div className="mt-10">
              <a href={conectar} target="_blank" rel="noopener noreferrer"
                className="inline-flex justify-center items-center bg-white text-[#05080D] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors">
                Conectar mi estudio
              </a>
            </div>
            <p className="mt-8 text-[13px] text-white/40">
              Wellhub es una marca registrada de su titular. Su logo se muestra para identificar la integración.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

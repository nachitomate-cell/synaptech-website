import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import FaqSeo, { type Pregunta } from "@/components/FaqSeo";
import SimuladorTotem from "@/components/SimuladorTotem";
import BotonRubroTotem from "@/components/BotonRubroTotem";
import VideoTotem, { VideoTotemJsonLd } from "@/components/VideoTotem";
import { RUBROS_TOTEM } from "@/content/totem";
import { altaIA, CTA_IA, waLink } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";

/* Tótem de autoservicio para la recepción (28-10-2026, pedido de Ignacio:
   "una sección específica para promocionar el sistema de autoservicio de
   recepción de clientes… espectacular, muy explicativa y que muestre cómo se
   aplica a varios rubros").

   OJO con la palabra: en el resto del sitio "autoservicio" es bioo (crear tu
   agenda solo). Acá es el tótem del mesón, por eso la ruta es /totem.

   Todo lo que se afirma está en la plataforma (origin/main, 28-10):
   - tótem: totem.html + js/totem/*; capturas en guias-panel/totem-etapa1 (PR #2094);
   - aviso al celular de quien atiende: functions/totem-checkin.js (push "<Nombre> llegó");
   - violeta = llegó (checkedInAt) e ícono del tótem en la agenda: Agenda.jsx;
   - conectar con código de 6 números o QR, una tablet por sede, sin sesión,
     desconectar si se pierde, apagar "sin cita", guía de kiosco Android/iPad:
     functions/totem-vincular.js y views/SynaAutoservicio.jsx;
   - vuelve solo al inicio a los 45 s (T.IDLE en js/totem/nucleo.js);
   - encendido en todos los locales, en beta, sin precio en ninguna parte del repo.
   Lo que viene después (sellos al llegar, WhatsApp al profesional, QR de
   Wallet, Syna conversando por voz) NO se promete hasta que exista. */
export const metadata = metaPagina({
  title: "Tótem de autoservicio para recepción de clientes | SynapTech",
  description: "Una tablet en tu mesón: tus clientes avisan que llegaron o toman la próxima hora libre solos, y a quien los atiende le llega el aviso al celular. Para barberías, salones, uñas, estética, clínicas y mascotas.",
  path: "/totem",
});

const TRES = [
  { n: "01", t: "Avisa que llegó", d: "Escribe su teléfono, ve su cita de hoy y confirma. Nadie tiene que buscarlo en la agenda." },
  { n: "02", t: "Toma la próxima hora libre", d: "El que llega sin hora elige el servicio y ve quién lo puede atender más pronto, con las horas reales de tu agenda." },
  { n: "03", t: "Le avisa a quien atiende", d: "Al confirmar la llegada, a tu profesional le llega el aviso al celular y la cita se marca en tu agenda." },
];

const CON_CITA = [
  { img: "/totem/telefono.webp", t: "Escribe su teléfono", d: "Los 9 dígitos con los que reservó." },
  { img: "/totem/tu-cita.webp", t: "Ve su cita de hoy", d: "La hora, el servicio y con quién." },
  { img: "/totem/llegada.webp", t: "Confirma que llegó", d: "Y Syna le avisa a quien lo atiende." },
];
const SIN_CITA = [
  { img: "/totem/servicios.webp", t: "Elige el servicio", d: "Con la duración y el precio de tu local." },
  { img: "/totem/con-quien.webp", t: "Elige con quién", d: "O \"el primero disponible\", con la próxima hora libre." },
  { img: "/totem/datos.webp", t: "Deja nombre y teléfono", d: "Lo justo para la reserva." },
  { img: "/totem/tomada.webp", t: "Queda en tu agenda", d: "Ya marcada como llegada, con su código." },
];

const CONTROL = [
  { t: "Sin la sesión de nadie", d: "La tablet no entra con tu usuario: no puede ver tu caja ni tu agenda completa." },
  { t: "Si se pierde, la desconectas", d: "Desde el panel ves tus tablets, cuándo se conectó cada una por última vez, y la sacas con un toque." },
  { t: "Vuelve sola al inicio", d: "Si nadie la toca en 45 segundos, vuelve a la pantalla de bienvenida para el siguiente cliente." },
  { t: "Una por sede", d: "Al conectarla eliges la sede donde va a estar, y muestra los precios de esa sede." },
  { t: "Tú decides si atiende sin cita", d: "Apagado, el tótem solo recibe llegadas y los que vienen sin hora pasan por el mesón." },
  { t: "Lo ves en tu panel", d: "Cuántos avisaron hoy que llegaron y cuántos tomaron hora en el tótem." },
];

const FAQ: Pregunta[] = [
  { q: "¿Qué necesito para tener el tótem?", a: "Una tablet Android o un iPad con internet, y un soporte para dejarla en el mesón. No hay que instalar una app de SynapTech: el tótem se abre en el navegador. Para dejarla fija, en Android te recomendamos Fully Kiosk Browser y en iPad el Acceso guiado; los pasos están en tu panel." },
  { q: "¿Cuánto cuesta?", a: "Viene encendido en todos los planes de SynapTech, sin costo aparte: solo pones la tablet. Está en beta: ya funciona, y lo vamos mejorando con lo que nos cuentan los locales." },
  { q: "¿Cómo se entera mi profesional de que llegó su cliente?", a: "Cuando el cliente confirma su llegada, a quien lo atiende le llega un aviso al celular (con la app del panel y los avisos activados) y la cita se marca en violeta en tu agenda." },
  { q: "¿Qué pasa con los clientes que llegan sin hora?", a: "Eligen el servicio, ven quién los puede atender más pronto con las horas libres reales de tu agenda y dejan su nombre y su teléfono. La cita queda en tu agenda como cualquier reserva, con un ícono que dice que se tomó en el tótem. Si prefieres que pasen por el mesón, lo apagas en el panel." },
  { q: "¿Cómo conecto la tablet?", a: "Abres el tótem en la tablet y aparece un código de 6 números con un QR. Lo escaneas con tu celular, o escribes el código en tu panel en SYNA → Autoservicio → Conectar una tablet. Listo: la tablet ya es tu tótem." },
  { q: "¿Es seguro dejar una tablet a la vista de los clientes?", a: "Sí. La tablet no queda con la sesión de nadie, así que no puede ver tu caja ni tu agenda completa. Si se pierde, la desconectas desde el panel. Además vuelve sola al inicio si nadie la toca." },
  { q: "Tengo varias sedes, ¿cómo funciona?", a: "Conectas una tablet por sede. Al conectarla eliges la sede donde va a estar, y el tótem muestra los precios de esa sede." },
  { q: "¿Sirve para mi rubro?", a: "Sirve para cualquier local que atienda con hora: barberías, peluquerías, uñas, centros de estética y spa, clínicas estéticas y peluquerías de mascotas, entre otros. Arriba puedes probarlo con el ejemplo de cada rubro." },
];

export default function TotemPage() {
  return (
    <>
      <Header />
      <VideoTotemJsonLd />
      <main>
        {/* ── portada oscura con el video ── */}
        <section className="relative overflow-hidden bg-[#05080D] text-white pt-28 md:pt-36 pb-16 md:pb-24 px-4 sm:px-6">
          <div aria-hidden className="absolute left-1/2 top-[68%] -translate-x-1/2 -translate-y-1/2 w-[1200px] max-w-[170vw] aspect-[2/1] rounded-full opacity-40 blur-[120px]"
            style={{ background: "radial-gradient(closest-side, rgba(16,185,129,.55), rgba(94,200,242,.2) 55%, transparent)" }} />
          <div className="relative max-w-6xl mx-auto text-center">
            <p className="text-[13px] sm:text-[15px] font-semibold tracking-tight text-[#6EE7B7]">Tótem de autoservicio · con Syna</p>
            <h1 className="mt-4 text-white !text-[clamp(2.5rem,6vw,5.2rem)]">
              Tu recepción, en una tablet.
              <span className="block bg-gradient-to-r from-[#6EE7B7] via-[#9CCC3C] to-[#5EC8F2] bg-clip-text text-transparent pb-2">Llegan, tocan, listo.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl mx-auto">
              Tus clientes avisan que llegaron o toman la próxima hora libre solos, y a quien los atiende
              le llega el aviso al celular. Tu mesón queda libre para cobrar y atender.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#simulador" className="inline-flex justify-center items-center bg-white text-[#05080D] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors">
                Pruébalo aquí mismo
              </a>
              <a href={waLink("Hola, quiero el tótem de autoservicio para mi local")} target="_blank" rel="noopener noreferrer"
                className="inline-flex justify-center items-center border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:border-white/50 transition-colors">
                Quiero un tótem en mi local
              </a>
            </div>
            <p className="mt-4 text-sm text-white/45">Viene en todos los planes, sin costo aparte · Solo pones la tablet</p>
            <div className="mt-12 md:mt-16"><VideoTotem /></div>
          </div>
        </section>

        {/* ── tres cosas ── */}
        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10 md:mb-14">
              <p className="eyebrow mb-4">Qué hace</p>
              <h2 className="text-ink">Tres cosas que hoy hace alguien en el mesón.</h2>
              <p className="text-text-secondary text-lg mt-4 leading-relaxed">
                Cuando el mesón está ocupado, el que llega espera parado, no sabe si lo vieron y tu profesional no sabe que llegó.
                El tótem lo resuelve en segundos, con Syna guiando cada pantalla.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {TRES.map((x) => (
                <article key={x.n} className="rounded-[28px] bg-mist p-7 sm:p-8">
                  <p className="font-display font-bold text-5xl text-lime-deep/70 tracking-tight">{x.n}</p>
                  <h3 className="font-display font-bold text-ink text-2xl tracking-tight mt-5">{x.t}</h3>
                  <p className="text-text-secondary mt-3 leading-relaxed">{x.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── el simulador ── */}
        <section id="simulador" className="relative overflow-hidden bg-[#05080D] text-white py-16 md:py-24 px-4 sm:px-6 scroll-mt-16">
          <div aria-hidden className="absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-[150vw] aspect-square rounded-full opacity-25 blur-[130px]"
            style={{ background: "radial-gradient(closest-side, rgba(16,185,129,.6), transparent)" }} />
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
              <p className="text-[13px] sm:text-[15px] font-semibold text-[#6EE7B7]">Pruébalo</p>
              <h2 className="mt-3 text-white">Tócalo como lo haría tu cliente.</h2>
              <p className="mt-4 text-lg text-white/60 leading-relaxed">
                Elige tu rubro. Se recorre solo; cuando lo toques, es tuyo. Junto al tótem, lo que pasa detrás.
              </p>
            </div>
            <SimuladorTotem />
            <p className="mt-8 text-center text-xs text-white/35">Locales, personas y precios de ejemplo. Las pantallas son las del tótem real.</p>
          </div>
        </section>

        {/* ── paso a paso con las pantallas reales ── */}
        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10 md:mb-14">
              <p className="eyebrow mb-4">Paso a paso</p>
              <h2 className="text-ink">Dos caminos. Ninguno pasa por el mesón.</h2>
            </div>
            <Camino titulo="Tengo cita reservada" bajada="El cliente que reservó por tu página, por WhatsApp o por teléfono." pasos={CON_CITA} />
            <div className="h-12 md:h-16" />
            <Camino titulo="Atenderme sin cita" bajada="El que pasa por fuera y entra a preguntar si hay hora." pasos={SIN_CITA} />
          </div>
        </section>

        {/* ── rubros ── */}
        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10 md:mb-14">
              <p className="eyebrow mb-4">Para cada rubro</p>
              <h2 className="text-ink">Mismo tótem. Tu local, tus servicios, tu equipo.</h2>
              <p className="text-text-secondary text-lg mt-4 leading-relaxed">
                El tótem toma tu logo, tus servicios con sus precios y tu equipo del panel. No hay nada que armar.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {RUBROS_TOTEM.map((r) => (
                <article key={r.id} className="rounded-[28px] bg-white p-7 flex flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display font-bold text-ink text-2xl tracking-tight">{r.rubro}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${r.sinCita ? "bg-syn-lime-tint text-accent" : "bg-ink/5 text-text-muted"}`}>
                      {r.sinCita ? "Con y sin cita" : "Solo llegadas"}
                    </span>
                  </div>
                  <p className="text-text-secondary mt-3 leading-relaxed flex-1">{r.uso}</p>
                  <p className="mt-4 text-sm text-text-muted">Ej.: {r.servicios.slice(0, 2).map((s) => s.nombre).join(" · ")}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    <BotonRubroTotem id={r.id} className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink">Verlo en el tótem</BotonRubroTotem>
                    <Link href={r.href} className="font-semibold text-accent hover:underline underline-offset-4">Todo para {r.rubro.toLowerCase()} →</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── se conecta con un código ── */}
        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
            <div>
              <p className="eyebrow mb-4">Se instala en minutos</p>
              <h2 className="text-ink">Se conecta con un código, como una tele.</h2>
              <ol className="mt-8 space-y-6">
                {[
                  ["Abre el tótem en la tablet", "Tu panel te da la dirección. Aparece Syna con un código de 6 números y un QR."],
                  ["Escanéalo con tu celular", "O escribe el código en tu panel: SYNA → Autoservicio → Conectar una tablet. Le pones un nombre y eliges la sede."],
                  ["Déjala fija en el mesón", "En Android con Fully Kiosk Browser, en iPad con el Acceso guiado. Los pasos están en tu panel."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-ink text-white font-bold grid place-items-center">{i + 1}</span>
                    <div><h3 className="font-display font-bold text-ink text-xl tracking-tight">{t}</h3><p className="text-text-secondary mt-1 leading-relaxed">{d}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[28px] bg-[#05080D] p-3 sm:p-5">
              <Image src="/totem/conectar.webp" alt="El tótem muestra el código de 6 números y el QR para conectarlo desde el panel" width={1200} height={750}
                sizes="(min-width: 1024px) 600px, 92vw" className="w-full h-auto rounded-xl" />
            </div>
          </div>
        </section>

        {/* ── control ── */}
        <section className="py-16 md:py-24 bg-[#05080D] text-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10 md:mb-14">
              <p className="text-[13px] sm:text-[15px] font-semibold text-[#6EE7B7]">Tú mandas</p>
              <h2 className="mt-3 text-white">Una tablet a la vista, sin riesgo.</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CONTROL.map((c) => (
                <article key={c.t} className="rounded-[28px] border border-white/10 bg-white/[.03] p-7">
                  <span aria-hidden className="block w-10 h-1.5 rounded-full bg-emerald-400 mb-5" />
                  <h3 className="font-display font-bold text-white text-xl tracking-tight">{c.t}</h3>
                  <p className="text-white/60 mt-3 leading-relaxed">{c.d}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-[28px] border border-amber-300/30 bg-amber-300/[.06] p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-5 justify-between">
              <p className="text-white/80 leading-relaxed max-w-3xl">
                <b className="text-amber-200">Está en beta</b> y viene encendido en todos los planes de SynapTech, sin costo aparte.
                Ya funciona, y lo vamos mejorando con lo que nos cuentan los locales.
              </p>
              <a href={altaIA("totem")} className="shrink-0 inline-flex justify-center items-center bg-white text-[#05080D] font-semibold px-7 py-4 rounded-full hover:bg-white/90 transition-colors">{CTA_IA}</a>
            </div>
          </div>
        </section>

        <FaqSeo titulo="Tótem de autoservicio: lo que más nos preguntan." preguntas={FAQ} />
        <CtaFinal origen="totem-final" oscuro />
      </main>
      <Footer />
    </>
  );
}

function Camino({ titulo, bajada, pasos }: { titulo: string; bajada: string; pasos: { img: string; t: string; d: string }[] }) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
        <h3 className="font-display font-bold text-ink text-2xl sm:text-3xl tracking-tight">{titulo}</h3>
        <p className="text-text-muted">{bajada}</p>
      </div>
      <ol className={`grid gap-5 ${pasos.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"}`}>
        {pasos.map((p, i) => (
          <li key={p.t}>
            <div className="rounded-[20px] bg-[#05080D] p-2 sm:p-2.5">
              <Image src={p.img} alt={`Tótem: ${p.t.toLowerCase()}`} width={1200} height={750} sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw" className="w-full h-auto rounded-xl" />
            </div>
            <p className="mt-4 text-sm font-bold text-accent">Paso {i + 1}</p>
            <h4 className="font-display font-bold text-ink text-lg tracking-tight mt-1">{p.t}</h4>
            <p className="text-text-secondary mt-1 leading-relaxed">{p.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

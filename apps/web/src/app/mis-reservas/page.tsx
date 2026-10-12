import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import FaqSeo   from "@/components/FaqSeo";
import { SIGNUP_URL, APP_CLIENTES } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";

/* Mis reservas (12-10-2026): la app de la persona que reserva, en
   mi.synaptechspa.cl (functions/mi-cliente.js de la plataforma). Esta página
   la presenta y es el acceso desde el sitio: el menú, el pie y Syna apuntan
   acá o directo a la app. El teléfono es una ILUSTRACIÓN de la pantalla (sin
   datos de nadie): nombres genéricos, a propósito. */
export const metadata = metaPagina({
  title: "Mis reservas: tus citas y sellos en un solo lugar",
  description: "Entra a Mis reservas con tu correo y ve tus próximas citas, tus sellos y tus premios de todos los locales donde reservas con SynapTech.",
  path: "/mis-reservas",
});

const PASOS = [
  { n: "1", t: "Escribe tu correo", d: "El mismo que usas cuando reservas en tu barbería, salón o centro." },
  { n: "2", t: "Te llega un código", d: "Seis números a tu correo. Sin contraseñas que recordar." },
  { n: "3", t: "Listo", d: "Tus citas, sellos y premios de todos tus locales, en una sola pantalla." },
];

const PUNTOS = [
  { t: "Tu próxima cita, siempre a mano", d: "Con la cuenta regresiva, el profesional y un botón para cambiarla o agregarla a tu calendario." },
  { t: "Tus sellos al día", d: "Cuántos tienes en cada local y cuántos te faltan para el próximo premio." },
  { t: "Tus premios listos", d: "Todo lo que ya puedes canjear, junto, para que no se te pase ninguno." },
  { t: "Reserva de nuevo en un toque", d: "Cada local con su botón para agendar y entrar a su club." },
];

const FAQ = [
  { q: "¿Qué es Mis reservas?", a: "Es la app de SynapTech para las personas que reservan: en un solo lugar ves tus próximas citas, tus sellos y tus premios de todos los locales que usan SynapTech." },
  { q: "¿Cómo entro?", a: "En mi.synaptechspa.cl escribes el correo con que reservas y te llega un código de 6 números. No hay contraseña." },
  { q: "¿Qué locales aparecen?", a: "Los locales que usan SynapTech donde reservaste o eres parte del club con ese correo. Si reservaste con otro correo, entra con ese." },
  { q: "¿Tiene costo?", a: "No. Es gratis para los clientes de los locales." },
  { q: "¿Se puede instalar en el teléfono?", a: "Sí: en Android aparece el botón para instalarla, y en iPhone se agrega desde Safari con Compartir y «Agregar a inicio»." },
  { q: "¿Tengo un local: mis clientes la tienen?", a: "Sí. Todo local que usa SynapTech la tiene incluida, sin configurar nada: tus clientes ven ahí sus citas y sellos de tu local." },
];

function Telefono() {
  return (
    <div aria-hidden className="relative mx-auto w-[300px] sm:w-[320px]">
      <div className="absolute -inset-10 rounded-[60px] bg-[radial-gradient(closest-side,rgba(198,249,78,.28),transparent)] blur-2xl" />
      <div className="relative rounded-[46px] bg-[#0b1320] p-3 shadow-[0_40px_80px_rgba(0,0,0,.45)] ring-1 ring-white/10">
        <div className="rounded-[36px] bg-[#F4F5F1] overflow-hidden text-[#0F1A2B]">
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <span className="flex items-center gap-2 font-display font-bold text-[14px]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/icon-192x192.png" alt="" width={24} height={24} className="w-6 h-6 rounded-[7px] bg-white" />Mis reservas</span>
            <span className="w-7 h-7 rounded-full bg-[#0F1A2B] text-[#C6F94E] text-[12px] font-bold grid place-items-center">C</span>
          </div>
          <div className="px-4 pb-4">
            <p className="font-display font-bold text-[22px] leading-tight">Hola, Camila</p>
            <p className="text-[11px] text-[#5B6472]">Viernes 17 de octubre</p>
            <div className="mt-3 rounded-[20px] p-4 text-white" style={{ background: "radial-gradient(110% 80% at 100% 0%, rgba(198,249,78,.22), transparent 55%), #0F1A2B" }}>
              <div className="flex items-start justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[.08em] text-[#C6F94E]">● Tu próxima cita</span>
                <span className="rounded-xl bg-white/10 px-2.5 py-1 text-center"><b className="block font-display text-[18px] leading-none text-[#C6F94E]">1</b><span className="text-[8px] text-white/70">día</span></span>
              </div>
              <p className="font-display font-bold text-[18px] leading-tight mt-1">Corte y barba</p>
              <p className="text-[12px] font-semibold mt-1">Sábado 18 de octubre · 10:30</p>
              <p className="text-[11px] text-white/70 mt-3 pt-3 border-t border-white/10">Tu barbería · con Matías</p>
              <div className="flex gap-2 mt-3"><span className="rounded-full bg-[#C6F94E] text-[#0F1A2B] text-[10px] font-semibold px-3 py-1.5">Ver o cambiar →</span><span className="rounded-full border border-white/25 text-[10px] font-semibold px-3 py-1.5">Calendario</span></div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[["3", "locales"], ["14", "sellos"], ["2", "premios listos"]].map(([n, t], i) => (
                <div key={t} className={`rounded-2xl px-2.5 py-2 ${i === 2 ? "bg-[#EEF6DC]" : "bg-white border border-black/5"}`}>
                  <b className={`block font-display text-[17px] leading-none ${i === 2 ? "text-[#4F7A12]" : ""}`}>{n}</b><span className="text-[9px] text-[#5B6472]">{t}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-2xl bg-white border border-black/5 p-3">
              <p className="font-display font-bold text-[13px]">Tu salón</p>
              <div className="flex gap-1.5 mt-2">{Array.from({ length: 8 }).map((_, i) => <span key={i} className={`w-4 h-4 rounded-full ${i < 6 ? "bg-[#9CCC3C]" : "border border-dashed border-[#C9CDC4]"}`} />)}</div>
              <p className="text-[10px] text-[#5B6472] mt-1.5"><b className="text-[#0F1A2B]">6 sellos</b> · te faltan 2 para tu premio</p>
            </div>
          </div>
          <div className="mx-3 mb-3 grid grid-cols-3 rounded-2xl bg-[#0F1A2B] p-1.5 text-[9px] text-white/60 text-center">
            <span className="rounded-xl bg-white/10 py-1.5 text-[#C6F94E]">Inicio</span><span className="py-1.5">Locales</span><span className="py-1.5">Historial</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MisReservas() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#0F1A2B] text-white pt-28 md:pt-36 pb-20 md:pb-28">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_10%,rgba(198,249,78,.18),transparent_60%),radial-gradient(60%_50%_at_0%_100%,rgba(156,204,60,.14),transparent_60%)]" />
          <div aria-hidden className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(180deg,#000,transparent_80%)]" />
          <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
            <div>
              <p className="eyebrow !text-[#C6F94E] mb-5">Para quienes reservan</p>
              <h1 className="text-white !text-[clamp(2.5rem,5.4vw,4.4rem)]">Todas tus reservas, <span className="text-[#C6F94E]">en un solo lugar.</span></h1>
              <p className="text-white/75 text-lg md:text-xl leading-relaxed mt-6 max-w-xl">
                Tus próximas citas, tus sellos y tus premios de cada barbería, salón o centro donde reservas con SynapTech.
                Entras con tu correo, sin contraseñas.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-9">
                <a href={APP_CLIENTES} className="inline-flex justify-center items-center gap-2 bg-[#C6F94E] text-[#0F1A2B] font-semibold px-8 py-4 rounded-full hover:bg-white transition-colors">
                  Entrar a Mis reservas <span aria-hidden>→</span>
                </a>
                <Link href="/locales" className="inline-flex justify-center items-center border border-white/25 text-white font-semibold px-8 py-4 rounded-full hover:border-white/60 transition-colors">
                  Encuentra un local
                </Link>
              </div>
              <p className="text-sm text-white/55 mt-5">Gratis · Funciona en el navegador y se instala en tu teléfono.</p>
            </div>
            <Telefono />
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-4">Cómo entras</p>
            <h2 className="text-ink max-w-3xl">Tres pasos, y nunca más una contraseña.</h2>
            <ol className="grid md:grid-cols-3 gap-4 mt-10 list-none p-0 m-0">
              {PASOS.map((p) => (
                <li key={p.n} className="rounded-[24px] border border-border-subtle p-6">
                  <span className="w-11 h-11 rounded-2xl bg-lime/25 text-ink font-display font-bold text-xl flex items-center justify-center">{p.n}</span>
                  <h3 className="!text-xl text-ink mt-5">{p.t}</h3>
                  <p className="text-text-secondary mt-2 leading-relaxed">{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-4">Lo que ves</p>
            <h2 className="text-ink max-w-3xl">Todo lo de tus locales, sin buscar en cada uno.</h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {PUNTOS.map((p) => (
                <article key={p.t} className="rounded-[24px] bg-white p-6 sm:p-7">
                  <span aria-hidden className="block w-10 h-1.5 rounded-full bg-lime mb-5" />
                  <h3 className="!text-xl text-ink">{p.t}</h3>
                  <p className="text-text-secondary mt-2 leading-relaxed">{p.d}</p>
                </article>
              ))}
            </div>
            <div className="mt-10">
              <a href={APP_CLIENTES} className="inline-flex items-center gap-2 bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
                Entrar a Mis reservas <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="rounded-[32px] bg-[#0F1A2B] text-white p-8 md:p-14 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center relative overflow-hidden">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,rgba(198,249,78,.16),transparent_60%)]" />
              <div className="relative">
                <p className="eyebrow !text-[#C6F94E] mb-4">¿Tienes un local?</p>
                <h2 className="text-white">Tus clientes ya tienen su app, con tu local adentro.</h2>
                <p className="text-white/75 text-lg mt-5 leading-relaxed max-w-2xl">
                  Todo local que usa SynapTech aparece en Mis reservas sin configurar nada: tus clientes ven su próxima cita,
                  sus sellos y sus premios, y vuelven a reservar contigo en un toque.
                </p>
              </div>
              <div className="relative flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                <a href={`${SIGNUP_URL}?ref=mis-reservas`} className="inline-flex justify-center items-center bg-[#C6F94E] text-[#0F1A2B] font-semibold px-7 py-4 rounded-full hover:bg-white transition-colors">
                  Pruébalo 14 días gratis
                </a>
                <Link href="/funciones" className="inline-flex justify-center items-center border border-white/25 text-white font-semibold px-7 py-4 rounded-full hover:border-white/60 transition-colors">
                  Ver todas las funciones
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FaqSeo titulo="Mis reservas: preguntas frecuentes." preguntas={FAQ} />
      </main>
      <Footer />
    </>
  );
}

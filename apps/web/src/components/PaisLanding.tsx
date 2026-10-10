import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PAISES, PLANES_LATAM, SEDE_ADICIONAL_LATAM, incluyeEnPais, type CodigoPais } from "@/content/paises";
import { waLink } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";

/* Landing por país (ver content/paises.ts). Lleva su propio encabezado y pie:
   el menú del sitio chileno enlaza precios en pesos chilenos, SII y locales de
   Chile, que acá no aplican. Cuando el país tenga dominio propio, esta misma
   página es su portada. */

export function metadataPais(codigo: CodigoPais): Metadata {
  const p = PAISES[codigo];
  // Idea de expansión: fuera del índice hasta que el país se lance.
  return metaPagina({
    title: `SynapTech en ${p.nombre}: agenda online y WhatsApp con IA`,
    description: `Reservas online en ${p.moneda} y en ${p.hora}, asistente con IA que agenda por WhatsApp y club de fidelidad. Desde US$15 al mes.`,
    path: `/${codigo}`,
    noindex: true,
  });
}

function Check({ claro = false }: { claro?: boolean }) {
  return (
    <svg className={`w-5 h-5 shrink-0 mt-0.5 ${claro ? "text-lime" : "text-accent"}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PaisLanding({ codigo }: { codigo: CodigoPais }) {
  const p = PAISES[codigo];
  const piloto = p.estado === "piloto";
  const wa = (t: string) => waLink(`${t} (${p.nombre})`);

  const ADAPTADO = [
    { t: `Precios en ${p.moneda}`, d: "Tu catálogo, la caja y los mensajes del asistente muestran tu moneda." },
    { t: `En ${p.hora}`, d: "La agenda, los recordatorios y el asistente trabajan con la hora de tu local." },
    { t: `Celulares ${p.prefijo}`, d: "Tus clientes reservan con su número local y los avisos les llegan a ese número." },
    p.documento
      ? { t: `Con ${p.documento}, sin RUT`, d: `La reserva pide los datos de ${p.nombre}, no los de Chile.` }
      : { t: "Sin datos chilenos", d: "La reserva no pide RUT ni comuna: solo lo que usa tu país." },
    p.leyDatos
      ? { t: "Tus datos, protegidos", d: `Los textos legales de la reserva citan la ${p.leyDatos}.` }
      : { t: "Español neutro", d: "El asistente escribe en un español que se entiende en toda Latinoamérica." },
    { t: "El WhatsApp de tu local", d: "El asistente responde desde tu número, que sigue funcionando en tu teléfono." },
  ];

  const FAQ = [
    { q: `¿Necesito una empresa en Chile para usarlo?`, a: `No. Tu local se crea con su país, ${p.nombre}, y todo funciona con tu moneda, tu hora y tus números.` },
    { q: "¿Cómo pago la mensualidad?", a: "En dólares, con tarjeta. Los 2 primeros meses son gratis: la tarjeta se pide recién al final del período gratis, y te avisamos a los 45 días." },
    { q: "¿Hay plan anual?", a: "Sí: pagas 10 meses y usas 12. Son US$150 al año el plan Agenda y US$200 al año el plan Agenda + IA." },
    { q: "Tengo varias sedes, ¿cuánto pago?", a: `La primera sede paga su plan y cada sede adicional suma US$${SEDE_ADICIONAL_LATAM.mes} al mes. Por ejemplo, 4 sedes con el plan Agenda son US$15 + 3 × US$10 = US$45 al mes.` },
    { q: `¿Emite boletas o facturas en ${p.nombre}?`, a: `Todavía no. La emisión de documentos tributarios solo existe en Chile; en ${p.nombre} la agenda, la caja, el club y el asistente funcionan completos.` },
    { q: `Uso ${p.competencia}, ¿cómo me cambio?`, a: "Te mudamos gratis: traemos tus servicios con precios y duraciones, tu equipo con sus horarios y tu lista de clientes. Todo se hace por videollamada." },
    { q: "¿Hay permanencia?", a: "No. Te vas cuando quieras, y tus datos son tuyos: te los entregamos exportados." },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-border-subtle">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 h-16 flex items-center justify-between gap-4">
          <Link href={`/${codigo}`} className="flex items-center gap-2.5">
            <Image src="/assets/synaptech-icon.png" alt="" width={28} height={28} />
            <span className="font-display font-bold text-ink text-lg tracking-tight">SynapTech</span>
            <span className="ml-1 text-[13px] font-semibold text-text-secondary bg-mist rounded-full px-2.5 py-1">{p.nombre}</span>
          </Link>
          <a href={wa("Hola, quiero conocer SynapTech para mi local")} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center bg-ink text-white font-semibold text-sm px-4 sm:px-5 py-2.5 rounded-full hover:bg-black transition-colors">
            Hablar por WhatsApp
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
            <div>
              <p className="eyebrow mb-5">
                {piloto ? `Piloto en ${p.ciudades} · cupos limitados` : `Próximamente en ${p.nombre}`}
              </p>
              <h1 className="text-ink mb-6 !text-[clamp(2.4rem,5vw,4.5rem)]">
                Todo tu local en una sola plataforma, ahora en {p.nombre}.
              </h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-8">
                Reservas online en {p.moneda}, un asistente con IA que responde y agenda por
                WhatsApp, y un club que hace volver a tus clientes. Desde US$15 al mes, con
                los 2 primeros meses gratis.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={wa(piloto ? "Hola, quiero ser uno de los locales piloto de SynapTech" : "Hola, quiero que me avisen cuando SynapTech llegue")}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex justify-center items-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
                  {piloto ? "Quiero ser local piloto" : "Avísame cuando llegue"}
                </a>
                <a href="#planes"
                  className="inline-flex justify-center items-center border border-ink/15 text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
                  Ver planes en dólares
                </a>
              </div>
              <p className="text-sm text-text-muted mt-6">
                Más de 35 locales y sedes ya trabajan con SynapTech en Chile.
              </p>
            </div>
            <div className="relative">
              <div className="hero-entra rounded-[28px] bg-lime/20 p-2.5 sm:p-4">
                <Image src="/panel/agenda-escritorio.webp" alt="Agenda del día con tres profesionales en el panel de SynapTech"
                  width={2880} height={1800} priority sizes="(min-width: 1024px) 600px, 92vw"
                  className="w-full h-auto rounded-xl border border-border-subtle shadow-card-hover" />
              </div>
            </div>
          </div>
        </section>

        {/* Hecho para el país */}
        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Hecho para {p.nombre}</p>
              <h2 className="text-ink">No es la versión chilena con otra bandera.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Cada local guarda su país, y la plataforma trabaja con lo de ese país.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ADAPTADO.map((x) => (
                <article key={x.t} className="rounded-[24px] bg-white p-6 sm:p-7">
                  <h3 className="font-display font-bold text-ink text-xl tracking-tight">{x.t}</h3>
                  <p className="text-text-secondary mt-2 leading-relaxed">{x.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Planes */}
        <section id="planes" className="py-16 md:py-24 scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Precio de lanzamiento</p>
              <h2 className="text-ink">Un precio por local, no por silla.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Sin cobro por barbero ni comisión por reserva. Los 2 primeros meses son gratis
                y la tarjeta se pide recién al final.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
              {PLANES_LATAM.map((pl) => (
                <article key={pl.id} className={`relative rounded-[28px] p-7 sm:p-8 flex flex-col ${pl.popular ? "bg-ink text-white" : "bg-mist"}`}>
                  {pl.popular && <span className="absolute -top-3 left-7 bg-lime text-ink text-xs font-bold px-3 py-1 rounded-full">Recomendado</span>}
                  <h3 className="font-display font-bold text-2xl tracking-tight">{pl.nombre}</h3>
                  <p className="mt-4">
                    <span className="font-display font-bold text-[44px] tracking-tight leading-none">US${pl.precio}</span>
                    <span className={`text-sm ml-1 ${pl.popular ? "text-white/60" : "text-text-muted"}`}>/ mes por local</span>
                  </p>
                  <p className={`text-sm mt-2 ${pl.popular ? "text-white/70" : "text-text-secondary"}`}>o US${pl.anual} al año: 10 meses pagados por 12</p>
                  <p className={`mt-4 leading-relaxed ${pl.popular ? "text-white/80" : "text-text-secondary"}`}>{pl.descripcion}</p>
                  <ul className="mt-6 flex flex-col gap-3 flex-1">
                    {pl.incluye.map((d) => (
                      <li key={d} className="flex gap-3 text-[15px]"><Check claro={pl.popular} />{incluyeEnPais(d, p)}</li>
                    ))}
                  </ul>
                  <a href={wa(`Hola, me interesa el plan ${pl.nombre} de SynapTech`)} target="_blank" rel="noopener noreferrer"
                    className={`mt-8 inline-flex justify-center items-center font-semibold px-6 py-3.5 rounded-full transition-colors ${
                      pl.popular ? "bg-lime text-ink hover:bg-white" : "bg-ink text-white hover:bg-black"}`}>
                    {piloto ? "Quiero ser local piloto" : "Avísame cuando llegue"}
                  </a>
                </article>
              ))}
            </div>
            <div className="mt-5 max-w-4xl rounded-[24px] border border-border-subtle p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <p className="text-ink"><span className="font-semibold">¿Varias sedes?</span> La primera paga su plan y cada sede adicional suma US${SEDE_ADICIONAL_LATAM.mes} al mes (US${SEDE_ADICIONAL_LATAM.anual} al año).</p>
              <p className="text-sm text-text-muted shrink-0">4 sedes con Agenda: US$15 + 3 × US$10 = US$45 al mes</p>
            </div>
            <p className="text-sm text-text-muted mt-4 max-w-4xl">
              Precios en dólares estadounidenses. Se paga con tarjeta; la pides recién al final de los 2 meses gratis y te avisamos a los 45 días.
            </p>
          </div>
        </section>

        {/* Mudanza */}
        <section className="py-16 md:py-24 bg-ink text-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="eyebrow !text-lime mb-4">Cámbiate sin perder a nadie</p>
              <h2 className="text-white">¿Hoy usas {p.competencia}? Te mudamos gratis.</h2>
              <p className="text-white/75 text-lg mt-5 leading-relaxed">
                Traemos tus servicios con precios y duraciones, tu equipo con sus horarios y tu
                lista de clientes. La demo, la mudanza y el soporte se hacen por videollamada y
                WhatsApp.
              </p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-4">
              {[
                ["Precio fijo por local", "No pagas más por sumar profesionales."],
                ["Sin comisión por reserva", "Tampoco por cada cliente nuevo que llega."],
                ["Tu WhatsApp, tu cliente", "El asistente responde desde el número de tu local."],
                ["Sin permanencia", "Te vas cuando quieras, con tus datos."],
              ].map(([t, d]) => (
                <li key={t} className="rounded-[20px] bg-white/[0.06] border border-white/10 p-5">
                  <p className="font-semibold">{t}</p>
                  <p className="text-white/65 text-[15px] mt-1">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Preguntas */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="eyebrow mb-4">Preguntas frecuentes</p>
            <h2 className="text-ink mb-8">Lo que preguntan en {p.nombre}.</h2>
            <div className="divide-y divide-border-subtle border-y border-border-subtle">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-6 font-semibold text-ink text-lg">
                    {f.q}
                    <span className="text-2xl text-text-muted transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="text-text-secondary leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cierre */}
        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-ink">
              {piloto ? `Sé uno de los primeros locales en ${p.nombre}.` : `Te avisamos cuando lleguemos a ${p.nombre}.`}
            </h2>
            <p className="text-text-secondary text-lg mt-5 leading-relaxed">
              Te mostramos la plataforma con los datos de tu local, por videollamada.
            </p>
            <a href={wa("Hola, quiero ver SynapTech con los datos de mi local")} target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex justify-center items-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
              Escríbenos por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border-subtle py-10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col sm:flex-row gap-4 justify-between text-sm text-text-muted">
          <p>© 2026 Synaptech SpA · Empresa chilena · hola@synaptechspa.cl</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            {Object.values(PAISES).filter((x) => x.codigo !== codigo).map((x) => (
              <Link key={x.codigo} href={`/${x.codigo}`} className="hover:text-ink">{x.nombre}</Link>
            ))}
            <Link href="/" className="hover:text-ink">Chile</Link>
          </p>
        </div>
      </footer>
    </>
  );
}

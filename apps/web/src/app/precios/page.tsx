import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import Pricing  from "@/components/Pricing";
import Cambiate from "@/components/Cambiate";
import CtaFinal from "@/components/CtaFinal";
import FaqSeo   from "@/components/FaqSeo";
import TablaPlanes from "@/components/TablaPlanes";
import Integraciones from "@/components/Integraciones";
import { JsonLd, TarjetaServicio, NotaInversion } from "@/components/Landing";
import { MarcaCompetidor } from "@/components/MarcaCompetidor";
import {
  ADICIONALES, ANUAL, CADENA, CRECER, PLANES, PRECIO, PRUEBA, INDEPENDIENTE, INDEPENDIENTE_IA, LOCAL, LOCAL_IA, TODO_INCLUIDO,
  TODO_INCLUIDO_AHORRO, TODO_INCLUIDO_SEPARADO, fmt,
} from "@/content/precios";
import { COMPETIDORES, SYNAPTECH, competidor, fechaDe } from "@/content/competidores";
import { metaPagina } from "@/lib/seo";
import { anualLd, breadcrumbLd, grafo, planLd, servicioLd } from "@/lib/ld";
import { TAMANOS } from "@/lib/mercado";

/* /precios (rehecha el 01-11-2026 con la escalera de noviembre). Objetivo: la
   página de precios más clara del rubro en Chile. Dos ejes (atiendes solo o con
   equipo × sin IA o con IA), Todo Incluido como ancla, qué módulo trae cada
   plan, adicionales, cadena, Crecer, comparador con la competencia (con fuente
   y fecha, desde content/competidores.ts) y preguntas con FAQPage.
   Búsquedas: "precios synaptech", "precio agenda online barbería", "cuánto
   cuesta una agenda online", "agenda con IA precio", "software barbería precio". */

export const metadata = metaPagina({
  title: "Precios SynapTech 2026: agenda con IA desde $9.990 + IVA",
  description: "Independiente $9.990, Local $29.900, Local IA $49.900 y Todo Incluido $79.900 + IVA. Agenda, caja, club en Wallet y asistente IA. Sin comisión por cita.",
  path: "/precios",
});

const MIGAS = [{ nombre: "Precios", path: "/precios" }];

/* Comparador rápido: las agendas chicas y medianas que más se comparan, más AgendaPro. */
const COMPARADOS = ["agendapro", "keoplanner", "usekora", "agendapp", "agendalibre", "agendapia", "rebooking", "agendaya", "turnify"]
  .map((id) => competidor(id)).filter((c): c is NonNullable<typeof c> => !!c);

const PREGUNTAS = [
  { q: "¿Qué plan me conviene si atiendo solo?", a: `El plan Independiente, ${fmt(INDEPENDIENTE.mes)} + IVA al mes, trae todo el panel para 1 profesional: agenda y reserva online, caja, clientes, club en Wallet, tienda y tu página. Si quieres que un asistente con IA responda y agende en tu WhatsApp mientras atiendes, el plan Independiente IA cuesta ${fmt(INDEPENDIENTE_IA.mes)} + IVA, con ${INDEPENDIENTE_IA.conversaciones} conversaciones al mes. Cuando sumas a alguien, pasas al plan Local.` },
  { q: "¿Cobran por profesional o por silla?", a: `No. Los planes Local, Local IA y Todo Incluido cobran por local, con profesionales ilimitados: si mañana sumas a alguien al equipo, tu mensualidad no cambia. Los planes Independiente son para 1 profesional.` },
  { q: "¿Cobran comisión por cita o por reserva?", a: "No. Las citas son ilimitadas y no cobramos nada por reserva. Si cobras online, la comisión es la del medio de pago (Mercado Pago, Webpay o TUU), no nuestra." },
  { q: "¿Qué trae el plan Todo Incluido?", a: `Todo el plan Local IA, más boletas y facturas ante el SII automáticas (sin costo de instalación), el asistente también en Instagram, Reactivación IA, ${TODO_INCLUIDO.conversaciones} conversaciones al mes y tu dominio propio. Cuesta ${fmt(TODO_INCLUIDO.mes)} + IVA al mes; por separado serían ${fmt(TODO_INCLUIDO_SEPARADO)}, así que ahorras ${fmt(TODO_INCLUIDO_AHORRO)} al mes.` },
  { q: "¿Qué pasa si se acaban las conversaciones del asistente?", a: `El asistente no se corta: se suma un tramo de 100 conversaciones por ${fmt(PRECIO.conversacionesExtra)} + IVA. Cada plan con IA trae su cupo: ${INDEPENDIENTE_IA.conversaciones} en Independiente IA, ${LOCAL_IA.conversaciones} en Local IA y ${TODO_INCLUIDO.conversaciones} en Todo Incluido. Las citas agendadas son ilimitadas.` },
  { q: "¿Los recordatorios por WhatsApp vienen incluidos?", a: "En los planes con IA, sí: con el asistente conectado al número de tu local, los recordatorios de toda tu agenda salen solos a los clientes que aceptaron recibirlos. En los planes sin IA, la confirmación y el recordatorio llegan por correo." },
  { q: "¿Cuánto cuestan las boletas ante el SII?", a: `Vienen incluidas en Todo Incluido. En los demás planes son un adicional de ${fmt(PRECIO.boletasLocal)} + IVA al mes (${fmt(PRECIO.boletasIndependiente)} en Independiente e Independiente IA), sin costo de instalación: la boleta del local y la boleta de honorarios de cada profesional salen solas al cerrar la cita.` },
  { q: "¿Tengo que pagar el año completo?", a: `No. Los planes son mensuales y sin permanencia. El plan anual es una opción para quien prefiere pagar una vez: ${fmt(ANUAL.anio)} + IVA por todo el plan ${ANUAL.base}, que equivale a ${ANUAL.equivaleMeses} meses.` },
  { q: "¿Cómo pago la mensualidad?", a: "Con tarjeta de débito o crédito por Webpay, desde tu panel, o por transferencia a la cuenta de Synaptech SpA." },
  { q: "Tengo más de un local, ¿cuánto cuesta?", a: `Cada local paga el plan Local a precio de cadena: ${CADENA.tramos.map((t) => `${t.texto}, ${fmt(t.mes)} + IVA cada uno`).join("; ")}. Con el asistente con IA, ${fmt(CADENA.ia)} + IVA más por local. Te mueves entre las sedes desde el mismo panel.` },
  { q: "¿Qué es Crecer?", a: "Son complementos que se suman a cualquier plan de SynapTech: Presencia (página web propia con dominio .cl, ficha de Google optimizada e informe mensual), Google Ads y Meta Ads (Facebook e Instagram), con la configuración incluida y conectados a tu agenda. La inversión en anuncios la pagas tú directo a Google o Meta, con tu tarjeta. Sin permanencia." },
  { q: "¿Hay prueba gratis?", a: `Sí, sin tarjeta: ${PRUEBA.conIA} días del plan ${PRUEBA.plan} con el asistente con IA (son ${fmt(PRUEBA.valor)} + IVA que no pagas), creando tu agenda en crear.synaptechspa.cl, o ${PRUEBA.sinIA} días sin el asistente en bioo.cl/agenda. Al terminar eliges tu plan; no se cobra nada solo.` },
];

export default function PreciosPage() {
  const ld = grafo(
    breadcrumbLd(MIGAS),
    ...PLANES.map(planLd),
    anualLd(LOCAL_IA.mes),
    ...CRECER.map((s) => servicioLd(s, s.id.includes("ads") || s.id.includes("anuncios") ? "Gestión de publicidad digital" : "Marketing digital para locales")),
  );
  const ejes = [
    { fila: "Atiendes solo", sinIA: INDEPENDIENTE, conIA: INDEPENDIENTE_IA },
    { fila: "Tienes equipo", sinIA: LOCAL, conIA: LOCAL_IA },
  ];

  return (
    <>
      <Header />
      <main>
        <JsonLd data={ld} />

        <section className="pt-28 md:pt-36 pb-10">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-end">
            <div>
              <nav aria-label="Ruta" className="text-sm text-text-muted mb-6"><Link href="/" className="hover:text-ink">Inicio</Link> <span aria-hidden>›</span> Precios</nav>
              <p className="eyebrow mb-5">Precios · noviembre 2026</p>
              <h1 className="text-ink max-w-4xl">Planes y precios de SynapTech, claros desde el primer día.</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
                Desde {fmt(INDEPENDIENTE.mes)} + IVA si atiendes solo y {fmt(LOCAL.mes)} + IVA por local con profesionales ilimitados.
                Sin comisión por cita y sin permanencia. Todo lo que trae cada plan, y lo que cuesta cada adicional, está escrito acá.
              </p>
            </div>

            {/* Elige en 10 segundos: los dos ejes */}
            <div className="rounded-[24px] border border-border-subtle overflow-hidden">
              <table className="w-full text-left text-[15px]">
                <caption className="sr-only">Plan según si atiendes solo o con equipo, y con o sin asistente con IA</caption>
                <thead>
                  <tr className="bg-mist text-[13px] uppercase tracking-[0.08em] text-text-muted">
                    <th scope="col" className="px-4 py-3 font-semibold" />
                    <th scope="col" className="px-4 py-3 font-semibold">Sin IA</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Con asistente IA</th>
                  </tr>
                </thead>
                <tbody>
                  {ejes.map((e) => (
                    <tr key={e.fila} className="border-t border-border-subtle">
                      <th scope="row" className="px-4 py-4 font-semibold text-ink">{e.fila}</th>
                      {[e.sinIA, e.conIA].map((p) => (
                        <td key={p.id} className="px-4 py-4">
                          <a href={`#plan-${p.id}`} className="font-semibold text-ink hover:text-accent">{p.nombre}</a>
                          <span className="block text-text-muted text-[14px] tabular-nums">{fmt(p.mes)} + IVA</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t border-border-subtle bg-ink text-white">
                    <th scope="row" className="px-4 py-4 font-semibold">Todo, sin adicionales</th>
                    <td colSpan={2} className="px-4 py-4">
                      <a href={`#plan-${TODO_INCLUIDO.id}`} className="font-semibold hover:text-lime">{TODO_INCLUIDO.nombre}</a>
                      <span className="block text-white/60 text-[14px]">{fmt(TODO_INCLUIDO.mes)} + IVA · IA, boletas SII, Instagram y dominio</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Pricing conEnlace={false} conEncabezado={false} />

        {/* Qué trae cada plan */}
        <section id="comparativa" className="py-16 md:py-24 scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Qué incluye cada plan</p>
              <h2 className="text-ink">Todo el panel en todos los planes. Módulo por módulo.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Agenda, reserva online, caja, club en Wallet, tienda y medición de anuncios vienen hasta en el plan de {fmt(INDEPENDIENTE.mes)}.
                Desde Local se suman los módulos de equipo; los planes IA suman el asistente.
              </p>
            </div>
            <TablaPlanes />
          </div>
        </section>

        {/* Adicionales */}
        <section id="adicionales" className="py-16 md:py-24 bg-mist scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Adicionales</p>
              <h2 className="text-ink">Suma solo lo que tu local necesita.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Se agregan al plan y se quitan cuando quieras. Precios netos, más IVA. En Todo Incluido ya vienen las boletas,
                Instagram, la Reactivación IA y el dominio.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {ADICIONALES.map((a) => (
                <article key={a.id} id={`adicional-${a.id}`} className="rounded-[28px] bg-white p-7 flex flex-col scroll-mt-24">
                  <h3 className="font-display font-bold text-ink text-xl tracking-tight">{a.nombre}</h3>
                  <p className="text-text-secondary mt-2 leading-relaxed flex-1">{a.desc}</p>
                  <p className="mt-5 font-display font-bold text-2xl text-ink tracking-tight">{a.precio}</p>
                  {a.nota && <p className="text-sm text-text-muted mt-1">{a.nota}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Cadena */}
        <section id="cadena" className="py-16 md:py-24 scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div>
              <p className="eyebrow mb-4">Cadena: 2 o más locales</p>
              <h2 className="text-ink">Mientras más locales, menos pagas por cada uno.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Cada sede con su agenda, su equipo y su caja, y tú te mueves entre todas desde el mismo panel. Cada local paga el
                plan Local a precio de cadena; con el asistente con IA, {fmt(CADENA.ia)} + IVA más por local.
              </p>
            </div>
            <div className="rounded-[24px] border border-border-subtle overflow-hidden">
              <table className="w-full text-left text-[15px]">
                <caption className="sr-only">Precio del plan Local por local, según la cantidad de locales</caption>
                <thead>
                  <tr className="bg-mist text-[13px] uppercase tracking-[0.08em] text-text-muted">
                    <th scope="col" className="px-5 py-3 font-semibold">Locales</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Plan Local, por local</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Con asistente IA</th>
                  </tr>
                </thead>
                <tbody>
                  {CADENA.tramos.map((t) => (
                    <tr key={t.texto} className="border-t border-border-subtle">
                      <th scope="row" className="px-5 py-4 font-semibold text-ink">{t.texto}</th>
                      <td className="px-5 py-4 tabular-nums">{fmt(t.mes)} + IVA</td>
                      <td className="px-5 py-4 tabular-nums">{fmt(t.mes + CADENA.ia)} + IVA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Crecer */}
        <section id="crecer" className="py-16 md:py-24 bg-mist scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Crecer · complementos para suscriptores</p>
              <h2 className="text-ink">Página web propia y anuncios en Google e Instagram, conectados a tu agenda.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Se suman a cualquier plan, mes a mes, con la configuración incluida, y llevan a tus clientes
                directo a reservar en tu agenda.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CRECER.map((s) => <TarjetaServicio key={s.id} s={s} destacado={s.id === "combo-crecer"} />)}
            </div>
            <NotaInversion />
          </div>
        </section>

        {/* Comparador rápido */}
        <section id="comparar" className="py-16 md:py-24 scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-8">
              <p className="eyebrow mb-4">Comparador rápido</p>
              <h2 className="text-ink">SynapTech frente a otras agendas, según tu equipo.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Precio al mes del plan más barato que admite cada equipo, copiado de la página de cada empresa con su fecha.
                Donde otra es más barata, lo mostramos.
              </p>
            </div>
            <div className="overflow-x-auto rounded-[24px] border border-border-subtle">
              <table className="w-full min-w-[820px] text-left text-[15px]">
                <caption className="sr-only">Precio mensual de SynapTech y otras agendas con 1, 3, 6 y 9 profesionales</caption>
                <thead>
                  <tr className="bg-mist text-[13px] uppercase tracking-[0.08em] text-text-muted">
                    <th scope="col" className="px-5 py-3 font-semibold">Agenda</th>
                    {TAMANOS.map((n) => <th key={n} scope="col" className="px-4 py-3 font-semibold">{n} {n === 1 ? "prof." : "prof."}</th>)}
                    <th scope="col" className="px-5 py-3 font-semibold">Revisado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-lime/15">
                    <th scope="row" className="px-5 py-4 font-semibold text-ink whitespace-nowrap">SynapTech</th>
                    {SYNAPTECH.precios.map((p, i) => (
                      <td key={i} className="px-4 py-4 align-top">
                        <span className="font-semibold text-ink tabular-nums whitespace-nowrap">{p.valor}</span>
                        <span className="block text-[12px] text-text-muted">{i === 0 ? `Independiente · con IA ${SYNAPTECH.ia1}` : `Local · con IA ${SYNAPTECH.pro}`}</span>
                      </td>
                    ))}
                    <td className="px-5 py-4 text-[13px] text-text-muted">Lista oficial</td>
                  </tr>
                  {COMPARADOS.map((c) => (
                    <tr key={c.id} className="border-t border-border-subtle">
                      <th scope="row" className="px-5 py-4 align-top">
                        <Link href={`/comparar/${c.id}`} className="inline-flex items-center h-7 hover:opacity-80" aria-label={`${c.nombre} vs SynapTech`}><MarcaCompetidor c={c} chico /></Link>
                      </th>
                      {c.precios.map((p, i) => (
                        <td key={i} className="px-4 py-4 align-top">
                          <span className="font-semibold text-ink tabular-nums whitespace-nowrap">{p.valor}</span>
                          {p.nota && <span className="block text-[12px] text-text-muted leading-snug">{p.nota}</span>}
                        </td>
                      ))}
                      <td className="px-5 py-4 align-top text-[13px] text-text-muted">
                        <a href={c.fuentes[0]?.url} target="_blank" rel="noopener nofollow" className="underline underline-offset-2 hover:text-ink">{c.sitio}</a>
                        <span className="block">{fechaDe(c)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-text-muted mt-4 max-w-3xl">
              Asistente con IA que conversa y agenda: en su sitio, Keo Planner, Usekora y AgendAPP no lo publican (revisado el 1 de noviembre de 2026).
              AgendaPro tiene a Sofía y Julia, sin precio publicado, y WeiBook cobra a Wanda aparte (US$50 al mes). En SynapTech viene dentro de los
              planes con IA, desde {SYNAPTECH.ia1}.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6">
              <Link href="/comparar/precios" className="font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink">
                Ver las {COMPETIDORES.length + 1} agendas en una tabla →
              </Link>
              <Link href="/comparar" className="font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink">Todas las comparaciones →</Link>
            </div>
          </div>
        </section>

        <Integraciones />

        <Cambiate />

        <FaqSeo titulo="Lo que nos preguntan antes de partir." preguntas={PREGUNTAS} />

        <section className="pb-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="font-semibold text-ink mb-4">Según tu caso</p>
            <ul className="flex flex-wrap gap-2">
              {[
                { t: "Agenda para barbero independiente", h: "/agenda-barbero-independiente" },
                { t: "Boletas electrónicas SII automáticas", h: "/boletas-electronicas-sii" },
                { t: "Asistente con IA en WhatsApp", h: "/asistente-ia-whatsapp" },
                { t: "Convenios e integraciones", h: "/integraciones" },
              ].map((l) => (
                <li key={l.h}><Link href={l.h} className="inline-flex px-4 py-2 rounded-full bg-mist text-[14px] font-semibold text-text-secondary hover:bg-lime/30 hover:text-ink transition-colors">{l.t}</Link></li>
              ))}
            </ul>
          </div>
        </section>

        <CtaFinal origen="precios-final" />
      </main>
      <Footer />
    </>
  );
}

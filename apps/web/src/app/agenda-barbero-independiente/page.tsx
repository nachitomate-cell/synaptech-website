import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import FaqSeo   from "@/components/FaqSeo";
import { TarjetaPlan } from "@/components/Pricing";
import { HeroLanding, JsonLd, Puntos, Relacionados, BOTON, BOTON_BORDE } from "@/components/Landing";
import { INDEPENDIENTE, INDEPENDIENTE_IA, LOCAL, PRECIO, PRUEBA, fmt } from "@/content/precios";
import { competidor } from "@/content/competidores";
import { altaIA, agendaSinIA } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";
import { breadcrumbLd, grafo, planLd } from "@/lib/ld";

/* Agenda para barbero independiente (01-11-2026): presenta los planes
   Independiente ($9.990) e Independiente IA ($24.900).
   Búsquedas: "agenda para barbero independiente", "app para barbero
   independiente", "agenda online barbero", "barbero a domicilio agenda".
   No canibaliza: /barberias es "software para barberías" (equipo) y
   /agenda-con-ia/barberias es "agenda con IA para barberías". */

export const metadata = metaPagina({
  title: "Agenda para barbero independiente desde $9.990 | SynapTech",
  description: "App y agenda online para barbero independiente: reservas 24/7, caja, club en Wallet y asistente IA en tu WhatsApp. Plan Independiente $9.990 + IVA.",
  path: "/agenda-barbero-independiente",
});

const MIGAS = [{ nombre: "Precios", path: "/precios" }, { nombre: "Agenda para barbero independiente", path: "/agenda-barbero-independiente" }];

const LO_QUE_TRAE = [
  { t: "Tu link de reservas 24/7", d: "Tus clientes eligen servicio y hora desde tu Instagram o tu WhatsApp, sin escribirte. Con tus horas libres reales." },
  { t: "Tu agenda en el celular", d: "La app SynapTech Studio, en App Store y Google Play: ves el día, bloqueas horas y anotas una cita en segundos." },
  { t: "Caja y lo que ganaste", d: "Cada corte queda cobrado con su medio de pago. Gastos, fiados y por cobrar, y cuánto hiciste en el mes." },
  { t: "Abono al reservar", d: "Pide un abono con Mercado Pago o Webpay a quien suele fallar, y la hora queda tomada solo cuando paga." },
  { t: "Club de sellos en Wallet", d: "La tarjeta del cliente en Google Wallet o Apple Wallet: junta sellos con cada corte y vuelve por su premio." },
  { t: "A domicilio", d: "La reserva puede pedir la dirección del cliente, y queda en la cita para que llegues sin preguntar." },
  { t: "Tienda y productos", d: "Vende ceras, aceites o tu merch: el cliente los aparta para su cita o los compra en tu tienda online." },
  { t: "Portafolio y antes y después", d: "Tus mejores cortes en tu página, para que el cliente reserve viendo tu trabajo." },
  { t: "Reseñas en Google", d: "Después de cada corte, el pedido de reseña sale solo. Tu ficha de Google, con tu link de reservas." },
];

const keo = competidor("keoplanner");
const ab = competidor("agendabarber");
const novai = competidor("novai");

const FAQ = [
  { q: "¿Cuánto cuesta una agenda para barbero independiente?", a: `En SynapTech, el plan Independiente cuesta ${fmt(INDEPENDIENTE.mes)} + IVA al mes, con todo el panel para 1 profesional: reserva online, agenda en el celular, caja, club en Wallet, tienda y tu página. Con el asistente con IA en tu WhatsApp, el plan Independiente IA cuesta ${fmt(INDEPENDIENTE_IA.mes)} + IVA.` },
  { q: "¿Qué diferencia hay entre Independiente e Independiente IA?", a: `Los dos traen todo el panel. Independiente IA suma un asistente que responde y agenda en tu WhatsApp mientras cortas (${INDEPENDIENTE_IA.conversaciones} conversaciones al mes), los recordatorios de cita por WhatsApp desde tu número a quien los aceptó, Syna tu secretaria por WhatsApp y que el asistente venda tus productos.` },
  { q: "¿Hay una app para barbero independiente?", a: "Sí. SynapTech Studio está en App Store y Google Play: ves tu agenda del día, anotas citas, bloqueas horas y cobras desde el celular. Tus clientes reservan desde tu link, sin descargar nada." },
  { q: "¿Sirve si soy barbero a domicilio?", a: "Sí. La reserva puede pedir la dirección del cliente y queda en la cita. Ordenas tus horas por día y cobras un abono al reservar si quieres asegurar el traslado." },
  { q: "¿El asistente responde desde mi número de WhatsApp?", a: "Sí, en Independiente IA: Syna responde desde tu número, que sigue funcionando en tu teléfono, ofrece tus horas libres reales y deja la cita agendada. Puedes tomar cualquier chat cuando quieras." },
  { q: "¿Puedo emitir boletas?", a: `Sí, como adicional: ${fmt(PRECIO.boletasIndependiente)} + IVA al mes en los planes Independiente, sin costo de instalación. La boleta sale sola ante el SII al cerrar la cita.` },
  { q: "¿Qué pasa si sumo a alguien?", a: `Pasas al plan Local, ${fmt(LOCAL.mes)} + IVA al mes por local, con profesionales ilimitados y los módulos de equipo: comisiones, liquidaciones y metas por profesional.` },
  { q: "¿Se puede probar gratis?", a: `Sí, sin tarjeta: ${PRUEBA.sinIA} días en bioo.cl/agenda, o ${PRUEBA.conIA} días con el asistente con IA en crear.synaptechspa.cl. Al terminar eliges tu plan; no se cobra nada solo.` },
];

export default function Pagina() {
  return (
    <>
      <Header />
      <main>
        <JsonLd data={grafo(breadcrumbLd(MIGAS), planLd(INDEPENDIENTE), planLd(INDEPENDIENTE_IA))} />

        <HeroLanding migas={MIGAS} eyebrow="Para barberos que atienden solos"
          h1="Agenda para barbero independiente: tus clientes reservan solos, tú cortas."
          bajada={`Reserva online 24/7, tu agenda en el celular, caja y club de sellos en Wallet desde ${fmt(INDEPENDIENTE.mes)} + IVA al mes. Y si quieres que alguien conteste tu WhatsApp mientras atiendes, el asistente con IA viene en Independiente IA.`}>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={agendaSinIA("barbero-independiente-hero")} className={BOTON}>Probar {PRUEBA.sinIA} días gratis</a>
            <a href={altaIA("barbero-independiente-hero", "barberia")} className={BOTON_BORDE}>Probar {PRUEBA.conIA} días con IA</a>
          </div>
          <p className="mt-4 text-sm text-text-muted">No pedimos tarjeta para la prueba.</p>
        </HeroLanding>

        <section id="planes" className="py-16 md:py-24 bg-mist scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Dos planes para quien atiende solo</p>
              <h2 className="text-ink">Plan Independiente o Independiente IA.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Los dos traen todo el panel. La diferencia es el asistente con IA: responde y agenda en tu WhatsApp mientras atiendes.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
              <TarjetaPlan p={INDEPENDIENTE} />
              <TarjetaPlan p={INDEPENDIENTE_IA} />
            </div>
            <p className="text-sm text-text-muted mt-5">
              Precios netos; se suma IVA. Boletas ante el SII: {fmt(PRECIO.boletasIndependiente)} + IVA al mes como adicional. <Link href="/precios#comparativa" className="underline underline-offset-2 hover:text-ink">Qué trae cada plan, punto por punto</Link>.
            </p>
          </div>
        </section>

        <Puntos eyebrow="Lo que trae tu agenda" titulo="Todo lo que usa un barbero independiente, en un solo lugar." items={LO_QUE_TRAE} />

        {/* Frente a otras agendas para quien atiende solo */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="rounded-[28px] bg-ink text-white p-7 sm:p-10">
              <p className="text-lime text-xs font-bold uppercase tracking-[0.12em]">Con 1 profesional, al mes</p>
              <h2 className="text-white !text-[clamp(1.8rem,3vw,2.6rem)] mt-2">Cuánto cobran otras agendas por un barbero solo.</h2>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-[15px]">
                <li className="rounded-2xl bg-lime text-ink p-4"><b>SynapTech Independiente:</b> {fmt(INDEPENDIENTE.mes)} + IVA. Con asistente IA, {fmt(INDEPENDIENTE_IA.mes)} + IVA.</li>
                {[keo, ab, novai].filter(Boolean).map((c) => (
                  <li key={c!.id} className="rounded-2xl bg-white/[0.06] p-4">
                    <Link href={`/comparar/${c!.id}`} className="font-semibold hover:text-lime">{c!.nombre}:</Link> {c!.precios[0].valor}{c!.precios[0].nota ? ` (${c!.precios[0].nota})` : ""}.
                  </li>
                ))}
              </ul>
              <p className="text-white/55 text-sm mt-5">Precios publicados en el sitio de cada empresa, revisados el 1 de noviembre de 2026. <Link href="/comparar/precios" className="underline underline-offset-2 hover:text-white">Todas las agendas con 1, 3, 6 y 9 profesionales</Link>.</p>
            </div>
          </div>
        </section>

        <FaqSeo titulo="Agenda para barbero independiente: preguntas frecuentes." preguntas={FAQ} />

        <Relacionados links={[
          { texto: "Todos los precios", href: "/precios" },
          { texto: "Software para barberías con equipo", href: "/barberias" },
          { texto: "Agenda con IA para barberías", href: "/agenda-con-ia/barberias" },
          { texto: "Boletas electrónicas SII", href: "/boletas-electronicas-sii" },
          { texto: "App para barberos", href: "/funciones/app-para-profesionales" },
        ]} />
      </main>
      <Footer />
    </>
  );
}

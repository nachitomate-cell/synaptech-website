import Image from "next/image";
import Link from "next/link";
import Header  from "@/components/Header";
import Footer  from "@/components/Footer";
import FaqSeo, { type Pregunta } from "@/components/FaqSeo";
import Aparece from "@/components/Aparece";
import EnlacesAgencias from "@/components/EnlacesAgencias";
import { JsonLd, Migas } from "@/components/Landing";
import { LinkWhatsAppConRef } from "@/components/CtaWhatsAppComparar";
import { IconoWa, PlanesAgencia } from "@/components/PlanesAgencia";
import { AGENCIA_EQUIPO, AGENCIA_SOLO, adicionalAgencia } from "@/content/agencias";
import { fmt } from "@/content/precios";
import { metaPagina } from "@/lib/seo";
import { breadcrumbLd, grafo, servicioAgenciaLd } from "@/lib/ld";

/* /crm-whatsapp (09-11-2026): para "CRM de WhatsApp", "CRM para WhatsApp con
   IA" y "embudo de ventas WhatsApp". Ninguna página del sitio iba por esa
   intención (/integraciones solo aclara que no nos conectamos a otro CRM).
   Lo que se muestra es lo que trae el plan Agencia Equipo: embudo por etapas
   (content/recorrido.ts, MODULOS_AGENCIA), cartera por vendedor, cierre desde
   el chat, comisiones y seguimiento. NO se promete: conexión con otros CRM,
   correo, SMS ni cobro dentro del chat. */

const PATH = "/crm-whatsapp";
const MIGAS = [{ nombre: "CRM de WhatsApp", path: PATH }];
const EXTRA = adicionalAgencia("conversaciones");
const IG = adicionalAgencia("instagram");

export const metadata = metaPagina({
  title: "CRM de WhatsApp con IA para equipos de venta | SynapTech",
  description: "Embudo de ventas, cartera por vendedor, cierre desde el chat y comisiones calculadas solas, con un asistente con IA que responde tu WhatsApp e Instagram.",
  path: PATH,
  imagen: "/og/agencias/crm-whatsapp",
});

const MODULOS = [
  {
    id: "embudo",
    titulo: "Embudo de ventas",
    detalle: "Cada conversación es un cliente en una etapa: nuevos, cotizados, reservados, cerrados y perdidos. Lo mueves arrastrándolo, y arriba ves cuántos conversaron, cuántos quedaron sin trabajar y cuántos cerraron en el período.",
  },
  {
    id: "cartera",
    titulo: "Cartera por vendedor",
    detalle: "Las conversaciones nuevas se reparten solas, por turnos, y a cada vendedor le llega el aviso al celular. Cada uno ve sus chats, su embudo y sus comisiones. El dueño ve todo y puede reasignar.",
  },
  {
    id: "cierre",
    titulo: "Cierre de venta desde el chat",
    detalle: "Sin cambiar de pantalla ni copiar datos a una planilla: el vendedor cierra la venta en la misma conversación, con el monto y el número de personas.",
  },
  {
    id: "comisiones",
    titulo: "Comisiones calculadas solas",
    detalle: "Lo que se paga a terceros, como entradas o tickets, se descuenta antes. A fin de mes ves cuánto vendió cada vendedor y cuánto le corresponde, y lo bajas en Excel para pagar.",
  },
  {
    id: "seguimiento",
    titulo: "Seguimiento",
    detalle: "A las 48 horas el asistente le pregunta una vez «¿sigues interesado?» a quien dejó de responder, y no le escribe si dijo que no. Desde el tablero, además, haces seguimiento en lote a quienes escribieron en las últimas 24 horas.",
  },
  {
    id: "anuncios",
    titulo: "Resultados de tus anuncios",
    detalle: "Cuántas personas escribieron desde tus anuncios de Meta y cuánto invertiste, al lado de lo que vendiste.",
  },
];

const NO_HACE = [
  "No se conecta con otros CRM: el embudo, las carteras y las comisiones viven en SynapTech.",
  "No manda correos ni SMS. Los canales son WhatsApp e Instagram.",
  "No cobra dentro del chat. El pago lo coordina tu vendedor como lo hace hoy.",
  "No hace llamadas.",
];

const FAQ: Pregunta[] = [
  { q: "¿Qué es un CRM de WhatsApp?", a: "Es un sistema donde cada conversación de WhatsApp queda como un cliente, con su historial, su vendedor responsable y la etapa de la venta en que va. Sirve para saber en qué quedó cada cliente sin revisar el teléfono chat por chat." },
  { q: "¿Cuáles son las etapas del embudo?", a: "Nuevos, cotizados, reservados, cerrados y perdidos. Cada cliente está en una columna y lo mueves arrastrándolo. Puedes ver el embudo de todo el equipo o el de cada vendedor." },
  { q: "¿Cada vendedor ve solo sus clientes?", a: "Sí. Cada vendedor entra con su usuario, desde el panel o la app, y ve sus conversaciones, su embudo y sus comisiones. El dueño ve todo y puede cambiar a quién está asignado un cliente." },
  { q: "¿Cómo se calculan las comisiones?", a: "Al cerrar la venta queda el monto. Lo que se paga a terceros se descuenta antes de calcular la comisión, y a fin de mes ves cuánto le corresponde a cada vendedor, con una planilla en Excel para pagar." },
  { q: "¿Se conecta con otro CRM que ya uso?", a: "No. El embudo, las carteras y las comisiones viven en SynapTech. Si hoy llevas las ventas en una planilla, el tablero la reemplaza." },
  { q: "¿Cuánto cuesta?", a: `El CRM con reparto, cartera por vendedor, cierre y comisiones viene en ${AGENCIA_EQUIPO.nombre}: ${fmt(AGENCIA_EQUIPO.mes)} + IVA al mes, con el asistente en WhatsApp e Instagram, ${AGENCIA_EQUIPO.conversaciones} conversaciones y vendedores ilimitados. Si vendes solo, ${AGENCIA_SOLO.nombre} cuesta ${fmt(AGENCIA_SOLO.mes)} + IVA, con tablero de ventas. Conversaciones extra: ${fmt(EXTRA.mes)} + IVA cada 100; Instagram en ${AGENCIA_SOLO.nombre}: ${fmt(IG.mes)} + IVA.` },
];

const REEMPLAZOS: [string, string][] = [
  ["Vendedoras ilimitadas, cada una", "Vendedores ilimitados, cada uno"],
  ["Las mismas vendedoras", "Los mismos vendedores"],
  ["vendedoras", "vendedores"],
  ["vendedora", "vendedor"],
  ["con monto y pasajeros", "con monto y número de personas"],
  ["tengo una agencia con más de una marca", "vendo con más de una marca"],
  ["tengo una agencia y", "vi la página del CRM de WhatsApp y"],
];

const LINK = "font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink";

export default function CrmWhatsappPage() {
  const jsonLd = grafo(
    breadcrumbLd(MIGAS),
    servicioAgenciaLd({
      nombre: "CRM de WhatsApp con IA de SynapTech",
      tipo: "CRM de WhatsApp con asistente de IA para equipos de venta",
      descripcion: "Embudo de ventas por etapas (nuevos, cotizados, reservados, cerrados y perdidos) a partir de las conversaciones de WhatsApp e Instagram, reparto automático entre vendedores con aviso al celular, cartera por vendedor, cierre de venta desde el chat con monto y número de personas, comisiones calculadas a fin de mes y seguimiento automático a las 48 horas. Un asistente con IA responde los chats en español, portugués e inglés.",
      path: PATH,
      audiencia: "Equipos de venta que atienden por WhatsApp e Instagram",
    }),
  );

  return (
    <>
      <Header />
      <main>
        <JsonLd data={jsonLd} />

        <section className="pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1fr_1.08fr] gap-12 items-center">
            <div className="min-w-0">
              <Migas migas={MIGAS} />
              <p className="eyebrow mb-5">CRM de WhatsApp</p>
              <h1 className="text-ink mb-6 !text-[clamp(2.1rem,4.4vw,3.8rem)]">CRM de WhatsApp con IA para equipos de venta.</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-8">
                Cada conversación de WhatsApp e Instagram queda como un cliente en tu embudo, asignada a un vendedor, con su
                historial y su etapa. El asistente responde y hace seguimiento; tu equipo cierra.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <LinkWhatsAppConRef texto="Hola, vi la página del CRM de WhatsApp y quiero saber cómo funciona para mi equipo de ventas"
                  className="inline-flex justify-center items-center gap-2 text-center bg-lime text-ink font-semibold px-7 py-4 rounded-full hover:bg-ink hover:text-white transition-colors">
                  <IconoWa /> Hablar por WhatsApp
                </LinkWhatsAppConRef>
                <a href="#planes" className="inline-flex justify-center items-center text-center border border-ink/15 bg-white text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">Ver planes y precios</a>
              </div>
              <p className="mt-4 text-sm text-text-muted">{AGENCIA_EQUIPO.nombre}: {fmt(AGENCIA_EQUIPO.mes)} + IVA al mes, vendedores ilimitados. 30 días de prueba.</p>
            </div>
            <div className="min-w-0">
              <div className="hero-entra rounded-[28px] bg-lime/20 p-2.5 sm:p-4">
                <Image src="/panel/agencia-embudo.webp" alt="Embudo de ventas con clientes de WhatsApp e Instagram en etapas, por vendedora"
                  width={2880} height={1800} priority sizes="(min-width: 1024px) 620px, 92vw"
                  className="w-full h-auto rounded-xl border border-border-subtle shadow-card-hover" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-mist">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Aparece>
              <p className="eyebrow mb-4">Qué es</p>
              <h2 className="text-ink">Un CRM que nace del chat, no de una planilla.</h2>
            </Aparece>
            <div className="mt-6 space-y-5 text-text-secondary text-lg leading-relaxed">
              <p>
                Un CRM de WhatsApp es un sistema donde cada conversación queda como un cliente: con su historial, su vendedor
                responsable y la etapa de la venta en que va. Así sabes en qué quedó cada uno sin revisar el teléfono chat por chat.
              </p>
              <p>
                En SynapTech el CRM y el chat son lo mismo. No hay que copiar datos de WhatsApp a otro sistema: el cliente entra al
                embudo cuando escribe, un asistente con IA le responde y el vendedor cierra la venta desde la misma conversación.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <Aparece className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Lo que trae</p>
              <h2 className="text-ink">Del primer mensaje a la comisión pagada.</h2>
            </Aparece>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MODULOS.map((m, i) => (
                <article key={m.id} id={m.id} className="rounded-[28px] border border-border-subtle p-7 scroll-mt-24">
                  <p className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-display font-bold text-ink text-xl tracking-tight mt-2">{m.titulo}</h3>
                  <p className="text-text-secondary mt-3 leading-relaxed">{m.detalle}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 grid lg:grid-cols-2 gap-5 items-start">
              <Image src="/panel/agencia-reparto.webp" alt="Reparto automático de conversaciones entre vendedoras, con quién atiende a cada cliente"
                width={2880} height={1800} sizes="(min-width: 1024px) 600px, 92vw"
                className="w-full h-auto rounded-xl border border-border-subtle" />
              <Image src="/panel/agencia-comisiones.webp" alt="Comisiones del mes por vendedora, con cada cierre explicado"
                width={2880} height={1800} sizes="(min-width: 1024px) 600px, 92vw"
                className="w-full h-auto rounded-xl border border-border-subtle" />
            </div>
            <p className="mt-4 text-[13px] text-text-muted">Capturas de una agencia de ejemplo con datos inventados.</p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-10">
            <div>
              <p className="eyebrow mb-4">Para que no haya sorpresas</p>
              <h2 className="text-ink !text-[clamp(1.6rem,3vw,2.25rem)]">Lo que no hace.</h2>
              <ul className="mt-6 space-y-3 text-text-secondary text-lg leading-relaxed list-disc pl-6 marker:text-accent">
                {NO_HACE.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4">Sigue leyendo</p>
              <h2 className="text-ink !text-[clamp(1.6rem,3vw,2.25rem)]">El chat y el equipo.</h2>
              <ul className="mt-6 space-y-3 text-lg">
                <li><Link href="/agente-ia-omnicanal" className={LINK}>Agente de IA omnicanal: WhatsApp e Instagram en una bandeja</Link></li>
                <li><Link href="/guias/repartir-chats-de-whatsapp-entre-vendedores" className={LINK}>Guía: cómo repartir los chats entre vendedores</Link></li>
                <li><Link href="/agencias" className={LINK}>Planes para agencias de viaje y turismo</Link></li>
                <li><Link href="/empresas" className={LINK}>Agente de IA para empresas</Link></li>
                <li><Link href="/asistente-ia-whatsapp" className={LINK}>Asistente con IA que agenda por WhatsApp</Link></li>
              </ul>
            </div>
          </div>
        </section>

        <EnlacesAgencias eyebrow="Por rubro" titulo="Cómo lo usa cada tipo de agencia."
          bajada="Corredoras de propiedades, de seguros, automotoras, agencias de viajes y más: el mismo CRM, con ejemplos de cada rubro." />

        <PlanesAgencia reemplazos={REEMPLAZOS}
          titulo="El CRM viene en los planes para agencias."
          bajada={`Precios netos en pesos chilenos, más IVA. El reparto, la cartera por vendedor y las comisiones vienen en ${AGENCIA_EQUIPO.nombre}.`} />

        <FaqSeo titulo="CRM de WhatsApp: preguntas frecuentes." preguntas={FAQ} />

        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="text-[13px] leading-relaxed text-text-muted">
              Precios netos en pesos chilenos, más IVA. Una conversación es un cliente durante 24 horas. Instalación sin costo, 30 días de prueba y sin permanencia.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

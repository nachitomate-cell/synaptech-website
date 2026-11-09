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

/* /agente-ia-omnicanal (09-11-2026): para quien busca "agente de IA",
   "omnicanal / omnicanalidad" o "WhatsApp e Instagram en una bandeja". No hay
   otra página con esa intención: /empresas va por "agente de IA para empresas"
   (qué tareas delega) y /syna por los canales de un local que caen en la
   agenda. Esta explica la bandeja compartida entre el agente y el equipo de
   ventas, con los planes de agencias (content/agencias.ts).
   Omnicanal acá son DOS canales: WhatsApp (el número propio, por QR) y los
   mensajes directos de Instagram. Nada de correo, SMS, Messenger ni chat web. */

const PATH = "/agente-ia-omnicanal";
const MIGAS = [{ nombre: "Agente de IA omnicanal", path: PATH }];
const IG = adicionalAgencia("instagram");
const EXTRA = adicionalAgencia("conversaciones");

export const metadata = metaPagina({
  title: "Agente de IA omnicanal para WhatsApp e Instagram | SynapTech",
  description: `Agente de IA que responde WhatsApp e Instagram en una bandeja, reparte los chats entre vendedores y deja cada venta en un tablero. Desde ${fmt(AGENCIA_SOLO.mes)} + IVA.`,
  path: PATH,
  imagen: "/og/agencias/agente-ia-omnicanal",
});

const PASOS = [
  { titulo: "Llega el mensaje", detalle: "El cliente escribe a tu WhatsApp o a tu Instagram. Las dos conversaciones entran a la misma bandeja, cada una con su historial." },
  { titulo: "Responde el agente", detalle: "Contesta al minuto con tu catálogo, tus precios y tus reglas, en español, portugués o inglés, según cómo escriba el cliente." },
  { titulo: "Se asigna a un vendedor", detalle: "Cada conversación nueva va a un vendedor por turnos, y le llega el aviso al celular. Cada uno ve solo su cartera." },
  { titulo: "Una persona toma el chat", detalle: "El vendedor puede entrar a cualquier conversación cuando quiera. Tú decides si con un cliente responde el agente, responde una persona o el agente no le escribe nunca." },
  { titulo: "Se cierra la venta", detalle: "Desde el mismo chat, con el monto y el número de personas. La venta queda en el tablero y la comisión del vendedor se calcula sola." },
  { titulo: "Nadie queda olvidado", detalle: "Si el cliente deja de responder, a las 48 horas el agente le pregunta una vez si sigue interesado. Si dijo que no, no le escribe." },
];

const PIEZAS = [
  { titulo: "Bandeja única", detalle: "WhatsApp e Instagram juntos, en el panel y en la app del equipo. La bandeja marca hace cuánto espera cada cliente." },
  { titulo: "Reparto a vendedores", detalle: "Automático y por turnos, con aviso al celular de quien le toca. El dueño ve todo y puede cambiar a quién está asignado un cliente." },
  { titulo: "Tablero de ventas", detalle: "Cada conversación en su etapa: nuevos, cotizados, reservados, cerrados y perdidos. Por vendedor y por período." },
  { titulo: "Seguimiento", detalle: "El de las 48 horas, solo, y uno en lote desde el tablero para quienes escribieron en las últimas 24 horas." },
  { titulo: "Comisiones", detalle: "Al cerrar una venta queda el monto. A fin de mes, la comisión de cada vendedor está calculada." },
  { titulo: "Resultados de tus anuncios", detalle: "Cuántas personas escribieron desde tus anuncios de Meta y cuánto invertiste, en el mismo panel." },
];

const COMPARACION: [string, string, string][] = [
  ["Cómo entiende", "Por palabras clave o menús de opciones", "Lee el mensaje completo, aunque venga con faltas o en otro idioma"],
  ["Qué responde", "Textos escritos de antemano", "Arma la respuesta con tu catálogo, tus precios y tus reglas"],
  ["Qué hace después", "Manda el siguiente mensaje del menú", "Pide los datos que definiste y le pasa la conversación a una persona"],
  ["Canales", "Normalmente uno", "WhatsApp e Instagram, en la misma bandeja"],
];

const FAQ: Pregunta[] = [
  { q: "¿Qué es un agente de IA omnicanal?", a: "Es un asistente con inteligencia artificial que responde a tus clientes en más de un canal y deja todas esas conversaciones en una sola bandeja, donde también trabaja tu equipo. En SynapTech los canales son WhatsApp e Instagram." },
  { q: "¿Qué canales incluye?", a: "El WhatsApp de tu negocio, conectado con un código QR, y los mensajes directos de tu cuenta de Instagram. No incluye correo, SMS, Facebook Messenger ni chat en tu página web." },
  { q: "¿Mis vendedores responden en la misma bandeja?", a: "Sí. Cada vendedor entra desde el panel o desde la app, ve las conversaciones que le tocan y puede tomar cualquiera cuando quiera. El agente y las personas trabajan sobre los mismos chats." },
  { q: "¿Funciona con mi número de WhatsApp actual?", a: "Sí. Conectamos tu WhatsApp de siempre con un código QR y tus clientes te siguen escribiendo al mismo número." },
  { q: "¿En qué se diferencia de las respuestas automáticas de WhatsApp Business?", a: "Las respuestas automáticas de WhatsApp Business son siempre el mismo texto. El agente lee lo que le preguntan, responde con tu catálogo, pide los datos que necesitas y le pasa la conversación al vendedor que le toca." },
  { q: "¿Cuánto cuesta?", a: `${AGENCIA_SOLO.nombre} cuesta ${fmt(AGENCIA_SOLO.mes)} + IVA al mes, con el agente en WhatsApp y ${AGENCIA_SOLO.conversaciones} conversaciones; Instagram se suma por ${fmt(IG.mes)} + IVA. ${AGENCIA_EQUIPO.nombre} cuesta ${fmt(AGENCIA_EQUIPO.mes)} + IVA al mes, con WhatsApp e Instagram, ${AGENCIA_EQUIPO.conversaciones} conversaciones y vendedores ilimitados. Las conversaciones extra cuestan ${fmt(EXTRA.mes)} + IVA cada 100.` },
];

const REEMPLAZOS: [string, string][] = [
  ["Vendedoras ilimitadas, cada una", "Vendedores ilimitados, cada uno"],
  ["Las mismas vendedoras", "Los mismos vendedores"],
  ["vendedoras", "vendedores"],
  ["vendedora", "vendedor"],
  ["con monto y pasajeros", "con monto y número de personas"],
  ["tengo una agencia con más de una marca", "vendo con más de una marca"],
  ["tengo una agencia y", "vi la página del agente omnicanal y"],
];

const LINK = "font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink";

export default function AgenteOmnicanalPage() {
  const jsonLd = grafo(
    breadcrumbLd(MIGAS),
    servicioAgenciaLd({
      nombre: "Agente de IA omnicanal de SynapTech",
      tipo: "Agente de IA omnicanal para WhatsApp e Instagram",
      descripcion: "Asistente con IA que responde el WhatsApp propio del negocio y los mensajes directos de Instagram en una sola bandeja compartida con el equipo de ventas: reparto automático de chats entre vendedores con aviso al celular, tablero de ventas por etapas, cierre de venta desde el chat, comisiones por vendedor y seguimiento a las 48 horas. Responde en español, portugués e inglés.",
      path: PATH,
      audiencia: "Agencias y equipos de venta que atienden por WhatsApp e Instagram",
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
              <p className="eyebrow mb-5">Agente de IA omnicanal</p>
              <h1 className="text-ink mb-6 !text-[clamp(2.1rem,4.4vw,3.8rem)]">Agente de IA omnicanal: WhatsApp e Instagram en una sola bandeja.</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-8">
                Tus clientes escriben por WhatsApp o por Instagram. El agente responde los dos canales con tu catálogo,
                y tu equipo trabaja todas las conversaciones desde una sola bandeja, en el panel o en la app.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <LinkWhatsAppConRef texto="Hola, vi la página del agente omnicanal y quiero saber cómo funciona para mi equipo de ventas"
                  className="inline-flex justify-center items-center gap-2 text-center bg-lime text-ink font-semibold px-7 py-4 rounded-full hover:bg-ink hover:text-white transition-colors">
                  <IconoWa /> Hablar por WhatsApp
                </LinkWhatsAppConRef>
                <a href="#planes" className="inline-flex justify-center items-center text-center border border-ink/15 bg-white text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">Ver planes y precios</a>
              </div>
              <p className="mt-4 text-sm text-text-muted">Desde {fmt(AGENCIA_SOLO.mes)} + IVA al mes. 30 días de prueba y sin permanencia.</p>
            </div>
            <div className="min-w-0">
              <div className="hero-entra rounded-[28px] bg-lime/20 p-2.5 sm:p-4">
                <Image src="/panel/agencia-bandeja.webp" alt="Bandeja con conversaciones de WhatsApp e Instagram, atendidas por el agente de IA y por vendedores"
                  width={2880} height={1800} priority sizes="(min-width: 1024px) 620px, 92vw"
                  className="w-full h-auto rounded-xl border border-border-subtle shadow-card-hover" />
              </div>
            </div>
          </div>
        </section>

        {/* Definición */}
        <section className="py-16 md:py-20 bg-mist">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Aparece>
              <p className="eyebrow mb-4">Qué significa</p>
              <h2 className="text-ink">Omnicanal: no importa por dónde escriba el cliente.</h2>
            </Aparece>
            <div className="mt-6 space-y-5 text-text-secondary text-lg leading-relaxed">
              <p>
                Un agente de IA omnicanal es un asistente con inteligencia artificial que responde en más de un canal y deja todas
                las conversaciones en un mismo lugar, con su historial, para que las atienda el mismo equipo con las mismas reglas.
              </p>
              <p>
                En SynapTech son dos canales: el WhatsApp de tu negocio, conectado con un código QR, y los mensajes directos de tu
                cuenta de Instagram. Hoy no incluye correo, SMS, Facebook Messenger ni chat en tu página web.
              </p>
              <p>
                Lo que lo hace distinto de tener WhatsApp en un teléfono e Instagram en otro es la bandeja compartida: cada
                conversación tiene un responsable, el agente responde lo repetitivo y las personas toman lo que necesita a una persona.
              </p>
            </div>
          </div>
        </section>

        {/* Cómo trabajan juntos */}
        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <Aparece className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Paso a paso</p>
              <h2 className="text-ink">Cómo trabajan el agente y tu equipo en la misma bandeja.</h2>
            </Aparece>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PASOS.map((p, i) => (
                <li key={p.titulo} className="rounded-[28px] border border-border-subtle p-7">
                  <p className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-display font-bold text-ink text-xl tracking-tight mt-2">{p.titulo}</h3>
                  <p className="text-text-secondary mt-3 leading-relaxed">{p.detalle}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Lo que trae */}
        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <Aparece className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Lo que trae</p>
              <h2 className="text-ink">Más que un chatbot: el equipo de ventas completo.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                El reparto, el tablero y las comisiones están explicados en detalle en el{" "}
                <Link href="/crm-whatsapp" className={LINK}>CRM de WhatsApp</Link>.
              </p>
            </Aparece>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PIEZAS.map((p) => (
                <article key={p.titulo} className="rounded-[28px] bg-white p-7">
                  <h3 className="font-display font-bold text-ink text-xl tracking-tight">{p.titulo}</h3>
                  <p className="text-text-secondary mt-3 leading-relaxed">{p.detalle}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-text-secondary leading-relaxed max-w-3xl">
              Y para el dueño, Syna: tu secretaria por WhatsApp, a la que le preguntas cómo va el día.
            </p>
          </div>
        </section>

        {/* Agente vs chatbot */}
        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <Aparece className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Agente o chatbot</p>
              <h2 className="text-ink">Un chatbot sigue un menú. Un agente de IA entiende.</h2>
            </Aparece>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[560px] text-[15px] border-separate border-spacing-0 rounded-[20px] overflow-hidden border border-border-subtle">
                <caption className="sr-only">Diferencias entre un chatbot de respuestas fijas y un agente de IA</caption>
                <thead>
                  <tr>
                    <th scope="col" className="text-left px-4 py-3 font-semibold bg-mist text-ink"><span className="sr-only">Tema</span></th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold bg-mist text-ink">Chatbot de respuestas fijas</th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold bg-ink text-white">Agente de IA omnicanal</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARACION.map(([tema, bot, agente]) => (
                    <tr key={tema}>
                      <th scope="row" className="text-left align-top px-4 py-3 border-t border-border-subtle font-semibold text-ink">{tema}</th>
                      <td className="align-top px-4 py-3 border-t border-border-subtle text-text-secondary">{bot}</td>
                      <td className="align-top px-4 py-3 border-t border-border-subtle text-ink">{agente}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-text-secondary leading-relaxed max-w-3xl">
              Más en la guía{" "}
              <Link href="/guias/que-es-un-agente-de-ia-omnicanal" className={LINK}>qué es un agente de IA omnicanal</Link>.
              Si tu empresa necesita que el agente también agende o cobre, mira el{" "}
              <Link href="/empresas" className={LINK}>agente de IA para empresas</Link> y el{" "}
              <Link href="/asistente-ia-whatsapp" className={LINK}>asistente que agenda por WhatsApp</Link>.
            </p>
          </div>
        </section>

        <EnlacesAgencias fondo="bg-mist" eyebrow="Para quién es" titulo="Para agencias y equipos que venden por WhatsApp."
          bajada="Cada página cuenta cómo se usa en ese rubro, con ejemplos y preguntas frecuentes." />

        <PlanesAgencia reemplazos={REEMPLAZOS}
          titulo="Los planes del agente omnicanal."
          bajada={`Precios netos en pesos chilenos, más IVA. ${AGENCIA_SOLO.nombre} trae el agente en WhatsApp; ${AGENCIA_EQUIPO.nombre} suma Instagram, vendedores ilimitados y reparto automático.`} />

        <FaqSeo titulo="Agente de IA omnicanal: preguntas frecuentes." preguntas={FAQ} />

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

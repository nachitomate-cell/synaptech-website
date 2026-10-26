import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqSeo, { type Pregunta } from "@/components/FaqSeo";
import { Dolores, type Dolor } from "@/components/Rubro";
import { HeroIA, PasosIA, CifrasIA, EjemplosIA, Despues30, CtaIA } from "@/components/AltaIA";
import { RUBROS_IA, PRO_IA } from "@/content/alta-ia";
import { metaPagina } from "@/lib/seo";

/* Landing principal del alta con asistente IA (21-10-2026): lleva a
   crear.synaptechspa.cl (30 días gratis del plan Pro con Syna encendido).
   Lo que afirma sale de /asistente-ia-whatsapp y de content/alta-ia.ts. */
export const metadata = metaPagina({
  title: "Agenda con asistente de IA: 30 días gratis | SynapTech",
  description: "Crea tu agenda con Syna, el asistente de IA que responde y agenda por WhatsApp desde el número de tu local. 30 días gratis del plan Pro.",
  path: "/agenda-con-asistente-ia",
});

const QUE_HACE: Dolor[] = [
  { dolor: "Mensajes que llegan mientras atiendes", solucion: "Responde desde tu número", detalle: "Syna contesta desde el número de tu local, que sigue funcionando en tu teléfono." },
  { dolor: "Ir y volver entre WhatsApp y la agenda", solucion: "Muestra horas libres reales", detalle: "Ofrece las horas que de verdad están libres de cada profesional y deja la cita agendada." },
  { dolor: "Miedo a que invente precios", solucion: "Usa tu catálogo", detalle: "No inventa precios: responde con los servicios y valores que tú cargaste." },
  { dolor: "Pedir los datos uno por uno", solucion: "Pide lo que tú definas", detalle: "Nombre completo, RUT u otros datos, antes de confirmar la hora." },
  { dolor: "Conversaciones que se complican", solucion: "Te pasa el chat y avisa", detalle: "Le pasa la conversación a una persona de tu equipo y te avisa." },
  { dolor: "Perder el control de tu WhatsApp", solucion: "Tomas el control cuando quieras", detalle: "Puedes entrar a cualquier chat y responder tú. Funciona con Claude, de Anthropic." },
];

const FAQ: Pregunta[] = [
  { q: "¿Qué es la agenda con asistente de IA?", a: "Es tu agenda online de SynapTech con Syna encendido desde el primer día: un asistente que responde tu WhatsApp, ofrece las horas libres reales de cada profesional y deja la cita agendada." },
  { q: "¿Cuánto cuesta?", a: `Los primeros 30 días son gratis, con todo el plan Pro. Después, el plan Pro cuesta ${PRO_IA.precio} por local, con ${PRO_IA.conversaciones} conversaciones al mes incluidas.` },
  { q: "¿Qué pasa si no pago al terminar la prueba?", a: "No se cobra nada solo: no pedimos tarjeta para la prueba. Antes de que termine te escribimos para que elijas tu plan." },
  { q: "¿Escribe desde mi número de WhatsApp?", a: "Sí. Vinculas tu WhatsApp escaneando un QR y Syna responde desde el número de tu local, que sigue funcionando en tu teléfono. Puedes tomar el control de cualquier chat." },
  { q: "¿Puede inventar precios u horarios?", a: "No. Responde con tu catálogo y la agenda real de cada profesional. Si algo se complica, pasa la conversación a una persona y avisa." },
  { q: "¿Qué inteligencia artificial usa?", a: "Syna funciona con Claude, de Anthropic." },
];

export default function Pagina() {
  return (
    <>
      <Header />
      <main>
        <HeroIA
          eyebrow="Agenda + asistente de IA para WhatsApp"
          titulo="Crea tu agenda con asistente de IA. 30 días gratis."
          bajada="Syna responde el WhatsApp de tu local, ofrece tus horas libres reales y agenda por ti. No pedimos tarjeta para la prueba."
          origen="ia-landing"
          chat={RUBROS_IA[0].ejemplos[0]}
        />
        <PasosIA />
        <Dolores titulo="Lo que hace Syna por tu local." items={QUE_HACE} />
        <CifrasIA />
        <EjemplosIA titulo="Conversaciones que Syna resuelve sola." ejemplos={[RUBROS_IA[1].ejemplos[0], RUBROS_IA[4].ejemplos[0], RUBROS_IA[5].ejemplos[1]]} />
        <Despues30 origen="ia-landing" />

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-8">
              <p className="eyebrow mb-4">Por rubro</p>
              <h2 className="text-ink">Agenda con IA para tu rubro.</h2>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {RUBROS_IA.map((r) => (
                <li key={r.slug}>
                  <Link href={`/agenda-con-ia/${r.slug}`} className="block h-full rounded-[20px] bg-mist p-5 hover:bg-lime/30 transition-colors">
                    <span className="font-display font-bold text-ink text-lg tracking-tight">{r.nombre}</span>
                    <span className="block text-sm text-text-secondary mt-1">Agenda con asistente IA para {r.plural} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FaqSeo titulo="Agenda con asistente de IA: lo que más nos preguntan." preguntas={FAQ} />
        <CtaIA titulo="Tu WhatsApp, respondido desde hoy." bajada="Crea tu agenda en minutos y deja que Syna responda y agende por ti. 30 días gratis del plan Pro." origen="ia-landing" />
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import Header    from "@/components/Header";
import Footer    from "@/components/Footer";
import Recorrido from "@/components/Recorrido";
import Pricing   from "@/components/Pricing";
import CtaFinal  from "@/components/CtaFinal";
import FaqSeo    from "@/components/FaqSeo";
import { HeroRubro, Dolores, type Dolor } from "@/components/Rubro";
import { FilaCapsulas } from "@/components/Capsulas";
import { MODULOS } from "@/content/recorrido";
import { FAQ_ASISTENTE } from "@/content/faq-rubros";
import { metaPagina } from "@/lib/seo";

/* Página propia del asistente (09-10-2026). "chatbot WhatsApp para agendar
   citas" y "sistema de reservas por WhatsApp" tienen demanda en Chile y hoy
   las ganan sitios extranjeros o genéricos; AgendaPro y Agendapia ya tienen
   su URL para su IA. Todo lo que dice está en content/recorrido.ts (módulo
   asistente) y en la lista de precios. */
export const metadata = metaPagina({
  title: "Asistente IA que agenda citas por WhatsApp | SynapTech",
  description: "Syna responde a tus clientes por WhatsApp desde el número de tu local, ofrece las horas libres y agenda sola. Incluido en el plan Pro, $49.900 + IVA.",
  path: "/asistente-ia-whatsapp",
});

const DOLORES: Dolor[] = [
  { dolor: "Mensajes que llegan mientras atiendes", solucion: "Responde al instante", detalle: "Syna contesta precios, horarios y dudas con tu catálogo, de día, de noche y los domingos." },
  { dolor: "Ir y volver entre WhatsApp y la agenda", solucion: "Agenda dentro del chat", detalle: "Ofrece las horas que de verdad están libres y deja la cita agendada, sin topes con las reservas online." },
  { dolor: "Pedir los datos uno por uno", solucion: "Pide lo que tú definas", detalle: "Nombre completo, RUT u otros datos, en el orden que elijas, antes de confirmar la hora." },
  { dolor: "Miedo a que responda cualquier cosa", solucion: "Te pasa la conversación", detalle: "Si algo se complica o es un tema que no quieres delegar, avisa a tu equipo y lo deja en sus manos." },
];

export default function AsistentePage() {
  const asistente = MODULOS.filter((m) => m.id === "asistente");
  return (
    <>
      <Header />
      <main>
        <HeroRubro
          eyebrow="Asistente con IA para WhatsApp"
          titulo="Un asistente con IA que agenda citas por WhatsApp."
          bajada="Syna responde a tus clientes desde el número de tu local, ofrece las horas libres y deja la cita agendada. Tú sigues usando tu WhatsApp en tu teléfono, y tomas la conversación cuando quieras."
          origen="asistente-hero"
          mensajeWa="Hola, quiero ver el asistente de WhatsApp de SynapTech"
          escritorio={{ src: "/panel/clinica-asistente.webp", alt: "Bandeja con el asistente pidiendo datos y agendando a una clienta por WhatsApp", w: 2880, h: 1800 }}
        />

        <Dolores titulo="Lo que hace Syna por tu local." items={DOLORES} />

        {asistente.map((m) => (
          <section key={m.id} className="py-16 md:py-24 bg-mist">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <div className="max-w-3xl mb-6">
                <p className="eyebrow mb-3">Paso a paso</p>
                <h2 className="text-ink">{m.titular}</h2>
                <p className="text-text-secondary text-lg mt-4 leading-relaxed">{m.bajada}</p>
              </div>
              <Recorrido modulo={m} />
            </div>
          </section>
        ))}

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="eyebrow mb-4">En video</p>
              <h2 className="text-ink">Tu WhatsApp en piloto automático.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Funciona con Claude, de Anthropic, y responde con tu catálogo y la agenda real de cada
                profesional: no inventa precios ni horarios. ¿Quieres compararlo con otras agendas?
              </p>
              <Link href="/comparar#numero-propio" className="inline-flex items-center gap-1.5 mt-6 font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink">
                Ver de qué número escribe cada agenda →
              </Link>
            </div>
            <FilaCapsulas ids={["reel-asistente-whatsapp"]} />
          </div>
        </section>

        <FaqSeo titulo="Asistente de WhatsApp: lo que más nos preguntan." preguntas={FAQ_ASISTENTE} />
        <Pricing />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

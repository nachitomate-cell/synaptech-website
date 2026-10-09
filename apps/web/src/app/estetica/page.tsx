import Link from "next/link";
import Header       from "@/components/Header";
import Footer       from "@/components/Footer";
import Recorrido    from "@/components/Recorrido";
import Cambiate     from "@/components/Cambiate";
import Testimonials from "@/components/Testimonials";
import LogosLocales from "@/components/LogosLocales";
import Pricing      from "@/components/Pricing";
import CtaFinal     from "@/components/CtaFinal";
import { HeroRubro, Dolores, type Dolor } from "@/components/Rubro";
import { FilaCapsulas } from "@/components/Capsulas";
import { MODULOS, MODULOS_ESTETICA } from "@/content/recorrido";
import { metaPagina } from "@/lib/seo";
import FaqSeo from "@/components/FaqSeo";
import { FAQ_ESTETICA } from "@/content/faq-rubros";

export const metadata = metaPagina({
  title: "Software para centros de estética y spa en Chile | SynapTech",
  description: "Agenda online de tratamientos 24/7, ficha de cada clienta, abonos online, gift cards y un asistente con IA en WhatsApp. Desde $29.900 + IVA por local.",
  path: "/estetica",
});

const DOLORES: Dolor[] = [
  { dolor: "Agendar tratamientos largos por WhatsApp", solucion: "Reserva online por tratamiento", detalle: "Cada tratamiento con su duración y su profesional: la clienta ve solo las horas que de verdad caben." },
  { dolor: "Clientas que no llegan a un tratamiento caro", solucion: "Abono al reservar y recordatorios", detalle: "Pide un abono con Mercado Pago al agendar, y envía confirmación y recordatorio antes de la cita." },
  { dolor: "Explicar las políticas una y otra vez", solucion: "Políticas aceptadas antes de agendar", detalle: "Tus reglas de atención y cancelación quedan aceptadas por la clienta en el último paso de la reserva." },
  { dolor: "Acordarse de alergias y tipo de piel", solucion: "Ficha con notas internas", detalle: "Notas que solo ve tu equipo, con el historial de tratamientos y lo que ha gastado cada clienta." },
  { dolor: "Clientas que prueban una vez y no vuelven", solucion: "Club, gift cards y planes", detalle: "Sellos por visita con premios de tu centro, gift cards para regalar y la tarjeta en el teléfono." },
  { dolor: "Responder precios todo el día", solucion: "Syna responde por ti", detalle: "El asistente con IA contesta precios y horarios por WhatsApp y agenda el tratamiento en el chat." },
];

export default function EsteticaPage() {
  const asistente = MODULOS.find((m) => m.id === "asistente");
  const modulos = asistente ? [...MODULOS_ESTETICA.slice(0, 2), asistente, MODULOS_ESTETICA[2]] : MODULOS_ESTETICA;
  return (
    <>
      <Header />
      <main>
        <HeroRubro
          eyebrow="Para centros de estética, spa y clínicas estéticas"
          titulo="Software y agenda online para centros de estética y spa."
          bajada="Tratamientos reservables las 24 horas, la ficha de cada clienta con sus notas, cobros y abonos online, y un club que las hace volver."
          origen="estetica-hero"
          mensajeWa="Hola, tengo un centro de estética y quiero conocer SynapTech"
          escritorio={{ src: "/panel/estetica-agenda-escritorio.webp", alt: "Agenda del día de un centro de estética con tres profesionales", w: 2880, h: 1800 }}
          celular={{ src: "/panel/estetica-reserva-1-servicio.webp", alt: "Catálogo de tratamientos en la página de reservas", w: 780, h: 1688 }}
        />

        <Dolores titulo="Lo que más se repite en un centro de estética, resuelto." items={DOLORES} />

        {modulos.map((m, i) => (
          <section key={m.id} className={`py-16 md:py-24 ${i % 2 ? "bg-mist" : ""}`}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <div className="max-w-3xl mb-6">
                <p className="eyebrow mb-3">{m.nombre}</p>
                <h2 className="text-ink">{m.titular}</h2>
                <p className="text-text-secondary text-lg mt-4 leading-relaxed">{m.bajada}</p>
              </div>
              <Recorrido modulo={m} />
            </div>
          </section>
        ))}

        <Cambiate />

        <section className="py-16 md:py-20 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div className="max-w-2xl">
                <p className="eyebrow mb-3">Cápsulas</p>
                <h2 className="text-ink">Míralo funcionando.</h2>
              </div>
              <Link href="/como-funciona" className="font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink self-start sm:self-auto">
                Ver todos los módulos →
              </Link>
            </div>
            <FilaCapsulas ids={["presentacion-synaptech-2", "reel-asistente-whatsapp", "capsula-1-caja", "tutorial-club-fidelizacion", "reel-club-wallet", "reel-migracion-agendapro"]} />
          </div>
        </section>

        <Testimonials />
        <LogosLocales />
        <FaqSeo titulo="Software para centros de estética: lo que más nos preguntan." preguntas={FAQ_ESTETICA} />
        <Pricing />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

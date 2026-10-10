import Link from "next/link";
import Header       from "@/components/Header";
import Footer       from "@/components/Footer";
import Recorrido    from "@/components/Recorrido";
import Cambiate     from "@/components/Cambiate";
import Testimonials from "@/components/Testimonials";
import LogosLocales from "@/components/LogosLocales";
import Pricing      from "@/components/Pricing";
import CtaFinal     from "@/components/CtaFinal";
import FaqSeo       from "@/components/FaqSeo";
import { HeroRubro, Dolores, type Dolor } from "@/components/Rubro";
import { FilaCapsulas } from "@/components/Capsulas";
import { MODULOS, MODULOS_ESTETICA } from "@/content/recorrido";
import { FAQ_PELUQUERIAS } from "@/content/faq-rubros";
import { metaPagina } from "@/lib/seo";
import VienesDe from "@/components/VienesDe";

/* Página de peluquerías y salones de belleza (09-10-2026). La pidió el mapa de
   keywords: "sistema de reservas peluquería", "software peluquería" y "agenda
   para salón de belleza" tienen demanda clara en Chile y no teníamos URL para
   ellas (AgendaPro, Reservo y WeiBook sí). Lo que dice es lo mismo que hace la
   plataforma para barberías y estética: ningún módulo nuevo. */
export const metadata = metaPagina({
  title: "Software y agenda online para peluquerías | SynapTech",
  description: "Sistema de reservas para peluquerías y salones de belleza: agenda por estilista, caja, comisiones, gift cards y asistente con IA en WhatsApp.",
  path: "/peluquerias",
});

const DOLORES: Dolor[] = [
  { dolor: "Agendar por WhatsApp entre una clienta y otra", solucion: "Reserva online 24/7", detalle: "Tu clienta elige servicio, estilista y hora desde el link de tu Instagram, y le llegan la confirmación y el recordatorio." },
  { dolor: "Servicios que duran distinto según quién los hace", solucion: "Duración por profesional", detalle: "Cada estilista con sus servicios y sus tiempos: la agenda solo ofrece las horas que de verdad caben." },
  { dolor: "Cuadrar la caja y las comisiones a mano", solucion: "Caja y liquidación solas", detalle: "Cada cobro queda con su medio de pago, y la liquidación de cada estilista sale con su porcentaje, propinas y adelantos." },
  { dolor: "Productos que no rotan", solucion: "Stock y venta en el mesón", detalle: "Llevas el inventario, vendes en el mesón o en tu tienda online y ves la comisión por producto." },
  { dolor: "Fechas que venden y nada que regalar", solucion: "Gift cards", detalle: "Con código, monto y vencimiento, y se canjean en la agenda." },
  { dolor: "Clientas que vienen una vez y no vuelven", solucion: "Club de sellos", detalle: "Sellos por visita y premios, con la tarjeta en el teléfono de la clienta." },
];

export default function PeluqueriasPage() {
  const ids = ["reserva", "comisiones", "asistente"];
  const modulos = [...MODULOS.filter((m) => ids.includes(m.id)), ...MODULOS_ESTETICA.filter((m) => m.id === "fidelizar")];
  return (
    <>
      <Header />
      <main>
        <HeroRubro
          eyebrow="Para peluquerías y salones de belleza"
          titulo="Software y agenda online para peluquerías."
          bajada="Un sistema de reservas para tu salón de belleza: cada estilista con su agenda, la caja y las comisiones cuadradas solas, gift cards y un asistente con IA que agenda por WhatsApp."
          origen="peluquerias-hero"
          mensajeWa="Hola, tengo una peluquería y quiero conocer SynapTech"
          escritorio={{ src: "/panel/agenda-escritorio.webp", alt: "Agenda del día con tres profesionales en el panel de SynapTech", w: 2880, h: 1800 }}
          celular={{ src: "/panel/reserva-2-horario.webp", alt: "Reserva online en el celular: elegir día y hora", w: 780, h: 1688 }}
        />

        <Dolores titulo="Lo que más se repite en una peluquería, resuelto." items={DOLORES} />

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
        <VienesDe />

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
            <FilaCapsulas ids={["presentacion-synaptech-2", "reel-asistente-whatsapp", "capsula-2-comisiones", "reel-club-wallet", "reel-migracion-agendapro"]} />
          </div>
        </section>

        <Testimonials />
        <LogosLocales />
        <FaqSeo titulo="Software para peluquerías: lo que más nos preguntan." preguntas={FAQ_PELUQUERIAS} />
        <Pricing />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

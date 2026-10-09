import type { Metadata } from "next";
import Link from "next/link";
import Header       from "@/components/Header";
import Footer       from "@/components/Footer";
import Recorrido    from "@/components/Recorrido";
import PlataEnOrden from "@/components/PlataEnOrden";
import Cambiate     from "@/components/Cambiate";
import Testimonials from "@/components/Testimonials";
import LogosLocales from "@/components/LogosLocales";
import Pricing      from "@/components/Pricing";
import CtaFinal     from "@/components/CtaFinal";
import { HeroRubro, Dolores, type Dolor } from "@/components/Rubro";
import { FilaCapsulas } from "@/components/Capsulas";
import { MODULOS } from "@/content/recorrido";

export const metadata: Metadata = {
  title: "Software para barberías en Chile | Agenda online, comisiones, arriendo de sillón y asistente IA | SynapTech",
  description: "La plataforma para barberías: reservas online 24/7, asistente con IA que agenda por WhatsApp, caja y comisiones del 50 % calculadas solas, boletas de honorarios para arriendo de sillón y club de fidelidad en Google Wallet. Desde $29.900 + IVA por local, barberos ilimitados.",
  alternates: { canonical: "https://synaptechspa.cl/barberias" },
};

const DOLORES: Dolor[] = [
  { dolor: "Te escriben a toda hora para pedir hora", solucion: "Syna agenda por WhatsApp", detalle: "El asistente con IA responde precios y horarios y deja la cita agendada en el chat, en el número de tu barbería, aunque estés cortando." },
  { dolor: "Cuadrar la caja y el 50 % a mano", solucion: "Caja y comisiones automáticas", detalle: "Cada cobro queda con su medio de pago y la liquidación de cada barbero sale calculada, con propinas y adelantos." },
  { dolor: "El arriendo de sillón y sus boletas", solucion: "Boletas que salen solas", detalle: "Cada atención emite la boleta de honorarios del barbero, con su RUT, y la del local por el arriendo y los productos." },
  { dolor: "Horas perdidas por gente que no llega", solucion: "Recordatorios y abono online", detalle: "Confirmación y recordatorio antes de cada cita, y si quieres, un abono al reservar con Mercado Pago o Flow." },
  { dolor: "Clientes que se van con otro barbero", solucion: "Un club que los hace volver", detalle: "Sellos por visita, premios y rangos, con la tarjeta guardada en el teléfono del cliente." },
  { dolor: "Las ceras y pomadas que no rotan", solucion: "Tus productos a la venta", detalle: "Stock, venta en el mesón y en tu tienda online, y la comisión por producto de cada barbero." },
];

export default function BarberiasPage() {
  const modulos = MODULOS.filter((m) => m.id === "asistente" || m.id === "comisiones");
  return (
    <>
      <Header />
      <main>
        <HeroRubro
          eyebrow="Para barberías"
          titulo="La barbería llena, sin vivir pegado al teléfono."
          bajada="Agenda por barbero, Syna respondiendo tu WhatsApp, la caja y el 50 % cuadrados solos, y un club que hace volver al cliente."
          origen="barberias-hero"
          mensajeWa="Hola, tengo una barbería y quiero conocer SynapTech"
          escritorio={{ src: "/panel/agenda-escritorio.webp", alt: "Agenda del día con tres barberos", w: 2880, h: 1800 }}
          celular={{ src: "/panel/app-barbero-celular.webp", alt: "La agenda del barbero en su celular", w: 780, h: 1688 }}
        />

        <Dolores titulo="Lo que más se repite en una barbería, resuelto." items={DOLORES} />

        {modulos.map((m) => (
          <section key={m.id} className="py-16 md:py-24 border-b border-border-subtle">
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

        <PlataEnOrden />
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
            <FilaCapsulas ids={["presentacion-synaptech-2", "reel-asistente-whatsapp", "tutorial-agenda-barbero", "capsula-2-comisiones", "reel-boletas-syna", "reel-club-wallet"]} />
          </div>
        </section>

        <Testimonials />
        <LogosLocales />
        <Pricing />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header       from "@/components/Header";
import Footer       from "@/components/Footer";
import Recorrido    from "@/components/Recorrido";
import Pricing      from "@/components/Pricing";
import CtaFinal     from "@/components/CtaFinal";
import { HeroRubro, Dolores, type Dolor } from "@/components/Rubro";
import { MODULOS_AGENCIA } from "@/content/recorrido";

export const metadata: Metadata = {
  title: "Software para agencias de viajes y equipos de venta | WhatsApp e Instagram en una bandeja | SynapTech",
  description: "Bandeja omnicanal de WhatsApp e Instagram con asistente IA que cotiza con tu catálogo, reparto automático entre vendedoras, embudo de ventas y comisiones calculadas solas. Para agencias de viajes, paseos y equipos que venden por mensaje.",
  alternates: { canonical: "https://synaptechspa.cl/agencias" },
};

/* Página de agencias (09-10-2026). Todo lo que dice está verificado en el
   código: ver devtools/guias-panel/sitio-web/agencia/INVENTARIO.md.
   No promete la reserva en la agenda: hoy una venta de agencia no la crea. */
const DOLORES: Dolor[] = [
  { dolor: "Mensajes repartidos entre WhatsApp e Instagram", solucion: "Una sola bandeja", detalle: "Todo lo que llega por los dos canales, en el mismo lugar y con su historial." },
  { dolor: "Cotizar el mismo paseo veinte veces al día", solucion: "Syna cotiza por ti", detalle: "El asistente con IA responde con tu catálogo, arma el pedido y se lo pasa a una vendedora." },
  { dolor: "Vendedoras que se pisan los clientes", solucion: "Reparto automático", detalle: "Cada conversación nueva va a una vendedora, por turnos, y cada una ve solo lo suyo." },
  { dolor: "No saber en qué quedó cada cliente", solucion: "Embudo de ventas", detalle: "Nuevos, cotizados, reservados, cerrados y perdidos, por vendedora y por período." },
  { dolor: "Clientes que preguntan y desaparecen", solucion: "Seguimiento con un toque", detalle: "El asistente le escribe al que dejó de responder para retomar la conversación." },
  { dolor: "Calcular comisiones en Excel", solucion: "Comisiones solas", detalle: "Al cerrar la venta, la comisión sale sobre lo pagado menos tickets y entradas." },
];

export default function AgenciasPage() {
  return (
    <>
      <Header />
      <main>
        <HeroRubro
          eyebrow="Para agencias de viajes y equipos de venta"
          titulo="Todo tu equipo, en una sola bandeja."
          bajada="WhatsApp e Instagram en un solo lugar, Syna cotizando con tu catálogo, las conversaciones repartidas entre tus vendedoras y las comisiones calculadas solas."
          origen="agencias-hero"
          mensajeWa="Hola, tengo una agencia y quiero conocer la bandeja de SynapTech"
          escritorio={{ src: "/panel/agencia-bandeja.webp", alt: "Bandeja con conversaciones de WhatsApp e Instagram atendidas por vendedoras y el asistente", w: 2880, h: 1800 }}
        />

        <Dolores titulo="Lo que más se repite en una agencia, resuelto." items={DOLORES} />

        {MODULOS_AGENCIA.map((m, i) => (
          <section key={m.id} id={m.id} className={`py-16 md:py-24 scroll-mt-20 ${i % 2 ? "bg-mist" : ""}`}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <div className="max-w-3xl mb-6">
                <p className="eyebrow mb-3">{String(i + 1).padStart(2, "0")} · {m.nombre}</p>
                <h2 className="text-ink">{m.titular}</h2>
                <p className="text-text-secondary text-lg mt-4 leading-relaxed">{m.bajada}</p>
              </div>
              <Recorrido modulo={m} />
            </div>
          </section>
        ))}

        <section className="py-16 md:py-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="rounded-[28px] bg-ink text-white p-7 sm:p-10 grid lg:grid-cols-[1.4fr_1fr] gap-6 items-center">
              <div>
                <p className="text-lime text-xs font-bold uppercase tracking-[0.12em]">Ya funcionando</p>
                <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mt-2">Una agencia de paseos con dos marcas, un equipo de vendedoras y el asistente atendiendo WhatsApp e Instagram.</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                Cada vendedora entra a su panel con sus chats, su embudo y sus comisiones, y el dueño ve
                el equipo completo. Las capturas de esta página son de una agencia de ejemplo con datos inventados.
              </p>
            </div>
          </div>
        </section>

        <Pricing />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

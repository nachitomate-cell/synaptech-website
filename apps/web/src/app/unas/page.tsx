import Header        from "@/components/Header";
import Footer        from "@/components/Footer";
import Cambiate      from "@/components/Cambiate";
import LogosLocales  from "@/components/LogosLocales";
import Pricing       from "@/components/Pricing";
import CtaFinal      from "@/components/CtaFinal";
import FaqSeo        from "@/components/FaqSeo";
import TiempoPerdido from "@/components/TiempoPerdido";
import { HeroRubro, Dolores, type Dolor } from "@/components/Rubro";
import { metaPagina } from "@/lib/seo";

/* Salones de uñas y manicuristas (11-10-2026). El autocompletado de Google Chile devolvió 10 variantes de 'agenda para manicurista' (app, pdf, 2026) y 'software para salón de uñas'. Ya hay estudios de uñas usando SynapTech (Nails Obsessed, The Nail Spot, Uñas Viña). */
export const metadata = metaPagina({
  title: "Agenda para manicurista y salón de uñas | SynapTech",
  description: "Agenda online para manicuristas y salones de uñas: reservas 24/7, recordatorios por WhatsApp, abono al reservar, club de sellos y venta de productos.",
  path: "/unas",
});

const DOLORES: Dolor[] = [{"dolor": "Agendar por WhatsApp entre una clienta y otra", "solucion": "Reserva online 24/7", "detalle": "Tu clienta elige el servicio, la manicurista y la hora desde el link de tu Instagram."}, {"dolor": "Servicios que duran muy distinto", "solucion": "Duración por servicio y por profesional", "detalle": "Un esmaltado no dura lo que un set acrílico: la agenda solo ofrece las horas que de verdad caben."}, {"dolor": "Clientas que no llegan", "solucion": "Recordatorios y abono", "detalle": "Confirmación y recordatorio antes de la hora, y un abono con Mercado Pago para los servicios largos."}, {"dolor": "Clientas que vienen una vez", "solucion": "Club de sellos", "detalle": "Sellos por visita y premios, con la tarjeta en el teléfono de tu clienta."}, {"dolor": "Esmaltes y productos que no rotan", "solucion": "Tienda online", "detalle": "Vende tus productos por internet y en el mesón, con el stock al día."}, {"dolor": "Comisiones del equipo a mano", "solucion": "Comisiones solas", "detalle": "La liquidación de cada manicurista sale calculada, con propinas y adelantos."}];

const FAQ = [{"q": "¿Cuál es la mejor app de agenda para manicurista?", "a": "Una que tus clientas usen para reservar solas y que les avise antes de cada hora. SynapTech tiene reserva online con tu marca, recordatorios por WhatsApp y correo, y la app para tu equipo en App Store y Google Play."}, {"q": "¿Sirve si trabajo sola?", "a": "Sí. Si atiendes sola, el plan Home Studio cuesta $14.900 + IVA al mes. Cuando sumas equipo pasas al Básico, que cobra por local con profesionales ilimitados."}, {"q": "¿Puedo pedir un abono para los sets largos?", "a": "Sí, con Mercado Pago en el último paso de la reserva, solo en los servicios que tú elijas."}, {"q": "¿Se puede probar gratis?", "a": "Sí. Pruebas 14 días con todo el plan Pro, sin tarjeta, creando tu agenda en bioo.cl/agenda (30 días si partes con el asistente con IA en crear.synaptechspa.cl). Después, el plan Básico cuesta $29.900 + IVA al mes, con profesionales ilimitados."}];

export default function Pagina() {
  return (
    <>
      <Header />
      <main>
        <HeroRubro
          eyebrow={"Para manicuristas y salones de uñas"}
          titulo={"Agenda online para manicuristas y salones de uñas."}
          bajada={"Tus clientas reservan su manicure, pedicure o set de uñas a cualquier hora, con la duración real de cada servicio, y les llega el recordatorio antes de la hora."}
          origen="unas"
          mensajeWa={"Hola, tengo un salón de uñas y quiero conocer SynapTech"}
          escritorio={{ src: "/panel/agenda-escritorio.webp", alt: "Agenda del día por profesional en el panel de SynapTech", w: 2880, h: 1800 }}
          celular={{ src: "/panel/estetica-reserva-1-servicio.webp", alt: "Reserva online en el celular", w: 780, h: 1688 }}
        />
        <Dolores titulo={"Lo que más se repite en un salón de uñas, resuelto."} items={DOLORES} />
        <TiempoPerdido origen="unas" />
        <Cambiate />
        <LogosLocales />
        <FaqSeo titulo={"Agenda para manicurista: lo que más nos preguntan."} preguntas={FAQ} />
        <Pricing />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

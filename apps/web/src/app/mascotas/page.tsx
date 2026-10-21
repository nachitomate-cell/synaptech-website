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

/* Peluquerías y baño de mascotas (11-10-2026): 'agenda peluquería canina' en el autocompletado de Google Chile, y 'peluquería canina' aparecía en casi todas las semillas de peluquería (mapa del 09-10). Lo que se afirma es lo del rubro en content/catalogo.ts (Clean Pups usa la plataforma). */
export const metadata = metaPagina({
  title: "Agenda para peluquería canina y de mascotas | SynapTech",
  description: "Agenda online para peluquería canina y baño de mascotas: reserva con los datos de la mascota, precio según tamaño, servicio a domicilio y recordatorios.",
  path: "/mascotas",
});

const DOLORES: Dolor[] = [{"dolor": "Preguntar por WhatsApp el tamaño y la raza", "solucion": "Reserva con los datos de la mascota", "detalle": "El cliente los deja al reservar y llegan a la ficha."}, {"dolor": "Precios distintos por tamaño", "solucion": "Servicios por tamaño", "detalle": "El precio sale según el tamaño de la mascota, sin cotizar a mano."}, {"dolor": "Ir a domicilio sin la dirección", "solucion": "Reserva con dirección", "detalle": "La dirección queda en la cita para el servicio a domicilio."}, {"dolor": "Responder todo el día", "solucion": "Asistente que pregunta por la mascota", "detalle": "Syna responde por WhatsApp, pregunta por la mascota y agenda."}, {"dolor": "Clientes que no vuelven", "solucion": "Club de sellos", "detalle": "Sellos por visita y premios, con la tarjeta en el teléfono del dueño."}, {"dolor": "Horas perdidas", "solucion": "Recordatorios", "detalle": "Confirmación y recordatorio antes de la hora."}];

const FAQ = [{"q": "¿El precio puede cambiar según el tamaño de la mascota?", "a": "Sí: cada servicio puede tener su precio por tamaño, y el cliente lo ve al reservar."}, {"q": "¿Sirve para servicio a domicilio?", "a": "Sí: el cliente reserva con su dirección y queda en la cita."}, {"q": "¿Cuánto cuesta?", "a": "Desde $29.900 + IVA al mes por local, con profesionales ilimitados. Puedes probar 30 días gratis el plan Pro, con el asistente, en crear.synaptechspa.cl. No pedimos tarjeta para la prueba."}];

export default function Pagina() {
  return (
    <>
      <Header />
      <main>
        <HeroRubro
          eyebrow={"Para peluquerías y baño de mascotas"}
          titulo={"Agenda online para tu peluquería canina."}
          bajada={"El cliente agenda con los datos de su mascota y su dirección, y el precio sale según el tamaño. También para servicio a domicilio."}
          origen="mascotas"
          mensajeWa={"Hola, tengo una peluquería de mascotas y quiero conocer SynapTech"}
          escritorio={{ src: "/panel/agenda-escritorio.webp", alt: "Agenda del día por profesional en el panel de SynapTech", w: 2880, h: 1800 }}
          celular={{ src: "/panel/reserva-1-servicio.webp", alt: "Reserva online en el celular", w: 780, h: 1688 }}
        />
        <Dolores titulo={"Lo que más se repite en una peluquería de mascotas, resuelto."} items={DOLORES} />
        <TiempoPerdido origen="mascotas" />
        <Cambiate />
        <LogosLocales />
        <FaqSeo titulo={"Agenda para peluquería canina: lo que más nos preguntan."} preguntas={FAQ} />
        <Pricing />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

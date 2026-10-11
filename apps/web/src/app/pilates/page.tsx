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

/* Estudios de pilates (11-10-2026): 'agenda para pilates', 'agenda online para pilates' y 'agenda para estudio de pilates' en el autocompletado de Google Chile. Lo que se afirma es lo que ya decía el rubro en content/catalogo.ts (Punto Pilates usa la plataforma). */
export const metadata = metaPagina({
  title: "Agenda online para estudios de pilates | SynapTech",
  description: "Agenda online para estudios de pilates: tus alumnas reservan su clase, cada sede con sus precios y horarios, recordatorios por WhatsApp y pago al reservar.",
  path: "/pilates",
});

const DOLORES: Dolor[] = [{"dolor": "Coordinar las clases por WhatsApp", "solucion": "Reserva de clases", "detalle": "Tus alumnas eligen su clase y su hora desde el teléfono, a cualquier hora."}, {"dolor": "Varias sedes, precios distintos", "solucion": "Precios y horarios por sede", "detalle": "Cada sede con sus propios precios y su horario de clases."}, {"dolor": "Alumnas que no avisan", "solucion": "Recordatorios", "detalle": "Confirmación y recordatorio antes de la clase, por WhatsApp y por correo."}, {"dolor": "Cobrar la clase de prueba", "solucion": "Pago al reservar", "detalle": "Con Mercado Pago o pidiendo transferencia en el último paso de la reserva."}, {"dolor": "Alumnas que dejan de venir", "solucion": "Club y campañas", "detalle": "Sellos por clase, premios y mensajes para las que dejaron de venir."}, {"dolor": "Números de cada sede", "solucion": "Caja y métricas", "detalle": "Lo que entra y sale de cada sede, sin planillas."}];

const FAQ = [{"q": "¿Mis alumnas pueden reservar su clase solas?", "a": "Sí, desde el link de tu estudio, a cualquier hora, y les llega la confirmación y el recordatorio."}, {"q": "¿Sirve para un estudio con varias sedes?", "a": "Sí: cada sede con sus precios y horarios, y tú ves todo desde el mismo panel."}, {"q": "¿Cuánto cuesta?", "a": "Desde $29.900 + IVA al mes por local, con profesionales ilimitados. Cada sede adicional se cotiza por WhatsApp."}];

export default function Pagina() {
  return (
    <>
      <Header />
      <main>
        <HeroRubro
          eyebrow={"Para estudios de pilates y bienestar"}
          titulo={"Agenda online para tu estudio de pilates."}
          bajada={"Tus alumnas reservan su clase desde el teléfono, y cada sede maneja sus propios precios y horarios."}
          origen="pilates"
          mensajeWa={"Hola, tengo un estudio de pilates y quiero conocer SynapTech"}
          escritorio={{ src: "/panel/agenda-escritorio.webp", alt: "Agenda del día por profesional en el panel de SynapTech", w: 2880, h: 1800 }}
          celular={{ src: "/panel/reserva-2-horario.webp", alt: "Reserva online en el celular", w: 780, h: 1688 }}
        />
        <Dolores titulo={"Lo que más se repite en un estudio de pilates, resuelto."} items={DOLORES} />
        <TiempoPerdido origen="pilates" />
        <Cambiate />
        <LogosLocales />
        <FaqSeo titulo={"Agenda para pilates: lo que más nos preguntan."} preguntas={FAQ} />
        <Pricing />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

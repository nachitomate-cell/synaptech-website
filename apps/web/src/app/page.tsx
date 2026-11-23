import Header        from "@/components/Header";
import TiempoPerdido from "@/components/TiempoPerdido";
import HeroOscuro    from "@/components/HeroOscuro";
import Cifras        from "@/components/Cifras";
import Confianza     from "@/components/Confianza";
import VitrinaPlataforma from "@/components/VitrinaPlataforma";
import TiraPortada   from "@/components/TiraPortada";
import PromoMeses    from "@/components/PromoMeses";
import PlataEnOrden  from "@/components/PlataEnOrden";
import Rubros        from "@/components/Rubros";
import EnlacesAgencias from "@/components/EnlacesAgencias";
import Cambiate      from "@/components/Cambiate";
import Testimonials  from "@/components/Testimonials";
import LogosLocales  from "@/components/LogosLocales";
import Conecta from "@/components/Conecta";
import ClubFidelizacion from "@/components/ClubFidelizacion";
import Pricing       from "@/components/Pricing";
import FAQ           from "@/components/FAQ";
import CtaFinal      from "@/components/CtaFinal";
import Footer        from "@/components/Footer";
import TresCanales   from "@/components/TresCanales";
import { metaPagina } from "@/lib/seo";
import VienesDe from "@/components/VienesDe";
import VelocidadVideo from "@/components/VelocidadVideo";
import AvisoPais from "@/components/AvisoPais";
import VideoSyna, { VideoSynaJsonLd } from "@/components/VideoSyna";
import VideoMarca, { VideoMarcaJsonLd } from "@/components/VideoMarca";

export const metadata = metaPagina({
  title: "SynapTech: agenda online, cobros y WhatsApp con IA",
  description: "Agenda online 24/7, asistente con IA que agenda por WhatsApp, caja, comisiones y club de fidelización para barberías, salones y estética en Chile.",
  path: "/",
});

/* Home al estilo Square (08-10-2026), ampliada el 09-10: titular con la
   composición de capturas reales → confianza → familias de producto → oferta
   → la plata del local (IVA, 50 %, arriendo) → rubros → mudanza y comparación
   de precio → prueba social → integraciones → precios → preguntas → cierre. */
/* 23-10-2026 (2ª vuelta, "toque Apple y NVIDIA"): tira de pestañas bajo la
   portada, la plataforma como repisa de la Apple Store y las integraciones
   como carrusel de NVIDIA, con Wellhub. */
/* 23-10-2026: portada y cierre oscuros al estilo de /beneficios/fibra, con
   las cifras re-medidas a la vista (Cifras.tsx) justo después de la portada. */
/* La franja del directorio lee la lista viva una vez al día. */
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <Header />
      <AvisoPais />
      <main>
        {/* El video de marca de SynapTech (27-10-2026): lo primero que se ve, antes de la portada. */}
        <VideoMarcaJsonLd />
        <VideoMarca />
        <HeroOscuro despuesDeVideo />
        {/* 23-11-2026: novedad, el asistente en los 3 canales sin costo extra. */}
        <TresCanales />
        {/* "Syna, tu secretaria" estuvo aquí del 27 al 28-10-2026; Ignacio la pasó a /empresas. */}
        <TiraPortada />
        <Cifras />
        <Confianza />
        {/* 17-11-2026 (idea de notpato.app): los logos grandes, en oscuro, empalmando con el video de Syna. Reemplaza al carrusel de Integraciones de más abajo. */}
        <Conecta />
        {/* El video del omnicanal (26-10-2026) bajó aquí cuando la secretaria tomó su lugar. */}
        <VideoSynaJsonLd url="https://www.synaptechspa.cl/syna" />
        <section id="video-syna" className="bg-[#05080D] pt-16 md:pt-24 pb-20 md:pb-28 px-4 sm:px-6">
          <VideoSyna oscuro titulo="Mira a Syna en acción." bajada="Un minuto y medio: los canales de tu local, Syna agendando sola y todo cayendo en una sola agenda." />
        </section>
        <TiempoPerdido />
        <VitrinaPlataforma />
        {/* 17-11-2026: el club con sección propia (la tira de arriba apunta a /#club). */}
        <ClubFidelizacion />
        <PromoMeses />
        <PlataEnOrden />
        <Rubros />
        {/* Agencias y equipos de venta (09-11-2026): enlaces en el HTML a las páginas por tipo, omnicanal y CRM. */}
        <EnlacesAgencias variante="franja" fondo="!pt-0" eyebrow="Agencias y equipos de venta"
          titulo="¿Vendes por WhatsApp con un equipo?"
          bajada="Un agente de IA responde tu WhatsApp, Instagram y Messenger en una sola bandeja, reparte los chats entre tus vendedores y deja cada venta en un tablero." />
        <Cambiate />
        <VienesDe />
        <Testimonials />
        <VelocidadVideo />
        <LogosLocales />
        <Pricing />
        <FAQ />
        <CtaFinal oscuro club />
      </main>
      <Footer />
    </>
  );
}

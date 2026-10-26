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
import Cambiate      from "@/components/Cambiate";
import Testimonials  from "@/components/Testimonials";
import LogosLocales  from "@/components/LogosLocales";
import Integraciones from "@/components/Integraciones";
import Pricing       from "@/components/Pricing";
import FAQ           from "@/components/FAQ";
import CtaFinal      from "@/components/CtaFinal";
import Footer        from "@/components/Footer";
import { metaPagina } from "@/lib/seo";
import VienesDe from "@/components/VienesDe";
import VelocidadVideo from "@/components/VelocidadVideo";
import AvisoPais from "@/components/AvisoPais";
import VideoSyna, { VideoSynaJsonLd } from "@/components/VideoSyna";

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
        <HeroOscuro />
        {/* El video de Syna (26-10-2026), pegado a la portada oscura. */}
        <VideoSynaJsonLd url="https://www.synaptechspa.cl/syna" />
        <section id="video-syna" className="bg-[#05080D] pt-16 md:pt-24 pb-20 md:pb-28 px-4 sm:px-6">
          <VideoSyna oscuro titulo="Mira a Syna en acción." bajada="Un minuto y medio: los canales de tu local, Syna agendando sola y todo cayendo en una sola agenda." />
        </section>
        <TiraPortada />
        <Cifras />
        <Confianza />
        <TiempoPerdido />
        <VitrinaPlataforma />
        <PromoMeses />
        <PlataEnOrden />
        <Rubros />
        <Cambiate />
        <VienesDe />
        <Testimonials />
        <VelocidadVideo />
        <LogosLocales />
        <Integraciones />
        <Pricing />
        <FAQ />
        <CtaFinal oscuro />
      </main>
      <Footer />
    </>
  );
}

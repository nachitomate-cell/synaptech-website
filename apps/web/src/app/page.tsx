import Header        from "@/components/Header";
import Hero          from "@/components/Hero";
import Confianza     from "@/components/Confianza";
import Familias      from "@/components/Familias";
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

export const metadata = metaPagina({
  title: "SynapTech: agenda online, cobros y WhatsApp con IA",
  description: "Agenda online 24/7, asistente con IA que agenda por WhatsApp, caja, comisiones y club de fidelización para barberías, salones y estética en Chile.",
  path: "/",
});

/* Home al estilo Square (08-10-2026), ampliada el 09-10: titular con la
   composición de capturas reales → confianza → familias de producto → oferta
   → la plata del local (IVA, 50 %, arriendo) → rubros → mudanza y comparación
   de precio → prueba social → integraciones → precios → preguntas → cierre. */
/* La franja del directorio lee la lista viva una vez al día. */
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Confianza />
        <Familias />
        <PromoMeses />
        <PlataEnOrden />
        <Rubros />
        <Cambiate />
        <Testimonials />
        <LogosLocales />
        <Integraciones />
        <Pricing />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

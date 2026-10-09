import Header        from "@/components/Header";
import Hero          from "@/components/Hero";
import Familias      from "@/components/Familias";
import PromoMeses    from "@/components/PromoMeses";
import Rubros        from "@/components/Rubros";
import Testimonials  from "@/components/Testimonials";
import LogosLocales  from "@/components/LogosLocales";
import Integraciones from "@/components/Integraciones";
import Pricing       from "@/components/Pricing";
import FAQ           from "@/components/FAQ";
import CtaFinal      from "@/components/CtaFinal";
import Footer        from "@/components/Footer";

/* Home al estilo Square (08-10-2026): titular → familias de producto →
   oferta destacada → rubros → prueba social → integraciones → precios →
   preguntas → cierre. */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Familias />
        <PromoMeses />
        <Rubros />
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

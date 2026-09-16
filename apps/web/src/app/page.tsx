import Header      from "@/components/Header";
import Hero         from "@/components/Hero";
import SaaSBanner   from "@/components/SaaSBanner";
import Services     from "@/components/Services";
import TechBand     from "@/components/TechBand";
import LogosLocales from "@/components/LogosLocales";
import Testimonials from "@/components/Testimonials";
import Diagnosis    from "@/components/Diagnosis";
import Pricing      from "@/components/Pricing";
import FAQ          from "@/components/FAQ";
import Contact      from "@/components/Contact";
import Footer       from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <SaaSBanner />
        <Services />
        <TechBand />
        <LogosLocales />
        <Testimonials />
        <Diagnosis />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

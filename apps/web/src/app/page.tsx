import Header           from "@/components/Header";
import Hero             from "@/components/Hero";
import Services         from "@/components/Services";
import Process          from "@/components/Process";
import TechBand         from "@/components/TechBand";
import Cases            from "@/components/Cases";
import Diagnosis        from "@/components/Diagnosis";
import IntelligenceUnit from "@/components/IntelligenceUnit";
import Contact          from "@/components/Contact";
import Footer           from "@/components/Footer";
import WhatsAppFloat    from "@/components/WhatsAppFloat";
import CustomCursor     from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <TechBand />
        <Cases />
        <Diagnosis />
        <IntelligenceUnit />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

import type { Metadata } from "next";
import Header        from "@/components/Header";
import Historia      from "@/components/Historia";
import Footer        from "@/components/Footer";
import CustomCursor  from "@/components/CustomCursor";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Nosotros — SynapTech SpA",
  description:
    "La historia de SynapTech: cómo un enfermero universitario de Viña del Mar construyó una empresa de software B2B con 5 proyectos en producción en menos de dos meses.",
  alternates: { canonical: "https://synaptechspa.cl/nosotros" },
  openGraph: {
    title: "Nosotros — SynapTech SpA",
    description:
      "Un enfermero, un prototipo para su padre y la pregunta que originó todo. La historia de SynapTech.",
    url: "https://synaptechspa.cl/nosotros",
  },
};

export default function NosotrosPage() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Historia />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

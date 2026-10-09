import type { Metadata } from "next";
import Header  from "@/components/Header";
import Footer  from "@/components/Footer";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contacto | SynapTech",
  description: "Escríbenos para conocer SynapTech con los datos de tu local: agenda online, cobros, asistente con IA y club de fidelidad.",
  alternates: { canonical: "https://synaptechspa.cl/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}

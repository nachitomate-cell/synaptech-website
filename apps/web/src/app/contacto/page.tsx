import Header  from "@/components/Header";
import Footer  from "@/components/Footer";
import Contact from "@/components/Contact";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  title: "Contacto | SynapTech",
  description: "Escríbenos para ver SynapTech con los datos de tu local: agenda online, cobros, asistente con IA por WhatsApp y club de fidelidad.",
  path: "/contacto",
});

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

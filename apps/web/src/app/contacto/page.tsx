import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contacto | SynapTech SpA",
  description: "Ponte en contacto con nuestro equipo para iniciar la transformación digital de tu negocio.",
};

export default function ContactoPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <Contact />
      </div>
    </main>
  );
}

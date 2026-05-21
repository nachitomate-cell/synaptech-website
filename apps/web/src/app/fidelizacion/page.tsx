import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistemas de Fidelización y Recompensas | SynapTech SpA",
  description: "Aplicaciones de lealtad, recompensas VIP y billeteras digitales para retener a tus mejores clientes.",
};

export default function FidelizacionPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 text-center">
        <h1 className="text-text-primary mb-6 animate-fade-up">Fidelización de Clientes</h1>
        <p className="text-text-secondary max-w-2xl mx-auto animate-fade-up">
          Tarjetas digitales, sellos y gamificación diseñados para aumentar el ciclo de vida y la retención de tus clientes.
        </p>
      </div>
    </main>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portales Clínicos y Gestión de Pacientes | SynapTech SpA",
  description: "Desarrollo de portales clínicos a medida para la gestión eficiente de pacientes, historiales y reservas médicas.",
};

export default function PortalesClinicosPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 text-center">
        <h1 className="text-text-primary mb-6 animate-fade-up">Portales Clínicos</h1>
        <p className="text-text-secondary max-w-2xl mx-auto animate-fade-up">
          Plataformas de salud digital diseñadas para optimizar la gestión de pacientes y la operación clínica diaria.
        </p>
      </div>
    </main>
  );
}

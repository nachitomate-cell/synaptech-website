import Image from "next/image";
import { SIGNUP_URL, waLink } from "@/content/catalogo";

/* Cifras de la auditoría del 04-10-2026 (memoria project_cifras_reales_plataforma):
   27 locales vigentes (22 pagando + 5 en prueba), 34.620 fichas de clientes en
   locales vigentes y 14.643 citas agendadas en la plataforma. Se redondean
   hacia abajo; si cambian mucho, volver a contar antes de tocar. */
const METRICAS = [
  { valor: "+25",     label: "locales en Chile" },
  { valor: "+30.000", label: "clientes en sus fichas" },
  { valor: "+14.000", label: "citas agendadas" },
];

export default function Hero() {
  return (
    <section className="pt-28 md:pt-32 pb-14 md:pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
        <div>
          <p className="eyebrow mb-5">Agenda · Cobros · IA · Fidelización</p>
          <h1 className="text-ink mb-6">
            Todo tu local, en una sola plataforma.
          </h1>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-8">
            Reservas online, cobros y caja, un asistente con IA que responde por
            WhatsApp y un club que hace volver a tus clientes. Para barberías,
            salones, estética, pilates, mascotas y agencias.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`${SIGNUP_URL}?ref=home-hero`}
              className="inline-flex justify-center items-center bg-ink text-white font-semibold text-base px-7 py-4 rounded-full hover:bg-black transition-colors">
              Empezar gratis
            </a>
            <a href={waLink("Hola, quiero conocer SynapTech para mi local")} target="_blank" rel="noopener noreferrer"
              className="inline-flex justify-center items-center border border-ink/15 text-ink font-semibold text-base px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
              Hablar por WhatsApp
            </a>
          </div>
        </div>

        <div className="rounded-[28px] bg-lime/15 p-3 sm:p-5">
          <Image src="/panel/agenda-escritorio.webp" alt="Agenda del día con tres profesionales en el panel de SynapTech"
            width={2880} height={1800} priority sizes="(min-width: 1024px) 600px, 100vw"
            className="w-full h-auto rounded-xl border border-border-subtle shadow-card-hover" />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 mt-14">
        <div className="grid grid-cols-3 border-y border-border-subtle">
          {METRICAS.map((m, i) => (
            <div key={m.label} className={`py-6 px-2 sm:px-6 text-center ${i ? "border-l border-border-subtle" : ""}`}>
              <p className="font-display font-bold text-ink text-2xl sm:text-4xl tracking-tight">{m.valor}</p>
              <p className="text-[12px] sm:text-sm text-text-muted mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { SIGNUP_URL, waLink } from "@/content/catalogo";

/* Cifras medidas en Firestore el 09-10-2026 (count() por local, solo lectura),
   SOLO locales vigentes: los 26 clientes de _publico/metricas.directorio + 3 en
   prueba (+ la base de marca de Kronnos), sin demos, propuestas ni bajas.
     sedes 36 (29 cuentas; Punto Pilates 7 sedes, Oren 2) · fichas de clientes
     (users) 36.961 · citas 17.271 − 1.098 importadas = 16.173 + 2.368 reservas
     de clase = 18.541 · conversaciones WhatsApp 3.013 + Instagram 142 = 3.155.
   Se redondean hacia abajo. Volver a medir antes de cambiarlas (script en
   devtools/guias-panel/sitio-web/cifras/contar.cjs). */
const METRICAS = [
  { valor: "+35",     label: "locales y sedes en Chile" },
  { valor: "+36.000", label: "clientes en sus fichas" },
  { valor: "+18.000", label: "citas y reservas agendadas" },
  { valor: "+3.000",  label: "conversaciones por WhatsApp e Instagram" },
];

/* La composición de la derecha es TODA de capturas reales del panel (local
   ficticio en el emulador, ver content/recorrido.ts): la agenda, la reserva en
   el celular, el mensaje de Syna agendando y una clienta del club con su premio
   listo. Las piezas entran escalonadas y flotan apenas (hero-entra/hero-flota
   en globals.css; sin movimiento si el usuario lo pidió). */
export default function Hero() {
  return (
    <section className="pt-28 md:pt-32 pb-14 md:pb-20 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1fr_1.08fr] gap-12 lg:gap-14 items-center">
        <div>
          <p className="eyebrow mb-5">Para barberías, salones y centros de estética</p>
          <h1 className="text-ink mb-6">
            La agenda online de tu local, con IA en WhatsApp.
          </h1>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-8">
            Todo tu local en una sola plataforma: reservas online, caja y comisiones,
            un asistente con IA que responde y agenda por WhatsApp, y un club que hace
            volver a tus clientes.
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
          <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-sm text-text-muted">
            {["Sin tarjeta para partir", "Profesionales ilimitados", "Te mudamos gratis"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Composición */}
        <div className="relative pb-[12%] pl-[8%] pt-[9%] pr-[2%]">
          <div className="hero-entra rounded-[28px] bg-lime/20 p-2.5 sm:p-4" style={{ animationDelay: "0ms" }}>
            <Image src="/panel/agenda-escritorio.webp" alt="Agenda del día con tres profesionales en el panel de SynapTech"
              width={2880} height={1800} priority sizes="(min-width: 1024px) 620px, 92vw"
              className="w-full h-auto rounded-xl border border-border-subtle shadow-card-hover" />
          </div>

          {/* Syna agendando por WhatsApp */}
          <div className="hero-entra absolute top-0 right-0 w-[56%]" style={{ animationDelay: "350ms" }}>
            <div className="hero-flota rounded-2xl bg-white p-1.5 shadow-[0_18px_40px_-12px_rgba(15,26,43,.35)]" style={{ animationDelay: "0s" }}>
              <Image src="/panel/recorte-syna-agenda.webp" alt="Syna, el asistente con IA, confirma una hora agendada por WhatsApp"
                width={940} height={332} sizes="(min-width: 1024px) 340px, 52vw" className="w-full h-auto rounded-xl" />
            </div>
          </div>

          {/* Reserva desde el celular */}
          <div className="hero-entra absolute left-0 bottom-0 w-[29%]" style={{ animationDelay: "550ms" }}>
            <div className="hero-flota rounded-[22px] border-[5px] border-ink bg-white overflow-hidden shadow-[0_18px_40px_-12px_rgba(15,26,43,.45)]" style={{ animationDelay: "-2s" }}>
              <Image src="/panel/reserva-2-horario.webp" alt="Página de reservas en el celular: elegir día y hora"
                width={780} height={1688} sizes="(min-width: 1024px) 180px, 28vw" className="w-full h-auto" />
            </div>
          </div>

          {/* Club: clienta con premio listo */}
          <div className="hero-entra absolute right-[3%] bottom-[2%] w-[58%] hidden sm:block" style={{ animationDelay: "750ms" }}>
            <div className="hero-flota rounded-2xl bg-white shadow-[0_18px_40px_-12px_rgba(15,26,43,.35)] overflow-hidden" style={{ animationDelay: "-4s" }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent px-4 pt-3">Club de fidelidad</p>
              <Image src="/panel/recorte-club-cliente.webp" alt="Una clienta del club con 14 sellos y un premio listo para canjear"
                width={1236} height={112} sizes="(min-width: 1024px) 360px, 55vw" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 mt-14">
        <div className="grid grid-cols-2 md:grid-cols-4 border-y border-border-subtle">
          {METRICAS.map((m, i) => (
            <div key={m.label} className={`py-6 px-2 sm:px-6 text-center ${i % 2 ? "border-l border-border-subtle" : ""} ${i === 2 ? "md:border-l" : ""} ${i > 1 ? "border-t md:border-t-0 border-border-subtle" : ""}`}>
              <p className="font-display font-bold text-ink text-2xl sm:text-4xl tracking-tight">{m.valor}</p>
              <p className="text-[12px] sm:text-sm text-text-muted mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { altaIA, agendaSinIA, CTA_IA, CTA_SIN_IA, waLink, A_MEDIDA_WA } from "@/content/catalogo";
import CentroOmnicanal from "@/components/CentroOmnicanal";

/* Portada del inicio al estilo de la página de alianza (/beneficios/fibra),
   pedida por Ignacio el 23-10-2026: "te quedó muy bueno ese diseño estilo
   Apple, quiero que hagas un diseño de ese estilo en el inicio". Fondo casi
   negro, el título al centro con la segunda línea en degradado verde a
   celeste, un solo botón principal y, abajo, la agenda real del panel
   saliendo del borde como un producto en vitrina.

   Las capturas son las mismas de la portada anterior (local ficticio en el
   emulador, ver content/recorrido.ts). Las cifras viven ahora en Cifras.tsx. */
export default function HeroOscuro() {
  return (
    <section className="relative overflow-hidden bg-[#05080D] text-white pt-32 md:pt-40">
      {/* Halo de color detrás de la captura: el verde de marca y un celeste. */}
      <div aria-hidden className="absolute left-1/2 top-[58%] -translate-x-1/2 w-[1100px] max-w-[160vw] aspect-[2/1] rounded-full opacity-60 blur-[110px]"
        style={{ background: "radial-gradient(closest-side, rgba(156,204,60,.55), rgba(94,200,242,.28) 55%, transparent)" }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[13px] sm:text-[15px] font-semibold tracking-tight text-white/60">
          Para barberías, salones y centros de estética
        </p>
        <h1 className="mt-6 text-white !text-[clamp(2.4rem,5vw,4.6rem)]">
          La agenda online de tu local.
          <span className="block bg-gradient-to-r from-[#B8E36A] via-[#9CCC3C] to-[#5EC8F2] bg-clip-text text-transparent pb-2">
            Con IA que agenda por WhatsApp.
          </span>
        </h1>
        <p className="mt-7 text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl mx-auto">
          Reservas online, caja y comisiones, boletas ante el SII y un club que hace
          volver a tus clientes. Todo en un solo lugar.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <a href={altaIA("home-hero")}
            className="inline-flex justify-center items-center bg-white text-[#05080D] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors">
            {CTA_IA}
          </a>
          <a href={waLink("Hola, quiero conocer SynapTech para mi local")} target="_blank" rel="noopener noreferrer"
            className="text-[#B8E36A] font-semibold hover:underline underline-offset-4">
            Hablar por WhatsApp ›
          </a>
        </div>
        <p className="mt-6 text-sm text-white/45">
          Sin tarjeta para la prueba · Profesionales ilimitados · Te mudamos gratis
        </p>
        {/* Autoservicio = bioo (12-10-2026): se avisa antes del clic. */}
        <p className="mt-2 text-sm text-white/45">
          <a href={agendaSinIA("home-hero-sin-ia")} className="text-white/75 underline underline-offset-4 decoration-white/30 hover:decoration-white">{CTA_SIN_IA}</a>
          {" "}en bioo, nuestra agenda de autoservicio ·{" "}
          <a href={A_MEDIDA_WA} target="_blank" rel="noopener noreferrer" className="text-white/75 underline underline-offset-4 decoration-white/30 hover:decoration-white whitespace-nowrap">varias sedes, a medida</a>
        </p>
      </div>

      {/* Los canales llegan a Syna y bajan a la agenda (26-10-2026). */}
      <CentroOmnicanal />

      {/* Vitrina: la agenda del panel, cortada por el borde inferior. La línea
          de datos del centro omnicanal termina justo en su borde superior. */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <div className="hero-entra relative rounded-t-[22px] sm:rounded-t-[28px] border border-b-0 border-white/12 bg-white/[.04] p-2 sm:p-3 pb-0 sm:pb-0 shadow-[0_-30px_80px_-20px_rgba(156,204,60,.25)]">
          <Image src="/panel/agenda-escritorio.webp" alt="Agenda del día con tres profesionales en el panel de SynapTech"
            width={2880} height={1800} priority sizes="(min-width: 1024px) 980px, 94vw"
            className="w-full h-auto rounded-t-xl sm:rounded-t-2xl" />

          {/* Syna agendando por WhatsApp */}
          <div className="hero-entra absolute -top-8 sm:-top-10 -right-1 sm:-right-8 w-[52%] sm:w-[40%]" style={{ animationDelay: "350ms" }}>
            <div className="hero-flota rounded-2xl bg-white p-1.5 shadow-[0_24px_50px_-12px_rgba(0,0,0,.6)]">
              <Image src="/panel/recorte-syna-agenda.webp" alt="Syna, el asistente con IA, confirma una hora agendada por WhatsApp"
                width={940} height={332} sizes="(min-width: 1024px) 400px, 52vw" className="w-full h-auto rounded-xl" />
            </div>
          </div>

          {/* Reserva desde el celular */}
          <div className="hero-entra absolute left-2 sm:-left-10 top-[22%] w-[26%] sm:w-[20%]" style={{ animationDelay: "550ms" }}>
            <div className="hero-flota rounded-[22px] border-[5px] border-[#1b1f27] bg-white overflow-hidden shadow-[0_24px_50px_-12px_rgba(0,0,0,.7)]" style={{ animationDelay: "-2s" }}>
              <Image src="/panel/reserva-2-horario.webp" alt="Página de reservas en el celular: elegir día y hora"
                width={780} height={1688} sizes="(min-width: 1024px) 200px, 26vw" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

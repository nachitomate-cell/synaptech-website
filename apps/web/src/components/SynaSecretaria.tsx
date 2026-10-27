import { waLink } from "@/content/catalogo";
import VideoSyna, { VIDEO_SECRETARIA } from "@/components/VideoSyna";

/* "Syna, tu secretaria" en primer plano de la portada (27-10-2026, pedido de
   Ignacio: "debe estar en primer plano, siguiendo el diseño Apple"). Sigue la
   portada oscura de HeroOscuro: casi negro, rótulo chico, título con la
   segunda línea en el degradado verde a celeste, el video grande como producto
   en vitrina y un solo llamado. Lo que Syna hace por el dueño se muestra como
   disponible (decisión de Ignacio, igual que la campaña de autoservicio): el
   llamado es "pídela", que llega por WhatsApp y así se mide quién la quiere. */
const TAREAS = ["Agenda", "Ventas", "Gastos por audio", "Boletas", "Facturas", "Instagram", "Correo", "Reuniones", "Recordatorios"];

export default function SynaSecretaria() {
  return (
    <section id="syna-secretaria" className="relative overflow-hidden bg-[#05080D] text-white pt-20 md:pt-28 pb-20 md:pb-28 px-4 sm:px-6">
      <div aria-hidden className="absolute left-1/2 top-[62%] -translate-x-1/2 w-[1000px] max-w-[150vw] aspect-[2/1] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(156,204,60,.5), rgba(94,200,242,.22) 60%, transparent)" }} />
      <div className="relative max-w-6xl mx-auto text-center">
        <p className="text-[13px] sm:text-[15px] font-semibold tracking-tight text-[#B8E36A]">Nuevo</p>
        <h2 className="mt-4 text-white !text-[clamp(2.2rem,4.6vw,4.2rem)]">
          Syna, tu secretaria.
          <span className="block bg-gradient-to-r from-[#B8E36A] via-[#9CCC3C] to-[#5EC8F2] bg-clip-text text-transparent pb-2">
            Le escribes. Ella lo hace.
          </span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl mx-auto">
          Desde tu WhatsApp, por escrito o por audio: revisa tu agenda, te dice cuánto vendiste,
          emite boletas y facturas, programa tu Instagram y te recuerda todo.
        </p>
        <div className="mt-12 md:mt-14">
          <VideoSyna oscuro video={VIDEO_SECRETARIA} />
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto" aria-label="Lo que hace Syna por ti">
          {TAREAS.map((t) => (
            <li key={t} className="rounded-full border border-white/12 bg-white/[.05] px-4 py-2 text-sm font-medium text-white/80">{t}</li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <a href={waLink("Hola, quiero a Syna como secretaria para mi local")} target="_blank" rel="noopener noreferrer"
            className="inline-flex justify-center items-center bg-white text-[#05080D] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors">
            Pídela para tu local
          </a>
          <a href="/syna" className="text-[#B8E36A] font-semibold hover:underline underline-offset-4">Conoce a Syna ›</a>
        </div>
      </div>
    </section>
  );
}

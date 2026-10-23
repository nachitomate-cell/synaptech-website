import { altaIA, agendaGratis, CTA_IA, CTA_GRATIS, waLink } from "@/content/catalogo";

/* `oscuro` (23-10-2026): el cierre del inicio en el estilo de su portada. */
export default function CtaFinal({ origen = "home-final", oscuro = false }: { origen?: string; oscuro?: boolean }) {
  if (oscuro) return <CtaOscuro origen={origen} />;
  return (
    <section className="py-16 md:py-24 bg-mist">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-ink">Empieza hoy con SynapTech.</h2>
        <p className="text-text-secondary text-lg mt-5 leading-relaxed">
          Crea tu agenda en minutos con Syna, el asistente con IA, respondiendo tu WhatsApp
          desde el primer día: 30 días gratis del plan Pro. ¿Varias sedes o un equipo
          grande? Escríbenos y te la armamos a medida.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <a href={altaIA(origen)}
            className="inline-flex justify-center items-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
            {CTA_IA}
          </a>
          <a href={waLink("Hola, quiero conocer SynapTech para mi local")} target="_blank" rel="noopener noreferrer"
            className="inline-flex justify-center items-center border border-ink/15 bg-white text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
            Hablar por WhatsApp
          </a>
        </div>
        <p className="mt-5 text-sm text-text-muted">
          No pedimos tarjeta para la prueba. Si no pagas, sigues gratis con la agenda, sin el asistente.{" "}
          <a href={agendaGratis(`${origen}-gratis`)} className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink">{CTA_GRATIS}</a>
        </p>
      </div>
    </section>
  );
}

function CtaOscuro({ origen }: { origen: string }) {
  return (
    <section className="relative overflow-hidden py-28 md:py-40 bg-[#05080D] text-white">
      <div aria-hidden className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-[150vw] aspect-[2/1] rounded-full opacity-50 blur-[110px]"
        style={{ background: "radial-gradient(closest-side, rgba(156,204,60,.5), rgba(94,200,242,.25) 55%, transparent)" }} />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-white">
          Tu local, en orden.
          <span className="block bg-gradient-to-r from-[#B8E36A] via-[#9CCC3C] to-[#5EC8F2] bg-clip-text text-transparent pb-1">Desde hoy.</span>
        </h2>
        <p className="mt-6 text-lg text-white/65 leading-relaxed">
          30 días gratis del plan Pro, con Syna respondiendo tu WhatsApp desde el primer día.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <a href={altaIA(origen)}
            className="inline-flex justify-center items-center bg-white text-[#05080D] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors">
            {CTA_IA}
          </a>
          <a href={waLink("Hola, quiero conocer SynapTech para mi local")} target="_blank" rel="noopener noreferrer"
            className="text-[#B8E36A] font-semibold hover:underline underline-offset-4">
            Hablar por WhatsApp ›
          </a>
        </div>
        <p className="mt-6 text-sm text-white/45">
          No pedimos tarjeta para la prueba. Si no pagas, sigues gratis con la agenda, sin el asistente.{" "}
          <a href={agendaGratis(`${origen}-gratis`)} className="text-white/75 underline underline-offset-4 decoration-white/30 hover:decoration-white">{CTA_GRATIS}</a>
        </p>
      </div>
    </section>
  );
}

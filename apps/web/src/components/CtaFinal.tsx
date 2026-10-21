import { altaIA, agendaGratis, CTA_IA, CTA_GRATIS, waLink } from "@/content/catalogo";

export default function CtaFinal({ origen = "home-final" }: { origen?: string }) {
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

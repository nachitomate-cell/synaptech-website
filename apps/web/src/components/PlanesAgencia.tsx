import Aparece from "@/components/Aparece";
import { LinkWhatsAppConRef } from "@/components/CtaWhatsAppComparar";
import {
  AGENCIA_EQUIPO, AGENCIA_EQUIPO_ANUAL, INSTALACION_AGENCIA, PLANES_AGENCIA, TEMPORADA_BAJA,
  adaptar, adaptarPlan, type PlanAgencia, type Reemplazos,
} from "@/content/agencias";
import { fmt } from "@/content/precios";

/* Bloque de planes para agencias (09-11-2026). Salió de /agencias para que lo
   usen también /agencias/[tipo], /agente-ia-omnicanal y /crm-whatsapp. Los
   nombres y precios salen siempre de content/agencias.ts; lo único que cambia
   por tipo de agencia son las palabras (reemplazos: "vendedoras" por
   "corredores", "pasajeros" por "personas"). */

export const IconoWa = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
  </svg>
);

export const Check = ({ oscuro }: { oscuro?: boolean }) => (
  <svg className={`w-5 h-5 shrink-0 mt-0.5 ${oscuro ? "text-lime" : "text-accent"}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function TarjetaAgencia({ p, i }: { p: PlanAgencia; i: number }) {
  const oscuro = !!p.etiqueta;
  const equipo = p.id === AGENCIA_EQUIPO.id;
  return (
    <Aparece delay={i * 0.08} className="h-full">
      <article id={p.id} className={`relative h-full rounded-[28px] p-7 sm:p-8 flex flex-col scroll-mt-24 ${oscuro ? "bg-ink text-white" : "bg-white"}`}>
        {p.etiqueta && <span className="absolute -top-3 left-7 bg-lime text-ink text-xs font-bold px-3 py-1 rounded-full">{p.etiqueta}</span>}
        <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">{p.nombre}</h3>
        <p className={`mt-2 ${oscuro ? "text-white/70" : "text-text-secondary"}`}>{p.para}</p>
        <p className="mt-5">
          <span className="font-display font-bold text-[40px] tracking-tight leading-none">{p.suma ? "+" : ""}{fmt(p.mes)}</span>
          <span className={`text-sm ml-1 ${oscuro ? "text-white/60" : "text-text-muted"}`}>{p.unidad}</span>
        </p>
        {equipo && (
          <p className="text-sm mt-2 text-white/70">
            Anual: <span className="text-lime font-semibold">{fmt(AGENCIA_EQUIPO_ANUAL.anio)} + IVA</span>. Pagas {AGENCIA_EQUIPO_ANUAL.pagas} meses y usas 12.
          </p>
        )}
        <ul className="mt-6 flex flex-col gap-3 flex-1">
          {p.incluye.map((x) => <li key={x} className="flex gap-3 text-[15px] leading-snug"><Check oscuro={oscuro} /><span className="min-w-0">{x}</span></li>)}
        </ul>
        {p.nota && <p className={`mt-5 text-sm ${oscuro ? "text-white/60" : "text-text-muted"}`}>{p.nota}</p>}
        <LinkWhatsAppConRef texto={p.wa}
          className={`mt-7 inline-flex justify-center items-center text-center font-semibold px-6 py-3.5 rounded-full transition-colors ${
            oscuro ? "bg-lime text-ink hover:bg-white" : "bg-ink text-white hover:bg-black"}`}>
          {p.suma ? "Consultar por WhatsApp" : `Quiero ${p.nombre}`}
        </LinkWhatsAppConRef>
      </article>
    </Aparece>
  );
}

export function PlanesAgencia({
  titulo = "Un plan si vendes solo, otro si tienes equipo.",
  bajada = "Precios netos en pesos chilenos, más IVA. Si tienes una segunda marca o un segundo número, se suma al plan.",
  reemplazos = [],
}: { titulo?: string; bajada?: string; reemplazos?: Reemplazos }) {
  return (
    <section id="planes" className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <Aparece className="max-w-3xl mb-12">
          <p className="eyebrow mb-4">Planes y precios</p>
          <h2 className="text-ink">{titulo}</h2>
          <p className="text-text-secondary text-lg mt-5 leading-relaxed">{bajada}</p>
        </Aparece>
        <div className="rounded-[32px] bg-mist p-3 sm:p-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {PLANES_AGENCIA.map((p, i) => <TarjetaAgencia key={p.id} p={adaptarPlan(p, reemplazos)} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/** "Sin costo de instalación" y, para las agencias de turismo, la temporada baja. */
export function InstalacionAgencia({ reemplazos = [], temporadaBaja = true }: { reemplazos?: Reemplazos; temporadaBaja?: boolean }) {
  return (
    <section className="pb-16 md:pb-24">
      <div className={`max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid gap-5 ${temporadaBaja ? "lg:grid-cols-2" : ""}`}>
        <Aparece className="h-full">
          <article className="h-full rounded-[28px] border border-border-subtle p-7 sm:p-9">
            <p className="eyebrow mb-3">Para partir</p>
            <h2 className="text-ink !text-[clamp(1.6rem,3vw,2.25rem)]">Sin costo de instalación.</h2>
            <ul className={`mt-6 grid gap-3 ${temporadaBaja ? "" : "sm:grid-cols-2"}`}>
              {INSTALACION_AGENCIA.map((x) => <li key={x} className="flex gap-3 text-[15px]"><Check /><span>{adaptar(x, reemplazos)}</span></li>)}
            </ul>
          </article>
        </Aparece>
        {temporadaBaja && (
          <Aparece delay={0.08} className="h-full">
            <article id="temporada-baja" className="h-full rounded-[28px] bg-ink text-white p-7 sm:p-9 scroll-mt-24">
              <p className="text-lime text-xs font-bold uppercase tracking-[0.12em] mb-3">Temporada baja</p>
              <h2 className="text-white !text-[clamp(1.6rem,3vw,2.25rem)]">Cuando baja el turismo, baja el plan.</h2>
              <p className="mt-5">
                <span className="font-display font-bold text-[40px] tracking-tight leading-none">{fmt(TEMPORADA_BAJA.mes)}</span>
                <span className="text-sm ml-1 text-white/60">+ IVA / mes</span>
              </p>
              <p className="mt-5 text-white/75 leading-relaxed">
                Hasta {TEMPORADA_BAJA.meses} meses al año, {AGENCIA_EQUIPO.nombre} baja a {fmt(TEMPORADA_BAJA.mes)} + IVA. El asistente sigue
                contestando con {TEMPORADA_BAJA.conversaciones} conversaciones al mes, y tu equipo y tu historial quedan intactos.
              </p>
            </article>
          </Aparece>
        )}
      </div>
    </section>
  );
}

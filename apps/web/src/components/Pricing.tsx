import Link from "next/link";
import { PLANES, ANUAL, HOME_STUDIO, fmt } from "@/content/precios";
import { altaIA, agendaSinIA, waLink, A_MEDIDA_WA, CTA_IA, CTA_SIN_IA } from "@/content/catalogo";

/* Planes en tarjetas. Los datos salen de content/precios.ts, espejo de la
   lista oficial de la plataforma (admin-panel/src/lib/precios.js). El detalle
   completo, con adicionales y la tabla por plan, vive en /precios. */
export default function Pricing({ conEnlace = true }: { conEnlace?: boolean }) {
  return (
    <section id="precios" className="py-16 md:py-24 bg-mist scroll-mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mb-10">
          <p className="eyebrow mb-4">Planes y precios</p>
          <h2 className="text-ink">Un precio por local, no por silla.</h2>
          <p className="text-text-secondary text-lg mt-5 leading-relaxed">
            Profesionales ilimitados en todos los planes y sin comisión por cita.
            No pedimos tarjeta para la prueba.
          </p>
          {/* Cómo se parte (21-10-2026): el alta principal es crear.synaptechspa.cl,
              con Syna encendido y 30 días del plan Pro. La agenda sola, sin IA, en
              bioo (14 días del Pro). 26-10-2026: el plan Gratis ya no se publica.
              Lo a medida es la excepción, para quien de verdad lo necesita. */}
          <p className="text-text-secondary mt-4 leading-relaxed">
            Creas tu agenda en <b className="text-ink">crear.synaptechspa.cl</b> con 30 días gratis del plan Pro,
            con el asistente respondiendo tu WhatsApp desde el primer día. Al terminar eliges tu plan;
            no se cobra nada solo. ¿Solo quieres la agenda, sin IA? Pruébala 14 días en{" "}
            <b className="text-ink">bioo.cl/agenda</b>. ¿Varias sedes o un diseño propio?{" "}
            <a href={A_MEDIDA_WA} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink transition-colors">Te la armamos a medida</a>.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PLANES.map((p) => (
            <article key={p.id}
              className={`relative rounded-[28px] p-7 sm:p-8 flex flex-col ${p.popular ? "bg-ink text-white" : "bg-white"}`}>
              {p.popular && (
                <span className="absolute -top-3 left-7 bg-lime text-ink text-xs font-bold px-3 py-1 rounded-full">Más elegido</span>
              )}
              <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${p.popular ? "text-lime" : "text-accent"}`}>{p.sub}</p>
              <h3 className="font-display font-bold text-3xl tracking-tight mt-1">{p.nombre}</h3>
              <p className="mt-5">
                <span className="font-display font-bold text-[40px] tracking-tight leading-none">{fmt(p.mes)}</span>
                <span className={`text-sm ml-1 ${p.popular ? "text-white/60" : "text-text-muted"}`}>+ IVA / mes</span>
              </p>
              <p className={`text-sm mt-1 ${p.popular ? "text-white/60" : "text-text-muted"}`}>por local</p>
              <p className={`mt-5 leading-relaxed ${p.popular ? "text-white/80" : "text-text-secondary"}`}>{p.descripcion}</p>
              <ul className="mt-6 flex flex-col gap-3 flex-1">
                {p.destacados.map((d) => (
                  <li key={d} className="flex gap-3 text-[15px]">
                    <svg className={`w-5 h-5 shrink-0 mt-0.5 ${p.popular ? "text-lime" : "text-accent"}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
              <a href={altaIA(`precios-${p.id}`)}
                className={`mt-8 inline-flex justify-center items-center text-center font-semibold px-6 py-3.5 rounded-full transition-colors ${
                  p.popular ? "bg-lime text-ink hover:bg-white" : "bg-ink text-white hover:bg-black"
                }`}>
                {CTA_IA}
              </a>
            </article>
          ))}
        </div>

        {/* Home Studio (26-10-2026): el Básico para quien atiende solo. Se activa
            por WhatsApp, no se elige en el panel: por eso el botón es un chat. */}
        <div className="mt-5 rounded-[28px] bg-lime p-6 sm:px-8 flex flex-col md:flex-row md:items-center gap-5 justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/70">¿Atiendes solo?</p>
            <p className="mt-1 text-ink">
              <span className="font-display font-bold text-2xl tracking-tight">{HOME_STUDIO.nombre}: {fmt(HOME_STUDIO.mes)}</span>
              <span className="text-sm text-ink/70 ml-1 whitespace-nowrap">+ IVA / mes</span>
            </p>
            <p className="text-ink/80 mt-1 leading-relaxed">
              Todo el plan Básico para un profesional: barberos independientes y estudios en casa.
              Cuando sumas a alguien, pasas al Básico.
            </p>
          </div>
          <a href={waLink(`Hola, atiendo solo y quiero el plan ${HOME_STUDIO.nombre}`)} target="_blank" rel="noopener noreferrer"
            className="shrink-0 inline-flex justify-center items-center font-semibold px-6 py-3.5 rounded-full bg-ink text-white hover:bg-black transition-colors">
            Quiero el {HOME_STUDIO.nombre}
          </a>
        </div>

        <p className="mt-5 text-sm text-text-muted">
          La prueba es de 30 días del plan Pro, con el asistente. No pedimos tarjeta para la prueba.{" "}
          <a href={agendaSinIA("precios-sin-ia")} className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink">{CTA_SIN_IA}</a>
        </p>

        <div className="mt-6 rounded-[28px] bg-white p-6 sm:px-8 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <p className="text-text-secondary">
            <span className="font-semibold text-ink">Plan anual: {fmt(ANUAL.anio)} + IVA.</span>{" "}
            Todo el {ANUAL.base} pagando una vez al año: equivale a {ANUAL.equivaleMeses} meses.
          </p>
          {conEnlace && (
            <Link href="/precios" className="shrink-0 inline-flex items-center gap-2 font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink transition-colors">
              Ver todo lo que incluye cada plan →
            </Link>
          )}
        </div>
        {/* 26-10-2026: el plan Gratis ya no se publica; lo ofrece Ignacio en persona. */}
        <p className="text-sm text-text-muted mt-4">
          Precios netos en pesos chilenos; se suma IVA. Dos o más locales: te cotizamos un precio por volumen.
        </p>
      </div>
    </section>
  );
}

import Link from "next/link";
import { PLANES, ANUAL, fmt } from "@/content/precios";
import { alta, agendaGratis, A_MEDIDA_WA } from "@/content/catalogo";

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
            Sin tarjeta para partir y, si te sumas ahora, los primeros 2 meses van
            por nuestra cuenta.
          </p>
          {/* Cómo se parte (12-10-2026): todos crean su agenda solos en bioo
              con 14 días de Pro y eligen plan desde su panel; lo a medida es
              la excepción, para quien de verdad lo necesita. */}
          <p className="text-text-secondary mt-4 leading-relaxed">
            Todos parten igual: creas tu agenda en <b className="text-ink">bioo.cl/agenda</b>, nuestra agenda de
            autoservicio, con 14 días de todo el plan Pro, y al terminar eliges tu plan desde el panel.
            ¿Varias sedes o un diseño propio?{" "}
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
              <a href={alta(`precios-${p.id}`)}
                className={`mt-8 inline-flex justify-center items-center font-semibold px-6 py-3.5 rounded-full transition-colors ${
                  p.popular ? "bg-lime text-ink hover:bg-white" : "bg-ink text-white hover:bg-black"
                }`}>
                Empezar gratis
              </a>
            </article>
          ))}
        </div>

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
        {/* Plan Gratis (en vivo desde el 11-10-2026). Vive en bioo, nuestra marca
            de agenda gratis: el alta en bioo.cl/agenda crea el local al tiro en
            {slug}.bioo.cl. Lo que lista es lo que da functions/lib/plan-gratis.js
            en la plataforma (copy verificable): agenda, reserva, fichas,
            confirmación y un recordatorio por correo, hasta 4 profesionales; los
            primeros 14 días con todo lo del Pro. Desde el 12-10-2026 sus 50 avisos
            al mes salen por la vía OFICIAL de WhatsApp (recordatorios-bioo.js), así
            que se dicen: es lo que Setmore Free y AgendaLibre gratis no traen. */}
        <div className="mt-4 rounded-[28px] bg-white ring-2 ring-lime p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-5 justify-between">
          <div className="max-w-2xl">
            <p className="flex flex-wrap items-center gap-2.5">
              <span className="font-display font-bold text-ink text-2xl tracking-tight">Plan Gratis</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] bg-lime text-ink rounded-full px-2.5 py-1">Nuevo</span>
            </p>
            <p className="text-text-secondary mt-2 leading-relaxed">
              <span className="font-semibold text-ink">$0, para siempre, hasta 4 profesionales.</span>{" "}
              Agenda, reserva online 24/7 con tu propio link, fichas de clientes y
              confirmación y recordatorio de cada cita por correo, y 50 avisos al mes por la vía oficial de WhatsApp. Los primeros 14 días
              tienes todo lo del plan Pro. Lo armas en 5 minutos en bioo, nuestra agenda gratis.
            </p>
          </div>
          <a href={agendaGratis("precios")}
            className="shrink-0 inline-flex justify-center items-center bg-lime text-ink font-semibold px-6 py-3.5 rounded-full hover:bg-ink hover:text-white transition-colors">
            Crear mi agenda gratis
          </a>
        </div>
        <p className="text-sm text-text-muted mt-4">
          Precios netos en pesos chilenos; se suma IVA. Dos o más locales: te cotizamos un precio por volumen.
        </p>
      </div>
    </section>
  );
}

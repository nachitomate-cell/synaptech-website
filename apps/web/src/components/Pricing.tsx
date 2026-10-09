import Link from "next/link";
import { PLANES, ANUAL, SIGNUP, fmt } from "@/content/precios";
import { waLink } from "@/content/catalogo";

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
              <a href={`${SIGNUP}?ref=precios-${p.id}`}
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
        {/* Plan Gratis (09-10-2026): Ignacio lo está terminando. Lo que lista es
            lo que ya define functions/lib/plan-gratis.js en la plataforma (calcado
            de Setmore Free): agenda, reserva, fichas, confirmación y un
            recordatorio por correo, hasta 4 profesionales. Cuando se lance, sale
            el "En desarrollo" y el botón pasa al alta. */}
        <div className="mt-4 rounded-[28px] border-2 border-dashed border-ink/15 p-6 sm:px-8 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <p className="flex flex-wrap items-center gap-2.5">
              <span className="font-display font-bold text-ink text-xl tracking-tight">Plan Gratis</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] bg-lime/40 text-ink rounded-full px-2.5 py-1">En desarrollo</span>
            </p>
            <p className="text-text-secondary mt-1.5 leading-relaxed">
              Gratis para siempre, para locales de hasta 4 profesionales: agenda, reserva online,
              fichas de clientes y confirmación de cada cita por correo.
            </p>
          </div>
          <a href={waLink("Hola, quiero que me avisen cuando esté listo el plan Gratis de SynapTech")} target="_blank" rel="noopener noreferrer"
            className="shrink-0 inline-flex justify-center items-center border border-ink/20 text-ink font-semibold px-6 py-3 rounded-full hover:border-ink transition-colors">
            Avísame cuando esté
          </a>
        </div>
        <p className="text-sm text-text-muted mt-4">
          Precios netos en pesos chilenos; se suma IVA. Dos o más locales: te cotizamos un precio por volumen.
        </p>
      </div>
    </section>
  );
}

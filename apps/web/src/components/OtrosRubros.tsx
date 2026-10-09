import Link from "next/link";
import { waLink } from "@/content/catalogo";

/* Casos fuera de la belleza (decidido 09-10-2026). Van como "la misma forma
   de trabajar en otros negocios", NO como portafolio de software a medida: el
   sitio ya pagó caro parecer consultora (Google for Startups, 15-09).
   Sonqollay (plugin BIM para construcción) quedó fuera por esa razón.
   Cifras de Club Patio: 1.201 socios al 04-10-2026, 46 locales participantes. */
const CASOS = [
  {
    rubro: "Centro comercial",
    nombre: "Club Patio · Patio Curauma",
    texto: "El club de fidelización de SynapTech corriendo en un centro comercial completo: los socios juntan beneficios en todos los locales y reciben las novedades en el teléfono.",
    cifras: [{ v: "+1.200", l: "socios" }, { v: "46", l: "locales" }],
    puntos: ["Tarjeta digital del socio", "Beneficios por local", "Avisos al teléfono del socio", "Planilla semanal para la administración"],
    href: "/fidelizacion",
    cta: "Ver el club de fidelización",
  },
  {
    rubro: "Botillería",
    nombre: "Asistencia y caja del equipo",
    texto: "Control de asistencia con huellero y caja para una botillería: las marcas de entrada y salida llegan solas al panel y cada turno se cuadra al cierre.",
    cifras: [],
    puntos: ["Marcas desde el huellero, sin planillas", "Horas por persona, también en turnos nocturnos", "Arqueo, compras y descuadres de caja", "Reportes por período para pagar sueldos"],
  },
];

export default function OtrosRubros() {
  return (
    <section id="otros-rubros" className="py-16 md:py-24 bg-ink text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mb-12">
          <p className="eyebrow !text-lime mb-4">Más allá de la belleza</p>
          <h2 className="text-white">La misma forma de trabajar, en otros negocios.</h2>
          <p className="text-white/70 text-lg mt-5 leading-relaxed">
            Fidelizar clientes, ordenar al equipo y cuadrar la caja no es exclusivo de
            una barbería. Estos son dos negocios que ya funcionan con SynapTech.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {CASOS.map((c) => (
            <article key={c.nombre} className="rounded-[28px] bg-white/[0.06] border border-white/10 p-7 sm:p-10 flex flex-col">
              <span className="self-start text-xs font-bold uppercase tracking-[0.12em] text-ink bg-lime rounded-full px-3 py-1.5">{c.rubro}</span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mt-5">{c.nombre}</h3>
              <p className="text-white/70 mt-3 leading-relaxed">{c.texto}</p>
              {c.cifras.length > 0 && <div className="flex gap-8 mt-6">
                {c.cifras.map((f) => (
                  <div key={f.l}>
                    <p className="font-display font-bold text-3xl text-lime tracking-tight">{f.v}</p>
                    <p className="text-sm text-white/60">{f.l}</p>
                  </div>
                ))}
              </div>}
              <ul className="mt-6 flex flex-col gap-2.5 flex-1">
                {c.puntos.map((p) => (
                  <li key={p} className="flex gap-3 text-white/85">
                    <svg className="w-5 h-5 shrink-0 text-lime mt-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {p}
                  </li>
                ))}
              </ul>
              {c.href && (
                <Link href={c.href} className="self-start mt-7 font-semibold border-b-2 border-lime pb-0.5 hover:text-lime transition-colors">
                  {c.cta} →
                </Link>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 justify-between rounded-[28px] bg-white/[0.04] border border-white/10 p-7 sm:px-10">
          <p className="text-lg text-white/85">¿Tienes otro tipo de negocio y te sirve algo de esto?</p>
          <a href={waLink("Hola, tengo otro tipo de negocio y quiero ver si SynapTech me sirve")} target="_blank" rel="noopener noreferrer"
            className="inline-flex justify-center items-center bg-lime text-ink font-semibold px-6 py-3.5 rounded-full hover:bg-white transition-colors">
            Conversemos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

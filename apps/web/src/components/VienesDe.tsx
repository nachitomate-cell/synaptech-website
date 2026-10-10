import Link from "next/link";
import { COMPETIDORES } from "@/content/competidores";
import { MarcaCompetidor } from "./MarcaCompetidor";

/* "¿Vienes de otra agenda?" (10-10-2026): enlaces desde la home y los rubros
   a cada página "Alternativa a <marca>". Son las páginas que compiten por las
   búsquedas de la competencia, y un enlace interno desde la home es la señal
   más fuerte que les podemos dar. Marcas ajenas: el logo solo identifica. */
export default function VienesDe() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="rounded-[28px] border border-border-subtle p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="!text-2xl sm:!text-3xl text-ink">¿Vienes de otra agenda?</h2>
              <p className="text-text-secondary mt-2">Compara precios, WhatsApp y boletas con la que usas hoy. Te mudamos gratis desde cualquiera.</p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-x-6 gap-y-2 self-start md:self-auto">
              <Link href="/comparar/precios" className="font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink">Tabla de precios →</Link>
              <Link href="/comparar" className="font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink">Todas las comparaciones →</Link>
            </div>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 m-0 p-0 list-none">
            {COMPETIDORES.map((c) => (
              <li key={c.id}>
                <Link href={`/comparar/${c.id}`} title={`Alternativa a ${c.nombre}`}
                  className="flex flex-col items-start gap-2 h-full rounded-[18px] bg-mist hover:bg-lime/25 p-3.5 transition-colors">
                  <span className="h-8 w-full min-w-0 flex items-center"><MarcaCompetidor c={c} chico /></span>
                  <span className="text-[13px] font-semibold text-text-secondary">Alternativa a {c.nombre} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

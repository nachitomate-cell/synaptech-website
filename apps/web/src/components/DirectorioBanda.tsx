import Link from "next/link";
import { obtenerLocales } from "@/lib/directorio";

/* Franja de la home hacia el directorio (/locales). Sirve a los dos públicos:
   al cliente final que busca dónde atenderse y al dueño que ve locales reales
   trabajando con la plataforma. La lista sale del directorio en vivo
   (lib/directorio.ts); se muestran los logos de los más evaluados. */
export default async function DirectorioBanda() {
  const todos = await obtenerLocales();
  const locales = todos.filter((l) => l.logo).slice(0, 8);
  const comunas = new Set(todos.map((l) => l.comuna).filter(Boolean)).size;
  return (
    <section className="py-16 md:py-24 bg-mist">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Red Synaptech</p>
            <h2 className="text-ink">Locales reales, con reserva online.</h2>
            <p className="text-text-secondary text-lg mt-5 leading-relaxed">
              {todos.length} barberías, salones, clínicas y estudios en {comunas} comunas de Chile ya
              trabajan con SynapTech. Encuentra uno en el mapa y reserva tu hora.
            </p>
          </div>
          <Link href="/locales"
            className="self-start md:self-auto shrink-0 inline-flex items-center bg-ink text-white font-semibold px-6 py-3.5 rounded-full hover:bg-black transition-colors">
            Ver el mapa de locales →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {locales.map((l) => (
            <a key={l.id} href={l.url} target="_blank" rel="noopener"
              className="group rounded-[20px] overflow-hidden bg-white border border-border-subtle hover:shadow-card-hover transition-shadow">
              <span className="block relative aspect-[16/10]" style={{ backgroundColor: l.fondo }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/directorio-logos/${l.id}.webp`} alt={`Logo de ${l.nombre}`} loading="lazy" decoding="async"
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.04]" />
              </span>
              <span className="block px-4 py-3">
                <span className="block font-semibold text-ink text-[15px] leading-snug truncate">{l.nombre}</span>
                <span className="block text-sm text-text-muted mt-0.5">
                  {l.comuna}{l.rating ? ` · ★ ${l.rating.toFixed(1)}` : ""}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

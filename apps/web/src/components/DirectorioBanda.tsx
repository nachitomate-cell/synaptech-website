import Link from "next/link";
import { obtenerLocales } from "@/lib/directorio";

/* Franja de la home hacia el directorio (/locales). Sirve a los dos públicos:
   al cliente final que busca dónde atenderse y al dueño que ve locales reales
   trabajando con la plataforma. Las fichas salen del directorio en vivo
   (lib/directorio.ts); sin fichas, la franja igual enlaza. */
export default async function DirectorioBanda() {
  const locales = (await obtenerLocales()).filter((l) => l.imagen).slice(0, 4);
  return (
    <section className="py-16 md:py-24 bg-mist">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Red Synaptech</p>
            <h2 className="text-ink">Locales reales, con reserva online.</h2>
            <p className="text-text-secondary text-lg mt-5 leading-relaxed">
              Barberías, peluquerías y centros de estética de la Región de Valparaíso que
              ya trabajan con SynapTech. Encuentra uno y reserva tu hora.
            </p>
          </div>
          <Link href="/locales"
            className="self-start md:self-auto shrink-0 inline-flex items-center bg-ink text-white font-semibold px-6 py-3.5 rounded-full hover:bg-black transition-colors">
            Encuentra un local →
          </Link>
        </div>

        {locales.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {locales.map((l) => (
              <a key={l.tid} href={l.reservar} target="_blank" rel="noopener"
                className="group relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[3/4] rounded-[24px] overflow-hidden bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.imagen} alt={l.nombre} loading="lazy" decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute left-4 right-4 bottom-4 text-white">
                  <span className="block font-display font-bold text-lg leading-tight">{l.nombre}</span>
                  <span className="block text-sm text-white/75 mt-0.5">
                    {l.barrio}{l.rating ? ` · ★ ${l.rating.toFixed(1)}` : ""}
                  </span>
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

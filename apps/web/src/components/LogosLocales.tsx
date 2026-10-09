import Link from "next/link";
import { obtenerLocales, type LocalDirectorio } from "@/lib/directorio";

/* Locales reales que trabajan con SynapTech (09-10-2026: reemplaza a la tira de
   logos chicos sobre fichas negras y a la grilla de DirectorioBanda, que
   repetían lo mismo una debajo de la otra).
   - Quién aparece lo decide la lista VIVA del directorio (lib/directorio.ts):
     clientes vigentes, sin locales en prueba, sin agencias y sin los que
     pidieron no salir. Un local que se va, sale solo.
   - Cada tarjeta usa el logo ya recortado y centrado sobre el color de su
     propia marca (public/directorio-logos, ver devtools/guias-panel/sitio-web/
     directorio/LEEME.md), la nota real de Google y el link a su reserva.
   - Dos filas en sentidos opuestos; se detienen al pasar el cursor y quedan
     quietas si el visitante pidió menos movimiento. */

function Tarjeta({ l }: { l: LocalDirectorio }) {
  return (
    <li className="shrink-0 w-[200px] sm:w-[236px]">
      <a href={l.url} target="_blank" rel="noopener" className="group block" title={`Reservar en ${l.nombre}`}>
        <span
          className="block relative aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-ink/10 shadow-[0_12px_32px_-14px_rgba(15,26,43,.45)] transition-transform duration-300 group-hover:-translate-y-1"
          style={{ backgroundColor: l.fondo }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/directorio-logos/${l.id}.webp`} alt={`Logo de ${l.nombre}`} loading="lazy" decoding="async"
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.05]" />
        </span>
        <span className="mt-3 flex items-start justify-between gap-2">
          <span className="min-w-0">
            <span className="block font-semibold text-ink text-[14px] leading-snug truncate">{l.nombre}</span>
            <span className="block text-[12px] text-text-muted truncate">{l.comuna}</span>
          </span>
          {l.rating && (
            <span className="shrink-0 text-[12px] font-semibold text-ink bg-mist rounded-full px-2 py-0.5" title={`${l.opiniones ?? ""} reseñas en Google`}>
              ★ {l.rating.toFixed(1)}
            </span>
          )}
        </span>
      </a>
    </li>
  );
}

function Cinta({ locales, reversa = false }: { locales: LocalDirectorio[]; reversa?: boolean }) {
  // Dos copias seguidas: cuando la primera termina su recorrido, la segunda
  // ocupa su lugar y el loop no salta (ver .animate-marquee en globals.css).
  return (
    <div className="flex gap-5 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      {[false, true].map((copia) => (
        <ul key={String(copia)} aria-hidden={copia || undefined}
          className={`flex gap-5 shrink-0 m-0 p-0 list-none animate-marquee-locales ${reversa ? "marquee-reversa" : ""}`}>
          {locales.map((l) => <Tarjeta key={l.id} l={l} />)}
        </ul>
      ))}
    </div>
  );
}

export default async function LogosLocales() {
  const todos = await obtenerLocales();
  const conLogo = todos.filter((l) => l.logo);
  const comunas = new Set(todos.map((l) => l.comuna).filter(Boolean)).size;
  const fila1 = conLogo.filter((_, i) => i % 2 === 0);
  const fila2 = conLogo.filter((_, i) => i % 2 === 1);
  return (
    <section className="py-16 md:py-24 border-t border-border-subtle overflow-hidden group/marquee">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Locales que ya la usan</p>
            <h2 className="text-ink">Locales reales, con reserva online.</h2>
            <p className="text-text-secondary text-lg mt-5 leading-relaxed">
              {todos.length} barberías, salones, clínicas y estudios en {comunas} comunas de Chile
              trabajan hoy con SynapTech. Toca cualquiera para ver su página de reservas.
            </p>
          </div>
          <Link href="/locales"
            className="self-start md:self-auto shrink-0 inline-flex items-center bg-ink text-white font-semibold px-6 py-3.5 rounded-full hover:bg-black transition-colors">
            Ver el mapa de locales →
          </Link>
        </div>
      </div>
      <div className="space-y-6">
        <Cinta locales={fila1} />
        <Cinta locales={fila2} reversa />
      </div>
    </section>
  );
}

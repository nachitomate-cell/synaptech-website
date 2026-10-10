import type { Competidor } from "@/content/competidores";

/* Logo oficial de un competidor (public/competencia). Si su logo oficial es
   solo un ícono (AgendaYA, Te Reservo), el nombre va escrito al lado: no se
   recrea ningún wordmark. */
export function MarcaCompetidor({ c, chico = false }: { c: Competidor; chico?: boolean }) {
  if (!c.logo) return <span className="font-display font-bold text-ink text-xl tracking-tight">{c.nombre}</span>;
  if (c.logoTipo === "icono") {
    return (
      <span className={`inline-flex items-center ${chico ? "gap-1.5" : "gap-2"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.logo} alt="" className={chico ? "h-5 w-5 object-contain" : "h-8 w-8 sm:h-11 sm:w-11 object-contain"} />
        <span className={`font-display font-bold text-ink tracking-tight whitespace-nowrap ${chico ? "text-[15px]" : "text-lg sm:text-2xl"}`}>{c.nombre}</span>
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={c.logo} alt={`Logo de ${c.nombre}`}
      className={chico ? "h-6 w-auto max-w-full object-contain object-left" :"max-h-8 sm:max-h-12 max-w-full sm:max-w-[200px] w-auto object-contain"} />
  );
}

/* Nombre del competidor en texto, con un punto de su color de marca (varios
   colores de marca, como el turquesa de Agendapia, no se leen como texto). */
export function NombreConPunto({ c }: { c: Competidor }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} aria-hidden />
      {c.nombre}
    </span>
  );
}

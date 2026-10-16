import type { LocalDirectorio } from "@/lib/directorio";
import { nombreRegion } from "@/lib/regiones";
import type { Pregunta } from "@/components/FaqSeo";

/* Preguntas frecuentes de /locales, armadas con los datos VIVOS del directorio: las
   comunas, los rubros y las notas cambian solos cuando entra o sale un local. Las
   respuestas solo afirman lo que la reserva hace hoy (Google exige que el FAQPage
   diga lo mismo que se ve en pantalla, y lo leen también los buscadores con IA). */

const lista = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} y ${xs[xs.length - 1]}`);
const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;

/** Comunas agrupadas por región, de la región con más locales a la con menos. */
export function porRegion(locales: LocalDirectorio[]) {
  const regiones = new Map<string, Map<string, LocalDirectorio[]>>();
  for (const l of locales) {
    if (!l.comuna) continue;
    const r = nombreRegion(l.region) || "Otras regiones";
    if (!regiones.has(r)) regiones.set(r, new Map());
    const cs = regiones.get(r)!;
    cs.set(l.comuna, [...(cs.get(l.comuna) ?? []), l]);
  }
  const total = (m: Map<string, LocalDirectorio[]>) => [...m.values()].reduce((a, x) => a + x.length, 0);
  return [...regiones.entries()]
    .sort((a, b) => total(b[1]) - total(a[1]) || a[0].localeCompare(b[0], "es"))
    .map(([region, cs]) => ({
      region,
      comunas: [...cs.entries()]
        .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], "es"))
        .map(([comuna, ls]) => ({ comuna, locales: ls })),
    }));
}

export function preguntasDirectorio(locales: LocalDirectorio[]): Pregunta[] {
  const grupos = porRegion(locales);
  const comunas = grupos.reduce((a, g) => a + g.comunas.length, 0);
  const n = (r: LocalDirectorio["rubro"]) => locales.filter((l) => l.rubro === r).length;
  const conReserva = locales.filter((l) => l.reserva).length;
  const tipos = [
    n("barberia") && plural(n("barberia"), "barbería", "barberías"),
    n("salon") && plural(n("salon"), "peluquería o salón de belleza", "peluquerías y salones de belleza"),
    n("estetica") && plural(n("estetica"), "local de estética (centro, clínica o spa)", "locales de estética (centros, clínicas y spas)"),
    n("pilates") && plural(n("pilates"), "estudio de pilates", "estudios de pilates"),
  ].filter(Boolean) as string[];
  const mejores = locales
    .filter((l) => l.rating && (l.opiniones ?? 0) >= 20)
    .sort((a, b) => b.rating! - a.rating! || b.opiniones! - a.opiniones!)
    .slice(0, 5)
    .map((l) => `${l.nombre} (${l.etiqueta.toLowerCase()} en ${l.comuna}, ${l.rating!.toFixed(1).replace(".", ",")} con ${l.opiniones} opiniones)`);

  const preguntas: Pregunta[] = [
    {
      q: "¿En qué comunas hay barberías y salones con reserva online inmediata?",
      a: `Hoy hay ${plural(locales.length, "local", "locales")} de la Red SynapTech en ${plural(comunas, "comuna", "comunas")} de Chile. ` +
        grupos.map((g) => `${g.region}: ${lista(g.comunas.map((c) => `${c.comuna} (${c.locales.length})`))}`).join(". ") + ".",
    },
    {
      q: "¿Qué tipos de locales hay en el directorio?",
      a: `${lista(tipos).replace(/^./, (c) => c.toUpperCase())}. Todos trabajan con la agenda de SynapTech` +
        (conReserva === locales.length
          ? " y tienen su página de reservas abierta las 24 horas."
          : `, y ${conReserva} de ellos tienen su página de reservas abierta las 24 horas.`),
    },
    {
      q: "¿Cómo agendo una hora sin llamar?",
      a: "Toca «Reservar hora» en la tarjeta del local: se abre su página de reservas, eliges el servicio, el profesional y un horario libre, y dejas tus datos. Funciona a cualquier hora, sin llamar ni esperar respuesta por WhatsApp, y la hora queda tomada al instante en la agenda del local.",
    },
    {
      q: "¿Reservar tiene algún costo?",
      a: "No. Reservar es gratis: el servicio lo pagas en el local, al precio que ves al reservar. Algunos locales piden un abono para confirmar la hora, y lo muestran antes de que reserves.",
    },
  ];
  if (mejores.length) {
    preguntas.splice(2, 0, {
      q: "¿Cuáles son los locales mejor evaluados en Google?",
      a: `Entre los locales con 20 opiniones o más en Google: ${lista(mejores)}. Las notas se actualizan a diario.`,
    });
  }
  preguntas.push({
    q: "¿Cómo aparece mi local en este directorio?",
    a: "Los locales que trabajan con SynapTech aparecen solos, con su logo, dirección, servicios y reserva online, y salen solos si dejan de usarla. Si prefieres no aparecer, no apareces.",
  });
  return preguntas;
}

/** Sección de llms.txt: un local por línea, agrupados por región, con su página de reservas. */
export function seccionLlms(locales: LocalDirectorio[]) {
  const precio = (l: LocalDirectorio) =>
    l.precioMin && l.precioMax ? ` Servicios desde $${l.precioMin.toLocaleString("es-CL")} hasta $${l.precioMax.toLocaleString("es-CL")}.` : "";
  const serv = (l: LocalDirectorio) => (l.servicios.length ? ` Destacados: ${l.servicios.map((s) => s.nombre).join("; ")}.` : "");
  const nota = (l: LocalDirectorio) => (l.rating && l.opiniones ? ` Google: ${l.rating.toFixed(1)} (${l.opiniones} opiniones).` : "");
  return porRegion(locales).map((g) => `### ${g.region}\n` + g.comunas.flatMap((c) => c.locales.map((l) =>
    `- ${l.nombre} — ${l.etiqueta} en ${c.comuna}. ${[l.direccion, c.comuna].filter(Boolean).join(", ")}.${serv(l)}${precio(l)}${nota(l)} ` +
    (l.reserva ? `Reserva online: ${l.web}/` : `Web: ${l.web}/`))).join("\n")).join("\n\n");
}

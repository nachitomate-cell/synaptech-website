import type { Horario } from "@/lib/directorio";

/* "Abierto ahora" del directorio. Se calcula en el navegador, nunca en el
   servidor: la página se regenera cada hora y un "Abierto" horneado en el HTML
   quedaría mintiendo. La hora es la del PAÍS del local (Lima, Querétaro…), no
   la del visitante. */

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const minutos = (hhmm: string) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
const hora = (hhmm: string) => hhmm.replace(/^0(\d)/, "$1");

/** Día de la semana (0 = domingo) y minuto del día en ese huso. */
function ahoraEn(tz: string, ahora: Date) {
  const partes = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
    .formatToParts(ahora);
  const v = (t: string) => partes.find((p) => p.type === t)?.value ?? "";
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(v("weekday"));
  return { dia, min: Number(v("hour")) * 60 + Number(v("minute")) };
}

export type EstadoLocal = { abierto: boolean; texto: string };

export function estadoAhora(h: Horario | null, tz: string, ahora = new Date()): EstadoLocal | null {
  if (!h) return null;
  const { dia, min } = ahoraEn(tz, ahora);
  if (dia < 0) return null;
  // Un turno que cierra pasada la medianoche ("18:00–02:00" o "–00:00") sigue abierto al día siguiente.
  const fin = (r: [string, string]) => { const a = minutos(r[0]), b = minutos(r[1]); return b <= a ? b + 1440 : b; };
  const ayer = h[(dia + 6) % 7];
  if (ayer && fin(ayer) > 1440 && min < fin(ayer) - 1440) return { abierto: true, texto: `Abierto · cierra a las ${hora(ayer[1])}` };
  const hoy = h[dia];
  if (hoy && min >= minutos(hoy[0]) && min < fin(hoy)) return { abierto: true, texto: `Abierto · cierra a las ${hora(hoy[1])}` };
  if (hoy && min < minutos(hoy[0])) return { abierto: false, texto: `Cerrado · abre hoy a las ${hora(hoy[0])}` };
  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7, r = h[d];
    if (r) return { abierto: false, texto: `Cerrado · abre ${i === 1 ? "mañana" : `el ${DIAS[d]}`} a las ${hora(r[0])}` };
  }
  return null;
}

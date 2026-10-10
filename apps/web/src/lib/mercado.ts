import { COMPETIDORES, SYNAPTECH, fechaDe, type Competidor, type Precio } from "@/content/competidores";

/* Precios del mercado en un solo lugar (10-10-2026), para /comparar/precios,
   /llms.txt y /llms-full.txt. Todo sale de content/competidores.ts: si un
   precio cambia allá, estas tablas y el "más barato" cambian solos. Nada de
   rankings escritos a mano que queden viejos. */

export const TAMANOS = [1, 3, 6, 9] as const;

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

/** "10 de octubre de 2026" → "2026-10-10". */
export function isoDe(fecha: string) {
  const m = fecha.match(/^(\d{1,2}) de ([a-z]+) de (\d{4})$/);
  if (!m) return fecha;
  return `${m[3]}-${String(MESES.indexOf(m[2]) + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

/** Fecha del dato más nuevo de la tabla (ISO). */
export const ultimaVerificacion = () => COMPETIDORES.map((c) => isoDe(fechaDe(c))).sort().at(-1)!;
/** La misma, como se escribe: "10 de octubre de 2026". */
export const ultimaVerificacionTexto = () => fechaDe(COMPETIDORES.find((c) => isoDe(fechaDe(c)) === ultimaVerificacion())!);

/** Pesos chilenos de un precio publicado, o null si es en otra moneda o "desde".
    "$54.900 + IVA" → 54900 · "6 × $9.990" → 59940 · "US$15" → null. */
export function clpDe(valor: string): number | null {
  if (/US\$|€|R\$|desde/i.test(valor)) return null;
  const n = (t: string) => Number(t.replace(/\./g, ""));
  const por = valor.match(/^(\d+)\s*×\s*\$([\d.]+)/);
  if (por) return Number(por[1]) * n(por[2]);
  const m = valor.match(/\$([\d.]+)/);
  return m ? n(m[1]) : null;
}

export type FilaMercado = { id: string; nombre: string; precios: [Precio, Precio, Precio, Precio]; fecha: string | null; fuente: string | null; c?: Competidor };

/** SynapTech primero y después cada agenda, en el orden de content/competidores.ts. */
export function filasMercado(): FilaMercado[] {
  return [
    { id: "synaptech", nombre: "SynapTech", precios: SYNAPTECH.precios, fecha: null, fuente: null },
    ...COMPETIDORES.map((c) => ({ id: c.id, nombre: c.nombre, precios: c.precios, fecha: fechaDe(c), fuente: c.fuentes[0]?.url ?? null, c })),
  ];
}

/** Las k más baratas en pesos para el tamaño i (0..3), sin contar los planes gratis
    (se nombran aparte) ni lo que no se puede pasar a pesos sin inventar un tipo de cambio. */
export function masBaratas(i: number, k = 3) {
  return filasMercado()
    .map((f) => ({ f, clp: clpDe(f.precios[i].valor) }))
    .filter((x): x is { f: FilaMercado; clp: number } => x.clp !== null && x.clp > 0)
    .sort((a, b) => a.clp - b.clp)
    .slice(0, k)
    .map((x) => x.f);
}

/** Gratis con i (0..3) profesionales, en cualquier moneda. */
export const gratisCon = (i: number) => filasMercado().filter((f) => /^(US)?\$0\b/.test(f.precios[i].valor));

/** La pregunta de precio de cada agenda ("¿Cuánto cuesta X?" o "¿X es gratis?"). */
export function precioFaqDe(c: Competidor) {
  return c.faq.find((f) => f.q.includes(c.nombre) && /cuánto cuesta|gratis/i.test(f.q)) ?? null;
}

const precioCorto = (p: Precio) => p.valor + (p.nota ? `, ${p.nota}` : "");

/** "¿Cuál es la agenda online más barata?" respondida con la tabla, tamaño por tamaño. */
export function respuestaMasBarata() {
  const partes = TAMANOS.map((n, i) => {
    const lista = masBaratas(i).map((f) => `${f.nombre} (${precioCorto(f.precios[i])})`).join(", ");
    const gratis = gratisCon(i).map((f) => f.nombre);
    return `con ${n} ${n === 1 ? "profesional" : "profesionales"}: ${lista}${gratis.length ? `; gratis: ${gratis.join(" y ")}` : ""}`;
  });
  const fuera = (re: RegExp) => COMPETIDORES.filter((c) => c.precios.every((p) => re.test(p.valor))).map((c) => c.nombre);
  const dolares = fuera(/US\$/), desde = fuera(/desde/i);
  return `Depende del tamaño del equipo. Entre las que publican precio en pesos, las más baratas al mes son, ${partes.join("; ")}.${dolares.length ? ` No se cuentan las que cobran en dólares (${dolares.join(", ")})` : ""}${desde.length ? `${dolares.length ? " ni" : " No se cuentan"} las que publican solo precios "desde" (${desde.join(", ")})` : ""}. Cada precio está tal como lo publica su página, con su fecha, en www.synaptechspa.cl/comparar/precios.`;
}

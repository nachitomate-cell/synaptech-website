import type { LocalDirectorio } from "@/lib/directorio";
import { nombreRegion } from "@/lib/regiones";

/* Precios referenciales del directorio (16-10-2026). Cada local aporta el precio
   MÁS BAJO que ofrece de cada tipo (functions/metricas-publicas.js → preciosTipo,
   lo que ve el cliente en su reserva). Con eso se arma, por comuna o por zona,
   el mínimo, la mediana y el máximo: solo tipos que ofrecen 2 o más locales,
   porque un solo precio no es una referencia. Nada inventado. */

export const TIPOS_PRECIO: [string, string][] = [
  ["corte", "Corte de pelo"], ["degradado", "Degradado (fade)"], ["barba", "Arreglo de barba"],
  ["corte-barba", "Corte + barba"], ["cejas", "Perfilado de cejas"], ["limpieza-facial", "Limpieza facial"],
  ["manicure", "Manicure y uñas"], ["pedicure", "Pedicure"], ["masaje", "Masajes"], ["pestanas", "Pestañas"],
  ["color", "Color y mechas"], ["depilacion", "Depilación"],
];

/** Para preguntar "¿Cuánto cuesta UN corte de pelo…?" (y no "cuesta corte de pelo"). */
export const CON_ARTICULO: Record<string, string> = {
  corte: "un corte de pelo", degradado: "un degradado (fade)", barba: "un arreglo de barba", "corte-barba": "un corte + barba",
  cejas: "un perfilado de cejas", "limpieza-facial": "una limpieza facial", manicure: "una manicure", pedicure: "una pedicure",
  masaje: "un masaje", pestanas: "un servicio de pestañas", color: "un color o mechas", depilacion: "una depilación",
};
/** "Región Metropolitana" → "la Región Metropolitana"; una comuna queda igual. */
export const enZona = (nombre: string) =>
  (String(nombre).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().startsWith("region ") ? `la ${nombre}` : nombre);

export type FilaPrecio = { tipo: string; nombre: string; min: number; mediana: number; max: number; locales: LocalDirectorio[] };

export const clp = (n: number) => `$${Math.round(n).toLocaleString("es-CL")}`;

/** Una fila por tipo con 2+ locales (cada negocio cuenta una vez, aunque tenga varias sedes). */
export function tablaPrecios(locales: LocalDirectorio[], minLocales = 2): FilaPrecio[] {
  const filas: FilaPrecio[] = [];
  for (const [tipo, nombre] of TIPOS_PRECIO) {
    const vistos = new Set<string>();
    // Solo pesos chilenos: un precio en soles o en pesos argentinos no se compara.
    const con = locales.filter((l) => (l.pais || "CL") === "CL" && Number(l.preciosTipo?.[tipo]) > 0 && !vistos.has(l.tid) && (vistos.add(l.tid), true));
    if (con.length < minLocales) continue;
    const v = con.map((l) => Number(l.preciosTipo[tipo])).sort((a, b) => a - b);
    const m = Math.floor(v.length / 2);
    filas.push({ tipo, nombre, min: v[0], mediana: v.length % 2 ? v[m] : Math.round((v[m - 1] + v[m]) / 2), max: v[v.length - 1], locales: con });
  }
  return filas;
}

export const slugZona = (s: string) =>
  String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** Comunas con 2+ negocios que tienen precios comparables, de la con más locales a la con menos. */
export function preciosPorComuna(locales: LocalDirectorio[]) {
  const por = new Map<string, LocalDirectorio[]>();
  for (const l of locales) if (l.comuna) por.set(l.comuna, [...(por.get(l.comuna) ?? []), l]);
  return [...por.entries()]
    .map(([comuna, ls]) => ({ comuna, region: nombreRegion(ls[0].region), filas: tablaPrecios(ls) }))
    .filter((x) => x.filas.length)
    .sort((a, b) => b.filas[0].locales.length - a.filas[0].locales.length || a.comuna.localeCompare(b.comuna, "es"));
}

/* ── Landings por zona (/locales/{zona}) ──────────────────────────────────
   Una por región y una por comuna con 3+ negocios: es donde hay "presencia
   fuerte" (contenido de sobra para una página propia, no una lista de uno).
   Se arman solas con los datos del directorio: un local nuevo en Ñuñoa suma
   a la página de la Región Metropolitana sin tocar nada. */
export type Zona = { slug: string; nombre: string; tipo: "region" | "comuna"; locales: LocalDirectorio[] };

export function zonasDirectorio(locales: LocalDirectorio[], minComuna = 3): Zona[] {
  const regiones = new Map<string, LocalDirectorio[]>();
  const comunas = new Map<string, LocalDirectorio[]>();
  for (const l of locales) {
    if (l.region) { const r = nombreRegion(l.region); regiones.set(r, [...(regiones.get(r) ?? []), l]); }
    if (l.comuna) comunas.set(l.comuna, [...(comunas.get(l.comuna) ?? []), l]);
  }
  const negocios = (ls: LocalDirectorio[]) => new Set(ls.map((l) => l.tid)).size;
  /* Una página con uno o dos locales es contenido delgado (y Google le baja el
     crédito al dominio entero): región y comuna piden 3 negocios o más. Si una
     región tiene justo los mismos locales que su única comuna (Coquimbo = La
     Serena), queda la de la comuna, que es lo que la gente busca. */
  const out: Zona[] = [];
  const comunasZ: Zona[] = [];
  for (const [c, ls] of comunas) if (negocios(ls) >= minComuna) comunasZ.push({ slug: slugZona(c), nombre: c, tipo: "comuna", locales: ls });
  for (const [r, ls] of regiones) {
    if (negocios(ls) < minComuna) continue;
    const igual = comunasZ.some((z) => z.locales.length === ls.length && z.locales.every((l) => ls.includes(l)));
    if (!igual) out.push({ slug: slugZona(r), nombre: r, tipo: "region", locales: ls });
  }
  out.push(...comunasZ);
  return out.sort((a, b) => b.locales.length - a.locales.length);
}

import type { LocalDirectorio } from "@/lib/directorio";
import { COMUNAS, comunaPorSlug, type Comuna } from "@/content/comunas-chile";

/* Páginas "{rubro} en {comuna}" (/locales/{comuna}/{rubro}), 06-11-2026.

   La idea viene de cómo prospecta MyBarbero: tiene una página por comuna aunque
   no tenga a nadie ahí, la página junta búsquedas de Google y ese número es el
   argumento para escribirle al dueño ("tu comuna tuvo 7 visitas y no hay
   ninguna barbería, serías la primera").

   Una comuna sin locales es contenido delgado y Google le baja el crédito a todo
   el dominio (por eso /locales/{zona} pide 3 negocios). Acá la página NO queda
   vacía: muestra los locales del rubro EN la comuna y, si faltan, los más
   cercanos con su distancia en km, que es lo que necesita quien busca "barbería
   San Miguel". Freno: la página existe solo con 3 negocios del rubro a 12 km o
   menos del centro de la comuna; si no, 404. Las comunas se encienden solas a
   medida que entran locales. */

export const RADIO_KM = 12;
export const MIN_NEGOCIOS = 3;
const MAX_CERCANOS = 9;

export type RubroComuna = {
  slug: string;
  /** "Barberías", "Peluquerías"… (H1 y migas). */
  nombre: string;
  /** "barberías" (texto corrido). */
  plural: string;
  /** "una barbería" (para "¿Tienes una barbería en…?"). */
  una: string;
  /** "la primera", "el primero": género del rubro. */
  primera: string;
  entra: (l: LocalDirectorio) => boolean;
};

/* Mismo criterio que lib/paginas-directorio.ts: los "mixtos" (barbería y
   peluquería, como Renacer) salen en las dos. */
export const RUBROS_COMUNA: RubroComuna[] = [
  { slug: "barberias", nombre: "Barberías", plural: "barberías", una: "una barbería", primera: "la primera", entra: (l) => l.rubro === "barberia" || l.tipo === "mixto" },
  { slug: "peluquerias", nombre: "Peluquerías y salones", plural: "peluquerías y salones", una: "una peluquería o salón", primera: "el primero", entra: (l) => l.rubro === "salon" || l.tipo === "mixto" },
  { slug: "estetica", nombre: "Centros de estética y spas", plural: "centros de estética y spas", una: "un centro de estética o spa", primera: "el primero", entra: (l) => l.rubro === "estetica" },
  { slug: "pilates", nombre: "Estudios de pilates", plural: "estudios de pilates", una: "un estudio de pilates", primera: "el primero", entra: (l) => l.rubro === "pilates" },
];

/** Las que ya tienen página propia con más historia en Google: se redirige ahí. */
export const YA_EXISTE: Record<string, string> = {
  "vina-del-mar/barberias": "/barberias-vina-del-mar",
  "vina-del-mar/peluquerias": "/peluquerias-vina-del-mar",
};

export const rubroComuna = (slug: string) => RUBROS_COMUNA.find((r) => r.slug === slug);

/** Distancia en km entre dos puntos (haversine). */
export function km(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const t = Math.PI / 180;
  const h = Math.sin(((b.lat - a.lat) * t) / 2) ** 2 + Math.cos(a.lat * t) * Math.cos(b.lat * t) * Math.sin(((b.lng - a.lng) * t) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export const kmTexto = (n: number) => (n < 1 ? "a menos de 1 km" : `a ${n.toFixed(1).replace(".", ",")} km`);

export type Cercano = LocalDirectorio & { km: number | null };
export type PaginaComuna = {
  comuna: Comuna;
  rubro: RubroComuna;
  /** Los del rubro en la comuna (por nombre de comuna o a menos de 1 km sin comuna). */
  enComuna: Cercano[];
  /** Los de otras comunas, del más cercano al más lejano, dentro del radio. */
  cercanos: Cercano[];
  /** Negocios distintos (no sedes) en el radio, contando los de la comuna. */
  negocios: number;
};

const norm = (s: string) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

export function paginaComuna(locales: LocalDirectorio[], comuna: Comuna, rubro: RubroComuna): PaginaComuna {
  const delRubro = locales.filter((l) => (l.pais || "CL") === "CL" && rubro.entra(l));
  const conKm: Cercano[] = delRubro.map((l) => ({ ...l, km: l.lat != null && l.lng != null ? km(comuna, { lat: l.lat, lng: l.lng }) : null }));
  const enComuna = conKm.filter((l) => norm(l.comuna) === norm(comuna.nombre)).sort((a, b) => (a.km ?? 0) - (b.km ?? 0));
  const tidsComuna = new Set(enComuna.map((l) => l.tid));
  /* Una cadena con sedes (Punto Pilates) cuenta una vez: la sede más cercana. */
  const vistos = new Set<string>(tidsComuna);
  const cercanos = conKm
    .filter((l) => l.km != null && l.km <= RADIO_KM && norm(l.comuna) !== norm(comuna.nombre))
    .sort((a, b) => a.km! - b.km!)
    .filter((l) => (vistos.has(l.tid) ? false : (vistos.add(l.tid), true)))
    .slice(0, MAX_CERCANOS);
  return { comuna, rubro, enComuna, cercanos, negocios: vistos.size };
}

/** La página de esa comuna y rubro, o null si no existe (comuna desconocida o pocos negocios cerca). */
export function paginaComunaDe(locales: LocalDirectorio[], comunaSlug: string, rubroSlug: string): PaginaComuna | null {
  const c = comunaPorSlug(comunaSlug), r = rubroComuna(rubroSlug);
  if (!c || !r) return null;
  const p = paginaComuna(locales, c, r);
  return p.negocios >= MIN_NEGOCIOS ? p : null;
}

/** Todas las páginas que hoy existen (para el sitemap, los enlaces y generateStaticParams). */
export function paginasComuna(locales: LocalDirectorio[]): PaginaComuna[] {
  const out: PaginaComuna[] = [];
  for (const r of RUBROS_COMUNA) {
    for (const c of COMUNAS) {
      if (YA_EXISTE[`${c.slug}/${r.slug}`]) continue;
      const p = paginaComuna(locales, c, r);
      if (p.negocios >= MIN_NEGOCIOS) out.push(p);
    }
  }
  return out;
}

/** Comunas vecinas con página del mismo rubro, de la más cercana a la más lejana. */
export function vecinas(todas: PaginaComuna[], p: PaginaComuna, n = 8) {
  return todas
    .filter((x) => x.rubro.slug === p.rubro.slug && x.comuna.slug !== p.comuna.slug)
    .map((x) => ({ x, d: km(p.comuna, x.comuna) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, n)
    .map(({ x }) => x);
}

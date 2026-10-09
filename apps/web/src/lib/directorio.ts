/* Directorio de locales ("Red Synaptech").

   QUIÉN aparece lo decide la plataforma, en vivo: la lista `_publico/metricas.directorio`
   (los clientes según functions/metricas-publicas.js), menos los que están en prueba y los
   que pidieron no aparecer (`_system/{id}.directorioPublico === false`). Es el mismo criterio
   que usa scripts/gen-directorio-vina.mjs para las cuatro páginas por zona.

   LOS DATOS de cada local (nombre, rubro, dirección, coordenadas, logo) viven en
   content/directorio-locales.ts. Si la plataforma suma un cliente que todavía no está ahí,
   aparece igual en la lista con su nombre, sin logo ni punto en el mapa, hasta que se agregue.

   Se lee por REST con la clave web pública de Firebase (la misma que sirve cualquier página
   de reserva; las reglas solo dejan leer lo público) y se revalida una vez al día. */
import { LOCALES_BASE, type LocalBase, type Rubro } from "@/content/directorio-locales";

const FB_API_KEY = "AIzaSyDqVkAhkXALm3hLcrmzjiaS3flUezPFe2Q";
const RAIZ = "projects/barberia-elegance/databases/(default)/documents";
const API = `https://firestore.googleapis.com/v1/${RAIZ}`;
const DIA = { next: { revalidate: 86400 } } as const;

export type { Rubro };
export type LocalDirectorio = Omit<LocalBase, "lat" | "lng"> & {
  lat: number | null; lng: number | null; logo: boolean;
  rating: number | null; opiniones: number | null;
};

export type PaginaDirectorio = { slug: string; titulo: string; bajada: string };
export const PAGINAS: PaginaDirectorio[] = [
  { slug: "barberias-vina-del-mar",    titulo: "Barberías en Viña del Mar", bajada: "Las barberías de Viña con reserva online." },
  { slug: "barberias-quinta-region",   titulo: "Barberías en la Región de Valparaíso", bajada: "Viña, Valparaíso, Villa Alemana y Limache." },
  { slug: "peluquerias-vina-del-mar",  titulo: "Peluquerías y salones en Viña del Mar", bajada: "Salones, peluquerías y estética en Viña." },
  { slug: "peluquerias-quinta-region", titulo: "Peluquerías y salones en la Región de Valparaíso", bajada: "Toda la región, con reserva online." },
];

type Valor = { stringValue?: string; integerValue?: string; doubleValue?: number; booleanValue?: boolean;
  arrayValue?: { values?: Valor[] }; mapValue?: { fields?: Record<string, Valor> } };
const plano = (v?: Valor): unknown => {
  if (!v) return null;
  if (v.stringValue !== undefined) return v.stringValue;
  if (v.integerValue !== undefined) return Number(v.integerValue);
  if (v.doubleValue !== undefined) return v.doubleValue;
  if (v.booleanValue !== undefined) return v.booleanValue;
  if (v.arrayValue) return (v.arrayValue.values ?? []).map(plano);
  if (v.mapValue) return Object.fromEntries(Object.entries(v.mapValue.fields ?? {}).map(([k, x]) => [k, plano(x)]));
  return null;
};

async function batchGet(rutas: string[], campos: string[]) {
  if (!rutas.length) return new Map<string, Record<string, unknown>>();
  const res = await fetch(`${API}:batchGet?key=${FB_API_KEY}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, ...DIA,
    body: JSON.stringify({ documents: rutas.map((r) => `${RAIZ}/${r}`), mask: { fieldPaths: campos } }),
  });
  const salida = new Map<string, Record<string, unknown>>();
  if (!res.ok) return salida;
  for (const r of (await res.json()) as { found?: { name: string; fields?: Record<string, Valor> } }[]) {
    if (!r.found) continue;
    const ruta = r.found.name.split("/documents/")[1];
    salida.set(ruta, Object.fromEntries(Object.entries(r.found.fields ?? {}).map(([k, v]) => [k, plano(v)])));
  }
  return salida;
}

// "AURA SALÓN" → "Aura Salón": solo para clientes nuevos que todavía no están en la lista curada.
function titulo(s: string) {
  const letras = (s.match(/\p{L}/gu) || []).length, mays = (s.match(/\p{Lu}/gu) || []).length;
  if (!letras || mays / letras < 0.6) return s;
  return s.toLowerCase().replace(/(^|\s)(\p{L})/gu, (_, a, b) => a + b.toUpperCase());
}

export async function obtenerLocales(): Promise<LocalDirectorio[]> {
  const base = new Map(LOCALES_BASE.map((l) => [l.id, l]));
  let ids: { id: string; nombre: string; tipo: string | null }[] = [];
  try {
    const res = await fetch(`${API}/_publico/metricas?key=${FB_API_KEY}&mask.fieldPaths=directorio&mask.fieldPaths=directorioPrueba`, DIA);
    if (!res.ok) throw new Error(String(res.status));
    const j = await res.json();
    const enPrueba = new Set(((plano(j.fields?.directorioPrueba) as { id: string }[] | null) ?? []).map((x) => x.id));
    ids = ((plano(j.fields?.directorio) as { id: string; nombre: string; tipo: string | null }[] | null) ?? [])
      .filter((x) => x?.id && !enPrueba.has(x.id));
  } catch {
    // Sin la lista viva se muestra la curada: mejor un directorio de ayer que uno vacío.
    ids = LOCALES_BASE.map((l) => ({ id: l.id, nombre: l.nombre, tipo: null }));
  }
  // Las agencias atienden por mensaje y no tienen reserva de hora: no van en este directorio.
  ids = ids.filter((x) => x.tipo !== "agencia");

  const [sistema, notas] = await Promise.all([
    batchGet(ids.map((x) => `_system/${x.id}`), ["directorioPublico"]),
    batchGet(ids.map((x) => `tenants/${x.id}/settings/googleReviews`), ["rating", "totalReviews"]),
  ]);

  return ids
    .filter((x) => sistema.get(`_system/${x.id}`)?.directorioPublico !== false)
    .map((x) => {
      const b = base.get(x.id);
      const n = notas.get(`tenants/${x.id}/settings/googleReviews`);
      const rating = typeof n?.rating === "number" && n.rating > 0 ? n.rating : null;
      const opiniones = typeof n?.totalReviews === "number" && n.totalReviews > 0 ? n.totalReviews : null;
      if (b) return { ...b, logo: true, rating, opiniones };
      return {
        id: x.id, nombre: titulo(x.nombre), rubro: "barberia" as Rubro, direccion: "", comuna: "", region: "",
        lat: null, lng: null, url: `https://${x.id}.synaptechspa.cl`, reserva: true, fondo: "#0f1a2b", oscuro: true,
        logo: false, rating, opiniones,
      };
    })
    .sort((a, b) => (b.opiniones ?? 0) - (a.opiniones ?? 0) || a.nombre.localeCompare(b.nombre, "es"));
}

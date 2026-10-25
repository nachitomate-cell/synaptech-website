/* Directorio de locales ("Red Synaptech").

   QUIÉN aparece lo decide la plataforma, en vivo: la lista `_publico/metricas.directorio`
   (los clientes según functions/metricas-publicas.js), menos los que están en prueba y los
   que pidieron no aparecer (`_system/{id}.directorioPublico === false`). Es el mismo criterio
   que usa scripts/gen-directorio-vina.mjs para las cuatro páginas por zona.

   LOS DATOS de cada local también salen de la plataforma (16-10-2026): `_publico/directorio_seo`
   trae comuna, región, coordenadas, URL de reserva (con UTM), logo, servicios, precios y nota
   de Google, y se refresca a diario a las 04:10. content/directorio-locales.ts quedó como
   ajuste OPCIONAL de lo cosmético (nombre de marca, dirección limpia, logo recortado): un
   cliente nuevo aparece completo, con logo y punto en el mapa, sin tocar nada.

   Se lee por REST con la clave web pública de Firebase (la misma que sirve cualquier página
   de reserva; las reglas solo dejan leer lo público) y se revalida una vez al día. */
import { AJUSTES, type Rubro } from "@/content/directorio-locales";
import { SITIO } from "@/lib/seo";

const FB_API_KEY = "AIzaSyDqVkAhkXALm3hLcrmzjiaS3flUezPFe2Q";
const RAIZ = "projects/barberia-elegance/databases/(default)/documents";
const API = `https://firestore.googleapis.com/v1/${RAIZ}`;
const DIA = { next: { revalidate: 86400 } } as const;
/* Los dos docs que dicen QUIÉN sale y con qué datos se piden cada hora: la caché de
   datos de Vercel sobrevive a los deploys, y con 24 h un cambio en la plataforma
   podía tardar hasta dos días en verse (16-10-2026). Son 2 lecturas por hora. */
const HORA: { next: { revalidate: number; tags: string[] } } = { next: { revalidate: 3600, tags: ["directorio"] } };
/* Países (16-10-2026): también salen los locales de Perú, Colombia y Argentina.
   Sus precios van en SU moneda y no entran a las tablas en pesos chilenos. */
export const PAISES: Record<string, { nombre: string; moneda: string; tz: string }> = {
  CL: { nombre: "Chile", moneda: "CLP", tz: "America/Santiago" },
  MX: { nombre: "México", moneda: "MXN", tz: "America/Mexico_City" },
  PE: { nombre: "Perú", moneda: "PEN", tz: "America/Lima" },
  AR: { nombre: "Argentina", moneda: "ARS", tz: "America/Argentina/Buenos_Aires" },
  CO: { nombre: "Colombia", moneda: "COP", tz: "America/Bogota" },
};
/** "$14.000" en Chile; "S/ 45", "$35.000 COP", "$12.000 ARS" afuera. */
export function precioEn(pais: string, n: number) {
  const v = Math.round(n).toLocaleString("es-CL");
  if (pais === "PE") return `S/ ${v}`;
  if (!pais || pais === "CL") return `$${v}`;
  return `$${v} ${PAISES[pais]?.moneda ?? ""}`.trim();
}

export type { Rubro };
export type Servicio = { id?: string; nombre: string; precio: number | null; duracion?: number | null };
/** Horario semanal del local (settings/general.horario): índice 0 = domingo; null = cerrado. */
export type Horario = ([string, string] | null)[];
/** Módulos públicos que el local usa (metricas-publicas): para insignias y el sitemap. */
export type Modulos = { productos: number; giftcards: boolean; evento: boolean; lookbook: number };
export type LocalDirectorio = {
  /** Único por tarjeta: `{tid}` o `{tid}--{sede}` si el local tiene varias sedes. */
  id: string;
  /** País (ISO): CL, PE, CO, AR… */
  pais: string;
  /** El local en la plataforma (logo, ajustes, testimonios). */
  tid: string;
  /** Id de la sede, o null si el local tiene una sola. */
  sede: string | null;
  nombre: string; rubro: Rubro;
  /** Lo que es, en palabras de búsqueda: "Barbería", "Spa y bienestar"… Va antes de "en {comuna}". */
  etiqueta: string;
  /** Tipo schema.org (HairSalon, BeautySalon, DaySpa…). */
  schemaType: string;
  direccion: string; comuna: string; region: string;
  lat: number | null; lng: number | null;
  /** Home del host canónico del local: la misma entidad que su JSON-LD (`{url}/#negocio`). */
  web: string;
  /** Reserva: la URL limpia del local (+ ?sede=). Sin UTM desde el 18-10-2026: el
      enlace pasa toda su autoridad a la canónica, y la atribución sale del referer
      (firebaseUtils.js → canal 'marketplace' + la página del directorio). */
  url: string;
  /** `tipo` del local en la plataforma (barberia, mixto, peluqueria…), o null. */
  tipo: string | null;
  /** Foto de portada del local (si tiene), para el fondo de la tarjeta. */
  bannerSrc: string | null;
  reserva: boolean;
  logo: boolean; logoSrc: string | null; pinSrc: string | null; fondo: string; oscuro: boolean;
  servicios: Servicio[]; precioMin: number | null; precioMax: number | null;
  /** El precio más bajo de cada tipo de servicio (corte, barba, facial…), para las tablas por comuna. */
  preciosTipo: Record<string, number>;
  modulos: Modulos;
  rating: number | null; opiniones: number | null;
  /** Para "Abierto ahora": el horario del local en su huso. null si no lo publica o la
      tarjeta es de una sede (cada sede puede tener el suyo y no lo sabemos). */
  horario: Horario | null;
};

export type PaginaDirectorio = { slug: string; titulo: string; bajada: string };
export const PAGINAS: PaginaDirectorio[] = [
  { slug: "barberias-vina-del-mar",    titulo: "Barberías en Viña del Mar", bajada: "Las barberías de Viña con reserva online." },
  { slug: "barberias-quinta-region",   titulo: "Barberías en la Región de Valparaíso", bajada: "Viña, Valparaíso, Villa Alemana y Limache." },
  { slug: "peluquerias-vina-del-mar",  titulo: "Peluquerías y salones en Viña del Mar", bajada: "Salones, peluquerías y estética en Viña." },
  { slug: "peluquerias-quinta-region", titulo: "Peluquerías y salones en la Región de Valparaíso", bajada: "Toda la región, con reserva online." },
];

type Valor = { stringValue?: string; integerValue?: string; doubleValue?: number; booleanValue?: boolean; timestampValue?: string;
  arrayValue?: { values?: Valor[] }; mapValue?: { fields?: Record<string, Valor> } };
const plano = (v?: Valor): unknown => {
  if (!v) return null;
  if (v.stringValue !== undefined) return v.stringValue;
  if (v.integerValue !== undefined) return Number(v.integerValue);
  if (v.doubleValue !== undefined) return v.doubleValue;
  if (v.booleanValue !== undefined) return v.booleanValue;
  if (v.timestampValue !== undefined) return v.timestampValue;
  if (v.arrayValue) return (v.arrayValue.values ?? []).map(plano);
  if (v.mapValue) return Object.fromEntries(Object.entries(v.mapValue.fields ?? {}).map(([k, x]) => [k, plano(x)]));
  return null;
};

async function batchGet(rutas: string[], campos: string[]) {
  if (!rutas.length) return new Map<string, Record<string, unknown>>();
  const res = await fetch(`${API}:batchGet?key=${FB_API_KEY}`, {
    // Cada hora y con la etiqueta del directorio: el opt-out del superadmin se ve al tiro (api/revalidar-directorio).
    method: "POST", headers: { "Content-Type": "application/json" }, ...HORA,
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

async function leerDoc(ruta: string, campos: string[]): Promise<Record<string, unknown> | null> {
  try {
    // La máscara trae solo lo que se usa (y es parte de la clave de la caché de datos).
    const mask = campos.map((c) => `&mask.fieldPaths=${c}`).join("");
    const res = await fetch(`${API}/${ruta}?key=${FB_API_KEY}${mask}`, HORA);
    if (!res.ok) return null;
    const j = (await res.json()) as { fields?: Record<string, Valor> };
    return Object.fromEntries(Object.entries(j.fields ?? {}).map(([k, v]) => [k, plano(v)]));
  } catch { return null; }
}

// "AURA SALÓN" → "Aura Salón": solo para clientes que no tienen su nombre en AJUSTES.
function titulo(s: string) {
  const letras = (s.match(/\p{L}/gu) || []).length, mays = (s.match(/\p{Lu}/gu) || []).length;
  if (!letras || mays / letras < 0.6) return s;
  return s.toLowerCase().replace(/(^|\s)(\p{L})/gu, (_, a, b) => a + b.toUpperCase());
}
/* Servicios escritos en mayúsculas ("CORTE DE PELO Y BARBA", Enbarvados) →
   "Corte de Pelo y Barba". Los que ya vienen en mayúsculas y minúsculas no se tocan. */
const MENORES = new Set(["de", "del", "y", "e", "o", "u", "con", "a", "al", "en", "la", "el", "los", "las", "para", "por", "sin", "and", "&"]);
export function nombreServicio(s: string) {
  const t = titulo(s.trim());
  if (t === s.trim()) return t;
  return t.split(/(\s+)/).map((p, i) => (i > 0 && MENORES.has(p.toLowerCase()) ? p.toLowerCase() : p)).join("");
}

/* settings/general.horario: { "0": { activo, inicio: "10:00", fin: "20:00" }, … }. */
function leerHorario(h: unknown): Horario | null {
  if (!h || typeof h !== "object") return null;
  const dias: Horario = [0, 1, 2, 3, 4, 5, 6].map((d) => {
    const x = (h as Record<string, { activo?: boolean; inicio?: string; fin?: string }>)[String(d)];
    const ok = (v?: string) => typeof v === "string" && /^\d{1,2}:\d{2}$/.test(v);
    return x && x.activo === true && ok(x.inicio) && ok(x.fin) ? [x.inicio!, x.fin!] : null;
  });
  return dias.some(Boolean) ? dias : null;
}

/* `tipo` del doc del local → filtro del directorio. Lo que no calza (estudio, otro, sin
   tipo) cae a barbería, que es lo más común; AJUSTES.rubro lo corrige. */
const RUBRO_POR_TIPO: Record<string, Rubro> = {
  barberia: "barberia", peluqueria: "salon", mixto: "salon", nails: "salon",
  estetica: "estetica", spa: "estetica", clinica: "estetica", pilates: "pilates",
};
// Los locales curados no tienen `tipo`: su schemaType (TENANT_META) dice qué son.
const RUBRO_POR_SCHEMA: Record<string, Rubro> = {
  HairSalon: "barberia", BeautySalon: "salon", NailSalon: "salon", DaySpa: "estetica",
  MedicalClinic: "estetica", HealthClub: "pilates", ExerciseGym: "pilates",
};
const ETIQUETA_POR_RUBRO: Record<Rubro, string> = {
  barberia: "Barbería", salon: "Peluquería", estetica: "Centro de estética", pilates: "Estudio de pilates",
};
const SCHEMA_POR_RUBRO: Record<Rubro, string> = {
  barberia: "HairSalon", salon: "HairSalon", estetica: "BeautySalon", pilates: "ExerciseGym",
};
// Los rubros de la plataforma que ya dicen algo útil por sí solos ("Peluquería y barbería", "Spa").
const TIPOS_CON_ETIQUETA = new Set(["barberia", "peluqueria", "mixto", "nails", "estetica", "spa", "pilates"]);

export { nombreRegion } from "@/lib/regiones";

/** Quita la comuna del final de una dirección escrita a mano ("Grajales 1994, Santiago"): va aparte. */
function sinComuna(dir: string, comuna: string) {
  const d = String(dir || "").trim().replace(/\.$/, "");
  if (!comuna) return d;
  const re = new RegExp(`,\\s*${comuna.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "i");
  return d.replace(re, "").trim();
}

type FilaSeo = {
  id: string; nombre?: string; tipo?: string | null; rubro?: string | null; schemaType?: string | null;
  comuna?: string | null; region?: string | null; host?: string; urlReserva?: string;
  logoUrl?: string | null; direccion?: string | null; geo?: { lat: number; lng: number } | null;
  servicios?: Servicio[]; precioMin?: number | null; precioMax?: number | null;
  rating?: number | null; totalReviews?: number | null; bannerUrl?: string | null;
  preciosTipo?: Record<string, number>; modulos?: Partial<Modulos>;
  publicable?: boolean; motivo?: string | null; pais?: string;
  sedes?: { id: string; nombre: string | null; direccion: string; comuna: string | null; region: string | null; geo: { lat: number; lng: number } | null }[];
};

export async function obtenerLocales(): Promise<LocalDirectorio[]> {
  const [met, seoDoc] = await Promise.all([
    leerDoc("_publico/metricas", ["directorio", "directorioPrueba"]),
    leerDoc("_publico/directorio_seo", ["locales"]),
  ]);
  const filas = (seoDoc?.locales as FilaSeo[] | null) ?? [];
  const seo = new Map(filas.map((f) => [f.id, f]));

  /* QUIÉN sale (16-10-2026, "todos los reales, bioo incluido"): las filas
     `publicable` de directorio_seo — pagando, en prueba y los que operan, sin
     demos, sin locales fuera de Chile, sin rubros sin hora y sin los que pidieron
     no aparecer (functions/metricas-publicas.js decide y deja el `motivo`). Si el
     doc todavía no trae el campo, se usa el criterio anterior: los que pagan. */
  let ids: { id: string; nombre: string }[];
  if (filas.some((f) => f.publicable !== undefined)) {
    ids = filas.filter((f) => f.publicable === true).map((f) => ({ id: f.id, nombre: f.nombre ?? f.id }));
  } else if (met) {
    const enPrueba = new Set(((met.directorioPrueba as { id: string }[] | null) ?? []).map((x) => x.id));
    ids = ((met.directorio as { id: string; nombre: string; tipo: string | null }[] | null) ?? [])
      .filter((x) => x?.id && !enPrueba.has(x.id) && x.tipo !== "agencia");
  } else {
    // Sin datos vivos se muestran los que tienen ajuste: mejor un directorio de ayer que uno vacío.
    ids = Object.entries(AJUSTES).map(([id, a]) => ({ id, nombre: a.nombre ?? id }));
  }

  const raizLocal = (id: string) => (id === "elegance" ? "" : `tenants/${id}/`);
  const [sistema, generales] = await Promise.all([
    batchGet(ids.map((x) => `_system/${x.id}`), ["directorioPublico"]),
    // El horario que el local publica en su reserva (lectura pública, como la de su página).
    batchGet(ids.map((x) => `${raizLocal(x.id)}settings/general`), ["horario"]),
  ]);

  return ids
    .filter((x) => sistema.get(`_system/${x.id}`)?.directorioPublico !== false)
    .flatMap((x): LocalDirectorio[] => {
      const a = AJUSTES[x.id] ?? {};
      const s: FilaSeo = seo.get(x.id) ?? { id: x.id };
      const rubro: Rubro = a.rubro ?? RUBRO_POR_TIPO[s.tipo ?? ""] ?? RUBRO_POR_SCHEMA[s.schemaType ?? ""] ?? "barberia";
      const comuna = s.comuna ?? "";
      const pais = s.pais || "CL";
      // Afuera no hay "Región de …": "Lima, Perú", "Huila, Colombia".
      const region = pais === "CL" ? (s.region ?? "") : [s.region || comuna, PAISES[pais]?.nombre ?? pais].filter(Boolean).join(", ");
      const host = s.host ?? `${x.id}.synaptechspa.cl`;
      const logo = a.logo === true;
      const logoSrc = logo ? `/directorio-logos/${x.id}.webp` : (s.logoUrl ?? null);
      const nombre = a.nombre ?? titulo(s.nombre ?? x.nombre);
      const base: LocalDirectorio = {
        id: x.id, tid: x.id, sede: null, pais,
        nombre,
        rubro,
        etiqueta: a.etiqueta ?? (s.tipo && TIPOS_CON_ETIQUETA.has(s.tipo) && s.rubro ? s.rubro : ETIQUETA_POR_RUBRO[rubro]),
        schemaType: s.schemaType && s.schemaType !== "LocalBusiness" ? s.schemaType : SCHEMA_POR_RUBRO[rubro],
        direccion: a.direccion ?? sinComuna(s.direccion ?? "", comuna),
        comuna,
        region,
        lat: s.geo?.lat ?? null, lng: s.geo?.lng ?? null,
        web: `https://${host}`,
        url: `https://${host}/`,
        tipo: s.tipo ?? null,
        bannerSrc: s.bannerUrl ?? null,
        reserva: a.reserva ?? true,
        logo: !!logoSrc, logoSrc,
        pinSrc: logo ? `/directorio-logos/${x.id}-pin.webp` : logoSrc,
        fondo: a.fondo ?? "#0f1a2b", oscuro: a.oscuro ?? true,
        servicios: (s.servicios ?? []).map((sv) => ({ ...sv, nombre: nombreServicio(sv.nombre) })),
        precioMin: s.precioMin ?? null, precioMax: s.precioMax ?? null,
        preciosTipo: s.preciosTipo ?? {},
        modulos: { productos: Number(s.modulos?.productos) || 0, giftcards: s.modulos?.giftcards === true, evento: s.modulos?.evento === true, lookbook: Number(s.modulos?.lookbook) || 0 },
        rating: typeof s.rating === "number" && s.rating > 0 ? s.rating : null,
        opiniones: typeof s.totalReviews === "number" && s.totalReviews > 0 ? s.totalReviews : null,
        horario: leerHorario(generales.get(`${raizLocal(x.id)}settings/general`)?.horario),
      };
      /* Un local con dos o más sedes sale una vez por sede: cada una en su comuna y
         su punto del mapa (Oren en Reñaca y Villa Alemana; Punto Pilates en siete
         comunas), y el botón abre la reserva con esa sede elegida (`?sede=`). */
      const sedes = (s.sedes ?? []).filter((sd) => sd && sd.id && sd.direccion);
      if (sedes.length < 2) return [base];
      return sedes.map((sd) => {
        const c = sd.comuna ?? comuna;
        return {
          ...base,
          id: `${x.id}--${sd.id}`, sede: sd.id,
          nombre: sd.nombre ?? `${nombre} · ${c}`,
          direccion: sinComuna(sd.direccion, c),
          comuna: c, region: pais === "CL" ? (sd.region ?? base.region) : base.region,
          lat: sd.geo?.lat ?? null, lng: sd.geo?.lng ?? null,
          url: `${base.url}?sede=${encodeURIComponent(sd.id)}`,
          horario: null,
        };
      });
    })
    .sort((a, b) => (b.opiniones ?? 0) - (a.opiniones ?? 0) || a.nombre.localeCompare(b.nombre, "es"));
}

/** Cuándo cambió de verdad lo que muestra el directorio: `contenidoActualizado`
    solo se mueve si cambia la lista o algún dato de un local (metricas-publicas.js
    lo compara con una firma); `actualizadoEn` se reescribe a diario y por eso no
    sirve de <lastmod>. Sin el campo nuevo, la fecha de la última revisión. */
export async function fechaDirectorio(): Promise<Date> {
  const d = await leerDoc("_publico/directorio_seo", ["contenidoActualizado"]);
  const f = d?.contenidoActualizado as string | undefined;
  const t = f ? new Date(f) : null;
  return t && !Number.isNaN(t.getTime()) ? t : new Date("2026-10-18");
}

/** "Corte desde $15.000": el precio más bajo de un corte en ese local, si lo publica. */
export function corteDesde(l: LocalDirectorio) {
  const n = Number(l.preciosTipo?.corte);
  return n > 0 ? precioEn(l.pais, n) : null;
}

/** Un local por negocio (la primera sede): para la cinta de logos y las cuentas de "N locales". */
export function unoPorNegocio(locales: LocalDirectorio[]) {
  const vistos = new Set<string>();
  return locales.filter((l) => (vistos.has(l.tid) ? false : (vistos.add(l.tid), true)));
}

/** URL absoluta del logo (para JSON-LD y llms.txt). */
export function logoAbsoluto(l: LocalDirectorio) {
  if (!l.logoSrc) return null;
  return l.logoSrc.startsWith("http") ? l.logoSrc : `${SITIO}${l.logoSrc}`;
}

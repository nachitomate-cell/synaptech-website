import type { LocalDirectorio } from "@/lib/directorio";
import { nombreRegion } from "@/lib/regiones";

/* Las cuatro páginas del directorio por rubro y zona (18-10-2026).

   Hasta hoy eran HTML estáticos que generaba el repo de la plataforma
   (scripts/gen-directorio-vina.mjs) y este sitio traía por un rewrite: había que
   correr el generador a mano para que un local nuevo apareciera, mostraban UNA
   tarjeta por negocio (Oren en Villa Alemana nunca salía) y los datos curados
   en middleware.js le ganaban a Firestore. Ahora se arman acá, con los mismos
   datos vivos que /locales (lib/directorio.ts), y se revalidan cada hora.

   Quién entra en cada una lo decide `entra`: el rubro del local y su zona. Los
   locales "mixtos" (peluquería y barbería, como Renacer) salen en las DOS
   páginas de rubro: decisión de Ignacio, 18-10-2026. */
export type PaginaRubro = {
  slug: string;
  /** H1 y nombre del ItemList. */
  h1: string;
  /** Title (≤ 60) y description (≤ 155) para Google. */
  title: string;
  description: (n: number) => string;
  intro: string;
  /** "barberías" / "peluquerías y salones": para textos con conteo. */
  plural: string;
  /** Zona en palabras ("Viña del Mar", "la Región de Valparaíso"). */
  lugar: string;
  /** Página de la zona en /locales, para las migas. */
  zonaSlug: string;
  entra: (l: LocalDirectorio) => boolean;
};

const esBarberia = (l: LocalDirectorio) => l.rubro === "barberia" || l.tipo === "mixto";
const esBelleza = (l: LocalDirectorio) => l.rubro === "salon" || l.rubro === "estetica" || l.tipo === "mixto";
const enVina = (l: LocalDirectorio) => l.comuna === "Viña del Mar";
const enValparaiso = (l: LocalDirectorio) => (l.pais || "CL") === "CL" && nombreRegion(l.region) === "Región de Valparaíso";

export const PAGINAS_RUBRO: PaginaRubro[] = [
  {
    slug: "barberias-vina-del-mar",
    h1: "Barberías en Viña del Mar",
    // La búsqueda real es "barberia(s) viña del mar" (681 impresiones en 90 días, Search Console 18-10-2026).
    title: "Barberías en Viña del Mar: precios y reserva online | Synaptech",
    description: (n) => `Compara ${n} barberías de Viña del Mar con precios reales y notas de Google. Mira las horas libres y reserva online en segundos, 24/7.`,
    intro: "Las barberías de Viña del Mar y Reñaca con reserva online: compara precios reales, mira su nota en Google y agenda tu hora en su página, sin llamar.",
    plural: "barberías", lugar: "Viña del Mar", zonaSlug: "vina-del-mar",
    entra: (l) => esBarberia(l) && enVina(l),
  },
  {
    slug: "barberias-quinta-region",
    h1: "Barberías en la Región de Valparaíso",
    title: "Barberías en la Región de Valparaíso con reserva online | Synaptech",
    description: (n) => `${n} barberías de la Región de Valparaíso con reserva online: Viña del Mar, Valparaíso, Villa Alemana, Limache, Quillota y más. Precios reales.`,
    intro: "Barberías de toda la Quinta Región con reserva online: filtra por comuna, compara precios reales y reserva tu hora en segundos.",
    plural: "barberías", lugar: "la Región de Valparaíso", zonaSlug: "region-de-valparaiso",
    entra: (l) => esBarberia(l) && enValparaiso(l),
  },
  {
    slug: "peluquerias-vina-del-mar",
    h1: "Peluquerías y salones en Viña del Mar",
    title: "Peluquerías en Viña del Mar: precios y reserva online | Synaptech",
    description: (n) => `Compara ${n} peluquerías y salones de belleza de Viña del Mar con precios reales y notas de Google. Reserva tu hora online, 24/7.`,
    intro: "Peluquerías, salones y centros de estética de Viña del Mar con reserva online: precios reales, nota en Google y tu hora en segundos.",
    plural: "peluquerías y salones", lugar: "Viña del Mar", zonaSlug: "vina-del-mar",
    entra: (l) => esBelleza(l) && enVina(l),
  },
  {
    slug: "peluquerias-quinta-region",
    h1: "Peluquerías y salones en la Región de Valparaíso",
    title: "Peluquerías en la Región de Valparaíso con reserva online | Synaptech",
    description: (n) => `${n} peluquerías y salones de belleza en la Región de Valparaíso con reserva online y precios reales. Filtra por comuna y reserva tu hora.`,
    intro: "Peluquerías, salones y estética de toda la Quinta Región con reserva online: filtra por comuna y reserva en segundos.",
    plural: "peluquerías y salones", lugar: "la Región de Valparaíso", zonaSlug: "region-de-valparaiso",
    entra: (l) => esBelleza(l) && enValparaiso(l),
  },
];

export const paginaRubro = (slug: string) => PAGINAS_RUBRO.find((p) => p.slug === slug)!;

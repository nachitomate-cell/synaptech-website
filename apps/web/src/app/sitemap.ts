import type { MetadataRoute } from "next";
import { COMPETIDORES } from "@/content/competidores";
import { FUNCIONES } from "@/content/funciones";
import { fechaDirectorio, obtenerLocales } from "@/lib/directorio";
import { PAGINAS_RUBRO } from "@/lib/paginas-directorio";
import { zonasDirectorio } from "@/lib/precios";
import { RUBROS_IA, CIUDADES } from "@/content/alta-ia";

const BASE = "https://www.synaptechspa.cl";

/* Solo rutas del PRODUCTO.
 *
 * Antes este sitemap le entregaba a Google un mapa de agencia: `/casos` con
 * prioridad 0.9 (la segunda más alta del sitio), `/portales-clinicos` con 0.8 y
 * dos artículos cuyo slug dice literalmente "software-a-medida". Aunque la home
 * ya estaba reposicionada, esto seguía declarando el foco del dominio — y el
 * foco del dominio fue el motivo textual del rechazo de Google for Startups el
 * 15-09-2026 ("evaluated as an IT/Business Consulting firm").
 *
 * Desde el 09-10-2026 esas rutas ya no existen: redirigen (308) a la página
 * del producto que las reemplaza (ver next.config.mjs).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* Landings del directorio por región y comuna (/locales/{zona}): salen de los
     datos vivos, así que una zona nueva entra sola al sitemap (16-10-2026). */
  const zonas = zonasDirectorio(await obtenerLocales().catch(() => []));
  /* <lastmod> de todo el directorio (/locales, zonas y páginas por rubro): la
     última vez que cambió de verdad un local o la lista (contenidoActualizado,
     18-10-2026). Antes eran fechas escritas a mano que no decían nada. */
  const dir = await fechaDirectorio().catch(() => new Date("2026-10-18"));
  // Fecha fija de la última revisión de contenido (auditoría SEO 09-10-2026):
  // con new Date() cada pedido traía una fecha nueva y Google deja de creerle.
  const now = new Date("2026-10-09");
  const ia = new Date("2026-10-21");
  return [
    { url: BASE,                          lastModified: now, priority: 1.0 },
    { url: `${BASE}/como-funciona`,       lastModified: now, priority: 0.9 },
    { url: `${BASE}/syna`,                lastModified: new Date("2026-10-26"), priority: 0.8 },
    { url: `${BASE}/niveles`,             lastModified: new Date("2026-10-24"), priority: 0.6 },
    { url: `${BASE}/aprende`,             lastModified: new Date("2026-10-24"), priority: 0.7 },
    { url: `${BASE}/barberias`,           lastModified: now, priority: 0.9 },
    { url: `${BASE}/peluquerias`,         lastModified: now, priority: 0.9 },
    { url: `${BASE}/asistente-ia-whatsapp`, lastModified: now, priority: 0.9 },
    /* Alta con asistente IA (21-10-2026): la landing, 8 rubros y 8 × 15 ciudades. */
    { url: `${BASE}/agenda-con-asistente-ia`, lastModified: ia, priority: 0.9 },
    ...RUBROS_IA.map((r) => ({ url: `${BASE}/agenda-con-ia/${r.slug}`, lastModified: ia, priority: 0.8 })),
    ...RUBROS_IA.flatMap((r) => CIUDADES.map((c) => ({ url: `${BASE}/agenda-con-ia/${r.slug}/${c.slug}`, lastModified: ia, priority: 0.7 }))),
    { url: `${BASE}/estetica`,            lastModified: now, priority: 0.9 },
    { url: `${BASE}/clinicas`,            lastModified: now, priority: 0.9 },
    { url: `${BASE}/agencias`,            lastModified: now, priority: 0.8 },
    { url: `${BASE}/empresas`,            lastModified: now, priority: 0.8 },
    { url: `${BASE}/recursos/ficha-clinica-estetica`, lastModified: now, priority: 0.7 },
    { url: `${BASE}/recursos/consentimiento-informado-estetica`, lastModified: now, priority: 0.7 },
    { url: `${BASE}/mis-reservas`, lastModified: now, priority: 0.6 },
    { url: `${BASE}/guias/boleta-honorarios-y-comisiones-barberos`, lastModified: now, priority: 0.7 },
    { url: `${BASE}/precios`,             lastModified: now, priority: 0.9 },
    { url: `${BASE}/locales`,             lastModified: dir, priority: 0.8 },
    ...zonas.map((z) => ({ url: `${BASE}/locales/${z.slug}`, lastModified: dir, priority: 0.7 })),
    { url: `${BASE}/fidelizacion`,        lastModified: now, priority: 0.8 },
    { url: `${BASE}/nosotros`,            lastModified: now, priority: 0.6 },
    { url: `${BASE}/contacto`,            lastModified: now, priority: 0.6 },
    { url: `${BASE}/comparar`,            lastModified: now, priority: 0.8 },
    { url: `${BASE}/comparar/precios`,    lastModified: now, priority: 0.9 },
    { url: `${BASE}/embajadores`,         lastModified: now, priority: 0.6 },
    { url: `${BASE}/tienda-online`,       lastModified: now, priority: 0.8 },
    { url: `${BASE}/funciones`,           lastModified: now, priority: 0.8 },
    ...FUNCIONES.map((f) => ({ url: `${BASE}/funciones/${f.slug}`, lastModified: now, priority: 0.8 })),
    { url: `${BASE}/unas`,                lastModified: now, priority: 0.8 },
    { url: `${BASE}/pilates`,             lastModified: now, priority: 0.8 },
    /* Integración con Wellhub (23-10-2026). */
    { url: `${BASE}/wellhub`,             lastModified: now, priority: 0.8 },
    { url: `${BASE}/mascotas`,            lastModified: now, priority: 0.8 },
    /* "<agenda> vs SynapTech": las páginas que compiten por las búsquedas de
       la competencia (content/competidores.ts). */
    ...COMPETIDORES.map((c) => ({ url: `${BASE}/comparar/${c.id}`, lastModified: now, priority: 0.8 })),
    /* Las páginas por rubro y zona (rutas de este sitio desde el 18-10-2026).
       Prioridad alta: compiten con las de AgendaPro por "barberia en <comuna>". */
    ...PAGINAS_RUBRO.map((p) => ({ url: `${BASE}/${p.slug}`, lastModified: dir, priority: 0.8 })),
    { url: `${BASE}/privacidad`,          lastModified: now, priority: 0.3 },
    { url: `${BASE}/terminos`,            lastModified: now, priority: 0.3 },
    { url: `${BASE}/reembolsos`,          lastModified: now, priority: 0.3 },
  ];
}

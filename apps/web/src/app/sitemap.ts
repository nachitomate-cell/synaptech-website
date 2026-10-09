import type { MetadataRoute } from "next";
import { COMPETIDORES } from "@/content/competidores";

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
export default function sitemap(): MetadataRoute.Sitemap {
  // Fecha fija de la última revisión de contenido (auditoría SEO 09-10-2026):
  // con new Date() cada pedido traía una fecha nueva y Google deja de creerle.
  const now = new Date("2026-10-09");
  return [
    { url: BASE,                          lastModified: now, priority: 1.0 },
    { url: `${BASE}/como-funciona`,       lastModified: now, priority: 0.9 },
    { url: `${BASE}/barberias`,           lastModified: now, priority: 0.9 },
    { url: `${BASE}/peluquerias`,         lastModified: now, priority: 0.9 },
    { url: `${BASE}/asistente-ia-whatsapp`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/estetica`,            lastModified: now, priority: 0.9 },
    { url: `${BASE}/clinicas`,            lastModified: now, priority: 0.9 },
    { url: `${BASE}/agencias`,            lastModified: now, priority: 0.8 },
    { url: `${BASE}/recursos/ficha-clinica-estetica`, lastModified: now, priority: 0.7 },
    { url: `${BASE}/guias/boleta-honorarios-y-comisiones-barberos`, lastModified: now, priority: 0.7 },
    { url: `${BASE}/precios`,             lastModified: now, priority: 0.9 },
    { url: `${BASE}/locales`,             lastModified: now, priority: 0.8 },
    { url: `${BASE}/fidelizacion`,        lastModified: now, priority: 0.8 },
    { url: `${BASE}/nosotros`,            lastModified: now, priority: 0.6 },
    { url: `${BASE}/contacto`,            lastModified: now, priority: 0.6 },
    { url: `${BASE}/comparar`,            lastModified: now, priority: 0.8 },
    /* "<agenda> vs SynapTech": las páginas que compiten por las búsquedas de
       la competencia (content/competidores.ts). */
    ...COMPETIDORES.map((c) => ({ url: `${BASE}/comparar/${c.id}`, lastModified: now, priority: 0.8 })),
    /* El directorio de locales. Lo sirve app.synaptechspa.cl por un rewrite
       (ver next.config.mjs), pero su URL publica es esta, y un sitemap solo
       vale para URLs del MISMO host: por eso van aca y no en el sitemap de
       app. Prioridad alta porque son las paginas que compiten con las de
       AgendaPro por "barberia en <comuna>". */
    { url: `${BASE}/barberias-vina-del-mar`,     lastModified: now, priority: 0.8 },
    { url: `${BASE}/peluquerias-vina-del-mar`,   lastModified: now, priority: 0.8 },
    { url: `${BASE}/barberias-quinta-region`,    lastModified: now, priority: 0.8 },
    { url: `${BASE}/peluquerias-quinta-region`,  lastModified: now, priority: 0.8 },
    { url: `${BASE}/privacidad`,          lastModified: now, priority: 0.3 },
    { url: `${BASE}/terminos`,            lastModified: now, priority: 0.3 },
  ];
}

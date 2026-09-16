import type { MetadataRoute } from "next";

const BASE = "https://synaptechspa.cl";

/* Solo rutas del PRODUCTO.
 *
 * Antes este sitemap le entregaba a Google un mapa de agencia: `/casos` con
 * prioridad 0.9 (la segunda más alta del sitio), `/portales-clinicos` con 0.8 y
 * dos artículos cuyo slug dice literalmente "software-a-medida". Aunque la home
 * ya estaba reposicionada, esto seguía declarando el foco del dominio — y el
 * foco del dominio fue el motivo textual del rechazo de Google for Startups el
 * 15-09-2026 ("evaluated as an IT/Business Consulting firm").
 *
 * Las rutas de agencia NO se borran (romperían URLs indexadas): salen del
 * sitemap y van con `robots: { index: false }` en su propia metadata, que es lo
 * que efectivamente las saca del índice sin devolver 404.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,                          lastModified: now, priority: 1.0 },
    { url: `${BASE}/saas-comercial`,      lastModified: now, priority: 0.9 },
    { url: `${BASE}/fidelizacion`,        lastModified: now, priority: 0.8 },
    { url: `${BASE}/nosotros`,            lastModified: now, priority: 0.6 },
    { url: `${BASE}/contacto`,            lastModified: now, priority: 0.6 },
    { url: `${BASE}/blog`,                lastModified: now, priority: 0.5 },
    { url: `${BASE}/privacidad`,          lastModified: now, priority: 0.3 },
    { url: `${BASE}/terminos`,            lastModified: now, priority: 0.3 },
  ];
}

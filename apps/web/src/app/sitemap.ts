import type { MetadataRoute } from "next";

const BASE = "https://synaptechspa.cl";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,                                   lastModified: now, priority: 1.0 },
    { url: `${BASE}/casos`,                        lastModified: now, priority: 0.9 },
    { url: `${BASE}/casos/vinamed`,                lastModified: now, priority: 0.7 },
    { url: `${BASE}/casos/patio-curauma`,          lastModified: now, priority: 0.7 },
    { url: `${BASE}/casos/diego-thompson`,         lastModified: now, priority: 0.7 },
    { url: `${BASE}/casos/plataforma-belleza`,     lastModified: now, priority: 0.7 },
    { url: `${BASE}/portales-clinicos`,            lastModified: now, priority: 0.8 },
    { url: `${BASE}/fidelizacion`,                 lastModified: now, priority: 0.8 },
    { url: `${BASE}/saas-comercial`,               lastModified: now, priority: 0.8 },
    { url: `${BASE}/blog`,                                                                        lastModified: now, priority: 0.8 },
    { url: `${BASE}/blog/software-a-medida-vs-generico-chile`,                                    lastModified: now, priority: 0.7 },
    { url: `${BASE}/blog/cuanto-cuesta-software-a-medida-chile-2026`,                             lastModified: now, priority: 0.7 },
    { url: `${BASE}/blog/automatizacion-clinicas-reducir-errores-tiempo-administrativo`,          lastModified: now, priority: 0.7 },
    { url: `${BASE}/privacidad`,                   lastModified: now, priority: 0.3 },
    { url: `${BASE}/terminos`,                     lastModified: now, priority: 0.3 },
  ];
}

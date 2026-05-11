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
    { url: `${BASE}/privacidad`,                   lastModified: now, priority: 0.3 },
    { url: `${BASE}/terminos`,                     lastModified: now, priority: 0.3 },
  ];
}

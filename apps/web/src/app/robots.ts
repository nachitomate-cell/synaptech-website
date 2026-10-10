import type { MetadataRoute } from "next";

/* 10-10-2026: además de la regla general, los buscadores con IA van con nombre
   propio y permiso explícito (indexadores y los que leen en vivo cuando alguien
   pregunta). Queremos que nos lean: /comparar y /llms.txt existen para eso.
   /api/ queda fuera para todos (el chat de Syna no es contenido). */
const BOTS_IA = [
  "OAI-SearchBot", "ChatGPT-User", "GPTBot",
  "PerplexityBot", "Perplexity-User",
  "Claude-SearchBot", "Claude-User", "ClaudeBot",
  "Google-Extended", "Applebot-Extended", "Bingbot", "DuckAssistBot", "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: BOTS_IA, allow: "/", disallow: "/api/" },
    ],
    sitemap: "https://www.synaptechspa.cl/sitemap.xml",
  };
}

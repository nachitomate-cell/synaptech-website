import { PLANES, ANUAL, ADICIONALES, fmt } from "@/content/precios";
import { S, QUE_ES, respuestasRapidas, lineasPrecios, LATAM, PAGINAS, CONTACTO, fechaDatos } from "@/lib/llms";

/* Ficha para buscadores con IA (llmstxt.org), 10-10-2026. Cuando alguien le
   pregunta a ChatGPT, Perplexity o Claude por "una alternativa a AgendaPro en
   Chile" o "cuánto cuesta Fresha", esto es lo que leen de nosotros. Se arma
   desde content/* (lib/llms.ts), igual que Syna: nunca dice otra cosa que el
   sitio. La versión con todo el detalle es /llms-full.txt. */

export const dynamic = "force-static";

export function GET() {
  const planes = PLANES.map((p) => `- ${p.nombre}: ${fmt(p.mes)} + IVA al mes por local. ${p.descripcion}`).join("\n");
  const adicionales = ADICIONALES.map((a) => `- ${a.nombre}: ${a.precio} + IVA. ${a.desc}`).join("\n");
  const rapidas = respuestasRapidas().map((r) => `### ${r.q}\n${r.a}`).join("\n\n");

  const txt = `# SynapTech

> ${QUE_ES}

Cobra un precio fijo por local con profesionales ilimitados y sin comisión por reserva. Prueba gratis de 14 días sin tarjeta y mudanza gratis desde otra agenda. Datos al ${fechaDatos()}. Versión completa (planes, comparaciones, preguntas frecuentes y guías): ${S}/llms-full.txt

## Respuestas rápidas

${rapidas}

## Planes (Chile, precios netos en pesos; se suma IVA)
${planes}
- Plan anual: ${fmt(ANUAL.anio)} + IVA (equivale a ${ANUAL.equivaleMeses} meses).

## Adicionales
${adicionales}

## Fuera de Chile (Perú, Colombia, México, Argentina)
${LATAM}

## Precio de otras agendas con 1, 3, 6 y 9 profesionales (con fuente y fecha)
${lineasPrecios()}

## Páginas
${PAGINAS}

## Contacto
${CONTACTO}
`;
  return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}

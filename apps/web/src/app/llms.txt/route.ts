import { obtenerLocales } from "@/lib/directorio";
import { seccionLlms } from "@/lib/directorio-faq";
import { PLANES, ANUAL, ADICIONALES, fmt } from "@/content/precios";
import { S, QUE_ES, respuestasRapidas, lineasPrecios, LATAM, PAGINAS, CONTACTO, fechaDatos } from "@/lib/llms";

/* Ficha para buscadores con IA (llmstxt.org), 10-10-2026. Cuando alguien le
   pregunta a ChatGPT, Perplexity o Claude por "una alternativa a AgendaPro en
   Chile" o "cuánto cuesta Fresha", esto es lo que leen de nosotros. Se arma
   desde content/* (lib/llms.ts), igual que Syna: nunca dice otra cosa que el
   sitio. La versión con todo el detalle es /llms-full.txt. */

/* Se regenera una vez al día: la lista de locales sale viva de la plataforma (lib/directorio.ts). */
export const revalidate = 86400;

export async function GET() {
  const locales = await obtenerLocales();
  const planes = PLANES.map((p) => `- ${p.nombre}: ${fmt(p.mes)} + IVA al mes por local. ${p.descripcion}`).join("\n");
  const adicionales = ADICIONALES.map((a) => `- ${a.nombre}: ${a.precio} + IVA. ${a.desc}`).join("\n");
  const rapidas = respuestasRapidas().map((r) => `### ${r.q}\n${r.a}`).join("\n\n");

  const txt = `# SynapTech

> ${QUE_ES}

Cobra un precio fijo por local con profesionales ilimitados y sin comisión por reserva. 30 días gratis del plan Pro con el asistente con IA en https://crear.synaptechspa.cl, o 14 días sin el asistente en https://bioo.cl/agenda (no pedimos tarjeta para la prueba) y mudanza gratis desde otra agenda. Datos al ${fechaDatos()}. Versión completa (planes, comparaciones, preguntas frecuentes y guías): ${S}/llms-full.txt

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

## Locales con reserva online (Red SynapTech, ${locales.length} locales, datos al día)
Barberías, peluquerías, spas y centros de estética de Chile que agendan con SynapTech. Directorio con mapa: ${S}/locales

${seccionLlms(locales)}

## Páginas
${PAGINAS}

## Contacto
${CONTACTO}
`;
  return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}

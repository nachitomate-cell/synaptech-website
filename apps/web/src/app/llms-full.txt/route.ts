import { COMPETIDORES } from "@/content/competidores";
import { seccionPlanes, seccionProducto, seccionPreguntas, seccionGuias } from "@/lib/syna/conocimiento";
import { S, QUE_ES, respuestasRapidas, lineasPrecios, competidorCompleto, LATAM, PAGINAS, CONTACTO, fechaDatos } from "@/lib/llms";

/* /llms-full.txt (10-10-2026): todo lo que un buscador con IA necesita para
   contestar sobre SynapTech y sobre las agendas con las que nos comparan, en un
   solo archivo de texto. Mismas secciones que el conocimiento de Syna
   (lib/syna/conocimiento.ts) más la ficha completa de cada competidor. */

export const dynamic = "force-static";

export function GET() {
  const txt = `# SynapTech — ficha completa

> ${QUE_ES}

Sitio: ${S} · Datos al ${fechaDatos()} · Versión corta: ${S}/llms.txt

## Empresa
- Razón social: Synaptech SpA · RUT 78.402.009-6 · constituida el 15 de abril de 2026 · Viña del Mar, Región de Valparaíso, Chile.
- Fundador: Ignacio Mateluna. La plataforma nació en abril de 2026 como la página de reservas de una barbería; el asistente con IA llegó en julio de 2026, la app del equipo a App Store en agosto y a Google Play en septiembre de 2026.
- Más de 35 locales y sedes en Chile la usan. Lista pública: ${S}/locales

## Respuestas rápidas
${respuestasRapidas().map((r) => `### ${r.q}\n${r.a}`).join("\n\n")}

${seccionPlanes()}

## Fuera de Chile (Perú, Colombia, México, Argentina)
${LATAM}

${seccionProducto()}

## Precio de otras agendas con 1, 3, 6 y 9 profesionales
${lineasPrecios()}
Tabla con fuentes: ${S}/comparar/precios

## Comparación con cada agenda
${COMPETIDORES.map(competidorCompleto).join("\n\n")}

${seccionPreguntas()}

${seccionGuias()}

## Páginas
${PAGINAS}

## Contacto
${CONTACTO}
`;
  return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}

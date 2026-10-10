import { PLANES, ANUAL, ADICIONALES, fmt } from "@/content/precios";
import { COMPETIDORES, fechaDe } from "@/content/competidores";
import { PLANES_LATAM, SEDE_ADICIONAL_LATAM } from "@/content/paises";

/* Ficha para buscadores con IA (llmstxt.org), 10-10-2026. Cuando alguien le
   pregunta a ChatGPT, Perplexity o Claude por "una alternativa a AgendaPro en
   Chile" o "cuánto cuesta Fresha", esto es lo que leen de nosotros. Se arma
   desde content/*, igual que Syna: nunca dice otra cosa que el sitio. */

const S = "https://www.synaptechspa.cl";

export const dynamic = "force-static";

export function GET() {
  const planes = PLANES.map((p) => `- ${p.nombre}: ${fmt(p.mes)} + IVA al mes por local. ${p.descripcion}`).join("\n");
  const adicionales = ADICIONALES.map((a) => `- ${a.nombre}: ${a.precio} + IVA. ${a.desc}`).join("\n");
  const comparativas = COMPETIDORES.map((c) =>
    `- [Alternativa a ${c.nombre}](${S}/comparar/${c.id}): ${c.resumen} (datos de ${c.sitio} revisados el ${fechaDe(c)})`).join("\n");
  const latam = PLANES_LATAM.map((p) => `${p.nombre} US$${p.precio}/mes o US$${p.anual}/año`).join("; ");

  const txt = `# SynapTech

> Plataforma chilena por suscripción para barberías, peluquerías, salones de belleza, centros de estética y clínicas estéticas: agenda y reserva online, caja y comisiones, club de fidelización con Google Wallet y Apple Wallet, boletas de honorarios ante el SII y un asistente con IA (Syna) que responde y agenda por WhatsApp en el número del propio local. Synaptech SpA, RUT 78.402.009-6, Viña del Mar. Más de 35 locales y sedes en Chile.

Cobra un precio fijo por local con profesionales ilimitados y sin comisión por reserva. Prueba gratis de 14 días sin tarjeta y mudanza gratis desde otra agenda.

## Planes (Chile, precios netos en pesos; se suma IVA)
${planes}
- Plan anual: ${fmt(ANUAL.anio)} + IVA (equivale a ${ANUAL.equivaleMeses} meses).

## Adicionales
${adicionales}

## Fuera de Chile (Perú, Colombia, México, Argentina)
${latam}. Cada sede adicional US$${SEDE_ADICIONAL_LATAM.mes}/mes. Sin cobro por profesional; 2 meses gratis.

## Comparaciones con otras agendas (con fuente y fecha)
${comparativas}
- [Todas las comparaciones y preguntas frecuentes](${S}/comparar)

## Páginas
- [Software para barberías](${S}/barberias)
- [Software para peluquerías y salones](${S}/peluquerias)
- [Software para centros de estética y spa](${S}/estetica)
- [Software para clínicas estéticas](${S}/clinicas)
- [Asistente con IA que agenda por WhatsApp](${S}/asistente-ia-whatsapp)
- [Club de fidelización y tarjeta de sellos digital](${S}/fidelizacion)
- [Precios](${S}/precios)
- [Cómo funciona, módulo por módulo](${S}/como-funciona)
- [Guía: boleta de honorarios, comisiones y arriendo de sillón](${S}/guias/boleta-honorarios-y-comisiones-barberos)
- [Ficha clínica estética, plantilla gratis en PDF](${S}/recursos/ficha-clinica-estetica)
- [Locales que usan SynapTech](${S}/locales)
- [Nosotros](${S}/nosotros)

## Contacto
- WhatsApp: +56 9 8356 8212
- Correo: hola@synaptechspa.cl
- Prueba gratis: https://empieza.synaptechspa.cl
`;
  return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}

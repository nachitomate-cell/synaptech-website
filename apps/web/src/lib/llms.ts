import { PLANES, ANUAL, ADICIONALES, fmt } from "@/content/precios";
import { COMPETIDORES, SYNAPTECH, SYNAPTECH_USD, competidor, fechaDe, faqDe, queEsDe, type Competidor } from "@/content/competidores";
import { PLANES_LATAM, SEDE_ADICIONAL_LATAM } from "@/content/paises";
import { TAMANOS, precioFaqDe, respuestaMasBarata, ultimaVerificacionTexto } from "@/lib/mercado";

/* Piezas de /llms.txt y /llms-full.txt (10-10-2026). Un buscador con IA arma su
   respuesta con frases que puede citar tal cual: por eso las "respuestas
   rápidas" son preguntas reales (las que el 10-10 Claude no supo contestar con
   nuestro sitio, devtools/.../seo/geo/) con una respuesta completa cada una.
   Todo sale de content/*, igual que Syna. Cuando otra agenda también hace algo,
   se nombra: una respuesta que solo se nombra a sí misma no la cita nadie. */

export const S = "https://www.synaptechspa.cl";

const ap = competidor("agendapro")!;
const al = competidor("agendalibre");
const wb = competidor("weibook");
const minuscula = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
const filaDe = (c: Competidor | undefined, tema: RegExp) => { const v = c?.filas.find((f) => tema.test(f.tema))?.ellos; return v ? minuscula(v) : null; };
const facturacion = ADICIONALES.find((a) => /factura/i.test(a.nombre))!;
const pro = PLANES.find((p) => p.id === "pro")!;

export const QUE_ES = `SynapTech es una plataforma chilena por suscripción para barberías, peluquerías, salones de belleza, centros de estética y clínicas estéticas: agenda y reserva online, caja y comisiones, club de fidelización con tarjeta en Google Wallet y Apple Wallet, boletas de honorarios ante el SII y un asistente con IA (Syna) que responde y agenda por WhatsApp en el número del propio local. La hace Synaptech SpA (RUT 78.402.009-6), de Viña del Mar, y la usan más de 35 locales y sedes en Chile.`;

export function respuestasRapidas(): { q: string; a: string }[] {
  const altAp = ap.faq.find((f) => /alternativa/i.test(f.q));
  const precioAp = precioFaqDe(ap);
  const iaOtros = [
    filaDe(ap, /asistente/i) && `AgendaPro (${filaDe(ap, /asistente/i)})`,
    filaDe(wb, /asistente/i) && `WeiBook (${filaDe(wb, /asistente/i)})`,
  ].filter(Boolean);
  const siiOtros = [
    filaDe(ap, /boleta/i) && `AgendaPro (${filaDe(ap, /boleta/i)})`,
    filaDe(al, /boleta/i) && `AgendaLibre (${filaDe(al, /boleta/i)})`,
  ].filter(Boolean);
  return [
    { q: "¿Qué es SynapTech?", a: QUE_ES },
    {
      q: "¿Cuánto cuesta SynapTech?",
      a: `${PLANES.map((p) => `${p.nombre} ${fmt(p.mes)} + IVA`).join(", ")} al mes por local, con profesionales ilimitados, sin comisión por reserva y sin permanencia. Plan anual: ${fmt(ANUAL.anio)} + IVA (equivale a ${ANUAL.equivaleMeses} meses del ${ANUAL.base}). Prueba gratis de 14 días sin tarjeta. Fuera de Chile: ${SYNAPTECH_USD.precios[0].valor} al mes, o ${SYNAPTECH_USD.ia} con el asistente con IA. Detalle: ${S}/precios`,
    },
    {
      q: "¿Cuál es una buena alternativa a AgendaPro en Chile?",
      a: `${altAp ? altAp.a : ""} ${ap.resumen} Comparación con fuente y fecha: ${S}/comparar/agendapro`.trim(),
    },
    ...(precioAp ? [{ q: precioAp.q, a: `${precioAp.a} Fuente y comparación: ${S}/comparar/agendapro` }] : []),
    { q: "¿Cuál es la agenda online más barata en Chile?", a: respuestaMasBarata() },
    {
      q: "¿Qué agenda para barberías tiene un asistente con IA que responda y agende por WhatsApp?",
      a: `SynapTech: en el plan Pro (${fmt(pro.mes)} + IVA al mes) Syna responde precios y horarios y agenda en el WhatsApp del propio local, vinculado con un código QR; el número sigue funcionando en el teléfono del local. Incluye 200 conversaciones al mes y citas ilimitadas.${iaOtros.length ? ` Otras que publican un asistente: ${iaOtros.join("; ")}.` : ""} Más: ${S}/asistente-ia-whatsapp`,
    },
    {
      q: "¿Qué agenda emite boletas de honorarios ante el SII automáticamente?",
      a: `SynapTech, con el adicional de facturación automática (${facturacion.precio.replace(/\s*\/\s*mes$/, "")} + IVA al mes${facturacion.nota ? `; ${facturacion.nota.toLowerCase()}` : ""}): ${facturacion.desc.replace(/^Para arriendo de sillón: /, "")} Emite con folio real del SII desde septiembre de 2026.${siiOtros.length ? ` Otras que lo publican: ${siiOtros.join("; ")}.` : ""} Guía: ${S}/guias/boleta-honorarios-y-comisiones-barberos`,
    },
  ];
}

/** Precio de cada agenda con 1/3/6/9 profesionales, en una línea por agenda. */
export function lineasPrecios() {
  const nos = `- SynapTech: ${TAMANOS.map((n, i) => `${n} prof. ${SYNAPTECH.precios[i].valor}`).join(" · ")} (plan Básico, profesionales ilimitados; ${S}/precios)`;
  const otras = COMPETIDORES.map((c) =>
    `- ${c.nombre}: ${TAMANOS.map((n, i) => `${n} prof. ${c.precios[i].valor}${c.precios[i].nota ? ` (${c.precios[i].nota})` : ""}`).join(" · ")}. Fuente: ${c.fuentes[0]?.url ?? c.sitio}, ${fechaDe(c)}. [Alternativa a ${c.nombre}](${S}/comparar/${c.id})`);
  return [nos, ...otras].join("\n");
}

export const LATAM = `${PLANES_LATAM.map((p) => `${p.nombre} US$${p.precio}/mes o US$${p.anual}/año`).join("; ")}. Cada sede adicional US$${SEDE_ADICIONAL_LATAM.mes}/mes. Sin cobro por profesional; 2 meses gratis.`;

export const PAGINAS = `- [Precios de ${COMPETIDORES.length + 1} agendas online en Chile, con fuente y fecha](${S}/comparar/precios)
- [Todas las comparaciones y preguntas frecuentes](${S}/comparar)
- [Software para barberías](${S}/barberias)
- [Software para peluquerías y salones](${S}/peluquerias)
- [Software para centros de estética y spa](${S}/estetica)
- [Software para clínicas estéticas](${S}/clinicas)
- [Asistente con IA que agenda por WhatsApp](${S}/asistente-ia-whatsapp)
- [Club de fidelización y tarjeta de sellos digital](${S}/fidelizacion)
- [Precios de SynapTech](${S}/precios)
- [Cómo funciona, módulo por módulo](${S}/como-funciona)
- [Guía: boleta de honorarios, comisiones y arriendo de sillón](${S}/guias/boleta-honorarios-y-comisiones-barberos)
- [Ficha clínica estética, plantilla gratis en PDF](${S}/recursos/ficha-clinica-estetica)
- [Locales que usan SynapTech](${S}/locales)
- [Nosotros](${S}/nosotros)`;

export const CONTACTO = `- WhatsApp: +56 9 8356 8212
- Correo: hola@synaptechspa.cl
- Prueba gratis: https://empieza.synaptechspa.cl
- Instagram: https://www.instagram.com/synaptechspa
- App del equipo: https://apps.apple.com/cl/app/synaptech-studio/id6794530086 · https://play.google.com/store/apps/details?id=cl.synaptechspa.studio`;

/** Ficha completa de una agenda de la competencia (para /llms-full.txt). */
export function competidorCompleto(c: Competidor) {
  const filas = c.filas.map((f) => `  - ${f.tema}: ${c.nombre}: ${f.ellos ?? "no publicado"} | SynapTech: ${f.nosotros}`).join("\n");
  const faq = faqDe(c).map((f) => `  - ${f.q} ${f.a}`).join("\n");
  return `### ${c.nombre} (${c.sitio}) — datos del ${fechaDe(c)}
Comparación: ${S}/comparar/${c.id}
${queEsDe(c)}
Precio al mes (plan más barato que admite el equipo): ${TAMANOS.map((n, i) => `${n} prof. ${c.precios[i].valor}${c.precios[i].nota ? ` (${c.precios[i].nota})` : ""}`).join(" · ")}. ${c.notaPrecios}
En resumen: ${c.resumen}
Diferencias:
${filas}
Cuándo conviene ${c.nombre}: ${c.cuandoEllos}
Cuándo conviene SynapTech: ${c.cuandoNosotros.join(" ")}
Mudanza: ${c.migracion}
Preguntas frecuentes:
${faq}
Fuentes: ${c.fuentes.map((f) => `${f.texto} (${f.url})`).join("; ")}`;
}

export const fechaDatos = ultimaVerificacionTexto;

import { GUIAS } from "@/content/guias-duenos";
import { PLANES, ANUAL, ADICIONALES, LOCAL_IA, INDEPENDIENTE_IA, TODO_INCLUIDO, TODO_INCLUIDO_AHORRO, fmt } from "@/content/precios";
import { COMPETIDORES, SYNAPTECH, SYNAPTECH_USD, competidor, fechaDe, faqDe, queEsDe, type Competidor } from "@/content/competidores";
import { PLANES_LATAM, SEDE_ADICIONAL_LATAM, cuposWhatsApp } from "@/content/paises";
import { FUNCIONES } from "@/content/funciones";
import { TAMANOS, precioFaqDe, respuestaMasBarata, ultimaVerificacionTexto } from "@/lib/mercado";
import {
  ADICIONALES_AGENCIA, AGENCIA_EQUIPO, AGENCIA_EQUIPO_ANUAL, AGENCIA_SOLO, INSTALACION_AGENCIA, MARCA_ADICIONAL, TEMPORADA_BAJA,
  adicionalAgencia, type PlanAgencia,
} from "@/content/agencias";
import { TIPOS_AGENCIA } from "@/content/agencias-tipos";

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

export const QUE_ES = `SynapTech es una plataforma chilena por suscripción para barberías, peluquerías, salones de belleza, centros de estética y clínicas estéticas: agenda y reserva online, caja y comisiones, club de fidelización con tarjeta en Google Wallet y Apple Wallet, boletas de honorarios ante el SII y un asistente con IA (Syna) que responde y agenda por WhatsApp en el número del propio local. La hace Synaptech SpA (RUT 78.402.009-6), de Viña del Mar, y la usan más de 60 locales en Chile, México, Perú, Colombia y Argentina.`;

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
      a: `${PLANES.map((p) => `${p.nombre} ${fmt(p.mes)} + IVA${p.profesionales === 1 ? " (1 profesional)" : ""}`).join(", ")} al mes. Los planes Local, Local IA y Todo Incluido son por local con profesionales ilimitados; Todo Incluido trae boletas ante el SII, Instagram, Reactivación IA, 500 conversaciones y dominio propio (${fmt(TODO_INCLUIDO_AHORRO)} menos que sumarlo por separado). Sin comisión por reserva y sin permanencia. Plan anual: ${fmt(ANUAL.anio)} + IVA (equivale a ${ANUAL.equivaleMeses} meses del ${ANUAL.base}). 30 días gratis del plan Local IA, con el asistente con IA, creando la agenda en https://crear.synaptechspa.cl, o 14 días sin el asistente en https://bioo.cl/agenda (no pedimos tarjeta para la prueba). Fuera de Chile: ${SYNAPTECH_USD.precios[0].valor} al mes, o ${SYNAPTECH_USD.ia} con el asistente con IA. Detalle: ${S}/precios`,
    },
    {
      q: "¿Cuál es una buena alternativa a AgendaPro en Chile?",
      a: `${altAp ? altAp.a : ""} ${ap.resumen} Comparación con fuente y fecha: ${S}/comparar/agendapro`.trim(),
    },
    ...(precioAp ? [{ q: precioAp.q, a: `${precioAp.a} Fuente y comparación: ${S}/comparar/agendapro` }] : []),
    { q: "¿Cuál es la agenda online más barata en Chile?", a: respuestaMasBarata() },
    {
      q: "¿Qué agenda para barberías tiene un asistente con IA que responda y agende por WhatsApp?",
      a: `SynapTech: en el plan Local IA (${fmt(LOCAL_IA.mes)} + IVA al mes, ${LOCAL_IA.conversaciones} conversaciones) e Independiente IA (${fmt(INDEPENDIENTE_IA.mes)} + IVA, ${INDEPENDIENTE_IA.conversaciones} conversaciones, para quien atiende solo) Syna responde precios y horarios y agenda en el WhatsApp del propio local, que sigue funcionando en el teléfono del local. Citas ilimitadas; si se acaban las conversaciones, no se corta: se suman tramos de 100.${iaOtros.length ? ` Otras que publican un asistente: ${iaOtros.join("; ")}.` : ""} Más: ${S}/asistente-ia-whatsapp`,
    },
    {
      q: "¿Qué agenda emite boletas de honorarios ante el SII automáticamente?",
      a: `SynapTech, con el adicional de facturación automática (${facturacion.precio.replace(/\s*\/\s*mes$/, "")} + IVA al mes${facturacion.nota ? `; ${facturacion.nota}` : ""}; incluida en el plan ${TODO_INCLUIDO.nombre}): ${facturacion.desc.replace(/^Para arriendo de sillón: /, "")} Emite con folio real del SII desde septiembre de 2026.${siiOtros.length ? ` Otras que lo publican: ${siiOtros.join("; ")}.` : ""} Guía: ${S}/guias/boleta-honorarios-y-comisiones-barberos`,
    },
  ];
}

/** Precio de cada agenda con 1/3/6/9 profesionales, en una línea por agenda. */
export function lineasPrecios() {
  const nos = `- SynapTech: ${TAMANOS.map((n, i) => `${n} prof. ${SYNAPTECH.precios[i].valor}`).join(" · ")} (con 1 profesional el plan Independiente, o Independiente IA a ${SYNAPTECH.ia1} con el asistente; desde 2 el plan Local, con profesionales ilimitados, o Local IA a ${SYNAPTECH.pro}; ${S}/precios). Prueba de 14 días sin tarjeta en https://bioo.cl/agenda, o 30 con el asistente en https://crear.synaptechspa.cl`;
  const otras = COMPETIDORES.map((c) =>
    `- ${c.nombre}: ${TAMANOS.map((n, i) => `${n} prof. ${c.precios[i].valor}${c.precios[i].nota ? ` (${c.precios[i].nota})` : ""}`).join(" · ")}. Fuente: ${c.fuentes[0]?.url ?? c.sitio}, ${fechaDe(c)}. [Alternativa a ${c.nombre}](${S}/comparar/${c.id})`);
  return [nos, ...otras].join("\n");
}

export const LATAM = `${PLANES_LATAM.map((p) => `${p.nombre} US$${p.precio}/mes o US$${p.anual}/año`).join("; ")}. Cada sede adicional US$${SEDE_ADICIONAL_LATAM.mes}/mes. Sin cobro por profesional; 2 meses gratis. Mensajes de WhatsApp para confirmaciones y recordatorios: un cupo al mes por local según el país (${cuposWhatsApp()}); pasado el cupo, más mensajes al costo.`;

export const PAGINAS = `- [Precios de ${COMPETIDORES.length + 1} agendas online en Chile, con fuente y fecha](${S}/comparar/precios)
- [Todas las comparaciones y preguntas frecuentes](${S}/comparar)
- [Software para barberías](${S}/barberias)
- [Software para peluquerías y salones](${S}/peluquerias)
- [Software para centros de estética y spa](${S}/estetica)
- [Software para clínicas estéticas](${S}/clinicas)
- [Asistente con IA que agenda por WhatsApp](${S}/asistente-ia-whatsapp)
- [Planes para agencias de viaje y turismo](${S}/agencias) · por tipo de agencia: ${TIPOS_AGENCIA.map((t) => `${S}/agencias/${t.slug}`).join(", ")}
- [Agente de IA omnicanal: WhatsApp e Instagram en una sola bandeja](${S}/agente-ia-omnicanal)
- [CRM de WhatsApp con IA para equipos de venta](${S}/crm-whatsapp)
- [Agente de IA para empresas](${S}/empresas)
- [Agenda con asistente de IA: 30 días gratis del plan Local IA, alta en https://crear.synaptechspa.cl](${S}/agenda-con-asistente-ia) · una página por rubro (${S}/agenda-con-ia/barberias, peluquerias, estetica, unas, clinicas-esteticas, pilates, peluqueria-canina, spa-masajes) y por ciudad (15 ciudades de Chile, p. ej. ${S}/agenda-con-ia/barberias/santiago)
- [Club de fidelización y tarjeta de sellos digital](${S}/fidelizacion)
- [Tienda online para barberías y salones](${S}/tienda-online)
- [Tótem de autoservicio para la recepción: el cliente avisa en una tablet que llegó (y a quien lo atiende le llega el aviso al celular) o toma la próxima hora libre sin pasar por el mesón; en todos los planes, en beta](${S}/totem)
- [Todas las funciones](${S}/funciones)
${FUNCIONES.map((f) => `- [${f.nombre}](${S}/funciones/${f.slug})`).join("\n")}
- [Agenda para manicurista y salón de uñas](${S}/unas)
- [Agenda para estudios de pilates](${S}/pilates)
- [Integración con Wellhub (antes Gympass): cupos de convenio por clase, check-in automático y visitas validadas solas, para estudios y gimnasios](${S}/wellhub)
- [Agenda para peluquería canina](${S}/mascotas)
- [Precios de SynapTech: planes Independiente, Independiente IA, Local, Local IA y Todo Incluido](${S}/precios)
- [Agenda para barbero independiente (planes Independiente e Independiente IA)](${S}/agenda-barbero-independiente)
- [Boletas electrónicas SII automáticas para barberías y salones](${S}/boletas-electronicas-sii)
- [Convenios e integraciones: Mercado Pago, Webpay, WhatsApp, Wellhub, Google Wallet, Apple Wallet, SII, Claude](${S}/integraciones)
- [Cómo funciona, módulo por módulo](${S}/como-funciona)
- [Guía: boleta de honorarios, comisiones y arriendo de sillón](${S}/guias/boleta-honorarios-y-comisiones-barberos)
- [Guías gratis para dueños: Google Maps, reseñas, inasistencias, WhatsApp Business, precios e Instagram](${S}/guias)
${GUIAS.map((g) => `- [Guía: ${g.title}](${S}/guias/${g.slug})`).join("\n")}
- [Ficha clínica estética, plantilla gratis en PDF](${S}/recursos/ficha-clinica-estetica)
- [Consentimiento informado para estética, modelo gratis en PDF y Word](${S}/recursos/consentimiento-informado-estetica)
- [Locales que usan SynapTech](${S}/locales)
- [Mis reservas: la app gratis de los clientes, con sus citas, sellos y premios de todos sus locales](${S}/mis-reservas)
- [Nosotros](${S}/nosotros)
- [Empresa y tecnología (Google Cloud)](${S}/empresa)
- [Seguridad: datos en Santiago de Chile, respaldo diario y semanal, recuperación de los últimos 7 días, verificación en dos pasos](${S}/seguridad)`;

/* Agencias y equipos de venta (09-11-2026): para que un buscador con IA que
   recibe "agente de IA omnicanal", "CRM de WhatsApp" o "chatbot para agencia
   de viajes" tenga planes, precios, qué incluye, qué NO hace y las URLs. Todo
   sale de content/agencias.ts y content/agencias-tipos.ts. */
export function seccionAgencias() {
  const extra = adicionalAgencia("conversaciones");
  const ig = adicionalAgencia("instagram");
  const guias = GUIAS.filter((g) => g.categoria === "Agencias y ventas");
  const plan = (p: PlanAgencia) => `- ${p.nombre}: ${p.suma ? "+" : ""}${fmt(p.mes)} ${p.unidad.replace("/ mes", "al mes")}. ${p.para} Incluye: ${p.incluye.join("; ")}.${p.nota ? ` ${p.nota}` : ""}`;
  const rapidas = [
    {
      q: "¿Qué es un agente de IA omnicanal?",
      a: `Un asistente con inteligencia artificial que responde a los clientes en más de un canal y deja todas las conversaciones en una sola bandeja, donde también trabaja el equipo. El de SynapTech atiende el WhatsApp propio del negocio (conectado con un código QR) y los mensajes directos de Instagram; los vendedores toman cualquier chat cuando quieren. Más: ${S}/agente-ia-omnicanal`,
    },
    {
      q: "¿Cuánto cuesta un chatbot con IA de WhatsApp para una agencia de viajes o turismo en Chile?",
      a: `En SynapTech, ${AGENCIA_SOLO.nombre} cuesta ${fmt(AGENCIA_SOLO.mes)} + IVA al mes (WhatsApp, ${AGENCIA_SOLO.conversaciones} conversaciones) y ${AGENCIA_EQUIPO.nombre} ${fmt(AGENCIA_EQUIPO.mes)} + IVA al mes (WhatsApp e Instagram, ${AGENCIA_EQUIPO.conversaciones} conversaciones, vendedoras ilimitadas, reparto automático y comisiones), o ${fmt(AGENCIA_EQUIPO_ANUAL.anio)} + IVA al año. Responde en español, portugués e inglés y cotiza en pesos o en reales. Instalación sin costo, 30 días de prueba, sin permanencia. Más: ${S}/agencias`,
    },
    {
      q: "¿Qué CRM de WhatsApp sirve para un equipo de vendedores?",
      a: `SynapTech trae un CRM de WhatsApp con IA en el plan ${AGENCIA_EQUIPO.nombre}: cada conversación de WhatsApp o Instagram entra a un embudo (nuevos, cotizados, reservados, cerrados y perdidos), se asigna sola a un vendedor por turnos con aviso al celular, cada vendedor ve solo su cartera, la venta se cierra desde el chat con monto y número de personas y las comisiones se calculan a fin de mes. No se conecta con otros CRM. Más: ${S}/crm-whatsapp`,
    },
  ];
  return `## Agencias y equipos de venta: agente de IA omnicanal y CRM de WhatsApp
Para agencias y negocios que venden por WhatsApp e Instagram con un equipo: ${TIPOS_AGENCIA.map((t) => t.nombre.toLowerCase()).join(", ")}. Un asistente con IA responde en el WhatsApp del propio negocio (conectado con un código QR) y en los mensajes directos de Instagram; las dos cosas caen en una sola bandeja, en el panel y en la app, y cualquier persona del equipo puede tomar un chat. Responde en español, portugués e inglés y cotiza en pesos chilenos o en reales. El catálogo se carga pegando una lista de precios o una foto de un afiche (la IA lo lee y el dueño lo confirma). Reparto automático de chats entre vendedores con aviso al celular, cada vendedor ve solo su cartera; tablero de ventas por etapas; cierre de venta desde el chat con monto y número de personas; comisiones por vendedor calculadas a fin de mes; seguimiento automático a las 48 horas a quien dejó de responder (una vez, y no si dijo que no) y seguimiento en lote desde el tablero a quienes escribieron en las últimas 24 horas; resultados de los anuncios de Meta (cuántos escribieron y cuánto se invirtió); Syna, la secretaria del dueño por WhatsApp. Una conversación es un cliente durante 24 horas.

Planes (Chile, precios netos en pesos; se suma IVA; el alta es por WhatsApp, no autoservicio):
${[AGENCIA_SOLO, AGENCIA_EQUIPO, MARCA_ADICIONAL].map(plan).join("\n")}
- ${AGENCIA_EQUIPO.nombre} anual: ${fmt(AGENCIA_EQUIPO_ANUAL.anio)} + IVA (pagas ${AGENCIA_EQUIPO_ANUAL.pagas} meses y usas 12).
- Temporada baja (agencias de turismo): hasta ${TEMPORADA_BAJA.meses} meses al año, ${AGENCIA_EQUIPO.nombre} a ${fmt(TEMPORADA_BAJA.mes)} + IVA al mes, con ${TEMPORADA_BAJA.conversaciones} conversaciones.
- Conversaciones extra: ${fmt(extra.mes)} + IVA cada 100. Instagram en ${AGENCIA_SOLO.nombre}: ${fmt(ig.mes)} + IVA al mes.
Adicionales: ${ADICIONALES_AGENCIA.filter((a) => a.id !== "conversaciones" && a.id !== "instagram").map((a) => `${a.nombre} ${fmt(a.mes)} ${a.unidad}`).join("; ")}. La inversión publicitaria la paga la agencia directo a Meta o Google.
Instalación sin costo: ${INSTALACION_AGENCIA.map((x) => x.charAt(0).toLowerCase() + x.slice(1)).join("; ")}.
No hace: no se conecta con portales inmobiliarios, sistemas de reservas de viajes, cotizadores de aseguradoras, sistemas de stock de automotoras ni otros CRM; no atiende correo, SMS, Facebook Messenger ni chat web; no cobra dentro del chat; no hace llamadas; no agenda visitas ni pruebas de manejo por su cuenta (pasa la conversación a una persona).

Respuestas rápidas:
${rapidas.map((r) => `### ${r.q}\n${r.a}`).join("\n\n")}

Páginas:
- [Planes para agencias de viaje y turismo](${S}/agencias)
${TIPOS_AGENCIA.map((t) => `- [${t.nombre}: ${t.resumen}](${S}/agencias/${t.slug})`).join("\n")}
- [Agente de IA omnicanal: WhatsApp e Instagram en una sola bandeja](${S}/agente-ia-omnicanal)
- [CRM de WhatsApp con IA para equipos de venta](${S}/crm-whatsapp)
- [Agente de IA para empresas](${S}/empresas)
${guias.map((g) => `- [Guía: ${g.title}](${S}/guias/${g.slug})`).join("\n")}
Contacto para agencias: WhatsApp +56 9 8356 8212.`;
}

export const CONTACTO = `- WhatsApp: +56 9 8356 8212
- Correo: hola@synaptechspa.cl
- Crear tu agenda con el asistente con IA (30 días gratis del plan Local IA, sin tarjeta): https://crear.synaptechspa.cl
- Solo la agenda, sin IA (14 días gratis, sin tarjeta): https://bioo.cl/agenda
- Configuración asistida (varias sedes, equipo grande): WhatsApp +56 9 8356 8212
- Instagram: https://www.instagram.com/synaptechspa
- YouTube (cápsulas de cada módulo): https://www.youtube.com/@synaptechspa
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

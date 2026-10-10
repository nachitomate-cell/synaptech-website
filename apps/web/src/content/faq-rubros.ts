import type { Pregunta } from "@/components/FaqSeo";

/* Preguntas por rubro (09-10-2026). Salen del autocompletado de Google en Chile
   (seo/mapa-keywords-2026-10-09.md) y de las FAQ de quienes hoy posicionan.
   Cada respuesta afirma solo lo que existe en la plataforma; los precios son los
   de content/precios.ts. Si cambia un precio, cambia acá también. */

const GRATIS = "Estamos terminando un plan Gratis para siempre, para locales de hasta 4 profesionales: agenda, reserva online, fichas de clientes y confirmación de cada cita por correo. Mientras tanto, puedes probar cualquier plan 14 días sin tarjeta.";

export const FAQ_BARBERIAS: Pregunta[] = [
  { q: "¿Cuánto cuesta un software para barberías?", a: "En SynapTech, el plan Básico cuesta $29.900 + IVA al mes por local, con barberos ilimitados: agenda online, caja, comisiones y club de fidelización. El plan Pro, $49.900 + IVA, suma a Syna, el asistente con IA que responde y agenda por WhatsApp." },
  { q: "¿Hay un software para barbería gratis?", a: GRATIS },
  { q: "¿Hay una app para barberos?", a: "Sí. SynapTech Studio está en App Store y Google Play: cada barbero ve su agenda del día, crea y cierra citas desde el celular y revisa lo que lleva ganado." },
  { q: "¿Calcula las comisiones y el arriendo de sillón?", a: "Sí. Cada cobro queda con su medio de pago y la liquidación de cada barbero sale calculada, sea a porcentaje o con arriendo de sillón, con propinas y adelantos. La boleta de honorarios de cada barbero puede salir sola al cerrar la cita (adicional de $29.900 + IVA al mes)." },
  { q: "¿Mis clientes pueden agendar por WhatsApp?", a: "Sí. En el plan Pro, Syna responde precios y horarios y deja la hora agendada dentro del chat, desde el número de tu barbería. Además tienes tu página de reservas online abierta las 24 horas, para el link de Instagram." },
  { q: "¿Me puedo cambiar desde AgendaPro sin perder clientes?", a: "Sí. Te mudamos gratis tus servicios, precios, barberos con sus horarios y tu lista de clientes. La comparación completa está en synaptechspa.cl/comparar/agendapro." },
];

export const FAQ_PELUQUERIAS: Pregunta[] = [
  { q: "¿Qué sistema de reservas sirve para una peluquería?", a: "Uno que deje a cada profesional con su agenda y sus servicios con la duración real. En SynapTech tu clienta reserva online las 24 horas eligiendo servicio, profesional y hora, y le llegan la confirmación y el recordatorio." },
  { q: "¿Cuánto cuesta el software para peluquerías?", a: "Desde $29.900 + IVA al mes por local, con profesionales ilimitados. El plan Pro, $49.900 + IVA, suma un asistente con IA que responde y agenda por WhatsApp." },
  { q: "¿Hay una agenda para salón de belleza gratis?", a: GRATIS },
  { q: "¿Puedo vender productos y gift cards?", a: "Sí. Llevas el stock, vendes en el mesón y en tu tienda online, y emites gift cards con código, monto y vencimiento que se canjean en la agenda." },
  { q: "¿Cómo pago las comisiones de las estilistas?", a: "La liquidación de cada profesional sale calculada con su porcentaje, propinas y adelantos, y la descargas en PDF o Excel." },
];

export const FAQ_ESTETICA: Pregunta[] = [
  { q: "¿Qué software sirve para un centro de estética?", a: "Uno que maneje un catálogo largo de tratamientos, la ficha de cada clienta y los abonos. SynapTech trae agenda online 24/7, ficha con notas e historial, aceptación de tus políticas antes de reservar, gift cards y club de fidelización." },
  { q: "¿Cuánto cuesta?", a: "Desde $29.900 + IVA al mes por local, con profesionales ilimitados. El asistente con IA por WhatsApp viene en el plan Pro, $49.900 + IVA." },
  { q: "¿Hay una agenda online para estética gratis?", a: GRATIS },
  { q: "¿Puedo cobrar un abono al reservar?", a: "Sí, con Mercado Pago, para bajar las horas perdidas en tratamientos largos." },
  { q: "¿Las clientas pueden reservar por WhatsApp?", a: "Sí. En el plan Pro, el asistente responde por cada tratamiento con tu catálogo y deja la hora agendada en el WhatsApp de tu centro." },
];

export const FAQ_CLINICAS: Pregunta[] = [
  { q: "¿El software tiene ficha clínica para estética?", a: "Sí. Cada paciente tiene su ficha con alergias destacadas, notas del equipo y la evolución de cada sesión, y la puedes imprimir en PDF." },
  { q: "¿Se puede firmar el consentimiento informado en línea?", a: "Sí. El paciente acepta tu consentimiento informado al reservar, y en la clínica puede firmar en pantalla." },
  { q: "¿Pide el RUT al reservar?", a: "Sí. La reserva pide nombre, apellidos, edad y RUT con dígito verificador, y todo queda en la ficha." },
  { q: "¿Cuánto cuesta un software para clínica estética?", a: "Desde $29.900 + IVA al mes por clínica, con profesionales ilimitados. El asistente con IA que agenda por WhatsApp viene en el plan Pro, $49.900 + IVA." },
  { q: "¿Funciona con Isapre o Fonasa?", a: "No. SynapTech está hecho para clínicas estéticas y de bienestar con atención particular; no emite bonos de Isapre ni de Fonasa." },
];

export const FAQ_ASISTENTE: Pregunta[] = [
  { q: "¿Qué es un chatbot para agendar citas por WhatsApp?", a: "Un asistente que contesta los mensajes de tus clientes, les ofrece las horas que de verdad están libres y deja la cita agendada en tu agenda, sin que tengas que soltar lo que estás haciendo." },
  { q: "¿Escribe desde el número de mi local?", a: "Sí. Syna responde desde el número de tu local, y tú sigues usando ese WhatsApp en tu teléfono. Cuando quieres, tomas tú la conversación." },
  { q: "¿Qué inteligencia artificial usa?", a: "Syna funciona con Claude, de Anthropic. Responde con tu catálogo y tu agenda real, así que no inventa precios ni horarios." },
  { q: "¿En qué se diferencia de WhatsApp Business o de Meta AI?", a: "WhatsApp Business te deja mensajes automáticos fijos; Meta AI es un asistente general. Syna conoce tus servicios, tus precios y la agenda de cada profesional, y agenda, cambia o cancela horas en tu sistema." },
  { q: "¿Cuánto cuesta?", a: "Viene incluido en el plan Pro, $49.900 + IVA al mes por local, con hasta 200 conversaciones al mes. Sobre el plan Básico se agrega desde $19.900 + IVA al mes." },
  { q: "¿Qué pasa si no sabe responder algo?", a: "Le pasa la conversación a una persona de tu equipo y te avisa. También puedes elegir qué temas no quieres que responda." },
];

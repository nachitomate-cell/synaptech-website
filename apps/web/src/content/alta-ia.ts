import type { Dolor } from "@/components/Rubro";
import type { Pregunta } from "@/components/FaqSeo";
import type { RubroAlta } from "@/content/catalogo";
import type { LocalDirectorio } from "@/lib/directorio";

/* Páginas "agenda con asistente de IA" por rubro y ciudad (21-10-2026).
   Llevan al alta con Syna encendido: crear.synaptechspa.cl, 30 días gratis del
   plan Pro. 26-10-2026: el plan Gratis ya no se publica; lo ofrece Ignacio en persona.

   REGLAS (mismas que content/comparar.ts y content/competidores.ts):
   - Cifras: SOLO las de CIFRAS_IA, siempre con su fecha. Nada de "miles de
     locales", testimonios ni nombres de negocios inventados.
   - Lo que hace Syna: lo de /asistente-ia-whatsapp y nada más. Responde desde
     el número del local (que sigue funcionando en el teléfono), muestra horas
     libres reales de cada profesional, no inventa precios (usa tu catálogo),
     pide los datos que definas, pasa la conversación a una persona y avisa, y
     puedes tomar el control. Funciona con Claude, de Anthropic.
   - Pro: $49.900 + IVA al mes con 200 conversaciones. NO "ilimitado", NO
     recordatorios por WhatsApp gratis, NO Instagram (eso es el plan Full).
   - Tarjeta: solo "No pedimos tarjeta para la prueba".
   - Los chats de ejemplo son ilustrativos y se dicen como tales: los precios
     y las horas salen del catálogo y la agenda de cada local. */

export const CIFRAS_IA = {
  fecha: "20 de octubre de 2026",
  frase: "Al 20 de octubre de 2026, el asistente ya agendó 427 citas en 21 locales",
  items: [
    { valor: "427 citas", texto: "agendadas por el asistente en 21 locales" },
    { valor: "Más de $5,5 millones", texto: "en citas atendidas, en Chile" },
    { valor: "Casi 1 de cada 5", texto: "citas las agendó fuera de horario (de 21 a 8 h o fin de semana)" },
  ],
};

export const PRO_IA = { precio: "$49.900 + IVA al mes", conversaciones: 200 };

export type MensajeChat = { de: "cliente" | "syna"; texto: string };
export type EjemploChat = { titulo: string; mensajes: MensajeChat[] };

export type RubroIA = {
  slug: string;
  /** Rubro que recibe el alta (crear.synaptechspa.cl/?rubro=). */
  rubro: RubroAlta;
  /** "Barberías": para migas y tarjetas. */
  nombre: string;
  /** "barberías": en títulos ("para barberías en Temuco"). */
  plural: string;
  /** "tu barbería": en frases. */
  tuLocal: string;
  /** "clientes", "alumnas", "pacientes", "dueños de mascotas". */
  cliente: string;
  /** Página de rubro existente del sitio. */
  pagina?: { href: string; texto: string };
  bajada: string;
  dolores: Dolor[];
  ejemplos: EjemploChat[];
  faq: Pregunta[];
  /** Qué locales del directorio son de este rubro (mismo criterio que lib/directorio.ts). */
  entra: (l: LocalDirectorio) => boolean;
};

/* Preguntas que valen para todos los rubros (se suman a las de cada uno). */
const faqComun = (tuLocal: string): Pregunta[] => [
  { q: "¿Qué pasa cuando terminan los 30 días?", a: `Eliges tu plan: el Pro, ${PRO_IA.precio}, y Syna sigue atendiendo, o el Básico, $29.900 + IVA, con la agenda de ${tuLocal} sin el asistente. No se cobra nada solo: no pedimos tarjeta para la prueba. Antes de que termine te escribimos para que elijas.` },
  { q: "¿Escribe desde mi número de WhatsApp?", a: `Sí. Syna responde desde el número de ${tuLocal}, que sigue funcionando en tu teléfono. Vinculas tu WhatsApp escaneando un QR y puedes tomar el control de cualquier chat cuando quieras.` },
];

export const RUBROS_IA: RubroIA[] = [
  {
    slug: "barberias",
    rubro: "barberia",
    nombre: "Barberías",
    plural: "barberías",
    tuLocal: "tu barbería",
    cliente: "clientes",
    pagina: { href: "/barberias", texto: "Software para barberías" },
    bajada: "Syna responde el WhatsApp de tu barbería mientras cortas: da precios de tu catálogo, ofrece las horas libres de cada barbero y deja la cita agendada.",
    dolores: [
      { dolor: "Contestar el WhatsApp con la máquina en la mano", solucion: "Responde mientras cortas", detalle: "Syna contesta precios y horarios con tu catálogo, sin que sueltes al cliente que tienes en la silla." },
      { dolor: "\"¿Tienes hora hoy?\" veinte veces al día", solucion: "Ofrece horas reales", detalle: "Muestra las horas que de verdad están libres de cada barbero y agenda la que el cliente elija." },
      { dolor: "Mensajes de noche que nadie contesta", solucion: "Atiende fuera de horario", detalle: "El cliente que escribe a las once de la noche queda con su hora tomada para mañana." },
      { dolor: "Clientes que piden \"con el mismo de siempre\"", solucion: "Agenda con el barbero que pide", detalle: "Si el cliente nombra a un barbero, Syna busca las horas libres de ese barbero." },
      { dolor: "Preguntas que prefieres responder tú", solucion: "Te pasa la conversación", detalle: "Si algo se complica, avisa a tu equipo y deja el chat en sus manos. Tú tomas el control cuando quieras." },
    ],
    ejemplos: [
      { titulo: "Precio y hora el mismo día", mensajes: [
        { de: "cliente", texto: "Hola, ¿cuánto sale corte con barba? ¿Tienes hora hoy?" },
        { de: "syna", texto: "¡Hola! Corte + barba está en $15.000. Hoy tengo libre a las 17:30 con Matías o a las 18:15 con Diego. ¿Cuál te acomoda?" },
        { de: "cliente", texto: "17:30 con Matías" },
        { de: "syna", texto: "Listo, ¿me das tu nombre para la reserva?" },
        { de: "cliente", texto: "Felipe Rojas" },
        { de: "syna", texto: "Perfecto, Felipe. Quedaste hoy a las 17:30 con Matías, corte + barba. ¡Te esperamos!" },
      ] },
      { titulo: "Mensaje a las 23:40", mensajes: [
        { de: "cliente", texto: "Buenas, ¿mañana temprano hay hora para un fade?" },
        { de: "syna", texto: "¡Hola! Mañana tengo a las 10:00 y a las 11:00. El degradado está en $12.000. ¿Te reservo alguna?" },
        { de: "cliente", texto: "A las 10" },
        { de: "syna", texto: "Hecho. ¿A nombre de quién la dejo?" },
      ] },
      { titulo: "Con su barbero de siempre", mensajes: [
        { de: "cliente", texto: "Hola, quiero hora con Diego el sábado" },
        { de: "syna", texto: "¡Hola! El sábado Diego tiene libre a las 12:00 y a las 16:30. ¿Cuál prefieres?" },
        { de: "cliente", texto: "16:30, solo corte" },
        { de: "syna", texto: "Listo, sábado 16:30 con Diego, corte de pelo. ¿Me confirmas tu nombre?" },
      ] },
    ],
    faq: [
      { q: "¿Sirve para una barbería con varios barberos?", a: "Sí. Cada barbero tiene su agenda y sus horarios, y Syna ofrece las horas libres reales de cada uno. Si el cliente pide a un barbero, busca las horas de ese barbero." },
      { q: "¿Cuánto cuesta el asistente para mi barbería?", a: `Viene en el plan Pro, ${PRO_IA.precio} por local, con ${PRO_IA.conversaciones} conversaciones al mes y barberos ilimitados. Los primeros 30 días son gratis.` },
      { q: "¿Y si un cliente pregunta algo que Syna no sabe?", a: "Le pasa la conversación a una persona de tu equipo y avisa. Syna no inventa precios: responde con los servicios y precios de tu catálogo." },
      ...faqComun("tu barbería"),
    ],
    entra: (l) => l.rubro === "barberia" || l.tipo === "mixto",
  },
  {
    slug: "peluquerias",
    rubro: "salon",
    nombre: "Peluquerías",
    plural: "peluquerías",
    tuLocal: "tu peluquería",
    cliente: "clientas",
    pagina: { href: "/peluquerias", texto: "Software para peluquerías" },
    bajada: "Syna responde el WhatsApp de tu peluquería: da precios de tu catálogo, ofrece las horas libres de cada estilista y deja la cita agendada.",
    dolores: [
      { dolor: "Cotizar color y mechas por chat", solucion: "Precios de tu catálogo", detalle: "Syna responde con los servicios y precios que tú cargaste. No inventa valores." },
      { dolor: "Servicios largos que no caben en cualquier hora", solucion: "Horas que de verdad sirven", detalle: "Ofrece solo las horas libres de cada estilista, según la agenda real." },
      { dolor: "Clientas que escriben mientras atiendes", solucion: "Responde al instante", detalle: "Contesta dudas de horario y precio sin que dejes el secador." },
      { dolor: "Pedir el nombre y el teléfono uno por uno", solucion: "Pide los datos que definas", detalle: "Nombre completo u otros datos, antes de confirmar la hora." },
      { dolor: "Consultas que necesitan tu ojo", solucion: "Te pasa la conversación", detalle: "Si piden un diagnóstico o algo especial, avisa y deja el chat a tu equipo." },
    ],
    ejemplos: [
      { titulo: "Precio de un servicio", mensajes: [
        { de: "cliente", texto: "Hola, ¿cuánto sale un corte de mujer con brushing?" },
        { de: "syna", texto: "¡Hola! Corte + brushing está en $22.000. ¿Quieres que te busque hora?" },
        { de: "cliente", texto: "Sí, el jueves en la tarde" },
        { de: "syna", texto: "El jueves tengo a las 15:00 con Camila o a las 17:30 con Javiera. ¿Cuál te acomoda?" },
      ] },
      { titulo: "Hora con su estilista", mensajes: [
        { de: "cliente", texto: "Quiero hora con Javiera para retocar raíz" },
        { de: "syna", texto: "¡Hola! Javiera tiene libre el viernes a las 11:00 y el sábado a las 10:30. ¿Cuál prefieres?" },
        { de: "cliente", texto: "Sábado" },
        { de: "syna", texto: "Listo, sábado 10:30 con Javiera. ¿Me das tu nombre completo?" },
      ] },
      { titulo: "Consulta que pasa a una persona", mensajes: [
        { de: "cliente", texto: "Tengo el pelo muy dañado, ¿me conviene un alisado?" },
        { de: "syna", texto: "Eso lo tiene que ver una de nuestras estilistas. Ya le avisé al equipo para que te responda por aquí." },
      ] },
    ],
    faq: [
      { q: "¿Sirve para un salón con varias estilistas?", a: "Sí. Cada profesional tiene su agenda y Syna ofrece las horas libres reales de cada una, para el servicio que pide la clienta." },
      { q: "¿Cuánto cuesta el asistente para mi peluquería?", a: `Viene en el plan Pro, ${PRO_IA.precio} por local, con ${PRO_IA.conversaciones} conversaciones al mes y profesionales ilimitados. Los primeros 30 días son gratis.` },
      { q: "¿Puede cotizar servicios como color o mechas?", a: "Responde con los servicios y precios que cargues en tu catálogo. Si un servicio necesita evaluación, pasa la conversación a tu equipo y avisa." },
      ...faqComun("tu peluquería"),
    ],
    entra: (l) => l.rubro === "salon" || l.tipo === "mixto",
  },
  {
    slug: "estetica",
    rubro: "estetica",
    nombre: "Centros de estética",
    plural: "centros de estética",
    tuLocal: "tu centro de estética",
    cliente: "clientas",
    pagina: { href: "/estetica", texto: "Software para centros de estética" },
    bajada: "Syna responde el WhatsApp de tu centro: explica tus tratamientos con tu catálogo, ofrece las horas libres y deja la cita agendada.",
    dolores: [
      { dolor: "Explicar cada tratamiento por chat", solucion: "Responde con tu catálogo", detalle: "Syna da precio y duración de cada tratamiento tal como los cargaste." },
      { dolor: "Clientas que preguntan y no reservan", solucion: "Agenda dentro del chat", detalle: "Ofrece las horas libres reales y deja la cita tomada en la misma conversación." },
      { dolor: "Mensajes que llegan en plena sesión", solucion: "Atiende mientras trabajas", detalle: "Tú sigues con tu clienta; Syna contesta el WhatsApp." },
      { dolor: "Datos incompletos en la ficha", solucion: "Pide los datos que definas", detalle: "Nombre completo, RUT u otros datos, antes de confirmar." },
      { dolor: "Dudas que necesitan una profesional", solucion: "Te pasa la conversación", detalle: "Si preguntan por una contraindicación o un caso especial, avisa a tu equipo." },
    ],
    ejemplos: [
      { titulo: "Precio de un tratamiento", mensajes: [
        { de: "cliente", texto: "Hola, ¿cuánto vale la limpieza facial profunda?" },
        { de: "syna", texto: "¡Hola! La limpieza facial profunda está en $28.000 y dura 60 minutos. ¿Te busco hora?" },
        { de: "cliente", texto: "Sí, el martes" },
        { de: "syna", texto: "El martes tengo a las 11:00 y a las 16:00. ¿Cuál te acomoda?" },
      ] },
      { titulo: "Reserva con datos", mensajes: [
        { de: "cliente", texto: "Quiero agendar depilación láser piernas" },
        { de: "syna", texto: "¡Hola! Tengo el miércoles a las 10:30 o el jueves a las 18:00. ¿Cuál prefieres?" },
        { de: "cliente", texto: "Jueves" },
        { de: "syna", texto: "Perfecto. Para la reserva necesito tu nombre completo y tu RUT." },
      ] },
      { titulo: "Pregunta delicada", mensajes: [
        { de: "cliente", texto: "Estoy embarazada, ¿me puedo hacer el peeling?" },
        { de: "syna", texto: "Eso lo tiene que responder una profesional. Ya le avisé al equipo para que te escriba por aquí." },
      ] },
    ],
    faq: [
      { q: "¿Sirve para un catálogo largo de tratamientos?", a: "Sí. Syna responde con los tratamientos, precios y duraciones que cargues en tu catálogo, y ofrece las horas libres que calzan con cada uno." },
      { q: "¿Cuánto cuesta el asistente para mi centro de estética?", a: `Viene en el plan Pro, ${PRO_IA.precio} por local, con ${PRO_IA.conversaciones} conversaciones al mes. Los primeros 30 días son gratis.` },
      { q: "¿Qué pasa con las preguntas médicas o delicadas?", a: "Puedes elegir qué temas no quieres que responda. En esos casos pasa la conversación a una persona de tu equipo y avisa." },
      ...faqComun("tu centro de estética"),
    ],
    entra: (l) => l.rubro === "estetica",
  },
  {
    slug: "unas",
    rubro: "unas",
    nombre: "Uñas y manicure",
    plural: "salones de uñas",
    tuLocal: "tu salón de uñas",
    cliente: "clientas",
    pagina: { href: "/unas", texto: "Agenda para manicuristas" },
    bajada: "Syna responde el WhatsApp de tu salón de uñas mientras trabajas: da precios de tu catálogo, ofrece las horas libres y agenda el set.",
    dolores: [
      { dolor: "Responder con las manos ocupadas", solucion: "Contesta por ti", detalle: "Mientras haces un set, Syna responde precios y horarios con tu catálogo." },
      { dolor: "Sets largos que no caben en cualquier hora", solucion: "Horas libres reales", detalle: "Ofrece solo las horas que de verdad están libres de cada manicurista." },
      { dolor: "\"¿Cuánto sale el acrílico?\" una y otra vez", solucion: "Precios de tu catálogo", detalle: "Responde con lo que tú cargaste. No inventa valores." },
      { dolor: "Clientas que escriben de noche", solucion: "Atiende fuera de horario", detalle: "La que escribe tarde queda con su hora tomada." },
    ],
    ejemplos: [
      { titulo: "Precio y hora", mensajes: [
        { de: "cliente", texto: "Hola! ¿Cuánto sale el esmaltado permanente?" },
        { de: "syna", texto: "¡Hola! El esmaltado permanente está en $14.000. ¿Te busco hora?" },
        { de: "cliente", texto: "Sí, mañana" },
        { de: "syna", texto: "Mañana tengo a las 12:00 y a las 17:00. ¿Cuál te acomoda?" },
      ] },
      { titulo: "Set largo con su manicurista", mensajes: [
        { de: "cliente", texto: "Quiero uñas acrílicas con Fernanda" },
        { de: "syna", texto: "¡Hola! Fernanda tiene libre el viernes a las 10:00 y el sábado a las 15:00. ¿Cuál prefieres?" },
        { de: "cliente", texto: "Viernes 10" },
        { de: "syna", texto: "Listo, viernes 10:00 con Fernanda. ¿A nombre de quién?" },
      ] },
      { titulo: "Mensaje de domingo", mensajes: [
        { de: "cliente", texto: "¿Atienden el lunes temprano?" },
        { de: "syna", texto: "¡Hola! El lunes tengo a las 9:30 y a las 11:00. ¿Te reservo alguna?" },
      ] },
    ],
    faq: [
      { q: "¿Sirve si trabajo sola?", a: "Sí. Syna responde mientras trabajas y te agenda en tus horas libres. Pruébalo 30 días gratis, sin tarjeta, y al terminar eliges tu plan." },
      { q: "¿Cuánto cuesta el asistente para mi salón de uñas?", a: `Viene en el plan Pro, ${PRO_IA.precio} por local, con ${PRO_IA.conversaciones} conversaciones al mes. Los primeros 30 días son gratis.` },
      { q: "¿Respeta la duración de cada servicio?", a: "Sí. Ofrece las horas libres según tu agenda real, así un set largo no se agenda en un espacio corto." },
      ...faqComun("tu salón de uñas"),
    ],
    entra: (l) => l.tipo === "nails",
  },
  {
    slug: "clinicas-esteticas",
    rubro: "clinica",
    nombre: "Clínicas estéticas",
    plural: "clínicas estéticas",
    tuLocal: "tu clínica",
    cliente: "pacientes",
    pagina: { href: "/clinicas", texto: "Software para clínicas" },
    bajada: "Syna responde el WhatsApp de tu clínica: informa tratamientos con tu catálogo, pide el RUT, ofrece las horas libres y agenda.",
    dolores: [
      { dolor: "Recepción saturada de mensajes", solucion: "Responde al instante", detalle: "Syna contesta precios y horarios con tu catálogo, y tu equipo atiende a quien está en la clínica." },
      { dolor: "Pedir RUT y nombre completo por chat", solucion: "Pide los datos que definas", detalle: "Nombre completo, RUT u otros datos, en el orden que elijas, antes de confirmar." },
      { dolor: "Pacientes que preguntan y no agendan", solucion: "Agenda en el mismo chat", detalle: "Ofrece las horas libres reales de cada profesional y deja la hora tomada." },
      { dolor: "Preguntas clínicas por WhatsApp", solucion: "Te pasa la conversación", detalle: "Eliges qué temas no responde. En esos casos avisa a tu equipo." },
      { dolor: "Consultas que llegan de noche", solucion: "Atiende fuera de horario", detalle: "El paciente que escribe tarde queda agendado." },
    ],
    ejemplos: [
      { titulo: "Evaluación con RUT", mensajes: [
        { de: "cliente", texto: "Hola, quiero una evaluación para botox" },
        { de: "syna", texto: "¡Hola! La evaluación está en $20.000. Tengo el lunes a las 16:00 o el miércoles a las 10:00. ¿Cuál te acomoda?" },
        { de: "cliente", texto: "Miércoles" },
        { de: "syna", texto: "Perfecto. Para agendar necesito tu nombre completo y tu RUT." },
      ] },
      { titulo: "Hora con un profesional", mensajes: [
        { de: "cliente", texto: "¿La doctora tiene hora esta semana?" },
        { de: "syna", texto: "¡Hola! Tiene libre el jueves a las 12:30 y el viernes a las 17:00. ¿Te reservo alguna?" },
        { de: "cliente", texto: "Jueves" },
        { de: "syna", texto: "Listo, jueves 12:30. ¿Me das tu nombre completo y RUT?" },
      ] },
      { titulo: "Tema que no delegas", mensajes: [
        { de: "cliente", texto: "Tomo anticoagulantes, ¿hay problema con el tratamiento?" },
        { de: "syna", texto: "Esa pregunta la tiene que responder el equipo de la clínica. Ya les avisé para que te escriban por aquí." },
      ] },
    ],
    faq: [
      { q: "¿Puede pedir el RUT antes de agendar?", a: "Sí. Syna pide los datos que tú definas, como nombre completo y RUT, antes de confirmar la hora." },
      { q: "¿Cuánto cuesta el asistente para mi clínica?", a: `Viene en el plan Pro, ${PRO_IA.precio} por clínica, con ${PRO_IA.conversaciones} conversaciones al mes y profesionales ilimitados. Los primeros 30 días son gratis.` },
      { q: "¿Responde preguntas médicas?", a: "Eliges qué temas no quieres que responda. En esos casos pasa la conversación a una persona de tu equipo y avisa." },
      ...faqComun("tu clínica"),
    ],
    entra: (l) => l.tipo === "clinica" || l.schemaType === "MedicalClinic",
  },
  {
    slug: "pilates",
    rubro: "pilates",
    nombre: "Estudios de pilates",
    plural: "estudios de pilates",
    tuLocal: "tu estudio",
    cliente: "alumnas",
    pagina: { href: "/pilates", texto: "Agenda para estudios de pilates" },
    bajada: "Syna responde el WhatsApp de tu estudio mientras das clases: informa valores de tu catálogo, ofrece las horas libres y agenda.",
    dolores: [
      { dolor: "Responder entre clase y clase", solucion: "Contesta mientras enseñas", detalle: "Syna responde valores y horarios con tu catálogo mientras estás en la sala." },
      { dolor: "\"¿Hay cupo mañana?\" todo el día", solucion: "Horas libres reales", detalle: "Ofrece las horas que de verdad están libres en tu agenda y deja la reserva tomada." },
      { dolor: "Alumnas nuevas que preguntan y se pierden", solucion: "Agenda en el mismo chat", detalle: "La que pregunta por una clase de prueba queda agendada en la conversación." },
      { dolor: "Consultas de salud o lesiones", solucion: "Te pasa la conversación", detalle: "Si una alumna cuenta una lesión, avisa a tu equipo y deja el chat en sus manos." },
    ],
    ejemplos: [
      { titulo: "Clase de prueba", mensajes: [
        { de: "cliente", texto: "Hola, ¿tienen clase de prueba?" },
        { de: "syna", texto: "¡Hola! Sí, la clase de prueba está en $10.000. Tengo el martes a las 19:00 o el jueves a las 8:00. ¿Cuál te acomoda?" },
        { de: "cliente", texto: "Martes" },
        { de: "syna", texto: "Listo, martes a las 19:00. ¿Me das tu nombre completo?" },
      ] },
      { titulo: "Hora para mañana", mensajes: [
        { de: "cliente", texto: "¿Queda algo mañana temprano?" },
        { de: "syna", texto: "¡Hola! Mañana queda libre a las 7:00 y a las 9:00. ¿Te reservo alguna?" },
        { de: "cliente", texto: "7" },
        { de: "syna", texto: "Hecho, mañana a las 7:00. ¡Nos vemos!" },
      ] },
      { titulo: "Alumna con una lesión", mensajes: [
        { de: "cliente", texto: "Tengo una hernia lumbar, ¿puedo hacer reformer?" },
        { de: "syna", texto: "Eso lo tiene que ver una instructora. Ya le avisé al equipo para que te responda por aquí." },
      ] },
    ],
    faq: [
      { q: "¿Sirve para un estudio con varias instructoras?", a: "Sí. Cada profesional tiene su agenda y Syna ofrece las horas libres reales de cada una." },
      { q: "¿Cuánto cuesta el asistente para mi estudio?", a: `Viene en el plan Pro, ${PRO_IA.precio} por local, con ${PRO_IA.conversaciones} conversaciones al mes. Los primeros 30 días son gratis.` },
      { q: "¿Puedo tener varias sedes?", a: "Sí, la plataforma maneja varias sedes con sus precios y horarios. Cada sede adicional se cotiza por WhatsApp." },
      ...faqComun("tu estudio"),
    ],
    entra: (l) => l.rubro === "pilates",
  },
  {
    slug: "peluqueria-canina",
    rubro: "mascotas",
    nombre: "Peluquería canina",
    plural: "peluquería canina",
    tuLocal: "tu peluquería canina",
    cliente: "dueños de mascotas",
    pagina: { href: "/mascotas", texto: "Agenda para peluquería canina" },
    bajada: "Syna responde el WhatsApp de tu peluquería canina: pregunta por la mascota, da precios de tu catálogo y deja la hora agendada.",
    dolores: [
      { dolor: "\"¿Cuánto sale el baño para un perro grande?\"", solucion: "Precios de tu catálogo", detalle: "Responde con los servicios y precios que cargaste, también por tamaño si así los tienes." },
      { dolor: "Pedir los datos de la mascota por partes", solucion: "Pide los datos que definas", detalle: "Nombre de la mascota, raza, tamaño o lo que necesites, antes de confirmar." },
      { dolor: "Responder con el perro en la mesa", solucion: "Contesta por ti", detalle: "Tú sigues bañando; Syna contesta el WhatsApp." },
      { dolor: "Casos que requieren tu criterio", solucion: "Te pasa la conversación", detalle: "Si es una mascota nerviosa o con una condición, avisa a tu equipo." },
    ],
    ejemplos: [
      { titulo: "Baño y corte", mensajes: [
        { de: "cliente", texto: "Hola, ¿cuánto sale baño y corte para un poodle?" },
        { de: "syna", texto: "¡Hola! Para tamaño pequeño, baño + corte está en $18.000. Tengo el sábado a las 10:00 o a las 13:00. ¿Cuál te acomoda?" },
        { de: "cliente", texto: "10" },
        { de: "syna", texto: "Listo. ¿Cómo se llama tu mascota y a nombre de quién dejo la hora?" },
      ] },
      { titulo: "Perro grande", mensajes: [
        { de: "cliente", texto: "¿Bañan perros grandes? Tengo un golden" },
        { de: "syna", texto: "¡Hola! Sí, el baño para tamaño grande está en $25.000. El jueves tengo libre a las 11:00. ¿Te lo reservo?" },
      ] },
      { titulo: "Mascota con una condición", mensajes: [
        { de: "cliente", texto: "Mi perrita tiene dermatitis, ¿la pueden bañar?" },
        { de: "syna", texto: "Prefiero que te responda alguien del equipo. Ya les avisé para que te escriban por aquí." },
      ] },
    ],
    faq: [
      { q: "¿Puede preguntar por la mascota antes de agendar?", a: "Sí. Syna pide los datos que tú definas, como el nombre, la raza o el tamaño de la mascota." },
      { q: "¿Cuánto cuesta el asistente para mi peluquería canina?", a: `Viene en el plan Pro, ${PRO_IA.precio} por local, con ${PRO_IA.conversaciones} conversaciones al mes. Los primeros 30 días son gratis.` },
      { q: "¿Sirve si atiendo a domicilio?", a: "La reserva puede pedir la dirección del cliente para ir a domicilio. Syna agenda en tus horas libres reales." },
      ...faqComun("tu peluquería canina"),
    ],
    entra: (l) => /mascota|canin|pet/i.test(l.tipo ?? ""),
  },
  {
    slug: "spa-masajes",
    rubro: "spa",
    nombre: "Spa y masajes",
    plural: "spa y masajes",
    tuLocal: "tu spa",
    cliente: "clientes",
    pagina: { href: "/estetica", texto: "Software para estética y spa" },
    bajada: "Syna responde el WhatsApp de tu spa: da precios de tus masajes y tratamientos, ofrece las horas libres y deja la sesión agendada.",
    dolores: [
      { dolor: "Contestar el teléfono en plena sesión", solucion: "Responde por ti", detalle: "Syna contesta precios y horarios con tu catálogo, sin interrumpir el masaje." },
      { dolor: "Clientes que quieren hora para hoy", solucion: "Horas libres reales", detalle: "Ofrece las horas que de verdad quedan libres de cada terapeuta." },
      { dolor: "Reservas para dos personas", solucion: "Te pasa la conversación", detalle: "Si piden algo especial, avisa a tu equipo y deja el chat en sus manos." },
      { dolor: "Mensajes de fin de semana", solucion: "Atiende fuera de horario", detalle: "El que escribe el domingo queda con su hora tomada." },
    ],
    ejemplos: [
      { titulo: "Masaje para hoy", mensajes: [
        { de: "cliente", texto: "Hola, ¿tienen hora hoy para masaje descontracturante?" },
        { de: "syna", texto: "¡Hola! El masaje descontracturante de 60 minutos está en $30.000. Hoy tengo a las 18:00 con Paula. ¿Te la reservo?" },
        { de: "cliente", texto: "Sí" },
        { de: "syna", texto: "Listo. ¿Me das tu nombre completo?" },
      ] },
      { titulo: "Consulta de fin de semana", mensajes: [
        { de: "cliente", texto: "¿El lunes hay hora para piedras calientes?" },
        { de: "syna", texto: "¡Hola! El lunes tengo a las 11:00 y a las 16:30. ¿Cuál prefieres?" },
      ] },
      { titulo: "Pedido especial", mensajes: [
        { de: "cliente", texto: "Quiero regalar un masaje en pareja para un aniversario" },
        { de: "syna", texto: "¡Qué buena idea! Le aviso al equipo para que te ayude a armarlo por aquí." },
      ] },
    ],
    faq: [
      { q: "¿Sirve para un spa con varios terapeutas?", a: "Sí. Cada terapeuta tiene su agenda y Syna ofrece las horas libres reales de cada uno." },
      { q: "¿Cuánto cuesta el asistente para mi spa?", a: `Viene en el plan Pro, ${PRO_IA.precio} por local, con ${PRO_IA.conversaciones} conversaciones al mes. Los primeros 30 días son gratis.` },
      { q: "¿Responde según la duración de cada masaje?", a: "Sí. Responde con los servicios, duraciones y precios de tu catálogo, y ofrece las horas libres que calzan." },
      ...faqComun("tu spa"),
    ],
    entra: (l) => l.tipo === "spa" || l.schemaType === "DaySpa",
  },
];

export type CiudadIA = {
  slug: string;
  nombre: string;
  /** "Región Metropolitana": para textos. */
  region: string;
  /** Trozo del slug de la región en el directorio ("metropolitana", "valparaiso", "higgins"). */
  regionClave: string;
  /** Comunas del directorio que cuentan como esta ciudad. */
  comunas: string[];
};

export const CIUDADES: CiudadIA[] = [
  { slug: "santiago", nombre: "Santiago", region: "Región Metropolitana", regionClave: "metropolitana", comunas: ["Santiago"] },
  { slug: "providencia", nombre: "Providencia", region: "Región Metropolitana", regionClave: "metropolitana", comunas: ["Providencia"] },
  { slug: "las-condes", nombre: "Las Condes", region: "Región Metropolitana", regionClave: "metropolitana", comunas: ["Las Condes"] },
  { slug: "nunoa", nombre: "Ñuñoa", region: "Región Metropolitana", regionClave: "metropolitana", comunas: ["Ñuñoa"] },
  { slug: "maipu", nombre: "Maipú", region: "Región Metropolitana", regionClave: "metropolitana", comunas: ["Maipú"] },
  { slug: "la-florida", nombre: "La Florida", region: "Región Metropolitana", regionClave: "metropolitana", comunas: ["La Florida"] },
  { slug: "puente-alto", nombre: "Puente Alto", region: "Región Metropolitana", regionClave: "metropolitana", comunas: ["Puente Alto"] },
  { slug: "vina-del-mar", nombre: "Viña del Mar", region: "Región de Valparaíso", regionClave: "valparaiso", comunas: ["Viña del Mar"] },
  { slug: "valparaiso", nombre: "Valparaíso", region: "Región de Valparaíso", regionClave: "valparaiso", comunas: ["Valparaíso"] },
  { slug: "concepcion", nombre: "Concepción", region: "Región del Biobío", regionClave: "biobio", comunas: ["Concepción"] },
  { slug: "la-serena", nombre: "La Serena", region: "Región de Coquimbo", regionClave: "coquimbo", comunas: ["La Serena"] },
  { slug: "temuco", nombre: "Temuco", region: "Región de La Araucanía", regionClave: "araucania", comunas: ["Temuco"] },
  { slug: "rancagua", nombre: "Rancagua", region: "Región de O'Higgins", regionClave: "higgins", comunas: ["Rancagua"] },
  { slug: "antofagasta", nombre: "Antofagasta", region: "Región de Antofagasta", regionClave: "antofagasta", comunas: ["Antofagasta"] },
  { slug: "puerto-montt", nombre: "Puerto Montt", region: "Región de Los Lagos", regionClave: "los-lagos", comunas: ["Puerto Montt"] },
];

export const rubroIA = (slug: string) => RUBROS_IA.find((r) => r.slug === slug);
export const ciudadIA = (slug: string) => CIUDADES.find((c) => c.slug === slug);

/** Preguntas que dependen de la ciudad y son ciertas en todas. */
export const faqCiudad = (r: RubroIA, c: CiudadIA): Pregunta[] => [
  { q: `¿Funciona para ${r.plural} en ${c.nombre}?`, a: `Sí. Es 100% online: creas tu agenda desde el teléfono o el computador y funciona en todo Chile, también en ${c.nombre}.` },
  { q: `¿Alguien tiene que ir a mi local en ${c.nombre} para instalarlo?`, a: "No. Creas tu agenda en minutos y vinculas tu WhatsApp escaneando un QR. Si necesitas ayuda, nos escribes por WhatsApp." },
];

/** Description ≤ 155 caracteres para Google. */
export function descripcionCiudad(r: RubroIA, c: CiudadIA) {
  const larga = `Syna responde el WhatsApp de ${r.tuLocal} en ${c.nombre} y agenda con tus horas libres reales. 30 días gratis del plan Pro con asistente IA.`;
  return larga.length <= 155 ? larga : `Syna responde el WhatsApp de ${r.tuLocal} en ${c.nombre} y agenda con tus horas reales. 30 días gratis del plan Pro.`;
}

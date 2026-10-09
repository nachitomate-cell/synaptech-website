/* Comparaciones "tipo foro" (/comparar). Cada hilo es una pregunta REAL de las
   que hacen los dueños antes de cambiarse, respondida por el Equipo SynapTech.
   Reglas (decididas con Ignacio el 09-10-2026):
   - Nada de usuarios inventados: una conversación fabricada sería una reseña
     falsa. Las voces de terceros son testimonios textuales de clientes reales.
   - Todo dato de otra empresa lleva fuente (URL) y fecha de consulta, y sale de
     devtools/guias-panel/sitio-web/comparar/competencia-*.json (verificado ese
     día, con captura). Si un precio cambia, se vuelve a medir antes de tocarlo. */

export type Fuente = { texto: string; url?: string; fecha?: string };
export type Hilo = {
  id: string;
  pregunta: string;
  quien: string;
  etiquetas: string[];
  fecha: string;
  parrafos: string[];
  tabla?: { columnas: string[]; filas: (string | boolean | null)[][]; destacar?: number; destacarFila?: number; nota?: string };
  cierre?: string;
  enlace?: { texto: string; href: string };
  fuentes: Fuente[];
  testimonio?: { cita: string; autor: string; rol: string };
};

const HOY = "9 de octubre de 2026";

export const HILOS_BASE: Hilo[] = [
  {
    id: "otros-sistemas",
    pregunta: "¿Para qué pagar una plataforma si ya me las arreglo con WhatsApp Business, un cuaderno y una tarjeta de sellos de papel?",
    quien: "Pregunta frecuente de dueños de barbería y salón",
    etiquetas: ["Otros sistemas", "Primer paso"],
    fecha: HOY,
    parrafos: [
      "Se puede, y muchos locales parten así. El problema no es que no funcione: es que cada cosa vive en un lugar distinto y todo depende de que alguien conteste, anote y sume a mano.",
      "Así se ve la misma semana de trabajo con las dos formas:",
    ],
    tabla: {
      columnas: ["Tarea", "WhatsApp + cuaderno + Excel + tarjeta de papel", "SynapTech"],
      destacar: 2,
      filas: [
        ["Agendar", "Alguien responde cada mensaje y anota la hora", "El cliente reserva solo, 24/7, y Syna agenda por WhatsApp"],
        ["Recordar la cita", "Mensaje uno por uno, si alguien se acuerda", "Confirmación y recordatorio automáticos"],
        ["Cuadrar la caja", "Sumar al cierre, a mano", "Cada cobro queda con su medio de pago; el cierre se calcula"],
        ["Pagar al equipo", "Planilla con las citas de cada uno", "Liquidación por profesional, con propinas y adelantos"],
        ["Hacer volver al cliente", "Tarjeta de papel que se pierde", "Sellos en el teléfono (Google Wallet y Apple Wallet)"],
        ["Saber cómo va el mes", "Revisar el cuaderno", "Métricas del período y Excel para el contador"],
      ],
    },
    cierre: "Si hoy te alcanza con eso, no hay apuro. Cuando empiecen a perderse horas o a no cuadrar la caja, la mudanza es gratis.",
    enlace: { texto: "Ver cómo funciona cada módulo", href: "/como-funciona" },
    fuentes: [],
  },
  {
    id: "mudanza",
    pregunta: "Si me cambio de agenda, ¿pierdo mis clientes y mi historial?",
    quien: "Pregunta frecuente de locales que vienen de AgendaPro, Weibook o una planilla",
    etiquetas: ["Mudanza", "Clientes"],
    fecha: HOY,
    parrafos: [
      "No. Te mudamos sin costo: traemos tus clientes con su historial, tus servicios con precios y duraciones, tus productos y tu equipo con sus horarios. El local sigue atendiendo mientras tanto.",
      "Al 4 de octubre de 2026 llevábamos 28.978 fichas de clientes importadas desde otras agendas, planillas y contactos.",
      "Y si algún día te quieres ir, no hay permanencia ni multa: te entregamos tus datos exportados.",
    ],
    enlace: { texto: "Ver la mudanza en video", href: "/como-funciona#capsulas" },
    fuentes: [{ texto: "Conteo interno de fichas importadas a la plataforma", fecha: "4 de octubre de 2026" }],
  },
  {
    id: "que-ia",
    pregunta: "¿Qué inteligencia artificial usa el asistente? Ya me quemé con un bot barato que no entendía nada.",
    quien: "Pregunta frecuente antes de encender el asistente",
    etiquetas: ["Asistente IA", "WhatsApp"],
    fecha: HOY,
    parrafos: [
      "Syna funciona con Claude, de Anthropic (desde el 7 de octubre de 2026, con su modelo Haiku 5.5).",
      "Pero el modelo es solo una parte: Syna no inventa precios ni horarios porque responde con tu catálogo y lee la agenda real de cada profesional. Pide los datos que tú definas (nombre completo, RUT) antes de agendar, y deja la hora agendada dentro del chat.",
      "Cuando una conversación se complica, o es de un tema que elegiste no delegar, la pasa a una persona de tu equipo y te avisa. Y puedes tomar el control de cualquier chat cuando quieras.",
    ],
    enlace: { texto: "Ver al asistente paso a paso", href: "/como-funciona#asistente" },
    fuentes: [{ texto: "Anthropic: modelos Claude", url: "https://www.anthropic.com/claude", fecha: HOY }],
  },
  {
    id: "numero-propio",
    pregunta: "El asistente con IA y los avisos, ¿le escriben a mis clientes desde mi número o desde uno de la plataforma?",
    quien: "Pregunta frecuente de locales que vienen de otra agenda",
    etiquetas: ["WhatsApp", "Asistente IA", "AgendaPro"],
    fecha: HOY,
    parrafos: [
      "Hoy varias agendas dicen que su asistente escribe desde el número del local, así que la pregunta útil es otra: ¿puedes seguir usando ese WhatsApp en tu teléfono?",
      "En SynapTech sí. Vinculas el WhatsApp de tu local con un código QR, como WhatsApp Web, y sigues usándolo en tu celular como siempre. Syna responde y agenda desde ese número, y cuando quieres, tomas tú la conversación.",
      "Esto es lo que publica cada una:",
    ],
    tabla: {
      columnas: ["", "De qué número salen los mensajes", "Asistente con IA que agenda", "Precio del asistente"],
      destacarFila: 4,
      filas: [
        ["AgendaPro", "Las confirmaciones, de un número de AgendaPro (lo vimos en una reserva de prueba). Sofía, su IA, dice escribir desde el número del local", "Sí (Sofía)", "No publicado"],
        ["WeiBook", "Del número del local, con un complemento de US$15 al mes", "Sí (Wanda)", "US$50 al mes"],
        ["Agendapia", "Parte con un número de Agendapia. Puedes conectar el tuyo, pero deja de funcionar en la app de WhatsApp del celular", "Sí (Pía), por créditos", "Incluida, con 400 créditos al mes"],
        ["Reservo", "Del número del centro, de 100 a 750 mensajes según el plan", "No publicado", "—"],
        ["SynapTech", "Del número de tu local, que sigue funcionando en tu teléfono", "Sí (Syna)", "Incluida en el plan Pro ($49.900 + IVA), o $19.900 + IVA sobre el Básico"],
      ],
    },
    cierre: "Si prefieres no vincular tu número, los avisos de cita también pueden salir por la vía oficial de WhatsApp, desde el número de SynapTech.",
    enlace: { texto: "Ver al asistente en el WhatsApp del local", href: "/como-funciona#asistente" },
    fuentes: [
      { texto: "AgendaPro: reserva de prueba en una cuenta propia (la confirmación llegó desde +56 9 4499 7909)", fecha: "14 de agosto de 2026" },
      { texto: "AgendaPro: página de Sofía", url: "https://agendapro.com/cl/sofia-ia-recordatorios", fecha: HOY },
      { texto: "WeiBook: planes y Wanda", url: "https://weibook.co/es/plans", fecha: HOY },
      { texto: "Agendapia: conectar tu WhatsApp propio", url: "https://agendapia.com/tutoriales/marketing-y-comunicacion/conectar-tu-whatsapp-propio", fecha: HOY },
      { texto: "Reservo: planes para centros de salud", url: "https://reservo.cl/landing/cl/salud-agenda/", fecha: HOY },
    ],
  },
  {
    id: "por-profesional",
    pregunta: "Tengo 6 profesionales y quizás sume más. ¿Cuánto me cuesta cada agenda?",
    quien: "Pregunta frecuente de barberías y salones que están creciendo",
    etiquetas: ["Precios", "AgendaPro", "Fresha"],
    fecha: HOY,
    parrafos: [
      "Casi todas cobran por profesional: cada persona que sumas al equipo sube la mensualidad. SynapTech cobra por local, con profesionales ilimitados.",
      "Con uno o dos profesionales hay opciones más baratas que nosotros. La diferencia aparece cuando el equipo crece:",
    ],
    tabla: {
      columnas: ["Precio mensual", "1 prof.", "3 prof.", "6 prof.", "9 prof."],
      destacarFila: 7,
      nota: "Plan más barato que admite esa cantidad de profesionales, leído en el selector de cada página. Te Reservo cobra $3.990 + IVA por sucursal y suma $4.990 + IVA por cada trabajador con avisos por WhatsApp. Reservo publica precios «desde» por capacidad de atención y pide cotizar. AgendaYA no dice si sus precios incluyen IVA.",
      filas: [
        ["AgendaPro", "$15.900 + IVA", "$39.900 + IVA", "$54.900 + IVA", "$69.900 + IVA"],
        ["re-booking", "$12.990 + IVA", "$31.990 + IVA", "$49.990 + IVA", "$67.990 + IVA"],
        ["Agendapia", "$29.900 + IVA", "$29.900 + IVA", "$44.900 + IVA", "$59.900 + IVA"],
        ["AgendaYA", "$9.990", "$19.970", "$34.940", "$49.910"],
        ["Fresha", "$5.900 + imp.", "$11.700 + imp.", "$23.400 + imp.", "$35.100 + imp."],
        ["Reservo", "desde $30.000 + IVA", "desde $50.000 + IVA", "desde $80.000 + IVA", "desde $110.000 + IVA"],
        ["Te Reservo, con WhatsApp", "$8.980 + IVA", "$18.960 + IVA", "$33.930 + IVA", "$48.900 + IVA"],
        ["SynapTech Básico", "$29.900 + IVA", "$29.900 + IVA", "$29.900 + IVA", "$29.900 + IVA"],
        ["SynapTech Pro, con asistente IA", "$49.900 + IVA", "$49.900 + IVA", "$49.900 + IVA", "$49.900 + IVA"],
      ],
    },
    cierre: "Con 9 profesionales, el plan Básico de AgendaPro cuesta $69.900 + IVA al mes y el de SynapTech $29.900 + IVA: $40.000 menos al mes, $480.000 al año.",
    enlace: { texto: "Ver todos los planes", href: "/precios" },
    fuentes: [
      { texto: "AgendaPro: planes", url: "https://agendapro.com/cl/planes", fecha: HOY },
      { texto: "re-booking: precios", url: "https://www.re-booking.cl/landing#precios", fecha: HOY },
      { texto: "Agendapia: precios", url: "https://agendapia.com/#precios", fecha: HOY },
      { texto: "AgendaYA: configura tu plan", url: "https://agendaya.app/oferta-especial", fecha: HOY },
      { texto: "Fresha: precios", url: "https://www.fresha.com/es/pricing", fecha: HOY },
      { texto: "Reservo: planes para centros de salud", url: "https://reservo.cl/landing/cl/salud-agenda/", fecha: HOY },
      { texto: "Te Reservo: precios y calculadora", url: "https://tereservo.cl/", fecha: HOY },
    ],
  },
  {
    id: "gratis-o-barato",
    pregunta: "Fresha y Booksy parecen gratis o muy baratos. ¿Dónde está la trampa?",
    quien: "Pregunta frecuente de dueños que comparan por precio",
    etiquetas: ["Precios", "Fresha", "Booksy", "Marketplace"],
    fecha: HOY,
    parrafos: [
      "No es una trampa, es otro modelo de cobro. Además de la mensualidad, cobran por cada persona del equipo, por mensaje enviado o por cada cliente nuevo que te llega desde su marketplace.",
      "En un marketplace tu local aparece junto a los de la competencia, y la plataforma cobra cuando un cliente nuevo te reserva desde ahí:",
    ],
    tabla: {
      columnas: ["", "Cobro por profesional", "Cobro por cliente nuevo de su marketplace", "Club de fidelidad"],
      destacarFila: 3,
      filas: [
        ["Fresha", "Sí, $5.900 + impuesto por miembro", "Sí, una tarifa por cliente nuevo (el monto no está en su página de precios)", "Adicional: $19.050 al mes por centro"],
        ["Booksy", "Sí (en España, 34,99 € + IVA y más por empleado; no publica precios para Chile)", "Con Boost, 30 % de la primera visita (tope de 50 € en España)", "Tarjeta de puntos (en España)"],
        ["AgendaPro", "Sí, $5.000 + IVA por cada profesional extra", "Sí, una comisión sobre la primera reserva (porcentaje no publicado)", "Tarjeta de sellos"],
        ["SynapTech", "No, profesionales ilimitados", "No cobramos comisión por reserva", "Incluido en todos los planes, con Google Wallet y Apple Wallet"],
      ],
    },
    cierre: "Los clientes que te llegan por tu página de reservas, tu Instagram o tu WhatsApp son tuyos, y en SynapTech no pagas nada extra por ellos.",
    enlace: { texto: "Ver el directorio de locales, sin comisiones", href: "/locales" },
    fuentes: [
      { texto: "Fresha: precios", url: "https://www.fresha.com/es/pricing", fecha: HOY },
      { texto: "Booksy: precios (España)", url: "https://biz.booksy.com/es-es/precios", fecha: HOY },
      { texto: "AgendaPro: Marketplace", url: "https://agendapro.com/cl/marketplace", fecha: HOY },
      { texto: "AgendaPro: planes", url: "https://agendapro.com/cl/planes", fecha: HOY },
    ],
  },
  {
    id: "boletas-sii",
    pregunta: "Mis barberos trabajan a honorarios. ¿Qué agenda emite las boletas ante el SII?",
    quien: "Pregunta frecuente de locales con arriendo de sillón o profesionales a honorarios",
    etiquetas: ["SII", "Boletas", "AgendaPro"],
    fecha: HOY,
    parrafos: [
      "Pocas, y de formas distintas. Algunas lo cobran por cada RUT, otras te piden contratar tu propio sistema de facturación y conectarlo.",
      "En SynapTech, la boleta de honorarios de cada profesional sale sola cuando se cierra la cita, emitida directo ante el SII con folio real. Desde el 5 de septiembre de 2026 se emiten todos los días en los locales que la usan.",
    ],
    tabla: {
      columnas: ["", "Qué emite", "Cómo", "Precio publicado"],
      destacarFila: 4,
      filas: [
        ["AgendaPro", "Boleta de honorarios y factura electrónica", "Adicional, por cada RUT", "Desde 1 UF + IVA al mes por RUT (boleta de honorarios)"],
        ["Reservo", "Boleta de honorarios y boleta electrónica", "Según el plan", "Incluida en algunos planes, desde $30.000 + IVA"],
        ["Agendapia", "Boleta afecta, exenta o de honorarios", "Contratando aparte tu cuenta en Lioren o SimpleFactura", "$9.900 + IVA por RUT extra, más el costo de esa cuenta"],
        ["AgendaYA, re-booking, Te Reservo, Fresha", null, null, null],
        ["SynapTech", "Boleta de honorarios de cada profesional", "Sale sola al cerrar la cita, directo ante el SII", "$29.900 + IVA al mes por local, más $39.000 de instalación"],
      ],
    },
    enlace: { texto: "Ver el módulo de boletas en video", href: "/como-funciona#caja" },
    fuentes: [
      { texto: "AgendaPro: boleta de honorarios", url: "https://agendapro.com/cl/boleta-honorarios", fecha: HOY },
      { texto: "Reservo: planes para centros de salud", url: "https://reservo.cl/landing/cl/salud-agenda/", fecha: HOY },
      { texto: "Agendapia: boletas automáticas", url: "https://agendapia.com/tutoriales/membresias-y-facturacion/boletas-automaticas", fecha: HOY },
      { texto: "AgendaYA, re-booking, Te Reservo y Fresha: sus páginas de precios no mencionan emisión ante el SII", fecha: HOY },
    ],
  },
];

export const HILOS: Hilo[] = [...HILOS_BASE];

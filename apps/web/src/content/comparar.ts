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
  tabla?: { columnas: string[]; filas: (string | boolean | null)[][]; destacar?: number };
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
    pregunta: "Cuando la plataforma le escribe a mis clientes, ¿el mensaje sale de mi número o de uno de ellos?",
    quien: "Pregunta frecuente de locales que vienen de AgendaPro",
    etiquetas: ["WhatsApp", "AgendaPro"],
    fecha: HOY,
    parrafos: [
      "Depende de la plataforma, y es una diferencia que el cliente nota.",
      "En SynapTech, el asistente responde y agenda desde el WhatsApp de tu local: lo vinculas con un código QR, como WhatsApp Web, y sigues usando tu teléfono como siempre. Tu cliente le habla a tu local y, si responde, te responde a ti.",
      "En AgendaPro lo comprobamos haciendo una reserva real en una cuenta de prueba: la confirmación llegó desde un número de AgendaPro, con su logo, y el teléfono del local venía escrito dentro del texto. Si el cliente responde ese mensaje, le responde a AgendaPro.",
    ],
    tabla: {
      columnas: ["", "AgendaPro", "SynapTech"],
      destacar: 2,
      filas: [
        ["De qué número sale", "Un número de AgendaPro", "El número de tu local (vinculado por QR)"],
        ["Si el cliente responde", "Le llega a AgendaPro", "Te llega a ti, o lo contesta Syna"],
        ["Recordatorios de cita", "Bolsas de 50 por $5.000 + IVA", "Bolsas de avisos desde $3.990 + IVA"],
      ],
    },
    cierre: "Si prefieres no vincular tu número, los avisos también pueden salir por la vía oficial de WhatsApp, desde el número de SynapTech.",
    enlace: { texto: "Ver al asistente en el WhatsApp del local", href: "/como-funciona#asistente" },
    fuentes: [
      { texto: "Reserva de prueba en una cuenta de AgendaPro (captura del mensaje recibido)", fecha: "14 de agosto de 2026" },
      { texto: "Panel de suscripción de AgendaPro: recordatorios por WhatsApp", fecha: "14 de agosto de 2026" },
    ],
  },
];

export const HILOS: Hilo[] = [...HILOS_BASE];

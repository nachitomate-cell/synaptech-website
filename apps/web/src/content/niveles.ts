/* SynapTech en 8-bit, nivel por nivel (14-10-2026).
   Video con Syna en pixel art y el panel REAL grabado en un monitor y un celular,
   sobre el local de práctica con datos de ejemplo. Cada nivel tiene su versión
   vertical en public/capsulas/syna-8bit-nivel-<n>.mp4 (+ .jpg de portada).
   Lo que dice cada nivel es lo mismo que dice Syna en el video: si cambia el
   video, cambia esto. */

export type Nivel = {
  n: number;
  titulo: string;
  bajada: string;
  /** qué se ve en pantalla en el video */
  enVideo: string;
  /** ancla del módulo en /como-funciona (sin ancla si el recorrido no tiene ese módulo) */
  modulo?: string;
  duracion: string;
};

export const VIDEO_8BIT = {
  id: "syna-8bit",
  titulo: "SynapTech en 8-bit, nivel por nivel",
  bajada: "Syna recorre los 9 niveles con el panel real, en el computador y en el celular.",
  duracion: "2:25",
  segundos: 145,
};

export const NIVELES: Nivel[] = [
  { n: 1, titulo: "Reservas 24/7", modulo: "reserva", duracion: "0:22",
    bajada: "Tus clientes reservan solos desde el celular, a cualquier hora: eligen el servicio, el profesional y la hora, y la cita entra en ese mismo segundo a la agenda del local.",
    enVideo: "Una reserva hecha en el celular que aparece en vivo en la agenda del computador, con el aviso de nueva cita." },
  { n: 2, titulo: "Agenda del equipo", modulo: "agenda", duracion: "0:19",
    bajada: "El día completo de cada profesional en una sola pantalla, por día o por semana. Creas, mueves o cierras citas en segundos, desde el computador o el celular.",
    enVideo: "La agenda del día con tres profesionales, el detalle de una cita y la vista de la semana." },
  { n: 3, titulo: "Asistente IA en WhatsApp", modulo: "asistente", duracion: "0:24",
    bajada: "Syna responde al instante, revisa tu agenda y deja la cita lista con su profesional y precio, de día o de noche. Si alguien necesita hablar con una persona, te avisa para que tomes el control.",
    enVideo: "La bandeja de conversaciones: una cita agendada por el asistente y un chat que pide atención del equipo." },
  { n: 4, titulo: "Club y Wallet", modulo: "club", duracion: "0:22",
    bajada: "Cada visita suma sellos en la tarjeta del club y tus clientes los canjean por los premios que tú eliges. La tarjeta también puede ir en el Wallet del celular y se actualiza sola.",
    enVideo: "La tarjeta de sellos del cliente, el botón para guardarla en Google Wallet y la tabla de premios." },
  { n: 5, titulo: "Caja", modulo: "caja", duracion: "0:19",
    bajada: "Efectivo, tarjeta y transferencias, cada uno por separado, con el saldo exacto que debería haber en tu caja y cada transacción del día.",
    enVideo: "La caja abierta del día con el saldo esperado, los medios de pago y el flujo de efectivo." },
  { n: 6, titulo: "Comisiones", modulo: "comisiones", duracion: "0:19",
    bajada: "Calcula lo que le toca a cada profesional, con propinas y adelantos, y pagas el período con un clic. Sin planillas.",
    enVideo: "El período abierto con lo que falta por pagar al equipo y el botón para pagar a todos." },
  { n: 7, titulo: "Métricas", modulo: "metricas", duracion: "0:18",
    bajada: "Ventas, gastos y utilidad en tiempo real, para decidir con datos y no a ojo.",
    enVideo: "Ingresos del período, utilidad neta, ticket promedio y los gastos del mes por categoría." },
  { n: 8, titulo: "Marketing", duracion: "0:18",
    bajada: "Campañas por WhatsApp a tus clientes con un botón directo a tu agenda, y una automatización que invita a volver a quienes hace tiempo no vienen.",
    enVideo: "Una campaña escribiéndose con su vista previa y la automatización para recuperar clientes dormidos." },
  { n: 9, titulo: "App del equipo", modulo: "agenda", duracion: "0:19",
    bajada: "Cada profesional ve su agenda, cierra sus citas y sabe cuánto lleva ganado, desde su propio celular.",
    enVideo: "La agenda del profesional en el celular, lo que lleva ganado en el mes y su historial de comisiones." },
];

/* Series verticales con el mismo motor (15-10-2026), publicadas en @synaptechspa
   o en Misiones del panel. Cada una en public/capsulas/<id>.mp4 (+ .jpg). La
   bajada resume lo que dice Syna en el video. */
export type Episodio = { id: string; titulo: string; bajada: string; duracion: string };

export const JEFES: Episodio[] = [
  { id: "syna-jefe-1", titulo: "El Plantón", duracion: "0:31",
    bajada: "El cliente que reserva y no llega. Syna le recuerda la cita por WhatsApp y le pide confirmar." },
  { id: "syna-jefe-2", titulo: "El WhatsApp de las 3 AM", duracion: "0:33",
    bajada: "Mensajes que llegan mientras cortas o duermes. El asistente responde y deja la cita lista." },
  { id: "syna-jefe-3", titulo: "La Planilla Infinita", duracion: "0:31",
    bajada: "Horas sumando cortes, propinas y adelantos. Las comisiones se calculan solas y se pagan con un clic." },
  { id: "syna-jefe-4", titulo: "La Caja Descuadrada", duracion: "0:31",
    bajada: "Cerrar sin saber cuánto debería haber. Cada medio de pago por separado y el saldo exacto del cajón." },
  { id: "syna-jefe-5", titulo: "El Cliente Fantasma", duracion: "0:28",
    bajada: "Vino una vez y no volvió. Su tarjeta de sellos en el celular y campañas que lo invitan a volver." },
];

export const MISIONES: Episodio[] = [
  { id: "syna-mision-1", titulo: "La caja del día", duracion: "0:18",
    bajada: "Abres con el efectivo del cajón, las ventas se suman solas y al cerrar ves si cuadra." },
  { id: "syna-mision-2", titulo: "Comisiones", duracion: "0:17",
    bajada: "Eliges el período, ves lo que produjo cada profesional y registras el pago con su recibo." },
  { id: "syna-mision-3", titulo: "Tu club", duracion: "0:18",
    bajada: "Defines el premio y cuántos sellos cuesta. Los sellos se suman solos al completar cada cita." },
  { id: "syna-mision-4", titulo: "Reseñas", duracion: "0:18",
    bajada: "Al completar una cita, el cliente recibe un correo para dejarte su reseña en Google." },
  { id: "syna-mision-5", titulo: "Gastos", duracion: "0:19",
    bajada: "Monto, categoría y fecha. Los fijos, como el arriendo, se repiten solos cada mes." },
  { id: "syna-mision-6", titulo: "Productos", duracion: "0:18",
    bajada: "Tus clientes suman el producto a su reserva y el stock se descuenta solo al entregarlo." },
  { id: "syna-mision-7", titulo: "Gift cards", duracion: "0:18",
    bajada: "Se comparte con su código o su QR, y al usarla se descuenta del saldo." },
  { id: "syna-mision-8", titulo: "Que vuelvan", duracion: "0:18",
    bajada: "Saludos de cumpleaños con regalo y campañas para los que hace tiempo no vienen." },
];

export const EXTRAS_8BIT: Episodio[] = [
  { id: "syna-powerup-1", titulo: "Power-up: agenda compacta", duracion: "0:24",
    bajada: "Todo tu equipo en la pantalla del celular, sin deslizar de lado a lado." },
  { id: "syna-leccion-2", titulo: "Lección: la caja diaria", duracion: "0:52",
    bajada: "Cuánto debería haber en el cajón al cerrar, y qué se revisa aparte contra el banco." },
];

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

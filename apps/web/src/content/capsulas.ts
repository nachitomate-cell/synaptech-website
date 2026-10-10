/* Cápsulas en video (06_Videos, comprimidas a 720×1280 en public/capsulas/).
   Todas se grabaron en el local de práctica con datos inventados; se revisaron
   cuadro por cuadro el 09-10-2026 antes de publicarlas. */

export type Capsula = {
  id: string;
  titulo: string;
  bajada: string;
  duracion: string;
  modulo: "agenda" | "reserva" | "asistente" | "caja" | "comisiones" | "club" | "metricas" | "plata" | "general";
  /** Por defecto vertical (9:16). Las lecciones del curso son horizontales. */
  formato?: "vertical" | "horizontal";
};

export const CAPSULAS: Capsula[] = [
  { id: "presentacion-synaptech-2",        titulo: "Así funciona SynapTech",      bajada: "Reserva, agenda, club, equipo, comisiones y caja en un minuto y medio.", duracion: "1:27", modulo: "general" },
  { id: "reel-asistente-whatsapp",         titulo: "Tu WhatsApp en piloto automático", bajada: "Syna responde y agenda la hora dentro del chat.", duracion: "0:35", modulo: "asistente" },
  { id: "tutorial-agenda-barbero",         titulo: "La agenda del profesional",   bajada: "Su día, agendar, marcar que llegó y cobrar, desde el celular.", duracion: "1:06", modulo: "agenda" },
  { id: "tutorial-agenda-barbero-completo", titulo: "La agenda, paso a paso",     bajada: "Bloquear horas, cobrar, comisiones y su link personal.", duracion: "2:03", modulo: "agenda" },
  { id: "capsula-1-caja",                  titulo: "La caja",                     bajada: "Todo lo que se mueve en el día.", duracion: "0:42", modulo: "caja" },
  { id: "capsula-2-comisiones",            titulo: "Comisiones",                  bajada: "Cuánto le debes a tu equipo.", duracion: "0:40", modulo: "comisiones" },
  { id: "capsula-3-gastos",                titulo: "Gastos",                      bajada: "Todo lo que sale, ordenado.", duracion: "0:38", modulo: "metricas" },
  { id: "capsula-4-flujo-caja",            titulo: "El flujo de caja",            bajada: "La foto financiera completa.", duracion: "0:41", modulo: "metricas" },
  { id: "reel-boletas-syna",               titulo: "Boletas sin hacerlas a mano", bajada: "La boleta de honorarios sale sola al cerrar la cita.", duracion: "0:39", modulo: "caja" },
  { id: "tutorial-club-fidelizacion",      titulo: "El club, del lado del cliente", bajada: "Cómo se inscribe, junta sellos y canjea.", duracion: "0:58", modulo: "club" },
  { id: "reel-club-wallet",                titulo: "La tarjeta en el teléfono",   bajada: "Sellos en Google Wallet y Apple Wallet.", duracion: "0:32", modulo: "club" },
  { id: "leccion1-sueldo-comision-arriendo", titulo: "¿Sueldo, comisión o arriendo de sillón?", bajada: "Lección 1 del curso de gestión: cuánto IVA paga el local en cada caso.", duracion: "2:09", modulo: "plata", formato: "horizontal" },
  { id: "reel-migracion-agendapro",        titulo: "Cámbiate sin perder a nadie", bajada: "Traemos tus clientes, servicios y equipo sin costo.", duracion: "0:33", modulo: "general" },
];

export const capsula = (id: string) => CAPSULAS.find((c) => c.id === id);

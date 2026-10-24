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
  /** Por defecto /capsulas/<id>.mp4 y .jpg. Los cursos de /aprende viven en Storage. */
  src?: string;
  poster?: string;
  /** Saltos dentro del video (segundos), se muestran bajo el reproductor. */
  capitulos?: { t: number; texto: string }[];
};

export const CAPSULAS: Capsula[] = [
  { id: "syna-8bit",                       titulo: "SynapTech en 8-bit",          bajada: "Syna recorre los 9 niveles con el panel real, en PC y celular.", duracion: "2:25", modulo: "general", formato: "horizontal" },
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
  /* 24-10-2026: tutoriales y reels que ya existían en 06_Videos (local de práctica o datos tapados). */
  { id: "tutorial-caja-vender",            titulo: "Cobrar en la caja",           bajada: "Efectivo con vuelto, máquina POS y varias citas en un solo pago.", duracion: "1:15", modulo: "caja" },
  { id: "reel-hito-google",                titulo: "Reserva desde Google Maps",   bajada: "El botón «Reservar en línea» de tu ficha, conectado a tu agenda.", duracion: "0:35", modulo: "reserva" },
  { id: "reel-proveedor-meta",             titulo: "Proveedor de Tecnología de Meta", bajada: "Conecta el WhatsApp oficial de tu local con SynapTech.", duracion: "0:31", modulo: "asistente" },
  { id: "reel-embajadores",                titulo: "Da 1 mes, recibe 1 mes",      bajada: "El programa de embajadores, en medio minuto.", duracion: "0:28", modulo: "general" },
  { id: "reel-expansion-synaptech",        titulo: "De Viña al continente",       bajada: "La red de locales que hoy reserva con SynapTech.", duracion: "0:12", modulo: "general" },
  { id: "tutorial-agenda-1-tu-agenda",     titulo: "Tu agenda en un minuto",      bajada: "Leer el día, cambiar de fecha, ver el detalle y los colores.", duracion: "0:46", modulo: "agenda", formato: "horizontal" },
  { id: "tutorial-agenda-2-agendar-una-cita", titulo: "Agendar una cita a mano",  bajada: "Cliente, servicio, profesional y hora, desde el panel.", duracion: "0:42", modulo: "agenda", formato: "horizontal" },
  { id: "tutorial-agenda-3-cerrar-y-cobrar", titulo: "Cerrar y cobrar una cita",  bajada: "Marcarla completada y registrar el pago.", duracion: "0:44", modulo: "agenda", formato: "horizontal" },
  { id: "tutorial-agenda-4-bloquear-horas", titulo: "Bloquear horas o cerrar el día", bajada: "Para que nadie reserve cuando no atiendes.", duracion: "0:40", modulo: "agenda", formato: "horizontal" },
  { id: "facturacion-comision-partida",    titulo: "Boletas con comisión partida", bajada: "La boleta del local y la de honorarios del profesional, solas en cada cita.", duracion: "2:23", modulo: "caja", formato: "horizontal" },
  { id: "conectar-tv-paso-a-paso",         titulo: "Conecta la tele de tu local", bajada: "La agenda del día y tus ofertas en la pantalla, con un código y un QR.", duracion: "2:17", modulo: "general", formato: "horizontal" },
];

export const capsula = (id: string) => CAPSULAS.find((c) => c.id === id);
export const srcCapsula = (c: Capsula) => c.src ?? `/capsulas/${c.id}.mp4`;
export const posterCapsula = (c: Capsula) => c.poster ?? `/capsulas/${c.id}.jpg`;

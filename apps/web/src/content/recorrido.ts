/* Recorrido "Cómo funciona": módulos y pasos sobre capturas REALES del panel.

   Las capturas se sacaron el 09-10-2026 con el panel real corriendo contra el
   emulador de Firebase (local ficticio "Estudio Norte Barbería", datos
   inventados), en modo claro, a 2x. Fuente y scripts para regenerarlas:
   C:\Users\56983\devtools\guias-panel\sitio-web\ (ver LEEME.md).

   objetivos.json trae la caja de cada botón en píxeles CSS de la captura,
   medida con Playwright en el mismo momento de la foto. Si se regenera una
   captura, se reemplaza también ese archivo: las flechas dependen de él. */
import OBJETIVOS from "./objetivos.json";

export type Caja = { etiqueta: string; x: number; y: number; w: number; h: number };
export type Captura = { ancho: number; alto: number; alt: string; objetivos: Record<string, Caja> };

const ALT: Record<string, string> = {
  "agenda-escritorio": "Agenda del día con tres profesionales en el panel de SynapTech",
  "agenda-escritorio-menu": "Menú de acciones de la agenda con la opción Bloquear horas",
  "agenda-nueva-cita": "Formulario para crear una cita nueva",
  "app-barbero-celular": "Agenda del profesional en el celular",
  "reserva-1-servicio": "Página de reservas: elegir el servicio",
  "reserva-2-horario": "Página de reservas: elegir día y hora",
  "reserva-3-confirmar": "Página de reservas: datos del cliente y confirmación",
  "asistente-bandeja": "Bandeja de WhatsApp con una conversación atendida por el asistente",
  "asistente-orden": "Configuración del orden de preguntas del asistente",
  "caja": "Caja del día con saldo esperado y transacciones",
  "comisiones": "Liquidación de comisiones por profesional",
  "comisiones-detalle": "Detalle de comisiones de un profesional",
  "club-premios": "Escalera de premios del club de fidelización",
  "club-clientes": "Resumen del club con los clientes que más sellos tienen",
  "club-clientes-lista": "Lista de clientes con sus sellos y rangos",
  "metricas": "Métricas del período: ingresos, servicios y productos",
};

export const CAPTURAS: Record<string, Captura> = Object.fromEntries(
  (OBJETIVOS as unknown as { archivo: string; ancho: number; alto: number; objetivos: Record<string, Caja> }[]).map((o) => {
    const base = o.archivo.replace(/\.png$/, "");
    return [`${base}.webp`, { ancho: o.ancho, alto: o.alto, alt: ALT[base] ?? "", objetivos: o.objetivos }];
  })
);

export type Paso = { captura: string; objetivo?: string; titulo: string; texto: string; zoom?: number };
export type Modulo = { id: string; nombre: string; titular: string; bajada: string; pasos: Paso[]; capsulas: string[] };

const p = (captura: string, objetivo: string, titulo: string, texto: string, zoom?: number): Paso =>
  ({ captura: `${captura}.webp`, objetivo, titulo, texto, zoom });

export const MODULOS: Modulo[] = [
  {
    id: "agenda",
    nombre: "Agenda",
    titular: "Todo el día del local, en una pantalla.",
    bajada: "Cada profesional en su columna, cada cita con su estado y las horas bloqueadas a la vista. En el computador y en el celular.",
    pasos: [
      p("agenda-escritorio", "cita", "Cada profesional, su columna", "Ves las citas de todo el equipo con el servicio, la hora y el precio. El color te dice si está confirmada, completada o por llegar."),
      p("agenda-escritorio", "bloqueo", "Colaciones y bloqueos a la vista", "Las horas bloqueadas quedan marcadas en la agenda y nadie puede reservar encima."),
      p("agenda-escritorio-menu", "bloquearHoras", "Bloqueas horas en dos toques", "Desde el menú ⋯ bloqueas un rango, cierras el día completo o revisas el historial de cambios."),
      p("agenda-escritorio", "nuevaCita", "Agendas a mano cuando te llaman", "Con + Cita creas la hora en segundos, sin salir de la agenda."),
      p("agenda-nueva-cita", "servicio", "Servicio, hora y profesional", "Eliges el servicio y la duración y el término se calculan solos."),
      p("agenda-nueva-cita", "guardar", "Y queda agendada", "Al crearla aparece al tiro en la agenda de todos, también en el celular del profesional."),
      p("app-barbero-celular", "proximaCita", "El profesional lleva su día en el celular", "Ve su próxima cita, cuántas lleva y cuánto ha generado en el día."),
      p("app-barbero-celular", "nuevaCita", "Y agenda desde ahí mismo", "Con el botón + crea una cita desde su teléfono, sin pasar por recepción."),
    ],
    capsulas: ["tutorial-agenda-barbero", "tutorial-agenda-barbero-completo"],
  },
  {
    id: "reserva",
    nombre: "Reserva online",
    titular: "Tu cliente reserva solo, a cualquier hora.",
    bajada: "Tu propia página de reservas, con tu marca. Cuatro pasos desde el teléfono y la cita entra directo a tu agenda.",
    pasos: [
      p("reserva-1-servicio", "servicio", "Elige el servicio", "Con su precio y su duración a la vista, ordenados por categoría."),
      p("reserva-2-horario", "dia", "Elige el día", "Ve los próximos días disponibles de un vistazo."),
      p("reserva-2-horario", "horario", "Solo ve horas libres de verdad", "La disponibilidad sale de la agenda real del profesional: no hay choques ni dobles reservas."),
      p("reserva-3-confirmar", "datos", "Deja sus datos", "Nombre, teléfono y correo. Si quiere, su cumpleaños para recibir un regalo del club."),
      p("reserva-3-confirmar", "confirmar", "Y confirma", "La cita aparece en tu agenda en el mismo segundo."),
    ],
    capsulas: ["presentacion-synaptech-2"],
  },
  {
    id: "asistente",
    nombre: "Asistente IA",
    titular: "Syna responde y agenda por WhatsApp.",
    bajada: "Un asistente con IA en el número de tu local: contesta lo de siempre y deja la hora agendada dentro del chat, de día y de noche.",
    pasos: [
      p("asistente-bandeja", "mensajeAsistente", "Responde por ti", "Contesta precios, horarios y disponibilidad en el WhatsApp del local, aunque estés atendiendo."),
      p("asistente-bandeja", "citaAgendada", "Agenda la hora en la conversación", "Cuando el cliente elige, la cita queda creada en la agenda y el chat lo muestra."),
      p("asistente-bandeja", "conversacion", "Todas las conversaciones en una bandeja", "Tú y tu equipo ven cada chat y en qué quedó: agendó, preguntó o necesita a una persona."),
      p("asistente-bandeja", "tomarControl", "Tomas el control cuando quieras", "Si prefieres responder tú, el asistente se hace a un lado en esa conversación."),
      p("asistente-orden", "pasos", "Tú decides qué pregunta y en qué orden", "Servicio, profesional, día y hora, nombre: prendes, apagas y ordenas cada pregunta."),
    ],
    capsulas: ["reel-asistente-whatsapp"],
  },
  {
    id: "caja",
    nombre: "Caja",
    titular: "Cierra el día cuadrado, sin planillas.",
    bajada: "Cada cobro queda registrado con su medio de pago, y al final del día sabes exactamente cuánto debería haber en el cajón.",
    pasos: [
      p("caja", "saldoEsperado", "Lo que debería haber en el cajón", "El saldo esperado suma la apertura y lo cobrado en efectivo, y descuenta los egresos."),
      p("caja", "vender", "Vendes servicios y productos", "Desde la caja o desde la misma cita, con efectivo, débito, crédito o transferencia."),
      p("caja", "transacciones", "Cada cobro queda registrado", "Con la hora, el profesional y el medio de pago. Nada se anota en un cuaderno."),
      p("caja", "egreso", "Anotas lo que entra y sale", "Ingresos y egresos de efectivo, como la compra de insumos o un vuelto, quedan en la caja del día."),
      p("caja", "cerrarCaja", "Cierras y cuadras", "Al final del día cierras la caja y comparas lo esperado con lo contado."),
    ],
    capsulas: ["capsula-1-caja", "reel-boletas-syna"],
  },
  {
    id: "comisiones",
    nombre: "Comisiones",
    titular: "Cuánto le debes a cada uno, calculado solo.",
    bajada: "La comisión de servicios y productos, las propinas y lo ya pagado, por profesional y por período.",
    pasos: [
      p("comisiones", "periodo", "Eliges el período", "Quincenas o meses, como le pagues a tu equipo."),
      p("comisiones", "totalProfesional", "Ves cuánto le falta por pagar a cada uno", "Comisión, propinas, adelantos y lo ya pagado, en una sola cifra."),
      p("comisiones-detalle", "mediosPago", "Con el detalle de cada peso", "Lo cobrado por medio de pago y la comisión de cada cita, para que no haya discusión."),
      p("comisiones-detalle", "descargarPdf", "Se lo mandas en PDF", "O lo bajas a Excel en CSV para tu contador."),
      p("comisiones", "registrarPago", "Y registras el pago", "El pendiente de ese profesional queda en cero."),
    ],
    capsulas: ["capsula-2-comisiones"],
  },
  {
    id: "club",
    nombre: "Club",
    titular: "Un club que hace volver a tus clientes.",
    bajada: "Sellos por visita, premios y rangos, con la tarjeta guardada en el teléfono del cliente.",
    pasos: [
      p("club-premios", "escalera", "Armas tu escalera de premios", "Cada premio con los sellos que pide: un perfilado a los 5, un corte gratis a los 10."),
      p("club-premios", "nuevoPremio", "Agregas los premios que quieras", "Servicios, productos o descuentos, y los ordenas como prefieras."),
      p("club-clientes", "miembros", "Ves cómo crece el club", "Miembros, canjes y premios activos del período."),
      p("club-clientes", "premio", "Y quién ya puede canjear", "El panel te muestra qué cliente tiene un premio listo para ofrecérselo en su próxima visita."),
      p("club-clientes-lista", "rangos", "Clientes por rango", "Silver, Gold y Platinum para reconocer a los que más vienen."),
    ],
    capsulas: ["tutorial-club-fidelizacion", "reel-club-wallet"],
  },
  {
    id: "metricas",
    nombre: "Métricas",
    titular: "Los números del negocio, sin armar planillas.",
    bajada: "Ingresos del período comparados con el anterior, servicios contra productos y todo listo para tu contador.",
    pasos: [
      p("metricas", "atajos", "Eliges el período", "Hoy, la semana, el mes o el mes pasado, o un rango a tu medida."),
      p("metricas", "ingresosTotales", "Cuánto entró, y contra qué", "Los ingresos totales comparados con el período anterior."),
      p("metricas", "serviciosVsProductos", "Separado en servicios y productos", "Para saber qué parte del negocio está creciendo."),
      p("metricas", "csv", "Y lo bajas a Excel", "Un CSV con todo el detalle, listo para tu contador."),
    ],
    capsulas: ["capsula-3-gastos", "capsula-4-flujo-caja"],
  },
];

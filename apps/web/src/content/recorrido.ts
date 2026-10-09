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
  "estetica-agenda-escritorio": "Agenda del día de un centro de estética con tres profesionales",
  "estetica-reserva-1-servicio": "Página de reservas: catálogo de tratamientos por categoría",
  "estetica-reserva-3-confirmar": "Página de reservas: aceptación obligatoria de las políticas de atención",
  "estetica-ficha-clienta": "Historial y notas internas de una clienta",
  "estetica-ficha-gasto": "Ficha de una clienta: gasto total, visitas y profesional preferida",
  "estetica-club-premios": "Premios del club de un centro de estética",
  "estetica-giftcards": "Gift cards emitidas con su saldo",
  "agencia-bandeja": "Bandeja con conversaciones de WhatsApp e Instagram atendidas por vendedoras y el asistente",
  "agencia-reparto": "Vista de una vendedora con solo sus conversaciones",
  "agencia-embudo": "Embudo de ventas con clientes por etapa",
  "agencia-ficha": "Ficha de un cliente en el embudo",
  "agencia-cerrar-venta": "Cierre de una venta desde la conversación",
  "agencia-comisiones": "Comisiones del equipo de ventas del mes",
  "agencia-comisiones-vendedora": "Comisiones de una vendedora",
  "agencia-catalogo": "Catálogo de paseos con precios",
  "agencia-catalogo-paseo": "Ficha de un paseo con precio, precio residente, tickets y temporada",
  "clinica-reserva-tema": "Página de reservas de una clínica: tratamientos por especialidad",
  "clinica-reserva-datos": "Página de reservas: nombre, apellidos, edad y RUT del paciente",
  "clinica-reserva-consentimiento": "Página de reservas: consentimiento informado obligatorio",
  "clinica-abono-panel": "Configuración del abono al reservar con Mercado Pago",
  "clinica-abono-paso": "Página de reservas: aviso del abono antes de confirmar",
  "clinica-abono": "Pago del abono con Mercado Pago",
  "clinica-agenda": "Agenda del día de una clínica con kinesióloga, cosmetóloga y médico estético",
  "clinica-ficha-paciente": "Ficha clínica del paciente con alergias, notas, consentimiento y evolución",
  "clinica-historial-notas": "Historial de sesiones y notas internas de un paciente",
  "clinica-asistente": "Bandeja con el asistente pidiendo RUT y agendando a una paciente",
  "clinica-asistente-tratamiento": "El asistente responde por un tratamiento y ofrece horas reales",
  "clinica-asistente-temas": "Respuestas fijas por tema del asistente",
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

/* Recorrido de la página /estetica, sobre capturas de un centro de estética
   ficticio ("Aurora Estética & Spa", emulador, 09-10-2026). Fuente:
   devtools/guias-panel/sitio-web/estetica/. */
export const MODULOS_ESTETICA: Modulo[] = [
  {
    id: "reserva-estetica",
    nombre: "Reserva online",
    titular: "Tu catálogo de tratamientos, reservable a cualquier hora.",
    bajada: "Tus clientas eligen el tratamiento, la profesional y la hora desde el teléfono, y aceptan tus políticas antes de agendar.",
    pasos: [
      p("estetica-reserva-1-servicio", "categorias", "Tratamientos por categoría", "Facial, corporal, depilación, pestañas: tu catálogo ordenado, con buscador."),
      p("estetica-reserva-1-servicio", "tratamiento", "Con precio, duración y sellos", "Cada tratamiento muestra cuánto cuesta, cuánto dura y el sello del club que suma."),
      p("estetica-reserva-3-confirmar", "consentimiento", "Tus políticas, aceptadas antes de agendar", "Puedes exigir que la clienta acepte tus políticas de atención y cancelación para confirmar su hora."),
      p("estetica-reserva-3-confirmar", "confirmar", "Y la hora queda en tu agenda", "Con su tratamiento, su profesional y sus datos de contacto."),
    ],
    capsulas: ["presentacion-synaptech-2"],
  },
  {
    id: "ficha",
    nombre: "Ficha de la clienta",
    titular: "Cada clienta, con su historia.",
    bajada: "Notas que solo ve tu equipo, sus visitas, lo que más se hace y cuánto ha gastado.",
    pasos: [
      p("estetica-ficha-clienta", "nota", "Notas internas para tu equipo", "Tipo de piel, alergias o preferencias: lo anota una y lo ve todo el equipo antes de atenderla."),
      p("estetica-ficha-clienta", "historial", "Todas sus visitas", "Cada tratamiento con fecha, profesional, precio y estado."),
      p("estetica-ficha-gasto", "gasto", "Cuánto ha gastado", "Citas totales, completadas, sellos del club y gasto total de la clienta."),
      p("estetica-ficha-gasto", "preferida", "Y con quién prefiere atenderse", "Sus profesionales preferidas, sus tratamientos más pedidos y cada cuántos días vuelve."),
    ],
    capsulas: [],
  },
  {
    id: "fidelizar",
    nombre: "Club y gift cards",
    titular: "Que vuelvan, y que te regalen.",
    bajada: "Un club de sellos con premios de tu centro y gift cards para las fechas que más venden.",
    pasos: [
      p("estetica-club-premios", "escalera", "Tu escalera de premios", "Un perfilado de cejas a los 3 sellos, una limpieza facial gratis a los 8: tú decides."),
      p("estetica-club-premios", "otroPremio", "Premios en servicios o descuentos", "Por ejemplo, 20 % en masajes para quien junta 5 sellos."),
      p("estetica-giftcards", "giftcard", "Gift cards para regalar", "Cada una con su código, su monto y su vencimiento, y se canjean en la agenda."),
      p("estetica-giftcards", "saldoCirculacion", "Y sabes cuánto hay por canjear", "Emitidas, activas, usadas y el saldo que queda en circulación."),
    ],
    capsulas: ["tutorial-club-fidelizacion", "reel-club-wallet"],
  },
];

/* Recorrido de la página /agencias, sobre capturas de una agencia ficticia
   ("Andes Rutas", emulador, 09-10-2026). Fuente e inventario verificado:
   devtools/guias-panel/sitio-web/agencia/ (INVENTARIO.md).
   🔴 Ojo: hoy una venta de agencia NO crea una reserva en la agenda; nada acá
   lo promete. La comisión se calcula sobre lo pagado menos los tickets. */
export const MODULOS_AGENCIA: Modulo[] = [
  {
    id: "omnicanal",
    nombre: "Bandeja omnicanal",
    titular: "WhatsApp e Instagram, en una sola bandeja.",
    bajada: "Todas las conversaciones del equipo en un lugar, con Syna respondiendo y cotizando mientras tus vendedoras atienden.",
    pasos: [
      p("agencia-bandeja", "mensajeCliente", "Todos los mensajes, juntos", "Lo que llega por WhatsApp y por Instagram entra a la misma bandeja, con su historial."),
      p("agencia-bandeja", "mensajeSyna", "Syna cotiza con tu catálogo", "Responde precios, horarios y qué incluye cada paseo, arma el pedido y se lo pasa a tu equipo."),
      p("agencia-bandeja", "atiende", "Cada conversación tiene su vendedora", "Se ve quién atiende a cada cliente, y el dueño la puede cambiar."),
      p("agencia-bandeja", "quienResponde", "Tú decides quién responde", "Syna responde, respondes tú, o Syna nunca le responde a ese cliente."),
      p("agencia-bandeja", "respuestasRapidas", "Respuestas rápidas", "Los textos que se repiten, a un toque: datos para el abono, punto de encuentro, qué llevar."),
      p("agencia-bandeja", "cerrarVenta", "Y la venta se cierra desde el chat", "Sin cambiar de pantalla ni copiar datos a una planilla."),
    ],
    capsulas: ["reel-asistente-whatsapp"],
  },
  {
    id: "vendedoras",
    nombre: "Equipo de ventas",
    titular: "Cada vendedora con sus clientes, sin pisarse.",
    bajada: "Las conversaciones se reparten solas y cada vendedora entra a su propio panel.",
    pasos: [
      p("agencia-reparto", "asignada", "Reparto automático", "Cada conversación nueva se asigna a una vendedora, por turnos."),
      p("agencia-reparto", "soloSuyas", "Cada una ve solo lo suyo", "Sus chats, su embudo y sus comisiones. El dueño ve todo."),
      p("agencia-reparto", "esperando", "Nada queda sin responder", "La bandeja marca hace cuánto espera cada cliente."),
    ],
    capsulas: [],
  },
  {
    id: "embudo",
    nombre: "Embudo de ventas",
    titular: "Sabes en qué quedó cada cliente.",
    bajada: "Nuevos, cotizados, reservados, cerrados y perdidos: cada conversación en su etapa, por vendedora y por período.",
    pasos: [
      p("agencia-embudo", "etapa", "Etapas de la venta", "Cada cliente está en una columna, y lo mueves arrastrándolo."),
      p("agencia-embudo", "totales", "Los números del período", "Cuántos conversaron, cuántos quedaron sin trabajar y cuántos cerraron."),
      p("agencia-embudo", "filtroVendedora", "El embudo de cada vendedora", "Para ver quién está cerrando y a quién se le están enfriando los clientes."),
      p("agencia-ficha", "hacerSeguimiento", "Seguimiento con un toque", "Al cliente que dejó de responder, el asistente le escribe para retomar la conversación."),
    ],
    capsulas: [],
  },
  {
    id: "cierre",
    nombre: "Cierre y comisiones",
    titular: "La venta cerrada, la comisión calculada.",
    bajada: "Al cerrar la venta se anota el paseo, las personas y lo pagado, y la comisión de la vendedora sale sola.",
    pasos: [
      p("agencia-cerrar-venta", "paseo", "El paseo, como lo dejó Syna", "La venta toma el paseo que el asistente ya conversó con el cliente."),
      p("agencia-cerrar-venta", "tickets", "Tickets y entradas aparte", "Lo que se paga a terceros se descuenta antes de calcular la comisión."),
      p("agencia-comisiones", "vendedora", "Comisión por vendedora", "Cuánto vendió cada una en el mes y cuánto le corresponde."),
      p("agencia-comisiones", "cierre", "Cada cierre, explicado", "Lo pagado, menos los tickets, igual la base; y sobre la base, la comisión."),
      p("agencia-comisiones", "planilla", "Planilla para pagar", "Todo el mes en Excel, listo para transferir."),
    ],
    capsulas: [],
  },
  {
    id: "catalogo",
    nombre: "Catálogo",
    titular: "Tu catálogo, el que usa Syna para cotizar.",
    bajada: "Cada paseo con su precio, su descripción y sus condiciones; el asistente responde con lo que tú cargas.",
    pasos: [
      p("agencia-catalogo", "importarLista", "Lo cargas de una vez", "Pegas tu lista de paseos y la IA arma el catálogo."),
      p("agencia-catalogo-paseo", "residente", "Precio residente y turista", "Un precio general y otro para quien vive en Chile."),
      p("agencia-catalogo-paseo", "temporada", "Temporadas", "Fuera de las fechas, el paseo deja de ofrecerse solo."),
    ],
    capsulas: [],
  },
];

/* Recorrido de la página /clinicas, sobre capturas de una clínica ficticia
   ("Clínica Vértice", emulador, 09-10-2026). Inventario verificado:
   devtools/guias-panel/sitio-web/clinica/INVENTARIO.md. La ficha clínica, la
   evolución por sesión y los avisos a pacientes son del rubro clínica
   (tenants/{tid}.tipo = 'clinica', lo deja configurado SynapTech). */
export const MODULOS_CLINICA: Modulo[] = [
  {
    id: "reserva-clinica",
    nombre: "Reserva de pacientes",
    titular: "Tus pacientes reservan con todos sus datos, y aceptan antes de llegar.",
    bajada: "Tratamientos por especialidad, datos del paciente con RUT validado y el consentimiento informado aceptado en la misma reserva.",
    pasos: [
      p("clinica-reserva-tema", "categorias", "Tratamientos por especialidad", "Kinesiología, facial, corporal: cada uno con su precio y su duración, y un buscador."),
      p("clinica-reserva-tema", "pasos", "Tres pasos, sin enredos", "Tratamiento, día y hora, y datos. El paciente reserva en menos de un minuto."),
      p("clinica-reserva-datos", "rut", "RUT validado", "Nombre y apellidos por separado, edad y RUT con dígito verificador. Llegan completos a la ficha."),
      p("clinica-reserva-consentimiento", "aceptacion", "Consentimiento informado antes de agendar", "El paciente lee tu documento y confirma que lo acepta. Sin eso, no se agenda."),
    ],
    capsulas: [],
  },
  {
    id: "abono",
    nombre: "Abono al reservar",
    titular: "Un abono que asegura la hora.",
    bajada: "Cobra una parte al reservar con el Mercado Pago de tu clínica, y se descuenta del valor el día de la atención.",
    pasos: [
      p("clinica-abono-panel", "tipo", "Monto fijo o porcentaje", "Decides cuánto: un monto fijo o un porcentaje del tratamiento."),
      p("clinica-abono-panel", "servicios", "En todos o en algunos tratamientos", "Por ejemplo, solo en los tratamientos largos o de mayor valor."),
      p("clinica-abono-paso", "aviso", "El paciente sabe cuánto paga", "Lo ve antes de confirmar, junto al resumen de su reserva."),
      p("clinica-abono", "irAPagar", "Y paga con Mercado Pago", "La plata llega directo a la cuenta de tu clínica."),
    ],
    capsulas: [],
  },
  {
    id: "agenda-clinica",
    nombre: "Agenda",
    titular: "Cada profesional con su agenda, la clínica con todo a la vista.",
    bajada: "Kinesiología, cosmetología y medicina estética en la misma pantalla, con la ficha del paciente a un toque.",
    pasos: [
      p("clinica-agenda", "kinesiologa", "Cada profesional, su columna", "Las sesiones del día de cada profesional, con su estado y su valor."),
      p("clinica-agenda", "enAtencion", "Quién está en atención", "El color de cada cita dice si está por llegar, en atención o completada."),
      p("clinica-agenda", "fichaClinica", "La ficha clínica desde la agenda", "Abres la ficha del paciente sin salir del día."),
    ],
    capsulas: ["tutorial-agenda-barbero"],
  },
  {
    id: "ficha",
    nombre: "Ficha clínica",
    titular: "La historia de cada paciente, ordenada y segura.",
    bajada: "Alergias, notas, consentimiento firmado y la evolución de cada sesión, en una sola ficha.",
    pasos: [
      p("clinica-ficha-paciente", "alerta", "Alergias a la vista", "Lo que hay que revisar antes de atender, destacado arriba."),
      p("clinica-ficha-paciente", "consentimiento", "Consentimiento firmado, guardado", "El paciente firma en pantalla y la ficha guarda una copia que no se puede modificar."),
      p("clinica-ficha-paciente", "evolucion", "Evolución de cada sesión", "Se abre sola al completar la cita, para registrar lo que se hizo."),
      p("clinica-ficha-paciente", "imprimir", "Imprimir o guardar en PDF", "Para entregarle al paciente o a otro profesional."),
      p("clinica-historial-notas", "nota", "Notas internas del equipo", "Lo que todos deben saber del paciente, visible solo para la clínica."),
    ],
    capsulas: [],
  },
  {
    id: "asistente-clinica",
    nombre: "Asistente IA",
    titular: "Deja de responder mensajes y dedícate a atender.",
    bajada: "Syna responde por cada tratamiento, pide los datos que necesitas y agenda en el WhatsApp de tu clínica.",
    pasos: [
      p("clinica-asistente-tratamiento", "respuesta", "Responde por cada tratamiento", "Precio, duración e indicaciones, con lo que tú cargas en el catálogo."),
      p("clinica-asistente-tratamiento", "horas", "Ofrece horas reales", "Ofrece solo las horas libres de la agenda de cada profesional."),
      p("clinica-asistente", "pideRut", "Pide nombre completo y RUT", "Antes de agendar, para que el paciente llegue con su ficha lista."),
      p("clinica-asistente", "citaAgendada", "Y deja la hora agendada", "La cita aparece en tu agenda y el chat lo muestra."),
      p("clinica-asistente-temas", "tema", "Respuestas fijas por tema", "Tus indicaciones de siempre, como un drenaje post operatorio, dichas tal como las escribes tú."),
      p("clinica-asistente-temas", "escalar", "Lo delicado, a una persona", "Los temas que eliges los deriva a tu equipo y te avisa."),
    ],
    capsulas: ["reel-asistente-whatsapp"],
  },
];

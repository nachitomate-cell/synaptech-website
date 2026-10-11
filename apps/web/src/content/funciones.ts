/* Páginas por FUNCIÓN (11-10-2026). Ignacio: "¿qué funcionalidades importantes
   estamos dejando atrás para que Google las reconozca cuando se busquen?".

   Cada página apunta a búsquedas que el autocompletado de Google Chile
   devolvió ese día (devtools/guias-panel/sitio-web/seo/funciones/
   sugerencias-funciones-2026-10-11.json): "recordatorio de citas por
   whatsapp" (… gratis, business), "cálculo de comisiones" (… por ventas,
   excel), "cuadratura de caja" (… chile, excel), "ficha clínica digital"
   (… chile, gratis), "página web para barbería", "app para barberos"…

   Regla: cada frase sale de lo que el sitio ya afirma y verificó en las páginas
   de rubro (barberias, estetica, clinicas, peluquerias) o del panel en las
   capturas de public/panel. Nada nuevo sin mirarlo antes en la plataforma. */

export type Funcion = {
  slug: string;
  nombre: string;          // corto, para menús y tarjetas
  title: string;           // ≤ 60
  description: string;     // ≤ 155
  eyebrow: string;
  h1: string;
  bajada: string;
  imagen: { src: string; alt: string; w: number; h: number };
  imagen2?: { src: string; alt: string; w: number; h: number };
  puntos: { t: string; d: string }[];
  herramienta?: "comisiones" | "caja";
  herramientaTitulo?: string;
  faq: { q: string; a: string }[];
  relacionadas: string[];  // slugs de otras funciones o rutas del sitio
};

const ESC = (src: string, alt: string) => ({ src, alt, w: 2880, h: 1800 });
const CEL = (src: string, alt: string) => ({ src, alt, w: 780, h: 1688 });

export const FUNCIONES: Funcion[] = [
  {
    slug: "recordatorios-whatsapp",
    nombre: "Recordatorios por WhatsApp",
    title: "Recordatorio de citas por WhatsApp automático | SynapTech",
    description: "Confirmación y recordatorio de cada cita por la vía oficial de WhatsApp y por correo, y la cita en el calendario del cliente. Menos horas perdidas.",
    eyebrow: "Recordatorios de citas",
    h1: "Recordatorio de citas por WhatsApp, automático.",
    bajada: "Cada reserva recibe su confirmación y un recordatorio antes de la hora, por la vía oficial de WhatsApp y por correo. Tú no mandas nada a mano.",
    imagen: CEL("/panel/reserva-3-confirmar.webp", "Confirmación de la reserva en el celular del cliente"),
    imagen2: CEL("/panel/reserva-horas-recomendadas.webp", "Paso de fecha y hora de la reserva online"),
    puntos: [
      { t: "Confirmación al reservar", d: "Apenas el cliente agenda, le llega la confirmación con el día, la hora y el servicio." },
      { t: "Recordatorio antes de la cita", d: "Un aviso antes de la hora para que no se le olvide, por WhatsApp y por correo." },
      { t: "Con el nombre de tu local", d: "Los avisos salen por la vía oficial de WhatsApp, con el nombre de tu local en el mensaje." },
      { t: "En el calendario del cliente", d: "Al reservar puede guardar la cita en su calendario; en iPhone, con una alarma 2 horas antes." },
      { t: "Abono para los que fallan", d: "Si quieres, pide un abono con Mercado Pago al reservar para los servicios largos o caros." },
      { t: "Al costo", d: "Bolsas de 100, 300 o 1.000 avisos, desde $1.990 + IVA por 100. Los correos no tienen costo." },
    ],
    faq: [
      { q: "¿Cómo envío recordatorios de citas por WhatsApp sin hacerlo a mano?", a: "Con una agenda que los mande sola. En SynapTech cada reserva genera su confirmación y su recordatorio por la vía oficial de WhatsApp y por correo, sin que tú escribas nada." },
      { q: "¿Los recordatorios por WhatsApp son gratis?", a: "WhatsApp cobra por cada mensaje que envía una empresa. En SynapTech se compran bolsas al costo: 100 avisos por $1.990 + IVA, 300 por $5.990 + IVA y 1.000 por $19.990 + IVA. Los recordatorios por correo no tienen costo." },
      { q: "¿Sirve para bajar las inasistencias?", a: "Es lo que más ayuda, junto con pedir un abono al reservar los servicios largos. El cliente recibe el aviso antes de la hora y puede guardar la cita en su calendario." },
    ],
    relacionadas: ["abono-al-reservar", "pagina-web-reservas", "/asistente-ia-whatsapp"],
  },
  {
    slug: "comisiones",
    nombre: "Cálculo de comisiones",
    title: "Cálculo de comisiones para barberías y salones | SynapTech",
    description: "Calcula la comisión de cada profesional por servicios y productos, con propinas y adelantos. Calculadora gratis y liquidación automática en SynapTech.",
    eyebrow: "Comisiones del equipo",
    h1: "Cálculo de comisiones de tu equipo, sin planillas.",
    bajada: "La comisión de servicios y productos, las propinas y lo ya pagado, por profesional y por período. Prueba la calculadora gratis aquí abajo.",
    imagen: ESC("/panel/comisiones.webp", "Liquidación de comisiones por profesional en el panel"),
    imagen2: ESC("/panel/comisiones-detalle.webp", "Detalle de la comisión de un profesional"),
    herramienta: "comisiones",
    herramientaTitulo: "Calculadora de comisiones gratis",
    puntos: [
      { t: "Porcentaje por profesional", d: "Cada uno con su comisión de servicios y de productos, y el local con lo suyo." },
      { t: "Propinas y adelantos", d: "Las propinas cobradas con tarjeta se le suman y los adelantos se descuentan solos." },
      { t: "Por período", d: "Semana, quincena o mes: ves cuánto le debes a cada uno y qué ya está pagado." },
      { t: "Registrar el pago", d: "Al pagar, queda anotado como gasto en Sueldos y la caja lo sabe." },
      { t: "Arriendo de sillón", d: "Para quien arrienda, la boleta de honorarios de cada profesional sale sola al cerrar la cita." },
      { t: "Recibo para cada uno", d: "Cada profesional ve lo que le corresponde desde su celular." },
    ],
    faq: [
      { q: "¿Cómo se calculan las comisiones de un barbero?", a: "Se multiplica lo que cobró en servicios por su porcentaje (por ejemplo, 50 %), se suma la comisión de los productos que vendió y las propinas que cobró el local, y se restan los adelantos ya pagados. La calculadora de esta página hace esa cuenta." },
      { q: "¿Se puede calcular en Excel?", a: "Sí, pero hay que anotar cada atención a mano. En SynapTech cada cita y cada venta queda con su profesional, y la liquidación sale sola por período." },
      { q: "¿Qué pasa con el arriendo de sillón?", a: "Si el profesional arrienda, no hay comisión: paga un arriendo. SynapTech emite su boleta de honorarios al cerrar la cita con el adicional de facturación automática." },
    ],
    relacionadas: ["control-de-caja", "app-para-profesionales", "/guias/boleta-honorarios-y-comisiones-barberos"],
  },
  {
    slug: "control-de-caja",
    nombre: "Control y cuadratura de caja",
    title: "Control y cuadratura de caja para tu local | SynapTech",
    description: "Cuadra la caja todos los días: apertura, ingresos y egresos en efectivo, y la diferencia al cerrar. Calculadora gratis y caja automática en SynapTech.",
    eyebrow: "Caja diaria",
    h1: "Control y cuadratura de caja, todos los días.",
    bajada: "Cada cobro queda registrado con su medio de pago, y al final del día sabes exactamente cuánto debería haber en el cajón. Prueba la calculadora gratis.",
    imagen: ESC("/panel/caja.webp", "Caja del día con saldo esperado y transacciones"),
    imagen2: ESC("/panel/metricas.webp", "Métricas del negocio por período"),
    herramienta: "caja",
    herramientaTitulo: "Calculadora de cuadratura de caja",
    puntos: [
      { t: "Apertura con el cierre de ayer", d: "Abres con el efectivo inicial y te dice si calza con el último cierre." },
      { t: "Cada cobro con su medio de pago", d: "Efectivo, tarjeta, transferencia y pago online, separados." },
      { t: "Saldo esperado del cajón", d: "Apertura, más lo que entró en efectivo, menos gastos y adelantos." },
      { t: "Historial de cierres", d: "Qué días cuadraron y cuáles tuvieron diferencia, con quién cerró." },
      { t: "Gastos y sueldos", d: "Los gastos del cajón y los pagos al equipo quedan en el mismo lugar." },
      { t: "Reporte para tu contador", d: "Ventas por medio de pago, gastos por categoría e IVA estimado del mes." },
    ],
    faq: [
      { q: "¿Cómo se hace la cuadratura de caja?", a: "Se toma el efectivo de apertura, se suman los ingresos en efectivo del día y se restan los egresos pagados desde el cajón: eso es lo que debería haber. Se cuenta el efectivo real y la diferencia dice si cuadra, sobra o falta." },
      { q: "¿Las ventas con tarjeta van en la cuadratura?", a: "No en la del cajón: esas se cuadran con el banco o la máquina. En SynapTech cada cobro queda con su medio de pago, así que se separan solas." },
      { q: "¿Sirve para un local con varios profesionales?", a: "Sí. Cada cobro queda con su profesional y la caja se cierra una vez al día para todo el local, o por sede si tienes varias." },
    ],
    relacionadas: ["comisiones", "abono-al-reservar", "/precios"],
  },
  {
    slug: "ficha-clinica-digital",
    nombre: "Ficha clínica digital",
    title: "Ficha clínica digital para estética y clínicas | SynapTech",
    description: "Ficha clínica digital por paciente: alergias destacadas, notas del equipo, evolución de cada sesión y consentimiento antes de agendar. Imprimible en PDF.",
    eyebrow: "Ficha clínica",
    h1: "Ficha clínica digital para tu centro o clínica.",
    bajada: "Cada paciente con su historia: alergias destacadas, notas que solo ve tu equipo y la evolución de cada sesión, imprimible en PDF.",
    imagen: ESC("/panel/clinica-ficha-paciente.webp", "Ficha clínica de un paciente con alergias destacadas"),
    imagen2: ESC("/panel/clinica-historial-notas.webp", "Historial y notas de evolución por sesión"),
    puntos: [
      { t: "Alergias a la vista", d: "Lo importante destacado arriba, antes de atender." },
      { t: "Evolución por sesión", d: "Las notas de cada atención, con fecha y profesional." },
      { t: "Datos completos al reservar", d: "Nombre, apellidos, edad y RUT con dígito verificador, directo a la ficha." },
      { t: "Consentimiento antes de agendar", d: "El paciente acepta tu consentimiento informado al reservar, y puede firmar en pantalla en la clínica." },
      { t: "Notas internas", d: "Lo que anota tu equipo no lo ve el paciente." },
      { t: "Imprimible en PDF", d: "La ficha completa, lista para imprimir o enviar." },
    ],
    faq: [
      { q: "¿Qué debe tener una ficha clínica estética?", a: "Datos del paciente, antecedentes y alergias, el tratamiento y la evolución de cada sesión, y el consentimiento informado. Tenemos una plantilla gratis en PDF en www.synaptechspa.cl/recursos/ficha-clinica-estetica." },
      { q: "¿Puedo tener la ficha clínica digital gratis?", a: "La plantilla en PDF es gratis. La ficha digital dentro de la agenda viene en todos los planes de SynapTech, que tiene 14 días de prueba sin tarjeta." },
      { q: "¿Quién puede ver la ficha?", a: "Tu equipo, según su rol. Las notas internas no las ve el paciente." },
    ],
    relacionadas: ["abono-al-reservar", "recordatorios-whatsapp", "/clinicas", "/recursos/ficha-clinica-estetica"],
  },
  {
    slug: "abono-al-reservar",
    nombre: "Abono al reservar",
    title: "Cobrar abono al reservar con Mercado Pago | SynapTech",
    description: "Pide un abono o el pago completo al reservar online con Mercado Pago, para los servicios largos o caros. Menos inasistencias y la cita ya pagada.",
    eyebrow: "Pago online al reservar",
    h1: "Cobra un abono al reservar, con Mercado Pago.",
    bajada: "Para los servicios largos o caros: el cliente deja un abono, o paga completo, en el último paso de la reserva, y la hora queda asegurada.",
    imagen: CEL("/panel/clinica-abono-paso.webp", "Paso de pago del abono en la reserva online"),
    imagen2: ESC("/panel/clinica-abono-panel.webp", "Configuración del abono en el panel"),
    puntos: [
      { t: "Abono o pago completo", d: "Tú eliges cuánto pedir y en qué servicios." },
      { t: "Con tu Mercado Pago", d: "El cliente paga con tarjeta en el último paso de la reserva." },
      { t: "Queda en la cita", d: "La cita muestra lo abonado, y al cobrar en el local se descuenta." },
      { t: "Tus políticas aceptadas", d: "Las reglas de cancelación quedan aceptadas en la reserva." },
      { t: "Recordatorios incluidos", d: "Confirmación y recordatorio antes de la hora." },
      { t: "En la caja", d: "El abono entra a la caja como pago online, separado del efectivo." },
    ],
    faq: [
      { q: "¿Cómo cobro un abono al reservar una hora?", a: "Con una reserva online que pida el pago en el último paso. En SynapTech conectas tu Mercado Pago y eliges qué servicios piden abono y cuánto." },
      { q: "¿Cuánto cobra Mercado Pago?", a: "La comisión de Mercado Pago depende de tu cuenta y del medio de pago; la cobra Mercado Pago, no SynapTech." },
      { q: "¿Qué pasa si el cliente no llega?", a: "Lo define tu política de cancelación, que el cliente acepta al reservar. El abono queda registrado en su cita." },
    ],
    relacionadas: ["recordatorios-whatsapp", "control-de-caja", "/clinicas"],
  },
  {
    slug: "gift-cards",
    nombre: "Gift cards",
    title: "Gift cards para barberías, salones y estética | SynapTech",
    description: "Vende gift cards de tu local con código, monto y vencimiento, y canjéalas en la agenda. Para Navidad, el Día de la Madre y cada fecha que vende.",
    eyebrow: "Gift cards",
    h1: "Gift cards de tu local, que se canjean en la agenda.",
    bajada: "Para las fechas que más venden: gift cards con código, monto y vencimiento, que tu cliente regala y quien la recibe canjea al reservar o en el local.",
    imagen: ESC("/panel/estetica-giftcards.webp", "Gift cards de un centro de estética en el panel"),
    puntos: [
      { t: "Código, monto y vencimiento", d: "Cada gift card única, con su saldo." },
      { t: "Se canjea en la agenda", d: "Se descuenta al cobrar la cita, total o parcial." },
      { t: "Una o varias atenciones", d: "Un monto en pesos o servicios específicos." },
      { t: "Saldo a la vista", d: "Cuánto queda en cada gift card y cuándo vence." },
      { t: "En la caja", d: "La venta y el canje quedan registrados por separado." },
      { t: "Junto al club", d: "Gift cards y club de sellos en el mismo sistema." },
    ],
    faq: [
      { q: "¿Cómo vendo gift cards en mi barbería o salón?", a: "Creas la gift card con su monto o servicios y su vencimiento, y se la entregas al cliente con su código. Quien la recibe la canjea al cobrar su cita." },
      { q: "¿Se pueden usar en varias visitas?", a: "Sí: si es por monto, el saldo que queda se usa en la siguiente." },
      { q: "¿Cuánto cuesta?", a: "Las gift cards vienen en todos los planes de SynapTech, desde $29.900 + IVA al mes por local." },
    ],
    relacionadas: ["/fidelizacion", "/tienda-online", "control-de-caja"],
  },
  {
    slug: "app-para-profesionales",
    nombre: "App para profesionales",
    title: "App para barberos y profesionales: su agenda en el celular",
    description: "Cada barbero o estilista con su agenda en el celular: su día, citas, cobros, horas bloqueadas y lo que le corresponde. En App Store y Google Play.",
    eyebrow: "App del equipo",
    h1: "La app para barberos y profesionales de tu local.",
    bajada: "Cada profesional con su agenda en el celular: ve su día, agenda, cobra y sabe lo que le corresponde. En App Store y Google Play.",
    imagen: CEL("/panel/app-barbero-celular.webp", "Agenda del profesional en el celular"),
    puntos: [
      { t: "Su día de un vistazo", d: "Próxima cita, citas en orden y cuánto lleva hoy." },
      { t: "Agendar desde un espacio libre", d: "Una cita a mano en segundos." },
      { t: "Llegó y cobrar", d: "Marca que el cliente llegó y cobra con un toque." },
      { t: "Bloquear horas", d: "Colaciones, trámites o días libres, sin pedirle al dueño." },
      { t: "Sus ganancias", d: "Lo que le corresponde, sus comisiones y sus propinas." },
      { t: "Su link personal", d: "Su propio link de reservas con código QR para compartir." },
    ],
    faq: [
      { q: "¿Cuál es la mejor app para barberos?", a: "Una que le sirva al barbero y al dueño: la agenda del día, cobrar y ver lo que le corresponde, conectada con la caja y las comisiones del local. Esa es la app de SynapTech." },
      { q: "¿Tiene costo por barbero?", a: "No. SynapTech cobra por local, con profesionales ilimitados, y la app viene incluida." },
      { q: "¿Dónde se descarga?", a: "En App Store y Google Play como SynapTech Studio. También funciona en el navegador del celular." },
    ],
    relacionadas: ["comisiones", "pagina-web-reservas", "/barberias"],
  },
  {
    slug: "pagina-web-reservas",
    nombre: "Página web y reservas",
    title: "Página web para barbería con reservas online | SynapTech",
    description: "La página de tu local con reservas online: servicios y precios, profesionales, ubicación, horario, productos y club. Con tu marca y link para Instagram.",
    eyebrow: "Tu página web",
    h1: "La página web de tu barbería, con reservas online.",
    bajada: "Tu propia página con tu marca: servicios y precios, profesionales, ubicación y horario, y tus clientes reservan solos a cualquier hora. Lista para el link de tu Instagram.",
    imagen: CEL("/panel/reserva-1-servicio.webp", "Página de reservas de un local con sus servicios"),
    imagen2: CEL("/panel/reserva-horas-recomendadas.webp", "Horas recomendadas para reservar de un toque"),
    puntos: [
      { t: "Con tu marca", d: "Tu logo, tus colores y la dirección de tu local." },
      { t: "Servicios y precios", d: "Con su duración y el profesional que los hace." },
      { t: "Horas recomendadas", d: "Las próximas horas libres del día, para reservar de un toque." },
      { t: "Ubicación y horario", d: "Todo lo que el cliente pregunta, a la vista." },
      { t: "Productos y club", d: "Tu tienda y tu club de fidelidad, en la misma página." },
      { t: "Para tu Instagram", d: "El link que va en tu bio, y uno por profesional." },
    ],
    faq: [
      { q: "¿Cuánto cuesta una página web para barbería?", a: "En SynapTech viene incluida en todos los planes, desde $29.900 + IVA al mes por local, con la agenda, la caja y el club. No hay costo aparte por la página." },
      { q: "¿Necesito un dominio propio?", a: "No. Tu local tiene su dirección en synaptechspa.cl desde el primer día. Si ya tienes un dominio, también se puede usar." },
      { q: "¿Mis clientes pueden reservar desde Instagram?", a: "Sí: pones el link en tu bio y en tus historias, y reservan sin escribirte." },
    ],
    relacionadas: ["recordatorios-whatsapp", "/tienda-online", "/fidelizacion"],
  },
];

export const funcion = (slug: string) => FUNCIONES.find((f) => f.slug === slug);

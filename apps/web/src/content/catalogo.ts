/* Catálogo público de SynapTech: lo que se vende, agrupado en familias como
   lo hace Square. Lo leen el menú (Header), la home (Familias, Rubros) y el
   Footer, así los tres dicen siempre lo mismo.

   Regla: cada línea tiene que existir y funcionar HOY en la plataforma. Si
   algo no está en producción, no entra acá (ver memoria feedback_copy_verificable). */

/* AUTOSERVICIO = bioo (12-10-2026, decisión de Ignacio). Todo local que se
   crea solo nace en bioo, nuestra marca de agenda de autoservicio: la única
   alta es bioo.cl/agenda (empieza.synaptechspa.cl y crea. redirigen ahí). Lo
   que arma el equipo de SynapTech a mano (varias sedes, equipo grande, diseño
   propio) va por WhatsApp: A_MEDIDA_WA.
   · alta(medio): el link de alta etiquetado con utm. NO usar ?ref= desde el
     sitio: `ref` es de vendedores y locales embajadores, y uno desconocido le
     llega a Ignacio como alerta ("Ref DESCONOCIDO").
   · SIGNUP_URL: la dirección a secas, para textos. */
export const SIGNUP_URL = "https://bioo.cl/agenda";
/** Mis reservas: la app de la persona que reserva (citas, sellos y premios de todos sus locales). */
export const APP_CLIENTES = "https://mi.synaptechspa.cl";
/** Ingresar: el panel de los dueños y su equipo. El local se resuelve con la cuenta. */
export const APP_DUENOS = "https://app.synaptechspa.cl/";
export const alta = (medio: string) =>
  `${SIGNUP_URL}?utm_source=synaptechspa&utm_medium=${encodeURIComponent(medio)}`;
/** La agenda sola, sin asistente: la misma alta de bioo (14 días del Pro). */
export const agendaSinIA = alta;

/* ALTA CON ASISTENTE IA (21-10-2026). El botón principal del sitio lleva a
   crear.synaptechspa.cl: crea la agenda con Syna encendido desde el primer día
   y 30 días gratis del plan Pro. bioo (agendaSinIA) queda como enlace
   secundario: "Solo quiero la agenda, sin IA". 26-10-2026: el plan Gratis ya no
   se publica; lo ofrece Ignacio en persona. Los links de embajadores
   (?codigo=) y las páginas LATAM (PaisLanding) NO usan esto: tienen su oferta.
   · rubro: barberia | salon | estetica | unas | clinica | pilates | mascotas | spa */
export const ALTA_IA_URL = "https://crear.synaptechspa.cl/";
export type RubroAlta = "barberia" | "salon" | "estetica" | "unas" | "clinica" | "pilates" | "mascotas" | "spa";
export const altaIA = (medio: string, rubro?: RubroAlta) =>
  `${ALTA_IA_URL}?utm_source=synaptechspa&utm_medium=${encodeURIComponent(medio)}${rubro ? `&rubro=${rubro}` : ""}`;
/** Textos de los botones del alta. */
export const CTA_IA = "Prueba 30 días con asistente IA";
export const CTA_SIN_IA = "Solo quiero la agenda, sin IA";
/** El rubro del alta según el `origen` de un botón ("barberias-hero" → "barberia", "tiempo-unas" → "unas"). */
const RUBRO_POR_ORIGEN: [string, RubroAlta][] = [
  ["barberias", "barberia"], ["peluquerias", "salon"], ["salones", "salon"], ["estetica", "estetica"],
  ["unas", "unas"], ["clinicas", "clinica"], ["pilates", "pilates"], ["mascotas", "mascotas"],
];
export const rubroDeOrigen = (origen: string): RubroAlta | undefined =>
  RUBRO_POR_ORIGEN.find(([o]) => origen === o || origen.startsWith(`${o}-`) || origen.endsWith(`-${o}`))?.[1];
export const WA_NUMERO = "56983568212";

export const waLink = (texto: string) =>
  `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(texto)}`;

/** Lo a medida: varias sedes, equipo grande o diseño propio. Lo arma el equipo. */
export const A_MEDIDA_WA = waLink("Hola, quiero que me armen la agenda de mi local a medida");

export type Item = { label: string; desc: string };

export type Familia = {
  id: string;
  nombre: string;
  bajada: string;
  imagen: string;
  imagenAlt: string;
  href: string;
  /** Ancla del módulo en /como-funciona y cápsula en video que lo muestra. */
  recorrido: string;
  capsula: string;
  items: Item[];
  /** Página propia del producto: si existe, la tarjeta enlaza ahí en vez de a /como-funciona. */
  pagina?: { href: string; texto: string };
};

export const FAMILIAS: Familia[] = [
  {
    id: "agenda",
    nombre: "Agenda",
    bajada: "Tus clientes reservan solos, a cualquier hora, desde su teléfono.",
    imagen: "/panel/agenda-escritorio.webp",
    imagenAlt: "Agenda del día por profesional en el panel de SynapTech",
    href: "/barberias",
    recorrido: "agenda",
    capsula: "tutorial-agenda-barbero",
    items: [
      { label: "Reservas online 24/7", desc: "Tu propia página de reservas, sin llamadas" },
      // 11-10-2026: dos detalles de la reserva que ya existían y no se contaban.
      { label: "Horas recomendadas", desc: "Las próximas horas libres del día, para reservar de un toque" },
      { label: "Recordatorios y calendario", desc: "Confirmación, recordatorio y la cita en el calendario del cliente" },
      { label: "Agenda por profesional", desc: "Cada uno ve su día, el local ve todo" },
      { label: "Varias sucursales", desc: "Cada sede con su agenda, su equipo y su caja" },
    ],
  },
  {
    id: "asistente",
    nombre: "Asistente con IA",
    bajada: "Responde y agenda por WhatsApp e Instagram en el número del local.",
    imagen: "/panel/asistente-bandeja.webp",
    imagenAlt: "Bandeja de WhatsApp con una conversación atendida por el asistente",
    href: "/asistente-ia-whatsapp",
    recorrido: "asistente",
    capsula: "reel-asistente-whatsapp",
    items: [
      { label: "Asistente en WhatsApp", desc: "Contesta precios, horarios y agenda la hora" },
      { label: "Asistente en Instagram", desc: "Atiende los mensajes directos (plan Full)" },
      { label: "Bandeja compartida", desc: "Todo el equipo ve y responde las conversaciones" },
      { label: "Escala a una persona", desc: "Cuando la conversación se complica, avisa" },
    ],
  },
  {
    id: "cobros",
    nombre: "Cobros y caja",
    bajada: "Cobra en el mesón, por link o al reservar, y cierra el día cuadrado.",
    imagen: "/panel/caja.webp",
    imagenAlt: "Caja del día con saldo esperado y transacciones",
    href: "/barberias",
    recorrido: "caja",
    capsula: "capsula-1-caja",
    items: [
      { label: "Pago online al reservar", desc: "Mercado Pago para abonos y reservas" },
      { label: "Máquina POS TUU", desc: "El cobro del mesón queda dentro de la cita" },
      { label: "Caja y comisiones", desc: "Cierre diario y liquidación de cada profesional" },
      { label: "Boletas ante el SII", desc: "Boleta de honorarios por profesional, automática" },
    ],
  },
  /* Tienda online (11-10-2026, Ignacio: "hay que promocionarla al 100%").
     Es la tienda que ya usan 18 locales: catálogo con su marca, carrito y pago
     con su Mercado Pago, "apártalo para tu cita" y productos dentro de la
     reserva. Capturas reales del local de práctica. */
  {
    id: "tienda",
    nombre: "Tienda online",
    bajada: "Vende tus productos por internet, con tu marca, y que tus clientes los retiren en su cita.",
    imagen: "/panel/tienda-compuesta.webp",
    imagenAlt: "Tienda online de una barbería: portada, categorías y ficha de producto",
    href: "/tienda-online",
    recorrido: "productos",
    capsula: "",
    pagina: { href: "/tienda-online", texto: "Ver la tienda online" },
    items: [
      { label: "Tu tienda con tu marca", desc: "Fotos, precios y categorías en tu propia dirección" },
      { label: "Pago con tarjeta", desc: "Con tu cuenta de Mercado Pago" },
      { label: "Apártalo para tu cita", desc: "El cliente lo reserva y lo paga en el local" },
      { label: "Productos en la reserva", desc: "Los agrega a su hora mientras agenda" },
    ],
  },
  {
    id: "fidelizacion",
    nombre: "Fidelización",
    bajada: "Que el cliente vuelva: sellos, premios y su tarjeta en el teléfono.",
    imagen: "/panel/club-premios.webp",
    imagenAlt: "Premios del club de fidelidad en el panel de SynapTech",
    href: "/fidelizacion",
    recorrido: "club",
    capsula: "reel-club-wallet",
    items: [
      { label: "Club de sellos y premios", desc: "Rangos y premios por visita" },
      { label: "Google Wallet y Apple Wallet", desc: "La tarjeta del club en el teléfono del cliente" },
      { label: "Gift cards", desc: "Regalos que se canjean en la agenda" },
      { label: "Campañas y referidos", desc: "Reactiva a quien dejó de venir" },
    ],
  },
  {
    id: "gestion",
    nombre: "Gestión del local",
    bajada: "Equipo, productos y números del negocio en un solo panel.",
    imagen: "/panel/comisiones.webp",
    imagenAlt: "Liquidación de comisiones por profesional",
    href: "/barberias",
    recorrido: "comisiones",
    capsula: "capsula-2-comisiones",
    items: [
      { label: "Equipo y roles", desc: "Dueño, recepción y profesionales con su acceso" },
      { label: "Productos e inventario", desc: "Vende productos y controla el stock" },
      { label: "Arriendo de sillón", desc: "Para locales que arriendan a profesionales" },
      { label: "Métricas del negocio", desc: "Ventas, clientes y ocupación del mes" },
    ],
  },
];

export type Rubro = {
  id: string;
  nombre: string;
  titular: string;
  texto: string;
  puntos: string[];
  href?: string;
};

export const RUBROS: Rubro[] = [
  {
    id: "barberias",
    nombre: "Barberías",
    titular: "La barbería llena, sin vivir pegado al teléfono.",
    texto: "Agenda por barbero, asistente que responde por WhatsApp y un club que hace volver al cliente.",
    puntos: [
      "Agenda y comisión por barbero",
      "Arriendo de sillón con boleta de honorarios",
      "Club de sellos en Google Wallet",
    ],
    href: "/barberias",
  },
  {
    id: "salones",
    nombre: "Peluquerías y salones",
    titular: "Cada profesional con su agenda, el salón con todo a la vista.",
    texto: "Servicios con duración por profesional, venta de productos y gift cards para las fechas que más venden.",
    puntos: [
      "Duración del servicio por profesional",
      "Gift cards y venta de productos",
      "Metas y comisiones del equipo",
    ],
    href: "/peluquerias",
  },
  {
    id: "estetica",
    nombre: "Estética y spa",
    titular: "Tratamientos ordenados y pacientes que vuelven.",
    texto: "Catálogo de tratamientos, ficha de cada cliente y recordatorios que bajan las inasistencias.",
    puntos: [
      "Catálogo largo de tratamientos",
      "Ficha e historial de cada cliente",
      "Consentimiento antes de agendar",
    ],
    href: "/estetica",
  },
  {
    id: "unas",
    nombre: "Uñas y manicure",
    titular: "Tus clientas reservan su set, solas.",
    texto: "Reserva online con la duración real de cada servicio, recordatorios antes de la hora y un club que las hace volver.",
    puntos: [
      "Duración por servicio y por manicurista",
      "Abono al reservar los sets largos",
      "Club de sellos en Google Wallet",
    ],
    href: "/unas",
  },
  {
    id: "clinicas",
    nombre: "Clínicas",
    titular: "Tu clínica atendiendo, no respondiendo mensajes.",
    texto: "Para clínicas estéticas y de kinesiología: reserva con RUT y consentimiento, ficha clínica por paciente y un asistente que agenda por WhatsApp.",
    puntos: [
      "Consentimiento informado antes de agendar",
      "Ficha clínica con alergias y evolución",
      "Abono al reservar con Mercado Pago",
    ],
    href: "/clinicas",
  },
  {
    id: "pilates",
    nombre: "Pilates y bienestar",
    titular: "Clases, packs y varias sedes en una sola plataforma.",
    texto: "Tus alumnas reservan su clase, y cada sede maneja sus propios precios y horarios.",
    puntos: [
      "Reserva de clases",
      "Precios distintos por sede",
      "Horarios de clase por sede",
    ],
    href: "/pilates",
  },
  {
    id: "mascotas",
    nombre: "Mascotas",
    titular: "Peluquería y baño de mascotas, también a domicilio.",
    texto: "El cliente agenda con los datos de su mascota y su dirección, y el precio sale según el tamaño.",
    puntos: [
      "Servicios por tamaño de mascota",
      "Reserva con dirección para ir a domicilio",
      "Asistente que pregunta por la mascota",
    ],
    href: "/mascotas",
  },
  {
    id: "agencias",
    nombre: "Agencias",
    titular: "Tus vendedores atendiendo desde la misma bandeja.",
    texto: "Para agencias de viajes y paseos: catálogo, WhatsApp e Instagram compartidos y comisión de cada vendedor.",
    puntos: [
      "Bandeja de WhatsApp e Instagram compartida",
      "Catálogo de paseos y servicios",
      "Comisión por vendedora, sin contar tickets",
    ],
    href: "/agencias",
  },
];

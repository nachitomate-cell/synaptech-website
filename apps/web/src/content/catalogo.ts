/* Catálogo público de SynapTech: lo que se vende, agrupado en familias como
   lo hace Square. Lo leen el menú (Header), la home (Familias, Rubros) y el
   Footer, así los tres dicen siempre lo mismo.

   Regla: cada línea tiene que existir y funcionar HOY en la plataforma. Si
   algo no está en producción, no entra acá (ver memoria feedback_copy_verificable). */

export const SIGNUP_URL = "https://crea.synaptechspa.cl/";
export const WA_NUMERO = "56983568212";

export const waLink = (texto: string) =>
  `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(texto)}`;

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
      { label: "Agenda por profesional", desc: "Cada uno ve su día, el local ve todo" },
      { label: "Recordatorios y confirmaciones", desc: "Menos horas perdidas por inasistencia" },
      { label: "Varias sucursales", desc: "Cada sede con su agenda, su equipo y su caja" },
    ],
  },
  {
    id: "asistente",
    nombre: "Asistente con IA",
    bajada: "Responde y agenda por WhatsApp e Instagram en el número del local.",
    imagen: "/panel/asistente-bandeja.webp",
    imagenAlt: "Bandeja de WhatsApp con una conversación atendida por el asistente",
    href: "/barberias",
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
      { label: "Pago online al reservar", desc: "Mercado Pago y Flow para abonos y reservas" },
      { label: "Máquina POS TUU", desc: "El cobro del mesón queda dentro de la cita" },
      { label: "Caja y comisiones", desc: "Cierre diario y liquidación de cada profesional" },
      { label: "Boletas ante el SII", desc: "Boleta de honorarios por profesional, automática" },
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
    nombre: "Salones de belleza",
    titular: "Cada profesional con su agenda, el salón con todo a la vista.",
    texto: "Servicios con duración por profesional, venta de productos y gift cards para las fechas que más venden.",
    puntos: [
      "Duración del servicio por profesional",
      "Gift cards y venta de productos",
      "Metas y comisiones del equipo",
    ],
  },
  {
    id: "estetica",
    nombre: "Estética y clínicas",
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
    id: "pilates",
    nombre: "Pilates y bienestar",
    titular: "Clases, packs y varias sedes en una sola plataforma.",
    texto: "Tus alumnas reservan su clase, y cada sede maneja sus propios precios y horarios.",
    puntos: [
      "Reserva de clases",
      "Precios distintos por sede",
      "Horarios de clase por sede",
    ],
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
  },
  {
    id: "agencias",
    nombre: "Agencias",
    titular: "Tus vendedores atendiendo desde la misma bandeja.",
    texto: "Para agencias de viajes y paseos: catálogo, WhatsApp e Instagram compartidos y comisión de cada vendedor.",
    puntos: [
      "Bandeja de WhatsApp e Instagram compartida",
      "Catálogo de paseos y servicios",
      "Comisión por vendedor sobre lo vendido",
    ],
  },
];

/* Convenios e integraciones (01-11-2026, pedido de Ignacio). Lo leen la
   portada (components/Integraciones.tsx), /precios y /integraciones.

   REGLA: un convenio que no existe es la afirmación falsa más cara. Cada
   estado de acá fue verificado el 01-11-2026 y se escribe con estas palabras:
   - CONVENIOS (se puede decir "partner"): Mercado Pago (programa de partners,
     nivel Agencia, inscritos el 07-10-2026) y el beneficio de fibra Entel.
   - INTEGRACIONES (funcionan en producción): se dice "integrado con" o
     "conectado con", NUNCA "partner". Ni Meta, ni Google, ni Anthropic son
     convenios: no decir "Meta Partner", "Tech Provider", "partner de Google"
     ni "partner de Anthropic".
   - "Reservar con Google" está en trámite: a lo más, "próximamente".
   - NO publicar: Envia (en proceso), Paddle, HubSpot, AWS, Cloudflare,
     Google Cloud (infraestructura interna), Lealtad 360, Coopeuch u otros
     bancos (conversaciones, no convenios), Haulmer como alianza. Google Calendar
     y Google Cloud salieron de la lista pública ese día.
   - NO prometer: Conversions API de Meta (CAPI), GoHighLevel u otro CRM.
   Logos: solo para identificar la integración (los oficiales de cada marca,
   en public/integraciones y public/marcas-terceros). Sin badges de partner
   inventados: Entel va como texto, sin su logo (igual que /beneficios/fibra). */

export type Integracion = {
  id: string;
  nombre: string;
  /** Rótulo de estado, con las palabras exactas permitidas. */
  estado: string;
  cat: string;
  desc: string;
  /** En qué plan viene. */
  planes: string;
  logo?: string;
  /** "wordmark": el logo ya dice el nombre. "icono": se escribe el nombre al lado. "badge": insignia oficial. */
  tipo?: "wordmark" | "icono" | "badge";
  href?: string;
  /** Búsqueda que atiende (para el texto de /integraciones). */
  busqueda?: string;
};

export const CONVENIOS: Integracion[] = [
  {
    id: "mercado-pago", nombre: "Mercado Pago", estado: "Partner de Mercado Pago (Agencia)", cat: "Pagos",
    logo: "/marcas-terceros/mercado-pago.png", tipo: "wordmark",
    desc: "Somos parte del programa de partners de Mercado Pago. Tus clientes pagan abonos, links de pago y compras de tu tienda online, y la plata llega a tu propia cuenta.",
    planes: "Todos los planes. La comisión del cobro la pone Mercado Pago.",
    busqueda: "agenda con Mercado Pago",
  },
  {
    id: "entel", nombre: "Entel", estado: "Beneficio SynapTech + Entel", cat: "Conectividad",
    desc: "Fibra para tu local: los locales que usan SynapTech contratan fibra óptica Entel por un canal exclusivo y reciben una gift card de $20.000 cuando queda instalada.",
    planes: "Para locales que usan SynapTech.",
    href: "/beneficios/fibra",
  },
];

export const INTEGRACIONES: Integracion[] = [
  {
    id: "webpay", nombre: "Webpay", estado: "Integrado con Webpay (Transbank)", cat: "Pagos",
    logo: "/integraciones/webpay.svg", tipo: "wordmark",
    desc: "Webpay Plus para cobrar abonos al reservar y Oneclick para pagar tu mensualidad con tarjeta de débito o crédito.",
    planes: "Todos los planes. La comisión la cobra Transbank.",
    busqueda: "agenda con Webpay",
  },
  {
    id: "whatsapp", nombre: "WhatsApp", estado: "Conectado con WhatsApp", cat: "Mensajería",
    logo: "/integraciones/whatsapp.svg", tipo: "wordmark",
    desc: "El asistente con IA responde y agenda desde el número de tu local, que sigue funcionando en tu teléfono, y manda los recordatorios a quien los aceptó. Las campañas salen por la vía oficial de WhatsApp.",
    planes: "Asistente y recordatorios: planes con IA. Campañas: todos los planes, con bolsas de mensajes.",
    busqueda: "agenda con WhatsApp",
  },
  {
    id: "instagram", nombre: "Instagram", estado: "Conectado con Instagram", cat: "Mensajería",
    logo: "/integraciones/instagram.png", tipo: "icono",
    desc: "El asistente también responde y agenda por mensaje directo de Instagram.",
    planes: "Incluido en Todo Incluido; adicional de $19.900 + IVA en Independiente IA y Local IA.",
  },
  {
    id: "wellhub", nombre: "Wellhub", estado: "Integrado con Wellhub", cat: "Estudios y gimnasios",
    logo: "/integraciones/wellhub.svg", tipo: "wordmark", href: "/wellhub",
    desc: "Los check-ins de Wellhub se validan contra la agenda: cada clase con sus cupos de Wellhub y la visita validada sola. Para estudios de pilates y gimnasios.",
    planes: "Se cotiza según las sedes.",
    busqueda: "agenda Wellhub",
  },
  {
    id: "google-wallet", nombre: "Google Wallet", estado: "Integrado con Google Wallet", cat: "Fidelización",
    logo: "/integraciones/google-wallet.svg", tipo: "wordmark", href: "/fidelizacion",
    desc: "La tarjeta del club, con sus sellos, premios y rango, en el teléfono Android del cliente. Se actualiza sola.",
    planes: "Todos los planes.",
    busqueda: "reservas con Google Wallet",
  },
  {
    id: "apple-wallet", nombre: "Apple Wallet", estado: "Integrado con Apple Wallet", cat: "Fidelización",
    logo: "/integraciones/apple-wallet.svg", tipo: "badge", href: "/fidelizacion",
    desc: "La misma tarjeta de fidelidad en el iPhone del cliente.",
    planes: "Todos los planes.",
  },
  {
    id: "google", nombre: "Google", estado: "Conectado con Google", cat: "Google",
    logo: "/integraciones/google-maps.svg", tipo: "icono",
    desc: "El pedido de reseñas de tu ficha de Google después de cada cita, y tu link de reservas en tu Perfil de Empresa de Google. Reservar con Google: próximamente.",
    planes: "Todos los planes.",
  },
  {
    id: "google-analytics", nombre: "Google Analytics 4 y Google Tag Manager", estado: "Conectado con Google Analytics 4 y Tag Manager", cat: "Medición",
    logo: "/integraciones/google-analytics.svg", tipo: "icono",
    desc: "Mide visitas y reservas en el dominio de tu local con tu propia cuenta de Google Analytics 4 o Google Tag Manager.",
    planes: "Todos los planes.",
  },
  {
    id: "meta-pixel", nombre: "Meta Pixel", estado: "Conectado con Meta Pixel", cat: "Medición",
    logo: "/integraciones/meta.png", tipo: "wordmark",
    desc: "Mide tus anuncios de Facebook e Instagram en el dominio de tu local, con tu propio píxel.",
    planes: "Todos los planes.",
  },
  {
    id: "sii", nombre: "SII", estado: "Conectado con el SII", cat: "Tributario",
    logo: "/marcas-terceros/sii-sello.svg", tipo: "icono", href: "/boletas-electronicas-sii",
    desc: "Emisión automática de boletas y facturas electrónicas: la boleta del local y la boleta de honorarios de cada profesional salen solas al cerrar la cita.",
    planes: "Incluido en Todo Incluido; adicional de $24.900 + IVA ($12.900 en los planes Independiente), sin instalación.",
    busqueda: "boletas electrónicas automáticas",
  },
  {
    id: "tuu", nombre: "TUU", estado: "Integrado con TUU", cat: "Pagos",
    logo: "/integraciones/tuu.png", tipo: "wordmark",
    desc: "Las ventas de la máquina POS TUU se concilian con la caja del día, y la plataforma avisa si algo no cuadra.",
    planes: "Desde el plan Local.",
  },
  {
    id: "claude", nombre: "Claude, de Anthropic", estado: "Construida con Claude", cat: "Inteligencia artificial",
    logo: "/integraciones/anthropic.svg", tipo: "wordmark",
    desc: "La IA de SynapTech está construida con Claude, de Anthropic. Y con el conector oficial de SynapTech para Claude consultas tu agenda y tus ventas desde Claude.",
    planes: "El asistente, en los planes con IA.",
  },
];

export const TODAS = [...CONVENIOS, ...INTEGRACIONES];

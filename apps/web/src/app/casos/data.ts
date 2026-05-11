export type FeatureGroup = {
  titulo: string;
  items: string[];
};

export type CaseData = {
  slug: string;
  sector: string;
  cliente: string;
  titulo: string;
  descripcion: string;
  problema: string;
  solucion: string;
  stack: string[];
  estado: string;
  año: string;
  accentColor: string;
  features?: FeatureGroup[];
};

export const CASES_DATA: CaseData[] = [
  {
    slug: "vinamed",
    sector: "HealthTech · Salud",
    cliente: "ViñaMed",
    titulo: "Portal clínico con visor DICOM",
    descripcion:
      "Plataforma para gestión de perfiles profesionales (médicos y tecnólogos médicos) y visualización de reportes ecográficos en formato DICOM. Flujos clínicos digitalizados de extremo a extremo.",
    problema:
      "ViñaMed operaba con fichas clínicas en papel y reportes ecográficos distribuidos por correo, sin trazabilidad ni acceso centralizado para el equipo médico. El tiempo entre el examen y la entrega del informe era alto y dependía de procesos manuales.",
    solucion:
      "Desarrollamos un portal clínico completo con visor DICOM integrado, gestión centralizada de perfiles para médicos y tecnólogos médicos, y digitalización completa de los flujos de atención. El sistema corre en producción gestionando la operación clínica diaria.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "DICOM.js"],
    estado: "En producción",
    año: "2025",
    accentColor: "#10b981",
  },
  {
    slug: "patio-curauma",
    sector: "Retail · Fidelización",
    cliente: "Patio Curauma",
    titulo: "App de fidelización con Google Wallet",
    descripcion:
      "PWA instalable sin pasar por las tiendas de aplicaciones. Sellos digitales, canje de premios, Google Wallet, directorio de emprendedores con mapa interactivo, notificaciones push con IA y programa de referidos. Tres paneles: socios, vendedores y administración.",
    problema:
      "Sin sistema de fidelización digital, las visitas recurrentes dependían de factores externos y no había mecanismo para medir engagement, recompensar clientes frecuentes ni comunicarse directamente con ellos. Los emprendedores del patio tampoco tenían visibilidad de su actividad de ventas.",
    solucion:
      "PWA instalable en Android e iOS sin pasar por las tiendas de aplicaciones. Para socios: tarjeta de sellos digital, canje de premios, Google Wallet, directorio con mapa interactivo, notificaciones push y programa de referidos. Para vendedores: panel de escaneo QR, historial de ventas y perfil público. Para administración: métricas globales, gestión de usuarios y notificaciones automáticas generadas con IA (Gemini) enviadas en horarios estratégicos.",
    stack: ["Next.js", "Firebase", "PWA", "Google Wallet API", "Gemini AI"],
    estado: "En producción",
    año: "2025",
    accentColor: "#f59e0b",
    features: [
      {
        titulo: "Para los Socios",
        items: [
          "Tarjeta digital de sellos — acumula sellos por cada compra en locales participantes",
          "Canje de premios — canjea tus sellos por recompensas exclusivas desde la app",
          "Google Wallet — guarda tu tarjeta de socio en la billetera digital de tu teléfono",
          "Directorio de emprendedores — explora todos los locales con perfiles, fotos y descripción",
          "Mapa interactivo — encuentra locales con geolocalización en tiempo real",
          "Notificaciones push — recibe ofertas y novedades personalizadas en tu pantalla",
          "Programa de referidos — invita amigos y gana sellos cuando se registran",
          "Buzón de sugerencias — envía comentarios directamente al equipo",
        ],
      },
      {
        titulo: "Para los Emprendedores",
        items: [
          "Panel de vendedor — escanea el QR del cliente para otorgar sellos al instante",
          "Historial de ventas — registro completo de cada transacción realizada",
          "Perfil público — vitrina digital dentro del directorio de la app",
          "Validación de canjes — confirma o rechaza canjes de premios de tus clientes",
        ],
      },
      {
        titulo: "Para la Administración",
        items: [
          "Panel del Director — métricas globales: socios activos, sellos emitidos, canjes y actividad por local",
          "Panel del Moderador — gestión completa de usuarios, roles, premios y configuración del programa",
          "Notificaciones automáticas con IA — Gemini genera mensajes persuasivos y los envía en horarios estratégicos",
          "Radar de anomalías — detecta comportamientos sospechosos en tiempo real",
        ],
      },
    ],
  },
  {
    slug: "diego-thompson",
    sector: "EdTech · Educación",
    cliente: "Colegio Diego Thompson",
    titulo: "Portal institucional y automatización de pagos (PWA)",
    descripcion:
      "Portal institucional con experiencia PWA (instalable, offline-first) y motor de automatización de pagos para colegiaturas y eventos escolares. Comunicación familia-colegio centralizada.",
    problema:
      "Las comunicaciones familia-colegio llegaban por canales dispersos (WhatsApp personal, circulares físicas, correo sin estructura), y los pagos de mensualidades se procesaban manualmente con alto índice de mora y sin visibilidad de estado.",
    solucion:
      "Portal institucional PWA instalable con calendario escolar, módulo de comunicados y motor de pagos automatizado integrado a Webpay. Las familias reciben notificaciones, pagan online y acceden al portal desde su teléfono como si fuera una app nativa.",
    stack: ["Next.js", "PWA", "Webpay", "PostgreSQL"],
    estado: "En producción",
    año: "2025",
    accentColor: "#3b82f6",
  },
  {
    slug: "barberia-ferraza",
    sector: "Belleza · Reservas",
    cliente: "Barbería Ferraza",
    titulo: "Reservas 24/7 + club de fidelidad",
    descripcion:
      "Sistema de reservas de turnos online, gestión de clientes y trabajadores, y club de fidelidad integrado. Disponibilidad 24/7 con confirmaciones automatizadas vía WhatsApp.",
    problema:
      "Las reservas se gestionaban exclusivamente por WhatsApp personal, sin posibilidad de agendar fuera del horario de atención. Sin sistema de gestión de múltiples barberos, el dueño operaba como cuello de botella.",
    solucion:
      "Plataforma de reservas 24/7 con gestión de agenda por barbero, confirmaciones y recordatorios automáticos por WhatsApp Business, club de fidelidad integrado y cobro online mediante Webpay.",
    stack: ["Next.js", "PostgreSQL", "WhatsApp Business API", "Webpay"],
    estado: "En producción",
    año: "2025",
    accentColor: "#8b5cf6",
  },
  {
    slug: "barberia-elegance",
    sector: "Belleza · Reservas",
    cliente: "Barbería Elegance",
    titulo: "Agenda online y gestión de barberos",
    descripcion:
      "Misma base tecnológica que Ferraza, adaptada al flujo de Elegance: agenda 24/7, gestión de barberos, programa de clientes frecuentes y métricas operativas.",
    problema:
      "Mismo patrón que Ferraza: agenda manual por WhatsApp, sin visibilidad de la carga de trabajo por barbero y sin métricas operativas para tomar decisiones sobre el negocio.",
    solucion:
      "Sistema de agenda online adaptado al flujo específico de Elegance, con gestión de equipo, programa de clientes frecuentes y dashboard de métricas operativas en tiempo real.",
    stack: ["Next.js", "PostgreSQL", "WhatsApp Business API", "Webpay"],
    estado: "En producción",
    año: "2025",
    accentColor: "#f43f5e",
  },
];

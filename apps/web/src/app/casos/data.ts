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
      "Sistema de sellos digitales con integración nativa a Google Wallet. Recompensas, gamificación y push notifications para impulsar visitas recurrentes en el centro comercial.",
    problema:
      "Sin sistema de fidelización digital, las visitas recurrentes dependían únicamente de factores externos. No había mecanismo para medir engagement, recompensar a clientes frecuentes ni generar comunicación directa con ellos.",
    solucion:
      "App móvil con integración nativa a Google Wallet: sellos digitales acumulables, gamificación, notificaciones push y reportes de comportamiento de visitas. Todo el flujo de fidelización sin fricción desde el teléfono del cliente.",
    stack: ["React Native", "Google Wallet API", "Node.js", "Firebase"],
    estado: "En producción",
    año: "2025",
    accentColor: "#f59e0b",
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

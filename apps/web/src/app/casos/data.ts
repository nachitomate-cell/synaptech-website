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
    titulo: "Dashboard clínico con visor DICOM y gestión de flujos",
    descripcion:
      "Plataforma clínica integral que digitaliza toda la operación de ViñaMed: gestión de pacientes, agendamiento, visor DICOM integrado con Cornerstone.js, generación de informes en PDF y comunicación automatizada por correo. Cinco roles de usuario, dos layouts diferenciados y doce módulos operando en producción.",
    problema:
      "ViñaMed operaba con fichas clínicas en papel y reportes ecográficos distribuidos por correo sin trazabilidad. No existía una herramienta centralizada para que médicos, tecnólogos y administración coordinaran la atención: los turnos se gestionaban por WhatsApp, los informes se enviaban manualmente y no había historial de pacientes consolidado. El tiempo entre el examen y la entrega del informe dependía completamente de procesos manuales.",
    solucion:
      "Construimos un dashboard clínico completo con React 18 + Vite y Firebase como backend en tiempo real. Cornerstone.js permite visualizar estudios DICOM directamente en el navegador; jsPDF genera los informes firmados listos para entregar. Cloud Functions de Firebase automatizan el envío de confirmaciones y reportes por correo vía Resend. El sistema tiene cinco roles diferenciados (Superadmin, Admin, Médico, Tecnólogo Médico, Paciente) y dos layouts de interfaz según el perfil. Doce módulos en producción cubren desde el agendamiento y la agenda del médico hasta el historial clínico completo del paciente.",
    stack: ["React 18", "Vite", "Firebase", "Firestore", "Cloud Functions", "Cornerstone.js", "jsPDF", "Resend"],
    estado: "En producción",
    año: "2025",
    accentColor: "#10b981",
    features: [
      {
        titulo: "Módulos del sistema (12 en producción)",
        items: [
          "Dashboard principal — métricas del día: citas, ingresos, ocupación por médico",
          "Agenda del médico — vista semanal con slots de disponibilidad y estado de cada cita",
          "Agendamiento — flujo de 4 pasos para crear citas con selección de médico, servicio y hora",
          "Gestión de pacientes — base de datos completa con historial de visitas y datos de contacto",
          "Historial clínico — registro de cada atención con notas, diagnóstico y documentos adjuntos",
          "Visor DICOM — visualización de estudios ecográficos directamente en el navegador con Cornerstone.js",
          "Generación de informes — PDF firmado generado con jsPDF, listo para entregar o enviar por correo",
          "Panel de tecnólogos médicos — gestión de turnos, carga de estudios DICOM y estado de exámenes",
          "Panel administrativo — control de médicos, servicios, horarios y configuración del centro",
          "Notificaciones automáticas — Cloud Functions envían confirmaciones y recordatorios vía Resend",
          "Panel del paciente — acceso a sus citas, informes y resultados de exámenes",
          "Reportes de negocio — ingresos, ocupación y métricas de retención por período",
        ],
      },
      {
        titulo: "Roles y accesos",
        items: [
          "Superadmin — acceso total al sistema, configuración global y gestión de cuentas",
          "Admin — gestión operativa: médicos, agendas, pacientes y reportes del centro",
          "Médico — agenda personal, historial de sus pacientes e informes propios",
          "Tecnólogo Médico — carga de estudios DICOM, gestión de exámenes y estado de procesamiento",
          "Paciente — portal propio con citas activas, historial e informes descargables",
        ],
      },
      {
        titulo: "Infraestructura y automatizaciones",
        items: [
          "Firebase Realtime + Firestore — datos en tiempo real con reglas de seguridad por rol",
          "5 Cloud Functions serverless — confirmaciones de cita, recordatorios 24h antes, entrega de informes",
          "Resend — envío transaccional de correos con plantillas HTML personalizadas",
          "Cornerstone.js — visor DICOM nativo en el navegador, sin plugins ni software externo",
          "jsPDF — generación de informes clínicos con firma digital y logo del centro",
          "Dos layouts de interfaz — clínico (médicos y tecnólogos) y administrativo (admin y superadmin)",
        ],
      },
    ],
  },
  {
    slug: "patio-curauma",
    sector: "Retail · Fidelización",
    cliente: "Patio Curauma",
    titulo: "Plataforma de fidelización para centro comercial",
    descripcion:
      "Ecosistema digital completo para Patio Curauma: PWA instalable sin pasar por las tiendas de aplicaciones, sellos digitales, canje de premios, directorio de emprendedores con mapa interactivo, notificaciones con IA, programa de referidos y tres paneles diferenciados para socios, vendedores y administración.",
    problema:
      "Sin sistema de fidelización digital, las visitas recurrentes dependían de factores externos y no había mecanismo para medir engagement, recompensar clientes frecuentes ni comunicarse directamente con ellos. Los emprendedores del patio tampoco tenían visibilidad de su actividad de ventas.",
    solucion:
      "La solución no es un feature — es un ecosistema. Una PWA instalable en Android e iOS que conecta tres actores: los socios acumulan sellos y canjean premios sin descargar nada; los vendedores escanean QR, ven su historial y gestionan su perfil público; la administración tiene métricas globales, control de roles y un motor de notificaciones con IA (Gemini) que genera mensajes persuasivos y los envía en horarios estratégicos. Google Wallet es una pieza del sistema, no el sistema.",
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
    slug: "plataforma-belleza",
    sector: "Belleza · SaaS Multi-tenant",
    cliente: "Elegance · Ferraza · Gitana Nails",
    titulo: "SaaS multi-tenant para barberías y salones",
    descripcion:
      "Una sola plataforma que sirve a tres negocios con marcas, equipos y servicios completamente distintos. Agenda pública, dashboard con +20 módulos, 15+ automatizaciones serverless y BarberTV para la sala de espera. Arquitectura multi-tenant sobre Firebase: un nuevo local puede estar operativo en horas.",
    problema:
      "Tres negocios de belleza en la Quinta Región operaban con WhatsApp, cuadernos y Excel para gestionar citas, clientes y equipos. Sin agenda digital, sin fidelización automatizada y sin datos de negocio, los dueños perdían horas diarias en coordinación manual. El desafío adicional: Elegance (barbería premium, estética dorada), Ferraza (barbería tradicional, diseño oscuro) y Gitana Nails (estudio de uñas, identidad femenina) tenían marcas completamente distintas — necesitaban una solución única que los contuviera a todos sin mezclar datos ni imagen.",
    solucion:
      "Plataforma SaaS multi-tenant sobre Firebase. Cada local opera con su propia marca, servicios, equipo y horarios, con datos completamente aislados. Un mismo codebase sirve a los tres negocios; un nuevo tenant puede estar activo en horas sin desarrollo adicional.",
    stack: ["React 18", "Firebase", "Firestore", "FCM", "Vercel", "PWA"],
    estado: "En producción",
    año: "2025",
    accentColor: "#c084fc",
    features: [
      {
        titulo: "Agenda pública sin fricción",
        items: [
          "Reservas en 4 pasos: servicio → profesional → fecha y hora → confirmación",
          "Calendario con disponibilidad en tiempo real, slots de 30 minutos",
          "Confirmación con resumen QR y enlace directo a WhatsApp del local",
          "Sin app que descargar, sin registro obligatorio para el cliente",
        ],
      },
      {
        titulo: "Panel de administración (+20 módulos)",
        items: [
          "Agenda semanal por barbero, base de clientes con historial de visitas",
          "Métricas de negocio: ingresos, ocupación, retención, ticket promedio",
          "Gestión de equipo con horarios y ausencias, catálogo con drag & drop",
          "Tienda de productos con stock, chat con clientes, registro de gastos",
          "Galería de trabajos (lookbook) y configuración de marca por local",
          "Panel instalable como PWA — funciona como app nativa en el celular del barbero",
        ],
      },
      {
        titulo: "15+ automatizaciones serverless",
        items: [
          "Notificación push al barbero en el momento que llega una reserva nueva",
          "Recordatorio automático al cliente 24 horas antes de la cita",
          "Sello de fidelidad acreditado automáticamente al completar cada cita",
          "Sello de cumpleaños enviado con felicitación push el día del cliente",
          "Recordatorio predictivo: si el cliente no tiene reserva cerca de su próxima fecha estimada de corte, el sistema le escribe solo — sin molestar si ya tiene cita",
          "Limpieza semanal de tokens de notificación inactivos (cron dominical 3am)",
        ],
      },
      {
        titulo: "BarberTV — señalética digital para la sala de espera",
        items: [
          "Vista fullscreen diseñada para el televisor del local",
          "Rota entre 4 slides animados: promoción del mes, galería del equipo, presentación de profesionales y turno en vivo",
          "Muestra quién está en sillón y quién sigue en tiempo real",
          "QR en pantalla para que los clientes en sala reserven directamente desde su celular",
        ],
      },
      {
        titulo: "Arquitectura multi-tenant",
        items: [
          "Tres tenants activos: Elegance (paleta dorada), Ferraza (plateada), Gitana Nails (magenta)",
          "Cada tenant se identifica por dominio o parámetro de URL",
          "Aislamiento de datos a nivel de reglas de seguridad Firestore, no de aplicación",
          "Un nuevo local puede estar operativo en horas sin desarrollo adicional",
        ],
      },
    ],
  },
];

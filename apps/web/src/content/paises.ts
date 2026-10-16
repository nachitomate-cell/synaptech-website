/* Versiones del sitio por país (09-10-2026). Viven en synaptechspa.cl/<código>,
   sin enlace desde el menú, fuera del sitemap y con noindex: son el link que se
   manda por WhatsApp a las barberías de cada país (desde el 16-10-2026 las cuatro
   están abiertas, con su precio en dólares y la conversión a su moneda). Cuando un país tenga su dominio (synaptech.pe,
   etc.), se apunta ese dominio a la misma página y se cambia `canonical`.

   Todo lo que dicen sale de lo que la plataforma ya hace fuera de Chile
   (PRs #1318, #1320, #1321, #1323 y #1327 de la plataforma, 08-10-2026): país
   por local, hora local, celulares con su prefijo, montos en la moneda del
   local, sin RUT, asistente en español neutro y sin lo chileno (SII, TUU,
   Webpay). El documento y la ley de datos solo se nombran donde están hechos
   (Perú: DNI y Ley N.° 29733).

   Precio de validación fuera de Chile, decidido por Ignacio el 08-10-2026:
   US$15 (agenda + club + recordatorios) y US$20 (+ asistente IA por WhatsApp; US$39 desde el 16-10),
   con 2 meses gratis. No es el precio de régimen. */

export type CodigoPais = "pe" | "co" | "mx" | "ar";

export type Pais = {
  codigo: CodigoPais;
  nombre: string;
  bandera: string;
  /** "piloto" = abierto, ya se les escribe a barberías del país; "pronto" = solo idea. */
  estado: "piloto" | "pronto";
  dominioFuturo: string;
  moneda: string;
  hora: string;
  prefijo: string;
  ciudades: string;
  /** Agendas que más usan los locales del país (relevamiento del 08/09-10-2026). */
  competencia: string;
  documento?: string;
  leyDatos?: string;
  /** Mensajes de WhatsApp al mes por local para confirmaciones y recordatorios (vía
      oficial; Meta cobra según el país del cliente). Decisión del 10-10-2026: un cupo,
      nunca "incluidos" ni "ilimitados"; pasado el cupo, más mensajes al costo.
      16-10-2026: en Perú y Argentina no se publica cifra (solo "confirmaciones y
      recordatorios por WhatsApp"). */
  cupoWhatsApp?: number;
};

export const PAISES: Record<CodigoPais, Pais> = {
  pe: {
    codigo: "pe", nombre: "Perú", bandera: "🇵🇪", estado: "piloto", dominioFuturo: "synaptech.pe",
    moneda: "soles (S/)", hora: "hora de Lima", prefijo: "+51", ciudades: "Lima",
    competencia: "Fresha", documento: "DNI",
    leyDatos: "Ley N.° 29733, de Protección de Datos Personales",
  },
  co: {
    codigo: "co", nombre: "Colombia", bandera: "🇨🇴", estado: "piloto", dominioFuturo: "synaptech.com.co",
    moneda: "pesos colombianos", hora: "hora de Bogotá", prefijo: "+57", ciudades: "Bogotá y Medellín",
    competencia: "Fresha o Weibook", cupoWhatsApp: 1000,
  },
  mx: {
    codigo: "mx", nombre: "México", bandera: "🇲🇽", estado: "piloto", dominioFuturo: "synaptech.mx",
    moneda: "pesos mexicanos", hora: "hora del centro de México", prefijo: "+52", ciudades: "Ciudad de México y Querétaro",
    competencia: "Fresha", cupoWhatsApp: 200,
  },
  ar: {
    codigo: "ar", nombre: "Argentina", bandera: "🇦🇷", estado: "piloto", dominioFuturo: "synaptech.com.ar",
    moneda: "pesos argentinos", hora: "hora de Buenos Aires", prefijo: "+54", ciudades: "Buenos Aires, Córdoba y Rosario",
    competencia: "AgendaPro o Fresha",
  },
};

/* Precios para Latinoamérica, decididos por Ignacio el 09-10-2026 (reemplazan
   los de validación del 08-10). Cobro en dólares con tarjeta; 2 meses gratis y
   la tarjeta se pide al final del período gratis, con aviso a los 45 días.
   Anual = 10 meses pagados por 12. Sin cobro por profesional. */
/** Línea genérica del plan; en la página de cada país se reemplaza por la suya. */
export const WA_CUPO = "Confirmaciones y recordatorios por WhatsApp";
const miles = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const incluyeEnPais = (d: string, p: Pais) =>
  d === WA_CUPO && p.cupoWhatsApp ? `Trae ${miles(p.cupoWhatsApp)} mensajes de WhatsApp al mes para confirmaciones y recordatorios` : d;
/** "Colombia 1.000, México 200; en Perú y Argentina, sin cifra publicada" */
export const cuposWhatsApp = () => {
  const ps = Object.values(PAISES);
  const con = ps.filter((p) => p.cupoWhatsApp).map((p) => `${p.nombre} ${miles(p.cupoWhatsApp!)}`).join(", ");
  const sin = ps.filter((p) => !p.cupoWhatsApp).map((p) => p.nombre).join(" y ");
  return sin ? `${con}; en ${sin}, sin cifra publicada` : con;
};

/* 16-10-2026 (Ignacio): el asistente con IA corre en nuestro servidor de WhatsApp
   (una sesión por local) y fuera de Chile no era rentable a US$20. Sube a US$39 y
   se abre a pocos locales: la plataforma frena la vinculación pasado el cupo
   (functions/lib/cupo-ia-extranjero.js). Quien ya tenía otro precio lo conserva. */
export const PLANES_LATAM: {
  id: string; nombre: string; precio: number; anual: number; popular?: boolean; cupos?: boolean;
  descripcion: string; incluye: string[];
}[] = [
  {
    id: "agenda", nombre: "Agenda", precio: 15, anual: 150, popular: true,
    descripcion: "Para ordenar el local y que los clientes vuelvan.",
    incluye: [
      "Página de reservas con tu marca",
      "Panel completo: agenda, caja, clientes, comisiones e informes",
      "Tarjeta de sellos en Apple Wallet y Google Wallet",
      WA_CUPO,
      "Sin cobro por barbero: suma a todo tu equipo",
    ],
  },
  {
    id: "asistente", nombre: "Agenda + IA", precio: 39, anual: 390, cupos: true,
    descripcion: "Todo el plan Agenda, más el asistente con IA que responde el WhatsApp y agenda solo. Cupos limitados por país.",
    incluye: [
      "Todo el plan Agenda",
      "Syna, el asistente con IA, en el WhatsApp de tu local",
      "Responde precios y horarios, y agenda solo",
      "Hasta 300 conversaciones al mes (una conversación = un cliente durante 24 h)",
      "Te pasa la conversación cuando hace falta",
    ],
  },
];

/* Cada sede adicional: la primera paga su plan y cada sede extra suma esto. */
export const SEDE_ADICIONAL_LATAM = { mes: 10, anual: 100 };

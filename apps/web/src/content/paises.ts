/* Versiones del sitio por país (09-10-2026). Por ahora son una IDEA DE
   EXPANSIÓN: viven en synaptechspa.cl/<código>, sin enlace desde el menú, fuera
   del sitemap y con noindex. Cuando un país tenga su dominio (synaptech.pe,
   etc.), se apunta ese dominio a la misma página y se cambia `canonical`.

   Todo lo que dicen sale de lo que la plataforma ya hace fuera de Chile
   (PRs #1318, #1320, #1321, #1323 y #1327 de la plataforma, 08-10-2026): país
   por local, hora local, celulares con su prefijo, montos en la moneda del
   local, sin RUT, asistente en español neutro y sin lo chileno (SII, TUU,
   Webpay). El documento y la ley de datos solo se nombran donde están hechos
   (Perú: DNI y Ley N.° 29733).

   Precio de validación fuera de Chile, decidido por Ignacio el 08-10-2026:
   US$15 (agenda + club + recordatorios) y US$20 (+ asistente IA por WhatsApp),
   con 2 meses gratis. No es el precio de régimen. */

export type CodigoPais = "pe" | "co" | "mx" | "ar";

export type Pais = {
  codigo: CodigoPais;
  nombre: string;
  bandera: string;
  /** "piloto" = ya hay conversaciones con locales; "pronto" = solo idea. */
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
};

export const PAISES: Record<CodigoPais, Pais> = {
  pe: {
    codigo: "pe", nombre: "Perú", bandera: "🇵🇪", estado: "piloto", dominioFuturo: "synaptech.pe",
    moneda: "soles (S/)", hora: "hora de Lima", prefijo: "+51", ciudades: "Lima",
    competencia: "Fresha", documento: "DNI",
    leyDatos: "Ley N.° 29733, de Protección de Datos Personales",
  },
  co: {
    codigo: "co", nombre: "Colombia", bandera: "🇨🇴", estado: "pronto", dominioFuturo: "synaptech.com.co",
    moneda: "pesos colombianos", hora: "hora de Bogotá", prefijo: "+57", ciudades: "Bogotá y Medellín",
    competencia: "Fresha o Weibook",
  },
  mx: {
    codigo: "mx", nombre: "México", bandera: "🇲🇽", estado: "pronto", dominioFuturo: "synaptech.mx",
    moneda: "pesos mexicanos", hora: "hora del centro de México", prefijo: "+52", ciudades: "Ciudad de México y Querétaro",
    competencia: "Fresha",
  },
  ar: {
    codigo: "ar", nombre: "Argentina", bandera: "🇦🇷", estado: "pronto", dominioFuturo: "synaptech.com.ar",
    moneda: "pesos argentinos", hora: "hora de Buenos Aires", prefijo: "+54", ciudades: "Buenos Aires, Córdoba y Rosario",
    competencia: "AgendaPro o Fresha",
  },
};

/* Precios para Latinoamérica, decididos por Ignacio el 09-10-2026 (reemplazan
   los de validación del 08-10). Cobro en dólares con tarjeta; 2 meses gratis y
   la tarjeta se pide al final del período gratis, con aviso a los 45 días.
   Anual = 10 meses pagados por 12. Sin cobro por profesional. */
export const PLANES_LATAM = [
  {
    id: "agenda", nombre: "Agenda", precio: 15, anual: 150,
    descripcion: "Para ordenar el local y que los clientes vuelvan.",
    incluye: [
      "Página de reservas con tu marca",
      "Panel completo: agenda, caja, clientes, comisiones e informes",
      "Club de sellos con Apple Wallet y Google Wallet",
      "Recordatorios por WhatsApp",
      "Profesionales ilimitados",
    ],
  },
  {
    id: "asistente", nombre: "Agenda + IA", precio: 20, anual: 200, popular: true,
    descripcion: "Todo el plan Agenda, más el asistente con IA que responde el WhatsApp y agenda solo.",
    incluye: [
      "Todo el plan Agenda",
      "Syna, el asistente con IA, en el WhatsApp de tu local",
      "Responde precios y horarios, y agenda solo",
      "Te pasa la conversación cuando hace falta",
    ],
  },
];

/* Cada sede adicional: la primera paga su plan y cada sede extra suma esto. */
export const SEDE_ADICIONAL_LATAM = { mes: 10, anual: 100 };

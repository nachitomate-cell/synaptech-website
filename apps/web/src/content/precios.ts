/* Precios públicos del sitio. ESPEJO de la lista oficial de la plataforma:
   admin-panel/src/lib/precios.js del repo Barberia-Elegance (leída el
   09-10-2026). Si cambia allá, cambia acá (el JSON-LD de layout.tsx sale de acá).

   Todo es NETO en CLP; el IVA se suma encima.
   - Profesionales ilimitados, caja/comisiones/métricas y la tarjeta Wallet van
     en TODOS los planes (Wallet desde el 30-09-2026).
   - Los planes con asistente traen 200 conversaciones al mes
     (CONV_INCLUIDAS_PLAN); el Full, 400. Las citas agendadas son ilimitadas.
   - Bolsas de avisos por WhatsApp: catálogo vivo en _system/whatsapp_notif
     (100/$1.990 · 300/$5.990 · 1.000/$19.990 + IVA desde el 10-10-2026, al costo
     de Meta; antes 50/$3.990 · 150/$9.990 · 400/$19.990). */

/* 09-10-2026: crea.synaptechspa.cl ahora redirige a bioo.cl/agenda (el alta
   gratis con marca bioo, PR #1360 de la plataforma). Mientras el plan Gratis
   está en desarrollo, los botones de este sitio van a la página de alta de
   SynapTech, que deja al local en el pipeline (synaptechCrearLead). */
export const SIGNUP = "https://empieza.synaptechspa.cl/";

export const fmt = (n: number) => "$" + n.toLocaleString("es-CL");

/** Bolsas de avisos por la vía OFICIAL de WhatsApp, netas (espejo de
    _system/whatsapp_notif.bolsas, 10-10-2026). */
export const BOLSAS_WA = [{ avisos: 100, precio: 1990 }, { avisos: 300, precio: 5990 }, { avisos: 1000, precio: 19990 }];
export const bolsasWaTexto = () => BOLSAS_WA.map((b) => `${b.avisos.toLocaleString("es-CL")} por ${fmt(b.precio)}`).join(", ").replace(/, ([^,]*)$/, " o $1") + " + IVA";

export type Plan = {
  id: "basico" | "pro" | "full";
  nombre: string;
  sub: string;
  mes: number;
  descripcion: string;
  destacados: string[];
  popular?: boolean;
};

export const PLANES: Plan[] = [
  {
    id: "basico",
    nombre: "Básico",
    sub: "Agenda, caja y club",
    mes: 29900,
    descripcion: "Todo el panel para ordenar tu local: reservas online, caja, comisiones y un club que hace volver a tus clientes.",
    destacados: [
      "Profesionales ilimitados",
      "Agenda online 24/7 con tu página de reservas",
      "Caja, comisiones y métricas",
      "Club de fidelidad con tarjeta en Google Wallet y Apple Wallet",
    ],
  },
  {
    id: "pro",
    nombre: "Pro",
    sub: "Con asistente IA",
    mes: 49900,
    popular: true,
    descripcion: "Todo el Básico, más Syna: el asistente con IA que responde y agenda por WhatsApp en el número de tu local.",
    destacados: [
      "Todo lo del plan Básico",
      "Asistente IA por WhatsApp",
      "200 conversaciones al mes, citas ilimitadas",
      "Plan anual: $399.000 + IVA (equivale a 8 meses)",
    ],
  },
  {
    id: "full",
    nombre: "Full",
    sub: "WhatsApp e Instagram",
    mes: 69900,
    descripcion: "Todo el Pro, y el asistente también atiende los mensajes directos de Instagram.",
    destacados: [
      "Todo lo del plan Pro",
      "Asistente IA también en Instagram",
      "400 conversaciones al mes entre los dos canales",
    ],
  },
];

export const ANUAL = { anio: 399000, equivaleMeses: 8, base: "Pro" };

/* Tabla comparativa: true = incluido, false = no, string = detalle. */
export type Fila = { label: string; ayuda?: string; basico: boolean | string; pro: boolean | string; full: boolean | string };
export type Grupo = { titulo: string; filas: Fila[] };

export const COMPARATIVA: Grupo[] = [
  {
    titulo: "Agenda y reservas",
    filas: [
      { label: "Profesionales", basico: "Ilimitados", pro: "Ilimitados", full: "Ilimitados" },
      { label: "Página de reservas online 24/7", basico: true, pro: true, full: true },
      { label: "Agenda por profesional y por sucursal", basico: true, pro: true, full: true },
      { label: "App para el equipo (App Store y Google Play)", basico: true, pro: true, full: true },
      { label: "Bloqueos, colaciones y horario por profesional", basico: true, pro: true, full: true },
    ],
  },
  {
    titulo: "Cobros y finanzas",
    filas: [
      { label: "Caja diaria con cierre y cuadratura", basico: true, pro: true, full: true },
      { label: "Comisiones y liquidación por profesional", ayuda: "PDF, Excel y archivo de nómina para el banco", basico: true, pro: true, full: true },
      { label: "Pago online al reservar (Mercado Pago)", ayuda: "La comisión del medio de pago la cobra el proveedor", basico: true, pro: true, full: true },
      { label: "Máquina POS TUU integrada a la cita", basico: true, pro: true, full: true },
      { label: "Métricas del negocio y exportar a Excel", basico: true, pro: true, full: true },
      { label: "Boletas automáticas ante el SII (arriendo de sillón)", basico: "Adicional", pro: "Adicional", full: "Adicional" },
    ],
  },
  {
    titulo: "Clientes y fidelización",
    filas: [
      { label: "Ficha de cada cliente con su historial", basico: true, pro: true, full: true },
      { label: "Club de sellos, premios y rangos", basico: true, pro: true, full: true },
      { label: "Tarjeta del club en Google Wallet y Apple Wallet", basico: true, pro: true, full: true },
      { label: "Gift cards", basico: true, pro: true, full: true },
    ],
  },
  {
    titulo: "Asistente con IA (Syna)",
    filas: [
      { label: "Responde y agenda por WhatsApp", basico: "Adicional", pro: true, full: true },
      { label: "Responde y agenda por Instagram", basico: "Adicional", pro: "Adicional", full: true },
      { label: "Conversaciones al mes", ayuda: "Las citas agendadas son ilimitadas", basico: false, pro: "200", full: "400" },
      { label: "Bandeja compartida para tu equipo", basico: "Con el asistente", pro: true, full: true },
    ],
  },
  {
    titulo: "Acompañamiento",
    filas: [
      { label: "Mudanza desde otra agenda sin costo", ayuda: "Clientes, servicios, productos y equipo", basico: true, pro: true, full: true },
      { label: "Soporte directo por WhatsApp", basico: true, pro: true, full: true },
      { label: "Sin permanencia: te vas cuando quieras con tus datos", basico: true, pro: true, full: true },
    ],
  },
];

export type Adicional = { nombre: string; desc: string; precio: string; nota?: string };

export const ADICIONALES: Adicional[] = [
  { nombre: "Facturación automática", desc: "Para arriendo de sillón: la boleta de honorarios de cada profesional y la boleta del local salen solas al cerrar la cita.", precio: "$29.900 / mes", nota: "Instalación $39.000, una vez" },
  { nombre: "Asistente IA por WhatsApp", desc: "Para el plan Básico: Syna responde y agenda en el número de tu local.", precio: "desde $19.900 / mes", nota: "200 conversaciones al mes" },
  { nombre: "Asistente en Instagram", desc: "El asistente también responde y agenda por mensaje directo.", precio: "$19.900 / mes" },
  { nombre: "El asistente vende", desc: "Responde por tus productos con precio y stock, y se los aparta al cliente para su cita.", precio: "$9.900 / mes" },
  { nombre: "Reactivación IA", desc: "Recupera a los clientes que dejaron de venir con un mensaje a tiempo.", precio: "$9.900 / mes" },
  { nombre: "Avisos automáticos por WhatsApp", desc: "Confirmación y recordatorio de cada cita por la vía oficial de WhatsApp, con el nombre de tu local.", precio: "desde $1.990", nota: "Bolsas de 100, 300 o 1.000 avisos" },
];

/* Comparación con AgendaPro. Precios NETOS mensuales publicados en
   agendapro.com/cl/planes, verificados el 08-10-2026 (captura en
   Desktop/06_Videos/respaldos/agendapro-basico-9-profesionales-2026-10-08.png):
   Individual $15.900 (1 profesional) · Básico $34.900 con 2 profesionales y
   $5.000 por cada profesional extra. Volver a medir antes de cambiar algo. */
export const AGENDAPRO = {
  fuente: "agendapro.com/cl/planes",
  fecha: "8 de octubre de 2026",
  precio: (profesionales: number) => (profesionales <= 1 ? 15900 : 34900 + 5000 * (profesionales - 2)),
  plan: (profesionales: number) => (profesionales <= 1 ? "Individual" : "Básico"),
};

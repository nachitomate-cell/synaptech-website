/* Precios públicos del sitio. ESPEJO de la lista oficial de la plataforma:
   admin-panel/src/lib/precios.js del repo Barberia-Elegance. Si cambia allá,
   cambia acá (el JSON-LD del sitio y el de /precios salen de acá).

   ESCALERA DE NOVIEMBRE 2026 (01-11-2026, Ignacio). Dos ejes:
     · Para quién: Independiente (1 profesional) o Local (profesionales ilimitados).
     · Con o sin IA: el plan "IA" suma el asistente de WhatsApp, Syna tu
       secretaria y "el asistente vende".
   Y arriba, Todo Incluido: Local IA + boletas ante el SII + Instagram +
   Reactivación IA + 500 conversaciones + dominio propio.
   Nombres viejos: Básico = Local, Pro = Local IA. Home Studio ($14.900) y Full
   ($69.900) ya no se publican (los clientes actuales mantienen lo pactado).

   Todo es NETO en CLP; el IVA se suma encima.
   - "Todo el panel" va en TODOS los planes (TODO_EL_PANEL). Los módulos de
     equipo, desde Local (MODULOS_EQUIPO).
   - Las conversaciones del asistente tienen cupo (150 / 300 / 500 al mes). Si
     se acaban, el asistente NO se corta: se suman tramos de 100 a $9.900.
   - Bolsas de mensajes de WhatsApp (campañas): catálogo vivo en
     _system/whatsapp_notif (100/$1.990 · 300/$5.990 · 1.000/$19.990 + IVA).
   - NO prometer (no existe): Conversions API de Meta, conexión a GoHighLevel o
     CRM, recordatorios de WhatsApp en planes sin IA, "asistente sin tope". */

/* La agenda de autoservicio (bioo.cl/agenda). El alta principal es
   crear.synaptechspa.cl (30 días con el asistente): para links usar altaIA()
   o alta() de catalogo.ts (utm, no ?ref=). */
export const SIGNUP = "https://bioo.cl/agenda";

export const fmt = (n: number) => "$" + n.toLocaleString("es-CL");

/** Bolsas de mensajes por la vía OFICIAL de WhatsApp, netas (espejo de
    _system/whatsapp_notif.bolsas, 10-10-2026). Se usan para campañas. */
export const BOLSAS_WA = [{ avisos: 100, precio: 1990 }, { avisos: 300, precio: 5990 }, { avisos: 1000, precio: 19990 }];
export const bolsasWaTexto = () => BOLSAS_WA.map((b) => `${b.avisos.toLocaleString("es-CL")} por ${fmt(b.precio)}`).join(", ").replace(/, ([^,]*)$/, " o $1") + " + IVA";

export type PlanId = "independiente" | "independiente-ia" | "local" | "local-ia" | "todo-incluido";

export type Plan = {
  id: PlanId;
  nombre: string;
  /** Frase buscable para títulos, H2 y JSON-LD ("agenda para barbero independiente"). */
  seo: string;
  sub: string;
  mes: number;
  /** 1 o "ilimitados". */
  profesionales: 1 | "ilimitados";
  ia: boolean;
  /** Conversaciones del asistente al mes (planes IA). */
  conversaciones?: number;
  descripcion: string;
  destacados: string[];
  popular?: boolean;
};

export const PLANES: Plan[] = [
  {
    id: "independiente",
    nombre: "Independiente",
    seo: "agenda para barbero y profesional independiente",
    sub: "1 profesional, sin IA",
    mes: 9990,
    profesionales: 1,
    ia: false,
    descripcion: "Todo el panel para quien atiende solo: reserva online, caja, clientes, club en Wallet, tienda y tu página.",
    destacados: [
      "1 profesional",
      "Todo el panel: agenda, reserva online, caja y clientes",
      "Club de fidelidad en Google Wallet y Apple Wallet",
      "Tienda online, gift cards y link in bio",
    ],
  },
  {
    id: "independiente-ia",
    nombre: "Independiente IA",
    seo: "agenda con asistente IA para barbero independiente",
    sub: "1 profesional, con IA",
    mes: 24900,
    profesionales: 1,
    ia: true,
    conversaciones: 150,
    descripcion: "El plan Independiente, más el asistente con IA que responde y agenda en tu WhatsApp mientras atiendes.",
    destacados: [
      "Todo el plan Independiente",
      "Asistente IA de WhatsApp: 150 conversaciones al mes",
      "Syna, tu secretaria por WhatsApp",
      "El asistente vende tus productos",
    ],
  },
  {
    id: "local",
    nombre: "Local",
    seo: "agenda para barbería y salón con profesionales ilimitados",
    sub: "Equipo, sin IA",
    mes: 29900,
    profesionales: "ilimitados",
    ia: false,
    descripcion: "Todo el panel y los módulos de equipo, con profesionales ilimitados: comisiones, metas, finanzas y accesos por rol.",
    destacados: [
      "Profesionales ilimitados",
      "Todo el panel: agenda, reserva online, caja y club en Wallet",
      "Comisiones, liquidaciones y metas por profesional",
      "Finanzas, conciliación POS y accesos por rol",
    ],
  },
  {
    id: "local-ia",
    nombre: "Local IA",
    seo: "agenda con asistente IA para barberías y salones",
    sub: "Equipo, con IA",
    mes: 49900,
    profesionales: "ilimitados",
    ia: true,
    conversaciones: 300,
    popular: true,
    descripcion: "El plan Local, más el asistente con IA que responde y agenda en el WhatsApp de tu local.",
    destacados: [
      "Todo el plan Local, profesionales ilimitados",
      "Asistente IA de WhatsApp: 300 conversaciones al mes",
      "Syna, tu secretaria por WhatsApp",
      "El asistente vende tus productos",
    ],
  },
  {
    id: "todo-incluido",
    nombre: "Todo Incluido",
    seo: "agenda + IA + boletas SII en un solo plan",
    sub: "Agenda, IA y boletas",
    mes: 79900,
    profesionales: "ilimitados",
    ia: true,
    conversaciones: 500,
    descripcion: "El plan Local IA con boletas ante el SII, Instagram, Reactivación IA y tu dominio, sin adicionales.",
    destacados: [
      "Todo el plan Local IA",
      "Boletas y facturas ante el SII automáticas, sin instalación",
      "Asistente también en Instagram y Reactivación IA",
      "500 conversaciones al mes y dominio propio",
    ],
  },
];

export const plan = (id: PlanId) => PLANES.find((p) => p.id === id)!;
export const INDEPENDIENTE = plan("independiente");
export const INDEPENDIENTE_IA = plan("independiente-ia");
export const LOCAL = plan("local");
export const LOCAL_IA = plan("local-ia");
export const TODO_INCLUIDO = plan("todo-incluido");

/** "$29.900 + IVA" */
export const precioTexto = (p: Plan) => `${fmt(p.mes)} + IVA`;

export const ANUAL = { anio: 399000, equivaleMeses: 8, base: "Local IA" };

/* ── Adicionales ──────────────────────────────────────────────────────── */
export const PRECIO = {
  boletasLocal: 24900,
  boletasIndependiente: 12900,
  instagram: 19900,
  conversacionesExtra: 9900,
  secretaria: 9900,
  reactivacion: 9900,
  dominioAnio: 15000,
};

/* El ancla de Todo Incluido: lo que costaría armarlo por separado sobre Local IA. */
export const TODO_INCLUIDO_SEPARADO = LOCAL_IA.mes + PRECIO.boletasLocal + PRECIO.instagram + PRECIO.reactivacion; // 104.600
export const TODO_INCLUIDO_AHORRO = TODO_INCLUIDO_SEPARADO - TODO_INCLUIDO.mes; // 24.700

export type Adicional = { id: string; nombre: string; desc: string; precio: string; nota?: string };

export const ADICIONALES: Adicional[] = [
  { id: "boletas", nombre: "Boletas y facturas ante el SII", desc: "La boleta del local y la boleta de honorarios de cada profesional salen solas al cerrar la cita, directo ante el SII.", precio: `${fmt(PRECIO.boletasLocal)} / mes`, nota: `${fmt(PRECIO.boletasIndependiente)} en Independiente e Independiente IA. Incluidas en Todo Incluido. Sin costo de instalación` },
  { id: "instagram", nombre: "Asistente en Instagram", desc: "El asistente también responde y agenda por mensaje directo de Instagram.", precio: `${fmt(PRECIO.instagram)} / mes`, nota: "Para Independiente IA y Local IA. Incluido en Todo Incluido" },
  { id: "conversaciones", nombre: "Conversaciones extra", desc: "Si se acaba el cupo del mes, el asistente no se corta: se suma un tramo de 100 conversaciones.", precio: `${fmt(PRECIO.conversacionesExtra)} cada 100` },
  { id: "secretaria", nombre: "Syna, tu secretaria", desc: "Le escribes por WhatsApp, por texto o audio, y revisa tu agenda, te cuenta cuánto vendiste y te recuerda lo pendiente.", precio: `${fmt(PRECIO.secretaria)} / mes`, nota: "Para Independiente y Local. Incluida en los planes con IA" },
  { id: "reactivacion", nombre: "Reactivación IA", desc: "Detecta a los clientes que dejaron de venir y les escribe a tiempo para que vuelvan.", precio: `${fmt(PRECIO.reactivacion)} / mes`, nota: "Incluida en Todo Incluido" },
  { id: "dominio", nombre: "Dominio propio", desc: "Tu página de reservas en tu propia dirección .cl.", precio: `${fmt(PRECIO.dominioAnio)} / año`, nota: "Incluido en Todo Incluido" },
  { id: "campanas", nombre: "Mensajes de campaña por WhatsApp", desc: "La herramienta de campañas viene en todos los planes; los mensajes salen por la vía oficial de WhatsApp, con el nombre de tu local.", precio: `desde ${fmt(BOLSAS_WA[0].precio)}`, nota: `Bolsas de ${BOLSAS_WA.map((b) => b.avisos.toLocaleString("es-CL")).join(", ").replace(/, ([^,]*)$/, " o $1")} mensajes` },
];

/* ── Qué trae cada plan ───────────────────────────────────────────────────
   v: un valor por plan, en el orden de PLANES. true = incluido, false = no,
   string = detalle ("Adicional $9.900"). */
export type Fila = { label: string; ayuda?: string; v: [Celda, Celda, Celda, Celda, Celda] };
export type Celda = boolean | string;
export type Grupo = { titulo: string; nota?: string; filas: Fila[] };

const TODOS: Fila["v"] = [true, true, true, true, true];
const EQUIPO: Fila["v"] = [false, false, true, true, true];
const add = (n: number) => `Adicional ${fmt(n)}`;

/** "Todo el panel": lo que trae CUALQUIER plan (también lo lee el JSON-LD). */
export const TODO_EL_PANEL: Grupo[] = [
  {
    titulo: "Agenda y reservas",
    filas: [
      { label: "Profesionales", v: ["1", "1", "Ilimitados", "Ilimitados", "Ilimitados"] },
      { label: "Agenda online y página de reservas 24/7", v: TODOS },
      { label: "Clientes y fichas con su historial", v: TODOS },
      { label: "Servicios, horarios y bloqueos", v: TODOS },
      { label: "Lista de espera y lista negra", v: TODOS },
      { label: "App para el equipo (App Store y Google Play)", v: TODOS },
    ],
  },
  {
    titulo: "Cobros y caja",
    filas: [
      { label: "Caja y nueva venta", v: TODOS },
      { label: "Abonos online al reservar (Mercado Pago o Webpay)", ayuda: "La comisión del medio de pago la cobra el proveedor", v: TODOS },
      { label: "Por cobrar y fiados", v: TODOS },
      { label: "Gastos", v: TODOS },
      { label: "Productos e inventario", v: TODOS },
    ],
  },
  {
    titulo: "Fidelización",
    filas: [
      { label: "Tarjeta en Google Wallet y Apple Wallet con club de sellos, premios y rangos", v: TODOS },
      { label: "Gift cards y membresías", v: TODOS },
      { label: "Referidos y embajadores", v: TODOS },
      { label: "Sorteos", v: TODOS },
      { label: "Pedido automático de reseñas en Google", v: TODOS },
    ],
  },
  {
    titulo: "Vende y aparece en internet",
    filas: [
      { label: "Tienda online", v: TODOS },
      { label: "Eventos con entradas", v: TODOS },
      { label: "Academia y cursos", v: TODOS },
      { label: "Precios inteligentes", v: TODOS },
      { label: "Portafolio y antes y después", v: TODOS },
      { label: "Link in bio y ficha de Google", v: TODOS },
      { label: "Meta Pixel, Google Analytics 4 y Google Tag Manager", ayuda: "Medición de anuncios en el dominio de tu local", v: TODOS },
      { label: "Campañas de WhatsApp", ayuda: "Los mensajes van por bolsa, desde $1.990 + IVA por 100", v: TODOS },
    ],
  },
];

export const MODULOS_EQUIPO: Grupo = {
  titulo: "Módulos de equipo",
  nota: "Desde el plan Local",
  filas: [
    { label: "Comisiones y liquidaciones", ayuda: "PDF, Excel y archivo de nómina para el banco", v: EQUIPO },
    { label: "Métricas y metas por profesional", v: EQUIPO },
    { label: "Finanzas y estado de resultados", v: EQUIPO },
    { label: "Conciliación del POS (TUU)", v: EQUIPO },
    { label: "Pizarra walk-in y pantalla TV", v: EQUIPO },
    { label: "Checklist del local", v: EQUIPO },
    { label: "Accesos por rol", v: EQUIPO },
  ],
};

export const COMPARATIVA: Grupo[] = [
  ...TODO_EL_PANEL,
  MODULOS_EQUIPO,
  {
    titulo: "Asistente con IA",
    filas: [
      { label: "Asistente que responde y agenda por WhatsApp", ayuda: "Desde el número de tu local", v: [false, true, false, true, true] },
      { label: "Conversaciones al mes", ayuda: "Si se acaban, no se corta: tramos de 100 a $9.900 + IVA", v: [false, "150", false, "300", "500"] },
      { label: "Recordatorios de cita por WhatsApp", ayuda: "Con el asistente conectado al número del local, a clientes que lo autorizaron", v: [false, true, false, true, true] },
      { label: "Syna, tu secretaria por WhatsApp", v: [add(PRECIO.secretaria), true, add(PRECIO.secretaria), true, true] },
      { label: "El asistente vende tus productos", ayuda: "Es parte del asistente: solo en los planes con IA", v: [false, true, false, true, true] },
      { label: "Asistente en Instagram", v: [false, add(PRECIO.instagram), false, add(PRECIO.instagram), true] },
      { label: "Reactivación IA", v: [add(PRECIO.reactivacion), add(PRECIO.reactivacion), add(PRECIO.reactivacion), add(PRECIO.reactivacion), true] },
    ],
  },
  {
    titulo: "Boletas y dominio",
    filas: [
      { label: "Boletas y facturas ante el SII, automáticas", ayuda: "Sin costo de instalación", v: [add(PRECIO.boletasIndependiente), add(PRECIO.boletasIndependiente), add(PRECIO.boletasLocal), add(PRECIO.boletasLocal), true] },
      { label: "Dominio propio (.cl)", v: [`${fmt(PRECIO.dominioAnio)} al año`, `${fmt(PRECIO.dominioAnio)} al año`, `${fmt(PRECIO.dominioAnio)} al año`, `${fmt(PRECIO.dominioAnio)} al año`, true] },
    ],
  },
  {
    titulo: "Acompañamiento",
    filas: [
      { label: "Mudanza desde otra agenda sin costo", ayuda: "Clientes, servicios, productos y equipo", v: TODOS },
      { label: "Soporte directo por WhatsApp", v: TODOS },
      { label: "Sin permanencia: te vas cuando quieras con tus datos", v: TODOS },
    ],
  },
];

/* ── Cadena: 2 o más locales ──────────────────────────────────────────────
   Plan Local por local, más barato mientras más locales; la IA suma $20.000
   por local. */
export const CADENA = {
  tramos: [
    { desde: 1, hasta: 1, mes: 29900, texto: "1 local" },
    { desde: 2, hasta: 2, mes: 25900, texto: "2 locales" },
    { desde: 3, hasta: 5, mes: 22900, texto: "3 a 5 locales" },
    { desde: 6, hasta: Infinity, mes: 19900, texto: "6 o más locales" },
  ],
  ia: 20000,
};
export const precioCadena = (locales: number) => CADENA.tramos.find((t) => locales >= t.desde && locales <= t.hasta)!.mes;

/* ── Crecer: servicios que hace el equipo de SynapTech ────────────────────
   La inversión publicitaria la paga el local directo a Google o Meta, con su
   tarjeta. Sin permanencia. */
export type ServicioCrecer = { id: string; nombre: string; mes: number; desc: string; incluye: string[]; href?: string };
export const CRECER: ServicioCrecer[] = [
  { id: "presencia", nombre: "Presencia", mes: 24900, href: "/pagina-web-para-barberias", desc: "Tu página web propia con dominio .cl, tu ficha de Google optimizada y un informe cada mes.", incluye: ["Página web con dominio .cl", "Ficha de Google optimizada", "Informe mensual"] },
  { id: "google-ads", nombre: "Google Ads gestionado", mes: 49900, href: "/google-ads-para-barberias", desc: "Armamos y administramos tus campañas en Google para que te encuentren quienes buscan tu servicio cerca.", incluye: ["Armado de tus campañas en Google", "Administración y ajustes", "Medición con Google Analytics 4 y Tag Manager en tu dominio"] },
  { id: "meta-ads", nombre: "Meta Ads gestionado", mes: 49900, href: "/publicidad-instagram-facebook-barberias", desc: "Tus anuncios en Instagram y Facebook, armados y administrados por nuestro equipo.", incluye: ["Armado de tus anuncios en Instagram y Facebook", "Administración y ajustes", "Medición con Meta Pixel en tu dominio"] },
  { id: "combo-anuncios", nombre: "Combo Anuncios", mes: 79900, desc: "Google Ads y Meta Ads gestionados, juntos.", incluye: ["Google Ads gestionado", "Meta Ads gestionado"] },
  { id: "combo-crecer", nombre: "Combo Crecer total", mes: 99900, desc: "Presencia, Google Ads y Meta Ads gestionados.", incluye: ["Presencia", "Google Ads gestionado", "Meta Ads gestionado"] },
];
export const crecer = (id: string) => CRECER.find((s) => s.id === id)!;

/* ── Prueba gratis ────────────────────────────────────────────────────────
   Como lo dice el sitio desde el 21-10-2026: 30 días con el asistente en
   crear.synaptechspa.cl; 14 días sin el asistente en bioo.cl/agenda. Sin tarjeta. */
export const PRUEBA = { conIA: 30, sinIA: 14, plan: "Local IA" };

/* Comparación con AgendaPro. Precios NETOS mensuales publicados en
   agendapro.com/cl/planes, re-verificados el 01-11-2026 (tabla del selector:
   individual 1 = 15.900; basic 2 = 34.900, 3 = 39.900 … 9 = 69.900):
   Individual $15.900 (1 profesional) · Básico $34.900 con 2 profesionales y
   $5.000 por cada profesional extra. Volver a medir antes de cambiar algo. */
export const AGENDAPRO = {
  fuente: "agendapro.com/cl/planes",
  fecha: "1 de noviembre de 2026",
  precio: (profesionales: number) => (profesionales <= 1 ? 15900 : 34900 + 5000 * (profesionales - 2)),
  plan: (profesionales: number) => (profesionales <= 1 ? "Individual" : "Básico"),
};

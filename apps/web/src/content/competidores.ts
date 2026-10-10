/* Páginas "SynapTech vs <agenda>" (/comparar/<id>), hechas para aparecer cuando
   alguien busca a la competencia en Google ("agendapro precios", "alternativa a
   weibook"...).
   TODO dato de otra empresa sale de lo verificado en sus páginas públicas:
   devtools/guias-panel/sitio-web/comparar/competencia-2026-10-09.json y, para
   Novai, AgendaLibre, TuTurno, Booksy y Setmore, competencia-2026-10-10.json
   (+ capturas). Si un precio cambia, se vuelve a medir antes de tocar esto.
   Reglas:
   - Honestidad primero: si con pocos profesionales la otra es más barata, se
     dice. Una comparativa que esconde eso no la cree nadie.
   - Lo que no publican va como "No publicado", nunca como "No".
   - Logos: los oficiales de cada marca (public/competencia/, fuente en
     devtools/.../comparar/logos/logos.json). Marcas ajenas, uso solo para
     identificarlas en la comparación. */

import { PLANES_LATAM } from "./paises";

export type Precio = { valor: string; nota?: string };
export type Fila = { tema: string; ellos: string | null; nosotros: string };
export type Competidor = {
  id: string;
  nombre: string;
  logo?: string;
  /** "icono": el logo oficial no trae el nombre; se escribe al lado. */
  logoTipo?: "wordmark" | "icono";
  color: string;
  sitio: string;
  origen: string;
  dichoPorEllos?: string;
  modelo: string;
  /** Precio mensual con 1, 3, 6 y 9 profesionales (plan más barato que los admite). */
  precios: [Precio, Precio, Precio, Precio];
  notaPrecios: string;
  resumen: string;
  filas: Fila[];
  cuandoEllos: string;
  cuandoNosotros: string[];
  migracion: string;
  testimonio?: { cita: string[]; autor: string; rol: string; local: string; fecha: string };
  faq: { q: string; a: string }[];
  fuentes: { texto: string; url: string }[];
  /** Fecha en que se verificaron SUS datos (si no, FECHA_VERIFICACION). */
  verificado?: string;
  /** "¿Qué es X?" en una o dos frases neutras; si falta, se arma con origen y modelo. */
  queEs?: string;
  /** Cobra en dólares (TuTurno, Booksy, Setmore): nuestra columna muestra el
      precio fuera de Chile, con el de Chile en la nota. Lo lee gente de los dos lados. */
  enDolares?: boolean;
};

export const FECHA_VERIFICACION = "9 de octubre de 2026";

const NOSOTROS_PRECIO: Precio = { valor: "$29.900 + IVA", nota: "Básico, profesionales ilimitados" };

export const SYNAPTECH = {
  precios: [NOSOTROS_PRECIO, NOSOTROS_PRECIO, NOSOTROS_PRECIO, NOSOTROS_PRECIO] as [Precio, Precio, Precio, Precio],
  pro: "$49.900 + IVA",
};

const [AGENDA_LATAM, IA_LATAM] = PLANES_LATAM;
const NOSOTROS_USD: Precio = { valor: `US$${AGENDA_LATAM.precio}`, nota: `Fuera de Chile, profesionales ilimitados. En Chile, ${NOSOTROS_PRECIO.valor}` };

export const SYNAPTECH_USD = {
  precios: [NOSOTROS_USD, NOSOTROS_USD, NOSOTROS_USD, NOSOTROS_USD] as [Precio, Precio, Precio, Precio],
  pro: `US$${IA_LATAM.precio} fuera de Chile (${SYNAPTECH.pro} en Chile)`,
  ia: `US$${IA_LATAM.precio}`,
};

export const nosotrosDe = (c: Competidor) => (c.enDolares ? SYNAPTECH_USD : SYNAPTECH);

export const COMPETIDORES: Competidor[] = [
  {
    id: "agendapro", nombre: "AgendaPro", logo: "/competencia/agendapro.svg", logoTipo: "wordmark", color: "#812DF2", sitio: "agendapro.com",
    origen: "Chile, con operación en Latinoamérica",
    dichoPorEllos: "+30.000 negocios en Latinoamérica, según su página de planes",
    modelo: "Cobra por profesional: el plan Básico parte con 2 y suma $5.000 + IVA por cada uno más.",
    precios: [
      { valor: "$15.900 + IVA", nota: "Individual" },
      { valor: "$39.900 + IVA", nota: "Básico" },
      { valor: "$54.900 + IVA", nota: "Básico" },
      { valor: "$69.900 + IVA", nota: "Básico" },
    ],
    notaPrecios: "Leído en el selector de profesionales de su página de planes.",
    resumen: "Con un solo profesional, AgendaPro es más barato. Desde dos, SynapTech cuesta menos, y con 9 profesionales la diferencia es de $40.000 al mes: $480.000 al año.",
    filas: [
      { tema: "Cómo cobra", ellos: "Por profesional (+$5.000 + IVA sobre los 2 primeros)", nosotros: "Por local, con profesionales ilimitados" },
      { tema: "Confirmaciones por WhatsApp", ellos: "50 al mes en el Básico. En una reserva de prueba llegaron desde un número de AgendaPro", nosotros: "Desde el WhatsApp de tu local, que sigue funcionando en tu teléfono" },
      { tema: "Recordatorios por WhatsApp", ellos: "Desde $5.000 + IVA por 50 al mes", nosotros: "Bolsas desde $1.990 + IVA por 100" },
      { tema: "Asistente con IA que agenda", ellos: "Sofía; precio no publicado", nosotros: "Syna, incluida en el plan Pro ($49.900 + IVA)" },
      { tema: "Boletas de honorarios ante el SII", ellos: "Desde 1 UF + IVA al mes por cada RUT", nosotros: "$29.900 + IVA al mes por local; salen solas al cerrar la cita" },
      { tema: "Marketplace", ellos: "Comisión sobre la primera reserva de cada cliente nuevo (porcentaje no publicado)", nosotros: "Directorio de locales sin comisión por reserva" },
      { tema: "Tarjeta del club en Google Wallet y Apple Wallet", ellos: null, nosotros: "Incluida en todos los planes" },
    ],
    cuandoEllos: "Trabajas solo y buscas el plan más barato, o quieres un ecosistema grande con marketplace propio y varias integraciones.",
    cuandoNosotros: [
      "Tienes equipo: el precio no sube por cada profesional.",
      "Quieres que el asistente y los avisos salgan del WhatsApp de tu local.",
      "Tus profesionales boletean: la boleta de honorarios sale sola al cerrar la cita.",
    ],
    migracion: "La mayoría de los locales que se cambiaron a SynapTech venían de AgendaPro. Traemos tus servicios con precios y duraciones, tu equipo con sus horarios y tu lista de clientes, sin costo.",
    testimonio: {
      cita: [
        "Solo comentarte q va todo cuadrado servicios y ventas de productos,  las boletas de honorarios ok y boletas de ventas de productos igual",
        "Sabes q con agendapro no logramos eso, ya q ellos tenían un desface y siempre me generaba descuadre al cierre del mes",
        "Vamos super bien 👍",
      ],
      autor: "Danilo", rol: "Socio a cargo de la contabilidad", local: "El 10 Salón Masculino, Parral", fecha: "9 oct 2026",
    },
    faq: [
      { q: "¿Cuánto cuesta AgendaPro en 2026?", a: "Según su página de planes al 9 de octubre de 2026: Individual $15.900 + IVA al mes (1 profesional) y Básico $34.900 + IVA con 2 profesionales, más $5.000 + IVA por cada profesional adicional. Con 9 profesionales son $69.900 + IVA." },
      { q: "¿Cuál es la mejor alternativa a AgendaPro para una barbería con equipo?", a: "Una que no cobre por profesional. SynapTech cobra $29.900 + IVA por local con profesionales ilimitados, y el plan Pro ($49.900 + IVA) suma un asistente con IA que responde y agenda en el WhatsApp del local." },
      { q: "¿Pierdo mis clientes si me cambio de AgendaPro?", a: "No. Te mudamos gratis: servicios, precios, equipo y tu lista de clientes. El local sigue atendiendo mientras tanto." },
      { q: "¿Desde qué número le llegan los mensajes a mis clientes?", a: "En SynapTech, desde el WhatsApp de tu local, vinculado con un código QR. En una reserva de prueba en AgendaPro, la confirmación llegó desde un número de AgendaPro." },
    ],
    fuentes: [
      { texto: "AgendaPro: planes", url: "https://agendapro.com/cl/planes" },
      { texto: "AgendaPro: Sofía", url: "https://agendapro.com/cl/sofia-ia-recordatorios" },
      { texto: "AgendaPro: boleta de honorarios", url: "https://agendapro.com/cl/boleta-honorarios" },
      { texto: "AgendaPro: marketplace", url: "https://agendapro.com/cl/marketplace" },
    ],
  },
  {
    id: "weibook", nombre: "WeiBook", logo: "/competencia/weibook.svg", logoTipo: "wordmark", color: "#246BFE", sitio: "weibook.co",
    origen: "Startup latinoamericana con sede en Delaware, EE. UU. (dicho por ellos); soporte en hora de Colombia",
    modelo: "Cobra en dólares por tramos de profesionales, y cada función extra es un complemento de US$15 al mes.",
    queEs: "WeiBook (weibook.co) es una agenda online para salones y barberías de una startup latinoamericana que, según su sitio, tiene sede en Delaware, EE. UU., con soporte en hora de Colombia. Cobra en dólares por tramos de profesionales, y cada función extra es un complemento de US$15 al mes.",
    precios: [
      { valor: "US$15", nota: "HomeStudio" },
      { valor: "US$39", nota: "Ultra, solo con plan anual" },
      { valor: "US$39", nota: "Ultra, solo con plan anual" },
      { valor: "US$39", nota: "Ultra, solo con plan anual" },
    ],
    notaPrecios: "Precios en dólares; su página no dice si incluyen impuestos. El plan Ultra aplica al contratar el plan anual.",
    resumen: "WeiBook cobra en dólares y vende por separado lo que en SynapTech viene en el plan: el WhatsApp con número propio (US$15 al mes) y su IA, Wanda (US$50 al mes).",
    filas: [
      { tema: "Moneda", ellos: "Dólares estadounidenses", nosotros: "Pesos chilenos, más IVA" },
      { tema: "Contrato", ellos: "Ultra y UNLIMITED, solo con plan anual", nosotros: "Mes a mes, sin permanencia" },
      { tema: "WhatsApp con el número del local", ellos: "Complemento de US$15 al mes", nosotros: "Incluido con el asistente, vinculado por QR" },
      { tema: "Asistente con IA que agenda", ellos: "Wanda, US$50 al mes", nosotros: "Syna, incluida en el plan Pro ($49.900 + IVA)" },
      { tema: "Boletas ante el SII", ellos: null, nosotros: "Boletas de honorarios automáticas" },
      { tema: "Tarjeta del club en Google Wallet y Apple Wallet", ellos: null, nosotros: "Incluida en todos los planes" },
    ],
    cuandoEllos: "Pagas en dólares sin problema, trabajas solo o te sirve un contrato anual.",
    cuandoNosotros: [
      "Quieres pagar en pesos, mes a mes y sin permanencia.",
      "Quieres el asistente con IA y el WhatsApp de tu local sin pagar complementos aparte.",
      "Necesitas boletas ante el SII chileno.",
    ],
    migracion: "Kronnos Studio, con sus tres sedes, se cambió de WeiBook a SynapTech. Te mudamos gratis: servicios, equipo y lista de clientes.",
    testimonio: {
      cita: ["Gracias mi bro, feliz de verte crecer como empresa 💪🏻💪🏻"],
      autor: "Claudio Burgos", rol: "Dueño", local: "Kronnos Studio, 3 sedes", fecha: "18 sep 2026",
    },
    faq: [
      { q: "¿Cuánto cuesta WeiBook?", a: "Según su página de planes al 9 de octubre de 2026: HomeStudio US$15 al mes (1 profesional), Ultra US$39 al mes con plan anual (hasta 10 profesionales) y UNLIMITED US$99 al mes con plan anual. La IA Wanda cuesta US$50 al mes aparte." },
      { q: "¿Cuál es una alternativa chilena a WeiBook?", a: "SynapTech: cobra en pesos chilenos, mes a mes, con profesionales ilimitados desde $29.900 + IVA, y el plan Pro incluye el asistente con IA en el WhatsApp de tu local." },
      { q: "¿Me puedo cambiar de WeiBook sin perder clientes?", a: "Sí. Te mudamos gratis tus servicios, tu equipo y tu lista de clientes. Kronnos Studio hizo ese cambio con sus tres sedes." },
    ],
    fuentes: [
      { texto: "WeiBook: planes", url: "https://weibook.co/es/plans" },
      { texto: "WeiBook: Wanda", url: "https://weibook.co/es/wanda" },
    ],
  },
  {
    id: "agendaya", nombre: "AgendaYA", logo: "/competencia/agendaya.png", logoTipo: "icono", color: "#000000", sitio: "agendaya.app",
    origen: "Chile",
    dichoPorEllos: "+230 barberos activos, según su página",
    modelo: "Cobra $5.000 de base más $4.990 por cada profesional activo.",
    precios: [
      { valor: "$9.990", nota: "Individual" },
      { valor: "$19.970" },
      { valor: "$34.940" },
      { valor: "$49.910" },
    ],
    notaPrecios: "Leído en el configurador de su página; no dice si los precios incluyen IVA.",
    resumen: "Con equipos de hasta cinco profesionales AgendaYA es más barato. Desde seis, SynapTech cuesta menos, y la diferencia crece con cada persona.",
    filas: [
      { tema: "Cómo cobra", ellos: "$5.000 + $4.990 por profesional", nosotros: "Por local, con profesionales ilimitados" },
      { tema: "Asistente con IA", ellos: "Lo que llaman IA son recordatorios, confirmaciones y cancelaciones automáticas", nosotros: "Syna conversa, responde precios y horarios y agenda en el WhatsApp del local" },
      { tema: "Fidelización", ellos: "Puntos de recompensa y gift cards", nosotros: "Club de sellos con tarjeta en Google Wallet y Apple Wallet, y gift cards" },
      { tema: "Boletas ante el SII", ellos: null, nosotros: "Boletas de honorarios automáticas" },
      { tema: "Prueba gratis", ellos: "14 días, registrando una tarjeta", nosotros: "14 días, sin tarjeta" },
    ],
    cuandoEllos: "Tu equipo es de hasta cinco profesionales y solo necesitas agenda con recordatorios.",
    cuandoNosotros: [
      "Tu equipo es de seis o más, o va a crecer.",
      "Quieres un asistente que converse y agende, no solo recordatorios.",
      "Necesitas caja, comisiones y boletas en el mismo sistema.",
    ],
    migracion: "Hay barberías cambiándose desde AgendaYA en este momento. Traemos tus servicios, tu equipo y tu lista de clientes, sin costo.",
    faq: [
      { q: "¿Cuánto cuesta AgendaYA?", a: "Según su página al 9 de octubre de 2026: $9.990 al mes para un profesional, y para equipos $5.000 más $4.990 por cada profesional (6 profesionales = $34.940). No indica si incluye IVA." },
      { q: "¿Qué alternativa a AgendaYA tiene asistente con IA en WhatsApp?", a: "SynapTech: en el plan Pro ($49.900 + IVA, profesionales ilimitados) Syna responde y agenda en el WhatsApp de tu local." },
    ],
    fuentes: [
      { texto: "AgendaYA: configura tu plan", url: "https://agendaya.app/oferta-especial" },
      { texto: "AgendaYA: descripción del producto (llms.txt)", url: "https://agendaya.app/llms.txt" },
    ],
  },
  {
    id: "fresha", nombre: "Fresha", logo: "/competencia/fresha.svg", logoTipo: "wordmark", color: "#6950F3", sitio: "fresha.com",
    origen: "Reino Unido",
    dichoPorEllos: "Más de 120.000 negocios, según su página",
    modelo: "Cobra por cada miembro del equipo, por mensaje después de los gratuitos y por cada cliente nuevo que llega desde su marketplace.",
    precios: [
      { valor: "$5.900 + imp.", nota: "Independiente" },
      { valor: "$11.700 + imp.", nota: "Equipo" },
      { valor: "$23.400 + imp.", nota: "Equipo" },
      { valor: "$35.100 + imp.", nota: "Equipo" },
    ],
    notaPrecios: "Precios en pesos chilenos tal como los muestra su página de precios.",
    resumen: "La mensualidad de Fresha es baja, pero se suman cobros por mensaje, por cliente nuevo del marketplace y el club de fidelidad como adicional.",
    filas: [
      { tema: "Cómo cobra", ellos: "$3.900 por miembro del equipo al mes (plan Equipo)", nosotros: "Por local, con profesionales ilimitados" },
      { tema: "Cliente nuevo desde su marketplace", ellos: "Tarifa por cada cliente nuevo (monto no publicado en su página de precios)", nosotros: "Sin comisión por reserva" },
      { tema: "WhatsApp y SMS", ellos: "20 gratis al mes por miembro; después, de $65 a $315 cada WhatsApp", nosotros: "Por la vía oficial de WhatsApp, bolsas desde $1.990 + IVA por 100 avisos" },
      { tema: "Programa de fidelidad", ellos: "Adicional de $19.050 al mes por centro", nosotros: "Incluido, con tarjeta en Google Wallet y Apple Wallet" },
      { tema: "Asistente con IA que agenda", ellos: null, nosotros: "Syna, incluida en el plan Pro ($49.900 + IVA)" },
      { tema: "Boletas ante el SII", ellos: null, nosotros: "Boletas de honorarios automáticas" },
    ],
    cuandoEllos: "Quieres aparecer en un marketplace internacional y tu equipo es chico.",
    cuandoNosotros: [
      "No quieres pagar por cada cliente nuevo ni por cada mensaje.",
      "Quieres el club de fidelidad incluido, con la tarjeta en el teléfono del cliente.",
      "Necesitas soporte en Chile y boletas ante el SII.",
    ],
    migracion: "Te mudamos gratis desde Fresha: servicios con precios y duraciones, tu equipo y tu lista de clientes.",
    faq: [
      { q: "¿Fresha es gratis?", a: "No del todo. Según su página de precios al 9 de octubre de 2026, el plan Independiente cuesta $5.900 + impuestos al mes y el plan Equipo $3.900 por miembro. Además cobra una tarifa por cada cliente nuevo que llega desde su marketplace y los mensajes después de los 20 gratuitos." },
      { q: "¿Cuál es una alternativa a Fresha en Chile?", a: "SynapTech: precio fijo por local con profesionales ilimitados, sin comisión por reserva, club de fidelidad incluido y boletas de honorarios ante el SII." },
    ],
    fuentes: [{ texto: "Fresha: precios", url: "https://www.fresha.com/es/pricing" }],
  },
  {
    id: "reservo", nombre: "Reservo", logo: "/competencia/reservo.svg", logoTipo: "wordmark", color: "#00AEEF", sitio: "reservo.cl",
    origen: "Chile, desde 2015",
    dichoPorEllos: "+4.000 clientes en 15 países, según su página",
    modelo: "Cobra por \"capacidad de atención\", con precios \"desde\" y cotización.",
    precios: [
      { valor: "desde $30.000 + IVA", nota: "Individual" },
      { valor: "desde $50.000 + IVA", nota: "Básico" },
      { valor: "desde $80.000 + IVA", nota: "Básico + 3 capacidades" },
      { valor: "desde $110.000 + IVA", nota: "Básico + 6 capacidades" },
    ],
    notaPrecios: "Publica precios \"desde\" en su página para centros de salud y suma $10.000 + IVA por capacidad extra; el precio final se cotiza.",
    resumen: "Reservo está pensado para centros de salud y cobra por capacidad de atención. Para una barbería o un salón con equipo, SynapTech cuesta menos y suma un asistente con IA.",
    filas: [
      { tema: "Cómo cobra", ellos: "Por capacidad de atención (+$10.000 + IVA cada una), con cotización", nosotros: "Precio público por local, con profesionales ilimitados" },
      { tema: "WhatsApp", ellos: "Desde el número del centro, de 100 a 750 mensajes según el plan", nosotros: "Desde el WhatsApp de tu local, con asistente que responde y agenda" },
      { tema: "Asistente con IA que agenda", ellos: null, nosotros: "Syna, incluida en el plan Pro ($49.900 + IVA)" },
      { tema: "Webpay para cobrar reservas", ellos: "$60.000 + IVA al mes", nosotros: "Mercado Pago incluido, sin cargo de SynapTech" },
      { tema: "Boletas", ellos: "Boleta de honorarios (Individual) y boleta electrónica (planes mayores)", nosotros: "Boletas de honorarios automáticas, $29.900 + IVA por local" },
    ],
    cuandoEllos: "Eres un centro de salud que necesita integraciones clínicas como imed.",
    cuandoNosotros: [
      "Eres barbería, salón, centro de estética o clínica estética.",
      "Quieres un precio público, sin cotizar.",
      "Quieres que un asistente con IA responda y agende por WhatsApp.",
    ],
    migracion: "Te mudamos gratis desde Reservo: servicios, profesionales y lista de clientes.",
    faq: [
      { q: "¿Cuánto cuesta Reservo?", a: "Según su página para centros de salud al 9 de octubre de 2026, desde $30.000 + IVA (Individual) y desde $50.000 + IVA (Básico, 3 capacidades), más $10.000 + IVA por capacidad extra. El precio final se cotiza." },
      { q: "¿Qué alternativa a Reservo hay para barberías y salones?", a: "SynapTech: desde $29.900 + IVA por local con profesionales ilimitados, club de fidelidad y, en el plan Pro, asistente con IA por WhatsApp." },
    ],
    fuentes: [
      { texto: "Reservo: planes para centros de salud", url: "https://reservo.cl/landing/cl/salud-agenda/" },
      { texto: "Reservo: precios", url: "https://reservo.cl/precios/" },
    ],
  },
  {
    id: "agendapia", nombre: "Agendapia", logo: "/competencia/agendapia.svg", logoTipo: "wordmark", color: "#04EFD3", sitio: "agendapia.com",
    origen: "Chile",
    modelo: "Plan único con 3 integrantes y 1 ubicación; suma $5.000 + IVA por integrante o ubicación extra, y la IA funciona con créditos.",
    precios: [
      { valor: "$29.900 + IVA", nota: "One" },
      { valor: "$29.900 + IVA", nota: "One" },
      { valor: "$44.900 + IVA", nota: "One + 3 integrantes" },
      { valor: "$59.900 + IVA", nota: "One + 6 integrantes" },
    ],
    notaPrecios: "Leído en su página de precios.",
    resumen: "Hasta tres profesionales cuestan lo mismo. Desde cuatro, Agendapia suma $5.000 por persona y SynapTech no.",
    filas: [
      { tema: "Cómo cobra", ellos: "3 integrantes incluidos; +$5.000 + IVA cada uno más", nosotros: "Por local, con profesionales ilimitados" },
      { tema: "Asistente con IA", ellos: "Pía, incluida con 400 créditos al mes; después se compran créditos", nosotros: "Syna, en el plan Pro, con 200 conversaciones al mes" },
      { tema: "WhatsApp del local", ellos: "Parte con un número de Agendapia. Si conectas el tuyo, deja de funcionar en la app de WhatsApp del celular", nosotros: "Se vincula por QR y sigue funcionando en tu teléfono" },
      { tema: "Boletas ante el SII", ellos: "Contratando aparte tu cuenta en Lioren o SimpleFactura", nosotros: "Directo ante el SII, sin otra cuenta" },
      { tema: "Cobros con Mercado Pago", ellos: "1,49% + $99 adicional a lo que cobra Mercado Pago", nosotros: "Sin cargo de SynapTech: solo la comisión de Mercado Pago" },
    ],
    cuandoEllos: "Quieres que la IA también conteste llamadas telefónicas.",
    cuandoNosotros: [
      "Tienes más de tres profesionales.",
      "Quieres seguir usando el WhatsApp de tu local en tu teléfono.",
      "No quieres contratar otro sistema para las boletas ni pagar recargo por cobro.",
    ],
    migracion: "Te mudamos gratis desde Agendapia: servicios, equipo y lista de clientes.",
    faq: [
      { q: "¿Cuánto cuesta Agendapia?", a: "Según su página al 9 de octubre de 2026: plan One a $29.900 + IVA al mes con 3 integrantes y 1 ubicación, y $5.000 + IVA por cada integrante o ubicación adicional." },
      { q: "¿Qué alternativa a Agendapia mantiene el WhatsApp en mi teléfono?", a: "SynapTech: el WhatsApp del local se vincula con un código QR y sigue funcionando en tu celular mientras Syna responde y agenda." },
    ],
    fuentes: [
      { texto: "Agendapia: precios", url: "https://agendapia.com/#precios" },
      { texto: "Agendapia: conectar tu WhatsApp propio", url: "https://agendapia.com/tutoriales/marketing-y-comunicacion/conectar-tu-whatsapp-propio" },
      { texto: "Agendapia: boletas automáticas", url: "https://agendapia.com/tutoriales/membresias-y-facturacion/boletas-automaticas" },
    ],
  },
  {
    id: "rebooking", nombre: "re-booking", logo: "/competencia/rebooking.png", logoTipo: "wordmark", color: "#00928F", sitio: "re-booking.cl",
    origen: "Chile",
    modelo: "Cobra por profesional, en tramos: Basic (1), Starter (2 a 5) y Pro (6 a 20).",
    precios: [
      { valor: "$12.990 + IVA", nota: "Basic" },
      { valor: "$31.990 + IVA", nota: "Starter" },
      { valor: "$49.990 + IVA", nota: "Pro" },
      { valor: "$67.990 + IVA", nota: "Pro" },
    ],
    notaPrecios: "Leído en el selector de su página de precios.",
    resumen: "En re-booking la caja, el POS y la fidelización llegan recién en el plan Pro. En SynapTech vienen en todos los planes, con profesionales ilimitados.",
    filas: [
      { tema: "Cómo cobra", ellos: "Por profesional, en tramos", nosotros: "Por local, con profesionales ilimitados" },
      { tema: "Caja y fidelización", ellos: "Solo en el plan Pro", nosotros: "En todos los planes" },
      { tema: "Asistente con IA", ellos: "Informes semanales con IA; asistente que agende no publicado", nosotros: "Syna responde y agenda en el WhatsApp del local (plan Pro)" },
      { tema: "Confirmaciones por WhatsApp", ellos: "De 100 a 500 al mes según el plan", nosotros: "Desde el WhatsApp de tu local" },
      { tema: "Boletas ante el SII", ellos: null, nosotros: "Boletas de honorarios automáticas" },
    ],
    cuandoEllos: "Trabajas solo y quieres el plan más barato.",
    cuandoNosotros: [
      "Quieres caja, comisiones y club desde el primer plan.",
      "Tienes equipo y no quieres pagar por persona.",
      "Quieres un asistente que converse y agende.",
    ],
    migracion: "Te mudamos gratis desde re-booking: servicios, equipo y lista de clientes.",
    faq: [
      { q: "¿Cuánto cuesta re-booking?", a: "Según su página al 9 de octubre de 2026: Basic $12.990 + IVA (1 profesional), Starter desde $26.990 + IVA (2 a 5) y Pro desde $49.990 + IVA (6 a 20), con $6.000 por profesional adicional en el Pro." },
    ],
    fuentes: [{ texto: "re-booking: precios", url: "https://www.re-booking.cl/landing" }],
  },
  {
    id: "tereservo", nombre: "Te Reservo", logo: "/competencia/tereservo.svg", logoTipo: "icono", color: "#F6530F", sitio: "tereservo.cl",
    origen: "Chile",
    modelo: "Cobra $3.990 + IVA por sucursal, y $4.990 + IVA por cada trabajador que use avisos por WhatsApp.",
    precios: [
      { valor: "$8.980 + IVA", nota: "con WhatsApp" },
      { valor: "$18.960 + IVA", nota: "con WhatsApp" },
      { valor: "$33.930 + IVA", nota: "con WhatsApp" },
      { valor: "$48.900 + IVA", nota: "con WhatsApp" },
    ],
    notaPrecios: "Sucursal + WhatsApp para cada trabajador. Sin WhatsApp, son $3.990 + IVA por sucursal y los recordatorios van solo por correo.",
    resumen: "Te Reservo es muy barato si solo necesitas agenda. Con avisos por WhatsApp para todo el equipo, desde seis personas SynapTech cuesta menos e incluye club, caja y asistente.",
    filas: [
      { tema: "Cómo cobra", ellos: "$3.990 + IVA por sucursal, y $4.990 + IVA por trabajador con WhatsApp", nosotros: "Por local, con profesionales ilimitados" },
      { tema: "Asistente con IA", ellos: null, nosotros: "Syna responde y agenda en el WhatsApp del local (plan Pro)" },
      { tema: "Club de fidelidad", ellos: "Membresías, gift cards y códigos promocionales", nosotros: "Club de sellos con tarjeta en Google Wallet y Apple Wallet" },
      { tema: "Boletas ante el SII", ellos: null, nosotros: "Boletas de honorarios automáticas" },
    ],
    cuandoEllos: "Solo necesitas una agenda con recordatorios por correo, al menor precio.",
    cuandoNosotros: [
      "Quieres avisos por WhatsApp para todo el equipo sin pagar por persona.",
      "Quieres un club que haga volver a tus clientes.",
      "Quieres caja, comisiones y boletas en el mismo sistema.",
    ],
    migracion: "Te mudamos gratis desde Te Reservo: servicios, equipo y lista de clientes.",
    faq: [
      { q: "¿Cuánto cuesta Te Reservo?", a: "Según su página al 9 de octubre de 2026: $3.990 + IVA al mes por sucursal, y $4.990 + IVA al mes por cada trabajador que use notificaciones por WhatsApp." },
    ],
    fuentes: [{ texto: "Te Reservo: precios y calculadora", url: "https://tereservo.cl/" }],
  },
  /* Desde acá, verificados el 10-10-2026: comparar/competencia-2026-10-10.json (+ capturas). */
  {
    id: "novai", nombre: "Novai", logo: "/competencia/novai.png", logoTipo: "icono", color: "#161414", sitio: "novaiapp.com",
    verificado: "10 de octubre de 2026",
    origen: "Chile",
    modelo: "Cobra $9.990 al mes por cuenta, y cada cuenta es una persona: si son varios, cada uno crea la suya.",
    queEs: "Novai (novaiapp.com) es una agenda chilena para profesionales que atienden solos: se maneja conversando con un asistente por WhatsApp, incluso con notas de voz. Cuesta $9.990 al mes por cuenta, y cada cuenta es una persona.",
    precios: [
      { valor: "$9.990", nota: "Plan Novai" },
      { valor: "3 × $9.990", nota: "Una cuenta por persona, agendas separadas" },
      { valor: "6 × $9.990", nota: "Una cuenta por persona, agendas separadas" },
      { valor: "9 × $9.990", nota: "Una cuenta por persona, agendas separadas" },
    ],
    notaPrecios: "Leído en su página; no dice si incluye IVA. Novai no tiene plan de equipo: según su página, si son varios, cada uno crea su propia cuenta.",
    resumen: "Si atiendes solo, Novai es más barato. Con equipo no tiene plan: cada profesional paga su cuenta y lleva su agenda aparte, y su asistente conversa con el dueño, no con los clientes.",
    filas: [
      { tema: "Cómo cobra", ellos: "$9.990 al mes por cuenta; cada cuenta es una persona", nosotros: "Por local, con profesionales ilimitados" },
      { tema: "Asistente por WhatsApp", ellos: "Conversa solo con el dueño: agenda, bloquea horas y entiende notas de voz. A los clientes no les contesta", nosotros: "Syna conversa con tus clientes en el WhatsApp del local y agenda sola (plan Pro)" },
      { tema: "Mensajes a los clientes", ellos: "Te deja el mensaje listo para que lo envíes tú", nosotros: "Confirmación y recordatorio automáticos por WhatsApp, bolsas desde $1.990 + IVA por 100" },
      { tema: "Equipo", ellos: "Cada profesional con su cuenta y su link", nosotros: "Un panel con la agenda de todo el equipo, caja y comisiones" },
      { tema: "Boletas ante el SII", ellos: "No: según sus términos, las boletas corren por tu cuenta", nosotros: "Boletas de honorarios automáticas, como adicional" },
      { tema: "Tarjeta del club en Google Wallet y Apple Wallet", ellos: null, nosotros: "Incluida en todos los planes" },
    ],
    cuandoEllos: "Atiendes solo y quieres llevar tu agenda conversando por WhatsApp, al menor precio.",
    cuandoNosotros: [
      "Tienes equipo y quieres una sola agenda para el local.",
      "Quieres que el asistente les conteste y les agende a tus clientes, no solo a ti.",
      "Necesitas caja, comisiones y club de fidelidad en el mismo sistema.",
    ],
    migracion: "Te ayudamos a mudarte gratis: cargamos tus servicios, tu equipo y tu lista de clientes.",
    faq: [
      { q: "¿Cuánto cuesta Novai?", a: "Según su página al 10 de octubre de 2026: $9.990 al mes, en pesos chilenos, con 14 días de prueba sin tarjeta. Cada cuenta es una persona; si son varios, cada uno crea la suya. No dice si el precio incluye IVA." },
      { q: "¿Novai les contesta a mis clientes por WhatsApp?", a: "No. Su página lo dice así: \"Novai conversa solo contigo\". El dueño le escribe para agendar o bloquear horas, y los mensajes para los clientes los deja listos para que los envíes tú. En SynapTech, Syna conversa con tus clientes en el WhatsApp del local y agenda sola (plan Pro, $49.900 + IVA)." },
    ],
    fuentes: [
      { texto: "Novai: inicio y precio", url: "https://novaiapp.com/#precio" },
      { texto: "Novai: términos", url: "https://novaiapp.com/terminos" },
    ],
  },
  {
    id: "agendalibre", nombre: "AgendaLibre", logo: "/competencia/agendalibre.svg", logoTipo: "icono", color: "#0F766E", sitio: "agendalibre.cl",
    verificado: "10 de octubre de 2026",
    origen: "Chile (Sova SpA)",
    dichoPorEllos: "Más de 200 negocios en Chile, según su página",
    modelo: "Cobra una base por plan más un monto por cada profesional adicional, y tiene un plan gratis hasta 2 profesionales, sin WhatsApp.",
    precios: [
      { valor: "$0", nota: "Gratis: sin WhatsApp, 80 citas al mes" },
      { valor: "$13.470 + IVA", nota: "Starter" },
      { valor: "$22.440 + IVA", nota: "Starter" },
      { valor: "$44.910 + IVA", nota: "Pro; el Starter llega hasta 8" },
    ],
    notaPrecios: "Leído en la calculadora de su página de precios. Con boleta SII y Mercado Pago (plan Pro) son $20.970 + IVA con 3 profesionales y $32.940 + IVA con 6.",
    resumen: "Hasta 8 profesionales AgendaLibre es más barato, y su plan Pro trae boleta SII. Con 9 o más, SynapTech cuesta menos, y suma un asistente con IA que conversa y agenda por WhatsApp y el club con tarjeta en Wallet.",
    filas: [
      { tema: "Cómo cobra", ellos: "Base + $2.990 a $4.990 + IVA por profesional adicional, según el plan", nosotros: "Por local, con profesionales ilimitados" },
      { tema: "Recordatorios por WhatsApp", ellos: "Uno por cita: 15 a 25 al mes por profesional según el plan; bolsas desde $3.000 por 50", nosotros: "Confirmación y recordatorio por la vía oficial de WhatsApp, bolsas desde $1.990 + IVA por 100" },
      { tema: "Asistente con IA que agenda", ellos: null, nosotros: "Syna, incluida en el plan Pro ($49.900 + IVA)" },
      { tema: "Boletas ante el SII", ellos: "En el plan Pro, con FacturaLibre: un RUT emisor, para citas pagadas online; +$8.990 + IVA por RUT adicional", nosotros: "Adicional de $29.900 + IVA al mes: la boleta de honorarios de cada profesional y la del local salen solas al cerrar la cita" },
      { tema: "Tarjeta del club en Google Wallet y Apple Wallet", ellos: null, nosotros: "Incluida en todos los planes" },
      { tema: "Plan gratis", ellos: "Hasta 2 profesionales y 80 citas al mes, sin WhatsApp", nosotros: "En desarrollo; hoy, 14 días de prueba sin tarjeta" },
    ],
    cuandoEllos: "Tu equipo es de hasta 8 profesionales y buscas el precio más bajo con recordatorios por WhatsApp, o atiendes solo y te sirve un plan gratis.",
    cuandoNosotros: [
      "Tu equipo es de 9 o más, o va a crecer: el precio no sube por profesional.",
      "Quieres un asistente con IA que converse con tus clientes y agende en el WhatsApp del local.",
      "Quieres el club de fidelidad con la tarjeta en Google Wallet y Apple Wallet.",
    ],
    migracion: "Te mudamos gratis desde AgendaLibre: servicios con precios y duraciones, tu equipo y tu lista de clientes.",
    faq: [
      { q: "¿Cuánto cuesta AgendaLibre?", a: "Según su página de precios al 10 de octubre de 2026: plan Gratis hasta 2 profesionales (sin WhatsApp, 80 citas al mes); Starter $7.490 + IVA con un profesional y $2.990 + IVA por cada adicional, hasta 8; Pro $12.990 + IVA y $3.990 + IVA por adicional, hasta 20; Business $35.990 + IVA con 3 incluidos y $4.990 + IVA por adicional." },
      { q: "¿AgendaLibre emite boletas ante el SII?", a: "Sí, en su plan Pro: boleta SII o de honorarios al completar la cita, en alianza con FacturaLibre, con un RUT emisor y para citas pagadas online. Cada RUT adicional cuesta $8.990 + IVA al mes. En SynapTech, la facturación automática es un adicional de $29.900 + IVA al mes por local: la boleta de honorarios de cada profesional y la del local salen solas al cerrar la cita." },
    ],
    fuentes: [
      { texto: "AgendaLibre: precios", url: "https://agendalibre.cl/precios" },
      { texto: "AgendaLibre: inicio", url: "https://agendalibre.cl/" },
    ],
  },
  {
    id: "tuturno", nombre: "TuTurno", logo: "/competencia/tuturno.svg", logoTipo: "icono", color: "#5D5FEF", sitio: "tuturno.io",
    verificado: "10 de octubre de 2026", enDolares: true,
    origen: "Argentina (Tuturno.io SRL)",
    dichoPorEllos: "600+ empresas, según su página",
    modelo: "Cobra en dólares por profesional, con descuento por cantidad, y los recordatorios automáticos por WhatsApp se pagan aparte.",
    precios: [
      { valor: "US$8,50", nota: "Básico" },
      { valor: "US$17,85", nota: "Básico" },
      { valor: "US$22,95", nota: "Básico" },
      { valor: "US$28,05", nota: "Básico" },
    ],
    notaPrecios: "Plan Básico tal como lo muestra su página a un visitante en Chile: con el 15% de su código de referidos ya aplicado y sin los recordatorios automáticos por WhatsApp, que se cobran aparte. No dice si incluye impuestos. Su página avisa que reajusta precios en enero, abril, julio y octubre.",
    resumen: "Fuera de Chile, con 1 a 3 profesionales TuTurno es más barato; desde 6, SynapTech cuesta menos (US$15 al mes por local). En Chile, nuestro plan es $29.900 + IVA y TuTurno cuesta menos con cualquier equipo. La diferencia está en WhatsApp: allá los recordatorios automáticos se pagan aparte y no publica un asistente con IA.",
    filas: [
      { tema: "Cómo cobra", ellos: "Por profesional, en dólares, con descuento por cantidad", nosotros: "Por local, con profesionales ilimitados" },
      { tema: "Recordatorios por WhatsApp", ellos: "En el plan Básico se envían a mano, con un clic; los automáticos se cobran aparte", nosotros: "Fuera de Chile, el plan trae un cupo mensual de mensajes para confirmaciones y recordatorios, según el país; en Chile, bolsas desde $1.990 + IVA por 100" },
      { tema: "Asistente con IA que agenda", ellos: null, nosotros: "Syna, en el plan Agenda + IA (US$20 fuera de Chile; plan Pro de $49.900 + IVA en Chile)" },
      { tema: "Facturación", ellos: "Facturas de AFIP con un clic (Argentina)", nosotros: "Boletas de honorarios ante el SII, solo en Chile" },
      { tema: "Tarjeta del club en Google Wallet y Apple Wallet", ellos: null, nosotros: "Incluida en todos los planes" },
      { tema: "Prueba gratis", ellos: "14 días, sin medios de pago", nosotros: "2 meses fuera de Chile; 14 días sin tarjeta en Chile" },
    ],
    cuandoEllos: "Estás en Argentina y necesitas facturar con AFIP, o tu equipo es chico y buscas el precio más bajo.",
    cuandoNosotros: [
      "Fuera de Chile y con 6 profesionales o más: pagas US$15 al mes por local, no por persona.",
      "Quieres un asistente con IA que converse con tus clientes y agende en el WhatsApp del local.",
      "Quieres el club de fidelidad con la tarjeta en el teléfono del cliente.",
    ],
    migracion: "Te mudamos gratis desde TuTurno: servicios, equipo y lista de clientes.",
    faq: [
      { q: "¿Cuánto cuesta TuTurno?", a: "Según su página al 10 de octubre de 2026, el precio de lista por profesional al mes es US$10 (Básico), US$16 (Profesional) y US$21 (Empresa). La página aplica de entrada un 15% por código de referidos y descuentos por cantidad: con el plan Básico, 3 profesionales pagan US$17,85 y 9 pagan US$28,05 al mes. Los recordatorios automáticos por WhatsApp se cobran aparte." },
      { q: "¿Cuánto cuesta SynapTech fuera de Chile?", a: "US$15 al mes por local con el plan Agenda, o US$20 con el asistente con IA, sin cobro por profesional. Cada sede adicional son US$10 al mes y los primeros dos meses son gratis." },
    ],
    fuentes: [
      { texto: "TuTurno: planes", url: "https://www.tuturno.io/suscripciones/planes" },
      { texto: "TuTurno: preguntas frecuentes", url: "https://www.tuturno.io/ayuda/pf" },
    ],
  },
  {
    id: "booksy", nombre: "Booksy", logo: "/competencia/booksy.png", logoTipo: "icono", color: "#218CAC", sitio: "booksy.com",
    verificado: "10 de octubre de 2026", enDolares: true,
    origen: "Opera en EE. UU., Europa y Brasil",
    dichoPorEllos: "38+ millones de usuarios, según su sitio",
    modelo: "Cobra una suscripción base más un monto por cada agenda adicional, y una tarifa por cada cliente nuevo que llega por Boost, su promoción en el marketplace.",
    queEs: "Booksy (booksy.com) es una plataforma de reservas para barberías y salones con marketplace y app para clientes. Opera en Estados Unidos, Europa y Brasil, y no publica precios para Chile ni para Latinoamérica de habla hispana. Cobra una suscripción base más un monto por cada agenda adicional.",
    precios: [
      { valor: "US$29,99", nota: "EE. UU., + impuestos" },
      { valor: "US$69,99", nota: "EE. UU., + impuestos" },
      { valor: "US$129,99", nota: "EE. UU., + impuestos" },
      { valor: "US$189,99", nota: "EE. UU., + impuestos" },
    ],
    notaPrecios: "Booksy no publica precios para Chile: estos son los de su página para EE. UU. en español. En España: 34,99 € + IVA con 1 agenda y 8 € + IVA por empleado adicional; en Brasil: R$ 99,99 y R$ 20 por agenda adicional.",
    resumen: "Booksy no tiene precios para Chile. Con sus tarifas de EE. UU., un equipo de 6 paga US$129,99 al mes, y Boost cobra el 30% de la primera visita de cada cliente nuevo. SynapTech cobra un precio fijo por local y suma un asistente con IA que agenda por WhatsApp.",
    filas: [
      { tema: "Precios para Chile", ellos: "No publicados; opera en EE. UU., Europa y Brasil", nosotros: "$29.900 + IVA al mes por local" },
      { tema: "Cómo cobra", ellos: "Base + US$20 por usuario adicional (EE. UU.)", nosotros: "Por local, con profesionales ilimitados" },
      { tema: "Cliente nuevo desde su marketplace", ellos: "Boost: 30% de la primera visita, con tope de US$100 (EE. UU.)", nosotros: "Directorio de locales sin comisión por reserva" },
      { tema: "WhatsApp", ellos: null, nosotros: "Desde el WhatsApp de tu local" },
      { tema: "Asistente con IA que agenda", ellos: null, nosotros: "Syna, incluida en el plan Pro ($49.900 + IVA)" },
      { tema: "Tarjeta de sellos", ellos: "Dentro de la app de Booksy, incluida", nosotros: "En Google Wallet y Apple Wallet, sin descargar una app" },
    ],
    cuandoEllos: "Atiendes en EE. UU., Europa o Brasil y quieres aparecer en un marketplace con millones de usuarios.",
    cuandoNosotros: [
      "Estás en Chile: precio en pesos, soporte en Chile y boletas ante el SII.",
      "No quieres pagar por cada cliente nuevo que llega por el marketplace.",
      "Quieres que tus clientes guarden la tarjeta de sellos en Wallet, sin descargar una app.",
    ],
    migracion: "Te mudamos gratis desde Booksy: servicios, equipo y lista de clientes.",
    faq: [
      { q: "¿Booksy funciona en Chile?", a: "Booksy no publica precios ni una versión para Chile. En su selector de países aparecen EE. UU., Reino Unido, Irlanda, Francia, Polonia, España, Brasil, Alemania y Sudáfrica (revisado el 10 de octubre de 2026)." },
      { q: "¿Cuánto cuesta Booksy?", a: "Según su página de precios al 10 de octubre de 2026: en EE. UU., US$29,99 al mes más impuestos y US$20 por usuario adicional; en España, 34,99 € + IVA y 8 € + IVA por empleado adicional; en Brasil, R$ 99,99 y R$ 20 por agenda adicional. Con Boost cobra el 30% de la primera visita de cada cliente nuevo (tope de US$100 en EE. UU. y 50 € + IVA en España; exento en Brasil)." },
    ],
    fuentes: [
      { texto: "Booksy: precios EE. UU. (español)", url: "https://biz.booksy.com/es-us/precios" },
      { texto: "Booksy: precios España", url: "https://biz.booksy.com/es-es/precios" },
      { texto: "Booksy: preços Brasil", url: "https://biz.booksy.com/pt-br/precos" },
      { texto: "Booksy: tarjetas de fidelidad", url: "https://biz.booksy.com/es-es/funcionalidades/tarjetas-de-fidelidad-digitales" },
    ],
  },
  {
    id: "setmore", nombre: "Setmore", logo: "/competencia/setmore.svg", logoTipo: "wordmark", color: "#1B3D32", sitio: "setmore.com",
    verificado: "10 de octubre de 2026", enDolares: true,
    origen: "Origen no informado; teléfono de contacto de EE. UU.",
    modelo: "Cobra en dólares por usuario: gratis hasta 4, y US$12 por usuario al mes en el plan Pro (US$5 con pago anual).",
    queEs: "Setmore (setmore.com) es una agenda online con un plan gratis hasta 4 usuarios y un plan Pro que cobra en dólares por usuario. Su página de precios no dice de qué país es; su teléfono de contacto es de EE. UU.",
    precios: [
      { valor: "US$0", nota: "Free" },
      { valor: "US$0", nota: "Free, hasta 4 usuarios" },
      { valor: "US$72", nota: "Pro, pago mensual" },
      { valor: "US$108", nota: "Pro, pago mensual" },
    ],
    notaPrecios: "Precios en dólares de su página; no dice si incluyen impuestos. Con el Pro pagado anual, que es lo que muestra por defecto, son US$30 (6 usuarios) y US$45 (9) al mes. El plan Free no trae SMS ni sincronización bidireccional del calendario.",
    resumen: "Setmore es gratis hasta 4 usuarios, y con pago anual su plan Pro es barato. No publica WhatsApp ni un asistente con IA que agende: su recepcionista es una persona, por US$99 al mes y solo en EE. UU.",
    filas: [
      { tema: "Cómo cobra", ellos: "Por usuario: gratis hasta 4; Pro US$12 al mes (US$5 con pago anual)", nosotros: "Por local, con profesionales ilimitados" },
      { tema: "Recordatorios", ellos: "Por correo en el plan Free; SMS en el Pro (500 al mes por miembro)", nosotros: "Confirmación y recordatorio por WhatsApp" },
      { tema: "WhatsApp", ellos: null, nosotros: "Desde el WhatsApp de tu local" },
      { tema: "Quién contesta", ellos: "Live Receptionist: una persona que contesta llamadas, US$99 al mes, solo EE. UU.", nosotros: "Syna, IA que responde y agenda por WhatsApp (US$20 fuera de Chile; plan Pro en Chile)" },
      { tema: "Tarjeta del club en Google Wallet y Apple Wallet", ellos: null, nosotros: "Incluida en todos los planes" },
      { tema: "Boletas ante el SII", ellos: null, nosotros: "Boletas de honorarios automáticas, como adicional" },
    ],
    cuandoEllos: "Son hasta 4 personas, te bastan las reservas con recordatorios por correo y no te complica que todo sea en dólares.",
    cuandoNosotros: [
      "Tus clientes te escriben por WhatsApp y quieres que se les responda y agende ahí.",
      "Quieres caja, comisiones y club de fidelidad en el mismo sistema.",
      "Necesitas soporte en Chile y en español.",
    ],
    migracion: "Te mudamos gratis desde Setmore: servicios, equipo y lista de clientes.",
    faq: [
      { q: "¿Setmore es gratis?", a: "Sí, hasta 4 usuarios, según su página al 10 de octubre de 2026: citas ilimitadas, página de reservas y recordatorios por correo. El plan Pro cuesta US$12 por usuario al mes, o US$5 con pago anual, y suma SMS y sincronización bidireccional del calendario." },
    ],
    fuentes: [
      { texto: "Setmore: precios", url: "https://www.setmore.com/pricing" },
      { texto: "Setmore: precios (español)", url: "https://www.setmore.com/es/pricing" },
    ],
  },
  /* Las que los buscadores con IA citaban el 10-10 y no teníamos (seo/geo/):
     comparar/competencia-2026-10-10-b.json + capturas. */
  {
    id: "agendabarber", nombre: "AgendaBarber", logo: "/competencia/agendabarber.png", logoTipo: "icono", color: "#7B2CBF", sitio: "agendabarber.cl",
    verificado: "10 de octubre de 2026",
    origen: "Chile",
    modelo: "Cobra por cuenta con tope de barberos: Básico para 1 y PRO hasta 5. Los módulos extra (WhatsApp del local, pagos online, mini sitio, IA para probar cortes) se pagan aparte, $2.000 al mes cada uno.",
    queEs: "AgendaBarber (agendabarber.cl) es una agenda online chilena hecha solo para barberías y barberos independientes. Cobra por cuenta con tope de barberos: Básico para 1 y PRO hasta 5, con módulos extra de $2.000 al mes.",
    precios: [
      { valor: "$15.000", nota: "Básico" },
      { valor: "$35.000", nota: "PRO, hasta 5 barberos" },
      { valor: "Sin plan publicado", nota: "El PRO llega hasta 5 barberos" },
      { valor: "Sin plan publicado", nota: "El PRO llega hasta 5 barberos" },
    ],
    notaPrecios: "Leído en su página; no dice si incluye IVA. Con pago anual cuestan 20% menos ($12.000 y $28.000 al mes). Con los módulos de WhatsApp del local y pagos online, $19.000 (1 barbero) y $39.000 (hasta 5).",
    resumen: "Con un barbero AgendaBarber es más barato, y con 3 los precios quedan cerca ($35.000, sin aclarar IVA, frente a $29.900 + IVA). No publica un plan para más de 5 barberos, y su IA prueba cortes en una foto: no conversa ni agenda.",
    filas: [
      { tema: "Cómo cobra", ellos: "Por cuenta: Básico 1 barbero, PRO hasta 5; módulos aparte", nosotros: "Por local, con profesionales ilimitados" },
      { tema: "Equipos de más de 5", ellos: "Sin plan publicado", nosotros: "Profesionales ilimitados en todos los planes" },
      { tema: "Recordatorios", ellos: "Automáticos por correo; por WhatsApp, manuales desde el panel. Con el módulo WhatsApp del local ($2.000 al mes) salen desde tu número", nosotros: "Confirmación y recordatorio automáticos por WhatsApp, bolsas desde $1.990 + IVA por 100" },
      { tema: "Asistente con IA", ellos: "AI Studio ($2.000 al mes) prueba cortes en una foto; no conversa ni agenda", nosotros: "Syna conversa con tus clientes y agenda en el WhatsApp del local (plan Pro)" },
      { tema: "Tarjeta del club en Google Wallet y Apple Wallet", ellos: null, nosotros: "Incluida en todos los planes" },
      { tema: "Boletas ante el SII", ellos: null, nosotros: "Boletas de honorarios automáticas, como adicional" },
    ],
    cuandoEllos: "Eres barbero independiente o son hasta 3, buscas algo simple y barato, o atiendes a domicilio.",
    cuandoNosotros: [
      "Son más de 5 barberos, o van a crecer.",
      "Quieres un asistente que converse con tus clientes y agende por WhatsApp.",
      "Quieres caja, comisiones y club de fidelidad en el mismo sistema.",
    ],
    migracion: "Te mudamos gratis desde AgendaBarber: servicios, equipo y lista de clientes.",
    faq: [
      { q: "¿Cuánto cuesta AgendaBarber?", a: "Según su página al 10 de octubre de 2026: Básico $15.000 al mes (1 barbero) y PRO $35.000 al mes (hasta 5 barberos); con pago anual, $12.000 y $28.000 al mes. Los módulos extra se pagan aparte: WhatsApp del local, pagos online con Flow, mini sitio de marca y AI Studio, $2.000 al mes cada uno. No dice si incluye IVA ni publica un plan para más de 5 barberos." },
      { q: "¿AgendaBarber tiene asistente con IA en WhatsApp?", a: "Según su página, no: su IA, AgendaBarber AI Studio ($2.000 al mes), sirve para probar cortes en una foto. En SynapTech, Syna responde y agenda en el WhatsApp del local (plan Pro, $49.900 + IVA)." },
    ],
    fuentes: [{ texto: "AgendaBarber: inicio y precios", url: "https://www.agendabarber.cl/#precios" }],
  },
  {
    id: "zitoria", nombre: "Zitoria", logo: "/competencia/zitoria.png", logoTipo: "wordmark", color: "#4F46E5", sitio: "zitoria.com",
    verificado: "10 de octubre de 2026",
    origen: "Chile",
    modelo: "Cobra por plan con tope de profesionales (1, 2, 6 o ilimitados), con IVA incluido, y trae WhatsApp e IA con una cuota mensual según el plan.",
    queEs: "Zitoria (zitoria.com) es una agenda chilena para negocios de servicios: reservas online, ventas y caja, recordatorios por WhatsApp e IA con cuota mensual, y boletas o facturas ante el SII con SimpleFactura. Cobra por plan con tope de profesionales, con IVA incluido.",
    precios: [
      { valor: "$17.990", nota: "Emprendedor, IVA incluido" },
      { valor: "$59.000", nota: "Growth, IVA incluido; el Starter llega a 2" },
      { valor: "$59.000", nota: "Growth, IVA incluido" },
      { valor: "$149.000", nota: "Pro, IVA incluido" },
    ],
    notaPrecios: "Leído en su página de planes, con IVA incluido. SynapTech publica sin IVA: $29.900 + IVA son $35.581 con IVA. Zitoria no vende profesionales sueltos: al llegar al tope se sube de plan.",
    resumen: "Con un profesional Zitoria es más barato. Con 3 a 9, el Básico de SynapTech cuesta menos. Con el asistente con IA, nuestro plan Pro ($49.900 + IVA, $59.381 con IVA) cuesta casi lo mismo que su Growth ($59.000) con 3 a 6 profesionales, y mucho menos que su Pro ($149.000) con 9.",
    filas: [
      { tema: "Cómo cobra", ellos: "Planes con tope de 1, 2, 6 o ilimitados profesionales; IVA incluido", nosotros: "Por local, con profesionales ilimitados; más IVA" },
      { tema: "Asistente con IA", ellos: "Según su centro de ayuda, prepara respuestas o, en piloto automático, responde y agenda solo; 20 a 500 acciones al mes según el plan", nosotros: "Syna responde y agenda en el WhatsApp del local; 200 conversaciones al mes en el Pro" },
      { tema: "Desde qué número salen los mensajes", ellos: "Desde el número verificado de Zitoria, con tu negocio identificado", nosotros: "Desde el WhatsApp de tu local, vinculado por QR" },
      { tema: "Recordatorios por WhatsApp", ellos: "Incluidos con cuota: 50 a 1.000 al mes según el plan", nosotros: "Bolsas desde $1.990 + IVA por 100" },
      { tema: "Boletas ante el SII", ellos: "Boleta o factura de cada venta con SimpleFactura (tu cuenta, certificado y folios); costo no publicado", nosotros: "Adicional de $29.900 + IVA al mes: la boleta de honorarios de cada profesional y la del local salen solas al cerrar la cita" },
      { tema: "Tarjeta de sellos", ellos: "En la ficha del cliente, con cupón al completarla", nosotros: "En Google Wallet y Apple Wallet, en el teléfono del cliente" },
    ],
    cuandoEllos: "Atiendes solo o son hasta 2, prefieres el precio con IVA incluido y emitir boletas de venta con SimpleFactura.",
    cuandoNosotros: [
      "Son 3 o más: el precio no salta por pasar un tope de profesionales.",
      "Quieres que el asistente y los avisos salgan del WhatsApp de tu local, no de un número de la plataforma.",
      "Tus profesionales boletean: la boleta de honorarios de cada uno sale sola.",
    ],
    migracion: "Te mudamos gratis desde Zitoria: servicios, equipo y lista de clientes.",
    faq: [
      { q: "¿Cuánto cuesta Zitoria?", a: "Según su página al 10 de octubre de 2026, con IVA incluido: Emprendedor $17.990 al mes (1 profesional), Starter $29.000 (hasta 2), Growth $59.000 (hasta 6) y Pro $149.000 (ilimitados). WhatsApp e IA vienen con una cuota mensual según el plan; los paquetes extra no tienen precio publicado." },
      { q: "¿Zitoria tiene asistente con IA?", a: "Sí. Según su centro de ayuda, prepara respuestas con horas reales de tu agenda o, en piloto automático, responde y agenda solo por WhatsApp, con 20 a 500 acciones al mes según el plan. Los mensajes salen desde el número verificado de Zitoria. En SynapTech, Syna responde y agenda desde el WhatsApp de tu propio local (plan Pro, $49.900 + IVA, 200 conversaciones al mes)." },
    ],
    fuentes: [
      { texto: "Zitoria: planes", url: "https://zitoria.com/#planes" },
      { texto: "Zitoria: centro de ayuda", url: "https://zitoria.com/ayuda-publica" },
      { texto: "Zitoria: comparativa", url: "https://zitoria.com/comparativa" },
    ],
  },
  {
    id: "turnify", nombre: "Turnify", logo: "/competencia/turnify.png", logoTipo: "wordmark", color: "#43A3F4", sitio: "turnify.cl",
    verificado: "10 de octubre de 2026",
    origen: "Chile",
    modelo: "Cobra por tramos de profesionales (1, 2 a 3 y 4 a 5) y, desde 6, una base más $3.000 + IVA por cada profesional extra.",
    precios: [
      { valor: "$9.990 + IVA", nota: "Profesional" },
      { valor: "$15.990 + IVA", nota: "Equipo" },
      { valor: "$24.990 + IVA", nota: "Business" },
      { valor: "$33.990 + IVA", nota: "Business" },
    ],
    notaPrecios: "Leído en su página y su calculadora; las tarjetas dicen \"desde\" sin explicar qué cambia el precio. Cada plan incluye de 15 a 100 conversaciones de WhatsApp al mes.",
    resumen: "Hasta 7 profesionales Turnify es más barato; desde 8, SynapTech cuesta menos (con 9, $29.900 frente a $33.990 + IVA). Turnify no publica asistente con IA, cobro de reservas integrado, club de fidelidad ni boletas ante el SII.",
    filas: [
      { tema: "Cómo cobra", ellos: "Por tramos; desde 6 profesionales, $3.000 + IVA por cada uno extra", nosotros: "Por local, con profesionales ilimitados" },
      { tema: "Recordatorios por WhatsApp", ellos: "En su portada, automáticos (15 a 100 conversaciones al mes según el plan); en sus preguntas frecuentes, manuales y enviados desde tu propia cuenta", nosotros: "Confirmación y recordatorio automáticos por la vía oficial de WhatsApp, bolsas desde $1.990 + IVA por 100" },
      { tema: "Cobro de la reserva", ellos: "Sin pasarela integrada: se pega un link de pago externo", nosotros: "Pago online al reservar con Mercado Pago" },
      { tema: "Asistente con IA que agenda", ellos: null, nosotros: "Syna, incluida en el plan Pro ($49.900 + IVA)" },
      { tema: "Tarjeta del club en Google Wallet y Apple Wallet", ellos: null, nosotros: "Incluida en todos los planes" },
      { tema: "Prueba gratis", ellos: "15 días, sin tarjeta", nosotros: "14 días, sin tarjeta" },
    ],
    cuandoEllos: "Tu equipo es de hasta 7 profesionales y buscas el precio más bajo en pesos, con una página de reservas con varios estilos.",
    cuandoNosotros: [
      "Son 8 o más, o van a crecer: el precio no sube por profesional.",
      "Quieres cobrar la reserva online y un asistente con IA que agende por WhatsApp.",
      "Quieres club de fidelidad con Wallet y boletas ante el SII en el mismo sistema.",
    ],
    migracion: "Te mudamos gratis desde Turnify: servicios, equipo y lista de clientes.",
    faq: [
      { q: "¿Cuánto cuesta Turnify?", a: "Según su página al 10 de octubre de 2026: Profesional $9.990 + IVA (1 profesional), Equipo $15.990 + IVA (2 a 3), Equipo Pro $21.990 + IVA (4 a 5) y Business $24.990 + IVA con 6 profesionales, más $3.000 + IVA por cada profesional o sucursal extra (9 profesionales = $33.990 + IVA). Las tarjetas dicen \"desde\"." },
    ],
    fuentes: [
      { texto: "Turnify: precios", url: "https://turnify.cl/#pricing" },
      { texto: "Turnify: preguntas frecuentes", url: "https://turnify.cl/faq" },
    ],
  },
  {
    id: "turnito", nombre: "Turnito", logo: "/competencia/turnito.svg", logoTipo: "wordmark", color: "#2D64D5", sitio: "turnito.app",
    verificado: "10 de octubre de 2026", enDolares: true,
    origen: "Argentina (Grupo Vansur), con versión para Chile",
    dichoPorEllos: "Cientos de peluqueros y barberos en Chile, según su página",
    queEs: "Turnito (turnito.app) es una agenda online argentina (Grupo Vansur) con versión para Chile, para peluquerías, barberías y otros servicios. Cobra en dólares por tramos de agendas, con un plan gratis hasta 3 agendas, y una comisión sobre lo cobrado online que baja con el plan.",
    modelo: "Cobra en dólares por tramos de agendas y reservas al mes, más una comisión sobre lo cobrado online que baja con el plan (5% en el gratis, 0% en el Pro).",
    precios: [
      { valor: "US$0", nota: "Gratuito: 100 reservas al mes, sin recordatorios" },
      { valor: "US$0", nota: "Gratuito, hasta 3 agendas" },
      { valor: "US$18", nota: "Advance" },
      { valor: "US$18", nota: "Advance" },
    ],
    notaPrecios: "Precios en dólares de su página para Chile; no dice si incluyen impuestos. El plan Gratuito tiene 100 reservas al mes para toda la cuenta, 1 servicio por agenda y 5% de comisión sobre lo cobrado online; los recordatorios automáticos por WhatsApp parten en Plus (US$8, 30 mensajes al mes).",
    resumen: "Turnito es más barato: gratis hasta 3 agendas y US$18 al mes con agendas ilimitadas. Cobra comisión sobre lo cobrado online (salvo en su plan Pro), sus mensajes de WhatsApp tienen un cupo mensual y no publica un asistente con IA ni boletas ante el SII.",
    filas: [
      { tema: "Cómo cobra", ellos: "Por tramos, en dólares; agendas ilimitadas desde US$18", nosotros: "Por local, en pesos, con profesionales ilimitados" },
      { tema: "Comisión", ellos: "5%, 3,5%, 1% o 0% sobre lo cobrado online, según el plan", nosotros: "Sin comisión por reserva" },
      { tema: "Recordatorios por WhatsApp", ellos: "Automáticos desde el plan Plus, con cupo de 30, 100 o 250 al mes por cuenta", nosotros: "En Chile, bolsas desde $1.990 + IVA por 100; fuera de Chile, el plan trae un cupo mensual de mensajes según el país" },
      { tema: "Asistente con IA que agenda", ellos: null, nosotros: "Syna conversa y agenda en el WhatsApp del local (plan Pro)" },
      { tema: "Boletas ante el SII", ellos: null, nosotros: "Boletas de honorarios automáticas, como adicional" },
      { tema: "Tarjeta del club en Google Wallet y Apple Wallet", ellos: null, nosotros: "Incluida en todos los planes" },
    ],
    cuandoEllos: "Empiezas solo o con hasta 3 personas y te basta un plan gratis, o quieres pagar lo mínimo con agendas ilimitadas.",
    cuandoNosotros: [
      "Quieres un asistente con IA que converse con tus clientes y agende en el WhatsApp del local.",
      "Prefieres pagar en pesos y sin comisión sobre lo que cobras online.",
      "Quieres caja, comisiones del equipo, club de fidelidad y boletas ante el SII en el mismo sistema.",
    ],
    migracion: "Te mudamos gratis desde Turnito: servicios, equipo y lista de clientes.",
    faq: [
      { q: "¿Turnito es gratis?", a: "Tiene un plan Gratuito que no vence, según su página al 10 de octubre de 2026: hasta 3 agendas y 100 reservas al mes, 1 servicio por agenda, sin recordatorios automáticos y con 5% de comisión sobre lo cobrado online. Los planes pagados cuestan US$8 (Plus), US$18 (Advance) y US$30 (Pro) al mes." },
      { q: "¿Turnito y TuTurno son lo mismo?", a: "No. Son dos empresas argentinas distintas: Turnito (turnito.app) y TuTurno (tuturno.io). Las dos tienen su comparación con SynapTech en www.synaptechspa.cl/comparar." },
    ],
    fuentes: [
      { texto: "Turnito: planes para Chile", url: "https://turnito.app/cl/planes/" },
      { texto: "Turnito: funcionalidades", url: "https://turnito.app/funcionalidades/" },
    ],
  },
];

export const competidor = (id: string) => COMPETIDORES.find((c) => c.id === id);

export const fechaDe = (c: Competidor) => c.verificado ?? FECHA_VERIFICACION;

/* Las búsquedas por marca son de tres tipos: qué es, cuánto cuesta y cuál es la
   alternativa ("weibook que es", "agendapro precios", "alternativa a fresha").
   Cada página responde las tres: lo propio de la ficha + estas dos si faltan. */
const minuscula = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
export function queEsDe(c: Competidor) {
  return c.queEs ?? `${c.nombre} (${c.sitio}) es una plataforma de agenda online con origen en ${c.origen}. ${c.modelo}${c.dichoPorEllos ? ` Según su sitio, ${minuscula(c.dichoPorEllos.replace(/, según su (página|sitio)( de planes)?$/, ""))}.` : ""}`;
}
export function faqDe(c: Competidor) {
  const lista = [{ q: `¿Qué es ${c.nombre}?`, a: queEsDe(c) }, ...c.faq];
  if (!c.faq.some((f) => /alternativa/i.test(f.q))) {
    lista.push(c.enDolares ? {
      q: `¿Cuál es una buena alternativa a ${c.nombre} en Chile y Latinoamérica?`,
      a: `Depende de tu local. SynapTech cobra un precio fijo por local con profesionales ilimitados: fuera de Chile, US$${AGENDA_LATAM.precio} al mes, o US$${IA_LATAM.precio} con un asistente con IA que responde y agenda en el WhatsApp de tu local; en Chile, desde $29.900 + IVA. Incluye club de fidelización con Google Wallet y Apple Wallet, y la mudanza desde ${c.nombre} es gratis.`,
    } : {
      q: `¿Cuál es una buena alternativa a ${c.nombre} en Chile?`,
      a: `Depende de tu local. SynapTech cobra un precio fijo por local con profesionales ilimitados (desde $29.900 + IVA), incluye club de fidelización con Google Wallet y Apple Wallet, y en el plan Pro ($49.900 + IVA) un asistente con IA que responde y agenda en el WhatsApp de tu local. La mudanza desde ${c.nombre} es gratis.`,
    });
  }
  return lista;
}

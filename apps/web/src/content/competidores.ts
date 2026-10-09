/* Páginas "SynapTech vs <agenda>" (/comparar/<id>), hechas para aparecer cuando
   alguien busca a la competencia en Google ("agendapro precios", "alternativa a
   weibook"...).
   TODO dato de otra empresa sale de lo verificado el 09-10-2026 en sus páginas
   públicas: devtools/guias-panel/sitio-web/comparar/competencia-2026-10-09.json
   (+ capturas). Si un precio cambia, se vuelve a medir antes de tocar esto.
   Reglas:
   - Honestidad primero: si con pocos profesionales la otra es más barata, se
     dice. Una comparativa que esconde eso no la cree nadie.
   - Lo que no publican va como "No publicado", nunca como "No".
   - Logos: los oficiales de cada marca (public/competencia/, fuente en
     devtools/.../comparar/logos/logos.json). Marcas ajenas, uso solo para
     identificarlas en la comparación. */

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
};

export const FECHA_VERIFICACION = "9 de octubre de 2026";

const NOSOTROS_PRECIO: Precio = { valor: "$29.900 + IVA", nota: "Básico, profesionales ilimitados" };

export const SYNAPTECH = {
  precios: [NOSOTROS_PRECIO, NOSOTROS_PRECIO, NOSOTROS_PRECIO, NOSOTROS_PRECIO] as [Precio, Precio, Precio, Precio],
  pro: "$49.900 + IVA",
};

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
      { tema: "Recordatorios por WhatsApp", ellos: "Desde $5.000 + IVA por 50 al mes", nosotros: "Bolsas desde $3.990 + IVA" },
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
        "acá te dejo otra diferencia con agendapro, me pasaba q todos los meses agendapro por temas de sistema quedaban algunas boletas emitidas al siguiente día pero con fecha anterior y eso me descuadrada",
        "En el caso d tu aplicación las boletas se emiten todas al momento y quedan regustradas esa es una gran diferencia",
      ],
      autor: "Danilo", rol: "Socio a cargo de la contabilidad", local: "El 10 Salón Masculino, Parral", fecha: "30 sep 2026",
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
      { tema: "WhatsApp y SMS", ellos: "20 gratis al mes por miembro; después, de $65 a $315 cada WhatsApp", nosotros: "Desde el WhatsApp de tu local, o bolsas desde $3.990 + IVA" },
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
];

export const competidor = (id: string) => COMPETIDORES.find((c) => c.id === id);

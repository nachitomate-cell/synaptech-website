import type { Pregunta } from "@/components/FaqSeo";
import {
  AGENCIA_EQUIPO, AGENCIA_SOLO, MARCA_ADICIONAL, TEMPORADA_BAJA, adicionalAgencia, type Reemplazos,
} from "@/content/agencias";
import { fmt } from "@/content/precios";

/* Una página por tipo de agencia: /agencias/[tipo] (09-11-2026).

   Para qué: que una agencia de tours, una corredora de propiedades o una
   automotora que busca "chatbot de WhatsApp para <su rubro>" llegue a una
   página escrita para ella, con su situación, lo que el asistente hace ahí y
   sus preguntas. Mismos planes y precios para todas (content/agencias.ts):
   lo que cambia son las palabras.

   Reglas (mismas que /agencias):
   - Solo se afirma lo que la plataforma hace hoy: asistente en el WhatsApp
     propio (QR) y en los mensajes de Instagram, una sola bandeja, reparto por
     turnos con aviso al celular, tablero por etapas, cierre desde el chat,
     comisiones, seguimiento a las 48 horas (una vez, no si dijo que no) y en
     lote, español/portugués/inglés, pesos o reales.
   - NO se promete: conexión con portales (Portal Inmobiliario, Booking),
     sistemas de reservas (Amadeus), cotizadores de aseguradoras, DMS ni otros
     CRM; correo, SMS, Messenger, chat web ni llamadas; cobro dentro del chat;
     agendar visitas, pruebas de manejo o fechas por su cuenta.
   - Sin nombres de clientes, testimonios, cifras de resultados ni competencia.
     Los chats de ejemplo son inventados y lo dicen. */

export type MensajeEjemplo = { de: "cliente" | "asistente" | "aviso"; texto: string };

export type TipoAgencia = {
  slug: string;
  /** Nombre en migas y títulos de tarjeta. */
  nombre: string;
  /** Texto corto de los enlaces (footer, franja de la portada). */
  etiqueta: string;
  /** "una agencia de tours": va en el WhatsApp prellenado ("Hola, tengo ..."). */
  quien: string;
  /** Una línea para las tarjetas que enlazan a la página. */
  resumen: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  bajada: string;
  situacion: { titulo: string; parrafos: string[] };
  escenariosTitulo: string;
  escenarios: { titulo: string; detalle: string }[];
  ejemplo: MensajeEjemplo[];
  faq: Pregunta[];
  /** Palabras de turismo → palabras de este tipo, para los planes. */
  reemplazos: Reemplazos;
  /** Muestra la tarjeta de temporada baja (solo turismo). */
  temporadaBaja: boolean;
  /** Para el Service del JSON-LD. */
  serviceType: string;
  /** Guía relacionada (content/guias-duenos.ts). */
  guia?: string;
  og: { pill: string; titular: string; bajada: string };
};

const IG = adicionalAgencia("instagram");
const EXTRA = adicionalAgencia("conversaciones");

/* Reemplazos de los textos de los planes. La base está en palabras de turismo. */
const equipo = (plural: string, singular: string, masculino: boolean): Reemplazos => {
  const Cap = plural.charAt(0).toUpperCase() + plural.slice(1);
  return [
    ["Vendedoras ilimitadas, cada una", `${Cap} ilimitad${masculino ? "os" : "as"}, cada ${masculino ? "uno" : "una"}`],
    ["Las mismas vendedoras", `L${masculino ? "os" : "as"} mism${masculino ? "os" : "as"} ${plural}`],
    ["vendedoras", plural],
    ["vendedora", singular],
  ];
};
const SIN_REALES: Reemplazos = [["Responde en español, portugués e inglés, y cotiza en pesos o en reales", "Responde en español, portugués o inglés, según cómo le escriban"]];
const PERSONAS: Reemplazos = [["con monto y pasajeros", "con monto y número de personas"]];
const quien = (q: string): Reemplazos => [["tengo una agencia", `tengo ${q}`]];
const catalogo = (c: string): Reemplazos => [["catálogo de paseos y traslados", c]];

/* Respuestas que se repiten con datos de los planes (nunca precios escritos a mano). */
const respuestaInstagram = (clientes: string) =>
  `Sí. En ${AGENCIA_EQUIPO.nombre} el asistente responde también los mensajes directos de Instagram, y ${clientes} caen en la misma bandeja que los de WhatsApp. En ${AGENCIA_SOLO.nombre}, Instagram se suma por ${fmt(IG.mes)} + IVA al mes.`;
const respuestaConversaciones = (cliente: string) =>
  `Una conversación es ${cliente} durante 24 horas, mande los mensajes que mande. ${AGENCIA_SOLO.nombre} trae ${AGENCIA_SOLO.conversaciones} al mes y ${AGENCIA_EQUIPO.nombre} ${AGENCIA_EQUIPO.conversaciones}, entre WhatsApp e Instagram. Si te pasas, el asistente sigue contestando y las extra cuestan ${fmt(EXTRA.mes)} + IVA cada 100.`;
const respuestaTemporada = `Hasta ${TEMPORADA_BAJA.meses} meses al año, ${AGENCIA_EQUIPO.nombre} baja a ${fmt(TEMPORADA_BAJA.mes)} + IVA al mes, con ${TEMPORADA_BAJA.conversaciones} conversaciones. Tu equipo y tu historial quedan intactos.`;
const respuestaCatalogo = (que: string) =>
  `Pegas tu lista de precios o subes la foto de un afiche o una publicación. La IA la lee, arma el catálogo de ${que} y tú lo revisas antes de que el asistente lo use. Cuando algo cambia, lo actualizas igual.`;

const desde = `Desde ${fmt(AGENCIA_SOLO.mes)} + IVA`;

export const TIPOS_AGENCIA: TipoAgencia[] = [
  /* ── Tours y excursiones (turismo receptivo) ─────────────────────────── */
  {
    slug: "tours-y-excursiones",
    nombre: "Tours y excursiones",
    etiqueta: "Agencias de tours",
    quien: "una agencia de tours",
    resumen: "Full days, city tours y turismo receptivo, en español, portugués e inglés.",
    title: "Chatbot de WhatsApp para agencias de tours | SynapTech",
    description: `Asistente con IA que cotiza tus full days y city tours en portugués, inglés o español, en reales o pesos, y reparte los chats. ${desde}.`,
    eyebrow: "Para agencias de tours y excursiones",
    h1: "Tu agencia de tours, cotizando en portugués a las once de la noche.",
    bajada: "El pasajero escribe desde el hotel, en su idioma, y quiere saber cuánto sale el full day de mañana. El asistente le responde al tiro con tu catálogo, en reales o en pesos, y le pasa la venta a la vendedora de turno.",
    situacion: {
      titulo: "Así se vende un tour hoy.",
      parrafos: [
        "En turismo receptivo casi todo pasa por WhatsApp e Instagram. El pasajero llega a Santiago, Valparaíso o San Pedro, ve un anuncio o una historia y escribe para preguntar precio, horario y qué incluye. Muchas veces escribe en portugués o en inglés, y casi siempre de noche, cuando está armando el día siguiente.",
        "El que contesta primero se queda con la venta. Si la respuesta llega a la mañana siguiente, el pasajero ya compró en otra agencia o en el mesón del hotel. Y en temporada alta el mismo paseo se cotiza muchas veces al día, con las mismas preguntas: a qué hora pasan a buscar, si incluye almuerzo, cuánto sale para cuatro.",
      ],
    },
    escenariosTitulo: "Lo que hace el asistente en una agencia de tours.",
    escenarios: [
      { titulo: "Cotiza en el idioma del pasajero", detalle: "Si escribe en portugués, responde en portugués y con el precio en reales. Si escribe en inglés o en español, igual. Usa los precios, horarios y condiciones que tú cargaste." },
      { titulo: "Responde lo que siempre preguntan", detalle: "Hora y lugar de recogida, qué incluye, qué conviene llevar, si sirve para niños. Todo sale de la ficha de cada paseo." },
      { titulo: "Arma el pedido y lo pasa", detalle: "Cuando el pasajero quiere comprar, deja anotado el paseo y cuántas personas van, y asigna la conversación a la vendedora de turno, que recibe el aviso en su celular." },
      { titulo: "La venta se cierra en el chat", detalle: "La vendedora coordina el pago como lo hace hoy y cierra la venta desde la misma conversación, con el monto y los pasajeros. Su comisión queda calculada para fin de mes." },
      { titulo: "Retoma al que quedó pensando", detalle: "A las 48 horas le pregunta «¿sigues interesado?» a quien dejó de responder, una sola vez. Si el pasajero dijo que no, no le escribe." },
      { titulo: "Recibe los chats de tus anuncios", detalle: "Si pautas en Instagram o Facebook hacia Brasil, esos mensajes entran al mismo asistente, y en el panel ves cuántos escribieron y cuánto invertiste." },
    ],
    ejemplo: [
      { de: "cliente", texto: "Oi! Quanto custa o full day ao Cajón del Maipo para 2 pessoas amanhã?" },
      { de: "asistente", texto: "Oi! O full day ao Cajón del Maipo sai às 7h30 do seu hotel e volta por volta das 18h. Para 2 pessoas fica R$ 520 no total, com almoço incluído. Quer que uma vendedora confirme a vaga para amanhã?" },
      { de: "cliente", texto: "Sim, por favor!" },
      { de: "aviso", texto: "Conversación asignada a Camila. Le llegó el aviso al celular." },
    ],
    faq: [
      { q: "¿Puede cotizar en reales?", a: "Sí. Cotiza en pesos chilenos o en reales, con los precios que tú le das, y responde en portugués si el pasajero escribe en portugués. Así el pasajero brasileño no tiene que hacer la conversión." },
      { q: "¿El asistente cobra el tour?", a: "No. El pago lo coordina tu vendedora como lo hace hoy. Al cerrar la venta en el chat queda anotado el monto y cuántos pasajeros van, y con eso se calcula su comisión." },
      { q: "¿Qué pasa con las preguntas que no sabe responder?", a: "Le pasa la conversación a tu equipo. Tus vendedoras pueden tomar cualquier chat cuando quieran, y tú decides si con un cliente responde el asistente, responde una persona o el asistente no le escribe nunca." },
      { q: "¿Sirve si vendo los mismos tours por Instagram?", a: respuestaInstagram("esos mensajes") },
      { q: "¿Y en temporada baja?", a: respuestaTemporada },
      { q: "¿Cuántas conversaciones necesito?", a: respuestaConversaciones("un pasajero") },
    ],
    reemplazos: quien("una agencia de tours"),
    temporadaBaja: true,
    serviceType: "Asistente con IA por WhatsApp e Instagram para agencias de tours y excursiones",
    guia: "vender-tours-por-whatsapp-a-turistas-brasilenos",
    og: { pill: "Para agencias de tours y excursiones", titular: "Tus tours cotizados en portugués, al minuto.", bajada: "Full days y city tours en español, portugués e inglés, en pesos o en reales." },
  },

  /* ── Transfers y traslados ───────────────────────────────────────────── */
  {
    slug: "transfers-y-traslados",
    nombre: "Transfers y traslados",
    etiqueta: "Transfers y traslados",
    quien: "una empresa de transfers",
    resumen: "Traslados al aeropuerto, choferes por hora y transfers para grupos.",
    title: "Chatbot de WhatsApp para transfers y traslados | SynapTech",
    description: `Cotiza traslados al aeropuerto y choferes por hora en español, portugués o inglés, pide vuelo y dirección, y pasa el chat a tu equipo. ${desde}.`,
    eyebrow: "Para empresas de transfers y traslados",
    h1: "Traslados cotizados al minuto, con los datos del vuelo ya pedidos.",
    bajada: "Quien busca un transfer quiere el precio, que lo pasen a buscar a la hora y saber que alguien le contestó. El asistente cotiza con tu tarifa, pide vuelo, hora y dirección, y deja el chat listo para que tu equipo confirme.",
    situacion: {
      titulo: "Lo difícil de un transfer no es el viaje, es la coordinación.",
      parrafos: [
        "Un traslado se cotiza con pocos datos: desde dónde, hacia dónde, cuántas personas, cuántas maletas y a qué hora. Pero esos datos casi nunca llegan juntos. El pasajero pregunta el precio, desaparece, vuelve a escribir desde el aeropuerto y alguien tiene que buscar la conversación de hace tres días.",
        "Además, las consultas llegan a cualquier hora, porque los vuelos aterrizan a cualquier hora. Si nadie contesta a las dos de la mañana, el pasajero toma lo primero que encuentra en el aeropuerto.",
      ],
    },
    escenariosTitulo: "Lo que hace el asistente en una empresa de traslados.",
    escenarios: [
      { titulo: "Cotiza con tu tarifa", detalle: "Aeropuerto a hotel, hotel a centro de ski, chofer por hora. Responde con las tarifas que cargaste, según el tramo y cuántas personas viajan." },
      { titulo: "Pide los datos que tu chofer necesita", detalle: "Número de vuelo, fecha, hora, dirección y cantidad de maletas. Tú defines qué datos pide y en qué orden antes de pasarle la conversación a tu equipo." },
      { titulo: "Atiende al pasajero extranjero", detalle: "Responde en portugués o en inglés si el pasajero escribe así, y cotiza en pesos o en reales." },
      { titulo: "Nada se pierde en el chat", detalle: "Toda la conversación queda en la bandeja con su historial. Si el pasajero vuelve a escribir días después, tu equipo ve lo que se habló y en qué etapa quedó." },
      { titulo: "Cada vendedor con sus traslados", detalle: "Las conversaciones se reparten solas y a cada uno le llega el aviso al celular. Cada vendedor ve sus chats; tú ves todo." },
    ],
    ejemplo: [
      { de: "cliente", texto: "Hi, how much is a transfer from SCL airport to Providencia for 3 people? We land Friday at 6:40 am" },
      { de: "asistente", texto: "Hi! A private transfer from the airport to Providencia for 3 people is CLP 38,000 in total, luggage included. Could you send me your flight number and the hotel address? Our team will confirm your driver." },
      { de: "aviso", texto: "Conversación asignada a Matías, con el vuelo y la dirección ya pedidos." },
    ],
    faq: [
      { q: "¿El asistente asigna el chofer?", a: "No. El asistente cotiza, pide los datos del traslado y le pasa la conversación a tu equipo, que confirma el chofer y la hora como lo hace hoy." },
      { q: "¿Puedo cobrar distinto de noche o por maleta extra?", a: "Sí, si lo pones en tu lista de precios. El asistente responde con lo que cargas: tarifa nocturna, recargo por maleta o precio por hora de chofer." },
      { q: "¿Qué pasa si el pasajero escribe de madrugada?", a: "El asistente contesta igual, a cualquier hora. Tu equipo ve la conversación en la mañana con los datos del traslado ya pedidos." },
      { q: "¿Sirve para traslados de grupos o de empresas?", a: "Sí. Responde con tus tarifas por grupo y, al cerrar la venta desde el chat, queda anotado el monto y cuántas personas viajan." },
      { q: "¿Funciona con mi número actual?", a: "Sí. Conectamos tu WhatsApp de siempre con un código QR y tus pasajeros te siguen escribiendo al mismo número." },
      { q: "¿Y en temporada baja?", a: respuestaTemporada },
    ],
    reemplazos: [...equipo("vendedores", "vendedor", true), ...quien("una empresa de transfers"), ...catalogo("catálogo de traslados")],
    temporadaBaja: true,
    serviceType: "Asistente con IA por WhatsApp e Instagram para empresas de transfers y traslados",
    og: { pill: "Para transfers y traslados", titular: "Traslados cotizados con el vuelo ya pedido.", bajada: "Aeropuerto, choferes por hora y grupos, en español, portugués e inglés." },
  },

  /* ── Viajes y paquetes (agencias emisoras) ───────────────────────────── */
  {
    slug: "viajes-y-paquetes",
    nombre: "Viajes y paquetes",
    etiqueta: "Agencias de viajes",
    quien: "una agencia de viajes",
    resumen: "Agencias emisoras: paquetes, cruceros, lunas de miel y viajes en grupo.",
    title: "Chatbot con IA para agencias de viajes | SynapTech",
    description: "Un asistente con IA que responde por tus paquetes y cruceros en WhatsApp e Instagram, pide fechas y presupuesto, y reparte cada cliente a una ejecutiva.",
    eyebrow: "Para agencias de viajes y paquetes",
    h1: "Tus paquetes respondidos al tiro, y cada cliente con su ejecutiva.",
    bajada: "Quien pregunta por un paquete al Caribe o por un crucero está cotizando en varias agencias a la vez. El asistente responde con tu catálogo, pide fechas, cuántos viajan y el presupuesto, y le pasa la conversación a la ejecutiva que le toca.",
    situacion: {
      titulo: "Un paquete se vende en varias conversaciones.",
      parrafos: [
        "Una agencia emisora vende viajes que se deciden en semanas. La familia pregunta en marzo por las vacaciones de invierno, compara precios, lo conversa en la casa y vuelve a escribir. En el camino, la conversación pasa por WhatsApp, por Instagram y a veces por dos ejecutivas distintas.",
        "El problema no es solo responder rápido. Es saber en qué quedó cada cliente, quién lo está atendiendo y a quién hay que volver a escribirle.",
      ],
    },
    escenariosTitulo: "Lo que hace el asistente en una agencia de viajes.",
    escenarios: [
      { titulo: "Responde por tus paquetes vigentes", detalle: "Destinos, fechas de salida, qué incluye y desde cuánto, con los paquetes que cargaste. Si sacas una promoción, subes la foto del afiche, la IA la lee y tú confirmas." },
      { titulo: "Pide lo que tu ejecutiva necesita", detalle: "Fechas, cuántos adultos y niños, desde qué ciudad salen y el presupuesto. La ejecutiva parte con la cotización encaminada." },
      { titulo: "Un cliente, una ejecutiva", detalle: "Cada conversación nueva se asigna por turnos, le llega el aviso al celular a la ejecutiva y queda en su cartera." },
      { titulo: "El embudo de cada ejecutiva", detalle: "En el tablero ves quién preguntó, a quién se le cotizó, quién reservó y quién compró, por ejecutiva y por período." },
      { titulo: "Seguimiento sin planilla", detalle: "A las 48 horas el asistente le pregunta si sigue interesado a quien dejó de responder. Y desde el tablero haces seguimiento en lote a quienes escribieron en las últimas 24 horas." },
      { titulo: "Comisiones calculadas solas", detalle: "Al cerrar la venta queda el monto y los pasajeros. Lo que se paga a terceros, como entradas o tickets, se descuenta antes de calcular la comisión." },
    ],
    ejemplo: [
      { de: "cliente", texto: "Hola! cuánto sale el paquete a Punta Cana en julio para 2 adultos y 1 niño?" },
      { de: "asistente", texto: "¡Hola! El paquete a Punta Cana de 7 noches, todo incluido y con vuelo desde Santiago, parte en $1.890.000 por adulto y $990.000 por niño en julio. ¿Qué fechas tienen en mente? Con eso te dejo con una ejecutiva para el valor final." },
      { de: "aviso", texto: "Conversación asignada a Daniela, con fechas y pasajeros." },
    ],
    faq: [
      { q: "¿Se conecta con Amadeus o con un sistema de reservas?", a: "No. El asistente trabaja con el catálogo que tú cargas: paquetes, salidas y precios de referencia. La disponibilidad y el precio final de vuelos y hoteles los confirma tu ejecutiva." },
      { q: "¿Cómo cargo mis paquetes?", a: respuestaCatalogo("paquetes") },
      { q: "¿Puede atender las consultas que llegan por Instagram?", a: respuestaInstagram("esos mensajes") },
      { q: "Tengo dos marcas, ¿cómo funciona?", a: `Con el adicional de marca o número (${fmt(MARCA_ADICIONAL.mes)} + IVA al mes), cada marca tiene su WhatsApp, su asistente y su catálogo, y las mismas ejecutivas atienden las dos desde una sola app. Las ventas y comisiones quedan separadas por marca.` },
      { q: "¿Qué pasa si el cliente quiere hablar con una persona?", a: "El asistente le pasa la conversación a tu ejecutiva, que la toma desde su app. También puedes decidir que con ciertos clientes el asistente no responda nunca." },
      { q: "¿Y en temporada baja?", a: respuestaTemporada },
    ],
    reemplazos: [...equipo("ejecutivas", "ejecutiva", false), ...quien("una agencia de viajes"), ...catalogo("catálogo de paquetes")],
    temporadaBaja: true,
    serviceType: "Asistente con IA por WhatsApp e Instagram para agencias de viajes",
    og: { pill: "Para agencias de viajes y paquetes", titular: "Cada cliente con su ejecutiva, y nadie sin respuesta.", bajada: "Paquetes y cruceros respondidos en WhatsApp e Instagram, con tablero de ventas." },
  },

  /* ── Intercambios y estudios en el extranjero ────────────────────────── */
  {
    slug: "intercambios-y-estudios",
    nombre: "Intercambios y estudios en el extranjero",
    etiqueta: "Agencias de intercambio",
    quien: "una agencia de intercambios",
    resumen: "Cursos de inglés afuera, work and travel y programas de estudio.",
    title: "Chatbot de WhatsApp para agencias de intercambio | SynapTech",
    description: "Un asistente con IA que responde por tus programas de inglés afuera y work and travel, pide edad, destino y fecha, y reparte los chats a tus asesoras.",
    eyebrow: "Para agencias de intercambio y estudios",
    h1: "Que cada estudiante que pregunta por un intercambio tenga respuesta.",
    bajada: "Estudiar inglés en Irlanda o hacer un work and travel se decide en meses y con muchas preguntas. El asistente responde con tus programas, pide lo que tu asesora necesita y le escribe de nuevo a quien dejó de responder.",
    situacion: {
      titulo: "Una decisión larga, con muchas preguntas.",
      parrafos: [
        "Quien pregunta por un intercambio no compra en el primer mensaje. Pregunta por destinos, duración, visa, alojamiento y cuánto sale en total, lo conversa en la casa y vuelve semanas después. A veces escribe el estudiante y otras veces la mamá o el papá.",
        "Cada una de esas preguntas se responde con la misma información, programa por programa. Y si la respuesta tarda, el estudiante sigue mirando otras agencias en Instagram.",
      ],
    },
    escenariosTitulo: "Lo que hace el asistente en una agencia de intercambios.",
    escenarios: [
      { titulo: "Responde por cada programa", detalle: "Destino, duración, tipo de curso, alojamiento y precio, con la información de tus programas. Si algo no está cargado, no lo inventa: se lo pasa a tu asesora." },
      { titulo: "Pide lo que tu asesora necesita", detalle: "Edad, nivel de inglés, destino que le interesa, cuándo quiere viajar y presupuesto. Tú eliges qué datos pide y en qué orden." },
      { titulo: "Deriva lo que no le toca", detalle: "Las preguntas de visa o de casos particulares las pasa a tu equipo. Tú decides qué temas no responde nunca." },
      { titulo: "Retoma a quien quedó pensando", detalle: "A las 48 horas le pregunta si sigue interesado a quien dejó de responder, una vez. Y desde el tablero haces seguimiento en lote a quienes escribieron en las últimas 24 horas." },
      { titulo: "Cada asesora con su cartera", detalle: "Las conversaciones se reparten solas, a cada asesora le llega el aviso al celular y en el tablero ves en qué etapa está cada estudiante." },
    ],
    ejemplo: [
      { de: "cliente", texto: "Hola, quiero estudiar inglés en Irlanda 6 meses el próximo año, cuánto sale más o menos?" },
      { de: "asistente", texto: "¡Hola! Tenemos el programa de inglés general en Dublín de 25 semanas, con 20 clases a la semana. El curso parte en $3.200.000, sin pasajes ni alojamiento. Para orientarte mejor, ¿qué edad tienes y en qué mes te gustaría partir?" },
      { de: "aviso", texto: "Conversación asignada a Fernanda, con edad y fecha de viaje." },
    ],
    faq: [
      { q: "¿El asistente puede asesorar sobre visas?", a: "Solo con la información general que tú le cargues. Si la pregunta es de un caso particular, se la pasa a tu asesora. Tú decides qué temas no responde nunca." },
      { q: "¿Cómo cargo mis programas?", a: respuestaCatalogo("programas") },
      { q: "¿Qué pasa si el estudiante vuelve a escribir meses después?", a: "La conversación sigue en la bandeja con todo su historial, y tu asesora ve lo que se habló y en qué etapa quedó." },
      { q: "¿Atiende a estudiantes de Brasil?", a: "Sí. Responde en portugués, español o inglés, según cómo escriba la persona." },
      { q: "¿Cuántas conversaciones necesito?", a: respuestaConversaciones("una persona") },
    ],
    reemplazos: [...equipo("asesoras", "asesora", false), ...SIN_REALES, ...PERSONAS, ...quien("una agencia de intercambios"), ...catalogo("catálogo de programas")],
    temporadaBaja: false,
    serviceType: "Asistente con IA por WhatsApp e Instagram para agencias de intercambio y estudios en el extranjero",
    guia: "repartir-chats-de-whatsapp-entre-vendedores",
    og: { pill: "Para agencias de intercambio", titular: "Cada estudiante que pregunta, con respuesta.", bajada: "Programas de inglés y work and travel respondidos en WhatsApp e Instagram." },
  },

  /* ── Eventos y matrimonios ───────────────────────────────────────────── */
  {
    slug: "eventos",
    nombre: "Eventos y matrimonios",
    etiqueta: "Productoras de eventos",
    quien: "una productora de eventos",
    resumen: "Productoras, centros de eventos, banquetería y matrimonios.",
    title: "Chatbot de WhatsApp para productoras de eventos | SynapTech",
    description: "Un asistente con IA que responde por tus paquetes de matrimonios y eventos, pide fecha, invitados y comuna, y reparte cada cotización a tu equipo.",
    eyebrow: "Para productoras y centros de eventos",
    h1: "Cada pareja que pregunta por su matrimonio, respondida al tiro.",
    bajada: "Un evento se cotiza con tres datos: fecha, número de invitados y lugar. El asistente los pide, responde con tus paquetes y tus precios por persona, y le pasa la conversación a la ejecutiva que va a cerrar.",
    situacion: {
      titulo: "Muchas consultas, pocas fechas.",
      parrafos: [
        "Una productora o un centro de eventos recibe muchas más consultas que fechas disponibles. Gran parte son para saber precios: cuánto sale por persona, qué incluye el menú, si hay música o barra. Responder cada una a mano se come el día del equipo.",
        "Y las consultas que sí van en serio se pierden igual si nadie les vuelve a escribir. Una pareja que cotiza su matrimonio habla con varias productoras a la vez.",
      ],
    },
    escenariosTitulo: "Lo que hace el asistente en una productora de eventos.",
    escenarios: [
      { titulo: "Responde con tus paquetes", detalle: "Menú, barra, música, decoración y precio por persona, con los paquetes que cargaste. Si tienes un afiche con precios, subes la foto, la IA lo lee y tú confirmas." },
      { titulo: "Pide fecha, invitados y comuna", detalle: "Antes de pasar la conversación, pregunta lo que tu equipo necesita para cotizar. Tú eliges qué datos y en qué orden." },
      { titulo: "Cada cotización con su ejecutiva", detalle: "Las conversaciones se reparten solas y a la ejecutiva le llega el aviso al celular. Cada una ve sus clientes; tú ves todo el equipo." },
      { titulo: "El tablero de la temporada", detalle: "Cada consulta en su etapa: nueva, cotizada, reservada, cerrada o perdida. Por ejecutiva y por período." },
      { titulo: "Cierre con monto e invitados", detalle: "Al cerrar la venta desde el chat queda el monto y el número de personas, y la comisión de cada ejecutiva sale calculada a fin de mes." },
      { titulo: "Seguimiento a las 48 horas", detalle: "A quien recibió precios y dejó de responder, el asistente le pregunta una vez si sigue interesado. Si dijo que no, no le escribe." },
    ],
    ejemplo: [
      { de: "cliente", texto: "Hola! queríamos cotizar matrimonio para 120 personas el 14 de marzo en Casablanca" },
      { de: "asistente", texto: "¡Hola, felicitaciones! Para 120 personas el paquete Viñedo trae cóctel, cena de tres tiempos y barra abierta por 5 horas, desde $48.000 por persona. ¿Ya tienen el lugar o lo buscan con nosotros? Con eso te dejo con una ejecutiva para la propuesta." },
      { de: "aviso", texto: "Conversación asignada a Josefa, con fecha, invitados y comuna." },
    ],
    faq: [
      { q: "¿El asistente ve qué fechas tengo libres?", a: "No. Responde por tus paquetes y precios, y la disponibilidad de la fecha la confirma tu ejecutiva cuando toma la conversación." },
      { q: "¿Puede cotizar por número de invitados?", a: "Sí, si tu lista tiene precio por persona o por tramo de invitados. Responde con eso y deja claro que la propuesta final la manda tu equipo." },
      { q: "¿Sirve para eventos de empresa y cumpleaños?", a: "Sí. Funciona igual para matrimonios, cumpleaños o eventos corporativos: responde con tus paquetes, pide los datos y pasa la conversación a tu equipo." },
      { q: "¿Y si me escriben por Instagram?", a: respuestaInstagram("esas consultas") },
      { q: "¿Cuántas conversaciones necesito?", a: respuestaConversaciones("una persona") },
    ],
    reemplazos: [...equipo("ejecutivas", "ejecutiva", false), ...SIN_REALES, ...PERSONAS, ...quien("una productora de eventos"), ...catalogo("catálogo de paquetes")],
    temporadaBaja: false,
    serviceType: "Asistente con IA por WhatsApp e Instagram para productoras de eventos y matrimonios",
    og: { pill: "Para productoras de eventos", titular: "Cada consulta por un evento, respondida al tiro.", bajada: "Paquetes y precios por persona en WhatsApp e Instagram, con tablero de ventas." },
  },

  /* ── Corredoras de propiedades ───────────────────────────────────────── */
  {
    slug: "inmobiliarias",
    nombre: "Corredoras de propiedades",
    etiqueta: "Corredoras de propiedades",
    quien: "una corredora de propiedades",
    resumen: "Arriendos y ventas: responde por cada propiedad y reparte a tus corredores.",
    title: "Chatbot de WhatsApp para inmobiliarias | SynapTech",
    description: "Un asistente con IA que responde por tus arriendos y ventas en WhatsApp e Instagram, pide presupuesto y comuna, y reparte cada interesado a un corredor.",
    eyebrow: "Para corredoras de propiedades e inmobiliarias",
    h1: "Cada interesado en una propiedad, respondido y con su corredor.",
    bajada: "Publicas un departamento y el WhatsApp se llena de «¿sigue disponible?». El asistente responde con los datos de cada propiedad, pide lo que necesitas para filtrar y le pasa la conversación al corredor que le toca.",
    situacion: {
      titulo: "Mucho «¿sigue disponible?», pocas visitas.",
      parrafos: [
        "En arriendos y ventas, cada publicación en portales o en Instagram trae muchos mensajes con las mismas preguntas: precio, gastos comunes, si acepta mascotas, si piden aval. Responder uno por uno le quita al corredor el tiempo que necesita para mostrar propiedades.",
        "Y cuando la oficina tiene varios corredores, los interesados se cruzan: dos corredores le escriben a la misma persona, o no le escribe ninguno.",
      ],
    },
    escenariosTitulo: "Lo que hace el asistente en una corredora de propiedades.",
    escenarios: [
      { titulo: "Responde por cada propiedad", detalle: "Precio, gastos comunes, metros, estacionamiento, si acepta mascotas. Responde con la ficha de cada propiedad que cargaste." },
      { titulo: "Pide lo que tu corredor necesita", detalle: "Si es arriendo o compra, presupuesto, comuna, cuándo se cambiaría, si tiene aval o crédito preaprobado. Tú eliges las preguntas y el orden." },
      { titulo: "Cada interesado con su corredor", detalle: "Las conversaciones se reparten solas por turnos y al corredor le llega el aviso al celular. Cada uno ve su cartera; tú ves toda la oficina." },
      { titulo: "La visita la coordina una persona", detalle: "Cuando el interesado quiere ver la propiedad, el asistente le pasa la conversación al corredor, que coordina la visita. Nada de horarios inventados." },
      { titulo: "El tablero de la oficina", detalle: "Cada interesado en su etapa, de nuevo a cerrado, por corredor y por período. Sabes quién está trabajando sus contactos y a quién se le están enfriando." },
      { titulo: "Comisiones por corredor", detalle: "Al cerrar desde el chat queda el monto, y la comisión de cada corredor sale calculada a fin de mes." },
    ],
    ejemplo: [
      { de: "cliente", texto: "Hola, sigue disponible el depto 2D2B en Ñuñoa? acepta mascotas?" },
      { de: "asistente", texto: "¡Hola! Sí, el departamento de Ñuñoa sigue publicado: 2 dormitorios, 2 baños, 68 m², $620.000 de arriendo más $95.000 de gastos comunes, y acepta mascotas pequeñas. ¿Para cuándo te cambiarías?" },
      { de: "aviso", texto: "Conversación asignada a Rodrigo, con fecha de cambio y presupuesto." },
    ],
    faq: [
      { q: "¿Se conecta con Portal Inmobiliario u otros portales?", a: "No. El asistente responde en tu WhatsApp y en tu Instagram con las propiedades que tú cargas. Si publicas en portales y los interesados te escriben a tu WhatsApp, esas conversaciones sí las atiende." },
      { q: "¿Cómo cargo mis propiedades?", a: `${respuestaCatalogo("propiedades")} Cuando arriendas o vendes una, la sacas del catálogo.` },
      { q: "¿Puede agendar las visitas?", a: "No las agenda solo. Toma los datos del interesado y le pasa la conversación al corredor, que coordina la visita." },
      { q: "¿Sirve para ventas además de arriendos?", a: "Sí. En ventas puedes pedirle que pregunte por el presupuesto, el pie o si tiene crédito preaprobado antes de pasarle el interesado al corredor." },
      { q: "¿Y si me escriben por Instagram?", a: respuestaInstagram("esos mensajes") },
      { q: "¿Cuántas conversaciones necesito?", a: respuestaConversaciones("un interesado") },
    ],
    reemplazos: [...equipo("corredores", "corredor", true), ...SIN_REALES, ...PERSONAS, ...quien("una corredora de propiedades"), ...catalogo("catálogo de propiedades")],
    temporadaBaja: false,
    serviceType: "Asistente con IA por WhatsApp e Instagram para corredoras de propiedades",
    og: { pill: "Para corredoras de propiedades", titular: "Cada interesado respondido y con su corredor.", bajada: "Arriendos y ventas en WhatsApp e Instagram, con tablero y comisiones." },
  },

  /* ── Corredoras de seguros ───────────────────────────────────────────── */
  {
    slug: "seguros",
    nombre: "Corredoras de seguros",
    etiqueta: "Corredoras de seguros",
    quien: "una corredora de seguros",
    resumen: "Seguros de auto, hogar, salud y vida: pide los datos y pasa a un ejecutivo.",
    title: "Chatbot de WhatsApp para corredoras de seguros | SynapTech",
    description: "Un asistente con IA que responde dudas generales de seguros en WhatsApp e Instagram, pide los datos para cotizar y le pasa cada cliente a un ejecutivo.",
    eyebrow: "Para corredoras de seguros",
    h1: "Las cotizaciones de seguros te llegan con los datos ya pedidos.",
    bajada: "Para cotizar un seguro de auto necesitas patente, año, modelo y comuna. El asistente los pide, responde las dudas generales con la información que tú cargas y le pasa la conversación al ejecutivo que va a cotizar.",
    situacion: {
      titulo: "Cotizar es rápido. Juntar los datos, no.",
      parrafos: [
        "En una corredora, la mayoría de las conversaciones parte igual: alguien vio un anuncio y pregunta cuánto sale asegurar su auto o su casa. Antes de dar un precio hay que pedir varios datos, y el cliente los manda por partes, a veces en días distintos.",
        "Mientras tanto, el ejecutivo se pasa el día persiguiendo datos en vez de cotizar y cerrar.",
      ],
    },
    escenariosTitulo: "Lo que hace el asistente en una corredora de seguros.",
    escenarios: [
      { titulo: "Pide los datos para cotizar", detalle: "Patente, marca, modelo y año para un auto; dirección y metros para el hogar; edad para salud o vida. Tú eliges qué pide para cada seguro." },
      { titulo: "Responde las dudas generales", detalle: "Qué cubre cada tipo de seguro, qué es el deducible, con qué compañías trabajas. Con la información que tú cargas, sin inventar coberturas." },
      { titulo: "Le pasa el cliente al ejecutivo", detalle: "Con los datos listos, la conversación se asigna al ejecutivo de turno y le llega el aviso al celular. Él cotiza con las compañías, como siempre." },
      { titulo: "El tablero de la corredora", detalle: "Quién preguntó, a quién se le cotizó y quién contrató, por ejecutivo y por período." },
      { titulo: "Seguimiento a las 48 horas", detalle: "Al cliente que dejó de responder, el asistente le pregunta una vez si sigue interesado. Si dijo que no, no le escribe." },
      { titulo: "Comisiones por ejecutivo", detalle: "Al cerrar la venta desde el chat queda el monto, y la comisión de cada ejecutivo sale calculada a fin de mes." },
    ],
    ejemplo: [
      { de: "cliente", texto: "Hola, cuánto me sale asegurar un auto? es un Yaris 2021" },
      { de: "asistente", texto: "¡Hola! Para cotizarte necesito tres datos más: la patente, la comuna donde vives y si usas el auto para trabajar. Con eso te cotiza un ejecutivo con las compañías con las que trabajamos." },
      { de: "aviso", texto: "Conversación asignada a Felipe, con los datos para cotizar." },
    ],
    faq: [
      { q: "¿El asistente cotiza la prima?", a: "No. No se conecta con los cotizadores de las compañías. Pide los datos y responde dudas generales con lo que tú cargas; la cotización la hace tu ejecutivo." },
      { q: "¿Puede responder sobre coberturas?", a: "Solo con la información que tú le das. Si la pregunta es sobre un caso particular, se la pasa a tu equipo. Tú decides qué temas no responde nunca." },
      { q: "¿Sirve para atender siniestros?", a: "Puede recibir el primer mensaje y pedir los datos que definas, pero el siniestro lo gestiona tu equipo. Si prefieres, esos casos pasan directo a una persona." },
      { q: "¿Los datos de mis clientes quedan seguros?", a: "Son tuyos. Quedan en tu cuenta, solo los ve tu equipo y el asistente los usa para atender a ese cliente, nada más." },
      { q: "¿Cuántas conversaciones necesito?", a: respuestaConversaciones("un cliente") },
    ],
    reemplazos: [...equipo("ejecutivos", "ejecutivo", true), ...SIN_REALES, ...PERSONAS, ...quien("una corredora de seguros"), ...catalogo("catálogo de seguros")],
    temporadaBaja: false,
    serviceType: "Asistente con IA por WhatsApp e Instagram para corredoras de seguros",
    og: { pill: "Para corredoras de seguros", titular: "Cotizaciones que llegan con los datos ya pedidos.", bajada: "Dudas generales y datos para cotizar en WhatsApp e Instagram." },
  },

  /* ── Automotoras ─────────────────────────────────────────────────────── */
  {
    slug: "automotoras",
    nombre: "Automotoras",
    etiqueta: "Automotoras",
    quien: "una automotora",
    resumen: "Autos nuevos y usados: responde por tu stock y reparte a tus vendedores.",
    title: "Chatbot de WhatsApp para automotoras | SynapTech",
    description: "Un asistente con IA que responde por tu stock de autos en WhatsApp e Instagram, pregunta por la parte de pago y reparte cada interesado a un vendedor.",
    eyebrow: "Para automotoras",
    h1: "Tu stock respondido al minuto, y cada interesado con su vendedor.",
    bajada: "«¿Precio?», «¿cuántos kilómetros?», «¿reciben en parte de pago?». El asistente responde con los datos de cada auto que cargaste, pide lo que tu vendedor necesita y le pasa la conversación.",
    situacion: {
      titulo: "El que responde primero, vende el auto.",
      parrafos: [
        "Cada auto publicado en Instagram o en un portal trae mensajes cortos: precio, kilometraje, si sigue disponible, si se puede financiar. Quien escribe le pregunta lo mismo a varias automotoras y compra donde le responden primero y mejor.",
        "En la sala de ventas, los vendedores están atendiendo gente en persona y el WhatsApp se acumula. Al día siguiente, muchos de esos interesados ya no contestan.",
      ],
    },
    escenariosTitulo: "Lo que hace el asistente en una automotora.",
    escenarios: [
      { titulo: "Responde por cada auto", detalle: "Precio, año, kilometraje, versión y transmisión. Cargas tu stock pegando la lista o subiendo una foto, y lo actualizas cuando vendes un auto." },
      { titulo: "Pregunta por la parte de pago", detalle: "Marca, modelo, año y kilometraje del auto que deja el cliente. Tú eliges qué pide y en qué orden." },
      { titulo: "El financiamiento, con una persona", detalle: "Si el cliente pregunta por crédito, responde con la información general que cargaste y le pasa la conversación al vendedor. No simula créditos." },
      { titulo: "Cada interesado con su vendedor", detalle: "Las conversaciones se reparten solas por turnos y al vendedor le llega el aviso al celular, aunque esté en la sala atendiendo." },
      { titulo: "El tablero de la sala de ventas", detalle: "Quién preguntó, a quién se le cotizó y quién compró, por vendedor y por período." },
      { titulo: "Cierre y comisiones", detalle: "Al cerrar la venta desde el chat queda el monto, y la comisión de cada vendedor sale calculada a fin de mes." },
    ],
    ejemplo: [
      { de: "cliente", texto: "Hola, precio de la Hilux 2020 que publicaron? reciben auto en parte de pago?" },
      { de: "asistente", texto: "¡Hola! La Hilux 2020 SRV 4x4 diésel tiene 78.000 km y está en $22.990.000. Sí recibimos autos en parte de pago. ¿Qué auto tienes, de qué año y con cuántos kilómetros?" },
      { de: "aviso", texto: "Conversación asignada a Sebastián, con los datos del auto en parte de pago." },
    ],
    faq: [
      { q: "¿Se conecta con mi sistema de stock o con los portales?", a: "No. El asistente responde con el stock que cargas en el panel, pegando la lista o subiendo una foto. Cuando vendes un auto, lo sacas del catálogo." },
      { q: "¿Puede agendar la prueba de manejo?", a: "No la agenda solo. Pide los datos del interesado y le pasa la conversación al vendedor, que coordina el día y la hora." },
      { q: "¿Simula créditos?", a: "No. Responde con la información general de financiamiento que tú cargues y deriva el resto al vendedor." },
      { q: "¿Cómo se reparten los interesados entre vendedores?", a: "Por turnos, de forma automática. A cada vendedor le llega el aviso al celular y ve solo sus conversaciones. Tú ves todo y puedes cambiar a quién está asignado un cliente." },
      { q: "¿Y si me escriben por Instagram?", a: respuestaInstagram("esos mensajes") },
    ],
    reemplazos: [...equipo("vendedores", "vendedor", true), ...SIN_REALES, ...PERSONAS, ...quien("una automotora"), ...catalogo("stock de autos")],
    temporadaBaja: false,
    serviceType: "Asistente con IA por WhatsApp e Instagram para automotoras",
    og: { pill: "Para automotoras", titular: "Tu stock respondido al minuto.", bajada: "Precio, kilometraje y parte de pago en WhatsApp e Instagram, con cada interesado a su vendedor." },
  },
];

export const tipoAgencia = (slug: string) => TIPOS_AGENCIA.find((t) => t.slug === slug);

/* Vistas previas (Open Graph) de las páginas de agencias: /og/agencias/<clave>.
   Las de cada tipo salen de su `og`; estas son las de las páginas por palabra clave. */
export type OgAgencia = { pill: string; titular: string; bajada: string; ruta: string };

export const OG_AGENCIAS: Record<string, OgAgencia> = {
  ...Object.fromEntries(TIPOS_AGENCIA.map((t) => [t.slug, { ...t.og, ruta: `/agencias/${t.slug}` }])),
  "agente-ia-omnicanal": {
    pill: "Agente de IA omnicanal",
    titular: "WhatsApp e Instagram en una sola bandeja.",
    bajada: "El agente responde, tu equipo cierra. Reparto a vendedores, tablero y seguimiento.",
    ruta: "/agente-ia-omnicanal",
  },
  "crm-whatsapp": {
    pill: "CRM de WhatsApp con IA",
    titular: "Cada chat, un cliente en tu embudo.",
    bajada: "Cartera por vendedor, cierre desde el chat y comisiones calculadas solas.",
    ruta: "/crm-whatsapp",
  },
};

/* Guías prácticas para dueños de locales con hora (04-11-2026).

   Idea tomada de la "Educación digital" de pymerp.cl: artículos cortos, con
   ejemplos chilenos y una tarea al final. Reglas para este archivo:
   - Solo se afirma lo que la plataforma hace HOY (mismo criterio que
     content/funciones.ts y FaqSeo). Nada de cifras de mercado sin fuente.
   - Las reglas de Google, WhatsApp e Instagram salen de sus páginas de ayuda
     oficiales, citadas en `fuentes` con la fecha de revisión.
   - Es contenido de producto: la salida de cada guía es una función de la
     suscripción, nunca "te lo hacemos" ni un servicio por proyecto (Google
     for Startups nos leyó como agencia por ese lenguaje, ver /empresa). */

export type BloqueGuia =
  | { tipo: "p"; texto: string }
  | { tipo: "lista"; items: string[]; numerada?: boolean }
  | { tipo: "tabla"; columnas: string[]; filas: string[][]; nota?: string }
  | { tipo: "ojo"; texto: string };

export type SeccionGuia = { titulo: string; bloques: BloqueGuia[] };

export type CategoriaGuia = "Google y redes" | "Agenda y clientes" | "Plata y precios" | "Agencias y ventas";

export type Guia = {
  slug: string;
  categoria: CategoriaGuia;
  titulo: string;        // H1 y título de la tarjeta
  title: string;         // <title> SEO
  description: string;
  resumen: string;       // bajada de la tarjeta del índice
  minutos: number;
  publicada: string;     // ISO
  intro: string;
  secciones: SeccionGuia[];
  tarea: string[];       // "Tu tarea de hoy"
  producto: { titulo: string; texto: string; href: string; cta: string };
  faq: { q: string; a: string }[];
  fuentes: { texto: string; url: string }[];
  /** Imagen Open Graph propia (si no, la del sitio). */
  imagen?: string;
  /** "agencias": cierra con el WhatsApp de agencias y no con el alta de locales. */
  cierre?: "agencias";
};

export const REVISADAS = "04-11-2026";

export const GUIAS: Guia[] = [
  /* ── 1 ─────────────────────────────────────────────────────────────── */
  {
    slug: "aparecer-en-google-maps",
    categoria: "Google y redes",
    titulo: "Cómo aparecer en Google Maps con tu barbería o salón, paso a paso.",
    title: "Cómo aparecer en Google Maps con tu barbería o salón (2026)",
    description: "Crea o reclama el Perfil de Negocio de tu local, elige bien la categoría, agrega tu enlace de reservas y evita los errores que hacen que Google te suspenda.",
    resumen: "Cuando alguien busca «barbería cerca», Google muestra primero el mapa. Cómo crear o reclamar tu ficha y qué completar para subir.",
    minutos: 6,
    publicada: "2026-11-04",
    intro: "Cuando alguien busca «barbería cerca de mí» o «manicure en Viña», lo primero que ve no es una página web: es el mapa con tres locales. Ese recuadro sale del Perfil de Negocio de Google, es gratis y lo administras tú. Esta guía explica cómo dejarlo bien hecho en una tarde.",
    secciones: [
      {
        titulo: "1. Crea o reclama tu ficha",
        bloques: [
          { tipo: "p", texto: "Busca el nombre de tu local en Google Maps. Si ya aparece (a veces lo crea un cliente), toca «¿Eres el propietario de este negocio?» y reclámalo. Si no aparece, créalo desde google.com/business con la cuenta de Google que vas a usar siempre para el negocio." },
          { tipo: "p", texto: "Google te va a pedir verificar que el local existe. El método lo elige Google según tu caso: llamada, mensaje de texto, correo o un video corto donde muestras la fachada, el letrero y el interior. Ten el local ordenado y con luz antes de grabar." },
          { tipo: "ojo", texto: "Usa una cuenta de Google del negocio, no la personal de un trabajador. Si esa persona se va, te quedas sin acceso a tu propia ficha." },
        ],
      },
      {
        titulo: "2. El nombre, tal cual dice tu letrero",
        bloques: [
          { tipo: "p", texto: "Es el error más común y el más caro. Google pide que el nombre sea el mismo que usas en el letrero y con tus clientes. Escribir «Barbería Los Andes · Fade · Barba · Mejor barbería de Viña» para aparecer en más búsquedas va contra sus lineamientos y puede terminar con la ficha suspendida." },
          { tipo: "tabla", columnas: ["No", "Sí"], filas: [
            ["Studio Kami · Uñas acrílicas Viña del Mar", "Studio Kami"],
            ["Barbería Don Lucho ✂️ Cortes y Barba", "Barbería Don Lucho"],
            ["Estética Luz – Depilación láser 2x1", "Estética Luz"],
          ] },
        ],
      },
      {
        titulo: "3. La categoría principal es la que más pesa",
        bloques: [
          { tipo: "p", texto: "Elige como categoría principal lo que la mayoría de tus clientes buscaría: «Barbería», «Salón de belleza», «Salón de manicura y pedicura», «Centro de estética». Las demás van como categorías secundarias. Si haces de todo, la principal es la que más plata te deja." },
        ],
      },
      {
        titulo: "4. Lo que tienes que completar sí o sí",
        bloques: [
          { tipo: "lista", items: [
            "Horario real, y los horarios especiales de feriados. Un cliente que llega y encuentra cerrado deja una mala reseña.",
            "Teléfono y WhatsApp del local, no el personal.",
            "Servicios con precio, al menos los cinco que más vendes.",
            "Fotos reales: fachada (para que te encuentren), interior, equipo trabajando y trabajos terminados. Nada de fotos de internet.",
            "Tu enlace de reservas. Google permite que algunas categorías agreguen vínculos de reservas o citas además del sitio web: pega ahí el enlace donde el cliente agenda solo.",
          ] },
        ],
      },
      {
        titulo: "5. Lo que te hace subir con el tiempo",
        bloques: [
          { tipo: "p", texto: "Google ordena el mapa por tres cosas: qué tan bien calza tu ficha con lo que se busca, qué tan cerca estás de quien busca y qué tan conocido es tu local. La distancia no la controlas. Lo demás, sí:" },
          { tipo: "lista", items: [
            "Reseñas nuevas todos los meses, no veinte de golpe y después nada.",
            "Responder cada reseña, también las malas, con calma y con tu nombre.",
            "Subir fotos nuevas de vez en cuando: un corte, un diseño de uñas, el local de noche.",
            "Que el nombre, la dirección y el teléfono sean iguales en Google, Instagram y tu página de reservas.",
          ] },
        ],
      },
    ],
    tarea: [
      "Busca tu local en Google Maps desde el celular, con la ubicación activada, como si fueras un cliente.",
      "Revisa que el nombre sea el de tu letrero y que el horario de esta semana esté bien.",
      "Agrega tu enlace de reservas y sube 3 fotos reales de hoy.",
    ],
    producto: {
      titulo: "Tu enlace de reservas, listo para pegar en Google.",
      texto: "Con SynapTech tu local tiene su página de reservas propia: el cliente elige servicio, profesional y hora desde Google Maps, Instagram o WhatsApp, y la cita entra directo a tu agenda.",
      href: "/funciones/pagina-web-reservas",
      cta: "Ver la página de reservas",
    },
    faq: [
      { q: "¿Cuánto cuesta aparecer en Google Maps?", a: "Nada. El Perfil de Negocio de Google es gratis. Lo que se paga son los anuncios, que son otra cosa y no son necesarios para aparecer en el mapa." },
      { q: "¿Por qué no aparezco si ya tengo la ficha?", a: "Lo más común es que la ficha no esté verificada, que la categoría principal no sea la que la gente busca o que tengas muy pocas reseñas frente a los locales de tu zona. También influye la distancia: desde lejos, Google muestra a los que están más cerca de quien busca." },
      { q: "¿Puedo poner palabras clave en el nombre para salir más arriba?", a: "No. Google pide usar el nombre real del local y agregar palabras de más puede terminar en la suspensión de la ficha. Las palabras clave van en la descripción, en los servicios y en las respuestas a reseñas." },
      { q: "¿Qué pasa si atiendo a domicilio y no tengo local?", a: "Puedes crear una ficha de empresa de servicio a domicilio: indicas las comunas donde atiendes y ocultas tu dirección." },
    ],
    fuentes: [
      { texto: "Google: Cómo agregar o reclamar tu Perfil de Negocio", url: "https://support.google.com/business/answer/2911778?hl=es-419" },
      { texto: "Google: Lineamientos para la representación de tu empresa en Google", url: "https://support.google.com/business/answer/3038177?hl=es-419" },
      { texto: "Google: Edita tu Perfil de Negocio (vínculos de reservas y citas)", url: "https://support.google.com/business/answer/3039617?hl=es-419" },
    ],
  },

  /* ── 2 ─────────────────────────────────────────────────────────────── */
  {
    slug: "reducir-inasistencias",
    categoria: "Agenda y clientes",
    titulo: "Cómo bajar las inasistencias en tu agenda sin pelear con los clientes.",
    title: "Cómo reducir las inasistencias (no-show) en barberías y salones",
    description: "Confirmación, recordatorio, política de cancelación por escrito y abono solo donde duele: el orden para que la gente llegue a su hora sin espantar a nadie.",
    resumen: "La hora que se pierde no se recupera. Cinco medidas, de la más suave a la más firme, para que la gente llegue.",
    minutos: 5,
    publicada: "2026-11-04",
    intro: "Una hora que el cliente no ocupa y no avisa es plata que no vuelve: el profesional estaba disponible, la silla también, y nadie más pudo tomarla. Casi nunca es mala fe. Es olvido. Por eso lo que más funciona no es castigar, sino recordar a tiempo y hacer fácil cancelar.",
    secciones: [
      {
        titulo: "Las cinco medidas, de la más suave a la más firme",
        bloques: [
          { tipo: "lista", numerada: true, items: [
            "Confirmación al reservar, con día, hora, servicio, profesional y dirección. Si llega por escrito, el cliente la puede volver a mirar.",
            "Recordatorio antes de la cita. El día anterior sirve para que reorganice; unas horas antes, para que no se le pase.",
            "Que cancelar sea fácil. Si para cancelar hay que llamar y nadie contesta, el cliente simplemente no llega. Un enlace para cancelar o mover la hora te devuelve el cupo a tiempo.",
            "Una política de cancelación por escrito, corta y visible al reservar: por ejemplo, «avísanos con 3 horas de anticipación». Sin letra chica.",
            "Abono al reservar, solo en los servicios largos o caros: un balayage de cuatro horas, un set de uñas acrílicas, un tratamiento facial. Para un corte de 30 minutos suele espantar más de lo que protege.",
          ] },
        ],
      },
      {
        titulo: "Cómo escribir la política sin sonar a reto",
        bloques: [
          { tipo: "p", texto: "La política funciona cuando el cliente entiende por qué existe. Compara:" },
          { tipo: "tabla", columnas: ["Suena a reto", "Se entiende"], filas: [
            ["NO SE ACEPTAN CANCELACIONES CON MENOS DE 24 HORAS.", "Si no puedes venir, avísanos con 3 horas: así le damos tu hora a otra persona."],
            ["Inasistencia = pierde el abono.", "El abono se descuenta del servicio. Si cancelas con tiempo, lo movemos a otra fecha."],
          ] },
        ],
      },
      {
        titulo: "Qué hacer con el cliente que falla siempre",
        bloques: [
          { tipo: "p", texto: "Anota cada inasistencia en la ficha del cliente. Al primero que falla, un mensaje amable. Al que ya faltó dos o tres veces, pídele abono para sus próximas horas, aunque el servicio sea corto. Es la regla más justa: no castigas a todos por lo que hacen unos pocos." },
          { tipo: "ojo", texto: "Mide antes de cambiar nada: cuenta cuántas horas se perdieron el mes pasado. Si son dos, no vale la pena endurecer las reglas. Si son veinte, el abono se paga solo." },
        ],
      },
    ],
    tarea: [
      "Cuenta en tu agenda cuántas horas se perdieron por inasistencia en los últimos 30 días.",
      "Escribe tu política de cancelación en una sola frase, sin mayúsculas.",
      "Elige los 2 o 3 servicios largos donde pedirías abono.",
    ],
    producto: {
      titulo: "Recordatorios y abono, sin escribir nada a mano.",
      texto: "En SynapTech cada reserva recibe su confirmación y un recordatorio antes de la hora: por correo en todos los planes y por WhatsApp con el asistente con IA. Y si quieres, pides un abono con Mercado Pago solo en los servicios que elijas.",
      href: "/funciones/recordatorios-whatsapp",
      cta: "Ver los recordatorios",
    },
    faq: [
      { q: "¿Es legal cobrar un abono al reservar?", a: "Sí, siempre que el cliente sepa antes de pagar cuánto es, para qué es y qué pasa si cancela. Por eso la política tiene que estar visible al momento de reservar, no escondida." },
      { q: "¿Cuándo conviene mandar el recordatorio?", a: "Funciona bien el día anterior, para que el cliente alcance a cancelar o mover la hora y tú alcances a llenar el cupo." },
      { q: "¿El abono no me va a espantar clientes?", a: "En servicios cortos y baratos, puede. Por eso conviene pedirlo solo en los servicios largos o caros, y a los clientes que ya fallaron antes." },
    ],
    fuentes: [],
  },

  /* ── 3 ─────────────────────────────────────────────────────────────── */
  {
    slug: "conseguir-resenas-en-google",
    categoria: "Google y redes",
    titulo: "Cómo conseguir más reseñas en Google sin romper sus reglas.",
    title: "Cómo conseguir más reseñas en Google para tu local (sin premios)",
    description: "Cuándo y cómo pedir la reseña, el enlace directo de tu ficha, por qué no puedes regalar nada a cambio y cómo responder las malas.",
    resumen: "El momento para pedirla, el enlace directo y lo que Google prohíbe: regalar algo a cambio de una reseña.",
    minutos: 5,
    publicada: "2026-11-04",
    intro: "Entre dos locales cerca, el cliente nuevo elige el que tiene más reseñas y más recientes. La buena noticia es que la mayoría de tus clientes contentos dejaría una si se la pides en el momento correcto y con el enlace a mano. La mala: hay una forma de pedirlas que Google castiga.",
    secciones: [
      {
        titulo: "Lo que Google prohíbe (y casi nadie sabe)",
        bloques: [
          { tipo: "p", texto: "Google no permite ofrecer incentivos a cambio de una reseña: ni descuentos, ni un servicio gratis, ni un sorteo entre los que comenten. Tampoco ofrecer algo para que alguien cambie o borre una reseña mala. Lo considera participación falsa, puede quitar esas reseñas y sancionar la ficha." },
          { tipo: "ojo", texto: "«Deja tu reseña y te regalamos el lavado» parece inofensivo, pero es exactamente lo que Google prohíbe. Los premios por fidelidad van por otro lado: por visitar, no por opinar en Google." },
        ],
      },
      {
        titulo: "Cuándo pedirla",
        bloques: [
          { tipo: "p", texto: "Justo después de atender, cuando el cliente se está mirando al espejo o paga. Ese es el momento en que está más contento y todavía se acuerda de quién lo atendió. Una hora después ya está en otra." },
          { tipo: "lista", items: [
            "En persona, al cobrar: «Si te gustó, nos ayudas mucho con una reseña en Google».",
            "Por escrito, el mismo día: un mensaje corto con el enlace directo.",
            "Con un código QR en el mesón o en el espejo, que abra tu ficha.",
          ] },
        ],
      },
      {
        titulo: "El enlace directo",
        bloques: [
          { tipo: "p", texto: "Desde tu Perfil de Negocio, en la opción para pedir reseñas, Google te da un enlace corto que abre directo la ventana para calificar. Con ese enlace el cliente no tiene que buscar tu local: un toque y escribe. Guárdalo en las respuestas rápidas de WhatsApp y conviértelo en QR." },
        ],
      },
      {
        titulo: "Cómo responder (también las malas)",
        bloques: [
          { tipo: "p", texto: "Responder muestra a los que vienen detrás que hay alguien a cargo. A la buena, agradece con algo concreto («gracias, Camila, el degradado te quedó increíble»). A la mala, sin pelear:" },
          { tipo: "lista", numerada: true, items: [
            "Agradece que se haya tomado el tiempo.",
            "Reconoce lo que salió mal, sin excusas largas.",
            "Ofrece arreglarlo por un canal privado: «escríbeme al WhatsApp del local».",
          ] },
          { tipo: "p", texto: "Nunca respondas en caliente. Una respuesta agresiva a una reseña de dos estrellas espanta más clientes que la reseña misma." },
        ],
      },
    ],
    tarea: [
      "Copia el enlace para pedir reseñas de tu Perfil de Negocio y guárdalo en una respuesta rápida.",
      "Hoy, pídele la reseña en persona a los 3 clientes que veas más contentos.",
      "Responde las reseñas que tengas sin respuesta, empezando por las más recientes.",
    ],
    producto: {
      titulo: "La reseña se pide sola al terminar cada cita.",
      texto: "En SynapTech, al cerrar la atención el cliente recibe un correo firmado por quien lo atendió para calificar la visita, con el enlace a tu ficha de Google. Y los sellos y premios del club se ganan por volver, no por opinar.",
      href: "/fidelizacion",
      cta: "Ver el club de fidelización",
    },
    faq: [
      { q: "¿Puedo regalar un descuento a quien deje una reseña en Google?", a: "No. Las políticas de Google Maps prohíben ofrecer pagos, descuentos o servicios gratis a cambio de publicar reseñas, y esas reseñas se pueden quitar." },
      { q: "¿Puedo borrar una reseña mala?", a: "Tú no puedes borrarla. Si la reseña infringe las políticas de Google (por ejemplo, insultos o una persona que nunca fue cliente), puedes denunciarla desde tu Perfil de Negocio para que Google la revise." },
      { q: "¿Cuántas reseñas necesito?", a: "No hay un número mágico: lo que se compara es contra los locales de tu zona. Más importante que el total es que lleguen reseñas nuevas todos los meses." },
    ],
    fuentes: [
      { texto: "Google: Sugerencias para obtener más opiniones", url: "https://support.google.com/business/answer/3474122?hl=es-419" },
      { texto: "Google Maps: Contenido prohibido y restringido (participación falsa)", url: "https://support.google.com/contributionpolicy/answer/7400114?hl=es-419" },
    ],
  },

  /* ── 4 ─────────────────────────────────────────────────────────────── */
  {
    slug: "whatsapp-business-para-tu-local",
    categoria: "Agenda y clientes",
    titulo: "WhatsApp Business para tu local, configurado en 15 minutos.",
    title: "WhatsApp Business para barberías y salones: cómo configurarlo",
    description: "Perfil, catálogo de servicios, mensaje de bienvenida, mensaje de ausencia, respuestas rápidas y etiquetas: lo que conviene activar el primer día.",
    resumen: "Gratis y separado de tu chat personal. Las seis funciones que conviene activar el primer día.",
    minutos: 5,
    publicada: "2026-11-04",
    intro: "Si tu local agenda por WhatsApp, lo mínimo es que use WhatsApp Business: es gratis, separa el negocio de tu chat personal y trae herramientas que ahorran escribir lo mismo cincuenta veces al día. Un mismo número no puede estar a la vez en WhatsApp normal y en Business, así que lo ideal es un número solo para el local.",
    secciones: [
      {
        titulo: "Las seis cosas que conviene activar el primer día",
        bloques: [
          { tipo: "lista", numerada: true, items: [
            "Perfil de empresa: logo, dirección, horario, correo y tu enlace de reservas en el sitio web. Es lo primero que mira alguien que te escribe por primera vez.",
            "Catálogo: tus servicios con foto, precio y duración. Cuando pregunten «¿cuánto sale el corte con barba?», mandas el ítem en vez de escribir.",
            "Mensaje de bienvenida: le llega a quien te escribe por primera vez o después de un tiempo. Corto, con tu enlace para reservar.",
            "Mensaje de ausencia: fuera de horario, para que nadie sienta que lo dejaste en visto.",
            "Respuestas rápidas: escribes «/precios» o «/direccion» y sale el texto completo. Arma las cinco preguntas que más te hacen.",
            "Etiquetas: «nuevo», «reservó», «pendiente de pago». Así sabes en qué quedó cada conversación.",
          ] },
        ],
      },
      {
        titulo: "Mensajes de ejemplo, listos para copiar",
        bloques: [
          { tipo: "tabla", columnas: ["Para", "Texto"], filas: [
            ["Bienvenida", "Hola, gracias por escribir a Barbería Don Lucho. Puedes ver horas y reservar acá: [tu enlace]. Si tienes otra duda, cuéntame."],
            ["Ausencia", "Estamos cerrados ahora. Abrimos mañana a las 10:00. Si quieres asegurar tu hora, puedes reservar a cualquier hora en [tu enlace]."],
            ["/direccion", "Estamos en [calle y número], [comuna]. Hay estacionamiento en la calle. Mapa: [enlace de Google Maps]."],
          ] },
        ],
      },
      {
        titulo: "Cuándo WhatsApp Business se queda corto",
        bloques: [
          { tipo: "p", texto: "Las respuestas automáticas de WhatsApp Business son siempre las mismas: no saben qué horas tienes libres ni pueden agendar. Si pasas más de una hora al día respondiendo «¿tienes hora hoy?», el problema ya no es de configuración: es que alguien tiene que mirar la agenda y contestar por ti." },
        ],
      },
    ],
    tarea: [
      "Completa el perfil de empresa con tu enlace de reservas.",
      "Escribe el mensaje de bienvenida y el de ausencia.",
      "Crea las respuestas rápidas para las 5 preguntas que más te hacen.",
    ],
    producto: {
      titulo: "Syna responde y agenda por ti, con las horas reales.",
      texto: "El asistente con IA de SynapTech contesta el WhatsApp de tu local con tus precios y tus horas libres de verdad, y deja la cita agendada en el chat. Cuando algo no lo sabe, te lo pasa a ti.",
      href: "/asistente-ia-whatsapp",
      cta: "Conocer a Syna",
    },
    faq: [
      { q: "¿WhatsApp Business es gratis?", a: "Sí, la aplicación WhatsApp Business es gratuita. Lo que tiene costo es la plataforma para empresas grandes que envían mensajes masivos." },
      { q: "¿Puedo usar el mismo número que tengo en WhatsApp personal?", a: "Puedes pasar tu número de WhatsApp normal a Business, pero un mismo número no puede estar en las dos aplicaciones al mismo tiempo. Si lo usas para tu vida personal, conviene tener un número aparte para el local." },
      { q: "¿Pierdo mis chats al pasar a WhatsApp Business?", a: "Al cambiar en el mismo teléfono, WhatsApp permite pasar el historial de chats. Igual, haz una copia de seguridad antes." },
    ],
    fuentes: [
      { texto: "WhatsApp: WhatsApp Business App", url: "https://business.whatsapp.com/products/business-app" },
    ],
  },

  /* ── 5 ─────────────────────────────────────────────────────────────── */
  {
    slug: "precio-de-un-servicio",
    categoria: "Plata y precios",
    titulo: "Cómo ponerle precio a un servicio sin perder plata.",
    title: "Cómo calcular el precio de un corte o servicio (con IVA y comisión)",
    description: "Cuánto te queda de verdad de un corte de $15.000 después del IVA, la comisión del profesional, los insumos y el arriendo. Con ejemplo en pesos y la diferencia entre margen y recargo.",
    resumen: "Un corte de $15.000 no son $15.000 para el local. IVA, comisión, insumos y arriendo, en un ejemplo en pesos.",
    minutos: 7,
    publicada: "2026-11-04",
    intro: "Casi todos los locales ponen el precio mirando al de la esquina. Sirve como referencia, pero no te dice si estás ganando. Para saberlo hay que restar todo lo que se lleva cada servicio antes de que llegue a tu bolsillo. Lo hacemos con un corte de ejemplo.",
    secciones: [
      {
        titulo: "Lo que se lleva cada servicio",
        bloques: [
          { tipo: "lista", items: [
            "El IVA (19 %), si emites boleta afecta: el precio al público ya lo incluye y no es tuyo.",
            "La comisión del profesional, si trabaja a porcentaje.",
            "Los insumos: cuchillas, productos, toallas, desechables.",
            "Tu parte de los gastos fijos: arriendo, luz, agua, internet, sistema, contador.",
          ] },
        ],
      },
      {
        titulo: "Ejemplo: un corte de $15.000",
        bloques: [
          { tipo: "p", texto: "Supongamos una barbería que emite boleta afecta, paga a sus barberos el 50 % del neto, gasta unos $500 en insumos por corte y tiene $900.000 al mes de gastos fijos repartidos en 300 atenciones. Son números de ejemplo: cambia los tuyos." },
          { tipo: "tabla", columnas: ["Concepto", "Monto"], filas: [
            ["Precio al público", "$15.000"],
            ["IVA incluido (15.000 − 15.000 ÷ 1,19)", "− $2.395"],
            ["Neto del servicio", "$12.605"],
            ["Comisión del barbero (50 % del neto)", "− $6.303"],
            ["Insumos", "− $500"],
            ["Parte de los gastos fijos ($900.000 ÷ 300)", "− $3.000"],
            ["Lo que le queda al local", "$2.802"],
          ], nota: "En este ejemplo la comisión se calcula sobre el neto. Muchos locales la calculan sobre el precio total: las dos formas valen, lo importante es dejarla por escrito." },
          { tipo: "p", texto: "De $15.000, al local le quedan cerca de $2.800, menos del 20 %. Con eso se pagan los meses flojos, las reparaciones y tu propio sueldo si no cortas. Si haces este cálculo y te da negativo, el problema no es que vendas poco: es el precio." },
        ],
      },
      {
        titulo: "Margen no es lo mismo que recargo",
        bloques: [
          { tipo: "p", texto: "Con los productos que vendes en el mesón pasa un error muy común. Si compras una pomada a $5.000 neto y la vendes a $8.000 neto:" },
          { tipo: "tabla", columnas: ["Cálculo", "Resultado"], filas: [
            ["Recargo: lo que le subiste sobre el costo (3.000 ÷ 5.000)", "60 %"],
            ["Margen: lo que te queda de cada venta (3.000 ÷ 8.000)", "37,5 %"],
            ["Precio al público con IVA (8.000 × 1,19)", "$9.520"],
          ] },
          { tipo: "ojo", texto: "Si alguien te dice «gano un 60 % con las pomadas», en realidad le quedan $37,5 de cada $100 que vende. Cuando hagas descuentos, calcúlalos sobre el margen, no sobre el recargo." },
        ],
      },
      {
        titulo: "Cuándo subir el precio",
        bloques: [
          { tipo: "lista", items: [
            "Cuando la agenda está llena dos semanas seguidas en las horas peak: hay más demanda que horas.",
            "Cuando suben tus gastos fijos (arriendo, insumos) y lo que te queda por servicio baja.",
            "Por profesional: el que tiene lista de espera puede cobrar más que el que recién empieza.",
          ] },
          { tipo: "p", texto: "Avisa con anticipación, en el local y en tu página de reservas. Una subida de $1.000 anunciada molesta mucho menos que una sorpresa al pagar." },
        ],
      },
    ],
    tarea: [
      "Haz la tabla de arriba con tu servicio más vendido y tus números reales.",
      "Suma tus gastos fijos del mes pasado y divídelos por las atenciones del mes.",
      "Revisa el margen (no el recargo) de los 3 productos que más vendes.",
    ],
    producto: {
      titulo: "La comisión de cada profesional, calculada sola.",
      texto: "Usa la calculadora gratis para ver cuánto le corresponde a cada profesional. En SynapTech la liquidación sale sola con su porcentaje, propinas y adelantos, y todo el mes queda en Excel para tu contador.",
      href: "/funciones/comisiones",
      cta: "Abrir la calculadora de comisiones",
    },
    faq: [
      { q: "¿El precio de un corte tiene que incluir IVA?", a: "Si tu local emite boleta afecta, el precio que ve el cliente debe ser el precio final, con el IVA incluido. Por eso hay que restarlo antes de calcular cuánto te queda." },
      { q: "¿La comisión se calcula sobre el precio con o sin IVA?", a: "Las dos formas existen. Calcularla sobre el neto es más justo para el local, porque el IVA no es plata del negocio. Lo importante es que esté por escrito y que el profesional lo sepa desde el primer día." },
      { q: "¿Y si mis barberos trabajan con boleta de honorarios o arriendan el sillón?", a: "Cambia quién emite qué documento y qué parte lleva IVA. Lo explicamos con ejemplos en la guía de boletas de honorarios y comisiones." },
    ],
    fuentes: [],
  },

  /* ── 6 ─────────────────────────────────────────────────────────────── */
  {
    slug: "instagram-de-tu-local",
    categoria: "Google y redes",
    titulo: "El Instagram de tu local: los 5 errores que espantan clientes.",
    title: "Instagram para barberías y salones: 5 errores que espantan clientes",
    description: "La bio que no dice dónde estás, el enlace que no lleva a reservar, los precios escondidos y los mensajes sin responder. Cómo corregirlos hoy.",
    resumen: "Quien llega a tu perfil decide en segundos si te escribe o sigue de largo. Los errores más comunes y cómo arreglarlos hoy.",
    minutos: 5,
    publicada: "2026-11-04",
    intro: "Para muchos clientes, tu Instagram es tu vitrina: ven un trabajo en el feed de alguien, tocan tu perfil y en pocos segundos deciden si te escriben o siguen de largo. Lo que más espanta no son las fotos feas: es no encontrar lo básico.",
    secciones: [
      {
        titulo: "Los cinco errores",
        bloques: [
          { tipo: "lista", numerada: true, items: [
            "La bio no dice qué haces ni dónde. «✨ Pasión por el arte ✨» no ayuda. «Barbería en Quilpué centro · Corte y barba · Reserva abajo 👇» sí.",
            "El enlace no lleva a reservar. Si el primer enlace es un linktree con ocho botones, mucha gente se pierde. Instagram permite varios enlaces: pon primero el de reservar.",
            "Los precios están escondidos. Si cada persona tiene que preguntar «¿precio?» por mensaje, una parte no pregunta. Una historia destacada con precios ahorra esos mensajes.",
            "Los mensajes quedan sin responder. Un mensaje que se contesta al día siguiente casi siempre es un cliente que ya reservó en otro lado.",
            "Solo hay fotos de trabajos, nunca del lugar ni de las personas. El cliente nuevo quiere saber cómo es el local y quién lo va a atender.",
          ] },
        ],
      },
      {
        titulo: "Una bio que funciona",
        bloques: [
          { tipo: "tabla", columnas: ["Línea", "Ejemplo"], filas: [
            ["Qué haces", "Uñas acrílicas, gel y nail art"],
            ["Dónde", "Viña del Mar · a pasos de metro Miramar"],
            ["Por qué tú", "Diseños a mano, sin apuro"],
            ["Qué hacer ahora", "Reserva tu hora 👇"],
          ] },
        ],
      },
      {
        titulo: "Las historias destacadas que sí se miran",
        bloques: [
          { tipo: "lista", items: [
            "Precios: una imagen por categoría de servicio.",
            "Cómo llegar: la fachada, la entrada, dónde estacionar.",
            "Equipo: una foto de cada profesional con su nombre.",
            "Trabajos: los mejores, ordenados por servicio.",
          ] },
        ],
      },
    ],
    tarea: [
      "Reescribe tu bio con las 4 líneas de la tabla.",
      "Deja tu enlace de reservas como primer enlace del perfil.",
      "Crea la historia destacada de precios.",
    ],
    producto: {
      titulo: "Syna también contesta tu Instagram.",
      texto: "El asistente con IA de SynapTech responde los mensajes de Instagram y WhatsApp de tu local con tus precios y horas libres, y deja la cita agendada, aunque estés atendiendo.",
      href: "/asistente-ia-whatsapp",
      cta: "Conocer a Syna",
    },
    faq: [
      { q: "¿Puedo poner más de un enlace en la bio de Instagram?", a: "Sí, Instagram permite agregar varios enlaces en el perfil. El primero es el que más se ve, así que ese debería ser el de reservar." },
      { q: "¿Conviene una cuenta de empresa o de creador?", a: "Para un local, la cuenta de empresa: muestra la categoría, la dirección y los botones de contacto, y da estadísticas de quién visita tu perfil." },
    ],
    fuentes: [],
  },

  /* ── 7 · Agencias y ventas (09-11-2026) ──────────────────────────────
     Las tres de agencias están escritas para que un buscador con IA pueda
     citarlas: definición al principio, párrafos cortos y sin cifras de
     mercado. Cierran con el WhatsApp de agencias, no con el alta de locales. */
  {
    slug: "que-es-un-agente-de-ia-omnicanal",
    categoria: "Agencias y ventas",
    titulo: "Qué es un agente de IA omnicanal (y en qué se diferencia de un chatbot).",
    title: "Qué es un agente de IA omnicanal, comparado con un chatbot",
    description: "Qué es un agente de IA omnicanal, en qué se diferencia de un chatbot y cuándo conviene: WhatsApp e Instagram en una bandeja, con tu equipo.",
    resumen: "La definición corta, la diferencia con un chatbot de menú y qué revisar antes de elegir uno.",
    minutos: 5,
    publicada: "2026-11-09",
    intro: "Un agente de IA omnicanal es un asistente con inteligencia artificial que responde a tus clientes en más de un canal, por ejemplo WhatsApp e Instagram, y deja todas esas conversaciones en un solo lugar donde también trabaja tu equipo. Esta guía explica qué significa cada parte, en qué se diferencia de un chatbot y cuándo vale la pena tener uno.",
    secciones: [
      {
        titulo: "1. La definición, en tres partes",
        bloques: [
          { tipo: "p", texto: "Un agente de IA omnicanal tiene tres piezas. La IA, que entiende el mensaje y arma la respuesta. Los canales, que son los lugares por donde te escriben. Y la bandeja, donde el agente y las personas del equipo se reparten las conversaciones." },
          { tipo: "p", texto: "Si falta una de las tres, no es omnicanal. Un asistente que responde solo en WhatsApp es un agente de un canal. Una bandeja que junta WhatsApp e Instagram pero donde nadie contesta solo es una bandeja compartida." },
        ],
      },
      {
        titulo: "2. Agente de IA y chatbot no son lo mismo",
        bloques: [
          { tipo: "p", texto: "La palabra chatbot se usa para todo, pero hay una diferencia práctica. Un chatbot clásico sigue un menú: «escribe 1 para precios, 2 para horarios». Un agente de IA lee lo que el cliente escribió, aunque venga con faltas o en otro idioma, y responde con tu información." },
          { tipo: "tabla", columnas: ["", "Chatbot de respuestas fijas", "Agente de IA"], filas: [
            ["Cómo entiende", "Por palabras clave o menús", "Lee el mensaje completo"],
            ["Qué responde", "Textos escritos de antemano", "Una respuesta armada con tu catálogo y tus reglas"],
            ["Qué hace después", "Manda el siguiente mensaje del menú", "Pide datos y le pasa la conversación a una persona"],
            ["Cuándo falla", "Cuando el cliente escribe algo no previsto", "Cuando le falta información, y por eso debe derivar"],
          ] },
        ],
      },
      {
        titulo: "3. Qué significa omnicanal en la práctica",
        bloques: [
          { tipo: "lista", items: [
            "El cliente escribe por donde quiera y la conversación cae en la misma bandeja.",
            "Cada conversación tiene un responsable, aunque primero la haya atendido el agente.",
            "El historial queda junto: quien toma el chat ve lo que ya se habló.",
            "Las reglas son las mismas en todos los canales: mismos precios y mismo tono.",
          ] },
          { tipo: "ojo", texto: "Omnicanal no es lo mismo que multicanal. Multicanal es estar en varios canales. Omnicanal es que esos canales compartan bandeja, historial y equipo." },
        ],
      },
      {
        titulo: "4. Cuándo conviene uno",
        bloques: [
          { tipo: "p", texto: "Conviene cuando las preguntas se repiten, cuando llegan fuera de horario o cuando hay más de una persona respondiendo el mismo WhatsApp. Ahí el agente responde lo repetitivo al minuto y tu equipo se queda con lo que necesita a una persona: negociar, resolver un caso especial, cerrar." },
          { tipo: "p", texto: "Si recibes pocos mensajes al día y siempre los contestas tú a tiempo, todavía no lo necesitas. Las respuestas rápidas de WhatsApp Business te alcanzan." },
        ],
      },
      {
        titulo: "5. Qué preguntar antes de elegir uno",
        bloques: [
          { tipo: "lista", numerada: true, items: [
            "¿Responde desde tu número de siempre o te obliga a usar otro?",
            "¿Qué canales atiende de verdad hoy, no «próximamente»?",
            "¿Puedes tomar cualquier conversación cuando quieras?",
            "¿Qué hace cuando no sabe algo: inventa o deriva?",
            "¿Cómo reparte las conversaciones entre tu equipo?",
            "¿Qué cuenta como una conversación y cuánto cuesta pasarse del plan?",
          ] },
        ],
      },
    ],
    tarea: [
      "Cuenta cuántos mensajes recibiste ayer por WhatsApp y por Instagram.",
      "Marca cuántos eran preguntas repetidas: precio, horario, qué incluye.",
      "Anota cuántos esperaron más de una hora por una respuesta.",
    ],
    producto: {
      titulo: "El agente omnicanal de SynapTech.",
      texto: "Responde tu WhatsApp y tu Instagram con tu catálogo, en español, portugués e inglés, reparte las conversaciones entre tus vendedores con aviso al celular y deja cada venta en un tablero.",
      href: "/agente-ia-omnicanal",
      cta: "Ver cómo funciona",
    },
    faq: [
      { q: "¿Un agente de IA reemplaza a los vendedores?", a: "No. Responde lo repetitivo y deja la conversación lista, con los datos pedidos. La venta la cierra una persona." },
      { q: "¿Qué canales atiende un agente omnicanal?", a: "Depende de la herramienta. El agente de SynapTech atiende WhatsApp y los mensajes directos de Instagram, en la misma bandeja." },
      { q: "¿Un agente de IA puede inventar precios?", a: "Puede pasar cuando no tiene la información. Por eso conviene que responda solo con tu catálogo y que derive a tu equipo lo que no sabe." },
    ],
    fuentes: [],
    imagen: "/og/agencias/agente-ia-omnicanal",
    cierre: "agencias",
  },

  /* ── 8 ─────────────────────────────────────────────────────────────── */
  {
    slug: "vender-tours-por-whatsapp-a-turistas-brasilenos",
    categoria: "Agencias y ventas",
    titulo: "Cómo vender tours por WhatsApp a turistas brasileños.",
    title: "Cómo vender tours por WhatsApp a turistas brasileños",
    description: "Responder en portugués, dar el precio en reales, decir qué incluye cada paseo y hacer un solo seguimiento. Guía para agencias de turismo en Chile.",
    resumen: "Portugués simple, precio en reales, qué incluye cada paseo y un solo seguimiento. Con frases listas para copiar.",
    minutos: 6,
    publicada: "2026-11-09",
    intro: "Para muchas agencias de turismo receptivo en Chile, el pasajero brasileño es uno de los clientes más importantes del año. Escribe por WhatsApp, pregunta en portugués y quiere saber el precio en reales. Esta guía junta lo que conviene hacer para que esa conversación termine en una venta.",
    secciones: [
      {
        titulo: "1. Responde en portugués, aunque sea simple",
        bloques: [
          { tipo: "p", texto: "Un pasajero que escribe en portugués y recibe la respuesta en español entiende casi todo, pero le cuesta más y duda más. Responder en su idioma, con frases cortas, baja esa duda. No hace falta un portugués perfecto: hace falta que sea claro." },
          { tipo: "tabla", columnas: ["Para", "En portugués"], filas: [
            ["Saludo", "Olá! Obrigado por escrever. Em que posso ajudar?"],
            ["Precio", "O passeio custa R$ 260 por pessoa, com almoço incluído."],
            ["Recogida", "Buscamos você no hotel às 7h30."],
            ["Cierre", "Posso reservar sua vaga para amanhã?"],
            ["Seguimiento", "Oi! Ainda tem interesse no passeio?"],
          ], nota: "Los precios y horarios son de ejemplo." },
        ],
      },
      {
        titulo: "2. Da el precio en reales",
        bloques: [
          { tipo: "p", texto: "El pasajero brasileño piensa en reales. Si le das el precio en pesos chilenos, lo primero que hace es abrir la calculadora, y en ese momento se enfría. Define el tipo de cambio que vas a usar para tus precios en reales, actualízalo cada cierto tiempo y escríbelo claro: «R$ 260 por pessoa»." },
          { tipo: "ojo", texto: "Si cobras en pesos, aclara en qué moneda se paga y quién asume la diferencia del cambio. Es una duda muy común después del precio." },
        ],
      },
      {
        titulo: "3. Di qué incluye antes de que pregunten",
        bloques: [
          { tipo: "p", texto: "Cada pregunta que el pasajero tiene que hacer es una oportunidad de que se vaya. Manda junto con el precio:" },
          { tipo: "lista", items: [
            "Hora y lugar de recogida: hotel o punto de encuentro.",
            "Duración y hora aproximada de regreso.",
            "Qué incluye: transporte, guía, almuerzo, entradas.",
            "Qué no incluye y qué conviene llevar: ropa de abrigo, protector solar, efectivo.",
            "Si el guía habla portugués.",
          ] },
        ],
      },
      {
        titulo: "4. Contesta rápido, también de noche",
        bloques: [
          { tipo: "p", texto: "El pasajero arma el día siguiente en la noche, desde el hotel. Si escribe a las diez de la noche y le respondes a las nueve de la mañana, es probable que ya haya comprado en otra parte o en el mesón del hotel. Un mensaje de ausencia ayuda, pero no vende. El que vende es el que responde con precio." },
        ],
      },
      {
        titulo: "5. Un seguimiento, no cinco",
        bloques: [
          { tipo: "p", texto: "Si el pasajero preguntó y dejó de responder, escríbele una vez, uno o dos días después, con una pregunta corta. Si dice que no, no insistas. Un seguimiento a tiempo recupera ventas; cinco mensajes seguidos te mandan a la lista de bloqueados." },
        ],
      },
      {
        titulo: "6. Anota en qué quedó cada pasajero",
        bloques: [
          { tipo: "p", texto: "En temporada alta pasan muchas conversaciones por el mismo WhatsApp. Si no anotas quién preguntó, a quién le cotizaste y quién compró, no sabes qué anuncio funcionó ni a quién volver a escribirle. Una planilla sirve al principio; con un equipo de vendedoras se queda corta." },
        ],
      },
    ],
    tarea: [
      "Traduce al portugués la ficha de tus tres paseos más vendidos, con el precio en reales.",
      "Escribe qué incluye cada uno y guárdalo como respuesta rápida.",
      "Revisa los chats de ayer y escríbele una vez a quien quedó sin responder.",
    ],
    producto: {
      titulo: "Un asistente que cotiza en portugués y en reales.",
      texto: "El asistente de SynapTech responde tu WhatsApp en el idioma del pasajero, cotiza en pesos o en reales con tus precios, y a las 48 horas le pregunta una vez a quien quedó callado si sigue interesado.",
      href: "/agencias/tours-y-excursiones",
      cta: "Ver el plan para agencias de tours",
    },
    faq: [
      { q: "¿Conviene cobrar en reales?", a: "Depende de cómo recibes los pagos. Lo importante es que el precio que muestras en reales y lo que cobras al final coincidan, y que el pasajero sepa en qué moneda paga." },
      { q: "¿Qué hago si no hablo portugués?", a: "Arma una vez tus respuestas más comunes en portugués y guárdalas como respuestas rápidas. Para el resto, un asistente con IA puede responder en portugués por ti." },
      { q: "¿Cuándo hago el seguimiento?", a: "Una vez, uno o dos días después del último mensaje, y solo si el pasajero no dijo que no." },
    ],
    fuentes: [],
    imagen: "/og/agencias/tours-y-excursiones",
    cierre: "agencias",
  },

  /* ── 9 ─────────────────────────────────────────────────────────────── */
  {
    slug: "repartir-chats-de-whatsapp-entre-vendedores",
    categoria: "Agencias y ventas",
    titulo: "Cómo repartir los chats de WhatsApp entre vendedores, sin que se pisen.",
    title: "Cómo repartir los chats de WhatsApp entre vendedores",
    description: "Un número o varios, reparto por turnos o por cartera, tiempos de respuesta y qué hacer cuando un vendedor no está. Cómo ordenar el WhatsApp de un equipo.",
    resumen: "Un número para todos, una forma de repartir y una regla de oro: cada cliente con un solo responsable.",
    minutos: 5,
    publicada: "2026-11-09",
    intro: "Cuando un mismo WhatsApp lo atienden tres o cuatro personas pasan dos cosas: clientes que reciben dos respuestas distintas y clientes que no reciben ninguna. Repartir bien los chats es primero un tema de reglas y después de herramientas. Esta guía explica las reglas y cómo aplicarlas.",
    secciones: [
      {
        titulo: "1. Un número para todos, no uno por vendedor",
        bloques: [
          { tipo: "p", texto: "Si cada vendedor usa su propio número, los clientes quedan en el teléfono de esa persona, y si se va, se lleva la cartera. Lo más ordenado es un número del negocio, el que sale en tus anuncios, tu Instagram y tu web, y repartir desde ahí." },
        ],
      },
      {
        titulo: "2. Elige una forma de repartir",
        bloques: [
          { tipo: "tabla", columnas: ["Forma", "Cómo funciona", "Cuándo sirve"], filas: [
            ["Por turnos", "Cada conversación nueva va al siguiente vendedor de la lista.", "Equipos parejos, donde todos venden lo mismo."],
            ["Por cartera", "El cliente que ya conversó vuelve con el mismo vendedor.", "Ventas que se repiten o que toman semanas."],
            ["Por producto o marca", "Cada vendedor atiende una línea o una marca.", "Catálogos muy distintos entre sí."],
          ] },
          { tipo: "ojo", texto: "Mezclarlas está bien: por turnos para los clientes nuevos y por cartera para los que vuelven." },
        ],
      },
      {
        titulo: "3. Un cliente, un responsable",
        bloques: [
          { tipo: "p", texto: "Cada conversación tiene que tener un nombre al lado. Si dos vendedores pueden contestarle al mismo cliente, tarde o temprano le van a dar dos precios distintos. Si nadie es responsable, nadie contesta." },
        ],
      },
      {
        titulo: "4. Define cuánto puede esperar un cliente",
        bloques: [
          { tipo: "p", texto: "Pon un tiempo máximo de respuesta en horario de trabajo, por ejemplo quince minutos, y revisa quién lo cumple. Fuera de horario, decide si alguien queda de turno o si responde un asistente." },
        ],
      },
      {
        titulo: "5. Qué pasa cuando el vendedor no está",
        bloques: [
          { tipo: "lista", items: [
            "Vacaciones o licencia: sus chats pasan a otra persona, con el historial.",
            "Se va de la empresa: la cartera queda en el número del negocio, no en su teléfono.",
            "Está con otro cliente: el dueño o el supervisor puede reasignar la conversación.",
          ] },
        ],
      },
      {
        titulo: "6. Mide por vendedor",
        bloques: [
          { tipo: "p", texto: "Con el reparto ordenado ya puedes ver lo que importa: cuántas conversaciones recibió cada uno, a cuántos les cotizó y cuántos compraron. Ahí aparece quién necesita ayuda y cómo se reparte la comisión." },
        ],
      },
    ],
    tarea: [
      "Decide cómo vas a repartir: por turnos, por cartera o por producto.",
      "Fija un tiempo máximo de respuesta y compártelo con el equipo.",
      "Define quién toma los chats de un vendedor cuando no está.",
    ],
    producto: {
      titulo: "Reparto automático y aviso al celular.",
      texto: "En SynapTech cada conversación nueva se asigna sola a un vendedor por turnos y le llega el aviso al celular. Cada uno ve solo su cartera, el dueño ve todo y puede reasignar, y a fin de mes las comisiones salen calculadas.",
      href: "/crm-whatsapp",
      cta: "Ver el CRM de WhatsApp",
    },
    faq: [
      { q: "¿Varios vendedores pueden atender el mismo número de WhatsApp?", a: "Sí, con una herramienta que conecte ese número a una bandeja compartida. Cada vendedor entra con su usuario y ve los chats que le tocan." },
      { q: "¿Es mejor repartir por turnos o por cartera?", a: "Por turnos es lo más parejo para los clientes nuevos. Por cartera es mejor cuando la venta toma semanas o el cliente vuelve a comprar. Se pueden usar las dos." },
      { q: "¿Cómo evito que dos vendedores le respondan al mismo cliente?", a: "Asigna cada conversación a una sola persona y que solo esa persona la vea. El dueño o el supervisor es el único que reasigna." },
    ],
    fuentes: [],
    imagen: "/og/agencias/crm-whatsapp",
    cierre: "agencias",
  },
];

/* La guía de boletas vive en su propia ruta (más rica, con tabla y video)
   pero sale en el índice junto a las demás. */
export const GUIA_BOLETAS = {
  href: "/guias/boleta-honorarios-y-comisiones-barberos",
  categoria: "Plata y precios" as CategoriaGuia,
  titulo: "Boleta de honorarios, comisiones y arriendo de sillón en barberías.",
  resumen: "Sueldo, comisión o arriendo de sillón: quién emite qué documento y cuánto se retiene en 2026.",
  minutos: 8,
};

export const CATEGORIAS: CategoriaGuia[] = ["Google y redes", "Agenda y clientes", "Plata y precios", "Agencias y ventas"];

export function guia(slug: string) {
  return GUIAS.find((g) => g.slug === slug);
}

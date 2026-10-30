import type { Pregunta } from "@/components/FaqSeo";

/* Contenido legal y tributario de las guías (09-10-2026). TODO sale de
   devtools/guias-panel/sitio-web/seo/verificacion-guias-2026-10-09.md: cada
   afirmación con su fuente oficial (SII, BCN, Dirección del Trabajo, Minsal),
   cita textual y fecha de consulta. Lo que esa verificación marcó como "NO
   CONFIRMADO" no se afirma acá (por ejemplo, que un centro de estética no
   sanitario quede fuera de la Ley 20.584). Al cambiar una cifra (retención,
   ingreso mínimo, IVA), volver a verificar en la fuente. */

const FECHA = "9 de octubre de 2026";

/* ── Guía: boleta de honorarios, comisiones y arriendo de sillón ─────────── */
/* 30-10-2026: en arriendo el 15,25 % va sobre TODO lo que el barbero boletea a
   sus clientes (SII 001_120_0889: "el 15.25% de los honorarios cobrados al
   cliente"), no sobre lo que le queda tras el arriendo. El ejemplo decía
   $137.250 en las dos columnas; en arriendo son $274.500. */

export const BHE_MODELOS: { titulo: string; bajada: string; filas: [string, string][] }[] = [
  {
    titulo: "Sueldo + comisión",
    bajada: "El barbero con contrato de trabajo",
    filas: [
      ["Qué documento recibe", "Liquidación de sueldo. Las comisiones son remuneración y pagan cotizaciones."],
      ["Sueldo base", "Si cumple jornada, al menos el ingreso mínimo ($553.553 desde el 1 de mayo de 2026), y las comisiones van encima."],
      ["IVA", "El local boletea cada servicio completo."],
    ],
  },
  {
    titulo: "Comisión a honorarios",
    bajada: "El barbero independiente que trabaja por porcentaje",
    filas: [
      ["Qué documento emite", "El barbero le emite al local una boleta de honorarios por su parte."],
      ["Retención", "Si el local es empresa (persona jurídica, o de primera categoría con contabilidad), retiene el 15,25 % en 2026 y lo paga al SII."],
      ["IVA", "El local boletea cada servicio completo."],
    ],
  },
  {
    titulo: "Arriendo de sillón",
    bajada: "El barbero independiente que arrienda su espacio",
    filas: [
      ["Qué documento emite", "El barbero emite boleta de honorarios a sus clientes. El local le cobra el arriendo con factura, o boleta si el barbero no es contribuyente de IVA."],
      ["IVA", "El arriendo del sillón lleva IVA (19 %). El barbero que trabaja solo no paga IVA por sus cortes."],
      ["Retención", "Si sus clientes son personas, nadie le retiene: el barbero paga él mismo el 15,25 % de todo lo que les cobra en su Formulario 29."],
    ],
  },
];

export const BHE_RETENCION = {
  fecha: FECHA,
  titulo: "En 2026 se retiene el 15,25 %.",
  parrafos: [
    "Desde el 1 de enero de 2026 la retención de la boleta de honorarios subió de 14,5 % a 15,25 %. Por la Ley 21.133 sigue subiendo: 16 % en 2027 y 17 % en 2028.",
    "La retención no se pierde: con ella se pagan primero las cotizaciones del barbero (AFP, salud y seguros) en la Operación Renta. Si sobra, se le devuelve; si falta, lo paga.",
    "Retienen las personas jurídicas y los contribuyentes de primera categoría que llevan contabilidad. Si la boleta va a una persona que no está obligada a retener, el barbero recibe el total y paga él mismo el 15,25 % en su Formulario 29.",
  ],
};

export const BHE_EJEMPLO = {
  titulo: "Un barbero, 100 cortes de $18.000 en el mes.",
  intro: "La misma venta, $1.800.000, con dos formas de pagarle al barbero el 50 %. Lo que cambia es cuánto IVA paga el local, quién entera el 15,25 % y sobre qué monto.",
  columnas: ["", "Comisión a honorarios", "Arriendo de sillón (50 %)"],
  filas: [
    ["Qué boletea el local", "$1.800.000 (cada servicio completo)", "$900.000 (el arriendo)"],
    ["IVA que paga el local", "$287.395", "$143.697"],
    ["Lo que recibe el barbero (bruto)", "$900.000, con su boleta de honorarios al local", "$900.000: boletea $1.800.000 a sus clientes y paga $900.000 de arriendo"],
    ["El 15,25 %", "$137.250 (sobre sus $900.000), la retiene y la paga el local", "$274.500 (sobre los $1.800.000 que boletea), la paga el barbero en su Formulario 29"],
  ],
  nota: "Ejemplo ilustrativo con precios con IVA incluido (IVA = precio × 19/119). Con contrato de trabajo el IVA es el del primer caso, más el sueldo base y las cotizaciones. Revisa tu caso con tu contador.",
};

export const BHE_FAQ: Pregunta[] = [
  { q: "¿Cuánto se retiene de una boleta de honorarios en 2026?", a: "El 15,25 %, desde el 1 de enero de 2026. Por la Ley 21.133 sube a 16 % en 2027 y a 17 % en 2028." },
  { q: "¿Un barbero puede emitir boleta de honorarios?", a: "Sí. Para el SII un oficio como el de barbero o peluquero cuenta como ocupación lucrativa de segunda categoría, aunque no tenga título. Necesita inicio de actividades en segunda categoría." },
  { q: "¿El arriendo de sillón lleva IVA?", a: "Sí. Para el SII es arriendo de bienes muebles y está afecto a IVA, hoy del 19 %. El local emite factura, o boleta si el barbero no es contribuyente de IVA." },
  { q: "¿Puedo pagarle solo comisión a un barbero con contrato?", a: "Si cumple jornada, debe tener un sueldo base de al menos el ingreso mínimo ($553.553 desde el 1 de mayo de 2026) y las comisiones van encima. Las comisiones son remuneración y pagan cotizaciones." },
  { q: "¿La retención de la boleta se pierde?", a: "No. Con la retención se pagan primero las cotizaciones del barbero en la Operación Renta; si sobra, se le devuelve." },
  { q: "¿La barbería puede emitir las boletas por el barbero?", a: "Sí. El SII permite que el barbero autorice a un usuario a emitir boletas de honorarios en su nombre, por un año. Así funciona la emisión automática de SynapTech: la boleta sale con el RUT del barbero al cerrar la cita." },
];

export const BHE_FUENTES = [
  { texto: "SII: tasas de retención de boletas de honorarios por año", url: "https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_7297.htm" },
  { texto: "SII: aumento gradual de la retención (Ley 21.133)", url: "https://www.sii.cl/destacados/boletas_honorarios/aumento_gradual.html" },
  { texto: "SII: quién paga la retención si la boleta va a una persona", url: "https://www.sii.cl/preguntas_frecuentes/boleta_honorario_electr/001_120_0889.htm" },
  { texto: "SII: peluquero que trabaja solo, boleta de honorarios e IVA", url: "https://www.sii.cl/preguntas_frecuentes/impuestos_mensuales/001_130_1011.htm" },
  { texto: "SII: arriendo de sillón afecto a IVA (Oficio 2638 de 2002)", url: "https://www.sii.cl/pagina/jurisprudencia/adminis/2002/ventas/ja317.htm" },
  { texto: "SII: autorizar a un usuario a emitir boletas de honorarios", url: "https://www.sii.cl/preguntas_frecuentes/boleta_honorario_electr/001_120_1040.htm" },
  { texto: "Dirección del Trabajo: sueldo base y comisiones", url: "https://www.dt.gob.cl/portal/1628/w3-article-60144.html" },
  { texto: "Ley 21.133 (BCN)", url: "https://www.bcn.cl/leychile/navegar?idNorma=1128420" },
];

/* ── Guía: ficha clínica estética ─────────────────────────────────────────── */

export const FICHA_LEY = {
  fecha: FECHA,
  parrafos: [
    "Si en tu centro atienden profesionales de la salud o haces procedimientos de salud, eres prestador de salud y la Ley 20.584 te obliga a llevar ficha clínica. Todo lo que contiene es dato sensible y se guarda al menos 15 años. El Decreto 41 de 2012 fija su contenido mínimo y pide registrar en cada atención quién atendió, con su firma.",
    "El consentimiento informado es verbal por regla general, pero debe constar por escrito en cirugías, procedimientos invasivos y los que tienen un riesgo relevante.",
    "Los procedimientos invasivos o que penetran la piel requieren autorización sanitaria y un director técnico que sea profesional de la salud. Un instituto de belleza, en cambio, solo puede atender a personas sanas con fines estéticos, sin diagnosticar ni tratar.",
    "Los datos de salud ya son datos sensibles por la Ley 19.628. Desde el 1 de diciembre de 2026 rige la Ley 21.719, que exige consentimiento expreso para tratarlos. Para las fotos de antes y después conviene pedir una autorización aparte.",
  ],
  fuentes: [
    { texto: "Ley 20.584", url: "https://www.bcn.cl/leychile/navegar?idNorma=1039348" },
    { texto: "Decreto 41 de 2012", url: "https://www.bcn.cl/leychile/navegar?idNorma=1046753" },
    { texto: "Código Sanitario", url: "https://www.bcn.cl/leychile/navegar?idNorma=5595" },
    { texto: "Minsal: autorizaciones sanitarias", url: "https://saludresponde.minsal.cl/autorizaciones-sanitarias/" },
    { texto: "Ley 19.628", url: "https://www.bcn.cl/leychile/navegar?idNorma=141599" },
    { texto: "Ley 21.719", url: "https://www.bcn.cl/leychile/navegar?idNorma=1209272" },
  ],
};

export const FICHA_FAQ: Pregunta[] = [
  { q: "¿Qué debe tener una ficha clínica estética?", a: "Datos de la paciente, anamnesis (enfermedades, alergias, medicamentos, embarazo), evaluación facial con el fototipo de Fitzpatrick, evaluación corporal con medidas, plan de tratamiento, consentimiento informado y la evolución de cada sesión con quién atendió." },
  { q: "¿Cuánto tiempo hay que guardar la ficha clínica?", a: "Para los prestadores de salud, la Ley 20.584 exige conservarla al menos 15 años." },
  { q: "¿Es obligatorio el consentimiento informado por escrito?", a: "La Ley 20.584 pide que conste por escrito en cirugías, procedimientos invasivos y los que tienen un riesgo relevante. En el resto es verbal por regla general, pero dejarlo firmado es la mejor práctica." },
  { q: "¿Los datos de la ficha son datos sensibles?", a: "Sí. Los datos de salud son datos sensibles por la Ley 19.628, y desde el 1 de diciembre de 2026 la Ley 21.719 exige consentimiento expreso para tratarlos." },
  { q: "¿Puedo llevar la ficha clínica estética en digital?", a: "Sí. En SynapTech cada paciente tiene su ficha con alergias destacadas, notas y la evolución de cada sesión, el consentimiento se acepta al reservar y la ficha se imprime en PDF cuando la necesitas." },
];

/* ── Guía: consentimiento informado para estética (11-10-2026) ───────────────
   Keyword: "consentimiento informado estética" (+ facial, corporal, pdf, word,
   ejemplo) y por tratamiento: limpieza facial, peeling, depilación láser,
   micropigmentación, lifting de pestañas, corporal (autocompletado de Google
   Chile del 11-10, seo/sugerencias-consentimiento-2026-10-11.json).
   Lo legal reutiliza la verificación del 09-10 (filas 2a, 3 y 4c). Los efectos
   y cuidados por tratamiento son PRÁCTICA HABITUAL, no norma: la página los
   presenta como ejemplos que la profesional adapta a su técnica y equipo. */

export const CONSENTIMIENTO_PARTES = [
  { t: "Identificación", d: "Nombre, RUT, fecha de nacimiento y contacto de la paciente, y quién la atiende. Si es menor de edad, también su madre, padre o tutor." },
  { t: "El tratamiento", d: "Qué se hará, en qué zona, cuántas sesiones y cada cuánto. Escrito en palabras simples, no en términos técnicos." },
  { t: "Lo que puede pasar", d: "Los efectos esperables y los posibles, aunque sean poco frecuentes: enrojecimiento, sensibilidad, manchas, alergia a un producto." },
  { t: "Alternativas", d: "Qué otras opciones tiene, incluida la de no hacerse el tratamiento." },
  { t: "Antecedentes declarados", d: "Embarazo, alergias, medicamentos, enfermedades y tratamientos recientes. Ella declara que lo que informó es verdad." },
  { t: "Cuidados antes y después", d: "Lo que tiene que hacer o evitar: sol, maquillaje, ejercicio, otros tratamientos. Si no los sigue, el resultado puede cambiar." },
  { t: "Fotografías", d: "Una autorización aparte: solo para la ficha, también para difusión, o ninguna." },
  { t: "Firmas", d: "Fecha y firma de la paciente y de la profesional, después de que pudo hacer todas sus preguntas." },
];

export type TratamientoConsentimiento = { id: string; nombre: string; efectos: string; cuidados: string; ojo?: string };

export const CONSENTIMIENTO_TRATAMIENTOS: TratamientoConsentimiento[] = [
  { id: "limpieza-facial", nombre: "Limpieza facial", efectos: "Enrojecimiento y sensibilidad por algunas horas, y a veces granitos los días siguientes mientras la piel se limpia.", cuidados: "Protector solar, no manipular la piel y evitar exfoliantes por unos días." },
  { id: "peeling", nombre: "Peeling químico", efectos: "Enrojecimiento, ardor durante la aplicación y descamación los días siguientes. Con sol, riesgo de manchas.", cuidados: "Protector solar estricto, no arrancar la piel que se descama, sin exfoliantes ni ácidos en casa hasta que se indique.", ojo: "Pregunta por embarazo, herpes activo y uso reciente de isotretinoína." },
  { id: "depilacion-laser", nombre: "Depilación láser", efectos: "Enrojecimiento e hinchazón alrededor de cada folículo por algunas horas. Con poca frecuencia, quemaduras o cambios de color de la piel.", cuidados: "Sin sol ni autobronceante antes y después, no usar cera ni pinzas entre sesiones (sí rasuradora).", ojo: "Registra el fototipo: define los parámetros del equipo." },
  { id: "micropigmentacion", nombre: "Micropigmentación de cejas o labios", efectos: "Inflamación y costras los primeros días. El color cambia mientras cicatriza y puede requerir un retoque.", cuidados: "No mojar ni rascar la zona, no exponerla al sol y no ir a piscina hasta que cicatrice.", ojo: "Atraviesa la piel: es un procedimiento invasivo, y el consentimiento tiene que constar por escrito." },
  { id: "lifting-pestanas", nombre: "Lifting de pestañas", efectos: "Irritación o ardor si el producto toca el ojo, y con poca frecuencia alergia al producto.", cuidados: "No mojar las pestañas ni usar máscara por 24 horas.", ojo: "Pregunta por alergias y por lentes de contacto; ante la duda, haz una prueba previa del producto." },
  { id: "corporal", nombre: "Tratamientos corporales", efectos: "Enrojecimiento, calor o sensibilidad en la zona tratada, según el equipo (radiofrecuencia, cavitación, masajes).", cuidados: "Hidratación y las indicaciones de cada equipo; los resultados dependen también de la alimentación y la actividad física.", ojo: "Pregunta por embarazo, marcapasos e implantes metálicos antes de usar aparatología." },
];

export const CONSENTIMIENTO_LEY = {
  fecha: FECHA,
  parrafos: [
    "La Ley 20.584 dice que toda persona tiene derecho a aceptar o rechazar un tratamiento después de recibir información suficiente. Ese consentimiento es verbal por regla general, pero debe constar por escrito en cirugías, procedimientos invasivos y los que tienen un riesgo relevante y conocido.",
    "Los procedimientos invasivos o que penetran la piel, como la micropigmentación, requieren autorización sanitaria y un director técnico que sea profesional de la salud. Un instituto de belleza solo puede atender a personas sanas con fines estéticos.",
    "Aunque tu tratamiento no exija el consentimiento por escrito, dejarlo firmado es la mejor práctica: deja constancia de qué se explicó y qué declaró la paciente.",
    "Las fotos de antes y después son datos personales. Desde el 1 de diciembre de 2026 la Ley 21.719 exige consentimiento expreso para tratar datos de salud, así que conviene pedir la autorización de las fotos aparte y por escrito.",
  ],
  fuentes: FICHA_LEY.fuentes,
};

export const CONSENTIMIENTO_FAQ: Pregunta[] = [
  { q: "¿Qué es el consentimiento informado en estética?", a: "Es el documento en que la paciente declara que se le explicó el tratamiento, sus efectos posibles, las alternativas y los cuidados, que pudo preguntar y que acepta hacérselo. Se firma antes de la primera sesión." },
  { q: "¿Es obligatorio el consentimiento informado por escrito?", a: "La Ley 20.584 lo exige por escrito en cirugías, procedimientos invasivos y los que tienen un riesgo relevante. En el resto es verbal por regla general, pero dejarlo firmado es la mejor práctica." },
  { q: "¿Necesito un consentimiento distinto para cada tratamiento?", a: "Conviene: los efectos y cuidados de una limpieza facial no son los de un peeling o un láser. La plantilla trae un documento general y anexos por tratamiento que completas según tu técnica." },
  { q: "¿Sirve para una menor de edad?", a: "La plantilla tiene un espacio para la firma de la madre, el padre o el tutor, que debe acompañarla." },
  { q: "¿Lo puedo editar en Word?", a: "Sí: está en PDF para imprimir y en Word para agregar tu logo, tus tratamientos y tus textos." },
  { q: "¿Se puede firmar en digital?", a: "Sí. En SynapTech el consentimiento se acepta al reservar, el local puede exigirlo para agendar y queda guardado en la ficha de cada paciente." },
];

import type { Pregunta } from "@/components/FaqSeo";

/* Recursos gratis para barberías y peluquerías (30-10-2026): las dos
   calculadoras de /recursos. Search Console (90 días al 30-10) mostró que los
   recursos gratis rankean (ficha y consentimiento en posición 5–8, la guía de
   boletas en 4,7) mientras "software para barberías" está en 50–97: este es el
   formato que funciona, llevado a barberías.

   Cifras tributarias, verificadas el 30-10-2026 en el SII:
   - Retención 2026 = 15,25 % (sii.cl/preguntas_frecuentes/declaracion_renta/001_140_7297.htm,
     actualizada el 01-04-2026, y sii.cl/destacados/boletas_honorarios/aumento_gradual.html).
   - Si la boleta va a una persona que no retiene, el emisor paga "el 15.25% de los
     honorarios cobrados al cliente" en su F29 (…/boleta_honorario_electr/001_120_0889.htm,
     actualizada el 08-01-2026). En arriendo de sillón el barbero boletea la venta
     COMPLETA a sus clientes: el 15,25 % va sobre todo eso, no sobre lo que le queda.
   - IVA 19 % y arriendo de sillón afecto: las fuentes de BHE_FUENTES (content/guias.ts).
   Ningún número de las calculadoras es un dato de mercado: los pone el dueño.
   Al cambiar la retención (16 % en 2027), cambiarla acá y en content/guias.ts. */

export const RETENCION_BHE = 0.1525;
export const RETENCION_TEXTO = "15,25 %";
export const IVA = 0.19;
export const FECHA_RECURSOS = "30 de octubre de 2026";

export const FUENTES_SILLON = [
  { texto: "SII: tasas de retención de boletas de honorarios por año", url: "https://www.sii.cl/preguntas_frecuentes/declaracion_renta/001_140_7297.htm" },
  { texto: "SII: aumento gradual de la retención (Ley 21.133)", url: "https://www.sii.cl/destacados/boletas_honorarios/aumento_gradual.html" },
  { texto: "SII: quién paga el 15,25 % si la boleta va a una persona", url: "https://www.sii.cl/preguntas_frecuentes/boleta_honorario_electr/001_120_0889.htm" },
  { texto: "SII: peluquero que trabaja solo, boleta de honorarios e IVA", url: "https://www.sii.cl/preguntas_frecuentes/impuestos_mensuales/001_130_1011.htm" },
  { texto: "SII: arriendo de sillón afecto a IVA (Oficio 2638 de 2002)", url: "https://www.sii.cl/pagina/jurisprudencia/adminis/2002/ventas/ja317.htm" },
];

/* ── Calculadora: comisión o arriendo de sillón ──────────────────────────── */

export const SILLON_PASOS = [
  { t: "Comisión a honorarios", d: "El cliente le paga al local, el local boletea el servicio completo con IVA y le paga al barbero su porcentaje contra una boleta de honorarios. Si el local es empresa, le retiene el 15,25 %." },
  { t: "Arriendo de sillón", d: "El barbero atiende a sus propios clientes, les emite boleta de honorarios por todo lo que cobra (sin IVA, porque trabaja solo) y le paga al local un arriendo fijo, que sí lleva IVA." },
  { t: "Lo que casi nadie calcula", d: "En arriendo, el barbero paga el 15,25 % sobre todo lo que cobra a sus clientes, no sobre lo que le queda después del arriendo. Por eso un arriendo igual al 50 % no lo deja igual que una comisión del 50 %." },
];

export const SILLON_FAQ: Pregunta[] = [
  { q: "¿Qué conviene más, comisión o arriendo de sillón?", a: "Depende de cuánto vende el barbero y de cuánto es el arriendo. Con comisión, el local paga IVA por toda la venta; con arriendo, solo por el arriendo. Pero en arriendo el barbero paga el 15,25 % sobre todo lo que cobra. La calculadora te muestra con tus números dónde quedan los dos." },
  { q: "¿Cuánto cobrar por el arriendo de un sillón de barbería?", a: "No hay un precio único: depende de la comuna, del local y de cuánto vende el barbero. Una forma de fijarlo es calcular el arriendo que deja igual al barbero que con su comisión actual y el que deja igual al local, y negociar entre esos dos. La calculadora te da ambos." },
  { q: "¿La comisión del barbero se calcula sobre el precio con o sin IVA?", a: "Las dos formas se usan, y lo importante es dejarlo por escrito. Sobre el precio sin IVA, el barbero recibe menos y el local deja de pagarle comisión al IVA, que no es suyo. La calculadora tiene las dos opciones." },
  { q: "¿Cuánto se retiene de la boleta de honorarios del barbero en 2026?", a: "El 15,25 %. Si el local es persona jurídica, o de primera categoría con contabilidad, lo retiene y lo paga al SII. Si no, el barbero recibe el total y paga él mismo el 15,25 % en su Formulario 29." },
  { q: "¿El barbero que arrienda sillón cobra IVA?", a: "No, si trabaja solo: para el SII es de segunda categoría y emite boletas de honorarios. El que sí lleva IVA es el arriendo del sillón, que el local le cobra con factura, o con boleta si el barbero no es contribuyente de IVA." },
  { q: "¿El 15,25 % se pierde?", a: "No. Es un pago provisional: en la Operación Renta se usa primero para las cotizaciones del barbero (AFP, salud y seguros) y para su impuesto. Si sobra, se le devuelve; si falta, lo paga." },
];

/* ── Calculadora: cuánto te cuestan las inasistencias ────────────────────── */

export const INASISTENCIA_IDEAS = [
  { t: "Confirmación y recordatorio", d: "Un aviso al reservar y otro antes de la hora. El que se olvidó se acuerda, y el que no puede ir te avisa a tiempo para dar la hora a otro." },
  { t: "Que cancelar sea fácil", d: "Si el cliente puede cancelar o cambiar la hora solo, desde el enlace de su reserva, te avisa en vez de no llegar." },
  { t: "Abono en los servicios largos", d: "Para los servicios que ocupan más tiempo, o en los horarios más pedidos, un abono al reservar asegura la hora." },
  { t: "Una política escrita", d: "Cuánto antes se puede cancelar y qué pasa con el abono si no llega. Que el cliente la vea antes de reservar, no después." },
  { t: "Saber quién falla", d: "Anota cada inasistencia en la ficha del cliente. Al que falla seguido le pides abono; al que nunca falla, no." },
  { t: "Llenar el hueco", d: "Ten a mano a los clientes que pidieron hora y no encontraron: si alguien cancela con tiempo, les ofreces la hora." },
];

export const INASISTENCIA_FAQ: Pregunta[] = [
  { q: "¿Cómo calculo cuánto pierdo por clientes que no llegan?", a: "Multiplica las citas que se pierden a la semana por el precio promedio del servicio, y eso por las semanas que trabajas. Si alcanzas a llenar algunas de esas horas con otro cliente, descuenta esas. La calculadora de esta página hace la cuenta por semana, por mes y por año." },
  { q: "¿Qué es un no-show en una barbería?", a: "Es el cliente que reservó y no llega, o que cancela tan tarde que ya no alcanzas a dar la hora a otro. El sillón queda vacío y esa hora no se recupera." },
  { q: "¿Quién pierde la plata de una inasistencia?", a: "Los dos. Si el barbero trabaja a comisión, de cada hora vacía pierde su porcentaje y el local el resto. Si arrienda sillón, la pierde entera él, y el local cobra igual el arriendo." },
  { q: "¿Sirven los recordatorios para bajar las inasistencias?", a: "Ayudan, sobre todo con el que se olvida. Funcionan mejor junto con una forma fácil de cancelar, para que el que no puede ir avise a tiempo y alcances a dar la hora a otro." },
  { q: "¿Puedo cobrar un abono al reservar?", a: "Sí. Lo más claro es pedirlo al reservar online, en los servicios que tú elijas, con una política de cancelación escrita que el cliente ve antes de pagar. En SynapTech se cobra con Mercado Pago en el último paso de la reserva." },
];

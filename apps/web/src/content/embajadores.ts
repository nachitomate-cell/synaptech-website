/* Programa de embajadores (11-10-2026, a partir del análisis de Yeasy, que
   muestra 24 barberos embajadores con su Instagram y pide un "código
   embajador" en el registro).

   Reglas = las que Ignacio ya acordó con El 10 y BRZ (videos de referido del
   10-10): el local que llega con el código parte con su primer mes gratis, y
   el embajador suma un mes gratis cuando ese local paga su primera
   mensualidad. El código se escribe en empieza.synaptechspa.cl (campo
   "Código de embajador", o llega prellenado con ?codigo=) y le llega a
   Ignacio en el correo del lead; el mes lo aplica él a mano.

   🔴 EMBAJADORES: solo locales que aceptaron aparecer, con su permiso
   explícito. Mostrar a un local o a un barbero como "embajador" sin su sí es
   afirmar una recomendación que no hizo. Mientras la lista esté vacía, la
   sección no se muestra. */

export type Embajador = {
  codigo: string;          // lo que se escribe en el registro, en mayúsculas
  local: string;
  ciudad: string;
  instagram?: string;      // sin @
  reserva?: string;        // URL de su página de reservas
  desde: string;           // fecha en que aceptó aparecer, para saber de dónde sale
};

export const EMBAJADORES: Embajador[] = [];

export const LINK_EMBAJADOR = (codigo: string) => `https://empieza.synaptechspa.cl/?codigo=${encodeURIComponent(codigo)}`;

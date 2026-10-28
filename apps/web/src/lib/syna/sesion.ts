/* Id de la conversación con Syna en el sitio (28-10-2026): con él, la
   plataforma junta los mensajes de una misma visita en un solo documento
   (functions/syna-web.js). Vive en sessionStorage; si el navegador no lo
   deja, se usa uno por pestaña, en memoria. */
const CLAVE = "syna-sesion";
let enMemoria = "";

const nuevo = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;

export function sesionSyna(): string {
  try {
    const g = sessionStorage.getItem(CLAVE);
    if (g) return g;
    const s = nuevo();
    sessionStorage.setItem(CLAVE, s);
    return s;
  } catch {
    if (!enMemoria) enMemoria = nuevo();
    return enMemoria;
  }
}

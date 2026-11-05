/* Consentimiento de cookies por finalidad (05-11-2026).

   EL PROBLEMA · La política decía "No utilizamos cookies de seguimiento o
   publicidad de terceros" mientras TrackingScripts cargaba el Pixel de Meta y
   el de OpenAI (ChatGPT Ads) en cada visita, sin preguntar. Ahora nada de
   terceros se carga hasta que la persona elige, y la elección se puede cambiar
   desde el enlace «Cookies» del pie de página.

   DOS FINALIDADES
   · medicion: la cookie propia `syn_pt` (con qué campaña llegó, para atribuir
     el alta). Sin ella el link de alta igual lleva la campaña de ESTA visita,
     pero no la recuerda si vuelve otro día.
   · anuncios: Pixel de Meta, pixel de OpenAI y LinkedIn Insight (si está
     configurado). Se cargan solo con este permiso; no se usa su modo
     "consentimiento denegado" porque ninguno promete no escribir nada antes.

   Vercel Analytics y Speed Insights no usan cookies ni identifican a nadie
   (cuentan visitas y velocidad en agregado): no dependen de esta elección.

   La elección vive en la cookie técnica `syn_consent` (12 meses). Es la única
   que se escribe sin preguntar, porque sin ella habría que preguntar en cada
   página. */

export const COOKIE_CONSENT = "syn_consent";
export const VERSION_CONSENT = 1;
const DIAS = 365;

export type Consentimiento = {
  v: number;
  medicion: boolean;
  anuncios: boolean;
  /** ISO de cuándo eligió. */
  at: string;
};

/** Evento que avisa a TrackingScripts y a la atribución que la elección cambió. */
export const EVENTO_CAMBIO = "syn-consent-cambio";
/** Evento que abre el aviso (lo dispara el enlace «Cookies» del pie). */
export const EVENTO_ABRIR = "syn-consent-abrir";

export function leerConsentimiento(cookie: string): Consentimiento | null {
  const m = cookie.match(new RegExp(`(?:^|; )${COOKIE_CONSENT}=([^;]*)`));
  if (!m) return null;
  try {
    const o = JSON.parse(decodeURIComponent(m[1]));
    if (!o || typeof o !== "object" || o.v !== VERSION_CONSENT) return null;
    return { v: VERSION_CONSENT, medicion: o.medicion === true, anuncios: o.anuncios === true, at: String(o.at || "") };
  } catch {
    return null;
  }
}

function dominioCookie(hostname: string): string {
  return /(^|\.)synaptechspa\.cl$/.test(hostname) ? ";domain=.synaptechspa.cl" : "";
}

export function cookieDeConsentimiento(c: Consentimiento, hostname: string, https: boolean): string {
  return `${COOKIE_CONSENT}=${encodeURIComponent(JSON.stringify(c))};path=/;max-age=${DIAS * 86400};SameSite=Lax${dominioCookie(hostname)}${https ? ";Secure" : ""}`;
}

/** Cookies propias que deja cada finalidad. Al revocar se borran. */
export const COOKIES_POR_FINALIDAD: Record<"medicion" | "anuncios", RegExp> = {
  medicion: /^syn_pt$/,
  anuncios: /^(_fbp|_fbc|_oai.*|__oai.*|oai.*|li_.*|_li.*|lidc|bcookie|UserMatchHistory|AnalyticsSyncHistory)$/i,
};

/** Borra las cookies de una finalidad en todas las variantes de dominio. */
export function borrarCookies(patron: RegExp, doc: Document = document): string[] {
  const host = doc.location.hostname;
  const partes = host.split(".");
  const dominios = [""];
  for (let i = 0; i < partes.length - 1; i++) dominios.push(`;domain=.${partes.slice(i).join(".")}`);
  const borradas: string[] = [];
  for (const par of doc.cookie.split(/;\s*/)) {
    const nombre = par.split("=")[0];
    if (!nombre || !patron.test(nombre)) continue;
    for (const d of dominios) doc.cookie = `${nombre}=;path=/;max-age=0${d}`;
    borradas.push(nombre);
  }
  return borradas;
}

/** Guarda la elección, borra lo que se revocó y avisa al resto de la página. */
export function guardarConsentimiento(eleccion: { medicion: boolean; anuncios: boolean }): Consentimiento {
  const anterior = leerConsentimiento(document.cookie);
  const c: Consentimiento = { v: VERSION_CONSENT, medicion: eleccion.medicion, anuncios: eleccion.anuncios, at: new Date().toISOString() };
  try { document.cookie = cookieDeConsentimiento(c, location.hostname, location.protocol === "https:"); } catch { /* sin cookies */ }
  if (!c.medicion) borrarCookies(COOKIES_POR_FINALIDAD.medicion);
  if (!c.anuncios) borrarCookies(COOKIES_POR_FINALIDAD.anuncios);
  window.dispatchEvent(new CustomEvent(EVENTO_CAMBIO, { detail: c }));
  // Un pixel que ya se cargó no se "descarga": si se revoca anuncios, se
  // recarga la página para que deje de correr en esta visita.
  if (anterior?.anuncios && !c.anuncios) location.reload();
  return c;
}

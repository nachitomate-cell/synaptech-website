/* Primer toque: con qué campaña llegó la persona al sitio, y que esa campaña
   llegue entera al alta (01-11-2026).

   EL PROBLEMA · Los botones de alta (catalogo.ts) llevaban `utm_source=
   synaptechspa&utm_medium=<botón>` fijo. Quien llegaba por un anuncio de
   ChatGPT (`?utm_source=chatgpt…`), miraba precios y apretaba "Prueba 30 días"
   aterrizaba en crear.synaptechspa.cl con NUESTRO utm_source, y el alta quedaba
   como "synaptechspa". Valhalla y Scarface se registraron en plena prueba de
   ChatGPT Ads y no hay forma de saber si vinieron de ahí.

   CÓMO · Al aterrizar se guarda el primer toque CON fuente (UTM, gclid, fbclid
   o un referrer de afuera) en la cookie `syn_pt` con domain=.synaptechspa.cl:
   la lee crear.synaptechspa.cl (crea.html, repo Barberia-Elegance). Y al
   apretar un botón de alta se reescribe el link con esa campaña, porque
   bioo.cl/agenda es otro dominio y no ve la cookie. El botón viaja en `cta`
   (y en utm_content si la campaña no trae uno propio).

   Una visita directa NO escribe la cookie: si mañana vuelve por un anuncio,
   ese anuncio tiene que poder quedarse con el crédito. Una con fuente no se
   pisa en 90 días (primer toque, igual que crea.html). */

export const COOKIE_PT = "syn_pt";
export const FUENTE_INTERNA = "synaptechspa";
const DIAS = 90;
const TOPE = 120;

export type PrimerToque = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  /** De dónde venía ANTES de entrar al sitio (chatgpt.com, google.com…). */
  referrer?: string;
  landing?: string;
  at?: string;
};

const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/** Nuestros dominios: venir de acá es navegación interna, no una fuente. */
export function esHostPropio(host: string): boolean {
  const h = host.toLowerCase();
  return /(^|\.)synaptechspa\.cl$/.test(h) || /(^|\.)bioo\.cl$/.test(h);
}

function texto(v: string | null | undefined, tope = TOPE): string | undefined {
  const s = String(v ?? "").trim().slice(0, tope);
  return s || undefined;
}

/** Lo que dice ESTA visita. null si no trae ninguna fuente. */
export function toqueDeVisita(search: string, referrer: string, landing: string, ahora = new Date()): PrimerToque | null {
  const q = new URLSearchParams(search);
  const t: PrimerToque = {};
  for (const c of UTM) { const v = texto(q.get(c)); if (v) t[c] = v; }
  // Un link nuestro con nuestro utm_source no es una fuente.
  if (t.utm_source === FUENTE_INTERNA) for (const c of UTM) delete t[c];
  const gclid = texto(q.get("gclid"), 255); if (gclid) t.gclid = gclid;
  const fbclid = texto(q.get("fbclid"), 255); if (fbclid) t.fbclid = fbclid;
  try {
    const u = referrer ? new URL(referrer) : null;
    if (u && !esHostPropio(u.hostname)) t.referrer = referrer.slice(0, 200);
  } catch { /* referrer ilegible: no cuenta */ }
  if (!t.utm_source && !t.gclid && !t.fbclid && !t.referrer) return null;
  t.landing = texto(landing || "/", 80);
  t.at = ahora.toISOString();
  return t;
}

export function leerToque(cookie: string): PrimerToque | null {
  const m = cookie.match(new RegExp(`(?:^|; )${COOKIE_PT}=([^;]*)`));
  if (!m) return null;
  try {
    const o = JSON.parse(decodeURIComponent(m[1]));
    return o && typeof o === "object" ? (o as PrimerToque) : null;
  } catch { return null; }
}

/** El `document.cookie = …` para guardar el toque. Fuera de synaptechspa.cl
    (localhost, previews de Vercel) va sin `domain` o el navegador la bota. */
export function cookieDeToque(t: PrimerToque, hostname: string, https: boolean): string {
  const dominio = /(^|\.)synaptechspa\.cl$/.test(hostname) ? ";domain=.synaptechspa.cl" : "";
  return `${COOKIE_PT}=${encodeURIComponent(JSON.stringify(t))};path=/;max-age=${DIAS * 86400};SameSite=Lax${dominio}${https ? ";Secure" : ""}`;
}

/** ¿Este link lleva a un alta? crear./crea./empieza. o bioo.cl/agenda. */
export function esLinkDeAlta(u: URL): boolean {
  const h = u.hostname.toLowerCase();
  if (h === "crear.synaptechspa.cl" || h === "crea.synaptechspa.cl" || h === "empieza.synaptechspa.cl") return true;
  return (h === "bioo.cl" || h === "www.bioo.cl") && /^\/agenda(\/|$)/.test(u.pathname);
}

/** El nombre del botón que trae el link: `cta`, o lo que los links viejos
    ponían en utm_content / utm_medium junto a nuestro utm_source. */
export function botonDe(u: URL): string | null {
  const p = u.searchParams;
  if (p.get("cta")) return p.get("cta");
  if (p.get("utm_source") === FUENTE_INTERNA) return p.get("utm_content") || p.get("utm_medium");
  // Links con campaña propia (directorio · seo · cta-duenos): esa ES la etiqueta del botón.
  return [p.get("utm_source"), p.get("utm_campaign") || p.get("utm_medium")].filter(Boolean).join(":") || null;
}

/** El link de alta con la campaña real. Sin toque, el link queda igual:
    entró directo y `utm_source=synaptechspa` es lo único que hay. */
export function reescribirAlta(href: string, toque: PrimerToque | null): string {
  if (!toque) return href;
  let u: URL;
  try { u = new URL(href); } catch { return href; }
  if (!esLinkDeAlta(u)) return href;
  const p = u.searchParams;
  const boton = botonDe(u);
  // Se borra todo lo que esta función pone y se vuelve a poner en orden fijo:
  // pointerdown y click la llaman dos veces sobre el mismo link.
  for (const c of [...UTM, "cta", "gclid", "fbclid", "ref0"]) p.delete(c);
  if (toque.utm_source) {
    for (const c of UTM) if (toque[c]) p.set(c, toque[c]!);
  }
  // Solo referrer: sin utm_source inventado; el referrer viaja en ref0.
  if (!p.get("utm_content") && boton) p.set("utm_content", boton);
  if (boton) p.set("cta", boton);
  if (toque.gclid) p.set("gclid", toque.gclid);
  if (toque.fbclid) p.set("fbclid", toque.fbclid);
  if (toque.referrer) p.set("ref0", toque.referrer);
  return u.toString();
}

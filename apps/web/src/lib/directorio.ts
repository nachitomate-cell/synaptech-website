/* Directorio de locales ("Red Synaptech"): las cuatro páginas las genera el
   repo de la plataforma (scripts/gen-directorio-vina.mjs) a partir de los
   locales pagando, con opt-out por local, y las sirve app.synaptechspa.cl.
   Este sitio las muestra en /barberias-vina-del-mar, etc. por un rewrite
   (next.config.mjs).

   La portada /locales NO copia la lista de locales: la LEE de esas páginas
   (una vez al día, ISR) para que nunca muestre un local que ya salió del
   directorio. Si la lectura falla, la portada igual muestra los cuatro
   enlaces, sin las fichas. */

const APP = "https://app.synaptechspa.cl";

export type PaginaDirectorio = {
  slug: string;
  titulo: string;
  bajada: string;
  rubro: "barberia" | "salon";
};

export const PAGINAS: PaginaDirectorio[] = [
  { slug: "barberias-vina-del-mar",    titulo: "Barberías en Viña del Mar", bajada: "Las barberías de Viña con reserva online.", rubro: "barberia" },
  { slug: "barberias-quinta-region",   titulo: "Barberías en la Región de Valparaíso", bajada: "Viña, Valparaíso, Villa Alemana y Limache.", rubro: "barberia" },
  { slug: "peluquerias-vina-del-mar",  titulo: "Peluquerías y salones en Viña del Mar", bajada: "Salones, peluquerías y estética en Viña.", rubro: "salon" },
  { slug: "peluquerias-quinta-region", titulo: "Peluquerías y salones en la Región de Valparaíso", bajada: "Toda la región, con reserva online.", rubro: "salon" },
];

export type LocalDirectorio = {
  tid: string;
  nombre: string;
  barrio: string;
  direccion: string;
  comuna: string;
  imagen: string;
  reservar: string;
  rating: number | null;
  opiniones: number | null;
  rubro: "barberia" | "salon";
};

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();

const texto = (html: string) => decode(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));

function leerPagina(html: string, rubro: LocalDirectorio["rubro"]): LocalDirectorio[] {
  // Comuna de cada local desde el JSON-LD (ItemList) de la propia página.
  const comunas = new Map<string, string>();
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const d = JSON.parse(m[1]);
      for (const it of d.itemListElement ?? []) {
        const i = it.item ?? {};
        if (i.name && i.address?.addressLocality) comunas.set(i.name, i.address.addressLocality);
      }
    } catch { /* otro bloque JSON-LD: no importa */ }
  }

  const locales: LocalDirectorio[] = [];
  for (const m of html.matchAll(/<article class="card"([^>]*)>([\s\S]*?)<\/article>/g)) {
    const attrs = m[1], cuerpo = m[2];
    const attr = (n: string) => decode(attrs.match(new RegExp(`data-${n}="([^"]*)"`))?.[1] ?? "");
    const nombre = attr("nombre");
    const tid = attr("tid");
    const reservar = cuerpo.match(/<a class="cta" href="([^"]+)"/)?.[1] ?? "";
    const imagen = cuerpo.match(/<img class="media-img" src="([^"]+)"/)?.[1] ?? "";
    if (!nombre || !tid || !reservar.startsWith("https://")) continue;
    const r = parseFloat(attr("rating"));
    const o = parseInt(attr("reviews"), 10);
    locales.push({
      tid, nombre, rubro,
      barrio: texto(cuerpo.match(/<span class="badge">([\s\S]*?)<\/span>/)?.[1] ?? ""),
      direccion: texto(cuerpo.match(/<p class="card-addr">([\s\S]*?)<\/p>/)?.[1] ?? ""),
      comuna: comunas.get(nombre) ?? "",
      imagen: imagen.startsWith("/") ? imagen : "",
      reservar,
      rating: Number.isFinite(r) && r > 0 ? r : null,
      opiniones: Number.isFinite(o) && o > 0 ? o : null,
    });
  }
  return locales;
}

/** Todos los locales del directorio, sin repetir (las páginas regionales
 *  incluyen a los de Viña). Se revalida una vez al día. */
export async function obtenerLocales(): Promise<LocalDirectorio[]> {
  const vistos = new Map<string, LocalDirectorio>();
  for (const p of PAGINAS) {
    try {
      const res = await fetch(`${APP}/${p.slug}`, { next: { revalidate: 86400 } });
      if (!res.ok) continue;
      for (const l of leerPagina(await res.text(), p.rubro)) {
        if (!vistos.has(l.tid)) vistos.set(l.tid, l);
      }
    } catch { /* sin red en el build: la portada sale sin fichas */ }
  }
  return [...vistos.values()];
}

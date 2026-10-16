import { logoAbsoluto, precioEn, type LocalDirectorio } from "@/lib/directorio";
import { SITIO } from "@/lib/seo";

/* JSON-LD de una página del directorio (/locales y /locales/{zona}): CollectionPage
   + ItemList de LocalBusiness con el MISMO @id que declara la página de cada local
   (`https://{host}/#negocio`; una sede es `#sede-{id}` con parentOrganization) y,
   si se pasa, el BreadcrumbList. Un solo ItemList, sin duplicar cada local en un
   bloque suelto, y sin aggregateRating (las notas son de Google, no nuestras). */
export function jsonLdDirectorio(locales: LocalDirectorio[], opts: {
  url: string; nombre: string; descripcion: string;
  migas?: { nombre: string; url: string }[];
}) {
  const grafo: Record<string, unknown>[] = [
    {
      "@type": "CollectionPage", "@id": `${opts.url}#pagina`, url: opts.url, name: opts.nombre, description: opts.descripcion,
      inLanguage: "es-CL", publisher: { "@id": `${SITIO}/#org` }, mainEntity: { "@id": `${opts.url}#lista` },
    },
    {
      "@type": "ItemList", "@id": `${opts.url}#lista`, name: opts.nombre,
      numberOfItems: locales.length, itemListOrder: "https://schema.org/ItemListUnordered",
      itemListElement: locales.map((l, i) => {
        const imagen = logoAbsoluto(l);
        return {
          "@type": "ListItem", position: i + 1,
          item: {
            "@type": l.schemaType,
            "@id": l.sede ? `${l.web}/#sede-${l.sede}` : `${l.web}/#negocio`,
            ...(l.sede ? { parentOrganization: { "@id": `${l.web}/#negocio` } } : {}),
            name: l.nombre, url: l.web,
            ...(imagen ? { image: imagen } : {}),
            address: {
              "@type": "PostalAddress", addressCountry: l.pais || "CL",
              ...(l.direccion ? { streetAddress: l.direccion } : {}),
              ...(l.comuna ? { addressLocality: l.comuna } : {}),
              ...(l.region ? { addressRegion: l.region.split(", ")[0] } : {}),
            },
            ...(l.lat != null && l.lng != null ? { geo: { "@type": "GeoCoordinates", latitude: l.lat, longitude: l.lng } } : {}),
            ...(l.precioMin && l.precioMax ? { priceRange: `${precioEn(l.pais, l.precioMin)} – ${precioEn(l.pais, l.precioMax)}` } : {}),
            ...(l.reserva ? { potentialAction: { "@type": "ReserveAction", target: { "@type": "EntryPoint", urlTemplate: l.url } } } : {}),
          },
        };
      }),
    },
  ];
  if (opts.migas?.length) {
    grafo.push({
      "@type": "BreadcrumbList",
      itemListElement: opts.migas.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: m.nombre, item: m.url })),
    });
  }
  return { "@context": "https://schema.org", "@graph": grafo };
}

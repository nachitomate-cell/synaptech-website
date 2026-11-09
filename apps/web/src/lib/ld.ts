import { SITIO } from "@/lib/seo";
import { ANUAL, type Plan, type ServicioCrecer } from "@/content/precios";
import { AGENCIA_EQUIPO, AGENCIA_EQUIPO_ANUAL, PLANES_AGENCIA } from "@/content/agencias";

/* JSON-LD compartido de las páginas de planes y servicios (01-11-2026).
   Precios netos en CLP: valueAddedTaxIncluded false en cada oferta. */

const ORG = { "@id": `${SITIO}/#org` };

export type Miga = { nombre: string; path: string };

export function breadcrumbLd(migas: Miga[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ nombre: "SynapTech", path: "/" }, ...migas].map((m, i) => ({
      "@type": "ListItem", position: i + 1, name: m.nombre, item: `${SITIO}${m.path === "/" ? "" : m.path}`,
    })),
  };
}

export const oferta = (precio: number, url: string, unidad: string) => ({
  "@type": "Offer",
  price: String(precio),
  priceCurrency: "CLP",
  priceSpecification: {
    "@type": "UnitPriceSpecification", price: String(precio), priceCurrency: "CLP", valueAddedTaxIncluded: false,
    unitText: unidad, referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: unidad.startsWith("año") ? "ANN" : "MON" },
  },
  availability: "https://schema.org/InStock",
  eligibleRegion: { "@type": "Country", name: "CL" },
  seller: ORG,
  url,
});

/** Un plan como Product con su Offer mensual. */
export function planLd(p: Plan) {
  return {
    "@type": "Product",
    name: `SynapTech ${p.nombre}`,
    description: `Plan ${p.nombre}: ${p.seo}. ${p.descripcion} Incluye: ${p.destacados.join("; ")}.`,
    brand: { "@type": "Brand", name: "SynapTech" },
    category: "Software de agenda online",
    offers: oferta(p.mes, `${SITIO}/precios#plan-${p.id}`, p.profesionales === 1 ? "mes, 1 profesional" : "mes, por local"),
  };
}

export function anualLd(precioMes: number) {
  return {
    "@type": "Product",
    name: `SynapTech ${ANUAL.base} anual`,
    description: `Todo el plan ${ANUAL.base} pagando una vez al año: equivale a ${ANUAL.equivaleMeses} meses de $${precioMes.toLocaleString("es-CL")} + IVA.`,
    brand: { "@type": "Brand", name: "SynapTech" },
    category: "Software de agenda online",
    offers: oferta(ANUAL.anio, `${SITIO}/precios#anual`, "año, por local"),
  };
}

/** Un servicio de Crecer (lo hace el equipo de SynapTech) como Service con su Offer. */
export function servicioLd(s: ServicioCrecer, tipo: string) {
  return {
    "@type": "Service",
    name: s.nombre,
    serviceType: tipo,
    description: `${s.desc} Incluye: ${s.incluye.join("; ")}. La inversión publicitaria, si la hay, la paga el local directo a Google o Meta. Sin permanencia.`,
    provider: ORG,
    areaServed: { "@type": "Country", name: "CL" },
    offers: oferta(s.mes, `${SITIO}${s.href ?? "/precios#crecer"}`, "mes"),
  };
}

/** El asistente para agencias como Service, con los planes de content/agencias.ts
    como ofertas (09-11-2026). `path` es la página; cada oferta apunta a su tarjeta. */
export function servicioAgenciaLd({ nombre, tipo, descripcion, path, audiencia }: {
  nombre: string; tipo: string; descripcion: string; path: string; audiencia: string;
}) {
  const url = `${SITIO}${path}`;
  return {
    "@type": "Service",
    name: nombre,
    serviceType: tipo,
    description: descripcion,
    provider: ORG,
    brand: { "@type": "Brand", name: "SynapTech" },
    areaServed: { "@type": "Country", name: "CL" },
    availableLanguage: ["es", "pt", "en"],
    audience: { "@type": "BusinessAudience", audienceType: audiencia },
    url,
    offers: [
      ...PLANES_AGENCIA.map((p) => ({ ...oferta(p.mes, `${url}#${p.id}`, "mes"), name: p.nombre })),
      { ...oferta(AGENCIA_EQUIPO_ANUAL.anio, `${url}#${AGENCIA_EQUIPO.id}`, "año"), name: `${AGENCIA_EQUIPO.nombre} anual` },
    ],
  };
}

export const grafo = (...nodos: object[]) => ({ "@context": "https://schema.org", "@graph": nodos });

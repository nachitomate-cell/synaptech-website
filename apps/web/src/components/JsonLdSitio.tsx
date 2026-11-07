"use client";
import { usePathname } from "next/navigation";
import { PLANES, ANUAL, LOCAL_IA, TODO_EL_PANEL, MODULOS_EQUIPO } from "@/content/precios";
import { esRutaPais } from "@/content/paises";
import { SITE_DESC } from "@/lib/sitio";

/* JSON-LD global del sitio (Organization + SoftwareApplication con los planes
   chilenos), antes escrito directo en app/layout.tsx.

   16-10-2026: las páginas por país (/pe, /co, /mx, /ar) son el link que se manda
   por WhatsApp fuera de Chile y no pueden llevar el precio chileno en ningún
   lado de su HTML ($29.900 + IVA, CLP): un prospecto de Perú leyó $29.900 como
   US$29. Como el layout no conoce la ruta sin volver dinámicas todas las
   páginas, el bloque se pinta desde acá: en el resto del sitio el HTML sale
   igual que antes (se renderiza en el servidor) y en las páginas por país no
   sale. Es componente de cliente sin props, así que los datos no viajan en el
   HTML de esas páginas. */

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.synaptechspa.cl/#org",
      name: "SynapTech",
      url: "https://www.synaptechspa.cl",
      logo: "https://www.synaptechspa.cl/icon-512x512.png",
      description: "Empresa chilena de Viña del Mar que construye y opera SynapTech, plataforma por suscripción de agenda online, cobros, fidelización y asistente con IA para barberías, salones y centros de estética.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Viña del Mar",
        addressRegion: "Valparaíso",
        addressCountry: "CL",
      },
      email: "hola@synaptechspa.cl",
      telephone: "+56983568212",
      legalName: "Synaptech SpA",
      taxID: "78402009-6",
      foundingDate: "2026-04-15",
      founder: { "@type": "Person", name: "Ignacio Mateluna" },
      knowsAbout: ["Agenda online para barberías", "Software para peluquerías y salones de belleza", "Software para centros de estética", "Asistente con IA para WhatsApp", "Club de fidelización con Google Wallet y Apple Wallet", "Boletas de honorarios ante el SII"],
      sameAs: [
        "https://www.instagram.com/synaptechspa",
        "https://www.youtube.com/@synaptechspa",
        // Página de Facebook (la de los anuncios de Meta, page id 1196873966836681).
        "https://www.facebook.com/61590616084932",
        "https://apps.apple.com/cl/app/synaptech-studio/id6794530086",
        "https://play.google.com/store/apps/details?id=cl.synaptechspa.studio",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.synaptechspa.cl/#app",
      name: "SynapTech",
      url: "https://www.synaptechspa.cl",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      downloadUrl: [
        "https://apps.apple.com/cl/app/synaptech-studio/id6794530086",
        "https://play.google.com/store/apps/details?id=cl.synaptechspa.studio",
      ],
      // "Todo el panel" (todos los planes) + módulos de equipo (desde Local).
      featureList: [...TODO_EL_PANEL, MODULOS_EQUIPO].flatMap((g) => g.filas.filter((f) => f.v[2] === true).map((f) => f.label)),
      description: SITE_DESC,
      publisher: { "@id": "https://www.synaptechspa.cl/#org" },
      areaServed: "CL",
      // Lista pública oficial (netos + IVA, por local), desde content/precios.ts.
      // El 10-10 un buscador con IA leyó estos precios desde acá y dijo "no
      // encontré qué incluye cada plan": por eso cada oferta lleva su detalle.
      // Escalera de noviembre 2026: Independiente, Independiente IA, Local, Local IA y Todo Incluido, más el anual.
      offers: PLANES.map((p) => ({
        "@type": "Offer",
        name: `Plan ${p.nombre}: ${p.seo}`,
        description: `${p.descripcion} Incluye: ${p.destacados.join("; ")}.`,
        price: String(p.mes),
        priceCurrency: "CLP",
        priceSpecification: { "@type": "UnitPriceSpecification", price: String(p.mes), priceCurrency: "CLP", valueAddedTaxIncluded: false, unitText: p.profesionales === 1 ? "mes, 1 profesional" : "mes, por local" },
        eligibleRegion: { "@type": "Country", name: "CL" },
        url: `https://www.synaptechspa.cl/precios#plan-${p.id}`,
      })).concat([{
        "@type": "Offer",
        name: `Plan anual ${ANUAL.base}`,
        description: `Todo el plan ${ANUAL.base} pagando una vez al año: equivale a ${ANUAL.equivaleMeses} meses de ${LOCAL_IA.mes.toLocaleString("es-CL")}.`,
        price: String(ANUAL.anio),
        priceCurrency: "CLP",
        priceSpecification: { "@type": "UnitPriceSpecification", price: String(ANUAL.anio), priceCurrency: "CLP", valueAddedTaxIncluded: false, unitText: "año, por local" },
        eligibleRegion: { "@type": "Country", name: "CL" },
        url: "https://www.synaptechspa.cl/precios",
      }]),
    },
  ],
};

export default function JsonLdSitio() {
  const pathname = usePathname();
  if (esRutaPais(pathname)) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />;
}

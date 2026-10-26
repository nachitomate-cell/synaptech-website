"use client";
import { usePathname } from "next/navigation";
import { PLANES, HOME_STUDIO, COMPARATIVA } from "@/content/precios";
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
      featureList: COMPARATIVA.flatMap((g) => g.filas.filter((f) => f.basico === true).map((f) => f.label)),
      description: SITE_DESC,
      publisher: { "@id": "https://www.synaptechspa.cl/#org" },
      areaServed: "CL",
      // Lista pública oficial (netos + IVA, por local), desde content/precios.ts.
      // El 10-10 un buscador con IA leyó estos precios desde acá y dijo "no
      // encontré qué incluye cada plan": por eso cada oferta lleva su detalle.
      offers: PLANES.map((p) => ({
        "@type": "Offer",
        name: p.nombre,
        description: `${p.descripcion} Incluye: ${p.destacados.join("; ")}.`,
        price: String(p.mes),
        priceCurrency: "CLP",
        priceSpecification: { "@type": "UnitPriceSpecification", price: String(p.mes), priceCurrency: "CLP", valueAddedTaxIncluded: false, unitText: "mes, por local" },
        eligibleRegion: { "@type": "Country", name: "CL" },
        url: "https://www.synaptechspa.cl/precios",
      })).concat([{
        "@type": "Offer",
        name: HOME_STUDIO.nombre,
        description: "Todo el plan Básico para quien atiende solo (1 profesional). Con el segundo profesional pasa al Básico.",
        price: String(HOME_STUDIO.mes),
        priceCurrency: "CLP",
        priceSpecification: { "@type": "UnitPriceSpecification", price: String(HOME_STUDIO.mes), priceCurrency: "CLP", valueAddedTaxIncluded: false, unitText: "mes, 1 profesional" },
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

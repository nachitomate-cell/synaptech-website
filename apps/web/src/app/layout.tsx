import type { Metadata } from "next";
import { Inter_Tight, DM_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WhatsAppButton from "@/components/WhatsAppButton";
import SynaChat from "@/components/SynaChat";
import TrackingScripts from "@/components/TrackingScripts";
import { PLANES, COMPARATIVA } from "@/content/precios";

/* Titulares en una grotesca apretada, como Square; el cuerpo sigue en DM Sans. */
const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});


/* Posicionamiento: SynapTech es un PRODUCTO SaaS por suscripción, no una
   agencia. El title/description anteriores ("software a medida") hicieron que
   Google for Startups nos clasificara como consultora (07-09-2026). */
const SITE_TITLE =
  "SynapTech | Agenda online, club de fidelidad y asistente IA por WhatsApp para barberías, salones y estética";
const SITE_DESC =
  "Plataforma SaaS por suscripción para barberías y salones en Chile: reservas online 24/7, club de fidelidad con sellos y premios, y un asistente con IA que responde y agenda por WhatsApp. Desde $29.900 + IVA al mes, sin comisiones por cita.";

/* Dominio canónico = www (09-10-2026). El sitio se sirve en www y el apex
   synaptechspa.cl redirige ahí; antes todas las canonical, el sitemap y el
   robots apuntaban al apex, o sea a una URL que redirige, y Google recibía
   dos señales distintas para cada página. Toda URL absoluta del sitio usa www. */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.synaptechspa.cl"),
  title: SITE_TITLE,
  description: SITE_DESC,
  keywords: ["agenda online barbería", "software para barberías Chile", "reservas online peluquería", "club de fidelidad barbería", "asistente IA WhatsApp reservas", "SaaS barberías", "agenda para salones de belleza", "fidelización Google Wallet"],
  // Sin canonical global: cada página declara la suya (lib/seo.ts). Una canonical
  // acá la heredaban /privacidad y /terminos, que quedaban apuntando a la home.
  /* Favicon = la insignia de la marca (círculo navy con la "S"), la misma de
     @synaptechspa (10-10-2026). Antes se declaraba un icon.svg con un isotipo
     viejo que los navegadores preferían sobre el .ico. Google pide un favicon
     cuadrado y múltiplo de 48 px: de ahí los PNG de 48 y 96. */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://www.synaptechspa.cl",
    siteName: "SynapTech",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [{ url: "https://www.synaptechspa.cl/og-image.png", width: 1200, height: 630, alt: "SynapTech — plataforma SaaS para barberías y salones" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ["https://www.synaptechspa.cl/og-image.png"],
  },
  other: {
    "geo.region": "CL-VS",
    "geo.placename": "Viña del Mar, Valparaíso",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
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
        })),
      },
    ],
  };

  return (
    <html lang="es-CL">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${display.variable} ${dmSans.variable} font-body bg-bg-primary text-text-primary antialiased`}
      >
        {children}
        <WhatsAppButton />
        <SynaChat />
        <TrackingScripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

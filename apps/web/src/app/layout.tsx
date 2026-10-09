import type { Metadata } from "next";
import { Inter_Tight, DM_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrackingScripts from "@/components/TrackingScripts";

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" }
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
        logo: "https://www.synaptechspa.cl/assets/synaptech-icon.png",
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
        sameAs: ["https://www.instagram.com/synaptechspa"],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.synaptechspa.cl/#app",
        name: "SynapTech",
        url: "https://www.synaptechspa.cl",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: SITE_DESC,
        publisher: { "@id": "https://www.synaptechspa.cl/#org" },
        areaServed: "CL",
        // Lista pública oficial (netos + IVA, por local). Misma fuente que la
        // sección de precios de la home: cambiar allá y acá juntos.
        offers: [
          { "@type": "Offer", name: "Básico", price: "29900", priceCurrency: "CLP", url: "https://empieza.synaptechspa.cl/" },
          { "@type": "Offer", name: "Pro",    price: "49900", priceCurrency: "CLP", url: "https://empieza.synaptechspa.cl/" },
          { "@type": "Offer", name: "Full",   price: "69900", priceCurrency: "CLP", url: "https://empieza.synaptechspa.cl/" },
        ],
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
        <TrackingScripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

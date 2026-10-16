import type { Metadata } from "next";
import { Inter_Tight, DM_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WhatsAppButton from "@/components/WhatsAppButton";
import SynaChat from "@/components/SynaChat";
import TrackingScripts from "@/components/TrackingScripts";
import JsonLdSitio from "@/components/JsonLdSitio";
import { SITE_TITLE, SITE_DESC } from "@/lib/sitio";

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
/* SITE_TITLE y SITE_DESC viven en lib/sitio.ts (los usa también el JSON-LD). */

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
  return (
    <html lang="es-CL">
      <head>
        <JsonLdSitio />
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

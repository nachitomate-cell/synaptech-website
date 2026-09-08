import type { Metadata } from "next";
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WhatsAppButton from "@/components/WhatsAppButton";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SocialProofToast from "@/components/SocialProofToast";
import TrackingScripts from "@/components/TrackingScripts";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "600"],
  display: "swap",
});

/* Posicionamiento: SynapTech es un PRODUCTO SaaS por suscripción, no una
   agencia. El title/description anteriores ("software a medida") hicieron que
   Google for Startups nos clasificara como consultora (07-09-2026). */
const SITE_TITLE =
  "SynapTech | Agenda online, club de fidelidad y asistente IA por WhatsApp para barberías y salones";
const SITE_DESC =
  "Plataforma SaaS por suscripción para barberías y salones en Chile: reservas online 24/7, club de fidelidad con sellos y premios, y un asistente con IA que responde y agenda por WhatsApp. Desde $29.900 + IVA al mes, sin comisiones por cita.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESC,
  keywords: ["agenda online barbería", "software para barberías Chile", "reservas online peluquería", "club de fidelidad barbería", "asistente IA WhatsApp reservas", "SaaS barberías", "agenda para salones de belleza", "fidelización Google Wallet"],
  alternates: { canonical: "https://synaptechspa.cl" },
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
    url: "https://synaptechspa.cl",
    siteName: "SynapTech",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [{ url: "https://synaptechspa.cl/og-image.png", width: 1200, height: 630, alt: "SynapTech — plataforma SaaS para barberías y salones" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ["https://synaptechspa.cl/og-image.png"],
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
        "@id": "https://synaptechspa.cl/#org",
        name: "SynapTech",
        url: "https://synaptechspa.cl",
        logo: "https://synaptechspa.cl/assets/synaptech-icon.png",
        description: "Empresa chilena de software. Desarrolla SynapTech, la plataforma SaaS de agenda online, fidelización y asistente con IA para barberías y salones.",
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
        "@id": "https://synaptechspa.cl/#app",
        name: "SynapTech",
        url: "https://synaptechspa.cl",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: SITE_DESC,
        publisher: { "@id": "https://synaptechspa.cl/#org" },
        areaServed: "CL",
        // Lista pública oficial (netos + IVA, por local). Misma fuente que la
        // sección de precios de la home: cambiar allá y acá juntos.
        offers: [
          { "@type": "Offer", name: "Básico", price: "29900", priceCurrency: "CLP", url: "https://crea.synaptechspa.cl/" },
          { "@type": "Offer", name: "Pro",    price: "49900", priceCurrency: "CLP", url: "https://crea.synaptechspa.cl/" },
          { "@type": "Offer", name: "Full",   price: "69900", priceCurrency: "CLP", url: "https://crea.synaptechspa.cl/" },
        ],
      },
    ],
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${dmSans.variable} ${jetbrains.variable} font-body bg-bg-primary text-text-primary antialiased`}
      >
        <PageTransition>{children}</PageTransition>
        <WhatsAppButton />
        <ExitIntentPopup />
        <SocialProofToast />
        <TrackingScripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

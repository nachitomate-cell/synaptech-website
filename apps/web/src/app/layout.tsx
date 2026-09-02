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

export const metadata: Metadata = {
  title: "SynapTech SpA | Desarrollo de Software a Medida y Soluciones Digitales",
  description:
    "Desarrollamos software a medida, portales clínicos, sistemas de fidelización y plataformas SaaS para transformar la operación de tu negocio en un flujo digital eficiente.",
  keywords: ["software a medida Chile", "desarrollo web Viña del Mar", "agencia software B2B chile", "HealthTech DICOM", "fidelización Google Wallet", "PWA educación", "automatización pagos Webpay", "barbería reservas online"],
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
    siteName: "SynapTech SpA",
    title: "SynapTech SpA | Desarrollo de Software a Medida y Soluciones Digitales",
    description: "Desarrollamos software a medida, portales clínicos, sistemas de fidelización y plataformas SaaS para transformar la operación de tu negocio en un flujo digital eficiente.",
    images: [{ url: "https://synaptechspa.cl/og-image.png", width: 1200, height: 630, alt: "SynapTech SpA — Agencia de software Chile" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SynapTech SpA | Desarrollo de Software a Medida y Soluciones Digitales",
    description: "Desarrollamos software a medida, portales clínicos, sistemas de fidelización y plataformas SaaS para transformar la operación de tu negocio en un flujo digital eficiente.",
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
        name: "Synaptech SpA",
        url: "https://synaptechspa.cl",
        logo: "https://synaptechspa.cl/assets/synaptech-icon.png",
        description: "Agencia chilena de software a medida, IA y automatización para empresas B2B.",
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
        "@type": "LocalBusiness",
        name: "Synaptech SpA",
        url: "https://synaptechspa.cl",
        "@id": "https://synaptechspa.cl/#business",
        description: "Desarrollo de software a medida, inteligencia artificial y automatización para empresas B2B en Chile.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Viña del Mar",
          addressRegion: "Valparaíso",
          postalCode: "2520000",
          addressCountry: "CL",
        },
        email: "hola@synaptechspa.cl",
        telephone: "+56983568212",
        priceRange: "$$$",
        areaServed: "CL",
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

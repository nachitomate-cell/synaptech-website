import type { Metadata } from "next";
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Synaptech — Software a medida, IA y automatización para empresas chilenas",
  description:
    "Agencia de Viña del Mar especializada en software B2B, IA y automatización para clínicas, retail, educación y belleza. 5 proyectos en producción. Diagnóstico gratuito.",
  keywords: ["software a medida Chile", "desarrollo web Viña del Mar", "agencia software B2B chile", "HealthTech DICOM", "fidelización Google Wallet", "PWA educación", "automatización pagos Webpay", "barbería reservas online"],
  alternates: { canonical: "https://synaptechspa.cl" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://synaptechspa.cl",
    siteName: "Synaptech",
    title: "Synaptech — Tecnología con Alma Digital",
    description: "Software a medida, IA y automatización para empresas chilenas B2B. 5 proyectos en producción desde Viña del Mar.",
    images: [{ url: "https://synaptechspa.cl/og-image.png", width: 1200, height: 630, alt: "Synaptech — Agencia de software B2B Chile" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Synaptech — Tecnología con Alma Digital",
    description: "Software a medida, IA y automatización para empresas chilenas B2B.",
    images: ["https://synaptechspa.cl/og-image.png"],
  },
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
        email: "hola@synaptech.cl",
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
        email: "hola@synaptech.cl",
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
        {children}
      </body>
    </html>
  );
}

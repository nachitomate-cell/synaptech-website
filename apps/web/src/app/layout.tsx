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
  title: "Synaptech SpA — Tecnología con Alma Digital",
  description:
    "Agencia chilena de software a medida, IA, automatización e IoT para clínicas, retail, educación y belleza. Viña del Mar.",
  openGraph: {
    title: "Synaptech SpA — Tecnología con Alma Digital",
    description: "Software a medida · IA · Automatización · IoT · Viña del Mar",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${fraunces.variable} ${dmSans.variable} ${jetbrains.variable} font-body bg-bg-primary text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

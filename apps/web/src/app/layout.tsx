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
    "Desarrollamos software a medida, plataformas HealthTech, apps de fidelización y automatización de procesos para clínicas, retail, educación y belleza en Chile. Proyectos reales en producción desde Viña del Mar.",
  keywords: ["software a medida Chile", "desarrollo web Viña del Mar", "HealthTech", "portal clínico DICOM", "fidelización Google Wallet", "PWA educación", "automatización pagos", "barbería reservas online"],
  openGraph: {
    title: "Synaptech — Software a medida, IA y automatización",
    description: "Software a medida para clínicas, retail, educación y belleza. Proyectos en producción desde Viña del Mar, Chile.",
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

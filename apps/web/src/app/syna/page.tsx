import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import VideoSyna, { VideoSynaJsonLd } from "@/components/VideoSyna";
import { altaIA, CTA_IA, waLink } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";

/* Página exclusiva de Syna (26-10-2026, pedido de Ignacio: "en mi página, en un
   módulo exclusivo de SYNA"). El centro es el video; abajo, lo que hace con
   las mismas reglas que /asistente-ia-whatsapp: responde desde el número del
   local, usa la agenda y el catálogo reales y pasa la conversación a una
   persona cuando hace falta. Sin cifras nuevas: las del video están medidas. */
export const metadata = metaPagina({
  title: "Syna: la IA que atiende todos los canales de tu negocio | SynapTech",
  description: "Mira el video: Syna responde por WhatsApp, Instagram, Google Maps, tu página de reservas y el tótem del local, y deja cada cita en una sola agenda.",
  path: "/syna",
});

const PUNTOS = [
  { t: "Responde con tu agenda real", d: "Ofrece las horas libres de cada profesional y los precios de tu catálogo. Nada inventado." },
  { t: "Agenda sola, desde tu número", d: "Tus clientes le escriben a tu WhatsApp de siempre, y tú lo sigues usando en tu teléfono." },
  { t: "Te pasa la conversación", d: "Cuando algo necesita a una persona, te avisa, y puedes tomar el control cuando quieras." },
];

export default function SynaPage() {
  return (
    <>
      <Header />
      <VideoSynaJsonLd url="https://www.synaptechspa.cl/syna" />
      <main>
        <section className="relative overflow-hidden bg-[#05080D] text-white pt-32 md:pt-40 pb-20 md:pb-28">
          <div aria-hidden className="absolute left-1/2 top-[55%] -translate-x-1/2 w-[1100px] max-w-[160vw] aspect-[2/1] rounded-full opacity-50 blur-[110px]"
            style={{ background: "radial-gradient(closest-side, rgba(156,204,60,.55), rgba(94,200,242,.25) 55%, transparent)" }} />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center text-center">
              <Image src="/hub/syna.webp" alt="Syna, el asistente con IA de SynapTech" width={276} height={520} priority
                className="w-[86px] sm:w-[104px] h-auto hero-flota drop-shadow-[0_24px_30px_rgba(0,0,0,.55)]" />
              <p className="mt-6 text-[13px] sm:text-[15px] font-semibold tracking-tight text-white/60">Conoce a Syna</p>
              <h1 className="mt-4 text-white !text-[clamp(2.2rem,4.6vw,4.2rem)]">
                La IA que atiende
                <span className="block bg-gradient-to-r from-[#B8E36A] via-[#9CCC3C] to-[#5EC8F2] bg-clip-text text-transparent pb-2">
                  todos los canales de tu negocio.
                </span>
              </h1>
            </div>
            <div className="mt-12">
              <VideoSyna oscuro />
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <a href={altaIA("syna-video")} className="inline-flex justify-center items-center bg-white text-[#05080D] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors">
                {CTA_IA}
              </a>
              <a href={waLink("Hola, vi el video de Syna y quiero probarla en mi local")} target="_blank" rel="noopener noreferrer"
                className="text-[#B8E36A] font-semibold hover:underline underline-offset-4">
                Hablar por WhatsApp ›
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="grid md:grid-cols-3 gap-6">
              {PUNTOS.map((p) => (
                <div key={p.t} className="rounded-3xl border border-border-subtle p-8">
                  <h3 className="text-ink text-xl font-display font-bold">{p.t}</h3>
                  <p className="text-text-secondary mt-3 leading-relaxed">{p.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-text-secondary">
              ¿Quieres verlo paso a paso, con capturas?{" "}
              <Link href="/asistente-ia-whatsapp" className="font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink transition-colors">
                El asistente de WhatsApp en detalle →
              </Link>
            </p>
          </div>
        </section>

        <CtaFinal oscuro />
      </main>
      <Footer />
    </>
  );
}

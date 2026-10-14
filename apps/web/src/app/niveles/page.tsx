import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import { TarjetaCapsula } from "@/components/Capsulas";
import { NIVELES, VIDEO_8BIT } from "@/content/niveles";
import { metaPagina, SITIO } from "@/lib/seo";

/* Página aparte y discreta (no va en el menú principal): el video 8-bit de Syna
   completo y cada nivel explicado con su versión vertical. Se llega desde
   /como-funciona y desde el pie. */

export const metadata = metaPagina({
  title: "SynapTech en 8-bit: la plataforma, nivel por nivel",
  description: "Syna recorre los 9 niveles de SynapTech con el panel real: reservas 24/7, agenda, asistente IA en WhatsApp, club, caja, comisiones, métricas y más.",
  path: "/niveles",
});

const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: VIDEO_8BIT.titulo,
  description: VIDEO_8BIT.bajada,
  thumbnailUrl: [`${SITIO}/capsulas/${VIDEO_8BIT.id}.jpg`],
  uploadDate: "2026-10-14",
  duration: `PT${Math.floor(VIDEO_8BIT.segundos / 60)}M${VIDEO_8BIT.segundos % 60}S`,
  contentUrl: `${SITIO}/capsulas/${VIDEO_8BIT.id}.mp4`,
  inLanguage: "es",
};

export default function Niveles() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-10 md:pb-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">SynapTech en 8-bit</p>
            <h1 className="text-ink max-w-3xl">Nivel por nivel, con Syna.</h1>
            <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mt-6">
              Un recorrido de dos minutos por todo lo que hace la plataforma, en modo videojuego.
              Lo que se ve en el computador y en el celular es el panel de verdad.
            </p>
            <div className="mt-10 max-w-4xl">
              <video controls playsInline preload="none" poster={`/capsulas/${VIDEO_8BIT.id}.jpg`}
                className="w-full aspect-video rounded-2xl bg-[#0F1A2B] shadow-xl">
                <source src={`/capsulas/${VIDEO_8BIT.id}.mp4`} type="video/mp4" />
              </video>
              <p className="text-sm text-text-muted mt-3">
                {VIDEO_8BIT.duracion} · Grabado sobre el panel con un local de práctica y datos de ejemplo.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <h2 className="text-ink text-2xl md:text-3xl">Los 9 niveles</h2>
            <p className="text-text-secondary mt-3 max-w-2xl">
              Cada nivel también está por separado, en vertical, para verlo o compartirlo desde el celular.
            </p>
            <ol className="mt-10 divide-y divide-border-subtle border-y border-border-subtle">
              {NIVELES.map((nv) => (
                <li key={nv.n} id={`nivel-${nv.n}`} className="py-8 md:py-10 grid grid-cols-[auto_1fr] gap-5 md:gap-10 items-start scroll-mt-28">
                  <TarjetaCapsula compacta c={{ id: `syna-8bit-nivel-${nv.n}`, titulo: `Nivel ${nv.n}`, bajada: nv.titulo, duracion: nv.duracion, modulo: "general" }} />
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold text-accent tracking-wide">NIVEL {nv.n}</p>
                    <h3 className="text-ink text-xl md:text-2xl font-semibold mt-1">{nv.titulo}</h3>
                    <p className="text-text-secondary text-[17px] leading-relaxed mt-3">{nv.bajada}</p>
                    <p className="text-sm text-text-muted mt-3"><span className="font-semibold text-text-secondary">En el video:</span> {nv.enVideo}</p>
                    {nv.modulo && (
                      <Link href={`/como-funciona#${nv.modulo}`} className="inline-block mt-4 text-sm font-semibold text-ink hover:text-accent transition-colors">
                        Ver el módulo paso a paso →
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-sm text-text-muted mt-8 max-w-2xl">
              ¿Y además? Tienda online, gift cards, reseñas, boletas electrónicas y más:
              están en <Link href="/funciones" className="underline underline-offset-2 hover:text-ink">todas las funciones</Link>.
            </p>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
    </>
  );
}

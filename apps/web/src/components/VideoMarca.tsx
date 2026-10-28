"use client";

import { useRef, useState } from "react";

/* El video de marca de SynapTech (27-10-2026, 73 s): el logo se arma punto a
   punto mientras se escriben las funciones, se bucea en un punto y todo se
   vuelve a armar a color, hecho de puntos. Ignacio lo pidió como lo primero
   que se ve en synaptechspa.cl. Hecho en videos-pipeline/pitch-omnicanal
   (synaptech5.html).

   Está pensado en bucle (el último cuadro es el primero), por eso parte solo,
   mudo y en loop; el teclado ASMR es la mitad de la pieza, así que el botón
   para activar el sonido está a la vista. Vive en Storage (assets/) para no
   cargar el ancho de banda de Vercel; el celular baja la versión de 720p. */
const STORAGE = "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o";
export const VIDEO_MARCA = {
  mp4: `${STORAGE}/assets%2Fsynaptech-marca-es.mp4?alt=media`,
  mp4Movil: `${STORAGE}/assets%2Fsynaptech-marca-es-720.mp4?alt=media`,
  portada: `${STORAGE}/assets%2Fsynaptech-marca-es.jpg?alt=media`,
  duracion: "PT1M13S",
  subido: "2026-10-27",
  nombre: "SynapTech: todo en un solo lugar",
  descripcion: "El logo de SynapTech se arma punto a punto mientras se escriben sus funciones: Syna responde en todos tus canales, boletas ante el SII, Wallet, club de sellos, reseñas en Google, comisiones, tótem y más. Todo en un solo lugar.",
};

export default function VideoMarca() {
  const ref = useRef<HTMLVideoElement>(null);
  const [mudo, setMudo] = useState(true);
  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) { v.currentTime = 0; void v.play(); }
    setMudo(v.muted);
  };
  return (
    <section id="video-synaptech" aria-label="Video de SynapTech" className="relative overflow-hidden bg-[#05080D] pt-24 md:pt-28 pb-6 md:pb-10 px-3 sm:px-6">
      <div aria-hidden className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[1200px] max-w-[170vw] aspect-[2/1] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(156,204,60,.5), rgba(94,200,242,.22) 55%, transparent)" }} />
      <div className="relative max-w-6xl mx-auto">
        <div className="relative rounded-[20px] sm:rounded-[28px] overflow-hidden bg-black border border-white/10 shadow-[0_40px_120px_-40px_rgba(156,204,60,.35)]">
          <video ref={ref} className="block w-full h-auto aspect-video" autoPlay muted loop playsInline preload="auto" poster={VIDEO_MARCA.portada}
            aria-label="Video: el logo de SynapTech se arma punto a punto mientras se escriben sus funciones; al final, todo en un solo lugar">
            <source src={VIDEO_MARCA.mp4Movil} type="video/mp4" media="(max-width: 767px)" />
            <source src={VIDEO_MARCA.mp4} type="video/mp4" />
          </video>
          <button type="button" onClick={alternar}
            className="absolute right-3 bottom-3 sm:right-5 sm:bottom-5 inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur px-4 py-2 text-sm font-semibold text-white border border-white/15 hover:bg-black/70 transition-colors">
            <span aria-hidden>{mudo ? "🔇" : "🔊"}</span>
            {mudo ? "Activar sonido" : "Silenciar"}
          </button>
        </div>
      </div>
    </section>
  );
}

/* Datos estructurados del video, para que Google lo muestre en los resultados. */
export function VideoMarcaJsonLd() {
  const datos = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: VIDEO_MARCA.nombre,
    description: VIDEO_MARCA.descripcion,
    thumbnailUrl: [VIDEO_MARCA.portada],
    uploadDate: VIDEO_MARCA.subido,
    duration: VIDEO_MARCA.duracion,
    contentUrl: VIDEO_MARCA.mp4,
    embedUrl: "https://www.synaptechspa.cl/",
    publisher: { "@type": "Organization", name: "SynapTech", url: "https://www.synaptechspa.cl" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }} />;
}

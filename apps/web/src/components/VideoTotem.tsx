"use client";

import { useRef, useState } from "react";

/* El video del tótem de autoservicio (28-10-2026, 43 s): un punto dibuja el
   tótem, un cliente con cita avisa que llegó y al barbero le llega el aviso,
   otro sin cita toma la próxima hora libre y cae en la agenda, y el tótem se
   conecta con un código. Hecho en videos-pipeline/totem-autoservicio
   (totem.html). Pensado en bucle, parte solo y mudo; el teclado ASMR es parte
   de la pieza, por eso el botón de sonido está a la vista. Vive en Storage
   (assets/) y el celular baja la versión de 720p. */
const STORAGE = "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o";
export const VIDEO_TOTEM = {
  mp4: `${STORAGE}/assets%2Ftotem-autoservicio-es.mp4?alt=media`,
  mp4Movil: `${STORAGE}/assets%2Ftotem-autoservicio-es-720.mp4?alt=media`,
  portada: `${STORAGE}/assets%2Ftotem-autoservicio-es.jpg?alt=media`,
  duracion: "PT43S",
  subido: "2026-10-28",
  nombre: "Tótem de autoservicio: así recibe a tus clientes",
  descripcion: "Un cliente con cita avisa en el tótem que llegó y a quien lo atiende le llega el aviso al celular; otro sin cita toma la próxima hora libre y la cita cae en la agenda del local. El tótem se conecta con un código de 6 números.",
};

export default function VideoTotem() {
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
    <div className="relative rounded-[20px] sm:rounded-[28px] overflow-hidden bg-black border border-white/10 shadow-[0_40px_120px_-40px_rgba(16,185,129,.4)]">
      <video ref={ref} className="block w-full h-auto aspect-video" autoPlay muted loop playsInline preload="auto" poster={VIDEO_TOTEM.portada}
        aria-label="Video: un cliente avisa en el tótem que llegó y al barbero le llega el aviso; otro sin cita toma la próxima hora libre y la cita cae en la agenda">
        <source src={VIDEO_TOTEM.mp4Movil} type="video/mp4" media="(max-width: 767px)" />
        <source src={VIDEO_TOTEM.mp4} type="video/mp4" />
      </video>
      <button type="button" onClick={alternar}
        className="absolute right-2.5 bottom-2.5 sm:right-5 sm:bottom-5 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/55 backdrop-blur px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white border border-white/15 hover:bg-black/70 transition-colors">
        <span aria-hidden>{mudo ? "🔇" : "🔊"}</span>
        {mudo ? "Activar sonido" : "Silenciar"}
      </button>
    </div>
  );
}

/* Datos estructurados del video, para que Google lo muestre en los resultados. */
export function VideoTotemJsonLd() {
  const datos = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: VIDEO_TOTEM.nombre,
    description: VIDEO_TOTEM.descripcion,
    thumbnailUrl: [VIDEO_TOTEM.portada],
    uploadDate: VIDEO_TOTEM.subido,
    duration: VIDEO_TOTEM.duracion,
    contentUrl: VIDEO_TOTEM.mp4,
    embedUrl: "https://www.synaptechspa.cl/totem",
    publisher: { "@type": "Organization", name: "SynapTech", url: "https://www.synaptechspa.cl" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }} />;
}

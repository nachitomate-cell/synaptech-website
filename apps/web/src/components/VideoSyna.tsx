/* El video de Syna (pitch omnicanal, 82 s, 1080p): los canales, Syna agendando
   con teclado real, el recorrido del cliente, el panel del dueño, las cifras
   medidas y el logo armándose. Hecho el 26-10-2026 en
   videos-pipeline/pitch-omnicanal; Ignacio pidió que lo vea la mayor cantidad de
   gente: va en la portada, en /syna y en /asistente-ia-whatsapp.

   El archivo vive en Storage (assets/, lectura pública) y no en public/: pesa
   9,5 MB y así no carga el ancho de banda de Vercel. `preload="none"`: no se
   baja nada hasta que alguien aprieta play. El sonido es la mitad del video
   (teclado y clics), por eso no se reproduce solo y mudo. */
const STORAGE = "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o";
export const VIDEO_SYNA = {
  mp4: `${STORAGE}/assets%2Fsyna-pitch-es.mp4?alt=media`,
  portada: `${STORAGE}/assets%2Fsyna-pitch-es.jpg?alt=media`,
  duracion: "PT1M22S",
  subido: "2026-10-26",
  leyenda: "Ponle sonido 🎧 · 1 min 22 s",
  etiqueta: "Video: Syna, la IA de SynapTech, atiende todos los canales del local y deja las citas en una sola agenda",
  nombre: "Syna: la IA que atiende todos los canales de tu negocio",
  descripcion: "Syna, el asistente con IA de SynapTech, responde por WhatsApp, Instagram, Google Maps, la página de reservas y el tótem del local, y deja cada cita en una sola agenda.",
};
export type VideoDeSyna = typeof VIDEO_SYNA;

/* "Syna, tu secretaria" (27-10-2026, 84 s): el dueño le escribe a Syna por
   WhatsApp y ella revisa la agenda, cuenta las ventas, anota gastos por audio,
   emite boletas y facturas, programa Instagram, resume el correo, agenda
   reuniones y recuerda pendientes. Ignacio la pidió en primer plano de la
   portada. 6,1 MB (versión web a 30 fps). */
export const VIDEO_SECRETARIA: VideoDeSyna = {
  mp4: `${STORAGE}/assets%2Fsyna-secretaria-es.mp4?alt=media`,
  portada: `${STORAGE}/assets%2Fsyna-secretaria-es.jpg?alt=media`,
  duracion: "PT1M25S",
  subido: "2026-10-27",
  leyenda: "Ponle sonido 🎧 · 1 min 25 s",
  etiqueta: "Video: el dueño le escribe a Syna por WhatsApp y ella revisa la agenda, las ventas, las boletas, Instagram y el correo",
  nombre: "Syna, tu secretaria: le escribes por WhatsApp y ella lo hace",
  descripcion: "Syna, la secretaria con IA de SynapTech: revisa tu agenda, te dice cuánto vendiste, anota gastos por audio, emite boletas y facturas, programa tu Instagram, resume tu correo, agenda reuniones y te recuerda todo, desde tu WhatsApp.",
};

export default function VideoSyna({ oscuro = false, titulo, bajada, video = VIDEO_SYNA }: { oscuro?: boolean; titulo?: string; bajada?: string; video?: VideoDeSyna }) {
  return (
    <div className="max-w-5xl mx-auto">
      {(titulo || bajada) && (
        <div className="text-center mb-8 md:mb-10 px-2">
          {titulo && <h2 className={oscuro ? "text-white" : "text-ink"}>{titulo}</h2>}
          {bajada && <p className={`mt-4 text-lg leading-relaxed max-w-2xl mx-auto ${oscuro ? "text-white/65" : "text-text-secondary"}`}>{bajada}</p>}
        </div>
      )}
      <div className={`rounded-[22px] sm:rounded-[28px] p-1.5 sm:p-2.5 ${oscuro ? "bg-white/[.06] border border-white/10 shadow-[0_40px_120px_-40px_rgba(156,204,60,.35)]" : "bg-lime/20"}`}>
        <video
          className="w-full h-auto rounded-2xl sm:rounded-[20px] bg-black aspect-video"
          controls playsInline preload="none" poster={video.portada}
          aria-label={video.etiqueta}>
          <source src={video.mp4} type="video/mp4" />
        </video>
      </div>
      <p className={`mt-3 text-center text-sm ${oscuro ? "text-white/45" : "text-text-muted"}`}>{video.leyenda}</p>
    </div>
  );
}

/* Datos estructurados del video, para que Google lo muestre en los resultados. */
export function VideoSynaJsonLd({ url, video = VIDEO_SYNA }: { url: string; video?: VideoDeSyna }) {
  const datos = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.nombre,
    description: video.descripcion,
    thumbnailUrl: [video.portada],
    uploadDate: video.subido,
    duration: video.duracion,
    contentUrl: video.mp4,
    embedUrl: url,
    publisher: { "@type": "Organization", name: "SynapTech", url: "https://www.synaptechspa.cl" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }} />;
}

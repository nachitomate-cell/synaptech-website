import { SITIO } from "@/lib/seo";

/* "La velocidad de SynapTech" (14-10-2026): video de 1:12 con el crecimiento
   de la plataforma, en la portada (prueba social) y en /nosotros.
   Es la versión PÚBLICA: cuenta solo los locales que hoy trabajan con
   SynapTech (45: sin bajas, sin propuestas que aún no cierran, sin agendas
   gratis que nunca se usaron), sin los ingresos de la empresa, sin las ventas
   de los locales y sin nombres de clientes. Cada cifra se midió en la
   plataforma ese día; la fuente editable y el detalle de qué se dejó fuera
   están en devtools/videos-pipeline/crecimiento-web (LEEME-web.txt).
   El video no se descarga hasta que alguien le da play (preload="none"); en
   pantallas chicas usa la versión 720p. Lleva los subtítulos quemados. */

export const VIDEO_VELOCIDAD = {
  id: "velocidad-synaptech",
  titulo: "La velocidad de SynapTech",
  bajada: "De una barbería a 45 locales en seis meses: cómo crece SynapTech, contado con los datos de la plataforma.",
  segundos: 72,
  fecha: "2026-10-14",
};

const DATOS = [
  { v: "45", l: "locales trabajan con SynapTech" },
  { v: "+5", l: "locales nuevos por semana" },
  { v: "378", l: "citas agendadas al día" },
  { v: "94 %", l: "de los locales que entran, sigue" },
];

const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: VIDEO_VELOCIDAD.titulo,
  description: VIDEO_VELOCIDAD.bajada,
  thumbnailUrl: [`${SITIO}/videos/${VIDEO_VELOCIDAD.id}.jpg`],
  uploadDate: VIDEO_VELOCIDAD.fecha,
  duration: `PT${Math.floor(VIDEO_VELOCIDAD.segundos / 60)}M${VIDEO_VELOCIDAD.segundos % 60}S`,
  contentUrl: `${SITIO}/videos/${VIDEO_VELOCIDAD.id}.mp4`,
  inLanguage: "es",
};

export default function VelocidadVideo({ oscuro = true }: { oscuro?: boolean }) {
  return (
    <section id="velocidad" className={`py-16 md:py-24 scroll-mt-20 ${oscuro ? "bg-ink text-white" : "border-t border-border-subtle"}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center">
        <div>
          <p className={`eyebrow mb-4 ${oscuro ? "!text-lime" : ""}`}>La velocidad de SynapTech</p>
          <h2 className={oscuro ? "text-white" : "text-ink"}>De 1 a 45 locales en seis meses.</h2>
          <p className={`text-lg leading-relaxed mt-5 ${oscuro ? "text-white/75" : "text-text-secondary"}`}>
            En abril, SynapTech era la agenda de una sola barbería. Hoy cada 10 locales llegan en
            menos de tres semanas, en Chile, Perú y Argentina.
          </p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 mt-8">
            {DATOS.map((d) => (
              <div key={d.l}>
                <dt className={`font-display font-bold text-3xl tracking-tight ${oscuro ? "text-lime" : "text-ink"}`}>{d.v}</dt>
                <dd className={`text-sm mt-1 ${oscuro ? "text-white/65" : "text-text-muted"}`}>{d.l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <video controls playsInline preload="none" poster={`/videos/${VIDEO_VELOCIDAD.id}.jpg`}
            aria-label={`${VIDEO_VELOCIDAD.titulo}. ${VIDEO_VELOCIDAD.bajada}`}
            className="w-full aspect-video rounded-2xl bg-[#05070c] shadow-2xl ring-1 ring-white/10">
            <source src={`/videos/${VIDEO_VELOCIDAD.id}.mp4`} type="video/mp4" media="(min-width: 768px)" />
            <source src={`/videos/${VIDEO_VELOCIDAD.id}-720.mp4`} type="video/mp4" />
          </video>
          <p className={`text-sm mt-3 ${oscuro ? "text-white/55" : "text-text-muted"}`}>
            1:12 · con subtítulos · datos medidos en la plataforma al 14 de octubre de 2026.
          </p>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
    </section>
  );
}

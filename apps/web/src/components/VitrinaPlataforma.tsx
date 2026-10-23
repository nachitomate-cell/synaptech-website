import Image from "next/image";
import Link from "next/link";
import { FAMILIAS } from "@/content/catalogo";
import Repisa from "./Repisa";

/* La plataforma como una repisa de apple.com/cl/store (23-10-2026): título en
   dos tonos, tarjetas altas que se alternan negras y blancas, etiqueta arriba
   y la captura real del panel saliendo por abajo. Reemplaza a Familias en el
   inicio; cada tarjeta conserva el id al que apuntan el menú y el footer
   (/#agenda, /#asistente…). La de Wellhub es la integración nueva y lleva a
   su página. */
type Tarjeta = { id?: string; etiqueta: string; nombre: string; bajada: string; imagen?: string; alt: string; href: string; cta: string; oscura: boolean };

const TARJETAS: Tarjeta[] = [
  ...FAMILIAS.map((f, i) => ({
    id: f.id,
    etiqueta: f.id === "asistente" ? "Con inteligencia artificial" : "La plataforma",
    nombre: f.nombre,
    bajada: f.bajada,
    imagen: f.imagen,
    alt: f.imagenAlt,
    href: f.pagina ? f.pagina.href : `/como-funciona#${f.recorrido}`,
    cta: f.pagina ? f.pagina.texto : "Ver cómo funciona",
    oscura: i % 2 === 1,
  })),
];
TARJETAS.splice(2, 0, {
  etiqueta: "Nuevo",
  nombre: "Integración con Wellhub",
  bajada: "El check-in de tus alumnas llega solo a su reserva, y la visita se valida sola.",
  alt: "Logo de Wellhub",
  href: "/wellhub",
  cta: "Conocer la integración",
  oscura: false,
});
// Negras y blancas alternadas según la posición final (Wellhub entra en la 3ª).
TARJETAS.forEach((t, i) => { t.oscura = i % 2 === 1; });

export default function VitrinaPlataforma() {
  return (
    <section className="py-20 md:py-28 bg-[#F5F5F7]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <h2 className="font-display !text-[clamp(1.6rem,3vw,2.4rem)] !leading-tight !tracking-tight text-[#1d1d1f] mb-8 md:mb-10">
          La plataforma. <span className="text-[#6e6e73]">Todo lo que tu local necesita, conectado.</span>
        </h2>
        <Repisa etiqueta="La plataforma" variante="apple">
          {TARJETAS.map((t) => (
            <article key={t.nombre} id={t.id}
              className={`snap-start shrink-0 w-[82vw] max-w-[340px] sm:w-[360px] sm:max-w-none h-[500px] rounded-[28px] overflow-hidden relative flex flex-col scroll-mt-24 shadow-[0_4px_24px_rgba(0,0,0,.06)] hover:shadow-[0_8px_36px_rgba(0,0,0,.12)] hover:scale-[1.01] transition-all duration-300 ${t.oscura ? "bg-black text-white" : "bg-white text-[#1d1d1f]"}`}>
              <div className="p-7 pb-0">
                <p className={`text-[12px] font-semibold uppercase tracking-[0.08em] ${t.etiqueta === "Nuevo" ? "text-[#E56A1F]" : t.oscura ? "text-[#B8E36A]" : "text-accent"}`}>{t.etiqueta}</p>
                <h3 className="mt-2 font-display text-[26px] font-bold tracking-tight leading-tight">{t.nombre}</h3>
                <p className={`mt-2 text-[15px] leading-snug ${t.oscura ? "text-white/70" : "text-[#6e6e73]"}`}>{t.bajada}</p>
                <Link href={t.href} className={`inline-block mt-4 text-[15px] font-semibold hover:underline underline-offset-4 ${t.oscura ? "text-[#B8E36A]" : "text-[#0066CC]"}`}>
                  {t.cta} ›
                </Link>
              </div>
              {t.imagen ? (
                <div className="mt-auto pl-7 pt-6">
                  <div className={`rounded-tl-xl overflow-hidden border-l border-t ${t.oscura ? "border-white/15" : "border-black/10"}`}>
                    <Image src={t.imagen} alt={t.alt} width={2880} height={1800} sizes="360px"
                      className="w-[560px] max-w-none h-auto" />
                  </div>
                </div>
              ) : (
                /* Wellhub: no hay captura pública de un check-in, así que va su
                   logo oficial y la marca de "validado", sin pantallas inventadas. */
                <div className="mt-auto mx-7 mb-7 rounded-[22px] bg-[#FDF0F3] h-[190px] flex flex-col items-center justify-center gap-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/integraciones/wellhub.svg" alt={t.alt} width={170} height={33} className="h-8 w-auto" />
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-[#1d1d1f] shadow-sm">
                    <span className="w-5 h-5 rounded-full bg-[#76B900] text-white flex items-center justify-center" aria-hidden>
                      <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    Check-in validado
                  </span>
                </div>
              )}
            </article>
          ))}
        </Repisa>
      </div>
    </section>
  );
}

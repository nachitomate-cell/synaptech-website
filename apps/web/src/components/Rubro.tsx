import Image from "next/image";
import { SIGNUP_URL, waLink } from "@/content/catalogo";

/* Piezas de las páginas por rubro (/barberias, /estetica). Las imágenes son
   capturas reales del panel con un local ficticio (ver content/recorrido.ts). */

type Img = { src: string; alt: string; w: number; h: number };

export function HeroRubro({ eyebrow, titulo, bajada, origen, escritorio, celular, mensajeWa }: {
  eyebrow: string; titulo: string; bajada: string; origen: string;
  escritorio: Img; celular?: Img; mensajeWa: string;
}) {
  return (
    <section className="pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1fr_1.08fr] gap-12 items-center">
        <div>
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="text-ink mb-6">{titulo}</h1>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-8">{bajada}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`${SIGNUP_URL}?ref=${origen}`}
              className="inline-flex justify-center items-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
              Empezar gratis
            </a>
            <a href={waLink(mensajeWa)} target="_blank" rel="noopener noreferrer"
              className="inline-flex justify-center items-center border border-ink/15 text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
              Hablar por WhatsApp
            </a>
          </div>
        </div>
        <div className={`relative ${celular ? "pb-[10%] pl-[10%]" : ""}`}>
          <div className="hero-entra rounded-[28px] bg-lime/20 p-2.5 sm:p-4">
            <Image src={escritorio.src} alt={escritorio.alt} width={escritorio.w} height={escritorio.h} priority
              sizes="(min-width: 1024px) 620px, 92vw" className="w-full h-auto rounded-xl border border-border-subtle shadow-card-hover" />
          </div>
          {celular && (
            <div className="hero-entra absolute left-0 bottom-0 w-[30%]" style={{ animationDelay: "400ms" }}>
              <div className="hero-flota rounded-[22px] border-[5px] border-ink bg-white overflow-hidden shadow-[0_18px_40px_-12px_rgba(15,26,43,.45)]">
                <Image src={celular.src} alt={celular.alt} width={celular.w} height={celular.h}
                  sizes="(min-width: 1024px) 190px, 28vw" className="w-full h-auto" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export type Dolor = { dolor: string; solucion: string; detalle: string };

export function Dolores({ titulo, items }: { titulo: string; items: Dolor[] }) {
  return (
    <section className="py-16 md:py-24 bg-mist">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mb-10">
          <p className="eyebrow mb-4">Lo que te resuelve</p>
          <h2 className="text-ink">{titulo}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((d) => (
            <article key={d.dolor} className="rounded-[28px] bg-white p-7 flex flex-col">
              <p className="text-text-muted line-through decoration-text-muted/40">{d.dolor}</p>
              <h3 className="font-display font-bold text-ink text-xl tracking-tight mt-3 flex gap-2.5">
                <span className="w-6 h-6 shrink-0 mt-0.5 rounded-full bg-lime flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden><path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {d.solucion}
              </h3>
              <p className="text-text-secondary mt-3 leading-relaxed">{d.detalle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

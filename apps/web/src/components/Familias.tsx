import Image from "next/image";
import Link from "next/link";
import { FAMILIAS } from "@/content/catalogo";

/* Las cinco familias de producto, una fila cada una con su captura real del
   panel, alternando el lado. Cada fila tiene el id al que apunta el menú. */
export default function Familias() {
  return (
    <section className="py-16 md:py-24 bg-mist">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">La plataforma</p>
          <h2 className="text-ink">Todo lo que tu local necesita, conectado.</h2>
          <p className="text-text-secondary text-lg mt-5 leading-relaxed">
            La cita, el cobro, la conversación por WhatsApp y el sello del club
            quedan en el mismo lugar. Sin planillas ni cinco aplicaciones distintas.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {FAMILIAS.map((f, i) => (
            <article key={f.id} id={f.id}
              className="bg-white rounded-[28px] overflow-hidden grid lg:grid-cols-2 items-stretch">
              <div className={`bg-[#161617] flex items-center ${i % 2 ? "lg:order-2" : ""}`}>
                <Image src={f.imagen} alt={f.imagenAlt} width={1536} height={1024}
                  sizes="(min-width: 1024px) 640px, 100vw" className="w-full h-auto" />
              </div>
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
                <h3 className="font-display font-bold text-ink text-[28px] sm:text-[34px] leading-tight tracking-tight">
                  {f.nombre}
                </h3>
                <p className="text-text-secondary text-lg mt-3 mb-7 leading-relaxed">{f.bajada}</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mb-8">
                  {f.items.map((it) => (
                    <li key={it.label} className="flex gap-3">
                      <span aria-hidden className="mt-1.5 w-2 h-2 shrink-0 rounded-full bg-lime" />
                      <span>
                        <span className="block font-semibold text-ink text-[15px] leading-snug">{it.label}</span>
                        <span className="block text-text-muted text-sm leading-snug mt-0.5">{it.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href={f.href}
                  className="self-start inline-flex items-center gap-2 font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink transition-colors">
                  Conocer más
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

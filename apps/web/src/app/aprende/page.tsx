import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import { FilaCapsulas, TarjetaCapsula } from "@/components/Capsulas";
import { CURSOS, type Leccion } from "@/content/cursos";
import { metaPagina, SITIO } from "@/lib/seo";

/* Cursos y tutoriales en video (24-10-2026). Los cursos son los mismos del
   Centro de Ayuda del panel (content/cursos.ts); los tutoriales salen de
   content/capsulas.ts. Todo grabado con un local de práctica y datos de ejemplo. */

export const metadata = metaPagina({
  title: "Aprende: cursos en video para tu barbería o salón",
  description: "Lecciones cortas y gratis: formaliza tu local, impuestos del mes, cuánto cobrar, vende tus productos, sorteos y tutoriales del panel de SynapTech.",
  path: "/aprende",
});

const TUTORIALES = [
  "tutorial-agenda-1-tu-agenda",
  "tutorial-agenda-2-agendar-una-cita",
  "tutorial-agenda-3-cerrar-y-cobrar",
  "tutorial-agenda-4-bloquear-horas",
  "facturacion-comision-partida",
  "conectar-tv-paso-a-paso",
  "tutorial-caja-vender",
];

const minutos = (ls: Leccion[]) => Math.round(ls.reduce((s, l) => s + l.segundos, 0) / 60);
const abs = (u: string) => (u.startsWith("/") ? `${SITIO}${u}` : u);
const iso = (seg: number) => `PT${Math.floor(seg / 60)}M${seg % 60}S`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Cursos en video de SynapTech",
  itemListElement: CURSOS.flatMap((c) => c.lecciones).map((l, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "VideoObject",
      name: l.titulo,
      description: l.resumen,
      thumbnailUrl: [abs(l.poster)],
      contentUrl: abs(l.src),
      uploadDate: l.id.startsWith("sorteos") ? "2026-10-10" : "2026-10-09",
      duration: iso(l.segundos),
      inLanguage: "es",
    },
  })),
};

export default function Aprende() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-10 md:pb-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">Aprende</p>
            <h1 className="text-ink max-w-4xl">Cursos cortos para llevar tu local.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
              Administración, productos y clientes que vuelven, en lecciones de uno a dos minutos.
              Gratis y sin registrarte. Son los mismos cursos que tienen los locales dentro del panel.
            </p>
            <p className="text-sm text-text-muted mt-4 max-w-2xl">
              Las lecciones de administración usan cifras y trámites de Chile, revisados a octubre de 2026.
              Cada caso es distinto: confírmalo con tu contador.
            </p>
          </div>
        </section>

        <nav aria-label="Cursos" className="sticky top-16 z-40 bg-white/95 backdrop-blur border-y border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
            {CURSOS.map((c) => (
              <a key={c.slug} href={`#${c.slug}`}
                className="shrink-0 px-4 py-2 rounded-full bg-mist text-[14px] font-semibold text-text-secondary hover:text-ink hover:bg-lime/30 transition-colors">
                {c.titulo}
              </a>
            ))}
            <a href="#tutoriales" className="shrink-0 px-4 py-2 rounded-full bg-ink text-white text-[14px] font-semibold">▶ Tutoriales del panel</a>
          </div>
        </nav>

        {CURSOS.map((c, i) => (
          <section key={c.slug} id={c.slug} className={`py-16 md:py-24 scroll-mt-32 ${i % 2 ? "bg-mist" : ""}`}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <div className="max-w-3xl mb-10">
                <p className="eyebrow mb-3">
                  Curso · {c.lecciones.length === 1 ? "1 lección" : `${c.lecciones.length} lecciones`} · {minutos(c.lecciones)} min
                </p>
                <h2 className="text-ink">{c.titulo}</h2>
                <p className="text-text-secondary text-lg mt-4 leading-relaxed">{c.bajada}</p>
              </div>
              <div className="flex gap-5 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x [scrollbar-width:thin]">
                {c.lecciones.map((l, n) => (
                  <div key={l.id} className="snap-start">
                    <TarjetaCapsula c={{
                      id: l.id, titulo: `${n + 1}. ${l.titulo}`, bajada: l.resumen, duracion: l.duracion,
                      modulo: "plata", formato: "horizontal", src: l.src, poster: l.poster, capitulos: l.capitulos,
                    }} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section id="tutoriales" className="py-16 md:py-24 border-t border-border-subtle scroll-mt-32">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-3">Tutoriales del panel</p>
              <h2 className="text-ink">Paso a paso, en la pantalla de verdad.</h2>
              <p className="text-text-secondary text-lg mt-4 leading-relaxed">
                La agenda, la caja, las boletas y la tele del local. Para ti o para tu equipo.
              </p>
            </div>
            <FilaCapsulas ids={TUTORIALES} />
            <p className="text-sm mt-10">
              <Link href="/como-funciona#capsulas" className="text-text-secondary underline underline-offset-4 decoration-border-subtle hover:text-ink hover:decoration-ink transition-colors">
                Todas las cápsulas, módulo por módulo →
              </Link>
              <span className="text-text-muted mx-2">·</span>
              <Link href="/niveles#series" className="text-text-secondary underline underline-offset-4 decoration-border-subtle hover:text-ink hover:decoration-ink transition-colors">
                En modo videojuego, con Syna →
              </Link>
            </p>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

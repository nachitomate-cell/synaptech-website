import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import { GUIAS, GUIA_BOLETAS, CATEGORIAS } from "@/content/guias-duenos";
import { metaPagina, SITIO } from "@/lib/seo";

/* Índice de guías gratis para dueños (04-11-2026). Artículos cortos con una
   tarea práctica al final; todos salen de content/guias-duenos.ts más la guía
   de boletas, que tiene su propia ruta. */
export const metadata = metaPagina({
  title: "Guías gratis para dueños de barberías, salones y centros de estética",
  description: "Cómo aparecer en Google Maps, bajar las inasistencias, conseguir reseñas, configurar WhatsApp Business y ponerle precio a un servicio. Guías cortas, con una tarea al final.",
  path: "/guias",
});

type Tarjeta = { href: string; categoria: string; titulo: string; resumen: string; minutos: number };

const TARJETAS: Tarjeta[] = [
  ...GUIAS.map((g) => ({ href: `/guias/${g.slug}`, categoria: g.categoria, titulo: g.titulo, resumen: g.resumen, minutos: g.minutos })),
  GUIA_BOLETAS,
];

const COLOR: Record<string, string> = {
  "Google y redes":    "bg-[#DBEAFE] text-[#1D4ED8]",
  "Agenda y clientes": "bg-syn-lime-tint text-accent",
  "Plata y precios":   "bg-[#FCE7F3] text-[#BE185D]",
};

export default function IndiceGuias() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guías para dueños",
    url: `${SITIO}/guias`,
    hasPart: TARJETAS.map((t) => ({ "@type": "Article", headline: t.titulo, url: `${SITIO}${t.href}` })),
  };
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <section className="pt-28 md:pt-36 pb-12">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">Gratis · para dueños de locales con hora</p>
            <h1 className="text-ink !text-[clamp(2.2rem,4.6vw,4rem)] max-w-3xl">Guías para llenar tu agenda.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-2xl">
              Artículos cortos, con ejemplos de Chile y una tarea práctica al final. Para leer entre un cliente y otro.
            </p>
          </div>
        </section>

        {CATEGORIAS.map((cat) => {
          const items = TARJETAS.filter((t) => t.categoria === cat);
          if (!items.length) return null;
          return (
            <section key={cat} className="pb-14">
              <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
                <h2 className="text-ink !text-2xl mb-5">{cat}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((t) => (
                    <Link key={t.href} href={t.href}
                      className="group rounded-[28px] bg-white border border-border-subtle p-7 flex flex-col hover:border-ink hover:-translate-y-0.5 transition-all">
                      <span className={`self-start text-[12px] font-bold px-3 py-1 rounded-full ${COLOR[cat]}`}>{cat}</span>
                      <h3 className="font-display font-bold text-ink text-xl leading-snug tracking-tight mt-4">{t.titulo}</h3>
                      <p className="text-text-secondary leading-relaxed mt-3 flex-1">{t.resumen}</p>
                      <p className="text-sm text-text-muted mt-5">{t.minutos} min de lectura <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span></p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section className="pb-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="rounded-[28px] bg-mist p-7 md:p-9 grid md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <h2 className="text-ink !text-2xl">¿Prefieres verlo en video?</h2>
                <p className="text-text-secondary mt-2">Los cursos del panel y las cápsulas de menos de 2 minutos, gratis.</p>
              </div>
              <Link href="/aprende" className="inline-flex justify-center bg-ink text-white font-semibold px-6 py-3.5 rounded-full hover:bg-black transition-colors">Ver los cursos</Link>
            </div>
          </div>
        </section>

        <CtaFinal origen="guias" />
      </main>
      <Footer />
    </>
  );
}

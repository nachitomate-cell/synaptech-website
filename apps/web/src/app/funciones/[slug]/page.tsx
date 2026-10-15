import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import FaqSeo   from "@/components/FaqSeo";
import { CalculadoraComisiones, CuadraturaCaja } from "@/components/Herramientas";
import { FUNCIONES, funcion } from "@/content/funciones";
import { alta, waLink } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";

/* Una página por función (content/funciones.ts). Plantilla única: título con
   la búsqueda, capturas reales, lo que hace, la herramienta gratis si la hay,
   preguntas frecuentes con FAQPage y enlaces a funciones relacionadas. */

export const dynamicParams = false;
export function generateStaticParams() {
  return FUNCIONES.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const f = funcion(params.slug);
  if (!f) return {};
  return metaPagina({ title: f.title, description: f.description, path: `/funciones/${f.slug}` });
}

const NOMBRES_RUTAS: Record<string, string> = {
  "/asistente-ia-whatsapp": "Asistente con IA en WhatsApp",
  "/guias/boleta-honorarios-y-comisiones-barberos": "Guía: boletas y comisiones",
  "/precios": "Precios",
  "/clinicas": "Software para clínicas estéticas",
  "/recursos/ficha-clinica-estetica": "Ficha clínica estética (PDF gratis)",
  "/recursos/consentimiento-informado-estetica": "Consentimiento informado (PDF y Word)",
  "/fidelizacion": "Club de fidelización",
  "/tienda-online": "Tienda online",
  "/barberias": "Software para barberías",
};

export default function PaginaFuncion({ params }: { params: { slug: string } }) {
  const f = funcion(params.slug);
  if (!f) notFound();
  const relacionadas = f.relacionadas.map((r) => {
    if (r.startsWith("/")) return { href: r, nombre: NOMBRES_RUTAS[r] || r };
    const o = funcion(r);
    return o ? { href: `/funciones/${o.slug}`, nombre: o.nombre } : null;
  }).filter(Boolean) as { href: string; nombre: string }[];
  const esCelular = f.imagen.w < f.imagen.h;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "SynapTech", item: "https://www.synaptechspa.cl" },
        { "@type": "ListItem", position: 2, name: "Funciones", item: "https://www.synaptechspa.cl/funciones" },
        { "@type": "ListItem", position: 3, name: f.nombre, item: `https://www.synaptechspa.cl/funciones/${f.slug}` },
      ] },
      { "@type": "WebPage", name: f.h1, description: f.description, url: `https://www.synaptechspa.cl/funciones/${f.slug}`,
        about: { "@id": "https://www.synaptechspa.cl/#app" } },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <section className="pt-28 md:pt-36 pb-12 md:pb-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <nav aria-label="Ruta" className="text-sm text-text-muted mb-6">
                <Link href="/funciones" className="hover:text-ink">Funciones</Link> <span aria-hidden>›</span> {f.nombre}
              </nav>
              <p className="eyebrow mb-5">{f.eyebrow}</p>
              <h1 className="text-ink !text-[clamp(2.3rem,4.8vw,4rem)]">{f.h1}</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-xl">{f.bajada}</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a href={alta(`funcion-${f.slug}`)} className="inline-flex justify-center items-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
                  Pruébalo 1 mes gratis
                </a>
                <a href={waLink(`Hola, quiero saber más de ${f.nombre.toLowerCase()} en SynapTech`)} target="_blank" rel="noopener noreferrer"
                  className="inline-flex justify-center items-center border border-ink/15 text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
                  Preguntar por WhatsApp
                </a>
              </div>
            </div>
            <div className={esCelular ? "grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0" : "rounded-[28px] bg-lime/15 p-4 sm:p-6"}>
              <Image src={f.imagen.src} alt={f.imagen.alt} width={f.imagen.w} height={f.imagen.h} priority
                sizes={esCelular ? "(min-width:1024px) 220px, 45vw" : "(min-width:1024px) 600px, 100vw"}
                className={`w-full h-auto ${esCelular ? "rounded-[24px]" : "rounded-xl"} border border-border-subtle shadow-card-hover`} />
              {esCelular && f.imagen2 && (
                <Image src={f.imagen2.src} alt={f.imagen2.alt} width={f.imagen2.w} height={f.imagen2.h}
                  sizes="(min-width:1024px) 220px, 45vw" className="w-full h-auto rounded-[24px] border border-border-subtle shadow-card-hover mt-10" />
              )}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <h2 className="text-ink max-w-3xl">Lo que hace por tu local.</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {f.puntos.map((p) => (
                <article key={p.t} className="rounded-[24px] bg-white p-6 sm:p-7">
                  <span aria-hidden className="block w-10 h-1.5 rounded-full bg-lime mb-5" />
                  <h3 className="!text-xl text-ink">{p.t}</h3>
                  <p className="text-text-secondary mt-2 leading-relaxed">{p.d}</p>
                </article>
              ))}
            </div>
            {!esCelular && f.imagen2 && (
              <div className="mt-10 rounded-[28px] bg-white p-4 sm:p-6 max-w-4xl">
                <Image src={f.imagen2.src} alt={f.imagen2.alt} width={f.imagen2.w} height={f.imagen2.h}
                  sizes="(min-width:1024px) 860px, 100vw" className="w-full h-auto rounded-xl border border-border-subtle" />
              </div>
            )}
          </div>
        </section>

        {f.herramienta && (
          <section className="py-16 md:py-20">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <p className="eyebrow mb-4">Herramienta gratis</p>
              <h2 className="text-ink mb-8">{f.herramientaTitulo}</h2>
              {f.herramienta === "comisiones" ? <CalculadoraComisiones /> : <CuadraturaCaja />}
            </div>
          </section>
        )}

        <FaqSeo titulo={`${f.nombre}: lo que más nos preguntan.`} preguntas={f.faq} />

        {relacionadas.length > 0 && (
          <section className="pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <p className="font-semibold text-ink mb-3">También te puede servir</p>
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                {relacionadas.map((r) => (
                  <li key={r.href}><Link href={r.href} className="inline-block rounded-full bg-mist px-4 py-2 text-[15px] font-semibold text-ink hover:bg-lime/30">{r.nombre} →</Link></li>
                ))}
              </ul>
            </div>
          </section>
        )}
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

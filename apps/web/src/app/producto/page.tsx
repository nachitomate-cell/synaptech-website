import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import GaleriaProducto from "@/components/GaleriaProducto";
import { metaPagina, SITIO } from "@/lib/seo";

/* /producto (04-11-2026): la plataforma por dentro, con pantallas reales.
   También responde a quien evalúa la empresa (Google for Startups pidió el
   04-11 "a live, launched product interface" y fundador verificable con
   enlaces de terceros en el mismo dominio): producto en vivo, tiendas de
   apps y perfiles públicos del fundador y la empresa. */
export const metadata = metaPagina({
  title: "SynapTech por dentro: la plataforma en pantallas reales",
  description: "Reserva online, Syna el asistente con IA, agenda, caja, comisiones, club de clientes, tienda y métricas: así se ve SynapTech por dentro.",
  path: "/producto",
});

const EN_VIVO = [
  { nombre: "Panel del local", detalle: "app.synaptechspa.cl", href: "https://app.synaptechspa.cl" },
  { nombre: "Alta con el asistente", detalle: "crear.synaptechspa.cl", href: "https://crear.synaptechspa.cl" },
  { nombre: "App en App Store", detalle: "SynapTech Studio", href: "https://apps.apple.com/cl/app/synaptech-studio/id6794530086" },
  { nombre: "App en Google Play", detalle: "SynapTech Studio", href: "https://play.google.com/store/apps/details?id=cl.synaptechspa.studio" },
];

const PERFILES = [
  { nombre: "Ignacio Mateluna en LinkedIn", href: "https://www.linkedin.com/in/ignacio-mateluna-b46a87441/" },
  { nombre: "SynapTech en Crunchbase", href: "https://www.crunchbase.com/organization/synaptech-efb4" },
  { nombre: "Instagram @synaptechspa", href: "https://www.instagram.com/synaptechspa/" },
];

export default function PaginaProducto() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SynapTech",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: `${SITIO}/producto`,
    offers: { "@type": "Offer", url: `${SITIO}/precios`, priceCurrency: "CLP", price: "9990" },
    publisher: { "@type": "Organization", name: "Synaptech SpA", founder: { "@type": "Person", name: "Ignacio Mateluna", sameAs: PERFILES[0].href }, sameAs: PERFILES.slice(1).map((p) => p.href) },
  };
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <section className="pt-28 md:pt-36 pb-10">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">El producto por dentro</p>
            <h1 className="text-ink !text-[clamp(2.2rem,4.6vw,4rem)] max-w-3xl">Así se ve SynapTech por dentro.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-2xl">
              Una sola plataforma por suscripción: la reserva de tu cliente, el asistente con IA, la agenda, la caja,
              el club y los números del local. Estas son pantallas reales del producto, con un local de muestra.
            </p>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <GaleriaProducto />
          </div>
        </section>

        <section className="py-16 md:py-20 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-10">
            <div>
              <p className="eyebrow mb-4">En producción</p>
              <h2 className="text-ink">Funcionando hoy, en la web y en las tiendas.</h2>
              <div className="grid sm:grid-cols-2 gap-3 mt-7">
                {EN_VIVO.map((e) => (
                  <a key={e.href} href={e.href} target="_blank" rel="noopener" className="rounded-[20px] bg-white border border-border-subtle p-5 hover:border-ink transition-colors">
                    <p className="font-semibold text-ink">{e.nombre}</p>
                    <p className="text-sm text-text-muted mt-1">{e.detalle} ↗</p>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-4">Quién está detrás</p>
              <h2 className="text-ink">Synaptech SpA, Chile.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Fundada por Ignacio Mateluna, que programa la plataforma y atiende a los locales.
                Los datos legales, la tecnología y la seguridad están en la ficha de la empresa.
              </p>
              <ul className="mt-6 space-y-2">
                {PERFILES.map((p) => (
                  <li key={p.href}><a href={p.href} target="_blank" rel="noopener" className="font-semibold text-ink underline underline-offset-4 hover:text-accent">{p.nombre} ↗</a></li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm">
                <Link href="/empresa" className="font-semibold text-ink hover:text-accent">Empresa y tecnología →</Link>
                <Link href="/seguridad" className="font-semibold text-ink hover:text-accent">Seguridad de tus datos →</Link>
                <Link href="/precios" className="font-semibold text-ink hover:text-accent">Precios →</Link>
              </div>
            </div>
          </div>
        </section>

        <CtaFinal origen="producto" />
      </main>
      <Footer />
    </>
  );
}

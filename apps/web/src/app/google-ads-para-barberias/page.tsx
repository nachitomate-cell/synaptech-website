import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import FaqSeo   from "@/components/FaqSeo";
import { HeroLanding, JsonLd, Puntos, Relacionados, TarjetaServicio, NotaInversion, BOTON, BOTON_BORDE } from "@/components/Landing";
import { crecer, fmt } from "@/content/precios";
import { waLink } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";
import { breadcrumbLd, grafo, servicioLd } from "@/lib/ld";

/* Google Ads para barberías y salones (01-11-2026): servicio de Crecer
   ($49.900/mes, gestión). La inversión publicitaria la paga el local directo a
   Google con su tarjeta. Sin permanencia.
   NO prometer: resultados garantizados, Conversions API, conexión a CRM.
   Búsquedas: "google ads para barberías", "publicidad en google para
   peluquerías", "anuncios en google para salón de belleza", "agencia google
   ads barbería". */

const GOOGLE = crecer("google-ads");
const COMBO = crecer("combo-anuncios");

export const metadata = metaPagina({
  title: "Google Ads para barberías y salones, conectado a tu agenda",
  description: "Complemento de SynapTech para suscriptores: campañas en Google que llevan directo a tu página de reservas. $49.900 + IVA al mes, sin permanencia.",
  path: "/google-ads-para-barberias",
  /* noindex temporal (03-11-2026) mientras Google for Startups revisa el sitio. */
  noindex: true,
});

const MIGAS = [{ nombre: "Precios", path: "/precios" }, { nombre: "Google Ads para barberías", path: "/google-ads-para-barberias" }];

const COMO = [
  { t: "Te encuentran cuando buscan", d: "Quien escribe «barbería cerca» o «peluquería en tu comuna» ve tu anuncio, con el link para reservar." },
  { t: "Configuración incluida", d: "Palabras clave, textos, zona y horario de los anuncios vienen configurados: no tienes que aprender a usar Google Ads." },
  { t: "Reservas en tu agenda", d: "El anuncio lleva a tu página de reservas de SynapTech: la hora cae directo en tu panel." },
  { t: "Tu presupuesto, tu tarjeta", d: "La inversión en anuncios la pagas tú a Google y la decides tú. El complemento se cobra aparte, en tu mensualidad de SynapTech." },
  { t: "Medido en tu dominio", d: "Con Google Analytics 4 y Google Tag Manager conectados en el dominio de tu local." },
  { t: "Sin permanencia", d: "Es mensual: si no te sirve, lo dejas cuando quieras." },
];

const FAQ = [
  { q: "¿Cuánto cuesta Google Ads para una barbería?", a: `El complemento Google Ads cuesta ${fmt(GOOGLE.mes)} + IVA al mes. Aparte va la inversión en anuncios, que pagas tú directo a Google con tu tarjeta y defines tú. Con Meta Ads incluido, el Combo Anuncios cuesta ${fmt(COMBO.mes)} + IVA.` },
  { q: "¿La inversión en anuncios está incluida?", a: "No. Lo que se gasta en anuncios lo pagas tú a Google, con tu tarjeta, y tú decides cuánto. Así sabes exactamente cuánto va a publicidad y cuánto al complemento." },
  { q: "¿Necesito tener SynapTech?", a: "Sí: es un complemento para suscriptores de SynapTech. Los anuncios llevan a tu página de reservas y cada hora cae en tu agenda." },
  { q: "¿Garantizan una cantidad de clientes?", a: "No. Nadie puede garantizar resultados en publicidad. Las campañas se miden y se ajustan cada mes para que cada peso rinda más." },
  { q: "¿Tiene permanencia?", a: "No. Es mensual y lo dejas cuando quieras." },
];

export default function Pagina() {
  return (
    <>
      <Header />
      <main>
        <JsonLd data={grafo(breadcrumbLd(MIGAS), servicioLd(GOOGLE, "Complemento de Google Ads para la agenda de barberías y salones"), servicioLd(COMBO, "Complementos de Google Ads y Meta Ads"))} />

        <HeroLanding migas={MIGAS} eyebrow="Crecer · complemento para suscriptores"
          h1="Google Ads para barberías y salones: que te encuentre quien busca dónde cortarse."
          bajada={`Tus anuncios en Google, configurados y conectados a tu agenda: cada clic lleva a tu página de reservas. ${fmt(GOOGLE.mes)} + IVA al mes como complemento de tu plan; la inversión en anuncios la pagas tú a Google.`}>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={waLink("Hola, quiero el complemento Google Ads para mi local")} target="_blank" rel="noopener noreferrer" className={BOTON}>Quiero Google Ads</a>
            <a href="#precio" className={BOTON_BORDE}>Ver precio</a>
          </div>
        </HeroLanding>

        <Puntos eyebrow="Cómo funciona" titulo="Anuncios en Google, conectados a tu agenda." items={COMO} fondo />

        <section id="precio" className="py-16 md:py-24 scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Precio</p>
              <h2 className="text-ink">Google Ads solo, o junto con Instagram y Facebook.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
              <TarjetaServicio s={GOOGLE} destacado />
              <TarjetaServicio s={COMBO} />
            </div>
            <NotaInversion />
          </div>
        </section>

        <FaqSeo titulo="Google Ads para barberías: preguntas frecuentes." preguntas={FAQ} />

        <Relacionados links={[
          { texto: "Todos los complementos", href: "/precios#crecer" },
          { texto: "Convenios e integraciones", href: "/integraciones" },
          { texto: "Software para barberías", href: "/barberias" },
        ]} />
      </main>
      <Footer />
    </>
  );
}

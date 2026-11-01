import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import FaqSeo   from "@/components/FaqSeo";
import { HeroLanding, JsonLd, Puntos, Relacionados, TarjetaServicio, NotaInversion, BOTON, BOTON_BORDE } from "@/components/Landing";
import { crecer, fmt, PRECIO } from "@/content/precios";
import { waLink } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";
import { breadcrumbLd, grafo, servicioLd } from "@/lib/ld";

/* Publicidad en Instagram y Facebook para barberías (01-11-2026): servicio
   Meta Ads gestionado de Crecer ($49.900/mes). La inversión la paga el local
   directo a Meta con su tarjeta. Sin permanencia.
   NO prometer: Conversions API de Meta (CAPI), conexión a GoHighLevel o CRM,
   resultados garantizados. No decir "Meta Partner".
   Búsquedas: "publicidad en instagram para barberías", "anuncios en facebook
   para barbería", "meta ads barbería", "publicidad para salón de belleza". */

const META = crecer("meta-ads");
const COMBO = crecer("combo-anuncios");
const TOTAL = crecer("combo-crecer");

export const metadata = metaPagina({
  title: "Publicidad en Instagram y Facebook para barberías",
  description: "Tus anuncios en Instagram y Facebook, armados y administrados por nuestro equipo y conectados a tu agenda. $49.900 + IVA al mes, sin permanencia.",
  path: "/publicidad-instagram-facebook-barberias",
});

const MIGAS = [{ nombre: "Precios", path: "/precios" }, { nombre: "Publicidad en Instagram y Facebook", path: "/publicidad-instagram-facebook-barberias" }];

const COMO = [
  { t: "Anuncios en Instagram y Facebook", d: "Tus mejores cortes y tus promociones frente a gente de tu zona, en el feed y en las historias." },
  { t: "Lo arma nuestro equipo", d: "Público, textos, piezas y presupuesto diario: no tienes que aprender el administrador de anuncios de Meta." },
  { t: "Llevan a reservar", d: "El anuncio lleva a tu página de reservas o a tu WhatsApp; la hora cae en tu agenda de SynapTech." },
  { t: "Medido con Meta Pixel", d: "Con el píxel de Meta conectado en el dominio de tu local, para ver qué anuncio trae visitas." },
  { t: "Tu presupuesto, tu tarjeta", d: "La inversión en anuncios la pagas tú a Meta y la decides tú. Nosotros cobramos solo la gestión." },
  { t: "Sin permanencia", d: "Es mensual: si no te sirve, lo dejas cuando quieras." },
];

const FAQ = [
  { q: "¿Cuánto cuesta la publicidad en Instagram para una barbería?", a: `La gestión de SynapTech cuesta ${fmt(META.mes)} + IVA al mes. Aparte va la inversión en anuncios, que pagas tú directo a Meta con tu tarjeta y defines tú. Con Google Ads, el Combo Anuncios cuesta ${fmt(COMBO.mes)} + IVA; con página web incluida, el Combo Crecer total, ${fmt(TOTAL.mes)} + IVA.` },
  { q: "¿La inversión en anuncios está incluida?", a: "No. Lo que se gasta en anuncios lo pagas tú a Meta, con tu tarjeta, y tú decides cuánto." },
  { q: "¿Y si me escriben por Instagram en vez de reservar?", a: `El asistente con IA también puede responder y agendar por mensaje directo de Instagram: viene en el plan Todo Incluido, o como adicional de ${fmt(PRECIO.instagram)} + IVA al mes en Independiente IA y Local IA.` },
  { q: "¿Garantizan una cantidad de clientes?", a: "No. Nadie puede garantizar resultados en publicidad. Lo que hacemos es armar, medir y ajustar tus anuncios para que cada peso rinda más." },
  { q: "¿Tiene permanencia?", a: "No. Es mensual y lo dejas cuando quieras." },
];

export default function Pagina() {
  return (
    <>
      <Header />
      <main>
        <JsonLd data={grafo(breadcrumbLd(MIGAS), servicioLd(META, "Gestión de anuncios en Instagram y Facebook para barberías y salones"), servicioLd(COMBO, "Gestión de Google Ads y Meta Ads"), servicioLd(TOTAL, "Página web, Google Ads y Meta Ads"))} />

        <HeroLanding migas={MIGAS} eyebrow="Crecer · Meta Ads gestionado"
          h1="Publicidad en Instagram y Facebook para barberías y salones, hecha por nuestro equipo."
          bajada={`Armamos y administramos tus anuncios en Instagram y Facebook, y cada uno lleva a reservar en tu agenda. ${fmt(META.mes)} + IVA al mes por la gestión; la inversión en anuncios la pagas tú a Meta.`}>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={waLink("Hola, quiero publicidad en Instagram y Facebook gestionada para mi local")} target="_blank" rel="noopener noreferrer" className={BOTON}>Quiero anuncios en Instagram</a>
            <a href="#precio" className={BOTON_BORDE}>Ver precio</a>
          </div>
        </HeroLanding>

        <Puntos eyebrow="Cómo funciona" titulo="Anuncios que llevan a reservar, no solo a dar like." items={COMO} fondo />

        <section id="precio" className="py-16 md:py-24 scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Precio</p>
              <h2 className="text-ink">Meta Ads solo, o junto con Google y tu página web.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              <TarjetaServicio s={META} destacado />
              <TarjetaServicio s={COMBO} />
              <TarjetaServicio s={TOTAL} />
            </div>
            <NotaInversion />
          </div>
        </section>

        <FaqSeo titulo="Publicidad en Instagram y Facebook: preguntas frecuentes." preguntas={FAQ} />

        <Relacionados links={[
          { texto: "Google Ads para barberías", href: "/google-ads-para-barberias" },
          { texto: "Página web para barberías", href: "/pagina-web-para-barberias" },
          { texto: "Asistente con IA en WhatsApp e Instagram", href: "/asistente-ia-whatsapp" },
          { texto: "Todos los servicios Crecer", href: "/precios#crecer" },
          { texto: "Convenios e integraciones", href: "/integraciones" },
        ]} />
      </main>
      <Footer />
    </>
  );
}

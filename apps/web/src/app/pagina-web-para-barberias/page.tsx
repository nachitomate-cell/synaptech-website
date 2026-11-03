import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import FaqSeo   from "@/components/FaqSeo";
import { HeroLanding, JsonLd, Puntos, Relacionados, TarjetaServicio, NotaInversion, BOTON, BOTON_BORDE } from "@/components/Landing";
import { INDEPENDIENTE, PRECIO, TODO_INCLUIDO, crecer, fmt } from "@/content/precios";
import { agendaSinIA, waLink } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";
import { breadcrumbLd, grafo, servicioLd } from "@/lib/ld";

/* Página web para barberías y salones (01-11-2026): el servicio Presencia de
   Crecer ($24.900/mes: web propia con dominio .cl + ficha de Google optimizada
   + informe mensual), más la página de reservas que viene en todos los planes.
   Es LA página para "página web para barbería": /funciones/pagina-web-reservas
   quedó para "página de reservas online" y enlaza acá.
   Búsquedas: "página web para barbería", "página web para salón de belleza",
   "diseño web barbería", "página web peluquería precio". */

const PRESENCIA = crecer("presencia");

export const metadata = metaPagina({
  title: "Página web para barberías y salones con dominio .cl",
  description: "Tu página de reservas se genera sola con tu agenda, en todos los planes. Con el complemento Presencia, $24.900 + IVA al mes, suma web propia con dominio .cl, ficha de Google e informe mensual.",
  path: "/pagina-web-para-barberias",
  /* noindex temporal (03-11-2026) mientras Google for Startups revisa el sitio. */
  noindex: true,
});

const MIGAS = [{ nombre: "Precios", path: "/precios" }, { nombre: "Página web para barberías", path: "/pagina-web-para-barberias" }];

const INCLUYE = [
  { t: "Tu web con dominio .cl", d: "Una página propia con tu marca, tus servicios, tu equipo, tus fotos y cómo llegar, en tu dirección .cl." },
  { t: "Reservas conectadas", d: "El botón de reservar lleva a tu agenda de SynapTech: cada hora que se toma en la web cae en tu panel." },
  { t: "Ficha de Google optimizada", d: "Tu Perfil de Empresa de Google, al día: categorías, horarios, fotos y tu link de reservas." },
  { t: "Informe mensual", d: "Cada mes recibes un informe de cómo va tu presencia en internet." },
  { t: "Lista para medir", d: "Tu dominio queda listo para conectar Google Analytics 4, Google Tag Manager o Meta Pixel y medir tus anuncios." },
  { t: "Configuración incluida", d: "No tienes que aprender a diseñar: con tu logo y tus fotos, tu web queda publicada en tu dominio." },
];

const FAQ = [
  { q: "¿Cuánto cuesta una página web para barbería?", a: `Tu página de reservas viene en todos los planes de SynapTech, desde ${fmt(INDEPENDIENTE.mes)} + IVA al mes. Si quieres una web propia con dominio .cl, ficha de Google optimizada e informe mensual, el complemento Presencia cuesta ${fmt(PRESENCIA.mes)} + IVA al mes, sin permanencia.` },
  { q: "¿Qué diferencia hay entre la página de reservas y Presencia?", a: "La página de reservas es la de tu agenda: servicios, precios, profesionales y el botón para reservar, en tu dirección de SynapTech. Presencia es una web propia con tu dominio .cl, conectada a tu agenda, más tu ficha de Google optimizada y un informe cada mes." },
  { q: "¿Necesito comprar un dominio?", a: `Con Presencia el dominio .cl va incluido. Si solo quieres tu página de reservas en tu propio dominio, es un adicional de ${fmt(PRECIO.dominioAnio)} + IVA al año, y viene incluido en el plan ${TODO_INCLUIDO.nombre}.` },
  { q: "¿Sirve para salones de belleza, uñas y estética?", a: "Sí. Es la misma web para cualquier local que agenda: barberías, peluquerías, salones de uñas, centros de estética y clínicas." },
  { q: "¿Mis clientes pueden reservar desde la web?", a: "Sí: el botón de reservar lleva a tu agenda, con las horas libres reales de cada profesional." },
  { q: "¿Tengo permanencia?", a: "No. Presencia es mensual y lo puedes dejar cuando quieras." },
];

export default function Pagina() {
  return (
    <>
      <Header />
      <main>
        <JsonLd data={grafo(breadcrumbLd(MIGAS), servicioLd(PRESENCIA, "Complemento de página web con dominio propio para la agenda de barberías y salones"))} />

        <HeroLanding migas={MIGAS} eyebrow="Página web · Presencia"
          h1="Página web para tu barbería o salón, con dominio .cl y reservas conectadas."
          bajada={`Tu página de reservas se genera sola con los servicios, precios y profesionales de tu agenda, en todos los planes. Y si quieres una web propia, con tu dominio .cl y tu ficha de Google optimizada, súmale el complemento Presencia: ${fmt(PRESENCIA.mes)} + IVA al mes.`}>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={waLink("Hola, quiero el complemento Presencia (página web con dominio .cl) para mi local")} target="_blank" rel="noopener noreferrer" className={BOTON}>Quiero mi página web</a>
            <a href={agendaSinIA("pagina-web-hero")} className={BOTON_BORDE}>Crear mi página de reservas gratis</a>
          </div>
        </HeroLanding>

        <Puntos eyebrow="Qué incluye Presencia" titulo="Tu local, bien presentado en internet y en Google." items={INCLUYE} fondo />

        <section id="precio" className="py-16 md:py-24 scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
            <div>
              <p className="eyebrow mb-4">Dos caminos</p>
              <h2 className="text-ink">Página de reservas incluida, o web propia con Presencia.</h2>
              <ul className="mt-6 space-y-4 text-text-secondary text-lg leading-relaxed">
                <li><b className="text-ink">Página de reservas, en todos los planes.</b> Servicios con precio y duración, profesionales, horas recomendadas y tu link para Instagram. <Link href="/funciones/pagina-web-reservas" className="underline underline-offset-2 hover:text-ink">Ver cómo es</Link>.</li>
                <li><b className="text-ink">Web propia con Presencia.</b> Tu dominio .cl, conectada a tu agenda, con ficha de Google e informe mensual.</li>
                <li><b className="text-ink">Más anuncios.</b> Súmale los complementos Google Ads o Meta Ads: el Combo Crecer total lo junta todo.</li>
              </ul>
            </div>
            <div>
              <TarjetaServicio s={PRESENCIA} destacado />
              <NotaInversion />
            </div>
          </div>
        </section>

        <FaqSeo titulo="Página web para barberías: preguntas frecuentes." preguntas={FAQ} />

        <Relacionados links={[
          { texto: "Página de reservas online", href: "/funciones/pagina-web-reservas" },
          { texto: "Todos los precios", href: "/precios#crecer" },
          { texto: "Software para barberías", href: "/barberias" },
          { texto: "Software para peluquerías", href: "/peluquerias" },
        ]} />
      </main>
      <Footer />
    </>
  );
}

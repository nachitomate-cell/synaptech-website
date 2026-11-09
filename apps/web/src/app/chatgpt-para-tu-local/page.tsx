import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import FaqSeo   from "@/components/FaqSeo";
import { HeroLanding, JsonLd, Puntos, Relacionados, BOTON, BOTON_BORDE } from "@/components/Landing";
import { waLink } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";
import { breadcrumbLd, grafo } from "@/lib/ld";

/* Tu local en ChatGPT (08-11-2026, pedido de Ignacio): la página detrás de la
   tarjeta "Aparece en ChatGPT" del panel (anunciosPanel/beneficio-chatgpt) y
   destino del grupo de anuncios "Aparece en ChatGPT" de ChatGPT Ads.

   Tres partes:
   1. Lo que existe hoy: ficha de Google, página de reservas y reseñas al día,
      que es lo que leen los buscadores y los asistentes.
   2. La ficha de negocio en ChatGPT ("Claim your business"): OpenAI la está
      probando y NO está publicada (06-11-2026). Se promete reclamarla cuando
      abra, nunca como si ya existiera.
   3. ChatGPT Ads gestionados: la cuenta es del negocio (OpenAI lo exige), la
      inversión la paga el local a OpenAI. Sin anuncios de salud (política de
      OpenAI), por eso las clínicas quedan fuera.
   09-11: OpenAI rechazó el anuncio "Que ChatGPT recomiende tu local" por
   "Platform integrity and misrepresentation"; la página es su destino, así que
   el titular pasó a "Más clientes desde ChatGPT" (igual que el anuncio).
   NO prometer: clientes garantizados, posición en las respuestas, fecha de la
   ficha. Sin precio publicado hasta que Ignacio lo fije (se conversa por WA).
   Sin logo de OpenAI: "ChatGPT" va solo como texto.
   noindex como /google-ads-para-barberias mientras Google for Startups revisa
   el sitio. */

export const metadata = metaPagina({
  title: "Más clientes desde ChatGPT para tu local | SynapTech",
  description: "Te ayudamos a aparecer cuando alguien le pregunta a ChatGPT dónde atenderse: tu información al día, tu ficha cuando ChatGPT la abra y anuncios en ChatGPT gestionados por nosotros.",
  path: "/chatgpt-para-tu-local",
  noindex: true,
});

const MIGAS = [{ nombre: "Precios", path: "/precios" }, { nombre: "Tu local en ChatGPT", path: "/chatgpt-para-tu-local" }];

const QUIERO = waLink("Hola, quiero que mi local aparezca en ChatGPT");

const COMO = [
  { t: "Tu información, clara y al día", d: "Tu ficha de Google, tu página de reservas y tus reseñas con los mismos servicios, horarios y dirección. Es lo que leen los buscadores y los asistentes como ChatGPT para recomendar un local." },
  { t: "Tu ficha en ChatGPT, apenas abra", d: "OpenAI está probando que los negocios puedan reclamar su ficha dentro de ChatGPT. Cuando esté disponible, la reclamamos contigo y la dejamos con tus servicios." },
  { t: "Anuncios en ChatGPT", d: "Armamos y gestionamos anuncios que aparecen cuando alguien pregunta por lo que haces en tu zona, con el link directo a tu página de reservas." },
  { t: "Tu presupuesto, tu cuenta", d: "La cuenta de anuncios queda a nombre de tu negocio y la inversión la pagas tú a OpenAI. Tú decides cuánto. Nosotros nos encargamos del resto." },
  { t: "Ves lo que pasa", d: "Cada mes te mostramos cuánto se gastó, cuántas personas hicieron clic y cuántas reservaron." },
  { t: "Sin permanencia", d: "Es mensual. Si no te sirve, lo dejas cuando quieras." },
];

const PASOS = [
  { t: "1. Escríbenos", d: "Por WhatsApp, con el nombre de tu local y tu comuna." },
  { t: "2. Revisamos cómo apareces hoy", d: "Le preguntamos a ChatGPT por tu rubro en tu comuna y te mostramos qué responde y por qué." },
  { t: "3. Lo dejamos andando", d: "Ordenamos tu información y, si quieres, partimos con los anuncios." },
];

const FAQ = [
  { q: "¿Ya se puede reclamar un negocio en ChatGPT?", a: "Todavía no de forma abierta. OpenAI lo está probando y no ha dado fecha. Cuando abra, lo hacemos contigo. Mientras tanto, lo que más influye es que tu información esté completa y al día en internet." },
  { q: "¿Los anuncios en ChatGPT funcionan en Chile?", a: "Sí. OpenAI abrió sus anuncios en Chile en octubre de 2026. Se muestran a usuarios adultos de los planes gratuitos de ChatGPT, debajo de la respuesta y marcados como patrocinados." },
  { q: "¿Cuánto cuesta?", a: "Funciona como nuestro complemento de Google Ads: una mensualidad por la gestión y, aparte, la inversión en anuncios, que pagas tú directo a OpenAI. Escríbenos y te contamos según tu local." },
  { q: "¿Garantizan que ChatGPT me recomiende?", a: "No. Nadie controla lo que ChatGPT responde. Lo que sí hacemos es que tu información sea clara y esté al día, y medir cada mes cuántas personas llegan por los anuncios." },
  { q: "¿Sirve para clínicas o centros de salud?", a: "Los anuncios no. OpenAI no muestra anuncios en conversaciones de salud. La parte de tener tu información clara y al día sí aplica." },
  { q: "¿Necesito tener SynapTech?", a: "Para los anuncios, sí: llevan a tu página de reservas de SynapTech y cada hora cae en tu agenda. Si aún no usas SynapTech, escríbenos y te mostramos cómo funciona." },
];

export default function Pagina() {
  return (
    <>
      <Header />
      <main>
        <JsonLd data={grafo(breadcrumbLd(MIGAS))} />

        <HeroLanding migas={MIGAS} eyebrow="Crecer · nuevo"
          h1="Más clientes desde ChatGPT."
          bajada="Cada vez más gente le pregunta a ChatGPT dónde cortarse el pelo, hacerse las uñas o una limpieza facial. Te ayudamos a que ahí también te encuentren: con tu información al día y con anuncios que gestionamos por ti.">
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={QUIERO} target="_blank" rel="noopener noreferrer" className={BOTON}>Quiero aparecer</a>
            <a href="#como" className={BOTON_BORDE}>Cómo funciona</a>
          </div>
        </HeroLanding>

        <div id="como" className="scroll-mt-20">
          <Puntos eyebrow="Cómo funciona" titulo="Tu local, donde ahora también se busca." items={COMO} fondo />
        </div>

        <Puntos eyebrow="Para partir" titulo="Tres pasos." items={PASOS} />

        <section className="pb-16 md:pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 text-center">
            <a href={QUIERO} target="_blank" rel="noopener noreferrer" className={BOTON}>Quiero aparecer en ChatGPT</a>
            <p className="mt-4 text-sm text-text-muted">Te respondemos por WhatsApp.</p>
          </div>
        </section>

        <FaqSeo titulo="Tu local en ChatGPT: preguntas frecuentes." preguntas={FAQ} />

        <section className="pb-14">
          <div className="max-w-screen-lg mx-auto px-4 sm:px-6">
            <p className="text-[13px] leading-relaxed text-text-muted">
              ChatGPT y OpenAI son marcas de su titular. SynapTech no es parte de OpenAI: gestionamos la información y los anuncios de tu local. La ficha de negocio en ChatGPT depende de que OpenAI la habilite en Chile.
            </p>
          </div>
        </section>

        <Relacionados links={[
          { texto: "Google Ads para barberías", href: "/google-ads-para-barberias" },
          { texto: "Todos los complementos", href: "/precios#crecer" },
          { texto: "Reservas con Google", href: "/reservas-google" },
        ]} />
      </main>
      <Footer />
    </>
  );
}

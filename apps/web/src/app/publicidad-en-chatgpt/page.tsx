import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import FaqSeo   from "@/components/FaqSeo";
import { HeroLanding, JsonLd, Puntos, Relacionados, BOTON, BOTON_BORDE } from "@/components/Landing";
import { waLink } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";
import { breadcrumbLd, grafo } from "@/lib/ld";

/* Publicidad en ChatGPT para tiendas online (17-11-2026): gestión de campañas en
   ChatGPT Ads, $99.900 + IVA al mes, sin permanencia. La inversión la paga la
   tienda directo a OpenAI y la cuenta de anuncios queda a su nombre.
   synaptechads.cl (dominio de los correos de prospección) llega acá con un 308
   (next.config.mjs).
   NO prometer: ventas, que ChatGPT "recomienda" la tienda (el anuncio es un
   recuadro patrocinado aparte de la respuesta; OpenAI rechazó un anuncio nuestro
   el 09-11 por decir eso), ni hablar como si fuéramos de OpenAI. */

const PRECIO = "$99.900";

export const metadata = metaPagina({
  title: "Anuncios con IA para tiendas online",
  description: `Armamos y gestionamos tus anuncios en asistentes de IA: en qué conversaciones aparecer, los anuncios y la medición de ventas. ${PRECIO} + IVA al mes, sin permanencia.`,
  path: "/publicidad-en-chatgpt",
  /* noindex como el resto de las páginas de anuncios (03-11-2026). */
  noindex: true,
});

const MIGAS = [{ nombre: "Anuncios con IA", path: "/publicidad-en-chatgpt" }];

const WA = waLink("Hola, quiero ver lo de los anuncios con IA para mi tienda");

const COMO = [
  { t: "Aparecer en la conversación", d: "Cuando alguien le pregunta a un asistente de IA algo de tu rubro, tu anuncio puede salir como un recuadro «patrocinado» debajo de la respuesta, con el link a tu tienda." },
  { t: "Elegimos los temas", d: "Definimos en qué conversaciones conviene aparecer según tu catálogo: regalos, tallas, comparaciones, ideas para el hogar." },
  { t: "Anuncios escritos para tu tienda", d: "Títulos y textos cortos, revisados con las reglas de OpenAI para que no los rechacen." },
  { t: "Medición de ventas", d: "Instalamos el píxel de OpenAI en tu tienda para ver qué clics terminan en compra." },
  { t: "La cuenta es tuya", d: "La cuenta de anuncios queda a nombre de tu empresa y nos invitas a gestionarla. Tú pones el tope de inversión y lo pagas directo a OpenAI." },
  { t: "Sin permanencia", d: "Es mensual. Si no te sirve, lo dejas cuando quieras." },
];

const PASOS = [
  { t: "1. Llamada de 15 minutos", d: "Vemos tu tienda, tus productos más vendidos y cuánto quieres invertir." },
  { t: "2. Cuenta de anuncios", d: "Tu empresa crea la cuenta en ChatGPT Ads (OpenAI verifica la empresa, puede tardar algunos días) y nos invita." },
  { t: "3. Campaña andando", d: "Armamos la campaña, instalamos el píxel y te mandamos un resumen cada mes." },
];

const FAQ = [
  { q: "¿Cuánto cuesta?", a: `La gestión cuesta ${PRECIO} + IVA al mes, sin permanencia, y el primer mes incluye toda la configuración. Aparte va la inversión en anuncios, que pagas tú directo a OpenAI y defines tú.` },
  { q: "¿Cuánto hay que invertir en anuncios?", a: "Lo decides tú. Para tener datos que sirvan sugerimos partir desde unos $300.000 al mes, y ajustar según lo que muestre la medición." },
  { q: "¿ChatGPT va a recomendar mi tienda?", a: "No. El anuncio sale como un recuadro marcado como patrocinado, separado de la respuesta de ChatGPT. La respuesta no cambia por pagar anuncios." },
  { q: "¿Ustedes son de OpenAI?", a: "No. Somos SynapTech, una agencia chilena independiente: gestionamos campañas de nuestros clientes en la plataforma de anuncios de OpenAI. No estamos afiliados, patrocinados ni respaldados por OpenAI." },
  { q: "¿Qué rubros pueden anunciar?", a: "La mayoría de las tiendas online: moda, calzado, hogar, deporte, tecnología, belleza, mascotas, juguetes y más. OpenAI no permite o restringe salud, suplementos, alcohol, apuestas y productos financieros, entre otros." },
  { q: "¿Garantizan ventas?", a: "No. Nadie puede garantizar resultados en publicidad. Medimos cada mes y ajustamos para que la inversión rinda más." },
];

export default function Pagina() {
  return (
    <>
      <Header />
      <main>
        <JsonLd data={grafo(breadcrumbLd(MIGAS))} />

        <HeroLanding migas={MIGAS} eyebrow="Anuncios con IA"
          h1="Anuncios en asistentes de IA para tiendas online."
          bajada={`Armamos y gestionamos tu campaña en la plataforma de anuncios de ChatGPT: en qué conversaciones aparecer, los anuncios y la medición de ventas. ${PRECIO} + IVA al mes, sin permanencia. La inversión en anuncios la pagas tú a OpenAI.`}>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={WA} target="_blank" rel="noopener noreferrer" className={BOTON}>Agendar una llamada</a>
            <a href="#precio" className={BOTON_BORDE}>Ver precio</a>
          </div>
        </HeroLanding>

        <Puntos eyebrow="Qué hacemos" titulo="Tu tienda en las conversaciones con IA." items={COMO} fondo />

        <Puntos eyebrow="Cómo empezamos" titulo="En tres pasos." items={PASOS} columnas={3} />

        <section id="precio" className="py-16 md:py-24 scroll-mt-20 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl">
              <p className="eyebrow mb-4">Precio</p>
              <h2 className="text-ink mb-4">{PRECIO} + IVA al mes.</h2>
              <p className="text-ink/70 text-lg mb-8">Gestión completa de la campaña, sin permanencia. El primer mes incluye la configuración: cuenta, temas, anuncios y píxel. La inversión en anuncios va aparte y la pagas tú directo a OpenAI.</p>
              <a href={WA} target="_blank" rel="noopener noreferrer" className={BOTON}>Hablar por WhatsApp</a>
            </div>
          </div>
        </section>

        <FaqSeo titulo="Anuncios con IA: preguntas frecuentes." preguntas={FAQ} />

        {/* Aviso de marcas (18-11-2026): Doppel, a nombre de OpenAI, pidió retirar el uso de sus
            marcas en synaptechads.cl. Usamos "ChatGPT" y "OpenAI" solo para nombrar la plataforma. */}
        <section className="py-8">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="text-ink/60 text-sm max-w-3xl">ChatGPT y OpenAI son marcas de OpenAI. SynapTech es una agencia independiente que gestiona campañas de sus clientes en la plataforma de anuncios de OpenAI; no está afiliada, patrocinada ni respaldada por OpenAI.</p>
          </div>
        </section>

        <Relacionados links={[
          { texto: "Google Ads", href: "/google-ads-para-barberias" },
          { texto: "Instagram y Facebook", href: "/publicidad-instagram-facebook-barberias" },
          { texto: "Quiénes somos", href: "/nosotros" },
        ]} />
      </main>
      <Footer />
    </>
  );
}

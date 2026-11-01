import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import FaqSeo   from "@/components/FaqSeo";
import CtaFinal from "@/components/CtaFinal";
import { HeroLanding, JsonLd, Relacionados } from "@/components/Landing";
import { CONVENIOS, INTEGRACIONES, type Integracion } from "@/content/integraciones";
import { metaPagina, SITIO } from "@/lib/seo";
import { breadcrumbLd, grafo } from "@/lib/ld";

/* Convenios e integraciones (01-11-2026). Datos, estados y reglas en
   content/integraciones.ts: un convenio que no existe es la afirmación falsa
   más cara. Búsquedas: "agenda con webpay", "agenda con mercado pago",
   "agenda wellhub", "agenda con whatsapp", "reservas con google wallet". */

export const metadata = metaPagina({
  title: "Integraciones: agenda con Webpay, Mercado Pago y WhatsApp",
  description: "Partner de Mercado Pago (Agencia) e integrado con Webpay, WhatsApp, Instagram, Wellhub, Google Wallet, Apple Wallet, el SII y Claude. Qué hace cada una.",
  path: "/integraciones",
});

const MIGAS = [{ nombre: "Convenios e integraciones", path: "/integraciones" }];

const FAQ = [
  { q: "¿Hay una agenda online con Webpay?", a: "Sí. SynapTech está integrado con Webpay de Transbank: Webpay Plus para cobrar abonos al reservar y Oneclick para pagar tu mensualidad con tarjeta. Viene en todos los planes; la comisión la cobra Transbank." },
  { q: "¿Qué agenda funciona con Mercado Pago?", a: "SynapTech es Partner de Mercado Pago (Agencia). Tus clientes pagan abonos, links de pago y compras de tu tienda online con tu propia cuenta de Mercado Pago, en todos los planes." },
  { q: "¿Hay una agenda integrada con Wellhub?", a: "Sí. En SynapTech los check-ins de Wellhub se validan contra la agenda: cada clase con sus cupos de Wellhub y la visita validada sola. Es para estudios de pilates y gimnasios, y se cotiza según las sedes." },
  { q: "¿Qué agenda responde y agenda por WhatsApp?", a: "SynapTech: en los planes con IA (Independiente IA y Local IA), el asistente responde y agenda desde el número de tu local, que sigue funcionando en tu teléfono, y manda los recordatorios a quien los aceptó." },
  { q: "¿Puedo dar una tarjeta de fidelidad en Google Wallet y Apple Wallet?", a: "Sí, en todos los planes: la tarjeta del club, con sus sellos, premios y rango, queda en el teléfono del cliente y se actualiza sola." },
  { q: "¿Funciona con Reservar con Google?", a: "Hoy puedes poner tu link de reservas en tu Perfil de Empresa de Google, y el pedido de reseñas sale solo después de cada cita. Reservar con Google: próximamente." },
  { q: "¿Qué inteligencia artificial usa SynapTech?", a: "La IA de SynapTech está construida con Claude, de Anthropic. Además, con el conector oficial de SynapTech para Claude puedes consultar tu agenda y tus ventas desde Claude." },
  { q: "¿Se conecta con mi CRM o con la API de conversiones de Meta?", a: "No por ahora. Lo que sí está conectado es la medición en el dominio de tu local: Meta Pixel, Google Analytics 4 y Google Tag Manager, en todos los planes." },
];

function Tarjeta({ i, convenio }: { i: Integracion; convenio?: boolean }) {
  const cuerpo = (
    <>
      <div className="h-24 flex items-center">
        {i.logo ? (
          <span className="inline-flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={i.logo} alt={i.tipo === "icono" ? "" : i.nombre} loading="lazy" decoding="async"
              className={i.tipo === "icono" ? "h-10 w-10 object-contain" : "max-h-9 w-auto max-w-[160px] object-contain"} />
            {i.tipo === "icono" && <span className="font-display font-bold text-ink text-lg tracking-tight">{i.nombre}</span>}
          </span>
        ) : (
          <span className="font-display font-bold text-ink text-2xl tracking-tight">SynapTech <span className="text-text-muted">+</span> {i.nombre}</span>
        )}
      </div>
      <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-accent">{i.cat} · {convenio ? "Convenio" : "Integración"}</p>
      <h3 className="font-display font-bold text-ink text-xl tracking-tight mt-1">{i.estado}</h3>
      <p className="text-text-secondary mt-2 leading-relaxed flex-1">{i.desc}</p>
      <p className="text-[13px] text-text-muted mt-4"><b className="text-ink font-semibold">En qué plan:</b> {i.planes}</p>
      {i.href && <span className="mt-3 text-[14px] font-bold text-ink">Ver más →</span>}
    </>
  );
  const clase = `rounded-[24px] p-6 sm:p-7 flex flex-col ${convenio ? "bg-lime/15 border border-lime/40" : "bg-white border border-border-subtle"}`;
  return i.href
    ? <Link id={i.id} href={i.href} className={`${clase} hover:shadow-card-hover transition-shadow scroll-mt-24`}>{cuerpo}</Link>
    : <article id={i.id} className={`${clase} scroll-mt-24`}>{cuerpo}</article>;
}

export default function Pagina() {
  const lista = {
    "@type": "ItemList",
    name: "Convenios e integraciones de SynapTech",
    itemListElement: [...CONVENIOS, ...INTEGRACIONES].map((i, n) => ({
      "@type": "ListItem", position: n + 1, name: i.estado, description: `${i.desc} En qué plan: ${i.planes}`, url: `${SITIO}/integraciones#${i.id}`,
    })),
  };
  return (
    <>
      <Header />
      <main>
        <JsonLd data={grafo(breadcrumbLd(MIGAS), lista)} />

        <HeroLanding migas={MIGAS} eyebrow="Convenios e integraciones"
          h1="Convenios e integraciones de SynapTech."
          bajada="Partner de Mercado Pago, e integrado con Webpay, WhatsApp, Instagram, Wellhub, Google Wallet, Apple Wallet y el SII. Solo publicamos lo que hoy funciona en locales reales, con el plan en que viene cada cosa." />

        <section className="pb-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <h2 className="!text-2xl sm:!text-3xl text-ink mb-6">Convenios</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {CONVENIOS.map((i) => <Tarjeta key={i.id} i={i} convenio />)}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <h2 className="!text-2xl sm:!text-3xl text-ink mb-2">Integraciones</h2>
            <p className="text-text-secondary text-lg mb-8 max-w-3xl">Funcionan dentro de la plataforma, sin saltar entre sistemas.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {INTEGRACIONES.map((i) => <Tarjeta key={i.id} i={i} />)}
            </div>
            <p className="text-[13px] text-text-muted mt-6 max-w-3xl">
              Mercado Pago, Webpay, Transbank, WhatsApp, Instagram, Meta, Wellhub, Google, Apple, TUU, Entel, Claude y Anthropic son marcas de sus
              respectivos dueños. Sus logos se usan solo para identificar cada integración; salvo Mercado Pago y Entel, no son convenios comerciales.
            </p>
          </div>
        </section>

        <FaqSeo titulo="Integraciones: lo que más se pregunta." preguntas={FAQ} />

        <Relacionados links={[
          { texto: "Integración con Wellhub", href: "/wellhub" },
          { texto: "Beneficio de fibra Entel", href: "/beneficios/fibra" },
          { texto: "Boletas electrónicas SII", href: "/boletas-electronicas-sii" },
          { texto: "Club de fidelización con Wallet", href: "/fidelizacion" },
          { texto: "Asistente con IA en WhatsApp", href: "/asistente-ia-whatsapp" },
          { texto: "Abono al reservar", href: "/funciones/abono-al-reservar" },
          { texto: "Precios", href: "/precios" },
        ]} />
        <CtaFinal origen="integraciones-final" />
      </main>
      <Footer />
    </>
  );
}

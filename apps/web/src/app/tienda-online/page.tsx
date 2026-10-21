import Image from "next/image";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import FaqSeo   from "@/components/FaqSeo";
import { altaIA, CTA_IA, waLink } from "@/content/catalogo";
import { ADICIONALES } from "@/content/precios";
import { metaPagina } from "@/lib/seo";

/* Tienda online (11-10-2026). Ignacio: "la tienda que tienen las barberías
   hay que promocionarla al 100%". Todo lo que se afirma acá se vio en tiendas
   vivas ese día: catálogo por categorías, carrito, "Retiro en el local",
   "Apártalo para tu cita · y lo pagas en el local", "Pago seguro con tarjeta,
   por Mercado Pago" (en las que conectaron su cuenta), y "Nuestros productos ·
   Agrégalos a tu cita" dentro de la reserva. Capturas del local de práctica
   (datos de demostración). Las tiendas de ejemplo son públicas y de clientes. */

export const metadata = metaPagina({
  title: "Tienda online para barberías y salones | SynapTech",
  description: "Vende tus productos por internet con la marca de tu local: catálogo con fotos, pago con Mercado Pago, retiro en el local y productos dentro de la reserva.",
  path: "/tienda-online",
});

const FUNCIONES = [
  { t: "Tu tienda, con tu marca", d: "Tus productos con foto, precio y categoría, en la dirección de tu local. Tus colores y tu logo, no los nuestros." },
  { t: "Pago con tarjeta", d: "Conectas tu cuenta de Mercado Pago y el cliente paga con tarjeta al comprar." },
  { t: "Apártalo para tu cita", d: "El cliente elige el producto, lo aparta y lo paga cuando viene. Ideal para quien no compra por internet." },
  { t: "Productos dentro de la reserva", d: "Mientras agenda su hora, tu cliente ve tus productos y los agrega a su cita." },
  { t: "Stock al día", d: "Cada venta descuenta del inventario del panel, la de la tienda y la del mesón." },
  { t: "Un link para Instagram y tus anuncios", d: "La tienda completa o un producto en particular, listos para tu bio, tus historias o una campaña." },
];

const TIENDAS = [
  { nombre: "Golden Sheep Barbershop Studio", url: "https://goldensheep.synaptechspa.cl/tienda" },
  { nombre: "Viggo Men's Hair Club", url: "https://viggomhc.synaptechspa.cl/tienda" },
  { nombre: "Stiven Barber", url: "https://stivenbarber.synaptechspa.cl/tienda" },
  { nombre: "Infinity Studio", url: "https://infinity.synaptechspa.cl/tienda" },
  { nombre: "Barbería BRZ", url: "https://brz.synaptechspa.cl/tienda" },
  { nombre: "El 10 Salón Masculino", url: "https://el10salonmasculino.synaptechspa.cl/tienda" },
];

const vende = ADICIONALES.find((a) => /vende/i.test(a.nombre));

const FAQ = [
  { q: "¿La tienda tiene un costo aparte?", a: "No: viene con tu plan de SynapTech. Si cobras con tarjeta, Mercado Pago cobra su comisión por cada pago, como en cualquier venta con Mercado Pago." },
  { q: "¿Necesito Mercado Pago?", a: "Solo para cobrar con tarjeta en la tienda. Sin él, tus clientes igual ven tus productos y los apartan para pagarlos en el local." },
  { q: "¿Cómo cargo mis productos?", a: "Desde el panel, en Productos: nombre, precio, foto, categoría y stock. Si ya los tienes en otra agenda o en una planilla, te los cargamos nosotros." },
  { q: "¿Sirve si no tengo muchos productos?", a: "Sí. Hay tiendas con 4 productos y con más de 200. Puedes empezar con los que más vendes en el mesón." },
  ...(vende ? [{ q: "¿El asistente puede vender por WhatsApp?", a: `Sí, con el adicional "${vende.nombre}" (${vende.precio} + IVA): ${vende.desc.charAt(0).toLowerCase()}${vende.desc.slice(1)}` }] : []),
];

export default function TiendaOnline() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-12 md:pb-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <p className="eyebrow mb-5">Tienda online</p>
              <h1 className="text-ink !text-[clamp(2.4rem,5vw,4.2rem)]">Tu barbería también vende online.</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-xl">
                Tus productos con foto y precio en una tienda con la marca de tu local. Tus clientes compran por internet,
                retiran en el local o los apartan para su próxima cita.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a href={altaIA(`tienda-online`)} className="inline-flex justify-center items-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
                  {CTA_IA}
                </a>
                <a href={waLink("Hola, quiero ver cómo funciona la tienda online de SynapTech")} target="_blank" rel="noopener noreferrer"
                  className="inline-flex justify-center items-center border border-ink/15 text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
                  Ver una demo
                </a>
              </div>
              <p className="text-sm text-text-muted mt-4">Viene con tu plan · 18 locales ya venden con ella</p>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 items-start">
              {[["/panel/tienda-portada.webp", "Portada de la tienda de una barbería"], ["/panel/tienda-catalogo.webp", "Categorías de productos con foto"], ["/panel/tienda-producto.webp", "Ficha de producto con agregar al carrito y apartar para la cita"]].map(([src, alt], i) => (
                <Image key={src} src={src} alt={alt} width={780} height={1688} sizes="(min-width:1024px) 190px, 30vw"
                  className={`w-full h-auto rounded-[22px] border border-border-subtle shadow-card-hover ${i === 1 ? "mt-8" : ""}`} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <h2 className="text-ink max-w-3xl">Todo lo que vendes en el mesón, ahora también por internet.</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {FUNCIONES.map((f) => (
                <article key={f.t} className="rounded-[24px] bg-white p-6 sm:p-7">
                  <span aria-hidden className="block w-10 h-1.5 rounded-full bg-lime mb-5" />
                  <h3 className="!text-xl text-ink">{f.t}</h3>
                  <p className="text-text-secondary mt-2 leading-relaxed">{f.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-4">Tiendas de verdad</p>
            <h2 className="text-ink max-w-3xl">Mira cómo venden otros locales.</h2>
            <p className="text-text-secondary text-lg mt-4 max-w-2xl">Son tiendas reales de locales que usan SynapTech. Ábrelas desde tu teléfono.</p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8 list-none p-0 m-0">
              {TIENDAS.map((t) => (
                <li key={t.url}>
                  <a href={t.url} target="_blank" rel="noopener" className="flex items-center justify-between gap-4 rounded-[20px] border border-border-subtle px-5 py-4 hover:border-ink/40 transition-colors">
                    <span className="font-semibold text-ink">{t.nombre}</span>
                    <span className="text-accent font-semibold whitespace-nowrap">Ver tienda →</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FaqSeo titulo="Tienda online: lo que más nos preguntan." preguntas={FAQ} />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import FaqSeo   from "@/components/FaqSeo";
import CtaFinal from "@/components/CtaFinal";
import { TarjetaPlan } from "@/components/Pricing";
import { HeroLanding, JsonLd, Puntos, Relacionados, BOTON, BOTON_BORDE } from "@/components/Landing";
import { LOCAL_IA, PRECIO, TODO_INCLUIDO, TODO_INCLUIDO_AHORRO, TODO_INCLUIDO_SEPARADO, fmt } from "@/content/precios";
import { HILOS } from "@/content/comparar";
import { altaIA, waLink } from "@/content/catalogo";
import { metaPagina, SITIO } from "@/lib/seo";
import { breadcrumbLd, grafo, planLd } from "@/lib/ld";

/* Boletas electrónicas SII automáticas (01-11-2026). Página comercial del
   módulo de boletas: empuja Todo Incluido (las trae incluidas) y el adicional.
   La guía /guias/boleta-honorarios-y-comisiones-barberos responde la parte
   informativa (quién emite, retención, IVA): esta no la repite, la enlaza.
   Lo que afirma sale de lo que el sitio ya decía del módulo (FAQ de la
   portada y content/comparar.ts): emite desde el 05-09-2026 con folio real.
   Búsquedas: "boletas electrónicas SII automáticas", "boleta de honorarios
   automática barbería", "agenda que emite boletas", "facturación electrónica
   para barberías". */

export const metadata = metaPagina({
  title: "Boletas electrónicas SII automáticas para barberías",
  description: "La boleta del local y la de honorarios de cada barbero salen solas ante el SII al cerrar la cita. Incluidas en Todo Incluido, o desde $12.900 + IVA al mes.",
  path: "/boletas-electronicas-sii",
});

const MIGAS = [{ nombre: "Precios", path: "/precios" }, { nombre: "Boletas electrónicas SII", path: "/boletas-electronicas-sii" }];

const COMO = [
  { t: "Salen solas al cerrar la cita", d: "Cuando cobras, la boleta se emite ante el SII sin que la escribas: con folio real, en el momento." },
  { t: "Boleta de honorarios de cada profesional", d: "Con el RUT de cada barbero o estilista, pague el cliente como pague, efectivo incluido. Ideal para arriendo de sillón." },
  { t: "Boleta del local por los productos", d: "La venta de productos sale con la boleta afecta del local, según la estructura que indica el SII." },
  { t: "Cuadra con la caja y las comisiones", d: "Cada boleta queda pegada a su cobro: la caja, la liquidación de cada profesional y lo emitido dicen lo mismo." },
  { t: "Una autorización, una vez", d: "Cada profesional autoriza la emisión en su nombre ante el SII. Es un trámite único y te guiamos paso a paso." },
  { t: "Sin costo de instalación", d: `Incluidas en Todo Incluido, o como adicional de ${fmt(PRECIO.boletasLocal)} + IVA al mes por local (${fmt(PRECIO.boletasIndependiente)} si atiendes solo).` },
];

const FAQ = [
  { q: "¿Qué agenda emite boletas electrónicas ante el SII automáticamente?", a: "SynapTech: la boleta de honorarios de cada profesional y la boleta del local salen solas al cerrar la cita, directo ante el SII y con folio real. Se emiten todos los días en los locales que la usan desde el 5 de septiembre de 2026." },
  { q: "¿Cuánto cuestan las boletas automáticas?", a: `Vienen incluidas en el plan Todo Incluido (${fmt(TODO_INCLUIDO.mes)} + IVA al mes). En los demás planes son un adicional de ${fmt(PRECIO.boletasLocal)} + IVA al mes por local, o ${fmt(PRECIO.boletasIndependiente)} + IVA en los planes Independiente. Sin costo de instalación.` },
  { q: "¿Cobran por cada RUT que emite?", a: "No. El precio es por local: la boleta del local y la de honorarios de cada profesional van en el mismo valor, sean dos o diez profesionales." },
  { q: "¿Sirve para arriendo de sillón?", a: "Sí, es para lo que nació: cada profesional boletea con su propio RUT lo que atiende, y el local emite lo suyo. La liquidación de cada uno sale calculada del cierre de caja." },
  { q: "¿Y si el cliente paga en efectivo?", a: "La boleta sale igual: se emite al cerrar la cita, pague el cliente como pague." },
  { q: "¿Qué tengo que hacer para empezar?", a: "Cada profesional autoriza una vez la emisión en su nombre ante el SII; te guiamos paso a paso. Después, todo sale solo." },
  { q: "¿Cuánto se retiene en una boleta de honorarios en 2026?", a: "Lo explicamos con ejemplos en la guía de boletas de honorarios y comisiones para barberías, junto con quién emite, qué lleva IVA y cómo se paga a cada barbero." },
];

export default function Pagina() {
  const tabla = HILOS.find((h) => h.id === "boletas-sii")?.tabla;
  return (
    <>
      <Header />
      <main>
        <JsonLd data={grafo(breadcrumbLd(MIGAS), planLd(TODO_INCLUIDO), {
          "@type": "Product",
          name: "Boletas y facturas ante el SII (adicional de SynapTech)",
          description: "Emisión automática de la boleta del local y la boleta de honorarios de cada profesional al cerrar la cita, directo ante el SII. Sin costo de instalación.",
          brand: { "@type": "Brand", name: "SynapTech" },
          category: "Facturación electrónica",
          offers: [
            { "@type": "Offer", name: "Planes Local y Local IA", price: String(PRECIO.boletasLocal), priceCurrency: "CLP", availability: "https://schema.org/InStock", url: `${SITIO}/boletas-electronicas-sii`, priceSpecification: { "@type": "UnitPriceSpecification", price: String(PRECIO.boletasLocal), priceCurrency: "CLP", valueAddedTaxIncluded: false, unitText: "mes, por local" } },
            { "@type": "Offer", name: "Planes Independiente e Independiente IA", price: String(PRECIO.boletasIndependiente), priceCurrency: "CLP", availability: "https://schema.org/InStock", url: `${SITIO}/boletas-electronicas-sii`, priceSpecification: { "@type": "UnitPriceSpecification", price: String(PRECIO.boletasIndependiente), priceCurrency: "CLP", valueAddedTaxIncluded: false, unitText: "mes, 1 profesional" } },
          ],
        })} />

        <HeroLanding migas={MIGAS} eyebrow="Boletas electrónicas · SII"
          h1="Boletas electrónicas ante el SII, automáticas: salen solas al cerrar la cita."
          bajada="La boleta de honorarios de cada profesional y la boleta del local, emitidas directo ante el SII con folio real, sin escribir nada. Vienen incluidas en el plan Todo Incluido.">
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={altaIA("boletas-sii-hero")} className={BOTON}>Probar 30 días gratis</a>
            <a href={waLink("Hola, quiero las boletas automáticas ante el SII para mi local")} target="_blank" rel="noopener noreferrer" className={BOTON_BORDE}>Quiero las boletas</a>
          </div>
        </HeroLanding>

        <Puntos eyebrow="Cómo funciona" titulo="Cobras, y la boleta ya está emitida." items={COMO} fondo />

        {/* Precio: Todo Incluido o adicional */}
        <section id="precio" className="py-16 md:py-24 scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Cuánto cuesta</p>
              <h2 className="text-ink">Incluidas en Todo Incluido, o como adicional de tu plan.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Todo Incluido trae Local IA con boletas, Instagram, Reactivación IA y dominio por {fmt(TODO_INCLUIDO.mes)} + IVA:
                por separado serían {fmt(TODO_INCLUIDO_SEPARADO)}, ahorras {fmt(TODO_INCLUIDO_AHORRO)} al mes.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
              <TarjetaPlan p={{ ...TODO_INCLUIDO, popular: true }} />
              <article className="rounded-[28px] bg-mist p-7 sm:p-8 flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Adicional</p>
                <h3 className="font-display font-bold text-3xl tracking-tight mt-1 text-ink">Boletas ante el SII</h3>
                <p className="mt-5"><span className="font-display font-bold text-[40px] tracking-tight leading-none text-ink">{fmt(PRECIO.boletasLocal)}</span> <span className="text-sm text-text-muted">+ IVA / mes, por local</span></p>
                <p className="text-sm text-text-muted mt-1">En los planes Local y Local IA ({fmt(LOCAL_IA.mes)} + IVA con el asistente).</p>
                <p className="mt-5"><span className="font-display font-bold text-2xl tracking-tight text-ink">{fmt(PRECIO.boletasIndependiente)}</span> <span className="text-sm text-text-muted">+ IVA / mes en Independiente e Independiente IA</span></p>
                <p className="text-text-secondary mt-5 leading-relaxed flex-1">Sin costo de instalación y sin cobro por cada RUT que emite.</p>
                <a href={waLink("Hola, quiero sumar las boletas automáticas ante el SII a mi plan")} target="_blank" rel="noopener noreferrer"
                  className="mt-7 inline-flex justify-center items-center font-semibold px-6 py-3.5 rounded-full bg-ink text-white hover:bg-black transition-colors">Sumar a mi plan</a>
              </article>
            </div>
          </div>
        </section>

        {/* Qué emite cada agenda (content/comparar.ts, con fuentes) */}
        {tabla && (
          <section className="py-16 md:py-24 bg-mist">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <div className="max-w-3xl mb-8">
                <p className="eyebrow mb-4">Frente a otras agendas</p>
                <h2 className="text-ink">Qué agenda emite boletas ante el SII, y cuánto cobra.</h2>
              </div>
              <div className="overflow-x-auto rounded-[24px] bg-white border border-border-subtle">
                <table className="w-full min-w-[720px] text-left text-[15px]">
                  <thead>
                    <tr className="text-[13px] uppercase tracking-[0.08em] text-text-muted">
                      {tabla.columnas.map((c, i) => <th key={i} scope="col" className="px-5 py-4 font-semibold">{c}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {tabla.filas.map((f, i) => (
                      <tr key={i} className={i === tabla.destacarFila ? "bg-lime/15" : ""}>
                        {f.map((v, k) => k === 0
                          ? <th key={k} scope="row" className="px-5 py-4 align-top border-t border-border-subtle font-semibold text-ink">{v}</th>
                          : <td key={k} className="px-5 py-4 align-top border-t border-border-subtle text-text-secondary">{v === null ? "No publicado" : String(v)}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-text-muted mt-4">Datos de las páginas públicas de cada empresa, revisados el 1 de noviembre de 2026. <Link href="/comparar#boletas-sii" className="underline underline-offset-2 hover:text-ink">Fuentes y detalle</Link>.</p>
            </div>
          </section>
        )}

        <FaqSeo titulo="Boletas electrónicas automáticas: preguntas frecuentes." preguntas={FAQ} />

        <Relacionados links={[
          { texto: "Guía: boleta de honorarios y comisiones", href: "/guias/boleta-honorarios-y-comisiones-barberos" },
          { texto: "Todos los precios", href: "/precios" },
          { texto: "Calculadora de comisiones", href: "/funciones/comisiones" },
          { texto: "Cuadratura de caja", href: "/funciones/control-de-caja" },
          { texto: "Software para barberías", href: "/barberias" },
          { texto: "Convenios e integraciones", href: "/integraciones" },
        ]} />
        <CtaFinal origen="boletas-sii-final" />
      </main>
      <Footer />
    </>
  );
}

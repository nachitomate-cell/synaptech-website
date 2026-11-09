import Image        from "next/image";
import Header       from "@/components/Header";
import Footer       from "@/components/Footer";
import Recorrido    from "@/components/Recorrido";
import FaqSeo       from "@/components/FaqSeo";
import Aparece      from "@/components/Aparece";
import EnlacesAgencias from "@/components/EnlacesAgencias";
import { IconoWa, InstalacionAgencia, PlanesAgencia } from "@/components/PlanesAgencia";
import { Dolores, type Dolor } from "@/components/Rubro";
import { JsonLd, Migas } from "@/components/Landing";
import { LinkWhatsAppConRef } from "@/components/CtaWhatsAppComparar";
import { MODULOS_AGENCIA } from "@/content/recorrido";
import {
  ADICIONALES_AGENCIA, AGENCIA_EQUIPO, AGENCIA_EQUIPO_ANUAL, AGENCIA_SOLO, PLANES_AGENCIA, WA_AGENCIAS, type PlanAgencia,
} from "@/content/agencias";
import { fmt } from "@/content/precios";
import { metaPagina, SITIO } from "@/lib/seo";
import { breadcrumbLd, grafo, oferta } from "@/lib/ld";

export const metadata = metaPagina({
  title: "Planes para agencias de viaje y turismo | SynapTech",
  description: `Un asistente con IA que cotiza tus paseos y traslados en español, portugués e inglés y reparte los chats entre tus vendedoras. Desde ${fmt(AGENCIA_SOLO.mes)} + IVA al mes.`,
  path: "/agencias",
  imagen: "/og/agencias",
});

/* Planes para agencias de viaje y turismo (09-11-2026). Reemplaza la página
   de agencias del 09-10, que mostraba los planes de barbería: ahora lleva
   precios propios (content/agencias.ts) y todos los botones van al WhatsApp
   comercial con el código de campaña (LinkWhatsAppConRef), porque el alta de
   agencias no es autoservicio. El clic a api.whatsapp.com dispara Contact
   (Meta) y lead_created (OpenAI) desde TrackingScripts.
   El recorrido sigue siendo el de la agencia ficticia (content/recorrido.ts).
   Sin nombres de clientes, sin testimonios y sin cifras de resultados. */

const MIGAS = [{ nombre: "Agencias de viaje y turismo", path: "/agencias" }];

const DOLORES: Dolor[] = [
  { dolor: "Cotizar el mismo paseo veinte veces al día", solucion: "El asistente cotiza por ti", detalle: "Responde con tu catálogo, precios y horarios al minuto, también de noche y en feriados." },
  { dolor: "Pasajeros que escriben en portugués o en inglés", solucion: "Responde en su idioma", detalle: "Español, portugués o inglés, según cómo escriba el pasajero, y el precio en pesos o en reales." },
  { dolor: "Vendedoras que se pisan los clientes", solucion: "Reparto automático", detalle: "Cada conversación nueva va a una vendedora y le llega el aviso al celular. Cada una ve solo lo suyo." },
  { dolor: "No saber en qué quedó cada cliente", solucion: "Tablero de ventas", detalle: "Quién preguntó, a quién se le cotizó y quién compró, por vendedora y por período." },
  { dolor: "Clientes que preguntan y desaparecen", solucion: "Seguimiento a las 48 horas", detalle: "Al que quedó callado, el asistente le escribe para preguntarle si sigue interesado." },
  { dolor: "Calcular comisiones en Excel", solucion: "Comisiones solas", detalle: "Al cerrar la venta queda el monto y los pasajeros, y a fin de mes la comisión de cada vendedora está calculada." },
];

const FAQ = [
  { q: "¿Qué es una conversación?", a: "Es un cliente durante 24 horas, cuente los mensajes que cuente. Si un pasajero manda cuarenta mensajes en una tarde, es una conversación." },
  { q: "¿Funciona con mi número actual?", a: "Sí. Conectamos tu WhatsApp de siempre con un código QR y tus clientes te siguen escribiendo al mismo número." },
  { q: "¿Atiende en portugués?", a: "Sí. Responde en portugués, español o inglés según cómo escriba el pasajero, y cotiza en reales o en pesos." },
  { q: "¿Qué pasa si paso las conversaciones de mi plan?", a: "El asistente sigue contestando. Las conversaciones extra cuestan $9.900 + IVA cada 100." },
  { q: "¿Los precios incluyen IVA?", a: "No, son netos. El IVA va en la factura y lo recuperas como crédito fiscal." },
];

const BOTON_LIME = "inline-flex justify-center items-center gap-2 text-center bg-lime text-ink font-semibold px-7 py-4 rounded-full hover:bg-ink hover:text-white transition-colors";
const BOTON_BORDE = "inline-flex justify-center items-center text-center border border-ink/15 bg-white text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors";

export default function AgenciasPage() {
  const url = `${SITIO}/agencias`;
  const producto = (p: PlanAgencia, descripcion: string) => ({
    "@type": "Product",
    name: `SynapTech ${p.nombre}`,
    description: descripcion,
    brand: { "@type": "Brand", name: "SynapTech" },
    category: "Software de ventas por WhatsApp para agencias de viaje",
    offers: oferta(p.mes, `${url}#${p.id}`, "mes"),
  });
  const jsonLd = grafo(
    breadcrumbLd(MIGAS),
    ...PLANES_AGENCIA.map((p) => producto(p, `${p.para} Incluye: ${p.incluye.join("; ")}.${p.nota ? ` ${p.nota}` : ""}`)),
    {
      "@type": "Product",
      name: `SynapTech ${AGENCIA_EQUIPO.nombre} anual`,
      description: `Todo ${AGENCIA_EQUIPO.nombre} pagando una vez al año: pagas ${AGENCIA_EQUIPO_ANUAL.pagas} meses y usas 12.`,
      brand: { "@type": "Brand", name: "SynapTech" },
      category: "Software de ventas por WhatsApp para agencias de viaje",
      offers: oferta(AGENCIA_EQUIPO_ANUAL.anio, `${url}#${AGENCIA_EQUIPO.id}`, "año"),
    },
  );

  return (
    <>
      <Header />
      <main>
        <JsonLd data={jsonLd} />

        {/* Hero */}
        <section className="pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1fr_1.08fr] gap-12 items-center">
            <div className="min-w-0">
              <Migas migas={MIGAS} />
              <p className="eyebrow mb-5">Planes para agencias de viaje y turismo</p>
              <h1 className="text-ink mb-6 !text-[clamp(2.1rem,4.6vw,4rem)]">Tu agencia vende por WhatsApp. Que ningún interesado quede sin respuesta.</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-8">
                El asistente cotiza tus paseos y traslados al minuto y en el idioma del pasajero, sea español, portugués o inglés,
                en pesos o en reales. Y reparte cada conversación entre tus vendedoras.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <LinkWhatsAppConRef texto={WA_AGENCIAS} className={BOTON_LIME}>
                  <IconoWa /> Hablar por WhatsApp
                </LinkWhatsAppConRef>
                <a href="#planes" className={BOTON_BORDE}>Ver planes y precios</a>
              </div>
              <p className="mt-4 text-sm text-text-muted">30 días de prueba, sin costo de instalación y sin permanencia.</p>
            </div>
            <div className="min-w-0">
              <div className="hero-entra rounded-[28px] bg-lime/20 p-2.5 sm:p-4">
                <Image src="/panel/agencia-bandeja.webp" alt="Bandeja con conversaciones de WhatsApp e Instagram atendidas por vendedoras y el asistente"
                  width={2880} height={1800} priority sizes="(min-width: 1024px) 620px, 92vw"
                  className="w-full h-auto rounded-xl border border-border-subtle shadow-card-hover" />
              </div>
            </div>
          </div>
        </section>

        <Dolores titulo="Lo que más se repite en una agencia, resuelto." items={DOLORES} />

        <PlanesAgencia />

        {/* Sin costo de instalación + temporada baja */}
        <InstalacionAgencia />

        {/* Adicionales */}
        <section id="adicionales" className="py-16 md:py-24 bg-mist scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <Aparece className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Adicionales</p>
              <h2 className="text-ink">Lo que puedes sumar a tu plan.</h2>
            </Aparece>
            <div className="rounded-[28px] bg-white overflow-hidden">
              <table className="w-full text-left">
                <caption className="sr-only">Adicionales para agencias, con su precio neto</caption>
                <thead className="hidden sm:table-header-group">
                  <tr className="text-sm text-text-muted border-b border-border-subtle">
                    <th scope="col" className="font-semibold px-6 sm:px-8 py-4">Adicional</th>
                    <th scope="col" className="font-semibold px-6 sm:px-8 py-4 text-right whitespace-nowrap">Precio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {ADICIONALES_AGENCIA.map((a) => (
                    <tr key={a.id} id={`adicional-${a.id}`} className="flex flex-col sm:table-row px-6 sm:px-0 py-5 sm:py-0">
                      <th scope="row" className="font-normal sm:px-8 sm:py-5 align-top">
                        <span className="block font-display font-bold text-ink text-lg tracking-tight">{a.nombre}</span>
                        <span className="block text-text-secondary mt-1 leading-relaxed">{a.detalle}</span>
                      </th>
                      <td className="sm:px-8 sm:py-5 mt-2 sm:mt-0 sm:text-right align-top sm:whitespace-nowrap">
                        <span className="font-display font-bold text-ink text-xl">{fmt(a.mes)}</span>
                        <span className="text-sm text-text-muted ml-1">{a.unidad}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-text-muted mt-5 max-w-3xl">
              Los anuncios gestionados no incluyen el presupuesto que se le paga a Meta o a Google. Esa inversión la pagas tú directo y la decides tú.
            </p>
          </div>
        </section>

        {/* Recorrido del panel con la agencia ficticia */}
        <section className="pt-16 md:pt-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <Aparece className="max-w-3xl">
              <p className="eyebrow mb-4">Por dentro</p>
              <h2 className="text-ink">Así lo ven tú y tus vendedoras.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Las capturas son de una agencia de ejemplo con datos inventados.
              </p>
            </Aparece>
          </div>
        </section>
        {MODULOS_AGENCIA.map((m, i) => (
          <section key={m.id} id={m.id} className={`py-16 md:py-24 scroll-mt-20 ${i % 2 ? "bg-mist" : ""}`}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <div className="max-w-3xl mb-6">
                <p className="eyebrow mb-3">{String(i + 1).padStart(2, "0")} · {m.nombre}</p>
                <h2 className="text-ink">{m.titular}</h2>
                <p className="text-text-secondary text-lg mt-4 leading-relaxed">{m.bajada}</p>
              </div>
              <Recorrido modulo={m} />
            </div>
          </section>
        ))}

        {/* Otros tipos de agencia (09-11-2026): cada uno con su página. */}
        <EnlacesAgencias
          titulo="Tours, transfers, viajes, eventos, propiedades, seguros y autos."
          bajada="Si tu agencia vende por WhatsApp e Instagram con un equipo, sirve igual. Mismos planes y precios; cada página cuenta cómo se usa en ese rubro." />

        <FaqSeo titulo="Planes para agencias: preguntas frecuentes." preguntas={FAQ} />

        {/* Cierre */}
        <section className="pb-12 md:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="rounded-[28px] bg-ink text-white p-7 sm:p-10">
              <p className="font-display font-bold text-2xl sm:text-3xl tracking-tight">Pruébalo 30 días con tu catálogo y tu equipo.</p>
              <p className="text-white/70 mt-3 mb-7 max-w-2xl leading-relaxed">
                Escríbenos y te contamos qué plan le sirve a tu agencia. La instalación la hacemos nosotros y no hay permanencia.
              </p>
              <LinkWhatsAppConRef texto={WA_AGENCIAS} className="inline-flex justify-center items-center gap-2 text-center bg-lime text-ink font-semibold px-7 py-4 rounded-full hover:bg-white transition-colors">
                <IconoWa /> Hablar por WhatsApp
              </LinkWhatsAppConRef>
              <p className="text-[13px] text-white/50 mt-3">Se abre WhatsApp con el mensaje listo para enviar.</p>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="text-[13px] leading-relaxed text-text-muted">
              Precios netos en pesos chilenos, más IVA. Los anuncios gestionados no incluyen el presupuesto que se le paga a Meta o a Google.
              Una conversación es un cliente durante 24 horas.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

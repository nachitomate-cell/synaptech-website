import Image        from "next/image";
import Header       from "@/components/Header";
import Footer       from "@/components/Footer";
import Recorrido    from "@/components/Recorrido";
import FaqSeo       from "@/components/FaqSeo";
import Aparece      from "@/components/Aparece";
import { Dolores, type Dolor } from "@/components/Rubro";
import { JsonLd, Migas } from "@/components/Landing";
import { LinkWhatsAppConRef } from "@/components/CtaWhatsAppComparar";
import { MODULOS_AGENCIA } from "@/content/recorrido";
import {
  ADICIONALES_AGENCIA, AGENCIA_EQUIPO, AGENCIA_EQUIPO_ANUAL, PLANES_AGENCIA, TEMPORADA_BAJA, WA_AGENCIAS, type PlanAgencia,
} from "@/content/agencias";
import { fmt } from "@/content/precios";
import { metaPagina, SITIO } from "@/lib/seo";
import { breadcrumbLd, grafo, oferta } from "@/lib/ld";

export const metadata = metaPagina({
  title: "Planes para agencias de viaje y turismo | SynapTech",
  description: "Un asistente con IA que cotiza tus paseos y traslados en español, portugués e inglés y reparte los chats entre tus vendedoras. Desde $24.900 + IVA al mes.",
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

const INSTALACION = [
  "Conectamos tu WhatsApp e Instagram",
  "Cargamos tu catálogo de paseos y traslados",
  "Capacitamos a tus vendedoras por videollamada",
  "30 días de prueba",
  "Sin permanencia",
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

const IconoWa = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
  </svg>
);

const Check = ({ oscuro }: { oscuro?: boolean }) => (
  <svg className={`w-5 h-5 shrink-0 mt-0.5 ${oscuro ? "text-lime" : "text-accent"}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function TarjetaAgencia({ p, i }: { p: PlanAgencia; i: number }) {
  const oscuro = !!p.etiqueta;
  const equipo = p.id === AGENCIA_EQUIPO.id;
  return (
    <Aparece delay={i * 0.08} className="h-full">
      <article id={p.id} className={`relative h-full rounded-[28px] p-7 sm:p-8 flex flex-col scroll-mt-24 ${oscuro ? "bg-ink text-white" : "bg-white"}`}>
        {p.etiqueta && <span className="absolute -top-3 left-7 bg-lime text-ink text-xs font-bold px-3 py-1 rounded-full">{p.etiqueta}</span>}
        <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">{p.nombre}</h3>
        <p className={`mt-2 ${oscuro ? "text-white/70" : "text-text-secondary"}`}>{p.para}</p>
        <p className="mt-5">
          <span className="font-display font-bold text-[40px] tracking-tight leading-none">{p.suma ? "+" : ""}{fmt(p.mes)}</span>
          <span className={`text-sm ml-1 ${oscuro ? "text-white/60" : "text-text-muted"}`}>{p.unidad}</span>
        </p>
        {equipo && (
          <p className="text-sm mt-2 text-white/70">
            Anual: <span className="text-lime font-semibold">{fmt(AGENCIA_EQUIPO_ANUAL.anio)} + IVA</span>. Pagas {AGENCIA_EQUIPO_ANUAL.pagas} meses y usas 12.
          </p>
        )}
        <ul className="mt-6 flex flex-col gap-3 flex-1">
          {p.incluye.map((x) => <li key={x} className="flex gap-3 text-[15px] leading-snug"><Check oscuro={oscuro} /><span className="min-w-0">{x}</span></li>)}
        </ul>
        {p.nota && <p className={`mt-5 text-sm ${oscuro ? "text-white/60" : "text-text-muted"}`}>{p.nota}</p>}
        <LinkWhatsAppConRef texto={p.wa}
          className={`mt-7 inline-flex justify-center items-center text-center font-semibold px-6 py-3.5 rounded-full transition-colors ${
            oscuro ? "bg-lime text-ink hover:bg-white" : "bg-ink text-white hover:bg-black"}`}>
          {p.suma ? "Consultar por WhatsApp" : `Quiero ${p.nombre}`}
        </LinkWhatsAppConRef>
      </article>
    </Aparece>
  );
}

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

        {/* Planes */}
        <section id="planes" className="py-16 md:py-24 scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <Aparece className="max-w-3xl mb-12">
              <p className="eyebrow mb-4">Planes y precios</p>
              <h2 className="text-ink">Un plan si vendes solo, otro si tienes equipo.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Precios netos en pesos chilenos, más IVA. Si tienes una segunda marca o un segundo número, se suma al plan.
              </p>
            </Aparece>
            <div className="rounded-[32px] bg-mist p-3 sm:p-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
              {PLANES_AGENCIA.map((p, i) => <TarjetaAgencia key={p.id} p={p} i={i} />)}
            </div>
          </div>
        </section>

        {/* Sin costo de instalación + temporada baja */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-2 gap-5">
            <Aparece className="h-full">
              <article className="h-full rounded-[28px] border border-border-subtle p-7 sm:p-9">
                <p className="eyebrow mb-3">Para partir</p>
                <h2 className="text-ink !text-[clamp(1.6rem,3vw,2.25rem)]">Sin costo de instalación.</h2>
                <ul className="mt-6 flex flex-col gap-3">
                  {INSTALACION.map((x) => <li key={x} className="flex gap-3 text-[15px]"><Check /><span>{x}</span></li>)}
                </ul>
              </article>
            </Aparece>
            <Aparece delay={0.08} className="h-full">
              <article id="temporada-baja" className="h-full rounded-[28px] bg-ink text-white p-7 sm:p-9 scroll-mt-24">
                <p className="text-lime text-xs font-bold uppercase tracking-[0.12em] mb-3">Temporada baja</p>
                <h2 className="text-white !text-[clamp(1.6rem,3vw,2.25rem)]">Cuando baja el turismo, baja el plan.</h2>
                <p className="mt-5">
                  <span className="font-display font-bold text-[40px] tracking-tight leading-none">{fmt(TEMPORADA_BAJA.mes)}</span>
                  <span className="text-sm ml-1 text-white/60">+ IVA / mes</span>
                </p>
                <p className="mt-5 text-white/75 leading-relaxed">
                  Hasta {TEMPORADA_BAJA.meses} meses al año, {AGENCIA_EQUIPO.nombre} baja a {fmt(TEMPORADA_BAJA.mes)} + IVA. El asistente sigue
                  contestando con {TEMPORADA_BAJA.conversaciones} conversaciones al mes, y tu equipo y tu historial quedan intactos.
                </p>
              </article>
            </Aparece>
          </div>
        </section>

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

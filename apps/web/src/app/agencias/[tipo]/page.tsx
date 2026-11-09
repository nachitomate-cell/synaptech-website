import Link from "next/link";
import { notFound } from "next/navigation";
import Header  from "@/components/Header";
import Footer  from "@/components/Footer";
import FaqSeo  from "@/components/FaqSeo";
import Aparece from "@/components/Aparece";
import EnlacesAgencias from "@/components/EnlacesAgencias";
import { JsonLd, Migas } from "@/components/Landing";
import { LinkWhatsAppConRef } from "@/components/CtaWhatsAppComparar";
import { IconoWa, InstalacionAgencia, PlanesAgencia } from "@/components/PlanesAgencia";
import { TIPOS_AGENCIA, tipoAgencia, type MensajeEjemplo, type TipoAgencia } from "@/content/agencias-tipos";
import { AGENCIA_SOLO } from "@/content/agencias";
import { guia } from "@/content/guias-duenos";
import { fmt } from "@/content/precios";
import { metaPagina } from "@/lib/seo";
import { breadcrumbLd, grafo, servicioAgenciaLd } from "@/lib/ld";

/* Una página por tipo de agencia (09-11-2026, content/agencias-tipos.ts).
   /agencias sigue siendo la de turismo (su URL va en anuncios y en Instagram):
   estas cuelgan de ella. Misma plantilla, contenido propio de cada tipo:
   situación, escenarios, chat de ejemplo y preguntas. Los planes son los de
   /agencias con las palabras del rubro. */

export const dynamicParams = false;
export function generateStaticParams() {
  return TIPOS_AGENCIA.map((t) => ({ tipo: t.slug }));
}

export function generateMetadata({ params }: { params: { tipo: string } }) {
  const t = tipoAgencia(params.tipo);
  if (!t) return {};
  return metaPagina({ title: t.title, description: t.description, path: `/agencias/${t.slug}`, imagen: `/og/agencias/${t.slug}` });
}

const BOTON_LIME = "inline-flex justify-center items-center gap-2 text-center bg-lime text-ink font-semibold px-7 py-4 rounded-full hover:bg-ink hover:text-white transition-colors";
const BOTON_BORDE = "inline-flex justify-center items-center text-center border border-ink/15 bg-white text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors";

const waDe = (t: TipoAgencia) => `Hola, tengo ${t.quien} y quiero saber de los planes para agencias`;

function Burbuja({ m }: { m: MensajeEjemplo }) {
  if (m.de === "aviso") {
    return (
      <p className="self-center text-center text-[13px] font-semibold text-accent bg-syn-lime-tint border border-lime/40 rounded-full px-4 py-1.5 max-w-full">
        {m.texto}
      </p>
    );
  }
  const cliente = m.de === "cliente";
  return (
    <div className={`max-w-[88%] ${cliente ? "self-start" : "self-end"}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.08em] mb-1 ${cliente ? "text-text-muted" : "text-right text-accent"}`}>
        {cliente ? "Cliente" : "Asistente"}
      </p>
      <p className={`rounded-2xl px-4 py-3 text-[15px] leading-snug break-words ${cliente ? "bg-white text-ink rounded-tl-sm" : "bg-ink text-white rounded-tr-sm"}`}>
        {m.texto}
      </p>
    </div>
  );
}

export default function PaginaTipoAgencia({ params }: { params: { tipo: string } }) {
  const t = tipoAgencia(params.tipo);
  if (!t) notFound();
  const path = `/agencias/${t.slug}`;
  const migas = [{ nombre: "Agencias", path: "/agencias" }, { nombre: t.nombre, path }];
  const g = t.guia ? guia(t.guia) : undefined;

  const jsonLd = grafo(
    breadcrumbLd(migas),
    servicioAgenciaLd({
      nombre: `SynapTech para ${t.nombre.toLowerCase()}`,
      tipo: t.serviceType,
      descripcion: `${t.description} ${t.escenarios.map((e) => `${e.titulo}: ${e.detalle}`).join(" ")}`,
      path,
      audiencia: t.nombre,
    }),
  );

  return (
    <>
      <Header />
      <main>
        <JsonLd data={jsonLd} />

        {/* Hero */}
        <section className="pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1fr_0.9fr] gap-12 items-center">
            <div className="min-w-0">
              <Migas migas={migas} />
              <p className="eyebrow mb-5">{t.eyebrow}</p>
              <h1 className="text-ink mb-6 !text-[clamp(2.1rem,4.6vw,3.8rem)]">{t.h1}</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-8">{t.bajada}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <LinkWhatsAppConRef texto={waDe(t)} className={BOTON_LIME}>
                  <IconoWa /> Hablar por WhatsApp
                </LinkWhatsAppConRef>
                <a href="#planes" className={BOTON_BORDE}>Ver planes y precios</a>
              </div>
              <p className="mt-4 text-sm text-text-muted">
                Desde {fmt(AGENCIA_SOLO.mes)} + IVA al mes. 30 días de prueba, sin costo de instalación y sin permanencia.
              </p>
            </div>
            <div className="min-w-0">
              <figure className="hero-entra rounded-[28px] bg-mist p-4 sm:p-6">
                <div className="flex flex-col gap-3">
                  {t.ejemplo.map((m, i) => <Burbuja key={i} m={m} />)}
                </div>
                <figcaption className="text-[13px] text-text-muted mt-5">
                  Ejemplo con datos inventados. El asistente responde con tu catálogo y tus precios.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* La situación del rubro */}
        <section className="py-16 md:py-20 bg-mist">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Aparece>
              <p className="eyebrow mb-4">{t.nombre}</p>
              <h2 className="text-ink">{t.situacion.titulo}</h2>
            </Aparece>
            <div className="mt-6 space-y-5">
              {t.situacion.parrafos.map((p) => <p key={p} className="text-text-secondary text-lg leading-relaxed">{p}</p>)}
            </div>
          </div>
        </section>

        {/* Escenarios */}
        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <Aparece className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">En la práctica</p>
              <h2 className="text-ink">{t.escenariosTitulo}</h2>
            </Aparece>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {t.escenarios.map((e, i) => (
                <Aparece key={e.titulo} delay={(i % 3) * 0.08} className="h-full">
                  <article className="h-full rounded-[28px] border border-border-subtle p-7">
                    <p className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="font-display font-bold text-ink text-xl tracking-tight mt-2">{e.titulo}</h3>
                    <p className="text-text-secondary mt-3 leading-relaxed">{e.detalle}</p>
                  </article>
                </Aparece>
              ))}
            </div>
            <p className="mt-8 text-text-secondary leading-relaxed max-w-3xl">
              Todo pasa en una sola bandeja con WhatsApp e Instagram.{" "}
              <Link href="/agente-ia-omnicanal" className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink">Cómo funciona el agente omnicanal</Link>
              {" "}y{" "}
              <Link href="/crm-whatsapp" className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink">el tablero de ventas</Link>.
            </p>
          </div>
        </section>

        <PlanesAgencia reemplazos={t.reemplazos}
          titulo="Los mismos planes para todas las agencias."
          bajada="Precios netos en pesos chilenos, más IVA. Un plan si vendes solo, otro si tienes equipo, y si tienes una segunda marca o un segundo número, se suma al plan." />
        <InstalacionAgencia reemplazos={t.reemplazos} temporadaBaja={t.temporadaBaja} />

        <FaqSeo titulo={`${t.nombre}: preguntas frecuentes.`} preguntas={t.faq} />

        {g && (
          <section className="pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <Link href={`/guias/${g.slug}`} className="group block rounded-[28px] bg-mist p-7 hover:bg-lime/20 transition-colors">
                <p className="eyebrow mb-2">Guía gratis · {g.minutos} min</p>
                <p className="font-display font-bold text-ink text-xl sm:text-2xl tracking-tight leading-snug">{g.titulo}</p>
                <p className="text-text-secondary mt-2 leading-relaxed">{g.resumen}</p>
              </Link>
            </div>
          </section>
        )}

        <EnlacesAgencias excluir={t.slug} fondo="bg-mist" eyebrow="Otros tipos de agencia" titulo="También para estas agencias." />

        {/* Cierre */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="rounded-[28px] bg-ink text-white p-7 sm:p-10">
              <p className="font-display font-bold text-2xl sm:text-3xl tracking-tight">Pruébalo 30 días con tu catálogo y tu equipo.</p>
              <p className="text-white/70 mt-3 mb-7 max-w-2xl leading-relaxed">
                Escríbenos y te contamos qué plan te sirve. La instalación la hacemos nosotros y no hay permanencia.
                ¿Tu negocio no es una agencia? Mira el <Link href="/empresas" className="text-lime underline underline-offset-4">agente de IA para empresas</Link> o
                el <Link href="/asistente-ia-whatsapp" className="text-lime underline underline-offset-4">asistente que agenda por WhatsApp</Link>.
              </p>
              <LinkWhatsAppConRef texto={waDe(t)} className="inline-flex justify-center items-center gap-2 text-center bg-lime text-ink font-semibold px-7 py-4 rounded-full hover:bg-white transition-colors">
                <IconoWa /> Hablar por WhatsApp
              </LinkWhatsAppConRef>
              <p className="text-[13px] text-white/50 mt-3">Se abre WhatsApp con el mensaje listo para enviar.</p>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="text-[13px] leading-relaxed text-text-muted">
              Precios netos en pesos chilenos, más IVA. Una conversación es un cliente durante 24 horas. Los chats de ejemplo usan datos inventados.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

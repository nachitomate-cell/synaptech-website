import { altaIA, agendaGratis, CTA_IA, CTA_GRATIS, waLink, type RubroAlta } from "@/content/catalogo";
import { CIFRAS_IA, PRO_IA, type EjemploChat } from "@/content/alta-ia";
import { SITIO } from "@/lib/seo";

/* Piezas de las páginas del alta con asistente IA (/agenda-con-asistente-ia y
   /agenda-con-ia/...). Todo lo que afirman está en content/alta-ia.ts. */

const BOTON = "inline-flex justify-center items-center text-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors";
const ENLACE = "font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink";

/** Botón principal + "Solo quiero la agenda gratis". */
export function BotonesIA({ origen, rubro, centrado = false }: { origen: string; rubro?: RubroAlta; centrado?: boolean }) {
  return (
    <div className={centrado ? "text-center" : ""}>
      <div className={`flex flex-col sm:flex-row gap-3 ${centrado ? "justify-center" : ""}`}>
        <a href={altaIA(origen, rubro)} className={BOTON}>{CTA_IA}</a>
        <a href={waLink("Hola, quiero crear mi agenda con el asistente de IA")} target="_blank" rel="noopener noreferrer"
          className="inline-flex justify-center items-center border border-ink/15 bg-white text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
          Hablar por WhatsApp
        </a>
      </div>
      <p className="mt-4 text-sm text-text-muted">
        No pedimos tarjeta para la prueba.{" "}
        <a href={agendaGratis(`${origen}-gratis`)} className={ENLACE}>{CTA_GRATIS}</a>
      </p>
    </div>
  );
}

/** Una conversación de WhatsApp de ejemplo. */
export function ChatIA({ ejemplo, compacto = false }: { ejemplo: EjemploChat; compacto?: boolean }) {
  return (
    <figure className="rounded-[24px] bg-[#efeae2] border border-border-subtle overflow-hidden">
      <figcaption className="bg-[#075e54] text-white px-4 py-3 text-sm font-semibold flex items-center gap-2">
        <span aria-hidden className="w-7 h-7 rounded-full bg-lime text-ink flex items-center justify-center text-xs font-bold">S</span>
        {ejemplo.titulo}
      </figcaption>
      <div className={`flex flex-col gap-2 p-3 sm:p-4 ${compacto ? "text-[14px]" : "text-[15px]"}`}>
        {ejemplo.mensajes.map((m, i) => (
          <p key={i}
            className={`max-w-[85%] rounded-2xl px-3.5 py-2 leading-snug shadow-sm ${
              m.de === "cliente" ? "self-end bg-[#d9fdd3] text-ink rounded-br-sm" : "self-start bg-white text-ink rounded-bl-sm"
            }`}>
            <span className="sr-only">{m.de === "cliente" ? "Cliente: " : "Syna: "}</span>
            {m.texto}
          </p>
        ))}
      </div>
    </figure>
  );
}

export function EjemplosIA({ titulo, ejemplos }: { titulo: string; ejemplos: EjemploChat[] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mb-10">
          <p className="eyebrow mb-4">Así responde Syna</p>
          <h2 className="text-ink">{titulo}</h2>
          <p className="text-text-secondary text-lg mt-4 leading-relaxed">
            Ejemplos ilustrativos. Syna responde con los precios de tu catálogo y las horas libres reales de tu agenda.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 items-start">
          {ejemplos.map((e) => <ChatIA key={e.titulo} ejemplo={e} compacto />)}
        </div>
      </div>
    </section>
  );
}

const PASOS = [
  { t: "Crea tu agenda en minutos", d: "Cargas tus servicios, precios y profesionales con sus horarios." },
  { t: "Vincula tu WhatsApp escaneando un QR", d: "Syna responde desde el número de tu local, que sigue funcionando en tu teléfono." },
  { t: "Syna responde y agenda por ti", d: "Da precios de tu catálogo, ofrece horas libres reales y deja la cita en tu agenda." },
];

export function PasosIA() {
  return (
    <section className="py-16 md:py-24 bg-mist">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mb-10">
          <p className="eyebrow mb-4">Cómo funciona</p>
          <h2 className="text-ink">Tres pasos y tu WhatsApp se responde solo.</h2>
        </div>
        <ol className="grid md:grid-cols-3 gap-5">
          {PASOS.map((p, i) => (
            <li key={p.t} className="rounded-[28px] bg-white p-7">
              <span className="w-10 h-10 rounded-full bg-lime text-ink font-display font-bold text-lg flex items-center justify-center">{i + 1}</span>
              <h3 className="font-display font-bold text-ink text-xl tracking-tight mt-5">{p.t}</h3>
              <p className="text-text-secondary mt-3 leading-relaxed">{p.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CifrasIA() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="rounded-[28px] bg-ink text-white p-6 sm:p-10 md:p-14">
          <p className="text-lime text-[13px] font-semibold uppercase tracking-[0.14em] mb-4">Números reales</p>
          <h2 className="!text-white !text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight max-w-3xl">{CIFRAS_IA.frase}.</h2>
          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            {CIFRAS_IA.items.map((c) => (
              <div key={c.valor} className="rounded-[20px] bg-white/[0.06] border border-white/10 p-6">
                <p className="font-display font-bold text-lime text-3xl sm:text-4xl tracking-tight">{c.valor}</p>
                <p className="text-white/75 mt-2 leading-relaxed">{c.texto}</p>
              </div>
            ))}
          </div>
          <p className="text-white/50 text-sm mt-6">Datos medidos en la plataforma al {CIFRAS_IA.fecha}.</p>
        </div>
      </div>
    </section>
  );
}

export function Despues30({ origen, rubro }: { origen: string; rubro?: RubroAlta }) {
  return (
    <section className="py-16 md:py-24 bg-mist">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mb-10">
          <p className="eyebrow mb-4">Después de los 30 días</p>
          <h2 className="text-ink">Tú eliges. No pedimos tarjeta para la prueba.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <article className="rounded-[28px] bg-ink text-white p-7 sm:p-8">
            <p className="text-lime text-xs font-semibold uppercase tracking-[0.12em]">Sigues con Syna</p>
            <h3 className="font-display font-bold text-3xl tracking-tight mt-1">Plan Pro</h3>
            <p className="mt-4"><span className="font-display font-bold text-[34px] tracking-tight">$49.900</span> <span className="text-white/60 text-sm">+ IVA / mes por local</span></p>
            <p className="text-white/80 mt-4 leading-relaxed">
              El asistente sigue respondiendo y agendando por WhatsApp, con {PRO_IA.conversaciones} conversaciones al mes incluidas.
            </p>
            <a href={altaIA(`${origen}-pro`, rubro)} className="mt-6 inline-flex justify-center items-center text-center bg-lime text-ink font-semibold px-6 py-3.5 rounded-full hover:bg-white transition-colors">{CTA_IA}</a>
          </article>
          <article className="rounded-[28px] bg-white p-7 sm:p-8">
            <p className="text-accent text-xs font-semibold uppercase tracking-[0.12em]">O sigues gratis</p>
            <h3 className="font-display font-bold text-3xl tracking-tight mt-1 text-ink">Plan Gratis</h3>
            <p className="mt-4"><span className="font-display font-bold text-[34px] tracking-tight text-ink">$0</span> <span className="text-text-muted text-sm">para siempre</span></p>
            <p className="text-text-secondary mt-4 leading-relaxed">
              Si no pagas, tu agenda sigue funcionando gratis, hasta 4 profesionales, sin el asistente.
            </p>
            <a href={agendaGratis(`${origen}-gratis`)} className={`mt-6 inline-block ${ENLACE}`}>{CTA_GRATIS}</a>
          </article>
        </div>
      </div>
    </section>
  );
}

export function CtaIA({ titulo, bajada, origen, rubro }: { titulo: string; bajada: string; origen: string; rubro?: RubroAlta }) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-ink">{titulo}</h2>
        <p className="text-text-secondary text-lg mt-5 mb-8 leading-relaxed">{bajada}</p>
        <BotonesIA origen={origen} rubro={rubro} centrado />
      </div>
    </section>
  );
}

export type Miga = { nombre: string; path: string };

/** Migas visibles + BreadcrumbList en JSON-LD. */
export function MigasIA({ migas }: { migas: Miga[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: migas.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: m.nombre, item: `${SITIO}${m.path === "/" ? "" : m.path}` })),
  };
  return (
    <nav aria-label="Ruta de navegación" className="text-sm text-text-muted mb-5 flex flex-wrap gap-1.5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {migas.map((m, i) => (
        <span key={m.path}>{i > 0 && <span aria-hidden className="mr-1.5">›</span>}
          {i < migas.length - 1 ? <a href={m.path} className="hover:text-ink">{m.nombre}</a> : <span aria-current="page" className="text-ink">{m.nombre}</span>}
        </span>
      ))}
    </nav>
  );
}

/** Hero con un chat de ejemplo al lado. */
export function HeroIA({ eyebrow, titulo, bajada, origen, rubro, chat, migas }: {
  eyebrow: string; titulo: string; bajada: string; origen: string; rubro?: RubroAlta; chat: EjemploChat; migas?: Miga[];
}) {
  return (
    <section className="pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        {migas && <MigasIA migas={migas} />}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h1 className="text-ink mb-6 !text-[clamp(2.2rem,4.8vw,4.2rem)]">{titulo}</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-8">{bajada}</p>
            <BotonesIA origen={origen} rubro={rubro} />
          </div>
          <div className="max-w-md w-full mx-auto lg:mr-0">
            <ChatIA ejemplo={chat} />
            <p className="text-xs text-text-muted mt-3">Ejemplo ilustrativo. Los precios y las horas salen de tu catálogo y tu agenda.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

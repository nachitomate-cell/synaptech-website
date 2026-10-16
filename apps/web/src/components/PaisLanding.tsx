import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PAISES, PLANES_LATAM, SEDE_ADICIONAL_LATAM, WA_CUPO, incluyeEnPais, type CodigoPais } from "@/content/paises";
import { waLink } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";
import { enMonedaLocal, tiposDeCambio, NOTA_CAMBIO } from "@/lib/cambio";
import Bandera from "@/components/Bandera";

/* Landing por país (ver content/paises.ts). Lleva su propio encabezado y pie:
   el menú del sitio chileno enlaza precios en pesos chilenos, SII y locales de
   Chile, que acá no aplican. Cuando el país tenga dominio propio, esta misma
   página es su portada.

   16-10-2026: es el link que se manda por WhatsApp a las barberías de cada país.
   La vista previa (título, descripción e imagen /og/<código>) va en dólares y en
   su moneda, nunca con el precio chileno: un prospecto de Perú leyó "$29.900"
   de la vista previa de la home como US$29. Cada página se regenera una vez al
   día con el tipo de cambio del día (lib/cambio.ts).

   16-10-2026 (Ignacio: "está muy vacía, debe dirigir a /locales, a los
   módulos… a todos lados"): suma módulos, locales reales, el cambio paso a paso
   y menú y pie con enlaces al resto del sitio. REGLA DE LOS ENLACES: solo a
   páginas cuyo contenido visible no muestra precios en pesos chilenos. Por eso
   los módulos van a /como-funciona#<módulo> y no a /funciones/<función> (varias
   citan "$29.900 + IVA" o bolsas en pesos), y no se enlazan la home, /precios,
   /barberias, /asistente-ia-whatsapp, /fidelizacion ni /comparar/* (todas con
   precios chilenos). Antes de sumar un enlace, mirar el HTML de esa página. */

const LOCALE_OG: Record<CodigoPais, string> = { pe: "es_PE", co: "es_CO", mx: "es_MX", ar: "es_AR" };

export async function metadataPais(codigo: CodigoPais): Promise<Metadata> {
  const p = PAISES[codigo];
  const cambio = await tiposDeCambio();
  const [agenda] = PLANES_LATAM;
  // Fuera del índice (noindex) como antes: es la página que se manda por WhatsApp.
  const m = metaPagina({
    title: `SynapTech para barberías en ${p.nombre} · Desde US$${agenda.precio}/mes · 2 meses gratis`,
    description: `Agenda online, recordatorios por WhatsApp y asistente con IA para tu barbería. US$${agenda.precio} al mes por local (≈ ${enMonedaLocal(agenda.precio, codigo, cambio)}), sin cobro por barbero. Los 2 primeros meses, gratis.`,
    path: `/${codigo}`,
    noindex: true,
    imagen: `/og/${codigo}`,
  });
  return { ...m, openGraph: { ...m.openGraph, locale: LOCALE_OG[codigo] } };
}

function Check({ claro = false }: { claro?: boolean }) {
  return (
    <svg className={`w-5 h-5 shrink-0 mt-0.5 ${claro ? "text-lime" : "text-accent"}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Flecha() {
  return (
    <svg className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Modulo = {
  t: string; d: string; href: string; cta: string;
  img: { src: string; alt: string; w: number; h: number };
  etiqueta?: string;
};

const ESC = (src: string, alt: string) => ({ src: `/panel/${src}.webp`, alt, w: 2880, h: 1800 });
const CEL = (src: string, alt: string) => ({ src: `/panel/${src}.webp`, alt, w: 780, h: 1688 });

/* Enlaces del menú: anclas de esta misma página y páginas del sitio sin precios
   chilenos a la vista. */
const MENU = [
  { l: "Módulos", h: "#modulos" },
  { l: "Precios", h: "#planes" },
  { l: "Locales", h: "/locales" },
  { l: "Contacto", h: "/contacto" },
];

export default async function PaisLanding({ codigo }: { codigo: CodigoPais }) {
  const p = PAISES[codigo];
  const piloto = p.estado === "piloto";
  const wa = (t: string) => waLink(`${t} (${p.nombre})`);
  const cambio = await tiposDeCambio();
  const local = (usd: number) => enMonedaLocal(usd, codigo, cambio);
  const [agenda, ia] = PLANES_LATAM;
  const sedes4 = agenda.precio + 3 * SEDE_ADICIONAL_LATAM.mes;
  const ej = p.localEjemplo;
  const hrefLocales = p.anclaLocales ? `/locales#${p.anclaLocales}` : "/locales";

  const ADAPTADO = [
    { t: `Precios en ${p.moneda}`, d: "Tu catálogo, la caja y los mensajes del asistente muestran tu moneda." },
    { t: `En ${p.hora}`, d: "La agenda, los recordatorios y el asistente trabajan con la hora de tu local." },
    { t: `Celulares ${p.prefijo}`, d: "Tus clientes reservan con su número local y los avisos les llegan a ese número." },
    p.documento
      ? { t: `Con ${p.documento}, sin RUT`, d: `La reserva pide los datos de ${p.nombre}, no los de Chile.` }
      : { t: "Sin datos chilenos", d: "La reserva no pide RUT ni comuna: solo lo que usa tu país." },
    p.leyDatos
      ? { t: "Tus datos, protegidos", d: `Los textos legales de la reserva citan la ${p.leyDatos}.` }
      : { t: "Español neutro", d: "El asistente escribe en un español que se entiende en toda Latinoamérica." },
    { t: "El WhatsApp de tu local", d: "El asistente responde desde tu número, que sigue funcionando en tu teléfono." },
  ];

  /* Cada módulo lleva a su parte de /como-funciona (capturas reales, paso a paso).
     Textos sin nada propio de Chile: ni SII, ni boletas, ni medios de pago chilenos. */
  const MODULOS: Modulo[] = [
    { t: "Agenda del local", d: "Cada barbero en su columna, con sus citas, colaciones y horas bloqueadas a la vista. En el computador y en el celular.",
      href: "/como-funciona#agenda", cta: "Ver la agenda", img: ESC("agenda-escritorio", "Agenda del día con tres profesionales") },
    { t: "Reservas online con tu marca", d: "Tu página de reservas: el cliente elige servicio, barbero, día y hora, y la cita entra sola a tu agenda. Lista para el link de tu Instagram.",
      href: "/como-funciona#reserva", cta: "Ver la reserva", img: CEL("reserva-1-servicio", "Primer paso de la reserva online en el celular") },
    { t: "Recordatorios por WhatsApp", d: `Cada reserva recibe su confirmación y un recordatorio antes de la hora, al celular ${p.prefijo} de tu cliente. Menos horas perdidas.`,
      href: "#planes", cta: "Viene en el plan Agenda", img: CEL("reserva-3-confirmar", "Confirmación de la reserva en el celular del cliente") },
    { t: "Caja diaria", d: "Cada cobro con su medio de pago: efectivo, tarjeta o transferencia. Al cerrar el día sabes cuánto debería haber en el cajón.",
      href: "/como-funciona#caja", cta: "Ver la caja", img: ESC("caja", "Caja del día con el saldo esperado") },
    { t: "Comisiones del equipo", d: "Comisión de servicios y productos, propinas y lo ya pagado, por barbero y por período. Se lo mandas en PDF.",
      href: "/como-funciona#comisiones", cta: "Ver las comisiones", img: ESC("comisiones", "Comisiones por profesional del período") },
    { t: "Club y tarjeta de sellos", d: "Sellos por visita, premios y rangos, con la tarjeta guardada en el Apple Wallet o Google Wallet de tu cliente.",
      href: "/como-funciona#club", cta: "Ver el club", img: ESC("club-premios", "Escalera de premios del club de fidelización") },
    { t: "Informes del negocio", d: "Lo que entró en el período comparado con el anterior, servicios contra productos, y todo descargable a Excel.",
      href: "/como-funciona#metricas", cta: "Ver los informes", img: ESC("metricas", "Métricas de ingresos del período") },
    { t: "App para tu equipo", d: "Cada barbero lleva su día en el celular: ve su próxima cita, agenda desde ahí y sabe lo que le corresponde.",
      href: "/funciones/app-para-profesionales", cta: "Ver la app", img: CEL("app-barbero-celular", "Agenda del barbero en su celular") },
    { t: "Syna, asistente con IA", d: "Responde precios y horarios en el WhatsApp de tu local y deja la hora agendada. Es opcional: viene en el plan Agenda + IA.",
      href: "/como-funciona#asistente", cta: "Ver el asistente", etiqueta: "Cupos limitados", img: ESC("asistente-bandeja", "Bandeja de conversaciones del asistente con IA") },
  ];

  const PASOS = [
    { t: "Nos escribes y agendamos", d: "Coordinamos por WhatsApp una videollamada en el horario que te acomode." },
    { t: "Traemos tus servicios", d: `Con sus precios en ${p.moneda} y sus duraciones, tal como los tienes hoy en ${p.competencia}.` },
    { t: "Cargamos a tu equipo", d: "Cada barbero con sus horarios, listo para recibir reservas." },
    { t: "Pasamos tu lista de clientes", d: "Para que sigas conociendo a cada uno desde el primer día." },
    { t: "Compartes tu link", d: "Lo pones en tu Instagram y tu WhatsApp, y las reservas empiezan a entrar solas." },
  ];

  const recordatorios = p.cupoWhatsApp
    ? `El plan Agenda ${incluyeEnPais(WA_CUPO, p).replace(/^Trae/, "trae")}.`
    : "Las confirmaciones y los recordatorios por WhatsApp vienen en el plan Agenda.";

  const FAQ = [
    { q: `¿Necesito una empresa en Chile para usarlo?`, a: `No. Tu local se crea con su país, ${p.nombre}, y todo funciona con tu moneda, tu hora y tus números.` },
    { q: "¿Cómo pago la mensualidad?", a: `En dólares, con tarjeta. US$${agenda.precio} son unos ${local(agenda.precio)} y US$${ia.precio} unos ${local(ia.precio)} al cambio de hoy; el monto exacto en tu moneda lo pone tu banco.` },
    { q: "¿Y si no me sirve?", a: "No pagas nada. Los 2 primeros meses son gratis y la tarjeta se pide recién al final del período gratis (te avisamos a los 45 días)." },
    { q: "¿Los recordatorios por WhatsApp necesitan el plan con IA?", a: `No. ${recordatorios} El asistente con IA es lo único que suma el plan Agenda + IA.` },
    { q: "¿Mis clientes tienen que descargar una app para reservar?", a: "No. Reservan desde tu página de reservas, en el navegador del celular, y la cita entra directo a tu agenda. La tarjeta de sellos del club se guarda en Apple Wallet o Google Wallet, sin descargar nada." },
    { q: "¿Cada barbero ve su agenda en el celular?", a: "Sí. Cada barbero tiene su acceso: ve su día, agenda citas desde el teléfono y sabe cuánto le corresponde. Tú ves todo el local desde el computador o el celular." },
    { q: "¿Qué es una conversación del asistente?", a: "Un cliente durante 24 horas: si alguien te escribe diez mensajes en el día, cuenta como una. El plan Agenda + IA trae hasta 300 conversaciones al mes." },
    { q: "¿Por qué el asistente con IA tiene cupos?", a: `Porque cada asistente corre en nuestro servidor de WhatsApp con su propia sesión y lo acompañamos de cerca mientras aprende tu local. Lo abrimos a pocas barberías en ${p.nombre}: si te interesa, escríbenos y te decimos si queda cupo. El plan Agenda no tiene cupo.` },
    { q: "¿Hay plan anual?", a: `Sí: pagas 10 meses y usas 12. Son US$${agenda.anual} al año el plan Agenda (≈ ${local(agenda.anual)}) y US$${ia.anual} al año el plan Agenda + IA (≈ ${local(ia.anual)}).` },
    { q: "Tengo varias sedes, ¿cuánto pago?", a: `La primera sede paga su plan y cada sede adicional suma US$${SEDE_ADICIONAL_LATAM.mes} al mes (≈ ${local(SEDE_ADICIONAL_LATAM.mes)}). Por ejemplo, 4 sedes con el plan Agenda son US$${agenda.precio} + 3 × US$${SEDE_ADICIONAL_LATAM.mes} = US$${sedes4} al mes.` },
    { q: `¿Emite boletas o facturas en ${p.nombre}?`, a: `Todavía no. La emisión de documentos tributarios solo existe en Chile; en ${p.nombre} la agenda, la caja, el club y el asistente funcionan completos.` },
    { q: `Uso ${p.competencia}, ¿cómo me cambio?`, a: "El cambio lo hacemos nosotros, gratis, desde Fresha, AgendaPro, Booksy o el sistema que uses: traemos tus servicios con precios y duraciones, tu equipo con sus horarios y tu lista de clientes. Todo se hace por videollamada." },
    { q: "¿Puedo ver locales que ya lo usan?", a: ej
      ? `Sí. En el directorio de SynapTech están los locales que ya reservan con la plataforma; en ${p.nombre}, por ejemplo, ${ej.nombre} (${ej.lugar}).`
      : "Sí. En el directorio de SynapTech están los locales que ya reservan con la plataforma, con su página de reservas y su ubicación." },
    { q: "¿Hay permanencia?", a: "No. Te vas cuando quieras, y tus datos son tuyos: te los entregamos exportados." },
  ];

  const PIE: { titulo: string; links: { l: string; h: string }[] }[] = [
    { titulo: "Plataforma", links: [
      { l: "Módulos", h: "#modulos" },
      { l: "Cómo funciona", h: "/como-funciona" },
      { l: "Todas las funciones", h: "/funciones" },
      { l: "App para el equipo", h: "/funciones/app-para-profesionales" },
      { l: "Cápsulas en video", h: "/como-funciona#capsulas" },
      { l: "El recorrido en 8-bit", h: "/niveles" },
    ] },
    { titulo: `En ${p.nombre}`, links: [
      { l: "Planes en dólares", h: "#planes" },
      { l: `El cambio desde ${p.competencia}`, h: "#cambio" },
      { l: "Hecho para tu país", h: "#pais" },
      { l: "Preguntas frecuentes", h: "#preguntas" },
    ] },
    { titulo: "Locales", links: [
      { l: "Directorio de locales", h: "/locales" },
      ...(p.anclaLocales ? [{ l: `Locales en ${p.nombre}`, h: hrefLocales }] : []),
      { l: "Mis reservas", h: "/mis-reservas" },
    ] },
    { titulo: "SynapTech", links: [
      { l: "Nosotros", h: "/nosotros" },
      { l: "Contacto", h: "/contacto" },
      { l: "Privacidad", h: "/privacidad" },
      { l: "Términos", h: "/terminos" },
    ] },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-border-subtle">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 h-16 flex items-center justify-between gap-4">
          <Link href={`/${codigo}`} className="flex items-center gap-2.5 shrink-0">
            <Image src="/assets/synaptech-icon.png" alt="" width={28} height={28} />
            <span className="font-display font-bold text-ink text-lg tracking-tight">SynapTech</span>
            <span className="ml-1 text-[13px] font-semibold text-text-secondary bg-mist rounded-full px-2.5 py-1">{p.nombre}</span>
          </Link>
          <nav aria-label="Secciones" className="hidden md:flex items-center gap-1">
            {MENU.map((m) => (
              <a key={m.h} href={m.h} className="px-3 py-2 rounded-full text-[15px] font-medium text-text-secondary hover:text-ink transition-colors">{m.l}</a>
            ))}
          </nav>
          <a href={wa("Hola, quiero conocer SynapTech para mi local")} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center bg-ink text-white font-semibold text-sm px-4 sm:px-5 py-2.5 rounded-full hover:bg-black transition-colors shrink-0">
            <span className="hidden sm:inline">Hablar por&nbsp;</span>WhatsApp
          </a>
        </div>
        {/* En el celular, el menú va en una segunda fila: cuatro enlaces que caben en 320 px. */}
        <nav aria-label="Secciones" className="md:hidden border-t border-border-subtle">
          <div className="px-4 h-10 flex items-center justify-between text-[14px] font-semibold text-text-secondary">
            {MENU.map((m) => (
              <a key={m.h} href={m.h} className="py-2 hover:text-ink">{m.l}</a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="pt-36 pb-14 md:pb-20 overflow-hidden">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
            <div>
              <p className="eyebrow mb-5 !flex items-center gap-2.5">
                <Bandera codigo={codigo} ancho={21} />
                {piloto ? `Para barberías en ${p.nombre}` : `Próximamente en ${p.nombre}`}
              </p>
              <h1 className="text-ink mb-6 !text-[clamp(2.4rem,5vw,4.5rem)]">
                Toda tu barbería en una sola plataforma, ahora en {p.nombre}.
              </h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-6">
                Reservas online con tu marca, recordatorios por WhatsApp, caja, comisiones y un club
                que hace volver a tus clientes. Sin cobro por barbero.
              </p>
              <a href="#planes" className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-2xl bg-mist px-5 py-3.5 mb-8">
                <span className="text-text-secondary text-sm">Desde</span>
                <span className="font-display font-bold text-ink text-2xl tracking-tight">US${agenda.precio}</span>
                <span className="text-text-secondary text-sm">al mes por local</span>
                <span className="text-text-muted text-sm whitespace-nowrap">(≈ {local(agenda.precio)})</span>
                <span className="w-full sm:w-auto text-accent font-semibold text-sm"><span className="hidden sm:inline">· </span>2 meses gratis</span>
              </a>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={wa(piloto ? "Hola, quiero probar SynapTech 2 meses gratis en mi barbería" : "Hola, quiero que me avisen cuando SynapTech llegue")}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex justify-center items-center text-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
                  {piloto ? "Probar 2 meses gratis" : "Avísame cuando llegue"}
                </a>
                <a href="#planes"
                  className="inline-flex justify-center items-center text-center border border-ink/15 text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
                  Ver precios
                </a>
              </div>
              <p className="text-sm text-text-muted mt-6">
                Más de 45 locales y sedes ya trabajan con SynapTech en Chile.{" "}
                <Link href={hrefLocales} className="font-semibold text-accent hover:text-ink whitespace-nowrap">
                  {ej ? `Y en ${p.nombre}, ${ej.nombre} →` : "Mira los locales →"}
                </Link>
              </p>
            </div>
            <div className="relative">
              <div className="hero-entra rounded-[28px] bg-lime/20 p-2.5 sm:p-4">
                <Image src="/panel/agenda-escritorio.webp" alt="Agenda del día con tres profesionales en el panel de SynapTech"
                  width={2880} height={1800} priority sizes="(min-width: 1024px) 600px, 92vw"
                  className="w-full h-auto rounded-xl border border-border-subtle shadow-card-hover" />
              </div>
            </div>
          </div>
        </section>

        {/* Planes: van primero, es lo que viene a ver quien abre el link de WhatsApp */}
        <section id="planes" className="py-16 md:py-24 scroll-mt-28 md:scroll-mt-20 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Precios en dólares</p>
              <h2 className="text-ink">Un precio por local, no por barbero.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Sin cobro por barbero ni comisión por reserva. Los 2 primeros meses son gratis
                y la tarjeta se pide recién al final: si no te sirve, no pagas nada.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
              {PLANES_LATAM.map((pl) => (
                <article key={pl.id} className={`relative rounded-[28px] p-7 sm:p-8 flex flex-col ${pl.popular ? "bg-ink text-white" : "bg-white"}`}>
                  {pl.popular && <span className="absolute -top-3 left-7 bg-lime text-ink text-xs font-bold px-3 py-1 rounded-full">Recomendado</span>}
                  {pl.cupos && <span className="absolute -top-3 left-7 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">Cupos limitados</span>}
                  <h3 className="font-display font-bold text-2xl tracking-tight">{pl.nombre}</h3>
                  <p className="mt-4">
                    <span className="font-display font-bold text-[44px] tracking-tight leading-none">US${pl.precio}</span>
                    <span className={`text-sm ml-1 ${pl.popular ? "text-white/60" : "text-text-muted"}`}>/ mes por local</span>
                  </p>
                  <p className={`mt-2 font-semibold ${pl.popular ? "text-lime" : "text-accent"}`}>
                    ≈ {local(pl.precio)} al mes <span className={`text-xs font-normal ${pl.popular ? "text-white/55" : "text-text-muted"}`}>aprox.</span>
                  </p>
                  <p className={`text-sm mt-2 ${pl.popular ? "text-white/70" : "text-text-secondary"}`}>
                    o US${pl.anual} al año <span className="whitespace-nowrap">(≈ {local(pl.anual)})</span>: 10 meses pagados por 12
                  </p>
                  <p className={`mt-4 leading-relaxed ${pl.popular ? "text-white/80" : "text-text-secondary"}`}>{pl.descripcion}</p>
                  <ul className="mt-6 flex flex-col gap-3 flex-1">
                    {pl.incluye.map((d) => (
                      <li key={d} className="flex gap-3 text-[15px]"><Check claro={pl.popular} />{incluyeEnPais(d, p)}</li>
                    ))}
                  </ul>
                  <a href={wa(`Hola, me interesa el plan ${pl.nombre} de SynapTech`)} target="_blank" rel="noopener noreferrer"
                    className={`mt-8 inline-flex justify-center items-center font-semibold px-6 py-3.5 rounded-full transition-colors ${
                      pl.popular ? "bg-lime text-ink hover:bg-white" : "bg-ink text-white hover:bg-black"}`}>
                    {piloto ? "Probar 2 meses gratis" : "Avísame cuando llegue"}
                  </a>
                </article>
              ))}
            </div>
            <div className="mt-5 max-w-4xl rounded-[24px] bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <p className="text-ink">
                <span className="font-semibold">¿Varias sedes?</span> La primera paga su plan y cada sede adicional suma
                US${SEDE_ADICIONAL_LATAM.mes} al mes <span className="whitespace-nowrap">(≈ {local(SEDE_ADICIONAL_LATAM.mes)})</span>.
              </p>
              <p className="text-sm text-text-muted shrink-0">4 sedes con Agenda: US${agenda.precio} + 3 × US${SEDE_ADICIONAL_LATAM.mes} = US${sedes4} al mes</p>
            </div>
            <p className="text-sm text-text-muted mt-4 max-w-4xl">
              Precios en dólares estadounidenses, cobrados con tarjeta. Montos en {p.moneda}: {NOTA_CAMBIO}.
              La tarjeta se pide recién al final de los 2 meses gratis y te avisamos a los 45 días.
            </p>
          </div>
        </section>

        {/* Módulos: cada uno lleva a su parte del recorrido con capturas reales */}
        <section id="modulos" className="py-16 md:py-24 scroll-mt-28 md:scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Qué trae</p>
              <h2 className="text-ink">Todo lo que pasa en tu barbería, en un solo lugar.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Desde que el cliente reserva hasta que le pagas la comisión al barbero. Toca cada
                módulo para verlo en pantallas reales, paso a paso.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MODULOS.map((m) => {
                const cel = m.img.w < m.img.h;
                return (
                  <a key={m.t} href={m.href} className="group rounded-[24px] bg-mist overflow-hidden flex flex-col hover:shadow-card-hover transition-shadow">
                    <div className={`relative h-44 overflow-hidden bg-lime/15 ${cel ? "flex justify-center pt-5" : "px-5 pt-5"}`}>
                      <Image src={m.img.src} alt={m.img.alt} width={m.img.w} height={m.img.h} loading="lazy"
                        sizes={cel ? "160px" : "(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"}
                        className={`rounded-t-xl border border-border-subtle border-b-0 shadow-card object-cover object-top ${cel ? "w-36 h-auto" : "w-full h-auto"}`} />
                      {m.etiqueta && <span className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">{m.etiqueta}</span>}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display font-bold text-ink text-xl tracking-tight">{m.t}</h3>
                      <p className="text-text-secondary mt-2 leading-relaxed flex-1">{m.d}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-accent group-hover:text-ink">{m.cta} <Flecha /></span>
                    </div>
                  </a>
                );
              })}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/como-funciona" className="inline-flex justify-center items-center text-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
                Ver cómo funciona, módulo por módulo
              </Link>
              <Link href="/funciones" className="inline-flex justify-center items-center text-center border border-ink/15 text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
                Todas las funciones
              </Link>
            </div>
          </div>
        </section>

        {/* Locales reales que ya reservan con SynapTech */}
        <section id="locales" className="py-16 md:py-24 scroll-mt-28 md:scroll-mt-20 bg-lime/15">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div>
              <p className="eyebrow mb-4">Directorio de locales</p>
              <h2 className="text-ink">Mira locales que ya reservan con SynapTech.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                En el directorio están las barberías y salones que trabajan con SynapTech, cada uno
                con su página de reservas, sus servicios y su ubicación en el mapa. Entra a cualquiera
                y mira cómo reserva un cliente.
              </p>
              <Link href={hrefLocales}
                className="mt-8 inline-flex justify-center items-center gap-2 bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
                Ver el directorio de locales
              </Link>
            </div>
            {ej && (
              <article className="rounded-[28px] bg-white p-6 sm:p-8 shadow-card">
                <p className="text-sm font-semibold text-text-muted flex items-center gap-2">
                  <Bandera codigo={codigo} ancho={18} radio={2} /> Ya trabaja con SynapTech en {p.nombre}
                </p>
                <div className="flex items-center gap-4 mt-5">
                  <Image src={ej.logo} alt={`Logo de ${ej.nombre}`} width={64} height={64}
                    className="w-16 h-16 rounded-2xl object-cover border border-border-subtle bg-mist shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-ink text-2xl tracking-tight">{ej.nombre}</h3>
                    <p className="text-text-secondary">{ej.lugar}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a href={ej.url} target="_blank" rel="noopener noreferrer"
                    className="group inline-flex justify-center items-center gap-1.5 bg-lime text-ink font-semibold px-5 py-3 rounded-full hover:bg-ink hover:text-white transition-colors">
                    Ver su página de reservas <Flecha />
                  </a>
                  <Link href={hrefLocales}
                    className="inline-flex justify-center items-center text-center border border-ink/15 text-ink font-semibold px-5 py-3 rounded-full hover:border-ink/40 transition-colors">
                    Verlo en el directorio
                  </Link>
                </div>
              </article>
            )}
          </div>
        </section>

        {/* Hecho para el país */}
        <section id="pais" className="py-16 md:py-24 scroll-mt-28 md:scroll-mt-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Hecho para {p.nombre}</p>
              <h2 className="text-ink">No es la versión chilena con otra bandera.</h2>
              <p className="text-text-secondary text-lg mt-5 leading-relaxed">
                Cada local guarda su país, y la plataforma trabaja con lo de ese país.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ADAPTADO.map((x) => (
                <article key={x.t} className="rounded-[24px] bg-mist p-6 sm:p-7">
                  <h3 className="font-display font-bold text-ink text-xl tracking-tight">{x.t}</h3>
                  <p className="text-text-secondary mt-2 leading-relaxed">{x.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* El cambio, paso a paso */}
        <section id="cambio" className="py-16 md:py-24 scroll-mt-28 md:scroll-mt-20 bg-ink text-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl">
              <p className="eyebrow !text-lime mb-4">Cámbiate sin perder a nadie</p>
              <h2 className="text-white">Cómo es el cambio desde {p.competencia}.</h2>
              <p className="text-white/75 text-lg mt-5 leading-relaxed">
                Lo hacemos nosotros, gratis y por videollamada, venga de donde venga tu agenda. Tú
                sigues atendiendo; cuando terminamos, tu local ya está recibiendo reservas.
              </p>
            </div>
            <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {PASOS.map((x, i) => (
                <li key={x.t} className="rounded-[20px] bg-white/[0.06] border border-white/10 p-5">
                  <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-lime text-ink font-bold text-sm">{i + 1}</span>
                  <p className="font-semibold mt-4">{x.t}</p>
                  <p className="text-white/65 text-[15px] mt-1 leading-relaxed">{x.d}</p>
                </li>
              ))}
            </ol>
            <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
              {[
                ["Precio fijo por local", "No pagas más por sumar barberos."],
                ["Sin comisión por reserva", "Tampoco por cada cliente nuevo que llega."],
                ["Tu WhatsApp, tu cliente", "Los avisos y el asistente usan el número de tu local."],
                ["Sin permanencia", "Te vas cuando quieras, con tus datos."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <Check claro />
                  <span><span className="font-semibold">{t}.</span> <span className="text-white/65">{d}</span></span>
                </li>
              ))}
            </ul>
            <a href={wa(`Hola, uso ${p.competencia} y quiero cambiarme a SynapTech`)} target="_blank" rel="noopener noreferrer"
              className="mt-10 inline-flex justify-center items-center bg-lime text-ink font-semibold px-7 py-4 rounded-full hover:bg-white transition-colors">
              Quiero cambiarme
            </a>
          </div>
        </section>

        {/* Preguntas */}
        <section id="preguntas" className="py-16 md:py-24 scroll-mt-28 md:scroll-mt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="eyebrow mb-4">Preguntas frecuentes</p>
            <h2 className="text-ink mb-8">Lo que preguntan en {p.nombre}.</h2>
            <div className="divide-y divide-border-subtle border-y border-border-subtle">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-6 font-semibold text-ink text-lg">
                    {f.q}
                    <span className="text-2xl text-text-muted transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="text-text-secondary leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="text-text-secondary mt-8">
              ¿Otra duda? <a href={wa("Hola, tengo una pregunta sobre SynapTech")} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:text-ink">Escríbenos por WhatsApp</a>{" "}
              o mira <Link href="/contacto" className="font-semibold text-accent hover:text-ink">otras formas de contacto</Link>.
            </p>
          </div>
        </section>

        {/* Cierre */}
        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-ink">
              {piloto ? "Prueba SynapTech 2 meses gratis en tu barbería." : `Te avisamos cuando lleguemos a ${p.nombre}.`}
            </h2>
            <p className="text-text-secondary text-lg mt-5 leading-relaxed">
              Te mostramos la plataforma con los datos de tu local, por videollamada. Si no te
              sirve, no pagas nada.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={wa("Hola, quiero ver SynapTech con los datos de mi local")} target="_blank" rel="noopener noreferrer"
                className="inline-flex justify-center items-center text-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
                {piloto ? "Probar 2 meses gratis" : "Escríbenos por WhatsApp"}
              </a>
              <Link href="/como-funciona"
                className="inline-flex justify-center items-center text-center border border-ink/15 text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
                Ver cómo funciona
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border-subtle pt-12 pb-10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-[1.3fr_repeat(4,1fr)] gap-x-6 gap-y-10">
            <div className="col-span-2 md:col-span-1">
              <Link href={`/${codigo}`} className="flex items-center gap-2.5">
                <Image src="/assets/synaptech-icon.png" alt="" width={28} height={28} />
                <span className="font-display font-bold text-ink text-lg tracking-tight">SynapTech</span>
              </Link>
              <p className="text-sm text-text-secondary mt-4 leading-relaxed max-w-xs">
                Agenda, reservas online, caja, comisiones y club para barberías en {p.nombre}.
              </p>
              <a href={wa("Hola, quiero conocer SynapTech para mi local")} target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex text-sm font-semibold text-accent hover:text-ink">Escríbenos por WhatsApp →</a>
            </div>
            {PIE.map((c) => (
              <div key={c.titulo}>
                <p className="text-sm font-semibold text-ink mb-3">{c.titulo}</p>
                <ul className="flex flex-col gap-2">
                  {c.links.map((l) => (
                    <li key={l.h}><a href={l.h} className="text-sm text-text-secondary hover:text-ink transition-colors">{l.l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row gap-4 justify-between text-sm text-text-muted">
            <p>© 2026 Synaptech SpA · Empresa chilena · hola@synaptechspa.cl</p>
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              <span>Otros países:</span>
              {Object.values(PAISES).filter((x) => x.codigo !== codigo).map((x) => (
                <Link key={x.codigo} href={`/${x.codigo}`} className="hover:text-ink">{x.nombre}</Link>
              ))}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

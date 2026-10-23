import Link from "next/link";
import Repisa from "./Repisa";

/* Integraciones con USO REAL en producción (rehecho el 09-10-2026).
   Inventario desde el código de la plataforma (origin/main) y evidencia de uso:
   devtools/guias-panel/sitio-web/integraciones/integraciones-2026-10-09.json.
   Salieron frente a la versión del 16-09: Flow (no desplegado), Stripe (cuenta
   de prueba), Chilexpress (sin cuenta productiva), Google Analytics (ningún
   local la tiene conectada) y la infraestructura interna que un dueño no
   reconoce (Firebase, Sentry, Resend, Brevo, Mailjet). Entraron Webpay y
   Google Calendar.
   Todos los logos son los OFICIALES de cada marca (kits de prensa o el header
   de su sitio), en public/integraciones y public/marcas-terceros. Si una se
   apaga, sale de acá. 🔴 Webpay hoy cobra la mensualidad del local, NO las
   reservas (Webpay Mall sigue en validación con Transbank): no decir otra cosa. */

type Integracion = {
  nombre: string; cat: string; desc: string; logo: string;
  /** "wordmark": el logo ya dice el nombre. "icono": se muestra el nombre al lado. */
  tipo: "wordmark" | "icono" | "badge";
  /** Página propia de la integración, si la tiene. */
  href?: string;
  nuevo?: boolean;
};

const INTEGRACIONES: Integracion[] = [
  /* Wellhub (23-10-2026): integración firmada el 14-10, en producción con un estudio de 7 sedes. Logo oficial del header de wellhub.com. */
  { nombre: "Wellhub", cat: "Convenios", tipo: "wordmark", logo: "/integraciones/wellhub.svg", href: "/wellhub", nuevo: true, desc: "El check-in de la alumna llega solo a su reserva y la visita se valida sola, con cupos de Wellhub aparte en cada clase." },
  { nombre: "WhatsApp", cat: "Mensajería", tipo: "wordmark", logo: "/integraciones/whatsapp.svg", desc: "El asistente atiende y agenda desde el número del local, y los avisos de cada cita salen por la vía oficial de WhatsApp." },
  { nombre: "Instagram", cat: "Mensajería", tipo: "icono", logo: "/integraciones/instagram.png", desc: "Responde los mensajes directos y trae tus fotos a la página de reservas." },
  { nombre: "Mercado Pago", cat: "Pagos", tipo: "wordmark", logo: "/marcas-terceros/mercado-pago.png", desc: "Abonos de reservas, planes y tienda, directo a la cuenta del local." },
  { nombre: "TUU", cat: "Pagos", tipo: "wordmark", logo: "/integraciones/tuu.png", desc: "El cobro de la cita llega a la maquinita del local y cada pago queda conciliado." },
  { nombre: "Webpay", cat: "Pagos", tipo: "wordmark", logo: "/integraciones/webpay.svg", desc: "Pagas tu mensualidad de SynapTech con débito o crédito." },
  { nombre: "SII", cat: "Tributario", tipo: "icono", logo: "/marcas-terceros/sii-sello.svg", desc: "Boletas de honorarios con folio real, emitidas solas al cerrar la cita." },
  { nombre: "Google Wallet", cat: "Fidelización", tipo: "wordmark", logo: "/integraciones/google-wallet.svg", desc: "La tarjeta del club, con sus sellos, en el teléfono del cliente." },
  { nombre: "Apple Wallet", cat: "Fidelización", tipo: "badge", logo: "/integraciones/apple-wallet.svg", desc: "La misma tarjeta en el iPhone, y se actualiza sola." },
  { nombre: "Google Calendar", cat: "Google", tipo: "icono", logo: "/integraciones/google-calendar.svg", desc: "Cada profesional ve su agenda en su calendario, y el cliente guarda su hora." },
  { nombre: "Google Maps", cat: "Google", tipo: "icono", logo: "/integraciones/google-maps.svg", desc: "Tus reseñas de Google en tu página, y la invitación a dejar una después de la cita." },
  { nombre: "Meta", cat: "Marketing", tipo: "wordmark", logo: "/integraciones/meta.png", desc: "Cada hora agendada le avisa a Meta, para que tus anuncios busquen reservas reales." },
  { nombre: "Anthropic", cat: "Inteligencia artificial", tipo: "wordmark", logo: "/integraciones/anthropic.svg", desc: "Claude es el modelo con el que Syna conversa y agenda." },
  { nombre: "Google Cloud", cat: "Infraestructura", tipo: "wordmark", logo: "/integraciones/google-cloud.svg", desc: "Donde corre la plataforma, y lo que transcribe los audios que mandan tus clientes." },
  { nombre: "App Store", cat: "La app", tipo: "badge", logo: "/marcas-terceros/app-store-badge-es.svg", desc: "SynapTech Studio para iPhone, para el dueño y su equipo." },
  { nombre: "Google Play", cat: "La app", tipo: "badge", logo: "/marcas-terceros/google-play-badge-es.png", desc: "La misma app, publicada para Android." },
];

/* Tarjeta al estilo de los carruseles de nvidia.com (23-10-2026): esquinas
   casi rectas, panel claro con el logo arriba, "Categoría | Integración" en
   negrita chica, nombre y descripción. */
function Tarjeta({ i }: { i: Integracion }) {
  const cuerpo = (
    <>
      <div className="h-36 bg-[#F4F5F1] flex items-center justify-center px-6 relative">
        {i.nuevo && <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-[0.08em] bg-[#76B900] text-black px-2 py-0.5 rounded-[2px]">Nuevo</span>}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={i.logo} alt={i.tipo === "icono" ? "" : i.nombre} loading="lazy" decoding="async"
          className={i.tipo === "icono" ? "h-12 w-12 object-contain" : i.tipo === "badge" ? "h-11 w-auto max-w-[170px] object-contain" : "max-h-10 w-auto max-w-[170px] object-contain"} />
        {i.tipo === "icono" && <span className="ml-3 font-display font-bold text-ink text-xl tracking-tight">{i.nombre}</span>}
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <p className="text-[12px] font-bold text-ink">{i.cat} <span className="text-text-muted font-normal">|</span> Integración</p>
        <p className="font-display text-[19px] font-bold text-ink leading-tight">{i.nombre}</p>
        <p className="text-[14px] text-text-secondary leading-relaxed">{i.desc}</p>
        {i.href && <span className="mt-auto pt-2 text-[14px] font-bold text-ink inline-flex items-center gap-1.5">Ver la integración <span className="text-[#76B900]">›</span></span>}
      </div>
    </>
  );
  const clase = "snap-start shrink-0 w-[270px] sm:w-[290px] bg-white rounded-[6px] border border-[#e2e2e2] shadow-[0_2px_10px_rgba(0,0,0,.06)] overflow-hidden flex flex-col hover:shadow-[0_6px_22px_rgba(0,0,0,.12)] transition-shadow";
  return i.href
    ? <Link href={i.href} className={clase}>{cuerpo}</Link>
    : <div className={clase}>{cuerpo}</div>;
}

export default function Integraciones() {
  return (
    <section id="integraciones" className="py-20 md:py-28 border-t border-border-subtle scroll-mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-10 lg:gap-14">
        <div>
          <h2 className="text-ink !text-[clamp(2rem,3.4vw,2.8rem)]">Conectado de verdad.</h2>
          <p className="text-text-secondary text-lg mt-5 leading-relaxed">
            Cobros, boletas, WhatsApp, Instagram, Wellhub y la tarjeta del club: todo funciona dentro de la
            plataforma, sin saltar entre sistemas. Solo mostramos integraciones que hoy usan locales reales.
          </p>
          <Link href="/wellhub" className="mt-6 inline-flex items-center gap-2 text-[15px] font-bold text-ink">
            <svg className="w-3.5 h-3.5 text-[#76B900]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Nuevo: integración con Wellhub
          </Link>
        </div>
        <div className="min-w-0">
          <Repisa etiqueta="Integraciones" variante="nvidia">
            {INTEGRACIONES.map((i) => <Tarjeta key={i.nombre} i={i} />)}
          </Repisa>
        </div>
      </div>
    </section>
  );
}

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
};

const INTEGRACIONES: Integracion[] = [
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

function Tarjeta({ i }: { i: Integracion }) {
  return (
    <li className="rounded-[22px] bg-white border border-border-subtle p-5 flex flex-col gap-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300">
      <div className="h-12 flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={i.logo} alt={i.tipo === "icono" ? "" : i.nombre} loading="lazy" decoding="async"
          className={i.tipo === "icono" ? "h-10 w-10 object-contain" : i.tipo === "badge" ? "h-10 w-auto max-w-[150px] object-contain" : "max-h-9 w-auto max-w-[150px] object-contain"} />
        {i.tipo === "icono" && <span className="ml-3 font-display font-bold text-ink text-lg tracking-tight">{i.nombre}</span>}
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">{i.cat}</p>
        <p className="text-[14px] text-text-secondary leading-relaxed mt-1">{i.desc}</p>
      </div>
    </li>
  );
}

export default function Integraciones() {
  return (
    <section id="integraciones" className="py-16 md:py-24 border-t border-border-subtle scroll-mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mb-10 md:mb-12">
          <p className="eyebrow mb-4">Integrado con lo que ya usas</p>
          <h2 className="text-ink">Conectado de verdad.</h2>
          <p className="text-text-secondary text-lg mt-5 leading-relaxed">
            Cobros, boletas, WhatsApp, Instagram y la tarjeta del club: todo funciona dentro de la
            plataforma, sin saltar entre sistemas. Solo mostramos integraciones que hoy usan locales reales.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 m-0 p-0 list-none">
          {INTEGRACIONES.map((i) => <Tarjeta key={i.nombre} i={i} />)}
        </ul>
      </div>
    </section>
  );
}

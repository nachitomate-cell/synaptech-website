import { LOCALES_BASE } from "@/content/directorio-locales";
import { obtenerLocales } from "@/lib/directorio";

/* Lo que dicen los locales, TEXTUAL (rehecho el 09-10-2026).
   Cada cita es copia exacta de un mensaje de WhatsApp: mismas faltas, mismos
   emojis, mismas tildes que puso quien la escribió. Varias burbujas seguidas
   van en `burbujas`; un "…" marca un tramo omitido, nunca una palabra cambiada.
   Fuente, chat, id de cada burbuja y fecha: devtools/guias-panel/sitio-web/
   testimonios/testimonios-2026-10-09.json.
   Reglas que salieron de la auditoría de ese día:
   - Solo clientes que pagan hoy (los de prueba no, hasta pedirles permiso).
   - La versión anterior tenía citas que el cliente no dijo (Ferraza, y
     Chameleon con "los precios son accesibles"): no volver a "pulir" nada.
   - Las 5 estrellas decorativas salieron: parecían una calificación del
     cliente. La nota que se muestra es la real de Google del local, y solo si
     tiene 5 reseñas o más. */

type Testimonio = {
  local: string;         // id en content/directorio-locales.ts (logo, link de reserva, nota de Google)
  autor: string;
  rol: string;
  fecha: string;
  burbujas: string[];
  instagram?: string;
  destacado?: boolean;
  contexto?: string;     // qué estaba pasando, escrito por nosotros (va fuera de las comillas)
};

const TESTIMONIOS: Testimonio[] = [
  {
    local: "el10salonmasculino", autor: "Danilo", rol: "Socio a cargo de la contabilidad", fecha: "9 oct 2026",
    instagram: "el10salonmasculino_", destacado: true,
    contexto: "Venían de AgendaPro. Hoy cada boleta de honorarios sale sola al cerrar la cita.",
    burbujas: [
      "Solo comentarte q va todo cuadrado servicios y ventas de productos,  las boletas de honorarios ok y boletas de ventas de productos igual",
      "Sabes q con agendapro no logramos eso, ya q ellos tenían un desface y siempre me generaba descuadre al cierre del mes",
      "Vamos super bien 👍",
    ],
  },
  {
    local: "oren", autor: "Max", rol: "Administrador", fecha: "4 ago 2026",
    instagram: "orenbarbercl", destacado: true,
    contexto: "Dos sedes, en Mall Plaza Reñaca y Villa Alemana.",
    burbujas: [
      "Oye primero que todo, GRACIAS en mayúsculas .. has sido increíble con nosotros!",
      "2!! Te hemos pedido infinitas cosas y nos has ido dando tremendo soporte y cobertura!!",
      "… nos has hecho la vida infinitamente más fácil, cómoda y práctica? (Los cabros aman el servicio)",
    ],
  },
  {
    local: "clinicalglow", autor: "Tamara Bugueño", rol: "Dueña", fecha: "5 oct 2026",
    instagram: "clinical___glow", destacado: true,
    contexto: "Clínica estética en Viña del Mar.",
    burbujas: ["Jamás te cambiaré y te recomendaré por siempre"],
  },
  {
    local: "latincaribe", autor: "Gabriel", rol: "Administrador y barbero", fecha: "3 sep 2026",
    burbujas: ["Dale mi Hermano, yo le comenté y le dije que era una excelente aplicación y que me cambió la vida"],
  },
  {
    local: "viggomhc", autor: "Mikael Buitrago", rol: "Dueño", fecha: "12 sep 2026",
    burbujas: ["De resto todo funcionando muy bien 👍", "Me gusta mucho la IA en wsp", "Está muy pro"],
  },
  {
    local: "chameleon", autor: "Chameleon Barber Studio", rol: "Equipo del local", fecha: "20 may 2026",
    instagram: "chameleon.barberstudio",
    burbujas: ["De verdad que tenemos muy buenas espectativas con tu proyecto, te felicito porque está súper completo y das un excelente soporte"],
  },
  {
    local: "el10salonmasculino", autor: "Jorge A. Rosales", rol: "Dueño", fecha: "7 sep 2026",
    instagram: "el10salonmasculino_",
    burbujas: ["Crack Ignacio te seguiremos recomendando", "Eres una máquina amigo"],
  },
  {
    local: "estudioluxury", autor: "Matías", rol: "Dueño", fecha: "3 sep 2026",
    instagram: "estudio.luxury_",
    burbujas: ["Gracias a ti hno, siempre esta full la pagina"],
  },
  {
    local: "yugen", autor: "Yūgen Studio", rol: "Dueño", fecha: "2 sep 2026",
    instagram: "yugenstudio.cl",
    burbujas: ["Solo pasaba por aqui para decirte que el sistema es muy bueno, me tiene muy conforme"],
  },
  {
    local: "glowstudio", autor: "Nattier Fernández", rol: "Administradora", fecha: "22 sep 2026",
    instagram: "glow.salon_vina",
    burbujas: ["Pero después a tu siguiente cliente le cobras un millón porque será un programa increíble y completo 😉"],
  },
  {
    local: "kronnos_penablanca", autor: "Claudio Burgos", rol: "Dueño de Kronnos Studio (3 sedes)", fecha: "18 sep 2026",
    instagram: "kronnos.pb",
    burbujas: ["Gracias mi bro, feliz de verte crecer como empresa 💪🏻💪🏻"],
  },
  {
    local: "sionbarberia", autor: "Matías Mella", rol: "Dueño", fecha: "23 jul 2026",
    instagram: "studio.dieciseis_",
    burbujas: ["Bacan rey agradecido de tus servicios"],
  },
];

const BASE = new Map(LOCALES_BASE.map((l) => [l.id, l]));

function IconoIG() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Tarjeta({ t, nota }: { t: Testimonio; nota?: { rating: number; opiniones: number } }) {
  const l = BASE.get(t.local);
  if (!l) return null;
  const grande = !!t.destacado;
  return (
    <article className={`break-inside-avoid mb-5 rounded-[28px] overflow-hidden flex flex-col ${grande ? "bg-ink text-white" : "bg-white border border-border-subtle"}`}>
      <header className="flex items-center gap-3.5 p-5 sm:p-6 pb-0 sm:pb-0">
        <span className="w-12 h-12 shrink-0 rounded-full overflow-hidden ring-1 ring-black/10" style={{ backgroundColor: l.fondo }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/directorio-logos/${l.id}-pin.webp`} alt={`Logo de ${l.nombre}`} width={48} height={48} loading="lazy" className="w-full h-full object-contain" />
        </span>
        <span className="min-w-0">
          <span className={`block font-semibold leading-snug truncate ${grande ? "text-white" : "text-ink"}`}>{l.nombre}</span>
          <span className={`block text-[13px] ${grande ? "text-white/60" : "text-text-muted"}`}>
            {l.comuna}
            {nota && <> · <span className={grande ? "text-lime" : "text-ink font-semibold"}>★ {nota.rating.toFixed(1)}</span> en Google ({nota.opiniones})</>}
          </span>
        </span>
      </header>

      <blockquote className={`px-5 sm:px-6 pt-5 flex flex-col gap-2 ${grande ? "text-[17px] sm:text-[19px]" : "text-[15px]"}`}>
        {t.burbujas.map((b, i) => (
          <p key={i} className={`self-start max-w-full rounded-2xl rounded-tl-md px-4 py-2.5 leading-relaxed ${grande ? "bg-white/[0.08] text-white" : "bg-mist text-ink"}`}>
            {b}
          </p>
        ))}
      </blockquote>

      <div className="px-5 sm:px-6 pt-4">
        <p className={`text-[14px] ${grande ? "text-white" : "text-ink"}`}>
          <span className="font-semibold">{t.autor}</span>
          <span className={grande ? "text-white/60" : "text-text-muted"}> · {t.rol}</span>
        </p>
        <p className={`text-[12px] mt-0.5 ${grande ? "text-white/45" : "text-text-muted"}`}>Por WhatsApp, {t.fecha}</p>
        {t.contexto && <p className={`text-[14px] mt-3 leading-relaxed ${grande ? "text-white/70" : "text-text-secondary"}`}>{t.contexto}</p>}
      </div>

      <footer className="mt-auto flex flex-wrap gap-2 p-5 sm:p-6">
        {l.reserva && (
          <a href={l.url} target="_blank" rel="noopener"
            className={`inline-flex items-center gap-1.5 text-[13px] font-semibold px-3.5 py-2 rounded-full transition-colors ${grande ? "bg-lime text-ink hover:bg-white" : "bg-ink text-white hover:bg-black"}`}>
            Reservar en {l.nombre.split(" · ")[0]} →
          </a>
        )}
        {t.instagram && (
          <a href={`https://www.instagram.com/${t.instagram}/`} target="_blank" rel="noopener nofollow"
            className={`inline-flex items-center gap-1.5 text-[13px] font-semibold px-3.5 py-2 rounded-full border transition-colors ${grande ? "border-white/20 text-white hover:border-white" : "border-ink/15 text-ink hover:border-ink"}`}>
            <IconoIG /> @{t.instagram}
          </a>
        )}
      </footer>
    </article>
  );
}

export default async function Testimonials() {
  const vivos = await obtenerLocales();
  const notas = new Map(vivos.filter((l) => l.rating && (l.opiniones ?? 0) >= 5).map((l) => [l.id, { rating: l.rating!, opiniones: l.opiniones! }]));
  const destacados = TESTIMONIOS.filter((t) => t.destacado);
  const resto = TESTIMONIOS.filter((t) => !t.destacado);
  return (
    <section id="testimonios" className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mb-10 md:mb-12">
          <p className="eyebrow mb-4">Lo que dicen los locales</p>
          <h2 className="text-ink">Palabra por palabra, como nos lo escribieron.</h2>
          <p className="text-text-secondary text-lg mt-5 leading-relaxed">
            Mensajes reales de dueños y administradores, copiados tal cual de WhatsApp. Cada
            tarjeta lleva al Instagram del local y a su página de reservas.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-5 mb-5 items-start">
          {destacados.map((t) => <Tarjeta key={t.local + t.fecha} t={t} nota={notas.get(t.local)} />)}
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {resto.map((t) => <Tarjeta key={t.local + t.fecha} t={t} nota={notas.get(t.local)} />)}
        </div>
      </div>
    </section>
  );
}

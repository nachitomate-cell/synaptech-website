import Image from "next/image";
import Link from "next/link";
import { FAMILIAS, RUBROS } from "@/content/catalogo";

/* Footer grande al estilo Square: todo el catálogo enlazado. Productos y
   rubros salen de content/catalogo.ts, igual que el menú. */
const LINKS: Record<string, { l: string; h: string }[]> = {
  "Productos": FAMILIAS.map((f) => ({ l: f.nombre, h: `/#${f.id}` })),
  "Rubros":    RUBROS.map((r) => ({ l: r.nombre, h: `/#rubro-${r.id}` })),
  "Recursos":  [
    { l: "Cómo funciona", h: "/como-funciona" },
    { l: "Cápsulas en video", h: "/como-funciona#capsulas" },
    { l: "Precios", h: "/#precios" },
    { l: "Blog", h: "/blog" },
    { l: "Preguntas frecuentes", h: "/#faq" },
    { l: "Nosotros", h: "/nosotros" },
    { l: "Contacto", h: "/contacto" },
  ],
  /* SynapTech Studio, la app del dueño: publicada y distribuida en ambas
     tiendas (Play desde 2026-09-01, App Store id 6794530086 en cl/us/mx). */
  "La app":    [
    { l: "Google Play", h: "https://play.google.com/store/apps/details?id=cl.synaptechspa.studio" },
    { l: "App Store", h: "https://apps.apple.com/cl/app/synaptech-studio/id6794530086" },
  ],
  /* DIRECTORIO — el enlace que le faltaba a Google.
     Las cuatro paginas viven en app.synaptechspa.cl y hasta hoy no las
     enlazaba nadie: Google no conocia ese host (favicon 404) y por lo tanto
     tampoco llegaba a los subdominios de los locales, que cuelgan de ahi.
     Medido el 21-09-2026: buscando "barberia Villa Alemana reservar hora"
     AgendaPro ocupa 3 de los 10 resultados con paginas de directorio iguales
     a estas, y Kronnos Penablanca —341 citas al mes, en Villa Alemana— no
     aparece. El texto del enlace ES la palabra clave a proposito.

     Las rutas van RELATIVAS, a este mismo dominio. Al principio apuntaban a
     app.synaptechspa.cl y quedaron desalineadas cuando el canonical se mudo
     aca: Search Console mostraba "Pagina de referencia: no se ha detectado
     ninguna" para synaptechspa.cl/barberias-vina-del-mar, porque el unico
     enlace que existia apuntaba a la otra direccion. El rewrite de
     next.config.mjs trae el HTML; el enlace tiene que nombrar la URL que
     queremos indexada, no la que la sirve. */
  "Directorio": [
    { l: "Barberías en Viña del Mar",   h: "/barberias-vina-del-mar" },
    { l: "Peluquerías en Viña del Mar", h: "/peluquerias-vina-del-mar" },
    { l: "Barberías en la Quinta Región",   h: "/barberias-quinta-region" },
    { l: "Peluquerías en la Quinta Región", h: "/peluquerias-quinta-region" },
  ],
};

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-subtle">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(5,1fr)] gap-x-8 gap-y-10 mb-14">
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/assets/synaptech-icon.png" alt="" width={30} height={30} />
              <span className="font-display font-bold text-[19px] tracking-tight text-ink">SynapTech</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              Plataforma chilena de agenda online, cobros, fidelización y
              asistente con IA para locales de servicios.
            </p>
            <div className="text-sm text-text-secondary flex flex-col gap-1.5">
              <a href="mailto:hola@synaptechspa.cl" className="hover:text-ink">hola@synaptechspa.cl</a>
              <a href="tel:+56983568212" className="hover:text-ink">+56 9 8356 8212</a>
              <span className="text-text-muted">Viña del Mar, Valparaíso, Chile</span>
            </div>
            <div className="flex gap-2 mt-1">
              <a href="https://wa.me/56983568212" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-mist flex items-center justify-center text-ink hover:bg-lime transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a href="https://instagram.com/synaptechspa" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-mist flex items-center justify-center text-ink hover:bg-lime transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(LINKS).map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <h2 className="!text-[13px] !tracking-normal font-body font-bold text-ink mb-4">{heading}</h2>
              <ul className="flex flex-col gap-2.5">
                {links.map((l) => (
                  <li key={l.l}>
                    <a href={l.h} className="text-sm text-text-secondary hover:text-ink transition-colors">{l.l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-border-subtle pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-text-muted">
          <p>© {YEAR} Synaptech SpA · RUT 78.402.009-6</p>
          <div className="flex items-center gap-5">
            <a href="/privacidad" className="hover:text-ink">Privacidad</a>
            <a href="/terminos" className="hover:text-ink">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { obtenerLocales } from "@/lib/directorio";
import { zonasDirectorio } from "@/lib/precios";
import { PAGINAS_RUBRO } from "@/lib/paginas-directorio";

/* Enlazado interno del directorio (18-10-2026). Search Console decía "Página de
   referencia: no se ha detectado ninguna" para /locales/la-serena: la única que
   la enlazaba era /locales. Este bloque va en el footer de TODO el sitio y al
   pie de cada página del directorio, con <a href> reales (HTML del servidor):
   cada zona activa y cada página por rubro queda a un clic de la portada.
   Las zonas salen de los datos vivos, así que una zona nueva entra sola. */
export default async function EnlacesZonas({ actual, compacto = false }: { actual?: string; compacto?: boolean }) {
  const zonas = zonasDirectorio(await obtenerLocales().catch(() => []));
  const enlaces = [
    ...PAGINAS_RUBRO.map((p) => ({ href: `/${p.slug}`, nombre: p.h1, n: null as number | null })),
    ...zonas.map((z) => ({ href: `/locales/${z.slug}`, nombre: z.nombre, n: new Set(z.locales.map((l) => l.tid)).size })),
  ].filter((e) => e.href !== actual);
  if (!enlaces.length) return null;
  if (compacto) {
    return (
      <nav aria-label="Locales por zona" className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
        {enlaces.map((e) => <a key={e.href} href={e.href} className="text-text-secondary hover:text-ink">{e.nombre}</a>)}
        <a href="/locales" className="text-text-secondary hover:text-ink">Todos los locales</a>
      </nav>
    );
  }
  return (
    <nav aria-label="Locales por zona">
      <ul className="flex flex-wrap gap-2">
        {enlaces.map((e) => (
          <li key={e.href}>
            <a href={e.href} className="inline-flex border border-border-subtle rounded-full px-3.5 py-1.5 text-[14px] text-ink hover:border-ink">
              {e.nombre}{e.n != null && <span className="text-text-muted ml-1">{e.n}</span>}
            </a>
          </li>
        ))}
        <li><a href="/locales" className="inline-flex border border-border-subtle rounded-full px-3.5 py-1.5 text-[14px] text-ink hover:border-ink">Todos los locales</a></li>
      </ul>
    </nav>
  );
}

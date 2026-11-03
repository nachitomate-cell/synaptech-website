import Link from "next/link";
import Aparece from "@/components/Aparece";
import { fmt, type ServicioCrecer } from "@/content/precios";
import { waLink } from "@/content/catalogo";
import type { Miga } from "@/lib/ld";

/* Piezas de las landings de planes y servicios (01-11-2026):
   /agenda-barbero-independiente, /boletas-electronicas-sii,
   /pagina-web-para-barberias, /google-ads-para-barberias,
   /publicidad-instagram-facebook-barberias e /integraciones.
   Todo se pinta en el servidor (texto completo en el HTML). */

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Migas({ migas }: { migas: Miga[] }) {
  return (
    <nav aria-label="Ruta" className="text-sm text-text-muted mb-6">
      <Link href="/" className="hover:text-ink">Inicio</Link>
      {migas.map((m, i) => (
        <span key={m.path}>
          {" "}<span aria-hidden>›</span>{" "}
          {i === migas.length - 1 ? <span>{m.nombre}</span> : <Link href={m.path} className="hover:text-ink">{m.nombre}</Link>}
        </span>
      ))}
    </nav>
  );
}

export function HeroLanding({ migas, eyebrow, h1, bajada, children }: { migas: Miga[]; eyebrow: string; h1: string; bajada: string; children?: React.ReactNode }) {
  return (
    <section className="pt-28 md:pt-36 pb-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <Migas migas={migas} />
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 className="text-ink max-w-4xl !text-[clamp(2.3rem,4.6vw,4rem)]">{h1}</h1>
        <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">{bajada}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export const BOTON = "inline-flex justify-center items-center text-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors";
export const BOTON_BORDE = "inline-flex justify-center items-center text-center border border-ink/15 bg-white text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors";

export function Puntos({ eyebrow, titulo, bajada, items, fondo = false, columnas = 3 }: {
  eyebrow?: string; titulo: string; bajada?: string; items: { t: string; d: string }[]; fondo?: boolean; columnas?: 2 | 3;
}) {
  return (
    <section className={`py-16 md:py-24 ${fondo ? "bg-mist" : ""}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <Aparece className="max-w-3xl mb-10">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h2 className="text-ink">{titulo}</h2>
          {bajada && <p className="text-text-secondary text-lg mt-5 leading-relaxed">{bajada}</p>}
        </Aparece>
        <div className={`grid sm:grid-cols-2 ${columnas === 3 ? "lg:grid-cols-3" : ""} gap-5`}>
          {items.map((x, i) => (
            <Aparece key={x.t} delay={(i % columnas) * 0.08} className="h-full">
              <article className={`h-full rounded-[24px] p-6 sm:p-7 ${fondo ? "bg-white" : "border border-border-subtle"}`}>
                <h3 className="font-display font-bold text-ink text-xl tracking-tight">{x.t}</h3>
                <p className="text-text-secondary mt-2 leading-relaxed">{x.d}</p>
              </article>
            </Aparece>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Tarjeta de un servicio de Crecer, con su botón a WhatsApp. */
export function TarjetaServicio({ s, destacado = false }: { s: ServicioCrecer; destacado?: boolean }) {
  return (
    <article id={`servicio-${s.id}`} className={`rounded-[28px] p-7 sm:p-8 flex flex-col scroll-mt-24 ${destacado ? "bg-ink text-white" : "bg-white border border-border-subtle"}`}>
      <h3 className="font-display font-bold text-2xl tracking-tight">{s.nombre}</h3>
      <p className="mt-4">
        <span className="font-display font-bold text-[36px] tracking-tight leading-none">{fmt(s.mes)}</span>
        <span className={`text-sm ml-1 ${destacado ? "text-white/60" : "text-text-muted"}`}>+ IVA / mes</span>
      </p>
      <p className={`mt-4 leading-relaxed ${destacado ? "text-white/80" : "text-text-secondary"}`}>{s.desc}</p>
      <ul className="mt-5 flex flex-col gap-2 flex-1">
        {s.incluye.map((x) => (
          <li key={x} className="flex gap-2.5 text-[15px]">
            <svg className={`w-5 h-5 shrink-0 mt-0.5 ${destacado ? "text-lime" : "text-accent"}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {x}
          </li>
        ))}
      </ul>
      <a href={waLink(`Hola, quiero sumar ${s.nombre} a mi plan de SynapTech`)} target="_blank" rel="noopener noreferrer"
        className={`mt-7 inline-flex justify-center items-center font-semibold px-6 py-3.5 rounded-full transition-colors ${destacado ? "bg-lime text-ink hover:bg-white" : "bg-ink text-white hover:bg-black"}`}>
        Quiero {s.nombre}
      </a>
    </article>
  );
}

export function Relacionados({ titulo = "También te puede servir", links }: { titulo?: string; links: { texto: string; href: string }[] }) {
  return (
    <section className="pb-16 md:pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <p className="font-semibold text-ink mb-4">{titulo}</p>
        <ul className="flex flex-wrap gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex px-4 py-2 rounded-full bg-mist text-[14px] font-semibold text-text-secondary hover:bg-lime/30 hover:text-ink transition-colors">{l.texto}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Nota de servicio gestionado: la inversión la paga el local. */
export function NotaInversion() {
  return (
    <p className="text-sm text-text-muted mt-5 max-w-3xl">
      Precios netos en pesos chilenos; se suma IVA. La inversión publicitaria (lo que se gasta en anuncios) la pagas tú directo
      a Google o a Meta, con tu tarjeta, y la decides tú. Sin permanencia: lo dejas cuando quieras.
    </p>
  );
}

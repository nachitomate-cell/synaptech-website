import Link from "next/link";
import Aparece from "@/components/Aparece";
import { TIPOS_AGENCIA } from "@/content/agencias-tipos";

/* Enlaces a las páginas de agencias y equipos de venta (09-11-2026): cada tipo
   de agencia, el agente omnicanal y el CRM de WhatsApp. Server component a
   propósito: los enlaces salen en el HTML para que Google y los buscadores con
   IA los sigan.
   - "tarjetas": la sección "Para todo tipo de agencia" (/agencias y cada tipo).
   - "franja": una línea de enlaces (portada, /empresas, /asistente-ia-whatsapp). */

export const PAGINAS_VENTAS = [
  { href: "/agente-ia-omnicanal", nombre: "Agente de IA omnicanal", resumen: "WhatsApp e Instagram en una sola bandeja, con tu equipo." },
  { href: "/crm-whatsapp", nombre: "CRM de WhatsApp", resumen: "Embudo, cartera por vendedor, cierre y comisiones." },
];

export default function EnlacesAgencias({
  variante = "tarjetas",
  eyebrow = "Para todo tipo de agencia",
  titulo = "Lo mismo, para cada tipo de agencia.",
  bajada,
  excluir,
  fondo = "",
}: {
  variante?: "tarjetas" | "franja";
  eyebrow?: string;
  titulo?: string;
  bajada?: string;
  excluir?: string;
  fondo?: string;
}) {
  const tipos = TIPOS_AGENCIA.filter((t) => t.slug !== excluir);

  if (variante === "franja") {
    return (
      <section className={`py-12 md:py-16 ${fondo}`}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="rounded-[28px] border border-border-subtle p-6 sm:p-8">
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h2 className="text-ink !text-[clamp(1.4rem,2.6vw,2rem)]">{titulo}</h2>
            {bajada && <p className="text-text-secondary mt-3 leading-relaxed max-w-3xl">{bajada}</p>}
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {[...PAGINAS_VENTAS.map((p) => ({ href: p.href, texto: p.nombre, fuerte: true })),
                { href: "/agencias", texto: "Agencias de turismo", fuerte: false },
                ...tipos.filter((t) => t.slug !== "tours-y-excursiones").map((t) => ({ href: `/agencias/${t.slug}`, texto: t.etiqueta, fuerte: false })),
              ].map((l) => (
                <li key={l.href} className="max-w-full">
                  <Link href={l.href}
                    className={`inline-flex max-w-full px-4 py-2 rounded-full text-[15px] font-semibold transition-colors ${
                      l.fuerte ? "bg-ink text-white hover:bg-black" : "bg-mist text-ink hover:bg-lime/40"}`}>
                    {l.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tipos-de-agencia" className={`py-16 md:py-24 scroll-mt-20 ${fondo}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <Aparece className="max-w-3xl mb-10">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="text-ink">{titulo}</h2>
          {bajada && <p className="text-text-secondary text-lg mt-5 leading-relaxed">{bajada}</p>}
        </Aparece>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tipos.map((t) => (
            <Link key={t.slug} href={`/agencias/${t.slug}`}
              className="group rounded-[24px] bg-white border border-border-subtle p-6 flex flex-col hover:border-ink transition-colors">
              <h3 className="font-display font-bold text-ink text-lg leading-snug tracking-tight">{t.nombre}</h3>
              <p className="text-text-secondary text-[15px] leading-relaxed mt-2 flex-1">{t.resumen}</p>
              <span className="text-sm font-semibold text-ink mt-4">Ver cómo funciona <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
            </Link>
          ))}
        </div>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {PAGINAS_VENTAS.map((p) => (
            <Link key={p.href} href={p.href}
              className="group rounded-[24px] bg-ink text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-black transition-colors">
              <span className="min-w-0">
                <span className="block font-display font-bold text-lg tracking-tight">{p.nombre}</span>
                <span className="block text-white/70 text-[15px] mt-1">{p.resumen}</span>
              </span>
              <span aria-hidden className="text-lime text-xl transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

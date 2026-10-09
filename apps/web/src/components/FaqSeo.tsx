import { faqJsonLd } from "@/lib/seo";

/* Preguntas frecuentes de una página de rubro, con su FAQPage en JSON-LD.
   Las preguntas salen de lo que la gente busca en Google (autocompletado de
   Chile, devtools/guias-panel/sitio-web/seo/mapa-keywords-2026-10-09.md) y las
   respuestas solo afirman lo que la plataforma hace hoy. */
export type Pregunta = { q: string; a: string };

export default function FaqSeo({ titulo, preguntas }: { titulo: string; preguntas: Pregunta[] }) {
  return (
    <section className="py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(preguntas)) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="eyebrow mb-4">Preguntas frecuentes</p>
        <h2 className="text-ink mb-8">{titulo}</h2>
        <div className="divide-y divide-border-subtle border-y border-border-subtle">
          {preguntas.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-6 font-semibold text-ink text-lg">
                <h3 className="!text-lg !leading-snug !tracking-normal font-semibold">{f.q}</h3>
                <span className="text-2xl text-text-muted transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="text-text-secondary leading-relaxed mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

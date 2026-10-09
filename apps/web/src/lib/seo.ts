import type { Metadata } from "next";

/* Metadata de cada página (09-10-2026, auditoría SEO).
   - Dominio canónico: www (el apex redirige ahí).
   - Title ≤ 60 caracteres y description ≤ 155: Google corta lo demás. Las
     keywords salen de devtools/guias-panel/sitio-web/seo/mapa-keywords-2026-10-09.md.
   - og:title / og:description / twitter propios de cada página: antes todas
     heredaban los del layout y al compartir cualquier URL salía el de la home. */
export const SITIO = "https://www.synaptechspa.cl";

export function metaPagina({ title, description, path, noindex = false, imagen = "/og-image.png" }: {
  title: string; description: string; path: string; noindex?: boolean; imagen?: string;
}): Metadata {
  const url = `${SITIO}${path === "/" ? "" : path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website", locale: "es_CL", siteName: "SynapTech", url, title, description,
      images: [{ url: `${SITIO}${imagen}`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${SITIO}${imagen}`] },
  };
}

/* JSON-LD de preguntas frecuentes, para las páginas que las muestran en pantalla
   (Google exige que el texto del FAQPage sea el mismo que ve el visitante). */
export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

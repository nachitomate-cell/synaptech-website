import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog — Software, IA y Automatización | SynapTech SpA",
  description: "Artículos sobre desarrollo de software a medida, automatización y transformación digital para empresas en Chile.",
  alternates: { canonical: "https://synaptechspa.cl/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-bg-primary pt-28 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-16">
          <p className="eyebrow mb-5">Blog</p>
          <h1 className="text-text-primary max-w-2xl">
            Tecnología que{" "}
            <em className="italic text-accent font-display">transforma</em>{" "}
            negocios.
          </h1>
          <p className="mt-5 text-text-secondary text-lg max-w-xl leading-relaxed font-body">
            Artículos sobre software a medida, automatización e inteligencia artificial
            aplicada a empresas B2B en Chile.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-bg-secondary border border-border-subtle rounded-2xl p-8
                hover:border-accent/30 hover:-translate-y-1 transition-all duration-200"
            >
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest mb-3">
                {post.category}
              </span>
              <h2 className="font-display text-lg font-semibold text-text-primary leading-snug mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-5">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-subtle">
                <span className="font-mono text-[11px] text-text-muted">{formatDate(post.date)}</span>
                <span className="font-mono text-[11px] text-text-muted">{post.readTime} min</span>
              </div>
              <span className="mt-4 font-mono text-xs text-accent group-hover:gap-2 flex items-center gap-1.5 transition-all">
                Leer artículo
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center border border-border-subtle rounded-2xl p-12 bg-bg-secondary">
          <p className="eyebrow mb-4">¿Lo pruebas?</p>
          <h2 className="text-text-primary mb-6 max-w-lg mx-auto">
            Conversemos sobre{" "}
            <em className="italic text-accent font-display">tu desafío</em>.
          </h2>
          <a
            href="https://empieza.synaptechspa.cl"
            className="inline-flex items-center gap-2 bg-accent text-black font-bold text-sm px-7 py-3.5 rounded-lg shadow-lime hover:bg-accent-dim hover:text-white hover:scale-[1.02] transition-all"
          >
            Pruébala gratis
          </a>
        </div>
      </div>
    </main>
  );
}

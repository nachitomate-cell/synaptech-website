import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/content/blog";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | SynapTech SpA`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `https://synaptechspa.cl/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://synaptechspa.cl/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      siteName: "SynapTech SpA",
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "SynapTech SpA" },
    publisher: { "@type": "Organization", name: "SynapTech SpA", url: "https://synaptechspa.cl" },
    mainEntityOfPage: `https://synaptechspa.cl/blog/${post.slug}`,
  };

  return (
    <main className="min-h-screen bg-bg-primary pt-28 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted mb-10">
          <Link href="/" className="hover:text-accent transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text-primary truncate max-w-[200px]">{post.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">

          {/* Main */}
          <div>
            {/* Article header */}
            <span className="font-mono text-[11px] text-accent uppercase tracking-widest mb-4 block">
              {post.category}
            </span>
            <h1 className="text-text-primary text-3xl md:text-4xl font-display font-bold leading-tight mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}>
              {post.title}
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed mb-8 font-body max-w-2xl">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 font-mono text-[11px] text-text-muted mb-12 pb-8 border-b border-border-subtle">
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime} min de lectura</span>
            </div>

            {/* Body */}
            <article
              className="prose-blog"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />

            {/* Related posts */}
            {related.length > 0 && (
              <div className="mt-16 pt-8 border-t border-border-subtle">
                <p className="font-mono text-[11px] text-text-muted uppercase tracking-widest mb-6">Más artículos</p>
                <div className="flex flex-col gap-4">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`}
                      className="group flex items-start gap-4 p-4 rounded-xl border border-border-subtle hover:border-accent/30 transition-all">
                      <div>
                        <span className="font-mono text-[10px] text-accent uppercase tracking-widest">{r.category}</span>
                        <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors mt-1 leading-snug">
                          {r.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-24 self-start">
            <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-6">
              <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-4">Sobre este artículo</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Categoría", value: post.category },
                  { label: "Publicado", value: formatDate(post.date) },
                  { label: "Lectura", value: `${post.readTime} minutos` },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider">{label}</p>
                    <p className="text-sm text-text-primary mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
              <p className="font-mono text-[10px] text-accent uppercase tracking-widest mb-3">¿Tienes un proyecto?</p>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                Cuéntanos tu desafío. En 48 horas hábiles te enviamos una propuesta con alcance y rango de inversión.
              </p>
              <a
                href="/#diagnostico"
                className="block text-center bg-accent text-black font-bold text-xs px-5 py-3 rounded-lg hover:bg-accent-dim hover:text-white transition-all"
              >
                Pruébala gratis
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import Hilo     from "@/components/Hilo";
import CtaFinal from "@/components/CtaFinal";
import { HILOS } from "@/content/comparar";
import { waLink } from "@/content/catalogo";
import Link from "next/link";
import { COMPETIDORES } from "@/content/competidores";
import { MarcaCompetidor } from "@/components/MarcaCompetidor";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  title: "Comparar agendas: AgendaPro, Fresha, WeiBook y más",
  description: "SynapTech frente a AgendaPro, WeiBook, AgendaYA, Fresha, Reservo y otras agendas: precios según tu equipo, WhatsApp, IA y boletas, con fuente y fecha.",
  path: "/comparar",
});

/* Comparaciones "tipo foro" (09-10-2026). Las preguntas y sus reglas están en
   content/comparar.ts: nada de usuarios inventados y cada dato de otra empresa
   con fuente y fecha. */
export default function CompararPage() {
  const etiquetas = Array.from(new Set(HILOS.flatMap((h) => h.etiquetas)));
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-10">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">Comparaciones</p>
            <h1 className="text-ink max-w-4xl">Comparar agendas online: lo que nos preguntan antes de cambiarse.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
              SynapTech frente a otras agendas y frente a WhatsApp, el cuaderno y la planilla.
              Cada dato dice de dónde sale y en qué fecha lo revisamos.
            </p>
            <div className="flex flex-wrap gap-2 mt-7">
              {etiquetas.map((e) => (
                <span key={e} className="px-3 py-1.5 rounded-full bg-mist text-[13px] font-semibold text-text-secondary">{e}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Una página por agenda (content/competidores.ts) */}
        <section className="pb-12">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="font-semibold text-ink mb-4">Compara con la agenda que usas hoy</p>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 m-0 p-0 list-none">
              {COMPETIDORES.map((c) => (
                <li key={c.id}>
                  <Link href={`/comparar/${c.id}`} className="group flex flex-col justify-between h-full rounded-[20px] border border-border-subtle bg-white p-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
                    <span className="h-10 flex items-center">
                      <MarcaCompetidor c={c} chico />
                    </span>
                    <span className="mt-3 text-[14px] font-semibold text-ink">{c.nombre} vs SynapTech <span className="text-accent group-hover:ml-1 transition-all">→</span></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Índice de hilos, como la portada de un foro */}
        <section className="pb-12">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <ol className="rounded-[24px] border border-border-subtle divide-y divide-border-subtle overflow-hidden">
              {HILOS.map((h, i) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="flex items-start gap-4 p-4 sm:p-5 hover:bg-mist/60 transition-colors">
                    <span className="font-display font-bold text-text-muted w-6 shrink-0 tabular-nums">{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink leading-snug">{h.pregunta}</span>
                      <span className="block text-[13px] text-text-muted mt-1">{h.etiquetas.join(" · ")}</span>
                    </span>
                    <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 text-[13px] text-accent font-semibold">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      Respondida
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 space-y-8">
            {HILOS.map((h) => <Hilo key={h.id} h={h} />)}
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="rounded-[24px] bg-ink text-white p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
              <div>
                <p className="font-display font-bold text-2xl tracking-tight">¿Tienes otra pregunta, o un dato cambió?</p>
                <p className="text-white/70 mt-2">Escríbenos: la respondemos y, si sirve a otros locales, la sumamos acá.</p>
              </div>
              <a href={waLink("Hola, tengo una pregunta para comparar SynapTech con lo que uso hoy")} target="_blank" rel="noopener noreferrer"
                className="shrink-0 inline-flex justify-center items-center bg-lime text-ink font-semibold px-6 py-3.5 rounded-full hover:bg-white transition-colors">
                Preguntar por WhatsApp
              </a>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

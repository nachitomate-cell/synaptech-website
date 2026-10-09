import type { Metadata } from "next";
import Header      from "@/components/Header";
import Footer      from "@/components/Footer";
import Recorrido   from "@/components/Recorrido";
import CtaFinal    from "@/components/CtaFinal";
import { FilaCapsulas } from "@/components/Capsulas";
import { MODULOS } from "@/content/recorrido";

export const metadata: Metadata = {
  title: "Cómo funciona SynapTech | Agenda, asistente IA, caja, comisiones y club paso a paso",
  description: "Recorre módulo por módulo, con capturas reales del panel, cómo funciona SynapTech: agenda, reserva online, asistente con IA por WhatsApp, caja, comisiones, club de fidelización y métricas. Incluye cápsulas en video.",
  alternates: { canonical: "https://synaptechspa.cl/como-funciona" },
};

export default function ComoFunciona() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-10 md:pb-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">Cómo funciona</p>
            <h1 className="text-ink max-w-4xl">Módulo por módulo, en pantallas reales.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
              Baja y mira qué hace cada parte del panel, punto por punto. Al final de cada
              módulo hay una cápsula en video de menos de dos minutos.
            </p>
            <p className="text-sm text-text-muted mt-4">
              Capturas del panel con un local de ejemplo y datos inventados.
            </p>
          </div>
        </section>

        {/* Índice de módulos, fijo bajo el menú mientras se baja */}
        <nav aria-label="Módulos" className="sticky top-16 z-40 bg-white/95 backdrop-blur border-y border-border-subtle">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
            {MODULOS.map((m) => (
              <a key={m.id} href={`#${m.id}`}
                className="shrink-0 px-4 py-2 rounded-full bg-mist text-[14px] font-semibold text-text-secondary hover:text-ink hover:bg-lime/30 transition-colors">
                {m.nombre}
              </a>
            ))}
            <a href="#capsulas" className="shrink-0 px-4 py-2 rounded-full bg-ink text-white text-[14px] font-semibold">▶ Cápsulas</a>
          </div>
        </nav>

        {MODULOS.map((m, i) => (
          <section key={m.id} id={m.id} className={`py-16 md:py-24 scroll-mt-32 ${i % 2 ? "bg-mist" : ""}`}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <div className="max-w-3xl mb-8 md:mb-4">
                <p className="eyebrow mb-3">{String(i + 1).padStart(2, "0")} · {m.nombre}</p>
                <h2 className="text-ink">{m.titular}</h2>
                <p className="text-text-secondary text-lg mt-4 leading-relaxed">{m.bajada}</p>
              </div>
              <Recorrido modulo={m} />
              {m.capsulas.length > 0 && (
                <div className="mt-12">
                  <p className="font-semibold text-ink mb-4">Míralo en video</p>
                  <FilaCapsulas ids={m.capsulas} />
                </div>
              )}
            </div>
          </section>
        ))}

        <section id="capsulas" className="py-16 md:py-24 border-t border-border-subtle scroll-mt-32">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-3">Cápsulas</p>
              <h2 className="text-ink">Todo en video, en menos de dos minutos.</h2>
              <p className="text-text-secondary text-lg mt-4 leading-relaxed">
                Grabadas sobre el panel de verdad. Tócalas para verlas.
              </p>
            </div>
            <FilaCapsulas />
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

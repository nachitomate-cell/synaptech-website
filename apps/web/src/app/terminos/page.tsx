import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Servicio — Synaptech SpA",
  description: "Términos y condiciones de uso del sitio web y servicios de Synaptech SpA.",
};

export default function Terminos() {
  return (
    <main className="min-h-screen bg-bg-primary pt-28 pb-24">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-[11px] text-text-muted hover:text-accent transition-colors mb-10">
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 8H3M7 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Volver al inicio
        </Link>

        <h1 className="text-text-primary mb-4">Términos de Servicio</h1>
        <p className="font-mono text-[11px] text-text-muted mb-12">Última actualización: mayo 2026</p>

        <div className="font-body text-text-secondary leading-relaxed space-y-8">
          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">1. Aceptación de los términos</h2>
            <p>
              Al acceder y utilizar el sitio web synaptechspa.cl, aceptas quedar vinculado por estos
              términos de servicio. Si no estás de acuerdo, te pedimos que no utilices el sitio.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">2. Descripción del servicio</h2>
            <p>
              Synaptech SpA es una empresa chilena de desarrollo de software a medida, inteligencia
              artificial y automatización de procesos para empresas B2B. Este sitio web tiene como
              propósito presentar nuestros servicios y facilitar el contacto inicial con potenciales clientes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">3. Uso del sitio</h2>
            <p>
              El contenido de este sitio es de carácter informativo. El diagnóstico gratuito es una
              herramienta de evaluación preliminar y no constituye compromiso contractual de ninguna
              parte. Cualquier acuerdo de servicios debe formalizarse mediante contrato escrito.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">4. Propiedad intelectual</h2>
            <p>
              Todo el contenido de este sitio —textos, diseños, logotipos, imágenes y código— es
              propiedad de Synaptech SpA o de sus respectivos titulares. Queda prohibida su reproducción
              sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">5. Limitación de responsabilidad</h2>
            <p>
              Synaptech SpA no garantiza que el sitio esté libre de errores o interrupciones. La
              información publicada se entrega de buena fe y puede cambiar sin previo aviso. No somos
              responsables por decisiones tomadas basadas exclusivamente en el contenido de este sitio.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">6. Ley aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de la República de Chile. Cualquier disputa será
              sometida a la jurisdicción de los tribunales de la ciudad de Viña del Mar, Chile.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">7. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con estos términos, escríbenos a{" "}
              <a href="mailto:hola@synaptech.cl" className="text-accent hover:underline">hola@synaptech.cl</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

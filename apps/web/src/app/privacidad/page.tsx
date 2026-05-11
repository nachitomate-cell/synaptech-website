import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — Synaptech SpA",
  description: "Política de privacidad y tratamiento de datos personales de Synaptech SpA, conforme a la Ley 19.628 de Chile.",
};

export default function Privacidad() {
  return (
    <main className="min-h-screen bg-bg-primary pt-28 pb-24">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-[11px] text-text-muted hover:text-accent transition-colors mb-10">
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 8H3M7 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Volver al inicio
        </Link>

        <h1 className="text-text-primary mb-4">Política de Privacidad</h1>
        <p className="font-mono text-[11px] text-text-muted mb-12">Última actualización: mayo 2026</p>

        <div className="prose prose-invert max-w-none font-body text-text-secondary leading-relaxed space-y-8">
          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">1. Responsable del tratamiento</h2>
            <p>
              Synaptech SpA, RUT 78402009-6, con domicilio en Viña del Mar, Región de Valparaíso, Chile.
              Correo de contacto: <a href="mailto:hola@synaptech.cl" className="text-accent hover:underline">hola@synaptech.cl</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">2. Datos que recopilamos</h2>
            <p>A través del formulario de diagnóstico y contacto recopilamos:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Nombre de la empresa</li>
              <li>Teléfono (opcional)</li>
              <li>Descripción del proyecto o desafío</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">3. Finalidad del tratamiento</h2>
            <p>
              Los datos se utilizan exclusivamente para responder a tu consulta, evaluar si existe encaje con
              nuestros servicios y, en caso afirmativo, preparar una propuesta comercial. No utilizamos los
              datos para fines distintos a los indicados sin consentimiento expreso.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">4. Base legal</h2>
            <p>
              El tratamiento de datos se ampara en la Ley Nº 19.628 sobre Protección de la Vida Privada de
              Chile. Los datos se tratan con base en el consentimiento del titular, manifestado al completar
              y enviar el formulario de contacto.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">5. Almacenamiento y seguridad</h2>
            <p>
              Los datos se almacenan en servidores con encriptación en tránsito (TLS) y en reposo.
              Aplicamos medidas técnicas y organizativas para proteger la información contra accesos
              no autorizados, pérdida o destrucción.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">6. Derechos del titular</h2>
            <p>
              De acuerdo con la Ley 19.628, tienes derecho a acceder, rectificar, cancelar u oponerte
              al tratamiento de tus datos personales. Para ejercer estos derechos escríbenos a{" "}
              <a href="mailto:hola@synaptech.cl" className="text-accent hover:underline">hola@synaptech.cl</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">7. Compartición con terceros</h2>
            <p>
              No vendemos ni cedemos datos personales a terceros. Podemos compartir datos con proveedores
              de servicios tecnológicos (hosting, correo) únicamente en la medida necesaria para operar
              el servicio, bajo acuerdos de confidencialidad.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">8. Cookies</h2>
            <p>
              Este sitio puede utilizar cookies técnicas necesarias para su funcionamiento. No utilizamos
              cookies de seguimiento o publicidad de terceros.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">9. Cambios a esta política</h2>
            <p>
              Nos reservamos el derecho a actualizar esta política. Los cambios relevantes serán
              comunicados en esta misma página con indicación de la fecha de actualización.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { metaPagina } from "@/lib/seo";

/* Página de exclusión ("opt-out") para los locales: Google Actions Center exige
   que el socio ofrezca a cada comercio un enlace donde pedir que su local no
   aparezca en las reservas iniciadas desde Google (policies/compliance-requirements).
   Va en Configuration › Brands › Opt-Out URL del portal. noindex: es un trámite
   para locales, no una página de marketing (24-10-2026). */
export const metadata = metaPagina({
  title: "Reservas desde Google: cómo excluir tu local | SynapTech",
  description: "Si tu local usa SynapTech y no quieres que tus clientes inicien la reserva desde Google Search o Google Maps, aquí te explicamos cómo pedirlo.",
  path: "/reservas-google/salir",
  noindex: true,
});

export default function SalirReservasGoogle() {
  return (
    <main className="min-h-screen bg-bg-primary pt-28 pb-24">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-[11px] text-text-muted hover:text-accent transition-colors mb-10">
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 8H3M7 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Volver al inicio
        </Link>

        <h1 className="text-text-primary mb-4">Reservas desde Google: excluir tu local</h1>
        <p className="font-mono text-[11px] text-text-muted mb-12">Para locales que usan SynapTech</p>

        <div className="prose prose-invert max-w-none font-body text-text-secondary leading-relaxed space-y-8">
          <section>
            <p>
              Los locales que agendan con SynapTech pueden recibir reservas iniciadas desde Google Search y
              Google Maps: el cliente toca el botón de reserva en la ficha del local y llega directo a su
              agenda en SynapTech para elegir servicio, profesional y horario.
            </p>
            <p>
              Si tu local no quiere recibir reservas de esa forma, lo puedes pedir en cualquier momento y sin costo.
              Tu agenda, tu página de reservas y el resto de la plataforma siguen funcionando igual.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">Cómo pedirlo</h2>
            <p>
              Escríbenos a{" "}
              <a href="mailto:hola@synaptechspa.cl?subject=Excluir%20mi%20local%20de%20las%20reservas%20desde%20Google" className="text-accent hover:underline">hola@synaptechspa.cl</a>{" "}
              desde el correo del administrador del local, con:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>El nombre del local y su dirección.</li>
              <li>Que quieres excluirlo de las reservas iniciadas desde Google.</li>
            </ul>
            <p className="mt-4">
              Te confirmamos por correo dentro de 1 día hábil. El cambio se aplica en nuestra próxima
              actualización diaria y Google puede tardar unos días más en reflejarlo en la ficha.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary mb-3">Volver a activarlo</h2>
            <p>
              Si después cambias de opinión, escríbenos al mismo correo y lo volvemos a activar.
            </p>
          </section>

          <section>
            <p className="text-xs text-text-muted">
              Google, Google Search y Google Maps son marcas de Google LLC.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

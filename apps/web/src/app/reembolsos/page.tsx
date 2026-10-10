import Link from "next/link";
import { metaPagina } from "@/lib/seo";

export const metadata = metaPagina({
  title: "Política de reembolsos y cancelación | SynapTech",
  description: "Cómo cancelar tu suscripción a SynapTech y cuándo te devolvemos el dinero. Synaptech SpA (RUT 78.402.009-6).",
  path: "/reembolsos",
});

const h2 = "font-display text-lg font-semibold text-text-primary mb-3";

export default function Reembolsos() {
  return (
    <main className="min-h-screen bg-bg-primary pt-28 pb-24">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-[11px] text-text-muted hover:text-accent transition-colors mb-10">
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 8H3M7 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Volver al inicio
        </Link>

        <h1 className="text-text-primary mb-4">Política de reembolsos y cancelación</h1>
        <p className="font-mono text-[11px] text-text-muted mb-12">Última actualización: octubre 2026</p>

        <div className="font-body text-text-secondary leading-relaxed space-y-8">
          <section>
            <p>
              SynapTech es una plataforma de agenda, fidelización y asistente con IA para barberías, salones y
              centros de estética, operada por Synaptech SpA (RUT 78.402.009-6), y se contrata como una
              suscripción mensual o anual por local. Esta política explica cómo cancelar y cuándo te
              devolvemos lo que pagaste.
            </p>
          </section>

          <section>
            <h2 className={h2}>1. Período de prueba gratis</h2>
            <p>
              Si tu plan incluye un período de prueba gratis, no se cobra nada durante ese período. Puedes
              cancelar en cualquier momento antes de que termine y no pagarás nada.
            </p>
          </section>

          <section>
            <h2 className={h2}>2. Cancelación, sin permanencia</h2>
            <p>
              Puedes cancelar tu suscripción cuando quieras, desde tu panel o escribiéndonos a{" "}
              <a href="mailto:hola@synaptechspa.cl" className="text-accent hover:underline">hola@synaptechspa.cl</a>.
              No hay contrato de permanencia ni multa por cancelar. Al cancelar, la suscripción no se renueva
              y mantienes el acceso hasta el final del período que ya pagaste.
            </p>
          </section>

          <section>
            <h2 className={h2}>3. Garantía de 14 días</h2>
            <p>
              Si no quedaste conforme, te devolvemos el 100% de tu <strong>primer pago</strong> de una
              suscripción (mensual o anual) si lo pides dentro de los 14 días siguientes a ese cobro.
            </p>
          </section>

          <section>
            <h2 className={h2}>4. Después de los 14 días</h2>
            <p>
              Pasados los 14 días no hacemos reembolsos proporcionales por el período en curso: la
              cancelación rige al final de ese período. Siempre devolvemos el dinero, sin importar el
              plazo, cuando hubo un error de cobro o un cobro duplicado, y en los casos que exija la ley
              aplicable.
            </p>
          </section>

          <section>
            <h2 className={h2}>5. Cómo pedir un reembolso</h2>
            <p>
              Escríbenos a{" "}
              <a href="mailto:hola@synaptechspa.cl" className="text-accent hover:underline">hola@synaptechspa.cl</a>{" "}
              o por WhatsApp al +56 9 8356 8212 con el nombre de tu local y el correo con que pagaste.
              Respondemos dentro de 2 días hábiles. El reembolso vuelve al mismo medio de pago; el plazo en
              que se ve reflejado depende de tu banco (normalmente entre 5 y 10 días hábiles).
            </p>
          </section>

          <section>
            <h2 className={h2}>6. Pagos procesados por Paddle</h2>
            <p>
              Los pagos de clientes fuera de Chile los procesa Paddle.com, que actúa como revendedor
              autorizado (Merchant of Record) de SynapTech. En esos casos el reembolso se hace a través de
              Paddle y, además de esta política, aplican los{" "}
              <a href="https://www.paddle.com/legal/invoiced-consumer-terms" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">términos de compra de Paddle</a>.
            </p>
          </section>

          <section>
            <h2 className={h2}>7. Más información</h2>
            <p>
              Las condiciones completas del servicio están en el{" "}
              <a href="https://app.synaptechspa.cl/terminos-saas.html" className="text-accent hover:underline">contrato de servicio SaaS</a>{" "}
              y el tratamiento de datos en nuestra <Link href="/privacidad" className="text-accent hover:underline">política de privacidad</Link>.
            </p>
          </section>

          <section lang="en" className="border-t border-border-subtle pt-8">
            <h2 className={h2}>Refund and cancellation policy (summary in English)</h2>
            <p>
              SynapTech is a subscription SaaS (monthly or annual, per location) operated by Synaptech SpA,
              Chile. Free trials are never charged and can be cancelled at any time. You can cancel your
              subscription at any time with no lock-in; it will not renew and you keep access until the end
              of the paid period. We offer a <strong>14-day money-back guarantee</strong> on the first payment
              of any subscription. After 14 days there are no prorated refunds, except for billing errors,
              duplicate charges or where required by law. Request a refund at hola@synaptechspa.cl. Payments
              from outside Chile are processed by Paddle.com as Merchant of Record, and refunds for those
              payments are issued through Paddle.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

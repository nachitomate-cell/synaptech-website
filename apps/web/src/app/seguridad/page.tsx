import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import { waLink } from "@/content/catalogo";
import { metaPagina, faqJsonLd } from "@/lib/seo";

export const metadata = metaPagina({
  title: "Seguridad y respaldo de datos | SynapTech",
  description: "Tus datos en Santiago de Chile, con respaldo diario y semanal, recuperación al minuto, verificación en dos pasos y sin guardar tu tarjeta.",
  path: "/seguridad",
});

/* Seguridad (02-11-2026). La idea salió de mirar netexplora.com/cl: muestran
   sellos (ISO 9001 / 27001) para que el dueño confíe. Las ISO no las tenemos;
   lo que sí hay se dice tal cual, y cada línea sale de algo medido:
   - Base de datos: Firestore "(default)" del proyecto barberia-elegance,
     locationId southamerica-west1 (Santiago), leído por la API el 02-11-2026.
   - pointInTimeRecoveryEnablement ENABLED, versionRetentionPeriod 604800 s
     (7 días) · deleteProtectionState ENABLED.
   - backupSchedules: uno diario con retention 604800 s (7 días) y uno semanal
     (domingo) con retention 8467200 s (98 días = 14 semanas). Último backup
     READY: 01-11-2026.
   - Verificación en dos pasos: TOTP opt-in por persona
     (admin-panel/src/components/DosPasos.jsx, en Configuración).
   - Exportar clientes a Excel: Clientes.jsx (exportarClientes).
   - Pagos: Webpay Oneclick (Transbank) y Mercado Pago; la tarjeta se inscribe
     en sus páginas, no en las nuestras.
   Si algo de esto cambia (región, retención, 2FA), cambiar esta página. */

const PUNTOS = [
  { t: "Tus datos están en Chile", d: "La base de datos vive en los servidores de Google Cloud en Santiago. Tu agenda y tus clientes no salen del país para guardarse." },
  { t: "Respaldo todos los días", d: "Se respalda la base completa cada día (se guardan los últimos 7) y cada domingo (se guardan 14 semanas)." },
  { t: "Vuelta atrás al minuto", d: "Si algo se borra por error, podemos recuperar cómo estaba en cualquier minuto de los últimos 7 días." },
  { t: "Protegida contra borrado", d: "La base de datos tiene la protección contra eliminación encendida: no se puede eliminar por accidente." },
  { t: "Todo viaja cifrado", d: "Todo viaja cifrado (HTTPS) entre tu teléfono y la plataforma, y se guarda cifrado en los servidores." },
  { t: "Verificación en dos pasos", d: "Puedes pedir, además de tu contraseña, un código de 6 dígitos de una app de autenticación como Google Authenticator." },
  { t: "No guardamos tu tarjeta", d: "La tarjeta se inscribe en la página de Transbank (Webpay Oneclick) o de Mercado Pago. Su número nunca pasa por nuestros servidores." },
  { t: "Cada uno con su cuenta", d: "Dueño y equipo entran cada uno con su propia cuenta, y cada local tiene sus datos separados de los demás." },
  { t: "Tus datos son tuyos", d: "Exportas tus clientes a Excel cuando quieras. Sin permanencia: si te vas, te entregamos tu información." },
];

const FAQ = [
  { q: "¿Dónde se guardan los datos de mi local?", a: "En Google Cloud, en su región de Santiago de Chile. Ahí están la agenda, las fichas de clientes, las ventas y la configuración del local." },
  { q: "¿Qué pasa si borro algo por error?", a: "Escríbenos por WhatsApp. La base se respalda todos los días y además podemos volverla a cómo estaba en cualquier minuto de los últimos 7 días." },
  { q: "¿SynapTech guarda los datos de mi tarjeta?", a: "No. La tarjeta se inscribe en la página de Transbank (Webpay Oneclick) o de Mercado Pago, y su número nunca pasa por nuestros servidores." },
  { q: "¿Puedo llevarme mis datos si me cambio?", a: "Sí. Puedes exportar tus clientes a Excel desde el panel cuando quieras, y si te vas te entregamos tu información. No hay permanencia." },
  { q: "¿Cómo activo la verificación en dos pasos?", a: "En el panel, en Configuración, con una app de autenticación como Google Authenticator. Se activa por persona, para tu propia cuenta." },
];

export default function SeguridadPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">Seguridad</p>
            <h1 className="text-ink max-w-5xl">Tu agenda y tus clientes, guardados en Chile y respaldados todos los días.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
              Tu local depende de esa información. Esto es lo que hacemos para que no se pierda,
              no la vea quien no debe y siga siendo tuya.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PUNTOS.map((p) => (
                <article key={p.t} className="rounded-[28px] bg-white p-7">
                  <h2 className="font-display font-bold text-ink text-xl tracking-tight">{p.t}</h2>
                  <p className="text-text-secondary mt-3 leading-relaxed">{p.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="eyebrow mb-4">Preguntas frecuentes</p>
            <h2 className="text-ink">Lo que más nos preguntan.</h2>
            <div className="mt-10 divide-y divide-border-subtle border-y border-border-subtle">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="cursor-pointer list-none flex justify-between gap-4 font-semibold text-ink text-lg">
                    {f.q}
                    <span className="text-text-muted transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="text-text-secondary mt-3 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-text-secondary">
              El detalle legal está en la <a href="/privacidad" className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4">política de privacidad</a>.
              ¿Otra duda?{" "}
              <a href={waLink("Hola, tengo una pregunta sobre la seguridad de mis datos en SynapTech")} target="_blank" rel="noopener noreferrer"
                className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4">Escríbenos por WhatsApp</a>.
            </p>
          </div>
        </section>

        <CtaFinal origen="seguridad" />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }} />
    </>
  );
}

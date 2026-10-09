/* Franja de confianza: datos verificables de la empresa, para el dueño que
   llega preguntándose "¿con quién me estoy metiendo?" (Jimmy Navarro lo dijo
   tal cual el 06-10: "lo veo muy informal").
   - Synaptech SpA, RUT 78.402.009-6, Viña del Mar.
   - Partner certificado de Mercado Pago (certificación del 07-10-2026).
   - App SynapTech Studio publicada: App Store 15-08-2026, Google Play 01-09-2026.
   - Boletas de honorarios con folio real del SII desde el 05-09-2026.

   Logos de terceros, todos en su versión oficial y sin modificar
   (public/marcas-terceros/, bajados el 09-10-2026):
   - App Store: badge oficial en español de toolbox.marketingtools.apple.com.
   - Google Play: badge oficial es-419 de play.google.com/intl/es-419/badges
     (solo se le quitó el margen transparente). Las dos marcas piden que los
     badges vayan a la misma altura: 40 px.
   - Mercado Pago: el logo que usa su propio sitio (mlstatic, @2x).
   - SII: logotipo en Wikimedia Commons, de dominio público.
   Indican integración con cada servicio, no un respaldo de ellos. */

const APP_STORE = "https://apps.apple.com/cl/app/synaptech-studio/id6794530086";
const GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=cl.synaptechspa.studio";

export default function Confianza() {
  return (
    <section aria-label="Confianza" className="pb-14 md:pb-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* SII */}
          <div className="rounded-2xl bg-mist px-5 py-5 flex flex-col justify-between gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/marcas-terceros/sii.svg" alt="Servicio de Impuestos Internos" width={120} height={44}
              className="h-11 w-auto self-start" />
            <p className="text-[13.5px] leading-snug text-text-secondary">
              <span className="font-semibold text-ink">Boletas ante el SII</span>, con folio real y emitidas solas al cerrar la cita.
            </p>
          </div>

          {/* Mercado Pago */}
          <div className="rounded-2xl bg-mist px-5 py-5 flex flex-col justify-between gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/marcas-terceros/mercado-pago.png" alt="Mercado Pago" width={138} height={36}
              className="h-9 w-auto self-start" />
            <p className="text-[13.5px] leading-snug text-text-secondary">
              <span className="font-semibold text-ink">Partner certificado de Mercado Pago</span>: pagos online integrados a tu agenda.
            </p>
          </div>

          {/* Apps */}
          <div className="rounded-2xl bg-mist px-5 py-5 flex flex-col justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <a href={APP_STORE} target="_blank" rel="noopener noreferrer" aria-label="Descárgalo en el App Store">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/marcas-terceros/app-store-badge-es.svg" alt="Descárgalo en el App Store" width={120} height={40} className="h-10 w-auto" />
              </a>
              <a href={GOOGLE_PLAY} target="_blank" rel="noopener noreferrer" aria-label="Descárgalo en Google Play">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/marcas-terceros/google-play-badge-es.png" alt="Descárgalo en Google Play" width={135} height={40} className="h-10 w-auto" />
              </a>
            </div>
            <p className="text-[13.5px] leading-snug text-text-secondary">
              <span className="font-semibold text-ink">SynapTech Studio</span>, la app para tu equipo, en iPhone y Android.
            </p>
          </div>

          {/* Empresa */}
          <div className="rounded-2xl bg-ink text-white px-5 py-5 flex flex-col justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-[18px] h-[18px] text-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM9 12l2 2 4-4" />
                </svg>
              </span>
              <span className="font-display font-bold text-lg">Synaptech SpA</span>
            </div>
            <p className="text-[13.5px] leading-snug text-white/70">
              RUT 78.402.009-6 · Viña del Mar. Sin permanencia: tus datos son tuyos y te los entregamos exportados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

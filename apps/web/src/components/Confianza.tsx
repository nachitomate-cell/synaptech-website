/* Franja de confianza: datos verificables de la empresa, para el dueño que
   llega preguntándose "¿con quién me estoy metiendo?" (Jimmy Navarro lo dijo
   tal cual el 06-10: "lo veo muy informal").
   - Synaptech SpA, RUT 78.402.009-6, Viña del Mar.
   - Partner certificado de Mercado Pago (certificación del 07-10-2026).
   - App SynapTech Studio publicada: App Store 15-08-2026, Google Play 01-09-2026.
   - Boletas de honorarios con folio real del SII desde el 05-09-2026.
   Solo texto: sin logos de terceros, que tienen sus propias reglas de uso. */
const ITEMS = [
  { t: "Synaptech SpA", d: "RUT 78.402.009-6 · Viña del Mar", icono: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" },
  { t: "Partner de Mercado Pago", d: "Integración certificada", icono: "M3 7h18v10H3zM3 11h18M7 15h3" },
  { t: "App en App Store y Google Play", d: "SynapTech Studio para tu equipo", icono: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2" },
  { t: "Boletas ante el SII", d: "Con folio real, emitidas solas", icono: "M7 3h10v18l-2-1.5L13 21l-2-1.5L9 21l-2-1.5zM9 8h6M9 12h6" },
  { t: "Tus datos son tuyos", d: "Te los entregamos exportados", icono: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM9 12l2 2 4-4" },
];

export default function Confianza() {
  return (
    <section aria-label="Confianza" className="pb-14 md:pb-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {ITEMS.map((i) => (
            <li key={i.t} className="flex items-start gap-3 rounded-2xl bg-mist px-4 py-4">
              <span className="w-9 h-9 shrink-0 rounded-full bg-white flex items-center justify-center text-ink">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={i.icono} />
                </svg>
              </span>
              <span>
                <span className="block font-semibold text-ink text-[14px] leading-snug">{i.t}</span>
                <span className="block text-[12.5px] text-text-muted leading-snug mt-0.5">{i.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

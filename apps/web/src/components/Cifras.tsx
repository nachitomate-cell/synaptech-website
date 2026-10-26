/* Cifras del inicio, a la vista como en una presentación de producto.

   Medidas el 23-10-2026 (count() por local, solo lectura; script en el
   scratchpad de la sesión c14cbef9, `sergio/cifras.cjs`). Base: los locales
   con ficha de cobro (_billing), sin bajas, propuestas, demos ni cuentas
   internas o que no son agenda, + la base de marca de Kronnos (clientes
   reales de sus 3 sedes). Así quedan fuera las ~240 demos de los lotes.
     Re-medido el 26-10-2026 con el mismo criterio (antes: 23-10, +70.000 /
     +22.000 / +4.500):
     · Locales y sedes: 42 cuentas con uso en Chile + 6 sedes extra de Punto
       Pilates + 1 de Oren = 49 en Chile; afuera 15 (Perú: Bargo, Enbarvados,
       Roloz, Wolf's Den ×2 · México: Londres ×2, Montecarlo, Anders, Bonto,
       Mad Dogs · Colombia: El Edén, Danieri ×2 · Argentina: The Brito) → 64
       → sigue "+60", en 5 países.
     · Fichas de clientes (users − fusionadas): 89.531 → "+85.000".
     · Citas: 178.253, de ellas 154.442 migradas desde otros sistemas →
       23.811 agendadas en SynapTech → "+23.000".
     · Conversaciones de WhatsApp (wa_conversaciones, 1 doc por contacto):
       5.443 → "+5.000".
   Se redondean hacia abajo. Volver a medir antes de cambiarlas. */
const CIFRAS = [
  { valor: "+60",     label: "locales y sedes", nota: "en Chile, Perú, México, Colombia y Argentina" },
  { valor: "+85.000", label: "clientes", nota: "en las fichas de esos locales" },
  { valor: "+23.000", label: "reservas", nota: "agendadas en SynapTech" },
  { valor: "+5.000",  label: "conversaciones", nota: "por WhatsApp, en la bandeja de la plataforma" },
];

export default function Cifras() {
  return (
    <section aria-label="SynapTech en cifras" className="py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="text-center max-w-5xl mx-auto">
          <p className="eyebrow">SynapTech hoy</p>
          <h2 className="text-ink mt-5">Locales reales. Números reales.</h2>
        </div>
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 sm:gap-x-8">
          {CIFRAS.map((c) => (
            <div key={c.label} className="text-center">
              <p className="font-display font-bold tracking-[-0.045em] leading-none text-ink text-[clamp(2.2rem,4.4vw,4.2rem)]">{c.valor}</p>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-ink">{c.label}</p>
              <p className="mt-1 text-sm sm:text-base text-text-muted leading-snug max-w-[16rem] mx-auto">{c.nota}</p>
            </div>
          ))}
        </div>
        <p className="mt-14 text-center text-[13px] text-text-muted">Medido en la plataforma el 26 de octubre de 2026.</p>
      </div>
    </section>
  );
}

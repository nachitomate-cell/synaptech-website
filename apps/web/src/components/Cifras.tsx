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
     Re-medido el 31-10-2026, mismo criterio:
     · Locales y sedes: 54 cuentas con ≥10 fichas y ≥5 reservas propias + 7
       sedes extra (Pilates 6, Oren 1) = 61 → sigue "+60". Con un criterio
       más laxo (≥10 fichas o alguna reserva) son 65 + 7 = 72.
     · Fichas: 84.543 → "+80.000". BAJÓ: Barbería Diego Carratu pasó a baja
       en _billing y se llevó 8.957 fichas (sin eso, habría subido).
     · Citas: 179.918 − 152.623 migradas = 27.295 → "+27.000".
     · WhatsApp (wa_conversaciones): 6.645 → "+6.500".
     Re-medido el 09-11-2026, mismo criterio (tras la baja en lote del 08-11):
     · Locales y sedes: 67 cuentas con ≥10 fichas y ≥5 reservas propias + 7
       sedes extra (Pilates 6, Oren 1) = 74 → "+70". Siguen 5 países.
     · Fichas: 116.853 → "+115.000". Subió por las migraciones de AgendaPro
       (Brymer 3.165 y Distrito 2.934 entran en fichas, aún no en locales).
     · Citas: 313.217 − 279.693 migradas = 33.524 → "+33.000".
     · Conversaciones: WhatsApp 8.835 + Instagram 254 = 9.089 → "+9.000".
   Se redondean hacia abajo. Volver a medir antes de cambiarlas. */
import Aparece, { Cuenta } from "@/components/Aparece";

const CIFRAS = [
  { valor: "+70",     label: "locales y sedes", nota: "en Chile, Perú, México, Colombia y Argentina" },
  { valor: "+115.000", label: "clientes", nota: "en las fichas de esos locales" },
  { valor: "+33.000", label: "reservas", nota: "agendadas en SynapTech" },
  { valor: "+9.000",  label: "conversaciones", nota: "por WhatsApp e Instagram, en la bandeja de la plataforma" },
];

export default function Cifras() {
  return (
    <section aria-label="SynapTech en cifras" className="py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <Aparece className="text-center max-w-5xl mx-auto">
          <p className="eyebrow">SynapTech hoy</p>
          <h2 className="text-ink mt-5">Locales reales. Números reales.</h2>
        </Aparece>
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 sm:gap-x-8">
          {CIFRAS.map((c, i) => (
            <Aparece key={c.label} delay={(i % 4) * 0.08} className="text-center">
              <p className="font-display font-bold tracking-[-0.045em] leading-none text-ink text-[clamp(2rem,4.4vw,4.2rem)]"><Cuenta valor={c.valor} /></p>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-ink">{c.label}</p>
              <p className="mt-1 text-sm sm:text-base text-text-muted leading-snug max-w-[16rem] mx-auto">{c.nota}</p>
            </Aparece>
          ))}
        </div>
        <p className="mt-14 text-center text-[13px] text-text-muted">Medido en la plataforma el 9 de noviembre de 2026.</p>
      </div>
    </section>
  );
}

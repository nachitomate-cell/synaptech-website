import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import { metaPagina } from "@/lib/seo";

/* Beneficio de fibra Entel para locales SynapTech (23-10-2026). Rediseño del
   mismo día, pedido de Ignacio: "algo más premium, estilo a lo que haría Apple
   con una alianza así", y sin que la página gire en torno a una persona.

   Lo que no cambia: la gift card la pone el ejecutivo Entel asociado al
   programa (la compra en Apprecio) y la entrega cuando la fibra queda
   instalada; SynapTech solo pone el canal. Por eso todo termina en el
   WhatsApp de ese ejecutivo y la nota 2 insiste en contratar por este canal
   (por la web de Entel la venta no queda asociada y no hay gift card).
   Noindex y fuera del sitemap: es para los locales que llegan desde el panel
   o el afiche. Sin logo de Entel: la marca va solo como texto. No se promete
   velocidad ni continuidad del servicio: eso es de Entel. */
export const metadata = metaPagina({
  title: "SynapTech + Entel: fibra para tu local, con $20.000 de regalo",
  description: "Un beneficio exclusivo para los locales que usan SynapTech: contrata fibra óptica Entel por este canal y recibe una gift card de $20.000.",
  path: "/beneficios/fibra",
  noindex: true,
});

const WA_EJECUTIVO = "56942788726";
const solicitar = `https://wa.me/${WA_EJECUTIVO}?text=${encodeURIComponent(
  "Hola, vengo por el beneficio de fibra Entel para locales SynapTech. Mi local es ")}`;

const RAZONES = [
  { t: "Tu agenda, siempre en línea.", d: "Reservas online, recordatorios y el panel de tu local, con una conexión pensada para estar encendida todo el día." },
  { t: "Cobra con tranquilidad.", d: "Las máquinas de tarjeta y la caja dependen de tu internet. Mejor que sea fibra." },
  { t: "Todo tu equipo conectado.", d: "Recepción, profesionales y clientes en la sala de espera, al mismo tiempo." },
];

const PASOS = [
  { n: "01", t: "Solicítalo", d: "Escríbenos con el nombre y la dirección de tu local. Revisamos la cobertura de fibra Entel en tu dirección." },
  { n: "02", t: "Contrata", d: "Te asesora un ejecutivo comercial de Entel, que gestiona todo el proceso contigo." },
  { n: "03", t: "Recibe tu regalo", d: "Cuando la fibra queda instalada en tu local, recibes tu gift card de $20.000." },
];

function Lineas() {
  /* Haces de luz que cruzan el fondo: la "fibra", sin fotos ni logos ajenos. */
  return (
    <svg aria-hidden className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
      <defs>
        <linearGradient id="fb-a" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9CCC3C" stopOpacity="0" />
          <stop offset=".5" stopColor="#9CCC3C" stopOpacity=".55" />
          <stop offset="1" stopColor="#5EC8F2" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fb-b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5EC8F2" stopOpacity="0" />
          <stop offset=".55" stopColor="#5EC8F2" stopOpacity=".45" />
          <stop offset="1" stopColor="#9CCC3C" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path key={i}
          d={`M-80 ${700 + i * 22} C 360 ${600 + i * 16}, 820 ${860 - i * 18}, 1520 ${640 + i * 26}`}
          stroke={i % 2 ? "url(#fb-b)" : "url(#fb-a)"} strokeWidth={i === 3 ? 2 : 1} />
      ))}
    </svg>
  );
}

export default function BeneficioFibra() {
  return (
    <>
      <Header />
      <main>
        {/* ── Portada ── */}
        <section className="relative overflow-hidden bg-[#05080D] text-white pt-36 md:pt-44 pb-28 md:pb-40">
          <Lineas />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-[15px] md:text-[17px] font-semibold tracking-tight text-white/70">
              SynapTech <span className="mx-2 text-white/35">+</span> Entel
            </p>
            <h1 className="mt-6 text-white">
              Fibra para tu local.
              <span className="block bg-gradient-to-r from-[#B8E36A] via-[#9CCC3C] to-[#5EC8F2] bg-clip-text text-transparent pb-2">
                Con $20.000 de regalo.
              </span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-white/65 leading-relaxed max-w-xl mx-auto">
              Un beneficio exclusivo para los locales que usan SynapTech.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <a href={solicitar} target="_blank" rel="noopener noreferrer"
                className="inline-flex justify-center items-center bg-white text-[#05080D] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors">
                Solicitar el beneficio
              </a>
              <a href="#como-funciona" className="text-[#B8E36A] font-semibold hover:underline underline-offset-4">
                Cómo funciona ›
              </a>
            </div>
          </div>
        </section>

        {/* ── El regalo ── */}
        <section className="py-24 md:py-32">
          <div className="max-w-screen-lg mx-auto px-4 sm:px-6 text-center">
            <p className="eyebrow">El beneficio</p>
            <p className="mt-6 font-display font-bold tracking-[-0.045em] leading-none text-ink text-[clamp(4.5rem,15vw,10rem)]">
              $20.000
            </p>
            <p className="mt-6 text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-snug">
              en una gift card para usar en miles de comercios, cuando tu fibra queda instalada.<sup className="text-text-muted">1</sup>
            </p>
          </div>
        </section>

        {/* ── Por qué fibra ── */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <h2 className="text-ink text-center max-w-3xl mx-auto">Pensado para cómo funciona tu local.</h2>
            <div className="mt-14 grid md:grid-cols-3 gap-4">
              {RAZONES.map((r) => (
                <div key={r.t} className="rounded-[28px] bg-mist p-8 md:p-10">
                  <p className="font-display text-2xl font-bold tracking-tight text-ink leading-tight">{r.t}</p>
                  <p className="mt-4 text-text-secondary leading-relaxed">{r.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cómo funciona ── */}
        <section id="como-funciona" className="scroll-mt-20 py-24 md:py-32 bg-[#05080D] text-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <h2 className="text-white text-center">Así de simple.</h2>
            <ol className="mt-16 grid md:grid-cols-3 gap-12 md:gap-8 list-none p-0 m-0">
              {PASOS.map((p) => (
                <li key={p.n} className="border-t border-white/15 pt-8">
                  <span className="font-display text-sm font-semibold tracking-[0.2em] text-[#B8E36A]">{p.n}</span>
                  <p className="mt-4 font-display text-3xl font-bold tracking-tight">{p.t}</p>
                  <p className="mt-3 text-white/60 leading-relaxed">{p.d}</p>
                </li>
              ))}
            </ol>
            <div className="mt-20 text-center">
              <a href={solicitar} target="_blank" rel="noopener noreferrer"
                className="inline-flex justify-center items-center bg-white text-[#05080D] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors">
                Solicitar el beneficio
              </a>
              <p className="mt-4 text-sm text-white/45">Te respondemos por WhatsApp.</p>
            </div>
          </div>
        </section>

        {/* ── Notas ── */}
        <section className="py-14">
          <div className="max-w-screen-lg mx-auto px-4 sm:px-6">
            <ol className="space-y-3 text-[13px] leading-relaxed text-text-muted list-decimal pl-4">
              <li>Gift card de $20.000 canjeable en los comercios adheridos a Apprecio. La entrega el ejecutivo comercial de Entel asociado al programa, una vez instalado el servicio.</li>
              <li>Válido para locales con agenda SynapTech activa que contraten fibra óptica Entel a través de este canal. Las contrataciones hechas por la web, tiendas u otros canales de Entel no participan. Sujeto a factibilidad técnica en la dirección del local.</li>
              <li>SynapTech no vende ni presta servicios de internet: la contratación, la instalación y el servicio son de Entel. Entel es una marca registrada de su titular.</li>
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

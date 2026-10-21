import { altaIA, CTA_IA, waLink } from "@/content/catalogo";

/* Bloque destacado, el equivalente al "Square Terminal −40%" de su home.
   La oferta la decidió Ignacio el 08-10-2026 (2 meses) y la bajó a 1 mes el
   15-10-2026: "el mes gratis es solo para los que nosotros elegimos" (los 2
   meses quedan solo fuera de Chile, ver paises.ts). Quien se registra solo en
   bioo.cl/agenda tiene 14 días; el mes lo da el link del vendedor
   (?utm_source=vendedor, 30 días). Por eso el botón principal va a WhatsApp
   y el secundario dice que solo son 14 días.
   21-10-2026: el secundario ahora va al alta con asistente IA
   (crear.synaptechspa.cl, 30 días del Pro), ver altaIA en catalogo.ts. */
const PUNTOS = [
  { t: "Sin tarjeta", d: "No pides nada por adelantado para partir." },
  { t: "Te dejamos andando", d: "Cargamos tus servicios, tu equipo y tus clientes." },
  { t: "Sin permanencia", d: "Te vas cuando quieras y tus datos son tuyos." },
];

export default function PromoMeses() {
  return (
    <section id="oferta" className="py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="relative overflow-hidden rounded-[32px] bg-ink text-white px-6 py-12 sm:px-12 md:px-16 md:py-16">
          <div aria-hidden className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-lime/15" />
          <div aria-hidden className="absolute right-24 -bottom-32 w-64 h-64 rounded-full bg-lime/10" />

          <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <span className="inline-block bg-lime text-ink text-xs font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full mb-6">
                Oferta para locales nuevos
              </span>
              <h2 className="text-white">
                Tu primer <span className="text-lime">mes gratis.</span>
              </h2>
              <p className="text-white/75 text-lg mt-5 leading-relaxed max-w-xl">
                Escríbenos por WhatsApp y tu primer mes va por nuestra cuenta, con
                todo el plan Pro y sin tarjeta. Si no te sirve, te vas sin costo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a href={waLink("Hola, quiero mi mes gratis en SynapTech")} target="_blank" rel="noopener noreferrer"
                  className="inline-flex justify-center items-center bg-lime text-ink font-semibold px-7 py-4 rounded-full hover:bg-white transition-colors">
                  Quiero mi mes gratis
                </a>
                <a href={altaIA(`home-oferta`)}
                  className="inline-flex justify-center items-center border border-white/25 text-white font-semibold px-7 py-4 rounded-full hover:border-white/60 transition-colors">
                  {CTA_IA}
                </a>
              </div>
            </div>

            <ul className="flex flex-col gap-4">
              {PUNTOS.map((p) => (
                <li key={p.t} className="flex gap-4 bg-white/[0.06] rounded-2xl p-5">
                  <span aria-hidden className="w-9 h-9 shrink-0 rounded-full bg-lime text-ink flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>
                    <span className="block font-semibold">{p.t}</span>
                    <span className="block text-white/65 text-sm mt-0.5">{p.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

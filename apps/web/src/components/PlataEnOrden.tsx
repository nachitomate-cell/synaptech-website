import Link from "next/link";
import { capsula } from "@/content/capsulas";
import { TarjetaCapsula } from "./Capsulas";

/* "Tu plata en orden": la respuesta a lo que más le duele al dueño de una
   barbería (Jimmy Navarro, reunión del 09-10-2026: el IVA de los servicios,
   cómo pagar el 50 % y el arriendo de sillón). Cada afirmación existe en la
   plataforma: comisiones selladas por ítem (anti pago doble), nómina TXT para
   el Banco de Chile, sueldo base, arriendo fijo (PR #1124) y boletas de
   honorarios con folio real del SII desde el 05-09-2026. */
const MODELOS = [
  {
    titulo: "Comisión",
    bajada: "El 50 % o el porcentaje que acuerdes",
    puntos: [
      "La comisión de cada profesional sale sola, por servicio y por producto",
      "Propinas, adelantos y ajustes ya descontados",
      "Cada cita queda marcada al pagar: nada se paga dos veces",
      "Liquidación en PDF, Excel o archivo de nómina para el Banco de Chile",
    ],
  },
  {
    titulo: "Arriendo de sillón",
    bajada: "Por porcentaje o un monto fijo al mes",
    puntos: [
      "Cada atención emite la boleta de honorarios del profesional, con su RUT",
      "Y la boleta del local por el arriendo y los productos",
      "Boletas con folio real ante el SII, sin hacerlas a mano",
      "El arriendo fijo mensual queda registrado en la caja",
    ],
    adicional: true,
  },
  {
    titulo: "Sueldo + comisión",
    bajada: "Un fijo más un porcentaje por venta",
    puntos: [
      "El sueldo base y la comisión en la misma liquidación",
      "Ves cuánto vendió cada uno y cuánto le corresponde",
      "Historial de lo pagado a cada profesional",
      "Todo el mes en Excel para tu contador",
    ],
  },
];

export default function PlataEnOrden() {
  const leccion = capsula("leccion1-sueldo-comision-arriendo");
  return (
    <section id="plata" className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mb-10">
          <p className="eyebrow mb-4">Tu plata en orden</p>
          <h2 className="text-ink">El 50 %, el arriendo de sillón y el IVA, sin planillas.</h2>
          <p className="text-text-secondary text-lg mt-5 leading-relaxed">
            Le pagues como le pagues a tu equipo, la plataforma calcula lo de cada uno
            y deja cada venta con su documento, lista para tu contador.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {MODELOS.map((m) => (
            <article key={m.titulo} className="rounded-[28px] bg-mist p-7 sm:p-8 flex flex-col">
              <h3 className="font-display font-bold text-ink text-2xl tracking-tight">{m.titulo}</h3>
              <p className="text-text-muted mt-1">{m.bajada}</p>
              <ul className="mt-6 flex flex-col gap-3.5 flex-1">
                {m.puntos.map((p) => (
                  <li key={p} className="flex gap-3 text-text-secondary">
                    <svg className="w-5 h-5 shrink-0 mt-0.5 text-accent" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
              {m.adicional && (
                <p className="mt-6 text-sm text-text-muted">
                  Las boletas automáticas son un adicional de cualquier plan. <Link href="/precios#adicionales" className="underline underline-offset-2 hover:text-ink">Ver precio</Link>
                </p>
              )}
            </article>
          ))}
        </div>

        {leccion && (
          <div className="mt-6 rounded-[28px] bg-ink text-white p-6 sm:p-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <p className="text-lime text-xs font-bold uppercase tracking-[0.12em]">Curso de gestión · Lección 1</p>
              <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mt-2">¿Sueldo, comisión o arriendo? Lo que cambia en el IVA.</h3>
              <p className="text-white/70 mt-3 leading-relaxed max-w-xl">
                Con un ejemplo de $2.000.000 en ventas al mes: cuánto IVA paga el local en
                cada modelo y qué riesgo toma. Dos minutos, con Syna.
              </p>
              <p className="text-xs text-white/45 mt-4">Ejemplo referencial con las tasas de 2026. Cada local es distinto: revisa tu caso con tu contador.</p>
              <Link href="/guias/boleta-honorarios-y-comisiones-barberos" className="inline-flex mt-5 font-semibold text-lime border-b-2 border-lime/60 pb-0.5 hover:border-lime">
                Leer la guía completa: boletas, retención 2026 y arriendo de sillón →
              </Link>
            </div>
            <TarjetaCapsula c={leccion} compacta oscuro />
          </div>
        )}
      </div>
    </section>
  );
}

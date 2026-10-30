import Link from "next/link";

/* Recursos gratis enlazados desde las páginas de rubro (30-10-2026). Los
   recursos rankean mejor que las páginas de producto: este bloque les pasa
   autoridad a ellos y le da al visitante algo útil antes de decidir. */
const RECURSOS = [
  { href: "/recursos/calculadora-comision-arriendo-sillon", eyebrow: "Calculadora", t: "Comisión o arriendo de sillón", d: "Cuánto le queda al barbero y al local en cada caso, con el IVA y la retención del 15,25 % de 2026." },
  { href: "/recursos/calculadora-inasistencias", eyebrow: "Calculadora", t: "Cuánto te cuestan las inasistencias", d: "La plata que se va en horas vacías, a la semana, al mes y al año, y 6 ideas para bajarlas." },
  { href: "/guias/boleta-honorarios-y-comisiones-barberos", eyebrow: "Guía", t: "Boletas de honorarios y comisiones", d: "Sueldo, comisión o arriendo: quién emite qué documento y dónde aparece el IVA, con un ejemplo en pesos." },
];

export default function RecursosGratis({ titulo = "Recursos gratis para tu barbería." }: { titulo?: string }) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-2xl mb-8">
          <p className="eyebrow mb-3">Recursos gratis</p>
          <h2 className="text-ink">{titulo}</h2>
        </div>
        <ul className="grid md:grid-cols-3 gap-4 list-none p-0 m-0">
          {RECURSOS.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="group block h-full rounded-[24px] bg-mist p-6 hover:shadow-card-hover transition-shadow">
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-accent">{r.eyebrow}</p>
                <h3 className="font-display font-bold text-ink text-xl tracking-tight mt-2">{r.t}</h3>
                <p className="text-text-secondary mt-2 leading-relaxed">{r.d}</p>
                <span className="inline-block mt-4 font-semibold text-ink border-b-2 border-lime pb-0.5 group-hover:border-ink">Abrir →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

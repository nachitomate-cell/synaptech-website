"use client";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Aparece from "@/components/Aparece";

export { Aparece };

/* Animaciones de /seguridad (02-11-2026), en el tono de las páginas de
   producto de Apple: poco movimiento, lento al final (ease 0.16,1,0.3,1),
   una sola vez por elemento y nada que se mueva solo después de llegar.
   - Aparece: el de todo el sitio (components/Aparece.tsx).
   - Iconos de línea que se dibujan (pathLength 0 → 1).
   - Escudo del inicio que se traza y cierra con el check.
   - Números grandes que cuentan hasta su valor.
   Con "reducir movimiento" todo queda quieto y visible desde el principio. */

const EASE = [0.16, 1, 0.3, 1] as const;

/* Trazos de 24×24, línea de 1.5 como los SF Symbols finos. */
const ICONOS: Record<string, string[]> = {
  chile:    ["M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z", "M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"],
  respaldo: ["M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z", "M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7", "M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"],
  atras:    ["M3.5 12a8.5 8.5 0 1 0 2.5-6", "M3.5 4.5V9H8", "M12 8v4.5l3 2"],
  borrado:  ["M12 3l7.5 3v5.5c0 4.6-3.2 8.4-7.5 9.5-4.3-1.1-7.5-4.9-7.5-9.5V6z", "M9.5 9.5l5 5M14.5 9.5l-5 5"],
  cifrado:  ["M6.5 10.5h11a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-8.5a1 1 0 0 1 1-1z", "M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3", "M12 14.5v3"],
  dospasos: ["M8 3h8a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 16 21H8a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 8 3z", "M9.5 11h1M11.5 11h1M13.5 11h1", "M11 18h2"],
  tarjeta:  ["M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z", "M3 10h18", "M6.5 14.5h4"],
  cuentas:  ["M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z", "M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5", "M16 4.3a3.5 3.5 0 0 1 0 6.4", "M18 14.8c1.9.7 3.1 2.5 3.5 5.2"],
  tuyos:    ["M12 3.5v11", "M7.5 10.5L12 15l4.5-4.5", "M4.5 16.5V19a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-2.5"],
};

function Icono({ nombre, delay }: { nombre: string; delay: number }) {
  const quieto = useReducedMotion();
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className="w-8 h-8 text-accent" aria-hidden>
      {ICONOS[nombre].map((d, i) => (
        <motion.path key={d} d={d}
          initial={quieto ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ pathLength: { duration: 1.1, ease: EASE, delay: delay + 0.15 + i * 0.12 }, opacity: { duration: 0.2, delay: delay + 0.15 + i * 0.12 } }} />
      ))}
    </svg>
  );
}

export type Punto = { t: string; d: string; icono: string };

export function Puntos({ puntos }: { puntos: Punto[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {puntos.map((p, i) => {
        const delay = (i % 3) * 0.08; // escalonado por columna, no por la lista entera
        return (
          <Aparece key={p.t} delay={delay} className="h-full">
            <article className="h-full rounded-[28px] bg-white p-7 transition-transform duration-500 ease-out hover:-translate-y-1">
              <Icono nombre={p.icono} delay={delay} />
              <h2 className="font-display font-bold text-ink text-xl tracking-tight mt-5">{p.t}</h2>
              <p className="text-text-secondary mt-3 leading-relaxed">{p.d}</p>
            </article>
          </Aparece>
        );
      })}
    </div>
  );
}

/* El escudo del inicio: se traza el contorno y cierra con el check. */
export function Escudo() {
  const quieto = useReducedMotion();
  const trazo = (delay: number, duration: number) => ({
    initial: quieto ? false : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { duration, ease: EASE, delay }, opacity: { duration: 0.2, delay } },
  } as const);
  return (
    <motion.div className="relative w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 mx-auto"
      initial={quieto ? false : { opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: EASE }}>
      <div aria-hidden className="absolute inset-0 rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(156,204,60,.35), rgba(94,200,242,.18) 60%, transparent)" }} />
      <svg viewBox="0 0 64 64" fill="none" strokeLinecap="round" strokeLinejoin="round" className="relative w-full h-full" aria-hidden>
        <motion.path d="M32 6l20 8v14.5C52 41 43.6 51.2 32 58 20.4 51.2 12 41 12 28.5V14z" stroke="currentColor" strokeWidth="1.6" className="text-ink" {...trazo(0.2, 1.6)} />
        <motion.path d="M23.5 32.5l6 6 11-12" stroke="currentColor" strokeWidth="2.4" className="text-accent" {...trazo(1.4, 0.7)} />
      </svg>
    </motion.div>
  );
}

function Cuenta({ hasta }: { hasta: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visto = useInView(ref, { once: true, margin: "-60px" });
  const quieto = useReducedMotion();
  const [n, setN] = useState(hasta); // en el HTML del servidor va el valor final
  useEffect(() => { if (!quieto) setN(0); }, [quieto]); // queda en 0 hasta que se ve
  useEffect(() => {
    if (!visto || quieto) return;
    const c = animate(0, hasta, { duration: 1.4, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [visto, quieto, hasta]);
  return <span ref={ref}>{n}</span>;
}

export type Numero = { v: number; unidad: string; l: string };

export function Numeros({ numeros }: { numeros: Numero[] }) {
  return (
    <div className="grid sm:grid-cols-3 gap-y-12 gap-x-8">
      {numeros.map((n, i) => (
        <Aparece key={n.l} delay={i * 0.1} className="text-center">
          <p className="font-display font-bold tracking-[-0.045em] leading-none text-white text-[clamp(3rem,7vw,5.5rem)]">
            <Cuenta hasta={n.v} />
            <span className="text-[0.4em] tracking-tight text-lime ml-2">{n.unidad}</span>
          </p>
          <p className="mt-4 text-white/65 text-lg leading-snug max-w-[16rem] mx-auto">{n.l}</p>
        </Aparece>
      ))}
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";

/* Entrada suave al hacer scroll, para todo el sitio (02-11-2026). Sube 24 px y
   se aclara un desenfoque, en el tono de las páginas de producto de Apple.

   Sin framer-motion a propósito: esto va en páginas de rubro, comparar y
   precios, que viven de Google, y no vale 35 KB de JavaScript. Las reglas:
   - El HTML del servidor sale VISIBLE. Solo se oculta, ya en el navegador, lo
     que al cargar está bajo la pantalla; lo que se ve de entrada no se toca
     (no retrasa el LCP ni parpadea).
   - Sin JavaScript, sin IntersectionObserver o con "reducir movimiento":
     queda todo quieto y visible.
   - Una sola vez por elemento. El CSS está en globals.css ([data-aparece]). */

function bajoLaPantalla(el: HTMLElement) {
  if (typeof IntersectionObserver === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return el.getBoundingClientRect().top > window.innerHeight;
}

function useAlVerse<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [estado, setEstado] = useState<"quieto" | "oculto" | "visto">("quieto");
  useEffect(() => {
    const el = ref.current;
    if (!el || !bajoLaPantalla(el)) return;
    setEstado("oculto");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setEstado("visto"); io.disconnect(); }
    }, { rootMargin: "0px 0px -60px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, estado };
}

export default function Aparece({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, estado } = useAlVerse<HTMLDivElement>();
  return (
    <div ref={ref} data-aparece={estado} className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}

/* Cifra que cuenta hasta su valor cuando aparece: "+80.000", "31 %", "7".
   Respeta el prefijo y el sufijo, y los miles con punto. En el HTML del
   servidor va el valor final, igual que sin JavaScript. */
export function Cuenta({ valor }: { valor: string }) {
  const { ref, estado } = useAlVerse<HTMLSpanElement>();
  const m = valor.match(/^(\D*)([\d.]+)(.*)$/);
  const hasta = m ? Number(m[2].replace(/\./g, "")) : NaN;
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    if (estado === "oculto") setN(0);
    if (estado !== "visto" || !Number.isFinite(hasta)) return;
    const t0 = performance.now();
    let raf = 0;
    const paso = (t: number) => {
      const x = Math.min(1, (t - t0) / 1400);
      setN(Math.round(hasta * (1 - Math.pow(1 - x, 4)))); // frena al final
      if (x < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [estado, hasta]);
  if (!m || n === null) return <span ref={ref}>{valor}</span>;
  return <span ref={ref}>{m[1]}{n.toLocaleString("es-CL")}{m[3]}</span>;
}

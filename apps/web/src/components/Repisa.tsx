"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

/* Repisa horizontal de tarjetas (23-10-2026), para el inicio "con toque Apple
   y NVIDIA" que pidió Ignacio:
   - variante "apple": como las repisas de apple.com/cl/store, flechas
     redondas grises bajo la repisa, a la derecha.
   - variante "nvidia": como los carruseles de nvidia.com, botones cuadrados
     verdes arriba a la derecha.
   Se desliza con el dedo o el trackpad (scroll-snap); las flechas solo
   mueven el scroll, así que sin JavaScript la repisa igual se recorre. */
export default function Repisa({ children, variante = "apple", etiqueta }: {
  children: ReactNode; variante?: "apple" | "nvidia"; etiqueta: string;
}) {
  const pista = useRef<HTMLDivElement>(null);
  const [inicio, setInicio] = useState(true);
  const [fin, setFin] = useState(false);

  const medir = () => {
    const el = pista.current;
    if (!el) return;
    setInicio(el.scrollLeft < 8);
    setFin(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };
  useEffect(() => { medir(); }, []);

  const mover = (dir: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: "smooth" });
  };

  const flechas = (
    <div className={`flex gap-2 ${variante === "nvidia" ? "justify-end mb-5" : "justify-end mt-6"}`}>
      {([-1, 1] as const).map((d) => (
        <button key={d} type="button" onClick={() => mover(d)} disabled={d === -1 ? inicio : fin}
          aria-label={d === -1 ? "Anterior" : "Siguiente"}
          className={variante === "nvidia"
            ? "w-9 h-9 rounded-[3px] bg-[#76B900] text-black flex items-center justify-center hover:bg-[#8ad100] disabled:opacity-35 transition-colors"
            : "w-11 h-11 rounded-full bg-[#E8E8ED] text-[#1d1d1f] flex items-center justify-center hover:bg-[#dcdce1] disabled:opacity-40 transition-colors"}>
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <path d={d === -1 ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
    </div>
  );

  return (
    <div role="region" aria-label={etiqueta}>
      {variante === "nvidia" && flechas}
      <div ref={pista} onScroll={medir}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
      {variante === "apple" && flechas}
    </div>
  );
}

"use client";

import type { ReactNode } from "react";

/* Lleva al simulador de /totem con el ejemplo de un rubro (evento `totem-rubro`, lo escucha SimuladorTotem). */
export default function BotonRubroTotem({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <a href="#simulador" className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("totem-rubro", { detail: id }))}>
      {children}
    </a>
  );
}

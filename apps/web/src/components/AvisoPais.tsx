"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PAISES, type CodigoPais } from "@/content/paises";
import Bandera from "@/components/Bandera";

/* Aviso discreto en la home para visitas de Perú, Colombia, México o Argentina:
   la cookie `syn_pais` la deja el middleware según el país de la IP. Lleva a la
   página del país, con precios en dólares; no redirige. Se puede cerrar y no
   vuelve a salir en esa visita. */
export default function AvisoPais() {
  const [codigo, setCodigo] = useState<CodigoPais | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("syn_pais_cerrado")) return;
    } catch {}
    const m = document.cookie.match(/(?:^|;\s*)syn_pais=([a-z]{2})/);
    const c = m?.[1] as CodigoPais | undefined;
    if (c && PAISES[c]) setCodigo(c);
  }, []);

  if (!codigo) return null;
  const p = PAISES[codigo];

  return (
    <div className="absolute top-16 inset-x-0 z-40 px-4 sm:px-6 md:px-10 pt-2">
      <div className="max-w-screen-xl mx-auto flex justify-center lg:justify-start">
        <div className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-mist border border-border-subtle pl-3 sm:pl-3.5 pr-1 py-0.5 sm:py-1 text-[13px] sm:text-sm shadow-card">
          <Bandera codigo={codigo} ancho={18} radio={2} />
          {/* Una sola línea también en celular: así cabe en el margen sobre el titular de la home. */}
          <Link href={`/${codigo}`} className="text-ink whitespace-nowrap">
            <span className="sm:hidden">¿En {p.nombre}?</span>
            <span className="hidden sm:inline">¿Estás en {p.nombre}?</span>{" "}
            <span className="font-semibold text-accent">Ver precios en dólares →</span>
          </Link>
          <button
            type="button"
            aria-label="Cerrar aviso"
            onClick={() => {
              try { sessionStorage.setItem("syn_pais_cerrado", "1"); } catch {}
              setCodigo(null);
            }}
            className="w-7 h-7 shrink-0 rounded-full text-text-muted hover:text-ink hover:bg-white flex items-center justify-center"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

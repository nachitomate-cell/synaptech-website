"use client";
import { useEffect } from "react";
import { cookieDeToque, leerToque, reescribirAlta, toqueDeVisita } from "@/lib/atribucion";
import { useConsentimiento } from "@/lib/useConsentimiento";

/* Guarda el primer toque al aterrizar y lo pega en los botones de alta al
   apretarlos (lib/atribucion.ts explica el porqué). Va en el layout: corre en
   cualquier página por la que entre la persona, no solo donde está el botón.

   Se reescribe al apretar (pointerdown + click) y no al cargar: las páginas
   son estáticas y Next pinta links nuevos al navegar; mirar el link justo
   antes de seguirlo cubre todos, también "abrir en pestaña nueva". */
/* Consentimiento (05-11-2026): la cookie `syn_pt` se escribe SOLO si la
   persona aceptó "Medición". Sin ese permiso el link de alta igual lleva la
   campaña de ESTA visita (se lee de la URL, no se guarda nada), pero no se
   recuerda si vuelve otro día. */
export default function AtribucionPrimerToque() {
  const consentimiento = useConsentimiento();
  const puedeGuardar = !!consentimiento?.medicion;
  useEffect(() => {
    let toque = leerToque(document.cookie);
    if (!toque) {
      const visita = toqueDeVisita(location.search, document.referrer, location.pathname);
      if (visita) {
        if (puedeGuardar) {
          try { document.cookie = cookieDeToque(visita, location.hostname, location.protocol === "https:"); } catch { /* sin cookies: igual se reescribe el link */ }
        }
        toque = visita;
      }
    }
    if (!toque) return;
    const t = toque;
    const alApretar = (e: Event) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const nuevo = reescribirAlta(a.href, t);
      if (nuevo !== a.href) a.href = nuevo;
    };
    document.addEventListener("pointerdown", alApretar, true);
    document.addEventListener("click", alApretar, true);
    return () => {
      document.removeEventListener("pointerdown", alApretar, true);
      document.removeEventListener("click", alApretar, true);
    };
  }, [puedeGuardar]);
  return null;
}

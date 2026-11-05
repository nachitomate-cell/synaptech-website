"use client";

import { useEffect, useState } from "react";
import { EVENTO_CAMBIO, leerConsentimiento, type Consentimiento } from "@/lib/consentimiento";

/** La elección vigente (null mientras no elige o antes de montar). Se actualiza
 *  sola cuando la persona cambia la elección en el aviso. */
export function useConsentimiento(): Consentimiento | null {
  const [c, setC] = useState<Consentimiento | null>(null);
  useEffect(() => {
    setC(leerConsentimiento(document.cookie));
    const alCambiar = (e: Event) => setC((e as CustomEvent<Consentimiento>).detail ?? leerConsentimiento(document.cookie));
    window.addEventListener(EVENTO_CAMBIO, alCambiar);
    return () => window.removeEventListener(EVENTO_CAMBIO, alCambiar);
  }, []);
  return c;
}

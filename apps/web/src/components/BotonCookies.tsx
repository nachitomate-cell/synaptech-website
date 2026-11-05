"use client";

import { EVENTO_ABRIR } from "@/lib/consentimiento";

/** Enlace «Cookies» del pie: vuelve a abrir el aviso para cambiar la elección. */
export default function BotonCookies({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR))}>
      Cookies
    </button>
  );
}

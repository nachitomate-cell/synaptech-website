"use client";

import type { ReactNode } from "react";
import { EVENTO_ABRIR } from "@/lib/consentimiento";

/** Abre el aviso de cookies para cambiar la elección. Por defecto dice
 *  «Cookies» (enlace del pie); /privacidad lo usa con su propio texto. */
export default function BotonCookies({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR))}>
      {children ?? "Cookies"}
    </button>
  );
}

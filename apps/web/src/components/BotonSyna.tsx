"use client";

/* Abre el chat de Syna (SynaChat) desde cualquier parte de la página, con el
   evento "abrir-syna" (28-10-2026). */
export default function BotonSyna({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("abrir-syna"))} className={className}>
      {children}
    </button>
  );
}

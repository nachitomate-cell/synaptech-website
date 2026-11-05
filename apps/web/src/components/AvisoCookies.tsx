"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EVENTO_ABRIR, guardarConsentimiento, leerConsentimiento } from "@/lib/consentimiento";

/* Aviso de cookies por finalidad (05-11-2026), con el modelo de ulisesmente.cl:
   Aceptar todo / Rechazar todo / Elegir. Sale abajo a la izquierda para no
   tapar el botón de WhatsApp (abajo a la derecha). Nada de terceros se carga
   hasta que se elige (lib/consentimiento.ts). El enlace «Cookies» del pie lo
   vuelve a abrir con la elección actual marcada. */
export default function AvisoCookies() {
  const [abierto, setAbierto] = useState(false);
  const [eligiendo, setEligiendo] = useState(false);
  const [medicion, setMedicion] = useState(false);
  const [anuncios, setAnuncios] = useState(false);

  useEffect(() => {
    const actual = leerConsentimiento(document.cookie);
    if (!actual) setAbierto(true);
    const abrir = () => {
      const c = leerConsentimiento(document.cookie);
      setMedicion(!!c?.medicion);
      setAnuncios(!!c?.anuncios);
      setEligiendo(true);
      setAbierto(true);
    };
    window.addEventListener(EVENTO_ABRIR, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR, abrir);
  }, []);

  if (!abierto) return null;

  const cerrarCon = (m: boolean, a: boolean) => {
    guardarConsentimiento({ medicion: m, anuncios: a });
    setAbierto(false);
    setEligiendo(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-24 sm:right-auto z-50 sm:max-w-sm rounded-2xl bg-white border border-border-subtle shadow-card p-4 text-[13px] text-text-secondary"
    >
      <p className="text-ink font-semibold text-sm mb-1">Cookies</p>
      <p className="mb-3">
        Usamos cookies para saber de qué campaña llegaste y para medir nuestros anuncios.
        Nada de eso se activa hasta que elijas.{" "}
        <Link href="/privacidad#cookies" className="text-accent hover:underline">Ver detalle</Link>
      </p>

      {eligiendo && (
        <div className="space-y-2.5 mb-3">
          <Opcion
            titulo="Medición"
            texto="Recordar con qué campaña llegaste (cookie propia, 90 días)."
            valor={medicion}
            onCambio={setMedicion}
          />
          <Opcion
            titulo="Anuncios"
            texto="Pixel de Meta y de ChatGPT, para saber qué anuncios funcionan."
            valor={anuncios}
            onCambio={setAnuncios}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {eligiendo ? (
          <button type="button" onClick={() => cerrarCon(medicion, anuncios)}
            className="rounded-full bg-ink text-white px-3.5 py-1.5 font-semibold hover:opacity-90">
            Guardar elección
          </button>
        ) : (
          <>
            <button type="button" onClick={() => cerrarCon(true, true)}
              className="rounded-full bg-ink text-white px-3.5 py-1.5 font-semibold hover:opacity-90">
              Aceptar todo
            </button>
            <button type="button" onClick={() => cerrarCon(false, false)}
              className="rounded-full border border-border-subtle text-ink px-3.5 py-1.5 font-semibold hover:bg-mist">
              Rechazar todo
            </button>
            <button type="button" onClick={() => setEligiendo(true)}
              className="rounded-full text-ink px-2 py-1.5 underline underline-offset-2 hover:text-accent">
              Elegir
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Opcion({ titulo, texto, valor, onCambio }: { titulo: string; texto: string; valor: boolean; onCambio: (v: boolean) => void }) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer">
      <input type="checkbox" checked={valor} onChange={(e) => onCambio(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-[currentColor] text-ink" />
      <span>
        <span className="text-ink font-medium">{titulo}</span>
        <span className="block text-text-muted">{texto}</span>
      </span>
    </label>
  );
}

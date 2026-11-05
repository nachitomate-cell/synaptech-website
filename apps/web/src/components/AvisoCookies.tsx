"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { EVENTO_ABRIR, guardarConsentimiento, leerConsentimiento } from "@/lib/consentimiento";

/* Aviso de cookies por finalidad (05-11-2026). Modelo: ulisesmente.cl.
   - Aceptar y Rechazar tienen EXACTAMENTE el mismo peso visual: el
     consentimiento tiene que ser libre, y un "Rechazar" escondido no lo es.
   - "Elegir" abre interruptores por finalidad; "Necesarias" va fija.
   - En el celular es una franja compacta abajo (no un modal que tape la
     página); en escritorio, una tarjeta abajo a la izquierda, lejos del botón
     de WhatsApp.
   - Nada de terceros se carga hasta que se elige (lib/consentimiento.ts). El
     enlace «Cookies» del pie y el botón de /privacidad lo vuelven a abrir con
     la elección actual. */

const BOTON = "inline-flex flex-1 sm:flex-none items-center justify-center rounded-full px-4 py-2.5 text-[14px] font-semibold transition-colors";
const BOTON_IGUAL = `${BOTON} bg-ink text-white hover:bg-[#1d2a3f]`;

export default function AvisoCookies() {
  const [abierto, setAbierto] = useState(false);
  const [eligiendo, setEligiendo] = useState(false);
  const [medicion, setMedicion] = useState(false);
  const [anuncios, setAnuncios] = useState(false);
  const caja = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leerConsentimiento(document.cookie)) setAbierto(true);
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

  // Al abrirlo a pedido, el foco va al aviso (teclado y lectores de pantalla).
  useEffect(() => {
    if (abierto && eligiendo) caja.current?.focus();
  }, [abierto, eligiendo]);

  if (!abierto) return null;

  const cerrarCon = (m: boolean, a: boolean) => {
    guardarConsentimiento({ medicion: m, anuncios: a });
    setAbierto(false);
    setEligiendo(false);
  };

  return (
    <div
      ref={caja}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-labelledby="aviso-cookies-titulo"
      aria-describedby="aviso-cookies-texto"
      className="fixed z-[60] inset-x-2 bottom-2 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:w-[400px]
        rounded-2xl bg-white border border-border-subtle p-4 sm:p-5 outline-none
        shadow-[0_12px_40px_-8px_rgba(15,26,43,.28),0_2px_6px_rgba(15,26,43,.06)]
        motion-safe:animate-fade-up"
    >
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-syn-lime-tint text-accent-dim">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3-3 3 3 0 0 1-3-3 3 3 0 0 1-3-3Zm-3 8h.01M15 15h.01M10 16h.01" />
          </svg>
        </span>
        <div className="min-w-0">
          <p id="aviso-cookies-titulo" className="font-display text-[15px] font-semibold text-ink">Tú eliges qué cookies usamos</p>
          <p id="aviso-cookies-texto" className="mt-1 text-[13.5px] leading-snug text-text-secondary">
            Con tu permiso medimos de qué campaña llegaste y qué anuncios funcionan. Nada se activa hasta que elijas.{" "}
            <Link href="/privacidad#cookies" className="font-medium text-accent underline underline-offset-2">Detalle</Link>
          </p>
        </div>
      </div>

      {eligiendo && (
        <fieldset className="mt-4 rounded-xl border border-border-subtle divide-y divide-border-subtle">
          <legend className="sr-only">Finalidades</legend>
          <Interruptor titulo="Necesarias" texto="Recuerdan tu elección y el país. Siempre activas." valor fija />
          <Interruptor titulo="Medición" texto="Recordar con qué campaña llegaste (cookie propia, 90 días)." valor={medicion} onCambio={setMedicion} />
          <Interruptor titulo="Anuncios" texto="Pixel de Meta y de ChatGPT, para saber qué anuncios funcionan." valor={anuncios} onCambio={setAnuncios} />
        </fieldset>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {eligiendo ? (
          <>
            <button type="button" onClick={() => cerrarCon(medicion, anuncios)} className={BOTON_IGUAL}>Guardar elección</button>
            <button type="button" onClick={() => cerrarCon(true, true)} className={BOTON_IGUAL}>Aceptar todo</button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => cerrarCon(false, false)} className={BOTON_IGUAL}>Rechazar todo</button>
            <button type="button" onClick={() => cerrarCon(true, true)} className={BOTON_IGUAL}>Aceptar todo</button>
            <button type="button" onClick={() => setEligiendo(true)}
              className="w-full sm:w-auto rounded-full px-3 py-2 text-[14px] font-semibold text-ink underline underline-offset-4 decoration-border-subtle hover:decoration-ink">
              Elegir
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Interruptor({ titulo, texto, valor, onCambio, fija }: {
  titulo: string; texto: string; valor: boolean; onCambio?: (v: boolean) => void; fija?: boolean;
}) {
  const id = `cookie-${titulo.toLowerCase().replace(/[^a-z]/g, "")}`;
  return (
    <div className="flex items-center gap-3 px-3.5 py-3">
      <div className="min-w-0 flex-1">
        <label htmlFor={id} className="block text-[14px] font-semibold text-ink">{titulo}</label>
        <p className="text-[12.5px] leading-snug text-text-muted">{texto}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={valor}
        aria-disabled={fija || undefined}
        onClick={() => !fija && onCambio?.(!valor)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors
          ${valor ? (fija ? "bg-[#7C8796]" : "bg-accent") : "bg-[#C9CFC6]"} ${fija ? "cursor-not-allowed" : ""}`}
      >
        <span className="sr-only">{valor ? "Activado" : "Desactivado"}</span>
        <span aria-hidden="true"
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow motion-safe:transition-transform ${valor ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}

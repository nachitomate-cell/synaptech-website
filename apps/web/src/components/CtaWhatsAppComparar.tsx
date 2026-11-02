"use client";
import { useEffect, useState } from "react";
import { WA_NUMERO } from "@/content/catalogo";
import { conRef, leerToque, toqueDeVisita } from "@/lib/atribucion";

/* "Probar el asistente" y "Pedir migración gratis" directo al WhatsApp
   comercial, desde /comparar y /comparar/precios (01-11-2026).

   - api.whatsapp.com/send y NO wa.me: wa.me rompe los emoji del texto.
   - El texto lo escribe el dueño en primera persona (sin ¿ ni ¡ de apertura,
     sin ";" ni ":"), y termina con el código de campaña `(ref: …)` que arma
     lib/atribucion.ts (refDeToque explica el formato).
   - El href del servidor va SIN ref (funciona sin JS). Al montar y otra vez
     al apretar se le pega el ref leído de la cookie syn_pt: al apretar porque
     en la primera visita AtribucionPrimerToque puede escribir la cookie
     después de que este componente montó. */

const TEXTO_PROBAR = "Hola, vi la comparación de agendas en su página y quiero probar el asistente de WhatsApp con mi local. Me cuentan cómo lo activo";
const TEXTO_MIGRAR = "Hola, hoy uso otra agenda en mi local y quiero cambiarme. Vi que la migración es gratis, me pueden ayudar a pasar mis servicios, mi equipo y mis clientes";

const linkWa = (texto: string) => `https://api.whatsapp.com/send?phone=${WA_NUMERO}&text=${encodeURIComponent(texto)}`;

function toqueActual() {
  return leerToque(document.cookie) ?? toqueDeVisita(location.search, document.referrer, location.pathname);
}

function useLinkConRef(texto: string) {
  const [href, setHref] = useState(() => linkWa(texto));
  useEffect(() => { setHref(linkWa(conRef(texto, toqueActual()))); }, [texto]);
  const alApretar = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    e.currentTarget.href = linkWa(conRef(texto, toqueActual()));
  };
  return { href, onPointerDown: alApretar, onClick: alApretar };
}

/** Cualquier otro botón de WhatsApp de estas páginas: mismo link con ref, para
 *  que ningún clic llegue al bot sin atribución (y sin abrirle la puerta). */
export function LinkWhatsAppConRef({ texto, className, children }: { texto: string; className?: string; children: React.ReactNode }) {
  const link = useLinkConRef(texto);
  return <a {...link} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
}

const IconoWa = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
  </svg>
);

function Botones({ oscuro }: { oscuro?: boolean }) {
  const probar = useLinkConRef(TEXTO_PROBAR);
  const migrar = useLinkConRef(TEXTO_MIGRAR);
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a {...probar} target="_blank" rel="noopener noreferrer"
        className={`inline-flex justify-center items-center gap-2 bg-lime text-ink font-semibold px-6 py-3.5 rounded-full transition-colors ${oscuro ? "hover:bg-white" : "hover:bg-ink hover:text-white"}`}>
        <IconoWa /> Probar el asistente en WhatsApp
      </a>
      <a {...migrar} target="_blank" rel="noopener noreferrer"
        className={`inline-flex justify-center items-center gap-2 font-semibold px-6 py-3.5 rounded-full transition-colors border ${oscuro ? "border-white/30 text-white hover:bg-white hover:text-ink" : "border-ink/20 text-ink hover:bg-ink hover:text-white"}`}>
        Pedir migración gratis
      </a>
    </div>
  );
}

/** En el hero: los dos botones, sin caja. En el cierre: una caja oscura. */
export default function CtaWhatsAppComparar({ variante = "hero" }: { variante?: "hero" | "final" }) {
  if (variante === "hero") {
    return (
      <div className="mt-6">
        <Botones />
        <p className="text-[13px] text-text-muted mt-2.5">Se abre WhatsApp con el mensaje listo para enviar. La mudanza desde tu agenda actual es sin costo.</p>
      </div>
    );
  }
  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="rounded-[24px] bg-ink text-white p-7 sm:p-10">
          <p className="font-display font-bold text-2xl sm:text-3xl tracking-tight">Pruébalo en tu WhatsApp antes de decidir.</p>
          <p className="text-white/70 mt-2 mb-6 max-w-2xl">Escríbenos y ves al asistente respondiendo como lo haría con tus clientes. Si ya usas otra agenda, te mudamos servicios, equipo y clientes gratis.</p>
          <Botones oscuro />
        </div>
      </div>
    </section>
  );
}

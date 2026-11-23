import Image from "next/image";
import Link from "next/link";

/* Novedad del 23-11-2026 (Ignacio): el asistente contesta WhatsApp, Instagram
   y Messenger sin costo extra en todo plan con asistente, con las mismas
   conversaciones del plan. Va justo después de la portada para que se vea
   apenas se entra. Sin la cifra de conversaciones a propósito. */
export default function TresCanales() {
  return (
    <section id="tres-canales" className="bg-[#05080D] px-4 sm:px-6 py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#C8EE2E]">Nuevo</p>
          <h2 className="mt-3 text-[32px] md:text-[44px] font-extrabold leading-[1.08] tracking-tight text-white">
            Tu asistente ahora responde en WhatsApp, Instagram y Messenger.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-white/70">
            Sin costo extra en todo plan con asistente. Contesta y agenda en los tres canales, y las conversaciones de tu plan son las mismas para los tres, no se cuentan aparte.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/precios" className="rounded-full bg-[#C8EE2E] px-6 py-3 text-[15px] font-bold text-[#0c0d0b] hover:brightness-105">
              Ver planes
            </Link>
            <Link href="/agente-ia-omnicanal" className="rounded-full border border-white/20 px-6 py-3 text-[15px] font-semibold text-white hover:bg-white/5">
              Cómo funciona
            </Link>
          </div>
        </div>
        <Image src="/novedades/tres-canales.png" alt="Syna, el asistente de SynapTech, conectado a WhatsApp, Instagram y Messenger, sin costo extra"
          width={1080} height={600} className="w-full rounded-2xl border border-white/10" sizes="(min-width: 768px) 50vw, 100vw" />
      </div>
    </section>
  );
}

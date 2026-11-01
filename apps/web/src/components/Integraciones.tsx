import Link from "next/link";
import Repisa from "./Repisa";
import { CONVENIOS, INTEGRACIONES, type Integracion } from "@/content/integraciones";

/* Convenios e integraciones en la portada (rehecho el 01-11-2026). Los datos y
   las reglas (qué es convenio, qué es integración, qué no se publica) viven en
   content/integraciones.ts, compartidos con /integraciones y /precios.
   Tarjeta al estilo de los carruseles de nvidia.com (23-10-2026). */

function Tarjeta({ i, convenio }: { i: Integracion; convenio?: boolean }) {
  const cuerpo = (
    <>
      <div className="h-36 bg-[#F4F5F1] flex items-center justify-center px-6 relative">
        {convenio && <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-[0.08em] bg-[#76B900] text-black px-2 py-0.5 rounded-[2px]">Convenio</span>}
        {i.logo ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={i.logo} alt={i.tipo === "icono" ? "" : i.nombre} loading="lazy" decoding="async"
              className={i.tipo === "icono" ? "h-12 w-12 object-contain" : i.tipo === "badge" ? "h-11 w-auto max-w-[170px] object-contain" : "max-h-10 w-auto max-w-[170px] object-contain"} />
            {i.tipo === "icono" && <span className="ml-3 font-display font-bold text-ink text-xl tracking-tight">{i.nombre.split(" ")[0]}</span>}
          </>
        ) : (
          <span className="font-display font-bold text-ink text-xl tracking-tight">SynapTech <span className="text-text-muted">+</span> {i.nombre}</span>
        )}
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <p className="text-[12px] font-bold text-ink">{i.cat} <span className="text-text-muted font-normal">|</span> {convenio ? "Convenio" : "Integración"}</p>
        <p className="font-display text-[19px] font-bold text-ink leading-tight">{i.estado}</p>
        <p className="text-[14px] text-text-secondary leading-relaxed">{i.desc}</p>
        {i.href && <span className="mt-auto pt-2 text-[14px] font-bold text-ink inline-flex items-center gap-1.5">Ver más <span className="text-[#76B900]">›</span></span>}
      </div>
    </>
  );
  const clase = "snap-start shrink-0 w-[270px] sm:w-[290px] bg-white rounded-[6px] border border-[#e2e2e2] shadow-[0_2px_10px_rgba(0,0,0,.06)] overflow-hidden flex flex-col hover:shadow-[0_6px_22px_rgba(0,0,0,.12)] transition-shadow";
  return i.href
    ? <Link href={i.href} className={clase}>{cuerpo}</Link>
    : <div className={clase}>{cuerpo}</div>;
}

export default function Integraciones() {
  return (
    <section id="integraciones" className="py-20 md:py-28 border-t border-border-subtle scroll-mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-10 lg:gap-14">
        <div>
          <h2 className="text-ink !text-[clamp(2rem,3.4vw,2.8rem)]">Convenios e integraciones.</h2>
          <p className="text-text-secondary text-lg mt-5 leading-relaxed">
            Cobros con Mercado Pago y Webpay, WhatsApp e Instagram, Wellhub, la tarjeta en Google Wallet y Apple Wallet
            y boletas ante el SII: todo funciona dentro de la plataforma. Solo mostramos lo que hoy usan locales reales.
          </p>
          <Link href="/integraciones" className="mt-6 inline-flex items-center gap-2 text-[15px] font-bold text-ink">
            <svg className="w-3.5 h-3.5 text-[#76B900]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Ver todos los convenios e integraciones
          </Link>
        </div>
        <div className="min-w-0">
          <Repisa etiqueta="Convenios e integraciones" variante="nvidia">
            {CONVENIOS.map((i) => <Tarjeta key={i.id} i={i} convenio />)}
            {INTEGRACIONES.map((i) => <Tarjeta key={i.id} i={i} />)}
          </Repisa>
        </div>
      </div>
    </section>
  );
}

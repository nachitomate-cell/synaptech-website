import Link from "next/link";
import Aparece from "@/components/Aparece";
import TarjetaClub from "@/components/TarjetaClub";
import { waLink } from "@/content/catalogo";

/* El club de fidelización en el inicio (17-11-2026). Hasta hoy la fidelización
   era una tarjeta más dentro del carrusel de la plataforma; Ignacio: "la
   tenemos muy dejada en la página". Va con su propia sección, al estilo de las
   tarjetas de notpato.app: etiqueta, título con media frase en cursiva, dos
   líneas y una pieza VIVA del producto hecha en HTML (TarjetaClub).

   Todo lo que se afirma acá está verificado en /fidelizacion y en
   content/precios.ts (club, Wallet, gift cards y membresías en TODOS los
   planes; Reactivación IA solo en Todo Incluido o como adicional). */
const PUNTOS = [
  "El sello se suma solo al cerrar la cita. Nadie anota nada.",
  "Rangos Silver, Gold y Platinum para premiar a los de siempre.",
  "El panel te muestra quién tiene un premio esperando.",
  "Gift cards y membresías para vender en fechas especiales.",
];

export default function ClubFidelizacion() {
  return (
    <section id="club" className="py-20 md:py-28 bg-[#F5F5F7] scroll-mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
        <Aparece>
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-accent">Fidelización · en todos los planes</p>
          <h2 className="mt-4 text-ink !text-[clamp(2.1rem,4.2vw,3.4rem)]">
            Tus clientes vuelven <em className="font-display italic font-medium text-[#6e6e73]">solos.</em>
          </h2>
          <p className="mt-5 text-lg text-text-secondary leading-relaxed max-w-xl">
            Cada visita suma un sello en la tarjeta del club, que tu cliente guarda en Google Wallet o Apple Wallet
            sin descargar ninguna app. Cuando la completa, le llega el aviso de su premio.
          </p>
          <ul className="mt-7 flex flex-col gap-3 max-w-xl">
            {PUNTOS.map((p) => (
              <li key={p} className="flex gap-3 text-[16px] text-ink">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-accent" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] text-text-secondary leading-relaxed max-w-xl">
            ¿Alguien dejó de venir? La <b className="text-ink">Reactivación IA</b> le escribe a tiempo para que vuelva (viene en Todo Incluido).
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link href="/fidelizacion" className="inline-flex items-center bg-ink text-white font-semibold px-6 py-3.5 rounded-full hover:bg-black transition-colors">
              Ver cómo funciona el club
            </Link>
            <a href={waLink("Hola, quiero ver el club de fidelización de SynapTech (ref: synaptechspa/home/club)")} target="_blank" rel="noopener noreferrer"
              className="font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink transition-colors">
              Verlo con mis precios por WhatsApp
            </a>
          </div>
        </Aparece>

        <TarjetaClub />
      </div>
    </section>
  );
}

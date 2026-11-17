import Link from "next/link";
import Aparece from "@/components/Aparece";
import { TODAS } from "@/content/integraciones";

/* "Se conecta con lo que ya usas" (17-11-2026, idea de notpato.app: los logos
   de los bancos como íconos de app, grandes, sobre fondo oscuro). Va alto en
   el inicio, entre Confianza y el video de Syna, y reemplaza ahí al carrusel
   de Integraciones (que sigue en /precios y /integraciones).

   Los datos, los logos y las reglas de qué se puede decir salen de
   content/integraciones.ts. En especial: solo Mercado Pago es "partner";
   lo demás es integración. "Reservar con Google" sigue como próximamente
   hasta que el botón se vea en Maps (lanzamiento 18-11-2026, verificar antes
   de cambiar el texto). */
/* WhatsApp va con su ícono (public/hub/whatsapp.webp): su logo de
   integraciones es la palabra, y en un cuadrado de app se pierde. */
const ICONO: Record<string, string> = { whatsapp: "/hub/whatsapp.webp" };

const ORDEN: { id: string; corto: string }[] = [
  { id: "whatsapp", corto: "WhatsApp" },
  { id: "instagram", corto: "Instagram" },
  { id: "google", corto: "Google" },
  { id: "google-wallet", corto: "Google Wallet" },
  { id: "apple-wallet", corto: "Apple Wallet" },
  { id: "mercado-pago", corto: "Mercado Pago" },
  { id: "webpay", corto: "Webpay" },
  { id: "sii", corto: "SII" },
  { id: "tuu", corto: "TUU" },
  { id: "wellhub", corto: "Wellhub" },
  { id: "claude", corto: "Claude" },
  { id: "meta-pixel", corto: "Meta Pixel" },
];

export default function Conecta() {
  const items = ORDEN.map((o) => ({ ...o, i: TODAS.find((t) => t.id === o.id) })).filter((x) => x.i?.logo);
  return (
    <section aria-labelledby="conecta-titulo" className="relative overflow-hidden bg-[#05080D] text-white rounded-t-[36px] md:rounded-t-[56px] pt-20 md:pt-28 pb-6">
      <div aria-hidden className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-[140vw] aspect-[2/1] rounded-full opacity-40 blur-[100px]"
        style={{ background: "radial-gradient(closest-side, rgba(156,204,60,.55), transparent)" }} />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 id="conecta-titulo" className="text-white !text-[clamp(2rem,4.4vw,3.4rem)]">
          Se conecta con lo que{" "}
          <span className="bg-gradient-to-r from-[#B8E36A] via-[#9CCC3C] to-[#5EC8F2] bg-clip-text text-transparent">ya usas.</span>
        </h2>
        <p className="mt-5 text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
          Tu WhatsApp, tu Instagram, tu ficha de Google, tus cobros y la tarjeta del club en el teléfono de tus clientes. Sin cambiar de número ni de banco.
        </p>

        <ul className="mt-14 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-9 list-none p-0">
          {items.map(({ id, corto, i }, n) => (
            <li key={id}>
              <Aparece delay={(n % 6) * 0.05}>
                <div className="relative mx-auto grid place-items-center w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] rounded-[22px] sm:rounded-[26px] bg-white shadow-[0_14px_34px_-14px_rgba(156,204,60,.45)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ICONO[id] ?? i!.logo} alt="" loading="lazy" decoding="async"
                    className={ICONO[id] || i!.tipo === "icono" ? "w-11 h-11 sm:w-12 sm:h-12 object-contain" : "w-[86%] max-h-[58%] object-contain"} />
                  {id === "mercado-pago" && (
                    <span className="absolute -top-2 -right-2 bg-[#9CCC3C] text-[#05080D] text-[10px] font-bold px-1.5 py-0.5 rounded-full">Partner</span>
                  )}
                </div>
                <p className="mt-3 text-[14px] sm:text-[15px] font-semibold text-white/85">{corto}</p>
              </Aparece>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-white/45">
          Reservar con Google: próximamente ·{" "}
          <Link href="/integraciones" className="text-white/75 underline underline-offset-4 decoration-white/30 hover:decoration-white">Ver todas las integraciones</Link>
        </p>
      </div>
    </section>
  );
}

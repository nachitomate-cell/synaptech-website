import type { Metadata } from "next";
import Header    from "@/components/Header";
import Footer    from "@/components/Footer";
import Recorrido from "@/components/Recorrido";
import Pricing   from "@/components/Pricing";
import CtaFinal  from "@/components/CtaFinal";
import { FilaCapsulas } from "@/components/Capsulas";
import { HeroRubro, Dolores, type Dolor } from "@/components/Rubro";
import { MODULOS, MODULOS_ESTETICA } from "@/content/recorrido";

export const metadata: Metadata = {
  title: "Club de fidelización para barberías y salones | Sellos, premios y tarjeta en Google Wallet y Apple Wallet | SynapTech",
  description: "Un club de sellos con premios y rangos, la tarjeta del cliente en Google Wallet y Apple Wallet, y gift cards que se canjean en la agenda. Incluido en todos los planes de SynapTech, desde $29.900 + IVA al mes.",
  alternates: { canonical: "https://synaptechspa.cl/fidelizacion" },
};

/* Reescrita el 09-10-2026. La versión anterior era de la etapa en que el sitio
   vendía desarrollo a medida: "Sistemas de Fidelización Digital" para "retail y
   servicios", una grilla de pilares tecnológicos y funciones sin verificar.
   Ahora es el módulo del producto, con las mismas capturas de /como-funciona. */
const DOLORES: Dolor[] = [
  { dolor: "Tarjetas de papel que se pierden", solucion: "La tarjeta en el teléfono", detalle: "El cliente guarda su tarjeta en Google Wallet o Apple Wallet y ve sus sellos sin descargar nada." },
  { dolor: "Anotar a mano quién lleva cuántas visitas", solucion: "Sellos solos", detalle: "El sello se suma al cerrar la cita, y el panel te muestra quién ya tiene un premio listo." },
  { dolor: "Premiar igual al que viene una vez que al de siempre", solucion: "Rangos", detalle: "Silver, Gold y Platinum para reconocer a los que más vienen." },
  { dolor: "Premios que nadie se acuerda de canjear", solucion: "Aviso de premio listo", detalle: "Al cliente le llega un aviso cuando desbloquea un premio, y si no vuelve, puedes recordárselo por correo." },
  { dolor: "No saber si el club sirve", solucion: "El club en números", detalle: "Miembros, canjes y premios activos del período, en el mismo panel." },
  { dolor: "Fechas que venden y nada que regalar", solucion: "Gift cards", detalle: "Cada una con su código, su monto y su vencimiento, y se canjean en la agenda." },
];

const CLUB = MODULOS.find((m) => m.id === "club")!;
const GIFT = MODULOS_ESTETICA.find((m) => m.id === "fidelizar")!;

export default function FidelizacionPage() {
  return (
    <>
      <Header />
      <main>
        <HeroRubro
          eyebrow="Club de fidelización"
          titulo="Que tus clientes vuelvan, y lo vean en su teléfono."
          bajada="Sellos por visita, premios y rangos, con la tarjeta del cliente en Google Wallet y Apple Wallet. Viene en todos los planes."
          origen="fidelizacion-hero"
          mensajeWa="Hola, quiero ver el club de fidelización de SynapTech"
          escritorio={{ src: "/panel/club-premios.webp", alt: "Escalera de premios del club de fidelidad en el panel de SynapTech", w: 2880, h: 1800 }}
        />

        <Dolores titulo="Lo que hace el club por ti." items={DOLORES} />

        {[CLUB, GIFT].map((m, i) => (
          <section key={m.id} id={m.id} className={`py-16 md:py-24 scroll-mt-20 ${i % 2 ? "" : "bg-mist"}`}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <div className="max-w-3xl mb-6">
                <p className="eyebrow mb-3">{String(i + 1).padStart(2, "0")} · {m.nombre}</p>
                <h2 className="text-ink">{m.titular}</h2>
                <p className="text-text-secondary text-lg mt-4 leading-relaxed">{m.bajada}</p>
              </div>
              <Recorrido modulo={m} />
            </div>
          </section>
        ))}

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-8">
              <p className="eyebrow mb-3">En video</p>
              <h2 className="text-ink">Así lo vive tu cliente.</h2>
            </div>
            <FilaCapsulas ids={CLUB.capsulas} />
            <p className="text-sm text-text-muted mt-8 max-w-3xl">
              Capturas y videos de un local de ejemplo con datos inventados.
            </p>
          </div>
        </section>

        <Pricing />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

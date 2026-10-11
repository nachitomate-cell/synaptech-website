import Link from "next/link";
import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import CtaFinal from "@/components/CtaFinal";
import { FUNCIONES } from "@/content/funciones";
import { metaPagina } from "@/lib/seo";

/* Índice de funciones (11-10-2026): un enlace interno a cada página de
   función, más las que viven en su propia ruta. */
export const metadata = metaPagina({
  title: "Funciones de SynapTech: agenda, caja, comisiones y más",
  description: "Todo lo que hace SynapTech por tu local: recordatorios por WhatsApp, comisiones, caja, ficha clínica, abono al reservar, gift cards, tienda online y más.",
  path: "/funciones",
});

const OTRAS = [
  { href: "/asistente-ia-whatsapp", nombre: "Asistente con IA en WhatsApp", d: "Responde y agenda en el número de tu local." },
  { href: "/fidelizacion", nombre: "Club de fidelización", d: "Sellos, premios y la tarjeta en Google Wallet y Apple Wallet." },
  { href: "/tienda-online", nombre: "Tienda online", d: "Vende tus productos por internet con tu marca." },
  { href: "/guias/boleta-honorarios-y-comisiones-barberos", nombre: "Boletas de honorarios", d: "Arriendo de sillón con la boleta de cada profesional." },
];

export default function Funciones() {
  const todas = [...FUNCIONES.map((f) => ({ href: `/funciones/${f.slug}`, nombre: f.nombre, d: f.bajada.split(". ")[0] + "." })), ...OTRAS];
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-16 md:pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">Funciones</p>
            <h1 className="text-ink max-w-4xl">Todo lo que hace SynapTech por tu local.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 max-w-2xl">Una sola plataforma para la agenda, los cobros, el equipo y tus clientes. Elige una función para verla en detalle.</p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 list-none p-0 m-0">
              {todas.map((f) => (
                <li key={f.href}>
                  <Link href={f.href} className="block h-full rounded-[24px] border border-border-subtle p-6 hover:border-ink/40 transition-colors">
                    <span className="block font-display font-bold text-xl text-ink">{f.nombre}</span>
                    <span className="block text-text-secondary mt-2 leading-relaxed">{f.d}</span>
                    <span className="block text-accent font-semibold mt-4">Ver →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

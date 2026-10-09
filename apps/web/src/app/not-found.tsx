import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* 404 en español y con salida al producto (antes: la de Next, en inglés). */
export const metadata = { title: { absolute: "Página no encontrada | SynapTech" }, robots: { index: false } };

export default function NoEncontrada() {
  return (
    <>
      <Header />
      <main className="pt-32 md:pt-40 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="eyebrow mb-5">Error 404</p>
          <h1 className="text-ink">Esta página no existe.</h1>
          <p className="text-text-secondary text-lg mt-5 leading-relaxed">
            Puede que el enlace esté viejo. Esto es lo que más buscan quienes llegan acá:
          </p>
          <ul className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              ["/barberias", "Software para barberías"],
              ["/peluquerias", "Peluquerías y salones"],
              ["/estetica", "Centros de estética"],
              ["/precios", "Precios"],
              ["/comparar", "Comparar agendas"],
              ["/locales", "Encuentra un local"],
            ].map(([h, t]) => (
              <li key={h}>
                <Link href={h} className="inline-flex px-4 py-2 rounded-full bg-mist text-[14px] font-semibold text-ink hover:bg-lime/30 transition-colors">{t}</Link>
              </li>
            ))}
          </ul>
          <Link href="/" className="inline-flex mt-10 bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">Ir al inicio</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

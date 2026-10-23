import Link from "next/link";

/* Tira de pestañas bajo la portada, como la de nvidia.com (23-10-2026): cada
   una con su raya arriba, una etiqueta chica y una línea. La primera va con
   la raya verde; al pasar el mouse se enciende la de cada una. Llevan a la
   tarjeta de la plataforma correspondiente (ids de VitrinaPlataforma) y la
   última, a la página de Wellhub. */
const PESTANAS = [
  { etiqueta: "Agenda online", texto: "Tus clientes reservan solos, a cualquier hora", href: "/#agenda" },
  { etiqueta: "Inteligencia artificial", texto: "Syna responde y agenda por WhatsApp", href: "/#asistente" },
  { etiqueta: "Cobros", texto: "Caja, comisiones y boletas ante el SII", href: "/#cobros" },
  { etiqueta: "Fidelización", texto: "Sellos, premios y tarjeta en Wallet", href: "/#fidelizacion" },
  { etiqueta: "Nuevo · Wellhub", texto: "El check-in de tus alumnas, validado solo", href: "/wellhub" },
];

export default function TiraPortada() {
  return (
    <nav aria-label="Lo principal de SynapTech" className="bg-[#05080D] border-t border-white/10">
      <ul className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-2 md:grid-cols-5 gap-x-6 list-none m-0 py-8">
        {PESTANAS.map((p, i) => (
          <li key={p.href} className={i === 4 ? "col-span-2 md:col-span-1" : ""}>
            <Link href={p.href} className="group block pt-4 pb-3">
              <span className={`block h-[3px] -mt-4 mb-4 transition-colors ${i === 0 ? "bg-[#76B900]" : "bg-white/15 group-hover:bg-[#76B900]"}`} />
              <span className="block text-[12px] font-semibold text-white/50">{p.etiqueta}</span>
              <span className="block mt-1 text-[15px] leading-snug text-white/85 group-hover:text-white">{p.texto}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

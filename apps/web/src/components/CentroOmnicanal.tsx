import Image from "next/image";

/* Centro omnicanal de la portada (pedido de Ignacio 26-10-2026: "el centro
   omnicanal en la portada de synaptechspa.cl; la animación ya está hecha en
   HTML, así que puede vivir en el sitio de verdad"). Es la escena del video
   pitch (videos-pipeline/pitch-omnicanal): los canales en órbita alrededor de
   Syna, las líneas que se trazan hacia ella y los datos que viajan por ellas
   hasta la agenda, que es la vitrina de abajo.

   Todo es CSS y SVG (globals.css, bloque "Centro omnicanal"): sin JavaScript
   en el cliente. Coordenadas en un lienzo de 1000×620; el contenedor tiene esa
   misma proporción, así los nodos (en %) y las líneas (viewBox) calzan a
   cualquier ancho. Con movimiento reducido queda la escena final quieta. */

const CENTRO = { x: 500, y: 290 };
const ANCHO = 1000, ALTO = 620;

type Nodo = { etq: string; x: number; y: number; img?: string; foto?: boolean; ancho?: boolean; texto?: [string, string] };
const NODOS: Nodo[] = [
  { etq: "WhatsApp", img: "/hub/whatsapp.webp", x: 180, y: 150 },
  { etq: "Instagram", img: "/integraciones/instagram.png", x: 385, y: 62 },
  { etq: "Google Maps", img: "/integraciones/google-maps.svg", x: 615, y: 62 },
  { etq: "Reserva web", texto: ["tulocal", ".synaptechspa.cl"], x: 820, y: 150 },
  { etq: "Tótem en el local", img: "/hub/totem.webp", foto: true, x: 120, y: 390 },
  { etq: "Tarjeta en Wallet", img: "/integraciones/apple-wallet.svg", ancho: true, x: 880, y: 390 },
];

export default function CentroOmnicanal() {
  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 mt-14 md:mt-20">
      <p className="text-center text-[15px] sm:text-lg font-semibold tracking-tight text-white/80 hub-aparece" style={{ animationDelay: "200ms" }}>
        Todos los canales. <span className="text-[#B8E36A]">Una sola agenda.</span>
      </p>

      <div className="relative mt-6 sm:mt-8" style={{ aspectRatio: `${ANCHO} / ${ALTO}` }}>
        {/* Líneas: se trazan desde cada canal hacia Syna; encima, los datos viajando. */}
        <svg viewBox={`0 0 ${ANCHO} ${ALTO}`} className="absolute inset-0 w-full h-full" aria-hidden>
          {NODOS.map((n, i) => (
            <g key={n.etq}>
              <line x1={n.x} y1={n.y} x2={CENTRO.x} y2={CENTRO.y} pathLength={1}
                className="hub-linea" stroke="#9CCC3C" strokeOpacity={0.45} strokeWidth={2} strokeLinecap="round"
                style={{ animationDelay: `${1500 + i * 110}ms` }} />
              <line x1={n.x} y1={n.y} x2={CENTRO.x} y2={CENTRO.y} pathLength={1}
                className="hub-flujo" stroke="#C6F94E" strokeWidth={5} strokeLinecap="round"
                style={{ animationDelay: `${2400 + i * 230}ms` }} />
            </g>
          ))}
          {/* De Syna a la agenda (la vitrina que sigue abajo). */}
          <line x1={CENTRO.x} y1={CENTRO.y + 70} x2={CENTRO.x} y2={ALTO} pathLength={1}
            className="hub-linea" stroke="#9CCC3C" strokeOpacity={0.45} strokeWidth={2} strokeLinecap="round" style={{ animationDelay: "2300ms" }} />
          <line x1={CENTRO.x} y1={CENTRO.y + 70} x2={CENTRO.x} y2={ALTO} pathLength={1}
            className="hub-flujo hub-flujo-rapido" stroke="#C6F94E" strokeWidth={5} strokeLinecap="round" style={{ animationDelay: "2900ms" }} />
        </svg>

        {/* Syna al centro */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[17%]" style={{ left: `${(CENTRO.x / ANCHO) * 100}%`, top: `${(CENTRO.y / ALTO) * 100}%` }}>
          <div aria-hidden className="absolute inset-[-35%] rounded-full hub-pulso" style={{ background: "radial-gradient(closest-side, rgba(198,249,78,.35), transparent)" }} />
          <div className="relative hub-aparece" style={{ animationDelay: "500ms" }}>
            <Image src="/hub/syna.webp" alt="Syna, el asistente con IA de SynapTech" width={276} height={520} priority
              sizes="(min-width: 1024px) 150px, 17vw" className="w-full h-auto hero-flota drop-shadow-[0_24px_30px_rgba(0,0,0,.55)]" />
          </div>
        </div>

        {/* Canales */}
        {NODOS.map((n, i) => (
          <div key={n.etq} className="absolute -translate-x-1/2 -translate-y-1/2 w-[11%] flex flex-col items-center"
            style={{ left: `${(n.x / ANCHO) * 100}%`, top: `${(n.y / ALTO) * 100}%` }}>
            <div className="hub-nodo w-full" style={{ animationDelay: `${800 + i * 140}ms` }}>
              <div className="hero-flota aspect-square w-full rounded-[22%] bg-white grid place-items-center shadow-[0_20px_40px_-14px_rgba(0,0,0,.7)]"
                style={{ animationDelay: `${-i * 0.9}s` }}>
                {n.img && (
                  <Image src={n.img} alt={n.etq} width={120} height={120} sizes="110px" unoptimized={n.img.endsWith(".svg")}
                    className={n.foto ? "w-[86%] h-auto rounded-md" : n.ancho ? "w-[86%] h-auto" : "w-[62%] h-auto"} />
                )}
                {n.texto && (
                  <p className="text-[clamp(6px,1.05vw,11px)] leading-tight font-semibold text-[#1d1d1f] text-center">
                    {n.texto[0]}<br />{n.texto[1]}
                  </p>
                )}
              </div>
            </div>
            <p className="hidden sm:block mt-2 text-[12px] font-medium text-white/55 whitespace-nowrap hub-aparece" style={{ animationDelay: `${1100 + i * 140}ms` }}>
              {n.etq}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

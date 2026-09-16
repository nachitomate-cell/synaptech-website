"use client";
import Image from "next/image";

/* Locales reales operando sobre la plataforma. El criterio para entrar acá no es
   "es cliente", es ACTIVIDAD MEDIDA: citas agendadas en los últimos 30 días
   (consultado en Firestore el 16-09-2026). Si un local se apaga, sale de la
   lista — un carrusel de logos que incluye locales muertos es prueba social
   falsa y se nota.

       INFINITY 400 · AURA 400 · Oren 400 · D'Jones 372 · El 10 334
       Sion 283 · New Glow 262 · Renacer 228 · GLOW Studio 182 · Latin Caribe 175

   🔴 DÓNDE ESTÁN LOS LOGOS, que cuesta encontrarlos: cada local tiene el suyo en
   `<tenant>/logo.png|webp` DENTRO del repo de la plataforma — en una subcarpeta
   por tenant, no en la raíz. La ruta canónica la declara Firestore en
   `tenants/<tid>/configuracion/wallet.logoUrl`. Buscar por nombre de archivo en
   la raíz o en Storage da casi nada y lleva a concluir, en falso, que no hay
   logos. */
/* `invertir` es para los logos que vienen con FONDO BLANCO: sobre el fondo
   oscuro del sitio se ven como un parche. Invertirlos funde el blanco con el
   fondo y deja el texto legible en claro. Solo aplica a marcas monocromas —
   con un logo a color lo arruinaría, y ahí la salida es pedir la versión en
   PNG transparente. */
const LOCALES = [
  { nombre: "INFINITY STUDIO",   img: "/locales/infinity.png"                     },
  { nombre: "AURA Salón",        img: "/locales/aura.png",        invertir: true  },
  { nombre: "Oren Barber",       img: "/locales/oren.webp"                        },
  { nombre: "D'Jones Barber",    img: "/locales/djones.png"                       },
  { nombre: "El 10 Salón",       img: "/locales/el10.png"                         },
  { nombre: "Sion Barbería",     img: "/locales/sion.png"                         },
  { nombre: "New Glow",          img: "/locales/newglow.png"                      },
  { nombre: "Peluquería Renacer", img: "/locales/renacer.webp"                    },
  { nombre: "GLOW Studio",       img: "/locales/glowstudio.png"                   },
  { nombre: "Latin Caribe",      img: "/locales/latincaribe.png"                  },
];

function Fila({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="flex items-center gap-14 shrink-0 m-0 p-0 list-none animate-marquee"
      aria-hidden={ariaHidden || undefined}
    >
      {LOCALES.map((l) => (
        <li key={l.nombre} className="shrink-0">
          <div
            className="relative w-[120px] h-[60px] opacity-60 hover:opacity-100 transition-opacity duration-300"
            title={l.nombre}
          >
            <Image
              src={l.img}
              alt={l.nombre}
              fill
              sizes="120px"
              className="object-contain"
              style={l.invertir ? { filter: "invert(1)" } : undefined}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function LogosLocales() {
  return (
    <section className="py-14 border-t border-border-subtle overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <p className="eyebrow mb-8 text-center">Locales que ya la usan</p>

        {/* Dos filas idénticas en secuencia: cuando la primera termina su
            recorrido, la segunda ya está en posición y el loop no salta. */}
        <div className="relative flex gap-14 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <Fila />
          <Fila ariaHidden />
        </div>
      </div>
    </section>
  );
}

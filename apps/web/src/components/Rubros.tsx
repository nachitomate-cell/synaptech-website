"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RUBROS, SIGNUP_URL } from "@/content/catalogo";

/* Pestañas por rubro. El menú enlaza a /#rubro-<id>: al llegar con ese hash
   se abre la pestaña que corresponde. */
export default function Rubros() {
  const [activo, setActivo] = useState(RUBROS[0].id);

  useEffect(() => {
    const leerHash = () => {
      const m = window.location.hash.match(/^#rubro-(.+)$/);
      if (m && RUBROS.some((r) => r.id === m[1])) {
        setActivo(m[1]);
        document.getElementById("rubros")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    leerHash();
    window.addEventListener("hashchange", leerHash);
    return () => window.removeEventListener("hashchange", leerHash);
  }, []);

  const r = RUBROS.find((x) => x.id === activo) ?? RUBROS[0];

  return (
    <section id="rubros" className="py-16 md:py-24">
      {/* Anclas invisibles para que /#rubro-<id> exista también sin JS */}
      {RUBROS.map((x) => <span key={x.id} id={`rubro-${x.id}`} className="block -mt-px h-px" aria-hidden />)}

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mb-10">
          <p className="eyebrow mb-4">Por rubro</p>
          <h2 className="text-ink">Hecho para cómo trabaja tu negocio.</h2>
        </div>

        <div role="tablist" aria-label="Rubros"
          className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 [scrollbar-width:none]">
          {RUBROS.map((x) => (
            <button key={x.id} role="tab" aria-selected={x.id === activo} aria-controls="rubro-panel"
              onClick={() => setActivo(x.id)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-[15px] font-semibold transition-colors ${
                x.id === activo ? "bg-ink text-white" : "bg-mist text-text-secondary hover:text-ink"
              }`}>
              {x.nombre}
            </button>
          ))}
        </div>

        <div id="rubro-panel" role="tabpanel"
          className="rounded-[28px] bg-mist p-7 sm:p-10 lg:p-14 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <h3 className="font-display font-bold text-ink text-[28px] sm:text-[40px] leading-[1.08] tracking-tight">
              {r.titular}
            </h3>
            <p className="text-text-secondary text-lg mt-5 leading-relaxed max-w-xl">{r.texto}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href={`${SIGNUP_URL}?ref=home-rubro-${r.id}`}
                className="inline-flex items-center bg-ink text-white font-semibold px-6 py-3.5 rounded-full hover:bg-black transition-colors">
                Empezar gratis
              </a>
              {r.href && (
                <Link href={r.href}
                  className="inline-flex items-center border border-ink/15 text-ink font-semibold px-6 py-3.5 rounded-full hover:border-ink/40 transition-colors">
                  Ver más de {r.nombre.toLowerCase()}
                </Link>
              )}
            </div>
          </div>
          <ul className="flex flex-col gap-3">
            {r.puntos.map((p) => (
              <li key={p} className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4">
                <span aria-hidden className="w-8 h-8 shrink-0 rounded-full bg-lime/30 text-accent flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="font-semibold text-ink">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

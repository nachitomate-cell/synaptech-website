"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { LocalDirectorio, Rubro } from "@/lib/directorio";

/* Directorio: filtros por rubro y región, tarjetas con el logo de cada local
   centrado sobre su propio color, y el mapa sincronizado (en escritorio queda
   fijo a la derecha mientras se recorre la lista; en el celular va arriba).
   El mapa se carga aparte y solo en el navegador. */
const MapaLocales = dynamic(() => import("./MapaLocales"), {
  ssr: false,
  loading: () => <div className="h-full w-full rounded-[24px] bg-[#eef0ec]" />,
});

const RUBROS: { id: "todos" | Rubro; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "barberia", label: "Barberías" },
  { id: "salon", label: "Peluquerías y salones" },
  { id: "estetica", label: "Estética y clínicas" },
  { id: "pilates", label: "Pilates" },
];

export default function ListaLocales({ locales }: { locales: LocalDirectorio[] }) {
  const [rubro, setRubro] = useState<"todos" | Rubro>("todos");
  const [region, setRegion] = useState("todas");
  const [activo, setActivo] = useState<string | null>(null);
  const [enfoque, setEnfoque] = useState<{ id: string; n: number } | null>(null);
  const tarjetas = useRef(new Map<string, HTMLElement>());
  // MapLibre pesa ~3 s de JS en un celular: se carga con la primera
  // interacción (scroll, toque, mouse o teclado) o a los 5 s, no durante la
  // carga de la página (auditoría SEO 09-10-2026). El contenedor ya tiene su
  // alto, así que el mapa no mueve nada al aparecer.
  const [mapaListo, setMapaListo] = useState(false);
  useEffect(() => {
    const eventos = ["scroll", "pointermove", "touchstart", "keydown"] as const;
    const listo = () => { setMapaListo(true); limpiar(); };
    const t = setTimeout(listo, 5000);
    const limpiar = () => { clearTimeout(t); eventos.forEach((e) => window.removeEventListener(e, listo)); };
    eventos.forEach((e) => window.addEventListener(e, listo, { once: true, passive: true }));
    return limpiar;
  }, []);

  const regiones = useMemo(() => {
    const c = new Map<string, number>();
    locales.forEach((l) => l.region && c.set(l.region, (c.get(l.region) ?? 0) + 1));
    return [...c.entries()].sort((a, b) => b[1] - a[1]).map(([r]) => r);
  }, [locales]);

  const lista = locales.filter((l) => (rubro === "todos" || l.rubro === rubro) && (region === "todas" || l.region === region));
  const cuenta = (r: "todos" | Rubro) => locales.filter((l) => (r === "todos" || l.rubro === r) && (region === "todas" || l.region === region)).length;

  // Desde el mapa: resaltar la tarjeta y llevarla a la vista.
  const desdeMapa = (id: string) => {
    setActivo(id);
    tarjetas.current.get(id)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <>
      <div className="flex flex-col gap-3 mb-8">
        <div role="tablist" aria-label="Rubro" className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none]">
          {RUBROS.map((r) => (
            <button key={r.id} role="tab" aria-selected={rubro === r.id} onClick={() => setRubro(r.id)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-[15px] font-semibold transition-colors ${
                rubro === r.id ? "bg-ink text-white" : "bg-mist text-text-secondary hover:text-ink"
              }`}>
              {r.label} <span className={rubro === r.id ? "text-white/60" : "text-text-muted"}>{cuenta(r.id)}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none]" aria-label="Región">
          {["todas", ...regiones].map((r) => (
            <button key={r} onClick={() => setRegion(r)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-[13.5px] font-medium border transition-colors ${
                region === r ? "border-ink text-ink bg-white" : "border-border-subtle text-text-muted hover:text-ink"
              }`}>
              {r === "todas" ? "Todas las regiones" : r === "Metropolitana" ? "Región Metropolitana" : `Región de ${r}`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
        <div className="order-2 lg:order-1 grid sm:grid-cols-2 gap-4">
          {lista.map((l) => (
            <article key={l.id} ref={(el) => { if (el) tarjetas.current.set(l.id, el); }}
              onMouseEnter={() => setActivo(l.id)}
              className={`rounded-[22px] bg-white border overflow-hidden flex flex-col transition-shadow ${
                activo === l.id ? "border-lime shadow-card-hover ring-2 ring-lime/60" : "border-border-subtle hover:shadow-card-hover"
              }`}>
              <div className="relative aspect-[16/10]" style={{ backgroundColor: l.fondo }}>
                {l.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/directorio-logos/${l.id}.webp`} alt={`Logo de ${l.nombre}`} loading="lazy" decoding="async"
                    className="absolute inset-0 w-full h-full object-contain" />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-4xl text-white/90">
                    {l.nombre.split(/\s+/).slice(0, 2).map((p) => p[0]).join("")}
                  </span>
                )}
                {l.comuna && (
                  <span className={`absolute left-3 top-3 text-xs font-semibold px-2.5 py-1 rounded-full ${l.oscuro ? "bg-white/90 text-ink" : "bg-ink/85 text-white"}`}>
                    {l.comuna}
                  </span>
                )}
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display font-bold text-ink text-[17px] leading-snug">{l.nombre}</h2>
                  {l.rating && (
                    <p className="shrink-0 text-sm font-semibold text-ink flex items-center gap-1" title={l.opiniones ? `${l.opiniones} opiniones en Google` : undefined}>
                      <svg className="w-4 h-4 text-[#F5A623]" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      {l.rating.toFixed(1)}
                      {l.opiniones && <span className="font-normal text-text-muted">({l.opiniones})</span>}
                    </p>
                  )}
                </div>
                {l.direccion && <p className="text-sm text-text-muted mt-1">{l.direccion}</p>}
                <div className="mt-auto pt-4 flex items-center gap-2">
                  <a href={l.url} target="_blank" rel="noopener"
                    className="flex-1 inline-flex justify-center items-center bg-ink text-white font-semibold px-4 py-2.5 rounded-full hover:bg-black transition-colors text-[15px]">
                    {l.reserva ? "Reservar hora" : "Ver local"}
                  </a>
                  {l.lat != null && (
                    <button type="button" onClick={() => { setActivo(l.id); setEnfoque((e) => ({ id: l.id, n: (e?.n ?? 0) + 1 })); }}
                      className="w-11 h-11 shrink-0 rounded-full border border-border-subtle text-ink hover:border-ink flex items-center justify-center"
                      aria-label={`Ver ${l.nombre} en el mapa`} title="Ver en el mapa">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
          {lista.length === 0 && <p className="text-text-muted sm:col-span-2">No hay locales con ese filtro todavía.</p>}
        </div>

        <div className="order-1 lg:order-2 h-[340px] sm:h-[420px] lg:h-[calc(100vh-120px)] lg:sticky lg:top-[96px]">
          {mapaListo
            ? <MapaLocales locales={lista} activo={activo} onSeleccion={desdeMapa} enfoque={enfoque} />
            : <div className="h-full w-full rounded-[24px] bg-[#eef0ec]" aria-hidden />}
        </div>
      </div>
    </>
  );
}

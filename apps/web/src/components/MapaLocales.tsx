"use client";
import { useEffect, useRef, useState } from "react";
import type { Map as MapaML, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { LocalDirectorio } from "@/lib/directorio";

/* Mapa del directorio con MapLibre (WebGL, vectorial) y los mapas libres de
   OpenFreeMap (estilo Positron, sin clave ni cuota). La librería se descarga
   recién cuando el mapa entra en pantalla, para no frenar la página.
   Cada local es un marcador con su logo; al tocarlo se abre su ficha corta y
   se avisa a la lista para que lo resalte. */

const ESTILO = "https://tiles.openfreemap.org/styles/positron";

export const ZONAS: { id: string; label: string; centro: [number, number]; zoom: number }[] = [
  { id: "todo", label: "Todo Chile", centro: [-71.2, -33.4], zoom: 5.3 },
  { id: "valpo", label: "Gran Valparaíso", centro: [-71.42, -33.0], zoom: 9.6 },
  { id: "vina", label: "Viña del Mar", centro: [-71.553, -33.02], zoom: 13.4 },
  { id: "stgo", label: "Santiago", centro: [-70.75, -33.5], zoom: 9.3 },
];

export default function MapaLocales({ locales, activo, onSeleccion, enfoque }: {
  locales: LocalDirectorio[];
  activo: string | null;
  onSeleccion: (id: string) => void;
  enfoque: { id: string; n: number } | null;
}) {
  const caja = useRef<HTMLDivElement>(null);
  const mapa = useRef<MapaML | null>(null);
  const marcadores = useRef(new Map<string, Marker>());
  const [listo, setListo] = useState(false);
  const [zona, setZona] = useState("todo");

  // Carga perezosa: la librería (~250 KB) baja solo cuando el mapa se ve.
  useEffect(() => {
    const el = caja.current;
    if (!el) return;
    let vivo = true;
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting || mapa.current) return;
      io.disconnect();
      const ml = await import("maplibre-gl");
      if (!vivo || !caja.current) return;
      const conPunto = locales.filter((l) => l.lat != null && l.lng != null);
      const m = new ml.Map({
        container: caja.current, style: ESTILO, attributionControl: { compact: true },
        center: ZONAS[0].centro, zoom: ZONAS[0].zoom, cooperativeGestures: true,
        fadeDuration: 0,
      });
      m.addControl(new ml.NavigationControl({ showCompass: false }), "top-right");
      m.on("load", () => {
        if (conPunto.length) {
          const b = new ml.LngLatBounds();
          conPunto.forEach((l) => b.extend([l.lng!, l.lat!]));
          m.fitBounds(b, { padding: 60, duration: 0, maxZoom: 12 });
        }
        setListo(true);
      });
      for (const l of conPunto) {
        const nodo = document.createElement("button");
        nodo.type = "button";
        nodo.className = "marcador-local";
        nodo.setAttribute("aria-label", l.nombre);
        nodo.style.backgroundImage = `url(/directorio-logos/${l.id}-pin.webp)`;
        nodo.style.backgroundColor = l.fondo;
        nodo.addEventListener("click", () => onSeleccion(l.id));
        const popup = new ml.Popup({ offset: 26, closeButton: false, maxWidth: "260px" }).setHTML(
          `<strong>${l.nombre.replace(/</g, "&lt;")}</strong><span>${[l.direccion, l.comuna].filter(Boolean).join(" · ").replace(/</g, "&lt;")}</span>` +
          `<a href="${l.url}" target="_blank" rel="noopener">${l.reserva ? "Reservar hora" : "Ver local"} →</a>`);
        const mk = new ml.Marker({ element: nodo }).setLngLat([l.lng!, l.lat!]).setPopup(popup).addTo(m);
        marcadores.current.set(l.id, mk);
      }
      mapa.current = m;
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => { vivo = false; io.disconnect(); mapa.current?.remove(); mapa.current = null; marcadores.current.clear(); };
    // Los locales se fijan al montar; los filtros solo esconden marcadores (efecto de abajo).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtros de la lista: se muestran solo los marcadores de los locales visibles.
  useEffect(() => {
    const visibles = new Set(locales.map((l) => l.id));
    marcadores.current.forEach((mk, id) => { mk.getElement().style.display = visibles.has(id) ? "" : "none"; });
  }, [locales, listo]);

  // Local activo: su marcador se agranda y queda arriba.
  useEffect(() => {
    marcadores.current.forEach((mk, id) => mk.getElement().classList.toggle("activo", id === activo));
  }, [activo, listo]);

  // "Ver en el mapa" desde una tarjeta: vuela al local y abre su ficha.
  useEffect(() => {
    if (!enfoque || !mapa.current) return;
    const mk = marcadores.current.get(enfoque.id);
    if (!mk) return;
    marcadores.current.forEach((x) => x.getPopup()?.isOpen() && x.togglePopup());
    mapa.current.flyTo({ center: mk.getLngLat(), zoom: Math.max(mapa.current.getZoom(), 14), speed: 1.6, curve: 1.3, essential: true });
    mk.togglePopup();
    setZona("");
  }, [enfoque]);

  const irA = (z: (typeof ZONAS)[number]) => {
    setZona(z.id);
    mapa.current?.flyTo({ center: z.centro, zoom: z.zoom, speed: 1.6, curve: 1.3, essential: true });
  };

  return (
    <div className="relative h-full w-full rounded-[24px] overflow-hidden border border-border-subtle bg-[#eef0ec]">
      {/* Alto explícito: MapLibre le pone position:relative al contenedor y con
          "absolute inset-0" quedaba con alto cero (mapa invisible). */}
      <div ref={caja} className="h-full w-full" />
      {!listo && (
        <div className="absolute inset-0 flex items-center justify-center text-text-muted text-sm" aria-hidden>
          Cargando mapa…
        </div>
      )}
      <div className="absolute left-3 top-3 right-14 flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
        {ZONAS.map((z) => (
          <button key={z.id} type="button" onClick={() => irA(z)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[13px] font-semibold shadow-sm transition-colors ${
              zona === z.id ? "bg-ink text-white" : "bg-white/95 text-ink hover:bg-white"
            }`}>
            {z.label}
          </button>
        ))}
      </div>
    </div>
  );
}

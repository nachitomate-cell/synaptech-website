"use client";
import { useEffect, useRef, useState } from "react";
import type { Map as MapaML, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { LocalDirectorio } from "@/lib/directorio";

/* Mapa del directorio con MapLibre (WebGL, vectorial) y los mapas libres de
   OpenFreeMap (estilo Positron, sin clave ni cuota). La librería se descarga
   recién cuando el mapa entra en pantalla, para no frenar la página.
   Cada local es un marcador con su logo; al tocarlo se abre su ficha corta y
   se avisa a la lista para que lo resalte.

   25-10-2026: los locales que quedan encimados en pantalla (Viña, Santiago) se
   agrupan en una burbuja con el número; tocarla acerca el mapa hasta
   separarlos. El mapa se encuadra solo con lo que la lista muestra (país, zona,
   rubro, búsqueda), y en escritorio la rueda del mouse hace zoom sin Ctrl. */

const ESTILO = "https://tiles.openfreemap.org/styles/positron";
/** Dos marcadores a menos de esto (px de pantalla) se agrupan. */
const RADIO_GRUPO = 46;
/** Desde este zoom ya no se agrupa: son locales de la misma cuadra. */
const ZOOM_SIN_GRUPOS = 15.5;

export type Limites = { swLat: number; swLng: number; neLat: number; neLng: number };

export default function MapaLocales({ todos, locales, activo, onSeleccion, enfoque, onMover, ubicacion, encuadre }: {
  /** Todos los locales del directorio: un marcador por cada uno, creado una sola vez. */
  todos: LocalDirectorio[];
  /** Los que la lista muestra ahora: el resto de los marcadores se esconde. */
  locales: LocalDirectorio[];
  activo: string | null;
  onSeleccion: (id: string) => void;
  enfoque: { id: string; n: number } | null;
  /** Límites visibles tras cada movimiento ("buscar mientras muevo el mapa"). */
  onMover?: (b: Limites) => void;
  /** Ubicación del visitante ("cerca de mí"): se marca y el mapa va ahí. */
  ubicacion?: { lat: number; lng: number } | null;
  /** Cambia cuando cambian los filtros de la lista: el mapa se encuadra con lo visible. null = no tocar. */
  encuadre?: number | null;
}) {
  const onMoverRef = useRef(onMover);
  onMoverRef.current = onMover;
  const visiblesRef = useRef(locales);
  visiblesRef.current = locales;
  const activoRef = useRef(activo);
  activoRef.current = activo;
  const yo = useRef<Marker | null>(null);
  const caja = useRef<HTMLDivElement>(null);
  const mapa = useRef<MapaML | null>(null);
  const ml = useRef<typeof import("maplibre-gl") | null>(null);
  const marcadores = useRef(new Map<string, Marker>());
  const grupos = useRef<Marker[]>([]);
  const [listo, setListo] = useState(false);

  /* Agrupa en pantalla los marcadores visibles que se tapan entre sí. Con ~70
     locales un barrido simple alcanza y se rehace al terminar cada movimiento. */
  const reagrupar = useRef(() => {});
  reagrupar.current = () => {
    const m = mapa.current, lib = ml.current;
    if (!m || !lib) return;
    grupos.current.forEach((g) => g.remove());
    grupos.current = [];
    const visibles = visiblesRef.current.filter((l) => l.lat != null && l.lng != null && marcadores.current.has(l.id));
    const ids = new Set(visibles.map((l) => l.id));
    marcadores.current.forEach((mk, id) => { mk.getElement().style.display = ids.has(id) ? "" : "none"; });
    if (m.getZoom() >= ZOOM_SIN_GRUPOS) return;
    const puntos = visibles.map((l) => ({ l, p: m.project([l.lng!, l.lat!]) }));
    const usado = new Set<string>();
    for (const a of puntos) {
      if (usado.has(a.l.id)) continue;
      const grupo = puntos.filter((b) => !usado.has(b.l.id) && Math.hypot(a.p.x - b.p.x, a.p.y - b.p.y) < RADIO_GRUPO);
      if (grupo.length < 2) continue;
      grupo.forEach((b) => { usado.add(b.l.id); marcadores.current.get(b.l.id)!.getElement().style.display = "none"; });
      const lng = grupo.reduce((s, b) => s + b.l.lng!, 0) / grupo.length;
      const lat = grupo.reduce((s, b) => s + b.l.lat!, 0) / grupo.length;
      const nodo = document.createElement("button");
      nodo.type = "button";
      nodo.className = `grupo-locales${grupo.some((b) => b.l.id === activoRef.current) ? " activo" : ""}`;
      nodo.textContent = String(grupo.length);
      nodo.setAttribute("aria-label", `${grupo.length} locales: ${grupo.map((b) => b.l.nombre).join(", ")}. Acercar`);
      nodo.title = grupo.map((b) => b.l.nombre).join("\n");
      nodo.addEventListener("click", () => {
        const b = new lib.LngLatBounds();
        grupo.forEach((x) => b.extend([x.l.lng!, x.l.lat!]));
        m.fitBounds(b, { padding: 90, maxZoom: ZOOM_SIN_GRUPOS + 1, duration: 700 });
      });
      grupos.current.push(new lib.Marker({ element: nodo }).setLngLat([lng, lat]).addTo(m));
    }
  };

  const encuadrar = (animado: boolean) => {
    const m = mapa.current, lib = ml.current;
    if (!m || !lib) return;
    const conPunto = visiblesRef.current.filter((l) => l.lat != null && l.lng != null);
    if (!conPunto.length) return;
    const b = new lib.LngLatBounds();
    conPunto.forEach((l) => b.extend([l.lng!, l.lat!]));
    m.fitBounds(b, { padding: 60, maxZoom: 14, duration: animado ? 700 : 0 });
  };

  // Carga perezosa: la librería (~250 KB) baja solo cuando el mapa se ve.
  useEffect(() => {
    const el = caja.current;
    if (!el) return;
    let vivo = true;
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting || mapa.current) return;
      io.disconnect();
      const lib = await import("maplibre-gl");
      if (!vivo || !caja.current) return;
      ml.current = lib;
      const m = new lib.Map({
        container: caja.current, style: ESTILO, attributionControl: { compact: true },
        center: [-71.2, -33.4], zoom: 5,
        // En el celular, un dedo hace scroll de la página y dos mueven el mapa. En
        // escritorio la rueda hace zoom directo, sin pedir Ctrl.
        cooperativeGestures: window.matchMedia("(pointer: coarse)").matches,
        fadeDuration: 0,
      });
      m.addControl(new lib.NavigationControl({ showCompass: false }), "top-right");
      mapa.current = m;
      m.on("load", () => { encuadrar(false); setListo(true); });
      // Los límites del mapa, para filtrar la lista. Nunca tocan la URL: la
      // canónica de /locales queda limpia y Google no ve variantes con coordenadas.
      m.on("moveend", () => {
        const b = m.getBounds();
        onMoverRef.current?.({ swLat: b.getSouth(), swLng: b.getWest(), neLat: b.getNorth(), neLng: b.getEast() });
        reagrupar.current();
      });
      for (const l of todos.filter((x) => x.lat != null && x.lng != null)) {
        const nodo = document.createElement("button");
        nodo.type = "button";
        nodo.className = "marcador-local";
        nodo.setAttribute("aria-label", l.nombre);
        if (l.pinSrc) nodo.style.backgroundImage = `url(${l.pinSrc})`;
        nodo.style.backgroundColor = l.fondo;
        nodo.addEventListener("click", () => onSeleccion(l.id));
        const popup = new lib.Popup({ offset: 26, closeButton: false, maxWidth: "260px" }).setHTML(
          `<strong>${l.nombre.replace(/</g, "&lt;")}</strong><span>${[l.direccion, l.comuna].filter(Boolean).join(" · ").replace(/</g, "&lt;")}</span>` +
          `<a href="${l.url}" target="_blank" rel="noopener">${l.reserva ? "Reservar hora" : "Ver local"} →</a>`);
        const mk = new lib.Marker({ element: nodo }).setLngLat([l.lng!, l.lat!]).setPopup(popup).addTo(m);
        marcadores.current.set(l.id, mk);
      }
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => { vivo = false; io.disconnect(); mapa.current?.remove(); mapa.current = null; marcadores.current.clear(); grupos.current = []; };
    // Los locales se fijan al montar; los filtros solo esconden marcadores (efectos de abajo).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtros de la lista: solo los marcadores de los locales visibles (y reagrupados).
  useEffect(() => { reagrupar.current(); }, [locales, listo]);

  // Filtros nuevos (país, zona, rubro, búsqueda): encuadrar lo que quedó a la vista.
  useEffect(() => {
    if (encuadre == null || !listo || ubicacion) return;
    encuadrar(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encuadre, listo]);

  // Local activo: su marcador se agranda y queda arriba (o su grupo se marca).
  useEffect(() => {
    marcadores.current.forEach((mk, id) => mk.getElement().classList.toggle("activo", id === activo));
    reagrupar.current();
  }, [activo, listo]);

  // "Ver en el mapa" desde una tarjeta: vuela al local (sin grupos a ese zoom) y abre su ficha.
  useEffect(() => {
    if (!enfoque || !mapa.current) return;
    const mk = marcadores.current.get(enfoque.id);
    if (!mk) return;
    marcadores.current.forEach((x) => x.getPopup()?.isOpen() && x.togglePopup());
    mapa.current.flyTo({ center: mk.getLngLat(), zoom: Math.max(mapa.current.getZoom(), ZOOM_SIN_GRUPOS + 0.5), speed: 1.6, curve: 1.3, essential: true });
    mapa.current.once("moveend", () => { if (!mk.getPopup()?.isOpen()) mk.togglePopup(); });
  }, [enfoque]);

  // "Cerca de mí": un punto azul y el mapa centrado en el visitante.
  useEffect(() => {
    if (!ubicacion || !mapa.current || !ml.current) return;
    if (!yo.current) {
      const punto = document.createElement("div");
      punto.className = "marcador-yo";
      punto.setAttribute("aria-label", "Tu ubicación");
      punto.style.cssText = "width:16px;height:16px;border-radius:50%;background:#2563eb;border:3px solid #fff;box-shadow:0 0 0 4px rgba(37,99,235,.25)";
      yo.current = new ml.current.Marker({ element: punto }).setLngLat([ubicacion.lng, ubicacion.lat]).addTo(mapa.current);
    } else {
      yo.current.setLngLat([ubicacion.lng, ubicacion.lat]);
    }
    mapa.current.flyTo({ center: [ubicacion.lng, ubicacion.lat], zoom: 12, speed: 1.6, essential: true });
  }, [ubicacion, listo]);

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
      {listo && (
        <button type="button" onClick={() => encuadrar(true)}
          className="absolute left-3 top-3 px-3 py-1.5 rounded-full text-[13px] font-semibold shadow-sm bg-white/95 text-ink hover:bg-white">
          Ver todos los resultados
        </button>
      )}
    </div>
  );
}

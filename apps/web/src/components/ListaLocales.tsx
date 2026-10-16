"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { precioEn, type LocalDirectorio, type Rubro } from "@/lib/directorio";
import type { Limites } from "./MapaLocales";
import { nombreRegion } from "@/lib/regiones";


/* Directorio: filtros por rubro y región, tarjetas con el logo de cada local
   centrado sobre su propio color, y el mapa sincronizado (en escritorio queda
   fijo a la derecha mientras se recorre la lista; en el celular va arriba).
   El mapa se carga aparte y solo en el navegador.

   Marketplace (16-10-2026): "Cerca de mí" ordena por distancia y la muestra en
   cada tarjeta; "Buscar mientras muevo el mapa" deja en la lista solo lo que se
   ve. Ninguno de los dos toca la URL: el HTML del servidor trae SIEMPRE todas
   las tarjetas y la canónica sigue siendo /locales, sin coordenadas. */
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

/** Dirección, comuna y región sin repetir tramos: una dirección escrita a mano
    ("Elías Aguirre 221, Miraflores, Lima") ya trae la comuna o la ciudad. */
function direccionCompleta(l: LocalDirectorio) {
  const tramos = [l.direccion, l.comuna, nombreRegion(l.region)].filter(Boolean).join(", ").split(/\s*,\s*/);
  const vistos = new Set<string>();
  return tramos.filter((t) => { const k = t.toLowerCase(); return t && !vistos.has(k) && vistos.add(k); }).join(", ");
}

const UTM_SERVICIO = "utm_source=synaptech&utm_medium=directorio&utm_campaign=locales-servicio";

/** La reserva del local con ESE servicio ya elegido (index.html acepta ?servicioId=, también con sedes). */
function urlServicio(l: LocalDirectorio, id: string) {
  return `${l.web}/?${UTM_SERVICIO}${l.sede ? `&sede=${encodeURIComponent(l.sede)}` : ""}&servicioId=${encodeURIComponent(id)}`;
}

function kmEntre(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371, dLat = (b.lat - a.lat) * Math.PI / 180, dLng = (b.lng - a.lng) * Math.PI / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}
const km = (d: number) => (d < 1 ? `a ${Math.round(d * 1000)} m` : `a ${d.toFixed(d < 10 ? 1 : 0).replace(".", ",")} km`);

export default function ListaLocales({ locales }: { locales: LocalDirectorio[] }) {
  const [rubro, setRubro] = useState<"todos" | Rubro>("todos");
  const [region, setRegion] = useState("todas");
  const [activo, setActivo] = useState<string | null>(null);
  const [enfoque, setEnfoque] = useState<{ id: string; n: number } | null>(null);
  const [ubicacion, setUbicacion] = useState<{ lat: number; lng: number } | null>(null);
  const [buscandoUbicacion, setBuscandoUbicacion] = useState(false);
  const [avisoUbicacion, setAvisoUbicacion] = useState("");
  const [porMapa, setPorMapa] = useState(false);
  const [limites, setLimites] = useState<Limites | null>(null);
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

  const enLimites = (l: LocalDirectorio) => !porMapa || !limites || (l.lat != null && l.lng != null
    && l.lat >= limites.swLat && l.lat <= limites.neLat && l.lng >= limites.swLng && l.lng <= limites.neLng);
  const distancia = (l: LocalDirectorio) => (ubicacion && l.lat != null && l.lng != null ? kmEntre(ubicacion, { lat: l.lat, lng: l.lng }) : null);

  let lista = locales.filter((l) => (rubro === "todos" || l.rubro === rubro) && (region === "todas" || l.region === region) && enLimites(l));
  if (ubicacion) lista = [...lista].sort((a, b) => (distancia(a) ?? 1e9) - (distancia(b) ?? 1e9));
  const cuenta = (r: "todos" | Rubro) => locales.filter((l) => (r === "todos" || l.rubro === r) && (region === "todas" || l.region === region) && enLimites(l)).length;

  // Desde el mapa: resaltar la tarjeta y llevarla a la vista.
  const desdeMapa = (id: string) => {
    setActivo(id);
    tarjetas.current.get(id)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const cercaDeMi = () => {
    setMapaListo(true);
    if (!("geolocation" in navigator)) { setAvisoUbicacion("Tu navegador no comparte la ubicación."); return; }
    setBuscandoUbicacion(true);
    setAvisoUbicacion("");
    navigator.geolocation.getCurrentPosition(
      (p) => { setUbicacion({ lat: p.coords.latitude, lng: p.coords.longitude }); setRegion("todas"); setBuscandoUbicacion(false); },
      () => { setAvisoUbicacion("No pudimos ver tu ubicación: elige tu región o mueve el mapa."); setBuscandoUbicacion(false); },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
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
              {r === "todas" ? "Todas las regiones" : nombreRegion(r)}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={cercaDeMi} disabled={buscandoUbicacion}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime text-ink text-[14px] font-semibold hover:brightness-95 disabled:opacity-60">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></svg>
            {buscandoUbicacion ? "Buscando…" : ubicacion ? "Ordenado por cercanía" : "Buscar cerca de mí"}
          </button>
          <label className="inline-flex items-center gap-2 text-[14px] text-text-secondary cursor-pointer select-none">
            <input type="checkbox" checked={porMapa} onChange={(e) => { setPorMapa(e.target.checked); setMapaListo(true); }} className="w-4 h-4 accent-ink" />
            Buscar mientras muevo el mapa
          </label>
          {avisoUbicacion && <span className="text-[13px] text-text-muted">{avisoUbicacion}</span>}
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
        <div className="order-2 lg:order-1 grid sm:grid-cols-2 gap-4">
          {lista.map((l) => {
            const d = distancia(l);
            const insignias = [
              l.modulos?.productos > 0 && "Tienda online",
              l.modulos?.giftcards && "Gift Cards disponibles",
              l.modulos?.evento && "Evento",
            ].filter(Boolean) as string[];
            return (
              <article key={l.id} id={`local-${l.id}`} ref={(el) => { if (el) tarjetas.current.set(l.id, el); }}
                onMouseEnter={() => setActivo(l.id)}
                className={`rounded-[22px] bg-white border overflow-hidden flex flex-col transition-shadow ${
                  activo === l.id ? "border-lime shadow-card-hover ring-2 ring-lime/60" : "border-border-subtle hover:shadow-card-hover"
                }`}>
                <div className="relative aspect-[16/10]" style={{ backgroundColor: l.fondo }}>
                  {l.logoSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={l.logoSrc} alt={`Logo de ${l.nombre}`} loading="lazy" decoding="async"
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
                  {d != null && (
                    <span className="absolute right-3 top-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#2563eb] text-white">{km(d)}</span>
                  )}
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display font-bold text-ink text-[17px] leading-snug">{l.nombre}</h2>
                    {l.rating && (
                      <p className="shrink-0 text-sm font-semibold text-ink flex items-center gap-1" title={l.opiniones ? `${l.opiniones} opiniones en Google` : undefined}>
                        <svg className="w-4 h-4 text-[#F5A623]" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        {l.rating.toFixed(1)}
                        {l.opiniones && <span className="font-normal text-text-muted">({l.opiniones} en Google)</span>}
                      </p>
                    )}
                  </div>
                  {/* "Barbería en La Serena": la frase que la gente busca, en texto visible. */}
                  <p className="text-sm font-semibold text-ink/80 mt-1">{l.comuna ? `${l.etiqueta} en ${l.comuna}` : l.etiqueta}</p>
                  {(l.direccion || l.comuna) && (
                    <address className="not-italic text-sm text-text-muted mt-0.5">
                      {direccionCompleta(l)}
                    </address>
                  )}
                  {insignias.length > 0 && (
                    <p className="mt-2 flex flex-wrap gap-1.5">
                      {insignias.map((t) => <span key={t} className="text-[11.5px] font-semibold px-2 py-0.5 rounded-full bg-mist text-ink">{t}</span>)}
                    </p>
                  )}
                  {l.servicios.length > 0 && (
                    <ul className="mt-3 space-y-1 text-[13.5px] text-text-secondary" aria-label={`Servicios destacados de ${l.nombre}`}>
                      {l.servicios.map((sv) => {
                        const detalle = [sv.precio != null ? precioEn(l.pais, sv.precio) : "", sv.duracion ? `${sv.duracion} min` : ""].filter(Boolean).join(" · ");
                        const fila = (
                          <>
                            <span className="min-w-0 truncate">{sv.nombre}</span>
                            {detalle && <span className="shrink-0 text-text-muted">{detalle}</span>}
                          </>
                        );
                        return (
                          <li key={sv.nombre}>
                            {sv.id && l.reserva ? (
                              <a href={urlServicio(l, sv.id)} target="_blank" rel="noopener" className="flex justify-between gap-3 hover:text-ink"
                                title={`Reservar ${sv.nombre} en ${l.nombre}`}>{fila}</a>
                            ) : <span className="flex justify-between gap-3">{fila}</span>}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <div className="mt-auto pt-4 flex items-center gap-2">
                    <a href={l.url} target="_blank" rel="noopener"
                      className="flex-1 inline-flex justify-center items-center bg-ink text-white font-semibold px-4 py-2.5 rounded-full hover:bg-black transition-colors text-[15px]">
                      {l.reserva ? "Reservar hora" : "Ver local"}<span className="sr-only"> en {l.nombre}</span>
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
            );
          })}
          {lista.length === 0 && <p className="text-text-muted sm:col-span-2">No hay locales en esta zona todavía.</p>}
          {/* Para dueños, al final del listado (y "pionero" si la zona tiene pocos locales). */}
          <aside className="rounded-[22px] border border-dashed border-border-subtle p-5 sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-[14px] text-text-secondary">
              {lista.length <= 2
                ? <><strong className="text-ink">Quedan cupos para posicionar tu negocio en esta zona.</strong> Sé de los primeros en aparecer con tu agenda online.</>
                : <><strong className="text-ink">¿Tu local no está?</strong> Súmate al directorio y aparece en Google con agenda online 24/7.</>}
            </p>
            <a href="https://bioo.cl/agenda?utm_source=directorio&utm_medium=seo&utm_campaign=cta-duenos"
              className="shrink-0 inline-flex justify-center items-center border border-ink text-ink font-semibold px-4 py-2 rounded-full hover:bg-ink hover:text-white transition-colors text-[14px]">
              Crear mi agenda gratis
            </a>
          </aside>
        </div>

        <div className="order-1 lg:order-2 h-[340px] sm:h-[420px] lg:h-[calc(100vh-120px)] lg:sticky lg:top-[96px]">
          {mapaListo
            ? <MapaLocales locales={lista} activo={activo} onSeleccion={desdeMapa} enfoque={enfoque} onMover={setLimites} ubicacion={ubicacion} />
            : <div className="h-full w-full rounded-[24px] bg-[#eef0ec]" aria-hidden />}
        </div>
      </div>
    </>
  );
}

"use client";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { corteDesde, precioEn, PAISES, type LocalDirectorio, type Rubro } from "@/lib/directorio";
import { estadoAhora } from "@/lib/abierto-ahora";
import type { Limites } from "./MapaLocales";
import { nombreRegion } from "@/lib/regiones";


/* Directorio: buscador, país, zona y rubro arriba; tarjetas con el logo de cada
   local y el mapa sincronizado (en escritorio queda fijo a la derecha mientras
   se recorre la lista; en el celular va arriba). El mapa se carga aparte y solo
   en el navegador.

   Marketplace (16-10-2026): "Cerca de mí" ordena por distancia y la muestra en
   cada tarjeta; "Buscar mientras muevo el mapa" deja en la lista solo lo que se
   ve. Ninguno de los dos toca la URL.

   25-10-2026: la página abre en el país del visitante (Chile por defecto) en vez
   de mezclar San Bernardo con Querétaro y Lima. Los filtros ESCONDEN tarjetas,
   no las sacan del HTML: el servidor sigue entregando todos los locales a
   Google y la canónica sigue siendo /locales. */
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

/** La reserva del local con ESE servicio ya elegido (index.html acepta ?servicioId=, también con sedes).
    Sin UTM (18-10-2026): la cita se atribuye por el referer (ver REFERER). */
function urlServicio(l: LocalDirectorio, id: string) {
  return `${l.web}/?${l.sede ? `sede=${encodeURIComponent(l.sede)}&` : ""}servicioId=${encodeURIComponent(id)}`;
}

/* Los enlaces a los locales van limpios, sin UTM: toda la autoridad a la URL
   canónica. Para seguir sabiendo qué reservas nacen del directorio, el enlace
   manda la página completa como referer (por defecto el navegador manda solo
   el dominio): firebaseUtils.js la guarda como `atribucion.directorio`. */
const REFERER = "no-referrer-when-downgrade" as const;

type Orden = "relevancia" | "nota" | "opiniones" | "nombre";
const ORDENES: { id: Orden; label: string }[] = [
  { id: "relevancia", label: "Más opiniones primero" },
  { id: "nota", label: "Mejor calificadas" },
  { id: "nombre", label: "Nombre A-Z" },
];

function kmEntre(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371, dLat = (b.lat - a.lat) * Math.PI / 180, dLng = (b.lng - a.lng) * Math.PI / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}
const km = (d: number) => (d < 1 ? `a ${Math.round(d * 1000)} m` : `a ${d.toFixed(d < 10 ? 1 : 0).replace(".", ",")} km`);

/* Zona dentro del país: la región en Chile ("Región de Valparaíso"); afuera la
   ciudad ("Lima, Perú" → "Lima"). */
const zonaDe = (l: LocalDirectorio) => (l.pais === "CL" ? l.region : (l.region.split(",")[0] || l.comuna));
const nombreZona = (pais: string, z: string) => (pais === "CL" ? nombreRegion(z) : z);

/** El país del visitante por su huso horario (sin pedir permisos ni llamar a nada). */
function paisDelVisitante(): string | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz === "America/Santiago" || tz === "America/Punta_Arenas" || tz === "Pacific/Easter") return "CL";
    if (tz === "America/Lima") return "PE";
    if (tz === "America/Bogota") return "CO";
    if (tz.startsWith("America/Argentina/") || tz === "America/Buenos_Aires") return "AR";
    if (/^America\/(Mexico_City|Monterrey|Merida|Cancun|Chihuahua|Tijuana|Hermosillo|Mazatlan|Matamoros|Bahia_Banderas|Ciudad_Juarez|Ojinaga)$/.test(tz)) return "MX";
  } catch { /* sin Intl: queda el país por defecto */ }
  return null;
}

const plano = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const textoBusqueda = (l: LocalDirectorio) => plano([l.nombre, l.etiqueta, l.comuna, l.region, l.direccion, ...l.servicios.map((s) => s.nombre)].join(" "));

/* Banderas dibujadas: Windows no pinta los emoji de bandera (salen "CL", "MX"). */
function Bandera({ pais }: { pais: string }) {
  const franjas: Record<string, ReactNode> = {
    CL: <><rect width="18" height="6" y="6" fill="#D52B1E" /><rect width="18" height="6" fill="#fff" /><rect width="6" height="6" fill="#0039A6" /><circle cx="3" cy="3" r="1.3" fill="#fff" /></>,
    MX: <><rect width="6" height="12" fill="#006847" /><rect x="6" width="6" height="12" fill="#fff" /><rect x="12" width="6" height="12" fill="#CE1126" /><circle cx="9" cy="6" r="1.4" fill="#8C6A2E" /></>,
    PE: <><rect width="6" height="12" fill="#D91023" /><rect x="6" width="6" height="12" fill="#fff" /><rect x="12" width="6" height="12" fill="#D91023" /></>,
    AR: <><rect width="18" height="12" fill="#74ACDF" /><rect y="4" width="18" height="4" fill="#fff" /><circle cx="9" cy="6" r="1.2" fill="#F6B40E" /></>,
    CO: <><rect width="18" height="6" fill="#FCD116" /><rect y="6" width="18" height="3" fill="#003893" /><rect y="9" width="18" height="3" fill="#CE1126" /></>,
  };
  if (!franjas[pais]) return null;
  return <svg viewBox="0 0 18 12" className="w-[18px] h-3 rounded-[2px] ring-1 ring-black/10 shrink-0" aria-hidden>{franjas[pais]}</svg>;
}

/* Logo en un cuadrado redondeado que llena el contenedor (sin márgenes blancos).
   Un logo muy ancho o muy alto (texto horizontal) se recortaría con `cover`: ese
   caso pasa a `contain` sobre el color del local. */
function LogoCuadrado({ src, alt, fondo, className }: { src: string; alt: string; fondo: string; className: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [desproporcionado, setDesproporcionado] = useState(false);
  const medir = () => {
    const i = ref.current;
    if (i?.naturalWidth && i.naturalHeight) { const r = i.naturalWidth / i.naturalHeight; setDesproporcionado(r > 1.3 || r < 0.77); }
  };
  // La imagen puede terminar de cargar antes de que React se hidrate: entonces onLoad no llega.
  useEffect(medir, []);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={ref} src={src} alt={alt} loading="lazy" decoding="async" onLoad={medir}
      className={`${className} ${desproporcionado ? "object-contain p-1.5" : "object-cover"}`} style={{ backgroundColor: fondo }} />
  );
}

/* Cabecera de la tarjeta.
   - Con portada: la foto, y el logo como avatar cuadrado de 48 px en la esquina.
   - Solo logo: "ambient glow", el mismo logo ampliado y desenfocado de fondo
     sobre un degradado oscuro, y al centro el logo en un cuadrado de 72 px. Nunca
     el logo pegado sobre un color plano con dos franjas vacías a los lados.
   - Sin nada: las iniciales sobre el mismo degradado. */
function CabeceraTarjeta({ l, distancia }: { l: LocalDirectorio; distancia: number | null }) {
  /* Los logos curados (/directorio-logos/) son tarjetas 16:10 con el logo al
     centro y mucho margen; su versión cuadrada es la del pin del mapa. */
  const avatar = l.pinSrc ?? l.logoSrc;
  const iniciales = l.nombre.split(/\s+/).filter((p) => /\p{L}/u.test(p)).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#0b111c]">
      {l.bannerSrc ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={l.bannerSrc} alt={l.nombre} loading="lazy" decoding="async"
            className="absolute inset-0 w-full h-full object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/20" aria-hidden />
          {l.logoSrc && (
            <LogoCuadrado src={avatar!} alt={`Logo de ${l.nombre}`} fondo={l.fondo}
              className="absolute left-3 bottom-3 w-12 h-12 rounded-[12px] shadow-lg ring-2 ring-white/90" />
          )}
        </>
      ) : (
        <>
          <span className="absolute inset-0" aria-hidden style={{ background: "linear-gradient(160deg, #1d2738 0%, #0b111c 70%)" }} />
          {l.logoSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar!} alt="" aria-hidden loading="lazy" decoding="async"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ transform: "scale(2.2)", filter: "blur(28px)", opacity: 0.35 }} />
          )}
          <span className="absolute inset-0" aria-hidden style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,8,14,.55) 100%)" }} />
          <span className="absolute inset-0 flex items-center justify-center">
            {l.logoSrc ? (
              <LogoCuadrado src={avatar!} alt={`Logo de ${l.nombre}`} fondo={l.fondo}
                className="w-[72px] h-[72px] rounded-[18px] border border-white/15 shadow-[0_12px_28px_-8px_rgba(0,0,0,.6)]" />
            ) : (
              <span className="w-[72px] h-[72px] rounded-[18px] border border-white/15 bg-white/10 flex items-center justify-center font-display font-bold text-2xl text-white/90">
                {iniciales}
              </span>
            )}
          </span>
        </>
      )}
      {l.comuna && (
        <span className="absolute left-3 top-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-ink backdrop-blur-sm">
          {l.comuna}
        </span>
      )}
      {distancia != null && (
        <span className="absolute right-3 top-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#2563eb] text-white">{km(distancia)}</span>
      )}
    </div>
  );
}

/* `filtro="comuna"` (páginas de un rubro y una zona: /barberias-quinta-region…):
   sin pestañas de rubro ni país, con chips por comuna y su conteo, y orden elegible. */
export default function ListaLocales({ locales, filtro = "region" }: { locales: LocalDirectorio[]; filtro?: "region" | "comuna" }) {
  const paises = useMemo(() => {
    const c = new Map<string, number>();
    locales.forEach((l) => c.set(l.pais, (c.get(l.pais) ?? 0) + 1));
    return Object.keys(PAISES).filter((p) => c.has(p)).map((p) => [p, c.get(p)!] as [string, number]);
  }, [locales]);
  const variosPaises = filtro === "region" && paises.length > 1;
  const [pais, setPais] = useState(() => (variosPaises ? (paises.some(([p]) => p === "CL") ? "CL" : paises[0][0]) : "todos"));
  const [rubro, setRubro] = useState<"todos" | Rubro>("todos");
  const [zona, setZona] = useState("todas");
  const [comuna, setComuna] = useState("todas");
  const [q, setQ] = useState("");
  const [orden, setOrden] = useState<Orden>("relevancia");
  const [activo, setActivo] = useState<string | null>(null);
  const [enfoque, setEnfoque] = useState<{ id: string; n: number } | null>(null);
  const [encuadre, setEncuadre] = useState(0);
  const [ubicacion, setUbicacion] = useState<{ lat: number; lng: number } | null>(null);
  const [buscandoUbicacion, setBuscandoUbicacion] = useState(false);
  const [avisoUbicacion, setAvisoUbicacion] = useState("");
  const [porMapa, setPorMapa] = useState(false);
  const [limites, setLimites] = useState<Limites | null>(null);
  // La hora se mira en el navegador (null en el HTML del servidor: ver lib/abierto-ahora.ts).
  const [ahora, setAhora] = useState<Date | null>(null);
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

  useEffect(() => {
    setAhora(new Date());
    const t = setInterval(() => setAhora(new Date()), 60_000);
    // El país del visitante, si tenemos locales ahí (si no, queda Chile).
    const p = variosPaises ? paisDelVisitante() : null;
    if (p && paises.some(([x]) => x === p)) setPais(p);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // El mapa se reencuadra al cambiar de país, zona, rubro o búsqueda (con pausa al escribir).
  useEffect(() => {
    const t = setTimeout(() => setEncuadre((n) => n + 1), q ? 400 : 0);
    return () => clearTimeout(t);
  }, [pais, zona, rubro, comuna, q]);

  const zonas = useMemo(() => {
    const c = new Map<string, number>();
    locales.forEach((l) => { const z = zonaDe(l); if (z && (pais === "todos" || l.pais === pais)) c.set(z, (c.get(z) ?? 0) + 1); });
    return [...c.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "es"));
  }, [locales, pais]);

  const comunas = useMemo(() => {
    const c = new Map<string, number>();
    locales.forEach((l) => l.comuna && c.set(l.comuna, (c.get(l.comuna) ?? 0) + 1));
    return [...c.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "es"));
  }, [locales]);

  const textos = useMemo(() => new Map(locales.map((l) => [l.id, textoBusqueda(l)])), [locales]);
  const palabras = plano(q).split(/\s+/).filter(Boolean);

  const enLimites = (l: LocalDirectorio) => !porMapa || !limites || (l.lat != null && l.lng != null
    && l.lat >= limites.swLat && l.lat <= limites.neLat && l.lng >= limites.swLng && l.lng <= limites.neLng);
  const distancia = (l: LocalDirectorio) => (ubicacion && l.lat != null && l.lng != null ? kmEntre(ubicacion, { lat: l.lat, lng: l.lng }) : null);
  const pasaSinRubro = (l: LocalDirectorio) => (pais === "todos" || l.pais === pais) && (zona === "todas" || zonaDe(l) === zona)
    && (comuna === "todas" || l.comuna === comuna) && palabras.every((p) => textos.get(l.id)!.includes(p)) && enLimites(l);
  const pasa = (l: LocalDirectorio) => (rubro === "todos" || l.rubro === rubro) && pasaSinRubro(l);

  let ordenados = locales;
  if (orden === "nota") ordenados = [...ordenados].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.opiniones ?? 0) - (a.opiniones ?? 0));
  else if (orden === "nombre") ordenados = [...ordenados].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  if (ubicacion) ordenados = [...ordenados].sort((a, b) => (distancia(a) ?? 1e9) - (distancia(b) ?? 1e9));
  const lista = ordenados.filter(pasa);
  const cuenta = (r: "todos" | Rubro) => locales.filter((l) => (r === "todos" || l.rubro === r) && pasaSinRubro(l)).length;

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
      (p) => {
        setUbicacion({ lat: p.coords.latitude, lng: p.coords.longitude });
        // Del más cercano al más lejano, sin cortar por país ni zona.
        setPais("todos"); setZona("todas"); setBuscandoUbicacion(false);
      },
      () => { setAvisoUbicacion("No pudimos ver tu ubicación: elige tu zona o mueve el mapa."); setBuscandoUbicacion(false); },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  };

  const chip = (on: boolean) => `shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13.5px] font-semibold border transition-colors ${
    on ? "border-ink bg-ink text-white" : "border-border-subtle bg-white text-text-secondary hover:text-ink hover:border-ink/40"}`;
  const fila = "flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none]";
  const rotulo = "shrink-0 self-center w-14 text-[12px] font-semibold uppercase tracking-[0.08em] text-text-muted hidden sm:block";

  return (
    <>
      <div className="flex flex-col gap-3 mb-8">
        {/* Buscador en vivo + cerca de mí */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <label className="relative flex-1">
            <span className="sr-only">Buscar local, comuna o servicio</span>
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} enterKeyHint="search"
              placeholder="Busca por local, comuna, ciudad o servicio (ej: barba, Viña, uñas)"
              className="w-full h-12 rounded-full border border-border-subtle bg-white pl-11 pr-4 text-[15px] text-ink placeholder:text-text-muted focus:outline-none focus:border-ink focus:ring-2 focus:ring-lime/50" />
          </label>
          <button type="button" onClick={cercaDeMi} disabled={buscandoUbicacion}
            className="h-12 shrink-0 inline-flex items-center justify-center gap-2 px-5 rounded-full bg-lime text-ink text-[15px] font-semibold hover:brightness-95 disabled:opacity-60">
            <span aria-hidden>📍</span>
            {buscandoUbicacion ? "Buscando…" : ubicacion ? "Ordenado por cercanía" : "Cerca de mí"}
          </button>
        </div>
        {avisoUbicacion && <p className="text-[13px] text-text-muted">{avisoUbicacion}</p>}

        {filtro === "comuna" && (
          <>
            <div className={fila} aria-label="Comuna">
              {[["todas", locales.length] as [string, number], ...comunas].map(([c, n]) => (
                <button key={c} type="button" onClick={() => setComuna(c)} aria-pressed={comuna === c} className={chip(comuna === c)}>
                  {c === "todas" ? "Todas" : c} <span className={comuna === c ? "text-white/60" : "text-text-muted"}>{n}</span>
                </button>
              ))}
            </div>
            <label className="inline-flex items-center gap-2 text-[14px] text-text-secondary">
              Ordenar:
              <select value={orden} onChange={(e) => setOrden(e.target.value as Orden)}
                className="rounded-full border border-border-subtle bg-white px-3 py-1.5 text-[14px] text-ink">
                {ORDENES.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
              </select>
            </label>
          </>
        )}
        {filtro === "region" && <>
          {variosPaises && (
            <div className={fila} role="radiogroup" aria-label="País">
              <span className={rotulo}>País</span>
              {[...paises, ["todos", locales.length] as [string, number]].map(([p, n]) => (
                <button key={p} type="button" role="radio" aria-checked={pais === p} className={chip(pais === p)}
                  onClick={() => { setPais(p); setZona("todas"); }}>
                  {p === "todos" ? "Todos" : <><Bandera pais={p} /> {PAISES[p].nombre}</>}
                  <span className={pais === p ? "text-white/60" : "text-text-muted"}>{n}</span>
                </button>
              ))}
            </div>
          )}
          {pais !== "todos" && zonas.length > 1 && (
            <div className={fila} aria-label="Zona">
              <span className={rotulo}>Zona</span>
              {[["todas", zonas.reduce((a, [, n]) => a + n, 0)] as [string, number], ...zonas].map(([z, n]) => (
                <button key={z} type="button" onClick={() => setZona(z)} aria-pressed={zona === z}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-[13.5px] font-medium border transition-colors ${
                    zona === z ? "border-ink text-ink bg-mist" : "border-border-subtle text-text-muted hover:text-ink"}`}>
                  {z === "todas" ? (variosPaises ? `Todo ${PAISES[pais]?.nombre ?? ""}` : "Todas") : nombreZona(pais, z)}{" "}
                  <span className="text-text-muted">{n}</span>
                </button>
              ))}
            </div>
          )}
          <div role="tablist" aria-label="Rubro" className={fila}>
            <span className={rotulo}>Rubro</span>
            {RUBROS.map((r) => (
              <button key={r.id} role="tab" aria-selected={rubro === r.id} onClick={() => setRubro(r.id)} className={chip(rubro === r.id)}>
                {r.label} <span className={rubro === r.id ? "text-white/60" : "text-text-muted"}>{cuenta(r.id)}</span>
              </button>
            ))}
          </div>
        </>}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[14px] text-text-secondary" aria-live="polite">
            <strong className="text-ink">{lista.length}</strong> {lista.length === 1 ? "local" : "locales"}
            {q && <> para “{q}”</>}
          </p>
          <label className="inline-flex items-center gap-2 text-[14px] text-text-secondary cursor-pointer select-none">
            <input type="checkbox" checked={porMapa} onChange={(e) => { setPorMapa(e.target.checked); setMapaListo(true); }} className="w-4 h-4 accent-ink" />
            Buscar mientras muevo el mapa
          </label>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
        <div className="order-2 lg:order-1 grid sm:grid-cols-2 gap-4">
          {ordenados.map((l) => {
            const d = distancia(l);
            const est = ahora ? estadoAhora(l.horario, PAISES[l.pais]?.tz ?? "America/Santiago", ahora) : null;
            const insignias = [
              l.modulos?.productos > 0 && "Tienda online",
              l.modulos?.giftcards && "Gift Cards disponibles",
              l.modulos?.evento && "Evento",
            ].filter(Boolean) as string[];
            return (
              <article key={l.id} id={`local-${l.id}`} ref={(el) => { if (el) tarjetas.current.set(l.id, el); }}
                aria-hidden={!pasa(l) || undefined}
                onMouseEnter={() => setActivo(l.id)}
                className={`${pasa(l) ? "flex" : "hidden"} rounded-[22px] bg-white border overflow-hidden flex-col transition-shadow ${
                  activo === l.id ? "border-lime shadow-card-hover ring-2 ring-lime/60" : "border-border-subtle hover:shadow-card-hover"
                }`}>
                <CabeceraTarjeta l={l} distancia={d} />
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <h2 className="font-display font-bold text-ink text-[18px] leading-tight line-clamp-2">{l.nombre}</h2>
                  {l.rating && (
                    <p className="mt-1.5 text-[13.5px] text-ink flex items-center gap-1" title={l.opiniones ? `${l.opiniones} opiniones en Google` : undefined}>
                      <svg className="w-4 h-4 text-[#F5A623]" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      <strong className="font-semibold">{l.rating.toFixed(1).replace(".", ",")}</strong>
                      {l.opiniones && <span className="text-text-muted">· {l.opiniones.toLocaleString("es-CL")} opiniones en Google</span>}
                    </p>
                  )}
                  {/* "Barbería en La Serena": la frase que la gente busca, en texto visible. */}
                  <p className="text-sm font-semibold text-ink/80 mt-2">{l.comuna ? `${l.etiqueta} en ${l.comuna}` : l.etiqueta}</p>
                  {est && (
                    <p className={`mt-1.5 inline-flex items-center gap-1.5 self-start text-[12.5px] font-semibold px-2.5 py-1 rounded-full ${
                      est.abierto ? "bg-[#e7f6e9] text-[#1f7a35]" : "bg-mist text-text-secondary"}`}>
                      <span className={`w-2 h-2 rounded-full ${est.abierto ? "bg-[#22a447]" : "bg-[#9aa3ad]"}`} aria-hidden />
                      {est.texto}
                    </p>
                  )}
                  {corteDesde(l) && <p className="text-sm text-ink mt-2">Corte desde <strong>{corteDesde(l)}</strong></p>}
                  {(l.direccion || l.comuna) && (
                    <address className="not-italic text-sm text-text-muted mt-0.5 line-clamp-2">
                      {direccionCompleta(l)}
                    </address>
                  )}
                  {insignias.length > 0 && (
                    <p className="mt-2 flex flex-wrap gap-1.5">
                      {insignias.map((t) => <span key={t} className="text-[11.5px] font-semibold px-2 py-0.5 rounded-full bg-mist text-ink">{t}</span>)}
                    </p>
                  )}
                  {l.servicios.length > 0 && (
                    <ul className="mt-3 -mx-2.5 space-y-0.5 text-[13.5px] text-text-secondary" aria-label={`Servicios destacados de ${l.nombre}`}>
                      {l.servicios.map((sv) => {
                        // Nombre en hasta dos líneas (antes se cortaba en "Promoción Corte…"); a la derecha precio y, debajo, duración.
                        const contenido = (
                          <>
                            <span className="min-w-0 line-clamp-2 leading-snug">{sv.nombre}</span>
                            {(sv.precio != null || sv.duracion) && (
                              <span className="shrink-0 text-right leading-tight">
                                {sv.precio != null && <span className="block font-semibold text-ink">{precioEn(l.pais, sv.precio)}</span>}
                                {sv.duracion ? <span className="block text-[12px] text-text-muted">{sv.duracion} min</span> : null}
                              </span>
                            )}
                          </>
                        );
                        return (
                          <li key={sv.id ?? sv.nombre}>
                            {sv.id && l.reserva ? (
                              <a href={urlServicio(l, sv.id)} target="_blank" rel="noopener" referrerPolicy={REFERER}
                                className="group/sv flex items-center justify-between gap-3 rounded-xl px-2.5 py-1.5 text-ink/85 hover:bg-mist hover:text-ink transition-colors"
                                title={`Reservar ${sv.nombre} en ${l.nombre}`}>
                                {contenido}
                                <span className="shrink-0 -ml-1 text-ink/35 transition-transform group-hover/sv:translate-x-0.5 group-hover/sv:text-ink" aria-hidden>→</span>
                              </a>
                            ) : <span className="flex justify-between gap-3 px-2.5 py-1.5">{contenido}</span>}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <div className="mt-auto pt-4 flex items-center gap-2">
                    <a href={l.url} target="_blank" rel="noopener" referrerPolicy={REFERER}
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
          {lista.length === 0 && (
            <p className="text-text-muted sm:col-span-2">
              {q ? <>No encontramos locales para “{q}” con estos filtros. <button type="button" className="underline underline-offset-2 hover:text-ink" onClick={() => { setQ(""); setZona("todas"); setRubro("todos"); }}>Limpiar filtros</button></> : "No hay locales en esta zona todavía."}
            </p>
          )}
          {/* Para dueños, al final del listado (y "pionero" si la zona tiene pocos locales). */}
          <aside className="rounded-[22px] border border-dashed border-border-subtle p-5 sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-[14px] text-text-secondary">
              {lista.length <= 2
                ? <><strong className="text-ink">Quedan cupos para posicionar tu negocio en esta zona.</strong> Sé de los primeros en aparecer con tu agenda online.</>
                : <><strong className="text-ink">¿Tu local no está?</strong> Súmate al directorio y aparece en Google con agenda online 24/7.</>}
            </p>
            <a href="https://bioo.cl/agenda?utm_source=directorio&utm_medium=seo&utm_campaign=cta-duenos"
              className="shrink-0 inline-flex justify-center items-center border border-ink text-ink font-semibold px-4 py-2 rounded-full hover:bg-ink hover:text-white transition-colors text-[14px]">
              Crear mi agenda
            </a>
          </aside>
        </div>

        <div className="order-1 lg:order-2 h-[340px] sm:h-[420px] lg:h-[calc(100vh-120px)] lg:sticky lg:top-[96px]">
          {mapaListo
            ? <MapaLocales todos={locales} locales={lista} activo={activo} onSeleccion={desdeMapa} enfoque={enfoque} onMover={setLimites}
                ubicacion={ubicacion} encuadre={porMapa ? null : encuadre} />
            : <div className="h-full w-full rounded-[24px] bg-[#eef0ec]" aria-hidden />}
        </div>
      </div>
    </>
  );
}

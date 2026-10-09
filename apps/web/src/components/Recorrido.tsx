"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CAPTURAS, type Modulo, type Paso } from "@/content/recorrido";

/* Recorrido punto por punto de un módulo sobre capturas reales del panel.
   Por cada paso la captura se acerca a la zona del botón, el resto se
   oscurece, se dibuja una flecha curva desde el número del paso y el recuadro
   late. En escritorio la captura queda fija a la derecha mientras se baja por
   los pasos; en el celular cada paso trae su propio recorte.

   Las coordenadas de cada botón salen de content/objetivos.json, medidas con
   Playwright (boundingBox) en el mismo momento de la foto. */

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function geometria(paso: Paso) {
  const cap = CAPTURAS[paso.captura];
  const obj = paso.objetivo ? cap.objetivos[paso.objetivo] : undefined;
  const celular = cap.ancho < 600;
  if (!obj) return { cap, obj, s: 1, tx: 0, ty: 0, celular };
  const bw = obj.w / cap.ancho, bh = obj.h / cap.alto;
  const cx = (obj.x + obj.w / 2) / cap.ancho, cy = (obj.y + obj.h / 2) / cap.alto;
  const maxZ = paso.zoom ?? (celular ? 1.35 : 1.9);
  const s = clamp(Math.min(0.42 / bw, 0.42 / bh), 1, maxZ);
  const tx = clamp(0.5 - cx * s, 1 - s, 0);
  const ty = clamp(0.5 - cy * s, 1 - s, 0);
  return { cap, obj, s, tx, ty, celular };
}

export function Pantalla({ paso, numero, activo, eager = false }: { paso: Paso; numero: number; activo: boolean; eager?: boolean }) {
  const { cap, obj, s, tx, ty, celular } = geometria(paso);
  const W = cap.ancho, H = cap.alto;

  // Caja del objetivo ya transformada, en unidades de la captura.
  const box = obj && {
    x: (obj.x / W * s + tx) * W, y: (obj.y / H * s + ty) * H,
    w: obj.w * s, h: obj.h * s,
  };
  // La flecha sale del lado con más aire y llega al borde más cercano del recuadro.
  let flecha = null as null | { d: string; ox: number; oy: number; ex: number; ey: number; ang: number };
  if (box) {
    const cx = box.x + box.w / 2, cy = box.y + box.h / 2;
    const izq = cx > W / 2, arriba = cy > H / 2;
    const ox = clamp(cx + (izq ? -1 : 1) * W * (celular ? 0.3 : 0.24), W * 0.1, W * 0.9);
    const oy = clamp(cy + (arriba ? -1 : 1) * H * (celular ? 0.16 : 0.24), H * 0.08, H * 0.92);
    const pad = celular ? 8 : 12;
    const ex = clamp(ox, box.x - pad, box.x + box.w + pad);
    const ey = arriba ? box.y - pad : box.y + box.h + pad;
    const mx = (ox + ex) / 2 + (arriba ? 1 : -1) * (izq ? 1 : -1) * W * 0.05;
    const my = oy + ((oy + ey) / 2 - oy) * 0.2;
    // La punta se dibuja aparte (no como marker) para que aparezca recién
    // cuando la línea termina de trazarse.
    const ang = (Math.atan2(ey - my, ex - mx) * 180) / Math.PI;
    flecha = { d: `M ${ox} ${oy} Q ${mx} ${my} ${ex} ${ey}`, ox, oy, ex, ey, ang };
  }
  const r = celular ? 14 : 10;

  return (
    <div className={`relative ${celular ? "mx-auto w-full max-w-[300px] rounded-[38px] border-[10px] border-ink shadow-card-hover" : "rounded-2xl border border-border-subtle shadow-card-hover"} overflow-hidden bg-white`}>
      <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
        <div className="absolute inset-0 origin-top-left transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none"
          style={{ transform: activo ? `translate(${tx * 100}%, ${ty * 100}%) scale(${s})` : "none" }}>
          {/* Sin optimizador: las capturas ya van en WebP de ~50-215 KB, y así
              cargan al toque cuando el paso cambia de pantalla. La key fuerza
              a cambiar de imagen (si no, queda la anterior mientras carga). */}
          <Image key={paso.captura} src={`/panel/${paso.captura}`} alt={cap.alt} width={W * 2} height={H * 2}
            unoptimized priority={eager} className="w-full h-auto select-none" draggable={false} />
        </div>

        {box && flecha && (
          <svg key={`${paso.captura}-${paso.objetivo}-${activo}`} viewBox={`0 0 ${W} ${H}`}
            className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
            <path fillRule="evenodd" fill="rgba(15,26,43,.42)"
              className={activo ? "recorrido-velo" : "opacity-0"}
              d={`M0 0H${W}V${H}H0Z M${box.x - 6} ${box.y - 6 + r}a${r} ${r} 0 0 1 ${r} ${-r}h${box.w + 12 - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${box.h + 12 - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(box.w + 12 - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}Z`} />
            {activo && (
              <>
                <rect x={box.x - 6} y={box.y - 6} width={box.w + 12} height={box.h + 12} rx={r}
                  fill="none" stroke="#9CCC3C" strokeWidth="3" vectorEffect="non-scaling-stroke" className="recorrido-anillo" />
                <path d={flecha.d} fill="none" stroke="#0F1A2B" strokeWidth="3" strokeLinecap="round"
                  vectorEffect="non-scaling-stroke" pathLength={1} className="recorrido-flecha" />
                <path d={`M0 0 L${-W * 0.018} ${-W * 0.011} L${-W * 0.018} ${W * 0.011} Z`} fill="#0F1A2B"
                  transform={`translate(${flecha.ex} ${flecha.ey}) rotate(${flecha.ang})`} className="recorrido-punta" />
              </>
            )}
          </svg>
        )}

        {box && flecha && activo && (
          <div key={`b-${paso.captura}-${paso.objetivo}`} className="recorrido-badge absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none"
            style={{ left: `${(flecha.ox / W) * 100}%`, top: `${(flecha.oy / H) * 100}%` }}>
            <span className="w-8 h-8 rounded-full bg-lime text-ink font-bold text-sm flex items-center justify-center shadow-lg ring-4 ring-white">{numero}</span>
            {obj?.etiqueta && !celular && (
              <span className="hidden sm:inline bg-ink text-white text-[13px] font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">{obj.etiqueta}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Recorrido({ modulo }: { modulo: Modulo }) {
  const [activo, setActivo] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const raiz = useRef<HTMLDivElement>(null);

  // Precarga las capturas del módulo cuando se acerca, para que el cambio de
  // pantalla entre pasos no muestre un hueco mientras baja la imagen.
  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      [...new Set(modulo.pasos.map((x) => x.captura))].forEach((c) => { const i = new window.Image(); i.src = `/panel/${c}`; });
      io.disconnect();
    }, { rootMargin: "800px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [modulo]);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActivo(Number((e.target as HTMLElement).dataset.i));
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const paso = modulo.pasos[activo];

  return (
    <div ref={raiz} className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-8 lg:gap-14">
      <ol className="flex flex-col">
        {modulo.pasos.map((p, i) => (
          <li key={i} ref={(el) => { refs.current[i] = el; }} data-i={i}
            className="lg:min-h-[62vh] lg:flex lg:flex-col lg:justify-center py-6 lg:py-0">
            <div className={`flex gap-4 transition-opacity duration-300 ${i === activo ? "lg:opacity-100" : "lg:opacity-35"}`}>
              <span className={`shrink-0 w-9 h-9 rounded-full font-bold flex items-center justify-center transition-colors ${i === activo ? "bg-lime text-ink" : "bg-mist text-text-muted"}`}>{i + 1}</span>
              <div>
                <h4 className="font-display font-bold text-ink text-xl sm:text-2xl leading-tight tracking-tight">{p.titulo}</h4>
                <p className="text-text-secondary text-base sm:text-lg leading-relaxed mt-2">{p.texto}</p>
              </div>
            </div>
            <div className="lg:hidden mt-5">
              <Pantalla paso={p} numero={i + 1} activo={i === activo} />
            </div>
          </li>
        ))}
      </ol>

      <div className="hidden lg:block">
        <div className="sticky top-40">
          <Pantalla paso={paso} numero={activo + 1} activo eager />
          <div className="flex justify-center gap-1.5 mt-5" aria-hidden>
            {modulo.pasos.map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all ${i === activo ? "w-6 bg-ink" : "w-1.5 bg-border-subtle"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

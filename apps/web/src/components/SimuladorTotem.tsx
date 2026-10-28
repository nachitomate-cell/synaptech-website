"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { RUBROS_TOTEM, clp, type RubroTotem } from "@/content/totem";

/* Simulador del tótem de autoservicio (28-10-2026). Es una réplica de las
   pantallas reales (js/totem/* de la plataforma, capturas en
   devtools/guias-panel/totem-etapa1) con datos de ejemplo por rubro
   (content/totem.ts). Mientras nadie lo toca, se recorre solo: primero un
   cliente con cita, después uno sin cita, y pasa al rubro siguiente. Al primer
   toque queda en manos del visitante, y como el tótem de verdad, vuelve solo
   al inicio a los 45 segundos sin tocarlo. Al lado, lo que pasa detrás: el
   aviso que le llega al celular de quien atiende y la agenda del local. */

type Pantalla = "inicio" | "tel" | "cita" | "ok" | "srv" | "pro" | "datos" | "carga" | "tomada";

// Las frases de Syna son las de js/totem/syna.js.
const FRASE: Record<Pantalla, string> = {
  inicio: "Hola, soy Syna. ¿Tienes hora hoy o te atendemos ahora?",
  tel: "Escribe tu número y busco tu cita.",
  cita: "Confirma tu llegada y le aviso a quien te atiende.",
  ok: "Listo. Ya avisé que estás aquí.",
  srv: "¿Qué te hacemos hoy?",
  pro: "Te muestro quién te puede atender más pronto.",
  datos: "Último paso: tu nombre y tu teléfono.",
  carga: "Un momento…",
  tomada: "Listo. Ya avisé que estás aquí.",
};

const W = 960, H = 600;
const IDLE = 45_000;
const DIGITOS = "911119999";
const CODIGOS: Record<string, string> = { barberia: "BZ4-V2W", peluqueria: "K7M-Q3P", unas: "N2R-X8D", estetica: "L5T-H9C", clinica: "", mascotas: "P3W-J6F" };
const primerNombre = (s: string) => s.replace(/^(Dra?\.)\s+/, "").split(" ")[0];

function fmtTel(d: string) {
  return "+56 " + d.slice(0, 1) + (d.length > 1 ? " " + d.slice(1, 5) : "") + (d.length > 5 ? " " + d.slice(5) : "");
}

type Paso = { foco: string | null; espera: number; hacer: () => void };

export default function SimuladorTotem() {
  const [ri, setRi] = useState(0);
  const r: RubroTotem = RUBROS_TOTEM[ri];
  const [pant, setPant] = useState<Pantalla>("inicio");
  const [dig, setDig] = useState("");
  const [srv, setSrv] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paso, setPaso] = useState(0);
  const [foco, setFoco] = useState<string | null>(null);
  const [llego, setLlego] = useState(false);       // el cliente con cita ya avisó
  const [tomada, setTomada] = useState(false);     // el sin cita quedó agendado
  const [cuenta, setCuenta] = useState(0);
  const [visible, setVisible] = useState(false);
  const [escala, setEscala] = useState(0.5);
  const caja = useRef<HTMLDivElement>(null);
  const raiz = useRef<HTMLDivElement>(null);
  const ultimoToque = useRef(Date.now());

  /* la pantalla del tótem se diseña a 960×600 y se escala al ancho disponible */
  useEffect(() => {
    const el = caja.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => setEscala(e.contentRect.width / W));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  /* la demo solo corre cuando se ve */
  useEffect(() => {
    const el = raiz.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);

  const reiniciar = useCallback((nuevo?: number) => {
    if (nuevo !== undefined) setRi(nuevo);
    setPant("inicio"); setDig(""); setSrv(0); setLlego(false); setTomada(false); setCuenta(0); setFoco(null);
  }, []);
  const alInicio = useCallback(() => { setPant("inicio"); setDig(""); setCuenta(0); }, []);
  const confirmar = useCallback(() => { setPant("ok"); setLlego(true); setCuenta(10); }, []);
  const tomar = useCallback(() => {
    setPant("carga");
    window.setTimeout(() => { setPant((p) => (p === "carga" ? "tomada" : p)); setTomada(true); setCuenta(60); }, 750);
  }, []);

  /* desde la grilla de rubros: "verlo en el simulador" */
  useEffect(() => {
    const f = (e: Event) => {
      const id = (e as CustomEvent<string>).detail; const i = RUBROS_TOTEM.findIndex((x) => x.id === id);
      if (i >= 0) { reiniciar(i); setPaso(0); setAuto(true); }
    };
    window.addEventListener("totem-rubro", f); return () => window.removeEventListener("totem-rubro", f);
  }, [reiniciar]);

  /* el guion de la demo para el rubro actual */
  const guion: Paso[] = useMemo(() => {
    const p: Paso[] = [
      { foco: "bCita", espera: 2200, hacer: () => setPant("tel") },
      ...[...DIGITOS].map((d, i) => ({ foco: "k" + d, espera: i === 0 ? 900 : 230, hacer: () => setDig((x) => (x + d).slice(0, 9)) })),
      { foco: "bBuscar", espera: 800, hacer: () => setPant("cita") },
      { foco: "bConf", espera: 1600, hacer: confirmar },
      { foco: null, espera: 4200, hacer: alInicio },
    ];
    if (r.sinCita) p.push(
      { foco: "bSin", espera: 1700, hacer: () => setPant("srv") },
      { foco: "srv0", espera: 1500, hacer: () => { setSrv(0); setPant("pro"); } },
      { foco: "pro0", espera: 1600, hacer: () => setPant("datos") },
      { foco: "bConf2", espera: 1900, hacer: tomar },
      { foco: null, espera: 5200, hacer: alInicio },
    );
    p.push({ foco: null, espera: 900, hacer: () => reiniciar((ri + 1) % RUBROS_TOTEM.length) });
    return p;
  }, [r.sinCita, ri, confirmar, tomar, alInicio, reiniciar]);

  useEffect(() => {
    if (!auto || !visible) { setFoco(null); return; }
    const s = guion[paso]; if (!s) { setPaso(0); return; }
    setFoco(s.foco);
    const id = window.setTimeout(() => { s.hacer(); setPaso((n) => (n + 1 >= guion.length ? 0 : n + 1)); }, s.espera);
    return () => window.clearTimeout(id);
  }, [auto, visible, paso, guion]);

  /* cuenta regresiva de las pantallas finales (10 s la llegada, 60 s la reserva) y reinicio por inactividad */
  useEffect(() => {
    if (auto) return;
    const id = window.setInterval(() => {
      setCuenta((c) => {
        if (c <= 0) return 0;
        if (c === 1) { setPant((p) => (p === "ok" || p === "tomada" ? "inicio" : p)); setDig(""); }
        return c - 1;
      });
      if (Date.now() - ultimoToque.current > IDLE) { reiniciar(); setPaso(0); setAuto(true); }
    }, 1000);
    return () => window.clearInterval(id);
  }, [auto, reiniciar]);

  /* cualquier toque del visitante: la demo se detiene y el tótem es suyo */
  const toque = (fn: () => void) => () => {
    ultimoToque.current = Date.now();
    if (auto) { setAuto(false); setFoco(null); }
    fn();
  };
  const verDemo = () => { reiniciar(); setPaso(0); setAuto(true); };
  const fx = (id: string) => (foco === id ? " sim-foco" : "");

  const cita = r.cita, wk = r.walkin, s = r.servicios[srv];
  const libre = wk.hora || cita.hora;
  const explica: Record<Pantalla, string> = {
    inicio: r.sinCita ? "Llega y elige: avisar que llegó o atenderse sin cita." : "Aquí \"sin cita\" está apagado: el tótem solo recibe la llegada.",
    tel: "Escribe el teléfono con el que reservó. Nadie tiene que buscarlo en la agenda.",
    cita: "El tótem encuentra su cita de hoy.",
    ok: `Listo: a ${primerNombre(cita.con)} le llega el aviso al celular y la cita se marca en tu agenda.`,
    srv: "Elige qué se va a hacer, con los precios de tu local.",
    pro: "Ve quién lo puede atender más pronto, con las horas libres reales de tu agenda.",
    datos: "Deja su nombre y su teléfono.",
    carga: "Guardando la cita en tu agenda…",
    tomada: "La cita queda en tu agenda, ya marcada como llegada, y le muestra su código.",
  };

  return (
    <div ref={raiz} className="relative">
      <style>{`
        .sim-foco { outline: 3px solid #C6F94E; outline-offset: 3px; box-shadow: 0 0 0 9px rgba(198,249,78,.18); animation: sim-latido 1s ease-in-out infinite; }
        @keyframes sim-latido { 50% { outline-offset: 6px; box-shadow: 0 0 0 14px rgba(198,249,78,.06); } }
        @keyframes sim-entra { from { opacity: 0; transform: translateX(18px); } to { opacity: 1; transform: none; } }
        @keyframes sim-baja { from { opacity: 0; transform: translateY(-40px) scale(.94); } to { opacity: 1; transform: none; } }
        @keyframes sim-pop { 0% { transform: scale(0); } 70% { transform: scale(1.12); } 100% { transform: scale(1); } }
        @keyframes sim-cae { from { opacity: 0; transform: translateY(-24px); } to { opacity: 1; transform: none; } }
        @keyframes sim-gira { to { transform: rotate(360deg); } }
        .sim-pant { animation: sim-entra .28s ease both; }
        @media (prefers-reduced-motion: reduce) { .sim-foco, .sim-pant { animation: none; } }
      `}</style>

      {/* pestañas de rubro */}
      <div role="tablist" aria-label="Rubro del ejemplo" className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
        {RUBROS_TOTEM.map((x, i) => (
          <button key={x.id} role="tab" aria-selected={i === ri} type="button"
            onClick={() => { ultimoToque.current = Date.now(); reiniciar(i); setPaso(0); }}
            className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${i === ri ? "bg-white text-[#05080D] border-white" : "border-white/15 text-white/75 hover:border-white/40"}`}>
            {x.rubro}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-10 items-start">
        {/* ── el tótem ── */}
        <div>
          <div className="relative mx-auto">
            <div className="rounded-[22px] sm:rounded-[34px] bg-[#121315] p-2.5 sm:p-4 shadow-[0_0_0_1px_#2a2b2f,0_60px_120px_-50px_rgba(0,0,0,.9)]">
              <div ref={caja} className="relative w-full overflow-hidden rounded-[10px] sm:rounded-[14px]" style={{ aspectRatio: "16 / 10" }}>
                <div className="absolute left-0 top-0 origin-top-left text-[#f4f4f5] select-none" style={{ width: W, height: H, transform: `scale(${escala})`,
                  background: "radial-gradient(650px 380px at 0% 0%, rgba(16,185,129,.17), transparent 62%), radial-gradient(450px 350px at 100% 100%, rgba(16,185,129,.07), transparent 60%), #0b0c0e" }}>
                  <Barra frase={FRASE[pant]} />
                  <div key={pant + ri} className="sim-pant absolute inset-0 top-0">
                    {pant === "inicio" && <Inicio r={r} fx={fx} onCita={toque(() => setPant("tel"))} onSin={toque(() => setPant("srv"))} />}
                    {pant === "tel" && <Telefono dig={dig} fx={fx}
                      onTecla={(d) => toque(() => setDig((x) => (x + d).slice(0, 9)))()}
                      onBorrar={toque(() => setDig((x) => x.slice(0, -1)))}
                      onBuscar={toque(() => { if (dig.length === 9) setPant("cita"); })}
                      onVolver={toque(() => { setDig(""); setPant("inicio"); })} />}
                    {pant === "cita" && <TuCita r={r} fx={fx} onConf={toque(confirmar)} onVolver={toque(alInicio)} />}
                    {pant === "ok" && <Ok titulo={`¡Hola, ${cita.cliente}!`} cuenta={auto ? 10 : cuenta} onListo={toque(alInicio)}
                      lineas={<>Avisamos que llegaste.<br />Tu cita de las <b className="text-white">{cita.hora}</b> con {cita.con}.<br />Toma asiento, ya te llaman.</>} />}
                    {pant === "srv" && <Servicios r={r} fx={fx} onElegir={(i) => toque(() => { setSrv(i); setPant("pro"); })()} onVolver={toque(alInicio)} />}
                    {pant === "pro" && <ConQuien r={r} fx={fx} hora={libre} onElegir={toque(() => setPant("datos"))} />}
                    {pant === "datos" && <Datos r={r} s={s} fx={fx} onConf={toque(tomar)} onVolver={toque(() => setPant("pro"))} />}
                    {pant === "carga" && <div className="absolute rounded-full border-[6px] border-white/10 border-t-emerald-500" style={{ left: 450, top: 270, width: 60, height: 60, animation: "sim-gira .8s linear infinite" }} />}
                    {pant === "tomada" && <Ok tomada titulo={`¡Tomada, ${wk.cliente}!`} cuenta={auto ? 59 : cuenta} codigo={CODIGOS[r.id]} onListo={toque(alInicio)}
                      lineas={<><b className="text-white">{wk.hora}</b> con {wk.con}<br />{s.nombre} · {clp(s.precio)}<br />Toma asiento, ya te llaman.</>} />}
                  </div>
                  {!["srv", "pro", "datos"].includes(pant) && <p className="absolute left-0 w-full text-center text-[9.5px] text-zinc-500" style={{ top: 578 }}>Powered by <b className="text-zinc-300">SynapTech</b></p>}
                </div>
              </div>
            </div>
            <div aria-hidden className="mx-auto w-[44px] sm:w-[60px] h-10 sm:h-16 bg-gradient-to-r from-[#1a1b1e] via-[#3a3c41] to-[#1d1e21]" />
          </div>
          <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-white/80 text-[15px] leading-snug min-h-[2.6em]" aria-live="polite">
              <span className="text-[#B8E36A] font-semibold">{auto ? "Demo · " : "Tu turno · "}</span>{explica[pant]}
            </p>
            {auto
              ? <span className="shrink-0 text-xs text-white/50">Tócalo cuando quieras para probarlo tú</span>
              : <button type="button" onClick={verDemo} className="shrink-0 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-white/50">▶ Ver la demo sola</button>}
          </div>
        </div>

        {/* ── lo que pasa detrás ── */}
        <Detras r={r} llego={llego} tomada={tomada} srv={s} />
      </div>
    </div>
  );
}

/* ───────── piezas del tótem (coordenadas a 960×600) ───────── */

function Barra({ frase }: { frase: string }) {
  return (
    <div className="absolute z-10 rounded-full bg-white/[.05] border border-white/[.08]" style={{ left: 39, top: 14, width: 882, height: 52 }}>
      <div className="absolute rounded-full bg-white overflow-hidden ring-2 ring-emerald-500/40" style={{ left: 6, top: 6, width: 40, height: 40 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/totem/syna-cara.webp" alt="" width={40} height={40} className="w-full h-full object-cover" />
      </div>
      <span className="absolute rounded-full bg-emerald-500" style={{ left: 35, top: 35, width: 11, height: 11, boxShadow: "0 0 0 2px #15171a" }} />
      <p className="absolute text-[8.5px] font-semibold tracking-[.22em] text-zinc-400" style={{ left: 55, top: 11 }}>SYNA · RECEPCIÓN</p>
      <p key={frase} className="absolute text-[15px] font-medium whitespace-nowrap sim-pant" style={{ left: 55, top: 23 }}>{frase}</p>
      <p className="absolute text-[21px] font-light text-zinc-400 tracking-wider" style={{ right: 15, top: 12 }}><Reloj /></p>
    </div>
  );
}

function Reloj() {
  const [h, setH] = useState("");
  useEffect(() => {
    const f = () => setH(new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false }));
    f(); const id = window.setInterval(f, 15_000); return () => window.clearInterval(id);
  }, []);
  return <>{h}</>;
}

const Flecha = () => <span className="text-zinc-400">→</span>;
const btnV = "absolute flex items-center justify-center gap-2 rounded-xl font-bold text-white bg-gradient-to-b from-[#16bb88] to-[#0a986a] shadow-[0_9px_25px_-8px_rgba(16,185,129,.65)]";
const btnG = "absolute flex items-center justify-center rounded-xl font-bold bg-white/[.06] border border-white/[.08]";
const fila = "absolute rounded-[13px] bg-white/[.045] border border-white/[.075] text-left";
const av = "absolute rounded-full bg-[#2a2c30] text-zinc-300 font-bold grid place-items-center";
const h1 = "absolute font-extrabold tracking-[-.035em] leading-[1.04]";

function Inicio({ r, fx, onCita, onSin }: { r: RubroTotem; fx: (id: string) => string; onCita: () => void; onSin: () => void }) {
  return (
    <>
      <div className="absolute rounded-[10px] bg-white grid place-items-center" style={{ left: 39, top: 85, width: 48, height: 48 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/totem/isotipo.png" alt="" width={34} height={34} />
      </div>
      <p className="absolute text-[16.5px] font-bold" style={{ left: 99, top: 86 }}>{r.local}</p>
      <p className="absolute flex items-center gap-1.5 rounded-full bg-white/[.07] px-2.5 text-[10.5px] font-semibold" style={{ left: 99, top: 111, height: 20 }}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Abierto</p>
      <p className={h1} style={{ left: 39, top: 160, fontSize: 46 }}>Bienvenido a<br /><span className="text-emerald-100">{r.local}</span></p>
      <p className="absolute text-[15px] text-zinc-400 leading-snug" style={{ left: 39, top: 266, width: 430 }}>
        {r.sinCita ? "Avísanos que llegaste o toma la próxima hora libre, en segundos." : "Avísanos que llegaste, en segundos."}</p>
      <button type="button" onClick={onCita} className={`absolute rounded-[14px] border border-emerald-500/45 bg-emerald-500/[.06] text-left${fx("bCita")}`}
        style={{ left: 39, top: r.sinCita ? 356 : 451, width: 455, height: 81 }}>
        <span className="absolute grid place-items-center rounded-[11px] bg-emerald-500/20" style={{ left: 20, top: 18, width: 45, height: 45 }}>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18M9 15.5l2 2 4-4" /></svg></span>
        <span className="absolute text-[22px] font-extrabold tracking-tight" style={{ left: 80, top: 17 }}>Tengo cita reservada</span>
        <span className="absolute text-[14px] text-zinc-400" style={{ left: 80, top: 49 }}>Avísanos que llegaste</span>
        <span className="absolute text-[20px]" style={{ right: 22, top: 27 }}><Flecha /></span>
      </button>
      {r.sinCita && (
        <button type="button" onClick={onSin} className={`absolute rounded-[14px] border border-white/[.08] bg-white/[.04] text-left${fx("bSin")}`} style={{ left: 39, top: 451, width: 455, height: 81 }}>
          <span className="absolute grid place-items-center rounded-[11px] bg-white/[.07]" style={{ left: 20, top: 18, width: 45, height: 45 }}>
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#e4e4e7" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2M18 3l2 2" /></svg></span>
          <span className="absolute text-[22px] font-extrabold tracking-tight" style={{ left: 80, top: 17 }}>Atenderme sin cita</span>
          <span className="absolute text-[14px] font-semibold text-emerald-400" style={{ left: 80, top: 49 }}>Hay hora libre ahora</span>
          <span className="absolute text-[20px]" style={{ right: 22, top: 27 }}><Flecha /></span>
        </button>
      )}
      <div className="absolute rounded-[15px] bg-white/[.035] border border-white/[.07]" style={{ left: 526, top: 86, width: 395, height: r.club ? 357 : 446 }}>
        <p className="absolute text-[14.5px] font-bold" style={{ left: 17, top: 16 }}>Hoy en el local</p>
        <p className="absolute text-[10.5px] text-zinc-400" style={{ right: 17, top: 19 }}>{r.sinCita ? `${r.equipo.length} disponibles ahora` : "Equipo de hoy"}</p>
        {r.equipo.map((n, i) => (
          <div key={n} className="absolute" style={{ left: 25, top: 52 + i * 60, width: 350, height: 45 }}>
            <span className={av} style={{ left: 0, top: 2, width: 41, height: 41, fontSize: 16 }}>{primerNombre(n)[0]}</span>
            <span className="absolute text-[14.5px] font-bold" style={{ left: 51, top: 4 }}>{n}</span>
            <span className="absolute flex items-center gap-1.5 text-[11px] text-emerald-400" style={{ left: 51, top: 25 }}><span className="w-[7px] h-[7px] rounded-full bg-emerald-500" />{r.sinCita ? "Disponible ahora" : "Atendiendo hoy"}</span>
            {r.sinCita && <span className="absolute text-[16px]" style={{ right: 5, top: 11 }}><Flecha /></span>}
          </div>
        ))}
      </div>
      {r.club && (
        <div className="absolute rounded-[15px] border border-emerald-500/30" style={{ left: 526, top: 457, width: 395, height: 75, background: "linear-gradient(90deg, rgba(16,185,129,.2), rgba(16,185,129,.08))" }}>
          <span className="absolute grid place-items-center rounded-[11px] bg-white/[.08]" style={{ left: 17, top: 15, width: 45, height: 45 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e4e4e7" strokeWidth="1.8"><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M3 10.5h18M7 15h4" /></svg></span>
          <span className="absolute text-[14px] font-bold" style={{ left: 74, top: 20 }}>{r.club}</span>
          <span className="absolute text-[10.5px] text-zinc-300" style={{ left: 74, top: 41 }}>Suma sellos en cada visita</span>
        </div>
      )}
    </>
  );
}

function Telefono({ dig, fx, onTecla, onBorrar, onBuscar, onVolver }: { dig: string; fx: (id: string) => string; onTecla: (d: string) => void; onBorrar: () => void; onBuscar: () => void; onVolver: () => void }) {
  const teclas = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "<", "0", "ok"];
  const listo = dig.length === 9;
  return (
    <>
      <p className={h1} style={{ left: 39, top: 140, fontSize: 43 }}>Tu teléfono</p>
      <p className="absolute text-[15px] text-zinc-400" style={{ left: 39, top: 190 }}>Los 9 dígitos con los que reservaste.</p>
      <div className="absolute rounded-[15px] bg-white/[.045] border border-white/[.08] text-[40px] font-light tracking-[.06em] whitespace-nowrap" style={{ left: 39, top: 234, width: 603, height: 87, padding: "17px 22px" }}>
        {fmtTel(dig)}<span className="inline-block w-[2px] h-[40px] bg-emerald-500 align-[-6px] ml-1 animate-pulse" />
      </div>
      <button type="button" onClick={onBuscar} className={`${btnV} text-[17px] transition-opacity ${listo ? "" : "opacity-45"}${fx("bBuscar")}`} style={{ left: 39, top: 372, width: 603, height: 50 }}>Buscar mi cita <span>→</span></button>
      <button type="button" onClick={onVolver} className={`${btnG} text-[16px]`} style={{ left: 39, top: 432, width: 603, height: 48 }}>Volver</button>
      {teclas.map((k, i) => {
        const x = [722, 806, 890][i % 3], y = [194, 271, 347, 423][Math.floor(i / 3)];
        const accion = k === "<" ? onBorrar : k === "ok" ? onBuscar : () => onTecla(k);
        const especial = k === "<" || k === "ok";
        return (
          <button key={k} type="button" onClick={accion} aria-label={k === "<" ? "Borrar" : k === "ok" ? "Buscar" : k}
            className={`absolute rounded-full grid place-items-center text-[23px] active:bg-emerald-500/50 transition-colors ${especial ? "" : "bg-white/[.075] border border-white/[.07]"}${fx("k" + k)}`}
            style={{ left: x - 31, top: y - 31, width: 62, height: 62 }}>
            {k === "<" ? "⌫" : k === "ok" ? "✓" : k}
          </button>
        );
      })}
    </>
  );
}

function TuCita({ r, fx, onConf, onVolver }: { r: RubroTotem; fx: (id: string) => string; onConf: () => void; onVolver: () => void }) {
  const c = r.cita;
  return (
    <>
      <p className={h1} style={{ left: 39, top: 88, fontSize: 43 }}>Tu cita de hoy</p>
      <p className="absolute text-[15px] text-zinc-400" style={{ left: 39, top: 137 }}>Confirma que llegaste</p>
      <div className="absolute rounded-[17px] bg-white/[.04] border border-white/[.08]" style={{ left: 270, top: 176, width: 420, height: 293 }}>
        <span className={av} style={{ left: 172, top: 23, width: 75, height: 75, fontSize: 26 }}>{primerNombre(c.con)[0]}</span>
        <p className="absolute w-full text-center text-[52px] font-extrabold tracking-[-.04em]" style={{ top: 98 }}>{c.hora}</p>
        <p className="absolute w-full text-center text-[17.5px] font-bold" style={{ top: 165 }}>{c.servicio}</p>
        <p className="absolute w-full text-center text-[13.5px] text-zinc-400" style={{ top: 189 }}>con {c.con}</p>
        <button type="button" onClick={onConf} className={`${btnV} text-[17px]${fx("bConf")}`} style={{ left: 26, top: 222, width: 368, height: 49 }}>Confirmar mi llegada <span>→</span></button>
      </div>
      <button type="button" onClick={onVolver} className={`${btnG} text-[16px]`} style={{ left: 39, top: 488, width: 882, height: 49 }}>Volver</button>
    </>
  );
}

function Ok({ titulo, lineas, cuenta, codigo, tomada, onListo }: { titulo: string; lineas: ReactNode; cuenta: number; codigo?: string; tomada?: boolean; onListo: () => void }) {
  const cy = tomada ? 126 : 170;
  return (
    <>
      <div className="absolute rounded-full grid place-items-center" style={{ left: 480 - 43, top: cy - 43, width: 86, height: 86, animation: "sim-pop .45s ease both",
        background: "radial-gradient(circle at 40% 35%, #2fd39a, #10a874)", boxShadow: "0 0 0 8px rgba(16,185,129,.16), 0 0 40px 5px rgba(16,185,129,.35)" }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </div>
      <p className="absolute w-full text-center text-[46px] font-extrabold tracking-[-.04em]" style={{ top: tomada ? 182 : 228 }}>{titulo}</p>
      <p className="absolute w-full text-center text-[17.5px] text-zinc-300 leading-[1.6]" style={{ top: tomada ? 247 : 293 }}>{lineas}</p>
      {codigo && (
        <div className="absolute rounded-[15px] bg-white/[.04] border border-white/10 text-center" style={{ left: 371, top: 357, width: 218, height: 83 }}>
          <p className="text-[9.5px] tracking-[.25em] text-zinc-400 font-semibold mt-[14px]">TU CÓDIGO</p>
          <p className="text-[36px] font-extrabold tracking-[.1em] leading-tight">{codigo}</p>
        </div>
      )}
      <p className="absolute w-full text-center text-[11px] text-zinc-500" style={{ top: tomada ? 468 : 410 }}>Volviendo al inicio en {cuenta}…</p>
      <button type="button" onClick={onListo} className={`${btnG} text-[16px]`} style={{ left: 39, top: tomada ? 500 : 483, width: 882, height: 49 }}>Listo</button>
    </>
  );
}

function Servicios({ r, fx, onElegir, onVolver }: { r: RubroTotem; fx: (id: string) => string; onElegir: (i: number) => void; onVolver: () => void }) {
  return (
    <>
      <p className={h1} style={{ left: 39, top: 88, fontSize: 43 }}>¿Qué te hacemos hoy?</p>
      <p className="absolute text-[15px] text-zinc-400" style={{ left: 39, top: 137 }}>Elige el servicio</p>
      {r.servicios.map((s, i) => (
        <button key={s.nombre} type="button" onClick={() => onElegir(i)} className={`${fila}${fx("srv" + i)}`} style={{ left: 39, top: 176 + i * 73, width: 882, height: 64, animation: `sim-cae .3s ${i * .06}s ease both` }}>
          <span className="absolute text-[15.5px] font-bold" style={{ left: 17, top: 13 }}>{s.nombre}</span>
          <span className="absolute text-[11.5px] text-zinc-400" style={{ left: 17, top: 36 }}>{s.min} min</span>
          <span className="absolute text-[15.5px] font-bold text-zinc-200" style={{ right: 20, top: 21 }}>{clp(s.precio)} →</span>
        </button>
      ))}
      <button type="button" onClick={onVolver} className={`${btnG} text-[16px]`} style={{ left: 39, top: 483, width: 882, height: 49 }}>Volver</button>
    </>
  );
}

function ConQuien({ r, fx, hora, onElegir }: { r: RubroTotem; fx: (id: string) => string; hora: string; onElegir: () => void }) {
  return (
    <>
      <p className={h1} style={{ left: 39, top: 88, fontSize: 43 }}>¿Con quién?</p>
      <p className="absolute text-[15px] text-zinc-400" style={{ left: 39, top: 137 }}>La próxima hora libre es a las {hora}</p>
      <button type="button" onClick={onElegir} className={`${fila} !border-emerald-500/50 !bg-emerald-500/[.07]${fx("pro0")}`} style={{ left: 39, top: 176, width: 882, height: 73 }}>
        <span className="absolute grid place-items-center rounded-[11px] bg-white/[.07]" style={{ left: 17, top: 14, width: 45, height: 45 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e4e4e7" strokeWidth="1.8" strokeLinejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg></span>
        <span className="absolute text-[23px] font-bold" style={{ left: 76, top: 20 }}>{hora}</span>
        <span className="absolute text-[15.5px] font-bold" style={{ left: 161, top: 15 }}>El primero disponible</span>
        <span className="absolute text-[11.5px] text-zinc-400" style={{ left: 161, top: 40 }}>Hoy sería {r.walkin.con}</span>
        <span className="absolute text-[14px] font-bold text-zinc-200" style={{ right: 20, top: 26 }}>Libre ahora</span>
      </button>
      {r.equipo.map((n, i) => (
        <button key={n} type="button" onClick={onElegir} className={fila} style={{ left: 39, top: 258 + i * 76, width: 882, height: 67, animation: `sim-cae .3s ${.06 + i * .06}s ease both` }}>
          <span className={av} style={{ left: 16, top: 13, width: 41, height: 41, fontSize: 16 }}>{primerNombre(n)[0]}</span>
          <span className="absolute text-[21px] font-bold" style={{ left: 70, top: 20 }}>{hora}</span>
          <span className="absolute text-[15.5px] font-bold" style={{ left: 155, top: 14 }}>{n}</span>
          <span className="absolute text-[11.5px] text-zinc-400" style={{ left: 155, top: 38 }}>Libre ahora</span>
          <span className="absolute text-[16px]" style={{ right: 20, top: 22 }}><Flecha /></span>
        </button>
      ))}
    </>
  );
}

function Datos({ r, s, fx, onConf, onVolver }: { r: RubroTotem; s: { nombre: string; precio: number }; fx: (id: string) => string; onConf: () => void; onVolver: () => void }) {
  const w = r.walkin;
  return (
    <>
      <p className={h1} style={{ left: 39, top: 88, fontSize: 43 }}>Últimos datos</p>
      <p className="absolute text-[15px] text-zinc-400" style={{ left: 39, top: 137 }}>{s.nombre} · <b className="text-zinc-300">{w.hora}</b> con {w.con} · {clp(s.precio)}</p>
      <p className="absolute text-[11px] font-semibold text-zinc-400" style={{ left: 39, top: 176 }}>Tu nombre</p>
      <div className="absolute rounded-[13px] bg-white/[.045] border border-white/[.08] text-[17px]" style={{ left: 39, top: 194, width: 882, height: 50, padding: "13px 17px" }}>{w.nombreCompleto}</div>
      <p className="absolute text-[11px] font-semibold text-zinc-400" style={{ left: 39, top: 260 }}>Tu teléfono</p>
      <div className="absolute rounded-[13px] bg-white/[.045] border border-emerald-500/60 text-[17px]" style={{ left: 39, top: 278, width: 882, height: 50, padding: "13px 17px" }}>{w.telefono}</div>
      <button type="button" onClick={onVolver} className={`${btnG} text-[16px]`} style={{ left: 39, top: 483, width: 436, height: 49 }}>Volver</button>
      <button type="button" onClick={onConf} className={`${btnV} text-[17px]${fx("bConf2")}`} style={{ left: 486, top: 483, width: 436, height: 49 }}>Confirmar <span>→</span></button>
    </>
  );
}

/* ───────── detrás: el celular de quien atiende y la agenda ───────── */

function Detras({ r, llego, tomada, srv }: { r: RubroTotem; llego: boolean; tomada: boolean; srv: { nombre: string } }) {
  const c = r.cita, w = r.walkin;
  return (
    <aside aria-label="Lo que pasa detrás del tótem" className="grid sm:grid-cols-2 lg:grid-cols-1 gap-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.14em] text-white/45 mb-3">El celular de {primerNombre(c.con)}</p>
        <div className="relative mx-auto w-[220px] h-[300px] rounded-[38px] bg-[#111214] p-[9px] shadow-[0_0_0_1.5px_#2b2c30,0_40px_80px_-30px_rgba(0,0,0,.8)] overflow-hidden">
          <div className="relative h-full rounded-[30px] overflow-hidden" style={{ background: "linear-gradient(170deg, #2a2d33, #0d0e10 70%)" }}>
            <span className="absolute left-1/2 top-2 -translate-x-1/2 w-[64px] h-[18px] rounded-full bg-black" />
            <p className="absolute inset-x-0 top-[40px] text-center text-[10px] text-zinc-300 font-medium">Hoy</p>
            <p className="absolute inset-x-0 top-[52px] text-center text-[50px] font-light leading-none text-white"><Reloj /></p>
            {llego && (
              <div key={r.id} className="absolute left-2 right-2 top-[128px] rounded-[16px] bg-white/[.17] backdrop-blur p-2.5 pl-11" style={{ animation: "sim-baja .45s cubic-bezier(.2,1.4,.4,1) both" }}>
                <span className="absolute left-2.5 top-2.5 w-7 h-7 rounded-[8px] bg-white grid place-items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/totem/isotipo.png" alt="" width={22} height={22} />
                </span>
                <p className="flex justify-between text-[9px] text-zinc-200 uppercase"><span>{r.local}</span><span className="normal-case">ahora</span></p>
                <p className="text-[12px] font-bold text-white mt-0.5">{c.cliente} llegó</p>
                <p className="text-[11px] text-white/90 leading-snug">{c.hora} · {c.servicio} — está en el local.</p>
              </div>
            )}
            {!llego && <p className="absolute inset-x-4 top-[150px] text-center text-[11px] text-white/35 leading-snug">Aquí le llega el aviso cuando su cliente confirma que llegó.</p>}
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[.14em] text-white/45 mb-3">Tu agenda de hoy</p>
        <div className="rounded-[20px] bg-[#0b1120] border border-white/10 p-3 space-y-2">
          <Bloque hora={c.hora} quien={c.cliente} que={c.servicio} con={c.con} llego={llego} />
          {tomada && <Bloque key={"w" + r.id} hora={w.hora} quien={w.cliente} que={srv.nombre} con={w.con} llego totem cae />}
          {!tomada && r.sinCita && <div className="rounded-xl border border-dashed border-white/10 px-3 py-3 text-[12px] text-white/30">La cita del que llega sin hora aparece aquí</div>}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Contador n={llego ? 1 : 0} t="Llegadas hoy" />
            <Contador n={tomada ? 1 : 0} t="Sin cita hoy" />
          </div>
        </div>
      </div>
    </aside>
  );
}

function Bloque({ hora, quien, que, con, llego, totem, cae }: { hora: string; quien: string; que: string; con: string; llego: boolean; totem?: boolean; cae?: boolean }) {
  return (
    <div className={`relative rounded-xl px-3 py-2.5 border-l-4 transition-colors duration-500 ${llego ? "bg-violet-500/25 border-violet-500 shadow-[inset_0_0_0_1px_rgba(139,92,246,.35)]" : "bg-slate-400/10 border-slate-500"}`}
      style={cae ? { animation: "sim-cae .5s cubic-bezier(.2,1.4,.4,1) both" } : undefined}>
      <p className="text-[13px] font-bold text-slate-100">{hora} · {quien}</p>
      <p className="text-[11.5px] text-slate-400">{que} · con {con}</p>
      {llego && <span className="absolute right-2.5 top-2.5 rounded-full bg-violet-500/40 px-2 py-0.5 text-[10px] font-bold text-violet-100">Llegó</span>}
      {totem && (
        <svg className="absolute right-3 bottom-2.5" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Reservada en el tótem"><rect x="2" y="3" width="13" height="10" rx="2" /><path d="M6 17h5M8.5 13v4" /><rect x="16" y="9" width="6" height="12" rx="1.5" /></svg>
      )}
    </div>
  );
}

function Contador({ n, t }: { n: number; t: string }) {
  return (
    <div className="rounded-xl border border-white/10 px-3 py-2">
      <p className="text-[9.5px] font-semibold uppercase tracking-wider text-slate-400">{t}</p>
      <p key={n} className="text-[22px] font-bold text-white leading-tight" style={n ? { animation: "sim-pop .4s ease both" } : undefined}>{n}</p>
    </div>
  );
}

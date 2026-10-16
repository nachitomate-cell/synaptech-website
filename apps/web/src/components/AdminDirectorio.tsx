"use client";
import { useEffect, useState } from "react";

/* Panel del superadmin en /locales (16-10-2026): con la sesión de
   ignaciiio.mate@gmail.com se pueden ocultar y volver a mostrar locales. Escribe
   el mismo opt-out que respeta todo el directorio (`_system/{tid}.directorioPublico`)
   a través de la función `directorioAdmin`, que valida el correo en el servidor.

   No pesa nada para el visitante: Firebase se descarga SOLO si este navegador ya
   entró como admin (localStorage) o si la URL trae `?admin`. La primera vez: abrir
   synaptechspa.cl/locales?admin e ingresar con Google. */

const FB = "https://www.gstatic.com/firebasejs/10.12.2";
const CONFIG = { apiKey: "AIzaSyDqVkAhkXALm3hLcrmzjiaS3flUezPFe2Q", authDomain: "barberia-elegance.firebaseapp.com", projectId: "barberia-elegance" };
const ADMIN = "ignaciiio.mate@gmail.com";
const MARCA = "synaptech-admin-directorio";

type Fila = { id: string; nombre: string; comuna: string | null; pais: string; estado: string | null; publicable: boolean; motivo: string | null; oculto: boolean };
/* eslint-disable @typescript-eslint/no-explicit-any */
type Sdk = { auth: any; fns: any; authMod: any; fnMod: any };

async function cargarFirebase(): Promise<Sdk> {
  const appMod: any = await import(/* webpackIgnore: true */ `${FB}/firebase-app.js`);
  const authMod: any = await import(/* webpackIgnore: true */ `${FB}/firebase-auth.js`);
  const fnMod: any = await import(/* webpackIgnore: true */ `${FB}/firebase-functions.js`);
  const app = appMod.getApps().length ? appMod.getApp() : appMod.initializeApp(CONFIG);
  return { auth: authMod.getAuth(app), fns: fnMod.getFunctions(app, "us-central1"), authMod, fnMod };
}

export default function AdminDirectorio() {
  const [sdk, setSdk] = useState<Sdk | null>(null);
  const [usuario, setUsuario] = useState<string | null | undefined>(undefined);
  const [abierto, setAbierto] = useState(false);
  const [filas, setFilas] = useState<Fila[] | null>(null);
  const [ocupado, setOcupado] = useState<string | null>(null);
  const [aviso, setAviso] = useState("");
  const [filtro, setFiltro] = useState("");
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    let recordado = false;
    try { recordado = localStorage.getItem(MARCA) === "1"; } catch { /* sin storage */ }
    const pedido = new URLSearchParams(location.search).has("admin");
    if (!recordado && !pedido) return;   // el visitante normal no descarga nada
    setActivo(true);
    let corte: (() => void) | undefined;
    cargarFirebase().then((s) => {
      setSdk(s);
      corte = s.authMod.onAuthStateChanged(s.auth, (u: any) => {
        const email = u?.email?.toLowerCase() ?? null;
        setUsuario(email);
        try { if (email === ADMIN) localStorage.setItem(MARCA, "1"); } catch { /* nada */ }
      });
    }).catch(() => setAviso("No se pudo cargar el inicio de sesión."));
    return () => corte?.();
  }, []);

  const llamar = async (data: Record<string, unknown>) => {
    const fn = sdk!.fnMod.httpsCallable(sdk!.fns, "directorioAdmin");
    return (await fn(data)).data as any;
  };
  const listar = async () => {
    setAviso("");
    try { setFilas((await llamar({ accion: "listar" })).locales); }
    catch (e: any) { setAviso(e?.message || "No se pudo leer el directorio."); }
  };
  const cambiar = async (f: Fila, visible: boolean) => {
    setOcupado(f.id);
    try {
      const r = await llamar({ accion: "visible", tid: f.id, visible });
      setAviso(`${f.nombre}: ${visible ? "visible" : "oculto"}. ${r.revalidado ? "/locales ya se actualizó." : "Se verá en /locales en menos de una hora."}`);
      await listar();
    } catch (e: any) { setAviso(e?.message || "No se pudo guardar."); }
    setOcupado(null);
  };
  const entrar = async () => {
    try { await sdk!.authMod.signInWithPopup(sdk!.auth, new sdk!.authMod.GoogleAuthProvider()); }
    catch (e: any) { setAviso(e?.message || "No se pudo iniciar sesión."); }
  };
  const salir = async () => {
    try { localStorage.removeItem(MARCA); } catch { /* nada */ }
    await sdk?.authMod.signOut(sdk.auth);
    setActivo(false);
  };

  if (!activo) return null;
  if (!sdk || usuario === undefined) return null;
  if (usuario !== ADMIN) {
    return (
      <div className="fixed left-4 bottom-4 z-50 rounded-2xl bg-white shadow-xl border border-border-subtle p-4 text-[14px] max-w-xs">
        <p className="font-semibold text-ink">Administración del directorio</p>
        <p className="text-text-muted mt-1">{usuario ? `${usuario} no es superadmin.` : "Ingresa con la cuenta de superadmin."}</p>
        <button type="button" onClick={entrar} className="mt-3 bg-ink text-white rounded-full px-4 py-2 font-semibold">Ingresar con Google</button>
        {aviso && <p className="text-[12px] text-red-600 mt-2">{aviso}</p>}
      </div>
    );
  }
  const visibles = (filas ?? []).filter((f) => !filtro || `${f.nombre} ${f.comuna ?? ""} ${f.id}`.toLowerCase().includes(filtro.toLowerCase()));
  return (
    <>
      <button type="button" onClick={() => { setAbierto(true); if (!filas) listar(); }}
        className="fixed left-4 bottom-4 z-50 rounded-full bg-ink text-white shadow-xl px-4 py-2.5 text-[14px] font-semibold">
        Admin directorio
      </button>
      {abierto && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex justify-end" onClick={() => setAbierto(false)}>
          <aside className="h-full w-full max-w-md bg-white shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()} aria-label="Administración del directorio">
            <div className="p-5 border-b border-border-subtle">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-ink text-lg">Locales del directorio</h2>
                <button type="button" onClick={() => setAbierto(false)} className="text-text-muted text-2xl leading-none" aria-label="Cerrar">×</button>
              </div>
              <p className="text-[13px] text-text-muted mt-1">Sesión: {usuario} · <button type="button" onClick={salir} className="underline">salir</button></p>
              <input value={filtro} onChange={(e) => setFiltro(e.target.value)} placeholder="Buscar local…"
                className="mt-3 w-full border border-border-subtle rounded-full px-4 py-2 text-[14px]" />
              {aviso && <p className="text-[13px] mt-2 text-ink">{aviso}</p>}
            </div>
            <ul className="flex-1 overflow-y-auto divide-y divide-border-subtle">
              {!filas && <li className="p-5 text-text-muted text-[14px]">Cargando…</li>}
              {visibles.map((f) => {
                const sale = f.publicable;
                return (
                  <li key={f.id} className="p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-ink truncate">{f.nombre}</p>
                      <p className="text-[12.5px] text-text-muted truncate">
                        {[f.comuna, f.pais !== "CL" ? f.pais : "", f.estado].filter(Boolean).join(" · ")}
                        {!sale && f.motivo && <span className="text-[#b45309]"> · {f.oculto ? "oculto por ti" : f.motivo}</span>}
                      </p>
                    </div>
                    {sale || f.oculto ? (
                      <button type="button" disabled={ocupado === f.id} onClick={() => cambiar(f, !sale)}
                        className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold border ${sale ? "border-ink text-ink hover:bg-ink hover:text-white" : "bg-lime border-lime text-ink"}`}>
                        {ocupado === f.id ? "…" : sale ? "Ocultar" : "Mostrar"}
                      </button>
                    ) : <span className="shrink-0 text-[12px] text-text-muted">no sale</span>}
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      )}
    </>
  );
}

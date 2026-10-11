"use client";

import { useState } from "react";

/* Herramientas gratis de las páginas de funciones (11-10-2026). El
   autocompletado de Google Chile muestra demanda real para "cálculo de
   comisiones" (… por ventas, en excel) y "cuadratura de caja" (… chile,
   excel): una calculadora que resuelve eso en la misma página es lo que más
   se comparte y se enlaza. Son cuentas simples y transparentes: todo lo que
   se suma o se resta está a la vista. */

const fmt = (n: number) => "$" + Math.round(n || 0).toLocaleString("es-CL");
const num = (v: string) => Number(String(v).replace(/\D/g, "")) || 0;

function Campo({ label, valor, set, sufijo, ayuda }: { label: string; valor: string; set: (v: string) => void; sufijo?: string; ayuda?: string }) {
  return (
    <label className="block">
      <span className="block text-[15px] font-semibold text-ink">{label}</span>
      {ayuda && <span className="block text-[13px] text-text-muted">{ayuda}</span>}
      <span className="mt-1.5 flex items-center rounded-xl border border-border-subtle bg-white focus-within:border-ink">
        {!sufijo && <span className="pl-3 text-text-muted">$</span>}
        <input inputMode="numeric" value={valor} onChange={(e) => set(e.target.value.replace(/[^\d]/g, ""))}
          className="w-full bg-transparent px-3 py-3 text-[16px] text-ink outline-none tabular-nums" aria-label={label} />
        {sufijo && <span className="pr-3 text-text-muted">{sufijo}</span>}
      </span>
    </label>
  );
}

export function CalculadoraComisiones() {
  const [servicios, setServicios] = useState("1200000");
  const [pctServ, setPctServ] = useState("50");
  const [productos, setProductos] = useState("150000");
  const [pctProd, setPctProd] = useState("10");
  const [propinas, setPropinas] = useState("40000");
  const [adelantos, setAdelantos] = useState("100000");
  const comServ = num(servicios) * Math.min(100, num(pctServ)) / 100;
  const comProd = num(productos) * Math.min(100, num(pctProd)) / 100;
  const total = comServ + comProd + num(propinas) - num(adelantos);
  return (
    <div className="rounded-[28px] bg-mist p-6 sm:p-8 grid lg:grid-cols-[1.2fr_1fr] gap-8">
      <div className="grid sm:grid-cols-2 gap-4">
        <Campo label="Servicios del período" valor={servicios} set={setServicios} ayuda="Lo que cobró por sus atenciones" />
        <Campo label="% de comisión en servicios" valor={pctServ} set={setPctServ} sufijo="%" />
        <Campo label="Venta de productos" valor={productos} set={setProductos} ayuda="Lo que vendió en el mesón" />
        <Campo label="% de comisión en productos" valor={pctProd} set={setPctProd} sufijo="%" />
        <Campo label="Propinas que cobró el local" valor={propinas} set={setPropinas} ayuda="Pagadas con tarjeta o transferencia" />
        <Campo label="Adelantos ya pagados" valor={adelantos} set={setAdelantos} />
      </div>
      <div className="rounded-[22px] bg-ink text-white p-6 sm:p-7 self-start">
        <p className="text-white/60 text-sm">A pagarle en el período</p>
        <p className="font-display font-bold text-5xl tracking-tight mt-1 tabular-nums text-lime">{fmt(total)}</p>
        <dl className="mt-5 space-y-2 text-[15px]">
          <div className="flex justify-between gap-4"><dt className="text-white/70">Comisión de servicios</dt><dd className="tabular-nums">{fmt(comServ)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-white/70">Comisión de productos</dt><dd className="tabular-nums">{fmt(comProd)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-white/70">+ Propinas</dt><dd className="tabular-nums">{fmt(num(propinas))}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-white/70">− Adelantos</dt><dd className="tabular-nums">−{fmt(num(adelantos))}</dd></div>
        </dl>
        <p className="text-white/60 text-[13px] mt-5 leading-relaxed">En SynapTech esta cuenta sale sola para cada profesional, con cada cita y cada venta del período.</p>
      </div>
    </div>
  );
}

export function CuadraturaCaja() {
  const [apertura, setApertura] = useState("50000");
  const [ingresos, setIngresos] = useState("185000");
  const [egresos, setEgresos] = useState("12000");
  const [contado, setContado] = useState("221000");
  const esperado = num(apertura) + num(ingresos) - num(egresos);
  const dif = num(contado) - esperado;
  const estado = dif === 0 ? "Cuadra" : dif > 0 ? "Sobra" : "Falta";
  return (
    <div className="rounded-[28px] bg-mist p-6 sm:p-8 grid lg:grid-cols-[1.2fr_1fr] gap-8">
      <div className="grid sm:grid-cols-2 gap-4">
        <Campo label="Efectivo de apertura" valor={apertura} set={setApertura} ayuda="Con lo que abriste el cajón" />
        <Campo label="Ingresos en efectivo del día" valor={ingresos} set={setIngresos} ayuda="Servicios, productos y propinas en efectivo" />
        <Campo label="Egresos en efectivo" valor={egresos} set={setEgresos} ayuda="Gastos y adelantos pagados del cajón" />
        <Campo label="Efectivo contado al cerrar" valor={contado} set={setContado} />
      </div>
      <div className="rounded-[22px] bg-ink text-white p-6 sm:p-7 self-start">
        <p className="text-white/60 text-sm">Debería haber en el cajón</p>
        <p className="font-display font-bold text-4xl tracking-tight mt-1 tabular-nums">{fmt(esperado)}</p>
        <p className="text-white/60 text-sm mt-5">Diferencia</p>
        <p className={`font-display font-bold text-5xl tracking-tight mt-1 tabular-nums ${dif === 0 ? "text-lime" : "text-[#ffb4a2]"}`}>
          {estado}{dif !== 0 ? ` ${fmt(Math.abs(dif))}` : ""}
        </p>
        <p className="text-white/60 text-[13px] mt-5 leading-relaxed">Las tarjetas y transferencias no van al cajón: se cuadran con el banco. En SynapTech cada cobro queda con su medio de pago y el saldo esperado se calcula solo.</p>
      </div>
    </div>
  );
}

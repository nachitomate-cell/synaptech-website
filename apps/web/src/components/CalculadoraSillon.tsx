"use client";

import { useState } from "react";
import { Campo, fmt, num } from "@/components/Herramientas";
import { IVA, RETENCION_BHE, RETENCION_TEXTO } from "@/content/recursos";

/* Comisión a honorarios vs. arriendo de sillón, para UN barbero en UN mes
   (30-10-2026). Las cuentas, todas a la vista:
   - Venta V = atenciones × precio promedio (lo que pagan los clientes, IVA incluido).
   - Comisión: el local boletea V con IVA (V × 19/119); el barbero recibe su % sobre
     V o sobre V sin IVA (B) contra boleta de honorarios; retención 15,25 % de B, que
     paga el local si es empresa o el barbero en su F29.
   - Arriendo A (IVA incluido): el barbero boletea V a sus clientes sin IVA y paga
     el 15,25 % de V en su F29 (SII: "de los honorarios cobrados al cliente"); el
     local paga el IVA del arriendo (A × 19/119).
   - Empates: arriendo que deja al barbero igual que la comisión después del 15,25 %
     (0,8475 × (V − B)) y el que deja igual al local después del IVA (1,19 × lo que
     le queda con comisión). Entre los dos, ganan ambos; si se cruzan, no hay. */

const IVA_DE = (bruto: number) => bruto * IVA / (1 + IVA);

function Opcion<T extends string>({ valor, set, opciones, label }: { valor: T; set: (v: T) => void; opciones: [T, string][]; label: string }) {
  return (
    <fieldset>
      <legend className="block text-[15px] font-semibold text-ink">{label}</legend>
      <div className="mt-1.5 grid grid-cols-2 gap-1 rounded-xl border border-border-subtle bg-white p-1">
        {opciones.map(([v, t]) => (
          <button key={v} type="button" onClick={() => set(v)} aria-pressed={valor === v}
            className={`rounded-lg px-3 py-2.5 text-[14px] font-semibold transition-colors ${valor === v ? "bg-ink text-white" : "text-text-secondary hover:bg-mist"}`}>
            {t}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Fila({ t, v, fuerte = false, nota }: { t: string; v: string; fuerte?: boolean; nota?: string }) {
  return (
    <div className={`flex justify-between gap-4 py-2 ${fuerte ? "border-t border-white/15 mt-1 pt-3" : ""}`}>
      <dt className={fuerte ? "font-semibold text-white" : "text-white/70"}>
        {t}{nota && <span className="block text-[12px] text-white/50 font-normal">{nota}</span>}
      </dt>
      <dd className={`tabular-nums text-right ${fuerte ? "font-display font-bold text-lime text-2xl" : ""}`}>{v}</dd>
    </div>
  );
}

export default function CalculadoraSillon() {
  const [atenciones, setAtenciones] = useState("100");
  const [precio, setPrecio] = useState("18000");
  const [pct, setPct] = useState("50");
  const [base, setBase] = useState<"con" | "sin">("con");
  const [arriendo, setArriendo] = useState("900000");
  const [retiene, setRetiene] = useState<"si" | "no">("si");

  const V = num(atenciones) * num(precio);
  const ivaVenta = IVA_DE(V);
  const B = (base === "con" ? V : V - ivaVenta) * Math.min(100, num(pct)) / 100;
  const ret = B * RETENCION_BHE;
  const barberoComision = B - ret;
  const localComision = V - ivaVenta - B;

  const A = num(arriendo);
  const ivaArriendo = IVA_DE(A);
  const ppm = V * RETENCION_BHE;
  const barberoArriendo = V - A - ppm;
  const localArriendo = A - ivaArriendo;

  const empateBarbero = Math.max(0, (1 - RETENCION_BHE) * (V - B));
  const empateLocal = Math.max(0, localComision * (1 + IVA));
  const hayVentana = empateLocal < empateBarbero;
  const gana = (a: number, b: number) => (a > b ? "arriendo" : a < b ? "comision" : "igual");
  const gBarbero = gana(barberoArriendo, barberoComision);
  const gLocal = gana(localArriendo, localComision);
  const quien = (g: string) => (g === "arriendo" ? "con arriendo" : g === "comision" ? "con comisión" : "igual con las dos");

  return (
    <div className="rounded-[28px] bg-mist p-5 sm:p-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Campo label="Atenciones del barbero al mes" valor={atenciones} set={setAtenciones} sufijo="al mes" ayuda="Cortes, barbas y demás servicios" />
        <Campo label="Precio promedio por atención" valor={precio} set={setPrecio} ayuda="Lo que paga el cliente, IVA incluido" />
        <Campo label="Comisión del barbero" valor={pct} set={setPct} sufijo="%" ayuda="Su porcentaje de cada servicio" />
        <Opcion label="La comisión se calcula sobre" valor={base} set={setBase} opciones={[["con", "Precio con IVA"], ["sin", "Precio sin IVA"]]} />
        <Campo label="Arriendo del sillón al mes" valor={arriendo} set={setArriendo} ayuda="El que le cobrarías, IVA incluido" />
        <Opcion label="¿El local retiene el 15,25 %?" valor={retiene} set={setRetiene} opciones={[["si", "Sí, es empresa"], ["no", "No retiene"]]} />
      </div>
      <p className="text-[13px] text-text-muted mt-3">
        Retiene la persona jurídica o el contribuyente de primera categoría con contabilidad. Venta del barbero en el mes: <strong className="text-ink tabular-nums">{fmt(V)}</strong>.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <section className="rounded-[22px] bg-ink text-white p-6 sm:p-7" aria-label="Comisión a honorarios">
          <h3 className="font-display font-bold text-2xl tracking-tight !text-white">Comisión a honorarios</h3>
          <p className="text-lime text-[13px] font-semibold uppercase tracking-[0.12em] mt-4">El barbero</p>
          <dl className="text-[15px]">
            <Fila t="Su parte, con boleta de honorarios al local" v={fmt(B)} />
            <Fila t={`Retención del ${RETENCION_TEXTO}`} v={`−${fmt(ret)}`} nota={retiene === "si" ? "La retiene el local y la paga al SII" : "Recibe el total y la paga él en su Formulario 29"} />
            <Fila t="Le queda en el mes" v={fmt(barberoComision)} fuerte />
          </dl>
          <p className="text-lime text-[13px] font-semibold uppercase tracking-[0.12em] mt-5">El local</p>
          <dl className="text-[15px]">
            <Fila t="Boletea la venta completa" v={fmt(V)} />
            <Fila t="IVA de la venta (19 %)" v={`−${fmt(ivaVenta)}`} />
            <Fila t="Paga al barbero" v={`−${fmt(B)}`} />
            <Fila t="Le queda, antes de sus gastos" v={fmt(localComision)} fuerte />
          </dl>
        </section>

        <section className="rounded-[22px] bg-ink text-white p-6 sm:p-7" aria-label="Arriendo de sillón">
          <h3 className="font-display font-bold text-2xl tracking-tight !text-white">Arriendo de sillón</h3>
          <p className="text-lime text-[13px] font-semibold uppercase tracking-[0.12em] mt-4">El barbero</p>
          <dl className="text-[15px]">
            <Fila t="Boletea a sus clientes, sin IVA" v={fmt(V)} />
            <Fila t="Paga el arriendo" v={`−${fmt(A)}`} />
            <Fila t={`${RETENCION_TEXTO} de todo lo que boletea`} v={`−${fmt(ppm)}`} nota="Lo paga él en su Formulario 29" />
            <Fila t="Le queda en el mes" v={fmt(barberoArriendo)} fuerte />
          </dl>
          <p className="text-lime text-[13px] font-semibold uppercase tracking-[0.12em] mt-5">El local</p>
          <dl className="text-[15px]">
            <Fila t="Cobra el arriendo" v={fmt(A)} />
            <Fila t="IVA del arriendo (19 %)" v={`−${fmt(ivaArriendo)}`} />
            <Fila t="Le queda, antes de sus gastos" v={fmt(localArriendo)} fuerte />
          </dl>
        </section>
      </div>

      <div className="rounded-[22px] bg-white border border-border-subtle p-6 sm:p-7 mt-4" aria-live="polite">
        <p className="eyebrow mb-2">Con tus números</p>
        <p className="text-ink text-lg leading-relaxed">
          Al barbero le conviene <strong>{quien(gBarbero)}</strong>
          {gBarbero !== "igual" && <> ({fmt(Math.abs(barberoArriendo - barberoComision))} más al mes)</>}, y al local <strong>{quien(gLocal)}</strong>
          {gLocal !== "igual" && <> ({fmt(Math.abs(localArriendo - localComision))} más al mes)</>}.
        </p>
        <dl className="grid sm:grid-cols-2 gap-4 mt-5">
          <div className="rounded-2xl bg-mist p-4">
            <dt className="text-[13px] text-text-muted">Arriendo que deja al barbero igual que con su comisión</dt>
            <dd className="font-display font-bold text-ink text-3xl tracking-tight tabular-nums mt-1">{fmt(empateBarbero)}</dd>
          </div>
          <div className="rounded-2xl bg-mist p-4">
            <dt className="text-[13px] text-text-muted">Arriendo que deja al local igual que con la comisión</dt>
            <dd className="font-display font-bold text-ink text-3xl tracking-tight tabular-nums mt-1">{fmt(empateLocal)}</dd>
          </div>
        </dl>
        <p className="text-text-secondary mt-4 leading-relaxed">
          {hayVentana
            ? <>Con un arriendo entre <strong className="text-ink">{fmt(empateLocal)}</strong> y <strong className="text-ink">{fmt(empateBarbero)}</strong> al mes, los dos quedan mejor que con la comisión: la parte del barbero deja de pagar IVA.</>
            : <>Con estos números no hay un arriendo que deje mejor a los dos: lo que gana uno lo pierde el otro.</>}
        </p>
      </div>
      <p className="text-[13px] text-text-muted mt-4 leading-relaxed">
        Cuenta de un mes, antes de los gastos del local (luz, insumos, productos) y del impuesto anual de cada uno. El {RETENCION_TEXTO} es un pago
        provisional: en la Operación Renta se usa para las cotizaciones y el impuesto del barbero, y lo que sobra se devuelve. No es asesoría
        tributaria: revisa tu caso con tu contador.
      </p>
    </div>
  );
}

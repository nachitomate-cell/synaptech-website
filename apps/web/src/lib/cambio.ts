import type { CodigoPais } from "@/content/paises";

/* Conversión aproximada de los precios en dólares a la moneda de cada país
   (16-10-2026). El cobro es SIEMPRE en dólares con tarjeta; esto solo sirve para
   que el dueño de la barbería lea el precio en su plata. Motivo: un prospecto de
   Perú leyó "$29.900" de la vista previa chilena como US$29.

   El tipo de cambio se lee en el servidor una vez al día (ISR) desde
   open.er-api.com; si falla o trae algo raro, se usan los valores de respaldo. */

export type Iso = "PEN" | "COP" | "MXN" | "ARS";

/** Valores de respaldo (16-10-2026), por si la API no responde. */
export const CAMBIO_RESPALDO: Record<Iso, number> = { PEN: 3.44, COP: 3183, MXN: 18.46, ARS: 1514 };

export const MONEDA_PAIS: Record<CodigoPais, { iso: Iso; miles: "." | ","; formato: (n: string) => string }> = {
  pe: { iso: "PEN", miles: ",", formato: (n) => `S/ ${n}` },
  co: { iso: "COP", miles: ".", formato: (n) => `$${n} COP` },
  mx: { iso: "MXN", miles: ",", formato: (n) => `$${n} MXN` },
  ar: { iso: "ARS", miles: ".", formato: (n) => `$${n} ARS` },
};

export const NOTA_CAMBIO = "aprox., al cambio de hoy; el cobro es en dólares";

export type Cambio = { tasas: Record<Iso, number>; fuente: "api" | "respaldo" };

export async function tiposDeCambio(): Promise<Cambio> {
  const corte = new AbortController();
  const reloj = setTimeout(() => corte.abort(), 5000);
  try {
    const r = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 86400 },
      signal: corte.signal,
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const j = (await r.json()) as { result?: string; rates?: Record<string, number> };
    if (j.result !== "success" || !j.rates) throw new Error("respuesta sin tasas");
    const tasas = { ...CAMBIO_RESPALDO };
    let todas = true;
    for (const iso of Object.keys(CAMBIO_RESPALDO) as Iso[]) {
      const v = j.rates[iso];
      // Cada tasa tiene que ser un número positivo y no alejarse a lo absurdo del respaldo
      // (un peso argentino que se devalúa 3× es posible; un 0 o un 1 por error, no).
      if (typeof v === "number" && Number.isFinite(v) && v > CAMBIO_RESPALDO[iso] / 5 && v < CAMBIO_RESPALDO[iso] * 10) tasas[iso] = v;
      else todas = false;
    }
    return { tasas, fuente: todas ? "api" : "respaldo" };
  } catch {
    return { tasas: { ...CAMBIO_RESPALDO }, fuente: "respaldo" };
  } finally {
    clearTimeout(reloj);
  }
}

/** Redondeo amigable: entero bajo 100, de a 5 bajo 1.000 y dos cifras significativas desde 1.000
    (51,6 → 52 · 276,9 → 275 · 47.745 → 48.000 · 2.271.000 → 2.300.000). */
export function redondeoAmigable(n: number): number {
  if (n < 100) return Math.round(n);
  if (n < 1000) return Math.round(n / 5) * 5;
  const paso = 10 ** (Math.floor(Math.log10(n)) - 1);
  return Math.round(n / paso) * paso;
}

/** "S/ 52", "$48.000 COP", "$275 MXN", "$23.000 ARS" (con espacio duro: no se corta en dos líneas). */
export function enMonedaLocal(usd: number, codigo: CodigoPais, cambio: Cambio): string {
  const m = MONEDA_PAIS[codigo];
  const n = redondeoAmigable(usd * cambio.tasas[m.iso]);
  return m.formato(String(n).replace(/\B(?=(\d{3})+(?!\d))/g, m.miles));
}

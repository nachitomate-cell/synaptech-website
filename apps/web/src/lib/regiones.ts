/** "Región Metropolitana" queda igual; "Valparaíso" → "Región de Valparaíso". */
export function nombreRegion(r: string) {
  if (!r) return "";
  // Un local de otro país ya trae "Lima, Perú": se muestra tal cual.
  if (r.includes(", ")) return r;
  return /^regi[oó]n\b/i.test(r) ? r : r === "Metropolitana" ? "Región Metropolitana" : `Región de ${r}`;
}

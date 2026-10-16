/** "Región Metropolitana" queda igual; "Valparaíso" → "Región de Valparaíso". */
export function nombreRegion(r: string) {
  if (!r) return "";
  return /^regi[oó]n\b/i.test(r) ? r : r === "Metropolitana" ? "Región Metropolitana" : `Región de ${r}`;
}

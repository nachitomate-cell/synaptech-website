import { NextResponse, type NextRequest } from "next/server";

/* Aviso de precios en dólares en la home (16-10-2026). Si la visita viene de
   Perú, Colombia, México o Argentina (cabecera x-vercel-ip-country), se deja la
   cookie `syn_pais` y la home muestra "¿Estás en Perú? Ver precios en dólares →"
   (components/AvisoPais.tsx). No se redirige: la home sigue siendo la de Chile.

   Solo corre en "/" y solo pasa la petición (NextResponse.next()): no toca el
   HTML ni la caché de la home, que sigue siendo estática. */
const PAISES = ["pe", "co", "mx", "ar"];

export function middleware(req: NextRequest) {
  const pais = (req.headers.get("x-vercel-ip-country") ?? "").toLowerCase();
  const actual = req.cookies.get("syn_pais")?.value;
  const res = NextResponse.next();
  if (PAISES.includes(pais)) {
    if (actual !== pais) res.cookies.set("syn_pais", pais, { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax" });
  } else if (actual && pais) {
    res.cookies.delete("syn_pais");
  }
  return res;
}

export const config = { matcher: ["/"] };

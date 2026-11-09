import { imagenAgencias, OG_TURISMO } from "./imagen";

/* Vista previa (Open Graph) de /agencias (09-11-2026): lo que se ve al mandar
   el link por WhatsApp a una agencia. Con los precios de agencia y no los de
   barbería que trae la og-image.png de la home. Mismo armado que /og/[pais]:
   runtime edge (el de node no compila en Windows con Next 14.2) y las fuentes
   de lib/og. El dibujo está en imagen.tsx. */

export const runtime = "edge";

export function GET() {
  return imagenAgencias(OG_TURISMO);
}

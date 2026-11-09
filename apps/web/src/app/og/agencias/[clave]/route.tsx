import { imagenAgencias } from "../imagen";
import { OG_AGENCIAS } from "@/content/agencias-tipos";

/* /og/agencias/<clave> (09-11-2026): la vista previa de cada tipo de agencia
   (/agencias/<tipo>), de /agente-ia-omnicanal y de /crm-whatsapp. Los textos
   salen de content/agencias-tipos.ts (OG_AGENCIAS). */

export const runtime = "edge";

export function GET(_: Request, { params }: { params: { clave: string } }) {
  const t = OG_AGENCIAS[params.clave];
  if (!t) return new Response("No existe", { status: 404 });
  return imagenAgencias(t);
}

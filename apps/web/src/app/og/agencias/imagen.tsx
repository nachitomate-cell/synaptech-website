import { ImageResponse } from "next/og";
import { AGENCIA_EQUIPO, AGENCIA_SOLO } from "@/content/agencias";
import { fmt } from "@/content/precios";

/* Imagen Open Graph de las páginas de agencias (09-11-2026). Salió de
   route.tsx para que la usen /og/agencias (turismo) y /og/agencias/[clave]
   (cada tipo de agencia, el agente omnicanal y el CRM de WhatsApp): mismo
   armado, cambian la etiqueta, el titular, la bajada y la URL de abajo.
   Las rutas de las fuentes son relativas a ESTE archivo. */

export type TextosOg = { pill: string; titular: string; bajada: string; ruta: string };

export const OG_TURISMO: TextosOg = {
  pill: "Para agencias de viaje y turismo",
  titular: "Que ningún interesado quede sin respuesta.",
  bajada: "Un asistente que cotiza tus paseos en español, portugués e inglés, en tu WhatsApp.",
  ruta: "/agencias",
};

const archivo = (u: URL) => fetch(u).then((r) => r.arrayBuffer());

const INK = "#0F1A2B";
const MIST = "#F4F5F1";
const LIME = "#9CCC3C";
const ACCENT = "#4F7A12";

export async function imagenAgencias(t: TextosOg) {
  const [display, displaySemi, body, icono] = await Promise.all([
    archivo(new URL("../../../lib/og/InterTight-800.ttf", import.meta.url)),
    archivo(new URL("../../../lib/og/InterTight-600.ttf", import.meta.url)),
    archivo(new URL("../../../lib/og/DMSans-500.ttf", import.meta.url)),
    archivo(new URL("../../../../public/assets/synaptech-icon.png", import.meta.url)),
  ]);

  const tarjeta = (nombre: string, mes: number, oscura: boolean, etiqueta?: string) => (
    <div style={{
      display: "flex", flexDirection: "column", borderRadius: 28, padding: "26px 30px",
      backgroundColor: oscura ? INK : MIST, color: oscura ? "#FFFFFF" : INK,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Inter Tight", fontWeight: 600, fontSize: 28 }}>{nombre}</span>
        {etiqueta && (
          <span style={{ display: "flex", backgroundColor: LIME, color: INK, fontSize: 17, fontWeight: 600, borderRadius: 999, padding: "4px 12px" }}>
            {etiqueta}
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", marginTop: 8 }}>
        <span style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 64, letterSpacing: -2, lineHeight: 1 }}>{fmt(mes)}</span>
        <span style={{ fontSize: 22, marginLeft: 10, color: oscura ? "rgba(255,255,255,0.65)" : "#5F6B7A" }}>+ IVA al mes</span>
      </div>
    </div>
  );

  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", backgroundColor: "#FFFFFF",
        padding: "56px 60px", fontFamily: "DM Sans", color: INK,
      }}>
        <div style={{ display: "flex", flexDirection: "column", width: 640, paddingRight: 40 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={icono as unknown as string} width={52} height={52} style={{ borderRadius: 12 }} />
            <span style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 36, marginLeft: 14, letterSpacing: -1 }}>SynapTech</span>
          </div>
          <div style={{
            display: "flex", alignSelf: "flex-start", marginTop: 40,
            backgroundColor: MIST, borderRadius: 999, padding: "10px 20px", fontSize: 24, color: "#3B4452",
          }}>
            {t.pill}
          </div>
          <div style={{
            display: "flex", fontFamily: "Inter Tight", fontWeight: 800, fontSize: 60, lineHeight: 1.04,
            letterSpacing: -2.2, marginTop: 26,
          }}>
            {t.titular}
          </div>
          <div style={{ display: "flex", fontSize: 25, lineHeight: 1.35, color: "#3B4452", marginTop: 20 }}>
            {t.bajada}
          </div>
          <div style={{ display: "flex", flexGrow: 1 }} />
          {/* Las rutas largas (/agencias/intercambios-y-estudios) bajan de tamaño para no partirse en dos líneas. */}
          <span style={{ display: "flex", fontSize: t.ruta.length > 24 ? 21 : 26, color: ACCENT, fontWeight: 500 }}>synaptechspa.cl{t.ruta}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
          {tarjeta(AGENCIA_SOLO.nombre, AGENCIA_SOLO.mes, false)}
          <div style={{ display: "flex", height: 16 }} />
          {tarjeta(AGENCIA_EQUIPO.nombre, AGENCIA_EQUIPO.mes, true, "El más elegido")}
          <div style={{
            display: "flex", justifyContent: "center", marginTop: 18, borderRadius: 999,
            backgroundColor: LIME, color: INK, padding: "14px 20px",
            fontFamily: "Inter Tight", fontWeight: 600, fontSize: 24,
          }}>
            30 días de prueba · instalación sin costo
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter Tight", data: display, weight: 800, style: "normal" },
        { name: "Inter Tight", data: displaySemi, weight: 600, style: "normal" },
        { name: "DM Sans", data: body, weight: 500, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" },
    },
  );
}

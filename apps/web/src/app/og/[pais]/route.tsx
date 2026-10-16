import { ImageResponse } from "next/og";
import { PAISES, PLANES_LATAM, type CodigoPais } from "@/content/paises";
import { enMonedaLocal, tiposDeCambio } from "@/lib/cambio";
import Bandera from "@/components/Bandera";

/* Imagen de vista previa (Open Graph) de cada página de país: /og/pe, /og/co,
   /og/mx y /og/ar (16-10-2026). Es lo que se ve en WhatsApp al mandar el link a
   una barbería de ese país: precio en dólares y su conversión, NUNCA el precio
   chileno (la og-image.png de la home dice "Desde $29.900 + IVA" y en Perú la
   leyeron como US$29). Lleva el tipo de cambio del día y la CDN la guarda un día.
   Las fuentes son subconjuntos de Inter Tight y DM Sans (lib/og/*.ttf, de
   Google Fonts, licencia OFL).

   Runtime edge y no node: el ImageResponse de node en Next 14.2 no compila en
   Windows (arma la ruta de su fuente con path.join sobre un file:// y revienta
   el build con "Invalid URL"); el de edge lee los archivos como assets. */

export const runtime = "edge";

const archivo = (u: URL) => fetch(u).then((r) => r.arrayBuffer());

const INK = "#0F1A2B";
const MIST = "#F4F5F1";
const LIME = "#9CCC3C";
const ACCENT = "#4F7A12";

export async function GET(_req: Request, { params }: { params: { pais: string } }) {
  const codigo = params.pais as CodigoPais;
  const p = PAISES[codigo];
  if (!p) return new Response("No existe", { status: 404 });

  const [display, displaySemi, body, icono, cambio] = await Promise.all([
    archivo(new URL("../../../lib/og/InterTight-800.ttf", import.meta.url)),
    archivo(new URL("../../../lib/og/InterTight-600.ttf", import.meta.url)),
    archivo(new URL("../../../lib/og/DMSans-500.ttf", import.meta.url)),
    archivo(new URL("../../../../public/assets/synaptech-icon.png", import.meta.url)),
    tiposDeCambio(),
  ]);
  const [agenda, ia] = PLANES_LATAM;
  const local = (usd: number) => enMonedaLocal(usd, codigo, cambio);

  const tarjeta = (nombre: string, usd: number, oscura: boolean, etiqueta?: string) => (
    <div style={{
      display: "flex", flexDirection: "column", borderRadius: 28, padding: "26px 30px",
      backgroundColor: oscura ? INK : MIST, color: oscura ? "#FFFFFF" : INK,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Inter Tight", fontWeight: 600, fontSize: 26 }}>{nombre}</span>
        {etiqueta && (
          <span style={{ display: "flex", backgroundColor: oscura ? LIME : ACCENT, color: oscura ? INK : "#FFFFFF", fontSize: 17, fontWeight: 600, borderRadius: 999, padding: "4px 12px" }}>
            {etiqueta}
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", marginTop: 8 }}>
        <span style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 68, letterSpacing: -2, lineHeight: 1 }}>US${usd}</span>
        <span style={{ fontSize: 22, marginLeft: 10, color: oscura ? "rgba(255,255,255,0.65)" : "#5F6B7A" }}>al mes por local</span>
      </div>
      <span style={{ display: "flex", fontSize: 24, marginTop: 10, color: oscura ? LIME : ACCENT }}>≈ {local(usd)} aprox.</span>
    </div>
  );

  const imagen = new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", backgroundColor: "#FFFFFF",
        padding: "56px 60px", fontFamily: "DM Sans", color: INK,
      }}>
        {/* Izquierda: marca, país y titular */}
        <div style={{ display: "flex", flexDirection: "column", width: 640, paddingRight: 40 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={icono as unknown as string} width={52} height={52} style={{ borderRadius: 12 }} />
            <span style={{ fontFamily: "Inter Tight", fontWeight: 800, fontSize: 36, marginLeft: 14, letterSpacing: -1 }}>SynapTech</span>
          </div>
          <div style={{
            display: "flex", alignItems: "center", alignSelf: "flex-start", marginTop: 40,
            backgroundColor: MIST, borderRadius: 999, padding: "10px 20px 10px 14px",
          }}>
            <Bandera codigo={codigo} ancho={36} radio={5} />
            <span style={{ fontSize: 24, marginLeft: 12, color: "#3B4452" }}>Para barberías en {p.nombre}</span>
          </div>
          <div style={{
            display: "flex", fontFamily: "Inter Tight", fontWeight: 800, fontSize: 66, lineHeight: 1.02,
            letterSpacing: -2.5, marginTop: 26,
          }}>
            Toda tu barbería en una sola plataforma.
          </div>
          <div style={{ display: "flex", fontSize: 25, lineHeight: 1.35, color: "#3B4452", marginTop: 20 }}>
            Reservas online, recordatorios por WhatsApp y un asistente con IA que agenda solo.
          </div>
          <div style={{ display: "flex", flexGrow: 1 }} />
          <span style={{ display: "flex", fontSize: 26, color: ACCENT, fontWeight: 500 }}>synaptechspa.cl/{codigo}</span>
        </div>

        {/* Derecha: los dos precios y la oferta */}
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
          {tarjeta(agenda.nombre, agenda.precio, true, "Recomendado")}
          <div style={{ display: "flex", height: 16 }} />
          {tarjeta(ia.nombre, ia.precio, false, "Cupos limitados")}
          <div style={{
            display: "flex", justifyContent: "center", marginTop: 18, borderRadius: 999,
            backgroundColor: LIME, color: INK, padding: "14px 20px",
            fontFamily: "Inter Tight", fontWeight: 600, fontSize: 24,
          }}>
            2 meses gratis · sin cobro por barbero
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
    },
  );
  // ImageResponse trae "immutable, max-age=31536000": se reemplaza (no se suma) para que
  // la CDN la renueve una vez al día con el cambio del día.
  imagen.headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
  return imagen;
}

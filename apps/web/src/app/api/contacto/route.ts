import { Resend } from "resend";
import { NextResponse } from "next/server";

const DEST = process.env.CONTACT_EMAIL ?? "hola@synaptechspa.cl";

/* 23-10-2026: un escáner mandó 19 formularios en un minuto (una comilla en
   cada campo, buscando inyección SQL). Acá no hay base de datos, pero el
   endpoint no tenía freno ni escapaba nada: cualquiera podía llenar hola@ y
   meter HTML (enlaces falsos) en un correo firmado por contacto@. */
const LARGO = { nombre: 80, empresa: 80, email: 120, phone: 30, msg: 3000 };
const EMAIL_OK = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Escapa todo lo que viene del formulario antes de meterlo en el HTML.
const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/* Freno por IP: 3 envíos cada 10 min. Vive en la instancia (Fluid Compute
   la reutiliza), así que no es perfecto, pero corta una ráfaga como la del 23-10. */
const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 3;
const envios = new Map<string, number[]>();
function frenado(ip: string) {
  const ahora = Date.now();
  const recientes = (envios.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (recientes.length >= MAX_POR_VENTANA) { envios.set(ip, recientes); return true; }
  recientes.push(ahora);
  envios.set(ip, recientes);
  if (envios.size > 5000) envios.clear();
  return false;
}

function html(nombre: string, empresa: string, email: string, phone: string, msg: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:'JetBrains Mono',monospace,sans-serif;color:#fafafa;">
  <div style="max-width:560px;margin:32px auto;padding:40px 36px;background:#111113;border:1px solid #27272a;border-radius:16px;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:32px;">
      <span style="font-size:20px;font-weight:700;letter-spacing:-0.5px;color:#fafafa;">synaptech</span>
      <span style="font-size:11px;color:#a3e635;background:rgba(163,230,53,0.12);border:1px solid rgba(163,230,53,0.3);padding:2px 8px;border-radius:99px;font-weight:600;">nuevo mensaje</span>
    </div>

    <h2 style="margin:0 0 24px;font-size:22px;font-weight:700;color:#fafafa;">
      Mensaje de <span style="color:#a3e635;">${nombre}</span>
    </h2>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      ${[
        ["Nombre", nombre],
        ["Empresa", empresa || "—"],
        ["Email", email],
        ["Teléfono", phone || "No indicado"],
      ].map(([label, value]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #27272a;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em;width:36%;vertical-align:top;">${label}</td>
        <td style="padding:10px 0 10px 16px;border-bottom:1px solid #27272a;font-size:13px;color:#fafafa;vertical-align:top;">${value}</td>
      </tr>`).join("")}
    </table>

    <div style="padding:20px;background:#0d0d0f;border:1px solid #27272a;border-radius:10px;margin-bottom:28px;">
      <p style="margin:0 0 8px;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em;">Mensaje</p>
      <p style="margin:0;font-size:13px;color:#fafafa;line-height:1.7;white-space:pre-wrap;">${msg}</p>
    </div>

    <div style="padding:20px;background:rgba(163,230,53,0.06);border:1px solid rgba(163,230,53,0.2);border-radius:10px;">
      <p style="margin:0;font-size:12px;color:#a3a3a3;">
        Responde a este email directamente para contactar a <strong style="color:#fafafa;">${nombre}</strong>.
      </p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const txt = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const nombre = txt(body.nombre, LARGO.nombre);
  const empresa = txt(body.empresa, LARGO.empresa);
  const email = txt(body.email, LARGO.email);
  const phone = txt(body.phone, LARGO.phone);
  const msg = txt(body.msg, LARGO.msg);
  // /empresas manda origen "empresas": el asunto lo separa de los locales.
  const etiqueta = body.origen === "empresas" ? "Empresas" : "Contacto";

  // Honeypot
  if (body.website) return NextResponse.json({ success: true });

  if (!nombre || !email || !msg) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 422 });
  }
  if (!EMAIL_OK.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 422 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "sin-ip";
  if (frenado(ip)) {
    return NextResponse.json({ error: "Demasiados envíos, intenta más tarde" }, { status: 429 });
  }

  const { error } = await resend.emails.send({
    from: "Synaptech Contacto <contacto@synaptechspa.cl>",
    to: [DEST],
    replyTo: email,
    subject: `[${etiqueta}] ${empresa ? empresa + " · " : ""}${nombre}`.replace(/[\r\n]+/g, " "),
    html: html(esc(nombre), esc(empresa), esc(email), esc(phone), esc(msg)),
  });

  if (error) {
    console.error("[contacto] Resend error:", error);
    return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

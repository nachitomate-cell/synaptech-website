import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const DEST = "hola@synaptech.cl";

function html(nombre: string, empresa: string, email: string, phone: string, rubro: string, problema: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:'JetBrains Mono',monospace,sans-serif;color:#fafafa;">
  <div style="max-width:560px;margin:32px auto;padding:40px 36px;background:#111113;border:1px solid #27272a;border-radius:16px;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:32px;">
      <span style="font-size:20px;font-weight:700;letter-spacing:-0.5px;color:#fafafa;">synaptech</span>
      <span style="font-size:11px;color:#a3e635;background:rgba(163,230,53,0.12);border:1px solid rgba(163,230,53,0.3);padding:2px 8px;border-radius:99px;font-weight:600;">nuevo diagnóstico</span>
    </div>

    <h2 style="margin:0 0 24px;font-size:22px;font-weight:700;color:#fafafa;">
      Diagnóstico de <span style="color:#a3e635;">${nombre.split(" ")[0]}</span>
    </h2>

    <table style="width:100%;border-collapse:collapse;">
      ${[
        ["Nombre", nombre],
        ["Empresa", empresa],
        ["Email", email],
        ["Teléfono", phone || "No indicado"],
        ["Industria", rubro],
        ["Desafío principal", problema],
      ].map(([label, value]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #27272a;font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:0.1em;width:36%;vertical-align:top;">${label}</td>
        <td style="padding:10px 0 10px 16px;border-bottom:1px solid #27272a;font-size:13px;color:#fafafa;vertical-align:top;">${value}</td>
      </tr>`).join("")}
    </table>

    <div style="margin-top:32px;padding:20px;background:rgba(163,230,53,0.06);border:1px solid rgba(163,230,53,0.2);border-radius:10px;">
      <p style="margin:0;font-size:12px;color:#a3a3a3;">
        Responde a este email directamente para contactar a <strong style="color:#fafafa;">${nombre}</strong>.<br>
        Recuerda enviar propuesta en <strong style="color:#a3e635;">menos de 48 horas hábiles</strong>.
      </p>
    </div>
  </div>
</body>
</html>`;
}

function confirmHtml(nombre: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:sans-serif;color:#fafafa;">
  <div style="max-width:560px;margin:32px auto;padding:40px 36px;background:#111113;border:1px solid #27272a;border-radius:16px;">
    <div style="margin-bottom:32px;">
      <span style="font-size:20px;font-weight:700;letter-spacing:-0.5px;color:#fafafa;font-family:monospace;">synaptech</span>
    </div>

    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#fafafa;">
      Recibimos tu diagnóstico, ${nombre.split(" ")[0]}
    </h2>
    <p style="margin:0 0 24px;font-size:15px;color:#a1a1aa;line-height:1.6;">
      Gracias por contactarnos. Esto es lo que pasa ahora:
    </p>

    <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:32px;">
      ${[
        ["1", "Te contactaremos en menos de 48 horas hábiles con una propuesta inicial y alcance estimado."],
        ["2", "Si hay encaje, agendamos una llamada de 30 minutos para profundizar en tu proyecto."],
        ["3", "Sin compromiso. Sin venta agresiva. Si no es el momento, quedas en nuestra lista para retomar cuando corresponda."],
      ].map(([num, text]) => `
      <div style="display:flex;align-items:flex-start;gap:14px;">
        <div style="min-width:28px;height:28px;background:rgba(163,230,53,0.12);border:1px solid rgba(163,230,53,0.35);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#a3e635;font-family:monospace;">${num}</div>
        <p style="margin:4px 0 0;font-size:13px;color:#a1a1aa;line-height:1.6;">${text}</p>
      </div>`).join("")}
    </div>

    <a href="https://synaptechspa.cl/casos" style="display:inline-block;background:#a3e635;color:#09090b;font-weight:700;font-size:13px;padding:12px 24px;border-radius:8px;text-decoration:none;">
      Conoce nuestros proyectos →
    </a>

    <p style="margin:32px 0 0;font-size:11px;color:#52525b;">
      Synaptech SpA · Viña del Mar, Chile · <a href="mailto:hola@synaptech.cl" style="color:#a3e635;text-decoration:none;">hola@synaptech.cl</a>
    </p>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { nombre, empresa, email, phone, rubro, problema, website } = body;

  // Honeypot: bots fill the hidden "website" field
  if (website) return NextResponse.json({ success: true });

  if (!nombre?.trim() || !email?.trim() || !rubro || !problema) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 422 });
  }

  const [internalResult, confirmResult] = await Promise.allSettled([
    resend.emails.send({
      from: "Synaptech Diagnósticos <onboarding@resend.dev>",
      to: [DEST],
      replyTo: email,
      subject: `[Diagnóstico] ${rubro} · ${empresa || nombre}`,
      html: html(nombre, empresa || "—", email, phone || "", rubro, problema),
    }),
    resend.emails.send({
      from: "Synaptech <onboarding@resend.dev>",
      to: [email],
      subject: "Recibimos tu diagnóstico — Synaptech",
      html: confirmHtml(nombre),
    }),
  ]);

  const internalOk = internalResult.status === "fulfilled" && !internalResult.value.error;
  if (!internalOk) {
    const err = internalResult.status === "fulfilled" ? internalResult.value.error : internalResult.reason;
    console.error("[diagnostico] Resend error:", err);
    return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

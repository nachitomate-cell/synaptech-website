"use client";
import { useState } from "react";

/* Formulario de /empresas (28-10-2026). Va a /api/contacto con origen
   "empresas" (asunto [Empresas]) y arma el mensaje con las respuestas, así
   Ignacio ve de un vistazo si es un local que se da de alta solo o una
   cuenta grande que vale una reunión. */

const RUBROS = ["Salud o clínica", "Estética o belleza", "Deporte o bienestar", "Ventas o agencia", "Educación", "Servicios técnicos", "Otro"];
const TAMANOS = ["Solo yo", "2 a 5 personas", "6 a 20 personas", "Más de 20 personas", "Varias sedes"];
const CANALES = ["WhatsApp", "Instagram", "Sitio web", "Teléfono"];
const VOLUMENES = ["Menos de 300 al mes", "300 a 1.000 al mes", "1.000 a 5.000 al mes", "Más de 5.000 al mes", "No sé"];

const CAMPO = "w-full min-w-0 bg-bg-primary border border-border-subtle rounded-lg px-4 py-3 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors";

export default function FormEmpresas() {
  const [form, setForm] = useState({ nombre: "", empresa: "", email: "", phone: "", rubro: "", tamano: "", volumen: "", tarea: "", sistema: "" });
  const [canales, setCanales] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const upd = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  const alternar = (c: string) =>
    setCanales((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");
    const msg = [
      `Rubro: ${form.rubro}`,
      `Tamaño: ${form.tamano}`,
      `Canales: ${canales.join(", ") || "—"}`,
      `Conversaciones: ${form.volumen || "—"}`,
      `Sistema que usan hoy: ${form.sistema || "—"}`,
      "",
      "Qué quieren delegar:",
      form.tarea,
    ].join("\n");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: form.nombre, empresa: form.empresa, email: form.email, phone: form.phone, msg, origen: "empresas", website: honeypot }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setErrMsg("Hubo un error al enviar. Escríbenos directamente a hola@synaptechspa.cl");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cuentanos" className="py-16 md:py-24 bg-mist scroll-mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 items-start">
        <div>
          <p className="eyebrow mb-4">Cuéntanos</p>
          <h2 className="text-ink">¿Qué quieres que haga el agente en tu empresa?</h2>
          <p className="text-text-secondary text-lg mt-4 leading-relaxed">
            Con estas respuestas vemos qué habilidades encender y te mandamos una propuesta con
            precio cerrado. Te respondemos en menos de 24 horas hábiles.
          </p>
        </div>

        <div className="min-w-0 bg-white border border-border-subtle rounded-[28px] p-6 sm:p-8 md:p-10">
          {sent ? (
            <div className="flex flex-col items-center gap-5 py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-lime/30 border-2 border-lime flex items-center justify-center">
                <svg className="w-6 h-6 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-ink mb-1">¡Recibido!</p>
                <p className="text-text-secondary text-sm">Te escribimos en menos de 24 horas hábiles.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <input type="text" name="website" tabIndex={-1} aria-hidden="true"
                value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre completo" value={form.nombre} onChange={upd("nombre")} required className={CAMPO} />
                <input type="text" placeholder="Empresa" value={form.empresa} onChange={upd("empresa")} required className={CAMPO} />
                <input type="email" placeholder="Correo" value={form.email} onChange={upd("email")} required className={CAMPO} />
                <input type="tel" placeholder="WhatsApp" value={form.phone} onChange={upd("phone")} required className={CAMPO} />
                <select value={form.rubro} onChange={upd("rubro")} required className={CAMPO} aria-label="Rubro">
                  <option value="" disabled>Rubro</option>
                  {RUBROS.map((r) => <option key={r}>{r}</option>)}
                </select>
                <select value={form.tamano} onChange={upd("tamano")} required className={CAMPO} aria-label="Tamaño del equipo">
                  <option value="" disabled>¿Cuántos son en el equipo?</option>
                  {TAMANOS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>

              <fieldset>
                <legend className="text-sm font-semibold text-ink mb-2">¿Por dónde te escriben tus clientes?</legend>
                <div className="flex flex-wrap gap-2">
                  {CANALES.map((c) => (
                    <button key={c} type="button" onClick={() => alternar(c)} aria-pressed={canales.includes(c)}
                      className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${canales.includes(c) ? "bg-ink text-white border-ink" : "border-ink/15 text-ink hover:border-ink/40"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </fieldset>

              <select value={form.volumen} onChange={upd("volumen")} className={CAMPO} aria-label="Conversaciones al mes">
                <option value="">¿Cuántas conversaciones reciben al mes?</option>
                {VOLUMENES.map((v) => <option key={v}>{v}</option>)}
              </select>
              <textarea rows={4} placeholder="¿Qué tarea quieres delegar? Por ejemplo: responder dudas y agendar, cotizar, cobrar abonos, retomar a los que no compraron…"
                value={form.tarea} onChange={upd("tarea")} required className={`${CAMPO} resize-none`} />
              <input type="text" placeholder="¿Qué sistema usan hoy? (opcional)" value={form.sistema} onChange={upd("sistema")} className={CAMPO} />

              {errMsg && <p className="text-red-500 text-xs font-mono">{errMsg}</p>}
              <button type="submit" disabled={loading}
                className="bg-ink text-white font-bold text-sm px-6 py-3.5 rounded-full hover:bg-black transition-colors mt-1 self-start disabled:opacity-40 disabled:cursor-not-allowed">
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

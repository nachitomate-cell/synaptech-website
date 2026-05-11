"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RUBROS = ["Salud", "Retail", "Educación", "Belleza"] as const;
type Rubro = typeof RUBROS[number];

const PROBLEMS: Record<Rubro, string[]> = {
  Salud:     ["Alta tasa de no-shows", "Ficha clínica en papel", "Sin visualización DICOM", "Cobros manuales"],
  Retail:    ["Sin programa de fidelización", "Sin integración Google Wallet", "Sin notificaciones push", "Reportes en Excel"],
  Educación: ["Comunicaciones dispersas", "Pagos de arancel manuales", "Sin portal institucional PWA", "Sin app para apoderados"],
  Belleza:   ["Agenda solo por WhatsApp", "Sin recordatorios automáticos", "Sin club de fidelidad", "Sin cobro online"],
};

const DOT_GRID = Array.from({ length: 80 }, (_, i) => i);

export default function Diagnosis() {
  const [step,    setStep]    = useState(0);
  const [rubro,   setRubro]   = useState<Rubro | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [form,    setForm]    = useState({ nombre: "", empresa: "", email: "", phone: "" });
  const [done,     setDone]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [errMsg,   setErrMsg]   = useState("");
  const [honeypot, setHoneypot] = useState("");

  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    setLoading(true);
    setErrMsg("");
    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rubro, problema: problem, website: honeypot }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setErrMsg("Hubo un error al enviar. Escríbenos directamente a hola@synaptech.cl");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="diagnostico" className="py-32 bg-bg-secondary overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: animated dot-grid visual */}
          <div className="hidden lg:block relative h-[460px] rounded-2xl border border-border-subtle overflow-hidden bg-bg-primary">
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 460" aria-hidden>
              {DOT_GRID.map((_, i) => {
                const col = i % 10, row = Math.floor(i / 10);
                return (
                  <circle
                    key={i}
                    cx={col * 40 + 20} cy={row * 46 + 23}
                    r="1.5" fill="#a3e635"
                    opacity={0.2 + ((col + row) % 5) * 0.1}
                  />
                );
              })}
              {/* Highlight lines */}
              <line x1="20" y1="23" x2="380" y2="23" stroke="#a3e635" strokeWidth="0.4" opacity="0.2"/>
              <line x1="20" y1="115" x2="380" y2="115" stroke="#a3e635" strokeWidth="0.4" opacity="0.2"/>
              <line x1="20" y1="207" x2="380" y2="207" stroke="#a3e635" strokeWidth="0.4" opacity="0.2"/>
              <line x1="20" y1="299" x2="380" y2="299" stroke="#a3e635" strokeWidth="0.4" opacity="0.2"/>
              <line x1="20" y1="391" x2="380" y2="391" stroke="#a3e635" strokeWidth="0.4" opacity="0.2"/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-10">
              <span className="font-mono text-[11px] text-accent uppercase tracking-widest">Proceso en 3 pasos</span>
              <div className="flex flex-col gap-4 w-full max-w-xs">
                {["Tu industria", "Tu desafío", "Tus datos"].map((label, i) => (
                  <div key={label} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300
                    ${step > i ? "border-accent/40 bg-accent/5" : step === i ? "border-accent bg-accent/10" : "border-border-subtle"}`}>
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center font-mono text-[11px] font-semibold shrink-0
                      ${step > i ? "border-accent bg-accent text-black" : step === i ? "border-accent text-accent" : "border-border-subtle text-text-muted"}`}>
                      {step > i ? "✓" : i + 1}
                    </div>
                    <span className={`text-sm font-medium ${step >= i ? "text-text-primary" : "text-text-muted"}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <p className="eyebrow mb-5">Diagnóstico Gratis</p>
            <h2 className="text-text-primary mb-10">
              ¿Listo para{" "}
              <em className="italic text-accent not-italic font-display">transformar</em>?
            </h2>

            {/* Progress bar */}
            <div className="flex gap-1.5 mb-10">
              {[0,1,2].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500
                  ${i < step ? "bg-accent" : i === step ? "bg-accent/60" : "bg-border-subtle"}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-6 py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                    <svg className="w-7 h-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-text-primary mb-2">¡Listo, {form.nombre.split(" ")[0]}!</h3>
                    <p className="text-text-secondary text-sm leading-relaxed max-w-sm mb-6">
                      Recibimos tu diagnóstico. ¿Qué pasa ahora?
                    </p>
                    <ol className="flex flex-col gap-3 text-left max-w-sm">
                      {[
                        "Recibirás un email de confirmación en menos de 5 minutos.",
                        "En menos de 48 horas hábiles te enviamos una propuesta inicial con alcance y rango de inversión.",
                        "Si hay encaje, agendamos una llamada de 30 minutos para profundizar.",
                      ].map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="shrink-0 w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-mono text-[10px] text-accent font-bold">
                            {i + 1}
                          </span>
                          <span className="text-text-secondary text-sm leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-6 font-mono text-[11px] text-text-muted">
                      Sin compromiso. Sin venta agresiva.
                    </p>
                  </div>
                </motion.div>

              ) : step === 0 ? (
                <motion.div key="step0"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}>
                  <p className="text-text-secondary text-sm mb-5">¿En qué industria opera tu empresa?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {RUBROS.map(r => (
                      <button key={r} onClick={() => { setRubro(r); setStep(1); }}
                        className="border border-border-subtle rounded-xl px-5 py-4 text-sm font-medium text-text-secondary
                          hover:border-accent/50 hover:text-text-primary hover:bg-accent/5 transition-all text-left">
                        {r}
                      </button>
                    ))}
                  </div>
                </motion.div>

              ) : step === 1 ? (
                <motion.div key="step1"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}>
                  <p className="text-text-secondary text-sm mb-5">¿Cuál es tu principal desafío en <strong className="text-text-primary">{rubro}</strong>?</p>
                  <div className="flex flex-col gap-2.5">
                    {PROBLEMS[rubro!].map(p => (
                      <button key={p} onClick={() => { setProblem(p); setStep(2); }}
                        className="border border-border-subtle rounded-xl px-5 py-3.5 text-sm font-medium text-text-secondary
                          hover:border-accent/50 hover:text-text-primary hover:bg-accent/5 transition-all text-left">
                        {p}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(0)} className="mt-5 text-xs font-mono text-text-muted hover:text-text-secondary transition-colors">
                    ← Volver
                  </button>
                </motion.div>

              ) : (
                <motion.div key="step2"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4">
                  <p className="text-text-secondary text-sm">Completa tus datos para enviarte el diagnóstico.</p>
                  {/* Honeypot — invisible para usuarios, visible para bots */}
                  <input
                    type="text" name="website" tabIndex={-1} aria-hidden="true"
                    value={honeypot} onChange={e => setHoneypot(e.target.value)}
                    style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
                  />
                  {(["nombre","empresa","email","phone"] as const).map((k) => (
                    <input key={k} type={k === "email" ? "email" : "text"}
                      placeholder={{ nombre: "Nombre completo", empresa: "Empresa", email: "Correo electrónico", phone: "Teléfono (opcional)" }[k]}
                      value={form[k]} onChange={upd(k)}
                      className="w-full bg-bg-primary border border-border-subtle rounded-lg px-4 py-3 text-sm font-mono
                        text-text-primary placeholder:text-text-muted
                        focus:outline-none focus:border-accent transition-colors"
                    />
                  ))}
                  {errMsg && (
                    <p className="text-red-400 text-xs font-mono">{errMsg}</p>
                  )}
                  <button onClick={submit} disabled={!form.nombre || !form.email || loading}
                    className="mt-2 bg-accent text-black font-bold text-sm px-6 py-3.5 rounded-lg
                      hover:bg-accent-dim hover:text-white transition-all shadow-lime
                      disabled:opacity-40 disabled:cursor-not-allowed">
                    {loading ? "Enviando..." : "Solicitar Diagnóstico Gratis"}
                  </button>
                  <button onClick={() => setStep(1)} className="text-xs font-mono text-text-muted hover:text-text-secondary transition-colors text-center">
                    ← Volver
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

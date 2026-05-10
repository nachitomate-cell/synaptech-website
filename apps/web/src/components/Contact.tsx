"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const DOTS = Array.from({ length: 100 }, (_, i) => i);

export default function Contact() {
  const [form, setForm] = useState({ nombre: "", empresa: "", email: "", phone: "", msg: "" });
  const [sent, setSent] = useState(false);
  const upd = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contacto" className="py-32 bg-bg-primary">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="eyebrow mb-5">Contacto</p>
          <h2 className="text-text-primary max-w-xl">
            Hablemos de tu{" "}
            <em className="italic text-accent not-italic font-display">próximo proyecto</em>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-bg-secondary border border-border-subtle rounded-2xl p-8 md:p-10"
          >
            {sent ? (
              <div className="flex flex-col items-center gap-5 py-10 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-text-primary mb-1">¡Mensaje recibido!</p>
                  <p className="text-text-secondary text-sm">Te contactamos en menos de 24 horas.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(["nombre","empresa"] as const).map(k => (
                    <input key={k} type="text"
                      placeholder={{ nombre: "Nombre completo", empresa: "Empresa" }[k]}
                      value={form[k]} onChange={upd(k)} required
                      className="bg-bg-primary border border-border-subtle rounded-lg px-4 py-3 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="email" placeholder="Correo electrónico"
                    value={form.email} onChange={upd("email")} required
                    className="bg-bg-primary border border-border-subtle rounded-lg px-4 py-3 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                  <input type="tel" placeholder="Teléfono"
                    value={form.phone} onChange={upd("phone")}
                    className="bg-bg-primary border border-border-subtle rounded-lg px-4 py-3 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <textarea rows={5} placeholder="Cuéntanos sobre tu proyecto..."
                  value={form.msg} onChange={upd("msg")} required
                  className="bg-bg-primary border border-border-subtle rounded-lg px-4 py-3 text-sm font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                />
                <button type="submit"
                  className="bg-accent text-black font-bold text-sm px-6 py-3.5 rounded-lg hover:bg-accent-dim hover:text-white hover:scale-[1.01] transition-all shadow-lime mt-1 self-start">
                  Enviar mensaje
                </button>
              </form>
            )}
          </motion.div>

          {/* Info + animated map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            {/* Contact info */}
            <div className="flex flex-col gap-5">
              {[
                { label: "Email", value: "hola@synaptech.cl", href: "mailto:hola@synaptech.cl" },
                { label: "Teléfono", value: "+56 9 0000 0000", href: "tel:+5690000000" },
                { label: "Ubicación", value: "Viña del Mar, Chile" },
              ].map(item => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} className="font-mono text-sm text-text-primary hover:text-accent transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-mono text-sm text-text-primary">{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Animated dot map placeholder */}
            <div className="relative h-52 rounded-2xl border border-border-subtle overflow-hidden bg-bg-secondary">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" aria-hidden>
                {DOTS.map((_, i) => {
                  const col = i % 10, row = Math.floor(i / 10);
                  const isVina = col >= 5 && col <= 7 && row >= 4 && row <= 6;
                  return (
                    <circle key={i} cx={col * 30 + 15} cy={row * 20 + 10}
                      r={isVina ? 3 : 1.2}
                      fill="#a3e635"
                      opacity={isVina ? 0.9 : 0.12}
                    >
                      {isVina && (
                        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite"/>
                      )}
                    </circle>
                  );
                })}
              </svg>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot shrink-0"/>
                <span className="font-mono text-[11px] text-text-muted">Viña del Mar, V Región · Chile</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

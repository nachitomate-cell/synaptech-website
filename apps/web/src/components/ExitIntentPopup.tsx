"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "exit_intent_shown";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    if (window.innerWidth < 768) return;

    const handleLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem(SESSION_KEY, "1");
        document.removeEventListener("mouseleave", handleLeave);
      }
    };

    const t = setTimeout(() => {
      document.addEventListener("mouseleave", handleLeave);
    }, 4000);

    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const close = () => setShow(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-bg-secondary border border-border-subtle rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Cerrar"
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              </svg>
            </button>

            <p className="font-mono text-[11px] text-accent uppercase tracking-widest mb-3">Antes de irte</p>
            <p className="font-display text-2xl font-bold text-text-primary mb-3 leading-tight"
              style={{ fontSize: "clamp(1.4rem, 3vw, 1.75rem)", letterSpacing: "-0.02em" }}>
              ¿Te vas sin tu diagnóstico{" "}
              <em className="italic text-accent">gratuito</em>?
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              En 2 minutos descubrimos qué tecnología necesita tu empresa y te enviamos una propuesta en 48 horas hábiles — sin costo y sin compromiso.
            </p>

            <a
              href="/#diagnostico"
              onClick={close}
              className="block w-full text-center bg-accent text-black font-bold text-sm px-6 py-3.5 rounded-lg
                hover:bg-accent-dim hover:text-white transition-all shadow-lime"
            >
              Quiero mi diagnóstico gratis
            </a>
            <button
              onClick={close}
              className="mt-3 w-full text-center font-mono text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              No, gracias
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

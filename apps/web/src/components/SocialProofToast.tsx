"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TOASTS = [
  { industry: "Retail",     action: "solicitó un diagnóstico", city: "Santiago",    time: "hace 2 min"  },
  { industry: "Salud",      action: "pidió una propuesta",     city: "Viña del Mar",time: "hace 5 min"  },
  { industry: "Educación",  action: "solicitó información",    city: "Concepción",  time: "hace 8 min"  },
  { industry: "Belleza",    action: "solicitó un diagnóstico", city: "Las Condes",  time: "hace 1 min"  },
  { industry: "Retail",     action: "pidió una propuesta",     city: "Valparaíso",  time: "hace 12 min" },
  { industry: "Salud",      action: "solicitó un diagnóstico", city: "Providencia", time: "hace 3 min"  },
] as const;

const COLOR: Record<string, string> = {
  Retail: "#a3e635", Salud: "#38bdf8", Educación: "#fb923c", Belleza: "#f472b6",
};

export default function SocialProofToast() {
  const [idx, setIdx] = useState<number | null>(null);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    const show = (i: number) => {
      setIdx(i);
      hideTimer = setTimeout(() => setIdx(null), 5000);
      nextTimer = setTimeout(() => show((i + 1) % TOASTS.length), 5000 + 22000 + Math.random() * 8000);
    };

    const first = setTimeout(() => show(0), 10000);
    return () => { clearTimeout(first); clearTimeout(hideTimer); clearTimeout(nextTimer); };
  }, []);

  const toast = idx !== null ? TOASTS[idx] : null;

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -16, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-3 bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3
              shadow-2xl max-w-[272px] pointer-events-auto"
          >
            <div
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-bold font-mono"
              style={{ background: COLOR[toast.industry] }}
            >
              {toast.industry[0]}
            </div>
            <div>
              <p className="text-xs text-text-primary leading-snug">
                <span className="text-text-muted">Empresa de </span>
                <span className="font-semibold">{toast.industry}</span>
                <span className="text-text-muted"> {toast.action}</span>
              </p>
              <p className="font-mono text-[10px] text-text-muted mt-1">
                {toast.city} · {toast.time}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

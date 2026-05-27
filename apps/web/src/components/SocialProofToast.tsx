"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TOASTS = [
  { industry: "Retail",     action: "solicitó un diagnóstico", city: "Santiago",    time: "hace 3 min"  },
  { industry: "Salud",      action: "pidió una propuesta",     city: "Viña del Mar",time: "hace 18 min" },
  { industry: "Belleza",    action: "solicitó un diagnóstico", city: "Las Condes",  time: "hace 7 min"  },
  { industry: "Educación",  action: "pidió una propuesta",     city: "Concepción",  time: "hace 41 min" },
  { industry: "Salud",      action: "solicitó información",    city: "Providencia", time: "hace 25 min" },
  { industry: "Retail",     action: "solicitó un diagnóstico", city: "Valparaíso",  time: "hace 52 min" },
] as const;

const COLOR: Record<string, string> = {
  Retail: "#a3e635", Salud: "#38bdf8", Educación: "#fb923c", Belleza: "#f472b6",
};

const MAX_PER_SESSION = 3;
const SESSION_KEY = "fomo_count";

export default function SocialProofToast() {
  const [idx, setIdx] = useState<number | null>(null);
  const countRef = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const shown = parseInt(sessionStorage.getItem(SESSION_KEY) ?? "0", 10);
    if (shown >= MAX_PER_SESSION) return;
    countRef.current = shown;

    const schedule = (i: number, delay: number) => {
      const t = setTimeout(() => {
        if (countRef.current >= MAX_PER_SESSION) return;
        setIdx(i);
        countRef.current += 1;
        sessionStorage.setItem(SESSION_KEY, String(countRef.current));

        const hide = setTimeout(() => setIdx(null), 5500);
        timers.current.push(hide);

        if (countRef.current < MAX_PER_SESSION) {
          // 70–120 seconds between toasts
          const next = 70000 + Math.random() * 50000;
          schedule((i + 1) % TOASTS.length, next);
        }
      }, delay);
      timers.current.push(t);
    };

    // First toast: 20–35 seconds after load
    schedule(shown % TOASTS.length, 20000 + Math.random() * 15000);

    return () => timers.current.forEach(clearTimeout);
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

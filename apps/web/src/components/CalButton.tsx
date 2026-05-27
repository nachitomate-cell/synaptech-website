"use client";
import { useEffect } from "react";

declare const window: Window & { Cal?: (...args: unknown[]) => void };

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "";

export default function CalButton() {
  useEffect(() => {
    if (!CAL_LINK) return;
    if (document.querySelector('script[src*="cal.com/embed"]')) return;

    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => a.q.push(ar);
      C.Cal = C.Cal || function (...args: any[]) {
        const cal = C.Cal;
        if (!cal.loaded) {
          cal.ns = {}; cal.q = [];
          const s = C.document.createElement("script");
          s.src = A;
          C.document.head.appendChild(s);
          cal.loaded = true;
        }
        if (args[0] === L) {
          const api: any = (...a: any[]) => p(api, a);
          const ns = args[1];
          api.q = [];
          typeof ns === "string" ? (cal.ns[ns] = api) && p(api, args) : p(cal, args);
          return;
        }
        p(cal, args);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal!("init", { origin: "https://app.cal.com" });
    window.Cal!("ui", {
      theme: "dark",
      styles: { branding: { brandColor: "#a3e635" } },
      hideEventTypeDetails: false,
    });
  }, []);

  if (!CAL_LINK) return null;

  return (
    <button
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      className="mt-4 w-full flex items-center justify-center gap-2 border border-accent/40 text-accent
        font-mono font-semibold text-xs px-6 py-3.5 rounded-lg hover:bg-accent/10 transition-all"
    >
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
      Agendar llamada de 30 min
    </button>
  );
}

"use client";

const STACK = [
  "Next.js", "React", "TypeScript", "PostgreSQL", "FastAPI", "Python",
  "DICOM.js", "Google Wallet", "WhatsApp API", "Webpay", "Firebase",
  "Tailwind CSS", "Node.js", "React Native", "HL7", "Framer Motion",
];

export default function TechBand() {
  const items = [...STACK, ...STACK];

  return (
    <div
      aria-label="Tecnologías que usamos"
      className="overflow-hidden border-y border-border-subtle bg-bg-secondary py-4"
    >
      <div
        className="flex items-center gap-0 w-max"
        style={{ animation: "tech-scroll 40s linear infinite" }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((name, i) => (
          <span
            key={i}
            className="relative font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted px-7 hover:text-accent transition-colors cursor-default select-none"
          >
            {name}
            <span aria-hidden className="absolute right-0 top-1/2 -translate-y-1/2 text-accent/40">·</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes tech-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="tech-scroll"] { animation: none; }
        }
      `}</style>
    </div>
  );
}

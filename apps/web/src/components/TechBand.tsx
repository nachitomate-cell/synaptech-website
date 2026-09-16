"use client";

/* Solo lo que la plataforma usa de verdad en producción. Antes esto era una
   vitrina de capacidades de agencia — DICOM.js, HL7, FastAPI, React Native — que
   anunciaba "hacemos software a medida de lo que sea" en vez del stack de UN
   producto. Fue parte de lo que hizo que Google for Startups nos leyera como
   consultora (15-09-2026). Al sumar una tecnología acá, que sea una que corra. */
const STACK = [
  "Google Cloud", "Firebase", "Firestore", "Cloud Run", "React", "TypeScript",
  "WhatsApp API", "Google Wallet", "Mercado Pago", "Next.js", "Tailwind CSS",
  "Framer Motion",
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
    </div>
  );
}

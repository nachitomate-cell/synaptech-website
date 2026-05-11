import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent:           "#a3e635",
        "accent-dim":     "#65a30d",
        "accent-glow":    "rgba(163,230,53,0.15)",
        "bg-primary":     "#0a0a0a",
        "bg-secondary":   "#111111",
        "bg-elevated":    "#1a1a1a",
        "text-primary":   "#fafafa",
        "text-secondary": "#a1a1aa",
        "text-muted":     "#71717a",
        "border-subtle":  "#27272a",
        "syn-lime":       "#a3e635",
        "syn-lime-dark":  "#65a30d",
        "syn-lime-tint":  "#EEFBD3",
        "syn-black":      "#111111",
        "syn-bg":         "#0A0A0A",
        "syn-surface":    "#161616",
      },
      fontFamily: {
        display: ["var(--font-fraunces)",  "Georgia", "serif"],
        body:    ["var(--font-dm-sans)",   "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        heading: ["var(--font-fraunces)",  "Georgia", "serif"],
      },
      boxShadow: {
        lime:         "0 10px 30px rgba(163,230,53,.25)",
        "lime-hover": "0 14px 40px rgba(163,230,53,.40)",
        "lime-glow":  "0 0 60px -20px rgba(163,230,53,.40)",
        card:         "0 2px 20px rgba(0,0,0,.5)",
        "card-hover": "0 8px 40px rgba(0,0,0,.6),0 0 60px -20px rgba(163,230,53,.40)",
      },
      animation: {
        "fade-up":   "fade-up 0.6s ease both",
        "fade-in":   "fade-in 0.4s ease both",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        float:       "float 6s ease-in-out infinite",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "pulse-dot": {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%":     { opacity: "0.4", transform: "scale(0.75)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

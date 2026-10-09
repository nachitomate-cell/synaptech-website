import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* Tema claro (estilo Square, 08-10-2026). Los nombres de token se
           mantienen para que las páginas existentes cambien solas; `accent`
           es el verde de marca OSCURECIDO para que se lea como texto sobre
           blanco (5:1). El lima del logo #9CCC3C vive en `lime`. */
        accent:           "#4F7A12",
        "accent-dim":     "#3D5F0D",
        "accent-glow":    "rgba(156,204,60,0.18)",
        "bg-primary":     "#FFFFFF",
        "bg-secondary":   "#F4F5F1",
        "bg-elevated":    "#FFFFFF",
        "text-primary":   "#0F1A2B",
        "text-secondary": "#3B4452",
        "text-muted":     "#5F6B7A",
        "border-subtle":  "#E3E6DF",
        ink:              "#0F1A2B",
        lime:             "#9CCC3C",
        "lime-deep":      "#789C30",
        mist:             "#F4F5F1",
        "syn-lime":       "#9CCC3C",
        "syn-lime-dark":  "#789C30",
        "syn-lime-tint":  "#EEF6DC",
        "syn-black":      "#0F1A2B",
        "syn-bg":         "#FFFFFF",
        "syn-surface":    "#F4F5F1",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body:    ["var(--font-dm-sans)",   "system-ui", "sans-serif"],
        mono:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card:         "0 1px 3px rgba(15,26,43,.06),0 8px 24px rgba(15,26,43,.06)",
        "card-hover": "0 2px 6px rgba(15,26,43,.08),0 16px 40px rgba(15,26,43,.10)",
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

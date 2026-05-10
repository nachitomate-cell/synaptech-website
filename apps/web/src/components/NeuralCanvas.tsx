"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
}

const COUNT = 55;
const MAX_DIST = 130;
const RGB = "163,230,53";

export default function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, raf = 0;
    const particles: Particle[] = [];

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.38,
          vy: (Math.random() - 0.5) * 0.38,
          r: Math.random() * 1.4 + 0.8,
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < COUNT; i++) {
        const a = particles[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;

        // glow halo
        const g = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.r * 4);
        g.addColorStop(0, `rgba(${RGB},0.85)`);
        g.addColorStop(1, `rgba(${RGB},0)`);
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // core dot
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${RGB},1)`;
        ctx.fill();

        for (let j = i + 1; j < COUNT; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${RGB},${((1 - d / MAX_DIST) * 0.32).toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);
    resize(); init(); tick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="w-full h-full" aria-hidden />;
}

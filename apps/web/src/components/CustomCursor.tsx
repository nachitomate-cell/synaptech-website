"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rx = -100, ry = -100, dx = -100, dy = -100, raf = 0;

    const onMove = (e: MouseEvent) => { dx = e.clientX; dy = e.clientY; };

    const isInteractive = (el: Element | null): boolean => {
      if (!el) return false;
      const tag = el.tagName.toLowerCase();
      if (["a","button","input","textarea","select","label"].includes(tag)) return true;
      if ((el as HTMLElement).style?.cursor === "pointer") return true;
      return isInteractive(el.parentElement);
    };

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) {
        ring.current?.classList.add("is-hover");
      } else {
        ring.current?.classList.remove("is-hover");
      }
    };

    const tick = () => {
      rx += (dx - rx) * 0.15;
      ry += (dy - ry) * 0.15;
      if (dot.current) {
        dot.current.style.left  = `${dx}px`;
        dot.current.style.top   = `${dy}px`;
      }
      if (ring.current) {
        ring.current.style.left = `${rx}px`;
        ring.current.style.top  = `${ry}px`;
      }
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent hidden md:block"
      />
      <div
        ref={ring}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-accent/40 hidden md:block transition-[width,height,border-color] duration-150 is-ring"
        style={{ transition: "width 0.15s,height 0.15s,border-color 0.15s" }}
      />
      <style>{`.is-ring.is-hover{width:3rem!important;height:3rem!important;border-color:rgba(163,230,53,0.8)!important}`}</style>
    </>
  );
}

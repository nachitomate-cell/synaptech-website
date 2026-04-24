// microinteractions.jsx — small, composable hooks + effects
// Loaded after React + Babel, before app.jsx. Exports to window so app.jsx can import.

const { useState: _uState, useEffect: _uEffect, useRef: _uRef } = React;

// -------- Magnetic hover (button pulls toward cursor) --------
function useMagnetic(strength = 0.28, radius = 120) {
  const ref = _uRef(null);
  _uEffect(() => {
    const el = ref.current; if (!el) return;
    let raf; let tx = 0, ty = 0, cx = 0, cy = 0; let active = false;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width/2);
      const my = e.clientY - (r.top + r.height/2);
      const d = Math.hypot(mx, my);
      if (d < radius + Math.max(r.width, r.height)/2) {
        tx = mx * strength; ty = my * strength; active = true;
      } else if (active) { tx = 0; ty = 0; active = false; }
    };
    const onLeave = () => { tx = 0; ty = 0; active = false; };
    const tick = () => {
      cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [strength, radius]);
  return ref;
}

// -------- Tilt + aura on cards --------
function useTilt(max = 5) {
  const ref = _uRef(null);
  _uEffect(() => {
    const el = ref.current; if (!el) return;
    let raf; let rx = 0, ry = 0, ax = 0, ay = 0, gx = 50, gy = 50, tgx = 50, tgy = 50;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      rx = (py - 0.5) * -2 * max;
      ry = (px - 0.5) *  2 * max;
      tgx = px * 100; tgy = py * 100;
      el.style.setProperty('--aura-opacity', '1');
    };
    const onLeave = () => { rx = 0; ry = 0; el.style.setProperty('--aura-opacity', '0'); };
    const tick = () => {
      ax += (rx - ax) * 0.12; ay += (ry - ay) * 0.12;
      gx += (tgx - gx) * 0.16; gy += (tgy - gy) * 0.16;
      el.style.transform = `perspective(900px) rotateX(${ax.toFixed(2)}deg) rotateY(${ay.toFixed(2)}deg)`;
      el.style.setProperty('--aura-x', gx.toFixed(1) + '%');
      el.style.setProperty('--aura-y', gy.toFixed(1) + '%');
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [max]);
  return ref;
}

// -------- Count-up number (triggers on visible) --------
function CountUp({ to, prefix = '', suffix = '', duration = 1400 }) {
  const [v, setV] = _uState(0);
  const ref = _uRef(null);
  const started = _uRef(false);
  _uEffect(() => {
    const el = ref.current; if (!el) return;
    const start = () => {
      if (started.current) return;
      started.current = true;
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setV(to * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.95 && r.bottom > 0) { start(); return true; }
      return false;
    };
    if (check()) return;
    const onScroll = () => { if (check()) { window.removeEventListener('scroll', onScroll); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [to, duration]);
  const display = Number.isInteger(to) ? Math.round(v) : v.toFixed(1);
  return <span ref={ref} style={{display:'inline-block'}}>{prefix}{display}{suffix}</span>;
}

// -------- Split text into word-spans for staggered reveal --------
function SplitText({ children, className = '', stagger = 50, delay = 0 }) {
  const parts = String(children).split(/(\s+)/);
  return (
    <span className={className}>
      {parts.map((p, i) => p.match(/^\s+$/) ? p : (
        <span key={i} className="syn-word" style={{ animationDelay: `${delay + i * stagger}ms` }}>{p}</span>
      ))}
    </span>
  );
}

// -------- Button with ripple --------
function Ripple({ children, className = '', href, onClick, ...rest }) {
  const [ripples, setR] = _uState([]);
  const fire = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const id = Math.random();
    setR(list => [...list, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setR(list => list.filter(x => x.id !== id)), 700);
    onClick && onClick(e);
  };
  const inner = <>
    {children}
    {ripples.map(r => <span key={r.id} className="syn-ripple" style={{ left: r.x, top: r.y }}/>)}
  </>;
  if (href) return <a href={href} className={`syn-has-ripple ${className}`} onClick={fire} {...rest}>{inner}</a>;
  return <button className={`syn-has-ripple ${className}`} onClick={fire} {...rest}>{inner}</button>;
}

// -------- Cursor halo (subtle lime dot) --------
function CursorHalo() {
  const dot = _uRef(null);
  const ring = _uRef(null);
  _uEffect(() => {
    let raf, x = -100, y = -100, rx = -100, ry = -100, scale = 1, targetScale = 1;
    const onMove = (e) => { x = e.clientX; y = e.clientY; };
    const isInteractive = (t) => {
      if (!t || !t.closest) return false;
      return !!(t.closest('a, button, .service-card, .case-card, .insight-card, .syn-input, input, textarea, [data-magnet], [data-tilt]'));
    };
    const onOver = (e) => { targetScale = isInteractive(e.target) ? 2.2 : 1; };
    const tick = () => {
      rx += (x - rx) * 0.22; ry += (y - ry) * 0.22;
      scale += (targetScale - scale) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${x-4}px, ${y-4}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx-18}px, ${ry-18}px) scale(${scale.toFixed(2)})`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', onOver); };
  }, []);
  const coarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  if (coarse) return null;
  return <>
    <div ref={ring} className="syn-cursor-ring"/>
    <div ref={dot} className="syn-cursor-dot"/>
  </>;
}

// -------- Header shrink on scroll --------
function useHeaderShrink() {
  _uEffect(() => {
    const el = document.querySelector('.site-header');
    if (!el) return;
    const onScroll = () => {
      if (window.scrollY > 20) el.classList.add('is-scrolled');
      else el.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

// -------- Scroll-linked bridge drawing --------
function useBridgeProgress() {
  const ref = _uRef(null);
  _uEffect(() => {
    const el = ref.current; if (!el) return;
    const paths = el.querySelectorAll('path');
    paths.forEach(p => {
      const L = p.getTotalLength();
      p.style.strokeDasharray = L;
      p.style.strokeDashoffset = L;
    });
    const dots = el.querySelectorAll('.bridge-dot');
    dots.forEach(d => { d.style.opacity = 0; d.style.transform = 'scale(0.2)'; });
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when bottom of svg at bottom of viewport, 1 when fully in
      const p = Math.max(0, Math.min(1, 1 - (r.top - vh * 0.2) / (vh * 0.7)));
      paths.forEach((path, i) => {
        const L = parseFloat(path.style.strokeDasharray) || path.getTotalLength();
        const start = i * 0.12;
        const local = Math.max(0, Math.min(1, (p - start) / (1 - start)));
        path.style.strokeDashoffset = L * (1 - local);
      });
      dots.forEach((d, i) => {
        const start = 0.45 + i * 0.09;
        const local = Math.max(0, Math.min(1, (p - start) / 0.2));
        d.style.opacity = local;
        d.style.transform = `scale(${0.2 + 0.8 * local})`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return ref;
}

// -------- Smooth anchor scroll --------
function useSmoothAnchors() {
  _uEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);
}

// Export to global
Object.assign(window, { useMagnetic, useTilt, CountUp, SplitText, Ripple, CursorHalo, useHeaderShrink, useBridgeProgress, useSmoothAnchors });

// futuristic.jsx — HUD, matrix rain, side rail, boot sequence.
// Loaded after microinteractions.jsx, before app.jsx.

const { useState: _fState, useEffect: _fEffect, useRef: _fRef } = React;

// ---------- HUD frame ----------
function HUD() {
  const [time, setTime] = _fState(() => new Date());
  _fEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n) => String(n).padStart(2, '0');
  const utc = `${pad(time.getUTCHours())}:${pad(time.getUTCMinutes())}:${pad(time.getUTCSeconds())}`;
  return (
    <div className="syn-hud" aria-hidden="true">
      <div className="syn-hud__grid"/>
      <div className="syn-hud__scan"/>
      <div className="syn-hud__beam"/>
      <div className="syn-hud__vignette"/>
      <div className="syn-hud__corner syn-hud__corner--tl"/>
      <div className="syn-hud__corner syn-hud__corner--tr"/>
      <div className="syn-hud__corner syn-hud__corner--bl"/>
      <div className="syn-hud__corner syn-hud__corner--br"/>
      <div className="syn-hud__readout syn-hud__readout--tl">
        <span>SYS <b>SYNAPTECH.OS</b> v2.6</span>
        <span>NODE <b>STGO-33.45S</b></span>
      </div>
      <div className="syn-hud__readout syn-hud__readout--tr">
        <span>UTC <b>{utc}</b></span>
        <span><span className="blink">●</span> LINK STABLE</span>
      </div>
      <div className="syn-hud__readout syn-hud__readout--bl">
        <span>TELEMETRY <b>NOMINAL</b></span>
      </div>
      <div className="syn-hud__readout syn-hud__readout--br">
        <span>ENC AES-256 · TLS1.3</span>
      </div>
    </div>
  );
}

// ---------- Side progress rail ----------
const RAIL_ITEMS = [
  { id: 'inicio',    n: '00', l: 'Inicio' },
  { id: 'nosotros',  n: '01', l: 'Esencia' },
  { id: 'servicios', n: '02', l: 'Servicios' },
  { id: 'proceso',   n: '03', l: 'Proceso' },
  { id: 'casos',     n: '04', l: 'Casos' },
  { id: 'blog',      n: '05', l: 'Blog' },
  { id: 'contacto',  n: '06', l: 'Contacto' },
];
function SideRail() {
  const [active, setActive] = _fState('inicio');
  _fEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let best = 'inicio';
      for (const it of RAIL_ITEMS) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        if (el.offsetTop <= y) best = it.id;
      }
      setActive(best);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className="syn-rail" aria-label="Navegación de secciones">
      {RAIL_ITEMS.map(it => (
        <a key={it.id} href={`#${it.id}`} className={`syn-rail__item ${active === it.id ? 'is-active' : ''}`}>
          <span className="syn-rail__label">{it.n} · {it.l}</span>
          <span className="syn-rail__tick"/>
        </a>
      ))}
    </nav>
  );
}

// ---------- Matrix rain overlay ----------
function MatrixRain() {
  const ref = _fRef(null);
  _fEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, cols = [], raf;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const chars = '01ABCDEF{}[]<>/#=+-*SYNAPTECH';
    const fontSize = 16;
    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Use every other column to halve draw calls
      const N = Math.ceil(w / (fontSize * 2));
      cols = Array.from({length: N}, (_, i) => ({
        y: Math.random() * h,
        speed: 0.5 + Math.random() * 1.0,
        len:   5 + Math.floor(Math.random()*10),
        x: i * fontSize * 2,
      }));
    };
    resize();
    window.addEventListener('resize', resize);
    ctx.font = `${fontSize}px 'JetBrains Mono', ui-monospace, monospace`;
    let last = 0;
    const draw = (t) => {
      // throttle to ~20fps for lighter CPU
      if (t - last < 50) { raf = requestAnimationFrame(draw); return; }
      last = t;
      ctx.clearRect(0, 0, w, h);
      cols.forEach((c, i) => {
        const x = c.x;
        for (let k = 0; k < c.len; k++) {
          const cy = c.y - k * fontSize;
          if (cy < 0 || cy > h) continue;
          const alpha = k === 0 ? 1 : Math.max(0, 1 - k / c.len) * 0.85;
          const ch = chars[(Math.floor(t * 0.002) + i * 3 + k) % chars.length];
          ctx.fillStyle = k === 0
            ? `rgba(220,255,180,${alpha})`
            : `rgba(164,225,55,${alpha * 0.7})`;
          ctx.fillText(ch, x, cy);
        }
        c.y += c.speed * fontSize * 0.35;
        if (c.y - c.len * fontSize > h) {
          c.y = -Math.random() * 200;
          c.speed = 0.6 + Math.random() * 1.4;
          c.len = 6 + Math.floor(Math.random() * 16);
        }
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="hero__matrix" aria-hidden="true"/>;
}

// ---------- Boot sequence (briefly covers on load) ----------
function BootSequence() {
  const [mounted, setMounted] = _fState(true);
  _fEffect(() => {
    const seen = sessionStorage.getItem('syn_boot_seen');
    if (seen) { setMounted(false); return; }
    sessionStorage.setItem('syn_boot_seen', '1');
    const id = setTimeout(() => setMounted(false), 3200);
    return () => clearTimeout(id);
  }, []);
  if (!mounted) return null;
  const lines = [
    { t: 90,  text: 'synaptech.os',            tag: 'INIT' },
    { t: 300, text: 'loading neural kernel',   tag: 'OK' },
    { t: 650, text: 'mounting data bridge',    tag: 'OK' },
    { t: 950, text: 'calibrating IA models',   tag: 'OK' },
    { t: 1300,text: 'secure link established', tag: 'OK' },
    { t: 1700,text: 'interface ready',         tag: 'GO' },
  ];
  return (
    <div className="syn-boot" aria-hidden="true">
      <div className="syn-boot__inner">
        <div className="syn-boot__brand">SYNAPTECH · SINAPSIS TECNOLÓGICA</div>
        {lines.map((l, i) => (
          <div key={i} className="syn-boot__line" style={{ animationDelay: `${l.t}ms` }}>
            <span>›</span> <b>{l.text}</b> <span className="ok">[{l.tag}]</span>
          </div>
        ))}
        <div className="syn-boot__bar"/>
      </div>
    </div>
  );
}

// ---------- Section corner brackets (injected) ----------
function SectionFrames({ selector = 'section[id]' }) {
  _fEffect(() => {
    const secs = document.querySelectorAll(selector);
    secs.forEach(s => {
      if (s.querySelector('.syn-section-frame')) return;
      s.classList.add('is-reveal');
      ['tl','tr','bl','br'].forEach(pos => {
        const d = document.createElement('div');
        d.className = `syn-section-frame syn-section-frame--${pos}`;
        s.appendChild(d);
      });
      // make sure it's positioned
      const cs = getComputedStyle(s);
      if (cs.position === 'static') s.style.position = 'relative';
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-in'); });
    }, { threshold: 0.08 });
    secs.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);
  return null;
}

// ---------- Card HUD corners (injected) ----------
function CardCorners() {
  _fEffect(() => {
    const cards = document.querySelectorAll('.service-card, .case-card, .insight-card');
    cards.forEach(c => {
      if (c.querySelector('.hud-corners')) return;
      const h = document.createElement('div');
      h.className = 'hud-corners';
      ['tl','tr','bl','br'].forEach(p => {
        const s = document.createElement('span'); s.className = p; h.appendChild(s);
      });
      c.appendChild(h);
    });
  }, []);
  return null;
}

// Export
Object.assign(window, { HUD, SideRail, MatrixRain, BootSequence, SectionFrames, CardCorners });

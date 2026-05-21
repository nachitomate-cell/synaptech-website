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
      <div className="syn-hud__grid" />
      <div className="syn-hud__scan" />
      <div className="syn-hud__beam" />
      <div className="syn-hud__vignette" />
      <div className="syn-hud__corner syn-hud__corner--tl" />
      <div className="syn-hud__corner syn-hud__corner--tr" />
      <div className="syn-hud__corner syn-hud__corner--bl" />
      <div className="syn-hud__corner syn-hud__corner--br" />
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
  { id: 'inicio', n: '00', l: 'Inicio' },
  { id: 'nosotros', n: '01', l: 'Esencia' },
  { id: 'servicios', n: '02', l: 'Servicios' },
  { id: 'proceso', n: '03', l: 'Proceso' },
  { id: 'casos', n: '04', l: 'Casos' },
  { id: 'blog', n: '05', l: 'Blog' },
  { id: 'contacto', n: '06', l: 'Contacto' },
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
          <span className="syn-rail__tick" />
        </a>
      ))}
    </nav>
  );
}

// ---------- Section corner brackets (injected) ----------
function SectionFrames({ selector = 'section[id]' }) {
  _fEffect(() => {
    const secs = document.querySelectorAll(selector);
    secs.forEach(s => {
      if (s.querySelector('.syn-section-frame')) return;
      s.classList.add('is-reveal');
      ['tl', 'tr', 'bl', 'br'].forEach(pos => {
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
      ['tl', 'tr', 'bl', 'br'].forEach(p => {
        const s = document.createElement('span'); s.className = p; h.appendChild(s);
      });
      c.appendChild(h);
    });
  }, []);
  return null;
}

// Export
Object.assign(window, { HUD, SideRail, SectionFrames, CardCorners });

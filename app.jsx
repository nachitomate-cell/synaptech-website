// Synaptech website components — single-file React app
// Load via <script type="text/babel" src="app.jsx"></script>

const { useState, useEffect, useRef } = React;

// ----- Icons (inline so babel doesn't need to fetch) -----
const Icon = ({ name, size = 24, stroke = 'currentColor' }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const dot = (x,y) => <circle cx={x} cy={y} r="1.1" fill="#A4E137" stroke="none" />;
  switch (name) {
    case 'brain':
      return <svg {...common}><path d="M9 5a3 3 0 0 0-3 3v1a2.5 2.5 0 0 0-2 2.5v1A2.5 2.5 0 0 0 6 15v1a3 3 0 0 0 3 3V5Z"/><path d="M15 5a3 3 0 0 1 3 3v1a2.5 2.5 0 0 1 2 2.5v1A2.5 2.5 0 0 1 18 15v1a3 3 0 0 1-3 3V5Z"/><line x1="9" y1="9" x2="12" y2="13"/><line x1="15" y1="9" x2="12" y2="13"/>{dot(9,9)}{dot(12,13)}{dot(15,9)}</svg>;
    case 'automation':
      return <svg {...common}><circle cx="8" cy="8" r="3"/><path d="M8 3.5v1.5M8 11v1.5M3.5 8H5M11 8h1.5M5.2 5.2l1 1M9.8 9.8l1 1M10.8 5.2l-1 1M6.2 9.8l-1 1"/><circle cx="17" cy="16" r="2.5"/><path d="M17 12.5v1M17 18.5v1M13.5 16H15M19 16h1.5"/><path d="M10.5 9.5 C 13 11.5, 14.5 13, 14.5 15" strokeDasharray="2 2"/>{dot(8,8)}{dot(17,16)}</svg>;
    case 'iot':
      return <svg {...common}><circle cx="12" cy="6" r="1.5"/><circle cx="5" cy="16" r="1.5"/><circle cx="19" cy="16" r="1.5"/><circle cx="12" cy="18" r="1.5"/><line x1="12" y1="7.5" x2="6.2" y2="14.8"/><line x1="12" y1="7.5" x2="17.8" y2="14.8"/><line x1="6.2" y1="17.2" x2="10.8" y2="17.8"/><line x1="17.8" y1="17.2" x2="13.2" y2="17.8"/><path d="M12 4.5V3M10 3l2-1 2 1"/></svg>;
    case 'rocket':
      return <svg {...common}><path d="M14 4c3 0 5 2 5 5l-3 3v3l-3 3-3-3H7l-3-3 3-3c0-3 2-5 5-5Z"/><circle cx="13.5" cy="8.5" r="1.5"/><path d="M7 17l-2 4 4-2"/>{dot(13.5,8.5)}</svg>;
    case 'search': return <svg {...common}><circle cx="11" cy="11" r="6"/><line x1="15.5" y1="15.5" x2="20" y2="20"/>{dot(11,11)}</svg>;
    case 'blueprint': return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="1.5"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="20"/><line x1="14" y1="14" x2="17" y2="17"/>{dot(14,14)}{dot(17,17)}</svg>;
    case 'growth': return <svg {...common}><polyline points="3,17 9,11 13,15 21,6"/><polyline points="15,6 21,6 21,12"/>{dot(9,11)}{dot(13,15)}</svg>;
    case 'mail': return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3,7 12,13 21,7"/></svg>;
    case 'phone': return <svg {...common}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>;
    case 'pin': return <svg {...common}><path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'clock': return <svg {...common}><circle cx="12" cy="12" r="9"/><polyline points="12,7 12,12 15,14"/></svg>;
    case 'linkedin': return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 10h3v7H7zM14 8v9M14 8c0-1 1-1.5 2-1.5S18 7 18 8v9"/><circle cx="8.5" cy="7" r="1" fill={stroke} stroke="none"/></svg>;
    case 'twitter': return <svg {...common}><path d="M22 5.8a8 8 0 0 1-2.4.7 4.1 4.1 0 0 0 1.8-2.3 8 8 0 0 1-2.6 1A4 4 0 0 0 12 9a11 11 0 0 1-8-4s-4 9 5 13a11 11 0 0 1-7 2c9 5 20 0 20-11.5v-.5c.7-.7 1.4-1.5 2-2.3"/></svg>;
    case 'github': return <svg {...common}><path d="M9 18c-3 1-4-1-5-2M15 21v-3.5c0-1 .1-1.7-.5-2.2 3-.3 5-1.5 5-6a4.7 4.7 0 0 0-1.3-3.3c.2-.3.6-1.7-.2-3.5 0 0-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C6 1.2 5 1.5 5 1.5c-.8 1.8-.4 3.2-.2 3.5A4.7 4.7 0 0 0 3.5 8.3c0 4.5 2 5.7 5 6-.4.4-.7.9-.8 1.7"/></svg>;
    case 'arrow': return <svg {...common}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13,6 19,12 13,18"/></svg>;
    default: return null;
  }
};

// ----- Header -----
const Header = () => (
  <header className="site-header">
    <div className="site-header__inner">
      <a className="site-header__logo" href="#">
        <img src="assets/synaptech-logo-transparent.png" alt="Synaptech" />
      </a>
      <nav className="site-nav">
        <a href="#inicio">Inicio</a>
        <a href="#servicios">Nuestros Servicios</a>
        <a href="#proceso">Cómo Funcionamos</a>
        <a href="#casos">Casos de Éxito</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#blog">Blog</a>
        <a href="#contacto">Contacto</a>
        <a href="#contacto" className="syn-btn syn-btn--primary">Hablemos de tu Proyecto</a>
      </nav>
    </div>
  </header>
);

// ----- Hero with mouse-reactive neural canvas -----
const NeuralBG = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf;
    const mouse = { x: -9999, y: -9999, active: false };
    const N = 36;
    const nodes = Array.from({length: N}, (_, i) => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - .5) * 0.00025, vy: (Math.random() - .5) * 0.00025,
      r: 1.2 + Math.random() * 1.8,
      px: 0, py: 0,
    }));
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
      mouse.active = mouse.x >= 0 && mouse.x <= w && mouse.y >= 0 && mouse.y <= h;
    };
    const onLeave = () => { mouse.active = false; mouse.x = mouse.y = -9999; };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);

    let last = 0;
    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      // Throttle to ~30fps
      if (t - last < 33) return;
      last = t;
      ctx.clearRect(0, 0, w, h);
      // Soft radial glow where the cursor is
      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        g.addColorStop(0, 'rgba(164,225,55,0.14)');
        g.addColorStop(1, 'rgba(164,225,55,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      // Update node positions (small drift + slight gravity toward cursor)
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        n.px = n.x * w; n.py = n.y * h;
        if (mouse.active) {
          const dx = mouse.x - n.px, dy = mouse.y - n.py;
          const d = Math.hypot(dx, dy);
          if (d < 180) {
            const k = (1 - d/180) * 0.15;
            n.px += dx * k; n.py += dy * k;
          }
        }
      }
      // Edges — batch strokes by opacity bucket for fewer state changes
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < N; i++) for (let j = i+1; j < N; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.px - b.px, dy = a.py - b.py;
        const d2 = dx*dx + dy*dy;
        if (d2 < 115*115) {
          const o = (1 - Math.sqrt(d2)/115) * 0.45;
          ctx.strokeStyle = `rgba(164,225,55,${o.toFixed(2)})`;
          ctx.beginPath(); ctx.moveTo(a.px, a.py); ctx.lineTo(b.px, b.py); ctx.stroke();
        }
      }
      // Edges to cursor
      if (mouse.active) {
        for (const n of nodes) {
          const d = Math.hypot(n.px - mouse.x, n.py - mouse.y);
          if (d < 160) {
            const o = (1 - d/160) * 0.65;
            ctx.strokeStyle = `rgba(164,225,55,${o.toFixed(2)})`;
            ctx.beginPath(); ctx.moveTo(n.px, n.py); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
      }
      // Nodes
      for (const n of nodes) {
        ctx.beginPath(); ctx.arc(n.px, n.py, n.r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(164,225,55,0.85)'; ctx.fill();
      }
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);
  return <canvas ref={ref} className="hero__net"/>;
};

const Hero = ({ heroBg = 'neural', matrix = true }) => {
  const ctaPrimary = useMagnetic(0.32, 140);
  const ctaGhost = useMagnetic(0.22, 110);
  return (
  <section className="hero" id="inicio" data-hero-bg={heroBg}>
    {heroBg === 'neural' && <NeuralBG/>}
    {heroBg === 'puntos' && <div className="hero__dots" aria-hidden="true"/>}
    {matrix && <MatrixRain/>}
    <div className="hero__inner">
      <div className="hero__overline syn-type">Sinapsis Tecnológica · IA · Automatización</div>
      <h1 className="hero__title syn-glitch">
        <SplitText stagger={70}>CONECTANDO DATOS,</SplitText>
        <br/>
        <em><SplitText stagger={70} delay={400}>POTENCIANDO FUTUROS.</SplitText></em>
      </h1>
      <p className="hero__sub">En Synaptech SpA somos el puente inteligente que transforma tus datos dispersos en inteligencia empresarial de vanguardia. Soluciones de IA, redes neuronales y automatización inteligente para empresas líderes.</p>
      <div className="hero__ctas">
        <span ref={ctaPrimary} style={{display:'inline-block'}}>
          <Ripple href="#servicios" className="syn-btn syn-btn--primary syn-btn--primary-lg">DESCUBRE TU POTENCIAL</Ripple>
        </span>
        <span ref={ctaGhost} style={{display:'inline-block'}}>
          <Ripple href="#proceso" className="syn-btn syn-btn--ghost">Cómo funcionamos <Icon name="arrow" size={16}/></Ripple>
        </span>
      </div>
    </div>
  </section>
  );
};

// ----- Essence -----
// Literal curved bridge echoing the logo: two black spheres with a lime arc between
const Bridge = () => {
  const svgRef = useBridgeProgress();
  return (
  <svg className="bridge" ref={svgRef} viewBox="0 0 1100 340" aria-hidden="true">
    <defs>
      <linearGradient id="arcGrad" x1="0" x2="1">
        <stop offset="0%" stopColor="#A4E137" stopOpacity=".9"/>
        <stop offset="50%" stopColor="#A4E137"/>
        <stop offset="100%" stopColor="#7FB020" stopOpacity=".9"/>
      </linearGradient>
      <linearGradient id="arcGrad2" x1="0" x2="1">
        <stop offset="0%" stopColor="#A4E137" stopOpacity=".55"/>
        <stop offset="100%" stopColor="#A4E137" stopOpacity=".2"/>
      </linearGradient>
    </defs>
    {/* Outer lime arc (primary) */}
    <path d="M 150 230 C 330 60, 770 60, 950 230" fill="none" stroke="url(#arcGrad)" strokeWidth="34" strokeLinecap="round"/>
    {/* Inner echo arc */}
    <path d="M 200 240 C 360 110, 740 110, 900 240" fill="none" stroke="url(#arcGrad2)" strokeWidth="14" strokeLinecap="round"/>
    {/* Lower lime sweep under bridge */}
    <path d="M 180 270 C 360 350, 740 350, 920 270" fill="none" stroke="#A4E137" strokeWidth="10" strokeLinecap="round" opacity=".45"/>
    {/* Neural dots travelling along the bridge */}
    <g>
      {[0.18, 0.32, 0.46, 0.58, 0.72].map((t, i) => {
        // Approx along cubic: quick easing
        const x = 150 + (950-150)*t;
        const y = 230 - 170 * Math.sin(Math.PI * t);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill="#A4E137" stroke="#111" strokeWidth="2"/>
            {i < 4 && <line x1={x} y1={y} x2={150 + (950-150)*[0.18,0.32,0.46,0.58,0.72][i+1]} y2={230 - 170*Math.sin(Math.PI*[0.18,0.32,0.46,0.58,0.72][i+1])} stroke="#A4E137" strokeWidth="1.5" opacity=".55"/>}
          </g>
        );
      })}
    </g>
    {/* Traveling dots animated along the bridge */}
    <g>
      {[0.18, 0.32, 0.46, 0.58, 0.72].map((t, i) => {
        const x = 150 + (950-150)*t;
        const y = 230 - 170 * Math.sin(Math.PI * t);
        return <circle key={`d${i}`} className="bridge-dot" cx={x} cy={y} r="4" fill="#A4E137"/>;
      })}
    </g>
    {/* Two black spheres (anchors) — use currentColor so they invert in dark mode */}
    <g style={{color: 'var(--syn-fg-primary)'}}>
      <circle cx="150" cy="230" r="48" fill="currentColor"/>
      <circle cx="950" cy="230" r="48" fill="currentColor"/>
    </g>
    {/* Tiny highlight on spheres */}
    <circle cx="136" cy="216" r="8" fill="var(--syn-lime)" opacity=".35"/>
    <circle cx="936" cy="216" r="8" fill="var(--syn-lime)" opacity=".35"/>
  </svg>
  );
};

const Essence = () => (
  <section className="essence" id="nosotros">
    <div className="essence__inner" data-reveal>
      <div className="hero__overline" style={{color:'var(--syn-lime-dark)', marginBottom: 16}}>Nuestra Esencia</div>
      <h2 className="essence__title">¿Qué es la <em>Sinapsis Tecnológica</em> de Synaptech?</h2>
      <p className="essence__body">Más que una empresa de software, somos arquitectos de la conexión inteligente. Creemos en la potencia de la sinapsis: la conexión perfecta entre tus sistemas, tus datos y tus objetivos.</p>
      <div className="bridge-wrap">
        <Bridge/>
        <div className="bridge-label bridge-label--left">
          <span className="bridge-label__kicker">Origen</span>
          <span className="bridge-label__main">Datos Dispersos</span>
          <span className="bridge-label__sub">Sistemas, sensores, bases aisladas</span>
        </div>
        <div className="bridge-label bridge-label--mid">
          <span className="bridge-label__kicker" style={{color:'var(--syn-lime-dark)'}}>El Puente</span>
          <span className="bridge-label__main">Sinapsis Synaptech</span>
          <span className="bridge-label__sub">IA · Red neuronal · Automatización</span>
        </div>
        <div className="bridge-label bridge-label--right">
          <span className="bridge-label__kicker">Destino</span>
          <span className="bridge-label__main">Inteligencia & Resultados</span>
          <span className="bridge-label__sub">Decisiones, eficiencia, crecimiento</span>
        </div>
      </div>
    </div>
  </section>
);

// ----- Services -----
const SERVICES = [
  { icon: 'brain', title: 'Desarrollo de IA y Aprendizaje Automático', desc: 'Modelos neuronales predictivos y optimizados para la toma de decisiones basada en datos.' },
  { icon: 'automation', title: 'Automatización Inteligente', desc: 'Soluciones de automatización de procesos operativos para aumentar la eficiencia y reducir costes.' },
  { icon: 'iot', title: 'Integración de Ecosistemas IoT', desc: 'Conectamos tus dispositivos y sensores para una gestión y monitorización inteligente en tiempo real.' },
  { icon: 'rocket', title: 'Consultoría de Transformación Digital', desc: 'Estrategias personalizadas para modernizar tu negocio y prepararlo para el futuro tecnológico.' },
];
// Now wrap service/case/insight cards with tilt ref
const ServiceCard = ({ s, i }) => {
  const ref = useTilt(6);
  return (
    <div className="service-card" ref={ref} data-reveal style={{transitionDelay: `${i*80}ms`}}>
      <div className="service-card__icon"><Icon name={s.icon} size={28} stroke="#A4E137"/></div>
      <h3 className="service-card__title">{s.title}</h3>
      <p className="service-card__desc">{s.desc}</p>
      <a href="#" className="service-card__link">Ver más <Icon name="arrow" size={14}/></a>
    </div>
  );
};
const Services = () => (
  <section className="services" id="servicios">
    <div className="services__head" data-reveal>
      <div className="services__kicker">Nuestros Servicios Clave</div>
      <h2 className="services__title">Cuatro disciplinas, <em style={{fontStyle:'normal', color:'var(--syn-lime-dark)'}}>un puente</em>.</h2>
    </div>
    <div className="services__grid">
      {SERVICES.map((s, i) => <ServiceCard key={i} s={s} i={i}/>)}
    </div>
  </section>
);

// ----- Process -----
const PROCESS = [
  { n: '01', icon: 'search',    t: 'Diagnóstico y Descubrimiento', d: 'Mapeamos sistemas, datos y oportunidades ocultas.' },
  { n: '02', icon: 'blueprint', t: 'Arquitectura Inteligente',      d: 'Diseñamos la red neuronal adecuada a tu negocio.' },
  { n: '03', icon: 'automation',t: 'Implementación e Integración',  d: 'Conectamos sistemas y desplegamos modelos en producción.' },
  { n: '04', icon: 'growth',    t: 'Optimización y Crecimiento',    d: 'Medimos, aprendemos y escalamos el impacto.' },
];
const Process = () => (
  <section className="process" id="proceso">
    <div className="process__head" data-reveal>
      <div className="services__kicker" style={{marginBottom:12}}>Nuestra Metodología</div>
      <h2 className="process__title">Tu camino hacia la <em style={{fontStyle:'normal', color:'var(--syn-lime-dark)'}}>inteligencia</em>.</h2>
    </div>
    <div className="process__grid">
      <div className="process__connector"/>
      {PROCESS.map((p, i) => (
        <div className="process-step" key={i} data-reveal style={{transitionDelay: `${i*100}ms`}}>
          <div className="process-step__num">{p.n}</div>
          <h4 className="process-step__title">{p.t}</h4>
          <p className="process-step__desc">{p.d}</p>
        </div>
      ))}
    </div>
  </section>
);

// ----- Cases -----
const CASES = [
  { client: 'Banco Andes', title: 'Aumento de Eficiencia Operativa', metric: '+30%', metricLbl: 'Eficiencia', summary: 'Automatización de back-office con modelos predictivos para el área de riesgo crediticio.' },
  { client: 'Retail Norte', title: 'Optimización de Cadena Logística', metric: '-20%', metricLbl: 'Costos', summary: 'Red IoT de sensores en 48 centros de distribución con analítica en tiempo real.' },
  { client: 'MinerTech', title: 'Mantenimiento Predictivo de Flota', metric: '24/7', metricLbl: 'Monitoreo', summary: 'Modelos neuronales para anticipar fallas en equipos pesados en operación continua.' },
];
const CaseCard = ({ c, i }) => {
  const ref = useTilt(4);
  // Parse metric only if it's a clean "[sign]number[unit]" pattern — e.g. +30%, -20%, 2x.
  // Anything with slashes, letters, or multiple tokens (e.g. "24/7") stays as-is.
  const parseMetric = (m) => {
    const clean = m.trim();
    const match = clean.match(/^([+\-]?)(\d+(?:\.\d+)?)([%x])?$/);
    if (!match) return { num: null, raw: clean };
    return { sign: match[1] || '', num: parseFloat(match[2]), unit: match[3] || '', raw: clean };
  };
  const m = parseMetric(c.metric);
  return (
    <div className="case-card" ref={ref} data-reveal style={{transitionDelay: `${i*80}ms`}}>
      <div className="case-card__logo">{c.client}</div>
      <div className="case-card__body">
        <h3 className="case-card__title">{c.title}</h3>
        <div className="case-card__metric">
          <b>{m.num !== null ? <CountUp to={m.num} prefix={m.sign} suffix={m.unit}/> : c.metric}</b>
          <span>{c.metricLbl}</span>
        </div>
        <p className="case-card__summary">{c.summary}</p>
      </div>
    </div>
  );
};
const Cases = () => (
  <section className="cases" id="casos">
    <div className="cases__head" data-reveal>
      <div className="services__kicker" style={{marginBottom:12}}>Casos de Éxito</div>
      <h2 className="services__title">Transformando negocios, un cliente a la vez.</h2>
    </div>
    <div className="cases__grid">
      {CASES.map((c, i) => <CaseCard key={i} c={c} i={i}/>)}
    </div>
  </section>
);

// ----- Insights -----
const INSIGHTS = [
  { tag: 'Redes Neuronales', title: 'El Futuro de las Redes Neuronales en la Industria', date: '12 Abr 2026', variant: '' },
  { tag: 'Inteligencia Artificial', title: '5 Mitos de la IA Empresarial', date: '28 Mar 2026', variant: '--b' },
  { tag: 'IoT', title: 'Cómo IoT está Redefiniendo la Logística', date: '14 Mar 2026', variant: '--c' },
];
const InsightCard = ({ p, i }) => {
  const ref = useTilt(3);
  return (
    <article className="insight-card" ref={ref} data-reveal style={{transitionDelay: `${i*80}ms`}}>
      <div className={`insight-card__img insight-card__img${p.variant}`}>
        <svg viewBox="0 0 320 200" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
          {Array.from({length:14}).map((_,k)=>{
            const x = ((k*47+i*31)%320), y = ((k*83+i*17)%200);
            return <g key={k}><circle cx={x} cy={y} r="2.5" fill="#A4E137" opacity=".8"/>
              {k<13 && <line x1={x} y1={y} x2={((k+1)*47+i*31)%320} y2={((k+1)*83+i*17)%200} stroke="#A4E137" strokeWidth="0.7" opacity=".4"/>}
            </g>;
          })}
        </svg>
      </div>
      <div className="insight-card__body">
        <div className="insight-card__tag">{p.tag}</div>
        <h3 className="insight-card__title">{p.title}</h3>
        <div className="insight-card__date">{p.date}</div>
      </div>
    </article>
  );
};
const Insights = () => (
  <section className="insights" id="blog">
    <div className="insights__head" data-reveal>
      <div className="services__kicker" style={{marginBottom:12}}>Blog & Insights</div>
      <h2 className="services__title">Explorando la vanguardia tecnológica.</h2>
    </div>
    <div className="insights__grid">
      {INSIGHTS.map((p, i) => <InsightCard key={i} p={p} i={i}/>)}
    </div>
  </section>
);

// ----- Contact -----
const Contact = () => {
  const [form, setForm] = useState({ nombre:'', empresa:'', email:'', phone:'', msg:'' });
  const [sent, setSent] = useState(false);
  const update = (k) => (e) => setForm(f => ({...f, [k]: e.target.value}));
  return (
    <section className="contact" id="contacto">
      <div className="contact__head" data-reveal>
        <div className="services__kicker" style={{marginBottom:12}}>Contacto</div>
        <h2 className="services__title">Iniciemos la <em style={{fontStyle:'normal', color:'var(--syn-lime-dark)'}}>conversación</em>.</h2>
      </div>
      <div className="contact__grid">
        <form className="contact__form" data-reveal onSubmit={(e)=>{e.preventDefault(); setSent(true);}}>
          <div className="contact__row">
            <input className="syn-input" placeholder="Nombre" value={form.nombre} onChange={update('nombre')}/>
            <input className="syn-input" placeholder="Empresa" value={form.empresa} onChange={update('empresa')}/>
          </div>
          <div className="contact__row">
            <input className="syn-input" placeholder="Correo electrónico de empresa" type="email" value={form.email} onChange={update('email')}/>
            <input className="syn-input" placeholder="Teléfono" value={form.phone} onChange={update('phone')}/>
          </div>
          <textarea className="syn-input" rows="4" placeholder="Cuéntanos sobre tu proyecto" value={form.msg} onChange={update('msg')}/>
          <button type="submit" className="syn-btn syn-btn--primary syn-btn--primary-lg" style={{alignSelf:'flex-start'}}>
            {sent ? '✓ SOLICITUD ENVIADA' : 'SOLICITAR DEMOSTRACIÓN O REUNIÓN'}
          </button>
        </form>
        <div className="contact__info" data-reveal>
          <div className="contact__info-item">
            <div className="contact__info-item__icon"><Icon name="pin" size={20} stroke="#7FB020"/></div>
            <div><h5>Oficina</h5><p>Av. Providencia 1234, Oficina 501<br/>Santiago, Chile</p></div>
          </div>
          <div className="contact__info-item">
            <div className="contact__info-item__icon"><Icon name="phone" size={20} stroke="#7FB020"/></div>
            <div><h5>Teléfono</h5><p>+56 2 2345 6789</p></div>
          </div>
          <div className="contact__info-item">
            <div className="contact__info-item__icon"><Icon name="mail" size={20} stroke="#7FB020"/></div>
            <div><h5>Email</h5><p>contacto@synaptech.cl</p></div>
          </div>
          <div className="contact__info-item">
            <div className="contact__info-item__icon"><Icon name="clock" size={20} stroke="#7FB020"/></div>
            <div><h5>Horario</h5><p>Lunes – Viernes<br/>9:00 AM – 6:00 PM</p></div>
          </div>
          <div className="contact__map">
            <svg viewBox="0 0 400 200" style={{width:'100%',height:'100%'}}>
              <rect width="400" height="200" fill="#F1F4F6"/>
              <g stroke="#D5DADE" strokeWidth="1" fill="none">
                <path d="M0 50 L400 80"/><path d="M0 100 L400 130"/><path d="M0 150 L400 170"/>
                <path d="M80 0 L120 200"/><path d="M200 0 L180 200"/><path d="M320 0 L280 200"/>
              </g>
              <circle cx="200" cy="100" r="20" fill="#A4E137" opacity=".3"/>
              <circle cx="200" cy="100" r="10" fill="#A4E137"/>
              <circle cx="200" cy="100" r="4" fill="#111"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

// ----- Footer -----
const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__inner">
      <div className="site-footer__brand">
        <b>Synaptech <span style={{fontWeight:400, fontSize:14, color:'rgba(255,255,255,.5)'}}>SpA</span></b>
        <p>Soluciones de Inteligencia Artificial, Redes Neuronales y Automatización Inteligente. Tu socio tecnológico de confianza en la era digital.</p>
        <div className="site-footer__socials">
          <a href="#"><Icon name="linkedin" size={18}/></a>
          <a href="#"><Icon name="twitter" size={18}/></a>
          <a href="#"><Icon name="github" size={18}/></a>
        </div>
      </div>
      <div>
        <h6>Navegación</h6>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#casos">Casos</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </div>
      <div>
        <h6>Legal</h6>
        <ul>
          <li><a href="#">Política de Privacidad</a></li>
          <li><a href="#">Términos de Servicio</a></li>
          <li><a href="#">Aviso Legal</a></li>
        </ul>
      </div>
      <div>
        <h6>Contacto</h6>
        <ul>
          <li><a href="mailto:contacto@synaptech.cl">contacto@synaptech.cl</a></li>
          <li><a href="tel:+56223456789">+56 2 2345 6789</a></li>
          <li style={{color:'rgba(255,255,255,.5)'}}>Av. Providencia 1234,<br/>Santiago, Chile</li>
        </ul>
      </div>
    </div>
    <div className="site-footer__bottom">
      <div>© 2026 Synaptech SpA. Todos los derechos reservados. Soluciones Tecnológicas Avanzadas.</div>
      <div>Hecho en Santiago, Chile.</div>
    </div>
  </footer>
);

// ----- App -----
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": true,
  "hero_bg": "neural",
  "accent": "#A4E137",
  "hud": true,
  "rail": true,
  "matrix": true,
  "boot": true
}/*EDITMODE-END*/;

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useHeaderShrink();
  useSmoothAnchors();
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.add('is-reveal'); io.observe(el); });
    // Process steps also animate via .is-in
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io2.unobserve(e.target); } });
    }, { threshold: 0.3 });
    document.querySelectorAll('.process-step').forEach(el => io2.observe(el));
    setTimeout(() => document.querySelectorAll('.hero [data-reveal]').forEach(el => el.classList.add('is-in')), 50);
    return () => { io.disconnect(); io2.disconnect(); };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = t.dark ? 'dark' : 'light';
    document.documentElement.style.setProperty('--syn-lime', t.accent);
  }, [t.dark, t.accent]);
  return (
    <>
      {t.boot && <BootSequence/>}
      <Header/>
      <Hero heroBg={t.hero_bg} matrix={t.matrix}/>
      <Essence/>
      <Services/>
      <Process/>
      <Cases/>
      <Insights/>
      <Contact/>
      <Footer/>
      <CursorHalo/>
      {t.hud && <HUD/>}
      {t.rail && <SideRail/>}
      <SectionFrames/>
      <CardCorners/>
      <TweaksPanel>
        <TweakSection label="Tema"/>
        <TweakToggle label="Modo oscuro" value={t.dark} onChange={v => setTweak('dark', v)}/>
        <TweakColor label="Acento lima" value={t.accent} onChange={v => setTweak('accent', v)}/>
        <TweakSection label="Hero"/>
        <TweakRadio label="Fondo" value={t.hero_bg}
                    options={['neural','puntos','limpio']}
                    onChange={v => setTweak('hero_bg', v)}/>
        <TweakToggle label="Matrix rain" value={t.matrix} onChange={v => setTweak('matrix', v)}/>
        <TweakSection label="HUD Futurista"/>
        <TweakToggle label="Marco HUD" value={t.hud} onChange={v => setTweak('hud', v)}/>
        <TweakToggle label="Riel de sección" value={t.rail} onChange={v => setTweak('rail', v)}/>
        <TweakToggle label="Boot sequence" value={t.boot} onChange={v => setTweak('boot', v)}/>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

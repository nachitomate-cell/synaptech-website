// Synaptech website components — single-file React app
// Load via <script type="text/babel" src="app.jsx"></script>

const { useState, useEffect, useRef } = React;

// ----- Icons (inline so babel doesn't need to fetch) -----
const Icon = ({ name, size = 24, stroke = 'currentColor' }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const dot = (x,y) => <circle cx={x} cy={y} r="1.1" style={{fill:'var(--syn-lime)'}} stroke="none" />;
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
const Header = ({ onClientAccess }) => (
  <header className="site-header">
    <div className="site-header__inner">
      <a className="site-header__logo" href="#">
        <img src="assets/synaptech-logo-transparent.png" alt="Synaptech" />
      </a>
      <nav className="site-nav">
        <a href="#inicio">Inicio</a>
        <a href="#servicios">Servicios</a>
        <a href="#proceso">Metodología</a>
        <a href="#casos">Casos de Éxito</a>
        <a href="#contacto">Contacto</a>
        <button className="site-nav__client-btn" onClick={onClientAccess}>Acceso Clientes</button>
        <a href="#diagnostico" className="syn-btn syn-btn--primary">Diagnóstico Gratis</a>
      </nav>
    </div>
  </header>
);

// ----- Hero — split layout con imagen de fondo -----
const Hero = () => (
  <section className="hero" id="inicio">
    <div className="hero__overlay" aria-hidden="true"/>
    <div className="hero__inner">
      <div className="hero__col-text">
        <p className="hero__overline">Salud · Retail · Educación · Belleza</p>
        <h1 className="hero__title">
          Digitalizamos tu negocio para que te enfoques en hacerlo crecer.
        </h1>
        <p className="hero__sub">Desarrollamos software a medida, IA y automatización para clínicas, retail, educación y belleza. Operaciones inteligentes desde el primer día.</p>
        <div className="hero__ctas">
          <Ripple href="#contacto" className="syn-btn syn-btn--primary syn-btn--primary-lg">Agendar Demo</Ripple>
          <Ripple href="#casos" className="syn-btn syn-btn--ghost">Ver casos de éxito <Icon name="arrow" size={16}/></Ripple>
        </div>
        <div className="hero__stats" aria-label="Métricas clave">
          <div className="hero__stat">
            <span className="hero__stat-num">+5</span>
            <span className="hero__stat-label">Proyectos<br/>entregados</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true"/>
          <div className="hero__stat">
            <span className="hero__stat-num">100%</span>
            <span className="hero__stat-label">En<br/>producción</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true"/>
          <div className="hero__stat">
            <span className="hero__stat-num">4</span>
            <span className="hero__stat-label">Industrias<br/>atendidas</span>
          </div>
        </div>
      </div>
      <div className="hero__col-mockup" aria-hidden="true">
        <div className="hero__mockup">
          <div className="hero__mockup-bar"><span/><span/><span/></div>
          <div className="hero__mockup-screen">
            <div className="hero__mockup-sidebar"/>
            <div className="hero__mockup-content">
              <div className="hero__mockup-card"/>
              <div className="hero__mockup-card hero__mockup-card--sm"/>
              <div className="hero__mockup-card hero__mockup-card--sm"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ----- About -----
const ABOUT_VALUES = [
  { icon: 'blueprint', title: 'Desarrollo 100% a medida', desc: 'Sin plantillas genéricas. Cada solución es diseñada para tu negocio y tus procesos específicos.' },
  { icon: 'rocket',    title: 'Entrega rápida',           desc: 'De la idea al producto funcional en semanas, no meses. Priorizamos el valor desde el primer sprint.' },
  { icon: 'growth',    title: 'Soporte continuo',         desc: 'Estamos disponibles después del lanzamiento. Tu negocio no para, nosotros tampoco.' },
];

const About = () => (
  <section className="about" id="nosotros">
    <div className="about__inner">
      <div className="about__text" data-reveal>
        <div className="services__kicker">Sobre Synaptech</div>
        <h2 className="about__title">Tecnología que resuelve problemas reales</h2>
        <p className="about__body">Somos un equipo de desarrolladores enfocados en construir software que transforma la operación de negocios locales. Nos especializamos en salud, retail, educación y belleza — los cuatro sectores que más se benefician de una digitalización efectiva y bien ejecutada.</p>
      </div>
      <div className="about__values">
        {ABOUT_VALUES.map((v, i) => (
          <div key={i} className="about__value-item" data-reveal style={{transitionDelay:`${i*80}ms`}}>
            <div className="about__value-icon"><Icon name={v.icon} size={22}/></div>
            <div>
              <h4 className="about__value-title">{v.title}</h4>
              <p className="about__value-desc">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ----- Vision -----
const Vision = () => (
  <section className="vision" id="vision">
    <div className="vision__overlay" aria-hidden="true"/>
    <div className="vision__inner">
      <div className="vision__text-wrap" data-reveal>
        <div className="services__kicker" style={{color:'var(--syn-lime)'}}>Nuestra Visión</div>
        <h2 className="vision__title">Tecnología con Alma Digital</h2>
        <p className="vision__body">No solo escribimos código; creamos ecosistemas vivos y escalables que nacen de la sinapsis entre tus datos y tus objetivos.</p>
        <a href="#nosotros" className="vision__btn">Conocer nuestro equipo <Icon name="arrow" size={14}/></a>
      </div>
    </div>
  </section>
);

// ----- Services -----
const SERVICES = [
  { icon: 'brain', title: 'Plataformas HealthTech', desc: 'Portales clínicos, visores DICOM, gestión de perfiles médicos y flujos HL7. Software de salud que cumple estándares clínicos reales.' },
  { icon: 'growth', title: 'Apps de Fidelización y Retail', desc: 'Programas de sellos digitales, integración con Google Wallet, gamificación y notificaciones push para comercios y centros comerciales.' },
  { icon: 'blueprint', title: 'Portales Educativos (PWA)', desc: 'Portales institucionales instalables offline, automatización de pagos de colegiaturas y comunicación familia-colegio centralizada.' },
  { icon: 'automation', title: 'Reservas y Automatización', desc: 'Agendas 24/7, gestión de equipos, confirmaciones automáticas por WhatsApp y sistemas de lealtad para servicios de belleza y comercio.' },
];
// Now wrap service/case/insight cards with tilt ref
const ServiceCard = ({ s, i }) => {
  const ref = useTilt(6);
  return (
    <div className="service-card" ref={ref} data-reveal style={{transitionDelay: `${i*80}ms`}}>
      <div className="service-card__icon"><Icon name={s.icon} size={28}/></div>
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
    <div className="process__body">
      <div className="process__steps-col">
        <div className="process__grid">
          {PROCESS.map((p, i) => (
            <div className="process-step" key={i} data-reveal style={{transitionDelay: `${i*100}ms`}}>
              <div className="process-step__num">{p.n}</div>
              <h4 className="process-step__title">{p.t}</h4>
              <p className="process-step__desc">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="process__visual-col" aria-hidden="true">
        <div className="process__armonia-wrap">
          <img src="assets/armonia.png" alt="" className="process__armonia" />
        </div>
      </div>
    </div>
  </section>
);

// ----- Cases -----
const CASES = [
  {
    client: 'ViñaMed',
    tag: 'HealthTech · Salud',
    title: 'Portal clínico con visor DICOM',
    summary: 'Plataforma integral para gestión de perfiles profesionales (médicos y tecnólogos médicos) y visualización de reportes ecográficos en formato DICOM. Flujos clínicos digitalizados de extremo a extremo.',
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'DICOM.js', 'HL7'],
    status: 'En producción',
    gradient: 'linear-gradient(135deg, #0a1f12 0%, #0d2a1c 100%)',
    flagship: true,
    mockup: () => (
      <svg viewBox="0 0 420 200" width="100%" height="100%" style={{position:'absolute',inset:0}}>
        <rect width="420" height="200" fill="#0a1a0f"/>
        {/* Sidebar */}
        <rect x="0" y="0" width="90" height="200" fill="#071410"/>
        <rect x="12" y="18" width="66" height="10" rx="3" fill="rgba(164,212,60,0.25)"/>
        {[40,58,76,94,112].map((y,i) => <rect key={i} x="12" y={y} width={i===0?66:50} height="8" rx="3" fill={i===0?"rgba(164,212,60,0.18)":"rgba(255,255,255,0.06)"}/>)}
        {/* Main panel — DICOM viewer */}
        <rect x="102" y="12" width="200" height="176" rx="6" fill="#050e09"/>
        <circle cx="202" cy="100" r="72" stroke="rgba(164,212,60,0.4)" strokeWidth="1" fill="none"/>
        <circle cx="202" cy="100" r="52" stroke="rgba(164,212,60,0.2)" strokeWidth="1" fill="none"/>
        <ellipse cx="202" cy="86" rx="36" ry="22" fill="rgba(164,212,60,0.07)" stroke="rgba(164,212,60,0.2)" strokeWidth="1"/>
        <line x1="130" y1="100" x2="274" y2="100" stroke="rgba(164,212,60,0.15)" strokeWidth="0.7"/>
        <line x1="202" y1="28" x2="202" y2="172" stroke="rgba(164,212,60,0.15)" strokeWidth="0.7"/>
        <text x="108" y="26" fill="rgba(164,212,60,0.6)" fontSize="7" fontFamily="monospace">DICOM · ECOGRAFÍA</text>
        {/* Data panel */}
        <rect x="314" y="12" width="94" height="176" rx="6" fill="#071410"/>
        {[{l:'Paciente',v:'M. González'},{l:'RUT',v:'12.345.678-9'},{l:'Fecha',v:'10-05-2026'},{l:'Médico',v:'Dr. Soto'},{l:'Estado',v:'Procesado'}].map((r,i)=>(
          <g key={i}>
            <text x="322" y={32+i*30} fill="rgba(255,255,255,0.35)" fontSize="6.5" fontFamily="monospace">{r.l}</text>
            <text x="322" y={44+i*30} fill={r.l==='Estado'?"rgba(164,212,60,0.9)":"rgba(255,255,255,0.75)"} fontSize="7.5" fontFamily="monospace">{r.v}</text>
          </g>
        ))}
      </svg>
    ),
  },
  {
    client: 'Patio Curauma',
    tag: 'Retail · Fidelización',
    title: 'App de fidelización con Google Wallet',
    summary: 'Sistema de sellos digitales con integración nativa a Google Wallet. Recompensas, gamificación y notificaciones push para impulsar visitas recurrentes en el centro comercial.',
    stack: ['React Native', 'Google Wallet API', 'Node.js', 'Firebase'],
    status: 'Live desde 2025',
    gradient: 'linear-gradient(135deg, #1a1000 0%, #261700 100%)',
    mockup: () => (
      <svg viewBox="0 0 420 200" width="100%" height="100%" style={{position:'absolute',inset:0}}>
        <rect width="420" height="200" fill="#110d00"/>
        {/* Phone frame */}
        <rect x="140" y="10" width="140" height="180" rx="16" fill="#1a1200" stroke="rgba(212,160,40,0.3)" strokeWidth="1.5"/>
        <rect x="152" y="26" width="116" height="148" rx="8" fill="#0d0900"/>
        {/* Wallet card */}
        <rect x="158" y="32" width="104" height="60" rx="8" fill="linear-gradient(135deg,#b8860b,#8b6914)" stroke="rgba(212,160,40,0.5)" strokeWidth="1"/>
        <defs><linearGradient id="goldg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#c9a227"/><stop offset="100%" stopColor="#7a5c0a"/></linearGradient></defs>
        <rect x="158" y="32" width="104" height="60" rx="8" fill="url(#goldg)"/>
        <text x="166" y="48" fill="rgba(255,255,255,0.9)" fontSize="8" fontFamily="monospace" fontWeight="bold">PATIO CURAUMA</text>
        <text x="166" y="60" fill="rgba(255,255,255,0.65)" fontSize="6" fontFamily="monospace">Sellos digitales</text>
        {/* Stamps grid */}
        <text x="166" y="76" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="monospace">Sellos</text>
        {[0,1,2,3,4,5,6,7,8,9].map(j=>{
          const x = 166 + (j%5)*18;
          const y = 82 + Math.floor(j/5)*16;
          return <circle key={j} cx={x} cy={y} r="6" fill={j<7?"rgba(212,160,40,0.8)":"rgba(255,255,255,0.12)"} stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>;
        })}
        {/* Bottom nav */}
        <rect x="152" y="154" width="116" height="20" rx="4" fill="#0d0900"/>
        {['🏠','🏆','📍','👤'].map((ic,i)=>(
          <text key={i} x={165+i*28} y="168" fontSize="9" textAnchor="middle">{ic}</text>
        ))}
        {/* BG decoration */}
        <circle cx="60" cy="100" r="80" fill="rgba(212,160,40,0.04)"/>
        <circle cx="360" cy="100" r="60" fill="rgba(212,160,40,0.04)"/>
      </svg>
    ),
  },
  {
    client: 'Colegio Diego Thompson',
    tag: 'EdTech · Educación',
    title: 'Portal institucional + automatización de pagos (PWA)',
    summary: 'Portal institucional con experiencia PWA (instalable, offline-first) y motor de automatización de pagos para colegiaturas y eventos escolares. Comunicación familia-colegio centralizada.',
    stack: ['Next.js', 'PWA', 'Webpay', 'PostgreSQL'],
    status: '100% pagos digitalizados',
    gradient: 'linear-gradient(135deg, #060e1a 0%, #0a1428 100%)',
    mockup: () => (
      <svg viewBox="0 0 420 200" width="100%" height="100%" style={{position:'absolute',inset:0}}>
        <rect width="420" height="200" fill="#060e1a"/>
        {/* Header bar */}
        <rect x="0" y="0" width="420" height="32" fill="#091220"/>
        <rect x="12" y="10" width="80" height="12" rx="3" fill="rgba(37,99,235,0.6)"/>
        <rect x="340" y="10" width="68" height="12" rx="3" fill="rgba(37,99,235,0.3)"/>
        {/* Calendar panel */}
        <rect x="12" y="42" width="210" height="148" rx="8" fill="#091220"/>
        <text x="22" y="58" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="monospace" fontWeight="bold">Mayo 2026</text>
        {['L','M','M','J','V'].map((d,i)=>(
          <text key={d+i} x={30+i*38} y="72" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace" textAnchor="middle">{d}</text>
        ))}
        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(n=>{
          const row = Math.floor((n-1)/5);
          const col = (n-1)%5;
          const highlight = [5,10,12].includes(n);
          const today = n === 10;
          return (
            <g key={n}>
              <rect x={22+col*38} y={78+row*28} width="24" height="18" rx="4"
                fill={today?"rgba(37,99,235,0.7)":highlight?"rgba(37,99,235,0.2)":"rgba(255,255,255,0.04)"}/>
              <text x={34+col*38} y={91+row*28} fill={today?"#fff":highlight?"rgba(37,99,235,0.9)":"rgba(255,255,255,0.4)"}
                fontSize="7.5" fontFamily="monospace" textAnchor="middle">{n}</text>
            </g>
          );
        })}
        {/* Payments panel */}
        <rect x="234" y="42" width="174" height="148" rx="8" fill="#091220"/>
        <text x="244" y="58" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="monospace" fontWeight="bold">Pagos Pendientes</text>
        {[
          {label:'Mensualidad Mayo',amt:'$85.000',ok:true},
          {label:'Taller Arte',amt:'$12.000',ok:false},
          {label:'Excursión Bio-Bio',amt:'$25.000',ok:false},
        ].map((p,i)=>(
          <g key={i}>
            <rect x="244" y={68+i*42} width="154" height="34" rx="5" fill="rgba(255,255,255,0.04)"/>
            <text x="254" y={83+i*42} fill="rgba(255,255,255,0.7)" fontSize="7.5" fontFamily="monospace">{p.label}</text>
            <text x="254" y={96+i*42} fill={p.ok?"rgba(37,220,100,0.9)":"rgba(255,255,255,0.4)"} fontSize="8" fontFamily="monospace" fontWeight="bold">{p.amt}</text>
            <circle cx="378" cy={85+i*42} r="6" fill={p.ok?"rgba(37,220,100,0.3)":"rgba(255,255,255,0.08)"}/>
            {p.ok && <text x="378" y="89" fill="rgba(37,220,100,0.9)" fontSize="7" textAnchor="middle">✓</text>}
          </g>
        ))}
      </svg>
    ),
  },
  {
    client: 'Barbería Ferraza',
    tag: 'Belleza · Reservas',
    title: 'Plataforma de reservas 24/7 + club de fidelidad',
    summary: 'Sistema de reservas de turnos online, gestión de clientes y trabajadores, y club de fidelidad integrado. Disponibilidad 24/7 con confirmaciones automatizadas.',
    stack: ['Next.js', 'PostgreSQL', 'WhatsApp API', 'Webpay'],
    status: 'En producción',
    gradient: 'linear-gradient(135deg, #0e0a1c 0%, #15102a 100%)',
    mockup: () => (
      <svg viewBox="0 0 420 200" width="100%" height="100%" style={{position:'absolute',inset:0}}>
        <rect width="420" height="200" fill="#0a0814"/>
        <rect x="0" y="0" width="420" height="28" fill="#0d0b1a"/>
        <text x="16" y="18" fill="rgba(140,100,220,0.9)" fontSize="9" fontFamily="monospace" fontWeight="bold">Barbería Ferraza · Agenda</text>
        {/* Week view */}
        {['LUN','MAR','MIÉ','JUE','VIE','SÁB'].map((d,i)=>(
          <g key={d}>
            <text x={20+i*65} y="44" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle">{d}</text>
            <text x={20+i*65} y="56" fill={i===4?"rgba(140,100,220,0.9)":"rgba(255,255,255,0.5)"} fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{5+i}</text>
          </g>
        ))}
        {/* Time slots */}
        {[{t:'09:00',slots:[1,0,1,1,0,1]},{t:'10:00',slots:[0,1,1,0,1,0]},{t:'11:00',slots:[1,1,0,1,1,0]},{t:'12:00',slots:[0,0,1,0,1,1]},{t:'14:00',slots:[1,0,0,1,0,1]},{t:'15:00',slots:[0,1,1,0,1,0]},{t:'16:00',slots:[1,0,1,1,0,1]}].map((row,ri)=>(
          <g key={ri}>
            <text x="0" y={72+ri*18} fill="rgba(255,255,255,0.25)" fontSize="6.5" fontFamily="monospace" textAnchor="middle" x="24">{row.t}</text>
            {row.slots.map((s,ci)=>(
              <rect key={ci} x={35+ci*65} y={63+ri*18} width="50" height="13" rx="3"
                fill={s===1?"rgba(140,100,220,0.6)":"rgba(255,255,255,0.05)"}
                stroke={s===1?"rgba(140,100,220,0.3)":"rgba(255,255,255,0.08)"} strokeWidth="0.5"/>
            ))}
          </g>
        ))}
      </svg>
    ),
  },
  {
    client: 'Barbería Elegance',
    tag: 'Belleza · Reservas',
    title: 'Reservas online y gestión de equipo',
    summary: 'Misma base tecnológica que Ferraza, adaptada al flujo de Elegance: agenda 24/7, gestión de barberos, programa de clientes frecuentes y métricas operativas.',
    stack: ['Next.js', 'PostgreSQL', 'WhatsApp API', 'Webpay'],
    status: 'En producción',
    gradient: 'linear-gradient(135deg, #180a0a 0%, #2a0f0f 100%)',
    mockup: () => (
      <svg viewBox="0 0 420 200" width="100%" height="100%" style={{position:'absolute',inset:0}}>
        <rect width="420" height="200" fill="#120808"/>
        <rect x="0" y="0" width="420" height="28" fill="#1a0a0a"/>
        <text x="16" y="18" fill="rgba(200,60,60,0.9)" fontSize="9" fontFamily="monospace" fontWeight="bold">Barbería Elegance · Dashboard</text>
        {/* Stats row */}
        {[{l:'Citas hoy',v:'12'},{l:'Confirmadas',v:'9'},{l:'Ingresos',v:'$147k'}].map((s,i)=>(
          <g key={i}>
            <rect x={16+i*130} y="36" width="116" height="44" rx="6" fill="rgba(200,60,60,0.08)" stroke="rgba(200,60,60,0.2)" strokeWidth="0.8"/>
            <text x={74+i*130} y="57" fill="rgba(200,60,60,0.9)" fontSize="18" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{s.v}</text>
            <text x={74+i*130} y="72" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle">{s.l}</text>
          </g>
        ))}
        {/* Barberos list */}
        <text x="16" y="100" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">Equipo activo</text>
        {[{n:'Carlos R.',c:4},{n:'Matías P.',c:3},{n:'Diego S.',c:5}].map((b,i)=>(
          <g key={i}>
            <rect x="16" y={108+i*28} width="380" height="22" rx="4" fill="rgba(255,255,255,0.04)"/>
            <circle cx="30" cy={119+i*28} r="7" fill="rgba(200,60,60,0.4)"/>
            <text x="44" y={122+i*28} fill="rgba(255,255,255,0.75)" fontSize="8" fontFamily="monospace">{b.n}</text>
            <rect x="280" y={112+i*28} width="6" height="14" rx="2" fill={b.c>4?"rgba(200,60,60,0.8)":"rgba(200,60,60,0.4)"}/>
            {[1,2,3,4,5].map(k=><rect key={k} x={286+k*18} y={112+i*28} width="12" height="14" rx="2" fill={k<=b.c?"rgba(200,60,60,0.7)":"rgba(255,255,255,0.06)"}/>)}
          </g>
        ))}
      </svg>
    ),
  },
];

const CaseCard = ({ c, i }) => {
  const ref = useTilt(4);
  const isFlagship = c.flagship;
  return (
    <div className={`case-card${isFlagship?' case-card--flagship':''}`} ref={ref} data-reveal style={{transitionDelay: `${i*80}ms`}}>
      <div className="case-card__img">
        <div className="case-card__img-inner" style={{background: c.gradient}}>
          {c.mockup && c.mockup()}
        </div>
        <span className="case-card__tag-pill">{c.tag}</span>
      </div>
      <div className="case-card__body">
        <div className="case-card__client">{c.client}</div>
        <h3 className="case-card__title">{c.title}</h3>
        <p className="case-card__summary">{c.summary}</p>
        <div className="case-card__stack">
          {c.stack.map(s => <span key={s} className="case-card__stack-tag">{s}</span>)}
        </div>
        <div className="case-card__footer-row">
          <span className="case-card__status"><span className="case-card__status-dot"/>  {c.status}</span>
          <a href="#contacto" className="case-card__link">Saber más <Icon name="arrow" size={13}/></a>
        </div>
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

// ----- Tech Band (TAREA 9) -----
const TECH_STACK = ['Next.js','React','TypeScript','PostgreSQL','FastAPI','Python','DICOM.js','Google Wallet','WhatsApp API','Webpay','Firebase','Tailwind CSS','Node.js','React Native','HL7'];
const TechBand = () => (
  <div className="tech-band" aria-label="Tecnologías que usamos">
    <div className="tech-band__track">
      {[...TECH_STACK, ...TECH_STACK].map((t, i) => (
        <span key={i} className="tech-band__item">{t}</span>
      ))}
    </div>
  </div>
);

// ----- Intelligence Unit -----
const INSIGHTS = [
  {
    tag: 'REDES NEURONALES',
    title: 'El Futuro de las Redes Neuronales en la Industria Latinoamericana',
    date: '12 Abr 2026',
    readTime: '6 min',
    visual: () => (
      <svg viewBox="0 0 320 160" width="100%" height="100%" style={{position:'absolute',inset:0,display:'block'}}>
        <rect width="320" height="160" fill="#0a0a14"/>
        <defs>
          <radialGradient id="nb1" cx="50%" cy="50%"><stop offset="0%" stopColor="rgba(164,212,60,0.18)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
        </defs>
        <ellipse cx="160" cy="80" rx="120" ry="70" fill="url(#nb1)"/>
        {/* Neural nodes */}
        {[[60,40],[60,80],[60,120],[130,30],[130,70],[130,110],[200,50],[200,90],[260,70]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={i===8?8:5} fill="none" stroke="rgba(164,212,60,0.7)" strokeWidth="1.2"/>
        ))}
        {/* Connections */}
        {[[60,40,130,30],[60,40,130,70],[60,80,130,70],[60,80,130,110],[60,120,130,110],[130,30,200,50],[130,70,200,50],[130,70,200,90],[130,110,200,90],[200,50,260,70],[200,90,260,70]].map(([x1,y1,x2,y2],i)=>(
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(164,212,60,0.2)" strokeWidth="0.8"/>
        ))}
        <text x="160" y="152" fill="rgba(164,212,60,0.4)" fontSize="8" fontFamily="monospace" textAnchor="middle">NEURAL NETWORK · SYNAPTECH</text>
      </svg>
    ),
  },
  {
    tag: 'IA EMPRESARIAL',
    title: '5 Mitos que Frenan la Adopción de IA en tu Organización',
    date: '28 Mar 2026',
    readTime: '4 min',
    visual: () => (
      <svg viewBox="0 0 320 160" width="100%" height="100%" style={{position:'absolute',inset:0,display:'block'}}>
        <rect width="320" height="160" fill="#0a0a0a"/>
        {[{h:90,l:'Productividad'},{h:60,l:'Costos'},{h:120,l:'Adopción'},{h:75,l:'ROI'},{h:105,l:'Escala'}].map((b,i)=>(
          <g key={i}>
            <rect x={30+i*54} y={140-b.h} width="36" height={b.h} rx="4"
              fill={`rgba(164,212,60,${0.3+i*0.12})`} stroke="rgba(164,212,60,0.4)" strokeWidth="0.8"/>
            <text x={48+i*54} y="153" fill="rgba(255,255,255,0.3)" fontSize="6.5" fontFamily="monospace" textAnchor="middle">{b.l}</text>
          </g>
        ))}
        <line x1="20" y1="140" x2="300" y2="140" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
        <text x="160" y="20" fill="rgba(164,212,60,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle">IA EMPRESARIAL</text>
      </svg>
    ),
  },
  {
    tag: 'IoT ESTRATÉGICO',
    title: 'Cómo el IoT Industrial Redefine la Logística de Última Milla',
    date: '14 Mar 2026',
    readTime: '7 min',
    visual: () => (
      <svg viewBox="0 0 320 160" width="100%" height="100%" style={{position:'absolute',inset:0,display:'block'}}>
        <rect width="320" height="160" fill="#050e14"/>
        {/* Node mesh */}
        {[[80,40],[160,30],[240,50],[60,100],[140,90],[220,110],[100,145],[180,150]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="5" fill="rgba(164,212,60,0.15)" stroke="rgba(164,212,60,0.6)" strokeWidth="1.2"/>
        ))}
        {[[80,40,160,30],[160,30,240,50],[80,40,60,100],[160,30,140,90],[240,50,220,110],[60,100,140,90],[140,90,220,110],[60,100,100,145],[140,90,180,150],[220,110,180,150]].map(([x1,y1,x2,y2],i)=>(
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(164,212,60,0.15)" strokeWidth="0.8" strokeDasharray="3 3"/>
        ))}
        {/* Pulse rings */}
        <circle cx="160" cy="30" r="14" fill="none" stroke="rgba(164,212,60,0.3)" strokeWidth="0.8"/>
        <circle cx="160" cy="30" r="22" fill="none" stroke="rgba(164,212,60,0.15)" strokeWidth="0.8"/>
        <text x="160" y="155" fill="rgba(164,212,60,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle" dy="-2">IoT MESH · 8 NODOS ACTIVOS</text>
      </svg>
    ),
  },
];
const InsightCard = ({ p, i }) => {
  const ref = useTilt(4);
  return (
    <article className="insight-card" ref={ref} data-reveal style={{transitionDelay: `${i*80}ms`}}>
      <div className="insight-card__img" style={{position:'relative'}}>
        {p.visual && p.visual()}
      </div>
      <div className="insight-card__body">
        <div className="insight-card__tag">{p.tag}</div>
        <h3 className="insight-card__title">{p.title}</h3>
      </div>
      <div className="insight-card__footer">
        <span>{p.date}</span>
        <span className="insight-card__footer-dot"/>
        <span>{p.readTime} lectura</span>
      </div>
    </article>
  );
};
const Insights = () => (
  <section className="insights" id="blog">
    <div className="insights__head" data-reveal>
      <div className="services__kicker" style={{marginBottom:12}}>Intelligence Unit</div>
      <h2 className="services__title">Investigación en la <em style={{fontStyle:'normal', color:'var(--syn-lime-dark)'}}>vanguardia</em>.</h2>
    </div>
    <div className="insights__grid">
      {INSIGHTS.map((p, i) => <InsightCard key={i} p={p} i={i}/>)}
    </div>
    <div style={{textAlign:'center',marginTop:32}}>
      <a href="#contacto" style={{fontSize:13,color:'rgba(164,212,60,0.7)',textDecoration:'none',fontWeight:600,letterSpacing:'0.06em'}}>Ver todos los artículos →</a>
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
          <button type="submit" className="syn-btn syn-btn--primary syn-btn--primary-lg contact__submit">
            {sent ? '✓ Mensaje enviado' : 'Enviar mensaje'}
          </button>
        </form>
        <div className="contact__info" data-reveal>
          <div className="contact__info-item">
            <div className="contact__info-item__icon"><Icon name="pin" size={20}/></div>
            <div><h5>Oficina</h5><p>Viña del Mar,<br/>Región de Valparaíso, Chile</p></div>
          </div>
          <div className="contact__info-item">
            <div className="contact__info-item__icon"><Icon name="phone" size={20}/></div>
            <div><h5>Teléfono</h5><p>+569 83568212</p></div>
          </div>
          <div className="contact__info-item">
            <div className="contact__info-item__icon"><Icon name="mail" size={20}/></div>
            <div><h5>Email</h5><p>hola@sinpatech.cl<br/>ignaciiio.mate@gmail.com</p></div>
          </div>
          <div className="contact__info-item">
            <div className="contact__info-item__icon"><Icon name="clock" size={20}/></div>
            <div><h5>Horario</h5><p>Lunes – Viernes<br/>9:00 AM – 6:00 PM</p></div>
          </div>
          <div className="contact__map">
            <svg viewBox="0 0 400 200" style={{width:'100%',height:'100%'}}>
              <rect width="400" height="200" fill="#F1F4F6"/>
              <g stroke="#D5DADE" strokeWidth="1" fill="none">
                <path d="M0 50 L400 80"/><path d="M0 100 L400 130"/><path d="M0 150 L400 170"/>
                <path d="M80 0 L120 200"/><path d="M200 0 L180 200"/><path d="M320 0 L280 200"/>
              </g>
              <circle cx="200" cy="100" r="20" style={{fill:'var(--syn-lime)'}} opacity=".3"/>
              <circle cx="200" cy="100" r="10" style={{fill:'var(--syn-lime)'}}/>
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
        <img src="assets/synaptech-logo-transparent.png" alt="Synaptech"/>
        <p>Desarrollo de software a medida, plataformas HealthTech y automatización de operaciones. Arquitectura digital segura y escalable.</p>
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
          <li><a href="mailto:hola@sinpatech.cl">hola@sinpatech.cl</a></li>
          <li><a href="mailto:ignaciiio.mate@gmail.com">ignaciiio.mate@gmail.com</a></li>
          <li><a href="tel:+56983568212">+569 83568212</a></li>
          <li style={{color:'rgba(255,255,255,.5)'}}>Viña del Mar,<br/>Región de Valparaíso, Chile</li>
        </ul>
      </div>
    </div>
    <div className="site-footer__bottom">
      <div>© 2026 Synaptech SpA. Todos los derechos reservados.</div>
      <div className="footer-status">
        <span className="footer-status__dot"/>
        Sistemas SynapTech: Operativos
      </div>
      <div>Hecho en Viña del Mar, Chile.</div>
    </div>
  </footer>
);

// ----- Digital Diagnosis Stepper -----
const RUBROS = [
  { label: 'Salud',     icon: 'brain',     desc: 'Clínicas, centros médicos, imagenología' },
  { label: 'Retail',    icon: 'growth',    desc: 'Centros comerciales, tiendas, fidelización' },
  { label: 'Educación', icon: 'blueprint', desc: 'Colegios, academias, institutos' },
  { label: 'Belleza',   icon: 'clock',     desc: 'Barberías, salones, centros de estética' },
];
const PROBLEMAS = [
  { label: 'Gestión de turnos',    desc: 'Agenda, reservas y recordatorios automáticos' },
  { label: 'Pagos online',         desc: 'Cobros digitales, facturación y recurrencia' },
  { label: 'Retención de clientes',desc: 'Lealtad, fidelización y reactivación' },
  { label: 'Reportes y análisis',  desc: 'Dashboards, métricas e inteligencia del negocio' },
];

const DigitalDiagnosis = ({ onRubroSelect }) => {
  const [step, setStep] = useState(0);
  const [rubro, setRubro] = useState(null);
  const [problema, setProblema] = useState(null);
  const [form, setForm] = useState({ nombre: '', empresa: '', whatsapp: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const pickRubro = (r) => { setRubro(r); onRubroSelect(r.label); setStep(1); };
  const pickProblema = (p) => { setProblema(p); setStep(2); };
  const update = (k) => (e) => setForm(f => ({...f, [k]: e.target.value}));
  const submit = (e) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 2400); };
  const waMsg = encodeURIComponent(rubro && problema
    ? `Hola Ignacio, completé el diagnóstico SynapTech. Rubro: ${rubro.label}. Necesito ayuda con "${problema.label}". ¿Podemos agendar una consultoría?`
    : 'Hola Ignacio, me interesa conocer más sobre SynapTech.');

  const STEP_LABELS = ['Rubro', 'Desafío', 'Datos'];

  return (
    <section className="diagnosis" id="diagnostico">
      <div className="diagnosis__inner">
        <div className="diagnosis__img-col">
          <img src="assets/nucleo.png" alt="Núcleo tecnológico SynapTech" className="diagnosis__img"/>
        </div>
        <div className="diagnosis__form-col">
          {done ? (
            <div className="diagnosis__result">
              <div className="diagnosis__result-icon">✓</div>
              <h3 className="diagnosis__result-title">¡Diagnóstico listo!</h3>
              <p className="diagnosis__result-body">Analizamos tu rubro <strong style={{color:'var(--syn-lime)'}}>{rubro?.label}</strong> y el desafío de <strong style={{color:'var(--syn-lime)'}}>{problema?.label}</strong>. Un especialista SynapTech te contactará pronto.</p>
              <div className="diagnosis__result-actions">
                <a href={`https://wa.me/56983568212?text=${waMsg}`} className="syn-btn syn-btn--primary syn-btn--primary-lg" target="_blank" rel="noopener noreferrer">
                  Confirmar por WhatsApp
                </a>
                <a href="#agendar" className="syn-btn" style={{color:'rgba(245,245,245,.65)',border:'1px solid rgba(255,255,255,.15)',background:'transparent',borderRadius:'var(--syn-radius-md)',padding:'14px 20px',fontSize:14,fontWeight:600,textDecoration:'none',display:'inline-flex',alignItems:'center'}}>
                  Ver horarios disponibles
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="diagnosis__kicker">Escáner de Salud Digital</div>
              <h2 className="diagnosis__title">¿Qué <em style={{fontStyle:'normal',color:'var(--syn-lime)'}}>frena</em> tu negocio?</h2>
              <p className="diagnosis__subtitle">3 preguntas. Diagnóstico preliminar gratuito.</p>

              <div className="diagnosis__steps">
                {STEP_LABELS.map((_, i) => (
                  <div key={i} className={`diagnosis__step-pip ${i === step ? 'is-active' : ''} ${i < step ? 'is-done' : ''}`}/>
                ))}
              </div>
              <div className="diagnosis__step-label-row">
                <div className="diagnosis__step-num">{step + 1}</div>
                <h4 className="diagnosis__question">
                  {step === 0 && 'Rubro de tu negocio'}
                  {step === 1 && 'Mayor cuello de botella'}
                  {step === 2 && '¿A quién le enviamos el diagnóstico?'}
                </h4>
              </div>

              {step === 0 && (
                <div className="diagnosis__options">
                  {RUBROS.map(r => (
                    <button key={r.label} className="diagnosis__option" onClick={() => pickRubro(r)}>
                      <div className="diagnosis__option-icon"><Icon name={r.icon} size={20}/></div>
                      <div>
                        <div className="diagnosis__option-label">{r.label}</div>
                        <div className="diagnosis__option-desc">{r.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <>
                  <div className="diagnosis__options">
                    {PROBLEMAS.map(p => (
                      <button key={p.label} className="diagnosis__option" onClick={() => pickProblema(p)}>
                        <div>
                          <div className="diagnosis__option-label">{p.label}</div>
                          <div className="diagnosis__option-desc">{p.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button className="diagnosis__back" onClick={() => setStep(0)}>← Volver</button>
                </>
              )}

              {step === 2 && (
                <>
                  <form className="diagnosis__form" onSubmit={submit}>
                    <input className="syn-input" placeholder="Tu nombre" required value={form.nombre} onChange={update('nombre')}/>
                    <input className="syn-input" placeholder="Empresa o negocio" required value={form.empresa} onChange={update('empresa')}/>
                    <input className="syn-input" placeholder="WhatsApp (+569...)" required value={form.whatsapp} onChange={update('whatsapp')}/>
                    <button type="submit" className="syn-btn syn-btn--primary" style={{alignSelf:'flex-start', marginTop:4}}>
                      {loading ? 'Generando diagnóstico...' : 'Obtener diagnóstico gratuito →'}
                    </button>
                    {loading && <div className="diagnosis__progress"><div className="diagnosis__progress-bar"/></div>}
                  </form>
                  <button className="diagnosis__back" onClick={() => setStep(1)}>← Volver</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
// ----- Testimonials (PRUEBA SOCIAL) -----
const Testimonials = () => {
  const list = [
    {
      avatar: 'CS',
      client: 'Chameleon Barber Studio',
      quote: 'Tenemos muy buenas expectativas con el software; el producto es sumamente completo, los precios son accesibles y el soporte técnico que brindan es de excelente nivel.',
      role: 'Estudio de Barbería y Estética',
      rating: 5
    },
    {
      avatar: 'BF',
      client: 'Barbería Ferraza',
      quote: 'Valoro y admiro profundamente el trabajo de digitalización que realizan. Es un sistema robusto que aporta un valor real a nuestro negocio diario.',
      role: 'Barbería y Gestión Comercial',
      rating: 5
    }
  ];

  return (
    <section className="testimonials" id="testimonios">
      <div className="testimonials__inner">
        <div className="testimonials__head" data-reveal>
          <div className="services__kicker">Prueba Social</div>
          <h2 className="testimonials__title">La opinión de quienes <em style={{fontStyle:'normal', color:'var(--syn-lime-dark)'}}>confían</em> en nosotros.</h2>
        </div>
        <div className="testimonials__grid">
          {list.map((t, i) => (
            <figure key={i} className="testimonial-card" data-reveal style={{transitionDelay: `${i*100}ms`}}>
              <div className="testimonial-card__quote-icon" aria-hidden="true">“</div>
              <div className="testimonial-card__stars" aria-label="Calificación 5 de 5 estrellas">
                {[...Array(t.rating)].map((_, idx) => (
                  <svg key={idx} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                  </svg>
                ))}
              </div>
              <blockquote className="testimonial-quote">
                <p>"{t.quote}"</p>
              </blockquote>
              <figcaption className="testimonial-caption">
                <div className="testimonial-card__avatar">{t.avatar}</div>
                <div className="testimonial-card__meta">
                  <div className="testimonial-card__name-row">
                    <span className="testimonial-card__name">{t.client}</span>
                    <span className="testimonial-card__verified" title="Cliente verificado">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </span>
                  </div>
                  <span className="testimonial-card__role">{t.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----- Booking (Calendly placeholder) -----
const Booking = () => (
  <section className="booking" id="agendar">
    <div className="booking__inner" data-reveal>
      <div>
        <div className="services__kicker" style={{marginBottom:12}}>Agenda sin compromiso</div>
        <h2 className="booking__title">Reunión de Diagnóstico <em style={{fontStyle:'normal',color:'var(--syn-lime-dark)'}}>gratuita</em></h2>
        <p className="booking__sub">15 minutos para entender tu operación y mostrarte exactamente cómo SynapTech puede transformarla. Sin presión, sin compromiso.</p>
      </div>
      <div className="booking__cal-placeholder">
        <div className="booking__cal-icon"><Icon name="clock" size={28} stroke="var(--syn-lime)"/></div>
        <h4>15 min · Reunión de Diagnóstico</h4>
        <p>Selecciona el horario que mejor te acomode y conversamos.</p>
        <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="syn-btn syn-btn--primary">
          Ver horarios disponibles <Icon name="arrow" size={14}/>
        </a>
      </div>
    </div>
  </section>
);

// ----- WhatsApp Floating Button -----
const WhatsAppButton = ({ rubro }) => {
  const msg = encodeURIComponent(rubro
    ? `Hola Ignacio, me interesa digitalizar mi operación en el área de ${rubro} con SynapTech.`
    : 'Hola Ignacio, me interesa conocer más sobre los servicios de SynapTech.');
  return (
    <a href={`https://wa.me/56983568212?text=${msg}`} className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
};

// ----- Client Access Modal -----
const ClientModal = ({ onClose }) => (
  <div className="client-modal" onClick={onClose}>
    <div className="client-modal__box" onClick={e => e.stopPropagation()}>
      <button className="client-modal__close" onClick={onClose} aria-label="Cerrar">✕</button>
      <div className="client-modal__icon"><Icon name="rocket" size={30} stroke="var(--syn-lime)"/></div>
      <h3 className="client-modal__title">Portal de Clientes</h3>
      <div className="client-modal__sub">Próximamente</div>
      <p className="client-modal__body">Tu centro de control SynapTech: revisa el estado de tus proyectos, tickets de soporte y facturación desde un solo lugar. Actualmente en desarrollo para nuestros clientes activos.</p>
      <a href="#contacto" className="syn-btn syn-btn--primary" onClick={onClose}>Contactar al equipo</a>
    </div>
  </div>
);

// ----- App -----
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": true,
  "accent": "#A4D43C",
  "hud": false,
  "rail": false
}/*EDITMODE-END*/;

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [selectedRubro, setSelectedRubro] = useState('');
  const [clientModal, setClientModal] = useState(false);
  useHeaderShrink();
  useSmoothAnchors();
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.add('is-reveal'); io.observe(el); });
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
      <Header onClientAccess={() => setClientModal(true)}/>
      <Hero/>
      <About/>
      <Vision/>
      <Services/>
      <Process/>
      <TechBand/>
      <Cases/>
      <Testimonials/>
      <Booking/>
      <DigitalDiagnosis onRubroSelect={setSelectedRubro}/>
      <Insights/>
      <Contact/>
      <Footer/>
      <WhatsAppButton rubro={selectedRubro}/>
      {clientModal && <ClientModal onClose={() => setClientModal(false)}/>}
      <CursorHalo/>
      {t.hud && <HUD/>}
      {t.rail && <SideRail/>}
      <SectionFrames/>
      <CardCorners/>
      <TweaksPanel>
        <TweakSection label="Tema"/>
        <TweakToggle label="Modo oscuro" value={t.dark} onChange={v => setTweak('dark', v)}/>
        <TweakColor label="Color primario" value={t.accent} onChange={v => setTweak('accent', v)}/>
        <TweakSection label="UI Extras"/>
        <TweakToggle label="Marco HUD" value={t.hud} onChange={v => setTweak('hud', v)}/>
        <TweakToggle label="Riel de sección" value={t.rail} onChange={v => setTweak('rail', v)}/>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

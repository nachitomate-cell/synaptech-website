"use client";
import { motion } from "framer-motion";

function BlogVisualNeural() {
  return (
    <svg viewBox="0 0 320 160" className="absolute inset-0 w-full h-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="160" fill="#0a0a14"/>
      <defs>
        <radialGradient id="nbg1" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(163,230,53,0.16)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="80" rx="120" ry="70" fill="url(#nbg1)"/>
      {/* Nodes */}
      {([[60,40],[60,80],[60,120],[130,30],[130,70],[130,110],[200,50],[200,90],[260,70]] as [number,number][]).map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i===8?8:5} fill="none" stroke="rgba(163,230,53,0.7)" strokeWidth="1.2"/>
      ))}
      {/* Edges */}
      {([[60,40,130,30],[60,40,130,70],[60,80,130,70],[60,80,130,110],[60,120,130,110],
         [130,30,200,50],[130,70,200,50],[130,70,200,90],[130,110,200,90],[200,50,260,70],[200,90,260,70]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(163,230,53,0.18)" strokeWidth="0.8"/>
      ))}
      <text x="160" y="150" fill="rgba(163,230,53,0.35)" fontSize="7.5" fontFamily="monospace" textAnchor="middle">NEURAL NETWORK</text>
    </svg>
  );
}

function BlogVisualBars() {
  const bars = [
    { h: 90, label: "Productividad" }, { h: 60, label: "Costos" },
    { h: 120, label: "Adopción" }, { h: 75, label: "ROI" }, { h: 105, label: "Escala" },
  ];
  return (
    <svg viewBox="0 0 320 160" className="absolute inset-0 w-full h-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="160" fill="#0a0a0a"/>
      <text x="160" y="22" fill="rgba(163,230,53,0.45)" fontSize="9" fontFamily="monospace" textAnchor="middle">IA EMPRESARIAL</text>
      {bars.map((b, i) => (
        <g key={i}>
          <rect x={28 + i * 54} y={140 - b.h} width="36" height={b.h} rx="4"
            fill={`rgba(163,230,53,${0.28 + i * 0.1})`} stroke="rgba(163,230,53,0.35)" strokeWidth="0.8"/>
          <text x={46 + i * 54} y="153" fill="rgba(255,255,255,0.28)" fontSize="6" fontFamily="monospace" textAnchor="middle">{b.label}</text>
        </g>
      ))}
      <line x1="18" y1="140" x2="302" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
    </svg>
  );
}

function BlogVisualMesh() {
  const nodes: [number,number][] = [[80,40],[160,30],[240,50],[60,100],[140,90],[220,110],[100,148],[180,152]];
  const edges: [number,number,number,number][] = [
    [80,40,160,30],[160,30,240,50],[80,40,60,100],[160,30,140,90],[240,50,220,110],
    [60,100,140,90],[140,90,220,110],[60,100,100,148],[140,90,180,152],[220,110,180,152],
  ];
  return (
    <svg viewBox="0 0 320 160" className="absolute inset-0 w-full h-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="160" fill="#040e14"/>
      {edges.map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(163,230,53,0.14)" strokeWidth="0.8" strokeDasharray="3 3"/>
      ))}
      {nodes.map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="5" fill="rgba(163,230,53,0.12)" stroke="rgba(163,230,53,0.6)" strokeWidth="1.2"/>
      ))}
      <circle cx="160" cy="30" r="14" fill="none" stroke="rgba(163,230,53,0.28)" strokeWidth="0.8"/>
      <circle cx="160" cy="30" r="22" fill="none" stroke="rgba(163,230,53,0.14)" strokeWidth="0.8"/>
      <text x="160" y="155" fill="rgba(163,230,53,0.35)" fontSize="7" fontFamily="monospace" textAnchor="middle">IoT MESH · 8 NODOS</text>
    </svg>
  );
}

const POSTS = [
  {
    tag: "REDES NEURONALES",
    title: "El Futuro de las Redes Neuronales en la Industria Latinoamericana",
    date: "12 Abr 2026", readTime: "6 min",
    Visual: BlogVisualNeural,
  },
  {
    tag: "IA EMPRESARIAL",
    title: "5 Mitos que Frenan la Adopción de IA en tu Organización",
    date: "28 Mar 2026", readTime: "4 min",
    Visual: BlogVisualBars,
  },
  {
    tag: "IoT ESTRATÉGICO",
    title: "Cómo el IoT Industrial Redefine la Logística de Última Milla",
    date: "14 Mar 2026", readTime: "7 min",
    Visual: BlogVisualMesh,
  },
];

export default function IntelligenceUnit() {
  return (
    <section id="blog" className="py-32 bg-bg-primary">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="eyebrow mb-5">Intelligence Unit</p>
          <h2 className="text-text-primary max-w-xl">
            Investigación en la{" "}
            <em className="italic text-accent not-italic font-display">vanguardia</em>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {POSTS.map((p, i) => {
            const { Visual } = p;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden hover:border-accent/25 transition-colors flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-bg-elevated">
                  <Visual />
                </div>
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <span className="self-start font-mono text-[10px] font-bold tracking-[0.14em] text-accent bg-accent/10 border border-accent/30 rounded px-2.5 py-1">
                    {p.tag}
                  </span>
                  <h3 className="font-display font-semibold text-[15px] leading-snug text-text-primary line-clamp-3">
                    {p.title}
                  </h3>
                  <div className="mt-auto border-t border-border-subtle pt-4 flex items-center gap-2 font-mono text-[11px] text-text-muted">
                    <span>{p.date}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-600 shrink-0"/>
                    <span>{p.readTime} lectura</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a href="#contacto" className="font-mono text-[12px] text-text-muted hover:text-accent transition-colors tracking-wider">
            Ver todos los artículos →
          </a>
        </div>
      </div>
    </section>
  );
}

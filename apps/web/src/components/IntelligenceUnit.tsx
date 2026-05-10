"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const POSTS = [
  {
    tag: "REDES NEURONALES",
    title: "El Futuro de las Redes Neuronales en la Industria Latinoamericana",
    date: "12 Abr 2026", readTime: "6 min",
    img: "/assets/ia-insights.png",
  },
  {
    tag: "IA EMPRESARIAL",
    title: "5 Mitos que Frenan la Adopción de IA en tu Organización",
    date: "28 Mar 2026", readTime: "4 min",
    img: "/assets/strategy-insights.png",
  },
  {
    tag: "IoT ESTRATÉGICO",
    title: "Cómo el IoT Industrial Redefine la Logística de Última Milla",
    date: "14 Mar 2026", readTime: "7 min",
    img: "/assets/iot-insights.png",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {POSTS.map((p, i) => (
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
                <Image
                  src={p.img} alt={p.title} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width:1024px) 25vw,(min-width:640px) 50vw,100vw"
                />
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
                  <span className="w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
                  <span>{p.readTime} lectura</span>
                </div>
              </div>
            </motion.article>
          ))}

          {/* 4th: see-all card */}
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="group border border-border-subtle rounded-2xl flex flex-col items-center justify-center gap-5 p-8 min-h-[260px] text-center hover:bg-bg-secondary hover:border-accent/30 transition-all"
          >
            <span className="font-display text-xl font-semibold text-text-secondary group-hover:text-text-primary transition-colors leading-snug">
              Ver todos los artículos
            </span>
            <div className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-text-muted group-hover:border-accent/50 group-hover:text-accent transition-all">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import RevealHeading from "./RevealHeading";

/* ── Testimonial data ──
   Textuales de clientes. Los marcados `destacado` abren la sección en grande;
   el resto va en una grilla secundaria más compacta. Cada cita es literal: no
   se pulen ni se completan frases, porque el valor de un testimonio real está
   justamente en que suena a persona y no a copy. */
const TESTIMONIALS = [
  {
    initials: "YS",
    client: "Yūgen Studio",
    quote:
      "Solo pasaba por aquí para decirte que el sistema es muy bueno, me tiene muy conforme.",
    role: "Estudio de Barbería",
    rating: 5,
    destacado: true,
  },
  {
    initials: "CS",
    client: "Chameleon Barber Studio",
    quote:
      "Tenemos muy buenas expectativas con el software; el producto es sumamente completo, los precios son accesibles y el soporte técnico que brindan es de excelente nivel.",
    role: "Estudio de Barbería y Estética",
    rating: 5,
    destacado: true,
  },
  {
    initials: "BF",
    client: "Barbería Ferraza",
    quote:
      "Valoro y admiro profundamente el trabajo de digitalización que realizan. Es un sistema robusto que aporta un valor real a nuestro negocio diario.",
    role: "Barbería y Gestión Comercial",
    rating: 5,
    destacado: true,
  },
  {
    initials: "JR",
    client: "Jorge Rosales",
    quote: "Sigo atento a cualquier cosa, pero igual estoy súper conforme.",
    role: "El 10 Salón Masculino",
    rating: 5,
  },
  {
    initials: "JR",
    client: "Jorge Rosales",
    quote: "Genial, gran trabajo. Nos acercamos a tener a Ámbar como nos identificamos.",
    role: "El 10 Salón Masculino",
    rating: 5,
  },
  {
    initials: "CB",
    client: "Claudio Burgos",
    quote: "Estoy contento por trabajar contigo.",
    role: "Viking Barber",
    rating: 5,
  },
  {
    initials: "MM",
    client: "Matías Mella",
    quote: "Agradecido de tus servicios. Ya estamos funcionando.",
    role: "Barbería",
    rating: 5,
  },
  {
    initials: "DX",
    client: "Dexter",
    quote: "Gracias Ignacio, te pasaste.",
    role: "Barbería y Salón",
    rating: 5,
  },
  {
    initials: "JB",
    client: "Jhoseth",
    quote: "Está increíble.",
    role: "Barbero",
    rating: 5,
  },
];

const DESTACADOS = TESTIMONIALS.filter((t) => t.destacado);
const SECUNDARIOS = TESTIMONIALS.filter((t) => !t.destacado);

/* ── Inline SVG icons ── */
function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* ── Quote mark background decoration ── */
function QuoteMark() {
  return (
    <span
      aria-hidden="true"
      className="absolute top-4 right-6 font-display text-[7rem] leading-none
        text-white/[0.03] select-none pointer-events-none"
    >
      &ldquo;
    </span>
  );
}

/* ── Component ── */
export default function Testimonials() {
  return (
    <section id="testimonios" className="py-16 relative overflow-hidden">
      {/* Subtle radial glow behind the section */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(163,230,53,0.04), transparent 70%)",
        }}
      />

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="eyebrow mb-5"
          >
            Prueba Social
          </motion.p>
          <RevealHeading className="text-text-primary max-w-2xl">
            La opinión de quienes{" "}
            <em className="italic text-accent font-display">confían</em> en
            nosotros.
          </RevealHeading>
        </div>

        {/* Destacados: los que hablan del producto, no solo agradecen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DESTACADOS.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.12,
              }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="card-spotlight group relative bg-syn-surface/75 backdrop-blur-xl
                border border-white/[0.06] rounded-2xl p-8 md:p-10
                hover:border-accent/20 transition-colors overflow-hidden"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                (e.currentTarget as HTMLElement).style.setProperty(
                  "--x",
                  `${e.clientX - r.left}px`
                );
                (e.currentTarget as HTMLElement).style.setProperty(
                  "--y",
                  `${e.clientY - r.top}px`
                );
              }}
            >
              <QuoteMark />

              {/* Stars */}
              <div
                className="flex gap-0.5 text-accent mb-5"
                aria-label={`Calificación ${t.rating} de 5 estrellas`}
              >
                {[...Array(t.rating)].map((_, idx) => (
                  <StarIcon key={idx} />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="relative z-10">
                <p className="text-[15px] md:text-base leading-relaxed text-text-primary/90 font-body">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              {/* Caption */}
              <figcaption className="relative z-10 flex items-center gap-3.5 mt-7 pt-6 border-t border-white/[0.06]">
                {/* Avatar */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                    bg-accent/10 border border-accent/20 text-accent
                    font-mono text-xs font-semibold tracking-wider"
                >
                  {t.initials}
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-body text-sm font-semibold text-text-primary">
                      {t.client}
                    </span>
                    <span className="text-accent" title="Cliente verificado">
                      <VerifiedIcon />
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-text-muted tracking-wide">
                    {t.role}
                  </span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Secundarios: citas cortas, en tarjetas compactas. Son igual de
            reales, pero pesan menos y no deben competir con las de arriba. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {SECUNDARIOS.map((t, i) => (
            <motion.figure
              key={`s${i}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              className="bg-syn-surface/50 border border-white/[0.05] rounded-xl p-5
                hover:border-accent/15 transition-colors"
            >
              <div className="flex gap-0.5 text-accent mb-3" aria-label={`Calificación ${t.rating} de 5`}>
                {[...Array(t.rating)].map((_, idx) => (
                  <StarIcon key={idx} />
                ))}
              </div>
              <blockquote>
                <p className="text-sm leading-relaxed text-text-primary/85 font-body">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-2.5 mt-4 pt-3 border-t border-white/[0.05]">
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
                    bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] font-semibold"
                >
                  {t.initials}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-body text-xs font-semibold text-text-primary">{t.client}</span>
                  <span className="font-mono text-[10px] text-text-muted">{t.role}</span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

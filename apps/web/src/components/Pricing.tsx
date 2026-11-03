import Link from "next/link";
import Aparece from "@/components/Aparece";
import {
  ANUAL, INDEPENDIENTE, INDEPENDIENTE_IA, LOCAL, LOCAL_IA, TODO_INCLUIDO, TODO_INCLUIDO_AHORRO, TODO_INCLUIDO_SEPARADO, PRUEBA, fmt, type Plan,
} from "@/content/precios";
import { altaIA, agendaSinIA, A_MEDIDA_WA, CTA_IA, CTA_SIN_IA } from "@/content/catalogo";

/* Planes en tarjetas (escalera de noviembre 2026). Dos ejes a la vista:
   para quién (Independiente = 1 profesional · Local = profesionales
   ilimitados) y con o sin IA. Arriba de todo, Todo Incluido. Los datos salen
   de content/precios.ts; el detalle punto por punto vive en /precios. */

const CHECK = (oscuro?: boolean) => (
  <svg className={`w-5 h-5 shrink-0 mt-0.5 ${oscuro ? "text-lime" : "text-accent"}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function TarjetaPlan({ p }: { p: Plan }) {
  const oscuro = !!p.popular;
  const href = p.ia ? altaIA(`precios-${p.id}`) : agendaSinIA(`precios-${p.id}`);
  return (
    <Aparece delay={p.ia ? 0.08 : 0} className="h-full">
    <article id={`plan-${p.id}`} className={`relative h-full rounded-[28px] p-7 sm:p-8 flex flex-col scroll-mt-24 ${oscuro ? "bg-ink text-white" : "bg-white"}`}>
      {p.popular && <span className="absolute -top-3 left-7 bg-lime text-ink text-xs font-bold px-3 py-1 rounded-full">Más elegido</span>}
      <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${oscuro ? "text-lime" : "text-accent"}`}>{p.sub}</p>
      <h3 className="font-display font-bold text-3xl tracking-tight mt-1">Plan {p.nombre}</h3>
      <p className="mt-5">
        <span className="font-display font-bold text-[40px] tracking-tight leading-none">{fmt(p.mes)}</span>
        <span className={`text-sm ml-1 ${oscuro ? "text-white/60" : "text-text-muted"}`}>+ IVA / mes</span>
      </p>
      <p className={`text-sm mt-1 ${oscuro ? "text-white/60" : "text-text-muted"}`}>
        {p.profesionales === 1 ? "1 profesional" : "por local, profesionales ilimitados"}
      </p>
      <p className={`mt-5 leading-relaxed ${oscuro ? "text-white/80" : "text-text-secondary"}`}>{p.descripcion}</p>
      <ul className="mt-6 flex flex-col gap-3 flex-1">
        {p.destacados.map((d) => <li key={d} className="flex gap-3 text-[15px]">{CHECK(oscuro)}{d}</li>)}
      </ul>
      <a href={href}
        className={`mt-8 inline-flex justify-center items-center text-center font-semibold px-6 py-3.5 rounded-full transition-colors ${
          oscuro ? "bg-lime text-ink hover:bg-white" : "bg-ink text-white hover:bg-black"}`}>
        {p.ia ? `Probar ${PRUEBA.conIA} días con IA` : `Probar ${PRUEBA.sinIA} días gratis`}
      </a>
    </article>
    </Aparece>
  );
}

export default function Pricing({ conEnlace = true, conEncabezado = true }: { conEnlace?: boolean; conEncabezado?: boolean }) {
  return (
    <section id="precios" className="py-16 md:py-24 bg-mist scroll-mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        {conEncabezado && (
          <div className="max-w-3xl mb-10">
            <p className="eyebrow mb-4">Planes y precios</p>
            <h2 className="text-ink">Atiendes solo o con equipo. Con IA o sin IA.</h2>
            <p className="text-text-secondary text-lg mt-5 leading-relaxed">
              Todo el panel viene en todos los planes: agenda, reserva online, caja, clientes y el club en Wallet.
              Los planes de equipo cobran por local, no por silla, y ninguno cobra comisión por cita.
            </p>
            {/* Cómo se parte (21-10-2026): el alta principal es crear.synaptechspa.cl,
                con Syna encendido y 30 días con el asistente. La agenda sola, sin IA,
                en bioo (14 días). 26-10-2026: el plan Gratis ya no se publica. */}
            <p className="text-text-secondary mt-4 leading-relaxed">
              Creas tu agenda en <b className="text-ink">crear.synaptechspa.cl</b> con {PRUEBA.conIA} días gratis del plan {PRUEBA.plan} (son {fmt(PRUEBA.valor)} + IVA que no pagas),
              con el asistente respondiendo tu WhatsApp desde el primer día. ¿Solo quieres la agenda, sin IA? Pruébala {PRUEBA.sinIA} días
              en <b className="text-ink">bioo.cl/agenda</b>. Al terminar eliges tu plan; no se cobra nada solo.
            </p>
          </div>
        )}

        {/* Los dos ejes: filas = para quién, columnas = sin IA / con IA */}
        <div className="hidden md:grid grid-cols-[150px_1fr_1fr] gap-5 mb-3 text-sm font-semibold text-text-muted">
          <span />
          <span className="pl-2">Sin IA</span>
          <span className="pl-2">Con asistente IA</span>
        </div>
        <div className="grid md:grid-cols-[150px_1fr_1fr] gap-5 items-stretch">
          <div className="md:pt-8">
            <p className="font-display font-bold text-ink text-xl tracking-tight">Atiendes solo</p>
            <p className="text-sm text-text-muted mt-1">Barbero, estilista o manicurista independiente, también a domicilio.</p>
          </div>
          <TarjetaPlan p={INDEPENDIENTE} />
          <TarjetaPlan p={INDEPENDIENTE_IA} />

          <div className="md:pt-8 mt-6 md:mt-0">
            <p className="font-display font-bold text-ink text-xl tracking-tight">Tienes equipo</p>
            <p className="text-sm text-text-muted mt-1">Barberías, salones, estética y clínicas: profesionales ilimitados.</p>
          </div>
          <TarjetaPlan p={LOCAL} />
          <TarjetaPlan p={LOCAL_IA} />
        </div>

        {/* Todo Incluido: el ancla de valor */}
        <Aparece>
        <article id={`plan-${TODO_INCLUIDO.id}`} className="mt-5 rounded-[28px] bg-ink text-white p-7 sm:p-10 grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center scroll-mt-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-lime">{TODO_INCLUIDO.sub}</p>
            <h3 className="font-display font-bold text-3xl sm:text-4xl tracking-tight mt-1">Plan {TODO_INCLUIDO.nombre}</h3>
            <p className="mt-5">
              <span className="font-display font-bold text-[44px] tracking-tight leading-none">{fmt(TODO_INCLUIDO.mes)}</span>
              <span className="text-sm ml-1 text-white/60">+ IVA / mes, por local</span>
            </p>
            <p className="mt-3 text-white/70">
              Por separado serían {fmt(TODO_INCLUIDO_SEPARADO)}: <span className="text-lime font-semibold">ahorras {fmt(TODO_INCLUIDO_AHORRO)} al mes</span>.
            </p>
            <p className="mt-5 text-white/80 leading-relaxed">{TODO_INCLUIDO.descripcion}</p>
          </div>
          <div>
            <ul className="flex flex-col gap-3">
              {TODO_INCLUIDO.destacados.map((d) => <li key={d} className="flex gap-3 text-[15px]">{CHECK(true)}{d}</li>)}
            </ul>
            <a href={altaIA(`precios-${TODO_INCLUIDO.id}`)}
              className="mt-7 inline-flex justify-center items-center text-center font-semibold px-6 py-3.5 rounded-full bg-lime text-ink hover:bg-white transition-colors">
              {CTA_IA}
            </a>
          </div>
        </article>
        </Aparece>

        <p className="mt-5 text-sm text-text-muted">
          No pedimos tarjeta para la prueba.{" "}
          <a href={agendaSinIA("precios-sin-ia")} className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink">{CTA_SIN_IA}</a>
        </p>

        <div className="mt-6 rounded-[28px] bg-white p-6 sm:px-8 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <p className="text-text-secondary">
            <span className="font-semibold text-ink">Plan anual: {fmt(ANUAL.anio)} + IVA.</span>{" "}
            Todo el {ANUAL.base} pagando una vez al año: pagas {ANUAL.equivaleMeses} meses y usas 12.
          </p>
          {conEnlace && (
            <Link href="/precios" className="shrink-0 inline-flex items-center gap-2 font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink transition-colors">
              Ver todo lo que incluye cada plan →
            </Link>
          )}
        </div>
        <p className="text-sm text-text-muted mt-4">
          Precios netos en pesos chilenos; se suma IVA. ¿Dos o más locales? Hay precio de cadena desde {fmt(19900)} + IVA por local{" "}
          (<Link href="/precios#cadena" className="underline underline-offset-2 hover:text-ink">ver tramos</Link>), o{" "}
          <a href={A_MEDIDA_WA} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">te la armamos a medida</a>.
        </p>
      </div>
    </section>
  );
}

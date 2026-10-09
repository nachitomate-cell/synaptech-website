import Image from "next/image";
import Link from "next/link";
import type { Hilo as HiloT } from "@/content/comparar";

/* Un hilo "tipo foro": la pregunta (real, de las que nos hacen los dueños
   antes de cambiarse) y la respuesta del Equipo SynapTech con tabla, fuente y
   fecha. No hay usuarios inventados: las únicas voces de terceros son
   testimonios textuales de clientes reales (los mismos de la home). */

function Celda({ v }: { v: string | boolean | null }) {
  if (v === true) return <span className="text-accent font-semibold">Sí</span>;
  if (v === false) return <span className="text-text-muted">No</span>;
  if (v === null) return <span className="text-text-muted/70">No publicado</span>;
  return <span>{v}</span>;
}

export default function Hilo({ h }: { h: HiloT }) {
  return (
    <article id={h.id} className="scroll-mt-28 rounded-[24px] border border-border-subtle bg-white overflow-hidden">
      {/* Pregunta */}
      <header className="p-5 sm:p-7 flex gap-4">
        <span className="w-11 h-11 shrink-0 rounded-full bg-mist text-ink font-display font-bold text-lg flex items-center justify-center" aria-hidden>?</span>
        <div className="min-w-0">
          <p className="text-[13px] text-text-muted">
            {h.quien} · <span className="text-text-secondary">{h.etiquetas.join(" · ")}</span>
          </p>
          <h2 className="!text-[clamp(1.25rem,2.4vw,1.6rem)] !leading-snug !tracking-tight font-display font-bold text-ink mt-1">{h.pregunta}</h2>
        </div>
      </header>

      {/* Respuesta */}
      <div className="border-t border-border-subtle bg-mist/50 p-5 sm:p-7 flex gap-4">
        <span className="w-11 h-11 shrink-0 rounded-full bg-white border border-border-subtle flex items-center justify-center" aria-hidden>
          <Image src="/assets/synaptech-icon.png" alt="" width={26} height={26} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] text-text-muted flex items-center gap-1.5">
            <span className="font-semibold text-ink">Equipo SynapTech</span>
            <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor" aria-label="Cuenta oficial"><path d="M12 2l2.4 2.2 3.2-.4.9 3.1 2.9 1.5-1.2 3 1.2 3-2.9 1.5-.9 3.1-3.2-.4L12 22l-2.4-2.2-3.2.4-.9-3.1-2.9-1.5 1.2-3-1.2-3 2.9-1.5.9-3.1 3.2.4z" /><path d="M8.5 12.2l2.3 2.3 4.7-4.8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            · respondido el {h.fecha}
          </p>
          <div className="mt-3 space-y-3 text-text-secondary leading-relaxed">
            {h.parrafos.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {h.tabla && (
            <div className="mt-5 overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[560px] text-[14px] border-separate border-spacing-0 rounded-xl overflow-hidden border border-border-subtle bg-white">
                <thead>
                  <tr>
                    {h.tabla.columnas.map((c, i) => (
                      <th key={c} className={`text-left font-semibold px-3 py-2.5 border-b border-border-subtle ${i === h.tabla!.destacar ? "bg-ink text-white" : "bg-mist text-ink"}`}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {h.tabla.filas.map((f, r) => (
                    <tr key={r}>
                      {f.map((v, i) => (
                        <td key={i} className={`px-3 py-2.5 align-top border-b border-border-subtle ${i === 0 ? "font-medium text-ink" : "text-text-secondary"} ${i === h.tabla!.destacar ? "bg-lime/15" : ""}`}>
                          <Celda v={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {h.cierre && <p className="mt-4 font-semibold text-ink">{h.cierre}</p>}

          {h.enlace && (
            <Link href={h.enlace.href} className="inline-flex items-center gap-1.5 mt-4 font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink">
              {h.enlace.texto} →
            </Link>
          )}

          {h.fuentes.length > 0 && (
            <details className="mt-5 text-[13px] text-text-muted">
              <summary className="cursor-pointer select-none hover:text-ink">Fuentes y fecha de cada dato</summary>
              <ul className="mt-2 space-y-1 list-disc pl-5">
                {h.fuentes.map((f, i) => (
                  <li key={i}>
                    {f.url ? <a href={f.url} target="_blank" rel="noopener nofollow" className="underline underline-offset-2 hover:text-ink">{f.texto}</a> : f.texto}
                    {f.fecha && <> · consultado el {f.fecha}</>}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </div>

      {/* Voz de un cliente real (textual) */}
      {h.testimonio && (
        <div className="border-t border-border-subtle p-5 sm:p-7 flex gap-4">
          <span className="w-11 h-11 shrink-0 rounded-full bg-lime/30 text-ink font-bold text-sm flex items-center justify-center" aria-hidden>
            {h.testimonio.autor.split(/\s+/).slice(0, 2).map((x) => x[0]).join("")}
          </span>
          <div>
            <p className="text-[13px] text-text-muted"><span className="font-semibold text-ink">{h.testimonio.autor}</span> · {h.testimonio.rol} · cliente</p>
            <p className="mt-2 text-text-secondary leading-relaxed">“{h.testimonio.cita}”</p>
          </div>
        </div>
      )}
    </article>
  );
}

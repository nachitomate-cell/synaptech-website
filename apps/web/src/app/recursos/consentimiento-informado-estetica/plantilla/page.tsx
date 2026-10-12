import { metaPagina } from "@/lib/seo";
import { CONSENTIMIENTO_TRATAMIENTOS } from "@/content/guias";

/* Plantilla imprimible del consentimiento informado para estética (11-10-2026).
   De acá sale el PDF (public/recursos/consentimiento-informado-estetica.pdf,
   Playwright en A4) y la vista previa. El Word se genera aparte con el mismo
   texto (devtools/guias-panel/sitio-web/seo/consentimiento-docx.py). No se
   indexa: la página que posiciona es la guía. */
export const metadata = metaPagina({
  title: "Plantilla de consentimiento informado para estética (imprimible)",
  description: "Consentimiento informado para estética facial y corporal para imprimir, con anexos por tratamiento y autorización de fotografías.",
  path: "/recursos/consentimiento-informado-estetica/plantilla",
  noindex: true,
});

function Linea({ label, ancho = "flex-1" }: { label: string; ancho?: string }) {
  return (
    <div className={`${ancho} min-w-[110px]`}>
      <p className="text-[9px] uppercase tracking-[0.08em] text-[#555]">{label}</p>
      <div className="border-b border-[#999] h-5" />
    </div>
  );
}

function Fila({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-4 mt-2">{children}</div>;
}

function Casilla({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] flex items-start gap-1.5 mt-1"><span className="inline-block shrink-0 w-3 h-3 mt-[1px] border border-[#777]" /> <span>{children}</span></p>;
}

function Seccion({ n, titulo, children }: { n: number | string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-3 break-inside-avoid">
      <h2 className="!text-[13px] !leading-tight !tracking-normal font-bold bg-[#0F1A2B] text-white px-2 py-1">{n}. {titulo}</h2>
      <div className="px-1">{children}</div>
    </section>
  );
}

function Firmas() {
  return (
    <>
      <Fila><Linea label="Firma de la paciente" /><Linea label="RUT" ancho="w-36" /><Linea label="Fecha" ancho="w-28" /></Fila>
      <Fila><Linea label="Firma de la profesional" /><Linea label="Nombre y profesión" /></Fila>
    </>
  );
}

export default function PlantillaConsentimiento() {
  return (
    <main className="bg-white text-[#111] mx-auto max-w-[794px] px-10 py-10 print:p-0 text-[11px] leading-snug">
      <style dangerouslySetInnerHTML={{ __html: `@page { size: A4; margin: 14mm; } @media print { header, footer, .no-imprimir, [aria-label*="WhatsApp"], nextjs-portal { display: none !important; } .salto { break-before: page; } }` }} />
      <div className="flex items-end justify-between border-b-2 border-[#0F1A2B] pb-2">
        <div>
          <h1 className="!text-[20px] !leading-tight !tracking-tight font-bold">Consentimiento informado</h1>
          <p className="text-[10px] text-[#555]">Tratamientos estéticos faciales y corporales · Centro: ______________________________</p>
        </div>
        <p className="text-[9px] text-[#777] text-right">N.° de ficha: __________<br />Fecha: ____/____/______</p>
      </div>

      <Seccion n={1} titulo="Datos de la paciente">
        <Fila><Linea label="Nombre completo" /><Linea label="RUT" ancho="w-36" /></Fila>
        <Fila><Linea label="Fecha de nacimiento" ancho="w-36" /><Linea label="Teléfono" /><Linea label="Correo electrónico" /></Fila>
        <Fila><Linea label="Si es menor de edad: nombre y RUT de la madre, padre o tutor" /></Fila>
      </Seccion>

      <Seccion n={2} titulo="Tratamiento que se realizará">
        <Fila><Linea label="Tratamiento" /><Linea label="Zona" ancho="w-40" /></Fila>
        <Fila><Linea label="N.° de sesiones" ancho="w-32" /><Linea label="Frecuencia" ancho="w-32" /><Linea label="Profesional que lo realiza" /></Fila>
        <Fila><Linea label="En qué consiste y resultado esperado" /></Fila>
        <Fila><Linea label="Efectos posibles (ver anexo del tratamiento)" /></Fila>
        <Fila><Linea label="Alternativas, incluida la de no realizarlo" /></Fila>
      </Seccion>

      <Seccion n={3} titulo="Antecedentes que declaro">
        <div className="grid grid-cols-3 gap-x-4">
          {["Embarazo o lactancia", "Alergias (medicamentos, cosméticos, látex)", "Medicamentos actuales", "Isotretinoína en los últimos 6 meses", "Herpes recurrente", "Diabetes o problemas de cicatrización", "Marcapasos o implantes metálicos", "Enfermedad de la piel en la zona", "Tratamientos estéticos recientes"].map((i) => <Casilla key={i}>{i}</Casilla>)}
        </div>
        <Fila><Linea label="Detalle de lo marcado" /></Fila>
      </Seccion>

      <Seccion n={4} titulo="Declaración">
        <div className="mt-2 text-[10px] leading-relaxed space-y-1.5">
          <p>Declaro que se me explicó en palabras que entiendo en qué consiste el tratamiento, el resultado que se puede esperar,
            sus efectos posibles, las alternativas y los cuidados antes y después, y que pude hacer todas mis preguntas.</p>
          <p>Declaro que la información de mis antecedentes es verdadera y completa, y que avisaré cualquier cambio antes de cada sesión.
            Entiendo que no seguir los cuidados indicados puede cambiar el resultado.</p>
          <p>Sé que puedo decidir no continuar con el tratamiento en cualquier momento, avisándolo a la profesional.</p>
          <p className="font-semibold">Con esta información, autorizo el tratamiento descrito.</p>
        </div>
      </Seccion>

      <Seccion n={5} titulo="Fotografías de antes y después">
        <Casilla>Autorizo fotos solo para mi ficha y el seguimiento del tratamiento.</Casilla>
        <Casilla>Autorizo además su uso en redes sociales o publicidad del centro, sin mostrar mi nombre.</Casilla>
        <Casilla>No autorizo fotografías.</Casilla>
      </Seccion>

      <Seccion n={6} titulo="Firmas">
        <Firmas />
        <Fila><Linea label="Si es menor de edad: firma de la madre, padre o tutor" /></Fila>
      </Seccion>

      <div className="salto" />
      <div className="flex items-end justify-between border-b-2 border-[#0F1A2B] pb-2 mt-8 print:mt-0">
        <h1 className="!text-[17px] !leading-tight !tracking-tight font-bold">Anexo por tratamiento</h1>
        <p className="text-[9px] text-[#777] text-right">Paciente: ______________________________</p>
      </div>
      <p className="text-[9.5px] text-[#555] mt-2 leading-relaxed">
        Marca el anexo que corresponde y completa con tu técnica, tus productos y tu equipo. Los textos son ejemplos de lo
        que suele explicarse; la profesional los revisa y adapta.
      </p>
      {CONSENTIMIENTO_TRATAMIENTOS.map((t, i) => (
        <section key={t.id} className="mt-3 border border-[#bbb] px-2.5 py-2 break-inside-avoid">
          <p className="text-[11px] font-bold flex items-center gap-1.5"><span className="inline-block w-3 h-3 border border-[#777]" /> A{i + 1}. {t.nombre}</p>
          <p className="text-[9.5px] mt-1"><b>Efectos posibles:</b> {t.efectos}</p>
          <p className="text-[9.5px] mt-0.5"><b>Cuidados:</b> {t.cuidados}</p>
          {t.ojo && <p className="text-[9.5px] mt-0.5"><b>Antes de empezar:</b> {t.ojo}</p>}
          <div className="border-b border-[#bbb] h-4" />
        </section>
      ))}
      <section className="mt-3 border border-[#bbb] px-2.5 py-2 break-inside-avoid">
        <p className="text-[11px] font-bold flex items-center gap-1.5"><span className="inline-block w-3 h-3 border border-[#777]" /> A{CONSENTIMIENTO_TRATAMIENTOS.length + 1}. Otro tratamiento: ______________________</p>
        <div className="border-b border-[#bbb] h-5" /><div className="border-b border-[#bbb] h-5" />
      </section>
      <div className="mt-3"><Firmas /></div>

      <p className="mt-5 text-[8.5px] text-[#777] leading-relaxed">
        Plantilla de referencia de SynapTech (synaptechspa.cl/recursos/consentimiento-informado-estetica). No es asesoría legal:
        revisa con tu asesor lo que exige la normativa a tu tipo de establecimiento. Con SynapTech tu paciente acepta el
        consentimiento al reservar y queda guardado en su ficha.
      </p>
    </main>
  );
}

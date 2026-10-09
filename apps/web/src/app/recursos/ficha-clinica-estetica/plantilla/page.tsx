import { metaPagina } from "@/lib/seo";

/* Plantilla imprimible de la ficha clínica estética (09-10-2026). De acá sale
   el PDF descargable (public/recursos/ficha-clinica-estetica.pdf, generado con
   Playwright en A4). No se indexa: la página que posiciona es la guía. */
export const metadata = metaPagina({
  title: "Plantilla de ficha clínica estética (imprimible)",
  description: "Ficha clínica estética para imprimir: datos de la paciente, anamnesis, evaluación facial y corporal, consentimiento y evolución por sesión.",
  path: "/recursos/ficha-clinica-estetica/plantilla",
  noindex: true,
});

function Linea({ label, ancho = "flex-1" }: { label: string; ancho?: string }) {
  return (
    <div className={`${ancho} min-w-[120px]`}>
      <p className="text-[9px] uppercase tracking-[0.08em] text-[#555]">{label}</p>
      <div className="border-b border-[#999] h-6" />
    </div>
  );
}

function Fila({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-4 mt-2">{children}</div>;
}

function Casillas({ titulo, items }: { titulo: string; items: string[] }) {
  return (
    <div className="mt-3">
      <p className="text-[10px] font-semibold">{titulo}</p>
      <div className="grid grid-cols-3 gap-x-4 gap-y-1 mt-1">
        {items.map((i) => (
          <p key={i} className="text-[10px] flex items-center gap-1.5"><span className="inline-block w-3 h-3 border border-[#777]" /> {i}</p>
        ))}
      </div>
    </div>
  );
}

function Seccion({ n, titulo, children }: { n: number; titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 break-inside-avoid">
      <h2 className="!text-[13px] !leading-tight !tracking-normal font-bold bg-[#0F1A2B] text-white px-2 py-1">{n}. {titulo}</h2>
      <div className="px-1">{children}</div>
    </section>
  );
}

export default function PlantillaFicha() {
  return (
    <main className="bg-white text-[#111] mx-auto max-w-[794px] px-10 py-10 print:p-0 text-[11px] leading-snug">
      <style>{`@page { size: A4; margin: 14mm; } @media print { header, footer, .no-imprimir, [aria-label="WhatsApp"] { display: none !important; } }`}</style>
      <div className="flex items-end justify-between border-b-2 border-[#0F1A2B] pb-2">
        <div>
          <h1 className="!text-[20px] !leading-tight !tracking-tight font-bold">Ficha clínica estética</h1>
          <p className="text-[10px] text-[#555]">Facial y corporal · Nombre del centro: ______________________________</p>
        </div>
        <p className="text-[9px] text-[#777] text-right">N.° de ficha: __________<br />Fecha de apertura: ____/____/______</p>
      </div>

      <Seccion n={1} titulo="Datos de la paciente">
        <Fila><Linea label="Nombre completo" /><Linea label="RUT" ancho="w-40" /></Fila>
        <Fila><Linea label="Fecha de nacimiento" ancho="w-40" /><Linea label="Edad" ancho="w-16" /><Linea label="Ocupación" /></Fila>
        <Fila><Linea label="Teléfono" /><Linea label="Correo electrónico" /></Fila>
        <Fila><Linea label="Dirección" /><Linea label="Contacto de emergencia" /></Fila>
        <Fila><Linea label="Motivo de consulta" /></Fila>
      </Seccion>

      <Seccion n={2} titulo="Anamnesis (antecedentes de salud)">
        <Casillas titulo="Marca lo que corresponda" items={["Embarazo o lactancia", "Diabetes", "Hipertensión", "Problemas cardíacos o marcapasos", "Epilepsia", "Problemas de coagulación", "Enfermedad autoinmune", "Cáncer (actual o previo)", "Herpes recurrente", "Implantes o prótesis metálicas", "Cirugías recientes", "Tratamiento con isotretinoína"]} />
        <Fila><Linea label="Alergias (medicamentos, cosméticos, látex, alimentos)" /></Fila>
        <Fila><Linea label="Medicamentos que toma actualmente" /></Fila>
        <Fila><Linea label="Tratamientos estéticos anteriores y fechas" /></Fila>
        <Fila><Linea label="Hábitos: tabaco / alcohol / exposición al sol / protector solar" /></Fila>
      </Seccion>

      <Seccion n={3} titulo="Evaluación facial">
        <Casillas titulo="Fototipo (escala de Fitzpatrick)" items={["I", "II", "III", "IV", "V", "VI"]} />
        <Casillas titulo="Tipo de piel" items={["Normal", "Seca", "Grasa", "Mixta", "Sensible", "Deshidratada"]} />
        <Casillas titulo="Observaciones" items={["Acné", "Manchas / melasma", "Rosácea", "Cicatrices", "Líneas de expresión", "Poros dilatados"]} />
        <Fila><Linea label="Notas de la evaluación" /></Fila>
      </Seccion>

      <Seccion n={4} titulo="Evaluación corporal">
        <Fila><Linea label="Peso (kg)" ancho="w-24" /><Linea label="Talla (cm)" ancho="w-24" /><Linea label="Cintura (cm)" ancho="w-24" /><Linea label="Abdomen (cm)" ancho="w-24" /><Linea label="Cadera (cm)" ancho="w-24" /></Fila>
        <Fila><Linea label="Muslo D / I (cm)" ancho="w-32" /><Linea label="Brazo D / I (cm)" ancho="w-32" /><Linea label="Zonas a tratar" /></Fila>
        <Casillas titulo="Observaciones" items={["Celulitis", "Flacidez", "Adiposidad localizada", "Estrías", "Retención de líquidos", "Várices"]} />
      </Seccion>

      <Seccion n={5} titulo="Plan de tratamiento">
        <Fila><Linea label="Tratamiento indicado" /><Linea label="N.° de sesiones" ancho="w-28" /><Linea label="Frecuencia" ancho="w-28" /></Fila>
        <Fila><Linea label="Indicaciones para la casa" /></Fila>
      </Seccion>

      <Seccion n={6} titulo="Consentimiento informado">
        <p className="mt-2 text-[10px] leading-relaxed">
          Declaro que la información entregada es verdadera, que se me explicaron el tratamiento, sus posibles
          efectos y cuidados posteriores, y que pude hacer todas mis preguntas. Autorizo el tratamiento descrito
          en esta ficha.
        </p>
        <Casillas titulo="Fotografías antes y después" items={["Autorizo fotos solo para mi ficha", "Autorizo su uso con fines de difusión", "No autorizo fotos"]} />
        <Fila><Linea label="Firma de la paciente" /><Linea label="Fecha" ancho="w-32" /><Linea label="Profesional que atiende" /></Fila>
      </Seccion>

      <Seccion n={7} titulo="Evolución por sesión">
        <table className="w-full mt-2 border-collapse text-[10px]">
          <thead>
            <tr>{["Fecha", "Tratamiento / zona", "Parámetros y productos", "Observaciones y reacción", "Firma"].map((h) => <th key={h} className="border border-[#999] px-1.5 py-1 text-left font-semibold bg-[#F4F5F1]">{h}</th>)}</tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i}>{Array.from({ length: 5 }).map((__, j) => <td key={j} className="border border-[#999] h-7" />)}</tr>
            ))}
          </tbody>
        </table>
      </Seccion>

      <p className="mt-6 text-[8.5px] text-[#777] leading-relaxed">
        Plantilla de referencia de SynapTech (synaptechspa.cl/recursos/ficha-clinica-estetica). Adáptala a los
        tratamientos de tu centro y revisa con tu asesor lo que exige la normativa a tu tipo de establecimiento.
        Con SynapTech la llevas digital: alergias destacadas, evolución por sesión y consentimiento al reservar.
      </p>
    </main>
  );
}

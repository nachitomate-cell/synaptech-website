import Link from "next/link";
import Header       from "@/components/Header";
import Footer       from "@/components/Footer";
import Recorrido    from "@/components/Recorrido";
import Cambiate     from "@/components/Cambiate";
import Pricing      from "@/components/Pricing";
import CtaFinal     from "@/components/CtaFinal";
import { HeroRubro, Dolores, type Dolor } from "@/components/Rubro";
import { MODULOS_CLINICA } from "@/content/recorrido";
import { metaPagina } from "@/lib/seo";
import FaqSeo from "@/components/FaqSeo";
import { FAQ_CLINICAS } from "@/content/faq-rubros";

export const metadata = metaPagina({
  title: "Software para clínicas estéticas en Chile | SynapTech",
  description: "Agenda online con RUT y consentimiento informado, abono con Mercado Pago, ficha clínica con evolución por sesión y asistente con IA por WhatsApp.",
  path: "/clinicas",
});

/* Página de clínicas (09-10-2026). Todo lo que dice está verificado en el
   código: devtools/guias-panel/sitio-web/clinica/INVENTARIO.md.
   No promete: más de un recordatorio por WhatsApp, Isapre/Fonasa, boleta
   exenta ni adjuntos PDF en la ficha (no existen). */
const DOLORES: Dolor[] = [
  { dolor: "Responder mensajes todo el día en vez de atender", solucion: "Syna responde y agenda", detalle: "El asistente con IA contesta por cada tratamiento, pide nombre completo y RUT, y deja la hora agendada en el WhatsApp de tu clínica." },
  { dolor: "Pedir los datos del paciente a mano", solucion: "Reserva con todos sus datos", detalle: "Nombre, apellidos, edad y RUT con dígito verificador, directo a la ficha." },
  { dolor: "Consentimientos en papel", solucion: "Consentimiento antes de agendar", detalle: "El paciente acepta tu consentimiento informado al reservar, y puede firmar en pantalla en la clínica." },
  { dolor: "Pacientes que no llegan a un tratamiento caro", solucion: "Abono y recordatorio", detalle: "Un abono con Mercado Pago al reservar, confirmación y recordatorio por WhatsApp y correo." },
  { dolor: "Historias clínicas en cuadernos", solucion: "Ficha clínica digital", detalle: "Alergias destacadas, notas del equipo y la evolución de cada sesión, imprimible en PDF." },
  { dolor: "Indicaciones que se olvidan después de la sesión", solucion: "Avisos a los pacientes", detalle: "Indicaciones post-atención y aviso de control, enviados por la plataforma." },
];

const YA_LO_USAN = [
  { id: "tinkay", nombre: "Tinkay Estética y Salud", donde: "Rancagua", fondo: "#fefefe" },
  { id: "clinicalglow", nombre: "Clinical Glow · Clínica Estética", donde: "Viña del Mar", fondo: "#ffffff" },
];

export default function ClinicasPage() {
  return (
    <>
      <Header />
      <main>
        <HeroRubro
          eyebrow="Para clínicas estéticas, kinesiología y salud"
          titulo="Software para clínicas estéticas: agenda, ficha y consentimiento."
          bajada="Reserva online con RUT y consentimiento informado, abono con Mercado Pago, ficha clínica por paciente y un asistente con IA que agenda por WhatsApp."
          origen="clinicas-hero"
          mensajeWa="Hola, tengo una clínica y quiero conocer SynapTech"
          escritorio={{ src: "/panel/clinica-agenda.webp", alt: "Agenda del día de una clínica con kinesióloga, cosmetóloga y médico estético", w: 2880, h: 1800 }}
          celular={{ src: "/panel/clinica-reserva-tema.webp", alt: "Reserva de pacientes: tratamientos por especialidad", w: 780, h: 1688 }}
        />

        <section className="pb-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="rounded-[24px] border border-border-subtle p-5 sm:p-6 flex flex-col md:flex-row md:items-center gap-5 justify-between">
              <p className="font-semibold text-ink">Clínicas que ya trabajan con SynapTech</p>
              <div className="flex flex-wrap gap-3">
                {YA_LO_USAN.map((c) => (
                  <Link key={c.id} href="/locales" className="flex items-center gap-3 rounded-full border border-border-subtle pl-1.5 pr-4 py-1.5 hover:border-ink transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/directorio-logos/${c.id}-pin.webp`} alt="" width={40} height={40} className="w-10 h-10 rounded-full" style={{ backgroundColor: c.fondo }} />
                    <span className="text-sm"><span className="font-semibold text-ink">{c.nombre}</span> <span className="text-text-muted">· {c.donde}</span></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Dolores titulo="Lo que más se repite en una clínica, resuelto." items={DOLORES} />

        {MODULOS_CLINICA.map((m, i) => (
          <section key={m.id} id={m.id} className={`py-16 md:py-24 scroll-mt-20 ${i % 2 ? "bg-mist" : ""}`}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
              <div className="max-w-3xl mb-6">
                <p className="eyebrow mb-3">{String(i + 1).padStart(2, "0")} · {m.nombre}</p>
                <h2 className="text-ink">{m.titular}</h2>
                <p className="text-text-secondary text-lg mt-4 leading-relaxed">{m.bajada}</p>
              </div>
              <Recorrido modulo={m} />
            </div>
          </section>
        ))}

        <section className="py-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="text-sm text-text-muted max-w-3xl">
              La ficha clínica, la evolución por sesión y los avisos a pacientes vienen en el rubro clínica, que dejamos
              configurado al crear tu cuenta. Las capturas son de una clínica de ejemplo con datos inventados.
            </p>
            <Link href="/recursos/ficha-clinica-estetica" className="inline-flex items-center gap-1.5 mt-4 font-semibold text-ink border-b-2 border-lime pb-0.5 hover:border-ink">
              Descarga gratis una ficha clínica estética en PDF →
            </Link>
          </div>
        </section>

        <Cambiate />
        <FaqSeo titulo="Software para clínicas estéticas: lo que más nos preguntan." preguntas={FAQ_CLINICAS} />
        <Pricing />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

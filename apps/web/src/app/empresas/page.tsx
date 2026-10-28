import Image from "next/image";
import Link from "next/link";
import Header       from "@/components/Header";
import Footer       from "@/components/Footer";
import FaqSeo, { type Pregunta } from "@/components/FaqSeo";
import VideoSyna    from "@/components/VideoSyna";
import FormEmpresas from "@/components/FormEmpresas";
import { waLink } from "@/content/catalogo";
import { metaPagina } from "@/lib/seo";

/* Página para empresas (28-10-2026). Sale de la reunión de CORFO del 27-10:
   muchas empresas buscan "agentes de IA flexibles" para su negocio. La página
   los recibe con el mismo motor de Syna, presentado como un menú de
   habilidades que se encienden, no como desarrollo a medida. Cada habilidad
   está en content/catalogo.ts o content/recorrido.ts (lo que hace hoy); lo
   que no está ahí no se promete. El formulario filtra: rubro, tamaño, canales
   y volumen, y llega a hola@ con el asunto [Empresas]. */
export const metadata = metaPagina({
  title: "Agentes de IA para empresas, en WhatsApp e Instagram | SynapTech",
  description: "Un agente de IA que atiende, agenda, cobra y hace seguimiento en los canales de tu empresa, con tu información y tus reglas. Precio mensual cerrado.",
  path: "/empresas",
});

type Habilidad = { titulo: string; detalle: string };

const HABILIDADES: Habilidad[] = [
  { titulo: "Atiende en tus canales", detalle: "WhatsApp desde el número de tu empresa, por la API oficial de Meta, e Instagram. De día, de noche y los domingos." },
  { titulo: "Responde con tu información", detalle: "Tu catálogo, tus precios, tus horarios y tus políticas. No inventa: si no está en lo que le diste, no lo dice." },
  { titulo: "Agenda y reagenda", detalle: "Ofrece las horas que de verdad están libres, por profesional o por sede, y deja la cita en la agenda." },
  { titulo: "Pide los datos que necesitas", detalle: "Nombre, RUT, correo o lo que tú definas, en el orden que elijas, antes de confirmar." },
  { titulo: "Cobra", detalle: "Abonos y pagos online con Mercado Pago, y el cobro del mesón con la máquina TUU, dentro de la misma ficha." },
  { titulo: "Cotiza y sigue a los interesados", detalle: "Arma la cotización con tu catálogo, la reparte entre tu equipo de ventas y retoma a quien dejó de responder." },
  { titulo: "Recuerda y confirma", detalle: "Confirmación, recordatorio y la cita en el calendario del cliente, sin que nadie lo haga a mano." },
  { titulo: "Pasa la conversación a una persona", detalle: "Si algo se complica o es un tema que no quieres delegar, avisa a tu equipo y se lo deja en sus manos." },
  { titulo: "Te muestra los números", detalle: "Conversaciones, reservas, ventas y ocupación, por persona y por período, en el panel." },
];

const PASOS = [
  { n: "01", titulo: "Nos cuentas qué quieres delegar", detalle: "Atención, agenda, cobros, ventas o todo junto. Con eso vemos qué habilidades encender." },
  { n: "02", titulo: "Lo preparamos con tu información", detalle: "Tu catálogo, tus horarios, tus reglas y el tono con que hablas a tus clientes." },
  { n: "03", titulo: "Lo conectas a tus canales", detalle: "El número de WhatsApp de tu empresa y tu Instagram. Tu equipo sigue viendo todo en una bandeja." },
  { n: "04", titulo: "Sale a trabajar", detalle: "Tu equipo toma cualquier conversación cuando quiere, y ajustas lo que el agente dice desde el panel." },
];

const RUBROS = [
  { nombre: "Clínicas y centros de salud", href: "/clinicas" },
  { nombre: "Centros de estética", href: "/estetica" },
  { nombre: "Estudios de pilates y yoga", href: "/pilates" },
  { nombre: "Agencias y equipos de venta", href: "/agencias" },
  { nombre: "Barberías y peluquerías", href: "/barberias" },
  { nombre: "Veterinarias y peluquerías de mascotas", href: "/mascotas" },
];

const FAQ: Pregunta[] = [
  { q: "¿Es un chatbot de respuestas fijas?", a: "No. Es un agente con IA que entiende lo que le escriben, consulta tu agenda y tu catálogo, y hace la tarea: agenda, cobra, cotiza o pasa la conversación a tu equipo. Funciona con Claude, de Anthropic." },
  { q: "¿Escribe desde el número de mi empresa?", a: "Sí. Se conecta al WhatsApp de tu empresa por la API oficial de Meta, y también a tu Instagram. Tus clientes le escriben al mismo número de siempre." },
  { q: "¿Qué pasa si no sabe responder algo?", a: "Avisa a tu equipo y deja la conversación en sus manos. Tú decides qué temas no delega nunca." },
  { q: "¿Se conecta con el sistema que ya usamos?", a: "La agenda, los cobros y la ficha de cada cliente vienen incluidos, así que la mayoría de las empresas no necesita conectar nada. Si usas otro sistema, cuéntanoslo en el formulario y te decimos qué se puede hacer." },
  { q: "¿Cuánto cuesta?", a: "Un precio mensual cerrado, según los canales y las habilidades que enciendas. No cobramos por hora. Te lo mandamos por escrito después de ver lo que necesitas." },
  { q: "¿Qué pasa con los datos de mis clientes?", a: "Son tuyos. Quedan en tu cuenta, solo los ve tu equipo y el agente los usa para atender a ese cliente, nada más." },
];

export default function EmpresasPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[1fr_1.08fr] gap-12 items-center">
            <div>
              <p className="eyebrow mb-5">Para empresas</p>
              <h1 className="text-ink mb-6 !text-[clamp(2.4rem,5vw,4.5rem)]">Un agente de IA que trabaja en tu empresa.</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-8">
                Atiende a tus clientes por WhatsApp e Instagram, agenda, cobra y hace seguimiento,
                con tu información y tus reglas. Tu equipo toma la conversación cuando quiere.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#cuentanos"
                  className="inline-flex justify-center items-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
                  Cuéntanos qué quieres delegar
                </a>
                <a href={waLink("Hola, vengo de la página de empresas y quiero ver el agente de IA de SynapTech")} target="_blank" rel="noopener noreferrer"
                  className="inline-flex justify-center items-center border border-ink/15 text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
                  Hablar por WhatsApp
                </a>
              </div>
              <p className="mt-4 text-sm text-text-muted">Precio mensual cerrado. Sin cobro por hora.</p>
            </div>
            <div className="hero-entra rounded-[28px] bg-lime/20 p-2.5 sm:p-4">
              <Image src="/panel/clinica-asistente.webp" alt="Bandeja con el agente pidiendo datos y agendando a una clienta por WhatsApp"
                width={2880} height={1800} priority sizes="(min-width: 1024px) 620px, 92vw"
                className="w-full h-auto rounded-xl border border-border-subtle shadow-card-hover" />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-[#05080D] px-4 sm:px-6">
          <VideoSyna oscuro titulo="Mírala trabajar." bajada="Syna responde, ofrece horas reales y deja la tarea hecha, desde el número de la empresa." />
        </section>

        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Habilidades</p>
              <h2 className="text-ink">Enciendes lo que tu empresa necesita.</h2>
              <p className="text-text-secondary text-lg mt-4 leading-relaxed">
                Un mismo agente, con las tareas que le quieras dar. Partes con una y sumas otras cuando quieras.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {HABILIDADES.map((h) => (
                <article key={h.titulo} className="rounded-[28px] bg-white p-7">
                  <h3 className="font-display font-bold text-ink text-xl tracking-tight flex gap-2.5">
                    <span className="w-6 h-6 shrink-0 mt-0.5 rounded-full bg-lime flex items-center justify-center">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden><path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    {h.titulo}
                  </h3>
                  <p className="text-text-secondary mt-3 leading-relaxed">{h.detalle}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Cómo parte</p>
              <h2 className="text-ink">De la conversación al agente trabajando.</h2>
            </div>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PASOS.map((p) => (
                <li key={p.n} className="rounded-[28px] border border-border-subtle p-7">
                  <p className="font-mono text-sm text-text-muted">{p.n}</p>
                  <h3 className="font-display font-bold text-ink text-xl tracking-tight mt-3">{p.titulo}</h3>
                  <p className="text-text-secondary mt-3 leading-relaxed">{p.detalle}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="rounded-[28px] bg-ink text-white p-7 sm:p-10 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
              <div>
                <p className="text-lime text-xs font-bold uppercase tracking-[0.12em]">Ya funcionando</p>
                <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mt-2">
                  Más de 60 locales y sedes en 5 países atienden con Syna y la plataforma de SynapTech.
                </h3>
                <p className="text-white/70 leading-relaxed mt-4">
                  Más de 5.000 conversaciones por WhatsApp y más de 23.000 reservas agendadas, medido el 26 de octubre de 2026.
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {RUBROS.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="text-white/85 hover:text-lime border-b border-white/15 hover:border-lime pb-0.5 transition-colors">{r.nombre} →</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <FormEmpresas />

        <FaqSeo titulo="Agentes de IA para empresas: lo que más nos preguntan." preguntas={FAQ} />
      </main>
      <Footer />
    </>
  );
}

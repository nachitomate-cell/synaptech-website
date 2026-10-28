import Image from "next/image";
import Link from "next/link";
import Header        from "@/components/Header";
import Footer        from "@/components/Footer";
import FaqSeo, { type Pregunta } from "@/components/FaqSeo";
import VideoSyna     from "@/components/VideoSyna";
import FormEmpresas  from "@/components/FormEmpresas";
import AreasEmpresas from "@/components/AreasEmpresas";
import DemoEmpresa   from "@/components/DemoEmpresa";
import BotonSyna     from "@/components/BotonSyna";
import { metaPagina } from "@/lib/seo";

/* Página para empresas (28-10-2026). Sale de la reunión de CORFO del 27-10:
   muchas empresas buscan "agentes de IA flexibles" para su negocio. La página
   los recibe con el mismo motor de Syna, ordenado por lo que la empresa
   quiere delegar (ventas, atención, agenda, cobros) y no por rubro, para que
   cualquier empresa se vea ahí. Es un producto que se configura, no
   desarrollo a medida: cada cosa que dice está en content/catalogo.ts o
   content/recorrido.ts, y lo que no está ahí no se promete. El formulario
   llega a hola@ con el asunto [Empresas]. */
export const metadata = metaPagina({
  title: "Agente de IA para empresas en WhatsApp e Instagram | SynapTech",
  description: "Un agente de IA que vende, atiende, agenda y cobra por WhatsApp e Instagram, con la información y las reglas de tu empresa. Precio mensual cerrado.",
  path: "/empresas",
});

type Ajuste = { titulo: string; detalle: string };

/* Lo que la empresa ajusta sin programar: es lo que hace "flexible" al agente. */
const AJUSTES: Ajuste[] = [
  { titulo: "Lo que sabe", detalle: "Tu catálogo, tus precios y tus políticas. Pegas tu lista y la IA arma el catálogo." },
  { titulo: "Lo que pregunta", detalle: "Los datos que necesitas, en el orden que elijas, antes de confirmar nada." },
  { titulo: "Lo que no toca", detalle: "Los temas que no delegas nunca: el agente se los pasa a tu equipo." },
  { titulo: "A quién le responde", detalle: "Por cliente: responde el agente, respondes tú, o el agente no le escribe nunca." },
  { titulo: "Quién recibe cada conversación", detalle: "Reparto por turnos entre tu equipo, y cada uno ve solo lo suyo." },
  { titulo: "Cómo habla", detalle: "El tono de tu empresa, más cercano o más formal, desde el número de siempre." },
];

const RUBROS: { nombre: string; href?: string }[] = [
  { nombre: "Clínicas y salud", href: "/clinicas" },
  { nombre: "Turismo y agencias", href: "/agencias" },
  { nombre: "Estudios y gimnasios", href: "/pilates" },
  { nombre: "Estética y belleza", href: "/estetica" },
  { nombre: "Alimentos" },
  { nombre: "Logística" },
  { nombre: "Agencias digitales" },
  { nombre: "Inmobiliarias" },
  { nombre: "Educación y academias" },
  { nombre: "Servicios técnicos" },
];

const FAQ: Pregunta[] = [
  { q: "¿Sirve para mi rubro?", a: "Si tus clientes te escriben por WhatsApp o Instagram para preguntar, cotizar, agendar o pagar, sí. El agente se configura con tu información y tus reglas. Cuéntanos tu caso en el formulario y te decimos cómo se vería en tu empresa." },
  { q: "¿Es un chatbot de respuestas fijas?", a: "No. Es un agente con IA que entiende lo que le escriben, consulta tu catálogo y tu agenda, y hace la tarea: cotiza, agenda, cobra o pasa la conversación a tu equipo. Funciona con Claude, de Anthropic." },
  { q: "¿Escribe desde el número de mi empresa?", a: "Sí. Se conecta al WhatsApp de tu empresa por la API oficial de Meta, y también a tu Instagram. Tus clientes le escriben al mismo número de siempre." },
  { q: "¿Qué pasa si no sabe responder algo?", a: "Avisa a tu equipo y deja la conversación en sus manos. Tú decides qué temas no delega nunca." },
  { q: "¿Puede hacer tareas internas o conectarse con mi sistema?", a: "Hoy el agente trabaja de cara a tus clientes, y trae incluidos la agenda, los cobros y la ficha de cada cliente, así que la mayoría de las empresas no necesita conectar nada. Si necesitas otra cosa, cuéntanoslo en el formulario y te decimos qué se puede hacer." },
  { q: "¿Cuánto cuesta?", a: "Un precio mensual cerrado, según los canales y las áreas que actives. No cobramos por hora. Te lo mandamos por escrito después de ver lo que necesitas." },
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
              <p className="eyebrow mb-5">Agentes de IA para empresas</p>
              <h1 className="text-ink mb-6 !text-[clamp(2.4rem,5vw,4.5rem)]">Un agente de IA que vende, atiende y agenda por tu empresa.</h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mb-8">
                Responde a tus clientes por WhatsApp e Instagram con tu información y tus reglas,
                cotiza, agenda, cobra y le pasa a tu equipo lo que necesita una persona.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <BotonSyna className="whitespace-nowrap inline-flex justify-center items-center gap-2.5 bg-ink text-white font-semibold pl-3 pr-7 py-3 rounded-full hover:bg-black transition-colors">
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <Image src="/assets/synaptech-icon.png" alt="" width={20} height={20} />
                  </span>
                  Prueba a Syna
                </BotonSyna>
                <a href="#demo"
                  className="inline-flex justify-center items-center border border-ink/15 text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
                  Mírala atender a un cliente
                </a>
              </div>
              <p className="mt-4 text-sm text-text-muted">
                Conversa con ella: cuéntale de tu empresa y te dice cómo te ayudaría. Precio mensual cerrado, sin cobro por hora.{" "}
                <a href="#cuentanos" className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink">Cuéntanos qué quieres delegar</a>
              </p>
            </div>
            <div className="hero-entra rounded-[28px] bg-lime/20 p-2.5 sm:p-4">
              <Image src="/panel/agencia-bandeja.webp" alt="Bandeja con conversaciones de WhatsApp e Instagram atendidas por el agente y el equipo de ventas"
                width={2880} height={1800} priority sizes="(min-width: 1024px) 620px, 92vw"
                className="w-full h-auto rounded-xl border border-border-subtle shadow-card-hover" />
            </div>
          </div>
        </section>

        <AreasEmpresas />

        <DemoEmpresa />

        <section className="py-16 md:py-24 bg-[#05080D] px-4 sm:px-6">
          <VideoSyna oscuro titulo="Mírala trabajar." bajada="Syna responde, ofrece horas reales y deja la tarea hecha, desde el número de la empresa." />
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Se adapta a ti</p>
              <h2 className="text-ink">Tu empresa pone las reglas. El agente las sigue.</h2>
              <p className="text-text-secondary text-lg mt-4 leading-relaxed">
                Se configura con tu información desde el primer día, sin programar nada.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {AJUSTES.map((a) => (
                <article key={a.titulo} className="rounded-[28px] border border-border-subtle p-7">
                  <h3 className="font-display font-bold text-ink text-xl tracking-tight">{a.titulo}</h3>
                  <p className="text-text-secondary mt-3 leading-relaxed">{a.detalle}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="rounded-[28px] bg-ink text-white p-7 sm:p-10 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
              <div>
                <p className="text-lime text-xs font-bold uppercase tracking-[0.12em]">Ya funcionando</p>
                <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mt-2">
                  Más de 60 empresas y sedes en 5 países ya atienden con Syna.
                </h3>
                <p className="text-white/70 leading-relaxed mt-4">
                  Clínicas, una agencia de turismo con su equipo de ventas, un estudio de pilates con 7 sedes,
                  centros de estética y más. Más de 5.000 conversaciones por WhatsApp y más de 23.000 reservas,
                  medido el 26 de octubre de 2026.
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {RUBROS.map((r) => (
                  <li key={r.nombre}>
                    {r.href ? (
                      <Link href={r.href} className="text-white/85 hover:text-lime border-b border-white/15 hover:border-lime pb-0.5 transition-colors">{r.nombre} →</Link>
                    ) : (
                      <a href="#cuentanos" className="text-white/60 hover:text-lime transition-colors">{r.nombre}</a>
                    )}
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

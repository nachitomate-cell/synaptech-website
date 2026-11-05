import Header   from "@/components/Header";
import Footer   from "@/components/Footer";
import { metaPagina } from "@/lib/seo";
import type { ReactNode } from "react";

export const metadata = metaPagina({
  title: "Empresa: Synaptech SpA, SaaS con IA sobre Google Cloud",
  description: "Synaptech SpA (RUT 78.402.009-6, Viña del Mar, Chile) hace un solo producto: software por suscripción con IA para locales de servicios en Latinoamérica, construido sobre Google Cloud.",
  path: "/empresa",
});

/* Ficha de la empresa para quien la evalúa (programas de startups, bancos,
   partners), en español y en inglés. /nosotros cuenta la historia; esta da
   los datos duros. Cifras medidas el 03-11-2026, solo lectura:
     · Locales y países: `_indices/tenantsOperativos` sin bajas, sin demos ni
       cuentas internas (práctica, ventas, KXS espejo) → 90 locales; 66 con
       citas en los últimos 30 días (CL 47, MX 7, PE 6, CO 4, AR 2).
     · Citas: count() por local. 18.748 con fecha en los últimos 30 días;
       185.985 en total, incluido el historial que trajeron de su sistema
       anterior al migrar.
     · Google Cloud, octubre 2026, export de facturación en BigQuery:
       15.377.307 invocaciones de Cloud Run functions, 118.838.072 lecturas de
       Firestore (Santiago), Gemini 2.5 Flash / Flash Lite en Vertex AI.
   Se redondean hacia abajo. Las functions corren en us-central1; lo que vive
   en Santiago es la base de datos: no escribir "todo en Santiago". */

const NUMEROS = [
  { v: "66", l: "locales con citas en los últimos 30 días", en: "businesses active in the last 30 days" },
  { v: "5", l: "países: Chile, México, Perú, Colombia y Argentina", en: "countries" },
  { v: "+18.000", l: "citas en los últimos 30 días", en: "appointments in the last 30 days" },
  { v: "+15 M", l: "invocaciones de Cloud Run al mes", en: "Cloud Run invocations per month" },
];

const STACK = [
  { t: "Cloud Run functions", d: "Más de 500 funciones: la API de cada local, los webhooks de WhatsApp, Instagram y pagos, y más de 80 tareas de Cloud Scheduler (recordatorios, cobros, conciliación diaria). Más de 15 millones de invocaciones en octubre de 2026." },
  { t: "Firestore en Santiago", d: "La base de datos en tiempo real de todos los locales (agenda, fichas de clientes, ventas, fidelización) vive en la región southamerica-west1, en Chile. Más de 118 millones de lecturas en octubre." },
  { t: "Vertex AI · Gemini", d: "Gemini 2.5 Flash y Flash Lite en producción para entender audios, imágenes y video que los clientes mandan al local, y para el asistente que agenda por WhatsApp." },
  { t: "Speech-to-Text y Text-to-Speech", d: "Transcripción de notas de voz de WhatsApp y respuestas con voz (Chirp 3 HD)." },
  { t: "BigQuery", d: "Analítica de costos de la plataforma sobre el export de facturación de Google Cloud." },
  { t: "Pub/Sub, Secret Manager, Cloud Storage", d: "Mensajería entre servicios, llaves de cada integración y archivos." },
];

const DATOS: [string, ReactNode][] = [
  ["Razón social · Legal name", "Synaptech SpA"],
  ["RUT · Tax ID", "78.402.009-6"],
  ["Constituida · Incorporated", "15 de abril de 2026 · April 15, 2026"],
  ["Domicilio · Location", "Viña del Mar, Región de Valparaíso, Chile"],
  ["Modelo · Business model", "Suscripción mensual a precio público · SaaS subscription"],
  ["Financiamiento · Funding", "Sin inversionistas · Bootstrapped"],
  ["Fundador · Founder", <a key="li" href="https://www.linkedin.com/in/ignacio-mateluna-b46a87441/" target="_blank" rel="noopener noreferrer" className="text-ink font-semibold hover:text-accent">Ignacio Mateluna (LinkedIn)</a>],
  ["Perfiles públicos · Public profiles", <span key="pp" className="flex flex-wrap gap-x-4 gap-y-1"><a href="https://www.crunchbase.com/organization/synaptech-efb4" target="_blank" rel="noopener noreferrer" className="text-ink font-semibold hover:text-accent">Crunchbase</a><a href="https://apps.apple.com/cl/app/synaptech-studio/id6794530086" target="_blank" rel="noopener noreferrer" className="text-ink font-semibold hover:text-accent">App Store</a><a href="https://play.google.com/store/apps/details?id=cl.synaptechspa.studio" target="_blank" rel="noopener noreferrer" className="text-ink font-semibold hover:text-accent">Google Play</a></span>],
  ["Producto · Product", <a key="pr" href="/producto" className="text-ink font-semibold hover:text-accent">La plataforma por dentro · Product screenshots</a>],
  ["Correo · Email", <a key="m" href="mailto:hola@synaptechspa.cl" className="text-ink font-semibold hover:text-accent">hola@synaptechspa.cl</a>],
];

export default function EmpresaPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-28 md:pt-36 pb-14">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <p className="eyebrow mb-5">Empresa · Company</p>
            <h1 className="text-ink max-w-5xl">Un solo producto: software con IA para locales de servicios, sobre Google Cloud.</h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
              Synaptech SpA hace una plataforma multi-local de agenda online, asistente con IA
              en WhatsApp e Instagram, club de fidelización, cobros y boletas. Los locales se dan
              de alta solos y pagan una suscripción mensual a precio público.
            </p>
          </div>
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 border-y border-border-subtle">
              {NUMEROS.map((n, i) => (
                <div key={n.l} className={`py-7 px-4 text-center ${i % 2 ? "border-l border-border-subtle" : ""} ${i === 2 ? "md:border-l" : ""} ${i > 1 ? "border-t md:border-t-0 border-border-subtle" : ""}`}>
                  <p className="font-display font-bold text-ink text-3xl sm:text-4xl tracking-tight">{n.v}</p>
                  <p className="text-sm text-text-muted mt-1">{n.l}</p>
                  <p className="text-xs text-text-muted mt-0.5" lang="en">{n.en}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-3">Medido el 3 de noviembre de 2026. Las cifras de Google Cloud son de octubre de 2026.</p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-mist">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="eyebrow mb-4">Tecnología</p>
              <h2 className="text-ink">Construido sobre Google Cloud.</h2>
              <p className="text-text-secondary text-lg leading-relaxed mt-4">
                El backend, la base de datos en tiempo real y la inferencia multimodal con Gemini
                corren en Google Cloud Platform. Los datos de los locales se guardan en Santiago de Chile.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {STACK.map((s) => (
                <article key={s.t} className="h-full rounded-[28px] bg-white p-7">
                  <h3 className="font-display font-bold text-ink text-xl tracking-tight">{s.t}</h3>
                  <p className="text-text-secondary mt-3 leading-relaxed">{s.d}</p>
                </article>
              ))}
            </div>
            <p className="text-text-secondary mt-8">
              Cómo cuidamos los datos: <a href="/seguridad" className="font-semibold text-ink border-b-2 border-lime">seguridad de tus datos →</a>
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24" lang="en">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
            <div>
              <p className="eyebrow mb-4">In English</p>
              <h2 className="text-ink">AI-native vertical SaaS for appointment-based businesses in Latin America.</h2>
            </div>
            <div className="space-y-5 text-text-secondary text-lg leading-relaxed">
              <p>
                Synaptech SpA builds one multi-tenant product: online booking, an AI agent that answers and
                books on WhatsApp and Instagram, a loyalty club with digital wallet passes, payments, cash
                register and e-invoicing for barbershops, beauty salons, clinics and wellness studios.
                Businesses sign up on their own and pay a monthly subscription at public prices.
              </p>
              <p>
                Our backend, real-time database and multimodal inference run on Google Cloud: Cloud Run
                functions (15M+ invocations in October 2026), Firestore in the Santiago region (118M+ reads),
                Vertex AI with Gemini 2.5 Flash, Cloud Speech-to-Text, BigQuery and Cloud Scheduler.
              </p>
              <p>
                66 businesses across Chile, Mexico, Peru, Colombia and Argentina ran 18,000+ appointments on
                the platform in the last 30 days. The company is founder-led and bootstrapped.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="rounded-[28px] border border-border-subtle p-7 sm:p-10 max-w-3xl">
              <p className="eyebrow mb-4">Datos de la empresa · Company details</p>
              <dl className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-6 gap-y-1 sm:gap-y-3 text-[15px]">
                {DATOS.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-text-muted pt-2 sm:pt-0">{k}</dt>
                    <dd className="text-ink font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

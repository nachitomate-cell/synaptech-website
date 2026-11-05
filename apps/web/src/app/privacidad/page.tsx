import Link from "next/link";
import type { ReactNode } from "react";
import { metaPagina } from "@/lib/seo";
import BotonCookies from "@/components/BotonCookies";
import { IndiceLateral, IndiceMovil, type EntradaIndice } from "@/components/privacidad/IndicePrivacidad";

export const metadata = metaPagina({
  title: "Política de privacidad | SynapTech",
  description:
    "Qué datos recoge synaptechspa.cl, qué cookies usa y cuándo, quién los procesa, cuánto tiempo se guardan y cómo ejercer tus derechos.",
  path: "/privacidad",
});

/* Versión 2.0 (05-11-2026). Contenido: modelo de ulisesmente.cl (aviso de
   cookies por finalidad, tabla de cookies, "lo que no hacemos", encargados con
   país, plazos y versiones). Forma: patrones de los centros de privacidad
   grandes — hero, resumen en tarjetas, índice fijo con scroll-spy y un
   recuadro "En simple" al abrir cada sección, que dice lo MISMO que el
   detalle en menos palabras. Cada afirmación de "lo que no hacemos" está
   verificada contra el código; si cambias el sitio, revisa que siga siendo
   cierta. Los #id de las secciones son estables: no los renombres. */

const VERSION = "2.0";
const FECHA = "5 de noviembre de 2026";

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="font-medium text-accent underline underline-offset-[3px] decoration-accent/40 hover:decoration-accent">{children}</a>
);

const SECCIONES: EntradaIndice[] = [
  { id: "quienes-somos", titulo: "Quiénes somos" },
  { id: "alcance", titulo: "Qué cubre esta política" },
  { id: "datos", titulo: "Qué datos recogemos" },
  { id: "cookies", titulo: "Cookies y consentimiento" },
  { id: "no-hacemos", titulo: "Lo que no hacemos" },
  { id: "asistente", titulo: "Syna y el WhatsApp de ventas" },
  { id: "sensibles", titulo: "Datos sensibles" },
  { id: "base-legal", titulo: "Base legal" },
  { id: "transferencias", titulo: "Transferencias internacionales" },
  { id: "conservacion", titulo: "Cuánto tiempo guardamos los datos" },
  { id: "derechos", titulo: "Tus derechos" },
  { id: "desactivar", titulo: "Cómo desactivar la medición" },
  { id: "seguridad", titulo: "Seguridad" },
  { id: "versiones", titulo: "Cambios y versiones" },
];

/* ── Íconos (trazo 1.6, 24px) ── */
const I = {
  datos: <path d="M4 6c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2Zm0 0v6c0 1.1 3.6 2 8 2s8-.9 8-2V6M4 12v6c0 1.1 3.6 2 8 2s8-.9 8-2v-6" />,
  escudo: <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3Zm-3 9l2 2 4-4" />,
  cookie: <path d="M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3-3 3 3 0 0 1-3-3 3 3 0 0 1-3-3Zm-3 8h.01M15 15h.01M10 16h.01" />,
  derechos: <path d="M12 3v18M5 7h14M7 7l-3 7a3 3 0 0 0 6 0L7 7Zm10 0-3 7a3 3 0 0 0 6 0l-3-7Z" />,
  compartir: <path d="M7 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm15-6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM6.7 10.8l10.6-3.6M6.7 13.2l10.6 3.6" />,
  contacto: <path d="M4 6h16v12H4V6Zm0 0 8 7 8-7" />,
};

function Icono({ d }: { d: ReactNode }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {d}
    </svg>
  );
}

const RESUMEN: { href: string; titulo: string; texto: string; icono: ReactNode }[] = [
  { href: "#datos", titulo: "Qué recogemos", texto: "Lo que nos escribes por formularios, el chat o WhatsApp, y estadísticas sin cookies.", icono: I.datos },
  { href: "#no-hacemos", titulo: "Qué no hacemos", texto: "No vendemos tus datos ni cargamos pixels de publicidad sin tu permiso.", icono: I.escudo },
  { href: "#cookies", titulo: "Cookies", texto: "Medición y anuncios solo si aceptas. Cambias tu elección cuando quieras.", icono: I.cookie },
  { href: "#derechos", titulo: "Tus derechos", texto: "Acceso, corrección, borrado, oposición, portabilidad y bloqueo. Gratis.", icono: I.derechos },
  { href: "#asistente", titulo: "Con quién compartimos", texto: "Solo con los proveedores que operan el servicio, con su país a la vista.", icono: I.compartir },
  { href: "#quienes-somos", titulo: "Contacto", texto: "hola@synaptechspa.cl o WhatsApp +56 9 8356 8212.", icono: I.contacto },
];

function Seccion({ id, titulo, simple, children }: { id: string; titulo: string; simple: ReactNode; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-24 lg:scroll-mt-10 pt-10 first:pt-0 border-t border-border-subtle first:border-t-0">
      <h2 id={`${id}-titulo`} className="font-display text-[22px] md:text-2xl font-semibold text-ink tracking-tight mb-4">{titulo}</h2>
      <div className="mb-5 rounded-2xl bg-syn-lime-tint/70 border border-[#D9E8B8] px-4 py-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-dim mb-1">En simple</p>
        <p className="text-[15px] leading-relaxed text-ink">{simple}</p>
      </div>
      <div className="space-y-3 text-[15px] leading-relaxed text-text-secondary">{children}</div>
    </section>
  );
}

const Lista = ({ children }: { children: ReactNode }) => (
  <ul className="space-y-2.5 pl-5 list-disc marker:text-lime-deep">{children}</ul>
);
const Fuerte = ({ children }: { children: ReactNode }) => <strong className="font-semibold text-ink">{children}</strong>;

type Categoria = "Necesaria" | "Medición" | "Anuncios";
const CHIP: Record<Categoria, string> = {
  Necesaria: "bg-mist text-text-secondary border-border-subtle",
  Medición: "bg-[#E8F0FB] text-[#1F4E8C] border-[#C9DBF3]",
  Anuncios: "bg-[#FCEFE3] text-[#8A4410] border-[#F2D3B6]",
};
function Chip({ c }: { c: Categoria }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12px] font-semibold ${CHIP[c]}`}>{c}</span>;
}

const COOKIES: { nombre: ReactNode; para: string; cat: Categoria; dura: string }[] = [
  { nombre: <code>syn_consent</code>, para: "Recordar tu elección de cookies", cat: "Necesaria", dura: "12 meses" },
  { nombre: <code>syn_pais</code>, para: "Mostrar el aviso de precios en dólares si entras desde otro país", cat: "Necesaria", dura: "30 días" },
  { nombre: "Almacenamiento de sesión (syna-sesion, historial del chat, aviso de país cerrado)", para: "Que el chat y los avisos no se reinicien al cambiar de página", cat: "Necesaria", dura: "Hasta cerrar la pestaña" },
  { nombre: <code>syn_pt</code>, para: "Recordar con qué campaña llegaste (anuncio, buscador, enlace), para saber qué canal trae locales", cat: "Medición", dura: "90 días" },
  { nombre: <><code>_fbp</code>, <code>_fbc</code></>, para: "Pixel de Meta: medir qué anuncios de Facebook e Instagram traen visitas y mensajes", cat: "Anuncios", dura: "90 días" },
  { nombre: "Cookies del pixel de OpenAI", para: "Medir qué anuncios de ChatGPT traen contactos y altas", cat: "Anuncios", dura: "Según OpenAI" },
  { nombre: "Cookies de LinkedIn Insight (solo si está activo)", para: "Medir campañas en LinkedIn", cat: "Anuncios", dura: "Según LinkedIn" },
];

const PROVEEDORES: [string, string, string][] = [
  ["Anthropic (Claude)", "Redacta las respuestas", "EE. UU."],
  ["Google Cloud / Firebase", "Guarda las conversaciones y corre el servidor", "Datos en Santiago de Chile; procesamiento en EE. UU."],
  ["Vercel", "Aloja este sitio y el chat", "EE. UU."],
  ["DigitalOcean", "Servidor que conecta el número de WhatsApp", "EE. UU."],
  ["Meta (WhatsApp)", "Transporta los mensajes", "EE. UU. y otros"],
  ["Resend", "Envía a nuestro correo lo que dejas en los formularios", "EE. UU."],
];

const PLAZOS: [string, string][] = [
  ["Mensajes de formularios", "En nuestro correo, mientras dure la relación comercial o hasta que pidas borrarlos"],
  ["Conversaciones con Syna y con el WhatsApp de ventas", "Mientras dure la relación comercial o hasta que pidas borrarlas"],
  ["syn_pt (medición)", "90 días"],
  ["Cookies de anuncios", "90 días (Meta); lo que defina cada proveedor (OpenAI, LinkedIn)"],
  ["Tu elección de cookies", "12 meses"],
];

/** Lista en tarjetas en el celular y tabla en escritorio: nada de scroll horizontal. */
function TablaAdaptable({ cabecera, filas }: { cabecera: string[]; filas: ReactNode[][] }) {
  return (
    <>
      <ul className="md:hidden space-y-2.5">
        {filas.map((f, i) => (
          <li key={i} className="rounded-xl border border-border-subtle bg-white p-3.5">
            <p className="font-semibold text-ink text-[15px] mb-1.5">{f[0]}</p>
            <dl className="space-y-1">
              {f.slice(1).map((c, j) => (
                <div key={j} className="flex gap-2 text-[14px]">
                  <dt className="shrink-0 w-24 text-text-muted">{cabecera[j + 1]}</dt>
                  <dd className="min-w-0 text-text-secondary">{c}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <div className="hidden md:block rounded-2xl border border-border-subtle overflow-hidden">
        <table className="w-full text-[14px]">
          <thead className="bg-mist">
            <tr>
              {cabecera.map((c) => (
                <th key={c} scope="col" className="text-left font-semibold text-ink px-4 py-3">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filas.map((f, i) => (
              <tr key={i} className="border-t border-border-subtle align-top">
                {f.map((c, j) => (
                  <td key={j} className={`px-4 py-3 ${j === 0 ? "font-medium text-ink" : "text-text-secondary"}`}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function Privacidad() {
  return (
    <main id="contenido" className="min-h-screen bg-bg-primary pt-10 md:pt-14 pb-24">
      {/* ── Hero ── */}
      <header className="max-w-6xl mx-auto px-6 md:px-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[13px] text-text-muted hover:text-ink transition-colors mb-8">
          <svg aria-hidden="true" className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 8H3M7 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver al inicio
        </Link>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent mb-3">Centro de privacidad</p>
        <h1 className="font-display text-[38px] leading-[1.05] md:text-[56px] font-semibold tracking-tight text-ink max-w-3xl">
          Política de privacidad
        </h1>
        <p className="mt-4 text-lg md:text-xl leading-relaxed text-text-secondary max-w-2xl">
          Qué datos usamos, para qué y cómo los controlas tú. Sin letra chica.
        </p>
        <p className="mt-5 inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-text-muted">
          <span className="inline-flex items-center rounded-full bg-mist border border-border-subtle px-2.5 py-0.5 font-semibold text-ink">Versión {VERSION}</span>
          <span>Vigente desde el {FECHA}</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span>Synaptech SpA</span>
        </p>

        {/* ── En resumen ── */}
        <section aria-labelledby="resumen-titulo" className="mt-12">
          <h2 id="resumen-titulo" className="font-display text-xl font-semibold text-ink mb-4">En resumen</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {RESUMEN.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  className="group flex h-full gap-4 rounded-2xl border border-border-subtle bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-syn-lime-tint text-accent-dim">
                    <Icono d={r.icono} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 font-semibold text-ink">
                      {r.titulo}
                      <svg aria-hidden="true" className="w-3.5 h-3.5 text-text-muted transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-text-secondary">{r.texto}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </header>

      {/* ── Cuerpo: índice + secciones ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-14 lg:grid lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <IndiceLateral entradas={SECCIONES} />
        </aside>
        {/* El índice del celular va DENTRO de la columna del texto: un sticky
            solo se queda pegado mientras su contenedor sigue en pantalla. */}
        <div className="min-w-0">
        <IndiceMovil entradas={SECCIONES} className="lg:hidden mb-8" />

        <article className="max-w-[44rem] space-y-10 [&_code]:rounded-md [&_code]:bg-mist [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_code]:text-ink">
          <Seccion id="quienes-somos" titulo="Quiénes somos" simple="Somos Synaptech SpA, de Viña del Mar. Respondemos por los datos de este sitio y de nuestro asistente de ventas.">
            <p>
              Synaptech SpA, RUT 78.402.009-6, Viña del Mar, Región de Valparaíso, Chile. Somos responsables de los
              datos que recoge este sitio (synaptechspa.cl) y nuestro asistente de ventas. Contacto:{" "}
              <A href="mailto:hola@synaptechspa.cl">hola@synaptechspa.cl</A> o WhatsApp{" "}
              <A href="https://wa.me/56983568212">+56 9 8356 8212</A>.
            </p>
          </Seccion>

          <Seccion id="alcance" titulo="Qué cubre esta política (y qué no)" simple="Este sitio, el chat con Syna y nuestro WhatsApp de ventas. La plataforma de los locales tiene su propia política.">
            <p>
              Cubre este sitio, el chat con Syna que aparece en él y las conversaciones con nuestro número de ventas
              de WhatsApp.
            </p>
            <p>
              No cubre la plataforma que usan los locales (sus páginas de reserva, el panel y sus asistentes). Ahí
              los datos de los clientes de cada local los decide el local, y nosotros los tratamos por encargo suyo.
              Tiene su propia política: <A href="https://app.synaptechspa.cl/privacidad.html">política de privacidad de la plataforma</A>.
            </p>
          </Seccion>

          <Seccion id="datos" titulo="Qué datos recogemos" simple="Lo que nos escribes por formularios, el chat con Syna o WhatsApp, y estadísticas del sitio sin cookies. Lo demás, solo con tu permiso.">
            <Lista>
              <li>
                <Fuerte>Formularios de contacto</Fuerte> (inicio y /empresas): nombre, correo, empresa, teléfono si lo
                dejas, y lo que escribes. Nos llegan por correo; el sitio no los guarda.
              </li>
              <li id="syna" className="scroll-mt-24 lg:scroll-mt-10">
                <Fuerte>Chat con Syna</Fuerte>: la conversación, la página desde la que escribes y el país aproximado de
                la conexión. No guardamos tu dirección IP: solo se usa al momento para frenar abusos (demasiados
                mensajes seguidos) y se olvida.
              </li>
              <li>
                <Fuerte>WhatsApp de ventas</Fuerte>: tu número, tu nombre de perfil, lo que escribes y, si llegaste por
                un anuncio, de qué anuncio vienes. Si tienes un negocio, puede que te hayamos escrito primero al
                contacto público del local (por ejemplo, el de Google Maps); si nos pides no escribirte más, no lo
                volvemos a hacer.
              </li>
              <li>
                <Fuerte>Navegación</Fuerte>: visitas y velocidad del sitio en agregado, sin cookies y sin identificarte
                (Vercel Analytics y Speed Insights). Con tu permiso, además, lo que explica{" "}
                <A href="#cookies">Cookies y consentimiento</A>.
              </li>
            </Lista>
          </Seccion>

          <Seccion id="cookies" titulo="Cookies y consentimiento" simple="Nada de medición ni de anuncios se activa hasta que eliges. Puedes cambiar tu elección cuando quieras.">
            <p>
              Cuando entras por primera vez te mostramos un aviso con tres opciones: <em>Aceptar todo</em>,{" "}
              <em>Rechazar todo</em> o <em>Elegir</em> por finalidad. <Fuerte>Nada de medición ni de anuncios se activa
              hasta que respondes.</Fuerte> Tu elección se guarda 12 meses en la cookie <code>syn_consent</code>, que no
              mide nada. Puedes cambiarla cuando quieras desde el enlace «Cookies» del pie de página o con el botón de
              abajo. Si retiras un permiso, borramos las cookies propias de esa finalidad.
            </p>
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border-subtle bg-mist px-4 py-3.5">
              <BotonCookies className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white hover:opacity-90">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h10M18 7h2M4 17h4M12 17h8M16 5v4M10 15v4" />
                </svg>
                Configurar cookies
              </BotonCookies>
              <span className="text-[13.5px] text-text-muted">Abre el mismo aviso con tu elección actual.</span>
            </div>
            <TablaAdaptable
              cabecera={["Cookie o dato", "Para qué", "Finalidad", "Duración"]}
              filas={COOKIES.map((c) => [c.nombre, c.para, <Chip key="c" c={c.cat} />, c.dura])}
            />
            <p>
              Si no aceptas «Medición», el botón de crear tu agenda igual lleva la campaña de esa misma visita (se lee
              del enlace, no se guarda), pero no la recordamos si vuelves otro día. Agendar una reunión abre el
              calendario de Cal.com, que tiene sus propias condiciones.
            </p>
          </Seccion>

          <Seccion id="no-hacemos" titulo="Lo que no hacemos" simple="No vendemos tus datos, no ponemos pixels sin permiso, no guardamos tu IP del chat y no entrenamos IA con lo que escribes.">
            <Lista>
              <li>No vendemos ni cedemos tus datos a nadie.</li>
              <li>No cargamos pixels de publicidad sin tu permiso.</li>
              <li>No guardamos la dirección IP de quien conversa con Syna.</li>
              <li>No usamos lo que escribes para entrenar modelos de IA (el proveedor, Anthropic, no entrena con los datos que recibe por su API comercial).</li>
            </Lista>
          </Seccion>

          <Seccion id="asistente" titulo="Syna y el asistente de ventas de WhatsApp" simple="Una IA responde preguntas y agenda reuniones. No decide nada: los precios especiales y las altas los decide una persona.">
            <p>
              Responden con inteligencia artificial preguntas sobre planes, precios y cómo funciona la plataforma, y
              pueden agendar una reunión si se lo pides. <Fuerte>No aprueban ni rechazan nada:</Fuerte> los precios
              especiales, las altas y cualquier decisión sobre tu cuenta las toma una persona del equipo, que puede
              tomar la conversación en cualquier momento.
            </p>
            <p>Para funcionar usan estos proveedores (encargados):</p>
            <TablaAdaptable cabecera={["Proveedor", "Qué hace", "Dónde"]} filas={PROVEEDORES} />
          </Seccion>

          <Seccion id="sensibles" titulo="Datos sensibles" simple="No te pedimos datos de salud, creencias ni otros datos sensibles. Si los mencionas, solo los usamos para responderte.">
            <p>
              Son datos sensibles los que se refieren a tu salud, origen étnico, vida sexual, creencias, afiliación
              política o sindical, y datos biométricos, entre otros. Este sitio y el asistente no los piden. Si los
              mencionas en una conversación, solo los usamos para responderte y te sugerimos no compartirlos por este
              medio.
            </p>
          </Seccion>

          <Seccion id="base-legal" titulo="Base legal" simple="Tu permiso para las cookies, tu solicitud cuando nos escribes y nuestro interés legítimo para la seguridad y las estadísticas.">
            <Lista>
              <li><Fuerte>Tu consentimiento</Fuerte>: para las cookies de medición y de anuncios, que das o niegas en el aviso.</li>
              <li><Fuerte>Tu solicitud</Fuerte>: cuando nos escribes por el chat, WhatsApp o un formulario, tratamos tus datos para responderte y, si quieres, ayudarte a contratar.</li>
              <li><Fuerte>Interés legítimo</Fuerte>: para la seguridad del sitio y las estadísticas agregadas sin cookies.</li>
            </Lista>
            <p>
              Hasta el 30 de noviembre de 2026 rige la Ley N.º 19.628 sobre Protección de la Vida Privada. Desde el 1
              de diciembre de 2026 entra en vigencia la Ley N.º 21.719, que la modifica y crea la Agencia de Protección
              de Datos Personales. Esta política ya sigue las reglas de la nueva ley.
            </p>
          </Seccion>

          <Seccion id="transferencias" titulo="Transferencias internacionales" simple="Algunos proveedores procesan datos fuera de Chile, sobre todo en EE. UU. Les enviamos solo lo necesario.">
            <p>
              Varios proveedores procesan datos fuera de Chile, principalmente en EE. UU. (ver la tabla de{" "}
              <A href="#asistente">Syna y el asistente de ventas</A> y los pixels de{" "}
              <A href="#cookies">Cookies y consentimiento</A>). Enviamos solo lo necesario y trabajamos con proveedores
              obligados por contrato a proteger los datos. A la fecha de esta versión, la Agencia de Protección de
              Datos Personales aún no publica la lista de países con nivel adecuado de protección.
            </p>
          </Seccion>

          <Seccion id="conservacion" titulo="Cuánto tiempo guardamos los datos" simple="Lo que nos escribes, mientras dure la relación o hasta que pidas borrarlo. Las cookies, entre 90 días y 12 meses.">
            <TablaAdaptable cabecera={["Dato", "Plazo"]} filas={PLAZOS} />
            <p>
              Anthropic conserva lo que recibe por su API por un plazo acotado para seguridad y luego lo borra, según
              sus condiciones comerciales.
            </p>
          </Seccion>

          <Seccion id="derechos" titulo="Tus derechos" simple="Puedes ver, corregir, borrar, oponerte, llevarte o bloquear tus datos. Es gratis: escríbenos.">
            <p>
              Puedes pedir acceso a tus datos, rectificarlos, suprimirlos, oponerte a su tratamiento (también al
              tratamiento automatizado), pedir su portabilidad y su bloqueo. Escríbenos a{" "}
              <A href="mailto:hola@synaptechspa.cl">hola@synaptechspa.cl</A> o por WhatsApp. Es gratis.
            </p>
            <p>
              Te respondemos dentro de los plazos legales: hasta el 30-11-2026 los de la Ley 19.628, y desde el
              01-12-2026, 30 días corridos, prorrogables una sola vez por otros 30 (Ley 21.719). Si no respondemos o
              no estás de acuerdo, desde el 01-12-2026 puedes reclamar ante la Agencia de Protección de Datos
              Personales.
            </p>
            <p>
              Una aclaración honesta: las estadísticas agregadas del sitio no se pueden separar por persona. Las
              conversaciones de WhatsApp sí las encontramos por tu número, y las del chat de Syna si nos dices el día
              y lo que conversaste.
            </p>
          </Seccion>

          <Seccion id="desactivar" titulo="Cómo desactivar la medición tú mismo" simple="Recházala en el aviso de cookies, ajusta tus preferencias de anuncios en Meta o usa el modo incógnito.">
            <Lista>
              <li>Rechaza «Medición» y «Anuncios» en el aviso, desde el enlace «Cookies» del pie.</li>
              <li>Preferencias de anuncios de Meta: <A href="https://accountscenter.facebook.com/ad_preferences">accountscenter.facebook.com/ad_preferences</A>.</li>
              <li>Navegación de incógnito o bloqueo de cookies de terceros en tu navegador.</li>
            </Lista>
          </Seccion>

          <Seccion id="seguridad" titulo="Seguridad" simple="Todo viaja cifrado y las conversaciones se guardan cifradas en Santiago de Chile.">
            <p>
              El sitio funciona solo por HTTPS. Las conversaciones se guardan cifradas en reposo en servidores de
              Google Cloud en Santiago de Chile, con acceso restringido al equipo. Este sitio no guarda fichas
              clínicas ni datos de los clientes de los locales.
            </p>
          </Seccion>

          <Seccion id="versiones" titulo="Cambios y versiones" simple="Si cambiamos algo importante, lo publicamos aquí con su fecha.">
            <ol className="relative space-y-5 border-l border-border-subtle pl-6">
              <li>
                <span aria-hidden="true" className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-lime ring-4 ring-white" />
                <p className="font-semibold text-ink">2.0 · {FECHA}</p>
                <p>
                  Aviso de cookies por finalidad (antes los pixels de Meta y OpenAI se cargaban sin preguntar), tabla
                  de cookies, proveedores con país, plazos, asistente de WhatsApp, datos sensibles y la Ley 21.719.
                </p>
              </li>
              <li>
                <span aria-hidden="true" className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-border-subtle ring-4 ring-white" />
                <p className="font-semibold text-ink">1.0 · octubre de 2026</p>
                <p>Primera publicación.</p>
              </li>
            </ol>
            <p>Si cambiamos algo importante, lo publicamos aquí con su fecha.</p>
          </Seccion>
        </article>
        </div>
      </div>
    </main>
  );
}

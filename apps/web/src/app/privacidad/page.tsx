import Link from "next/link";
import type { ReactNode } from "react";
import { metaPagina } from "@/lib/seo";
import BotonCookies from "@/components/BotonCookies";

export const metadata = metaPagina({
  title: "Política de privacidad | SynapTech",
  description:
    "Qué datos recoge synaptechspa.cl, qué cookies usa y cuándo, quién los procesa, cuánto tiempo se guardan y cómo ejercer tus derechos.",
  path: "/privacidad",
});

/* Versión 2.0 (05-11-2026). Modelo: la política de ulisesmente.cl (aviso de
   cookies por finalidad, tabla de cookies, "lo que no hacemos", encargados con
   país, plazos y versiones). La 1.0 decía que el sitio no usaba cookies de
   publicidad mientras cargaba el Pixel de Meta y el de OpenAI en cada visita:
   desde esta versión esos pixels esperan el permiso (lib/consentimiento.ts).
   Cada afirmación de "lo que no hacemos" está verificada contra el código; si
   cambias el sitio, revisa que siga siendo cierta. */

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-accent hover:underline">{children}</a>
);

function Seccion({ id, titulo, children }: { id?: string; titulo: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-lg font-semibold text-text-primary mb-3">{titulo}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Tabla({ cabecera, filas }: { cabecera: string[]; filas: (string | ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {cabecera.map((c) => (
              <th key={c} className="text-left font-semibold text-text-primary border-b border-border-subtle px-1 py-2 align-bottom">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={i}>
              {f.map((c, j) => (
                <td key={j} className="border-b border-border-subtle px-1 py-2 align-top">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Privacidad() {
  return (
    <main className="min-h-screen bg-bg-primary pt-28 pb-24">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-[11px] text-text-muted hover:text-accent transition-colors mb-10">
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 8H3M7 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver al inicio
        </Link>

        <h1 className="text-text-primary mb-4">Política de privacidad</h1>
        <p className="font-mono text-[11px] text-text-muted mb-12">Versión 2.0 · 5 de noviembre de 2026</p>

        <div className="prose prose-invert max-w-none font-body text-text-secondary leading-relaxed space-y-10">
          <Seccion titulo="1. Quiénes somos">
            <p>
              Synaptech SpA, RUT 78.402.009-6, Viña del Mar, Región de Valparaíso, Chile. Somos responsables de los
              datos que recoge este sitio (synaptechspa.cl) y nuestro asistente de ventas. Contacto:{" "}
              <A href="mailto:hola@synaptechspa.cl">hola@synaptechspa.cl</A> o WhatsApp{" "}
              <A href="https://wa.me/56983568212">+56 9 8356 8212</A>.
            </p>
          </Seccion>

          <Seccion titulo="2. Qué cubre esta política (y qué no)">
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

          <Seccion titulo="3. Qué datos recogemos">
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              <li>
                <strong className="text-text-primary">Formularios de contacto</strong> (inicio y /empresas): nombre,
                correo, empresa, teléfono si lo dejas, y lo que escribes. Nos llegan por correo; el sitio no los guarda.
              </li>
              <li>
                <strong className="text-text-primary" id="syna">Chat con Syna</strong>: la conversación, la página desde
                la que escribes y el país aproximado de la conexión. No guardamos tu dirección IP: solo se usa al
                momento para frenar abusos (demasiados mensajes seguidos) y se olvida.
              </li>
              <li>
                <strong className="text-text-primary">WhatsApp de ventas</strong>: tu número, tu nombre de perfil, lo que
                escribes y, si llegaste por un anuncio, de qué anuncio vienes. Si tienes un negocio, puede que te
                hayamos escrito primero al contacto público del local (por ejemplo, el de Google Maps); si nos pides
                no escribirte más, no lo volvemos a hacer.
              </li>
              <li>
                <strong className="text-text-primary">Navegación</strong>: visitas y velocidad del sitio en agregado,
                sin cookies y sin identificarte (Vercel Analytics y Speed Insights). Con tu permiso, además, lo de la
                sección 4.
              </li>
            </ul>
          </Seccion>

          <Seccion id="cookies" titulo="4. Cookies y aviso de consentimiento">
            <p>
              Cuando entras por primera vez te mostramos un aviso con tres opciones: <em>Aceptar todo</em>,{" "}
              <em>Rechazar todo</em> o <em>Elegir</em> por finalidad. <strong className="text-text-primary">Nada de
              medición ni de anuncios se activa hasta que respondes.</strong> Tu elección se guarda 12 meses en la cookie{" "}
              <code>syn_consent</code>, que no mide nada. Puedes cambiarla cuando quieras desde el enlace «Cookies» del
              pie de página o aquí: <BotonCookies className="text-accent hover:underline" />. Si retiras un permiso,
              borramos las cookies propias de esa finalidad.
            </p>
            <Tabla
              cabecera={["Cookie o dato", "Para qué", "Finalidad", "Duración"]}
              filas={[
                [<code key="c">syn_consent</code>, "Recordar tu elección de cookies", "Necesaria", "12 meses"],
                [<code key="p">syn_pais</code>, "Mostrar el aviso de precios en dólares si entras desde otro país", "Necesaria", "30 días"],
                ["Almacenamiento de sesión (syna-sesion, historial del chat, aviso de país cerrado)", "Que el chat y los avisos no se reinicien al cambiar de página", "Necesaria", "Hasta cerrar la pestaña"],
                [<code key="t">syn_pt</code>, "Recordar con qué campaña llegaste (anuncio, buscador, enlace), para saber qué canal trae locales", "Medición", "90 días"],
                [<><code>_fbp</code>, <code>_fbc</code></>, "Pixel de Meta: medir qué anuncios de Facebook e Instagram traen visitas y mensajes", "Anuncios", "90 días"],
                ["Cookies del pixel de OpenAI", "Medir qué anuncios de ChatGPT traen contactos y altas", "Anuncios", "Según OpenAI"],
                ["Cookies de LinkedIn Insight (solo si está activo)", "Medir campañas en LinkedIn", "Anuncios", "Según LinkedIn"],
              ]}
            />
            <p className="text-sm">
              Si no aceptas «Medición», el botón de crear tu agenda igual lleva la campaña de esa misma visita (se lee
              del enlace, no se guarda), pero no la recordamos si vuelves otro día. Agendar una reunión abre el
              calendario de Cal.com, que tiene sus propias condiciones.
            </p>
          </Seccion>

          <Seccion titulo="5. Lo que no hacemos">
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              <li>No vendemos ni cedemos tus datos a nadie.</li>
              <li>No cargamos pixels de publicidad sin tu permiso.</li>
              <li>No guardamos la dirección IP de quien conversa con Syna.</li>
              <li>No usamos lo que escribes para entrenar modelos de IA (el proveedor, Anthropic, no entrena con los datos que recibe por su API comercial).</li>
            </ul>
          </Seccion>

          <Seccion titulo="6. Syna y el asistente de ventas de WhatsApp">
            <p>
              Responden con inteligencia artificial preguntas sobre planes, precios y cómo funciona la plataforma, y
              pueden agendar una reunión si se lo pides. <strong className="text-text-primary">No aprueban ni rechazan
              nada:</strong> los precios especiales, las altas y cualquier decisión sobre tu cuenta las toma una persona
              del equipo, que puede tomar la conversación en cualquier momento.
            </p>
            <p>Para funcionar usan estos proveedores (encargados):</p>
            <Tabla
              cabecera={["Proveedor", "Qué hace", "Dónde"]}
              filas={[
                ["Anthropic (Claude)", "Redacta las respuestas", "EE. UU."],
                ["Google Cloud / Firebase", "Guarda las conversaciones y corre el servidor", "Datos en Santiago de Chile; procesamiento en EE. UU."],
                ["Vercel", "Aloja este sitio y el chat", "EE. UU."],
                ["DigitalOcean", "Servidor que conecta el número de WhatsApp", "EE. UU."],
                ["Meta (WhatsApp)", "Transporta los mensajes", "EE. UU. y otros"],
                ["Resend", "Envía a nuestro correo lo que dejas en los formularios", "EE. UU."],
              ]}
            />
          </Seccion>

          <Seccion titulo="7. Datos sensibles">
            <p>
              Son datos sensibles los que se refieren a tu salud, origen étnico, vida sexual, creencias, afiliación
              política o sindical, y datos biométricos, entre otros. Este sitio y el asistente no los piden. Si los
              mencionas en una conversación, solo los usamos para responderte y te sugerimos no compartirlos por este
              medio.
            </p>
          </Seccion>

          <Seccion titulo="8. Base legal">
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              <li><strong className="text-text-primary">Tu consentimiento</strong>: para las cookies de medición y de anuncios, que das o niegas en el aviso.</li>
              <li><strong className="text-text-primary">Tu solicitud</strong>: cuando nos escribes por el chat, WhatsApp o un formulario, tratamos tus datos para responderte y, si quieres, ayudarte a contratar.</li>
              <li><strong className="text-text-primary">Interés legítimo</strong>: para la seguridad del sitio y las estadísticas agregadas sin cookies.</li>
            </ul>
            <p className="text-sm">
              Hasta el 30 de noviembre de 2026 rige la Ley N.º 19.628 sobre Protección de la Vida Privada. Desde el 1
              de diciembre de 2026 entra en vigencia la Ley N.º 21.719, que la modifica y crea la Agencia de Protección
              de Datos Personales. Esta política ya sigue las reglas de la nueva ley.
            </p>
          </Seccion>

          <Seccion titulo="9. Transferencias internacionales">
            <p>
              Varios proveedores procesan datos fuera de Chile, principalmente en EE. UU. (tabla de la sección 6 y
              pixels de la sección 4). Enviamos solo lo necesario y trabajamos con proveedores obligados por contrato a
              proteger los datos. A la fecha de esta versión, la Agencia de Protección de Datos Personales aún no
              publica la lista de países con nivel adecuado de protección.
            </p>
          </Seccion>

          <Seccion titulo="10. Cuánto tiempo guardamos los datos">
            <Tabla
              cabecera={["Dato", "Plazo"]}
              filas={[
                ["Mensajes de formularios", "En nuestro correo, mientras dure la relación comercial o hasta que pidas borrarlos"],
                ["Conversaciones con Syna y con el WhatsApp de ventas", "Mientras dure la relación comercial o hasta que pidas borrarlas"],
                ["syn_pt (medición)", "90 días"],
                ["Cookies de anuncios", "90 días (Meta); lo que defina cada proveedor (OpenAI, LinkedIn)"],
                ["Tu elección de cookies", "12 meses"],
              ]}
            />
            <p className="text-sm">
              Anthropic conserva lo que recibe por su API por un plazo acotado para seguridad y luego lo borra, según
              sus condiciones comerciales.
            </p>
          </Seccion>

          <Seccion titulo="11. Tus derechos">
            <p>
              Puedes pedir acceso a tus datos, rectificarlos, suprimirlos, oponerte a su tratamiento (también al
              tratamiento automatizado), pedir su portabilidad y su bloqueo. Escríbenos a{" "}
              <A href="mailto:hola@synaptechspa.cl">hola@synaptechspa.cl</A> o por WhatsApp. Es gratis.
            </p>
            <p className="text-sm">
              Te respondemos dentro de los plazos legales: hasta el 30-11-2026 los de la Ley 19.628, y desde el
              01-12-2026, 30 días corridos, prorrogables una sola vez por otros 30 (Ley 21.719). Si no respondemos o
              no estás de acuerdo, desde el 01-12-2026 puedes reclamar ante la Agencia de Protección de Datos
              Personales.
            </p>
            <p className="text-sm">
              Una aclaración honesta: las estadísticas agregadas del sitio no se pueden separar por persona. Las
              conversaciones de WhatsApp sí las encontramos por tu número, y las del chat de Syna si nos dices el día
              y lo que conversaste.
            </p>
          </Seccion>

          <Seccion titulo="12. Cómo desactivar la medición tú mismo">
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              <li>Rechaza «Medición» y «Anuncios» en el aviso, desde el enlace «Cookies» del pie.</li>
              <li>Preferencias de anuncios de Meta: <A href="https://accountscenter.facebook.com/ad_preferences">accountscenter.facebook.com/ad_preferences</A>.</li>
              <li>Navegación de incógnito o bloqueo de cookies de terceros en tu navegador.</li>
            </ul>
          </Seccion>

          <Seccion titulo="13. Seguridad">
            <p>
              El sitio funciona solo por HTTPS. Las conversaciones se guardan cifradas en reposo en servidores de
              Google Cloud en Santiago de Chile, con acceso restringido al equipo. Este sitio no guarda fichas
              clínicas ni datos de los clientes de los locales.
            </p>
          </Seccion>

          <Seccion titulo="14. Cambios y versiones">
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              <li>
                <strong className="text-text-primary">2.0 · 5 de noviembre de 2026</strong>: aviso de cookies por
                finalidad (antes los pixels de Meta y OpenAI se cargaban sin preguntar), tabla de cookies, proveedores
                con país, plazos, asistente de WhatsApp, datos sensibles y la Ley 21.719.
              </li>
              <li><strong className="text-text-primary">1.0 · octubre de 2026</strong>: primera publicación.</li>
            </ul>
            <p className="text-sm">Si cambiamos algo importante, lo publicamos aquí con su fecha.</p>
          </Seccion>
        </div>
      </div>
    </main>
  );
}

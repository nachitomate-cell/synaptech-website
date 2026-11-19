import Link from "next/link";
import type { ReactNode } from "react";
import { metaPagina } from "@/lib/seo";

/* Documentación de la API de boletas (19-11-2026). La fuente técnica vive en
   el repo de la plataforma (docs/api-boletas.md, functions/api-boletas.js):
   si cambia el contrato allá, se cambia acá. Por ahora fuera de Google
   (noindex) y del sitemap: se comparte con cada integrador. */
export const metadata = metaPagina({
  title: "API de boletas | SynapTech",
  description: "Emite desde tu app la boleta del local y la boleta de honorarios de cada atención, directo al SII.",
  path: "/api-boletas",
  noindex: true,
});

const BASE = "https://app.synaptechspa.cl/api/boletas/v1";

function Seccion({ id, titulo, children }: { id: string; titulo: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-xl font-semibold text-text-primary mb-4">{titulo}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Codigo({ children }: { children: string }) {
  return (
    <pre className="font-mono text-[12.5px] leading-relaxed bg-bg-secondary border border-border-subtle rounded-xl p-4 overflow-x-auto text-text-primary">
      <code>{children}</code>
    </pre>
  );
}

function C({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[0.9em] bg-bg-secondary border border-border-subtle rounded px-1.5 py-0.5 text-text-primary break-words">{children}</code>;
}

function Tabla({ cabecera, filas }: { cabecera: string[]; filas: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto border border-border-subtle rounded-xl">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-text-muted border-b border-border-subtle bg-bg-secondary">
            {cabecera.map((c) => <th key={c} scope="col" className="font-semibold px-4 py-3 whitespace-nowrap">{c}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {filas.map((f, i) => (
            <tr key={i}>{f.map((celda, j) => <td key={j} className="px-4 py-3 align-top">{celda}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const INDICE = [
  ["antes", "Antes de emitir"],
  ["autenticacion", "Autenticación"],
  ["sucursales", "Sucursales y profesionales"],
  ["emitir", "Emitir las boletas"],
  ["estado", "Consultar el estado"],
  ["errores", "Errores"],
  ["sandbox", "Probar en el sandbox"],
  ["anulaciones", "Anulaciones"],
];

export default function ApiBoletas() {
  return (
    <main className="min-h-screen bg-bg-primary pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-[11px] text-text-muted hover:text-accent transition-colors mb-10">
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 8H3M7 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver al inicio
        </Link>

        <p className="font-mono text-[11px] text-text-muted mb-3">Para desarrolladores · v1</p>
        <h1 className="text-text-primary mb-5">API de boletas</h1>
        <p className="font-body text-lg text-text-secondary leading-relaxed mb-6">
          Emite desde tu app las dos boletas de cada atención en comisión partida: la <strong className="text-text-primary">boleta del local</strong> (afecta,
          con IVA) por la parte de la barbería más los productos, y la <strong className="text-text-primary">boleta de honorarios</strong> del profesional
          por su parte. Salen directo al SII y suman exactamente lo que pagó el cliente.
        </p>
        <div className="font-body text-text-secondary text-sm space-y-1 mb-10">
          <p><span className="text-text-muted">Base:</span> <C>{BASE}</C></p>
          <p><span className="text-text-muted">Formato:</span> JSON. Montos en pesos chilenos, enteros y con IVA incluido.</p>
        </div>

        <nav aria-label="Contenido" className="border border-border-subtle rounded-xl p-5 mb-14 bg-bg-secondary">
          <p className="font-mono text-[11px] text-text-muted mb-3">Contenido</p>
          <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 font-body text-sm">
            {INDICE.map(([id, t], i) => (
              <li key={id}><a href={`#${id}`} className="text-text-secondary hover:text-accent">{i + 1}. {t}</a></li>
            ))}
          </ol>
        </nav>

        <div className="font-body text-text-secondary leading-relaxed space-y-14">
          <Seccion id="antes" titulo="1. Antes de emitir">
            <p>Cada sucursal se configura una vez en el panel de SynapTech, no por la API:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>La barbería ingresa su clave del SII para la boleta del local.</li>
              <li>Cada profesional firma el mandato y vincula su propia clave del SII para sus boletas de honorarios.</li>
              <li>SynapTech habilita la sucursal en tu clave de API.</li>
            </ol>
            <p>
              Las claves del SII nunca pasan por tu app ni por esta API. Para saber si una sucursal y sus profesionales ya están
              listos, usa <C>GET /sucursales/{"{id}"}</C>.
            </p>
          </Seccion>

          <Seccion id="autenticacion" titulo="2. Autenticación">
            <p>Cada pedido lleva tu clave en el encabezado:</p>
            <Codigo>{"Authorization: Bearer stk_live_xxxxxxxxxxxxxxxx"}</Codigo>
            <Tabla
              cabecera={["Prefijo", "Para qué"]}
              filas={[
                [<C key="t">stk_test_</C>, <span key="d"><strong className="text-text-primary">Sandbox.</strong> Valida todo igual que producción, pero no emite nada ni toca el SII. Usa la sucursal <C>prueba</C> y devuelve folios 999999.</span>],
                [<C key="l">stk_live_</C>, <span key="d"><strong className="text-text-primary">Producción.</strong> Emite boletas reales en las sucursales habilitadas.</span>],
              ]}
            />
            <p>
              Guarda la clave en tu servidor, nunca en la app móvil ni en el navegador. Si se filtra, avísanos y la cambiamos.
              Límite: 120 solicitudes por minuto por clave.
            </p>
          </Seccion>

          <Seccion id="sucursales" titulo="3. Sucursales y profesionales">
            <p><C>GET /sucursales</C> lista las sucursales habilitadas para tu clave:</p>
            <Codigo>{`{
  "sucursales": [
    { "id": "koxbarbershop", "nombre": "KOX Barbershop", "lista_para_emitir": true, "falta": null }
  ]
}`}</Codigo>
            <p><C>GET /sucursales/{"{sucursal}"}</C> agrega sus profesionales:</p>
            <Codigo>{`{
  "id": "koxbarbershop",
  "nombre": "KOX Barbershop",
  "lista_para_emitir": true,
  "falta": null,
  "profesionales": [
    {
      "id": "aB3dE9",
      "nombre": "Juan Pérez",
      "rut": "12345678-9",
      "porcentaje_profesional": 50,
      "listo_para_emitir": true,
      "falta": null
    }
  ]
}`}</Codigo>
            <p>
              <C>porcentaje_profesional</C> es el porcentaje por defecto de ese profesional. Si <C>listo_para_emitir</C> es{" "}
              <C>false</C>, <C>falta</C> dice qué le falta en palabras, por ejemplo &quot;Falta que el profesional vincule su clave del SII&quot;.
            </p>
          </Seccion>

          <Seccion id="emitir" titulo="4. Emitir las boletas de una atención">
            <Codigo>{"POST /sucursales/{sucursal}/boletas"}</Codigo>
            <Codigo>{`{
  "id_externo": "cb-2026-000123",
  "profesional": { "id": "aB3dE9" },
  "servicio": { "nombre": "Corte + barba", "monto": 20000 },
  "porcentaje_profesional": 50,
  "productos": [
    { "nombre": "Cera mate", "monto": 8000, "cantidad": 1 }
  ],
  "medio_pago": "debito",
  "cliente": { "nombre": "Pedro" }
}`}</Codigo>
            <Tabla
              cabecera={["Campo", "Obligatorio", "Detalle"]}
              filas={[
                [<C key="a">id_externo</C>, "sí", "El id de la atención en tu sistema (1 a 64 caracteres: letras, números, - y _). Hace el pedido idempotente."],
                [<C key="a">profesional</C>, "sí", <span key="d"><C>{`{ "id": "…" }`}</C> con el id de la sección 3, o <C>{`{ "rut": "12345678-9" }`}</C>.</span>],
                [<C key="a">servicio.nombre</C>, "sí", "Texto que sale en la boleta del local (máximo 80 caracteres)."],
                [<C key="a">servicio.monto</C>, "sí", "Lo que pagó el cliente por el servicio, en pesos enteros."],
                [<C key="a">porcentaje_profesional</C>, "no", "Entero de 1 a 99. Si no viene, se usa el configurado para el profesional."],
                [<C key="a">productos</C>, "no", "Hasta 30 líneas. monto es el total de la línea, no el precio unitario. Van enteros en la boleta del local."],
                [<C key="a">medio_pago</C>, "sí", "efectivo, debito, credito o transferencia."],
                [<C key="a">cliente.nombre</C>, "no", "Solo para tu registro y el panel."],
              ]}
            />
            <p>
              <strong className="text-text-primary">El reparto.</strong> Con un servicio de $20.000 al 50% y una cera de $8.000, la boleta de
              honorarios es de <strong className="text-text-primary">$10.000</strong> y la del local de{" "}
              <strong className="text-text-primary">$18.000</strong> ($10.000 del servicio más $8.000 de productos). Total $28.000, exactamente lo
              que pagó el cliente. Si el porcentaje no da un monto exacto, el peso que sobra queda en la boleta del local.
            </p>
            <p>
              La respuesta es <C>202 Accepted</C>: las boletas quedan en proceso. El SII demora entre segundos y un par de minutos.
            </p>
            <Codigo>{`{
  "sucursal": "koxbarbershop",
  "id_externo": "cb-2026-000123",
  "estado": "procesando",
  "reparto": {
    "total": 28000,
    "porcentaje_profesional": 50,
    "monto_honorarios": 10000,
    "monto_boleta_local": 18000,
    "detalle_boleta_local": { "servicio": 10000, "productos": 8000 }
  },
  "boletas": {
    "local": { "estado": "procesando", "folio": null, "monto": 18000, "pdf": null, "detalle": null },
    "honorarios": { "estado": "procesando", "folio": null, "monto": 10000, "detalle": null }
  }
}`}</Codigo>
            <p>
              <strong className="text-text-primary">Idempotencia.</strong> Si repites el POST con el mismo <C>id_externo</C> y los mismos
              datos (por un timeout, por ejemplo), no se emite otra vez: recibes <C>200</C> con el estado actual. Si lo repites con datos
              distintos recibes <C>409</C>. Así nunca se duplican boletas reales.
            </p>
          </Seccion>

          <Seccion id="estado" titulo="5. Consultar el estado">
            <Codigo>{"GET /sucursales/{sucursal}/boletas/{id_externo}"}</Codigo>
            <p>
              Devuelve el mismo formato que el POST. Consulta cada 10 a 30 segundos hasta que <C>estado</C> deje de ser{" "}
              <C>procesando</C>.
            </p>
            <Tabla
              cabecera={["estado", "Qué significa"]}
              filas={[
                [<C key="e">procesando</C>, "Al menos una boleta todavía no sale."],
                [<C key="e">emitida</C>, "Las dos boletas están emitidas. Los folios vienen en boletas.local.folio y boletas.honorarios.folio."],
                [<C key="e">error</C>, "Una boleta falló. La revisamos nosotros y el local la ve en Facturación del panel. No reenvíes el pedido con otro id_externo: se emitiría dos veces."],
                [<C key="e">anulada</C>, "Una de las boletas se anuló desde el panel."],
                [<C key="e">simulada</C>, "Solo en el sandbox."],
              ]}
            />
            <p>
              Cada boleta trae además su propio <C>estado</C>. Puede venir <C>revisar</C>: la boleta pudo haber quedado timbrada en el SII y
              hay que confirmarlo antes de reintentar. Eso lo hacemos nosotros.
            </p>
          </Seccion>

          <Seccion id="errores" titulo="6. Errores">
            <Codigo>{`{
  "error": {
    "codigo": "profesional_no_listo",
    "mensaje": "Falta que el profesional vincule su clave del SII",
    "profesional": "aB3dE9"
  }
}`}</Codigo>
            <Tabla
              cabecera={["HTTP", "codigo", "Cuándo"]}
              filas={[
                ["400", <C key="c">datos_invalidos</C>, "Faltan campos o vienen mal. detalles lista cada problema."],
                ["401", <C key="c">no_autorizado</C>, "Falta la clave o no es válida."],
                ["404", <C key="c">sucursal_no_encontrada</C>, "La sucursal no está habilitada para tu clave. También boleta_no_encontrada y ruta_no_encontrada."],
                ["409", <C key="c">id_externo_repetido</C>, "Ese id_externo ya se usó con otros datos."],
                ["422", <C key="c">sucursal_no_lista</C>, "A la sucursal le falta configuración (mensaje dice qué)."],
                ["422", <C key="c">profesional_no_listo</C>, "El profesional todavía no puede emitir. También profesional_no_encontrado."],
                ["429", <C key="c">demasiadas_solicitudes</C>, "Pasaste las 120 por minuto."],
                ["500", <C key="c">error_interno</C>, "Reintenta con el mismo id_externo."],
              ]}
            />
            <p>Los errores 4xx se validan antes de emitir: si recibes uno, no salió ninguna boleta.</p>
          </Seccion>

          <Seccion id="sandbox" titulo="7. Probar en el sandbox">
            <p>
              Con una clave <C>stk_test_</C> la única sucursal es <C>prueba</C>. <C>pro-prueba-1</C> está listo para emitir y{" "}
              <C>pro-prueba-2</C> responde <C>profesional_no_listo</C>, para que pruebes ese caso.
            </p>
            <Codigo>{`curl -X POST ${BASE}/sucursales/prueba/boletas \\
  -H "Authorization: Bearer stk_test_..." \\
  -H "Content-Type: application/json" \\
  -d '{"id_externo":"prueba-1","profesional":{"id":"pro-prueba-1"},
       "servicio":{"nombre":"Corte","monto":20000},
       "porcentaje_profesional":50,"medio_pago":"efectivo"}'`}</Codigo>
          </Seccion>

          <Seccion id="anulaciones" titulo="8. Anulaciones">
            <p>
              En esta versión las boletas se anulan desde el panel de SynapTech: nota de crédito para la del local y anulación en el SII
              para la de honorarios. La consulta de la sección 5 refleja el estado <C>anulada</C>.
            </p>
          </Seccion>

          <section className="border-t border-border-subtle pt-8">
            <p>
              ¿Dudas o quieres una clave? Escríbenos a{" "}
              <a href="mailto:hola@synaptechspa.cl" className="text-accent hover:underline">hola@synaptechspa.cl</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

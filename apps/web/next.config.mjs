/** @type {import('next').NextConfig} */

/* ── EL DIRECTORIO DE LOCALES VIVE ACÁ, AUNQUE LO SIRVA OTRO REPO ──────────
 *
 * Las cuatro páginas del directorio (barberías y peluquerías de Viña y la
 * Quinta Región) las genera el repo de la plataforma y las sirve
 * `app.synaptechspa.cl`. Su dirección pública, sin embargo, es
 * `synaptechspa.cl/<slug>`: estos rewrites traen el HTML, y el generador ya
 * emite canonical y og apuntando a este dominio.
 *
 * POR QUÉ. Medido el 21-09-2026 con el servicio de favicons de Google, que
 * responde 200 solo para hosts indexados:
 *
 *     synaptechspa.cl                      200
 *     app.synaptechspa.cl                  404   ← el directorio
 *     aurasalon.synaptechspa.cl            404
 *     infinity.synaptechspa.cl             404
 *     kronnospenablanca.synaptechspa.cl    404
 *
 * Google no conocía `app.`, y como los subdominios de los locales cuelgan del
 * directorio, tampoco llegaba a ellos. Este dominio sí está indexado: un host
 * nuevo parte de cero en autoridad y el principal ya la tiene.
 *
 * Lo que cuesta no tenerlo: buscando "barbería Villa Alemana reservar hora
 * online", AgendaPro ocupa 3 de los 10 resultados —dos con páginas de
 * directorio iguales a estas— y Kronnos Peñablanca, con 341 citas al mes en
 * esa comuna, no aparece.
 *
 * Las imágenes van aparte porque las páginas las piden con ruta absoluta
 * (`/directorio/img/…`): sin su propio rewrite quedarían en 404 acá.
 */
/* 18-10-2026: las cuatro páginas pasaron a ser rutas de este sitio, con datos
   vivos (src/app/barberias-vina-del-mar… y lib/paginas-directorio.ts). Ya no se
   traen de app por rewrite; queda solo el de las imágenes viejas, por si algún
   enlace o caché todavía las pide. */
const APP = "https://app.synaptechspa.cl";

const nextConfig = {
  transpilePackages: ["@synaptech/ui"],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  /* /saas-comercial era la página de barberías del sitio viejo (precios de
     $30.000/$50.000 y cuadros sin imagen). Desde el 09-10-2026 es /barberias;
     el 308 conserva lo que Google ya tenía indexado.
     Las otras cuatro son de la etapa en que el sitio vendía desarrollo a
     medida (casos de proyectos, portales clínicos, artículos "software a
     medida"). Hasta el 09-10-2026 seguían respondiendo 200 con noindex; ahora
     no existen y cada una lleva a la página del producto que la reemplaza. */
  async redirects() {
    return [
      { source: "/saas-comercial", destination: "/barberias", permanent: true },
      { source: "/casos", destination: "/locales", permanent: true },
      { source: "/casos/:slug*", destination: "/locales", permanent: true },
      { source: "/portales-clinicos", destination: "/clinicas", permanent: true },
      { source: "/blog", destination: "/comparar", permanent: true },
      { source: "/blog/:slug*", destination: "/comparar", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/directorio/img/:path*", destination: `${APP}/directorio/img/:path*` },
    ];
  },
};

export default nextConfig;

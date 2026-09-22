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
const DIRECTORIO = [
  "barberias-vina-del-mar",
  "peluquerias-vina-del-mar",
  "barberias-quinta-region",
  "peluquerias-quinta-region",
];

const APP = "https://app.synaptechspa.cl";

const nextConfig = {
  transpilePackages: ["@synaptech/ui"],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      ...DIRECTORIO.map((slug) => ({
        source: `/${slug}`,
        destination: `${APP}/${slug}`,
      })),
      { source: "/directorio/img/:path*", destination: `${APP}/directorio/img/:path*` },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

/**
 * Cabeceras de seguridad (G7). Se aplican a TODAS las rutas.
 *
 * Content-Security-Policy (solo en producción: `next dev` necesita eval y scripts en línea):
 *  - default-src 'self': nada se carga de otros orígenes salvo lo listado.
 *  - script-src: 'self' + HASHES de los scripts en línea (sin 'unsafe-inline'). Las páginas son estáticas (SSG),
 *    así que no se puede usar nonce (exigiría renderizar cada petición); los hashes se calculan después del build
 *    con scripts/csp-hashes.mjs, que sustituye el marcador de abajo en .next/routes-manifest.json. Si ese paso no
 *    corre, el marcador queda como un origen inválido y el navegador BLOQUEA los scripts en línea: el fallo se ve
 *    enseguida en lugar de dejar una CSP abierta. Por eso `pnpm build` ejecuta los dos pasos.
 *  - Cloudflare Web Analytics (beacon, sin cookies): static.cloudflareinsights.com (script) y
 *    cloudflareinsights.com (envío de la medición). Si no se activa en el panel de Cloudflare, no se usan.
 *  - style-src-attr 'unsafe-inline': solo para atributos style="" (los usan los componentes). Las etiquetas
 *    <style> siguen restringidas a 'self' + hashes. Un atributo style no puede ejecutar código.
 */
const CSP_SCRIPT_MARKER = "__CSP_SCRIPT_HASHES__";
const CSP_STYLE_MARKER = "__CSP_STYLE_HASHES__";
/** Marcador de la CSP propia de /business-friends (página estática en public/, ver más abajo). */
const CSP_BF_STYLE_MARKER = "__CSP_BF_STYLE_HASHES__";

const csp = [
  "default-src 'self'",
  `script-src 'self' ${CSP_SCRIPT_MARKER} https://static.cloudflareinsights.com`,
  `style-src 'self' ${CSP_STYLE_MARKER}`,
  "style-src-attr 'unsafe-inline'",
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self' https://cloudflareinsights.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const isProd = process.env.NODE_ENV === "production";

const baseSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=(), browsing-topics=()",
  },
];

const securityHeaders = [
  ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
  ...baseSecurityHeaders,
];

/**
 * /business-friends: mini página estática (public/business-friends/index.html, servida tal cual, sin pasar por React).
 * Lleva su propia CSP, lo mínimo para que se vea:
 *  - style-src: 'self' + el hash de su <style> en línea (lo calcula scripts/csp-hashes.mjs en cada build leyendo el
 *    archivo, no se escribe a mano) + fonts.googleapis.com (la hoja de estilos de Google Fonts).
 *  - font-src: 'self' + fonts.gstatic.com (los archivos de la tipografía).
 *  - script-src 'self' sin hashes: la página no tiene scripts (el script de build falla si algún día los añade).
 *  - Sin 'unsafe-inline' y sin style-src-attr: tampoco admite atributos style="".
 * Va además con noindex, nofollow (oferta solo para compartir por enlace). La regla global excluye esta ruta para que
 * ninguna de las dos CSP dependa del orden en que Next combina cabeceras repetidas.
 */
const BF_PATH = "business-friends";
const bfCsp = [
  "default-src 'self'",
  "script-src 'self'",
  `style-src 'self' ${CSP_BF_STYLE_MARKER} https://fonts.googleapis.com`,
  "img-src 'self'",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const bfHeaders = [
  ...(isProd ? [{ key: "Content-Security-Policy", value: bfCsp }] : []),
  ...baseSecurityHeaders,
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];

const nextConfig: NextConfig = {
  // Build con poca memoria: por defecto Next usa un worker por núcleo y genera varias páginas a la vez. Con ~6 GB de RAM
  // (y en un VPS pequeño de Dokploy) eso provocó cierres intermitentes durante "Generating static pages" (heap OOM,
  // worker caído). Son solo 13 rutas: 2 workers y 2 páginas a la vez cuestan segundos y reducen el pico de memoria.
  experimental: { cpus: 2, staticGenerationMaxConcurrency: 2 },
  async headers() {
    return [
      // Todas las rutas EXCEPTO la página y sus dos archivos (ver arriba). Cualquier otra ruta, incluido un 404 bajo
      // /business-friends/, lleva la CSP global como siempre.
      { source: `/((?!${BF_PATH}(?:/(?:index\\.html|og\\.png))?$).*)`, headers: securityHeaders },
      { source: `/${BF_PATH}`, headers: bfHeaders },
      { source: `/${BF_PATH}/index.html`, headers: bfHeaders },
      { source: `/${BF_PATH}/og.png`, headers: bfHeaders },
    ];
  },
  async rewrites() {
    // Next no sirve el index.html de una carpeta de public/: /business-friends (sin barra; con barra Next redirige
    // a esta) se reescribe al archivo. Se evalúa después de los archivos de public/, así que no afecta a otras rutas.
    return [{ source: `/${BF_PATH}`, destination: `/${BF_PATH}/index.html` }];
  },
};

export default nextConfig;

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

const securityHeaders = [
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Content-Security-Policy", value: csp }]
    : []),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Build con poca memoria: por defecto Next usa un worker por núcleo y genera varias páginas a la vez. Con ~6 GB de RAM
  // (y en un VPS pequeño de Dokploy) eso provocó cierres intermitentes durante "Generating static pages" (heap OOM,
  // worker caído). Son solo 13 rutas: 2 workers y 2 páginas a la vez cuestan segundos y reducen el pico de memoria.
  experimental: { cpus: 2, staticGenerationMaxConcurrency: 2 },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

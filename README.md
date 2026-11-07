# ERVIA Web

Landing de ERVIA (www.ervia.tech). Reglas del proyecto y fuentes de verdad: [CLAUDE.md](CLAUDE.md).

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · pnpm · Node 24 (`.nvmrc`).

## Comandos

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint
pnpm typecheck
pnpm build && pnpm start
pnpm brand:icons  # regenera icon.svg, favicon.ico y apple-icon.png desde public/brand/ervia-mark.svg
```

## Entorno

Copia `.env.example` a `.env.local`. `NEXT_PUBLIC_SITE_ENV` (`production` | `staging`) se incrusta en el
build: si no es `production`, todas las páginas llevan `<meta name="robots" content="noindex,nofollow">`.

## Seguridad (CSP) y build

`pnpm build` ejecuta **dos pasos**: `next build` y `node scripts/csp-hashes.mjs`. El segundo calcula los hashes de
los scripts en línea del HTML prerenderizado y los escribe en la Content-Security-Policy de
`.next/routes-manifest.json` (las páginas son estáticas, así que no se puede usar nonce y no se usa `'unsafe-inline'`
para scripts). **El comando de build en Dokploy debe ser `pnpm build`**, no `next build` a secas: sin el segundo paso
los scripts en línea quedan bloqueados y la página se rompe a la vista. Las cabeceras están en `next.config.ts`.

`/business-friends` es una página estática (`public/business-friends/index.html`, sin React) con su **propia CSP**
(solo su `<style>` por hash, Google Fonts y nada más) y `X-Robots-Tag: noindex, nofollow`. El hash de su `<style>` lo
calcula `scripts/csp-hashes.mjs` en cada build: si editas ese `<style>`, basta con volver a construir. El build falla si
la página gana un script en línea o un atributo `style=""`, porque esa CSP los bloquearía. Next no sirve el `index.html`
de una carpeta de `public/`, por eso `next.config.ts` reescribe `/business-friends` a ese archivo.

Si se activa Cloudflare Web Analytics (panel de Cloudflare, instalación automática), la CSP ya permite su beacon
(`static.cloudflareinsights.com` y `cloudflareinsights.com`); no hace falta tocar el código.

## SEO

Metadatos en `src/app/layout.tsx` y `src/app/page.tsx`; textos en `SEO` de `src/config/site.ts`. Datos estructurados
(ProfessionalService, FAQPage y HowTo) en `src/lib/structured-data.ts`, generados con las mismas constantes que pintan
la página (FAQ, pasos del método). `robots.ts`, `sitemap.ts`, `/llms.txt` y la imagen para compartir
(`opengraph-image.tsx`, `twitter-image.tsx`) se generan en el build.

## Diseño

- Tokens: `src/styles/tokens.css` (copia literal de `docs/design-base/tokens.css`), mapeados a utilidades de
  Tailwind en `src/app/globals.css` conservando sus nombres (`bg-navy-900`, `text-green-500`, `shadow-card`…).
- Reglas de color y componentes: `docs/design-base.md`.
- Logo: `public/brand/` y `<Logo variant="horizontal|mark" tone="onDark|onLight" />`.
- Textos legales: `src/content/legal/*.md` (los originales de la landing anterior están en `docs/legales/`).

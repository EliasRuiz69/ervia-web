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

## Diseño

- Tokens: `src/styles/tokens.css` (copia literal de `docs/design-base/tokens.css`), mapeados a utilidades de
  Tailwind en `src/app/globals.css` conservando sus nombres (`bg-navy-900`, `text-green-500`, `shadow-card`…).
- Reglas de color y componentes: `docs/design-base.md`.
- Logo: `public/brand/` y `<Logo variant="horizontal|mark" tone="onDark|onLight" />`.
- Textos legales: `src/content/legal/*.md` (los originales de la landing anterior están en `docs/legales/`).

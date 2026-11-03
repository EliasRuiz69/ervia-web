# ERVIA Web — reglas del proyecto

## Qué es
Landing de ERVIA (www.ervia.tech): automatización con IA para pymes de México, hecha en Mérida. Objetivo único: generar conversaciones por WhatsApp y diagnósticos agendados.

## Fuentes de verdad (en este orden)
1. docs/design-base.md — ADN visual de la landing anterior (tokens, tipografías, componentes, movimiento). MANDA sobre el estilo.
2. docs/plan-landing-multiservicio-v2.md — MANDA sobre contenido y estructura de la home desde nov 2026.
3. docs/auditoria-landing-ervia-v2.md — estrategia, estructura, copy, Método ERVIA, hero, SEO. MANDA sobre el contenido en lo que el plan multiservicio no cubra. Ignora su sección 9 (plan de modificación antiguo).
4. docs/plan-nueva-landing-ervia-v1.md — plan de construcción por fases.
Las skills de diseño aportan calidad de ejecución. NUNCA cambian paleta, tipografías, radios ni estilo general definidos en design-base.md.

## Stack
Next.js (App Router) + TypeScript + Tailwind CSS v4 (tokens en src/styles/tokens.css mapeados en @theme) + shadcn/ui re-estilizado con los tokens. Gestor: pnpm. Páginas estáticas (SSG); única ruta dinámica: /api/lead.

## Reglas de contenido
- Español de México (costo, no "coste"; $X,XXX MXN; 72% sin espacio). Tuteo.
- NINGUNA cifra de resultados que no sea real o esté etiquetada como ejemplo.
- Copy exacto de la auditoría v2 salvo que yo indique otro.
- La tecnología se explica al final de cada bloque ("Cómo lo logramos"), nunca en el titular.

## Reglas técnicas
- Accesibilidad AA: contraste ≥ 4,5:1, foco visible, labels reales, objetivos táctiles de 44×44 px, prefers-reduced-motion en toda animación.
- Rendimiento: Lighthouse ≥ 90 en móvil; LCP < 2,5 s; CLS < 0,1; animaciones solo con transform/opacity; imágenes en WebP/AVIF con width/height.
- Sin scroll horizontal de 360 a 1440 px.
- Componentes de 21st.dev: solo como punto de partida estructural; siempre re-estilizados con tokens de ERVIA.
- Secretos: nunca en el repo ni en el chat. Solo variables de entorno (.env.local ignorado por git; en Dokploy, en Environment).
- Staging (NEXT_PUBLIC_SITE_ENV=staging) siempre con noindex.

## Flujo de trabajo
- Rama develop para trabajo diario; main = producción. Nunca push a main sin mi confirmación explícita.
- No despliegues, no toques Dokploy, Cloudflare ni el VPS.
- Una fase a la vez. Al terminar cada fase: archivos tocados, capturas a 1440 y 390 px (Playwright), build sin errores, y espera mi visto bueno.

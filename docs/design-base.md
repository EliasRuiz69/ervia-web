# ERVIA — ADN de diseño (extraído de la landing anterior)

Fuente: `C:\dev\ervia-landing-referencia` (Vite + React 18 SPA, commit `1e3140d`). Extraído solo leyendo el código y midiendo la página renderizada a 1440 px y 390 px. Nada de la carpeta de referencia fue modificado.

Archivos relacionados:

- `docs/design-base/tokens.css`: las variables de `:root`, copiadas sin cambiar ningún valor (verificado con `diff`).
- `docs/design-base/assets/`: logo e isotipo (solo existen en PNG).
- `docs/design-base/capturas/`: referencia visual a 1440 px y 390 px.
- `docs/legales/`: política de privacidad y de cookies en Markdown.

> **Tres cosas del encargo que no coinciden con la realidad del código** (detalle en cada sección):
>
> 1. **No hay `<canvas>`** en la landing anterior. El fondo del hero es un **vídeo HLS** de Mux (`<video>` + `hls.js`).
> 2. **El menú móvil no existe por un bug concreto**, no solo por omisión (ver 6).
> 3. `docs/ervia-landing.md` de la referencia describe una dirección visual **Swiss/Brutalist blanca** que **no es** lo que se construyó. Lo construido es dark-first navy. Este documento describe lo construido.

---

## 1. Paleta y uso

Todo vive en `tokens.css`. Sistema **dark-first**: lienzo navy, texto claro, verde como color de marca/acción y azul como secundario.

### Escala navy (fondos, superficies, texto atenuado)

| Token | Valor | Uso real |
|---|---|---|
| `--navy-950` | `#080D1A` | Fondo profundo: secciones "deep" (Casos, Contacto), footer, tarjeta destacada de precios, base de `--surface-input` |
| `--navy-900` | `#0F172A` | **Fondo de página** (`body`), navbar (al 78 % de opacidad), banner de cookies |
| `--navy-850` | `#131D33` | **Tarjetas** (`--surface-card`) |
| `--navy-800` | `#1A2540` | Superficie elevada (`--surface-raised`), iconos sociales |
| `--navy-700` … `--navy-50` | `#233150` … `#F1F5F9` | Definidos, **casi sin uso directo** en componentes; los textos usan los tokens `--text-*` |

### Verde de marca (acción)

| Token | Valor | Uso |
|---|---|---|
| `--green-500` | `#07F991` | Botón primario, foco de marca, énfasis |
| `--green-400` | `#2BFA9F` | Hover del primario / hover de enlaces verdes |
| `--green-600` | `#05D87D` | `:active` del primario |
| `--green-300`, `--green-700` | `#5FFBB4`, `#04B468` | Definidos, sin uso |

Texto sobre verde: `--text-on-green` `#06281A`.

### Azul de marca (secundario)

| Token | Valor | Uso |
|---|---|---|
| `--blue-500` | `#3166F4` | Botón secundario (`btn-secondary`), extremo del degradado |
| `--blue-400` | `#5680F6` | Overlines "azules", enlaces secundarios, mailto, foco de input |
| `--blue-300` | `#7C9BF8` | Hover de enlace azul |
| `--blue-600`, `--blue-700` | `#2452D6`, `#1C41AE` | `:active` del secundario; sin uso más allá |

### Texto

| Token | Valor | Uso |
|---|---|---|
| `--text-strong` | `#F8FAFC` | Titulares, valores, texto de énfasis |
| `--text-body` | `#CBD5E1` | Cuerpo de texto (por defecto del `body`) |
| `--text-muted` | `#8294AC` | Apoyo: microcopy, etiquetas de métricas, overline "muted" |
| `--text-faint` | `#5B6B84` | Notas al pie 13 px. **Contraste ≈ 3,3:1 sobre `#0F172A`: no pasa AA** |

### Superficies, bordes, estados

- Superficies: `--surface-page` (navy-900), `--surface-deep` (navy-950), `--surface-card` (navy-850), `--surface-raised` (navy-800), `--surface-input` (`rgba(8,13,26,.55)`), tintes `--surface-green-tint` y `--surface-blue-tint`.
- Bordes (slate translúcido): `--border-subtle` .12, `--border-default` .20, `--border-strong` .32, `--border-green` (verde .4), `--border-blue` (azul .5).
- Error: `--status-danger` `#F87171` y `--status-danger-tint`.
- Selección de texto: `rgba(7,249,145,.3)`.

### Regla: "el verde es solo para acciones"

**Regla para la nueva landing:** el verde (`--green-*`) se reserva a lo que el usuario puede *pulsar* o al estado de éxito de una acción: botón primario, su hover/active/glow, enlace de acción, foco del CTA y confirmación del formulario. Nada decorativo ni informativo.

**La landing anterior no la cumplía.** Usos del verde que *no* son acción (no heredar):

- Overlines de sección (`Servicios`, `Precios`, `FAQ`…).
- La segunda línea del H1 y del H2 de contacto.
- Guiones de las listas de servicios.
- El `+ / −` del acordeón.
- El primer valor de cada caso (`18 h`).
- Etiqueta "Recomendado" de precios y su borde/sombra verde.
- Icono de ubicación del footer.
- Sombra del botón primario en reposo (`--shadow-cta`): esta sí es de acción y es válida.

**Propuesta:** el énfasis tipográfico pasa a `--text-strong` (o al azul), y los overlines a azul o muted. Así, cada pixel verde de la página es un botón o un enlace, y el ojo va solo al CTA.

El azul cumple hoy dos papeles: overlines/enlaces secundarios (informativo) y botón secundario (acción). Conviene decidir en la nueva landing si el azul se restringe a "información/navegación" para no competir con el verde.

**Degradado** `--gradient-duotone`: `linear-gradient(100deg, green-500, blue-500)`. Se usó solo para los números `01–04` del proceso (`.gradient-text`). Es decorativo con verde: contradice la regla; decidir si se conserva.

---

## 2. Tipografías

### Familias (`tokens.css`)

| Token | Valor |
|---|---|
| `--font-display` | `'Baloo 2', 'DM Sans', system-ui, sans-serif` |
| `--font-body` | `'DM Sans', system-ui, sans-serif` |
| `--font-mono` | `'JetBrains Mono', ui-monospace, monospace` (**cargada pero no se usa en ningún componente**) |

### Pesos realmente usados

- **Baloo 2**: solo 700 (todos los `h1–h4`, números y precios).
- **DM Sans**: 400 (cuerpo), 500 (nav, etiquetas de formulario, cookies), 600 (botones, overlines, enlaces, FAQ, negritas). También se pide 400 *italic* (citas de casos).
- **JetBrains Mono** 400: solicitada, sin uso.

### Cómo se cargan

`<link>` a **Google Fonts** en `index.html` (con `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com`), `display=swap`:

```
Baloo 2:wght@700
DM Sans: ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400
JetBrains Mono:wght@400
```

Fuentes servidas por un tercero: implica petición externa y transferencia de IP a Google (relevante para la política de privacidad/cookies). En la nueva versión: autoalojar (`@font-face` + `woff2`, `font-display: swap`) y eliminar JetBrains Mono si no se usa.

### Escala de tamaños (medida en el DOM a 1440 px)

| Elemento | Familia / peso | Tamaño | Interlineado | Otros |
|---|---|---|---|---|
| **H1** hero | Baloo 2 / 700 | `clamp(44px, 6.5vw, 86px)` (=86 px a 1440) | 1.05 | `letter-spacing: -0.01em`, max 880 px |
| **H2** de sección | Baloo 2 / 700 | `clamp(30px, 3.6vw, 48px)` | 1.15 | `-0.01em`, max 760 px, `margin-top` 16 px |
| **H2** contacto | Baloo 2 / 700 | `clamp(36px, 4.4vw, 60px)` | 1.1 | `-0.01em` |
| **H3** tarjeta de servicio | Baloo 2 / 700 | 26 px | 1.2 | |
| **H3** caso | Baloo 2 / 700 | `clamp(24px, 2.6vw, 34px)` | 1.2 | |
| **H3** paso de proceso | Baloo 2 / 700 | 24 px | por defecto 1.1 | |
| Números de proceso | Baloo 2 / 700 | 88 px | 1 | degradado |
| Métrica / precio | Baloo 2 / 700 | 44 px | 1 | |
| Frases del problema | DM Sans / 400 | `clamp(20px, 2.4vw, 32px)` | 1.4 | |
| Subtítulo hero | DM Sans / 400 | `clamp(17px, 1.6vw, 22px)` | 1.6 | max 560 px |
| Lead de sección | DM Sans / 400 | 19 px | 1.6 | max 600 px |
| Cuerpo (`body`) | DM Sans / 400 | 16 px | 1.55 | `-webkit-font-smoothing: antialiased` |
| Cuerpo en tarjetas y precios | DM Sans / 400 | **15 px** | 1.5–1.55 | |
| **Eyebrow / overline** | DM Sans / 600 | **13 px** | | MAYÚSCULAS, `letter-spacing: 0.14em` |
| Botón `sm / md / lg` | DM Sans / 600 | 14 / 15 / 17 px | | |
| FAQ pregunta / respuesta | DM Sans / 600 / 400 | 18 px / 16 px | 1.4 / 1.65 | |
| Etiqueta de campo / input | DM Sans / 500 / 400 | 14 px / 15 px | | |
| Microcopy, notas, error, hint | DM Sans / 400 | 13–14 px | | color `muted` / `faint` |
| Enlace de acción `.link-green` / `.link-blue` | DM Sans / 600 | 17 px / 15 px | | subrayado, offset 4 px |

Inventario de texto a 1440 px: 24 elementos a 13 px, 19 a 14 px y **43 a 15 px** (más 1 a 12 px): unos 87 textos por debajo de 16 px.

---

## 3. Componentes (estilos exactos)

Espaciado, radios, sombras y duraciones referencian los tokens de `tokens.css`. Estilos base en `src/index.css`; el resto va inline en cada componente.

### Navbar

- `position: sticky; top: 0; z-index: 40`.
- Flex, `justify-content: space-between`, `gap: 16px`, `padding: 14px 32px`.
- `border-bottom: 1px solid var(--border-subtle)`; `background: rgba(15,23,42,.78)`; `backdrop-filter: blur(12px)`.
- Logo horizontal PNG a `height: 32px`, enlaza a `#inicio`.
- Enlaces `.nav-link`: 14 px / 500, color `--text-body`, `padding: 8px 12px`, `border-radius: pill`; hover → `--text-strong` (120 ms).
- CTA: `btn btn-outline btn-sm`, texto "Diagnóstico gratuito" (**es outline, no verde**: el CTA principal de la barra no destaca).
- Altura a 1440 px: ≈ 61 px. A 390 px: **≈ 109 px** (se rompe, ver 6).

### Botones

Base `.btn`: `inline-flex`, centrado, `border: none`, `border-radius: 999px` (pill), DM Sans 600, `white-space: nowrap`. Transiciones de background, box-shadow, border-color, color y transform a 120 ms `--ease-out`.

| Variante | Estilos |
|---|---|
| **Primario** `.btn-primary` | fondo `--green-500`, texto `--text-on-green`, `box-shadow: --shadow-cta`. Hover: `--green-400`, `translateY(-1px)`, `--glow-green`. Active: `--green-600`, sin transform |
| **Secundario** `.btn-secondary` | fondo `--blue-500`, texto blanco. Hover `--blue-400`, active `--blue-600` |
| **Outline** `.btn-outline` | transparente, texto `--text-body`, `border: 1px solid --border-default`. Hover: borde `--border-strong`, texto `--text-strong` |

Tamaños: `btn-sm` 14 px / `8px 18px`; `btn-md` 15 px / `10px 22px`; `btn-lg` 17 px / `14px 30px`.

No hay estilo `:focus-visible` definido en ningún botón ni enlace (solo en inputs).

### Tarjetas

`.card`: fondo `--surface-card`, `border: 1px solid --border-subtle`, `radius: --radius-lg` (16 px), `padding: 28px 32px`, `--shadow-card`, columna con `gap: 20px`. Hover: borde `--border-default` (200 ms).

Variantes inline: tarjeta de caso (`padding: 40px`, rejilla interior `auto-fit minmax(300px, 1fr)`, `gap: 40px`); tarjeta de precio (`padding: 36px 32px`); la destacada usa fondo `--surface-deep`, borde `--border-green` y `box-shadow: 0 0 32px rgba(7,249,145,.12)`; tarjeta de formulario (`padding: 36px`).

### Eyebrows (overlines)

`.overline`: `inline-block`, 13 px / 600, MAYÚSCULAS, `letter-spacing: 0.14em`. Colores: `.overline-green` (`--green-500`), `.overline-blue` (`--blue-400`), `.overline-muted` (`--text-muted`). Van 16 px por encima del H2 de cada sección.

### Badges

Solo hay uno: **"Recomendado"** en la tarjeta destacada de precios. Posición absoluta (`top: -12px; left: 32px`), 12 px / 600, MAYÚSCULAS con `0.14em`, texto `--text-on-green` sobre `--green-500`, `radius: pill`, `padding: 4px 12px`. No existe sistema de badges genérico.

### Acordeón del FAQ

- Contenedor: `max-width: 800px` (`section-inner-narrow`); lista con `border-top` y cada ítem con `border-bottom: 1px solid --border-subtle`.
- Botón `.faq-btn`: ancho completo, flex `space-between`, `gap: 24px`, `padding: 22px 4px`, DM Sans 18 px / 600, `--text-strong`, `line-height: 1.4`; hover → `--green-400`.
- Icono: `+` / `−` en Baloo 2 26 px, `--green-500`.
- Respuesta: `<p>` 16 px / 1.65, `--text-body`, `padding: 0 4px 24px`, `white-space: pre-line`, `max-width: 660px`.
- Comportamiento: un solo ítem abierto (estado `open`), inicia cerrado. `aria-expanded` presente. **La apertura es instantánea** (renderizado condicional, sin transición de altura); el `transform` de rotación del icono es `rotate(0deg)` en ambos estados, es decir, nunca rota.
- No hay `aria-controls`, `id` de panel ni `role="region"`.

### Inputs del formulario

- Grupo `.form-group`: columna, `gap: 6px`. Label 14 px / 500 `--text-body`.
- `.form-input`: ancho 100 %, fondo `--surface-input`, `border: 1px solid --border-default`, `radius: --radius-md` (12 px), `padding: 10px 14px`, DM Sans 15 px, texto `--text-strong`, placeholder `--text-muted`, `outline: none`, `resize: vertical`; textarea `min-height: 96px`.
- Foco: borde `--border-blue` + anillo `0 0 0 3px rgba(49,102,244,.12)` (120 ms).
- Error: borde `--status-danger`; anillo de foco `--status-danger-tint`; mensaje 13 px `--status-danger`. Hint 13 px `--text-muted`.
- Campos: Nombre, Correo de empresa, "¿Qué proceso te quita más tiempo?" (opcional). Sin `<form>`, sin `id`/`for` en labels, sin `name`, sin `required`, sin `autocomplete`. El botón es `<button onClick>`, no `type="submit"`, así que Enter no envía.
- Éxito: círculo de 48 px con tinte verde, "✓" y "Recibido, {nombre}." (Baloo 2 26 px).

### Footer

- `border-top: 1px solid --border-subtle`, fondo `--navy-950`.
- Rejilla `1fr 1fr 1fr`, `gap: 56px`, `padding-top: 72px`; tres columnas con overline azul: **Contacto** (logo a 30 px, correo, "Mérida (México)" con icono de ubicación verde), **Enlaces** (5 iconos sociales de 44×44, `radius: 12px`, fondo `--surface-raised`, hover `translateY(-2px)`, **todos con `href="#"`**) y **Legal** (Aviso Legal `#`, Privacidad, Cookies, Condiciones `#`).
- `.footer-link`: 15 px, `--text-body`, hover `--text-strong`.
- Barra inferior: `max-width: 1140px`, `padding: 24px 32px`, `border-top`, "© 2026 ERVIA. Todos los derechos reservados." en 13 px `--text-faint`.
- Móvil: rejilla de 1 columna, `gap: 40px`.

### Otros

- **Banner de cookies**: fijo abajo, `z-index: 9999`, fondo `--navy-900`, borde superior sutil, `padding: 20px 24px`. Botones "Solo necesarias" (contorno, radio 12 px) y "Aceptar todas" (verde, radio 12 px, **no pill**: incoherente con `.btn`). Guarda la elección en `localStorage['ervia_cookie_consent']`. **No activa ni bloquea nada**: no hay analítica en el código.
- **Enlaces** `.link-green` (17 px) y `.link-blue` (15 px): subrayados con offset 4 px, se usan como CTA secundarios de cada sección ("Calcular cuánto me cuesta →").

---

## 4. Layout

- **Contenedor**: `max-width: 1140px; margin: 0 auto` (`.section-inner`). Variante estrecha `800px` (`.section-inner-narrow`, solo FAQ).
- **Padding de sección**: `120px 32px` en escritorio; `80px 20px` a ≤ 768 px. Hero: `96px 32px 120px` (móvil `72px 20px 96px`). Footer: `padding-top: 72px`.
- **Separación de secciones**: `border-top: 1px solid --border-subtle`. Alternancia de fondo: `navy-900` (página) y `navy-950` (`.section-deep`: Casos y Contacto).
- **Hero**: `min-height: calc(100dvh - 61px)`, contenido alineado a la izquierda, vertical centrado.
- **Rejillas**, todas con `auto-fit` y `minmax`:

| Sección | Rejilla | Gap |
|---|---|---|
| Servicios | `repeat(auto-fit, minmax(290px, 1fr))` (3 col) | 24 px |
| Casos | apiladas en columna; cada caso en 2 col `minmax(300px, 1fr)` | 24 px / 40 px |
| Proceso | `repeat(auto-fit, minmax(230px, 1fr))` (4 col) | 40 px |
| Precios | `repeat(auto-fit, minmax(290px, 1fr))` (3 col) | 24 px |
| Contacto | `repeat(auto-fit, minmax(320px, 1fr))` (2 col) | 64 px |
| Footer | `1fr 1fr 1fr` | 56 px |

- **Breakpoints**: solo dos, 768 px y 480 px. A ≤ 768 px las clases (`.pricing-grid`, `.services-grid`, `.cases-grid`, `.footer-grid`, `.cta-grid`) fuerzan una columna con `!important`; `.steps-grid` pasa a 2 col y a 1 col a ≤ 480 px. **`.cases-grid` no existe en ningún componente** (regla muerta).
- **Espaciado**: escala de 4 px (`--space-1…24`). Los componentes casi no usan los tokens `--space-*`: los valores están escritos en píxeles.
- Altura total de la página: ≈ 7.980 px a 1440 px; ≈ 11.565 px a 390 px.

---

## 5. Movimiento

### Qué se anima

Solo hay **transiciones de estado (hover/foco)**, sin animaciones de entrada, sin `@keyframes`, sin `IntersectionObserver`, sin animación al hacer scroll.

| Elemento | Propiedad | Duración | Easing |
|---|---|---|---|
| Enlaces de nav, footer, `.link-*` | `color` | 120 ms (`--duration-fast`) | `--ease-out` |
| Botones | background, box-shadow, border-color, color, transform | 120 ms | `--ease-out` |
| Inputs | border-color, box-shadow | 120 ms | `--ease-out` |
| Iconos sociales | border-color, color, transform (−2 px) | 120 ms | `--ease-out` |
| Tarjeta `.card` | border-color | 200 ms (`--duration-base`) | `--ease-out` |
| FAQ icono | transform | 200 ms, pero no rota (ver 3) | `--ease-out` |

`--ease-out`: `cubic-bezier(0.22, 1, 0.36, 1)`. `--duration-slow` (350 ms) está definido y no se usa. `html { scroll-behavior: smooth }` para los anclas.

### Fondo del hero de la landing anterior: un vídeo, no un canvas

> **Solo diagnóstico.** La nueva landing **no** usa este vídeo ni ningún fotograma suyo (ver sección 8).

- Verificado en el DOM renderizado: **0 elementos `<canvas>`, 1 elemento `<video>`**.
- `<video muted loop playsInline autoPlay>` a pantalla completa (`position: absolute; inset: 0; object-fit: cover; opacity: 0.4`), con `hls.js` (`enableWorker: false`) sobre un stream HLS de Mux: `https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8`. Safari lo reproduce de forma nativa.
- Encima: degradado diagonal `linear-gradient(105deg, rgba(15,23,42,.92) 0%, .55 55%, .35 100%)` y fundido inferior a `--navy-900` (38 %).
- Aspecto: barras verticales tenues (tipo gráfico de datos) sobre navy; se aprecia a la derecha del hero, muy atenuado (ver `seccion-02-hero-1440.png`).
- **Coste**: vídeo de **2880 × 1248**, reproducido en bucle sin parar; el bundle JS pasa a **696 kB (216 kB gzip)**, de los cuales la mayor parte es `hls.js` (CSS: 8 kB). Depende de un CDN de terceros: sin él, el hero queda vacío (no hay `poster` ni fallback).
- **`prefers-reduced-motion`: no se respeta.** No hay ninguna referencia en el código. Tampoco pausa cuando la pestaña está oculta ni cuando el hero sale de pantalla.

En la nueva landing este efecto **no se conserva**: el fondo del hero se resuelve con recursos propios de la marca (sección 8).

---

## 6. Lo que NO funciona y no debemos heredar

Verificado con la landing corriendo a 390 px (Playwright). Ver `capturas/full-390.png` y `capturas/extra-viewport-movil-390.png`.

1. **Texto pequeño**: ≈ 87 textos entre 12 y 15 px; en particular, el cuerpo de las tarjetas de servicio y precios a **15 px**, métricas a 14 px, notas a 13 px y overlines a 13 px. `--text-faint` (13 px) no pasa contraste AA (≈ 3,3:1).
2. **Hero sin visual propio**: el "visual" es un vídeo al 40 % de opacidad, casi invisible, sin ilustración ni producto. La mitad derecha del hero queda vacía. Además pesa (ver 5).
3. **Menú sin versión móvil, con causa raíz**: la regla `@media (max-width: 768px) { .nav-links { display: none } }` **no se aplica** porque el contenedor lleva `style={{ display: 'flex' }}` inline, que gana sin `!important`. Medido: a 390 px, `.nav-links` sigue en `display: flex`. No existe botón hamburguesa ni panel.
4. **Desbordamiento horizontal en móvil**: `scrollWidth` 501 px frente a 375 px de `clientWidth` (unos 126 px de más). Sale de los enlaces de la navbar (que además hacen crecer la barra a 109 px) y de las rejillas con `minmax(290px…320px)` (tarjetas de precios de 368 px y bloque de contacto de 389 px de ancho) dentro de un contenedor con solo 20 px de padding. El `overflow-x: hidden` del `body` lo enmascara parcialmente.
5. **Verde usado como decoración** (ver 1).
6. **CTA de la navbar en outline**, sin jerarquía frente al CTA del hero.
7. **Accesibilidad de formulario y acordeón**: sin `<form>`/`name`/`autocomplete`, labels sin `for`, sin `role`/`aria-controls` en el FAQ, sin `:focus-visible` en botones y enlaces. Enter no envía.
8. **Formulario falso**: no envía nada (ver informe del formulario) y el texto "Tus datos no salen de aquí" es engañoso.
9. **Contenido de relleno**: casos con cifras inventadas (con la nota "pendientes de sustituir…"), precios "de ejemplo", 5 iconos sociales con `href="#"`, "Aviso Legal" y "Condiciones de Contratación" con `href="#"`. Contradice la regla de copy de no fabricar cifras.
10. **Código**: estilos duplicados en inline (el mismo bloque de estilos del `h2` copiado en 6 componentes), tokens `--space-*` sin usar, regla `.cases-grid` muerta, `JetBrains Mono` cargada sin uso, `hls.js` como dependencia grande.
11. **Legales**: las páginas estáticas usan otra paleta (azul claro sobre blanco, `Segoe UI`) y no siguen el sistema de diseño; la fecha es "junio de 2025".

---

## 7. Reglas de color de la nueva landing

Decisión **D-J** (29/09/2026). **Sustituye a la regla "el verde es solo para acciones" de la sección 1**, que se queda como diagnóstico de la landing anterior. Los valores no cambian: todos siguen saliendo de `tokens.css`.

| Color | Se usa para | Nunca para |
|---|---|---|
| **Verde** (`--green-*`) | **CTAs** (botón primario y su hover/active/glow) · **chips de resultado** (✅ "Cita agendada"…) · **una sola palabra destacada por titular** (la firma visual de la marca) | Eyebrows, guiones de listas, "+/−" del FAQ, enlaces, íconos decorativos, bordes, cifras |
| **Azul** (`--blue-*`) | **Eyebrows / overlines** · **guiones de listas** · **"+/−" del FAQ** · **enlaces** (texto y subrayado) · **nodos del Método ERVIA** · etiqueta **"Recomendado"** · anillo de foco | Botones primarios (son verdes) |
| **Blanco / texto fuerte** (`--text-strong`) | Titulares, **cifras** (precios, métricas, números) | Cifras en verde o en azul |
| **Texto cuerpo / apagado** (`--text-body`, `--text-muted`) | Párrafos y microcopy; el gris `--text-muted` solo a 15 px o más | `--text-faint` para texto (no cumple contraste AA) |
| **Navy** | Fondos y superficies (`--surface-page`, `--surface-deep`, `--surface-card`) | Texto |

**Consecuencias de implementación**

- **Máximo una palabra en verde por titular.** El énfasis no se reparte: si un H1 y un H2 conviven en pantalla, cada uno tiene la suya. Los titulares de tarjetas (H3) no llevan palabra verde.
- **El verde es siempre "toca esto" o "esto salió bien".** Un elemento verde que no sea CTA ni chip de resultado es un error.
- **Foco visible** en azul (`--blue-400`) en todo lo interactivo, incluidos los botones verdes.
- **Los glows decorativos son azules** (`--glow-blue` / `--blue-500`). El `--glow-green` solo aparece como hover del botón primario.
- Los degradados `--gradient-duotone` (verde→azul) no se usan en la landing nueva: los números del método son blancos y los nodos, azules.
- `::selection` usa azul, no verde.

**Cómo se aplica en el código**

| Necesidad | Clase Tailwind (mapeada en `src/app/globals.css`) |
|---|---|
| Botón primario | `<Button variant="primary">` → `bg-green-500 text-text-on-green shadow-cta` |
| Palabra destacada | `<span className="text-green-500">…</span>` (una por titular) |
| Eyebrow | `<Eyebrow>` → `text-blue-400` |
| Guión de lista / "+/−" | `text-blue-400` |
| Enlace | `text-blue-400 underline underline-offset-4 hover:text-blue-300` |
| Etiqueta "Recomendado" | `bg-surface-blue-tint border-border-blue text-blue-300` |
| Cifra | `text-text-strong` |

---

## 8. Fondo del hero de la nueva landing

**Decisión D-I, revisada por derechos de uso (30/09/2026).** La versión original de D-I preveía un fotograma del vídeo de la landing anterior en WebP/AVIF. Ese vídeo no es propiedad de ERVIA, así que **el hero no usa vídeo ni ningún fotograma suyo**, y no hay imágenes de fondo.

| Regla | Detalle |
|---|---|
| Recursos permitidos | Solo los de la marca: fondo navy, glows, degradado dúo (`--gradient-duotone`) y, como máximo, una textura sutil de puntos o nodos inspirada en el isotipo |
| Cómo se dibuja | CSS y SVG en línea. **Sin imágenes, sin vídeo y sin JavaScript** (`src/components/sections/hero-background.tsx`) |
| Movimiento | Ninguno: el fondo es estático, así que `prefers-reduced-motion` se cumple por diseño. El movimiento del hero lo aporta el mockup de WhatsApp |
| Contraste del texto | Velo diagonal navy (`rgb(15 23 42)` al 92 % → 35 %) y fundido inferior a `--navy-900`. Medido en el peor píxel de fondo: titular y cuerpo ≥ 10:1; gris atenuado (`--text-muted`) ≥ 5,5:1 |
| Coste | 0 bytes de imagen; el peso anterior (vídeo de 2880 × 1248 + `hls.js`, 216 kB gzip) desaparece |

**Variante elegida (30/09/2026): `nodes`.** Glow azul contenido, malla de puntos muy sutil (CSS) que se desvanece hacia la izquierda con una máscara radial, e isotipo fantasma a gran tamaño con el degradado dúo al 17 % de opacidad. Componente `<HeroBackground />` (una sola variante). La alternativa descartada, `aurora` (glows azules y mancha con el degradado dúo, sin trazos), queda documentada solo en las capturas `docs/design-base/capturas/d2-hero-aurora-*`. Capturas de la elegida: `d2-hero-nodes-1440.png` y `d2-hero-nodes-390.png`.

Contraste medido en el peor píxel de fondo bajo el texto: titular y cuerpo ≥ 10:1; gris atenuado (`--text-muted`) ≥ 5,5:1.

El verde del degradado dúo es decorativo y muy tenue; conviene revisar en G2 si compite con el mockup del hero (regla de color de la sección 7).

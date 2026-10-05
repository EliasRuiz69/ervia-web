# Plan de la nueva landing de ERVIA (v1)

**Qué es este documento:** el plan completo para (1) retirar del VPS las dos landings de prueba, (2) preparar Claude Code con las skills y MCP adecuados, y (3) construir desde cero la nueva landing de ervia.tech con los requerimientos de la **auditoría v2** (`auditoria-landing-ervia-v2.md`), usando como base de diseño la landing actual.

**Fecha:** 29 de septiembre de 2026
**Sustituye a:** la sección 9 ("Plan de modificaciones para Claude Code") de la auditoría v2, que planteaba modificar la landing existente. El resto de la auditoría v2 (estrategia, copy, Método ERVIA, visual del hero, SEO y decisiones) sigue vigente y es la **especificación funcional** de la nueva landing.

### Cómo usar este documento
- Los pasos marcados **[TÚ]** son manuales: Dokploy, Cloudflare, VPS por SSH y GitHub.
- Los pasos marcados **[CC]** son prompts para pegar en la pestaña **Code** de Claude Desktop (o en Claude Code en Antigravity) con el repo nuevo abierto.
- Se ejecutan **en orden y de uno en uno**, verificando antes de pasar al siguiente.
- Los `[placeholders]` se rellenan con las decisiones de la sección 1.

### Datos confirmados en la inspección previa
- **www.ervia.tech** sirve una SPA de Vite + React (el HTML solo contiene `<div id="root">` y `/assets/index-*.js`). Es la landing auditada y la **base de diseño**. Según tu descripción es la app `ervia-landing` de Dokploy; el inventario (Paso A0) confirmará qué repo y rama la construyen.
- Su CSS define un **sistema de tokens completo** en `:root`: escala navy (`--navy-950` … `--navy-50`), verde (`--green-300` … `--green-700`, principal #07F991), azul (`--blue-300` … `--blue-700`, principal #3166F4), textos (`--text-strong`, `--text-body`, `--text-muted`…), tipografías (`--font-display`: Baloo 2; `--font-body`: DM Sans; `--font-mono`: JetBrains Mono), espaciados (`--space-1` … `--space-24`), radios, sombras (`--shadow-card`, `--shadow-cta`, `--glow-green`…), degradado dúo (`--gradient-duotone`) y curvas de animación (`--ease-out`…). Esto permite portar el diseño **con exactitud**, no "parecido".
- En el footer, "Aviso Legal", "Condiciones de Contratación" y los 5 íconos sociales apuntan a `#`: no existen. Solo existen `/politica-de-privacidad` y `/politica-de-cookies`.
- **test.ervia.tech** sirve `ervia-landing-v2`: otra versión, también SPA, con título "Automatización IA para pymes en México | ERVIA" y la promesa "en 30 días". Ojo: declara `robots: index, follow`, así que **Google puede indexarla** como duplicado de ERVIA en un subdominio de pruebas. Es un motivo más para retirarla ya (Bloque B). A partir de ahora, staging siempre lleva `noindex` (D2 punto 10).
- Corrección a la auditoría v2: allí se nombró el repo como `ervia-landing-v2`. La landing auditada (www) es `ervia-landing`, pendiente de confirmar en A0.

---

## 0. Resumen de la estrategia

### Por qué falló la asignación del dominio la vez anterior (diagnóstico probable)
Cuando se **detiene** una aplicación en Dokploy, su dominio **no se libera**. El registro del dominio sigue en la base de datos de Dokploy y su archivo de configuración de Traefik (`/etc/dokploy/traefik/dynamic/<app>.yml`) sigue declarando un router con `Host(www.ervia.tech)`. Al intentar asignar el mismo dominio a otra app, choca con esa configuración "fantasma". A eso se suman dos trampas habituales:
1. **Let's Encrypt:** Dokploy indica que el DNS debe apuntar al servidor **antes** de añadir el dominio; si no, el certificado no se genera y hay que recrear el dominio o reiniciar Traefik. Con el proxy de Cloudflare activo (nube naranja) el desafío HTTP de Let's Encrypt puede fallar según el modo SSL.
2. **Reintentos:** cada intento fallido consume cupo de Let's Encrypt (límite de certificados duplicados por semana).

**La regla que evita repetirlo:** *primero se quita el dominio de la app vieja, se verifica en el servidor que ya no existe ningún router con ese host, y solo entonces se añade a la app nueva.* Detener la app no basta.

### Secuencia recomendada (y por qué este orden)

| Bloque | Qué | Riesgo | Cuándo |
|---|---|---|---|
| **A** | Inventario y respaldos | Ninguno | Ya |
| **B** | Retirar `ervia-landing-v2` y liberar `test.ervia.tech` | Nulo (nadie la usa) | Ya |
| **C** | Preparar Claude Code (skills, MCP, CLAUDE.md) | Ninguno | Ya |
| **D** | Proyecto nuevo: ADN de diseño + esqueleto + página temporal "Próximamente" | Ninguno (local) | Tras C |
| **E** | **Ensayo** del procedimiento de dominio con `test.ervia.tech` (staging) | Bajo | Tras D |
| **F** | **Corte a producción** de www.ervia.tech a la app nueva, con la página "Próximamente" | Bajo (nadie la ha visto) | Tras E |
| **G** | Construir la landing completa en staging, sección a sección | Ninguno en producción | Tras F |
| **H** | Lanzamiento: QA y despliegue a producción **sin tocar dominios** | Mínimo | Tras G |
| **I** | Limpieza final y archivo de repos | Ninguno | 7 días tras F |

**Idea clave:** el cambio de dominio, que es lo que falló antes, se hace **pronto y con una página sencilla**, cuando no hay nada en juego. Así el lanzamiento final es un simple redespliegue de la misma app, sin tocar dominios ni certificados. La alternativa (mantener la landing vieja hasta el final) está en la decisión D-A.

### 0.1 Decisiones tomadas (29/09/2026)
- **D-A (revisada el 30/09):** **no habrá página "Próximamente".** Se construye hoy la landing completa (alcance v1) y se publica directamente. Hasta el corte (Bloque F), www.ervia.tech sigue mostrando la landing vieja; no tiene visitas, así que no importa. Ver la secuencia vigente en **0.4**.
- **D4:** número de WhatsApp de ERVIA = **999 249 8890** (el número de demo), para economizar. Se cambiará cuando haya ingresos. Enlaces: `https://wa.me/529992498890`. Formato internacional para el JSON-LD: `+529992498890`.
- **Resultado de la Fase D1 (29/09):** el fondo del hero no es un canvas sino un **vídeo HLS de Mux** con `hls.js` (la mayor parte de los 216 kB comprimidos de JS). **No existe logo ni isotipo en SVG**: solo dos PNG. **El formulario antiguo no enviaba nada** (sin backend). Las políticas legales usan fondo blanco y Segoe UI, y fechan "junio de 2025".
- **D-I (fondo del hero, revisada el 30/09 por derechos de uso):** el vídeo de la landing anterior no es nuestro, así que no se usa ni como fotograma. Fondo elegido: variante **`nodes`** (solo recursos de marca: glow azul, malla de puntos sutil e isotipo fantasma con el degradado dúo al 17 %), CSS/SVG sin imágenes ni JavaScript. Contraste medido: titular y cuerpo ≥ 10:1; gris atenuado ≥ 5,5:1.
- **D-J (uso del color):** verde = CTAs, chips de resultado ✅ y **una palabra destacada por titular** (firma visual de la marca). Azul = eyebrows/overlines, guiones de listas, "+/−" del FAQ, enlaces, nodos del método y etiqueta "Recomendado". Cifras en blanco. **Excepción aceptada:** el degradado dúo (verde-azul) del isotipo fantasma del fondo `nodes`, porque es ambiente de marca muy tenue y no compite con los botones.
- **Logo:** se busca el SVG original; si no existe, Claude Code redibuja el isotipo y el wordmark en SVG y se validan contra los PNG antes de usarlos.

### 0.2 ⚠️ Antes de publicar el número: quién contesta hoy en él
Ese número es el que se usa para las demos de Full Motor. **Si en YCloud sigue conectado al workflow `Full Motor_AgendayCotiza_v1`, cualquier prospecto que escriba desde la landing de ERVIA recibirá la respuesta del agente del taller**: cotizará afinaciones y podrá agendar citas en la base de datos real de Full Motor. Eso confunde al prospecto y ensucia los datos del cliente justo cuando sale a producción.

**Comprobación [TÚ], antes del Bloque F:**
1. YCloud → número 999 249 8890 → Webhooks: ¿a qué URL de n8n envía los mensajes?
2. n8n → `Full Motor_AgendayCotiza_v1` → nodos "Enviar Parte1/2/3": ¿qué número usan como `from`?

**Si está conectado al agente de Full Motor**, hay dos caminos:
- **Recomendado:** esperar a que Full Motor pase a su propio número (su salida a producción del 1 de octubre ya lo contempla) y, justo después, **desconectar el webhook de YCloud** de este número o apuntarlo a un workflow vacío de ERVIA. Mientras tanto, los mensajes de la landing los contestas tú desde la app de WhatsApp Business (coexistencia).
- **Si publicas antes del cambio de Full Motor:** en la página "Próximamente" y en la landing usa solo el correo como contacto y añade el botón de WhatsApp cuando el número quede libre (es cambiar una línea en `src/config/site.ts`).

**Correo info@ervia.tech:** el registro MX de ervia.tech apunta a **Google** (`smtp.google.com`), no a Hostinger. Por eso, `info@ervia.tech` solo recibe correo si existe como usuario o alias en tu Google Workspace; el buzón de Hostinger no recibe nada. **Antes del Bloque F**, envía un correo de prueba desde otra cuenta a `info@ervia.tech` y confirma que llega. Si no llega, crea `info@` como alias de `admin@ervia.tech` en la consola de Google Workspace (gratis), o usa otro correo en la página.

**Texto de los CTA:** mientras no haya un **agente de ERVIA** respondiendo en ese número, el CTA principal es **"Escríbenos por WhatsApp"**, no "Pruébalo en WhatsApp ahora". Esa segunda frase promete una demo automática, y si contestas tú a mano horas después, rompe la promesa. Cuando conectes un agente propio de ERVIA, se cambia el texto.

### 0.3 Calendario realista: hoy y mañana — ⚠️ SUPERADO por la sección 0.4 (se conserva el alcance de la v1)

**HOY: retirar la landing actual y dejar el dominio resuelto** (≈ 3–4 horas)

| Orden | Bloque | Quién | Tiempo aprox. |
|---|---|---|---|
| 1 | A: inventario y respaldos | Tú | 30–40 min |
| 2 | 0.2: comprobar quién contesta el número de demo | Tú | 10 min |
| 3 | B: retirar `ervia-landing-v2` | Tú | 15 min |
| 4 | C: plugins, 21st y skills (las skills se instalan tras D2) | Tú | 20 min |
| 5 | D1–D3: ADN de diseño, esqueleto y "Próximamente" | Claude Code | 60–90 min |
| 6 | E: staging en test.ervia.tech (ensayo) | Tú | 20 min |
| 7 | F: corte de www.ervia.tech a la app nueva | Tú | 20–30 min |

Al final del día, www.ervia.tech muestra "Próximamente" desde la app nueva y ya no hay ninguna landing vieja en producción (`ervia-landing` queda detenida como vuelta atrás).

**MAÑANA: lanzamiento mínimo (v1)** (≈ una jornada de trabajo con Claude Code)

Ser realista: construir, revisar y probar **toda** la auditoría en un día es posible solo si las secciones que dependen de terceros o de decisiones pendientes se dejan para una segunda iteración. Propuesta de alcance:

| Entra en la v1 de mañana | Queda para la v2 (esta semana o la próxima) | Motivo |
|---|---|---|
| G1 estructura, nav, franja, botón de WhatsApp | — | — |
| G2 hero con mockup (solo la conversación del **taller**) | Conversaciones de consultorio y restaurante | Solo el taller tiene caso real hoy |
| G3 espejo, "Lo que ganas", "Para quién es" (solo giros con demo) | — | — |
| G4 Método ERVIA | — | — |
| G4 precios: **"Detectar: gratis"** y **"Cotización tras el diagnóstico"** en Automatizar y Escalar | Cifras en MXN (D2) | Sin precios decididos no se publican cifras |
| G6 FAQ, CTA final, formulario + workflow de leads en n8n | Enlace de agenda directa (D8) | — |
| G7 metadatos, OG, JSON-LD, sitemap, robots, llms.txt | Analítica con eventos (D6) | Mañana basta con Cloudflare Web Analytics, que ya tienes activo, no usa cookies y no requiere banner |
| G8 QA (Lighthouse, responsive, accesibilidad, barrido de texto) | — | No se lanza sin QA |
| — | **G5 caso real Full Motor y "Quién está detrás"** | Requiere permiso por escrito, video y testimonio (D3); tu foto |
| — | Promesa "Te llevas tu Mapa de Fugas" | Solo cuando exista la plantilla del Mapa (D11) |

En la v1, las secciones de la v2 **no aparecen** (nada de "Próximamente" dentro de la landing). La estructura ya queda preparada en G1 para añadirlas sin rehacer nada.

### 0.4 Secuencia vigente desde el 30/09/2026 (sustituye al calendario de 0.3)

**Decisión:** sin página "Próximamente". Se construye hoy la landing completa con el alcance v1 de la tabla de 0.3 y se publica directamente. Se omite la **Fase D3**. Los Bloques E (staging) y F (corte) se hacen **al final, ya con la landing terminada**.

**Estado a esta fecha (01/10/2026):** 🚀 **E ✅ · F ✅ — landing nueva en producción en www.ervia.tech** · I ✅ (salvo el borrado del respaldo del VPS, el 29/10/2026) · H1–H2 ✅ (PR #1 fusionada) · G8 ✅ · G7 ✅ (`d111b00`…`4918eda`) · G6 ✅ (`72ddf20`, `19c24f2`, `6c9503c`, `e6ef267`, `3ff64f4` + legales) · G4 ✅ (`fed1614` precios, `1758e6b` Método variante B) · G3 ✅ (`7bd33f0`, `c1db441`, `5b6e569`) · G1 ✅ (`7a14de5`, `7eb3420`) · G2 ✅ (`198d570`, `0e76d4c`, `c02fa22`) · A ✅ · B ✅ · C ✅ (C3 y C5 dentro de D2) · D1 ✅ · D2 ✅ (cerrada: legales, skills, logos SVG, fondo `nodes`) · D3 ⏭️ omitida · G0 ✅ (remoto `origin` conectado; `main` en `d6d1087`, `develop` en `560b0d7`).

**Decisión leads (D-H, 30/09):** aviso por **Telegram** + registro en Google Sheet "Leads ERVIA". El workflow de n8n se crea con Claude Code **en el proyecto de Antigravity que tiene el MCP de n8n**, tomando como base un workflow de Telegram que Elias ya tiene (ver G6-bis).

**Decisión WhatsApp (30/09):** `WHATSAPP_ENABLED = true` desde la G1. El número 999 249 8890 sigue hoy con su webhook actual en YCloud; Elias creará el workflow del agente de ERVIA y cambiará el webhook antes de publicar. La comprobación de la sección 0.2 pasa a ser un **requisito previo del Bloque F** (ver F0).

| # | Paso | Quién | Nota |
|---|---|---|---|
| 1 | **G0**: conectar el remoto de GitHub y subir `main` y `develop` | CC | ✅ Hecho |
| 2 | ~~Sección 0.2~~ | — | Decidido: `WHATSAPP_ENABLED = true`; las comprobaciones pasan a F0 |
| 3 | **G1**: estructura, nav, franja de confianza y WhatsApp | CC | |
| 4 | **G2**: hero con mockup (solo la conversación del **taller**) | CC | |
| 5 | **G3**: espejo, "Lo que ganas", "Para quién es" | CC | Los cuatro sectores objetivo de 4.6, presentados como sectores, no como casos de éxito |
| 6 | **G4**: Método ERVIA y precios **sin cifras** ("Detectar: gratis" · "Cotización tras el diagnóstico") | CC | |
| 7 | **G6**: FAQ, CTA final, formulario y `/api/lead` + **G6-bis** workflow de leads en n8n | CC + Tú | |
| 8 | **G7**: SEO, GEO y metadatos; analítica solo Cloudflare Web Analytics | CC | |
| 9 | **G8**: QA completa | CC | No se publica sin QA |
| 10 | **H1–H2**: PR `develop` → `main`, revisión y fusión | CC + Tú | |
| 11 | **Bloque E**: app `ervia-web-staging` (rama `develop`) en `test.ervia.tech` | Tú | Ensayo del dominio + prueba del formulario real en el servidor |
| 12 | **Bloque F**: corte de www.ervia.tech a la app `ervia-web` (rama `main`) | Tú | F1 ya despliega la landing completa; **H3 queda absorbido en F1** |
| 13 | **H4**: checklist de lanzamiento | Tú | |
| 14 | **Bloque I**: limpieza, 7 días después | Tú | |

**Fuera de la v1 de hoy** (se añaden después sin rehacer nada): G5 (caso real Full Motor y "Quién está detrás"), conversaciones de consultorio y restaurante en el hero, cifras de precios en MXN (D2), analítica con eventos (D6), enlace de agenda directa (D8) y la promesa del Mapa de Fugas (D11).

**Estimación honesta:** G0–G8 son 5–7 horas de Claude Code con tus revisiones, y E + F una hora más. Si el día no alcanza, se para después de G8 o de E sin riesgo: www.ervia.tech sigue sirviendo la landing vieja hasta el Bloque F.

**Variables de entorno (se definen en Dokploy ANTES del primer despliegue, porque `NEXT_PUBLIC_SITE_ENV` se fija al compilar):**
- Staging: `NEXT_PUBLIC_SITE_ENV=staging`, `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_SECRET`.
- Producción: `NEXT_PUBLIC_SITE_ENV=production`, `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_SECRET`.

### 0.5 Pendientes después del lanzamiento (v2 y mantenimiento)

| Prioridad | Pendiente | Origen |
|---|---|---|
| Alta | **H4**: checklist de lanzamiento (ver Bloque H) | Plan |
| Alta | **Bloque I** a partir del 08/10/2026: borrar la app y el proyecto `ervia-landing`, limpiar imágenes, archivar los repos viejos | Plan |
| Alta | Confirmar que el microcopy "Respuesta inmediata, incluso fuera de horario" es cierto (agente de ERVIA respondiendo solo); si no, cambiarlo | F0 |
| Media | Mejorar el LCP móvil (3,2 s en PageSpeed): caché del HTML en Cloudflare, quitar `opsz` de DM Sans, hidratación diferida del mockup y el formulario | E7 |
| Media | **G5**: caso real Full Motor (con permiso por escrito, vídeo y testimonio) y sección "Quién está detrás" (foto) | v2 |
| Media | Precios en MXN (D2), analítica con eventos (D6), enlace de agenda (D8), Mapa de Fugas (D11), conversaciones de consultorio y restaurante en el hero | v2 |
| Media | Revisión legal de las políticas (nueva LFPDPPP, URL de la Secretaría Anticorrupción y Buen Gobierno) | G6 |
| Baja | Restringir el tráfico web del VPS a las IP de Cloudflare (cuidado: afecta a Vak Devi y otros servicios) | G6 |
| Media | **Dominios huérfanos en Traefik** (errores diarios de renovación por NXDOMAIN): `vakdevi.ervia.tech`, `chatwoot.ervia.tech` y `nocodb.ervia.tech` siguen configurados en Dokploy, pero no tienen registro DNS. Por cada uno: si el servicio se usa, crear el registro A en Cloudflare; si no, quitar el dominio en Dokploy (y detener el servicio si ya no hace falta) | I7 |
| Baja | Limpiar del DNS los registros de correo de Hostinger que ya no se usan | A0 |
| Baja | Opcional: mover el repo `ervia-web` a la organización `ervia-tech` (reconectar Dokploy después) | G0 |

---

## 1. Decisiones

### Decisiones nuevas de este plan

| # | Decisión | Opciones | Recomendación | Bloquea |
|---|---|---|---|---|
| **D-A** | Qué ve www.ervia.tech mientras se construye | (a) Página "Próximamente" con diseño ERVIA, WhatsApp y correo, desplegada ya en la app nueva · (b) mantener la landing vieja hasta el lanzamiento | **(a)**: retira la landing con casos ficticios y euros, y resuelve el dominio sin presión | F |
| **D-B** | Stack | Next.js (App Router) + TypeScript + Tailwind v4 + shadcn/ui · otra | **Next.js**: HTML prerenderizado de serie (resuelve el SEO), es tu stack de Full Motor y Vak Devi, y los componentes de 21st.dev son React + Tailwind + shadcn | D |
| **D-C** | Servidor | Mismo VPS actual (el de Vak Devi) · VPS de ERVIA LAB | **Mismo VPS**: el DNS ya apunta ahí, sin cambios de IP | E |
| **D-D** | Dominio canónico | `www.ervia.tech` con redirección desde `ervia.tech` · al revés | **www**, como hoy; redirección 301 en Cloudflare | F |
| **D-E** | Páginas legales | Conservar `/politica-de-privacidad` y `/politica-de-cookies`; "Aviso Legal" es un concepto español: ¿lo quitamos? ¿Tienes "Términos y condiciones"? | Conservar las 2 URLs; quitar "Aviso Legal"; publicar "Términos y condiciones" solo si existen | D |
| **D-F** | Repo nuevo | `ervia-tech/ervia-web` (organización) · cuenta personal | **Organización `ervia-tech`** | D |
| **D-G** | API key de 21st.dev | Crearla (gratis) en 21st.dev/mcp · prescindir de 21st | Crearla; se guarda como variable de entorno, nunca en el repo ni en el chat | C |
| **D-H** | Destino de los leads | Workflow n8n (ERVIA LAB) → Google Sheet "Leads ERVIA" + aviso por Telegram o correo (Resend) · otro | n8n + Sheet + aviso: reutiliza lo que ya tienes | G6 |

### Decisiones heredadas de la auditoría v2 (sección 8)
Siguen pendientes y bloquean fases concretas: **D2** precios en MXN (G4) · **D3** permiso de Full Motor y giros con demo (G2, G5) · **D4** número de WhatsApp de ERVIA (**D, por la página "Próximamente"**) · **D6** analítica (G7) · **D8** agenda directa (G6) · **D10** visual del hero (G2, ya recomendado) · **D11** Mapa de Fugas (G4, G6) · **D12** condiciones comerciales (G4, G6).

---

## BLOQUE A — Inventario y respaldos [TÚ]

> Objetivo: no perder nada y entender exactamente qué hay configurado antes de borrar. Tiempo estimado: 30–40 min.

### A0.1 Dokploy: ficha de cada app
Para **`ervia-landing`** y **`ervia-landing-v2`**, anota (capturas de pantalla valen):
- Proyecto de Dokploy donde está y nombre interno de la app (el `appName` con sufijo aleatorio que aparece en General o en la URL).
- Tipo: Application o Compose.
- Proveedor: repo de GitHub, **rama** y último commit desplegado.
- Build Type (Nixpacks, Railpack, Dockerfile o Static) y puerto.
- **Domains:** cada host, path, puerto, HTTPS activado y tipo de certificado.
- **Environment:** lista de variables. Copia los valores a tu gestor de contraseñas, **nunca** a un chat ni a un archivo del repo.
- Advanced: Redirects, Security, Ports y Watch Paths, si hay algo configurado.
- Si Auto Deploy está activo.

### A0.2 Cloudflare
- **DNS → Records:** exporta la zona (botón de exportar / "Import and Export") y guarda el archivo. Anota en especial los registros `@`, `www` y `test`, su IP y si están en naranja (proxied) o gris (DNS only).
- **SSL/TLS → Overview:** anota el modo (Flexible, Full o Full (strict)).
- **SSL/TLS → Edge Certificates:** anota si "Always Use HTTPS" está activo.
- **Rules:** anota si hay Redirect Rules o Page Rules para ervia.tech.
- ⚠️ **No toques** los registros MX ni TXT (correo de Hostinger, verificación de Resend y Google Workspace, SPF y DKIM). En todo el plan solo se tocan `@`, `www` y `test`.

### A0.3 VPS por SSH (desde PowerShell)
```bash
ssh root@[IP_VPS_LANDING]

# 1. Servicios de las landings (las Applications de Dokploy corren como servicios de Swarm)
docker service ls | grep -i ervia
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}" | grep -i ervia

# 2. Configuración dinámica de Traefik: qué archivos declaran dominios de ervia.tech
ls -la /etc/dokploy/traefik/dynamic/
grep -n "Host(" /etc/dokploy/traefik/dynamic/*.yml | grep -i "ervia"

# 3. Respaldo de la configuración de Traefik y de los certificados (contiene claves privadas: no se comparte)
mkdir -p /root/respaldo-$(date +%F)
cp /etc/dokploy/traefik/dynamic/*.yml /root/respaldo-$(date +%F)/
cp /etc/dokploy/traefik/dynamic/acme.json /root/respaldo-$(date +%F)/acme.json
chmod 600 /root/respaldo-$(date +%F)/acme.json
ls -la /root/respaldo-$(date +%F)/
```
Si `/etc/dokploy/traefik/dynamic/acme.json` no existe en esa ruta, localízalo con `find / -name acme.json -path "*dokploy*" 2>/dev/null` y ajusta el comando.

**Qué buscar en el paso 2 (el diagnóstico del incidente previo):** si aparece `www.ervia.tech` o `ervia.tech` en **más de un** archivo `.yml`, o en el archivo de una app que ya no usas, ese es el "fantasma" que bloqueó la asignación a la v2. Anótalo: el Bloque B y el F lo limpian.

### A0.4 GitHub
En cada uno de los dos repos (`ervia-landing` y `ervia-landing-v2`):
```bash
git status            # sin cambios pendientes
git push              # todo subido
git tag archivo-final-2026-09 && git push origin archivo-final-2026-09
```
**No borres ni archives todavía** ningún repo: `ervia-landing` es la fuente del diseño y Claude Code lo leerá en la Fase D1.

### A0.5 Clon local de la base de diseño
Clona el repo de la landing de www en una carpeta de referencia, **fuera** del repo nuevo:
```powershell
cd C:\dev          # o tu carpeta de proyectos
git clone https://github.com/[OWNER]/ervia-landing.git ervia-landing-referencia
```

✅ **Criterio para seguir:** tienes las fichas de las dos apps, la exportación DNS, los respaldos en `/root/respaldo-[fecha]/`, los tags en GitHub y el clon local de referencia.

---

## BLOQUE B — Retirar `ervia-landing-v2` y liberar `test.ervia.tech` [TÚ]

> Nadie usa esta app. Además sirve de primer ensayo de "quitar un dominio correctamente".

**B1. Quitar el dominio (antes de detener nada).** Dokploy → app `ervia-landing-v2` → **Domains** → elimina `test.ervia.tech`.

**B2. Verificar en el servidor que el router desapareció:**
```bash
grep -n "test.ervia.tech" /etc/dokploy/traefik/dynamic/*.yml
# Esperado: ninguna línea. Si aparece, NO sigas: revisa en Dokploy que el dominio se borró de verdad.
```
Desde PowerShell:
```powershell
curl.exe -sI https://test.ervia.tech
# Esperado: 404 (Traefik ya no tiene ruta) o un error de Cloudflare; ya no debe servir la v2.
```

**B3. Detener y eliminar la app.** Dokploy → `ervia-landing-v2` → **Stop** → espera → **Delete** (si ofrece borrar volúmenes, acepta: es una web estática sin datos).

**B4. Verificar que no queda nada corriendo:**
```bash
docker service ls | grep -i "landing-v2"      # esperado: vacío
docker ps -a | grep -i "landing-v2"           # esperado: vacío
docker image prune                            # SIN "-a": borra solo imágenes huérfanas, no toca Vak Devi ni n8n
```

**B5. DNS:** **no borres** el registro `test` de Cloudflare: se reutiliza como staging en el Bloque E.

**B6. Comprobar que Vak Devi sigue bien.** Obtén antes su dominio real con `grep -n "Host(" /etc/dokploy/traefik/dynamic/vakdevi-*.yml` y úsalo como `[HOST_VAKDEVI]` en todas las comprobaciones del plan:
```powershell
curl.exe -sI https://[HOST_VAKDEVI]   # esperado: 200
```

✅ **Criterio:** `test.ervia.tech` no aparece en ningún `.yml`, la app v2 no existe y Vak Devi responde 200.

---

## BLOQUE C — Preparar Claude Code [TÚ + CC]

> Objetivo: que Claude Code tenga el mejor criterio de diseño, copy, SEO y pruebas **sin** que las skills le hagan cambiar el estilo que quieres conservar.

### C0. Principio de selección
Se instala un **conjunto pequeño y curado**. Demasiadas skills de diseño a la vez (varias "taste", "anti-slop" y "premium") empujan en direcciones distintas y pueden alejar el resultado de tu diseño actual. La jerarquía que Claude Code debe respetar se fija en el `CLAUDE.md` (C3):
1. `docs/design-base.md` (el ADN de la landing actual) manda sobre el estilo visual.
2. `docs/auditoria-landing-ervia-v2.md` manda sobre el contenido, la estructura y el copy.
3. Las skills aportan **calidad de ejecución** (accesibilidad, espaciado, rendimiento, microinteracciones), nunca un cambio de paleta, tipografía o estilo.

**Seguridad:** las skills y plugins de terceros son instrucciones y scripts que Claude Code ejecuta en tu máquina. Antes de instalar uno de terceros, abre su `SKILL.md` en GitHub y revísalo. skills.sh tiene una sección de auditorías de seguridad (skills.sh/audits), y la documentación de Claude Code dedica una página a la confianza en plugins (code.claude.com/docs/en/plugins/security).

### C1. Plugins del marketplace oficial de Anthropic [TÚ]

**Sobre el alcance (revisado).** Claude Code tiene tres alcances: **User** (tú, en todos tus proyectos, y es el **predeterminado**), **Project** (se guarda en `.claude/settings.json` del repo) y **Local** (solo tú, solo en este repo). Para un desarrollador que trabaja solo, **User scope es perfectamente válido**: el plugin funciona también en este proyecto. Project scope solo aporta que la configuración viaje con el repo. Por eso:
- Los plugins que ya tengas instalados en User scope (por ejemplo, frontend-design o playwright) **se quedan como están**; no hace falta reinstalarlos.
- Para los nuevos, el alcance recomendado está en la tabla. Si Claude Code no te pregunta el alcance, usa el comando de terminal con `--scope`.

**Paso 1. Actualiza el catálogo oficial** (si un plugin "no se encuentra", casi siempre es porque tu copia local del catálogo está desactualizada):
```
/plugin marketplace update claude-plugins-official
```

**Paso 2. Requisito previo de typescript-lsp.** Este plugin necesita el servidor de lenguaje instalado en tu PC. En PowerShell:
```powershell
npm install -g typescript-language-server typescript
typescript-language-server --version
```

**Paso 3. Instala lo que falte.** Opción A, dentro de Claude Code: `/plugin` → pestaña **Discover** → Enter sobre el plugin → elige el alcance (el predeterminado es User). Opción B, desde PowerShell en la carpeta del proyecto, que no pregunta nada y fija el alcance:
```powershell
cd C:\dev\ervia-web
claude plugin install context7@claude-plugins-official --scope user
```

| Plugin | Para qué en este proyecto | Alcance recomendado | Obligatorio |
|---|---|---|---|
| `frontend-design` | Criterio de diseño de interfaces (skill oficial de Anthropic) | User | Sí |
| `playwright` | Capturas de referencia, pruebas responsive y E2E del formulario | User | Sí |
| `context7` | Documentación actualizada de Next.js, Tailwind v4 y shadcn | User | Sí |
| `typescript-lsp` | Errores de tipos al editar y navegación por símbolos (requiere el Paso 2) | User | Sí |
| `security-guidance` | Revisión de seguridad de cada cambio (clave para el formulario y /api/lead) | User | Sí |
| `chrome-devtools-mcp` | Trazas de rendimiento y auditorías tipo Lighthouse | Project | **Opcional** |

**Si `chrome-devtools-mcp` sigue sin aparecer tras el Paso 1**, no lo instales: no es imprescindible. La auditoría de rendimiento de la Fase G8 se hace con Lighthouse por línea de comandos (`npx lighthouse http://localhost:3000 --preset=desktop` y la variante móvil por defecto), y la revisión visual en tu navegador con `/chrome` (Claude in Chrome). No instales las "otras opciones" que te proponga en su lugar sin revisarlas antes.

**Paso 4. Activa y verifica** sin reiniciar:
```
/reload-plugins
/plugin list
/mcp
```
En `/plugin list` deben aparecer los plugins con su alcance; en `/mcp`, al menos `playwright` y `context7` conectados. Revisa también la pestaña **Errors** de `/plugin`: si `typescript-lsp` muestra "Executable not found", repite el Paso 2 y vuelve a abrir Claude Code.

### C2. 21st.dev (componentes de la comunidad) [TÚ]
21st.dev es un catálogo de más de 12.000 componentes React + Tailwind (estilo shadcn), con categorías que encajan con esta landing: Heroes, Features, Pricing, Testimonials, Calls to action, Navbars, Footers, FAQs, Accordions, Carousels, Forms y Backgrounds. Su **21st MCP** (antes "Magic MCP") permite a Claude Code buscar componentes, leer su código real e instalarlos con sus dependencias.

**Límites del plan gratuito (según 21st.dev/mcp):** buscar es gratis e ilimitado; **instalar está limitado a 2 componentes al día**; generar UI con "21st AI" consume créditos. Para esta landing basta con la búsqueda: Claude Code lee el código de referencia y lo reescribe con los tokens de ERVIA. Reserva las 2 instalaciones diarias para piezas complejas (por ejemplo, el mockup de teléfono o el carrusel de precios).

**Instalación recomendada: plugin oficial de 21st para Claude Code** (incluye el MCP y las skills de 21st):
```
/plugin marketplace add 21st-dev/claude-code-plugin
/plugin install 21st@21st
```
El plugin espera la API key en la variable `API_KEY_21ST`. Créala o cópiala en **https://21st.dev/mcp** (menú "API key") y guárdala como variable de entorno de usuario en Windows, **no** en el repo:
```powershell
setx API_KEY_21ST "[pega-aquí-tu-key]"
```
Cierra y vuelve a abrir Claude Desktop / Antigravity para que la lea. Verifica con `/mcp` que `21st` aparece conectado.

**Alternativa sin plugin (solo el MCP):**
```powershell
claude mcp add --transport http 21st https://21st.dev/api/mcp --header "x-api-key: [tu-key]"
```
⚠️ Esta forma guarda la key en la configuración de Claude Code. Usa el alcance por defecto (local, en tu perfil de usuario) y **nunca** `--scope project`, porque escribiría la key en `.mcp.json` dentro del repo. Por la misma razón, no uses `npx @21st-dev/cli init --client claude --write` en el repo de la landing sin revisar después qué escribió en `.mcp.json`.

**Regla de uso (va en el CLAUDE.md):** los componentes de 21st.dev son **punto de partida estructural**; siempre se re-estilizan con los tokens de ERVIA y se revisan con la checklist de accesibilidad. Nunca se pega un componente con su paleta original.

### C3. Skills de skills.sh [SE EJECUTA EN LA FASE D2, punto 11]
> Aquí solo está la lista de comandos. No se ejecuta ahora: las skills se instalan dentro del proyecto, así que se hace cuando el proyecto ya existe (Fase D2).
Se instalan **en el proyecto** (carpeta `.claude/skills/` del repo nuevo), así viajan con el repo. En Windows se usa `--copy`, porque los enlaces simbólicos pueden fallar sin modo desarrollador. Ejecuta en la raíz del repo nuevo **después** de crearlo (Fase D2):

```powershell
# Buenas prácticas de React/Next.js y guía de interfaces web (Vercel)
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices --skill web-design-guidelines --skill vercel-composition-patterns -a claude-code --copy

# Copy, conversión, SEO, GEO, datos estructurados y analítica (marketingskills)
npx skills add coreyhaines31/marketingskills --skill copywriting --skill copy-editing --skill cro --skill seo-audit --skill ai-seo --skill schema --skill analytics -a claude-code --copy

# Sistema UI/UX (ya la usas en claude.ai)
npx skills add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max -a claude-code --copy

# shadcn/ui (base de los componentes de 21st.dev)
npx skills add shadcn/ui --skill shadcn -a claude-code --copy

# Opcional, anti-diseño genérico: úsala solo en la revisión final (G8), no durante la construcción
npx skills add leonxlnx/taste-skill --skill design-taste-frontend -a claude-code --copy
```
Verifica con `npx skills list`. Para desactivar la telemetría del CLI: `$env:DISABLE_TELEMETRY=1` antes de los comandos.

**Qué NO instalo y por qué:** varias skills "premium/high-end" y "redesign" (del mismo repo taste-skill) están pensadas para **cambiar** el estilo de una web; aquí queremos conservarlo. Tampoco van las de video o imagen generativa: el video del caso Full Motor será una grabación real.

### C4. Herramientas que ya tienes [INFORMATIVO: no requiere ninguna acción]
> El MCP de n8n está configurado en otro proyecto de Claude Code, no en `ervia-web` (no aparece en `/mcp`). Solo se necesita en la Fase G6-bis; allí se decide si se añade a `ervia-web` o se crea el workflow desde el proyecto donde ya está.
- **Claude in Chrome** (`/chrome` en Claude Code): revisión visual en tu Chrome real.
- **MCP de n8n** (ya configurado en Claude Code): para crear el workflow de leads en la Fase G6.
- **Pestaña Code de Claude Desktop:** vista previa de la app en local y revisión visual de diffs.

### C5. CLAUDE.md del repo nuevo [SE EJECUTA EN LA FASE D2, punto 4]
> Aquí solo está el contenido. Claude Code crea el archivo en la Fase D2; el prompt de la D2 apunta a esta sección para no repetir el texto.
Se crea en la Fase D2. Contenido completo:

```markdown
# ERVIA Web — reglas del proyecto

## Qué es
Landing de ERVIA (www.ervia.tech): automatización con IA para pymes de México, hecha en Mérida. Objetivo único: generar conversaciones por WhatsApp y diagnósticos agendados.

## Fuentes de verdad (en este orden)
1. docs/design-base.md — ADN visual de la landing anterior (tokens, tipografías, componentes, movimiento). MANDA sobre el estilo.
2. docs/auditoria-landing-ervia-v2.md — estrategia, estructura, copy, Método ERVIA, hero, SEO. MANDA sobre el contenido. Ignora su sección 9 (plan de modificación antiguo).
3. docs/plan-nueva-landing-ervia-v1.md — plan de construcción por fases.
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
```

---

## BLOQUE D — Proyecto nuevo: ADN de diseño, esqueleto y página "Próximamente" [CC]

### D1. Extraer el ADN de diseño de la landing actual

Abre Claude Code en una carpeta de trabajo nueva vacía (`C:\dev\ervia-web`) y pega:

```
Vamos a crear desde cero la nueva landing de ERVIA. Antes de escribir código, extrae el ADN de diseño de la landing anterior, que quiero conservar.

REGLAS: no modifiques nada en la carpeta de referencia; solo léela. No despliegues nada.

La landing anterior está en: [C:\dev\ervia-landing-referencia] (Vite + React SPA).

TAREAS:
1. Inicializa git en esta carpeta (C:\dev\ervia-web) y crea la carpeta docs/.
2. Lee el CSS global de la landing anterior y copia a docs/design-base/tokens.css TODAS las variables de :root tal cual (escala navy, green, blue, text-*, surface-*, fuentes, tracking, espaciados, radios, sombras, glows, degradados, easing y duraciones). No cambies ningún valor.
3. Escribe docs/design-base.md con:
   a) Paleta y uso de cada color (qué es fondo, texto, acento, CTA), con la regla "el verde es solo para acciones".
   b) Tipografías: familias, pesos usados, escala de tamaños por elemento (H1, H2, H3, cuerpo, eyebrow, botones) y cómo se cargan.
   c) Componentes y sus estilos exactos: navbar, botones (primario, outline, tamaños), tarjetas, eyebrows, badges, acordeón del FAQ, inputs del formulario, footer.
   d) Layout: ancho máximo del contenedor, paddings de sección y rejillas.
   e) Movimiento: qué se anima, duraciones, easing, y qué hace el <canvas> de fondo (cómo se dibuja, cuánto cuesta, si respeta prefers-reduced-motion).
   f) Qué NO funciona bien y no debemos heredar (según la auditoría: texto de 13–15 px en tarjetas, hero sin visual, menú sin versión móvil, desbordamiento en móvil).
4. Copia a docs/design-base/assets/ el logo e isotipo (prioriza SVG), favicon y cualquier imagen propia. Dime si no existe el isotipo en SVG.
5. Arranca la landing anterior en local y, con Playwright, toma capturas de página completa a 1440 px y a 390 px, más una captura por sección a 1440 px. Guárdalas en docs/design-base/capturas/. Serán la referencia visual permanente aunque la landing antigua desaparezca.
6. Copia el texto de las páginas legales existentes (/politica-de-privacidad y /politica-de-cookies) a docs/legales/ en Markdown, sin cambiar el contenido.
7. Dime cómo funciona hoy el formulario de contacto de la landing anterior: a dónde enviaba los datos.

Entrégame un resumen y espera mi visto bueno.
```

Después de este paso, **[TÚ]** copia a `docs/` los archivos `auditoria-landing-ervia-v2.md` y este mismo `plan-nueva-landing-ervia-v1.md`.

### D2. Esqueleto del proyecto

```
Trabaja en C:\dev\ervia-web.

REGLAS: no despliegues. Crea la rama develop y trabaja en ella; main solo tendrá lo que yo apruebe.

1. Crea un proyecto Next.js (última versión estable, App Router, TypeScript, ESLint, src/, alias @/*) con pnpm, Tailwind CSS v4 y shadcn/ui. La carpeta ya contiene .git/, .claude/ (plugins del proyecto) y docs/: si create-next-app se niega por no estar vacía, genéralo en una carpeta temporal y mueve el resultado aquí SIN sobrescribir ni borrar .claude/, docs/ ni .git/. Usa context7 para confirmar la configuración vigente de Next.js, Tailwind v4 y shadcn antes de escribirla. Fija la versión de Node en .nvmrc y en "engines" de package.json.
2. Crea src/styles/tokens.css copiando docs/design-base/tokens.css y mapea los tokens en el bloque @theme de Tailwind v4 CONSERVANDO los nombres (navy-900, green-500, blue-500, text-muted, radius-lg, shadow-card, etc.), para usar clases como bg-navy-900 o text-green-500. Configura el tema de shadcn para que use estos tokens (sin la paleta por defecto de shadcn).
3. Carga Baloo 2, DM Sans y (si design-base.md lo indica) JetBrains Mono con next/font, sin peticiones a Google en tiempo de ejecución, y conéctalas a --font-display, --font-body y --font-mono.
4. Crea CLAUDE.md en la raíz con el contenido exacto de la sección C5 del plan (docs/plan-nueva-landing-ervia-v1.md).
5. Layout base (src/app/layout.tsx): <html lang="es-MX">, fondo surface-page, metadataBase https://www.ervia.tech, viewport correcto.
6. Componentes base, fieles a design-base.md: Header (logo, enlaces de ancla, botón "Diagnóstico gratis"; menú hamburguesa accesible por debajo de 768 px), Footer (contacto info@ervia.tech, Mérida (México), enlaces legales [según D-E]; SIN íconos sociales vacíos: solo se muestran los que tengan URL real [lista de URLs o "ninguno"]), Button (primario verde, outline), Section y Container.
7. Páginas legales: /politica-de-privacidad y /politica-de-cookies con el contenido de docs/legales/, MISMAS URLs que antes. [Si D-E incluye /terminos-y-condiciones, créala con el texto que te pase.]
8. Página 404 con el diseño ERVIA y enlace a inicio.
9. Ruta /api/health que devuelva {"ok":true} (para comprobar el despliegue).
10. Variable NEXT_PUBLIC_SITE_ENV (production | staging): si es staging, añade <meta name="robots" content="noindex,nofollow"> en todas las páginas. Crea .env.example documentando las variables (sin valores reales) y asegúrate de que .env* (salvo .env.example) está en .gitignore.
11. Instala las skills del proyecto con los comandos de la sección C3 del plan (yo los ejecutaré si prefieres; dime).
12. Build de producción sin errores y capturas a 1440 y 390 px de la 404 y de una página legal.
13. Añade .gitattributes con "* text=auto eol=lf" (y binarios marcados como binary) y normaliza los finales de línea de lo ya commiteado en un commit aparte.
14. LOGO (SVG definitivos): en docs/design-base/assets/ están los SVG optimizados del logo y del isotipo de ERVIA en varias configuraciones (los creé yo en Inkscape). Antes de usarlos:
   a) Lista los archivos SVG y dime qué variante es cada uno (horizontal/isotipo, para fondo oscuro/claro, monocromo…).
   b) Revisa cada uno: que tenga viewBox, que no contenga imágenes rasterizadas incrustadas ni elementos <text> (el texto debe estar convertido a trazados), que no tenga metadatos de Inkscape sobrantes, y que sus colores coincidan con los tokens (#07F991, #3166F4 y la escala navy). Si algo no cumple, dímelo antes de corregirlo; no modifiques los originales de docs/.
   c) Copia a public/brand/ las variantes necesarias y crea un único componente <Logo variant="horizontal|mark" tone="onDark|onLight" /> que las use (en el Header y el Footer, sobre fondo navy, la variante para fondo oscuro). Los PNG anteriores ya no se usan en la web.
   d) Genera desde el isotipo: src/app/icon.svg, src/app/favicon.ico (16, 32 y 48 px) y src/app/apple-icon.png (180×180, con fondo navy y margen interior); comprueba que a 16 px el isotipo sigue siendo reconocible.
   e) Muéstrame una lámina de comprobación (docs/design-base/capturas/logo-check.png) con cada SVG sobre fondo navy y sobre blanco a 32, 64 y 256 px, y el favicon a 16 y 32 px.
15. [HISTÓRICO: sustituido por la variante `nodes`, ver D-I en 0.1] FONDO DEL HERO (decisión D-I): sin vídeo ni hls.js. Extrae con ffmpeg un fotograma representativo del vídeo de Mux de la landing anterior, expórtalo a WebP y AVIF (≤ 80 kB, ancho 1920 px) en public/media/, y déjalo preparado como componente HeroBackground (imagen al 40 % de opacidad + glows de los tokens). Si no puedes acceder al vídeo, crea el fondo solo con los degradados y glows de los tokens y dímelo.
16. COLOR (decisión D-J): documenta en docs/design-base.md una sección "Reglas de color de la nueva landing": verde = CTAs, chips de resultado y una palabra destacada por titular; azul = eyebrows, guiones de listas, +/− del FAQ, enlaces, nodos del método y etiqueta "Recomendado"; cifras en blanco.
17. PÁGINAS LEGALES: muéstralas con el sistema de diseño de la landing (fondo navy, DM Sans, texto a 17–18 px, ancho de lectura de ~70 caracteres). Cambios de contenido autorizados, y SOLO estos:
   a) En ambas páginas, la fecha "junio de 2025" pasa a "junio de 2026".
   b) Política de Cookies: la nueva web NO usa Google Analytics, Meta Pixel ni ninguna cookie de seguimiento o publicidad; la única analítica es Cloudflare Web Analytics, que no instala cookies. Reescribe solo las partes que afirman lo contrario (tablas de clasificación, cookies de terceros y menciones a GA/Meta Pixel) para describir la situación real, conserva el resto de secciones (qué son las cookies, cómo desactivarlas por navegador, cambios en la política, contacto) y añade que, si en el futuro se incorporan cookies no esenciales, se pedirá consentimiento previo y se actualizará esta política. Pon como "Última actualización" la fecha de hoy.
   c) No hay banner de cookies en la nueva web (no hace falta sin cookies no esenciales).
   Muéstrame el diff del texto de la Política de Cookies antes de hacer el commit.

Al terminar: árbol de carpetas, archivos clave y capturas. Espera mi visto bueno.
```

### D3. Página temporal "Próximamente" — ⏭️ OMITIDA (decisión del 30/09, ver 0.4)

```
Rama develop.

Crea la home temporal (src/app/page.tsx) con el diseño ERVIA (tokens, fuentes, fondo y estilo de design-base.md). Una sola pantalla, centrada, sin scroll en escritorio:
- Logo ERVIA.
- Eyebrow: "Automatización con IA para pymes · Hecho en Mérida"
- H1: "Estamos preparando la nueva web de ERVIA."
- Texto: "Mientras tanto, cuéntanos qué te quita más tiempo en tu negocio. Te respondemos el mismo día."
- CTA primario: "Escríbenos por WhatsApp" → https://wa.me/529992498890?text=[URL-encoded "Hola, quiero información sobre ERVIA"] (target _blank, rel noopener). El número y el texto van en src/config/site.ts, con un interruptor WHATSAPP_ENABLED. [Si la comprobación 0.2 del plan no está resuelta: WHATSAPP_ENABLED=false y el correo pasa a ser el CTA primario.]
- CTA secundario: "info@ervia.tech" → mailto.
- Footer con los enlaces legales.
- Metadatos: title "ERVIA — Automatización con IA para pymes | Mérida", description corta, y robots noindex también en producción mientras exista esta página (lo quitaremos en el lanzamiento).
- Accesible y sin scroll horizontal de 360 a 1440 px.

Sube el trabajo: crea el repo en GitHub [ervia-tech/ervia-web] (privado), haz push de develop y crea main a partir de develop con esta versión. Muéstrame capturas a 1440 y 390 px.
```

---

## BLOQUE E — Ensayo del procedimiento de dominio con `test.ervia.tech` (staging) [TÚ]

> Se ensaya el procedimiento completo en un dominio sin importancia. Si algo falla aquí, no pasa nada.

**E1. Proyecto y app en Dokploy.** Crea un **proyecto nuevo** llamado `ERVIA Web`, para no mezclarlo con lo viejo. Dentro, una **Application**:
- Nombre: `ervia-web-staging`
- Proveedor: GitHub → repo `ervia-tech/ervia-web` → rama **`develop`** (si Dokploy no ve la organización, revisa los permisos de la GitHub App de Dokploy sobre la organización `ervia-tech`).
- Build Type: **Railpack** (el mismo que usas en Full Motor).
- Environment: `NEXT_PUBLIC_SITE_ENV=staging` (y más adelante las del formulario).
- Auto Deploy: **activado** (cada push a develop actualiza staging).

**E1-bis. Comprobaciones previas por la CSP (G7):**
- En Dokploy, el build debe ejecutar el script `build` de `package.json` (`next build && node scripts/csp-hashes.mjs`). Railpack lo hace por defecto; no pongas un comando de build personalizado con `next build` a secas.
- Cloudflare → **Speed → Optimization → Rocket Loader: desactivado** (reescribe los scripts y rompería la CSP por hashes).
- Tras el primer despliegue, comprueba la cabecera: `curl.exe -sI https://test.ervia.tech | findstr /i "content-security-policy"` debe mostrar varios `sha256-` y ningún marcador sin sustituir.

- **Memoria del VPS para compilar (G8):** el build de Next necesita ~1,5–2 GB libres. Antes del primer despliegue, en el VPS: `free -h`. Si la columna "available" baja de 2 GB, añade en Dokploy → Environment de la app `NODE_OPTIONS=--max-old-space-size=1536` y despliega fuera de horas de uso de n8n/Chatwoot. Vigila los logs del build: un "heap out of memory" significa que hay que liberar memoria antes de reintentar.

**E2. Primer despliegue sin dominio.** Pulsa Deploy y revisa los logs hasta ver el arranque de Next.js en el puerto 3000. Sin dominio todavía.

**E3. DNS en gris durante la emisión del certificado.** Cloudflare → DNS → registro `test` → confirma que apunta a `[IP_VPS_LANDING]` y cámbialo a **DNS only (nube gris)**. Espera 1–2 minutos y verifica desde PowerShell:
```powershell
Resolve-DnsName test.ervia.tech   # debe devolver la IP del VPS, no IPs de Cloudflare
```
*Por qué:* con la nube naranja y ciertas combinaciones de modo SSL, el desafío de Let's Encrypt puede no llegar a Traefik. En gris va directo al VPS.

**E4. Añadir el dominio.** Dokploy → `ervia-web-staging` → Domains → Add: host `test.ervia.tech`, path `/`, puerto **3000**, HTTPS **activado**, certificado **Let's Encrypt**.

**E5. Verificar en el servidor:**
```bash
grep -n "test.ervia.tech" /etc/dokploy/traefik/dynamic/*.yml     # exactamente UN archivo: el de ervia-web-staging
docker logs dokploy-traefik --since 5m 2>&1 | grep -i -E "acme|certificate|error" | tail -20
# Certificado que sirve el propio VPS (sin pasar por Cloudflare):
curl -svk --resolve test.ervia.tech:443:127.0.0.1 https://test.ervia.tech/api/health 2>&1 | grep -i -E "subject:|issuer:|expire|ok"
# Esperado: issuer de Let's Encrypt y {"ok":true}
```

**E6. Volver a naranja.** Cloudflare → registro `test` → **Proxied**. Deja el modo SSL/TLS en **Full** ("Completo"), como está. **No lo cambies a Full (strict):** el modo es de toda la zona y afecta también a n8n, Supabase, vps, fullmotor-demo, n8nlab y vpslab en los dos VPS; cualquier origen sin certificado válido dejaría de funcionar. Si algún día se quiere strict, se aplica por subdominio con una Configuration Rule de Cloudflare.
```powershell
curl.exe -sI https://test.ervia.tech            # 200
curl.exe -s https://test.ervia.tech/api/health  # {"ok":true}
curl.exe -sI https://[HOST_VAKDEVI]   # 200 (Vak Devi intacto)
```

**Si el certificado no se emite en 3–5 minutos:**
1. No reintentes en bucle (cupo de Let's Encrypt).
2. Revisa los logs de Traefik (comando de E5) y comprueba que el DNS está en gris y apunta al VPS.
3. Elimina el dominio en Dokploy, verifica con `grep` que desapareció y vuelve a añadirlo **una sola vez**.
4. Solo como último recurso: Dokploy → Settings → Traefik → **Reload**. Afecta unos segundos a todas las webs del VPS: hazlo en horario de poco tráfico y verifica Vak Devi después.

**E7. Rendimiento real en móvil (pendiente de la G8):** con staging en marcha, mide `https://test.ervia.tech` en https://pagespeed.web.dev (pestaña Móvil), 2–3 veces. Si Performance ≥ 85 y LCP ≤ 2,5 s, se da por bueno. Si no, se decide entre quitar el eje `opsz` de DM Sans o hidratar más tarde el mockup y el formulario, como mejora posterior al lanzamiento (no bloquea el corte).

✅ **Criterio:** `test.ervia.tech` sirve la nueva app con certificado válido, un único `.yml` la declara y Vak Devi responde 200. **Anota cualquier desviación:** el Bloque F repite exactamente estos pasos con el dominio principal.

---

## BLOQUE F — Corte a producción de www.ervia.tech [TÚ]

> Ventana estimada: 20–30 min. Nadie visita la web, así que unos minutos sin servicio no importan.

**F0. Requisitos previos al corte (no empieces el Bloque F sin estos tres):**
- [ ] **Webhook del 999 249 8890 en YCloud** apuntando al workflow del agente de ERVIA (o desconectado si ese workflow aún no existe y vas a contestar tú desde la app). Nunca al workflow de Full Motor. Compruébalo escribiendo tú al número desde otro teléfono: la respuesta debe ser de ERVIA, no del taller.
- [ ] **Correo de prueba a `info@ervia.tech`** desde otra cuenta: debe llegar a tu buzón de Google Workspace. Si no llega, crea `info@` como alias de `admin@ervia.tech` en la consola de Workspace.
- [ ] **Staging validado** (Bloque E completo) y PR de `develop` a `main` fusionada (H1–H2).

**Microcopy del CTA final:** "Respuesta inmediata, incluso fuera de horario" solo es cierto si el agente de ERVIA responde automáticamente. Si al publicar contestas tú a mano, pide a Claude Code cambiarlo por "Te respondemos lo antes posible".

**Texto del CTA:** si el agente de ERVIA ya responde automáticamente en el número, puedes pedir a Claude Code que el CTA del hero pase de "Escríbenos por WhatsApp" a "Pruébalo en WhatsApp ahora" (sección 3.4 de la auditoría). Si contestas tú a mano, se queda como está.

**F1. App de producción sin dominio.** En el proyecto `ERVIA Web`, crea la Application `ervia-web`: mismo repo, rama **`main`**, Railpack, `NEXT_PUBLIC_SITE_ENV=production`, **Auto Deploy desactivado** (producción se despliega a mano). Despliega y verifica en los logs que arranca.

**F2. Quitar los dominios de la app vieja.** Dokploy → `ervia-landing` → Domains → elimina `www.ervia.tech` y también `ervia.tech` si existe ahí.

**F3. Verificar que no quedan routers para esos hosts:**
```bash
grep -n -E "Host\(\`(www\.)?ervia\.tech\`\)" /etc/dokploy/traefik/dynamic/*.yml
# Esperado: ninguna línea. Si aparece algún archivo (p. ej. el fantasma detectado en A0.3), elimina ese dominio desde la app de Dokploy que lo tenga.
# Si el archivo pertenece a una app que ya no existe en Dokploy, NO lo borres a mano sin avisarme: lo revisamos juntos.
```

**F4. Detener (no borrar) la app vieja.** `ervia-landing` → **Stop**. Se conserva unos días como plan de vuelta atrás.

**F5. DNS en gris.** Cloudflare → registros `@` y `www` → **DNS only**. Verifica con `Resolve-DnsName www.ervia.tech` y `Resolve-DnsName ervia.tech` que devuelven la IP del VPS.

**F6. Añadir el dominio a la app nueva.** `ervia-web` → Domains → Add: `www.ervia.tech`, path `/`, puerto 3000, HTTPS, Let's Encrypt. [Si en A0 viste que `ervia.tech` también apuntaba al VPS y quieres emitirle certificado de origen, añádelo también; si no, la redirección de F8 lo resuelve en Cloudflare.]
Es posible que Traefik reutilice el certificado vigente guardado en `acme.json` para ese mismo dominio. Si es así, la emisión es instantánea.

**F7. Verificar (igual que en E5):**
```bash
grep -n "www.ervia.tech" /etc/dokploy/traefik/dynamic/*.yml    # un único archivo: el de ervia-web
curl -svk --resolve www.ervia.tech:443:127.0.0.1 https://www.ervia.tech/api/health 2>&1 | grep -i -E "issuer:|expire|ok"
```

**F8. Volver a naranja y crear la redirección del dominio raíz.**
- Cloudflare → `@` y `www` → **Proxied**. Modo SSL: se queda en **Full** ("Completo"); no cambiar a strict (ver E6).
- Cloudflare → **Rules → Redirect Rules** → crea una regla desde la plantilla "Redirect from root to WWW" (o equivalente): `ervia.tech/*` → `https://www.ervia.tech/${1}`, **301**, conservando la query string. Si ya existía una regla o Page Rule que hiciera esto (A0.2), reutilízala y no la dupliques.

**F9. Verificación final:**
```powershell
curl.exe -sI https://www.ervia.tech                          # 200 (y en el HTML NO debe aparecer noindex)
curl.exe -sI https://ervia.tech                              # 301 → https://www.ervia.tech/
curl.exe -sI http://www.ervia.tech                           # 301/308 → https
curl.exe -sI https://www.ervia.tech/politica-de-privacidad   # 200
curl.exe -sI https://www.ervia.tech/politica-de-cookies      # 200
curl.exe -sI https://[HOST_VAKDEVI]                # 200
```
Abre www.ervia.tech en el celular con datos móviles y prueba el botón de WhatsApp.

**Plan de vuelta atrás** (si algo falla y no se resuelve en 20 min): elimina el dominio de `ervia-web` → verifica con `grep` → añádelo de nuevo a `ervia-landing` → **Start** en `ervia-landing` → DNS de vuelta a naranja. El certificado sigue en `acme.json`, así que la vuelta es inmediata.

✅ **Criterio:** www.ervia.tech sirve la landing nueva desde `ervia-web`, el dominio raíz redirige, las páginas legales responden y Vak Devi está intacto.

> **Si elegiste D-A = b** (mantener la landing vieja hasta el lanzamiento): salta este bloque ahora y ejecútalo tal cual en la Fase H, con la landing completa en `main`.

---

## BLOQUE G — Construcción de la landing completa (en `develop`, visible en test.ervia.tech) [CC]

**Reglas comunes (van al inicio de cada prompt):**
```
Rama develop. Sigue CLAUDE.md. Fuentes: docs/design-base.md (estilo) y docs/auditoria-landing-ervia-v2.md (contenido). No toques main, no despliegues a mano (el push a develop despliega staging solo). Al terminar: archivos tocados, capturas a 1440 y 390 px con Playwright, build sin errores. Espera mi visto bueno.
```

La estructura final de la página es la sección 7 de la auditoría v2. Cada fase construye una parte. El marcador temporal de la D2 se sustituye por la landing real en G1; `main` no se toca hasta H. **Alcance de hoy: v1** (ver 0.4).

### G0. Conectar GitHub y subir el trabajo
```
Añade el remoto origin = https://github.com/EliasRuiz69/ervia-web.git y haz push de main y de develop (con upstream). Si Git pide iniciar sesión en GitHub, avísame. Confirma que ambas ramas están en GitHub y que no se subió ningún archivo .env.
```

### G1. Estructura de la home, nav y franja de confianza
```
[Reglas comunes]
1. Sustituye en develop el marcador temporal de la home por la estructura completa de la sección 7 de la auditoría v2, con cada sección como componente propio en src/components/sections/ (Hero, TrustBar, Mirror, Gains, Method, Audience, CaseStudy, Founder, Pricing, Faq, FinalCta) y anclas: #inicio, #ganancias, #metodo, #caso-real, #precios, #faq, #contacto. Por ahora, las secciones aún no construidas llevan solo su H2 definitivo.
2. Nav definitivo (sección 7.1 de la auditoría): logo · Lo que ganas · Método · Precios · FAQ · [WhatsApp, solo si WHATSAPP_ENABLED] [Diagnóstico gratis] ("Caso real" se añadirá en la v2); hamburguesa accesible en móvil.
3. Franja de confianza (sección 4.2 de la auditoría): 4 ítems con ícono SVG.
4. Botón flotante de WhatsApp en móvil (56×56 px), oculto mientras #contacto está en pantalla. Enlace: https://wa.me/529992498890 con texto precargado por ubicación (hero, nav, flotante, precios, contacto) para poder medir después.
5. Centraliza el número de WhatsApp y los textos precargados en src/config/site.ts, con un interruptor WHATSAPP_ENABLED = true. Si es false, no se muestra ningún botón ni enlace de WhatsApp y el CTA principal pasa a ser "Agenda tu diagnóstico gratis" → #contacto.
6. En esta v1, las secciones CaseStudy y Founder NO se renderizan (quedan preparadas como componentes vacíos para la v2) y el nav no enlaza a #caso-real.
```

### G2. Hero con mockup de WhatsApp
```
[Reglas comunes]
Implementa el hero según las secciones 3.4 y 4.1 de la auditoría v2:
- Textos: eyebrow, H1 [opción A de 4.1, recomendada: "Tu WhatsApp atiende, cotiza y agenda citas solo. Tú te dedicas a tu negocio." — cámbiala si prefieres B o C], subtítulo con el Método ERVIA, CTA primario "Escríbenos por WhatsApp" (NO "Pruébalo en WhatsApp ahora" mientras no haya un agente de ERVIA conectado a ese número; ver sección 0.2) y secundario "Detecta tus fugas gratis (15 min)", microcopy.
- Columna derecha: mockup de teléfono con conversaciones de WhatsApp (v1: SOLO la conversación del taller, sin pestañas de giro; el componente debe admitir más conversaciones para la v2), con el texto exacto de 3.4 (en "$[PRECIO]" usa [PRECIO_AFINACIÓN]), una etiqueta discreta "Conversación de ejemplo" bajo el teléfono, indicador "escribiendo…", hora visible y chips de resultado al final ("✅ Cita agendada · ✅ Cliente registrado · ✅ 0 mensajes pendientes"). Sin ninguna otra cifra.
- Solo transform/opacity; pausa al pasar el cursor; prefers-reduced-motion = conversación completa estática; aria-label con el resumen.
- Móvil: el mockup va debajo de los CTAs, compacto (máx. 420 px de alto), y el CTA primario debe verse sin scroll en 390×844.
- H1 a 60–68 px en escritorio.
- Fondo: usa el HeroBackground existente (variante nodes). No hay canvas ni vídeo.
- Puedes buscar en 21st (MCP) componentes de chat o mockup de teléfono como punto de partida, pero re-estilízalos con los tokens de ERVIA.
Verifica el LCP en móvil con Lighthouse por línea de comandos (npx lighthouse http://localhost:3000 --only-categories=performance) sobre el build de producción servido en local, y dime el valor.
```

### G3. Espejo del problema, "Lo que ganas cuando automatizas" y "Para quién es"
```
[Reglas comunes]
Implementa, con el texto exacto de la auditoría v2:
- Espejo del problema (4.3): 4 tarjetas con ícono, remate y enlace "Ahora imagina lo contrario ↓" → #ganancias.
- Lo que ganas cuando automatizas (4.4): 4 tarjetas con el patrón ganancia (H3, 28–32 px) → antes/después (16–17 px) → "Cómo lo logramos" (15 px, cursiva, color secundario, separado por una línea fina). Tarjeta 1 destacada. CTA "Quiero ver qué ganaría mi negocio →".
- Para quién es (4.6): los cuatro giros de 4.6 (son sectores a los que nos dirigimos, no casos de éxito; no afirmes que ya tenemos clientes en ellos).
Revisa el copy con las skills copywriting y copy-editing SIN cambiar el mensaje: solo señálame mejoras concretas y espera mi decisión antes de aplicarlas.
```

### G4. Método ERVIA y precios
```
[Reglas comunes]
- Sección Método ERVIA (3.3 y 4.5 de la auditoría): diagrama de 3 nodos conectados derivado del isotipo (docs/design-base/assets/). Propónme 2 variantes del diagrama antes de decidir. Horizontal en escritorio y vertical en móvil; la línea se dibuja al entrar en pantalla (estática con reduced-motion). Contenido de la tabla de 3.3: promesa · qué hacemos · te llevas · tiempo. v1 SIN entregables con nombre propio: en "Te llevas" usa "Un diagnóstico claro: qué te cuesta tiempo y ventas, y por dónde empezar" (paso 1), "Tu agente funcionando, tu panel de control y la capacitación" (paso 2) y "Un resumen mensual de mensajes atendidos y citas agendadas" (paso 3). No menciones "Mapa de Fugas". CTA "Empieza por el paso 1: Detectar. Es gratis →".
- Precios (4.9): 3 planes = 3 pasos del método (v1 sin cifras: Detectar "Gratis" · Automatizar "Cotización tras el diagnóstico" · Escalar "Cotización tras el diagnóstico"), badge "Recomendado" en Automatizar, CTAs a WhatsApp con texto precargado por plan. Sin nota de IVA ni de plazos en la v1. Si WHATSAPP_ENABLED es false, los CTAs de los planes llevan a #contacto. En móvil: carrusel con scroll-snap e indicador, con Automatizar visible primero.
```

### G5. Caso real Full Motor y "Quién está detrás" — ⏭️ FUERA DE LA V1 (requiere D3 y materiales)
```
[Reglas comunes]
Implementa 4.7 y 4.8 de la auditoría v2:
- Caso contado con los 3 pasos del método, SIN cifras. Video [public/media/demo-fullmotor.webm, .mp4 y poster .webp]: muted, loop, playsinline, reproducción solo al entrar en pantalla (preload="none" hasta entonces), width/height definidos, poster con botón de reproducir si reduced-motion. Máx. 1,5 MB por archivo: si pesa más, dime el comando ffmpeg para comprimirlo.
- Capturas [captura_chat.webp, captura_panel.webp] con next/image, alt descriptivo y lazy.
- Testimonio [frase, nombre, cargo, logo o foto].
- "Quién está detrás": [foto_elias.webp] y el texto de 4.8.
```

### G6. FAQ, CTA final, formulario y endpoint de leads
```
[Reglas comunes]
1. FAQ (4.10): 7 preguntas: las 7 primeras de 4.10 con sus respuestas; la n.º 1 SIN mencionar "Mapa de Fugas" y la n.º 2 ("¿Cuánto cuesta?") coherente con precios sin cifras ("Depende de lo que automaticemos; te damos una cotización clara tras el diagnóstico gratuito"). La n.º 8 (plazos y factura) queda para la v2. Acordeón accesible (button type="button", aria-expanded, aria-controls).
2. CTA final (4.11): H2, subtítulo "15 minutos. Gratis. Sin compromiso." (sin promesa del Mapa de Fugas en la v1), dos columnas: WhatsApp grande | formulario (Nombre · Correo o WhatsApp · Giro del negocio [select] · "¿Qué te quita más tiempo hoy?"). (Sin enlace de agenda en la v1. Si WHATSAPP_ENABLED es false, la columna de WhatsApp no se muestra y el formulario ocupa el centro.)
3. Formulario: <form> real, labels visibles, validación en cliente y servidor con zod, errores junto al campo, estado "Enviando…", mensajes de éxito ("Listo, {nombre}. Te escribimos hoy mismo para agendar tu diagnóstico.") y de error con alternativa de WhatsApp. Campo honeypot oculto contra bots.
4. Route Handler POST /api/lead (única ruta dinámica): valida con zod, descarta si el honeypot viene lleno, limita a 5 envíos por IP cada 10 minutos (en memoria es suficiente: una sola instancia) y reenvía al webhook de n8n leyendo LEAD_WEBHOOK_URL y LEAD_WEBHOOK_SECRET del entorno, con la cabecera "X-ERVIA-Secret". La URL del webhook NUNCA llega al navegador. Cuerpo JSON que se envía a n8n (CONTRATO: no lo cambies sin avisarme, el workflow de n8n depende de él):
   {"nombre": string, "contacto": string (tal como lo escribió el usuario), "tipoContacto": "email" | "whatsapp", "whatsapp10": string | null (10 dígitos si es WhatsApp, sin +52), "giro": string, "mensaje": string, "origen": "web-contacto", "enviadoEn": ISO 8601 UTC}
   Timeout de 8 s al llamar a n8n. Si n8n no responde 2xx, el usuario ve el mensaje de error con la alternativa de WhatsApp. Responde {ok:true} o un error genérico, sin filtrar detalles internos.
5. Documenta LEAD_WEBHOOK_URL y LEAD_WEBHOOK_SECRET en .env.example (sin valores).
6. Ejecuta la revisión de security-guidance sobre el formulario y /api/lead y dime qué encontró.
7. Prueba E2E con Playwright contra un webhook simulado en local (sin llamar a n8n real).
8. Política de Privacidad: propón (sin aplicar) los cambios mínimos para que refleje el formulario nuevo: qué datos se recogen (nombre, correo o WhatsApp, giro, mensaje), para qué (contactar y agendar el diagnóstico), y quién los trata como encargado (servidor propio de ERVIA con n8n, Google Workspace/Google Sheets y Telegram (aviso interno)). Muéstrame el diff y espera mi aprobación.
9. Con #contacto ya construido, comprueba en móvil que el botón flotante de WhatsApp se oculta sobre el formulario y reaparece al salir.
```

**G6-bis. Workflow de leads en n8n [CC en el proyecto de Antigravity con el MCP de n8n]**

> Se ejecuta en **otra sesión de Claude Code**: la del proyecto de Antigravity que tiene conectado el MCP de n8n, no en `ervia-web`. Toma como base tu workflow de Telegram existente, sin modificarlo.

**Preparación [TÚ] (10 min):**
1. **Hoja de cálculo:** en Google Drive (cuenta de la credencial de Google Sheets de ese n8n), crea la hoja **"Leads ERVIA"** con una pestaña **"Leads"** y esta fila 1 de encabezados, en este orden:
   `fecha_local | nombre | contacto | tipo_contacto | whatsapp10 | giro | mensaje | origen | estado`
2. **Secreto del webhook:** genéralo en PowerShell y guárdalo en tu gestor de contraseñas (no lo pegues en ningún chat):
   ```powershell
   $b = New-Object byte[] 32; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b); ($b | ForEach-Object { $_.ToString("x2") }) -join ""
   ```
3. Ten a mano el **nombre exacto de tu workflow de Telegram base** y la **instancia de n8n** donde está (n8n.ervia.tech o n8nlab.ervia.tech).

**Prompt [CC] (en la sesión del proyecto de Antigravity con MCP de n8n):**
```
Usa el MCP de n8n (instancia [n8n.ervia.tech / n8nlab.ervia.tech]).
REGLAS: crea un workflow NUEVO; NO modifiques el workflow base ni ningún otro; déjalo INACTIVO hasta que yo lo active; no envíes datos de prueba a la hoja real sin avisarme.

Base: lee el workflow "[NOMBRE DEL WORKFLOW DE TELEGRAM BASE]" y reutiliza SOLO su credencial de Telegram y su chat_id de destino. Dime cuáles son antes de usarlos.

Crea el workflow "ERVIA Web - Leads" con estos nodos:
1. Webhook — POST, path "ervia-web-leads", Authentication: Header Auth con una credencial NUEVA "ERVIA Web Leads" (Name: X-ERVIA-Secret; el Value lo pego yo en n8n). Respond: "Using 'Respond to Webhook' node".
2. Code "Validar y normalizar" — entrada con este contrato:
   {"nombre","contacto","tipoContacto":"email"|"whatsapp","whatsapp10": string|null,"giro","mensaje","origen","enviadoEn" (ISO UTC)}
   Valida que nombre, contacto, tipoContacto y giro existan y no estén vacíos, y recorta cada texto a 1.000 caracteres. Salida: fecha_local (enviadoEn convertida a America/Merida, formato "YYYY-MM-DD HH:mm"), nombre, contacto, tipo_contacto, whatsapp10, giro, mensaje, origen, estado = "nuevo", y un campo valido (true/false).
3. IF "¿Válido?" — valido = true.
   - Rama falsa → Respond to Webhook 400 {"ok": false}.
4. Google Sheets "Guardar lead" — Append Row en la hoja "Leads ERVIA", pestaña "Leads", mapeando cada columna por su nombre. Options: "Value Input Mode" = RAW (para que un texto como "=SUMA(1)" se guarde como texto y no como fórmula). Settings: "On Error: Continue (using error output)" para que un fallo de la hoja no impida el aviso.
5. Telegram "Aviso lead" — Send Message al chat_id del workflow base, con parse_mode HTML y TODO el texto del usuario escapado (&, <, >). Contenido:
   🟢 <b>Nuevo lead — ervia.tech</b>  (si origen termina en "-staging", empieza el mensaje con "🧪 [STAGING]" y NO guardes en la hoja: solo avisa)
   👤 {nombre}
   🏪 {giro}
   📞 {contacto}  → si tipo_contacto = whatsapp, añade el enlace https://wa.me/52{whatsapp10}; si es email, el enlace mailto:
   💬 {mensaje}
   🕒 {fecha_local}
   ⚠️ Si el nodo de Google Sheets falló, añade la línea "No se pudo guardar en la hoja".
6. Respond to Webhook "OK" — 200 {"ok": true}.

Después:
- Prueba con la URL de TEST del webhook: envía con curl un lead de prueba con nombre "PRUEBA — borrar" (cabecera X-ERVIA-Secret con un valor que yo te pase en ese momento, o pídemelo), y otro inválido (sin nombre) que debe devolver 400. Confirma la fila en la hoja y el mensaje en Telegram; luego dime que borre yo la fila de prueba.
- Dame la URL de PRODUCCIÓN del webhook (para LEAD_WEBHOOK_URL) y confirma que el workflow sigue INACTIVO.
```

**Cierre [TÚ]:**
1. Pega el secreto en la credencial "ERVIA Web Leads" de n8n (campo Value).
2. Borra la fila de prueba de la hoja.
3. **Activa** el workflow en n8n.
4. En Dokploy (cuando existan las apps, Bloques E y F) → `ervia-web-staging` y `ervia-web` → Environment: `LEAD_WEBHOOK_URL` = URL de producción del webhook y `LEAD_WEBHOOK_SECRET` = el secreto. Antes del primer despliegue.
5. Prueba real: en staging (Bloque E), envía el formulario con tus datos → fila en la hoja + aviso en Telegram.

> **No reutilices para esto la URL ni la credencial del workflow base.** Cada formulario con su webhook y su secreto: si algún día hay que revocar uno, no afecta a los demás.

### G7. SEO, GEO y analítica
```
[Reglas comunes]
Implementa la sección 6 y la 4.12 de la auditoría v2 con la API de metadatos de Next.js:
- title, description, canonical https://www.ervia.tech/, Open Graph (og:locale es_MX) y Twitter summary_large_image.
- Imagen OG generada con next/og (src/app/opengraph-image.tsx), 1200×630: fondo navy-900, titular del hero, diagrama del Método ERVIA y logo.
- JSON-LD: ProfessionalService (ERVIA, Mérida, Yucatán, MX, areaServed MX, email, teléfono +529992498890), FAQPage y HowTo "Método ERVIA", con textos idénticos a los visibles. Usa la skill schema.
- src/app/sitemap.ts (home + páginas legales) y src/app/robots.ts: en staging Disallow total; en producción Allow para todos, incluidos GPTBot, ClaudeBot, PerplexityBot y Google-Extended, más el enlace al sitemap.
- GEO (skill ai-seo): frase autocontenida que defina el Método ERVIA, visible en la sección del método; y un /llms.txt con resumen de ERVIA, servicios, método, zona y contacto.
- Cabeceras de seguridad en next.config.ts: Content-Security-Policy (default-src 'self'; sin orígenes externos salvo los que realmente use la página, p. ej. el beacon de Cloudflare Web Analytics si se inyecta), X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, X-Frame-Options: DENY (o frame-ancestors 'none'), Permissions-Policy restrictiva. Compruébalas con curl -I sobre el build local y verifica que la página, el formulario y el script del carrusel siguen funcionando (si la CSP bloquea el script en línea, usa nonce o hash, nunca 'unsafe-inline' sin decírmelo).
- Analítica v1: SOLO Cloudflare Web Analytics (sin cookies, sin banner). No añadas GA4, Umami, Meta Pixel ni eventos personalizados; dime si hace falta algún cambio en el código para que funcione (normalmente se activa desde el panel de Cloudflare). Los eventos (click_whatsapp, form_submit_success, etc.) quedan para la v2.
Muéstrame el <head> generado en producción (build local con NEXT_PUBLIC_SITE_ENV=production) y valida el JSON-LD.
```

### G8. QA completa
```
[Reglas comunes]
1. Lighthouse por línea de comandos (npx lighthouse sobre el build de producción servido en local; perfil móvil por defecto y --preset=desktop) en móvil y escritorio: Performance, Accessibility, Best Practices y SEO ≥ 90; LCP < 2,5 s; CLS < 0,1. Corrige lo que falle.
2. Playwright a 360, 390, 430, 768, 1024 y 1440 px: sin scroll horizontal, menú, CTA primario visible sin scroll en móvil, mockup, botón flotante oculto sobre #contacto, carrusel de precios, acordeón del FAQ y formulario (éxito y error).
3. Accesibilidad automática con axe (vía Playwright): 0 errores serios o críticos.
4. Revisión con la skill web-design-guidelines y, al final, con design-taste-frontend, SOLO para detectar problemas de ejecución: no cambies el estilo, dame la lista.
5. Comparativa visual: capturas nuevas frente a docs/design-base/capturas/. Dime qué difiere del ADN visual y si es intencional (según la auditoría) o un desvío.
6. Prueba del logo tapado: lista los diferenciadores de la sección 3.2 visibles y los lugares donde aparece "Método ERVIA" (mínimo 4 y 4).
7. Barrido de texto: ni "€", ni "coste", ni "no sale a cuenta", ni cifras de resultados no reales o sin etiquetar, ni enlaces a "#".
Entrégame el informe y espera mi decisión para el lanzamiento.
```

---

## BLOQUE H — Lanzamiento [TÚ + CC]

**H1. [CC] Preparar main:**
```
Quita el noindex de producción (debe quedar solo en staging), confirma que robots.ts permite indexar en producción, y abre una Pull Request de develop → main con el resumen de cambios. No la fusiones: yo la reviso y la fusiono.
```

**H2. [TÚ]** Revisa y fusiona la PR en GitHub.

**H3. [TÚ]** Dokploy → `ervia-web` → Environment: confirma `NEXT_PUBLIC_SITE_ENV=production`, `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_SECRET` y las de analítica → **Deploy**. **No se toca ningún dominio** (ya quedó resuelto en F). Si elegiste D-A = b, aquí ejecutas el Bloque F completo.

**H4. [TÚ] Checklist de lanzamiento:**
- [ ] `curl.exe -sI https://www.ervia.tech`: 200 y sin `noindex` en el HTML.
- [ ] Recorrido completo en el celular con datos móviles.
- [ ] Prueba de los 5 segundos con 3 dueños de pyme (auditoría v2, Fase 8).
- [ ] Compartir el enlace por WhatsApp: la previsualización muestra imagen, título y descripción.
- [ ] Formulario real → llega a la Sheet y el aviso llega a tu Telegram o correo.
- [ ] Botones de WhatsApp desde celular y desde WhatsApp Web.
- [ ] JSON-LD válido en https://search.google.com/test/rich-results.
- [ ] Eventos de analítica llegando.
- [ ] Google Search Console: verificación del dominio (registro TXT en Cloudflare), envío de `sitemap.xml` y solicitud de indexación.

---

## BLOQUE I — Limpieza final [TÚ] (7 días después de F sin incidencias)

1. Dokploy → `ervia-landing` (detenida desde F4) → **Delete**.
2. Si el proyecto viejo de Dokploy quedó vacío, elimínalo.
3. VPS:
   ```bash
   docker service ls | grep -i "ervia-landing"   # vacío
   docker image prune                            # sin -a
   grep -l "ervia-landing" /etc/dokploy/traefik/dynamic/*.yml   # vacío
   ```
4. GitHub: **Archive** (Settings → Danger Zone → Archive this repository) de `ervia-landing` y `ervia-landing-v2`. No se borran: quedan como referencia de solo lectura. El ADN visual ya vive en `ervia-web/docs/design-base/`.
5. Borra el clon local `ervia-landing-referencia` si ya no lo necesitas.
6. Conserva los respaldos de `/root/respaldo-[fecha]/` 30 días y luego elimínalos (`acme.json` contiene claves privadas).
7. Revisa a la semana los logs de Traefik por si hubiera errores de renovación de certificados de dominios que ya no existen:
   ```bash
   docker logs dokploy-traefik --since 168h 2>&1 | grep -i "error renewing" | tail
   ```

---

## Anexo 1 — Mapa de fases y dependencias

| Fase | Quién | Depende de | Bloqueada por decisión |
|---|---|---|---|
| A0 Inventario y respaldos | Tú | — | — |
| B Retirar v2 | Tú | A0 | — |
| C1–C4 Plugins, 21st, skills | Tú | — | D-G |
| D1 ADN de diseño | CC | A0.5 | — |
| D2 Esqueleto | CC | D1 | D-B, D-E, D-F |
| D3 "Próximamente" | CC | D2 | D-A, **D4** |
| E Staging (ensayo) | Tú | B, D3 | D-C |
| F Corte a producción | Tú | E | D-A, D-D |
| G1 Estructura, nav, franja | CC | E | D4 |
| G2 Hero | CC | G1 | D3, D10 |
| G3 Espejo, ganancias, para quién | CC | G1 | D3 |
| G4 Método y precios | CC | G1 | **D2**, D11, D12 |
| G5 Caso real y fundador | CC | G1 | **D3** + materiales |
| G6 FAQ, CTA, formulario, n8n | CC + Tú | G1 | D8, D11, D12, D-H |
| G7 SEO, GEO, analítica | CC | G2–G6 | D6 |
| G8 QA | CC | G7 | — |
| H Lanzamiento | Tú + CC | G8 | — |
| I Limpieza | Tú | F + 7 días | — |

## Anexo 2 — Variables de entorno

| Variable | staging | production | Dónde se define |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_ENV` | `staging` | `production` | Dokploy → Environment |
| `LEAD_WEBHOOK_URL` | URL del webhook de n8n | la misma (o un webhook de prueba en staging) | Dokploy |
| `LEAD_WEBHOOK_SECRET` | secreto | secreto | Dokploy y credencial de n8n |
| Analítica (según D6) | id de pruebas o vacío | id real | Dokploy |
| `API_KEY_21ST` | — | — | Solo en tu Windows (`setx`), nunca en el repo ni en Dokploy |

## Anexo 3 — Por qué este orden evita el error de la v2

| Error de la vez anterior | Qué lo evita en este plan |
|---|---|
| Se detuvo la app vieja pero su dominio seguía asignado | Siempre se **elimina el dominio** en Dokploy (B1, F2) antes de detener nada |
| No se comprobaba si quedaba configuración de Traefik | `grep` sobre `/etc/dokploy/traefik/dynamic/*.yml` antes y después (A0.3, B2, F3, F7) |
| Let's Encrypt fallaba o se reintentaba sin control | DNS en gris durante la emisión, verificación en logs y como máximo un reintento controlado (E3–E5) |
| El procedimiento se estrenaba con el dominio principal | Ensayo completo con `test.ervia.tech` (Bloque E) |
| Sin vuelta atrás | La app vieja se detiene, no se borra, hasta 7 días después (F4, I1) |
| El lanzamiento dependía de mover el dominio | El dominio se mueve con la página "Próximamente" (F); el lanzamiento es solo un redespliegue (H3) |

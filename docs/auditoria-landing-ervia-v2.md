# Auditoría de la landing de ERVIA + plan de modificaciones (v2)

**URL auditada:** https://www.ervia.tech/ (repo `ervia-landing-v2`)
**Fecha:** 28 de septiembre de 2026
**Objetivo:** que un dueño de pyme mexicana piense en los primeros 5 segundos: *"Esta gente entiende exactamente el problema que tengo hoy en mi negocio"*, confíe en ERVIA y escriba por WhatsApp o deje sus datos.

### Cambios respecto a la v1
1. **Enfoque de resultado antes que de solución.** La sección "Lo que automatizamos" pasa a ser **"Lo que ganas cuando automatizas"**. Toda la narrativa se reordena: primero el resultado, después el método y al final la tecnología (nueva sección 3.1).
2. **Diferenciación.** Se añade la prueba del logo tapado y se construye el **Método ERVIA (Detectar · Automatizar · Escalar)** como mecanismo único y eje de toda la página: hero, proceso, precios y CTA final (secciones 3.2 y 3.3).
3. **Visual del hero.** Se evalúan las opciones A (mockup de WhatsApp), B (mini dashboard) y C (video) y se recomienda una combinación (sección 3.4).
4. El plan para Claude Code pasa de 7 a 8 fases: el Método ERVIA tiene fase propia y el video se integra en la fase de prueba social.

**Qué se revisó:** contenido completo, FAQ expandido, jerarquía de títulos, tamaños de texto, CTAs y destinos, formulario, metadatos, datos estructurados, scripts de medición, escritorio (1917 px) y móvil (390 px).
**Qué NO se revisó:** envío real del formulario (no se envió para no crear un lead falso), `robots.txt` / `sitemap.xml` y Lighthouse formal. Los tres quedan en la Fase 8.

---

## 1. Resumen ejecutivo

La base es buena: el titular ataca un dolor real, la oferta de entrada (diagnóstico de 15 min) es de baja fricción y la paleta de marca está bien aplicada. Pero la página tiene **tres problemas de estrategia** y **cinco de ejecución**.

**Estrategia:**
1. **Vende la solución, no el resultado.** Las secciones se titulan por lo que ERVIA hace ("Lo que automatizamos", "Automatización de procesos", "Consultoría de IA"), no por lo que el dueño gana. El visitante tiene que traducir la tecnología a beneficio, y la mayoría no lo hace.
2. **No se diferencia.** Si se tapan el logo y el nombre, la página podría ser de cualquier agencia de IA, de automatización o consultora digital. No hay nada que solo ERVIA pueda decir.
3. **No muestra el producto.** Es 100 % texto: el visitante nunca ve un agente trabajando.

**Ejecución:**
1. **Casos de éxito marcados públicamente como ficticios** ("Cifras de ejemplo, pendientes de sustituir…"), mientras el FAQ promete "no cifras inventadas".
2. **Parece una agencia española:** euros, "coste", "no sale a cuenta", "72 %".
3. **No hay WhatsApp en ninguna parte:** solo un formulario que pide "correo de empresa".
4. **El móvil se rompe:** la página mide 501 px de ancho en un celular de 390 px y ocupa unas 14 pantallas de alto.
5. **No se mide nada:** sin analítica de conversiones.

**Recomendación central:** reconstruir la página sobre un solo hilo conductor, el **Método ERVIA**, contado siempre en este orden:

> **Resultado** (lo que ganas) → **Espejo** (tu problema de hoy) → **Método** (cómo llegamos, en 3 pasos) → **Prueba** (un negocio real en Mérida funcionando) → **Oferta** (empieza por el paso 1, gratis).

### Calificación por área

| Área | Nota | Comentario corto |
|---|---|---|
| Propuesta de valor / hero | 5/10 | Dolor correcto, pero genérico, con anglicismo ("leads") y sin visual |
| Enfoque comercial (resultado vs. solución) | 4/10 | Vende servicios, no ganancias |
| Diferenciación | 2/10 | Falla la prueba del logo tapado |
| Copywriting general | 5/10 | Claro y breve, pero abstracto y con vocabulario de España |
| Prueba social / confianza | 2/10 | Casos ficticios, sin rostro, sin testimonios |
| Precios | 3/10 | Euros, "de ejemplo" y contradichos por el FAQ |
| CTAs y conversión | 5/10 | Buena oferta de entrada; falta WhatsApp; CTAs con promesas rotas |
| Diseño visual | 5/10 | Paleta coherente; ningún visual, ícono ni captura |
| Móvil | 3/10 | Desbordamiento horizontal, sin menú hamburguesa, página larguísima |
| SEO / GEO técnico | 3/10 | SPA sin prerender, sin Open Graph, sin JSON-LD, sin canonical |
| Medición | 1/10 | Sin analítica de conversiones |

---

## 2. Hallazgos críticos de ejecución

### C1. Casos de éxito marcados públicamente como ficticios
- **Evidencia:** en `#casos` se lee "Cifras de ejemplo, pendientes de sustituir por datos reales de cliente antes de publicar." El FAQ "¿Qué resultados puedo esperar?" cierra con "no cifras inventadas".
- **Solución:** eliminar los tres casos y sustituirlos por el **caso real de Full Motor**, contado con hechos y sin cifras hasta tener datos medidos (sección 4.7). **Regla general para toda la página: ninguna cifra que no sea real o que no esté etiquetada como ejemplo.** Esta regla condiciona también el visual del hero (sección 3.4).

### C2. Precios en euros, "de ejemplo" y contradichos por el FAQ
- **Evidencia:** "490 €/mes, desde", "4.900 € desde", "Precios orientativos de ejemplo". El FAQ "¿Cuánto cuesta?" dice "Depende…".
- **Solución:** precios en MXN, mapeados a los pasos del Método ERVIA (sección 4.9), y un FAQ coherente con ellos.

### C3. Móvil roto
- **Evidencia a 390 px:** `scrollWidth` = 501 px. `div.nav-links` muestra 6 enlaces y un botón en línea, sin hamburguesa. `#contacto` llega a 410 px.
- **Solución:** menú hamburguesa por debajo de 768 px, corrección del grid de `#contacto` y `overflow-x: clip` solo como red de seguridad.

### C4. Sin canal de WhatsApp
- **Evidencia:** 0 enlaces `wa.me`, 0 `tel:` y 0 enlaces de agenda. El formulario exige "Correo de empresa".
- **Solución:** botón de WhatsApp en el hero, en el nav, flotante en móvil y en el CTA final, con mensaje precargado. Idealmente atendido por el agente de ERVIA, para que el visitante lo pruebe en vivo.

### C5. Formulario sin garantías de funcionamiento
- **Evidencia:** los campos no están dentro de un `<form>`, no tienen `name` ni `required` y no hay validación visible.
- **Solución:** `<form>` real, validación accesible, estados de envío y éxito/error, y prueba end-to-end en `test.ervia.tech`.

### C6. CTAs que prometen una calculadora que no existe
- **Evidencia:** "Calcular cuánto me cuesta →" y "Calcular mi ahorro →" llevan a `#contacto`.
- **Solución:** cambiar el texto ahora y construir una calculadora real en una iteración posterior (D5).

### C7. Sin medición de conversiones
- **Evidencia:** solo `static.cloudflareinsights.com`.
- **Solución:** analítica con los eventos `click_whatsapp`, `click_cta_diagnostico`, `form_submit_success`, `form_submit_error`, `scroll_75` y `hero_visual_view` (D6).

---

## 3. Estrategia de mensaje

### 3.1 Del "qué hacemos" al "qué ganas"

**Diagnóstico.** Hoy la página está escrita desde dentro de ERVIA hacia fuera:

| Lo que dice hoy (solución) | Lo que el dueño de pyme necesita oír (resultado) |
|---|---|
| "Lo que automatizamos" | "Lo que ganas cuando automatizas" |
| "Automatización de procesos" | "Recuperas las horas que hoy se van en tareas repetidas" |
| "Atención al cliente automatizada" | "Ningún cliente se queda sin respuesta, ni a las 10 de la noche" |
| "Asistente de IA entrenado con tu información" | "Contesta como tú contestarías, con tus precios reales" |
| "Integración con CRM, ERP, email" | "Funciona con tu WhatsApp, tu agenda y tu Excel de siempre" |
| "Consultoría de IA" | "Sabes exactamente qué te conviene automatizar primero" |

**Regla de escritura para toda la página:** cada bloque se abre con la **ganancia** (título grande), sigue con el **antes → después** (una línea) y termina con el **cómo** (texto pequeño, al final). La tecnología (IA, n8n, agentes, integraciones) solo aparece en ese tercer nivel. Si un titular no pasa la prueba de *"¿y eso qué me da a mí?"*, se reescribe.

**Arco narrativo de la página (nuevo orden):**
1. **Hero:** el resultado final ("tu negocio atiende solo").
2. **Espejo:** "¿Te suena alguno de estos días?" (el problema de hoy, en sus palabras).
3. **Ganancias:** "Lo que ganas cuando automatizas".
4. **Método ERVIA:** cómo se llega ahí, en 3 pasos memorables.
5. **Prueba:** un negocio real de Mérida funcionando.
6. **Oferta:** los precios siguen los pasos del método y la entrada es el paso 1, gratis.
7. **Objeciones y CTA final.**

### 3.2 Diferenciación: la prueba del logo tapado

**Prueba:** se tapan logo y nombre y se pregunta de quién podría ser la página. Hoy la respuesta es "de cualquiera". Todas las afirmaciones actuales ("respuestas en 2 minutos", "a medida, sin plantillas", "soporte continuo", "diagnóstico gratis") las puede copiar cualquier agencia mañana.

**Qué tiene ERVIA que otros no pueden copiar fácilmente.** Son hechos reales de tu forma de trabajar y hay que convertirlos en mensajes:

| Diferenciador real | Mensaje para la landing | Por qué importa al dueño de pyme |
|---|---|---|
| **Método ERVIA** (propio, con nombre) | "Detectar · Automatizar · Escalar" | Da estructura y recordación; convierte un servicio en un sistema |
| **Un servidor dedicado por cliente** (tu modelo operativo) | "Tu negocio tiene su propio servidor. Tu información no se mezcla con la de nadie." | Confianza y privacidad, cumplimiento LFPDPPP; casi ninguna agencia pequeña lo ofrece |
| **Conservas tu número de WhatsApp** (coexistencia con YCloud) | "Sigues usando tu mismo número y tu celular. El agente trabaja a tu lado." | Derriba la objeción número uno: "no quiero perder mi número" |
| **Panel de control incluido** (como el de Full Motor) | "Ves tus citas, clientes y ventas en un solo lugar." | Pasa de "un bot" a "un sistema para tu negocio" |
| **Todo incluido en una mensualidad** (la infraestructura va en el fee) | "Una mensualidad, todo incluido: servidor, mantenimiento y ajustes." | Elimina el miedo a costos ocultos |
| **Hecho en Mérida, trato directo con el fundador** | "No eres un ticket. Hablas directo con quien construye tu sistema." | En la pyme mexicana se compra a personas |
| **20 años implementando tecnología en hoteles** | "Aprendimos en hoteles, donde el cliente no espera y el servicio no cierra." | Credibilidad y un paralelo perfecto con el 24/7 |

**Criterio de aceptación:** tras los cambios, la página debe contener **al menos 4 de estos 7 diferenciadores** visibles sin hacer clic, y el Método ERVIA debe aparecer en al menos 4 lugares (sección 3.3).

### 3.3 El Método ERVIA

**Validación de tu propuesta.** "Detectar · Automatizar · Escalar" funciona por cuatro razones: son tres verbos de acción, siguen un orden lógico que cualquiera entiende, el tercero ("sin contratar más personal") ataca directamente el dolor económico y tres pasos es el número que mejor se recuerda.

**Qué le añado para que sea un mecanismo real y no solo un eslogan.** Un método solo diferencia si cada paso tiene un **entregable con nombre propio**, un **tiempo** y un **precio**. Si no, es otro "cómo trabajamos" con otro título.

| | **1 · DETECTAR** | **2 · AUTOMATIZAR** | **3 · ESCALAR** |
|---|---|---|---|
| **Promesa** | Dónde pierdes tiempo y clientes | Lo repetitivo, para que deje de depender de ti | Sin contratar más personal |
| **Qué hacemos** | Llamada de 15 min y revisión de cómo atiendes hoy: WhatsApp, agenda, cotizaciones | Construimos e instalamos tu agente y tus automatizaciones en tu propio servidor; tu equipo aprende a usarlo | Medimos, ajustamos y sumamos la siguiente automatización cuando tenga sentido |
| **Te llevas** | **Mapa de Fugas**: lista priorizada de lo que te cuesta tiempo y ventas | **Tu agente funcionando** + panel de control + capacitación | **Reporte mensual**: mensajes atendidos, citas agendadas y horas recuperadas |
| **Tiempo** | 1 semana | 2–4 semanas | Cada mes |
| **Precio** | Gratis | Implementación desde $[X] MXN | Mensualidad desde $[Y] MXN, todo incluido |

> **Nombre de los entregables (D11):** "Mapa de Fugas" y "Reporte de Horas Recuperadas" son propuestas. Lo importante es que tengan nombre propio y que existan de verdad: el Mapa de Fugas debe ser un PDF de 1–2 páginas que entregues tras el diagnóstico. Eso convierte una llamada gratis en algo tangible que el prospecto recibe y comparte con su socio.

**Nombre del método.** Recomiendo **"Método ERVIA"**, con el subtítulo "Detectar · Automatizar · Escalar". Descarto una sigla ("Método DAE"), porque no se recuerda ni se pronuncia bien. El nombre de la marca en el método refuerza la recordación.

**Visual del método.** Tres nodos conectados por una línea, en la paleta de la marca. Tu isotipo ya es una "E" hecha de nodos conectados, así que el diagrama del método puede derivar directamente del logo. Esto une marca y método en la memoria del visitante.

**Dónde aparece (hilo conductor):**
1. **Hero:** en el subtítulo o la franja de confianza ("Con el Método ERVIA: detectamos, automatizamos y escalamos").
2. **Sección propia**, que sustituye "Cómo trabajamos".
3. **Precios:** los 3 planes son los 3 pasos del método.
4. **CTA final:** "Empieza por el paso 1: Detectar. Es gratis."
5. **FAQ:** "¿Por dónde empiezo?" → "Por Detectar".
6. **Fuera de la web:** saludo del agente de WhatsApp de ERVIA, guion de la llamada de diagnóstico, portada del Mapa de Fugas, publicaciones en redes y tu presentación en eventos. Un método solo genera recordación si se repite en todas partes.

**Cuidado con el tono de "Escalar sin contratar más personal":** que no suene a "despide gente". El enfoque correcto es "crece sin que la nómina crezca al mismo ritmo" y "tu equipo deja lo repetitivo y se dedica a atender mejor".

### 3.4 Visual del hero: evaluación de las opciones A, B y C

| Criterio | A · Mockup de WhatsApp | B · Mini dashboard | C · Video corto |
|---|---|---|---|
| Comprensión en 5 s | Alta: se ve al agente contestando | Media: muestra resultados, pero no cómo | Muy alta: se ve la automatización real |
| Identificación ("me pasa a mí") | Muy alta si la conversación es de su giro | Baja: son números abstractos | Alta si es un caso real |
| Credibilidad | Alta | **Riesgo:** "134 leads atendidos" es una cifra inventada si no viene de un cliente real (mismo problema que C1) | Muy alta si es una grabación real |
| Esfuerzo | Bajo (HTML/CSS) | Bajo | Medio-alto: grabar, editar y optimizar |
| Rendimiento / carga en móvil | Excelente (0 KB de imagen) | Excelente | Riesgo: peso del video y LCP con datos móviles |
| Riesgo de parecer genérico | Medio si la conversación es genérica | Alto (todas las agencias muestran dashboards) | Bajo si es real |

**Recomendación: A + resultado de B, sin cifras inventadas, ahora; C después, en la sección de caso real.**

**1. Hero = mockup de WhatsApp (A) con un "cierre de resultado" (lo mejor de B).** La conversación termina y aparecen, uno a uno, chips de resultado:
> ✅ Cita agendada · ✅ Cliente registrado · ✅ 0 mensajes pendientes

Así se muestra la transformación (el espíritu del dashboard) sin inventar números. "0 mensajes pendientes" es cierto por definición en la demo y es el resultado que el dueño quiere.

**2. Conversación concreta, no genérica.** "¿Tienen disponibilidad?" / "Sí, ¿para qué fecha?" es correcta, pero cualquier chatbot la dice. Lo que hace pensar "entienden mi negocio" es el detalle: la hora (fuera de horario), un producto o servicio real, un precio y una cita cerrada. Propongo **3 conversaciones que rotan**, con una pestaña que indica el giro:

**Taller** (hora: 22:47)
> Cliente: "Buenas noches, ¿cuánto cuesta una afinación para un Versa 2021?"
> Agente: "¡Hola! La afinación empieza en $[PRECIO]. ¿Te agendo? Tengo lugar mañana a las 9:00 o a las 11:00."
> Cliente: "Mañana a las 9 👍"
> Agente: "Listo, te espero mañana a las 9:00 ✅"

**Consultorio** (hora: domingo, 20:15), a partir de tu ejemplo:
> Paciente: "Hola, ¿tienen disponibilidad esta semana para limpieza dental?"
> Agente: "¡Claro! Tengo martes a las 10:00 o jueves a las 17:00. ¿Cuál te queda mejor?"
> Paciente: "El jueves"
> Agente: "Agendado el jueves a las 17:00. Te mando un recordatorio un día antes ✅"

**Restaurante** (hora: viernes, 13:40, en plena hora pico)
> Cliente: "¿Tienen mesa para 6 hoy a las 9 de la noche?"
> Agente: "¡Sí! Te aparto una mesa para 6 a las 21:00. ¿A nombre de quién?"
> Cliente: "Ana Martínez"
> Agente: "Listo, Ana. Mesa para 6 a las 21:00 ✅"

Solo se incluyen los giros donde tengas demo o caso (D3). Si solo tienes el taller, arranca con esa conversación.

**3. Video (C): sí, pero en la sección de caso real, y después.** Un video de 10–15 s muestra algo que ni A ni B pueden: **el mensaje de WhatsApp entra y la cita aparece sola en el panel de Full Motor.** Es la prueba más potente de la página, pero:
- Tiene que ser una grabación real (con datos de prueba), no una animación.
- En el hero competiría con el titular y penalizaría la carga en móvil (LCP).
- Especificación: 12 s, sin sonido, `autoplay muted loop playsinline`, WebM + MP4 (H.264), máximo 1,5 MB, imagen `poster`, carga solo cuando entra en pantalla, y con `prefers-reduced-motion` solo se muestra el poster.

**4. B con cifras reales, más adelante.** Tras 4–6 semanas de Full Motor en producción, se puede añadir un contador real bajo el caso: "Esta semana en [taller]: X mensajes atendidos, Y fuera de horario, Z citas agendadas", con fuente y fecha. Nunca antes.

**5. Prueba A/B posterior:** hero con mockup (A) contra hero con video (C), cuando haya tráfico suficiente (≈ 1.000 visitas por variante).

---

## 4. Copy sección por sección (enfoque de resultado)

### Vocabulario a localizar (España → México)

| Actual | Propuesta |
|---|---|
| coste | costo |
| no sale a cuenta | no te conviene |
| leads | clientes / clientes potenciales (como máximo una mención) |
| 72 % | 72% |
| 4.900 € | $X,XXX MXN |
| Hoy si quieres | Hoy mismo, si quieres |
| Correo de empresa | Correo o WhatsApp |
| Tus datos no salen de tu entorno | Tu negocio tiene su propio servidor; tu información no se mezcla con la de nadie |

### 4.1 Hero

**Titular: resultado primero (elegir uno):**
- **A (recomendado):** "Tu WhatsApp atiende, cotiza y agenda citas solo. Tú te dedicas a tu negocio."
- **B (emocional):** "Ningún cliente sin respuesta. Aunque sean las 10 de la noche."
- **C (doble ganancia):** "Recupera tus horas y tus clientes. Tu WhatsApp trabaja las 24 horas."

**Subtítulo:** "Con el Método ERVIA detectamos dónde pierdes tiempo y clientes, automatizamos lo repetitivo y te ayudamos a crecer sin contratar más personal. Listo en menos de 4 semanas y con tu mismo número de WhatsApp."

**Eyebrow:** "Automatización con IA para pymes · Hecho en Mérida"

**CTAs:**
- Primario (verde): **"Pruébalo en WhatsApp ahora"** → `wa.me` con texto precargado.
- Secundario (outline): **"Detecta tus fugas gratis (15 min)"** → `#contacto`. Este texto conecta con el paso 1 del método.
- Microcopy: "Sin compromiso · Te respondemos el mismo día · Atendemos todo México".

**Visual (columna derecha):** mockup de WhatsApp con 3 conversaciones rotativas y chips de resultado (sección 3.4). En móvil va debajo de los CTAs, en versión compacta, sin empujar el CTA primario fuera de la primera pantalla.

### 4.2 Franja de confianza (bajo el hero)
4 ítems con ícono: **"Tu mismo número de WhatsApp"** · **"Tu propio servidor"** · **"Listo en menos de 4 semanas"** · **"Hecho en Mérida"**.

### 4.3 Espejo del problema
**H2:** "¿Te suena alguno de estos días?"

4 tarjetas en 2×2 con ícono:
- "Contestas 30 veces al día '¿cuánto cuesta?' y '¿a qué hora abren?'."
- "Un cliente escribe el domingo a las 8 de la noche. Le contestas el lunes… y ya se fue con otro."
- "Te pasas la mañana confirmando, moviendo y persiguiendo citas."
- "Contratar a alguien solo para contestar mensajes no te sale, pero tampoco puedes dejar de contestar."

**Remate:** "Cada mensaje sin respuesta es una venta que se va con la competencia."
**Puente a la siguiente sección:** "Ahora imagina lo contrario ↓"

### 4.4 Lo que ganas cuando automatizas (sustituye "Lo que automatizamos")
**H2:** "Lo que ganas cuando automatizas"
**Subtítulo:** "No vendemos tecnología. Vendemos horas libres, clientes atendidos y un negocio que funciona aunque no estés."

4 tarjetas de ganancia. Cada una sigue el patrón **ganancia → antes/después → cómo**:

**1. Ningún cliente se queda sin respuesta** *(tarjeta destacada)*
- Antes: el cliente pregunta de noche y le contestas al día siguiente. Después: recibe respuesta en segundos, a cualquier hora, con tus precios reales.
- *Cómo lo logramos: un agente de IA atiende tu WhatsApp con tu información y te pasa la conversación cuando hace falta una persona.*

**2. Tu agenda se llena sola, sin empalmes**
- Antes: llamadas y mensajes para cuadrar horarios. Después: el cliente elige, el sistema confirma y tú solo ves la cita en tu panel.
- *Cómo lo logramos: agenda conectada a tu horario real, con confirmaciones y recordatorios automáticos.*

**3. Recuperas horas cada semana**
- Ejemplo: si contestas 40 mensajes al día y tardas 2 minutos en cada uno, son más de 6 horas a la semana. Esas horas vuelven a tu negocio.
- *Cómo lo logramos: automatizamos lo repetitivo (respuestas frecuentes, captura de datos, reportes y documentos).*

**4. Sabes qué pasa en tu negocio aunque no estés**
- Antes: la información vive en tu cabeza, en libretas y en el Excel. Después: citas, clientes y ventas en un solo panel y un resumen mensual en tu correo.
- *Cómo lo logramos: panel de control propio y reportes automáticos.*

**CTA de sección:** "Quiero ver qué ganaría mi negocio →" (a `#contacto`).

> El cálculo de la tarjeta 3 es un ejemplo aritmético explícito, no un resultado prometido. Es la forma honesta de usar números antes de tener datos de clientes.

### 4.5 Método ERVIA (sustituye "Cómo trabajamos")
**H2:** "El Método ERVIA: de tu problema de hoy a un negocio que funciona solo"
**Subtítulo:** "Tres pasos. Sin tecnicismos. Sabes en todo momento qué estamos haciendo y qué te llevas."

Tres columnas con el diagrama de nodos conectados, con el contenido de la tabla de la sección 3.3: **promesa · qué hacemos · te llevas · tiempo**.

Bajo los pasos: "Lo que necesitamos de ti: unas 2 horas en total para contarnos cómo trabajas. El resto lo hacemos nosotros."
**CTA:** "Empieza por el paso 1: Detectar. Es gratis →"

### 4.6 Para quién es
Chips o tarjetas pequeñas por giro, con la ganancia en una línea. Solo los giros confirmados en D3:
- **Talleres y refaccionarias:** "cotizas y agendas sin soltar la herramienta".
- **Consultorios y clínicas:** "citas confirmadas y recordatorios sin llamar a nadie".
- **Restaurantes:** "reservas por WhatsApp aunque estés en plena hora pico".
- **Negocios de servicios:** "cada consulta atendida en minutos, no en horas".

### 4.7 Prueba: caso real Full Motor
**H2:** "Así funciona en un negocio real de Mérida"
- **Quién:** [nombre del taller] · taller mecánico y refaccionaria · Ciudad Caucel, Mérida.
- **Detectar:** "[frase del dueño sobre su problema antes]".
- **Automatizar:** agente de WhatsApp que cotiza con el catálogo real del taller, agenda que respeta horario y capacidad, y panel de citas, clientes y ventas donde la venta se registra sola al terminar el servicio.
- **Escalar:** "En producción desde octubre de 2026". Las métricas se añaden a las 4–6 semanas.
- **Video (C):** 12 s: el mensaje entra por WhatsApp y la cita aparece en el panel.
- **Testimonio:** frase + nombre + foto o logo, con permiso por escrito.
- **Sin cifras** hasta tenerlas medidas.

El caso se cuenta con los 3 pasos del método: así el método deja de ser teoría y se convierte en un hecho comprobable.

### 4.8 Quién está detrás
Foto + texto: "Soy Elias Ruiz, fundador de ERVIA. Pasé más de 20 años implementando tecnología en hoteles de México y el Caribe, donde el cliente no espera y el servicio nunca cierra. Hoy llevo esa misma forma de trabajar a negocios de Mérida. Conmigo no eres un ticket: hablas directo con quien construye tu sistema."

### 4.9 Precios: los 3 pasos del método
**H2:** "Empieza gratis. Paga solo cuando veas por dónde vas a ganar."

| Plan | Paso del método | Contenido | Precio |
|---|---|---|---|
| **Detectar** | 1 | Llamada de 15 min + Mapa de Fugas | Gratis |
| **Automatizar** *(recomendado)* | 2 | Tu agente de WhatsApp + agenda + panel + capacitación | Implementación desde $[X] MXN |
| **Escalar** | 3 | Servidor propio, mantenimiento, ajustes, reporte mensual y nuevas automatizaciones | Desde $[Y] MXN/mes, todo incluido |

CTAs por plan: "Detecta tus fugas gratis" · "Quiero mi agente de WhatsApp" · "Quiero crecer sin contratar".
Nota bajo los precios: "Precios más IVA [si aplica]. Sin plazos forzosos [confirmar]."
Se eliminan la línea "Precios orientativos de ejemplo" y los euros.

### 4.10 FAQ (objeciones reales de la pyme mexicana, 8 como máximo)
1. **¿Por dónde empiezo?** → "Por Detectar: una llamada de 15 minutos y te entregamos tu Mapa de Fugas. Es gratis y sin compromiso."
2. **¿Cuánto cuesta?** → coherente con la tabla de precios.
3. **¿Tengo que cambiar mi número de WhatsApp?** → "No. Conservas tu número y puedes seguir contestando desde tu celular cuando quieras."
4. **¿Y si el agente contesta algo mal?** → "Solo responde con la información que tú apruebas. Lo que no sabe te lo pasa a ti."
5. **¿Necesito saber de tecnología?** → "No. Te entregamos todo funcionando y te enseñamos a usar tu panel."
6. **¿Dónde quedan mis datos y los de mis clientes?** → "En un servidor dedicado solo para tu negocio. Cumplimos la Ley Federal de Protección de Datos Personales (LFPDPPP)."
7. **¿Cuánto tarda?** → "Detectar: 1 semana. Automatizar: de 2 a 4 semanas."
8. **¿Hay plazo forzoso? ¿Me dan factura?** → según tu política real (D12).

### 4.11 CTA final
**H2:** "Empieza por el paso 1: descubre dónde estás perdiendo tiempo y clientes."
**Subtítulo:** "15 minutos. Gratis. Te llevas tu Mapa de Fugas aunque no trabajes con nosotros."

Dos columnas:
- **WhatsApp** (botón grande): "Respuesta inmediata, incluso fuera de horario".
- **Formulario:** Nombre · Correo o WhatsApp · Giro del negocio (select) · "¿Qué te quita más tiempo hoy?".
- [Si D8 = sí] tercer enlace: "Prefiero agendar yo mismo" → agenda.

Mensaje de éxito: "Listo, {nombre}. Te escribimos hoy mismo para agendar tu diagnóstico."

> "Te llevas tu Mapa de Fugas aunque no trabajes con nosotros" es una reducción de riesgo muy fuerte, pero solo se publica si realmente vas a entregar el mapa a todos los que hagan la llamada (D11).

### 4.12 Meta y previsualización
- `<title>`: "Automatiza tu WhatsApp y tu agenda con IA | Método ERVIA · Mérida"
- `meta description`: "Tu WhatsApp atiende, cotiza y agenda citas solo, las 24 horas. Con el Método ERVIA detectamos, automatizamos y escalamos tu negocio en menos de 4 semanas. Diagnóstico gratis."
- Open Graph / Twitter con imagen de 1200×630: titular + diagrama del método + logo. Es crítico porque la landing se comparte sobre todo por WhatsApp.

---

## 5. Diseño visual, tamaños y longitud

### 5.1 Tamaños de texto medidos (escritorio)

| Tamaño | Nº de elementos | Uso actual | Recomendación |
|---|---|---|---|
| 86 px | 1 | H1 | 60–68 px: el titular nuevo es más largo y comparte fila con el mockup |
| 48 px | H2 | Títulos de sección | OK (40–48 px) |
| 26–34 px | H3 | Tarjetas | OK; en "Lo que ganas" la ganancia va en H3 a 28–32 px |
| 17–19 px | ~20 | Párrafos principales | OK, base 18 px |
| **15 px** | **34** | Texto de tarjetas y listas | **16–17 px** |
| **13–14 px** | **32** | Viñetas, etiquetas y microcopy | **16 px en viñetas**; 13 px solo en eyebrows; la línea "Cómo lo logramos" a 15 px en cursiva |
| 12 px | 1 | Microcopy | Mínimo 13 px |

En móvil hay 19 elementos de texto por debajo de 14 px. El gris secundario (#8294AC sobre #0F172A, contraste ≈ 5,6:1) cumple, pero solo debe usarse en texto de apoyo a 15 px o más.

### 5.2 Longitud

| Sección | Escritorio | Móvil |
|---|---|---|
| Hero | 1.068 px | 783 px |
| Problema | 831 px | 772 px |
| Servicios | 894 px | 1.787 px |
| Casos | **1.569 px** | **2.380 px** |
| Proceso | 771 px | 1.339 px |
| Precios | 984 px | 1.877 px |
| FAQ | 872 px | 905 px |
| Contacto | 808 px | 1.033 px |
| **Total** | **8.238 px** | **11.662 px** |

**Objetivo en móvil:** 9.000–9.500 px como máximo con la nueva estructura. Palancas: un caso en lugar de tres; el método en pasos verticales compactos; precios en carrusel horizontal con indicador; problema en tarjetas cortas; FAQ de 8 preguntas.

### 5.3 Elementos visuales
- Hoy: 100 % texto (solo el logo, dos veces).
- Añadir: mockup de WhatsApp en el hero, diagrama del Método ERVIA derivado del isotipo, íconos SVG en problema, ganancias y "para quién", video y capturas en el caso real, y foto del fundador.
- Paleta: navy #0F172A de fondo, verde #07F992 **solo para acciones** (CTAs y chips de resultado ✅) y azul #3165F4 para enlaces, nodos del método y elementos secundarios.

### 5.4 Móvil
- Menú hamburguesa, sin desbordamiento.
- Botón flotante de WhatsApp de 56×56 px, oculto mientras `#contacto` está en pantalla.
- Objetivos táctiles de 44×44 px como mínimo.
- El mockup del hero en versión compacta (una conversación de 3 mensajes y los chips).

### 5.5 Rendimiento (a verificar)
Durante la auditoría la pestaña se congeló varias veces. Puede deberse a la herramienta de automatización, pero la página tiene un `<canvas>` animado. Verificar con Lighthouse en móvil (Performance ≥ 90, LCP < 2,5 s, CLS < 0,1). Pausar la animación fuera del viewport y con `prefers-reduced-motion`. El mockup animado del hero debe usar solo `transform` y `opacity`.

---

## 6. SEO y GEO técnico

| Punto | Estado | Acción |
|---|---|---|
| Renderizado | SPA: el HTML inicial no contiene el texto | Prerender estático en build |
| `<title>` / description | Genéricos | Ver 4.12 |
| Canonical | No existe | `https://www.ervia.tech/` |
| Open Graph / Twitter | No existen | Añadir, con imagen de 1200×630 |
| JSON-LD | No existe | `ProfessionalService` (Mérida, `areaServed: MX`) + `FAQPage` + `HowTo` para el Método ERVIA (3 pasos) |
| `lang` | `es` | `es-MX` |
| Jerarquía de títulos | Correcta | Mantener: 1 H1 y un H2 por sección |
| robots.txt / sitemap.xml | No verificado | Verificar y permitir GPTBot, ClaudeBot, PerplexityBot y Google-Extended |

**GEO:** que el método tenga nombre propio también ayuda a que los buscadores de IA citen a ERVIA ("¿Qué es el Método ERVIA?"). Conviene una frase que lo defina de forma autocontenida, por ejemplo: "El Método ERVIA es un proceso de tres pasos (Detectar, Automatizar y Escalar) para que las pymes automaticen su atención por WhatsApp y su agenda en menos de 4 semanas."

---

## 7. Estructura final de la página

1. **Nav:** logo · Lo que ganas · Método · Caso real · Precios · FAQ · [WhatsApp] [Diagnóstico gratis] (hamburguesa en móvil)
2. **Hero:** titular de resultado + subtítulo con el método + 2 CTAs | mockup de WhatsApp con chips de resultado
3. **Franja de confianza:** mismo número · servidor propio · menos de 4 semanas · hecho en Mérida
4. **Espejo:** "¿Te suena alguno de estos días?"
5. **Lo que ganas cuando automatizas:** 4 ganancias (ganancia → antes/después → cómo)
6. **Método ERVIA:** Detectar · Automatizar · Escalar
7. **Para quién es:** giros
8. **Caso real Full Motor:** contado con los 3 pasos + video
9. **Quién está detrás**
10. **Precios:** Detectar / Automatizar / Escalar
11. **FAQ:** 8 preguntas
12. **CTA final:** "Empieza por el paso 1"
13. **Footer** + botón flotante de WhatsApp en móvil

---

## 8. Decisiones pendientes

| # | Decisión | Opciones | Recomendación |
|---|---|---|---|
| D1 | Público principal | (a) pymes de servicios de México con foco en Mérida · (b) LatAm en general · (c) empresas medianas | (a) |
| D2 | Precios | (a) "desde $X MXN" reales · (b) sin cifras | (a), mapeado a los 3 pasos. ¿Cifras de implementación y mensualidad? |
| D3 | Caso Full Motor y giros | ¿Autoriza nombre, capturas, video y frase? ¿Con el nombre nuevo del taller? ¿Qué giros tienen demo real (consultorio, restaurante)? | Pedir permiso por escrito en la reunión de salida a producción |
| D4 | Número de WhatsApp de la landing | ¿Cuál? ¿Con agente o lo contestas tú al principio? | Arrancar con `wa.me` aunque lo contestes tú; el 9992498890 es solo para demos de Full Motor |
| D5 | Calculadora | (a) cambiar textos · (b) construirla | (a) ahora, (b) en la siguiente iteración |
| D6 | Analítica | GA4 + Pixel · Umami en tu VPS · solo Cloudflare | GA4 si vas a pautar; Umami si no. GA4 y Pixel obligan a actualizar el banner y la Política de Cookies |
| D7 | Destino del formulario | ¿A dónde llega hoy? | Webhook de n8n → registro + aviso a tu WhatsApp o Telegram |
| D8 | Agenda directa | ¿Enlace a Cal.com o Google Calendar? | Sí, como tercera opción del CTA final |
| D9 | Stack de `ervia-landing-v2` | ¿Vite + React SPA? | Claude Code lo confirma en la Fase 0 |
| **D10** | **Visual del hero** | A · B · C · combinación | **A + chips de resultado ahora; C en el caso real cuando haya grabación; B con datos reales tras 4–6 semanas** |
| **D11** | **Método y entregables** | ¿"Método ERVIA" con "Detectar · Automatizar · Escalar"? ¿Nombres "Mapa de Fugas" y "Reporte de Horas Recuperadas"? ¿El Mapa de Fugas se entrega a todos los que hacen la llamada? | Sí a todo, **si puedes producir el Mapa de Fugas** (plantilla de 1–2 páginas). Si no, se quita la promesa del CTA final |
| **D12** | **Condiciones comerciales** | ¿Plazo forzoso? ¿Emites CFDI hoy? ¿Visitas en persona en Mérida? | Publicar solo lo que ya puedas cumplir |

---

## 9. Plan de modificaciones para Claude Code

Cada fase es un prompt independiente para Claude Code en Antigravity, con el repo `ervia-landing-v2` abierto. **Ejecútalas en orden y de una en una**, revisando en local antes de pasar a la siguiente. Rellena los `[placeholders]` con las decisiones de la sección 8 antes de pegar cada prompt.

**Reglas comunes (van dentro de cada prompt):** rama `feat/auditoria-landing-v2`, sin despliegue ni push a `main`, nada fuera de las instrucciones, y al terminar: archivos tocados, descripción en escritorio y en móvil (390 px) y build sin errores.

---

### Fase 0 (Claude Code) — Reconocimiento y respaldo

```
Trabaja en el repo de la landing de ERVIA (ervia-landing-v2).

REGLAS OBLIGATORIAS PARA ESTA Y TODAS LAS FASES SIGUIENTES:
- Crea la rama "feat/auditoria-landing-v2" desde main y trabaja solo en ella.
- No despliegues, no hagas push a main y no toques la configuración de Dokploy.
- No modifiques nada que no esté en las instrucciones.

TAREAS (solo lectura, no cambies nada todavía):
1. Dime el stack exacto: framework, versión, bundler, sistema de estilos, librerías de animación y cómo se sirven las páginas legales estáticas.
2. Lista los componentes de cada sección de la home (#inicio, problema, #servicios, #casos, #proceso, #precios, #faq, #contacto, footer) y en qué archivo está cada texto.
3. Explica cómo funciona hoy el formulario de #contacto: a dónde envía, con qué método y qué pasa en éxito o error.
4. Dime qué hace el <canvas> de la página y cómo se anima.
5. Dime si existen robots.txt, sitemap.xml y alguna analítica.
6. Dime dónde están el logo y el isotipo en formato vectorial (SVG), si existen: se usarán para el diagrama del método.
7. Arranca el proyecto en local y confirma que carga.

Entrégame el informe y espera mi visto bueno antes de la Fase 1.
```

### Fase 1 (Claude Code) — Correcciones técnicas: móvil, formulario, CTAs rotos

```
Trabaja en la rama "feat/auditoria-landing-v2" del repo ervia-landing-v2.
REGLAS: no despliegues, no toques main, no modifiques nada fuera de estas tareas.

1. MENÚ MÓVIL: por debajo de 768 px, el nav (div.nav-links) muestra 6 enlaces y un botón en línea y desborda (scrollWidth 501 px en un viewport de 390 px). Implementa un menú hamburguesa accesible (aria-label, aria-expanded, cierre al elegir un enlace o con Escape, foco gestionado). En la barra quedan visibles el logo, el botón hamburguesa y un botón compacto "Diagnóstico gratis".
2. DESBORDAMIENTO: corrige #contacto (llega a 410 px en 390 px). Añade overflow-x: clip en html/body solo como red de seguridad. Verifica a 360, 390 y 430 px que document.documentElement.scrollWidth === window.innerWidth.
3. FORMULARIO #contacto: <form> real con onSubmit; name, id, label asociada, autocomplete y required en Nombre y Contacto; errores junto al campo; estado "Enviando…" con el botón deshabilitado; mensajes de éxito y de error. Mantén el destino actual. No envíes datos de prueba a producción: simula la respuesta en local y dime cómo probar el destino real.
4. CTAs ENGAÑOSOS: "Calcular cuánto me cuesta →" → "Descubre cuánto te está costando →" y "Calcular mi ahorro →" → "Quiero ver mi caso →". Destino: #contacto.
5. FAQ: type="button" en los botones y aria-expanded / aria-controls correctos.
6. TAMAÑOS: párrafos y viñetas a 16 px como mínimo; eyebrows en mayúsculas a 13 px; nada por debajo de 13 px; objetivos táctiles de 44×44 px en móvil.
7. CANVAS: pausa la animación fuera del viewport (IntersectionObserver) y desactívala con prefers-reduced-motion.

Al terminar: archivos modificados, verificación de scrollWidth en los tres anchos y build sin errores.
```

### Fase 2 (Claude Code) — Localización a México

```
Trabaja en la rama "feat/auditoria-landing-v2" del repo ervia-landing-v2.
REGLAS: no despliegues, no toques main, no modifiques nada fuera de estas tareas.

1. Cambia <html lang="es"> por <html lang="es-MX">.
2. Antes de cambiar nada, muéstrame todas las coincidencias en la home (no en las páginas legales) de: "coste", "no sale a cuenta", "Hoy si quieres", "Correo de empresa", "leads", porcentajes con espacio ("72 %"), el símbolo "€" y cualquier otro término típico de España que detectes. Espera mi confirmación.
3. Tras mi confirmación aplica: coste → costo · no sale a cuenta → no te conviene · Hoy si quieres → Hoy mismo, si quieres · Correo de empresa → Correo o WhatsApp (el campo debe aceptar un correo válido o un número de 10 dígitos) · "72 %" → "72%".
   Las cifras en euros NO las cambies aquí: la sección de precios se rehace en la Fase 5.

Al terminar, muéstrame el diff de textos.
```

### Fase 3 (Claude Code) — Hero de resultado, mockup de WhatsApp y canal de WhatsApp

```
Trabaja en la rama "feat/auditoria-landing-v2" del repo ervia-landing-v2.
REGLAS: no despliegues, no toques main, no modifiques nada fuera de estas tareas.

1. TEXTOS DEL HERO (#inicio):
   - Eyebrow: "Automatización con IA para pymes · Hecho en Mérida"
   - H1: "[titular elegido de la sección 4.1: A, B o C]"
   - Subtítulo: "Con el Método ERVIA detectamos dónde pierdes tiempo y clientes, automatizamos lo repetitivo y te ayudamos a crecer sin contratar más personal. Listo en menos de 4 semanas y con tu mismo número de WhatsApp."
   - CTA primario (verde #07F992): "Pruébalo en WhatsApp ahora" → https://wa.me/52[NÚMERO_ERVIA]?text=[URL-encoded: "Hola, quiero ver cómo funciona el agente de WhatsApp"], target="_blank" rel="noopener".
   - CTA secundario (outline): "Detecta tus fugas gratis (15 min)" → #contacto
   - Microcopy: "Sin compromiso · Te respondemos el mismo día · Atendemos todo México"
   - H1 a 60–68 px en escritorio. Layout de dos columnas en escritorio: texto a la izquierda y mockup a la derecha.

2. MOCKUP DE WHATSAPP (columna derecha): componente HTML/CSS (no imagen) con forma de teléfono, estilo de chat de WhatsApp adaptado a la paleta de la marca, y:
   a) Pestañas de giro sobre el teléfono: [Taller] [Consultorio] [Restaurante] (solo los giros confirmados: [lista]).
   b) Cada conversación se reproduce mensaje a mensaje con indicador "escribiendo…" (~700 ms por mensaje) y la hora visible en cada burbuja:
      TALLER (22:47):
        Cliente: "Buenas noches, ¿cuánto cuesta una afinación para un Versa 2021?"
        Agente: "¡Hola! La afinación empieza en $[PRECIO]. ¿Te agendo? Tengo lugar mañana a las 9:00 o a las 11:00."
        Cliente: "Mañana a las 9 👍"
        Agente: "Listo, te espero mañana a las 9:00 ✅"
      CONSULTORIO (domingo 20:15):
        Paciente: "Hola, ¿tienen disponibilidad esta semana para limpieza dental?"
        Agente: "¡Claro! Tengo martes a las 10:00 o jueves a las 17:00. ¿Cuál te queda mejor?"
        Paciente: "El jueves"
        Agente: "Agendado el jueves a las 17:00. Te mando un recordatorio un día antes ✅"
      RESTAURANTE (viernes 13:40):
        Cliente: "¿Tienen mesa para 6 hoy a las 9 de la noche?"
        Agente: "¡Sí! Te aparto una mesa para 6 a las 21:00. ¿A nombre de quién?"
        Cliente: "Ana Martínez"
        Agente: "Listo, Ana. Mesa para 6 a las 21:00 ✅"
   c) Al terminar cada conversación, aparecen uno a uno bajo el teléfono 3 chips verdes: "✅ Cita agendada" · "✅ Cliente registrado" · "✅ 0 mensajes pendientes". Sin ninguna otra cifra.
   d) Tras ~3 s pasa automáticamente al siguiente giro; el usuario también puede elegir la pestaña. Pausa la rotación mientras el cursor está sobre el teléfono.
   e) Accesibilidad: role="img" con aria-label que resuma la conversación visible, o una región aria-live="off" con el texto completo; las pestañas son botones con aria-selected.
   f) Animación solo con transform/opacity. Con prefers-reduced-motion: sin animación, conversación del primer giro completa y chips visibles.
   g) Móvil (< 768 px): el mockup va debajo de los CTAs, compacto (máximo 420 px de alto), sin pestañas (solo rota). El CTA primario debe verse sin scroll en 390×844.
   h) Dispara el evento de analítica "hero_visual_view" cuando el mockup entra en pantalla (déjalo preparado para la Fase 7).

3. FRANJA DE CONFIANZA bajo el hero: 4 ítems con ícono SVG: "Tu mismo número de WhatsApp" · "Tu propio servidor" · "Listo en menos de 4 semanas" · "Hecho en Mérida".
4. BOTÓN FLOTANTE DE WHATSAPP en móvil: 56×56 px, esquina inferior derecha, mismo enlace que el CTA primario, aria-label "Escríbenos por WhatsApp", oculto mientras #contacto esté en pantalla.
5. Botón compacto de WhatsApp en el nav de escritorio, junto a "Diagnóstico gratis".

Al terminar, describe la primera pantalla en 1440 px y en 390×844 y confirma que el CTA primario es visible sin scroll en móvil.
```

### Fase 4 (Claude Code) — Espejo del problema, "Lo que ganas cuando automatizas" y "Para quién es"

```
Trabaja en la rama "feat/auditoria-landing-v2" del repo ervia-landing-v2.
REGLAS: no despliegues, no toques main, no modifiques nada fuera de estas tareas.

1. SECCIÓN PROBLEMA: H2 "¿Te suena alguno de estos días?". 4 tarjetas con ícono SVG (2×2 en escritorio, 1 columna compacta en móvil):
   - "Contestas 30 veces al día '¿cuánto cuesta?' y '¿a qué hora abren?'."
   - "Un cliente escribe el domingo a las 8 de la noche. Le contestas el lunes… y ya se fue con otro."
   - "Te pasas la mañana confirmando, moviendo y persiguiendo citas."
   - "Contratar a alguien solo para contestar mensajes no te sale, pero tampoco puedes dejar de contestar."
   Remate: "Cada mensaje sin respuesta es una venta que se va con la competencia." Enlace: "Ahora imagina lo contrario ↓" → #ganancias.

2. SECCIÓN #servicios → renómbrala a id="ganancias" (actualiza todos los enlaces internos y el nav: "Lo que ganas").
   H2: "Lo que ganas cuando automatizas"
   Subtítulo: "No vendemos tecnología. Vendemos horas libres, clientes atendidos y un negocio que funciona aunque no estés."
   4 tarjetas con este patrón visual: ícono → GANANCIA (H3, 28–32 px) → antes/después (16–17 px) → "Cómo lo logramos:" (15 px, cursiva, color secundario, separado por una línea fina). La tarjeta 1 va destacada (más ancha o con borde verde).
   [Pega aquí el texto exacto de las 4 tarjetas de la sección 4.4 del informe]
   CTA de sección: "Quiero ver qué ganaría mi negocio →" → #contacto.
   Elimina las tarjetas actuales (Automatización de procesos, Atención al cliente automatizada, Consultoría de IA) y cualquier mención a CRM/ERP en esta sección.

3. NUEVA SECCIÓN "Para quién es" (compacta, después del Método; si el Método aún no existe, déjala después de #ganancias y la moveremos en la Fase 5): chips o tarjetas pequeñas con los giros confirmados [lista] y su línea de la sección 4.6 del informe.

Muéstrame el diff de textos y el alto total de la home en 390 px.
```

### Fase 5 (Claude Code) — Método ERVIA y precios mapeados al método

```
Trabaja en la rama "feat/auditoria-landing-v2" del repo ervia-landing-v2.
REGLAS: no despliegues, no toques main, no modifiques nada fuera de estas tareas.

1. SECCIÓN #proceso → id="metodo" (actualiza el nav a "Método" y los enlaces internos).
   H2: "El Método ERVIA: de tu problema de hoy a un negocio que funciona solo"
   Subtítulo: "Tres pasos. Sin tecnicismos. Sabes en todo momento qué estamos haciendo y qué te llevas."
   DIAGRAMA: 3 nodos conectados por una línea, derivados del estilo del isotipo de ERVIA (usa el SVG encontrado en la Fase 0). Nodo 1 y 3 en azul #3165F4, nodo 2 en verde #07F992, o como mejor encaje con el logo; propónmelo antes de decidirlo. Horizontal en escritorio y vertical en móvil. La línea que conecta los nodos puede dibujarse al entrar en pantalla (stroke-dashoffset) y con prefers-reduced-motion se muestra estática.
   Bajo cada nodo:
     01 · DETECTAR — "Dónde pierdes tiempo y clientes."
        Qué hacemos: "Una llamada de 15 minutos y revisamos cómo atiendes hoy: WhatsApp, agenda y cotizaciones."
        Te llevas: "Tu Mapa de Fugas: lo que te cuesta tiempo y ventas, en orden de prioridad."
        Tiempo: "1 semana"
     02 · AUTOMATIZAR — "Lo repetitivo, para que deje de depender de ti."
        Qué hacemos: "Construimos e instalamos tu agente y tus automatizaciones en tu propio servidor. Tu equipo aprende a usarlo."
        Te llevas: "Tu agente funcionando, tu panel de control y la capacitación."
        Tiempo: "2 a 4 semanas"
     03 · ESCALAR — "Sin contratar más personal."
        Qué hacemos: "Medimos, ajustamos y sumamos la siguiente automatización cuando tenga sentido."
        Te llevas: "Tu reporte mensual: mensajes atendidos, citas agendadas y horas recuperadas."
        Tiempo: "Cada mes"
   Bajo los pasos: "Lo que necesitamos de ti: unas 2 horas en total para contarnos cómo trabajas. El resto lo hacemos nosotros."
   CTA: "Empieza por el paso 1: Detectar. Es gratis →" → #contacto
   [Si D11 cambia los nombres de los entregables, sustitúyelos aquí.]

2. Mueve la sección "Para quién es" justo después de #metodo.

3. SECCIÓN #precios:
   H2: "Empieza gratis. Paga solo cuando veas por dónde vas a ganar."
   3 planes que usan el mismo ícono de nodo que el método:
     DETECTAR (paso 1) — "Gratis" — Llamada de 15 min · Mapa de Fugas · Sin compromiso — CTA "Detecta tus fugas gratis" → #contacto
     AUTOMATIZAR (paso 2, badge "Recomendado") — "Implementación desde $[X] MXN" — Tu agente de WhatsApp · Agenda de citas · Panel de control · Capacitación — CTA "Quiero mi agente de WhatsApp" → wa.me con el texto "Hola, quiero información del plan Automatizar"
     ESCALAR (paso 3) — "Desde $[Y] MXN/mes, todo incluido" — Tu propio servidor · Mantenimiento y ajustes · Reporte mensual · Nuevas automatizaciones — CTA "Quiero crecer sin contratar" → wa.me con el texto "Hola, quiero información del plan Escalar"
   Nota: "Precios más IVA [si aplica]. [Sin plazos forzosos: solo si D12 lo confirma.]"
   Elimina "Precios orientativos de ejemplo", los euros y el texto "Tus datos no salen de tu entorno…".
   En móvil: carrusel horizontal con scroll-snap, indicador de posición y el plan "Automatizar" visible primero.

4. Añade al <head> un JSON-LD de tipo HowTo con name "Método ERVIA" y los 3 pasos (el texto debe coincidir con el visible).

Muéstrame cómo queda el método y los precios en 1440 px y en 390 px, y el alto total de la home en móvil.
```

### Fase 6 (Claude Code) — Prueba social real: caso Full Motor, video y fundador

⚠️ Requiere D3 (permiso de Full Motor) y los materiales: capturas anonimizadas, frase del dueño, logo o foto, video de 12 s y tu foto.

```
Trabaja en la rama "feat/auditoria-landing-v2" del repo ervia-landing-v2.
REGLAS: no despliegues, no toques main, no modifiques nada fuera de estas tareas.

1. SECCIÓN #casos: elimina por completo los 3 casos actuales, sus cifras y la nota "Cifras de ejemplo…". Nav: "Caso real".
2. H2 "Así funciona en un negocio real de Mérida". El caso se cuenta con los 3 pasos del Método (reutiliza el ícono de nodo de la Fase 5):
   - Encabezado: "[Nombre del taller] · Taller mecánico y refaccionaria · Ciudad Caucel, Mérida"
   - DETECTAR: "[frase del dueño sobre el problema]"
   - AUTOMATIZAR: "Agente de WhatsApp que cotiza con el catálogo real del taller" · "Agenda que respeta horario y capacidad, sin empalmes" · "Panel de citas, clientes y ventas; la venta se registra sola al terminar el servicio"
   - ESCALAR: "En producción desde octubre de 2026"
   - VIDEO: [demo-fullmotor.webm] + [demo-fullmotor.mp4] + [demo-fullmotor-poster.webp]. Atributos: muted, loop, playsinline, autoplay solo cuando entra en pantalla (IntersectionObserver; preload="none" hasta entonces), width/height definidos, aria-label descriptivo. Con prefers-reduced-motion: solo el poster con un botón de reproducir. Verifica que cada archivo pese 1,5 MB como máximo; si no, dime cómo comprimirlo con ffmpeg.
   - Capturas: [captura_chat.webp] y [captura_panel.webp], con width/height, loading="lazy" y alt descriptivo.
   - Testimonio: "[frase]" — [Nombre], [cargo], con [logo o foto].
   NO pongas ninguna cifra de resultados.
3. NUEVA SECCIÓN "Quién está detrás" (antes de #precios, compacta): [foto_elias.webp] y el texto de la sección 4.8 del informe.

Muéstrame cómo queda en escritorio y en móvil, y el peso total de los recursos nuevos.
```

### Fase 7 (Claude Code) — FAQ, CTA final, SEO/GEO y analítica

```
Trabaja en la rama "feat/auditoria-landing-v2" del repo ervia-landing-v2.
REGLAS: no despliegues, no toques main, no modifiques nada fuera de estas tareas.

1. FAQ: deja exactamente estas 8 preguntas y respuestas: [pega el texto final basado en la sección 4.10 del informe].
2. CTA FINAL #contacto:
   H2: "Empieza por el paso 1: descubre dónde estás perdiendo tiempo y clientes."
   Subtítulo: "15 minutos. Gratis. [Te llevas tu Mapa de Fugas aunque no trabajes con nosotros. — solo si D11 lo confirma]"
   Dos columnas: botón grande de WhatsApp ("Respuesta inmediata, incluso fuera de horario") | formulario (Nombre · Correo o WhatsApp · Giro del negocio [select: Taller/refaccionaria, Consultorio/clínica, Restaurante, Comercio, Servicios profesionales, Otro] · "¿Qué te quita más tiempo hoy?"). [Si D8: enlace "Prefiero agendar yo mismo" → URL de agenda.]
   Éxito: "Listo, {nombre}. Te escribimos hoy mismo para agendar tu diagnóstico."
3. META:
   - <title>Automatiza tu WhatsApp y tu agenda con IA | Método ERVIA · Mérida</title>
   - description: "Tu WhatsApp atiende, cotiza y agenda citas solo, las 24 horas. Con el Método ERVIA detectamos, automatizamos y escalamos tu negocio en menos de 4 semanas. Diagnóstico gratis."
   - canonical https://www.ervia.tech/ · Open Graph (og:locale=es_MX) · Twitter summary_large_image
   - og-image.png de 1200×630: fondo #0F172A, titular del hero y diagrama del Método ERVIA, logo.
4. JSON-LD: ProfessionalService (name ERVIA, url, logo, email info@ervia.tech, telephone +52[NÚMERO_ERVIA], address Mérida, Yucatán, MX, areaServed MX) + FAQPage (texto idéntico al visible). Conserva el HowTo de la Fase 5.
5. PRERENDER: la home es una SPA y un rastreador sin JS solo ve título y description. Propón cómo prerenderizarla a HTML estático en build para este stack, sin romper las páginas legales ni las rutas. Explícamelo y espera mi visto bueno antes de implementarlo.
6. robots.txt (permite todos los bots, incluidos GPTBot, ClaudeBot, PerplexityBot y Google-Extended, y apunta al sitemap) y sitemap.xml (home + 4 páginas legales). Si existen, muéstrame el contenido antes de cambiarlos.
7. ANALÍTICA [D6]: eventos click_whatsapp (con ubicación: hero, nav, flotante, precios, contacto), click_cta_diagnostico (con ubicación), form_submit_success, form_submit_error, scroll_75 y hero_visual_view. Nada que use cookies antes del consentimiento; dime qué cambia en el banner y en la Política de Cookies.

Al terminar, muéstrame el <head> resultante y el HTML prerenderizado de la home (primeras 60 líneas).
```

### Fase 8 (Claude Code + tú) — QA en local, staging y producción

```
Trabaja en la rama "feat/auditoria-landing-v2" del repo ervia-landing-v2.
REGLAS: no despliegues a producción. Solo cuando yo lo indique, despliega a test.ervia.tech.

1. Build de producción servido en local.
2. Lighthouse en móvil y escritorio: Performance, Accessibility, Best Practices y SEO ≥ 90; LCP < 2,5 s; CLS < 0,1. Corrige lo que baje de 90 y dime qué corregiste.
3. A 360, 390, 430, 768, 1024 y 1440 px: sin scroll horizontal, menú correcto, CTA primario visible sin scroll en móvil, mockup del hero funcional, botón flotante oculto sobre #contacto y carrusel de precios usable.
4. Todos los enlaces del nav y los CTAs llegan a su destino; los enlaces de WhatsApp abren el número correcto con el texto precargado de cada ubicación.
5. El HTML servido sin JavaScript contiene el H1, todas las secciones y los 3 JSON-LD.
6. Prueba del logo tapado: lista los diferenciadores de la sección 3.2 visibles en la página y los lugares donde aparece "Método ERVIA" (deben ser al menos 4 y 4).
7. Barrido de texto: ni cifras de ejemplo, ni "€", ni términos de la lista de localización, ni números de resultados que no sean reales o estén etiquetados como ejemplo.
Dame el informe y espera mi indicación para desplegar a test.ervia.tech.
```

**Checklist manual (tú), en `test.ervia.tech` y luego en producción:**
- [ ] Recorrer la landing en tu celular con datos móviles: sin desbordamiento, lectura cómoda y mockup fluido.
- [ ] **Prueba de los 5 segundos** con 3 dueños de pyme (no del sector tecnológico): enséñales solo la primera pantalla 5 segundos y pregúntales qué hace ERVIA y qué ganarían. Si no lo dicen con sus palabras, el hero no está listo.
- [ ] **Prueba del logo tapado:** captura de la página sin logo; ¿alguien podría confundirla con otra agencia?
- [ ] Compartir el enlace por WhatsApp: la previsualización muestra imagen, título y descripción.
- [ ] Probar el formulario con tus datos reales: el lead llega y ves el mensaje de éxito.
- [ ] Probar los botones de WhatsApp desde el celular y desde WhatsApp Web.
- [ ] Validar el JSON-LD en https://search.google.com/test/rich-results.
- [ ] Revisar en la analítica que llegan los eventos.
- [ ] Mergear a `main` y desplegar a producción por Dokploy.
- [ ] En Google Search Console: enviar el sitemap y solicitar la indexación.

---

## 10. Cómo medir si funcionó

| Métrica | Dónde | Objetivo inicial |
|---|---|---|
| Tasa de conversión (formulario + clics de WhatsApp ÷ visitas) | Analítica | ≥ 3–5% |
| Clics de WhatsApp por ubicación | `click_whatsapp` | Saber qué CTA funciona |
| Conversión de quienes ven el mockup vs. quienes no | `hero_visual_view` + conversión | Validar el visual del hero |
| Envíos de formulario con éxito vs. error | Eventos de formulario | 0 errores |
| Scroll al 75% | `scroll_75` | ≥ 30% de visitas |
| Diagnósticos (Detectar) agendados por semana | Tu agenda | Tendencia creciente |
| % de diagnósticos que pasan a Automatizar | Tu CRM | Mide si el Mapa de Fugas vende |

**Siguientes iteraciones (tras 4–6 semanas de datos):**
1. Métricas reales de Full Motor en el caso (el mini dashboard B, ahora con datos verdaderos).
2. Prueba A/B del hero: mockup (A) contra video (C).
3. Prueba A/B del titular: resultado (A) contra emocional (B).
4. Calculadora "¿Cuánto te cuestan los mensajes sin contestar?" conectada al paso Detectar.

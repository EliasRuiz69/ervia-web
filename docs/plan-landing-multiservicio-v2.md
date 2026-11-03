# Plan: landing multiservicio de ERVIA (v2)

**Fecha:** 2 de noviembre de 2026
**Objetivo:** que www.ervia.tech deje de vender solo "WhatsApp que contesta solo" y muestre **todo lo que ERVIA hace**, en una página **más corta**, sin tecnicismos y con **mini-demos animadas** que expliquen cada servicio en 3 segundos.
**Tiempo:** unas 3 h 40 min (8 fases, incluida la de tesis). El plan tiene **puntos de corte** seguros si el tiempo no alcanza.
**Dónde se ejecuta:** Claude Code en `C:\dev\ervia-web`, rama `develop` (staging en test.ervia.tech, que se despliega solo). Producción (`main`) se despliega a mano, como siempre.

### Decisiones tomadas hoy
| # | Decisión | Elegido |
|---|---|---|
| M1 | Servicios que se anuncian | Página web a medida · Dominio y correo profesional · Asistente de WhatsApp · **Asistente de llamadas (voz)** · **Recordatorios y clientes que regresan** · CRM a medida · Tareas repetitivas en automático · Captura de facturas · Tablero del negocio |
| M2 | Organización | **Por resultado**, en 3 bloques: *Que te encuentren* · *Atiende y vende solo* · *Ordena y decide*. **WhatsApp sigue como estrella** (hero y tarjeta destacada) |
| M3 | Precios | **Sin cifras**: "Diagnóstico gratis" y "Cotización tras el diagnóstico" |
| M4 | Reels | **Mini-demos animadas en código** (CSS/SVG, sin vídeo ni librerías) |
| M5 | Servicio de tesis: alcance | **Acompañamiento: el autor es el tesista.** Ordenar la información, resumir, matriz de fuentes, esquema y borradores de apoyo que él reescribe, verificación de citas, formato a la norma y declaración de uso de IA. **No** se promete escribir la tesis por encargo |
| M6 | Servicio de tesis: ubicación | **Banda propia en la home** + **página dedicada `/tesis`** (otro público: personas, no pymes) |
| M7 | Servicio de tesis: modalidad | **Ambas**: servicio hecho por ERVIA + **asistente privado de investigación** ("cuaderno con IA" solo para sus documentos) |
| M8 | Servicio de tesis: respaldo | **No se menciona a nadie** (ni formación ni aliados) |

---

## 1. Qué aprendimos de la competencia

| Quién | Qué ofrece | Cómo lo presenta | Qué tomamos |
|---|---|---|---|
| **Proxxa** (CDMX, la más parecida) | Un servicio estrella (vendedor por WhatsApp, desde $13,500 de pago único) y 3 secundarios: webs con posicionamiento en Google y ChatGPT, simulación de mercado y una auditoría de $1,999 que se descuenta del paquete | Un servicio protagonista y los demás en tarjetas pequeñas; calculadora "¿cuánto vale tu noche?"; demo en vivo por giro; garantía firmada; fundador visible | El patrón "1 estrella + catálogo". Demos por giro. Fundador visible (pendiente G5) |
| **Duotach** (Barcelona/Madrid) | Agentes, flujos con n8n, chatbots de WhatsApp, CRM a medida, webs con SEO | Lista de **casos de uso concretos** en vez de tecnología: facturas leídas y capturadas, cotizaciones automáticas, reportes y alertas, datos sincronizados entre sistemas | Hablar de **tareas**, no de herramientas |
| **AI Hispania, Aivy** (España) | Bots, **lectura automática de facturas**, calificación de leads, automatización contable | Servicios cerrados, "a consultar" | La captura de facturas como servicio propio |
| **Agencias en inglés** (Business380, AutoFlow) | CRM, agenda, facturas, tablero, chat | Un diagrama de "todo conectado" y flujos funcionando en pantalla | El diagrama **"Todo se conecta"** |
| **Plataformas de voz y citas** (CloudTalk, AgendaPro) | Agente que contesta llamadas, recordatorios, reactivación de clientes | "Convierte llamadas perdidas en citas" | Asistente de llamadas y recordatorios como servicios |

**Hueco que ERVIA puede ocupar en México:** casi nadie presenta juntos *presencia digital + atención automática + orden interno* con **un solo proveedor local**, y casi nadie ofrece la **captura de facturas CFDI** (XML y PDF), un dolor 100 % mexicano. Ese es el ángulo diferencial.

### 1.1 Servicio de tesis: qué hay en el mercado

| Quién | Qué ofrece | Qué tomamos / qué evitamos |
|---|---|---|
| **Elicit, Consensus** | Búsqueda de artículos y **extracción de datos a una tabla** (muestra, método, resultado) para revisiones de literatura | ✅ La **matriz de fuentes** como entregable estrella |
| **SciSpace, NotebookLM** | "Platicar" con tus PDF. NotebookLM responde solo con los documentos que subes y cita el pasaje exacto | ✅ El **asistente privado**: lo mismo, pero en un espacio solo del tesista, sin subir su investigación inédita a plataformas de terceros |
| **Jenni AI, Paperpal, Yomu** | Ayuda para redactar, autocompletado académico y citas | ⚠️ Solo **borradores de apoyo** que el tesista reescribe |
| **Acurio** (Suiza) | **Verificación**: comprueba que las fuentes existen y respaldan lo que se afirma. Su argumento: los redactores producen citas pero no las verifican | ✅ **"Citas verificadas"** como diferenciador (la IA inventa referencias) |
| **Scribbr, correctores en Fiverr** | Corrección de estilo, formato APA/Vancouver/IEEE/Chicago, referencias completas y reporte de plagio, cobrado por palabra | ✅ **Formato a la norma** y corrección de estilo |
| **Generadores de tesis "en horas"** (iWeaver y otros) y servicios de "humanizar texto para evadir detectores" | Escriben la tesis completa o maquillan texto de IA | ❌ **Lo que NO somos.** Es suplantación de autoría y puede invalidar el grado |

**Contexto normativo:** en la UNAM, el uso instrumental de la IA está permitido y la suplantación de autoría no; desde junio de 2026, la Universidad de Chile exige una "Declaración de uso de IA" en cada tesis. Además, 7 de cada 10 estudiantes de la UNAM dicen desconocer las políticas de su universidad sobre IA. Por eso **"te ayudamos a usar la IA sin poner en riesgo tu título"** es un argumento de venta, no una limitación.

**Errores de la competencia que evitamos:** jerga ("RAG", "orquestación multiagente", "workflows") en los titulares, cifras infladas sin prueba, y catálogos de 20 servicios que no se entienden.

---

## 2. La nueva página: de 10 secciones a 7 (+ banda de tesis)

**Antes:** Hero → Problemas → Lo que ganas → Método → ¿Es para mí? → Precios → FAQ → CTA y formulario. Todo habla de WhatsApp.

**Después:**

| # | Sección | Qué cambia | Por qué |
|---|---|---|---|
| 1 | **Nav** | Servicios · Cómo trabajamos · FAQ · [WhatsApp] [Diagnóstico gratis] | Más corto y con "Servicios" primero |
| 2 | **Hero** | Titular amplio (ERVIA = agencia de IA para pymes). Se conserva el mockup de WhatsApp como estrella. Debajo de los CTA, una fila de **chips** con todos los servicios (enlazan a su tarjeta) | En 5 segundos se entiende que hacemos **más** que WhatsApp |
| 3 | **Franja de confianza** | Se conserva, compacta | — |
| 4 | **Servicios por resultado** (NUEVA, el núcleo) | 3 **pestañas**, una por bloque, con tarjetas y una mini-demo animada en cada tarjeta | Con pestañas, 9 servicios caben en una pantalla de alto |
| 5 | **Todo se conecta + Por qué ERVIA** (NUEVA) | Diagrama animado (WhatsApp → Clientes → Tablero) y una comparativa de 4 filas: "Apps sueltas" frente a "ERVIA" | Es lo que nos diferencia, explicado con un dibujo |
| 6 | **Cómo trabajamos** | Fusiona **Método + Precios + Giros**: 3 pasos en una fila (Detectar gratis → Automatizar → Escalar) y una línea de giros como chips | Antes eran 3 secciones que repetían lo mismo |
| 6b | **Banda "¿Estás haciendo tu tesis?"** (NUEVA) | Franja corta, con otro tono de fondo: titular, 3 puntos, mini-demo y CTA hacia `/tesis` | Otro público. Va **después** del recorrido de las pymes para no interrumpirlo, y su fondo distinto deja claro que es "otra cosa" |
| 7 | **FAQ + CTA final y formulario** | FAQ de 6 preguntas (2 nuevas). El formulario añade "¿Qué te interesa?" (con la opción "Mi tesis") | — |
| — | **Footer** | Añade la lista de servicios (anclas) y el enlace "Te ayudamos con tu tesis" → `/tesis` | SEO interno y navegación |
| — | **Página `/tesis`** (NUEVA) | Página propia y corta para tesistas (sección 3.9) | Destino de anuncios y búsquedas ("ayuda con mi tesis"), sin mezclar mensajes en la home |

**Se retiran del render** (no se borran: quedan como componentes por si se reutilizan): *Problemas (Mirror)*, *Lo que ganas (Gains)*, *Para quién es (Audience)* y *Precios (Pricing)* como sección propia. Su mensaje vive ahora dentro de las tarjetas de servicio y de "Cómo trabajamos".

**Meta medible:** la página debe medir, como máximo, el **60 %** de la altura actual en escritorio (1440 px) y en móvil (390 px). La Fase 0 toma la medida de partida.

---

## 3. Copy (listo para pegar)

Reglas: español de México, tuteo, frases de menos de 15 palabras, **nombre del servicio en palabras normales** y el término técnico pequeño y en gris entre paréntesis, solo si existe. Ninguna cifra de resultados: todo ejemplo va etiquetado como "Ejemplo".

### 3.1 Hero
- **Eyebrow:** Agencia de IA y automatización para pymes · Mérida
- **H1. Opción A (recomendada):** "Tu negocio trabaja solo. **Tú** te dedicas a crecer."
  *Por qué:* es amplia (sirve para los 9 servicios), dice el beneficio final y el verde va en "Tú", la palabra destacada.
- **H1. Opción B:** "Lo que hoy haces a mano, mañana se hace **solo**."
  *Por qué:* es más concreta en la promesa de automatizar y se entiende al instante.
- **H1. Opción C:** "Contesta, agenda, cobra y ordena **sin contratar a nadie más**."
  *Por qué:* enumera acciones, es la más vendedora y la más larga.
- **Subtítulo:** "Te armamos todo lo digital de tu negocio: tu página web y tu correo, el asistente que contesta WhatsApp y llamadas, y el tablero que te dice cómo vas. Empiezas por lo más urgente."
- **CTA primario:** Escríbenos por WhatsApp · **CTA secundario:** Diagnóstico gratis (15 min)
- **Chips** (debajo de los CTA, enlazan a cada tarjeta): Página web · Correo profesional · WhatsApp · Llamadas · Recordatorios · Clientes (CRM) · Tareas automáticas · Facturas · Tablero
- **Columna derecha:** el mockup de WhatsApp actual, sin cambios.

### 3.2 Sección "Servicios"
- **H2:** "Todo lo que tu negocio necesita para **trabajar solo**"
- **Subtítulo:** "Elige qué quieres resolver. Puedes empezar por uno y sumar los demás cuando quieras."

**Pestaña 1: Que te encuentren** (ícono: lupa)

| Servicio | Promesa (1 línea) | Ejemplo (línea pequeña) | Mini-demo |
|---|---|---|---|
| **Tu página web a medida** | "Una página rápida que explica lo que vendes y te manda clientes a WhatsApp." | "Ejemplo: alguien busca 'taller en Mérida', te encuentra y te escribe." | Los bloques de una página caen y se acomodan; aparece el aviso "Nuevo cliente desde tu web" |
| **Tu dominio y correo profesional** | "Deja el @gmail. Usa tunegocio.com y ventas@tunegocio.com." | "Da confianza desde el primer correo." | Una tarjeta de presentación: `tallerjuan88@gmail.com` se tacha y se escribe `ventas@tallerjuan.mx` |

**Pestaña 2: Atiende y vende solo** (ícono: chat). La tarjeta de WhatsApp va destacada, con badge "El más pedido".

| Servicio | Promesa | Ejemplo | Mini-demo |
|---|---|---|---|
| **Asistente de WhatsApp** ⭐ | "Contesta, cotiza y agenda las 24 horas, con tu mismo número." | "Ejemplo: a las 11 de la noche alguien pide precio y sale con cita." | Mini-chat de 3 burbujas y el chip "✅ Cita agendada" |
| **Asistente de llamadas** | "Contesta el teléfono cuando tú no puedes y agenda la cita." | "Ninguna llamada se va al buzón." | Un teléfono vibra, una onda de voz, la tarjeta "Cita: jueves 10:00 ✅" |
| **Recordatorios y clientes que regresan** | "Confirma citas un día antes y escribe a quien hace tiempo no viene." | "Ejemplo: 'Hace 6 meses de tu último servicio. ¿Agendamos?'" | Un calendario con palomitas que aparecen y un mensaje que sale hacia un cliente |

**Pestaña 3: Ordena y decide** (ícono: gráfica)

| Servicio | Promesa | Ejemplo | Mini-demo |
|---|---|---|---|
| **Tus clientes en un solo lugar** *(CRM a medida)* | "Quién preguntó, quién compró y a quién llamar hoy. Todo en una pantalla." | "Hecho a la medida de cómo vendes tú." | Tarjetas que pasan de columna: Preguntó → Cotizado → Cliente |
| **Tareas repetitivas en automático** | "Lo que haces a mano todos los días (copiar, pegar, avisar, enviar) se hace solo." | "Ejemplo: llega un pedido y se avisa a tu equipo sin que muevas un dedo." | 3 íconos en cadena (correo → hoja → aviso) que se encienden en orden |
| **Captura de facturas** | "Mándanos tus facturas por WhatsApp o correo. Se leen solas y quedan en tu hoja, listas para tu contador." | "Funciona con XML y PDF del SAT." | Una factura pasa por un escáner y sus datos vuelan a una tabla (RFC · Fecha · Total) |
| **El tablero de tu negocio** *(dashboard)* | "Ventas, citas y gastos del mes en una sola pantalla, desde tu celular." | "Decides con datos, no con corazonadas." | Barras que crecen y una cifra que sube (etiquetada "Ejemplo") |

**Cada tarjeta:** ícono, nombre (H3), promesa, ejemplo, mini-demo arriba y enlace "Lo quiero →", que abre WhatsApp con un texto precargado por servicio (ej.: "Hola, me interesa la captura de facturas").

### 3.3 "Todo se conecta" y "Por qué ERVIA"
- **H2:** "Un solo equipo. **Todo conectado.**"
- **Diagrama animado:** el cliente escribe por WhatsApp → queda guardado en *Tus clientes* → aparece en *Tu tablero* → te llega un aviso. Los nodos tienen la forma del isotipo (como el Método actual) y la línea se dibuja al entrar en pantalla.
- **Comparativa** (2 columnas, 4 filas):

| | Apps sueltas | Con ERVIA |
|---|---|---|
| ¿Quién lo arma? | Tú, viendo tutoriales | Nosotros, de principio a fin |
| ¿Se hablan entre ellas? | Cada una por su lado | Todo conectado: WhatsApp, clientes, facturas, tablero |
| ¿Dónde están tus datos? | En servidores de otros | En **tu propio servidor**. Son tuyos |
| ¿A quién llamas si falla? | A un soporte en inglés | A nosotros, aquí en Mérida |

> ⚠️ Solo afirmaciones verificables: no se nombran competidores ni se dan cifras.

### 3.4 Cómo trabajamos (Método + precios + giros)
- **H2:** "Empiezas por lo más urgente. **Sin riesgo.**"
- **3 pasos en una fila** (nodos del método):
  1. **Detectar.** "Platicamos 15 minutos y te decimos dónde pierdes tiempo y clientes." · **Gratis**
  2. **Automatizar.** "Armamos e instalamos lo que elegiste y te enseñamos a usarlo. De 2 a 4 semanas." · *Cotización tras el diagnóstico*
  3. **Escalar.** "Lo cuidamos cada mes, lo mejoramos y te mandamos un resumen." · *Mensualidad tras el diagnóstico*
- **Línea de giros:** "Trabajamos con:" Talleres y refaccionarias · Consultorios y clínicas · Restaurantes · Negocios de servicios · *¿Otro giro? Escríbenos*
- **CTA:** Empieza gratis por el paso 1 →

### 3.5 FAQ (6 preguntas)
1. **¿Tengo que contratar todo?** "No. La mayoría empieza por un servicio, normalmente WhatsApp o la página web, y suma otros cuando ve resultados."
2. **¿Cuánto cuesta?** (texto actual, sin cifras)
3. **¿Necesito saber de tecnología?** (texto actual)
4. **¿Funciona con lo que ya uso?** "Sí. Trabajamos con tu WhatsApp, tu correo, tus hojas de cálculo y tu facturación actual. No tienes que cambiar de sistema."
5. **¿Dónde quedan mis datos y los de mis clientes?** (texto actual)
6. **¿Cuánto tarda?** (texto actual)

Se quitan "¿Por dónde empiezo?" (la responde la 1), "¿Tengo que cambiar mi número?" (pasa al microcopy de la tarjeta de WhatsApp) y "¿Y si el agente contesta algo mal?" (puede volver en la v2).

### 3.6 Formulario
Se añade el campo **"¿Qué te interesa?"** (opcional, chips de selección múltiple con los 9 servicios + "Mi tesis" + "Aún no sé"). En el select "Giro del negocio" se añade la opción **"Soy estudiante o investigador"**.
**Sin tocar el contrato con n8n:** la selección se antepone al campo `mensaje` (`"[Interés: WhatsApp, Facturas] " + mensaje`). Así el workflow "ERVIA Web - Leads" sigue funcionando hoy sin cambios.

### 3.7 SEO
- **title:** "ERVIA: agencia de IA y automatización para pymes en México | Mérida"
- **description:** "Página web, correo profesional, asistente de WhatsApp y de llamadas, CRM, captura de facturas y tableros para tu negocio. Diagnóstico gratis de 15 minutos."
- **`/tesis`, title:** "Te ayudamos con tu tesis: ordena tu información y cita bien con IA | ERVIA"
- **`/tesis`, description:** "Ordenamos tus fuentes, verificamos tus citas y damos formato a la norma de tu universidad. Tú sigues siendo el autor. Diagnóstico gratis de 15 minutos."

### 3.8 Banda en la home: "¿Estás haciendo tu tesis?"
- **Fondo:** `navy-800` o una superficie un tono más clara que el resto, con un borde superior azul fino. Así se lee como "otra cosa" sin romper la marca.
- **Eyebrow:** Para estudiantes e investigadores
- **H2:** "¿Tu tesis es una **montaña** de información?"
- **Texto:** "Te ayudamos a ordenarla, sacar conclusiones y entregar a tiempo. Tú sigues siendo el autor."
- **3 puntos** (ícono + 1 línea): Ordenamos tus fuentes y te damos un resumen de cada una · Verificamos que cada cita exista y diga lo que afirmas · Formato a la norma de tu universidad (APA, Vancouver, IEEE…)
- **Mini-demo** (a la derecha en escritorio, debajo en móvil): **"La montaña se ordena"**. Una pila de PDF desordenados se acomoda en filas de una tabla (Autor · Año · Hallazgo) y una cita recibe el chip "✅ Verificada".
- **CTA:** "Ver cómo te ayudamos →" → `/tesis` · **secundario:** "Escríbenos por WhatsApp" (texto precargado: "Hola, estoy haciendo mi tesis y necesito ayuda")

### 3.9 Página `/tesis` (corta: 6 bloques)
Mismo sistema de diseño, header y footer. El nav de esta página lleva: Cómo te ayudamos · Cómo trabajamos · FAQ · [WhatsApp] [Diagnóstico gratis].

**1. Hero**
- **Eyebrow:** Acompañamiento de tesis con IA · Licenciatura, maestría y doctorado
- **H1. Opción A (recomendada):** "Tienes la información. Te ayudamos a convertirla en **tu tesis**."
  *Por qué:* parte de lo que el tesista ya tiene, la montaña, y deja claro en el verde que la tesis es suya.
- **H1. Opción B:** "De una montaña de PDF a una tesis **clara y bien citada**."
  *Por qué:* es visual, muestra el antes y el después.
- **H1. Opción C:** "Termina tu tesis a tiempo, **sin arriesgar tu título**."
  *Por qué:* ataca el miedo principal: plazos y reglas de la universidad.
- **Subtítulo:** "Ordenamos tus fuentes, te ayudamos a sacar conclusiones y revisamos que cada cita sea real y esté en el formato que pide tu universidad. Tú escribes con tu voz; nosotros quitamos el trabajo pesado."
- **CTA:** "Diagnóstico gratis (15 min)" → `#contacto` · "Escríbenos por WhatsApp"
- **Visual:** la mini-demo "La montaña se ordena", a tamaño grande.

**2. "Cómo te ayudamos"** (5 tarjetas, con el mismo kit de mini-demos)

| Servicio | Promesa | Mini-demo |
|---|---|---|
| **Ordenamos tu montaña de información** | "Clasificamos tus artículos, libros y notas, y te damos un resumen de cada uno." | PDF sueltos que caen en carpetas por tema |
| **Tabla comparativa de tus fuentes** | "Todas tus fuentes en una tabla: autor, método, hallazgos y en qué coinciden o se contradicen." | Filas que se llenan solas: Autor · Año · Método · Hallazgo |
| **Tu asistente privado de investigación** | "Pregúntale a tus documentos y te responde citando la página exacta. Solo usa tus fuentes y es solo para ti." | Pregunta → respuesta con la etiqueta "p. 42" |
| **Esquema y borradores de apoyo** | "Te proponemos la estructura de capítulos y borradores de apoyo a partir de tus notas. Tú los reescribes con tu voz." | Índice que se arma; un párrafo de apoyo con el sello "Borrador: reescríbelo tú" |
| **Citas verificadas y formato a la norma** | "Comprobamos que cada referencia exista y diga lo que afirmas. Y damos formato APA, Vancouver, IEEE o el que pida tu universidad." | Lista de referencias: una se marca "❌ No existe", el resto "✅ Verificada"; luego cambian a formato APA |

**3. "Lo que hacemos y lo que no"** (2 columnas: es el elemento de confianza)
- **Sí hacemos:** ordenar, resumir, comparar fuentes, proponer estructura, borradores de apoyo, verificar citas, formato, corrección de estilo y ayudarte a redactar tu **declaración de uso de IA**.
- **No hacemos:** escribir tu tesis por ti, entregar texto para que lo presentes como propio sin revisarlo, inventar datos o referencias, ni "maquillar" texto para engañar detectores.
- **Remate:** "Así usas la IA como herramienta, como lo permiten las universidades, y tu título queda protegido."

**4. "Cómo trabajamos"** (3 pasos, con los nodos del método)
1. **Diagnóstico gratis (15 min).** "Nos cuentas tu tema, cuánto llevas, tu fecha de entrega y la norma de tu universidad."
2. **Ordenamos y te acompañamos.** "Recibimos tus documentos, armamos la tabla y tu asistente privado, y revisamos avances contigo."
3. **Revisión final.** "Verificamos citas, damos formato y te ayudamos con la declaración de uso de IA antes de entregar."
- *Precio:* "Cotización tras el diagnóstico, según tu avance y el número de fuentes." Sin cifras (M3).

**5. FAQ** (6 preguntas)
1. **¿Esto está permitido por mi universidad?** "Las universidades permiten usar la IA como herramienta y piden que el autor revise todo y lo declare. Trabajamos así: tú eres el autor y te ayudamos a declarar el uso de IA. Revisa siempre el reglamento de tu programa; te ayudamos a leerlo."
2. **¿Mis documentos están seguros?** ⚠️ *Confirmar antes de publicar:* "Tus documentos se guardan en un espacio privado, solo tuyo, y no se publican ni se comparten. Al terminar, los borramos si así lo pides." (Elias: confirma también qué proveedor de IA procesa los textos y si sus condiciones permiten decir "no se usan para entrenar modelos" antes de añadir esa frase.)
3. **¿Sirve para licenciatura, maestría y doctorado?** "Sí. También para artículos, tesinas e informes de investigación."
4. **¿Qué normas manejan?** "APA 7, Vancouver, IEEE, Chicago, Harvard, ISO 690 o la guía propia de tu universidad."
5. **¿Me escriben la tesis?** "No. Te damos borradores de apoyo, estructura y revisión, pero el texto final lo escribes tú. Es lo que protege tu título."
6. **¿Cuánto cuesta?** "Depende de tu avance y del número de fuentes. Te damos una cotización clara tras el diagnóstico gratuito."

**6. CTA final + formulario:** el mismo componente de la home, con el giro preseleccionado en "Soy estudiante o investigador" y el interés "Mi tesis". `origen: "web-tesis"` (el campo ya existe en el contrato, así que n8n no cambia).

---

## 4. Las mini-demos ("reels" en código)

**Principio:** cada demo cuenta **una sola idea en 3–4 segundos**, en bucle, como un reel sin sonido.

**Reglas técnicas** (prioridades de la skill ui-ux-pro-max: accesibilidad, rendimiento, movimiento):
- **Sin librerías:** CSS `@keyframes` y SVG. Nada de GSAP, Lottie ni vídeo (protege el LCP, hoy 3,2 s en móvil).
- **Solo `transform` y `opacity`.** Caja de tamaño fijo (`aspect-ratio: 16/10`) para que no haya saltos de diseño (CLS = 0).
- **Solo se mueven las visibles:** un `IntersectionObserver` pone `data-playing` y las demos fuera de pantalla o en pestañas ocultas quedan en pausa (`animation-play-state`).
- **`prefers-reduced-motion`:** se muestra el **fotograma final** estático (con el resultado visible).
- **Accesibilidad:** la animación lleva `aria-hidden="true"` y la tarjeta tiene un texto alternativo con la idea ("Ejemplo: una factura se lee sola y sus datos pasan a una tabla").
- **Kit reutilizable** en `src/components/demos/kit/`: `DemoFrame`, `ChatBubble`, `ResultChip`, `TableRow`, `Bar`, `Node`, `Notification`. Cada demo es una combinación del kit (≈ 40–80 líneas), así salen 9 demos en el tiempo de hoy.
- **Colores:** los tokens del sistema. Verde **solo** para el resultado (chip ✅), azul para estructura.

**Prioridad** (si falta tiempo, las de prioridad B salen como **fotograma estático** con el mismo kit y se animan después):
- **A:** WhatsApp (reutiliza el mockup del hero en miniatura), Facturas, Clientes (CRM), Tablero, Correo profesional.
- **B:** Página web, Llamadas, Recordatorios, Tareas automáticas, diagrama "Todo se conecta".
- **Tesis (Fase 4b):** "La montaña se ordena" (banda y hero de `/tesis`) es **A**. Las 5 de las tarjetas de `/tesis` son **B**: salen estáticas si falta tiempo.

**Pestañas:** `role="tablist"`, flechas de teclado, la pestaña activa en la URL (`#servicios-ordena`) y, en móvil, las tarjetas en carrusel horizontal con `scroll-snap` (se ve un trozo de la siguiente) para no alargar la página.

---

## 5. Ejecución paso a paso

> **[TÚ]** = manual. **[CC]** = prompt para pegar en Claude Code (`C:\dev\ervia-web`).
> Una fase a la vez; revisas la captura y das el visto bueno antes de seguir.

| Fase | Qué | Quién | Tiempo |
|---|---|---|---|
| 0 | Preparación y medida de partida | Tú + CC | 10 min |
| 1 | Datos de servicios, estructura y hero | CC | 30 min |
| 2 | Sección Servicios con pestañas, kit y demos A | CC | 50 min |
| 3 | Demos B, "Todo se conecta" y "Por qué ERVIA" | CC | 30 min |
| 4 | Cómo trabajamos, FAQ, formulario y footer | CC | 20 min |
| **4b** | **Banda de tesis en la home + página `/tesis`** | CC | **40 min** |
| 5 | SEO y QA (home + `/tesis`) | CC | 25 min |
| 6 | Staging → PR → producción, y aviso al agente de WhatsApp | Tú | 15 min |
| | **Total** | | **≈ 3 h 40 min** |

**✂️ Puntos de corte seguros:**
1. Si a las 2 h no has terminado la Fase 3, sigue con la Fase 4 con las demos B en estático.
2. Si no da tiempo para toda la Fase 4b, haz **solo la banda** (≈ 15 min) con el CTA hacia WhatsApp (`TESIS_PAGE_ENABLED = false`) y deja `/tesis` para mañana. Al activar la página, el CTA cambia solo.
Lo pendiente se hace otro día sin rehacer nada.

### Fase 0. Preparación [TÚ + CC]
**[TÚ]** Copia este documento a `C:\dev\ervia-web\docs\plan-landing-multiservicio-v2.md`. En la terminal: `git checkout develop && git pull`.

**[CC]**
```
Rama develop. Lee docs/plan-landing-multiservicio-v2.md completo.
1. Actualiza CLAUDE.md, sección "Fuentes de verdad": añade como fuente n.º 2, por encima de la auditoría v2, "docs/plan-landing-multiservicio-v2.md — MANDA sobre contenido y estructura de la home desde nov 2026". La auditoría v2 queda como n.º 3 para lo que este plan no cubra.
2. Con el build de producción servido en local, mide con Playwright la altura total de la home (document.body.scrollHeight) a 1440 px y a 390 px, y guarda capturas de página completa en docs/capturas-antes-v2/. Dime las dos alturas: son la base para la meta del 60 %.
No cambies nada más. Espera mi visto bueno.
```

### Fase 1. Datos de servicios, estructura y hero [CC]
```
Rama develop. Sigue CLAUDE.md y docs/plan-landing-multiservicio-v2.md (secciones 2, 3.1 y 3.2).
0. El servicio de tesis NO va en services.ts (es otro público): tendrá su propio src/config/tesis.ts en la Fase 4b. Aquí solo reserva en la home el hueco de la banda (componente TesisBand con su H2) entre HowWeWork y Faq.
1. Crea src/config/services.ts como ÚNICA fuente de datos de servicios: array tipado con id (slug), bloque ("encuentren" | "atiende" | "ordena"), nombre, nombreTecnico (opcional), promesa, ejemplo, demo (id del componente), destacado (bool), waText (texto precargado de WhatsApp, por ejemplo "Hola, me interesa la captura de facturas") y altDemo (texto alternativo). Contenido EXACTO de la sección 3.2. Los bloques, con título e ícono, en el mismo archivo.
2. Reordena la home según la sección 2: Hero → TrustBar → Services (nuevo, por ahora solo con su H2 y subtítulo) → Connected (nuevo, solo H2) → HowWeWork (nuevo, solo H2) → TesisBand (nuevo, solo H2) → Faq → FinalCta. Deja de renderizar Mirror, Gains, Audience y Pricing SIN borrar sus componentes. Anclas: #inicio, #servicios, #por-que-ervia, #como-trabajamos, #faq, #contacto.
3. Nav: Servicios · Cómo trabajamos · FAQ · [WhatsApp] [Diagnóstico gratis]. Actualiza también el menú móvil.
4. Hero: textos de 3.1 con la opción A del H1 (deja B y C como comentario). Bajo los CTA, la fila de chips generada desde services.ts; cada chip enlaza a #servicios con la pestaña de su bloque abierta y foco en su tarjeta. En móvil, los chips van en una fila con scroll horizontal (sin barra visible, con degradado en el borde) y el CTA primario debe seguir viéndose sin scroll a 390×844. El mockup de WhatsApp no se toca.
5. Barrido: que no queden enlaces a las anclas retiradas (#ganancias, #metodo, #precios).
Al terminar: archivos tocados, capturas a 1440 y 390 px, build sin errores. Espera mi visto bueno.
```

### Fase 2. Sección Servicios con pestañas, kit y demos A [CC]
```
Rama develop. Sigue CLAUDE.md y las secciones 3.2 y 4 del plan.
1. Kit de demos en src/components/demos/kit/ (DemoFrame, ChatBubble, ResultChip, TableRow, Bar, Node, Notification), con las reglas técnicas de la sección 4: solo CSS/SVG, transform/opacity, aspect-ratio 16/10, IntersectionObserver que activa data-playing solo en las visibles, prefers-reduced-motion = fotograma final estático, aria-hidden en la animación y texto alternativo en la tarjeta. Sin dependencias nuevas.
2. Demos de prioridad A (sección 4): WhatsApp (miniatura del mockup del hero, reutiliza su código), Facturas, Clientes (CRM), Tablero y Correo profesional. Bucle de 3–4 s con una pausa de 1 s en el resultado. Verde solo en el chip de resultado.
3. Las demos de prioridad B, de momento, como fotograma estático con el kit (mismo tamaño).
4. Sección Services: H2 y subtítulo de 3.2; 3 pestañas accesibles (role tablist/tab/tabpanel, flechas izquierda y derecha, Home/End, la pestaña activa en el hash de la URL #servicios-encuentren | #servicios-atiende | #servicios-ordena; la pestaña "atiende" abierta por defecto). Tarjetas generadas desde services.ts: demo arriba, H3, promesa, ejemplo en pequeño, nombreTecnico en gris entre paréntesis y "Lo quiero →" hacia WhatsApp con waText (si WHATSAPP_ENABLED es false, hacia #contacto). WhatsApp destacada con el badge "El más pedido".
5. Rejilla: 3 columnas en escritorio (4 en "ordena" si cabe sin bajar de 17 px el texto de la promesa; si no, 2×2); en móvil, carrusel horizontal con scroll-snap, un trozo visible de la siguiente tarjeta e indicador de puntos.
6. Comprueba con Playwright que los chips del hero abren la pestaña correcta y que, en las pestañas ocultas, las demos están en pausa.
Al terminar: capturas de cada pestaña a 1440 y 390 px, y un GIF o una secuencia de 4 capturas de UNA demo animándose. Build sin errores. Espera mi visto bueno.
```

### Fase 3. Demos B, "Todo se conecta" y "Por qué ERVIA" [CC]
```
Rama develop. Sigue CLAUDE.md y las secciones 3.3 y 4 del plan.
1. Anima las demos de prioridad B: Página web, Llamadas, Recordatorios y Tareas automáticas (mismas reglas que en la Fase 2).
2. Sección Connected (#por-que-ervia): H2 de 3.3; un diagrama SVG de 4 nodos con la forma del isotipo (reutiliza los nodos del Método) — Cliente escribe por WhatsApp → Tus clientes → Tu tablero → Te llega un aviso —; la línea se dibuja al entrar en pantalla y estática con reduced-motion. Horizontal en escritorio, vertical en móvil. aria-label con el recorrido completo.
3. Debajo, la comparativa de 3.3 como tabla semántica (<table> con <th scope>), legible a 390 px (en móvil, cada fila como tarjeta con las dos respuestas). La columna ERVIA con ✅ en verde y la de "Apps sueltas" en gris; sin rojo ni íconos de error.
Al terminar: capturas a 1440 y 390 px. Build sin errores. Espera mi visto bueno.
```

### Fase 4. Cómo trabajamos, FAQ, formulario y footer [CC]
```
Rama develop. Sigue CLAUDE.md y las secciones 3.4, 3.5 y 3.6 del plan.
1. HowWeWork (#como-trabajamos): H2, los 3 pasos en una fila con los nodos del método (Detectar "Gratis" con el badge verde; Automatizar y Escalar "Cotización tras el diagnóstico"), la línea de giros como chips y el CTA. Reutiliza los componentes de Method y Pricing; no dupliques estilos.
2. FAQ: las 6 preguntas de 3.5, en ese orden, con las respuestas actuales donde dice "texto actual".
3. Formulario: añade "¿Qué te interesa?" (opcional; chips de selección múltiple con role="checkbox" o checkboxes reales con estilo de chip, desde services.ts, más "Mi tesis" y "Aún no sé"). En el select de giro, añade "Soy estudiante o investigador". Haz que el componente del formulario acepte props para preseleccionar giro e interés y para fijar el origen (lo usará /tesis en la Fase 4b). NO cambies el contrato JSON de /api/lead: antepón la selección a "mensaje" con el formato "[Interés: A, B] " en el servidor, después de validar con zod (lista blanca de ids). Actualiza la prueba E2E.
4. Footer: columna "Servicios" con enlaces a cada tarjeta y, al final, "Te ayudamos con tu tesis" → /tesis (visible solo si TESIS_PAGE_ENABLED; si no, → WhatsApp con el texto de tesis).
5. Comprueba que el botón flotante de WhatsApp se sigue ocultando sobre #contacto.
Al terminar: capturas a 1440 y 390 px. Build sin errores. Espera mi visto bueno.
```

### Fase 4b. Banda de tesis + página `/tesis` [CC]
```
Rama develop. Sigue CLAUDE.md y las secciones 1.1, 3.8 y 3.9 del plan. Regla de contenido OBLIGATORIA para todo lo de tesis: el autor es el tesista. Nunca escribas en la web "te escribimos/redactamos tu tesis", "tesis lista", "entrega garantizada" ni nada que ofrezca evadir detectores de IA o plagio.
1. Crea src/config/tesis.ts con: los textos de la banda (3.8), las 5 tarjetas de /tesis (3.9, bloque 2) con el mismo tipo que services.ts (promesa, demo, altDemo, waText), "Lo que hacemos y lo que no", los 3 pasos, las 6 FAQ y el interruptor TESIS_PAGE_ENABLED = true. Texto precargado de WhatsApp: "Hola, estoy haciendo mi tesis y necesito ayuda".
2. Mini-demo "La montaña se ordena" (prioridad A) con el kit de demos: pila de PDF desordenados → filas de una tabla (Autor · Año · Hallazgo) → una cita con el chip "✅ Verificada". Mismas reglas técnicas de la sección 4.
3. TesisBand en la home (3.8): superficie un tono más clara que el resto con un borde superior azul, eyebrow, H2, texto, 3 puntos con ícono, la demo y los CTA. Si TESIS_PAGE_ENABLED es false, el CTA principal va a WhatsApp con el texto de tesis.
4. Página src/app/tesis/page.tsx (SSG) con los 6 bloques de 3.9: hero (H1 opción A, B y C como comentario), "Cómo te ayudamos" (5 tarjetas; las demos de prioridad B pueden quedar como fotograma estático), "Lo que hacemos y lo que no" (2 columnas; ✅ en verde para "Sí hacemos" y un ícono neutro gris, no rojo, para "No hacemos"), "Cómo trabajamos" (reutiliza el componente de pasos de la home), FAQ (reutiliza el acordeón) y el CTA final con el formulario: giro preseleccionado "Soy estudiante o investigador", interés "Mi tesis" y origen "web-tesis". Si el esquema zod de /api/lead define origen como literal, amplíalo a un enum ["web-contacto","web-tesis"] (el workflow de n8n solo revisa si termina en "-staging", así que no se rompe). Nav propio de esta página según 3.9.
5. En la FAQ n.º 2 ("¿Mis documentos están seguros?") deja el texto marcado con un comentario TODO-ELIAS y NO lo publiques en main hasta que yo lo confirme.
6. Comprueba que /tesis no tiene scroll horizontal a 360–1440 px y que el formulario envía origen "web-tesis" (prueba E2E con el webhook simulado).
Al terminar: capturas de la banda y de /tesis completa a 1440 y 390 px. Build sin errores. Espera mi visto bueno.
```

### Fase 5. SEO y QA [CC]
```
Rama develop. Sigue CLAUDE.md y la sección 3.7 del plan.
0. /tesis: metadata propia (title y description de 3.7), canonical https://www.ervia.tech/tesis, imagen OG propia con el H1 de /tesis, JSON-LD Service ("Acompañamiento de tesis con IA", provider ERVIA, areaServed MX) y FAQPage con las 6 preguntas EXACTAS de la página. Añade /tesis a sitemap.ts y a /llms.txt (con la regla "el autor es el tesista").
1. Metadatos: title y description de 3.7. Imagen OG: actualiza el titular al H1 nuevo.
2. JSON-LD: ProfessionalService con hasOfferCatalog (un Offer/Service por cada entrada de services.ts, con nombre y descripción = promesa); FAQPage con las 6 preguntas EXACTAS que se ven en la página; quita o ajusta el HowTo si sus textos ya no coinciden con "Cómo trabajamos". Valídalo.
3. /llms.txt: añade la lista de servicios con su promesa.
4. QA en la home Y en /tesis: Lighthouse móvil y escritorio (≥ 90 en las 4 categorías; CLS < 0,1; dime el LCP comparado con el anterior); Playwright a 360, 390, 430, 768, 1024 y 1440 px (sin scroll horizontal, pestañas, chips, carrusel, formulario); axe con 0 errores serios; barrido de texto (sin "€", "coste", "#", jerga en titulares — "workflow", "RAG", "LLM", "agente multiagente" —, cifras sin la etiqueta "Ejemplo" ni, en todo lo de tesis, frases como "te escribimos tu tesis", "tesis lista", "indetectable" o "humanizar").
5. Mide la altura total de la home a 1440 y 390 px y compárala con la de la Fase 0 (meta: ≤ 60 %).
6. Haz commit y push a develop (staging se actualiza solo).
Entrégame el informe. Espera mi visto bueno para la PR.
```

### Fase 6. Publicación [TÚ]
1. Revisa **test.ervia.tech en tu celular** con datos móviles: pestañas, chips, demos, la banda de tesis, **test.ervia.tech/tesis** y el formulario (un envío de prueba desde cada página debe llegar con "🧪 [STAGING]"; el de /tesis, con origen `web-tesis`).
   **Antes de la PR:** confirma o corrige la FAQ n.º 2 de `/tesis` (seguridad de los documentos) y pide a Claude Code que quite el TODO-ELIAS.
2. Pide a Claude Code: *"Abre la PR develop → main con el resumen de cambios. No la fusiones."* Revísala y fusiónala en GitHub.
3. Dokploy → `ervia-web` → **Deploy**. Comprueba `curl.exe -sI https://www.ervia.tech` (200) y recorre la página en el celular.
4. ⚠️ **Avisa al agente de WhatsApp (importante).** El asistente "ERVIA WhatsApp - Asistente" ya contesta el 999 249 8890 y hoy conoce sobre todo el servicio de WhatsApp. Cuando un prospecto escriba "Hola, me interesa la captura de facturas", debe saber qué es. En tu sesión de Antigravity con el MCP de n8n:
```
Workflow "ERVIA WhatsApp - Asistente". NO cambies la lógica ni las conexiones. Solo en el prompt de sistema / la base de conocimiento del agente, añade el catálogo de servicios de ERVIA con estos 9 servicios y su promesa: [pega la tabla de la sección 3.2]. Añade también el servicio "Acompañamiento de tesis con IA" con las 5 tarjetas de la sección 3.9 y estas reglas: el autor es siempre el tesista; si alguien pide "que le escriban la tesis", explicar con amabilidad que no lo hacemos porque pone en riesgo su título y ofrecer el acompañamiento; nunca ofrecer evadir detectores de IA o plagio. Reglas generales: sin precios (todo es "cotización tras el diagnóstico gratis de 15 minutos"); si preguntan por un servicio, explicar en 2 frases y ofrecer agendar el diagnóstico. Muéstrame el diff del prompt antes de guardar y haz 3 pruebas: "me interesa la captura de facturas", "estoy haciendo mi tesis y necesito ayuda" y "¿me pueden escribir mi tesis?".
```
Si hoy no da tiempo, este paso es **el primero de mañana**. Hasta entonces, las preguntas sobre los servicios nuevos las responde el agente con lo que sabe, o tú desde la app.

---

## 6. Después de hoy (v3)
| Prioridad | Qué | Por qué |
|---|---|---|
| Alta | Agente de WhatsApp con el catálogo (si no se hizo en la Fase 6) | Coherencia entre la landing y el agente |
| Alta | **Calculadora "¿Cuánto te cuesta hacerlo a mano?"** (horas a la semana × costo por hora) | Es lo que mejor funciona en Proxxa; convierte el interés en urgencia |
| Media | Página propia por servicio (`/servicios/captura-de-facturas`, etc.) | SEO: cada servicio posiciona su propia búsqueda |
| Media | Reels MP4 verticales para Instagram/TikTok a partir de las mismas demos | Reutiliza el trabajo de hoy en redes |
| Media | G5: caso real de Full Motor y "Quién está detrás" (foto de Elias) | La prueba social que hoy falta (Proxxa tampoco la tiene: ventaja si llegamos antes) |
| Baja | Demos del hero por giro (consultorio, restaurante) | Pendiente de la v1 |
| Media | **Producto de tesis listo para entregar**: plantilla de la tabla de fuentes, flujo de verificación de citas (DOI/Crossref) y el asistente privado montado en el VPS | La landing ya lo anuncia: hay que tenerlo listo para el primer cliente |
| Media | `/tesis` como destino de una campaña pequeña de Meta Ads (estudiantes de posgrado en Mérida y Yucatán) | Público fácil de segmentar; la página ya está hecha para eso |

---

## Fuentes
- [Proxxa](https://proxxa.mx): estructura, servicios, precios y recursos.
- [Proxxa en DesignRush](https://www.designrush.com/agency/profile/proxxa)
- [Duotach: automatización con IA en Barcelona](https://duotach.com/servicios/automatizacion-ia-barcelona)
- [Upliora: ranking de agencias de automatización con IA en España (2026)](https://www.upliora.es/comparativas/mejores-agencias-consultoras-automatizacion-ia-espana-ranking-2026)
- [Ecosistema Startup: automatizar la pyme con IA (facturas y conciliación)](https://ecosistemastartup.com/?p=121014)
- [Siempre al Día: IA para contadores en México (registro de facturas CFDI)](https://siemprealdia.co/mexico/contabilidad/gestion-de-tareas-con-inteligencia-artificial-para-contadores/)
- [CloudTalk: agente de voz con IA para citas](https://www.cloudtalk.io/es/agente-de-voz-ia-para-programacion-de-citas/)
- [AgendaPro: IA para conseguir más clientes](https://agendapro.com/blog/como-usar-ia-para-conseguir-mas-clientes-en-tu-negocio/)
- [Business380](https://www.business380.com/) y [AutoFlow](https://autoflowage-6mkrquhl.manus.space): presentación de "todo conectado".

**Servicio de tesis**
- [Ponder: comparativa de herramientas de IA para revisión de literatura (2026)](https://ponder.ing/blog/best-ai-tools-for-literature-review)
- [OfficeChai: 17 herramientas de IA para revisión de literatura (2026)](https://officechai.com/learn/ai-tools-for-literature-review/)
- [Acurio: comparativa de herramientas de redacción de tesis y verificación de citas](https://acurio.ch/en/blog/ai-thesis-writing-tools-compared.md)
- [Scribbr: revisión de tesis doctorales](https://www.scribbr.es/revision-edicion/tesis-doctoral-phd/)
- [Tesify: tesis UNAM con IA (uso instrumental frente a suplantación de autoría)](https://tesify.es/como-hacer-tesis-unam-con-ia-workflow-aprobado-2026)
- [Universidad de Chile: lineamientos de uso transparente de IA en tesis (junio de 2026)](https://uchile.cl/u242181)
- [Expansión: 9 de cada 10 estudiantes de la UNAM usan IA](https://expansion.mx/carrera/2026/07/08/9-cada-10-estudiantes-unam-usan-ia-para-que)
- [UNAM: Recomendaciones para el uso educativo de la IA generativa (2025)](https://iagen.unam.mx/recursos/Recomendaciones_IAGEN_UNAM_2025.pdf)

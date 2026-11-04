# Revisión de la Política de Privacidad de ERVIA: servicio de tesis

**Fecha:** 3 de noviembre de 2026
**Página:** www.ervia.tech/politica-de-privacidad (versión del 30 sep 2026)
**Objetivo:** que la política cubra el acompañamiento de tesis (`/tesis`), el asistente de WhatsApp y el formulario antes del primer cliente de tesis.
**Archivos relacionados:** `politica-de-privacidad-v2.md` (texto propuesto) · `politica-de-privacidad.diff` (diff) · `prompt-politica-privacidad-tesis.md` (prompt para Claude Code)

> ⚖️ **No es asesoría legal.** Es una revisión técnica contra el texto de la ley. Los puntos marcados con ⚖️ conviene validarlos con un abogado de protección de datos antes de publicar (ver la sección 5).

---

## 1. Marco legal que se usó

| Norma | Estado (nov 2026) | Qué importa aquí |
|---|---|---|
| **LFPDPPP** (DOF 20 mar 2025, en vigor desde el 21 mar 2025) | Vigente. Abrogó la ley de 2010 | Art. 15: contenido mínimo del aviso. Art. 16: aviso simplificado cuando los datos se recogen por medios electrónicos. Art. 8: datos sensibles, consentimiento expreso y por escrito. Art. 29: persona o departamento de datos personales. Art. 31: plazos ARCO. Arts. 35–36: transferencias |
| **Reglamento de 2011** | El Ejecutivo tenía 90 días para adecuarlo y, hasta donde se pudo comprobar, no hay uno nuevo | Art. 53: las remisiones a encargados no requieren informarse ni consentimiento (se informan igual, por transparencia) |
| **Autoridad** | Secretaría Anticorrupción y Buen Gobierno (el INAI se extinguió) | La política actual ya la nombra ✅ |

**Contenido mínimo del aviso (art. 15):**
1. Identidad y domicilio del responsable.
2. Datos que se tratan, señalando los sensibles.
3. Finalidades, distinguiendo cuáles requieren consentimiento.
4. Opciones para limitar el uso o la divulgación.
5. Medios para ejercer los derechos ARCO.
6. Procedimiento para comunicar cambios al aviso.

---

## 2. Qué falta en la política actual

**Leyenda:** 🔴 incumple un requisito de la ley · 🟠 incompleto o desactualizado con los tratamientos nuevos · 🟡 mejora de claridad

### 2.1 Requisitos generales (art. 15)

| # | Tema | Hoy | Problema | Nivel | Cómo queda en la v2 |
|---|---|---|---|---|---|
| G1 | **Identidad del responsable** | "Nombre comercial: ERVIA" | La ley pide la identidad del responsable: nombre de la persona física o razón social, no solo la marca | 🔴 | Sección 1: ELIAS RUIZ VELA, "que opera con el nombre comercial ERVIA" (D1) |
| G2 | **Domicilio** | "Mérida, Yucatán, México" | Hace falta un domicilio completo; un correo o una ciudad no lo sustituyen | 🔴 | Sección 1: calle, número, colonia y CP (D2) |
| G3 | **Persona de datos personales** (art. 29) | No existe | Hay que designar a una persona o departamento que tramite las solicitudes ARCO | 🔴 | Sección 1 (D3) |
| G4 | **Aviso simplificado en formularios** (art. 16) | El formulario no muestra un aviso simplificado | Si los datos se recogen por medios electrónicos, hay que ofrecer el aviso simplificado (fracciones I a IV del art. 15) con enlace al integral | 🔴 | Texto en la sección 4 de este documento; lo aplica el prompt |
| G5 | **Finalidades que requieren consentimiento** | "Primarias" y "secundarias" | El art. 15 pide distinguir cuáles requieren consentimiento; "secundarias" no lo dice claro | 🟠 | Sección 3: "Usos necesarios" frente a "Usos adicionales (puedes negarte)" |
| G6 | **Opciones para limitar el uso** | Solo el correo de oposición a las secundarias | Bien, pero se puede ejercer en cualquier momento y también por WhatsApp | 🟡 | Sección 3.2 |
| G7 | **Plazos ARCO** | "20 días hábiles" | La ley dice 20 días para responder y 15 para hacer efectivo, ampliables una vez; faltaban los 15 días, la ampliación y la gratuidad | 🟠 | Sección 7.3 (⚖️ días hábiles o naturales) |
| G8 | **Requisitos de la solicitud ARCO** | Nombre, descripción e identificación | Faltan el representante y el dato correcto en la rectificación | 🟡 | Sección 7.2 |
| G9 | **Revocación del consentimiento** | Se menciona | Hay que decir cómo, y que no tiene efecto retroactivo | 🟡 | Sección 7.1 |
| G10 | **Cambios al aviso** | Publicación en el sitio | Para una finalidad nueva hay que volver a pedir consentimiento | 🟠 | Sección 10 |
| G11 | **Cookies** | Dice "no usamos cookies" y luego "desactivar algunas cookies puede afectar la funcionalidad" | Se contradice consigo misma | 🟡 | Sección 5, sin el párrafo sobrante |
| G12 | **"Base legal"** | Sección 5 con categorías del RGPD europeo | La ley mexicana no la exige y confunde con "finalidades" | 🟡 | Se integra en la sección 3 |

### 2.2 Tratamientos nuevos

| # | Tratamiento | Hoy | Qué falta | Nivel |
|---|---|---|---|---|
| T1 | **Documentos de tesis** (artículos, notas, borradores, datos de investigación) | No aparece | Datos que se tratan, finalidades, proveedor de IA, dónde se guardan, cuánto tiempo y cómo pedir el borrado | 🔴 |
| T2 | **Datos sensibles en tesis** | "No recopilamos datos sensibles salvo…" | Una tesis de salud o de psicología puede traer datos sensibles del tesista o de participantes. Hay que decirlo y pedir **consentimiento expreso y por escrito** (art. 8) antes de recibirlos | 🔴 ⚖️ |
| T3 | **Datos de terceros dentro de la tesis** (entrevistados, pacientes, encuestados) | No aparece | Quién responde de ellos, anonimización y uso limitado a la tesis | 🟠 ⚖️ |
| T4 | **Asistente de WhatsApp de ERVIA** (999 249 8890) | Solo se habla de agentes "en nombre de sus clientes" | ERVIA es **responsable** de su propio asistente y **encargada** cuando opera el de un cliente. Hay que separar los dos casos, decir que es automático y que puedes pedir una persona | 🟠 |
| T5 | **Formulario actualizado** | Faltan "intereses" y "origen" (home o `/tesis`) | Añadir los campos nuevos | 🟠 |
| T6 | **Facturación y pagos** | "Emitir facturas" | Faltan los datos fiscales y de pago que se tratan | 🟠 |

### 2.3 Encargados y datos fuera de México

| Proveedor | ¿En la política actual? | Qué falta |
|---|---|---|
| **Anthropic** (API de Claude) | Sí, para "conversaciones" | Añadir los documentos de tesis, EE. UU., que no entrena con ellos y que los borra en un máximo de 30 días (condiciones comerciales) |
| **Hostinger** (VPS) | Solo "proveedores de nube" | Nombrarlo y decir en qué país está el centro de datos (D4) |
| **Meta** (WhatsApp Cloud API) | No | Los mensajes pasan por Meta, no solo por YCloud |
| **YCloud** | Sí | Decir que está fuera de México |
| **Google** (Workspace, Sheets) | Sí | Añadir los datos del asistente de WhatsApp (CrearLead) |
| **Telegram** | Sí | Bien. Ver la recomendación R4 |
| **Cloudflare** | Solo como analítica | También ve todo el tráfico (proxy y protección): es encargado |
| **Contador** | Sí | Bien |

**Transferencias (art. 35):** ERVIA no comunica datos a terceros para fines propios de esos terceros, salvo a autoridades (art. 36, sin consentimiento). Por eso la v2 trata a todos los proveedores como **encargados** (remisiones) y no añade una casilla de aceptación de transferencias. ⚖️ Conviene confirmarlo, sobre todo con Telegram (ver la sección 5).

### 2.4 Plazos de conservación

| Datos | Hoy | v2 |
|---|---|---|
| Documentos de tesis | No aparece. La FAQ de `/tesis` dice "los borramos **si así lo pides**", que da a entender que si no lo pides se guardan para siempre | Durante el acompañamiento + **máximo 30 días**, incluidas las copias de seguridad (D5). Más tiempo solo por escrito |
| Conversaciones del asistente de WhatsApp de ERVIA | No aparece (los 90 días son para los agentes de clientes) | 12 meses desde el último mensaje (D6) |
| Copias en Anthropic | No aparece | Hasta 30 días |
| El resto | Formulario 12 meses, clientes +3 años, fiscales 5 años, navegación 26 meses | Se mantienen |

---

## 3. Decisiones tomadas (3 nov 2026)

Ya están aplicadas en `politica-de-privacidad-v2.md`, que no tiene marcadores pendientes. El prompt **para** si encuentra alguno.

| # | Decisión | Elegido | Notas |
|---|---|---|---|
| **D1** | Nombre legal del responsable | ELIAS RUIZ VELA | Debe coincidir con el de tus facturas |
| **D2** | Domicilio | Calle Paseo de Salamanca 38, La Toscana, C.P. 77725, Playa del Carmen, Quintana Roo, México | Será público. Si no quieres publicar el de tu casa, una oficina virtual o un coworking con domicilio fiscal resuelve. ⚖️ |
| **D3** | Persona de datos personales | ELIAS RUIZ VELA, con info@ervia.tech | Mismo nombre que el responsable (D1), igual que en el SAT |
| **D4** | País del VPS de Hostinger | Estados Unidos | Si está en EE. UU. o en Europa, el texto ya lo cubre como "fuera de México" |
| **D5** | Plazo de borrado de los documentos de tesis | **30 días** tras terminar, copias de seguridad incluidas | Revisa cuánto guardan los snapshots o respaldos del VPS. Si guardan más, el plazo debe ser mayor o los respaldos deben excluir esos archivos |
| **D6** | Conservación de las conversaciones del asistente de WhatsApp | **12 meses** desde el último mensaje (igual que los leads) | Hoy no existe una purga de `ervia_wa_chat_histories`: hay que crearla (R1) |
| D7 | Tuteo | La v2 usa **tú**, como el resto del sitio | Si prefieres "usted" en lo legal, díselo a Claude Code antes de aplicar |
| D8 | Tribunales | **Playa del Carmen, Quintana Roo** (coincide con el domicilio de D2) | ⚖️ Confirmar con el abogado |
| D9 | Fecha de "Última actualización" | **3 de noviembre de 2026** | Si publicas en producción otro día, cambia la línea 9 de la política antes de la Fase A |

---

## 4. Aviso de privacidad simplificado (art. 16)

Va debajo del botón de envío del formulario (home y `/tesis`), en letra pequeña y con el mismo estilo que el texto legal actual del formulario.

**Formulario de la home:**
> **Aviso de privacidad.** ELIAS RUIZ VELA (ERVIA), con domicilio en Calle Paseo de Salamanca 38, La Toscana, C.P. 77725, Playa del Carmen, Quintana Roo, usará tu nombre, tu contacto, tu giro, lo que te interesa y tu mensaje para responderte y agendar tu diagnóstico. No pedimos datos sensibles. También podremos enviarte novedades; si no quieres, escríbenos a info@ervia.tech. Lee el [aviso completo](/politica-de-privacidad).

**Formulario de `/tesis`** (la misma base y una frase más):
> … Si después nos compartes los documentos de tu tesis, se guardan en un servidor privado de ERVIA en EE. UU., los analizamos con la IA de Claude (Anthropic, también en EE. UU.) y los borramos en un máximo de 30 días al terminar. Lee el [aviso completo](/politica-de-privacidad).

**Asistente de WhatsApp** (no lo cubre este prompt): el primer mensaje del asistente a un número nuevo debería incluir una línea como *"Soy el asistente automático de ERVIA. Tu información se trata según nuestro aviso de privacidad: ervia.tech/politica-de-privacidad"* (R2).

---

## 5. Qué validar con un profesional ⚖️

1. **Identidad y domicilio (D1, D2):** si operas como persona física con actividad empresarial, cómo identificarte y qué domicilio publicar.
2. **Papel de ERVIA con los datos de los participantes de una tesis:** ¿ERVIA es encargada del tesista o responsable propia? ¿El tesista, como persona física, es "responsable" según la ley? Afecta a quién debe tener el consentimiento de los entrevistados y a qué debe decir el contrato.
3. **Consentimiento expreso y por escrito para datos sensibles (art. 8):** qué mecanismo vale (firma autógrafa, firma electrónica simple, casilla y confirmación por correo) y que quede en el **contrato o formato de alta** del servicio de tesis, no en la web.
4. **Encargados frente a transferencias:** confirmar que Anthropic, Google, Hostinger, Meta/YCloud, Cloudflare y Telegram cuentan como encargados (remisiones) y no como transferencias. **Telegram** es el punto débil: sus condiciones para bots no son un contrato de encargo como el DPA de Anthropic o el de Google.
5. **Plazos ARCO:** si los 20 y 15 días son hábiles o naturales (la v2 dice solo "días").
6. **Vigencia del Reglamento de 2011 y de los Lineamientos del Aviso de Privacidad** frente a la ley de 2025, por si hay una adecuación publicada que no se encontró.
7. **Términos del servicio de tesis** (aparte de esta política): autoría, uso de IA, confidencialidad y borrado.

---

## 6. Lo que la política promete y hay que hacer realidad

Una política que promete algo que no se cumple es peor que no decirlo. Antes del primer cliente de tesis:

| # | Qué | Por qué | Cuándo |
|---|---|---|---|
| R1 | Purga automática de `ervia_wa_chat_histories` y de las filas de la hoja "Leads ERVIA" con más de 12 meses (workflow programado en n8n) | La v2 promete 12 meses (D6) | Antes de publicar, o en la misma semana |
| R2 | Línea de aviso en el primer mensaje del asistente de WhatsApp | Art. 16 (recogida electrónica) | Próximo cambio del prompt del agente |
| R3 | Doc de conocimiento del asistente y FAQ de privacidad de tesis: cambiar "si así lo pides" por "en un máximo de 30 días, o antes si lo pides" | Coherencia con la web (el prompt cambia la FAQ de `/tesis`) | Justo después de publicar |
| R4 | Mensajes de Telegram con **datos mínimos** (nombre + "nuevo lead" + enlace a la hoja), sin el mensaje completo | Reduce lo que sale a un proveedor sin contrato de encargo | Cuando toques "ERVIA Web - Leads" |
| R5 | Asistente privado de tesis: un espacio **separado por tesista**, clave de API **comercial** (Console) y PDF enviados en el mensaje (no por la Files API, que conserva archivos) | La v2 promete "no se mezclan" y "30 días en Anthropic" | Al montar el producto |
| R6 | Procedimiento de borrado al terminar una tesis (VPS + respaldos + hoja) y un correo de confirmación | La v2 promete confirmarlo por escrito | Al montar el producto |
| R7 | Formato de alta del servicio de tesis con el consentimiento para datos sensibles y la aceptación de la política | Art. 8 | Antes del primer cliente |

---

## Fuentes

- [LFPDPPP 2025, texto de la ley (Orden Jurídico Nacional)](https://www.ordenjuridico.gob.mx/Documentos/Federal/html/wo125102.html)
- [CDP: resumen de la LFPDPPP vigente (art. 15, art. 16 y estado del Reglamento)](https://cdp.com/es/basics/international-u-s-data-privacy-laws-and-regulations-you-need-to-know/)
- [IDC Online: ajustes en el aviso de privacidad con la nueva ley (art. 35, transferencias)](https://idconline.mx/corporativo/2025/03/31/ajustes-en-el-aviso-de-privacidad-con-la-ley-de-proteccion-de-datos)
- [Basham: principales cambios de la nueva LFPDPPP](https://basham.com.mx/en/nueva-ley-federal-de-proteccion-de-datos-personales-en-posesion-de-los-particulares-publicada-en-el-diario-oficial-de-la-federacion/)
- [Reglamento de la LFPDPPP, art. 53 (remisiones)](https://mley.mx/Reg_LFPDPPP/articulo/53/)
- [Anthropic: conservación de datos en productos comerciales y API](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organizations-data)
- [Meta: almacenamiento local de WhatsApp Cloud API](https://developers.facebook.com/documentation/business-messaging/whatsapp/local-storage/)

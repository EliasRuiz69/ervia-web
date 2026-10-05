import { SEO, SITE, WHATSAPP_ENABLED, WHATSAPP_NUMBER } from "@/config/site";
import { FAQ_ITEMS } from "@/content/faq";
import { METHOD_STEPS } from "@/content/method-steps";
import { ESCALAR_ALL_INCLUDED } from "@/content/pricing";
import { endSentence } from "@/lib/text";

/**
 * /llms.txt (llmstxt.org, GEO): resumen de ERVIA para asistentes de IA. Se genera en el build con las mismas
 * constantes que la página, así que no diverge de lo visible. Sin cifras de precios ni casos inventados.
 */
export const dynamic = "force-static";

function build(): string {
  const lines: string[] = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.name} es una agencia de automatización con IA para pymes de México, con sede en Mérida, Yucatán. ${SEO.description}`,
    "",
    "## Qué hace ERVIA",
    "",
    "- Agente de IA que atiende, cotiza y agenda citas por WhatsApp, con el mismo número del negocio.",
    "- Agenda conectada al horario real, con confirmaciones y recordatorios automáticos.",
    "- Panel de control propio y resumen mensual de mensajes atendidos y citas agendadas.",
    "- Automatización de tareas repetitivas: respuestas frecuentes, captura de datos, reportes y documentos.",
    "",
    "## Método ERVIA",
    "",
    SEO.methodDefinition,
    "",
    ...METHOD_STEPS.map(
      (s) => `${s.n}. **${s.name}** (${s.time}): ${s.promise}. ${endSentence(s.what)} Te llevas: ${s.gets}.`,
    ),
    "",
    "Cómo empezar: Detectar es gratis. Automatizar y Escalar se cotizan tras el diagnóstico gratuito.",
    `Escalar: ${ESCALAR_ALL_INCLUDED}`,
    "",
    "## Preguntas frecuentes",
    "",
    ...FAQ_ITEMS.map((f) => `- **${f.question}** ${f.answer}`),
    "",
    "## Zona de servicio",
    "",
    "Sede en Mérida, Yucatán. Atendemos a pymes de todo México.",
    "",
    "## Contacto",
    "",
    `- Sitio web: ${SITE.url}/`,
    `- Correo: ${SITE.email}`,
    ...(WHATSAPP_ENABLED ? [`- WhatsApp: ${SEO.telephone} (https://wa.me/${WHATSAPP_NUMBER})`] : []),
    "",
    "## Páginas",
    "",
    `- [Inicio](${SITE.url}/): servicios, método, cómo empezar y preguntas frecuentes`,
    `- [Política de Privacidad](${SITE.url}/politica-de-privacidad)`,
    `- [Política de Cookies](${SITE.url}/politica-de-cookies)`,
    "",
  ];
  return lines.join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

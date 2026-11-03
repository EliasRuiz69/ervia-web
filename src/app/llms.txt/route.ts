import { BLOQUES, serviciosDeBloque } from "@/config/services";
import { SEO, SITE, WHATSAPP_ENABLED, WHATSAPP_NUMBER } from "@/config/site";
import { TESIS_CARDS, TESIS_LIMITES, TESIS_PAGE_ENABLED, TESIS_PATH, TESIS_SEO } from "@/config/tesis";
import { FAQ_ITEMS } from "@/content/faq";
import { HOW_STEPS } from "@/content/how-we-work";
import { METHOD_STEPS } from "@/content/method-steps";

/**
 * /llms.txt (llmstxt.org, GEO): resumen de ERVIA para asistentes de IA. Se genera en el build con las mismas
 * constantes que la página (SERVICES, HOW_STEPS, FAQ_ITEMS, TESIS_*), así que no diverge de lo visible. Sin cifras
 * de precios ni casos inventados.
 */
export const dynamic = "force-static";

/** Espacio duro → espacio normal (en texto plano no aporta nada). */
const plain = (text: string) => text.replace(/ /g, " ");

/** Minúscula inicial solo (no toca siglas como "IA"). */
const lower = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

function build(): string {
  const lines: string[] = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.name} es una agencia de IA y automatización para pymes de México, con sede en Mérida, Yucatán. ${SEO.description}`,
    "",
    "## Servicios",
    "",
    "Se organizan por resultado. Ninguno tiene precio publicado: todo se cotiza tras el diagnóstico gratuito de 15 minutos.",
    "",
    ...BLOQUES.flatMap((b) => [
      `### ${b.titulo}`,
      "",
      ...serviciosDeBloque(b.id).map(
        (s) => `- **${s.nombre}**${s.nombreTecnico ? ` (${s.nombreTecnico})` : ""}: ${s.promesa}`,
      ),
      "",
    ]),
    "## Método ERVIA",
    "",
    plain(SEO.methodDefinition),
    "",
    ...METHOD_STEPS.map((s) => {
      const how = HOW_STEPS.find((h) => h.n === s.n)!;
      return `${s.n}. **${s.name}**: ${plain(how.text)} ${how.price}.`;
    }),
    "",
    "## Preguntas frecuentes",
    "",
    ...FAQ_ITEMS.map((f) => `- **${f.question}** ${f.answer}`),
    "",
    ...(TESIS_PAGE_ENABLED
      ? [
          "## Acompañamiento de tesis con IA",
          "",
          `Servicio para estudiantes e investigadores (licenciatura, maestría y doctorado): ${TESIS_SEO.description}`,
          "",
          "Regla del servicio: el autor es siempre el tesista. ERVIA acompaña con herramientas de IA, pero no escribe la tesis por la persona.",
          "",
          ...TESIS_CARDS.map((c) => `- **${c.nombre}**: ${c.promesa}`),
          "",
          `Lo que hacemos: ${TESIS_LIMITES.si.items.map(lower).join(", ")}.`,
          `Lo que no hacemos: ${TESIS_LIMITES.no.items.map(lower).join("; ")}.`,
          "",
          `Página del servicio: ${SITE.url}${TESIS_PATH}`,
          "",
        ]
      : []),
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
    `- [Inicio](${SITE.url}/): servicios, cómo trabajamos y preguntas frecuentes`,
    ...(TESIS_PAGE_ENABLED
      ? [`- [Acompañamiento de tesis](${SITE.url}${TESIS_PATH}): ordenar fuentes, verificar citas y dar formato a la norma; el autor es el tesista`]
      : []),
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

import fs from "node:fs";
import path from "node:path";

export type LegalSlug = "politica-de-privacidad" | "politica-de-cookies";

export type LegalDoc = {
  /**
   * "legacy": formato original (recuadro de introducción, índice "Contenido", ids s1…sN), lo usa /politica-de-cookies.
   * "v2": Política de Privacidad v2 (sin índice, introducción en texto corrido, ids de sección = slug del título).
   */
  format: "legacy" | "v2";
  title: string;
  /** "Última actualización: … · ervia.tech" */
  updated: string;
  /** Markdown de la introducción: recuadro destacado (legacy) o texto corrido (v2). */
  intro: string;
  toc: { num: string; label: string; id: string }[];
  /** Markdown del cuerpo (desde la sección 1, o desde el primer "##" en v2). */
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "legal");

/** Comentarios HTML (<!-- … -->) de los .md: son notas de edición, no se publican. */
const stripComments = (md: string) => md.replace(/<!--[\s\S]*?-->\s*/g, "");

/**
 * Lee src/content/legal/<slug>.md y lo separa en título, fecha, intro, índice y cuerpo.
 * Legacy: el índice se genera desde los enlaces "[01 Título](#s1)" del propio Markdown.
 * v2 (el .md no trae "## Contenido"): título, fecha, introducción y cuerpo; el cuerpo termina con "↑ Volver al inicio".
 */
export function loadLegalDoc(slug: LegalSlug): LegalDoc {
  const raw = stripComments(fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf8").replace(/\r\n/g, "\n"));

  const title = raw.match(/^# (.+)$/m)?.[1]?.trim();
  if (!title) throw new Error(`Formato inesperado en ${slug}.md`);

  const contentIdx = raw.indexOf("\n## Contenido");
  if (contentIdx < 0) return parseV2(slug, raw, title);

  const updated = raw.match(/^_(.+)_$/m)?.[1]?.trim();
  const introMatch = raw.match(/^((?:> .*\n?)+)/m);
  const bodyIdx = raw.search(/\n## 1\. /);

  if (!updated || !introMatch || bodyIdx < 0) {
    throw new Error(`Formato inesperado en ${slug}.md`);
  }

  const intro = introMatch[1].replace(/^> ?/gm, "").trim();

  const toc = [...raw.slice(contentIdx, bodyIdx).matchAll(/\[(\d+)\s+(.+?)\]\(#(s\d+)\)/g)].map(
    (m) => ({ num: m[1], label: m[2], id: m[3] }),
  );

  return { format: "legacy", title, updated, intro, toc, body: raw.slice(bodyIdx).trim() };
}

/** Formato v2: "# Título", línea de fecha, párrafo(s) de introducción y luego las secciones "## …". */
function parseV2(slug: LegalSlug, raw: string, title: string): LegalDoc {
  const titleEnd = raw.indexOf("\n", raw.search(/^# /m));
  const firstSection = raw.search(/\n## /);
  if (firstSection < 0) throw new Error(`Formato inesperado en ${slug}.md`);

  const [updated, ...intro] = raw.slice(titleEnd, firstSection).trim().split(/\n{2,}/);
  if (!updated) throw new Error(`Formato inesperado en ${slug}.md`);

  return {
    format: "v2",
    title,
    updated: updated.trim(),
    intro: intro.join("\n\n").trim(),
    toc: [],
    body: `${raw.slice(firstSection).trim()}\n\n[↑ Volver al inicio](#top)`,
  };
}

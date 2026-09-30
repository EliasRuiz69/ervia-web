import fs from "node:fs";
import path from "node:path";

export type LegalSlug = "politica-de-privacidad" | "politica-de-cookies";

export type LegalDoc = {
  title: string;
  /** "Última actualización: … · ervia.tech" */
  updated: string;
  /** Markdown del recuadro introductorio (blockquote sin el ">"). */
  intro: string;
  toc: { num: string; label: string; id: string }[];
  /** Markdown del cuerpo (desde la sección 1). */
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "legal");

/**
 * Lee src/content/legal/<slug>.md y lo separa en título, fecha, intro, índice y cuerpo.
 * El índice se genera desde los enlaces "[01 Título](#s1)" del propio Markdown.
 */
export function loadLegalDoc(slug: LegalSlug): LegalDoc {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf8").replace(/\r\n/g, "\n");

  const title = raw.match(/^# (.+)$/m)?.[1]?.trim();
  const updated = raw.match(/^_(.+)_$/m)?.[1]?.trim();
  const introMatch = raw.match(/^((?:> .*\n?)+)/m);
  const contentIdx = raw.indexOf("\n## Contenido");
  const bodyIdx = raw.search(/\n## 1\. /);

  if (!title || !updated || !introMatch || contentIdx < 0 || bodyIdx < 0) {
    throw new Error(`Formato inesperado en ${slug}.md`);
  }

  const intro = introMatch[1].replace(/^> ?/gm, "").trim();

  const toc = [...raw.slice(contentIdx, bodyIdx).matchAll(/\[(\d+)\s+(.+?)\]\(#(s\d+)\)/g)].map(
    (m) => ({ num: m[1], label: m[2], id: m[3] }),
  );

  return { title, updated, intro, toc, body: raw.slice(bodyIdx).trim() };
}

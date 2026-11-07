// Paso posterior a `next build` (lo encadena `pnpm build`): calcula los hashes SHA-256 de los scripts y estilos
// EN LÍNEA del HTML prerenderizado y los escribe en la Content-Security-Policy de .next/routes-manifest.json
// (donde `next start` lee las cabeceras). Así la CSP no necesita 'unsafe-inline' ni nonce, y las páginas
// siguen siendo estáticas.
//
// REGLA: ante CUALQUIER problema este script termina con código 1 y un mensaje claro, para que el build falle
// (p. ej. en Dokploy) en lugar de publicar una web con scripts bloqueados. Casos que detienen el build:
//   - no existe .next/ o no hay HTML prerenderizado;
//   - no se puede leer un HTML o routes-manifest.json, o éste no es JSON válido;
//   - no se encuentra ningún script en línea, o algún hash sale mal formado;
//   - la CSP del manifiesto falta o no contiene los marcadores esperados (o queda alguno sin sustituir);
//   - no se puede escribir routes-manifest.json;
//   - tras escribir, la CSP releída no contiene TODOS los hashes calculados.
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const TAG = "[csp-hashes]";
const NEXT_DIR = path.join(process.cwd(), ".next");
const APP_DIR = path.join(NEXT_DIR, "server", "app");
const MANIFEST = path.join(NEXT_DIR, "routes-manifest.json");
const SCRIPT_MARKER = "__CSP_SCRIPT_HASHES__";
const STYLE_MARKER = "__CSP_STYLE_HASHES__";
const BF_STYLE_MARKER = "__CSP_BF_STYLE_HASHES__";
const BF_FILE = path.join(process.cwd(), "public", "business-friends", "index.html");
const HASH_FORMAT = /^'sha256-[A-Za-z0-9+/]{43}='$/;

function fail(message) {
  console.error(`${TAG} ERROR: ${message}`);
  console.error(`${TAG} Se detiene el build para no publicar una web con scripts bloqueados por la CSP.`);
  process.exit(1);
}

/** Ejecuta `fn`; si lanza, detiene el build con `what` y el motivo. */
function attempt(what, fn) {
  try {
    return fn();
  } catch (error) {
    return fail(`${what}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function sha256(text) {
  const hash = `'sha256-${createHash("sha256").update(text, "utf8").digest("base64")}'`;
  if (!HASH_FORMAT.test(hash)) fail(`hash mal formado (${hash})`);
  return hash;
}

function inlineBlocks(html, tag, skip) {
  const re = new RegExp(`<${tag}([^>]*)>([\\s\\S]*?)</${tag}>`, "g");
  return [...html.matchAll(re)]
    .filter(([, attrs]) => !skip(attrs))
    .map(([, , body]) => body)
    .filter((body) => body.length > 0);
}

if (!existsSync(NEXT_DIR) || !existsSync(APP_DIR)) {
  fail("no existe .next/server/app: ejecuta `next build` antes (usa `pnpm build`, que encadena los dos pasos).");
}
const pages = attempt("no se pudo listar el HTML prerenderizado", () =>
  readdirSync(APP_DIR).filter((f) => f.endsWith(".html")),
);
if (pages.length === 0) fail("no hay HTML prerenderizado en .next/server/app (¿cambió la estructura del build?).");

const scripts = new Set();
const styles = new Set();
for (const file of pages) {
  const html = attempt(`no se pudo leer ${file}`, () => readFileSync(path.join(APP_DIR, file), "utf8"));
  // Scripts en línea que el navegador EJECUTA: sin src y que no sean datos (el JSON-LD no se ejecuta).
  const skipScript = (attrs) => /\bsrc=/.test(attrs) || /type="application\/(ld\+)?json"/.test(attrs);
  for (const body of inlineBlocks(html, "script", skipScript)) scripts.add(sha256(body));
  for (const body of inlineBlocks(html, "style", () => false)) styles.add(sha256(body));
}
if (scripts.size === 0) fail("no se encontró ningún script en línea en el HTML: no es normal en una app Next.js.");

const manifest = attempt("no se pudo leer o interpretar .next/routes-manifest.json", () =>
  JSON.parse(readFileSync(MANIFEST, "utf8")),
);

// Página estática /business-friends (public/business-friends/index.html): tiene su propia CSP, sin scripts, y el hash
// de su <style> se calcula aquí del archivo real, en cada build. NO se escribe a mano en next.config.ts.
// El navegador calcula el hash sobre el texto YA normalizado por el analizador de HTML (CRLF y CR sueltos pasan a LF),
// así que se normaliza igual: da el mismo hash aunque el archivo se sirva con CRLF o con LF.
const bfHtml = attempt(`no se pudo leer ${BF_FILE}`, () => readFileSync(BF_FILE, "utf8"));
const bfStyles = new Set(
  inlineBlocks(bfHtml, "style", () => false).map((body) => sha256(body.replace(/\r\n?/g, "\n"))),
);
if (bfStyles.size === 0) fail(`no se encontró ningún <style> en línea en ${BF_FILE}: su CSP no tendría con qué cargar los estilos.`);
// La CSP de esa página solo admite 'self': un script en línea o un atributo style="" quedarían bloqueados sin avisar.
if (inlineBlocks(bfHtml, "script", (attrs) => /\bsrc=/.test(attrs) || /type="application\/(ld\+)?json"/.test(attrs)).length > 0) {
  fail(`${BF_FILE} tiene un script en línea y su CSP no lo permite (script-src 'self').`);
}
if (/<[^>]+\sstyle\s*=/i.test(bfHtml)) {
  fail(`${BF_FILE} usa atributos style="" y su CSP no los permite (sin 'unsafe-inline').`);
}

let patched = 0;
let patchedBf = 0;
for (const rule of manifest.headers ?? []) {
  for (const header of rule.headers ?? []) {
    if (header.key !== "Content-Security-Policy") continue;
    if (header.value.includes(BF_STYLE_MARKER)) {
      header.value = header.value.replace(BF_STYLE_MARKER, [...bfStyles].join(" "));
      if (header.value.includes("__CSP_")) fail("quedó algún marcador __CSP_ sin sustituir en la CSP de /business-friends.");
      patchedBf++;
      continue;
    }
    if (!header.value.includes(SCRIPT_MARKER) || !header.value.includes(STYLE_MARKER)) {
      fail(
        `la CSP del manifiesto no contiene los marcadores ${SCRIPT_MARKER} y ${STYLE_MARKER}. ` +
          "¿Se renombraron en next.config.ts o ya se había ejecutado este paso sobre este build?",
      );
    }
    header.value = header.value
      .replace(SCRIPT_MARKER, [...scripts].join(" "))
      .replace(` ${STYLE_MARKER}`, styles.size ? ` ${[...styles].join(" ")}` : "");
    if (header.value.includes("__CSP_")) fail("quedó algún marcador __CSP_ sin sustituir en la CSP.");
    patched++;
  }
}
if (patched === 0) {
  fail("no hay ninguna cabecera Content-Security-Policy en routes-manifest.json (¿se construyó con NODE_ENV=production?).");
}
if (patchedBf === 0) {
  fail("no hay ninguna CSP de /business-friends en routes-manifest.json (¿se quitó su regla de next.config.ts?).");
}

attempt("no se pudo escribir .next/routes-manifest.json", () => writeFileSync(MANIFEST, JSON.stringify(manifest)));

// Comprobación final: se relee el archivo y se exige que la CSP contenga TODOS los hashes calculados.
const written = attempt("no se pudo releer .next/routes-manifest.json tras escribirlo", () =>
  JSON.parse(readFileSync(MANIFEST, "utf8")),
);
const csps = (written.headers ?? []).flatMap((rule) =>
  (rule.headers ?? [])
    .filter((h) => h.key === "Content-Security-Policy")
    .map((h) => ({ value: h.value, isBf: rule.source.startsWith("/business-friends") })),
);
if (csps.length === 0) fail("tras escribir, el manifiesto no contiene la cabecera Content-Security-Policy.");
for (const { value, isBf } of csps) {
  if (value.includes("__CSP_")) fail("tras escribir, queda algún marcador __CSP_ en una CSP.");
  const missing = (isBf ? [...bfStyles] : [...scripts]).filter((hash) => !value.includes(hash));
  if (missing.length > 0) fail(`tras escribir, a la CSP${isBf ? " de /business-friends" : ""} le faltan ${missing.length} hash(es).`);
}

console.log(
  `${TAG} CSP actualizada y verificada: ${scripts.size} hashes de script y ${styles.size} de estilo (${pages.length} páginas HTML); ` +
    `/business-friends: ${bfStyles.size} de estilo.`,
);

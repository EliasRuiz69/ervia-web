// Genera los iconos de la web a partir del isotipo (public/brand/ervia-mark.svg):
//   src/app/icon.svg        (favicon vectorial, fondo transparente)
//   src/app/favicon.ico     (16, 32 y 48 px, PNG embebidos)
//   src/app/apple-icon.png  (180×180, fondo navy y margen interior)
//
// Uso: pnpm brand:icons
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const NAVY = "#0F172A"; // --navy-900
const BLUE = "#3166F4"; // --blue-500

const mark = fs.readFileSync(path.join(ROOT, "public/brand/ervia-mark.svg"), "utf8");
const vb = mark.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
const W = Number(vb[1]), H = Number(vb[2]);
const inner = mark
  .replace(/^<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "")
  .replace(/<title>.*?<\/title>/, "");

/**
 * Isotipo centrado en un lienzo cuadrado.
 * `pad`: margen como fracción del lienzo. `boldLinks`: engrosa los conectores para tamaños pequeños
 * (a 16 px los conectores originales miden < 1 px y desaparecerían).
 */
function squareSvg({ size = 256, pad = 0.06, bg = null, radius = 0, boldLinks = 0 }) {
  const side = size * (1 - 2 * pad);
  const k = Math.min(side / W, side / H);
  const tx = (size - W * k) / 2, ty = (size - H * k) / 2;
  const body = boldLinks
    ? inner.replace(/<path d=/g, `<path stroke="${BLUE}" stroke-width="${boldLinks}" stroke-linejoin="round" d=`)
    : inner;
  const bgRect = bg ? `<rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" fill="${BLUE}">${bgRect}<g transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${k.toFixed(5)})">${body}</g></svg>`;
}

const png = (svg, px) => sharp(Buffer.from(svg), { density: 384 }).resize(px, px).png().toBuffer();

// --- icon.svg: vectorial, un poco más grueso el enlace para que se lea a 16–32 px
const iconSvg = squareSvg({ size: 64, pad: 0.04, boldLinks: 3 });
fs.writeFileSync(path.join(ROOT, "src/app/icon.svg"), iconSvg);

// --- favicon.ico con PNG embebidos (formato ICO válido en todos los navegadores actuales)
const sizes = [16, 32, 48];
const bold = { 16: 7, 32: 5, 48: 4 }; // unidades del viewBox del isotipo
const pngs = [];
for (const s of sizes) {
  pngs.push(await png(squareSvg({ size: 256, pad: 0.03, boldLinks: bold[s] * 1.0 }), s));
}
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length;
const entries = pngs.map((buf, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], 0); e.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], 1);
  e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(buf.length, 8); e.writeUInt32LE(offset, 12);
  offset += buf.length;
  return e;
});
fs.writeFileSync(path.join(ROOT, "src/app/favicon.ico"), Buffer.concat([header, ...entries, ...pngs]));

// --- apple-icon.png: 180×180, fondo navy (iOS aplica su propia máscara redondeada; no se recorta aquí)
const apple = await png(squareSvg({ size: 512, pad: 0.2, bg: NAVY, radius: 0, boldLinks: 3 }), 180);
fs.writeFileSync(path.join(ROOT, "src/app/apple-icon.png"), apple);

console.log("icon.svg", fs.statSync(path.join(ROOT, "src/app/icon.svg")).size, "B");
console.log("favicon.ico", fs.statSync(path.join(ROOT, "src/app/favicon.ico")).size, "B", sizes.join("/"));
console.log("apple-icon.png", apple.length, "B 180x180");

// --- Logo horizontal en PNG para la imagen de Open Graph (src/app/opengraph-image.tsx).
// Se rasteriza AQUÍ, una vez, y se versiona: así el build no tiene que rasterizar SVG (una vez falló con
// "svgload_buffer: SVG rendering failed" al hacerlo dentro de `next build`). Alto 208 px = 4x el de 52 px del OG.
const logoSvg = fs.readFileSync(path.join(ROOT, "public/brand/ervia-logo-horizontal-on-dark.svg"));
const logoPng = await sharp(logoSvg, { density: 384 }).resize({ height: 208 }).png().toBuffer();
fs.mkdirSync(path.join(ROOT, "src/assets"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "src/assets/ervia-logo-og.png"), logoPng);
console.log("src/assets/ervia-logo-og.png", logoPng.length, "B");

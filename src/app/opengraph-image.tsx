import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

/**
 * Imagen para compartir (Open Graph y Twitter), 1200×630: fondo navy-900, titular del hero, diagrama del
 * Método ERVIA y logo. Se genera UNA vez en el build (no hay APIs dinámicas). Colores = tokens de
 * docs/design-base/tokens.css (Satori no lee variables CSS, por eso van como valores). Una sola palabra
 * en verde (regla D-J); el diagrama, en azul.
 */
export const alt =
  "ERVIA: tu WhatsApp atiende, cotiza y agenda citas solo. Método ERVIA: Detectar, Automatizar, Escalar.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY_900 = "#0F172A";
const BLUE_500 = "#3166F4";
const BLUE_400 = "#5680F6";
const GREEN_500 = "#07F991";
const TEXT_STRONG = "#F8FAFC";
const TEXT_MUTED = "#8294AC";

const HEADLINE = "Tu WhatsApp atiende, cotiza y agenda citas solo. Tú te dedicas a tu negocio.";
const ACCENT_WORD = "solo.";

/** Nodos del diagrama: crecen y suben de izquierda a derecha, como en la sección del método. */
const NODES = [
  { n: 1, label: "Detectar", cx: 160, cy: 116, r: 28 },
  { n: 2, label: "Automatizar", cx: 536, cy: 90, r: 34 },
  { n: 3, label: "Escalar", cx: 912, cy: 62, r: 40 },
] as const;

const LINKS = ["M190 114 Q364 128 502 93", "M572 87 Q742 96 872 65"];

const fontFile = (pkg: string, file: string) =>
  readFile(path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

export default async function Image() {
  // El logo va como PNG (src/assets/ervia-logo-og.png, generado con `pnpm brand:icons` a partir del SVG): así el
  // build no rasteriza SVG, que una vez falló de forma intermitente ("svgload_buffer: SVG rendering failed").
  const [baloo, dmSans, logoPng] = await Promise.all([
    fontFile("baloo-2", "baloo-2-latin-700-normal.woff"),
    fontFile("dm-sans", "dm-sans-latin-600-normal.woff"),
    readFile(path.join(process.cwd(), "src", "assets", "ervia-logo-og.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logoPng.toString("base64")}`;
  const logoHeight = 52;
  const logoWidth = Math.round((logoHeight * 814) / 208); // proporción del PNG (814×208)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "52px 64px",
          background: NAVY_900,
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(49,102,244,0.28), rgba(49,102,244,0) 55%)",
          fontFamily: "DM Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og (Satori) no usa next/image */}
          <img src={logoSrc} width={logoWidth} height={logoHeight} alt="" />
          <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: TEXT_MUTED }}>
            www.ervia.tech
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 30,
            maxWidth: 1072,
            fontFamily: "Baloo 2",
            fontWeight: 700,
            fontSize: 60,
            lineHeight: 1.1,
          }}
        >
          {HEADLINE.split(" ").map((word, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                marginRight: 16,
                color: word === ACCENT_WORD ? GREEN_500 : TEXT_STRONG,
              }}
            >
              {word}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 3,
            color: BLUE_400,
          }}
        >
          MÉTODO ERVIA
        </div>

        <div style={{ display: "flex", position: "relative", width: 1072, height: 192, marginTop: 6 }}>
          <svg
            width={1072}
            height={192}
            viewBox="0 0 1072 192"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {LINKS.map((d) => (
              <path
                key={d}
                d={d}
                fill="none"
                stroke={BLUE_500}
                strokeOpacity={0.8}
                strokeWidth={5}
                strokeLinecap="round"
              />
            ))}
          </svg>
          {NODES.map(({ n, label, cx, cy, r }) => (
            <div key={n} style={{ display: "flex" }}>
              <div
                style={{
                  position: "absolute",
                  left: cx - r,
                  top: cy - r,
                  width: r * 2,
                  height: r * 2,
                  borderRadius: r,
                  background: BLUE_500,
                  color: TEXT_STRONG,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Baloo 2",
                  fontWeight: 700,
                  fontSize: 22 + n * 4,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: cx - 130,
                  top: cy + r + 8,
                  width: 260,
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 28,
                  fontWeight: 600,
                  color: TEXT_STRONG,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Baloo 2", data: baloo, weight: 700, style: "normal" },
        { name: "DM Sans", data: dmSans, weight: 600, style: "normal" },
      ],
    },
  );
}

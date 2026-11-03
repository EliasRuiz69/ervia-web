import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

/**
 * Imagen para compartir de /tesis (Open Graph y Twitter), 1200×630: fondo navy-900, eyebrow, H1 de /tesis y la
 * regla de confianza "Tú sigues siendo el autor". Misma construcción que la de la home (src/app/opengraph-image.tsx):
 * se genera UNA vez en el build, colores = tokens (Satori no lee variables CSS) y una sola frase en verde.
 */
export const alt =
  "ERVIA: tienes la información, te ayudamos a convertirla en tu tesis. Acompañamiento de tesis con IA; tú sigues siendo el autor.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY_900 = "#0F172A";
const BLUE_500 = "#3166F4";
const BLUE_400 = "#5680F6";
const GREEN_500 = "#07F991";
const TEXT_STRONG = "#F8FAFC";
const TEXT_MUTED = "#8294AC";

/** H1 de /tesis (plan 3.9, opción A): el verde va en "tu tesis." */
const H1_WORDS = ["Tienes", "la", "información.", "Te", "ayudamos", "a", "convertirla", "en", "tu", "tesis."];
const ACCENT_WORDS = new Set(["tu", "tesis."]);

const fontFile = (pkg: string, file: string) =>
  readFile(path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

export default async function Image() {
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
            www.ervia.tech/tesis
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 3,
            color: BLUE_400,
          }}
        >
          ACOMPAÑAMIENTO DE TESIS CON IA
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 22,
            maxWidth: 1040,
            fontFamily: "Baloo 2",
            fontWeight: 700,
            fontSize: 78,
            lineHeight: 1.08,
          }}
        >
          {H1_WORDS.map((word, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                marginRight: 20,
                color: ACCENT_WORDS.has(word) ? GREEN_500 : TEXT_STRONG,
              }}
            >
              {word}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", marginTop: "auto", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              padding: "12px 26px",
              borderRadius: 999,
              border: `2px solid ${BLUE_500}`,
              fontSize: 28,
              fontWeight: 600,
              color: TEXT_STRONG,
            }}
          >
            Tú sigues siendo el autor
          </div>
          <div style={{ display: "flex", marginLeft: 22, fontSize: 26, fontWeight: 600, color: TEXT_MUTED }}>
            Diagnóstico gratis de 15 minutos
          </div>
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

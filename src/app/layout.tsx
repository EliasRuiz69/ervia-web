import type { Metadata, Viewport } from "next";
import { Baloo_2, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE } from "@/config/site";
import { IS_STAGING } from "@/lib/env";

// next/font descarga y aloja las fuentes en el build: sin peticiones a Google en el navegador.
// Pesos y ejes tomados de docs/design-base.md: Baloo 2 solo 700; DM Sans 400/500/600 (+ cursiva 400).
const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-baloo-2",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-dm-sans",
});

// La cursiva (texto "Cómo lo logramos", G3) NO se precarga: así no compite con el H1 por el ancho de banda (LCP).
const dmSansItalic = DM_Sans({
  subsets: ["latin"],
  style: "italic",
  axes: ["opsz"],
  display: "swap",
  preload: false,
  variable: "--font-dm-sans-italic",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline} | Mérida`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "ERVIA automatiza con IA los procesos y la atención al cliente de pymes en México. Hecho en Mérida.",
  // Staging: <meta name="robots" content="noindex,nofollow"> en todas las páginas.
  other: IS_STAGING ? { robots: "noindex,nofollow" } : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F172A", // --navy-900 (surface-page)
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-MX"
      className={`${baloo.variable} ${dmSans.variable} ${dmSansItalic.variable} bg-surface-page`}
    >
      <body className="flex min-h-dvh flex-col bg-surface-page">
        <a
          href="#contenido"
          className="sr-only rounded-pill bg-green-500 px-5 py-3 font-semibold text-text-on-green focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

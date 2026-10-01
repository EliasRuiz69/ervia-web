import type { Metadata } from "next";

import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { JsonLd } from "@/components/seo/json-ld";
import { Audience } from "@/components/sections/audience";
import { FinalCta } from "@/components/sections/final-cta";
import { Faq } from "@/components/sections/faq";
import { Gains } from "@/components/sections/gains";
import { Hero } from "@/components/sections/hero";
import { Method } from "@/components/sections/method";
import { Mirror } from "@/components/sections/mirror";
import { Pricing } from "@/components/sections/pricing";
import { TrustBar } from "@/components/sections/trust-bar";
import { SEO, SITE } from "@/config/site";
import { homeStructuredData } from "@/lib/structured-data";

/**
 * Canonical y URL de Open Graph de la home (el layout no los fija para que no se hereden a las demás páginas).
 * Next.js normaliza la raíz y emite "https://www.ervia.tech" sin la barra final; es la misma URL (la ruta "/"
 * está implícita), así que para buscadores y redes sociales equivale a "https://www.ervia.tech/".
 */
export const metadata: Metadata = {
  alternates: { canonical: `${SITE.url}/` },
  openGraph: {
    url: `${SITE.url}/`,
    type: "website",
    locale: "es_MX",
    siteName: "ERVIA",
    title: SEO.title,
    description: SEO.description,
  },
};

/**
 * Estructura de la home (auditoría v2, sección 7).
 * v1: CaseStudy (#caso-real) y Founder NO se renderizan; los componentes existen en
 * src/components/sections/ y se añadirán aquí en la v2 (con "Caso real" en el nav).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Mirror />
      <Gains />
      <Method />
      <Audience />
      {/* v2: <CaseStudy /> · <Founder /> */}
      <Pricing />
      <Faq />
      <FinalCta />
      <FloatingWhatsApp />
      <JsonLd data={homeStructuredData()} />
    </>
  );
}

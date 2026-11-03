import type { Metadata } from "next";

import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { JsonLd } from "@/components/seo/json-ld";
import { Connected } from "@/components/sections/connected";
import { FinalCta } from "@/components/sections/final-cta";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Services } from "@/components/sections/services";
import { TesisBand } from "@/components/sections/tesis-band";
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
 * Estructura de la home (plan multiservicio v2, sección 2):
 * Hero → TrustBar → Services → Connected → HowWeWork → TesisBand → Faq → FinalCta.
 * Ya no se renderizan Mirror, Gains, Method, Audience ni Pricing; sus componentes siguen en
 * src/components/sections/ por si se reutilizan (Method y Pricing, dentro de HowWeWork en la Fase 4).
 * CaseStudy (#caso-real) y Founder tampoco se renderizan todavía (G5).
 * Anclas: #inicio, #servicios, #por-que-ervia, #como-trabajamos, #faq, #contacto.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Connected />
      <HowWeWork />
      <TesisBand />
      <Faq />
      <FinalCta />
      <FloatingWhatsApp />
      <JsonLd data={homeStructuredData()} />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { TesisHelp } from "@/components/tesis/tesis-help";
import { TesisHero } from "@/components/tesis/tesis-hero";
import { TesisLimits } from "@/components/tesis/tesis-limits";
import { TesisSteps } from "@/components/tesis/tesis-steps";
import { Accent } from "@/components/ui/section-heading";
import { SITE } from "@/config/site";
import {
  TESIS_CTA,
  TESIS_FAQ,
  TESIS_PAGE_ENABLED,
  TESIS_PATH,
  TESIS_SEO,
  TESIS_WHATSAPP_URL,
} from "@/config/tesis";

/** Título y descripción del plan (3.7). `absolute` evita que el layout añada "| ERVIA" a un título que ya lo lleva. */
export const metadata: Metadata = {
  title: { absolute: TESIS_SEO.title },
  description: TESIS_SEO.description,
  alternates: { canonical: `${SITE.url}${TESIS_PATH}` },
  openGraph: {
    url: `${SITE.url}${TESIS_PATH}`,
    type: "website",
    locale: "es_MX",
    siteName: "ERVIA",
    title: TESIS_SEO.title,
    description: TESIS_SEO.description,
  },
};

/**
 * /tesis (plan multiservicio v2, 3.9). Página estática para otro público (personas, no pymes): Hero → Cómo te
 * ayudamos → Lo que hacemos y lo que no → Cómo trabajamos → FAQ → CTA final con formulario (giro "Soy estudiante
 * o investigador", interés "Mi tesis" y origen "web-tesis"). Mismo sistema de diseño, cabecera y pie; el nav de
 * la cabecera cambia solo en esta ruta (HeaderNav). Con TESIS_PAGE_ENABLED en false la ruta responde 404.
 * SEO completo (JSON-LD, OG propia, sitemap y llms.txt): Fase 5.
 */
export default function TesisPage() {
  if (!TESIS_PAGE_ENABLED) notFound();

  const [antes, destacada, despues] = TESIS_CTA.h2;
  return (
    <>
      <TesisHero />
      <TesisHelp />
      <TesisLimits />
      <TesisSteps />
      <Faq items={TESIS_FAQ} />
      <FinalCta
        heading={
          <>
            {antes}
            <Accent>{destacada}</Accent>
            {despues}
          </>
        }
        subheading={TESIS_CTA.subtitle}
        whatsappHref={TESIS_WHATSAPP_URL}
        whatsappLocation="contact-tesis"
        form={{ defaultGiro: "Soy estudiante o investigador", defaultIntereses: ["tesis"], origen: "web-tesis" }}
      />
      <FloatingWhatsApp href={TESIS_WHATSAPP_URL} />
    </>
  );
}

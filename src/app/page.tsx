import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { Audience } from "@/components/sections/audience";
import { FinalCta } from "@/components/sections/final-cta";
import { Faq } from "@/components/sections/faq";
import { Gains } from "@/components/sections/gains";
import { Hero } from "@/components/sections/hero";
import { Method } from "@/components/sections/method";
import { Mirror } from "@/components/sections/mirror";
import { Pricing } from "@/components/sections/pricing";
import { TrustBar } from "@/components/sections/trust-bar";

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
    </>
  );
}

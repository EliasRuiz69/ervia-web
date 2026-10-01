import { SEO, SITE, WHATSAPP_NUMBER } from "@/config/site";
import { FAQ_ITEMS } from "@/content/faq";
import { METHOD_STEPS } from "@/content/method-steps";

/**
 * Datos estructurados de la home (auditoría 6): ProfessionalService + FAQPage + HowTo del Método ERVIA,
 * en un solo @graph. Los textos salen de las MISMAS constantes que pintan la página (FAQ_ITEMS, METHOD_STEPS,
 * SEO.methodDefinition), así que no pueden divergir de lo visible. No hay cifras ni reseñas inventadas.
 */
const ORG_ID = `${SITE.url}/#organization`;

export function homeStructuredData() {
  const professionalService = {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    description: SEO.description,
    email: SITE.email,
    telephone: SEO.telephone,
    logo: `${SITE.url}/brand/ervia-mark.svg`,
    image: `${SITE.url}/opengraph-image`,
    slogan: SITE.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mérida",
      addressRegion: "Yucatán",
      addressCountry: "MX",
    },
    areaServed: { "@type": "Country", name: "MX" },
    knowsLanguage: "es-MX",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: SEO.telephone,
      email: SITE.email,
      areaServed: "MX",
      availableLanguage: "es",
      url: `https://wa.me/${WHATSAPP_NUMBER}`,
    },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const howTo = {
    "@type": "HowTo",
    "@id": `${SITE.url}/#metodo`,
    name: "Método ERVIA",
    description: SEO.methodDefinition,
    step: METHOD_STEPS.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      // Mismos textos y rótulos que se ven en la tarjeta del paso.
      text: `${step.promise}. Qué hacemos: ${step.what}. Te llevas: ${step.gets}. Tiempo: ${step.time}.`,
      url: `${SITE.url}/#metodo`,
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [professionalService, faqPage, howTo],
  };
}

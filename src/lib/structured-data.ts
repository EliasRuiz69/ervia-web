import { SEO, SITE, WHATSAPP_NUMBER } from "@/config/site";
import { SERVICES } from "@/config/services";
import { TESIS_CARDS, TESIS_FAQ, TESIS_PATH, TESIS_SEO } from "@/config/tesis";
import { FAQ_ITEMS, type FaqItem } from "@/content/faq";
import { HOW_STEPS } from "@/content/how-we-work";
import { METHOD_STEPS } from "@/content/method-steps";

/**
 * Datos estructurados (plan multiservicio v2, 3.7). Todos los textos salen de las MISMAS constantes que pintan la
 * página (SERVICES, FAQ_ITEMS, HOW_STEPS, METHOD_STEPS, SEO.methodDefinition, TESIS_*), así que no pueden divergir
 * de lo visible. Sin cifras de precios ni reseñas inventadas.
 *
 * Home: ProfessionalService (con hasOfferCatalog: un Offer/Service por servicio) + FAQPage + HowTo.
 * /tesis: Service ("Acompañamiento de tesis con IA") + FAQPage.
 */
const ORG_ID = `${SITE.url}/#organization`;

/** Espacio duro → espacio normal: en JSON-LD el texto se ve igual y no arrastra caracteres invisibles. */
const plain = (text: string) => text.replace(/ /g, " ");

const faqPage = (id: string, items: ReadonlyArray<FaqItem>) => ({
  "@type": "FAQPage",
  "@id": id,
  mainEntity: items.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});

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
    // Un Offer por servicio de src/config/services.ts: nombre y descripción (= promesa) iguales a los de la tarjeta.
    // Sin precio: todo es "cotización tras el diagnóstico gratis de 15 minutos" (decisión M3).
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de ERVIA",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${SITE.url}/#servicio-${s.id}`,
          name: s.nombre,
          description: s.promesa,
          url: `${SITE.url}/#servicio-${s.id}`,
          provider: { "@id": ORG_ID },
          areaServed: { "@type": "Country", name: "MX" },
        },
      })),
    },
  };

  // HowTo = la sección "Cómo trabajamos": nombre del paso (METHOD_STEPS) + texto y etiqueta de precio visibles (HOW_STEPS).
  const howTo = {
    "@type": "HowTo",
    "@id": `${SITE.url}/#como-trabajamos`,
    name: "Método ERVIA",
    description: plain(SEO.methodDefinition),
    step: METHOD_STEPS.map((step, i) => {
      const how = HOW_STEPS.find((h) => h.n === step.n)!;
      return {
        "@type": "HowToStep",
        position: i + 1,
        name: step.name,
        text: plain(`${how.text} ${how.price}.`),
        url: `${SITE.url}/#como-trabajamos`,
      };
    }),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [professionalService, faqPage(`${SITE.url}/#faq`, FAQ_ITEMS), howTo],
  };
}

/** /tesis: Service + FAQPage con las 6 preguntas EXACTAS de la página (TESIS_FAQ). */
export function tesisStructuredData() {
  const url = `${SITE.url}${TESIS_PATH}`;
  const service = {
    "@type": "Service",
    "@id": `${url}#servicio`,
    name: "Acompañamiento de tesis con IA",
    serviceType: "Acompañamiento de tesis con IA",
    description: TESIS_SEO.description,
    url,
    provider: { "@type": "ProfessionalService", "@id": ORG_ID, name: SITE.name, url: `${SITE.url}/` },
    areaServed: { "@type": "Country", name: "MX" },
    audience: { "@type": "Audience", audienceType: "Estudiantes e investigadores" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cómo te ayudamos con tu tesis",
      itemListElement: TESIS_CARDS.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.nombre, description: c.promesa },
      })),
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [service, faqPage(`${url}#faq`, TESIS_FAQ)],
  };
}

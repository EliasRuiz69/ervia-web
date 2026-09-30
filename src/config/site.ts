/**
 * Datos del sitio en un solo lugar. Todo lo que aquí no tenga valor real NO se muestra.
 */
export const SITE = {
  name: "ERVIA",
  url: "https://www.ervia.tech",
  locale: "es-MX",
  email: "info@ervia.tech",
  location: "Mérida (México)",
  tagline: "Automatización con IA para pymes",
} as const;

/**
 * Enlaces de ancla de la cabecera (auditoría 7.1).
 * "Caso real" (#caso-real) NO está: se añadirá en la v2 junto con la sección CaseStudy.
 */
export const NAV_LINKS = [
  { href: "/#ganancias", label: "Lo que ganas" },
  { href: "/#metodo", label: "Método" },
  { href: "/#precios", label: "Precios" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const HEADER_CTA = { href: "/#contacto", label: "Diagnóstico gratis" } as const;

/* ------------------------------------------------------------------ *
 * WhatsApp
 * ------------------------------------------------------------------ */

/**
 * Interruptor general. Si es `false` no se muestra NINGÚN botón ni enlace de WhatsApp
 * (cabecera, hero, botón flotante…) y el CTA principal pasa a ser "Agenda tu diagnóstico gratis" → #contacto.
 */
export const WHATSAPP_ENABLED = true;

/** Formato internacional sin "+" (wa.me). Número de ERVIA = 999 249 8890 (D4). JSON-LD: +529992498890. */
export const WHATSAPP_NUMBER = "529992498890";

/** Ubicaciones desde donde se abre WhatsApp; cada una lleva un texto distinto para poder medir el origen. */
export type WhatsAppLocation = "hero" | "nav" | "floating" | "audience" | "contact";

/**
 * Texto precargado por ubicación. Deben seguir siendo DISTINTOS entre sí: así, al llegar el primer
 * mensaje, se sabe desde qué botón escribió el cliente. Se usan hoy: hero, nav, floating y audience;
 * contact (G6) queda listo. Los planes de precios tienen sus propios textos (WHATSAPP_PLAN_MESSAGES).
 */
export const WHATSAPP_MESSAGES: Record<WhatsAppLocation, string> = {
  hero: "Hola, vi su página y quiero que mi WhatsApp atienda solo. ¿Me pueden ayudar?",
  nav: "Hola, quiero información sobre ERVIA.",
  floating: "Hola, me gustaría platicar con ustedes sobre ERVIA.",
  audience: "Hola, mi giro no aparece en su página. Quiero contarles mi caso.",
  contact: "Hola, quiero agendar mi diagnóstico gratis con ERVIA.",
};

/** https://wa.me/<número>?text=<texto precargado> para la ubicación indicada. */
export function whatsappUrl(location: WhatsAppLocation): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGES[location])}`;
}

/** Planes de precios = pasos del Método ERVIA (auditoría 4.9). */
export type PlanId = "detectar" | "automatizar" | "escalar";

/** Texto precargado por plan: distintos entre sí y de WHATSAPP_MESSAGES, para medir el origen. */
export const WHATSAPP_PLAN_MESSAGES: Record<PlanId, string> = {
  detectar: "Hola, quiero mi diagnóstico gratis (paso 1: Detectar) con ERVIA.",
  automatizar: "Hola, quiero mi agente de WhatsApp (paso 2: Automatizar) con ERVIA.",
  escalar: "Hola, quiero crecer sin contratar más personal (paso 3: Escalar) con ERVIA.",
};

/** https://wa.me/<número>?text=<texto del plan>. */
export function whatsappPlanUrl(plan: PlanId): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PLAN_MESSAGES[plan])}`;
}

/** Decisión D-E: se conservan las dos URLs de siempre; sin "Aviso Legal" ni "Términos". */
export const LEGAL_LINKS = [
  { href: "/politica-de-privacidad", label: "Política de Privacidad" },
  { href: "/politica-de-cookies", label: "Política de Cookies" },
] as const;

/**
 * Redes sociales: solo las que tengan URL real. Hoy: ninguna (no se muestra ningún ícono).
 * Formato: { label: "LinkedIn", href: "https://…" }
 */
export const SOCIAL_LINKS: ReadonlyArray<{ label: string; href: string }> = [];

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

/** Enlaces de ancla de la cabecera (definitivos en G1; "Caso real" se añade con G5). */
export const NAV_LINKS = [
  { href: "/#ganancias", label: "Lo que ganas" },
  { href: "/#metodo", label: "Método" },
  { href: "/#precios", label: "Precios" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const HEADER_CTA = { href: "/#contacto", label: "Diagnóstico gratis" } as const;

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

/**
 * NEXT_PUBLIC_SITE_ENV = "production" | "staging".
 * Es NEXT_PUBLIC_*: Next.js la incrusta en el build, así que debe existir al construir.
 *
 * Seguro por defecto: solo "production" permite indexar. Si la variable falta o tiene
 * cualquier otro valor, el sitio se trata como staging (noindex).
 */
export type SiteEnv = "production" | "staging";

export const SITE_ENV: SiteEnv =
  process.env.NEXT_PUBLIC_SITE_ENV === "production" ? "production" : "staging";

export const IS_STAGING = SITE_ENV !== "production";

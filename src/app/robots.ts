import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";
import { IS_STAGING } from "@/lib/env";

/**
 * robots.txt (auditoría 6). Staging: Disallow total. Producción: Allow para todos, nombrando los rastreadores
 * de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) para dejar clara la intención de que puedan citar
 * a ERVIA, y enlace al sitemap. /api/ queda fuera para todos: son rutas de servidor, no páginas.
 */
const AI_BOTS = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"] as const;

export default function robots(): MetadataRoute.Robots {
  if (IS_STAGING) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: "/api/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}

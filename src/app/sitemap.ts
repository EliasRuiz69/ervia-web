import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";

/** sitemap.xml: la home y las dos páginas legales (única lista de páginas indexables del sitio). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}/` },
    { url: `${SITE.url}/politica-de-privacidad` },
    { url: `${SITE.url}/politica-de-cookies` },
  ];
}

import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";
import { TESIS_PAGE_ENABLED, TESIS_PATH } from "@/config/tesis";

/** sitemap.xml: la home, /tesis (si está activa) y las dos páginas legales (única lista de páginas indexables). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}/` },
    ...(TESIS_PAGE_ENABLED ? [{ url: `${SITE.url}${TESIS_PATH}` }] : []),
    { url: `${SITE.url}/politica-de-privacidad` },
    { url: `${SITE.url}/politica-de-cookies` },
  ];
}

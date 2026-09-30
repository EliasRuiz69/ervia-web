import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/legal-document";
import { loadLegalDoc } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Política de Cookies de ervia.tech: qué cookies usa el sitio, para qué sirven y cómo gestionarlas.",
  alternates: { canonical: "/politica-de-cookies" },
};

export default function PoliticaDeCookiesPage() {
  return <LegalDocument doc={loadLegalDoc("politica-de-cookies")} />;
}

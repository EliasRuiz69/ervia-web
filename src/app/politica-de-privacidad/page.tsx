import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/legal-document";
import { loadLegalDoc } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de Privacidad de ERVIA, agencia de automatización e inteligencia artificial con sede en Mérida, Yucatán, México.",
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PoliticaDePrivacidadPage() {
  return <LegalDocument doc={loadLegalDoc("politica-de-privacidad")} />;
}

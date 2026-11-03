import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/legal-document";
import { loadLegalDoc } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Qué datos tratamos en ERVIA, para qué, con quién los compartimos y cómo ejercer tus derechos ARCO.",
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PoliticaDePrivacidadPage() {
  return <LegalDocument doc={loadLegalDoc("politica-de-privacidad")} />;
}

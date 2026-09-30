import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/** Método ERVIA (auditoría 3.3 y 4.5). G4: diagrama de 3 nodos, tabla promesa · qué hacemos · te llevas · tiempo. Por ahora solo el H2. */
export function Method() {
  return (
    <Section id="metodo" aria-labelledby="metodo-titulo">
      <SectionHeading id="metodo-titulo">
        El Método ERVIA: de tu problema de hoy a un negocio que funciona <Accent>solo</Accent>
      </SectionHeading>
    </Section>
  );
}

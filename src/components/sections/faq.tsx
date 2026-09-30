import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/** FAQ (auditoría 4.10, 8 preguntas como máximo). G6: acordeón accesible. Por ahora solo el H2 (la auditoría no define uno; provisional). */
export function Faq() {
  return (
    <Section id="faq" aria-labelledby="faq-titulo">
      <SectionHeading id="faq-titulo">
        Preguntas <Accent>frecuentes</Accent>
      </SectionHeading>
    </Section>
  );
}

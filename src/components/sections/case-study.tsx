import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/** Caso real Full Motor (auditoría 4.7). v2 (G5): NO se renderiza en la v1 ni el nav enlaza a #caso-real. Componente preparado con su H2. */
export function CaseStudy() {
  return (
    <Section id="caso-real" aria-labelledby="caso-real-titulo">
      <SectionHeading id="caso-real-titulo">
        Así funciona en un negocio <Accent>real</Accent> de Mérida
      </SectionHeading>
    </Section>
  );
}

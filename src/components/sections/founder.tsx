import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/** Quién está detrás (auditoría 4.8). v2 (G5): NO se renderiza en la v1. Componente preparado con su H2. */
export function Founder() {
  return (
    <Section aria-labelledby="quien-esta-detras-titulo">
      <SectionHeading id="quien-esta-detras-titulo">
        Quién está <Accent>detrás</Accent>
      </SectionHeading>
    </Section>
  );
}

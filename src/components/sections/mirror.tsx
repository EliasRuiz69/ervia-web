import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/** Espejo del problema (auditoría 4.3). G3: 4 tarjetas, remate y puente a #ganancias. Por ahora solo el H2. */
export function Mirror() {
  return (
    <Section aria-labelledby="espejo-titulo">
      <SectionHeading id="espejo-titulo">
        ¿Te suena alguno de estos <Accent>días</Accent>?
      </SectionHeading>
    </Section>
  );
}

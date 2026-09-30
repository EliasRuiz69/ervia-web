import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/** Lo que ganas cuando automatizas (auditoría 4.4). G3: subtítulo, 4 tarjetas ganancia → antes/después → cómo, CTA. Por ahora solo el H2. */
export function Gains() {
  return (
    <Section id="ganancias" aria-labelledby="ganancias-titulo">
      <SectionHeading id="ganancias-titulo">
        Lo que <Accent>ganas</Accent> cuando automatizas
      </SectionHeading>
    </Section>
  );
}

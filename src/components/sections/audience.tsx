import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/** Para quién es (auditoría 4.6). G3: solo los giros confirmados en D3. Por ahora solo el H2. */
export function Audience() {
  return (
    <Section aria-labelledby="para-quien-titulo">
      <SectionHeading id="para-quien-titulo">
        ¿Es para mi <Accent>negocio</Accent>?
      </SectionHeading>
    </Section>
  );
}

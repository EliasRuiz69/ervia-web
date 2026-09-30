import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/** Precios: los 3 pasos del método (auditoría 4.9). G4: Detectar / Automatizar / Escalar; los CTAs de WhatsApp usan whatsappUrl("pricing"). Por ahora solo el H2. */
export function Pricing() {
  return (
    <Section id="precios" aria-labelledby="precios-titulo">
      <SectionHeading id="precios-titulo">
        Empieza <Accent>gratis</Accent>. Paga solo cuando veas por dónde vas a ganar.
      </SectionHeading>
    </Section>
  );
}

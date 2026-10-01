import { Section } from "@/components/layout/section";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { FAQ_ITEMS } from "@/content/faq";

/** FAQ (auditoría 4.10): 7 preguntas en un acordeón accesible. La n.º 8 queda para la v2. */
export function Faq() {
  return (
    <Section id="faq" narrow aria-labelledby="faq-titulo">
      <SectionHeading id="faq-titulo">
        Lo que nos preguntan antes de <Accent>empezar</Accent>
      </SectionHeading>
      <FaqAccordion items={FAQ_ITEMS} />
    </Section>
  );
}

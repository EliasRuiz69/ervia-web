import { Section } from "@/components/layout/section";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { FAQ_ITEMS, type FaqItem } from "@/content/faq";

/** FAQ en un acordeón accesible. Home: FAQ_ITEMS (6 preguntas). /tesis pasa las suyas (TESIS_FAQ). */
export function Faq({ items = FAQ_ITEMS }: { items?: ReadonlyArray<FaqItem> } = {}) {
  return (
    <Section intrinsic={[690, 758]} id="faq" narrow aria-labelledby="faq-titulo">
      <SectionHeading id="faq-titulo">
        Lo que nos preguntan antes de <Accent>empezar</Accent>
      </SectionHeading>
      <FaqAccordion items={items} />
    </Section>
  );
}

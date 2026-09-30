import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/** CTA final (auditoría 4.11). G6: subtítulo, WhatsApp (whatsappUrl("contact")) y formulario. Por ahora solo el H2. */
export function FinalCta() {
  return (
    <Section id="contacto" deep aria-labelledby="contacto-titulo">
      <SectionHeading id="contacto-titulo">
        Empieza por el paso 1: <Accent>descubre</Accent> dónde estás perdiendo tiempo y clientes.
      </SectionHeading>
    </Section>
  );
}

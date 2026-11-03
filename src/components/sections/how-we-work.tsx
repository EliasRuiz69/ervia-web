import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/**
 * Cómo trabajamos (plan v2, 3.4): fusiona Método + Precios + Giros. FASE 1: solo H2. Los 3 pasos, la línea de
 * giros y el CTA llegan en la Fase 4 (reutilizando Method y Pricing, que ya no se renderizan en la home).
 */
export function HowWeWork() {
  return (
    <Section id="como-trabajamos" aria-labelledby="como-trabajamos-titulo">
      <SectionHeading id="como-trabajamos-titulo">
        Empiezas por lo más urgente. <Accent>Sin riesgo.</Accent>
      </SectionHeading>
    </Section>
  );
}

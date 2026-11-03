import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/**
 * "Todo se conecta" y "Por qué ERVIA" (plan v2, 3.3). FASE 1: solo H2. El diagrama animado y la comparativa
 * "Apps sueltas" frente a "Con ERVIA" llegan en la Fase 3.
 */
export function Connected() {
  return (
    <Section id="por-que-ervia" deep aria-labelledby="por-que-ervia-titulo">
      <SectionHeading id="por-que-ervia-titulo">
        Un solo equipo. <Accent>Todo conectado.</Accent>
      </SectionHeading>
    </Section>
  );
}

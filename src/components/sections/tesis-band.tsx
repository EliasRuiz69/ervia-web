import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/**
 * Banda "¿Estás haciendo tu tesis?" (plan v2, 3.8). FASE 1: solo el hueco con su H2 (entre HowWeWork y Faq).
 * Eyebrow, texto, 3 puntos, mini-demo, CTA y el fondo propio (superficie más clara con borde superior azul)
 * llegan en la Fase 4b, con su configuración en src/config/tesis.ts.
 */
export function TesisBand() {
  return (
    <Section aria-labelledby="tesis-banda-titulo">
      <SectionHeading id="tesis-banda-titulo">
        ¿Tu tesis es una <Accent>montaña</Accent> de información?
      </SectionHeading>
    </Section>
  );
}

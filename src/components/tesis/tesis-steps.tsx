import { Section } from "@/components/layout/section";
import { MethodDiagram } from "@/components/sections/method-diagram";
import { StepCardBody } from "@/components/sections/step-card-body";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { TESIS_PASOS } from "@/config/tesis";

/**
 * "Cómo trabajamos" de /tesis (plan v2, 3.9, bloque 4): reutiliza el diagrama de pasos de la home (MethodDiagram +
 * StepCardBody) con los 3 pasos de tesis. SIN el eyebrow "El Método ERVIA": no son los pasos del Método.
 * El precio va una sola vez, sin cifras (M3).
 */
export function TesisSteps() {
  const [antes, destacada] = TESIS_PASOS.h2;
  return (
    <Section id="como-trabajamos" aria-labelledby="como-trabajamos-titulo">
      <Eyebrow>{TESIS_PASOS.eyebrow}</Eyebrow>
      <SectionHeading id="como-trabajamos-titulo" className="mt-5">
        {antes}
        <Accent>{destacada}</Accent>
      </SectionHeading>

      <div className="mt-12">
        <MethodDiagram
          renderStep={(step) => {
            const paso = TESIS_PASOS.steps.find((s) => s.n === step.n)!;
            return <StepCardBody name={paso.name} text={paso.text} />;
          }}
        />
      </div>

      <p className="mt-10 max-w-[760px] text-[18px] leading-[1.6] text-text-strong">{TESIS_PASOS.precio}</p>
    </Section>
  );
}

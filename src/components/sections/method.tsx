import Link from "next/link";

import { Section } from "@/components/layout/section";
import { MethodDiagram } from "@/components/sections/method-diagram";
import { Button } from "@/components/ui/button";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { SEO } from "@/config/site";

/** La frase SEO.methodDefinition empieza por este término, que se resalta en negrita. */
const DEFINITION_TERM = "El Método ERVIA";

/**
 * Método ERVIA (auditoría 3.3 y 4.5): diagrama de 3 nodos derivado del isotipo con promesa · qué hacemos ·
 * te llevas · tiempo de cada paso. v1 sin entregables con nombre propio.
 */
export function Method() {
  return (
    <Section id="metodo" aria-labelledby="metodo-titulo">
      <SectionHeading id="metodo-titulo">
        El Método ERVIA: de tu problema de hoy a un negocio que funciona <Accent>solo</Accent>
      </SectionHeading>
      <p className="mt-5 max-w-[600px] text-[19px] leading-[1.6]">
        Tres pasos. Sin tecnicismos. Sabes en todo momento qué estamos haciendo y qué te llevas.
      </p>
      {/* GEO: definición autocontenida del método (misma frase que usan el HowTo y el llms.txt). */}
      <p className="mt-4 max-w-[760px] text-[17px] leading-[1.6]">
        <span className="font-semibold text-text-strong">{DEFINITION_TERM}</span>
        {SEO.methodDefinition.slice(DEFINITION_TERM.length)}
      </p>

      <div className="mt-12">
        <MethodDiagram />
      </div>

      <p className="mt-12 max-w-[760px] text-[17px] leading-[1.6]">
        <span className="font-semibold text-text-strong">Lo que necesitamos de ti:</span> unas 2 horas
        en total para contarnos cómo trabajas. El resto lo hacemos nosotros.
      </p>

      <div className="mt-8">
        <Button
          asChild
          size="lg"
          className="w-full whitespace-normal text-center sm:w-auto sm:whitespace-nowrap"
        >
          <Link href="#contacto" data-cta="diagnostico" data-location="method">
            Empieza por el paso 1: Detectar. Es gratis&nbsp;→
          </Link>
        </Button>
      </div>
    </Section>
  );
}

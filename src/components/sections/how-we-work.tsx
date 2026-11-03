import Link from "next/link";

import { Section } from "@/components/layout/section";
import { MethodDiagram } from "@/components/sections/method-diagram";
import { Brand } from "@/components/ui/brand";
import { Button } from "@/components/ui/button";
import { chipClass, chipLinkClass } from "@/components/ui/chip";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { SEO, WHATSAPP_ENABLED, whatsappUrl } from "@/config/site";
import { GIROS_LINEA, HOW_STEPS } from "@/content/how-we-work";
import type { MethodStep } from "@/content/method-steps";
import { NBSP } from "@/lib/text";
import { cn } from "@/lib/utils";

/** La frase SEO.methodDefinition empieza por este término, que se resalta en negrita (igual que en Method). */
const DEFINITION_TERM = `El Método${NBSP}ERVIA`;

/** Contenido compacto de un paso (nombre, qué hacemos y precio). Mismo H3 que el detalle del Método. */
function HowStepBody({ step }: { step: MethodStep }) {
  const how = HOW_STEPS.find((h) => h.n === step.n)!;
  return (
    <>
      <h3 className="text-[clamp(26px,2.4vw,30px)] leading-[1.2]">{step.name}</h3>
      <p className="mt-3 text-[17px] leading-[1.55] text-text-body">{how.text}</p>
      <p className="mt-5 border-t border-border-subtle pt-4">
        {how.free ? (
          <span className="inline-flex items-center rounded-pill border border-border-green bg-surface-green-tint px-3.5 py-1 text-[16px] leading-tight font-semibold text-green-400">
            {how.price}
          </span>
        ) : (
          <span className="font-display text-[19px] leading-[1.25] font-bold text-text-strong">{how.price}</span>
        )}
      </p>
    </>
  );
}

/**
 * Cómo trabajamos (plan multiservicio v2, 3.4): fusiona Método + Precios + Giros. Reutiliza el diagrama del
 * Método (MethodDiagram: nodos 1-2-3 unidos por la línea que se dibuja al entrar) con tarjetas compactas, la
 * definición del Método (SEO.methodDefinition, que también leen el JSON-LD y el llms.txt), los chips de giros
 * (ui/chip) y el CTA del plan "Detectar".
 */
export function HowWeWork() {
  return (
    <Section id="como-trabajamos" aria-labelledby="como-trabajamos-titulo">
      <Eyebrow>
        El Método&nbsp;<Brand />
      </Eyebrow>
      <SectionHeading id="como-trabajamos-titulo" className="mt-5">
        Empiezas por lo más urgente. <Accent>Sin riesgo.</Accent>
      </SectionHeading>
      <p className="mt-5 max-w-[760px] text-[18px] leading-[1.6]">
        <span className="font-semibold text-text-strong">
          El Método&nbsp;<Brand />
        </span>
        {SEO.methodDefinition.slice(DEFINITION_TERM.length)}
      </p>

      <div className="mt-12">
        <MethodDiagram renderStep={(step) => <HowStepBody step={step} />} />
      </div>

      <div className="mt-12 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-x-4 md:gap-y-3">
        <p className="text-[16px] font-semibold text-text-strong">Trabajamos con:</p>
        <ul className="flex flex-wrap items-center gap-2.5">
          {GIROS_LINEA.map((giro) => (
            <li key={giro}>
              <span className={chipClass}>{giro}</span>
            </li>
          ))}
          <li>
            {WHATSAPP_ENABLED ? (
              <a
                href={whatsappUrl("audience")}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                data-location="how-we-work-giros"
                className={cn(chipLinkClass, "italic")}
              >
                ¿Otro giro? Escríbenos
              </a>
            ) : (
              <Link href="#contacto" data-cta="diagnostico" data-location="how-we-work-giros" className={cn(chipLinkClass, "italic")}>
                ¿Otro giro? Escríbenos
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div className="mt-10">
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="#contacto" data-cta="diagnostico" data-location="how-we-work">
            Empieza gratis por el paso&nbsp;1 <span aria-hidden="true">→</span>
          </Link>
        </Button>
      </div>
    </Section>
  );
}

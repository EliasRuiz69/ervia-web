import Link from "next/link";

import { Section } from "@/components/layout/section";
import { PricingCarousel } from "@/components/sections/pricing-carousel";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { ESCALAR_ALL_INCLUDED } from "@/content/pricing";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { WHATSAPP_ENABLED, whatsappPlanUrl, type PlanId } from "@/config/site";
import { NBSP } from "@/lib/text";
import { cn } from "@/lib/utils";

/**
 * Precios: los 3 planes son los 3 pasos del Método ERVIA (auditoría 4.9).
 * v1 SIN cifras: nada de montos ni de IVA/plazos hasta que estén decididos (D2). Detectar es gratis;
 * Automatizar y Escalar se cotizan tras el diagnóstico. Sin entregables con nombre propio.
 */
type Plan = {
  id: PlanId;
  step: number;
  name: string;
  includes: ReadonlyArray<string>;
  price: string;
  /** El precio "Gratis" va más grande; las cotizaciones, en una línea de texto. */
  priceIsWord?: boolean;
  cta: string;
};

const PLANS: ReadonlyArray<Plan> = [
  {
    id: "detectar",
    step: 1,
    name: "Detectar",
    includes: [
      `Llamada de 15${NBSP}min para revisar cómo atiendes hoy`,
      "Un diagnóstico claro: qué te cuesta tiempo y ventas, y por dónde empezar",
    ],
    price: "Gratis",
    priceIsWord: true,
    cta: "Detecta tus fugas gratis",
  },
  {
    id: "automatizar",
    step: 2,
    name: "Automatizar",
    includes: [
      "Tu agente de WhatsApp",
      "Agenda conectada a tu horario real",
      "Tu panel de control",
      "Capacitación para tu equipo",
    ],
    price: "Cotización tras el diagnóstico",
    cta: "Quiero mi agente de WhatsApp",
  },
  {
    id: "escalar",
    step: 3,
    name: "Escalar",
    includes: [
      ESCALAR_ALL_INCLUDED,
      "Un resumen mensual de mensajes atendidos y citas agendadas",
      "Nuevas automatizaciones cuando tenga sentido",
    ],
    price: "Cotización tras el diagnóstico",
    cta: "Quiero crecer sin contratar",
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const { id, step, name, includes, price, priceIsWord, cta } = plan;

  return (
    <li className="relative flex w-[84%] shrink-0 snap-center flex-col gap-6 rounded-lg border border-border-subtle bg-surface-card p-7 shadow-card sm:w-[60%] lg:w-auto lg:p-8">
      <div>
        <Eyebrow>Paso&nbsp;{step}</Eyebrow>
        <h3 className="mt-2 text-[32px] leading-[1.15]">{name}</h3>
      </div>

      <p
        className={cn(
          "font-display font-bold text-text-strong",
          priceIsWord ? "text-[44px] leading-none" : "text-[24px] leading-[1.2]",
        )}
      >
        {price}
      </p>

      <ul className="flex flex-col gap-3">
        {includes.map((item) => (
          <li key={item} className="flex gap-3 text-[16px] leading-[1.5] text-text-body">
            <span aria-hidden="true" className="mt-px font-semibold text-blue-400">
              –
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-2">
        {WHATSAPP_ENABLED ? (
          <Button asChild size="lg" className="w-full whitespace-normal text-center">
            <a
              href={whatsappPlanUrl(id)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp"
              data-location={`pricing-${id}`}
            >
              <WhatsAppIcon className="size-5" />
              {cta}
            </a>
          </Button>
        ) : (
          <Button asChild size="lg" className="w-full whitespace-normal text-center">
            <Link href="#contacto" data-cta="diagnostico" data-location={`pricing-${id}`}>
              {cta}
            </Link>
          </Button>
        )}
      </div>
    </li>
  );
}

export function Pricing() {
  return (
    <Section id="precios" aria-labelledby="precios-titulo">
      <Eyebrow>Cómo empezar</Eyebrow>
      <SectionHeading id="precios-titulo" className="mt-5">
        Empieza por lo más urgente y escala conforme veas los <Accent>beneficios</Accent>.
      </SectionHeading>

      <PricingCarousel labels={PLANS.map((p) => p.name)}>
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </PricingCarousel>
    </Section>
  );
}

import Link from "next/link";

import { Section } from "@/components/layout/section";
import { PricingCarousel } from "@/components/sections/pricing-carousel";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { WHATSAPP_ENABLED, whatsappPlanUrl, type PlanId } from "@/config/site";
import { carouselStartScript } from "@/lib/carousel-start-script";
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
  recommended?: boolean;
};

const PLANS: ReadonlyArray<Plan> = [
  {
    id: "detectar",
    step: 1,
    name: "Detectar",
    includes: [
      "Llamada de 15 min para revisar cómo atiendes hoy",
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
    recommended: true,
  },
  {
    id: "escalar",
    step: 3,
    name: "Escalar",
    includes: [
      "Servidor propio y mantenimiento",
      "Ajustes continuos",
      "Un resumen mensual de mensajes atendidos y citas agendadas",
      "Nuevas automatizaciones cuando tenga sentido",
    ],
    price: "Cotización tras el diagnóstico",
    cta: "Quiero crecer sin contratar",
  },
];

const RECOMMENDED_INDEX = PLANS.findIndex((p) => p.recommended);
const LIST_ID = "planes-lista";

function PlanCard({ plan }: { plan: Plan }) {
  const { id, step, name, includes, price, priceIsWord, cta, recommended } = plan;
  const variant = recommended ? "primary" : "outline";

  return (
    <li
      className={cn(
        "relative flex w-[84%] shrink-0 snap-center flex-col gap-6 rounded-lg border p-7 shadow-card sm:w-[60%] lg:w-auto lg:p-8",
        recommended
          ? "border-border-blue bg-surface-deep shadow-glow-blue"
          : "border-border-subtle bg-surface-card",
      )}
    >
      {recommended && (
        <span className="absolute -top-3 left-8 rounded-pill border border-border-blue bg-surface-page px-3 py-1 text-[13px] font-semibold tracking-overline text-blue-300 uppercase">
          Recomendado
        </span>
      )}

      <div>
        <Eyebrow>Paso {step}</Eyebrow>
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
          <Button asChild size="lg" variant={variant} className="w-full whitespace-normal text-center">
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
          <Button asChild size="lg" variant={variant} className="w-full whitespace-normal text-center">
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
      <SectionHeading id="precios-titulo">
        Empieza <Accent>gratis</Accent>. Paga solo cuando veas por dónde vas a ganar.
      </SectionHeading>

      <PricingCarousel
        listId={LIST_ID}
        labels={PLANS.map((p) => p.name)}
        initialIndex={RECOMMENDED_INDEX}
      >
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </PricingCarousel>
      {/* En móvil, deja el carrusel centrado en Automatizar antes del primer pintado (sin salto). */}
      <script dangerouslySetInnerHTML={{ __html: carouselStartScript(LIST_ID, RECOMMENDED_INDEX) }} />
    </Section>
  );
}

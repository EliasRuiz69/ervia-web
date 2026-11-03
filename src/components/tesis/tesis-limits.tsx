import { Check, X } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { TESIS_LIMITES } from "@/config/tesis";

/**
 * "Lo que hacemos y lo que no" (plan v2, 3.9, bloque 3): el elemento de confianza. Dos columnas. "Sí hacemos" con
 * check verde (resultado); "No hacemos" con un ícono neutro gris (sin rojo). Las frases de "No hacemos" son las
 * únicas donde pueden aparecer, negadas, las que la web nunca ofrece.
 */
export function TesisLimits() {
  const [antes, destacada, despues] = TESIS_LIMITES.h2;
  return (
    <Section intrinsic={[1244, 872]} deep aria-labelledby="limites-titulo">
      <SectionHeading id="limites-titulo">
        {antes}
        <Accent>{destacada}</Accent>
        {despues}
      </SectionHeading>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border-green bg-surface-card p-7 shadow-card md:p-8">
          <h3 className="text-[26px] leading-[1.2]">{TESIS_LIMITES.si.titulo}</h3>
          <ul className="mt-6 flex flex-col gap-4">
            {TESIS_LIMITES.si.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[17px] leading-[1.5] text-text-body">
                <Check aria-hidden="true" className="mt-[3px] size-5 shrink-0 text-green-500" strokeWidth={3} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-border-subtle bg-surface-card p-7 shadow-card md:p-8">
          <h3 className="text-[26px] leading-[1.2]">{TESIS_LIMITES.no.titulo}</h3>
          <ul className="mt-6 flex flex-col gap-4">
            {TESIS_LIMITES.no.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[17px] leading-[1.5] text-text-body">
                <X aria-hidden="true" className="mt-[3px] size-5 shrink-0 text-text-muted" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-10 max-w-[760px] font-display text-[clamp(22px,2.4vw,28px)] leading-[1.3] font-bold text-text-strong">
        {TESIS_LIMITES.remate}
      </p>
    </Section>
  );
}

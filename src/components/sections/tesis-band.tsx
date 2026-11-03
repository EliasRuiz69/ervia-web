import Link from "next/link";
import { BadgeCheck, BookCheck, FolderOpen, type LucideIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SECTION_PY } from "@/components/layout/section";
import { ServiceDemo } from "@/components/demos";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { WHATSAPP_ENABLED } from "@/config/site";
import {
  TESIS_BANDA,
  TESIS_PAGE_ENABLED,
  TESIS_PATH,
  TESIS_WHATSAPP_URL,
  type TesisPunto,
} from "@/config/tesis";

const ICONS: Record<TesisPunto["icon"], LucideIcon> = {
  fuentes: FolderOpen,
  citas: BadgeCheck,
  formato: BookCheck,
};

/**
 * Banda "¿Estás haciendo tu tesis?" de la home (plan v2, 3.8). Otro público (personas, no pymes), así que va
 * DESPUÉS del recorrido de las pymes y con otra superficie (navy-800, un tono más clara) y un borde superior azul:
 * se lee como "otra cosa" sin romper la marca. Contenido en src/config/tesis.ts.
 *
 * CTA principal: "Ver cómo te ayudamos →" a /tesis. Si TESIS_PAGE_ENABLED es false, va a WhatsApp con el texto de
 * tesis (y el CTA secundario sobra). El autor es siempre el tesista: ningún texto ofrece escribir la tesis.
 */
export function TesisBand() {
  const [antes, destacada, despues] = TESIS_BANDA.h2;
  const primaryIsPage = TESIS_PAGE_ENABLED;

  return (
    <section aria-labelledby="tesis-banda-titulo" className="border-t border-border-blue bg-surface-raised">
      <Container className={SECTION_PY}>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div>
            <Eyebrow>{TESIS_BANDA.eyebrow}</Eyebrow>
            <SectionHeading id="tesis-banda-titulo" className="mt-3 text-[clamp(28px,2.7vw,38px)]">
              {antes}
              <Accent>{destacada}</Accent>
              {despues}
            </SectionHeading>
            <p className="mt-3 max-w-[560px] text-[17px] leading-[1.5]">{TESIS_BANDA.text}</p>

            <ul className="mt-4 flex flex-col gap-2">
              {TESIS_BANDA.puntos.map(({ icon, text }) => {
                const Icon = ICONS[icon];
                return (
                  <li key={icon} className="flex items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border-blue bg-surface-blue-tint text-blue-400">
                      <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    </span>
                    <span className="text-[15px] leading-snug font-medium text-text-strong">{text}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {primaryIsPage ? (
                <Button asChild size="md" className="w-full sm:w-auto">
                  <Link href={TESIS_PATH} data-cta="tesis" data-location="tesis-band">
                    {TESIS_BANDA.cta} <span aria-hidden="true">→</span>
                  </Link>
                </Button>
              ) : WHATSAPP_ENABLED ? (
                <Button asChild size="md" className="w-full sm:w-auto">
                  <a
                    href={TESIS_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="whatsapp"
                    data-location="tesis-band"
                  >
                    <WhatsAppIcon className="size-5" />
                    {TESIS_BANDA.ctaSecundario}
                  </a>
                </Button>
              ) : (
                <Button asChild size="md" className="w-full sm:w-auto">
                  <Link href="#contacto" data-cta="diagnostico" data-location="tesis-band">
                    Agenda tu diagnóstico gratis
                  </Link>
                </Button>
              )}
              {primaryIsPage && WHATSAPP_ENABLED && (
                <Button asChild size="md" variant="outline" className="w-full sm:w-auto">
                  <a
                    href={TESIS_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="whatsapp"
                    data-location="tesis-band"
                  >
                    <WhatsAppIcon className="size-5" />
                    {TESIS_BANDA.ctaSecundario}
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Mini-demo "La montaña se ordena": solo en escritorio (en móvil sigue en el hero de /tesis). */}
          <div className="hidden overflow-hidden rounded-lg border border-border-default shadow-raised lg:block">
            <ServiceDemo id="montana" alt={TESIS_BANDA.altDemo} />
          </div>
        </div>
      </Container>
    </section>
  );
}

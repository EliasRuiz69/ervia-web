import { Section } from "@/components/layout/section";
import { LeadForm } from "@/components/sections/lead-form";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/ui/brand";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { WHATSAPP_ENABLED, whatsappUrl } from "@/config/site";

/**
 * CTA final (auditoría 4.11). Dos columnas: WhatsApp grande | formulario. Si WHATSAPP_ENABLED es false,
 * la columna de WhatsApp no se muestra y el formulario ocupa el centro. Sin enlace de agenda en la v1 (D8)
 * y sin promesa del Mapa de Fugas (D11).
 */
export function FinalCta() {
  return (
    <Section id="contacto" deep aria-labelledby="contacto-titulo">
      <SectionHeading id="contacto-titulo">
        Empieza por el paso&nbsp;1 del Método&nbsp;<Brand />: <Accent>descubre</Accent> dónde estás perdiendo tiempo y
        clientes.
      </SectionHeading>
      <p className="mt-5 max-w-[600px] text-[19px] leading-[1.6]">15 minutos. Gratis. Sin compromiso.</p>

      {WHATSAPP_ENABLED ? (
        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <p className="font-display text-[clamp(24px,2.4vw,30px)] leading-[1.25] font-bold text-text-strong">
              Escríbenos por WhatsApp o rellena el formulario.
            </p>
            <Button asChild size="lg" className="w-full whitespace-normal text-center sm:w-auto sm:px-10 sm:py-5 sm:text-[19px]">
              <a
                href={whatsappUrl("contact")}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                data-location="contact"
              >
                <WhatsAppIcon className="size-6" />
                Escríbenos por WhatsApp
              </a>
            </Button>
          </div>
          <LeadForm />
        </div>
      ) : (
        <div className="mx-auto mt-12 max-w-[560px]">
          <LeadForm />
        </div>
      )}
    </Section>
  );
}

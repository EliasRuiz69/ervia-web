import { Section } from "@/components/layout/section";
import { LeadForm } from "@/components/sections/lead-form";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/ui/brand";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { WHATSAPP_ENABLED, whatsappUrl } from "@/config/site";

type FinalCtaProps = {
  /** Titular (por defecto, el de la home: "Empieza por el paso 1 del Método ERVIA…"). */
  heading?: React.ReactNode;
  subheading?: string;
  /** WhatsApp de la columna izquierda: URL y ubicación (data-location). Por defecto, la de la home. */
  whatsappHref?: string;
  whatsappLocation?: string;
  /** Props del formulario (giro, interés y origen preseleccionados: los usa /tesis). */
  form?: React.ComponentProps<typeof LeadForm>;
};

/**
 * CTA final (auditoría 4.11). Dos columnas: WhatsApp grande | formulario. Si WHATSAPP_ENABLED es false,
 * la columna de WhatsApp no se muestra y el formulario ocupa el centro. Sin enlace de agenda en la v1 (D8)
 * y sin promesa del Mapa de Fugas (D11). /tesis lo reutiliza con su propio titular, su WhatsApp de tesis y el
 * formulario preseleccionado.
 */
export function FinalCta({
  heading = (
    <>
      Empieza por el paso&nbsp;1 del Método&nbsp;<Brand />: <Accent>descubre</Accent> dónde estás perdiendo tiempo y
      clientes.
    </>
  ),
  subheading = "15 minutos. Gratis. Sin compromiso.",
  whatsappHref = whatsappUrl("contact"),
  whatsappLocation = "contact",
  form,
}: FinalCtaProps = {}) {
  return (
    <Section id="contacto" deep aria-labelledby="contacto-titulo">
      <SectionHeading id="contacto-titulo">{heading}</SectionHeading>
      <p className="mt-5 max-w-[600px] text-[19px] leading-[1.6]">{subheading}</p>

      {WHATSAPP_ENABLED ? (
        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <p className="font-display text-[clamp(24px,2.4vw,30px)] leading-[1.25] font-bold text-text-strong">
              Escríbenos por WhatsApp o rellena el formulario.
            </p>
            <Button asChild size="lg" className="w-full whitespace-normal text-center sm:w-auto sm:px-10 sm:py-5 sm:text-[19px]">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                data-location={whatsappLocation}
              >
                <WhatsAppIcon className="size-6" />
                Escríbenos por WhatsApp
              </a>
            </Button>
          </div>
          <LeadForm {...form} />
        </div>
      ) : (
        <div className="mx-auto mt-12 max-w-[560px]">
          <LeadForm {...form} />
        </div>
      )}
    </Section>
  );
}

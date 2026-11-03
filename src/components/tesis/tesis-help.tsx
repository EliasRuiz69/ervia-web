import { Section } from "@/components/layout/section";
import { ServiceCard } from "@/components/sections/service-card";
import { ServicesCarousel } from "@/components/sections/services-carousel";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { TESIS_AYUDA, TESIS_CARDS } from "@/config/tesis";
import { cn } from "@/lib/utils";

/**
 * "Cómo te ayudamos" (plan v2, 3.9, bloque 2): 5 tarjetas con el mismo diseño y el mismo kit de mini-demos que los
 * servicios de la home (ServiceCard + ServicesCarousel). Escritorio: 3 + 2 (la segunda fila, centrada);
 * móvil y tablet: carrusel. Las demos de las tarjetas son fotogramas estáticos (prioridad B).
 */
export function TesisHelp() {
  const [antes, destacada] = TESIS_AYUDA.h2;
  return (
    <Section id="como-te-ayudamos" aria-labelledby="como-te-ayudamos-titulo">
      <SectionHeading id="como-te-ayudamos-titulo">
        {antes}
        <Accent>{destacada}</Accent>
      </SectionHeading>

      <div className="mt-12">
        <ServicesCarousel labels={TESIS_CARDS.map((c) => c.nombre)} gridClassName="lg:grid-cols-6">
          {TESIS_CARDS.map((card, i) => (
            <li
              key={card.id}
              className={cn(
                "flex shrink-0 basis-[82%] snap-center sm:basis-[60%] md:basis-[46%] lg:basis-auto",
                "lg:col-span-2",
                i === 3 && "lg:col-start-2",
              )}
            >
              <ServiceCard service={card} />
            </li>
          ))}
        </ServicesCarousel>
      </div>
    </Section>
  );
}

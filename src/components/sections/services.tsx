import { Section } from "@/components/layout/section";
import { ServiceCard } from "@/components/sections/service-card";
import { ServicesCarousel } from "@/components/sections/services-carousel";
import { ServicesTabs } from "@/components/sections/services-tabs";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { BLOQUES, serviciosDeBloque, type BloqueId } from "@/config/services";

/**
 * Columnas de la rejilla de escritorio (≥ 1024 px) por bloque. "Ordena y decide" pasa a 4 columnas desde
 * 1280 px (tarjetas de ≈ 267 px, la promesa sigue en 17 px) y se queda en 2×2 entre 1024 y 1279 px.
 * Por debajo de 1024 px todos van en carrusel.
 */
const GRID: Record<BloqueId, string> = {
  encuentren: "lg:mx-auto lg:max-w-[760px] lg:grid-cols-2",
  atiende: "lg:grid-cols-3",
  ordena: "lg:grid-cols-2 xl:grid-cols-4",
};

/**
 * Servicios por resultado (plan v2, 3.2): 3 pestañas (Que te encuentren · Atiende y vende solo · Ordena y
 * decide) con las tarjetas generadas desde src/config/services.ts, cada una con su mini-demo.
 */
export function Services() {
  const panels = Object.fromEntries(
    BLOQUES.map(({ id }) => {
      const servicios = serviciosDeBloque(id);
      return [
        id,
        <ServicesCarousel key={id} labels={servicios.map((s) => s.nombre)} gridClassName={GRID[id]}>
          {servicios.map((s) => (
            <li
              key={s.id}
              className="flex shrink-0 basis-[82%] snap-center sm:basis-[60%] md:basis-[46%] lg:basis-auto"
            >
              <ServiceCard service={s} />
            </li>
          ))}
        </ServicesCarousel>,
      ];
    }),
  ) as Record<BloqueId, React.ReactNode>;

  return (
    <Section id="servicios" aria-labelledby="servicios-titulo">
      <SectionHeading id="servicios-titulo">
        Todo lo que tu negocio necesita para <Accent>trabajar solo</Accent>
      </SectionHeading>
      <p className="mt-5 max-w-[600px] text-[19px] leading-[1.6]">
        Elige qué quieres resolver. Puedes empezar por uno y sumar los demás cuando quieras.
      </p>

      <ServicesTabs panels={panels} />
    </Section>
  );
}

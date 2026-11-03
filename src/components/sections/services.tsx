import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { BLOQUES, bloqueHash } from "@/config/services";

/**
 * Servicios por resultado (plan v2, 3.2). FASE 1: solo H2 y subtítulo. Las pestañas, las tarjetas y las
 * mini-demos llegan en la Fase 2 (datos en src/config/services.ts).
 *
 * Los tres divs vacíos son los destinos de los chips del hero (#servicios-<bloque>): hasta que existan las
 * pestañas, el chip lleva a esta sección. La Fase 2 los sustituye por las pestañas (mismo hash) y mueve el
 * foco a la tarjeta del servicio (`servicio-<id>`).
 */
export function Services() {
  return (
    <Section id="servicios" aria-labelledby="servicios-titulo">
      {BLOQUES.map((b) => (
        <div key={b.id} id={bloqueHash(b.id).slice(1)} aria-hidden="true" />
      ))}
      <SectionHeading id="servicios-titulo">
        Todo lo que tu negocio necesita para <Accent>trabajar solo</Accent>
      </SectionHeading>
      <p className="mt-5 max-w-[600px] text-[19px] leading-[1.6]">
        Elige qué quieres resolver. Puedes empezar por uno y sumar los demás cuando quieras.
      </p>
    </Section>
  );
}

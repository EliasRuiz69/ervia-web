import Link from "next/link";
import { Briefcase, Stethoscope, UtensilsCrossed, Wrench, type LucideIcon } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { WHATSAPP_ENABLED, whatsappUrl } from "@/config/site";

/**
 * Para quién es (auditoría 4.6). Son los sectores a los que nos dirigimos, NO casos de éxito:
 * ningún texto afirma que ya tengamos clientes en ellos. Para quitar un giro, borra su línea.
 */
const SECTORS: ReadonlyArray<{ icon: LucideIcon; name: string; gain: string }> = [
  { icon: Wrench, name: "Talleres y refaccionarias", gain: "Cotizas y agendas sin soltar la herramienta." },
  {
    icon: Stethoscope,
    name: "Consultorios y clínicas",
    gain: "Citas confirmadas y recordatorios sin llamar a nadie.",
  },
  {
    icon: UtensilsCrossed,
    name: "Restaurantes",
    gain: "Reservas por WhatsApp aunque estés en plena hora pico.",
  },
  {
    icon: Briefcase,
    name: "Negocios de servicios",
    gain: "Cada consulta atendida en minutos, no en horas.",
  },
];

const closingLink =
  "inline-flex min-h-11 items-center gap-2 text-[17px] font-semibold text-blue-400 underline underline-offset-4 transition-colors duration-(--duration-fast) ease-out hover:text-blue-300";

export function Audience() {
  return (
    <Section deep aria-labelledby="para-quien-titulo">
      <SectionHeading id="para-quien-titulo">
        ¿Es para mi <Accent>negocio</Accent>?
      </SectionHeading>
      <p className="mt-5 max-w-[600px] text-[19px] leading-[1.6]">
        Si atiendes clientes por WhatsApp y trabajas con citas, reservas o cotizaciones, esto es para
        ti.
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SECTORS.map(({ icon: Icon, name, gain }) => (
          <li
            key={name}
            className="flex flex-col gap-4 rounded-lg border border-border-subtle bg-surface-card p-6 shadow-card transition-[border-color] duration-(--duration-base) ease-out hover:border-border-default"
          >
            <span className="flex size-11 items-center justify-center rounded-md border border-border-blue bg-surface-blue-tint text-blue-400">
              <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </span>
            <h3 className="text-[22px] leading-[1.2]">{name}</h3>
            <p className="text-[16px] leading-[1.55] text-text-body">{gain}</p>
          </li>
        ))}
      </ul>

      <p className="mt-10">
        {WHATSAPP_ENABLED ? (
          <a
            href={whatsappUrl("audience")}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="whatsapp"
            data-location="audience"
            className={closingLink}
          >
            ¿Tu giro no está aquí? Cuéntanos tu caso por WhatsApp <span aria-hidden="true">→</span>
          </a>
        ) : (
          <Link href="#contacto" data-cta="diagnostico" data-location="audience" className={closingLink}>
            ¿Tu giro no está aquí? Cuéntanos tu caso <span aria-hidden="true">→</span>
          </Link>
        )}
      </p>
    </Section>
  );
}

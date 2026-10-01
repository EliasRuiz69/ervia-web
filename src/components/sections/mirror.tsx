import { CalendarClock, MessageCircleQuestion, MoonStar, UserRoundX, type LucideIcon } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/** Espejo del problema (auditoría 4.3): 4 tarjetas 2×2 con ícono, remate y puente a #ganancias. */
const PAINS: ReadonlyArray<{ icon: LucideIcon; text: string }> = [
  {
    icon: MessageCircleQuestion,
    text: "Contestas 30 veces al día “¿cuánto cuesta?” y “¿a qué hora abren?”.",
  },
  {
    icon: MoonStar,
    text: "Un cliente escribe el domingo a las 8 de la noche. Le contestas el lunes… y ya se fue con otro.",
  },
  {
    icon: CalendarClock,
    text: "Te pasas la mañana confirmando, moviendo y persiguiendo citas.",
  },
  {
    icon: UserRoundX,
    text: "Contratar a alguien solo para contestar mensajes no te conviene, pero tampoco puedes dejar de contestar.",
  },
];

export function Mirror() {
  return (
    <Section aria-labelledby="espejo-titulo">
      <SectionHeading id="espejo-titulo">
        ¿Te suena alguno de estos <Accent>días</Accent>?
      </SectionHeading>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {PAINS.map(({ icon: Icon, text }) => (
          <li
            key={text}
            className="flex items-start gap-5 rounded-lg border border-border-subtle bg-surface-card px-6 py-7 shadow-card transition-[border-color] duration-(--duration-base) ease-out hover:border-border-default md:px-8"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border-blue bg-surface-blue-tint text-blue-400">
              <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </span>
            <p className="pt-0.5 text-[18px] leading-[1.5] text-text-body">{text}</p>
          </li>
        ))}
      </ul>

      <p className="mt-12 max-w-[760px] font-display text-[clamp(24px,2.6vw,32px)] leading-[1.25] font-bold tracking-tight text-text-strong">
        Cada mensaje sin respuesta es una venta que se va con la competencia.
      </p>

      <a
        href="#ganancias"
        className="mt-6 inline-flex min-h-11 items-center gap-2 text-[17px] font-semibold text-blue-400 underline underline-offset-4 transition-colors duration-(--duration-fast) ease-out hover:text-blue-300"
      >
        Ahora imagina lo contrario <span aria-hidden="true">↓</span>
      </a>
    </Section>
  );
}

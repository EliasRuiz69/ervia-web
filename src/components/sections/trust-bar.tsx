import { Server, Smartphone, Timer, type LucideIcon } from "lucide-react";

import { Container } from "@/components/layout/container";

/** Franja de confianza bajo el hero (auditoría 4.2): 3 ítems con ícono SVG. Íconos en azul (regla D-J). */
const ITEMS: ReadonlyArray<{ icon: LucideIcon; label: string }> = [
  { icon: Smartphone, label: "Tu mismo número de WhatsApp" },
  { icon: Server, label: "Servidor dedicado" },
  { icon: Timer, label: "Listo en menos de 4 semanas" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Por qué ERVIA"
      className="border-t border-border-subtle bg-surface-deep"
    >
      <Container className="py-8 md:py-10">
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-8">
          {ITEMS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3.5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border-blue bg-surface-blue-tint text-blue-400">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <span className="text-[16px] leading-snug font-medium text-text-strong">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

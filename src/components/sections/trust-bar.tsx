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
        {/* Desde md: columnas 1fr · auto · 1fr, así el ítem del medio queda centrado en el contenedor y los
            extremos pegados a sus bordes (con columnas iguales o justify-between, el del medio se descentraría). */}
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_auto_1fr] lg:gap-8">
          {ITEMS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3.5 md:justify-self-start md:nth-2:justify-self-center md:last:justify-self-end"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border-blue bg-surface-blue-tint text-blue-400">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <span className="text-[16px] leading-snug font-medium text-text-strong md:text-balance">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

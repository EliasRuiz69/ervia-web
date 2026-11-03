import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Anim } from "./anim";

/**
 * Chip de resultado ("✅ Cita agendada"). Es el ÚNICO elemento verde de una demo (regla de color D-J:
 * verde = resultado, azul = estructura). Mismos estilos que los chips del mockup del hero.
 */
export function ResultChip({
  at,
  className,
  children,
}: {
  at?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Anim at={at} from="translateY(2cqw) scale(0.94)" className={cn("self-start", className)}>
      <span className="inline-flex items-center gap-[1.4cqw] rounded-pill border border-border-green bg-surface-green-tint px-[3cqw] py-[1.3cqw] text-[4.4cqw] leading-none font-semibold whitespace-nowrap text-green-400">
        <Check aria-hidden="true" className="size-[4.6cqw] shrink-0 text-green-500" strokeWidth={3} />
        {children}
      </span>
    </Anim>
  );
}

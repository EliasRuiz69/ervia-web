import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Anim } from "./anim";

/** Nodo de una mini-demo: círculo azul con un ícono y, opcional, su rótulo debajo. Aparece con un pequeño "pop". */
export function Node({
  icon: Icon,
  label,
  at,
  className,
}: {
  icon: LucideIcon;
  label?: string;
  at?: number;
  className?: string;
}) {
  return (
    <Anim at={at} from="scale(0.6)" className={cn("flex flex-col items-center gap-[1.6cqw]", className)}>
      <span className="flex size-[15cqw] items-center justify-center rounded-full border border-border-blue bg-surface-blue-tint text-blue-300">
        <Icon aria-hidden="true" className="size-[7cqw]" strokeWidth={1.75} />
      </span>
      {label && <span className="text-[4.4cqw] leading-none text-text-body">{label}</span>}
    </Anim>
  );
}

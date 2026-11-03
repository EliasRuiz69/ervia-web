import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Anim } from "./anim";

/** Aviso tipo "toast" de una mini-demo ("Nuevo cliente desde tu web"). Entra desde arriba. */
export function Notification({
  icon: Icon,
  at,
  className,
  children,
}: {
  icon: LucideIcon;
  at?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Anim
      at={at}
      from="translateY(-3cqw)"
      className={cn(
        "flex items-center gap-[2.4cqw] rounded-[2cqw] border border-border-default bg-surface-raised px-[3cqw] py-[2cqw] text-[4.4cqw] leading-[1.2] font-medium text-text-strong shadow-card",
        className,
      )}
    >
      <span className="flex size-[7.5cqw] shrink-0 items-center justify-center rounded-full bg-blue-500 text-text-on-blue">
        <Icon aria-hidden="true" className="size-[4.2cqw]" strokeWidth={2} />
      </span>
      {children}
    </Anim>
  );
}

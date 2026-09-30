import { cn } from "@/lib/utils";

/** Eyebrow / overline (docs/design-base.md §3): 13 px, 600, mayúsculas, tracking 0.14em. Azul por defecto (D-J). */
export function Eyebrow({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-block text-[13px] font-semibold tracking-overline text-blue-400 uppercase",
        className,
      )}
      {...props}
    />
  );
}

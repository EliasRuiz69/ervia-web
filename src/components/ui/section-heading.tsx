import { cn } from "@/lib/utils";

/** Palabra destacada en verde: UNA por titular (regla de color D-J, docs/design-base.md §7). */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-green-500">{children}</span>;
}

/**
 * H2 de sección (docs/design-base.md §2): Baloo 2 700, clamp(30px, 3.6vw, 48px), interlineado 1.15,
 * tracking -0.01em, ancho máximo 760 px.
 */
export function SectionHeading({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "max-w-[760px] text-[clamp(30px,3.6vw,48px)] leading-[1.15] tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

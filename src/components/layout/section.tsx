import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = Omit<React.ComponentProps<"section">, "children"> & {
  children: React.ReactNode;
  /** Fondo navy-950 (secciones "deep"). */
  deep?: boolean;
  /** Contenedor de 800 px. */
  narrow?: boolean;
  /** Clases extra para el Container interior. */
  innerClassName?: string;
};

/**
 * Sección con borde superior sutil y padding vertical 120 px (80 px en móvil),
 * según docs/design-base.md §4. Alterna fondo page / deep con `deep`.
 */
export function Section({
  deep = false,
  narrow = false,
  className,
  innerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "border-t border-border-subtle",
        deep && "bg-surface-deep",
        className,
      )}
      {...props}
    >
      <Container narrow={narrow} className={cn("py-20 md:py-[120px]", innerClassName)}>
        {children}
      </Container>
    </section>
  );
}

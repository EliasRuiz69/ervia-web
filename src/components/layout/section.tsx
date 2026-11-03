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
 * Padding vertical de las secciones: 88 px en escritorio (≥ 768 px) y 56 px en móvil. Revisado el 3/11/2026
 * (antes 120 / 80 px, docs/design-base.md §4) para compactar la home. Es la ÚNICA definición: Section, la banda de
 * tesis y cualquier sección propia deben usar esta constante.
 */
export const SECTION_PY = "py-14 md:py-22";

/**
 * Sección con borde superior sutil y padding vertical SECTION_PY (88 px; 56 px en móvil).
 * Alterna fondo page / deep con `deep`.
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
      <Container narrow={narrow} className={cn(SECTION_PY, innerClassName)}>
        {children}
      </Container>
    </section>
  );
}

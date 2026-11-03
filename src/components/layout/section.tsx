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
  /**
   * [alto en móvil, alto en escritorio] aproximados, en px. Si se indica, la sección se renderiza de forma diferida
   * (ver deferOffscreen). Debe ser un valor cercano al real: es la reserva de espacio hasta que se renderiza.
   */
  intrinsic?: readonly [number, number];
};

/**
 * Padding vertical de las secciones: 88 px en escritorio (≥ 768 px) y 56 px en móvil. Revisado el 3/11/2026
 * (antes 120 / 80 px, docs/design-base.md §4) para compactar la home. Es la ÚNICA definición: Section, la banda de
 * tesis y cualquier sección propia deben usar esta constante.
 */
export const SECTION_PY = "py-14 md:py-22";

/**
 * Props para una sección bajo el primer pantallazo: el navegador no calcula su estilo, su maquetación ni su pintura
 * hasta que está cerca de la pantalla (content-visibility: auto). Con ~1.000 elementos en la home, esto acerca el
 * Lighthouse móvil de la home al de la versión anterior (medido en pares intercalados: sin esto, 6 puntos por debajo;
 * con esto, a la par). Mientras la sección no se ha renderizado, `contain-intrinsic-size: auto <alto>` reserva su
 * espacio; después recuerda el real. Por eso el alto debe ser cercano al real: si no, los enlaces ancla (#faq,
 * #contacto…) caen desplazados (AnchorAlign, en el layout, corrige el margen que quede). El hero NO se difiere.
 */
export function deferOffscreen([mobile, desktop]: readonly [number, number]) {
  return {
    className:
      "[content-visibility:auto] [contain-intrinsic-size:auto_var(--cis-m)] md:[contain-intrinsic-size:auto_var(--cis-d)]",
    style: { "--cis-m": `${mobile}px`, "--cis-d": `${desktop}px` } as React.CSSProperties,
  };
}

/**
 * Sección con borde superior sutil y padding vertical SECTION_PY (88 px; 56 px en móvil).
 * Alterna fondo page / deep con `deep`.
 */
export function Section({
  deep = false,
  narrow = false,
  className,
  innerClassName,
  intrinsic,
  children,
  style,
  ...props
}: SectionProps) {
  const deferred = intrinsic ? deferOffscreen(intrinsic) : null;
  return (
    <section
      className={cn(
        "border-t border-border-subtle",
        deep && "bg-surface-deep",
        deferred?.className,
        className,
      )}
      style={{ ...deferred?.style, ...style }}
      {...props}
    >
      <Container narrow={narrow} className={cn(SECTION_PY, innerClassName)}>
        {children}
      </Container>
    </section>
  );
}

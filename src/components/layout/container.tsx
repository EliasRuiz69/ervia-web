import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  /** 800 px (lectura / FAQ) en lugar de 1140 px. */
  narrow?: boolean;
};

/** Contenedor de docs/design-base.md §4: 1140 px (800 px estrecho), gutter 32 px (20 px en móvil). */
export function Container({ narrow = false, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 md:px-8",
        narrow ? "max-w-[800px]" : "max-w-[1140px]",
        className,
      )}
      {...props}
    />
  );
}

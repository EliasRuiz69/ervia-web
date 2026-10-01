import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoVariant = "horizontal" | "mark";
type LogoTone = "onDark" | "onLight";

/**
 * Proporciones intrínsecas de cada variante (ancho / alto del viewBox de los SVG de public/brand).
 * Si se sustituyen los SVG, actualizar aquí.
 */
const ASPECT: Record<LogoVariant, { w: number; h: number }> = {
  horizontal: { w: 849.75, h: 217.12 },
  mark: { w: 205.97, h: 217.12 },
};

const SRC: Record<LogoVariant, Record<LogoTone, string>> = {
  horizontal: {
    onDark: "/brand/ervia-logo-horizontal-on-dark.svg",
    onLight: "/brand/ervia-logo-horizontal-on-light.svg",
  },
  // El isotipo es azul (--blue-500) y se lee bien sobre navy y sobre blanco: un solo archivo.
  mark: {
    onDark: "/brand/ervia-mark.svg",
    onLight: "/brand/ervia-mark.svg",
  },
};

type LogoProps = {
  variant?: LogoVariant;
  /** onDark: para fondos navy (por defecto). onLight: para fondos claros. */
  tone?: LogoTone;
  /** Alto en px; el ancho sale de la proporción. */
  height?: number;
  className?: string;
  priority?: boolean;
};

export function Logo({
  variant = "horizontal",
  tone = "onDark",
  height = 32,
  className,
  priority = false,
}: LogoProps) {
  const { w, h } = ASPECT[variant];
  const width = Math.round((height * w) / h);

  return (
    <Image
      src={SRC[variant][tone]}
      alt="ERVIA"
      translate="no"
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={cn("block max-w-none", className)}
      style={{ height, width }}
    />
  );
}

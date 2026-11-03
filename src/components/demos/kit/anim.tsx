import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * Pieza base del kit: envuelve un elemento y lo anima dentro del bucle de la demo (ver demos.css).
 *  - kind "in":    aparece en la ranura `at` (0–9). `from` = transform de partida (CSS), p. ej. "scale(0.8)".
 *  - kind "out":   desaparece en la ranura `at` (para cambiar un estado por otro).
 *  - kind "shift": se desplaza a `shift` (transform CSS) en la ranura `at`.
 *  - kind "vibrate": vibra unos instantes al principio del bucle (teléfono de Llamadas; ver d-vibrate).
 *  - kind "scan":  línea de escáner que baja hasta `--d-y` (sin ranura; ver d-scan en demos.css).
 * Sin `at` el elemento no se anima (siempre visible). Solo opacity y transform.
 * Con prefers-reduced-motion, sin JavaScript o en una demo `still`, se ve el fotograma final.
 */
export type AnimKind = "in" | "out" | "shift" | "scan" | "vibrate";

type AnimProps = {
  at?: number;
  kind?: AnimKind;
  from?: string;
  shift?: string;
  as?: "div" | "span";
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
};

export function Anim({
  at,
  kind = "in",
  from,
  shift,
  as: Tag = "div",
  className,
  style,
  children,
}: AnimProps) {
  const standalone = kind === "scan" || kind === "vibrate"; // sin ranura: animación propia
  const animated = at !== undefined || standalone;
  const name = standalone ? `d-${kind}` : `d-${kind}-${at}`;
  const vars = {
    ...(from ? { "--d-from": from } : null),
    ...(shift ? { "--d-shift": shift } : null),
  } as CSSProperties;

  return (
    <Tag
      className={cn(animated && ["d", `d-${kind}`], className)}
      style={{ ...(animated ? { animationName: name } : null), ...vars, ...style }}
    >
      {children}
    </Tag>
  );
}

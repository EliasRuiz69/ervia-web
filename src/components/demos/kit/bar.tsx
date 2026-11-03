import { cn } from "@/lib/utils";
import { Anim } from "./anim";

/**
 * Barra de una mini-demo. `orientation="v"` (por defecto) crece desde abajo (scaleY), para gráficas;
 * `"h"` se dibuja desde la izquierda (scaleX), para conectores y líneas de tachado. Solo transform.
 * Altura/anchura se controlan con `className` (p. ej. "h-[60%]").
 */
export function Bar({
  orientation = "v",
  at,
  className,
}: {
  orientation?: "v" | "h";
  at?: number;
  className?: string;
}) {
  const v = orientation === "v";
  return (
    <Anim
      at={at}
      from={v ? "scaleY(0.04)" : "scaleX(0)"}
      className={cn(
        v ? "origin-bottom rounded-t-[1cqw] bg-blue-500" : "origin-left rounded-pill bg-blue-400",
        className,
      )}
    />
  );
}

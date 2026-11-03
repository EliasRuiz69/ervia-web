import { cn } from "@/lib/utils";
import { Anim } from "./anim";

/**
 * Fila de tabla de una mini-demo: celdas en una rejilla (`cols` = grid-template-columns). La primera celda
 * va en gris (rótulo) y las demás en blanco. Entra deslizándose desde la izquierda, como si los datos
 * llegaran desde el documento.
 */
export function TableRow({
  cells,
  cols = "1fr 1.6fr",
  at,
  className,
}: {
  cells: readonly string[];
  cols?: string;
  at?: number;
  className?: string;
}) {
  return (
    <Anim
      at={at}
      from="translateX(-4cqw)"
      className={cn(
        "grid items-center gap-[2cqw] rounded-[1.6cqw] border border-border-subtle bg-surface-card px-[2.4cqw] py-[1.8cqw] text-[4.4cqw] leading-none",
        className,
      )}
      style={{ gridTemplateColumns: cols }}
    >
      {cells.map((cell, i) => (
        <span key={i} className={cn("truncate", i === 0 ? "text-text-muted" : "font-medium text-text-strong")}>
          {cell}
        </span>
      ))}
    </Anim>
  );
}

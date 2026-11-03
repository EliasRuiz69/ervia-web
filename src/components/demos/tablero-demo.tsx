import { Anim, Bar, DemoFrame, ResultChip } from "./kit";

/**
 * Tablero del negocio (prioridad A): las barras crecen y la cifra sube. Todo es de ejemplo (rótulo "Ejemplo"
 * del marco). La cifra "sube" con tres valores apilados que se relevan; solo opacity.
 */
// Clases literales (Tailwind no detecta clases armadas con variables).
const BARS = ["h-[34%]", "h-[46%]", "h-[40%]", "h-[62%]", "h-[55%]", "h-[82%]"] as const;

const number = "col-start-1 row-start-1 font-display text-[9cqw] leading-none font-bold text-text-strong";

export function TableroDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt}>
      <p className="text-[4.4cqw] leading-none text-text-muted">Ventas del mes</p>
      <div className="mt-[1.6cqw] grid">
        <Anim at={3} kind="out" className={number}>
          $12,400
        </Anim>
        <Anim at={3} from="translateY(1cqw)" className={number}>
          <Anim at={5} kind="out">
            $31,900
          </Anim>
        </Anim>
        <Anim at={5} from="translateY(1cqw)" className={number}>
          $48,200
        </Anim>
      </div>

      <div className="mt-[3cqw] flex min-h-0 flex-1 items-end gap-[3cqw] border-b border-border-default px-[1cqw]">
        {BARS.map((height, i) => (
          <Bar key={i} at={i} className={`flex-1 ${height}`} />
        ))}
      </div>

      <ResultChip at={7} className="mt-[2.4cqw]">
        Resumen del mes listo
      </ResultChip>
    </DemoFrame>
  );
}

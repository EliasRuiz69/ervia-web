import { Anim, DemoFrame, ResultChip } from "./kit";

/**
 * Clientes en un solo lugar / CRM (prioridad A): una tarjeta pasa de columna en columna
 * (Preguntó → Cotizado → Cliente). Dos desplazamientos anidados: cada uno mueve la tarjeta una columna.
 */
const COLUMNS = ["Preguntó", "Cotizado", "Cliente"] as const;

// Una columna más allá: ancho de la tarjeta + hueco entre columnas (2cqw) + relleno de dos columnas (2 × 1,6cqw).
const ONE_COLUMN = "translateX(calc(100% + 5.2cqw))";

const card =
  "rounded-[1.4cqw] border border-border-default bg-surface-raised px-[2cqw] py-[1.9cqw] text-[4.4cqw] leading-none text-text-strong";

export function CrmDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt}>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-[2cqw]">
        {COLUMNS.map((title, col) => (
          <div key={title} className="flex flex-col gap-[1.6cqw]">
            <p className="text-[4.4cqw] leading-none text-text-muted">{title}</p>
            <div className="flex flex-1 flex-col gap-[2cqw] rounded-[1.6cqw] bg-surface-card p-[1.6cqw]">
              {col === 0 && (
                <>
                  {/* La tarjeta que viaja: Preguntó → Cotizado → Cliente */}
                  <Anim at={2} kind="shift" shift={ONE_COLUMN} className="relative z-10">
                    <Anim at={4} kind="shift" shift={ONE_COLUMN}>
                      <p className={`${card} border-border-blue bg-surface-blue-tint`}>Ana</p>
                    </Anim>
                  </Anim>
                  <p className={card}>Luis</p>
                </>
              )}
              {col === 1 && <p className={`${card} mt-[10.8cqw]`}>Marta</p>}
            </div>
          </div>
        ))}
      </div>

      <ResultChip at={6} className="mt-[2.4cqw]">
        Cliente nuevo
      </ResultChip>
    </DemoFrame>
  );
}

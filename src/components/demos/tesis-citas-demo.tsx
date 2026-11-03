import { X } from "lucide-react";

import { Anim, DemoFrame, ResultChip } from "./kit";

/**
 * Tesis · "Citas verificadas y formato a la norma" (prioridad B): en una lista de referencias una se marca
 * "No existe" y las demás "Verificada"; luego se ordenan en formato APA. FASE 4b: fotograma final estático.
 * "No existe" va en gris con un ícono neutro (sin rojo): el verde es solo para el resultado.
 */
const REFERENCIAS = [
  { ref: "Ruiz (2021)", ok: true },
  { ref: "Soto (2019)", ok: false },
  { ref: "Vega (2023)", ok: true },
] as const;

export function TesisCitasDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt} still>
      <div className="flex flex-col gap-[2cqw]">
        {REFERENCIAS.map(({ ref, ok }, i) => (
          <Anim
            key={ref}
            at={i}
            from="translateX(-4cqw)"
            className="flex items-center justify-between gap-[2cqw] rounded-[1.6cqw] border border-border-subtle bg-surface-card px-[2.4cqw] py-[1.4cqw] text-[4.4cqw] leading-none text-text-strong"
          >
            <span>{ref}</span>
            {ok ? (
              <ResultChip>Verificada</ResultChip>
            ) : (
              <span className="inline-flex items-center gap-[1.4cqw] rounded-pill border border-border-default px-[3cqw] py-[1.3cqw] font-semibold text-text-muted">
                <X aria-hidden="true" className="size-[4.4cqw]" strokeWidth={2.5} />
                No existe
              </span>
            )}
          </Anim>
        ))}
      </div>

      <ResultChip at={6} className="mt-auto">
        Formato APA 7
      </ResultChip>
    </DemoFrame>
  );
}

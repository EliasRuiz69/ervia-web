import { Anim, DemoFrame, ResultChip } from "./kit";

/**
 * Tesis · "Esquema y borradores de apoyo" (prioridad B): un índice de capítulos que se arma y un párrafo de apoyo
 * con el sello "Borrador: reescríbelo tú". FASE 4b: fotograma final estático (`still`).
 */
const CAPITULOS = ["Introducción", "Marco teórico", "Método"] as const;

export function TesisEsquemaDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt} still>
      <div className="flex gap-[4cqw]">
        <ol className="flex w-[40cqw] shrink-0 flex-col gap-[2cqw]">
          {CAPITULOS.map((cap, i) => (
            <Anim
              key={cap}
              as="div"
              at={i}
              from="translateX(-4cqw)"
              className="flex items-center gap-[2cqw] rounded-[1.6cqw] border border-border-subtle bg-surface-card px-[2.4cqw] py-[1.8cqw] text-[4.4cqw] leading-none text-text-strong"
            >
              <span className="text-blue-300">{i + 1}</span>
              <span className="truncate">{cap}</span>
            </Anim>
          ))}
        </ol>

        <Anim
          at={4}
          from="translateY(2cqw)"
          className="flex min-w-0 flex-1 flex-col gap-[1.8cqw] rounded-[1.6cqw] border border-border-subtle bg-surface-card p-[2.4cqw]"
        >
          {[100, 90, 60].map((w, i) => (
            <span key={i} className="block h-[1.2cqw] rounded-pill bg-navy-600" style={{ width: `${w}%` }} />
          ))}
          <Anim
            at={5}
            from="scale(0.9)"
            className="mt-[0.6cqw] self-start rounded-[1.2cqw] border border-border-blue bg-surface-blue-tint px-[2cqw] py-[1.2cqw] text-[4.4cqw] leading-[1.2] font-semibold text-blue-300"
          >
            Borrador: reescríbelo tú
          </Anim>
        </Anim>
      </div>

      <ResultChip at={7} className="mt-auto">
        El autor eres tú
      </ResultChip>
    </DemoFrame>
  );
}

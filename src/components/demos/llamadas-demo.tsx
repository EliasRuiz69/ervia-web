import { Phone } from "lucide-react";

import { Anim, DemoFrame, ResultChip } from "./kit";

/**
 * Asistente de llamadas (prioridad B): un teléfono vibra, contesta (onda de voz) y la cita queda agendada.
 */
const WAVE = ["h-[35%]", "h-[75%]", "h-[50%]", "h-[100%]", "h-[60%]", "h-[85%]", "h-[40%]"] as const;

export function LlamadasDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt}>
      <div className="mt-[2cqw] flex items-center gap-[4cqw]">
        <Anim at={0} from="scale(0.7)">
          <Anim
            kind="vibrate"
            className="flex size-[18cqw] items-center justify-center rounded-full bg-blue-500 text-text-on-blue shadow-glow-blue"
          >
            <Phone aria-hidden="true" className="size-[9cqw]" strokeWidth={1.75} />
          </Anim>
        </Anim>
        <div className="min-w-0 flex-1">
          <Anim at={2} from="translateY(1.6cqw)" className="text-[4.4cqw] leading-none text-text-body">
            Llamada contestada
          </Anim>
          <div className="mt-[3cqw] flex h-[11cqw] items-center gap-[1.6cqw]">
            {WAVE.map((h, i) => (
              <Anim
                key={i}
                at={2 + (i % 3)}
                from="scaleY(0.2)"
                className={`w-[2cqw] rounded-pill bg-blue-300 ${h}`}
              />
            ))}
          </div>
        </div>
      </div>

      <ResultChip at={6} className="mt-auto">
        Cita: jueves 10:00
      </ResultChip>
    </DemoFrame>
  );
}

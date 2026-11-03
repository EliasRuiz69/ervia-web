import { Check } from "lucide-react";

import { Anim, ChatBubble, DemoFrame, ResultChip } from "./kit";

/**
 * Recordatorios y clientes que regresan (prioridad B): un calendario con palomitas que aparecen y un mensaje
 * que sale hacia un cliente.
 */
// Posición (0–11) del día confirmado → ranura de aparición.
const CONFIRMED: Record<number, number> = { 1: 0, 6: 1, 10: 2 };

export function RecordatoriosDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt}>
      <div className="flex gap-[4cqw]">
        <div className="grid w-[37cqw] shrink-0 grid-cols-4 gap-[1.6cqw]">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className="relative aspect-square rounded-[1.4cqw] border border-border-subtle bg-surface-card"
            >
              {i in CONFIRMED && (
                <Anim
                  at={CONFIRMED[i]}
                  from="scale(0.5)"
                  className="absolute inset-0 flex items-center justify-center rounded-[1.4cqw] border border-border-blue bg-surface-blue-tint text-blue-300"
                >
                  <Check aria-hidden="true" className="size-[5cqw]" strokeWidth={3} />
                </Anim>
              )}
            </span>
          ))}
        </div>
        <ChatBubble from="agent" at={4} enter="translateX(-6cqw) scale(0.96)" className="self-start">
          Hace 6 meses de tu último servicio. ¿Agendamos?
        </ChatBubble>
      </div>

      <ResultChip at={7} className="mt-auto">
        Cita confirmada
      </ResultChip>
    </DemoFrame>
  );
}

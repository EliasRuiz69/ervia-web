import { Lock } from "lucide-react";

import { ChatBubble, DemoFrame, ResultChip } from "./kit";

/**
 * Tesis · "Tu asistente privado de investigación" (prioridad B): una pregunta recibe una respuesta con la
 * etiqueta de la página exacta ("p. 42"). FASE 4b: fotograma final estático (`still`).
 */
export function TesisAsistenteDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt} still>
      <p className="flex items-center gap-[1.6cqw] text-[4.4cqw] leading-none text-text-muted">
        <Lock aria-hidden="true" className="size-[4.4cqw]" strokeWidth={1.75} />
        Solo tus documentos
      </p>

      <div className="mt-[3cqw] flex flex-col gap-[2.4cqw]">
        <ChatBubble from="client" at={0}>
          ¿Qué método usó Ruiz?
        </ChatBubble>
        <ChatBubble from="agent" at={2}>
          Una encuesta.{" "}
          <span className="ml-[1cqw] inline-block rounded-pill border border-border-blue bg-surface-blue-tint px-[2cqw] py-[0.6cqw] text-[4cqw] font-semibold text-blue-300">
            p. 42
          </span>
        </ChatBubble>
      </div>

      <ResultChip at={5} className="mt-auto">
        Con la página exacta
      </ResultChip>
    </DemoFrame>
  );
}

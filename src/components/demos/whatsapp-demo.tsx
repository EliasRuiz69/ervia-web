import { ChatBubble, DemoFrame, ResultChip } from "./kit";
import { HERO_CONVERSATIONS } from "@/content/hero-conversations";

/**
 * Asistente de WhatsApp (prioridad A): miniatura del mockup del hero. Reutiliza su conversación de ejemplo
 * (taller mecánico, mismo nombre, mismas burbujas y mismo chip de resultado), en versión corta para que
 * cada burbuja quepa en una línea. Cliente → asistente → cliente → "Cita agendada".
 */
const { contactName } = HERO_CONVERSATIONS[0];

export function WhatsAppDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt}>
      {/* Cabecera del chat (la misma del mockup del hero) */}
      <div className="-mx-[4cqw] -mt-[7cqw] mb-[3cqw] flex items-center gap-[2.4cqw] border-b border-border-subtle bg-surface-raised px-[4cqw] py-[2cqw]">
        <span className="flex size-[7cqw] shrink-0 items-center justify-center rounded-full bg-blue-500 text-[4cqw] leading-none font-bold text-text-on-blue">
          {contactName.charAt(0)}
        </span>
        <span className="text-[4.4cqw] leading-none font-semibold text-text-strong">{contactName}</span>
      </div>

      <div className="flex flex-col gap-[2cqw]">
        <ChatBubble from="client" at={0}>
          ¿Cuánto cuesta una afinación?
        </ChatBubble>
        <ChatBubble from="agent" at={2}>
          Desde $1,200. ¿Mañana a las 9:00?
        </ChatBubble>
        <ChatBubble from="client" at={4}>
          Sí, mañana 👍
        </ChatBubble>
      </div>

      <ResultChip at={6} className="mt-auto">
        Cita agendada
      </ResultChip>
    </DemoFrame>
  );
}

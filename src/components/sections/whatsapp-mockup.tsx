import type { Conversation } from "@/content/hero-conversations";

import { PhoneFrame } from "./phone-frame";
import { ConversationView } from "./whatsapp-conversation";
import { WhatsAppMockupRotator } from "./whatsapp-mockup-rotator";

/**
 * Mockup de WhatsApp del hero (auditoría 3.4). v1: una sola conversación (taller), sin pestañas.
 * Con varias conversaciones (v2) usa el rotador, que añade pestañas de giro y las alterna.
 * Etiqueta discreta "Conversación de ejemplo" bajo el teléfono (no es un cliente real).
 */
export function WhatsAppMockup({ conversations }: { conversations: Conversation[] }) {
  if (conversations.length === 0) return null;

  return (
    <figure className="m-0 flex flex-col items-center gap-3">
      {conversations.length === 1 ? (
        <PhoneFrame summary={conversations[0].summary}>
          <ConversationView conversation={conversations[0]} />
        </PhoneFrame>
      ) : (
        <WhatsAppMockupRotator conversations={conversations} />
      )}
      <figcaption className="text-[14px] text-text-muted">Conversación de ejemplo</figcaption>
    </figure>
  );
}

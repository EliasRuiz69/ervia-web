"use client";

import { useEffect, useState } from "react";

import type { Conversation } from "@/content/hero-conversations";
import { cn } from "@/lib/utils";

import { PhoneFrame } from "./phone-frame";
import { buildTimeline, ConversationView } from "./whatsapp-conversation";

const HOLD_MS = 3500; // pausa con la conversación completa antes de pasar a la siguiente

/**
 * v2: varias conversaciones con pestañas de giro. Avanza sola al terminar cada una, se detiene
 * mientras el cursor está encima y no avanza sola con prefers-reduced-motion (el usuario elige la pestaña).
 */
export function WhatsAppMockupRotator({ conversations }: { conversations: Conversation[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (hovered || reduced) return;
    const total = buildTimeline(conversations[active]).total * 1000 + HOLD_MS;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % conversations.length), total);
    return () => window.clearTimeout(id);
  }, [active, hovered, reduced, conversations]);

  const current = conversations[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next = (active + step + conversations.length) % conversations.length;
    setActive(next);
    document.getElementById(`wa-tab-${conversations[next].id}`)?.focus();
  };

  return (
    <div
      className="flex w-full flex-col items-center gap-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        role="tablist"
        aria-label="Giro del negocio"
        onKeyDown={onKeyDown}
        className="flex flex-wrap justify-center gap-2"
      >
        {conversations.map((c, i) => (
          <button
            key={c.id}
            id={`wa-tab-${c.id}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="wa-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "inline-flex min-h-11 items-center rounded-pill border px-4 text-[14px] font-semibold transition-colors duration-(--duration-fast) ease-out",
              i === active
                ? "border-border-blue bg-surface-blue-tint text-blue-300"
                : "border-border-default text-text-body hover:border-border-strong hover:text-text-strong",
            )}
          >
            {c.vertical}
          </button>
        ))}
      </div>
      <div
        id="wa-panel"
        role="tabpanel"
        aria-labelledby={`wa-tab-${current.id}`}
        className="w-full"
      >
        <PhoneFrame summary={current.summary}>
          <ConversationView key={current.id} conversation={current} />
        </PhoneFrame>
      </div>
    </div>
  );
}

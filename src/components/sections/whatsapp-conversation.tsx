import { Check } from "lucide-react";
import type { CSSProperties } from "react";

import type { Conversation } from "@/content/hero-conversations";
import { cn } from "@/lib/utils";

/**
 * Vista de UNA conversación dentro del teléfono del hero (auditoría 3.4).
 * Animación 100 % CSS (opacity/transform), definida en globals.css (.wa-*):
 *  mensaje del cliente → "escribiendo…" del agente → respuesta → … → chips de resultado uno a uno.
 * Con prefers-reduced-motion se ve completa y estática.
 */

const START = 0.7; // s hasta el primer mensaje
const CLIENT_GAP = 1.1; // s tras un mensaje del cliente
const TYPING = 1.6; // s de "escribiendo…"
const AGENT_GAP = 1.4; // s tras una respuesta del agente
const CHIP_GAP = 0.55; // s entre chips

type Timeline = {
  delays: number[]; // aparición de cada mensaje
  typing: { delay: number; dur: number }[]; // ventanas de "escribiendo…" (por mensaje del agente)
  typingOf: Map<number, { delay: number; dur: number }>;
  chips: number[];
  total: number; // s hasta que termina todo
};

export function buildTimeline(c: Conversation): Timeline {
  let t = START;
  const delays: number[] = [];
  const typing: Timeline["typing"] = [];
  const typingOf = new Map<number, { delay: number; dur: number }>();
  c.messages.forEach((m, i) => {
    if (m.from === "client") {
      delays.push(t);
      t += CLIENT_GAP;
    } else {
      const w = { delay: t, dur: TYPING };
      typing.push(w);
      typingOf.set(i, w);
      t += TYPING;
      delays.push(t);
      t += AGENT_GAP;
    }
  });
  const chips = c.results.map((_, i) => t + i * CHIP_GAP);
  return { delays, typing, typingOf, chips, total: t + c.results.length * CHIP_GAP + 0.4 };
}

const d = (s: number) => ({ "--wa-d": `${s.toFixed(2)}s` }) as CSSProperties;

function windows(list: { delay: number; dur: number }[], name: string) {
  return list.map((w) => `${name} ${w.dur}s linear ${w.delay.toFixed(2)}s both`).join(", ");
}

function TypingDots({ delay, dur }: { delay: number; dur: number }) {
  return (
    <span
      className="wa-typing inline-flex h-full items-center gap-1 rounded-xl rounded-bl-sm bg-surface-raised px-3 py-3"
      style={{ animation: `wa-window ${dur}s linear ${delay.toFixed(2)}s both`, opacity: 0 }}
    >
      {[0, 1, 2].map((n) => (
        <span
          key={n}
          className="wa-dot block size-1.5 rounded-full bg-text-muted"
          style={{
            animation: `wa-dot 0.8s ease-in-out ${(delay + n * 0.15).toFixed(2)}s 2`,
          }}
        />
      ))}
    </span>
  );
}

export function ConversationView({ conversation: c }: { conversation: Conversation }) {
  const tl = buildTimeline(c);

  return (
    <>
      {/* Cabecera del chat: nombre y estado ("en línea" ⇄ "escribiendo…") */}
      <div className="flex items-center gap-3 border-b border-border-subtle bg-surface-raised px-3 py-2 lg:px-4 lg:py-3">
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[14px] font-bold text-text-on-blue lg:size-9"
        >
          {c.contactName.charAt(0)}
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-[15px] font-semibold text-text-strong">
            {c.contactName}
          </span>
          <span className="relative block h-[18px] text-[13px] text-text-muted">
            <span
              className="wa-status-idle absolute inset-0"
              style={{ animation: windows(tl.typing, "wa-window-inverse") }}
            >
              en línea
            </span>
            <span
              className="wa-status-typing absolute inset-0 text-blue-300"
              style={{ animation: windows(tl.typing, "wa-window"), opacity: 0 }}
            >
              escribiendo…
            </span>
          </span>
        </span>
      </div>

      {/* Mensajes */}
      <div className="flex flex-1 flex-col justify-start gap-1.5 overflow-hidden px-3 py-3 lg:gap-2.5 lg:px-4 lg:py-4">
        {c.messages.map((m, i) => {
          const agent = m.from === "agent";
          const typing = tl.typingOf.get(i);
          return (
            <div
              key={i}
              className={cn("grid", agent ? "justify-items-start" : "justify-items-end")}
            >
              {typing && (
                <div className="col-start-1 row-start-1 self-end">
                  <TypingDots delay={typing.delay} dur={typing.dur} />
                </div>
              )}
              <p
                className={cn(
                  "wa-step col-start-1 row-start-1 max-w-[86%] rounded-xl px-2.5 py-1.5 text-[14px] leading-[1.4] lg:px-3 lg:py-2 lg:text-[15px]",
                  agent
                    ? "rounded-bl-sm bg-surface-raised text-text-strong"
                    : "rounded-br-sm bg-blue-600 text-text-on-blue",
                )}
                style={d(tl.delays[i])}
              >
                {m.text}
                <span
                  className={cn(
                    "ml-2 inline-block translate-y-[3px] text-[13px] leading-none whitespace-nowrap",
                    agent ? "text-text-muted" : "text-white/75",
                  )}
                >
                  {m.time}
                </span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Cierre de resultado (chips verdes: resultado, regla D-J) */}
      <ul className="flex flex-wrap gap-1.5 border-t border-border-subtle bg-surface-deep px-3 py-2.5 lg:gap-2 lg:px-4 lg:py-3.5">
        {c.results.map((r, i) => (
          <li
            key={r}
            className="wa-step inline-flex items-center gap-1 rounded-pill border border-border-green bg-surface-green-tint px-2.5 py-1 text-[13px] leading-tight font-semibold text-green-400"
            style={d(tl.chips[i])}
          >
            <Check aria-hidden="true" className="size-3.5 shrink-0 text-green-500" strokeWidth={3} />
            {r}
          </li>
        ))}
      </ul>
    </>
  );
}

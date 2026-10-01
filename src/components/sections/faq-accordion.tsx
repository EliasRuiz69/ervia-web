"use client";

import { useState } from "react";

import type { FaqItem } from "@/content/faq";
import { cn } from "@/lib/utils";

/**
 * Acordeón accesible (docs/design-base.md §3, corregido): un solo ítem abierto, todos cerrados al inicio,
 * <button type="button"> con aria-expanded y aria-controls, panel con role="region" enlazado a su botón.
 * La apertura es instantánea (sin animar altura). El "+/−" es azul (regla D-J) y el trazo vertical se
 * escala con transform para convertir el "+" en "−".
 */
export function FaqAccordion({ items }: { items: ReadonlyArray<FaqItem> }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="mt-12 border-t border-border-subtle">
      {items.map(({ question, answer }, i) => {
        const isOpen = open === i;
        const buttonId = `faq-pregunta-${i}`;
        const panelId = `faq-respuesta-${i}`;
        return (
          <li key={question} className="border-b border-border-subtle">
            <h3 className="font-body text-[18px] leading-[1.4] font-semibold">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex min-h-11 w-full items-center justify-between gap-6 px-1 py-[22px] text-left text-text-strong transition-colors duration-(--duration-fast) ease-out hover:text-blue-300"
              >
                <span>{question}</span>
                <span aria-hidden="true" className="relative size-5 shrink-0 text-blue-400">
                  <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 rounded-full bg-current" />
                  <span
                    className={cn(
                      "absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 rounded-full bg-current transition-transform duration-(--duration-base) ease-out",
                      isOpen && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-1 pb-6"
            >
              <p className="max-w-[660px] text-[16px] leading-[1.65] text-text-body">{answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

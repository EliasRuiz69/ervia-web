import { Mail } from "lucide-react";

import { Anim, DemoFrame, ResultChip } from "./kit";

/**
 * Dominio y correo profesional (prioridad A): en una tarjeta de presentación, el correo de gmail se tacha
 * y se escribe el del dominio del negocio. Nombres y dominio inventados, de ejemplo.
 */
export function CorreoDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt}>
      <div className="rounded-[2cqw] border border-border-default bg-surface-raised p-[4cqw]">
        <p className="font-display text-[7cqw] leading-none font-bold text-text-strong">Taller Juan</p>
        <p className="mt-[1.6cqw] text-[4.4cqw] leading-none text-text-muted">Refacciones y servicio</p>

        <div className="mt-[4cqw] grid">
          {/* Correo viejo: se tacha (línea que se dibuja) y deja su lugar al nuevo */}
          <Anim
            at={3}
            kind="out"
            className="relative col-start-1 row-start-1 flex items-center gap-[2cqw] text-[4.4cqw] leading-none text-text-body"
          >
            <Mail aria-hidden="true" className="size-[5cqw] shrink-0" strokeWidth={1.75} />
            <span className="relative">
              tallerjuan88@gmail.com
              <Anim
                at={1}
                from="scaleX(0)"
                className="absolute top-1/2 left-0 h-[0.7cqw] w-full origin-left rounded-pill bg-text-strong"
              />
            </span>
          </Anim>
          <Anim
            at={3}
            from="translateY(1.6cqw)"
            className="col-start-1 row-start-1 flex items-center gap-[2cqw] text-[4.4cqw] leading-none font-semibold text-blue-300"
          >
            <Mail aria-hidden="true" className="size-[5cqw] shrink-0" strokeWidth={1.75} />
            ventas@tallerjuan.mx
          </Anim>
        </div>
      </div>

      <ResultChip at={6} className="mt-auto">
        Correo con tu dominio
      </ResultChip>
    </DemoFrame>
  );
}

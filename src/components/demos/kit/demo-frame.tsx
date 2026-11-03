"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Marco de una mini-demo (plan v2, sección 4): caja de proporción fija 16/10 (CLS = 0), contenedor de
 * consultas (las demos se dimensionan en `cqw`, así se ven igual en cualquier tarjeta).
 *
 * - `role="img"` + `aria-label={alt}`: la tarjeta expone solo el texto alternativo; la animación va con aria-hidden.
 * - `data-playing`: true solo mientras el marco está en pantalla (IntersectionObserver) y la pestaña del
 *   navegador es visible. Una demo en una pestaña oculta (display: none) nunca intersecta, así que queda en pausa.
 * - `still`: fotograma final estático (demos de prioridad B hasta la Fase 3).
 * - Rótulo "Ejemplo" en la esquina: todo lo que se ve en una demo es de ejemplo (regla de contenido).
 */
export function DemoFrame({
  alt,
  still = false,
  label = "Ejemplo",
  className,
  children,
}: {
  alt: string;
  still?: boolean;
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (still || !el) return;

    let visible = false;
    const sync = () => setPlaying(visible && document.visibilityState === "visible");
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [still]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={alt}
      data-playing={playing}
      data-still={still || undefined}
      className={cn("demo relative aspect-[16/10] w-full overflow-hidden bg-surface-deep", className)}
    >
      <div aria-hidden="true" className="absolute inset-0 flex flex-col px-[4cqw] pt-[7cqw] pb-[4cqw]">
        {children}
      </div>
      <span
        aria-hidden="true"
        className="absolute top-[2.4cqw] right-[3cqw] text-[3.8cqw] leading-none text-text-muted"
      >
        {label}
      </span>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type PricingCarouselProps = {
  /** `id` de la lista: lo usa el script de posición inicial (src/lib/carousel-start-script.ts). */
  listId: string;
  /** Nombre de cada plan, en el mismo orden que los hijos (para los puntos del indicador). */
  labels: ReadonlyArray<string>;
  /** Plan que se ve primero en móvil (Automatizar, el recomendado). */
  initialIndex: number;
  /** Un <li> por plan. */
  children: React.ReactNode;
};

/** `scrollLeft` que deja centrada la tarjeta `index` dentro de la lista. */
function centerOf(list: HTMLUListElement, index: number) {
  const card = list.children[index] as HTMLElement | undefined;
  if (!card) return 0;
  return card.offsetLeft - (list.clientWidth - card.offsetWidth) / 2;
}

/** Índice de la tarjeta más cercana al centro, según el scroll real (no mueve nada). */
function nearestIndex(list: HTMLUListElement) {
  let nearest = 0;
  let best = Infinity;
  for (let i = 0; i < list.children.length; i++) {
    const distance = Math.abs(centerOf(list, i) - list.scrollLeft);
    if (distance < best) {
      best = distance;
      nearest = i;
    }
  }
  return nearest;
}

/**
 * Planes de precios: carrusel con scroll-snap en móvil (< 1024 px) y rejilla de 3 columnas en escritorio.
 * El orden del DOM sigue el del método (1·2·3); en móvil la lista ya aparece centrada en `initialIndex`
 * gracias al script de src/lib/carousel-start-script.ts, que el servidor inserta tras la lista. Si ese
 * script no corriera, la lista queda en el primer plan y el indicador lo refleja (ver `nearestIndex`).
 * El indicador (puntos) solo aparece en móvil; cada punto mide 44×44 px.
 */
export function PricingCarousel({ listId, labels, initialIndex, children }: PricingCarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(initialIndex);

  // Al hidratar solo se lee la posición real (por si el script de inicio no corrió); nunca se mueve el scroll.
  useEffect(() => {
    const list = listRef.current;
    if (list && list.scrollWidth > list.clientWidth) setActive(nearestIndex(list));
  }, []);

  const onScroll = () => {
    if (listRef.current) setActive(nearestIndex(listRef.current));
  };

  const goTo = (index: number) => {
    const list = listRef.current;
    if (!list) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: centerOf(list, index), behavior: reduce ? "instant" : "smooth" });
  };

  return (
    <>
      <ul
        id={listId}
        ref={listRef}
        onScroll={onScroll}
        className={cn(
          // Móvil: carrusel.
          "relative -mx-5 mt-12 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          // Escritorio: rejilla de 3 columnas.
          "lg:mx-0 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0",
        )}
      >
        {children}
      </ul>

      <div
        role="group"
        aria-label="Elegir plan"
        className="mt-2 flex justify-center lg:hidden"
      >
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ver el plan ${label}`}
            aria-current={active === i ? "true" : undefined}
            className="flex size-11 items-center justify-center rounded-full"
          >
            {/* Punto: círculo + píldora superpuestos; el activo se muestra con opacity y scaleX (solo compositor). */}
            <span aria-hidden="true" className="relative block h-2.5 w-6">
              <span
                className={cn(
                  "absolute top-0 left-1/2 block size-2.5 -translate-x-1/2 rounded-full bg-border-strong transition-opacity duration-(--duration-base) ease-out",
                  active === i ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute inset-0 block origin-center rounded-full bg-blue-400 transition-[opacity,transform] duration-(--duration-base) ease-out",
                  active === i ? "scale-x-100 opacity-100" : "scale-x-[0.42] opacity-0",
                )}
              />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

/** `scrollLeft` que deja centrada la tarjeta `index` dentro de la lista. */
function centerOf(list: HTMLUListElement, index: number) {
  const card = list.children[index] as HTMLElement | undefined;
  if (!card) return 0;
  return card.offsetLeft - (list.clientWidth - card.offsetWidth) / 2;
}

/** Índice de la tarjeta más cercana al centro, según el scroll real. */
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
 * Tarjetas de un bloque de servicios: carrusel horizontal con scroll-snap en móvil y tablet (< 1024 px),
 * con un trozo de la tarjeta siguiente a la vista, e indicador de puntos (44×44 px cada uno). Desde 1024 px,
 * rejilla con `gridClassName` (columnas según el bloque). La lista arranca en la primera tarjeta.
 */
export function ServicesCarousel({
  labels,
  gridClassName,
  children,
}: {
  /** Nombre de cada servicio, en el orden de los hijos (para los puntos). */
  labels: ReadonlyArray<string>;
  gridClassName: string;
  /** Un <li> por servicio. */
  children: React.ReactNode;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    const list = listRef.current;
    if (!list) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: centerOf(list, index), behavior: reduce ? "instant" : "smooth" });
  };

  return (
    <>
      <ul
        ref={listRef}
        onScroll={() => listRef.current && setActive(nearestIndex(listRef.current))}
        className={cn(
          // Móvil y tablet: carrusel.
          "relative -mx-5 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-mx-8 md:px-8",
          // Escritorio: rejilla.
          "lg:mx-0 lg:grid lg:snap-none lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0",
          gridClassName,
        )}
      >
        {children}
      </ul>

      <div role="group" aria-label="Elegir servicio" className="mt-2 flex justify-center lg:hidden">
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ver ${label}`}
            aria-current={active === i ? "true" : undefined}
            className="flex size-11 items-center justify-center rounded-full"
          >
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

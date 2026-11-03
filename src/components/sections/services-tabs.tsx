"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { BLOQUES, BLOQUE_POR_DEFECTO, SERVICES, type BloqueId } from "@/config/services";
import { cn } from "@/lib/utils";

const BLOQUE_IDS = BLOQUES.map((b) => b.id);

/** #servicios-<bloque> abre una pestaña; #servicio-<id> abre la del servicio y lleva hasta su tarjeta. */
function parseHash(hash: string): { bloque: BloqueId; serviceId?: string } | null {
  const h = hash.replace(/^#/, "");
  if (h.startsWith("servicios-")) {
    const bloque = BLOQUE_IDS.find((id) => id === h.slice("servicios-".length));
    return bloque ? { bloque } : null;
  }
  if (h.startsWith("servicio-")) {
    const service = SERVICES.find((s) => s.id === h.slice("servicio-".length));
    return service ? { bloque: service.bloque, serviceId: service.id } : null;
  }
  return null;
}

/**
 * Pestañas de la sección Servicios (plan v2, sección 4): role tablist/tab/tabpanel, flechas izquierda y
 * derecha, Home y End. La pestaña activa vive en el hash (#servicios-encuentren | -atiende | -ordena);
 * "atiende" va abierta por defecto. Los paneles (tarjetas) llegan ya renderizados desde el servidor.
 *
 * Los chips del hero (<a data-servicio="<id>" href="#servicios-<bloque>">) se interceptan aquí: abren la
 * pestaña del servicio, hacen scroll hasta su tarjeta (id="servicio-<id>") y le mueven el foco. Sin
 * JavaScript, el chip lleva a la pestaña por el id nativo del botón (#servicios-<bloque>).
 * Los paneles ocultos usan `hidden` (display: none): sus demos no intersectan y quedan en pausa.
 */
export function ServicesTabs({ panels }: { panels: Record<BloqueId, React.ReactNode> }) {
  const [active, setActive] = useState<BloqueId>(BLOQUE_POR_DEFECTO);
  const activeRef = useRef(active);
  const pendingCard = useRef<string | null>(null);
  const tabRefs = useRef<Partial<Record<BloqueId, HTMLButtonElement | null>>>({});

  const revealCard = useCallback((serviceId: string) => {
    const card = document.getElementById(`servicio-${serviceId}`);
    if (!card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    card.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center", inline: "center" });
    card.focus({ preventScroll: true });
  }, []);

  /** Abre la pestaña `bloque` y, si se indica, lleva hasta la tarjeta del servicio y le da el foco. */
  const open = useCallback(
    (bloque: BloqueId, serviceId?: string) => {
      history.replaceState(null, "", `#servicios-${bloque}`);
      if (bloque === activeRef.current) {
        if (serviceId) revealCard(serviceId);
        return;
      }
      pendingCard.current = serviceId ?? null;
      activeRef.current = bloque;
      setActive(bloque);
    },
    [revealCard],
  );

  // Tras cambiar de pestaña, el panel ya es visible: ahora sí se puede llegar hasta la tarjeta.
  useEffect(() => {
    const serviceId = pendingCard.current;
    if (!serviceId) return;
    pendingCard.current = null;
    requestAnimationFrame(() => revealCard(serviceId));
  }, [active, revealCard]);

  useEffect(() => {
    const fromHash = () => {
      const target = parseHash(window.location.hash);
      if (target) open(target.bloque, target.serviceId);
    };
    const onClick = (e: MouseEvent) => {
      const chip = (e.target as Element).closest<HTMLAnchorElement>("a[data-servicio]");
      if (!chip || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const service = SERVICES.find((s) => s.id === chip.dataset.servicio);
      if (!service) return;
      e.preventDefault();
      open(service.bloque, service.id);
    };

    // Enlace directo (/#servicios-ordena, /#servicio-facturas): se aplica al cargar y al cambiar el hash.
    queueMicrotask(fromHash);
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = BLOQUE_IDS.indexOf(activeRef.current);
    let next: number;
    if (e.key === "ArrowRight") next = (i + 1) % BLOQUE_IDS.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + BLOQUE_IDS.length) % BLOQUE_IDS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = BLOQUE_IDS.length - 1;
    else return;
    e.preventDefault();
    const bloque = BLOQUE_IDS[next];
    open(bloque);
    tabRefs.current[bloque]?.focus();
  };

  return (
    <div className="mt-10">
      <div
        role="tablist"
        aria-label="Tipos de servicio"
        onKeyDown={onKeyDown}
        className="grid grid-cols-3 gap-2 md:gap-3"
      >
        {BLOQUES.map(({ id, titulo, icono: Icon }) => {
          const selected = active === id;
          return (
            <button
              key={id}
              ref={(el) => {
                tabRefs.current[id] = el;
              }}
              type="button"
              role="tab"
              id={`servicios-${id}`}
              aria-selected={selected}
              aria-controls={`panel-${id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => open(id)}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-center text-[14px] leading-tight font-semibold",
                "transition-colors duration-(--duration-fast) ease-out md:flex-row md:gap-2.5 md:px-4 md:text-[17px]",
                selected
                  ? "border-border-blue bg-surface-blue-tint text-text-strong"
                  : "border-border-subtle text-text-body hover:border-border-default hover:text-text-strong",
              )}
            >
              <Icon aria-hidden="true" className="size-5 shrink-0 text-blue-400" strokeWidth={1.75} />
              {titulo}
            </button>
          );
        })}
      </div>

      {BLOQUES.map(({ id }) => (
        <div
          key={id}
          role="tabpanel"
          id={`panel-${id}`}
          aria-labelledby={`servicios-${id}`}
          hidden={active !== id}
          className="mt-8"
        >
          {panels[id]}
        </div>
      ))}
    </div>
  );
}

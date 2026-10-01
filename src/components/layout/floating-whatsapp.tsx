"use client";

import { useEffect, useState } from "react";

import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { WHATSAPP_ENABLED, whatsappUrl } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Botón flotante de WhatsApp, solo en móvil (< 768 px): 56×56 px. Se oculta mientras la sección
 * #contacto está en pantalla (ya tiene su propio botón de WhatsApp). No renderiza nada si
 * WHATSAPP_ENABLED es false. Al ocultarse queda fuera del orden de tabulación y del árbol de accesibilidad.
 */
export function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!WHATSAPP_ENABLED) return;
    const target = document.getElementById("contacto");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!WHATSAPP_ENABLED) return null;

  return (
    <a
      href={whatsappUrl("floating")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      data-cta="whatsapp"
      data-location="floating"
      className={cn(
        "fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 flex size-14 items-center justify-center rounded-full bg-green-500 text-text-on-green shadow-cta md:hidden",
        "transition-[opacity,transform,background-color] duration-(--duration-base) ease-out active:bg-green-600",
        hidden ? "pointer-events-none translate-y-2 opacity-0" : "opacity-100",
      )}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

type Item = { href: string; label: string };

/**
 * Menú hamburguesa (< 768 px). Patrón "disclosure" accesible:
 * botón con aria-expanded/aria-controls; se cierra con Escape (devolviendo el foco al botón),
 * al pulsar un enlace, al hacer clic fuera, al cambiar de ruta y al ensanchar la ventana.
 * Objetivos táctiles de 44 px.
 */
export function MobileMenu({
  links,
  cta,
  whatsappHref,
}: {
  links: readonly Item[];
  cta: Item;
  /** Si no hay URL (WHATSAPP_ENABLED = false) no se muestra ningún enlace de WhatsApp. */
  whatsappHref?: string;
}) {
  // El menú se considera abierto solo en la ruta donde se abrió: al navegar se cierra solo.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const open = openPath === pathname;

  const close = useCallback((returnFocus = false) => {
    setOpenPath(null);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => {
      if (mq.matches) close();
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  return (
    <div ref={rootRef} className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-movil"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpenPath(open ? null : pathname)}
        className="inline-flex size-11 items-center justify-center rounded-md border border-border-default text-text-strong transition-colors duration-(--duration-fast) ease-out hover:border-border-strong"
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      <nav
        id="menu-movil"
        aria-label="Menú principal"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border-subtle bg-navy-900 px-5 pt-2 pb-6 shadow-raised"
      >
        <ul className="flex flex-col">
          {links.map(({ href, label }) => (
            <li key={href} className="border-b border-border-subtle last:border-b-0">
              <Link
                href={href}
                onClick={() => close()}
                className="flex min-h-12 items-center text-[17px] font-medium text-text-body transition-colors duration-(--duration-fast) ease-out hover:text-text-strong"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col gap-3">
          {whatsappHref && (
            <Button asChild size="lg" className="w-full">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => close()}
                data-cta="whatsapp"
                data-location="nav"
              >
                <WhatsAppIcon className="size-5" />
                WhatsApp
              </a>
            </Button>
          )}
          <Button asChild size="lg" variant={whatsappHref ? "outline" : "primary"} className="w-full">
            <Link href={cta.href} onClick={() => close()} data-cta="diagnostico" data-location="nav">
              {cta.label}
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}

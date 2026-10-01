import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { HEADER_CTA, NAV_LINKS, WHATSAPP_ENABLED, whatsappUrl } from "@/config/site";
import { MobileMenu } from "./mobile-menu";

/**
 * Cabecera sticky (docs/design-base.md §3): fondo navy-900 al 78 % con blur de 12 px,
 * borde inferior sutil. Enlaces de ancla en escritorio; hamburguesa por debajo de 768 px.
 * CTAs (auditoría 7.1): [WhatsApp] (solo si WHATSAPP_ENABLED; verde, es el CTA principal) y
 * [Diagnóstico gratis] (outline; pasa a verde si WhatsApp está apagado).
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-navy-900/78 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <Link
          href="/"
          aria-label="ERVIA, ir al inicio"
          className="flex shrink-0 items-center rounded-sm"
        >
          <Logo variant="horizontal" tone="onDark" height={32} priority />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-11 items-center rounded-pill px-3 text-[14px] font-medium text-text-body transition-colors duration-(--duration-fast) ease-out hover:text-text-strong"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          {WHATSAPP_ENABLED && (
            <Button asChild size="sm" className="ml-2 px-3 lg:px-[18px]">
              <a
                href={whatsappUrl("nav")}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                data-location="nav"
              >
                <WhatsAppIcon className="size-5" />
                <span className="sr-only lg:not-sr-only">WhatsApp</span>
              </a>
            </Button>
          )}
          <Button asChild size="sm" variant={WHATSAPP_ENABLED ? "outline" : "primary"} className="ml-2">
            <Link href={HEADER_CTA.href} data-cta="diagnostico" data-location="nav">
              {HEADER_CTA.label}
            </Link>
          </Button>
        </nav>

        <MobileMenu
          links={NAV_LINKS}
          cta={HEADER_CTA}
          whatsappHref={WHATSAPP_ENABLED ? whatsappUrl("nav") : undefined}
        />
      </div>
    </header>
  );
}

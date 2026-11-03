"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { HEADER_CTA, NAV_LINKS, WHATSAPP_ENABLED, whatsappUrl } from "@/config/site";
import { TESIS_HEADER_CTA, TESIS_NAV_LINKS, TESIS_PATH, TESIS_WHATSAPP_URL } from "@/config/tesis";
import { MobileMenu } from "./mobile-menu";

/**
 * Enlaces y botones de la cabecera (escritorio y menú móvil). Cada página tiene su nav: la home usa NAV_LINKS
 * (Servicios · Cómo trabajamos · FAQ) y /tesis el suyo (Cómo te ayudamos · Cómo trabajamos · FAQ), con el
 * WhatsApp de tesis y el "Diagnóstico gratis" que baja al formulario de esa página. Es un componente de cliente
 * solo para leer la ruta; el resto de la cabecera (logo) sigue siendo de servidor.
 * CTAs (auditoría 7.1): [WhatsApp] (solo si WHATSAPP_ENABLED; verde, CTA principal) y [Diagnóstico gratis]
 * (outline; pasa a verde si WhatsApp está apagado).
 */
export function HeaderNav() {
  const pathname = usePathname();
  const isTesis = pathname === TESIS_PATH;
  const links = isTesis ? TESIS_NAV_LINKS : NAV_LINKS;
  const cta = isTesis ? TESIS_HEADER_CTA : HEADER_CTA;
  const whatsappHref = isTesis ? TESIS_WHATSAPP_URL : whatsappUrl("nav");

  return (
    <>
      <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
        <ul className="flex items-center">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-pill px-2 text-[14px] whitespace-nowrap lg:px-3 font-medium text-text-body transition-colors duration-(--duration-fast) ease-out hover:text-text-strong"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        {WHATSAPP_ENABLED && (
          <Button asChild size="sm" className="ml-2 px-3 lg:px-[18px]">
            <a
              href={whatsappHref}
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
          <Link href={cta.href} data-cta="diagnostico" data-location="nav">
            {cta.label}
          </Link>
        </Button>
      </nav>

      <MobileMenu links={links} cta={cta} whatsappHref={WHATSAPP_ENABLED ? whatsappHref : undefined} />
    </>
  );
}

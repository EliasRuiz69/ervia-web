import Link from "next/link";
import { MapPin } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Brand } from "@/components/ui/brand";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Container } from "./container";
import { SERVICES } from "@/config/services";
import { LEGAL_LINKS, SITE, SOCIAL_LINKS, WHATSAPP_ENABLED } from "@/config/site";
import { TESIS_PAGE_ENABLED, TESIS_WHATSAPP_URL } from "@/config/tesis";
import { cn } from "@/lib/utils";

const footerLink =
  "inline-flex min-h-11 items-center text-[15px] text-text-body transition-colors duration-(--duration-fast) ease-out hover:text-text-strong";

/**
 * Pie (docs/design-base.md §3): fondo navy-950, overlines azules, tres columnas en escritorio: contacto,
 * servicios (enlaces a cada tarjeta, #servicio-<id>; ServicesTabs abre la pestaña y da el foco) y legal.
 * Al final de "Servicios", "Te ayudamos con tu tesis": → /tesis si TESIS_PAGE_ENABLED; si no, → WhatsApp con el
 * texto de tesis (o a #contacto si WhatsApp está desactivado).
 * Los íconos sociales solo aparecen si hay URL real en SOCIAL_LINKS (hoy: ninguna).
 */
export function Footer() {
  const hasSocial = SOCIAL_LINKS.length > 0;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-surface-deep">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-8 pt-12 md:grid-cols-[1fr_1.5fr_1fr] md:gap-14 md:pt-[52px]">
        <div className="order-1 flex flex-col items-start gap-5 md:order-none">
          <Eyebrow>Contacto</Eyebrow>
          <Logo variant="horizontal" tone="onDark" height={30} />
          <a href={`mailto:${SITE.email}`} className={footerLink}>
            {SITE.email}
          </a>
          <span className="inline-flex items-center gap-2 text-[15px] text-text-muted">
            <MapPin aria-hidden="true" className="size-4 text-blue-400" />
            {SITE.location}
          </span>
        </div>

        <nav aria-label="Servicios" className="order-3 col-span-2 flex flex-col items-start gap-1 md:order-none md:col-span-1">
          <Eyebrow className="mb-2">Servicios</Eyebrow>
          <ul className="grid grid-cols-2 gap-x-6">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link href={`/#servicio-${s.id}`} data-servicio={s.id} className={footerLink}>
                  {s.chip}
                </Link>
              </li>
            ))}
          </ul>
          {TESIS_PAGE_ENABLED ? (
            <Link href="/tesis" className={cn(footerLink, "font-semibold text-blue-400 hover:text-blue-300")}>
              Te ayudamos con tu tesis
            </Link>
          ) : WHATSAPP_ENABLED ? (
            <a
              href={TESIS_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp"
              data-location="footer-tesis"
              className={cn(footerLink, "font-semibold text-blue-400 hover:text-blue-300")}
            >
              Te ayudamos con tu tesis
            </a>
          ) : (
            <Link href="/#contacto" className={cn(footerLink, "font-semibold text-blue-400 hover:text-blue-300")}>
              Te ayudamos con tu tesis
            </Link>
          )}
        </nav>

        <nav aria-label="Legal" className="order-2 flex flex-col items-start gap-1 md:order-none">
          <Eyebrow className="mb-2">Legal</Eyebrow>
          {LEGAL_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={footerLink}>
              {label}
            </Link>
          ))}
        </nav>

        {hasSocial && (
          <nav aria-label="Redes sociales" className="flex flex-col items-start gap-3">
            <Eyebrow className="mb-2">Enlaces</Eyebrow>
            <ul className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-md border border-border-subtle bg-surface-raised px-4 text-[15px] text-text-body transition-colors duration-(--duration-fast) ease-out hover:border-border-default hover:text-text-strong"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>

      {/* En móvil, con WhatsApp activo, deja sitio bajo la última línea para que el botón flotante
          (56 px + 16 px de margen) nunca tape los enlaces legales ni el © */}
      <Container
        className={cn(
          "mt-10 border-t border-border-subtle py-5",
          WHATSAPP_ENABLED && "pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-5",
        )}
      >
        <p className="text-[14px] text-text-muted">
          © {year} <Brand>{SITE.name}</Brand>. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}

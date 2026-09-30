import Link from "next/link";
import { MapPin } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Container } from "./container";
import { LEGAL_LINKS, SITE, SOCIAL_LINKS, WHATSAPP_ENABLED } from "@/config/site";
import { cn } from "@/lib/utils";

const footerLink =
  "inline-flex min-h-11 items-center text-[15px] text-text-body transition-colors duration-(--duration-fast) ease-out hover:text-text-strong";

/**
 * Pie (docs/design-base.md §3): fondo navy-950, overlines azules, tres columnas en escritorio.
 * Los íconos sociales solo aparecen si hay URL real en SOCIAL_LINKS (hoy: ninguna).
 */
export function Footer() {
  const hasSocial = SOCIAL_LINKS.length > 0;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-surface-deep">
      <Container className="grid gap-10 pt-16 md:grid-cols-3 md:gap-14 md:pt-[72px]">
        <div className="flex flex-col items-start gap-5">
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

        <nav aria-label="Legal" className="flex flex-col items-start gap-1">
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
          "mt-14 border-t border-border-subtle py-6",
          WHATSAPP_ENABLED && "pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-6",
        )}
      >
        <p className="text-[14px] text-text-muted">
          © {year} {SITE.name}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}

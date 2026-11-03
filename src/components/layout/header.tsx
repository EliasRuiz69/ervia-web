import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { HeaderNav } from "./header-nav";

/**
 * Cabecera sticky (docs/design-base.md §3): fondo navy-900 al 78 % con blur de 12 px, borde inferior sutil.
 * Logo a la izquierda; los enlaces, los botones y el menú móvil (hamburguesa por debajo de 768 px) están en
 * HeaderNav, que elige el nav de la home o el de /tesis.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-navy-900/78 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <Link
          href="/"
          aria-label="ERVIA, ir al inicio"
          className="flex min-h-11 shrink-0 items-center rounded-sm"
        >
          <Logo variant="horizontal" tone="onDark" height={32} priority />
        </Link>

        <HeaderNav />
      </div>
    </header>
  );
}

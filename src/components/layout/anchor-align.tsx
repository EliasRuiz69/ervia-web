"use client";

import { useEffect } from "react";

/** Secciones a las que enlazan el nav, los botones y el footer (ids de la home y de /tesis). */
const SECTION_IDS = new Set([
  "inicio",
  "servicios",
  "por-que-ervia",
  "como-trabajamos",
  "como-te-ayudamos",
  "faq",
  "contacto",
]);

/**
 * Alinea los enlaces ancla (#faq, #contacto…) cuando las secciones bajo el primer pantallazo se renderizan de forma
 * diferida (content-visibility: auto, ver deferOffscreen en layout/section.tsx). Mientras una sección no se ha
 * renderizado, el navegador usa su alto de reserva; si difiere un poco del real, el scroll cae unos píxeles
 * corrido. Aquí se espera a que el scroll se detenga y, si el destino no quedó justo bajo la cabecera, se corrige.
 * No toca los enlaces de los chips/footer de servicios (los gestiona ServicesTabs) ni los enlaces a otras páginas.
 */
export function AnchorAlign() {
  useEffect(() => {
    const settleAndAlign = (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      let last = Number.NaN;
      let stable = 0;
      let frames = 0;
      const tick = () => {
        const y = window.scrollY;
        stable = y === last ? stable + 1 : 0;
        last = y;
        frames += 1;
        if (stable >= 10 || frames > 300) {
          const delta = target.getBoundingClientRect().top - pad;
          if (Math.abs(delta) > 6) window.scrollTo({ top: y + delta, behavior: "instant" });
          return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const fromLocation = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (SECTION_IDS.has(id)) settleAndAlign(id);
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>("a[href*='#']");
      if (!a || a.dataset.servicio || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname) return; // otra página: se alinea al cargar (fromLocation)
      const id = decodeURIComponent(url.hash.slice(1));
      if (SECTION_IDS.has(id)) setTimeout(() => settleAndAlign(id), 0);
    };

    fromLocation();
    window.addEventListener("hashchange", fromLocation);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", fromLocation);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}

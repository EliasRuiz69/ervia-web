"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Envoltorio del diagrama del Método: marca `data-inview="true"` la primera vez que entra en pantalla.
 * Los estilos de `.m-reveal` (globals.css) dibujan entonces la línea y los nodos con transform/opacity.
 * Sin JavaScript o con prefers-reduced-motion el diagrama se ve completo y estático.
 */
export function MethodReveal({ className, children }: React.ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-inview={inView} className={cn("m-reveal", className)}>
      {children}
    </div>
  );
}

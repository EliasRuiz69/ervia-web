import { chipLinkClass } from "@/components/ui/chip";
import { SERVICES, bloqueHash } from "@/config/services";

/**
 * Fila de chips con todos los servicios (plan v2, 3.1), generada desde src/config/services.ts. Cada chip
 * enlaza a la pestaña de su bloque (#servicios-<bloque>) y lleva `data-servicio` con el id de la tarjeta que
 * recibirá el foco (Fase 2, cuando existan las tarjetas).
 *
 * Móvil: una sola fila con scroll horizontal, sin barra visible y con degradado en el borde derecho
 * (máscara, para que funcione sobre cualquier fondo). El padding derecho deja que el último chip salga del
 * degradado. Desde sm: se acomodan en varias filas.
 */
export function HeroServiceChips() {
  return (
    <nav aria-label="Servicios" className="mt-8">
      <ul
        className={
          "-mx-5 flex gap-2.5 overflow-x-auto px-5 pr-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden " +
          "max-sm:[mask-image:linear-gradient(to_right,#000_calc(100%-56px),transparent)] " +
          "sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pr-0"
        }
      >
        {SERVICES.map((s) => (
          <li key={s.id} className="shrink-0">
            <a
              href={bloqueHash(s.bloque)}
              data-servicio={s.id}
              data-location="hero-chip"
              className={chipLinkClass}
            >
              {s.chip}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

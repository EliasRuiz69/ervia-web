import { chipLinkClass, chipScrollRowClass } from "@/components/ui/chip";
import { SERVICES, bloqueHash } from "@/config/services";

/**
 * Fila de chips con todos los servicios (plan v2, 3.1), generada desde src/config/services.ts. Cada chip
 * enlaza a la pestaña de su bloque (#servicios-<bloque>) y lleva `data-servicio` con el id de la tarjeta que
 * recibirá el foco (Fase 2, cuando existan las tarjetas).
 *
 * Móvil: una sola fila con scroll horizontal (chipScrollRowClass, compartida con la línea de giros de
 * "Cómo trabajamos"). Desde sm: se acomodan en varias filas.
 */
export function HeroServiceChips() {
  return (
    <nav aria-label="Servicios" className="mt-8">
      <ul className={chipScrollRowClass}>
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

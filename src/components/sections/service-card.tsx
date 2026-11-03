import Link from "next/link";

import { ServiceDemo } from "@/components/demos";
import { WHATSAPP_ENABLED } from "@/config/site";
import { serviceWhatsappUrl, type Service } from "@/config/services";
import { cn } from "@/lib/utils";

const cta =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-pill border border-border-default px-[22px] py-2.5 text-[15px] font-semibold text-text-body transition-colors duration-(--duration-fast) ease-out hover:border-border-strong hover:text-text-strong";

/**
 * Tarjeta de un servicio (plan v2, 3.2): demo arriba, H3, promesa, ejemplo en pequeño y "Lo quiero →".
 * Tiene id="servicio-<id>" y tabIndex={-1}: los chips del hero y los enlaces del footer abren su pestaña,
 * llegan hasta ella y le mueven el foco (ver ServicesTabs). "Lo quiero →" abre WhatsApp con el waText del
 * servicio; con WHATSAPP_ENABLED en false va a #contacto.
 */
export function ServiceCard({ service: s }: { service: Service }) {
  return (
    <article
      id={`servicio-${s.id}`}
      tabIndex={-1}
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden rounded-lg border bg-surface-card shadow-card",
        s.destacado ? "border-border-blue shadow-glow-blue" : "border-border-subtle",
      )}
    >
      <ServiceDemo id={s.demo} alt={s.altDemo} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        {s.destacado && (
          <span className="self-start rounded-pill bg-blue-500 px-3 py-1 text-[13px] leading-tight font-semibold text-text-on-blue">
            El más pedido
          </span>
        )}
        <h3 className="text-[22px] leading-[1.2]">
          {s.nombre}
          {s.nombreTecnico && (
            <span className="mt-1 block font-body text-[15px] leading-tight font-normal text-text-muted">
              ({s.nombreTecnico})
            </span>
          )}
        </h3>
        <p className="text-[17px] leading-[1.5] text-text-body">{s.promesa}</p>
        <p className="text-[14px] leading-snug text-text-muted">{s.ejemplo}</p>

        <div className="mt-auto pt-2">
          {WHATSAPP_ENABLED ? (
            <a
              href={serviceWhatsappUrl(s)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp"
              data-location={`servicio-${s.id}`}
              className={cta}
            >
              Lo quiero <span aria-hidden="true">→</span>
            </a>
          ) : (
            <Link href="#contacto" data-cta="diagnostico" data-location={`servicio-${s.id}`} className={cta}>
              Lo quiero <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

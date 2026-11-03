import { Bell, ChartColumn, Users, type LucideIcon } from "lucide-react";

import { MethodReveal } from "@/components/sections/method-reveal";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

/**
 * Diagrama "Todo se conecta" (plan v2, 3.3): Tu cliente escribe por WhatsApp → queda guardado en tu lista de
 * clientes → aparece en tu tablero → te llega un aviso (rótulos 2 y 3 en minúsculas, ajuste del 3/11/2026). Misma forma que el diagrama del Método (isotipo desplegado): nodos azules que crecen y
 * suben de izquierda a derecha, unidos por enlaces curvos, y la misma animación de dibujo al entrar en pantalla
 * (MethodReveal + clases .m-* de globals.css; sin JavaScript o con prefers-reduced-motion se ve completo).
 * Nodos y enlaces SIEMPRE en azul (regla D-J). Horizontal desde 1024 px; vertical (riel) en móvil.
 *
 * Accesibilidad: todo el diagrama es una imagen con el recorrido completo en aria-label.
 */
const STEPS = [
  { label: "Tu cliente escribe por WhatsApp", icon: "whatsapp" },
  { label: "Queda guardado en tu lista de clientes", icon: Users },
  { label: "Aparece en tu tablero", icon: ChartColumn },
  { label: "Te llega un aviso", icon: Bell },
] as const satisfies ReadonlyArray<{ label: string; icon: LucideIcon | "whatsapp" }>;

const ROUTE =
  "Tu cliente escribe por WhatsApp, queda guardado en tu lista de clientes, aparece en tu tablero y te llega un aviso.";

/** Centros (alineados con el centro de cada una de las 4 columnas de 285 px) y radios crecientes. */
const NODES = [
  { cx: 142.5, cy: 100, r: 30 },
  { cx: 427.5, cy: 86, r: 34 },
  { cx: 712.5, cy: 72, r: 38 },
  { cx: 997.5, cy: 58, r: 42 },
] as const;

/** Enlaces curvos de borde a borde, con la curvatura suave del isotipo. */
const LINKS = NODES.slice(0, -1).map((a, i) => {
  const b = NODES[i + 1];
  const x1 = a.cx + a.r + 4;
  const y1 = a.cy - 2;
  const x2 = b.cx - b.r - 4;
  const y2 = b.cy + 2;
  return `M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.max(y1, y2) + 10} ${x2} ${y2}`;
});

/** Tamaño de los nodos del riel móvil: crecen como en escritorio. */
const RAIL_SIZES = [34, 38, 42, 46] as const;
const RAIL_GAP = 18; // px entre pasos (gap del <ol>); compactado el 3/11/2026

function StepIcon({
  icon,
  className,
  ...props
}: { icon: (typeof STEPS)[number]["icon"] } & React.SVGProps<SVGSVGElement>) {
  if (icon === "whatsapp") return <WhatsAppIcon className={className} {...props} />;
  const Icon = icon;
  return <Icon aria-hidden="true" className={className} strokeWidth={1.75} {...props} />;
}

export function ConnectedDiagram() {
  return (
    <figure role="img" aria-label={ROUTE} className="m-0">
      <MethodReveal>
        {/* Escritorio: banda con los 4 nodos sobre sus rótulos. */}
        <svg aria-hidden="true" viewBox="0 0 1140 150" className="hidden h-auto w-full lg:block" fill="none">
          {LINKS.map((d, i) => (
            <path
              key={d}
              d={d}
              style={{ "--i": i } as React.CSSProperties}
              className="m-line-x"
              stroke="var(--blue-500)"
              strokeOpacity="0.75"
              strokeWidth="4"
              strokeLinecap="round"
            />
          ))}
          {NODES.map(({ cx, cy, r }, i) => (
            <g key={i} style={{ "--i": i } as React.CSSProperties} className="m-node">
              <circle cx={cx} cy={cy} r={r} fill="var(--blue-500)" />
              <StepIcon
                icon={STEPS[i].icon}
                x={cx - 14 - i}
                y={cy - 14 - i}
                width={28 + i * 2}
                height={28 + i * 2}
                className="text-text-on-blue"
              />
            </g>
          ))}
        </svg>
        <ol aria-hidden="true" className="mt-3 hidden lg:grid lg:grid-cols-4">
          {STEPS.map(({ label }) => (
            <li
              key={label}
              className="px-4 text-center font-display text-[20px] leading-[1.25] font-bold text-text-strong text-balance"
            >
              {label}
            </li>
          ))}
        </ol>

        {/* Móvil y tablet: riel vertical con nodos crecientes. */}
        <ol aria-hidden="true" className="flex flex-col lg:hidden" style={{ gap: RAIL_GAP }}>
          {STEPS.map(({ label, icon }, i) => {
            const size = RAIL_SIZES[i];
            return (
              <li
                key={label}
                style={{ "--i": i } as React.CSSProperties}
                className="relative flex min-h-[46px] items-center pl-[64px]"
              >
                <span className="m-node absolute top-0 left-0 flex w-[46px] justify-center">
                  <span
                    style={{ width: size, height: size }}
                    className="flex items-center justify-center rounded-full bg-blue-500 text-text-on-blue"
                  >
                    <StepIcon icon={icon} className="size-[48%]" />
                  </span>
                </span>
                {i < STEPS.length - 1 && (
                  <span
                    style={{ top: size + 4, bottom: -(RAIL_GAP - 4) }}
                    className="m-line-y absolute left-[21.5px] w-[3px] rounded-full bg-blue-500/70"
                  />
                )}
                <span className="font-display text-[18px] leading-[1.25] font-bold text-text-strong">
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </MethodReveal>
    </figure>
  );
}

import { MethodReveal } from "@/components/sections/method-reveal";
import { MethodStepBody } from "@/components/sections/method-step-body";
import { METHOD_STEPS, type MethodStep } from "@/content/method-steps";

/**
 * Diagrama del Método ERVIA, "isotipo desplegado" (variante elegida el 30/09/2026).
 * Hereda la geometría del isotipo: nodos que crecen y suben de izquierda a derecha (escalar) unidos por
 * enlaces curvos como los del logo. Nodos y enlaces SIEMPRE en azul (regla D-J: sin verde en el diagrama).
 * El contenido va en tarjetas bajo el diagrama (escritorio) o junto a un riel vertical con los mismos
 * nodos crecientes (móvil). La línea y los nodos se dibujan al entrar en pantalla (ver MethodReveal).
 */

/**
 * Centros y radios de los nodos en el lienzo de 1140×100 (alineados con el centro de cada columna de tarjetas).
 * Compactado el 3/11/2026: nodos más pequeños (radios 18/23/28 en vez de 28/34/40) y desnivel suave, manteniendo
 * el crecimiento 1→2→3 y la subida de izquierda a derecha.
 */
const NODES = [
  { cx: 182, cy: 68, r: 18 },
  { cx: 570, cy: 56, r: 23 },
  { cx: 958, cy: 44, r: 28 },
] as const;

/** Enlaces curvos entre nodos (de borde a borde, con la curvatura suave —ahora más plana— del isotipo). */
const LINKS = NODES.slice(0, -1).map((a, i) => {
  const b = NODES[i + 1];
  const x1 = a.cx + a.r + 4;
  const y1 = a.cy - 1;
  const x2 = b.cx - b.r - 4;
  const y2 = b.cy + 1;
  return `M${x1} ${y1} Q${Math.round((x1 + x2) / 2)} ${Math.max(y1, y2) + 5} ${x2} ${y2}`;
});

/** Tamaño de los nodos del riel móvil: crecen como en el escritorio. */
const RAIL_SIZES = [34, 40, 46] as const;

/**
 * `renderStep` sustituye el contenido de cada tarjeta (por defecto, el detalle completo del Método: MethodStepBody).
 * "Cómo trabajamos" lo usa para mostrar la versión compacta con el mismo diagrama, sin duplicar su geometría.
 */
export function MethodDiagram({ renderStep }: { renderStep?: (step: MethodStep) => React.ReactNode }) {
  return (
    <MethodReveal>
      {/* Escritorio: banda con el diagrama sobre las tres tarjetas. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1140 100"
        className="hidden h-auto w-full lg:block"
        fill="none"
      >
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
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--text-on-blue)"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 + i * 3 }}
            >
              {i + 1}
            </text>
          </g>
        ))}
      </svg>

      <ol className="grid gap-6 lg:mt-1 lg:grid-cols-3 lg:gap-6">
        {METHOD_STEPS.map((step, i) => {
          const size = RAIL_SIZES[i];
          return (
            <li
              key={step.n}
              style={{ "--i": i } as React.CSSProperties}
              className="relative pl-[58px] lg:flex lg:flex-col lg:pl-0"
            >
              {/* Móvil: nodo creciente sobre el riel vertical. */}
              <span
                aria-hidden="true"
                className="m-node absolute top-0 left-0 flex w-[46px] justify-center lg:hidden"
              >
                <span
                  style={{ width: size, height: size }}
                  className="flex items-center justify-center rounded-full bg-blue-500 font-display text-[22px] leading-none text-text-on-blue"
                >
                  {step.n}
                </span>
              </span>
              {i < METHOD_STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{ top: size + 6 }}
                  className="m-line-y absolute -bottom-[20px] left-[21.5px] w-[3px] rounded-full bg-blue-500/70 lg:hidden"
                />
              )}

              <div className="rounded-lg border border-border-subtle bg-surface-card p-5 shadow-card lg:flex-1 lg:p-8">
                {renderStep ? renderStep(step) : <MethodStepBody step={step} />}
              </div>
            </li>
          );
        })}
      </ol>
    </MethodReveal>
  );
}

import { MethodReveal } from "@/components/sections/method-reveal";
import { MethodStepBody } from "@/components/sections/method-step-body";
import { METHOD_STEPS } from "@/content/method-steps";

/**
 * Diagrama del Método ERVIA, "isotipo desplegado" (variante elegida el 30/09/2026).
 * Hereda la geometría del isotipo: nodos que crecen y suben de izquierda a derecha (escalar) unidos por
 * enlaces curvos como los del logo. Nodos y enlaces SIEMPRE en azul (regla D-J: sin verde en el diagrama).
 * El contenido va en tarjetas bajo el diagrama (escritorio) o junto a un riel vertical con los mismos
 * nodos crecientes (móvil). La línea y los nodos se dibujan al entrar en pantalla (ver MethodReveal).
 */

/** Centros de los nodos en el lienzo de 1140×130 (alineados con el centro de cada columna de tarjetas). */
const NODES = [
  { cx: 182, cy: 92, r: 28 },
  { cx: 570, cy: 66, r: 34 },
  { cx: 958, cy: 40, r: 40 },
] as const;

/** Enlaces curvos entre nodos (de borde a borde, con la curvatura suave del isotipo). */
const LINKS = ["M212 89 Q385 104 536 69", "M604 63 Q775 72 918 43"] as const;

/** Tamaño de los nodos del riel móvil: crecen como en el escritorio. */
const RAIL_SIZES = [44, 52, 60] as const;

export function MethodDiagram() {
  return (
    <MethodReveal>
      {/* Escritorio: banda con el diagrama sobre las tres tarjetas. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1140 130"
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
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22 + i * 4 }}
            >
              {i + 1}
            </text>
          </g>
        ))}
      </svg>

      <ol className="grid gap-8 lg:mt-2 lg:grid-cols-3 lg:gap-6">
        {METHOD_STEPS.map((step, i) => {
          const size = RAIL_SIZES[i];
          return (
            <li
              key={step.n}
              style={{ "--i": i } as React.CSSProperties}
              className="relative pl-[76px] lg:pl-0"
            >
              {/* Móvil: nodo creciente sobre el riel vertical. */}
              <span
                aria-hidden="true"
                className="m-node absolute top-0 left-0 flex w-[60px] justify-center lg:hidden"
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
                  style={{ top: size + 10 }}
                  className="m-line-y absolute -bottom-[26px] left-[28.5px] w-[3px] rounded-full bg-blue-500/70 lg:hidden"
                />
              )}

              <div className="rounded-lg border border-border-subtle bg-surface-card p-7 shadow-card lg:p-8">
                <MethodStepBody step={step} />
              </div>
            </li>
          );
        })}
      </ol>
    </MethodReveal>
  );
}

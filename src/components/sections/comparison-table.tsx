import { Check } from "lucide-react";

import { Brand } from "@/components/ui/brand";

/**
 * Comparativa "Apps sueltas" frente a "Con ERVIA" (plan v2, 3.3), como tabla semántica.
 * Solo afirmaciones verificables: no se nombran competidores ni se dan cifras.
 * Columna ERVIA: check en verde (resultado) sobre fondo azul tenue. Apps sueltas: gris, sin rojo ni íconos de error.
 *
 * Escritorio (≥ 768 px): tabla de 3 columnas. Móvil: mini-tabla por fila: la pregunta a lo ancho y debajo las dos
 * respuestas lado a lado, rotuladas "Apps sueltas" | "Con ERVIA". Los roles ARIA van explícitos porque, al cambiar el `display`
 * de los elementos de la tabla, algunos navegadores pierden su semántica.
 */
const ROWS: ReadonlyArray<{ question: string; loose: string; ervia: React.ReactNode }> = [
  {
    question: "¿Quién lo arma?",
    loose: "Tú, viendo tutoriales",
    ervia: "Nosotros, de principio a fin",
  },
  {
    question: "¿Se hablan entre ellas?",
    loose: "Cada una por su lado",
    ervia: "Todo conectado: WhatsApp, clientes, facturas, tablero",
  },
  {
    question: "¿Dónde están tus datos?",
    loose: "En servidores de otros",
    ervia: (
      <>
        En <strong className="font-semibold text-text-strong">tu propio servidor</strong>. Son tuyos
      </>
    ),
  },
  {
    question: "¿A quién llamas si falla?",
    loose: "A un soporte en inglés",
    ervia: "A nosotros, aquí en Mérida",
  },
];

const label = "mb-1 block text-[12px] font-semibold tracking-overline uppercase md:hidden";

export function ComparisonTable() {
  return (
    <table
      role="table"
      className="block w-full border-collapse text-left md:table md:overflow-hidden md:rounded-lg md:border md:border-border-subtle md:bg-surface-card md:shadow-card"
    >
      <caption className="sr-only">Apps sueltas frente a ERVIA</caption>
      <thead role="rowgroup" className="sr-only md:not-sr-only md:table-header-group">
        <tr role="row" className="md:table-row">
          <th role="columnheader" scope="col" className="md:w-[28%] md:p-6">
            <span className="sr-only">Pregunta</span>
          </th>
          <th
            role="columnheader"
            scope="col"
            className="font-display text-[20px] font-bold text-text-muted md:w-[32%] md:p-6"
          >
            Apps sueltas
          </th>
          <th
            role="columnheader"
            scope="col"
            className="bg-surface-blue-tint font-display text-[20px] font-bold text-text-strong md:p-6"
          >
            Con <Brand />
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup" className="block md:table-row-group">
        {ROWS.map(({ question, loose, ervia }) => (
          <tr
            key={question}
            role="row"
            className="mb-3 grid grid-cols-2 overflow-hidden rounded-lg border border-border-subtle bg-surface-card shadow-card md:mb-0 md:table-row md:rounded-none md:border-0 md:shadow-none"
          >
            <th
              role="rowheader"
              scope="row"
              className="col-span-2 px-4 pt-4 pb-2 font-display text-[18px] leading-tight font-bold text-text-strong md:table-cell md:border-t md:border-border-subtle md:p-6 md:text-[20px] md:align-top"
            >
              {question}
            </th>
            <td
              role="cell"
              className="px-4 py-3 text-[15px] leading-[1.45] text-text-muted md:table-cell md:border-t md:border-border-subtle md:p-6 md:text-[17px] md:leading-[1.5] md:align-top"
            >
              <span aria-hidden="true" className={`${label} text-text-muted`}>
                Apps sueltas
              </span>
              {loose}
            </td>
            <td
              role="cell"
              className="bg-surface-blue-tint px-4 py-3 text-[15px] leading-[1.45] text-text-body md:table-cell md:border-t md:border-border-subtle md:p-6 md:text-[17px] md:leading-[1.5] md:align-top"
            >
              <span aria-hidden="true" className={`${label} text-text-strong`}>
                Con ERVIA
              </span>
              <span className="flex items-start gap-2">
                <Check aria-hidden="true" className="mt-[3px] size-4 shrink-0 text-green-500 md:size-5" strokeWidth={3} />
                <span>{ervia}</span>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

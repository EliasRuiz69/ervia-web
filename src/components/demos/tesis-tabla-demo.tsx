import { DemoFrame, ResultChip, TableRow } from "./kit";

/**
 * Tesis · "Tabla comparativa de tus fuentes" (prioridad B): las filas se llenan solas con Autor · Año · Método ·
 * Hallazgo. FASE 4b: fotograma final estático (`still`). Datos inventados (rótulo "Ejemplo").
 */
const COLS = "13cqw 12cqw 23cqw 1fr";

export function TesisTablaDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt} still>
      <div className="flex flex-1 flex-col justify-center gap-[2cqw]">
        <div
          className="grid gap-[2cqw] px-[2.4cqw] text-[4.4cqw] leading-none text-text-muted"
          style={{ gridTemplateColumns: COLS }}
        >
          <span>Autor</span>
          <span>Año</span>
          <span>Método</span>
          <span>Hallazgo</span>
        </div>
        <TableRow at={0} cols={COLS} cells={["Ruiz", "2021", "Encuesta", "Alto"]} />
        <TableRow at={1} cols={COLS} cells={["Vega", "2019", "Caso", "Nulo"]} />
        <TableRow at={2} cols={COLS} cells={["Soto", "2023", "Mixto", "Medio"]} />
      </div>

      <ResultChip at={5} className="mt-[2cqw]">
        Fuentes comparadas
      </ResultChip>
    </DemoFrame>
  );
}

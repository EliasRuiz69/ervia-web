import { Anim, DemoFrame, ResultChip, TableRow } from "./kit";

/**
 * "La montaña se ordena" (prioridad A; banda de tesis de la home y hero de /tesis): una pila de PDF desordenados
 * se acomoda en las filas de una tabla de fuentes (Autor · Año · Hallazgo) y una cita recibe el chip
 * "Verificada". Autores, años y hallazgos son inventados (rótulo "Ejemplo" del marco).
 */
const SHEETS = [
  { at: 0, pos: "left-[1cqw] top-[5cqw]", rot: "-rotate-12" },
  { at: 1, pos: "left-[17cqw] top-[1cqw]", rot: "rotate-[8deg]" },
  { at: 1, pos: "left-[4cqw] top-[16cqw]", rot: "rotate-[5deg]" },
  { at: 2, pos: "left-[23cqw] top-[18cqw]", rot: "-rotate-[7deg]" },
] as const;

export function MontanaDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt}>
      <div className="flex min-h-0 flex-1 gap-[4cqw]">
        {/* Izquierda: la pila de PDF (se va al ordenarse) y, al final, la cita verificada */}
        <div className="relative w-[40cqw] shrink-0">
          <Anim at={4} kind="out" className="absolute inset-0">
            {SHEETS.map(({ at, pos, rot }, i) => (
              <Anim key={i} at={at} from="translateY(-8cqw)" className={`absolute ${pos}`}>
                <div className={`${rot} h-[20cqw] w-[15cqw] rounded-[1.2cqw] bg-navy-100 p-[1.8cqw] shadow-card`}>
                  <p className="text-[4cqw] leading-none font-bold text-navy-600">PDF</p>
                  {[100, 80, 90].map((w, n) => (
                    <span
                      key={n}
                      className="mt-[1.8cqw] block h-[1cqw] rounded-pill bg-navy-300"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </Anim>
            ))}
          </Anim>

          <Anim
            at={7}
            from="translateY(2cqw) scale(0.96)"
            className="absolute left-0 -right-[3cqw] top-[6cqw] flex flex-col gap-[2.4cqw] rounded-[2cqw] border border-border-default bg-surface-raised p-[2.6cqw]"
          >
            <p className="text-[4.4cqw] leading-none text-text-muted">Cita</p>
            <p className="text-[4.4cqw] leading-none font-semibold text-text-strong">Ruiz (2021)</p>
            <ResultChip>Verificada</ResultChip>
          </Anim>
        </div>

        {/* Derecha: la tabla de fuentes */}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[2cqw]">
          <div
            className="grid gap-[2cqw] px-[2.4cqw] text-[4.4cqw] leading-none text-text-muted"
            style={{ gridTemplateColumns: "12cqw 11cqw 1fr" }}
          >
            <span>Autor</span>
            <span>Año</span>
            <span>Hallazgo</span>
          </div>
          <TableRow at={4} cols="12cqw 11cqw 1fr" cells={["Ruiz", "2021", "Alto"]} />
          <TableRow at={5} cols="12cqw 11cqw 1fr" cells={["Vega", "2019", "Nulo"]} />
          <TableRow at={6} cols="12cqw 11cqw 1fr" cells={["Soto", "2023", "Bajo"]} />
        </div>
      </div>
    </DemoFrame>
  );
}

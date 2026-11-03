import { Anim, DemoFrame, ResultChip, TableRow } from "./kit";

/**
 * Captura de facturas (prioridad A): una factura pasa por un escáner y sus datos (RFC · Fecha · Total)
 * llegan a una tabla. El RFC es el genérico público del SAT (XAXX010101000), no el de nadie.
 */
export function FacturasDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt}>
      <div className="flex min-h-0 flex-1 gap-[4cqw]">
        {/* La factura (papel claro: único elemento claro de la demo) */}
        <div className="relative w-[30cqw] shrink-0 overflow-hidden rounded-[1.6cqw] bg-navy-100 p-[3cqw]">
          <p className="text-[4.4cqw] leading-none font-bold text-navy-600">Factura</p>
          {[88, 100, 70, 94, 60].map((w, i) => (
            <span
              key={i}
              className="mt-[2.6cqw] block h-[1.4cqw] rounded-pill bg-navy-300"
              style={{ width: `${w}%` }}
            />
          ))}
          <p className="mt-[3.4cqw] text-[4cqw] leading-none font-semibold text-navy-500">XML · PDF</p>
          {/* Línea del escáner */}
          <Anim
            kind="scan"
            className="absolute inset-x-0 top-0 h-[1.2cqw] bg-blue-400 shadow-glow-blue"
            style={{ "--d-y": "34cqw" } as React.CSSProperties}
          />
        </div>

        {/* La tabla donde caen los datos */}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[2cqw]">
          <TableRow at={3} cols="14cqw 1fr" cells={["RFC", "XAXX010101000"]} />
          <TableRow at={4} cols="14cqw 1fr" cells={["Fecha", "12 oct 2026"]} />
          <TableRow at={5} cols="14cqw 1fr" cells={["Total", "$1,450.00"]} />
        </div>
      </div>

      <ResultChip at={7} className="mt-[2cqw]">
        Lista para tu contador
      </ResultChip>
    </DemoFrame>
  );
}

import { Bell, Mail, Table2 } from "lucide-react";

import { Bar, DemoFrame, Node, ResultChip } from "./kit";

/**
 * Tareas repetitivas en automático (prioridad B): tres íconos en cadena (correo → hoja → aviso) que se
 * encienden en orden.
 */
export function TareasDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt}>
      <div className="flex flex-1 items-center justify-center gap-[3cqw]">
        <Node icon={Mail} label="Correo" at={0} />
        <Bar orientation="h" at={1} className="mb-[6cqw] h-[0.9cqw] w-[10cqw]" />
        <Node icon={Table2} label="Hoja" at={2} />
        <Bar orientation="h" at={3} className="mb-[6cqw] h-[0.9cqw] w-[10cqw]" />
        <Node icon={Bell} label="Aviso" at={4} />
      </div>

      <ResultChip at={6}>Aviso enviado</ResultChip>
    </DemoFrame>
  );
}

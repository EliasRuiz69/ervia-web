import { FolderOpen } from "lucide-react";

import { Anim, DemoFrame, Node, ResultChip } from "./kit";

/**
 * Tesis · "Ordenamos tu montaña de información" (prioridad B): PDF sueltos que caen en carpetas por tema.
 * FASE 4b: fotograma final estático (`still`); para animarla basta quitar `still` (las ranuras ya están).
 */
const TEMAS = ["Teoría", "Método", "Datos"] as const;

export function TesisOrdenarDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt} still>
      <div className="flex flex-1 items-end justify-around pb-[2cqw]">
        {TEMAS.map((tema, i) => (
          <div key={tema} className="flex flex-col items-center gap-[2cqw]">
            <Anim at={i} from="translateY(-8cqw)">
              <div className="h-[11cqw] w-[9cqw] rounded-[1cqw] bg-navy-100 p-[1.4cqw]">
                <span className="block h-[0.9cqw] w-full rounded-pill bg-navy-300" />
                <span className="mt-[1.2cqw] block h-[0.9cqw] w-[70%] rounded-pill bg-navy-300" />
              </div>
            </Anim>
            <Node icon={FolderOpen} label={tema} at={3 + i} />
          </div>
        ))}
      </div>

      <ResultChip at={7}>Un resumen de cada uno</ResultChip>
    </DemoFrame>
  );
}

import type { ComponentType } from "react";

import type { DemoId } from "@/config/services";
import { CorreoDemo } from "./correo-demo";
import { CrmDemo } from "./crm-demo";
import { FacturasDemo } from "./facturas-demo";
import { LlamadasDemo } from "./llamadas-demo";
import { PaginaWebDemo } from "./pagina-web-demo";
import { RecordatoriosDemo } from "./recordatorios-demo";
import { TableroDemo } from "./tablero-demo";
import { TareasDemo } from "./tareas-demo";
import { WhatsAppDemo } from "./whatsapp-demo";

/**
 * Mini-demos por id (el id sale de `demo` en src/config/services.ts).
 * Prioridad A (animadas): whatsapp, facturas, crm, tablero, correo.
 * Prioridad B (animadas en la Fase 3): pagina-web, llamadas, recordatorios, tareas.
 */
const DEMOS: Record<DemoId, ComponentType<{ alt: string }>> = {
  whatsapp: WhatsAppDemo,
  facturas: FacturasDemo,
  crm: CrmDemo,
  tablero: TableroDemo,
  correo: CorreoDemo,
  "pagina-web": PaginaWebDemo,
  llamadas: LlamadasDemo,
  recordatorios: RecordatoriosDemo,
  tareas: TareasDemo,
};

export function ServiceDemo({ id, alt }: { id: DemoId; alt: string }) {
  const Demo = DEMOS[id];
  return <Demo alt={alt} />;
}

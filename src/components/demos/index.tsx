import type { ComponentType } from "react";

import type { DemoId } from "@/config/services";
import { CorreoDemo } from "./correo-demo";
import { CrmDemo } from "./crm-demo";
import { FacturasDemo } from "./facturas-demo";
import { LlamadasDemo } from "./llamadas-demo";
import { MontanaDemo } from "./montana-demo";
import { PaginaWebDemo } from "./pagina-web-demo";
import { RecordatoriosDemo } from "./recordatorios-demo";
import { TableroDemo } from "./tablero-demo";
import { TareasDemo } from "./tareas-demo";
import { TesisAsistenteDemo } from "./tesis-asistente-demo";
import { TesisCitasDemo } from "./tesis-citas-demo";
import { TesisEsquemaDemo } from "./tesis-esquema-demo";
import { TesisOrdenarDemo } from "./tesis-ordenar-demo";
import { TesisTablaDemo } from "./tesis-tabla-demo";
import { WhatsAppDemo } from "./whatsapp-demo";

/**
 * Mini-demos por id (el id sale de `demo` en src/config/services.ts).
 * Prioridad A (animadas): whatsapp, facturas, crm, tablero, correo.
 * Prioridad B (animadas en la Fase 3): pagina-web, llamadas, recordatorios, tareas.
 * Tesis (Fase 4b): montana (A, animada; banda de la home y hero de /tesis) y las cinco "tesis-*" de las tarjetas de
 * /tesis (B, fotograma estático).
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
  montana: MontanaDemo,
  "tesis-ordenar": TesisOrdenarDemo,
  "tesis-tabla": TesisTablaDemo,
  "tesis-asistente": TesisAsistenteDemo,
  "tesis-esquema": TesisEsquemaDemo,
  "tesis-citas": TesisCitasDemo,
};

export function ServiceDemo({ id, alt }: { id: DemoId; alt: string }) {
  const Demo = DEMOS[id];
  return <Demo alt={alt} />;
}

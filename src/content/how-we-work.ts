/**
 * "Cómo trabajamos" (plan multiservicio v2, 3.4): los 3 pasos del Método en una fila, con su precio.
 * El nombre de cada paso sale de METHOD_STEPS (src/content/method-steps.ts) para no duplicarlo.
 * Sin cifras: Detectar es gratis; Automatizar y Escalar se cotizan tras el diagnóstico.
 */
import { NBSP } from "@/lib/text";

export type HowStep = {
  n: 1 | 2 | 3;
  text: string;
  price: string;
  /** Detectar: la palabra "Gratis" va como badge verde. */
  free?: boolean;
};

export const HOW_STEPS: ReadonlyArray<HowStep> = [
  {
    n: 1,
    text: `Platicamos 15${NBSP}minutos y te decimos dónde pierdes tiempo y clientes.`,
    price: "Gratis",
    free: true,
  },
  {
    n: 2,
    text: "Armamos e instalamos lo que elegiste y te enseñamos a usarlo. De 2 a 4 semanas.",
    price: "Cotización tras el diagnóstico",
  },
  {
    n: 3,
    text: "Lo cuidamos cada mes, lo mejoramos y te mandamos un resumen.",
    price: "Cotización tras el diagnóstico",
  },
];

/** Línea de giros: sectores a los que nos dirigimos, no casos de éxito. */
export const GIROS_LINEA: ReadonlyArray<string> = [
  "Talleres y refaccionarias",
  "Consultorios y clínicas",
  "Restaurantes",
  "Negocios de servicios",
];

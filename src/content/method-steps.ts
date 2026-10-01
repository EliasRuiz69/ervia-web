/**
 * Pasos del Método ERVIA (auditoría 3.3 y 4.5): promesa · qué hacemos · te llevas · tiempo.
 * v1 SIN entregables con nombre propio (no se menciona el "Mapa de Fugas") y sin cifras de precio.
 */
import { NBSP } from "@/lib/text";

export type MethodStep = {
  n: 1 | 2 | 3;
  name: string;
  promise: string;
  what: string;
  gets: string;
  time: string;
};

export const METHOD_STEPS: ReadonlyArray<MethodStep> = [
  {
    n: 1,
    name: "Detectar",
    promise: "Dónde pierdes tiempo y clientes",
    what: `Llamada de 15${NBSP}min y revisión de cómo atiendes hoy: WhatsApp, agenda, cotizaciones`,
    gets: "Un diagnóstico claro: qué te cuesta tiempo y ventas, y por dónde empezar",
    time: "1 semana",
  },
  {
    n: 2,
    name: "Automatizar",
    promise: "Lo repetitivo, para que deje de depender de ti",
    what: "Construimos e instalamos tu agente y tus automatizaciones en tu propio servidor; tu equipo aprende a usarlo",
    gets: "Tu agente funcionando, tu panel de control y la capacitación",
    time: "2–4 semanas",
  },
  {
    n: 3,
    name: "Escalar",
    promise: "Sin contratar más personal",
    what: "Medimos, ajustamos y sumamos la siguiente automatización cuando tenga sentido",
    gets: "Un resumen mensual de mensajes atendidos y citas agendadas",
    time: "Cada mes",
  },
];

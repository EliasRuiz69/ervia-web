/**
 * Constantes del formulario de contacto SIN dependencias: las usan el navegador (al pintar el formulario) y el
 * servidor. Viven aparte de src/lib/lead.ts para que `zod` no entre en el JS de la carga inicial: el navegador
 * importa lead.ts de forma dinámica solo al enfocar el formulario o al enviarlo.
 */
import { SERVICES } from "@/config/services";

/** Opciones del select "Giro del negocio". El valor enviado a n8n es el propio texto. */
export const GIROS = [
  "Taller o refaccionaria",
  "Consultorio o clínica",
  "Restaurante",
  "Negocio de servicios",
  "Soy estudiante o investigador",
  "Otro",
] as const;

/**
 * Chips de "¿Qué te interesa?" (opcional, selección múltiple): los servicios de src/config/services.ts (id y chip)
 * más "Mi tesis" y "Aún no sé". El navegador manda solo los ids; el servidor los valida contra esta lista blanca y
 * antepone sus rótulos al mensaje ("[Interés: WhatsApp, Facturas] "), así el contrato con n8n no cambia.
 */
export const INTERES_TESIS = "tesis";
export const INTERES_AUN_NO_SE = "aun-no-se";

export const INTERESES: ReadonlyArray<{ id: string; label: string }> = [
  ...SERVICES.map((s) => ({ id: s.id as string, label: s.chip })),
  { id: INTERES_TESIS, label: "Mi tesis" },
  { id: INTERES_AUN_NO_SE, label: "Aún no sé" },
];

export const INTERES_IDS = INTERESES.map((i) => i.id) as [string, ...string[]];

/** Origen del envío: la home o la página /tesis. En staging, el servidor le añade "-staging". */
export const ORIGENES = ["web-contacto", "web-tesis"] as const;
export type Origen = (typeof ORIGENES)[number];

/** Nombre del campo señuelo (honeypot). Oculto para personas; los bots suelen rellenarlo. */
export const HONEYPOT_FIELD = "sitio_web";

export const LIMITS = { nombre: 80, contacto: 120, mensaje: 1000 } as const;

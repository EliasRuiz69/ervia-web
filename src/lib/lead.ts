import { z } from "zod";

import { IS_STAGING } from "@/lib/env";
import { GIROS, HONEYPOT_FIELD, INTERESES, INTERES_IDS, LIMITS, ORIGENES } from "@/lib/lead-shared";

// Se reexportan para que el servidor (y el código existente) sigan importando todo desde "@/lib/lead".
export { GIROS, HONEYPOT_FIELD, LIMITS };

// Sin JIT: zod comprueba si puede usar `new Function`, y con una CSP sin 'unsafe-eval' el navegador registra
// esa prueba como violación aunque zod la capture. Con jitless no hay prueba ni violación (y a este volumen
// de datos —un formulario— el JIT no aporta nada).
z.config({ jitless: true });

/**
 * Esquema ÚNICO del formulario de contacto: lo usan el navegador (validación al enviar) y el servidor
 * (/api/lead). Así los dos aplican exactamente las mismas reglas y mensajes.
 */


export type ContactoParseado =
  | { tipoContacto: "email"; whatsapp10: null }
  | { tipoContacto: "whatsapp"; whatsapp10: string };

const EMAIL = z.email();

/**
 * Caracteres de control. En nombre y contacto (una sola línea) no se admite ninguno, ni saltos de línea:
 * esos datos acaban en un aviso de Telegram y en una hoja de cálculo, y un salto de línea permitiría
 * "falsificar" líneas. En el mensaje se admiten saltos de línea y tabulaciones, pero ningún otro.
 * Además de los de ASCII se rechazan los de control C1 (U+0080–U+009F, incluye NEL), los separadores de
 * línea y párrafo Unicode (U+2028/2029) y los controles de dirección del texto (U+202A–202E, U+2066–2069),
 * que sirven igual para falsificar líneas o invertir el texto en un aviso.
 */
const CONTROL_ANY = /[\u{0}-\u{1F}\u{7F}-\u{9F}\u{2028}\u{2029}\u{202A}-\u{202E}\u{2066}-\u{2069}]/u;
const CONTROL_EXCEPT_NEWLINES = /[\u{0}-\u{8}\u{B}\u{C}\u{E}-\u{1F}\u{7F}-\u{9F}\u{2028}\u{2029}\u{202A}-\u{202E}\u{2066}-\u{2069}]/u;

/**
 * Distingue correo de WhatsApp a partir de lo que escribió la persona.
 * - Correo: contiene "@" y es un correo válido.
 * - WhatsApp: solo dígitos y separadores comunes (espacios, guiones, paréntesis, puntos, "+"); se normaliza
 *   a 10 dígitos, aceptando el prefijo de país 52 (o 521, el formato antiguo de móviles).
 * Devuelve null si no es ninguna de las dos.
 */
export function parseContacto(raw: string): ContactoParseado | null {
  const value = raw.trim();
  if (value.includes("@")) {
    return EMAIL.safeParse(value).success ? { tipoContacto: "email", whatsapp10: null } : null;
  }
  if (!/^\+?[\d\s().-]+$/.test(value)) return null;
  let digits = value.replace(/\D/g, "");
  if (digits.length === 13 && digits.startsWith("521")) digits = digits.slice(3);
  else if (digits.length === 12 && digits.startsWith("52")) digits = digits.slice(2);
  return /^\d{10}$/.test(digits) ? { tipoContacto: "whatsapp", whatsapp10: digits } : null;
}

export const leadSchema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(2, { error: "Escribe tu nombre." })
      .max(LIMITS.nombre, { error: `Usa ${LIMITS.nombre} caracteres como máximo.` })
      .refine((value) => !CONTROL_ANY.test(value), { error: "Escribe tu nombre en una sola línea." }),
    contacto: z
      .string()
      .trim()
      .min(1, { error: "Escribe tu correo o tu WhatsApp." })
      .max(LIMITS.contacto, { error: `Usa ${LIMITS.contacto} caracteres como máximo.` })
      // La comprobación de formato va en el propio campo (no en un refine del objeto) para que su error
      // salga a la vez que los de los demás campos. Si está vacío o es muy largo, ya se muestra el mensaje anterior.
      .refine((value) => !CONTROL_ANY.test(value) && parseContacto(value) !== null, {
        error: "Escribe un correo válido o un WhatsApp de 10 dígitos.",
      }),
    giro: z.enum(GIROS, { error: "Elige el giro de tu negocio." }),
    mensaje: z
      .string()
      .trim()
      .max(LIMITS.mensaje, { error: `Usa ${LIMITS.mensaje} caracteres como máximo.` })
      .refine((value) => !CONTROL_EXCEPT_NEWLINES.test(value), {
        error: "El mensaje contiene caracteres que no podemos aceptar.",
      })
      .default(""),
    // Opcionales: la selección de "¿Qué te interesa?" (lista blanca de ids) y el origen (home o /tesis).
    // No cambian lo que se envía a n8n: el servidor antepone la selección al mensaje y el origen ya existía.
    intereses: z.array(z.enum(INTERES_IDS)).max(INTERESES.length).default([]),
    origen: z.enum(ORIGENES).default("web-contacto"),
  });

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;
export type LeadField = keyof LeadInput;

/**
 * CONTRATO con el workflow de n8n. No cambiar nombres, tipos ni valores sin avisar: n8n depende de él.
 */
export type LeadPayload = {
  nombre: string;
  /** Tal como lo escribió la persona. */
  contacto: string;
  tipoContacto: "email" | "whatsapp";
  /** 10 dígitos si es WhatsApp (sin +52); null si es correo. */
  whatsapp10: string | null;
  giro: string;
  mensaje: string;
  /**
   * "web-contacto" (home) o "web-tesis" (/tesis) en producción; con el sufijo "-staging" si
   * NEXT_PUBLIC_SITE_ENV no es "production".
   */
  origen: "web-contacto" | "web-contacto-staging" | "web-tesis" | "web-tesis-staging";
  /** ISO 8601 en UTC. */
  enviadoEn: string;
};

/**
 * Antepone la selección de interés al mensaje: "[Interés: A, B] " + mensaje. Los rótulos salen de INTERESES
 * (no del navegador), sin repetidos y en el orden de la lista. Sin selección, el mensaje queda igual.
 */
export function mensajeConIntereses(intereses: ReadonlyArray<string>, mensaje: string): string {
  const elegidos = INTERESES.filter((i) => intereses.includes(i.id)).map((i) => i.label);
  if (elegidos.length === 0) return mensaje;
  return `[Interés: ${elegidos.join(", ")}]${mensaje ? ` ${mensaje}` : ""}`;
}

/** Construye el cuerpo que se envía a n8n a partir de datos YA validados con `leadSchema`. */
export function buildLeadPayload(data: LeadData, now: Date = new Date()): LeadPayload {
  const parsed = parseContacto(data.contacto);
  if (!parsed) throw new Error("contacto no validado");
  return {
    nombre: data.nombre,
    contacto: data.contacto,
    tipoContacto: parsed.tipoContacto,
    whatsapp10: parsed.whatsapp10,
    giro: data.giro,
    mensaje: mensajeConIntereses(data.intereses, data.mensaje),
    origen: IS_STAGING ? (`${data.origen}-staging` as const) : data.origen,
    enviadoEn: now.toISOString(),
  };
}

/** Errores por campo (primer mensaje de cada uno) de un resultado fallido de `leadSchema`. */
export function fieldErrors(error: z.ZodError<LeadInput>): Partial<Record<LeadField, string>> {
  const flat = z.flattenError(error).fieldErrors as Partial<Record<LeadField, string[]>>;
  const out: Partial<Record<LeadField, string>> = {};
  for (const key of Object.keys(flat) as LeadField[]) {
    const first = flat[key]?.[0];
    if (first) out[key] = first;
  }
  return out;
}

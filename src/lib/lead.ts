import { z } from "zod";

import { IS_STAGING } from "@/lib/env";

/**
 * Esquema ÚNICO del formulario de contacto: lo usan el navegador (validación al enviar) y el servidor
 * (/api/lead). Así los dos aplican exactamente las mismas reglas y mensajes.
 */

/** Opciones del select "Giro del negocio". El valor enviado a n8n es el propio texto. */
export const GIROS = [
  "Taller o refaccionaria",
  "Consultorio o clínica",
  "Restaurante",
  "Negocio de servicios",
  "Otro",
] as const;

/** Nombre del campo señuelo (honeypot). Oculto para personas; los bots suelen rellenarlo. */
export const HONEYPOT_FIELD = "sitio_web";

export const LIMITS = { nombre: 80, contacto: 120, mensaje: 1000 } as const;

export type ContactoParseado =
  | { tipoContacto: "email"; whatsapp10: null }
  | { tipoContacto: "whatsapp"; whatsapp10: string };

const EMAIL = z.email();

/**
 * Caracteres de control. En nombre y contacto (una sola línea) no se admite ninguno, ni saltos de línea:
 * esos datos acaban en un aviso de Telegram y en una hoja de cálculo, y un salto de línea permitiría
 * "falsificar" líneas. En el mensaje se admiten saltos de línea y tabulaciones, pero ningún otro.
 */
const CONTROL_ANY = /[\u0000-\u001F\u007F]/;
const CONTROL_EXCEPT_NEWLINES = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

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
  /** "web-contacto" en producción; "web-contacto-staging" si NEXT_PUBLIC_SITE_ENV no es "production". */
  origen: "web-contacto" | "web-contacto-staging";
  /** ISO 8601 en UTC. */
  enviadoEn: string;
};

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
    mensaje: data.mensaje,
    origen: IS_STAGING ? "web-contacto-staging" : "web-contacto",
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

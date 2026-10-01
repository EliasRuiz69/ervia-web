/**
 * Constantes del formulario de contacto SIN dependencias: las usan el navegador (al pintar el formulario) y el
 * servidor. Viven aparte de src/lib/lead.ts para que `zod` no entre en el JS de la carga inicial: el navegador
 * importa lead.ts de forma dinámica solo al enfocar el formulario o al enviarlo.
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

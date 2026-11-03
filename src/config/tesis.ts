import { WHATSAPP_NUMBER } from "@/config/site";

/**
 * Configuración del servicio de tesis (otro público: personas, no pymes; plan multiservicio v2, 3.8 y 3.9).
 * Se crea en la Fase 4 con lo mínimo que ya necesita el footer; la Fase 4b añade aquí los textos de la banda,
 * las tarjetas, las FAQ y los pasos de /tesis.
 */

/**
 * Interruptor de la página /tesis. Se queda en `false` mientras la página no exista (Fase 4b la crea y lo pasa a
 * `true`): con `false`, el enlace "Te ayudamos con tu tesis" del footer va a WhatsApp con el texto de tesis.
 */
export const TESIS_PAGE_ENABLED = false;

/** Texto precargado de WhatsApp para todo lo de tesis. */
export const TESIS_WA_TEXT = "Hola, estoy haciendo mi tesis y necesito ayuda";

export const TESIS_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(TESIS_WA_TEXT)}`;

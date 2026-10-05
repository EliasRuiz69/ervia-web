/** Espacio duro (U+00A0): evita que "15 min", "paso 1" o "Método ERVIA" se partan entre dos líneas. */
export const NBSP = String.fromCharCode(160);

/** Cierra una frase con punto, sin duplicarlo si ya lo trae (para armar textos con constantes de contenido). */
export const endSentence = (text: string) => (text.endsWith(".") ? text : `${text}.`);

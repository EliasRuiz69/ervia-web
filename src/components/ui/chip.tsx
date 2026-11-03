/**
 * Estilo de "chip" compartido (píldora con borde): chips de servicios del hero, línea de giros de "Cómo
 * trabajamos" y chips de interés del formulario. `chipClass` es la base (no interactiva); `chipLinkClass` añade
 * el objetivo táctil de 44 px y el hover de los chips que son enlaces.
 */
export const chipClass =
  "inline-flex items-center rounded-pill border border-border-default px-4 py-1.5 text-[15px] font-medium whitespace-nowrap text-text-body";

export const chipLinkClass =
  chipClass +
  " min-h-11 py-0 transition-colors duration-(--duration-fast) ease-out hover:border-border-strong hover:text-text-strong";

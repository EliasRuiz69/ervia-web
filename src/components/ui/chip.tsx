/**
 * Estilo de "chip" compartido (píldora con borde): chips de servicios del hero, línea de giros de "Cómo
 * trabajamos" y chips de interés del formulario. `chipClass` es la base (no interactiva); `chipLinkClass` añade
 * el objetivo táctil de 44 px y el hover de los chips que son enlaces.
 */
export const chipClass =
  "inline-flex items-center rounded-pill border border-border-default px-4 py-1.5 text-[15px] font-medium whitespace-nowrap text-text-body";

/**
 * Fila de chips de una sola línea con scroll horizontal en móvil (< 640 px): sin barra visible y con degradado en
 * el borde derecho (máscara, funciona sobre cualquier fondo). Desde 640 px, los chips se acomodan en varias filas.
 * Requiere un contenedor con gutter de 20 px (px-5): sangra hasta el borde de la pantalla.
 */
export const chipScrollRowClass =
  "-mx-5 flex gap-2.5 overflow-x-auto px-5 pr-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden " +
  "max-sm:[mask-image:linear-gradient(to_right,#000_calc(100%-56px),transparent)] " +
  "sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pr-0";

export const chipLinkClass =
  chipClass +
  " min-h-11 py-0 transition-colors duration-(--duration-fast) ease-out hover:border-border-strong hover:text-text-strong";

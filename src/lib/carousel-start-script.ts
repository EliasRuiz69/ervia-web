/**
 * Script en línea que deja un carrusel con scroll-snap centrado en el elemento `index` ANTES del primer
 * pintado (sin salto al hidratar). Se renderiza desde un componente de SERVIDOR, justo después de la lista:
 * corre al analizarse el HTML, con los estilos ya aplicados. Si el navegador soporta `scroll-initial-target` (Chrome
 * 133+), el CSS de la tarjeta recomendada ya hace ese trabajo y el script no hace nada: así se evita la disposición
 * forzada (decenas de ms en móviles lentos) que supone leer scrollWidth/offsetLeft. Si la lista no desborda (p. ej. en escritorio,
 * donde es una rejilla) no hace nada. Solo escribe el `scrollLeft` de la propia lista: nunca desplaza la ventana.
 * Solo recibe constantes del código (id e índice), nunca texto del usuario.
 */
export function carouselStartScript(listId: string, index: number): string {
  return `(function(){if(window.CSS&&CSS.supports&&CSS.supports("scroll-initial-target","nearest"))return;var l=document.getElementById(${JSON.stringify(listId)});if(!l||l.scrollWidth<=l.clientWidth)return;var c=l.children[${Number(index)}];if(!c)return;l.scrollLeft=c.offsetLeft-(l.clientWidth-c.offsetWidth)/2;})();`;
}

/**
 * Script en línea que deja un carrusel con scroll-snap centrado en el elemento `index` ANTES del primer
 * pintado (sin salto al hidratar). Se renderiza desde un componente de SERVIDOR, justo después de la lista:
 * corre al analizarse el HTML, con los estilos ya aplicados. Si la lista no desborda (p. ej. en escritorio,
 * donde es una rejilla) no hace nada. Solo recibe constantes del código (id e índice), nunca texto del usuario.
 */
export function carouselStartScript(listId: string, index: number): string {
  return `(function(){var l=document.getElementById(${JSON.stringify(listId)});if(!l||l.scrollWidth<=l.clientWidth)return;var c=l.children[${Number(index)}];if(!c)return;l.scrollLeft=c.offsetLeft-(l.clientWidth-c.offsetWidth)/2;})();`;
}

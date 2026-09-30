/**
 * Fondo del hero (decisión D-I, revisada por derechos de uso): solo recursos de la marca.
 * Sin imágenes, sin vídeo y sin JavaScript: navy + glow azul + malla de puntos + isotipo fantasma
 * con el degradado dúo de los tokens (CSS y SVG en línea).
 *
 * Contraste del texto: velo diagonal navy (izquierda 92 %) y fundido inferior a --navy-900, así que la
 * zona del texto se mantiene casi igual de oscura que el navy plano (medido: titular y cuerpo >= 10:1,
 * gris atenuado >= 5,5:1 en el peor píxel).
 *
 * Posicionamiento: llenar el padre (`relative` + `overflow-hidden`). No captura eventos.
 */
const VEIL =
  "linear-gradient(105deg, rgb(15 23 42 / 0.92) 0%, rgb(15 23 42 / 0.55) 55%, rgb(15 23 42 / 0.35) 100%)";
const FADE = "linear-gradient(to top, var(--navy-900) 0%, transparent 38%)";

export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-navy-900"
    >
      {/* Glow azul (token --blue-500), arriba a la derecha. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 84% 22%, color-mix(in srgb, var(--blue-500) 22%, transparent), transparent 70%)",
        }}
      />

      {/* Malla de puntos (CSS puro), visible solo hacia la derecha gracias a una máscara radial. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, var(--blue-300) 55%, transparent) 1.1px, transparent 1.6px)",
          backgroundSize: "30px 30px",
          opacity: 0.5,
          maskImage: "radial-gradient(70% 90% at 88% 30%, #000 0%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(70% 90% at 88% 30%, #000 0%, transparent 72%)",
        }}
      />

      {/* Isotipo fantasma: tres nodos y dos enlaces, con el degradado dúo, a gran tamaño. */}
      <svg
        className="absolute top-1/2 -right-[4%] h-[88%] w-auto max-w-none -translate-y-1/2 opacity-[0.17]"
        viewBox="0 0 206 217"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="hero-duotone" x1="0" y1="0" x2="1" y2="0.35">
            <stop offset="0" style={{ stopColor: "var(--green-500)" }} />
            <stop offset="1" style={{ stopColor: "var(--blue-500)" }} />
          </linearGradient>
        </defs>
        <g fill="url(#hero-duotone)" stroke="url(#hero-duotone)">
          <circle cx="40.34" cy="108.9" r="40.34" stroke="none" />
          <circle cx="165.6" cy="40.3" r="40.34" stroke="none" />
          <circle cx="165.6" cy="176.8" r="40.34" stroke="none" />
          <path d="M40 108.9Q118 104 165.6 40.3" strokeWidth="7.5" fill="none" />
          <path d="M40 108.9Q118 114 165.6 176.8" strokeWidth="7.5" fill="none" />
        </g>
      </svg>

      {/* Velo diagonal para el contraste del texto y fundido inferior hacia el fondo de página. */}
      <div className="absolute inset-0" style={{ background: VEIL }} />
      <div className="absolute inset-0" style={{ background: FADE }} />
    </div>
  );
}

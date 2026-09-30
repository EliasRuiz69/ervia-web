/**
 * Fondo del hero (decisión D-I): un fotograma del vídeo de la landing anterior (WebP/AVIF)
 * al 40 % de opacidad + degradados/glows de los tokens. Sin vídeo, sin JS, sin CDN externo.
 *
 * Capas (de abajo arriba): imagen (40 %) → glow azul → velo diagonal navy → fundido inferior a navy-900.
 * El glow es azul a propósito: el verde queda reservado a las acciones (D-J).
 *
 * Posicionamiento: llenar el padre (`relative` + `overflow-hidden`). No captura eventos.
 */
export function HeroBackground({ withImage = true }: { withImage?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-navy-900">
      {withImage && (
        <picture>
          <source srcSet="/media/hero-bg.avif" type="image/avif" />
          <source srcSet="/media/hero-bg.webp" type="image/webp" />
          <img
            src="/media/hero-bg.webp"
            alt=""
            width={1920}
            height={832}
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover opacity-40"
          />
        </picture>
      )}

      {/* Glow azul (token --blue-500), arriba a la derecha, donde irá el visual del hero. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 60% at 82% 18%, color-mix(in srgb, var(--blue-500) 26%, transparent), transparent 70%)",
        }}
      />

      {/* Velo diagonal para dar contraste al texto (rgba de --navy-900). */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgb(15 23 42 / 0.92) 0%, rgb(15 23 42 / 0.55) 55%, rgb(15 23 42 / 0.35) 100%)",
        }}
      />

      {/* Fundido inferior hacia el fondo de página. */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, var(--navy-900) 0%, transparent 38%)",
        }}
      />
    </div>
  );
}

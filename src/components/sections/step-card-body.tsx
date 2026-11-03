/**
 * Contenido compacto de un paso dentro del diagrama del Método (MethodDiagram → renderStep): nombre, qué hacemos
 * y, opcional, el precio (Detectar: "Gratis" como badge verde). Lo usan "Cómo trabajamos" de la home y de /tesis.
 */
export function StepCardBody({
  name,
  text,
  price,
  free = false,
}: {
  name: string;
  text: string;
  price?: string;
  free?: boolean;
}) {
  return (
    <>
      <h3 className="text-[clamp(26px,2.4vw,30px)] leading-[1.2]">{name}</h3>
      <p className="mt-3 text-[17px] leading-[1.55] text-text-body">{text}</p>
      {price && (
        <p className="mt-5 border-t border-border-subtle pt-4">
          {free ? (
            <span className="inline-flex items-center rounded-pill border border-border-green bg-surface-green-tint px-3.5 py-1 text-[16px] leading-tight font-semibold text-green-400">
              {price}
            </span>
          ) : (
            <span className="font-display text-[19px] leading-[1.25] font-bold text-text-strong">{price}</span>
          )}
        </p>
      )}
    </>
  );
}

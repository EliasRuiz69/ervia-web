/**
 * Contenido compacto de un paso dentro del diagrama del Método (MethodDiagram → renderStep): nombre, qué hacemos
 * y, opcional, el precio (Detectar: "Gratis" como badge verde). Lo usan "Cómo trabajamos" de la home y de /tesis.
 *
 * Móvil (< 1024 px): el precio va en la misma línea que el título, alineado a la derecha, y el título baja a 20 px
 * para ahorrar altura. Escritorio: el precio queda al pie de la tarjeta, bajo una línea.
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
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 lg:flex lg:flex-col lg:gap-0">
      <h3 className="col-start-1 row-start-1 text-[20px] leading-[1.2] lg:text-[clamp(26px,2.4vw,30px)]">{name}</h3>
      <p className="col-span-2 row-start-2 text-[16px] leading-[1.5] text-text-body lg:mt-3 lg:text-[17px] lg:leading-[1.55]">
        {text}
      </p>
      {price && (
        <p className="col-start-2 row-start-1 max-w-[8.25rem] text-right leading-tight lg:mt-5 lg:max-w-none lg:border-t lg:border-border-subtle lg:pt-4 lg:text-left">
          {free ? (
            <span className="inline-flex items-center rounded-pill border border-border-green bg-surface-green-tint px-3 py-0.5 text-[13px] leading-tight font-semibold text-green-400 lg:px-3.5 lg:py-1 lg:text-[16px]">
              {price}
            </span>
          ) : (
            <span className="font-display text-[13px] leading-[1.2] font-bold text-text-strong lg:text-[19px] lg:leading-[1.25]">
              {price}
            </span>
          )}
        </p>
      )}
    </div>
  );
}

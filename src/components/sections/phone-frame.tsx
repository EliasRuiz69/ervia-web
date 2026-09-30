import { cn } from "@/lib/utils";

/**
 * Marco del teléfono. Decorativo: expone un único `role="img"` con el resumen de la conversación
 * (aria-label) y oculta su contenido a los lectores de pantalla.
 * Móvil: compacto, máx. 420 px de alto. Escritorio: 560 px.
 */
export function PhoneFrame({
  summary,
  className,
  children,
}: {
  summary: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={summary}
      className={cn(
        "wa-phone mx-auto flex h-[420px] w-full max-w-[340px] flex-col rounded-[2rem] border-[6px] border-navy-700 bg-surface-deep shadow-raised lg:h-[560px] lg:max-w-[330px] lg:rounded-[2.4rem] lg:border-[7px]",
        className,
      )}
    >
      {/* Isla / altavoz */}
      <span
        aria-hidden="true"
        className="mx-auto mt-2 block h-1.5 w-16 shrink-0 rounded-pill bg-navy-700"
      />
      <div
        aria-hidden="true"
        className="mt-1.5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-[1.6rem] lg:rounded-b-[2rem]"
      >
        {children}
      </div>
    </div>
  );
}

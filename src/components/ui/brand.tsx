/**
 * Nombre de marca con `translate="no"`: los traductores automáticos del navegador no deben tocarlo.
 * `Brand` envuelve una aparición; `BrandText` envuelve cada "ERVIA" dentro de un texto en cadena.
 */
export function Brand({ children = "ERVIA" }: { children?: React.ReactNode }) {
  return <span translate="no">{children}</span>;
}

export function BrandText({ children }: { children: string }) {
  return (
    <>
      {children.split(/(ERVIA)/).map((part, i) => (part === "ERVIA" ? <Brand key={i} /> : part))}
    </>
  );
}

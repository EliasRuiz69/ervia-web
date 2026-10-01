/**
 * Inserta datos estructurados como <script type="application/ld+json"> (componente de servidor).
 * El navegador no ejecuta este tipo de script, por eso no lo bloquea la CSP. Se sustituye "<" por su escape
 * JSON para que ningún texto pueda cerrar la etiqueta; el contenido viene solo de constantes del código.
 */
const LT = String.fromCharCode(92) + "u003c";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, LT) }}
    />
  );
}

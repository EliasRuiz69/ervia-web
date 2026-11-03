import { Section } from "@/components/layout/section";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { ConnectedDiagram } from "@/components/sections/connected-diagram";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/**
 * "Todo se conecta" y "Por qué ERVIA" (plan v2, 3.3): diagrama animado (WhatsApp → Tus clientes → Tu tablero →
 * aviso) y comparativa "Apps sueltas" frente a "Con ERVIA" en una tabla semántica.
 */
export function Connected() {
  return (
    <Section intrinsic={[1187, 960]} id="por-que-ervia" deep aria-labelledby="por-que-ervia-titulo">
      <SectionHeading id="por-que-ervia-titulo">
        Un solo equipo. <Accent>Todo conectado.</Accent>
      </SectionHeading>

      <div className="mt-12 lg:mt-14">
        <ConnectedDiagram />
      </div>

      <div className="mt-14 lg:mt-16">
        <ComparisonTable />
      </div>
    </Section>
  );
}

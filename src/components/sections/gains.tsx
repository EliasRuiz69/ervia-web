import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

/**
 * Lo que ganas cuando automatizas (auditoría 4.4). Patrón de cada tarjeta:
 * ganancia (H3) → antes/después → "Cómo lo logramos" (la tecnología va al final, nunca en el titular).
 * La tarjeta 3 lleva un ejemplo aritmético explícito, no un resultado prometido.
 */
type Gain = {
  title: string;
  /** Pares etiqueta → texto. "Ejemplo" marca el cálculo de la tarjeta 3 como ilustrativo. */
  rows: ReadonlyArray<{ label: "Antes" | "Después" | "Ejemplo"; text: string }>;
  how: string;
  featured?: boolean;
};

const GAINS: ReadonlyArray<Gain> = [
  {
    title: "Ningún cliente se queda sin respuesta",
    rows: [
      { label: "Antes", text: "El cliente pregunta de noche y le contestas al día siguiente." },
      {
        label: "Después",
        text: "Recibe respuesta al momento, a cualquier hora, con tus precios reales.",
      },
    ],
    how: "un agente de IA atiende tu WhatsApp con tu información y te pasa la conversación cuando hace falta una persona.",
    featured: true,
  },
  {
    title: "Tu agenda se llena sola, sin empalmes",
    rows: [
      { label: "Antes", text: "Llamadas y mensajes para cuadrar horarios." },
      {
        label: "Después",
        text: "El cliente elige, el sistema confirma y tú solo ves la cita en tu panel.",
      },
    ],
    how: "agenda conectada a tu horario real, con confirmaciones y recordatorios automáticos.",
  },
  {
    title: "Recuperas horas cada semana",
    rows: [
      {
        label: "Ejemplo",
        text: "Si contestas 40 mensajes al día y tardas 2 minutos en cada uno, son más de 6 horas a la semana. Esas horas vuelven a tu negocio.",
      },
    ],
    how: "automatizamos lo repetitivo (respuestas frecuentes, captura de datos, reportes y documentos).",
  },
  {
    title: "Sabes qué pasa en tu negocio aunque no estés",
    rows: [
      {
        label: "Antes",
        text: "La información vive en tu cabeza, en libretas y en el Excel.",
      },
      {
        label: "Después",
        text: "Citas, clientes y ventas en un solo panel y un resumen diario en tu correo.",
      },
    ],
    how: "panel de control propio y reportes automáticos.",
  },
];

export function Gains() {
  return (
    <Section id="ganancias" deep aria-labelledby="ganancias-titulo">
      <SectionHeading id="ganancias-titulo">
        Lo que <Accent>ganas</Accent> cuando automatizas
      </SectionHeading>
      <p className="mt-5 max-w-[600px] text-[19px] leading-[1.6]">
        No vendemos tecnología. Vendemos horas libres, clientes atendidos y un negocio que funciona
        aunque no estés.
      </p>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {GAINS.map(({ title, rows, how, featured }) => (
          <li
            key={title}
            className={cn(
              "flex flex-col gap-6 rounded-lg border bg-surface-card p-7 shadow-card md:p-8",
              featured
                ? "border-border-blue shadow-glow-blue"
                : "border-border-subtle transition-[border-color] duration-(--duration-base) ease-out hover:border-border-default",
            )}
          >
            <h3 className="text-[clamp(28px,2.6vw,32px)] leading-[1.2]">{title}</h3>

            <dl className="flex flex-col gap-4">
              {rows.map(({ label, text }) => (
                <div key={label} className="flex flex-col gap-1">
                  <dt
                    className={cn(
                      "text-[15px] font-semibold",
                      label === "Antes" ? "text-text-muted" : "text-blue-300",
                    )}
                  >
                    {label}
                  </dt>
                  <dd className="text-[17px] leading-[1.55] text-text-body">{text}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-auto border-t border-border-subtle pt-5 text-[15px] leading-[1.55] text-text-muted italic">
              <span className="font-semibold">Cómo lo logramos:</span> {how}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <Button asChild size="lg" className="w-full whitespace-normal text-center sm:w-auto sm:whitespace-nowrap">
          <Link href="#contacto" data-cta="diagnostico" data-location="gains">
            Quiero ver qué ganaría mi negocio&nbsp;→
          </Link>
        </Button>
      </div>
    </Section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[60dvh] items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 60% at 80% 20%, color-mix(in srgb, var(--blue-500) 22%, transparent), transparent 70%)",
        }}
      />
      <Container className="py-20 md:py-28">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-5 max-w-[760px] text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-tight">
          Esta página <span className="text-green-500">no existe.</span>
        </h1>
        <p className="mt-6 max-w-[520px] text-[19px] leading-relaxed">
          Puede que el enlace esté incompleto o que la página ya no esté. Vuelve al inicio y
          seguimos desde ahí.
        </p>
        <div className="mt-10">
          <Button asChild size="lg">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

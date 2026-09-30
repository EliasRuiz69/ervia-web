import Link from "next/link";

import { HeroBackground } from "@/components/sections/hero-background";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Marcador temporal de la fase D2 (esqueleto). La home real se construye en D3 ("Próximamente")
 * y G1 (estructura completa); este archivo se sustituirá entonces.
 */
export default function HomePage() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden">
      <HeroBackground />
      <Container className="relative py-24 md:py-32">
        <Eyebrow>Esqueleto del proyecto · Fase D2</Eyebrow>
        <h1 className="mt-5 max-w-[880px] text-[clamp(44px,6.5vw,86px)] leading-[1.05] tracking-tight">
          Base de la nueva web de <span className="text-green-500">ERVIA.</span>
        </h1>
        <p className="mt-7 max-w-[560px] text-[clamp(17px,1.6vw,22px)] leading-relaxed">
          Tokens, tipografías y componentes base listos. La home real se construye en las fases
          siguientes.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild size="lg">
            <Link href="/#contacto">Diagnóstico gratis</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/politica-de-privacidad">Política de privacidad</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

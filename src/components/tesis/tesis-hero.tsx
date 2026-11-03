import Link from "next/link";

import { ServiceDemo } from "@/components/demos";
import { Container } from "@/components/layout/container";
import { HeroBackground } from "@/components/sections/hero-background";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accent } from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { WHATSAPP_ENABLED } from "@/config/site";
import { TESIS_BANDA, TESIS_HERO, TESIS_WHATSAPP_URL } from "@/config/tesis";

/**
 * Hero de /tesis (plan v2, 3.9, bloque 1): H1 opción A (B y C, como comentario en src/config/tesis.ts), subtítulo,
 * CTAs y, como visual, la mini-demo "La montaña se ordena" a tamaño grande. Mismo fondo de marca que el hero de la home.
 */
export function TesisHero() {
  const [antes, destacada, despues] = TESIS_HERO.h1;
  return (
    <section id="inicio" aria-labelledby="inicio-titulo" className="relative isolate overflow-hidden">
      <HeroBackground />
      <Container className="relative py-10 md:py-14 lg:py-[70px]">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div className="min-w-0">
            <Eyebrow>{TESIS_HERO.eyebrow}</Eyebrow>
            <h1
              id="inicio-titulo"
              className="mt-5 text-[clamp(30px,3.3vw,48px)] leading-[1.1] tracking-tight"
            >
              {antes}
              <Accent>{destacada}</Accent>
              {despues}
            </h1>
            <p className="mt-6 max-w-[620px] text-[clamp(17px,1.6vw,20px)] leading-relaxed">
              {TESIS_HERO.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Button asChild size="lg" className="w-full whitespace-normal text-center sm:w-auto sm:whitespace-nowrap">
                <Link href="#contacto" data-cta="diagnostico" data-location="tesis-hero">
                  {TESIS_HERO.ctaPrimario.replace("(15 min)", "(15 min)")}
                </Link>
              </Button>
              {WHATSAPP_ENABLED && (
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a
                    href={TESIS_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="whatsapp"
                    data-location="tesis-hero"
                  >
                    <WhatsAppIcon className="size-5" />
                    {TESIS_HERO.ctaSecundario}
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-border-default shadow-raised">
            <ServiceDemo id="montana" alt={TESIS_BANDA.altDemo} />
          </div>
        </div>
      </Container>
    </section>
  );
}

import Link from "next/link";

import { Container } from "@/components/layout/container";
import { HeroBackground } from "@/components/sections/hero-background";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accent } from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { HeroServiceChips } from "@/components/sections/hero-service-chips";
import { WhatsAppMockup } from "@/components/sections/whatsapp-mockup";
import { WHATSAPP_ENABLED, whatsappUrl } from "@/config/site";
import { HERO_CONVERSATIONS } from "@/content/hero-conversations";

/**
 * Hero (plan multiservicio v2, 3.1). Titular A (recomendado; B y C, abajo, como comentario). Columna izquierda: textos y CTAs; derecha: mockup
 * de WhatsApp (en móvil va debajo de los CTAs, compacto).
 *
 * CTA principal:
 *  - WHATSAPP_ENABLED: "Escríbenos por WhatsApp" (no "Pruébalo en WhatsApp ahora" mientras no haya un
 *    agente de ERVIA en ese número; plan §0.2) + secundario "Diagnóstico gratis (15 min)" → #contacto.
 *  - Si no: "Agenda tu diagnóstico gratis" → #contacto, sin ningún enlace de WhatsApp.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative isolate overflow-hidden"
    >
      <HeroBackground />
      <Container className="relative py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-10">
          <div className="min-w-0">
            <Eyebrow>Agencia de IA y automatización para pymes · Mérida</Eyebrow>

            <h1
              id="inicio-titulo"
              className="mt-5 text-[clamp(34px,4.4vw,66px)] leading-[1.08] tracking-tight"
            >
              Tu negocio trabaja solo. <Accent>Tú</Accent> te dedicas a crecer.
              {/* Opción B: "Lo que hoy haces a mano, mañana se hace <Accent>solo</Accent>." */}
              {/* Opción C: "Contesta, agenda, cobra y ordena <Accent>sin contratar a nadie más</Accent>." */}
            </h1>

            <p className="mt-6 max-w-[620px] text-[clamp(17px,1.6vw,21px)] leading-relaxed">
              Te armamos todo lo digital de tu negocio: tu página web y tu correo, el asistente que
              contesta WhatsApp y llamadas, y el tablero que te dice cómo vas. Empiezas por lo más
              urgente.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              {WHATSAPP_ENABLED ? (
                <>
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <a
                      href={whatsappUrl("hero")}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta="whatsapp"
                      data-location="hero"
                    >
                      <WhatsAppIcon className="size-5" />
                      Escríbenos por WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full whitespace-normal text-center sm:w-auto sm:whitespace-nowrap"
                  >
                    <Link href="#contacto" data-cta="diagnostico" data-location="hero">
                      Diagnóstico gratis (15&nbsp;min)
                    </Link>
                  </Button>
                </>
              ) : (
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="#contacto" data-cta="diagnostico" data-location="hero">
                    Agenda tu diagnóstico gratis
                  </Link>
                </Button>
              )}
            </div>

            <HeroServiceChips />
          </div>

          <WhatsAppMockup conversations={HERO_CONVERSATIONS} />
        </div>
      </Container>
    </section>
  );
}

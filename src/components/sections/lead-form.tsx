"use client";

import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { chipLinkClass } from "@/components/ui/chip";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { SITE, WHATSAPP_ENABLED, whatsappUrl } from "@/config/site";
import {
  GIROS,
  HONEYPOT_FIELD,
  INTERESES,
  INTERES_AUN_NO_SE,
  LIMITS,
  type Origen,
} from "@/lib/lead-shared";
import type { LeadField } from "@/lib/lead";
import { cn } from "@/lib/utils";

/** Orden de los campos en pantalla (para enfocar el primero con error). */
type TextField = "nombre" | "contacto" | "giro" | "mensaje";
const FIELD_ORDER: ReadonlyArray<TextField> = ["nombre", "contacto", "giro", "mensaje"];

type Values = Record<TextField, string> & { [HONEYPOT_FIELD]: string };
type Status = "idle" | "sending" | "success" | "error";

/** Carga diferida del esquema (y de zod): se precarga al enfocar el formulario y se reutiliza al enviar. */
type LeadModule = typeof import("@/lib/lead");
let leadModule: Promise<LeadModule> | undefined;
const loadLead = () => (leadModule ??= import("@/lib/lead"));

const EMPTY: Values = { nombre: "", contacto: "", giro: "", mensaje: "", [HONEYPOT_FIELD]: "" };

/** Estilo de los campos (docs/design-base.md §3): fondo input, borde default, radio md, foco azul. */
const fieldClass = (hasError: boolean) =>
  cn(
    "block min-h-11 w-full rounded-md border bg-surface-input px-3.5 py-2.5 text-[16px] text-text-strong placeholder:text-text-muted",
    "transition-[border-color,box-shadow] duration-(--duration-fast) ease-out outline-none",
    "focus-visible:border-blue-400 focus-visible:ring-[3px] focus-visible:ring-blue-400/30",
    hasError ? "border-status-danger focus-visible:border-status-danger focus-visible:ring-status-danger/30" : "border-border-default",
  );

/**
 * Formulario de contacto del CTA final (auditoría 4.11). <form> real con labels visibles, validación en el
 * navegador con el mismo esquema zod que el servidor, errores junto a cada campo, estado "Enviando…" y
 * mensajes de éxito/error (el de error ofrece WhatsApp, o el correo si WhatsApp está desactivado).
 * El envío va a POST /api/lead; el navegador nunca ve la URL del webhook.
 */
export function LeadForm({
  defaultGiro,
  defaultIntereses = [],
  origen = "web-contacto",
}: {
  /** Giro preseleccionado (/tesis: "Soy estudiante o investigador"). */
  defaultGiro?: (typeof GIROS)[number];
  /** Ids de "¿Qué te interesa?" marcados al inicio (/tesis: ["tesis"]). */
  defaultIntereses?: ReadonlyArray<string>;
  /** "web-contacto" (home) o "web-tesis" (/tesis). */
  origen?: Origen;
} = {}) {
  const [values, setValues] = useState<Values>({ ...EMPTY, giro: defaultGiro ?? "" });
  const [intereses, setIntereses] = useState<ReadonlyArray<string>>(defaultIntereses);
  const [errors, setErrors] = useState<Partial<Record<LeadField, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorKind, setErrorKind] = useState<"generic" | "rate">("generic");
  const [sentName, setSentName] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const set = (field: keyof Values) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((v) => ({ ...v, [field]: value }));
      // Al corregir un campo se quita su error; se vuelve a validar al enviar.
      if (field in errors) setErrors((e) => ({ ...e, [field]: undefined }));
    };

  /** Alterna un chip de interés. "Aún no sé" es excluyente: al marcarlo se quitan los demás y viceversa. */
  const toggleInteres = (id: string) =>
    setIntereses((current) => {
      if (current.includes(id)) return current.filter((x) => x !== id);
      return id === INTERES_AUN_NO_SE ? [id] : [...current.filter((x) => x !== INTERES_AUN_NO_SE), id];
    });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    // zod (≈100 kB comprimidos) no va en la carga inicial: se importa aquí, o antes al enfocar el formulario.
    let lead: LeadModule;
    try {
      lead = await loadLead();
    } catch {
      leadModule = undefined; // permite reintentar la carga en el siguiente envío
      setErrorKind("generic");
      setStatus("error");
      return;
    }
    const { leadSchema, fieldErrors } = lead;

    const result = leadSchema.safeParse({ ...values, intereses, origen });
    if (!result.success) {
      const found = fieldErrors(result.error);
      setErrors(found);
      const first = FIELD_ORDER.find((f) => found[f]);
      if (first) document.getElementById(`lead-${first}`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    // AbortController + setTimeout (y no AbortSignal.timeout): también funciona en navegadores integrados antiguos.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15_000);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, [HONEYPOT_FIELD]: values[HONEYPOT_FIELD] }),
        signal: controller.signal,
      });
      const data: { ok?: boolean } | null = await response.json().catch(() => null);
      if (response.ok && data?.ok) {
        setSentName(result.data.nombre.split(/\s+/)[0]);
        setStatus("success");
      } else {
        setErrorKind(response.status === 429 ? "rate" : "generic");
        setStatus("error");
      }
    } catch {
      setErrorKind("generic");
      setStatus("error");
    } finally {
      clearTimeout(timer);
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="flex flex-col items-start gap-4 rounded-lg border border-border-subtle bg-surface-card p-8 shadow-card outline-none md:p-9"
      >
        <span
          aria-hidden="true"
          className="flex size-12 items-center justify-center rounded-full bg-surface-green-tint"
        >
          <svg viewBox="0 0 24 24" className="size-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <p className="font-display text-[clamp(24px,2.4vw,28px)] leading-[1.25] font-bold text-text-strong">
          Listo, {sentName}. Te escribimos hoy mismo para agendar tu diagnóstico.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={() => void loadLead().catch(() => (leadModule = undefined))}
      noValidate
      aria-busy={sending}
      className="relative flex flex-col gap-5 rounded-lg border border-border-subtle bg-surface-card p-4 shadow-card sm:p-7 md:p-9"
    >
      <Field id="lead-nombre" label="Nombre" error={errors.nombre}>
        <input
          id="lead-nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          required
          maxLength={LIMITS.nombre}
          value={values.nombre}
          onChange={set("nombre")}
          aria-invalid={errors.nombre ? true : undefined}
          aria-describedby={errors.nombre ? "lead-nombre-error" : undefined}
          className={fieldClass(!!errors.nombre)}
        />
      </Field>

      <Field id="lead-contacto" label="Correo o WhatsApp" error={errors.contacto}>
        <input
          id="lead-contacto"
          name="contacto"
          type="text"
          required
          maxLength={LIMITS.contacto}
          placeholder="tu@correo.com o 999 123 4567"
          spellCheck={false}
          value={values.contacto}
          onChange={set("contacto")}
          aria-invalid={errors.contacto ? true : undefined}
          aria-describedby={errors.contacto ? "lead-contacto-error" : undefined}
          className={fieldClass(!!errors.contacto)}
        />
      </Field>

      <Field id="lead-giro" label="Giro del negocio" error={errors.giro}>
        <div className="relative">
          <select
            id="lead-giro"
            name="giro"
            required
            value={values.giro}
            onChange={set("giro")}
            aria-invalid={errors.giro ? true : undefined}
            aria-describedby={errors.giro ? "lead-giro-error" : undefined}
            className={cn(fieldClass(!!errors.giro), "appearance-none pr-10", values.giro === "" && "text-text-muted")}
          >
            <option value="" disabled className="bg-surface-card text-text-muted">
              Elige tu giro
            </option>
            {GIROS.map((giro) => (
              <option key={giro} value={giro} className="bg-surface-card text-text-strong">
                {giro}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-text-muted"
          />
        </div>
      </Field>

      <fieldset className="flex min-w-0 flex-col gap-2.5">
        <legend className="mb-2.5 text-[15px] font-medium text-text-body">
          ¿Qué te interesa?
          <span className="font-normal whitespace-nowrap text-text-muted"> · Opcional</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {INTERESES.map(({ id, label }) => {
            const selected = intereses.includes(id);
            return (
              <label key={id} className="relative cursor-pointer">
                <input
                  type="checkbox"
                  name="intereses"
                  value={id}
                  checked={selected}
                  onChange={() => toggleInteres(id)}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    chipLinkClass,
                    "px-[7px] text-[14px] select-none sm:px-3 sm:text-[15px]",
                    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-400",
                    selected && "border-border-blue bg-surface-blue-tint text-text-strong",
                  )}
                >
                  {label}
                </span>
                {/* Marca de "elegido" en la esquina: no ensancha el chip, así que al tocarlo la fila no se reacomoda. */}
                {selected && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-1 -right-1 flex size-[18px] items-center justify-center rounded-full bg-blue-500 text-text-on-blue"
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      <Field id="lead-mensaje" label="¿Qué te quita más tiempo hoy?" hint="Opcional" error={errors.mensaje}>
        <textarea
          id="lead-mensaje"
          name="mensaje"
          rows={3}
          maxLength={LIMITS.mensaje}
          value={values.mensaje}
          onChange={set("mensaje")}
          aria-invalid={errors.mensaje ? true : undefined}
          aria-describedby={errors.mensaje ? "lead-mensaje-error" : undefined}
          className={cn(fieldClass(!!errors.mensaje), "min-h-20 resize-y")}
        />
      </Field>

      {/* Honeypot: fuera de pantalla y fuera del orden de tabulación. Una persona nunca lo ve ni lo llena. */}
      <div aria-hidden="true" className="absolute top-0 left-[-9999px] h-px w-px overflow-hidden">
        <label>
          No llenar este campo
          <input
            type="text"
            name={HONEYPOT_FIELD}
            tabIndex={-1}
            autoComplete="off"
            value={values[HONEYPOT_FIELD]}
            onChange={set(HONEYPOT_FIELD)}
          />
        </label>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-md border border-status-danger bg-status-danger-tint p-4 text-[16px] leading-[1.5] text-text-strong"
        >
          {errorKind === "rate"
            ? "Enviaste varios mensajes seguidos. Espera unos minutos e inténtalo de nuevo"
            : "No pudimos enviar tu mensaje. Inténtalo de nuevo"}
          {WHATSAPP_ENABLED ? (
            <>
              {" "}o{" "}
              <a
                href={whatsappUrl("contact")}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                data-location="contact-error"
                className="inline-flex items-center gap-1.5 font-semibold text-blue-300 underline underline-offset-4"
              >
                <WhatsAppIcon className="size-4" />
                escríbenos por WhatsApp
              </a>
              .
            </>
          ) : (
            <>
              {" "}o escríbenos a{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-semibold text-blue-300 underline underline-offset-4"
              >
                {SITE.email}
              </a>
              .
            </>
          )}
        </div>
      )}

      <Button type="submit" size="lg" disabled={sending} className="w-full whitespace-normal text-center">
        {sending ? "Enviando…" : "Quiero mi diagnóstico gratis"}
      </Button>

      <PrivacyNotice origen={origen} />
    </form>
  );
}

/**
 * Aviso de privacidad simplificado (LFPDPPP, art. 16) bajo el botón de envío. Texto de docs/revision-politica-privacidad-tesis.md §4:
 * el de la home ("web-contacto") y el de /tesis ("web-tesis"), que añade una frase sobre los documentos de la tesis.
 * Si cambia el responsable, el domicilio o el plazo de borrado, hay que cambiarlo también en la Política de Privacidad.
 */
function PrivacyNotice({ origen }: { origen: Origen }) {
  const link = "text-blue-400 underline underline-offset-4 hover:text-blue-300";
  return (
    <p className="text-[13px] leading-[1.55] text-text-muted sm:text-[14px]">
      <strong className="font-semibold text-text-body">Aviso de privacidad.</strong> ELIAS RUIZ VELA (ERVIA), con
      domicilio en Calle Paseo de Salamanca 38, La Toscana, C.P. 77725, Playa del Carmen, Quintana Roo, usará tu
      nombre, tu contacto, tu giro, lo que te interesa y tu mensaje para responderte y agendar tu diagnóstico. No
      pedimos datos sensibles. También podremos enviarte novedades; si no quieres, escríbenos a{" "}
      <a href={`mailto:${SITE.email}`} className={link}>
        {SITE.email}
      </a>
      .{" "}
      {origen === "web-tesis" && (
        <>
          Si después nos compartes los documentos de tu tesis, se guardan en un servidor privado de ERVIA en EE. UU.,
          los analizamos con la IA de Claude (Anthropic, también en EE. UU.) y los borramos en un máximo de 30 días al
          terminar.{" "}
        </>
      )}
      Lee el{" "}
      <Link href="/politica-de-privacidad" className={link}>
        aviso completo
      </Link>
      .
    </p>
  );
}

/** Etiqueta visible + control + mensaje de error junto al campo. */
function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[15px] font-medium text-text-body">
        {label}
        {hint && <span className="font-normal whitespace-nowrap text-text-muted"> · {hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[14px] leading-[1.4] text-status-danger">
          {error}
        </p>
      )}
    </div>
  );
}

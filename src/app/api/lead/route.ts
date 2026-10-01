import { HONEYPOT_FIELD, buildLeadPayload, leadSchema } from "@/lib/lead";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/lead — única ruta dinámica del sitio. Recibe el formulario de contacto, lo valida con zod y lo
 * reenvía al webhook de n8n. La URL y el secreto del webhook solo existen aquí (variables de entorno del
 * servidor): nunca llegan al navegador. Las respuestas son genéricas, sin detalles internos.
 */
export const dynamic = "force-dynamic";

const MAX_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;
const WEBHOOK_TIMEOUT_MS = 8_000;
/** Un envío legítimo pesa < 2 kB; por encima de esto no se procesa. */
const MAX_BODY_BYTES = 8 * 1024;

const NO_STORE = { "Cache-Control": "no-store" };

function json(body: { ok: boolean }, status: number, extra?: HeadersInit) {
  return Response.json(body, { status, headers: { ...NO_STORE, ...extra } });
}

/** Lee el cuerpo como texto UTF-8; devuelve null si supera `maxBytes` (y deja de leer). */
async function readTextLimited(request: Request, maxBytes: number): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}

export async function POST(request: Request) {
  // 1) Límite por IP (cuenta todos los intentos, también los inválidos).
  const limit = rateLimit(clientIp(request.headers), { max: MAX_PER_WINDOW, windowMs: WINDOW_MS });
  if (!limit.allowed) {
    return json({ ok: false }, 429, { "Retry-After": String(limit.retryAfterSeconds) });
  }

  // 2) Solo JSON (un formulario de otro sitio no puede mandar este tipo de contenido sin permiso CORS).
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json({ ok: false }, 415);
  }
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return json({ ok: false }, 413);

  // El tope se aplica mientras se lee: así un envío por partes (sin Content-Length) tampoco puede llenar la memoria.
  const text = await readTextLimited(request, MAX_BODY_BYTES);
  if (text === null) return json({ ok: false }, 413);
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return json({ ok: false }, 400);
  }
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return json({ ok: false }, 400);

  // 3) Honeypot: si viene lleno es un bot. Se responde como si todo hubiera ido bien y no se reenvía nada.
  const trap = (raw as Record<string, unknown>)[HONEYPOT_FIELD];
  if (typeof trap === "string" && trap.trim() !== "") return json({ ok: true }, 200);

  // 4) Validación (mismas reglas que el navegador).
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) return json({ ok: false }, 400);

  // 5) Configuración del webhook (solo servidor).
  const url = process.env.LEAD_WEBHOOK_URL;
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (!url || !secret || !/^https?:\/\//i.test(url)) {
    console.error("[lead] Falta LEAD_WEBHOOK_URL o LEAD_WEBHOOK_SECRET (o la URL no es http/https)");
    return json({ ok: false }, 500);
  }

  // 6) Reenvío a n8n con tiempo límite. `redirect: "error"` evita que el secreto viaje a otro destino.
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-ERVIA-Secret": secret },
      body: JSON.stringify(buildLeadPayload(parsed.data)),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      redirect: "error",
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(`[lead] n8n respondió ${response.status}`);
      return json({ ok: false }, 502);
    }
    return json({ ok: true }, 200);
  } catch (error) {
    // Solo el tipo de error: nunca el cuerpo, la URL ni el secreto.
    console.error(`[lead] No se pudo llamar a n8n (${error instanceof Error ? error.name : "error"})`);
    return json({ ok: false }, 502);
  }
}

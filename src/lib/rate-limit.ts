/**
 * Límite de envíos por IP, en memoria (ventana deslizante). Suficiente porque hay UNA sola instancia
 * del servidor; si algún día hay varias, habría que moverlo a un almacén compartido.
 * Los contadores se pierden al reiniciar el servidor: es aceptable para frenar abuso casual.
 */
type Hits = number[];

const store = new Map<string, Hits>();

/** Tope de IPs distintas guardadas a la vez, para que un ataque con muchas IPs no llene la memoria. */
const MAX_KEYS = 10_000;

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

export function rateLimit(
  key: string,
  { max, windowMs, now = Date.now() }: { max: number; windowMs: number; now?: number },
): RateLimitResult {
  const hits = (store.get(key) ?? []).filter((t) => now - t < windowMs);

  if (hits.length >= max) {
    store.set(key, hits);
    return { allowed: false, retryAfterSeconds: Math.ceil((hits[0] + windowMs - now) / 1000) };
  }

  // Limpieza perezosa cuando el mapa crece demasiado: se descartan las claves sin golpes vigentes.
  if (!store.has(key) && store.size >= MAX_KEYS) {
    for (const [k, v] of store) {
      if (v.every((t) => now - t >= windowMs)) store.delete(k);
    }
    // Si sigue lleno (todas vigentes), se deja pasar sin registrar: mejor no bloquear a personas reales.
    if (store.size >= MAX_KEYS) return { allowed: true };
  }

  hits.push(now);
  store.set(key, hits);
  return { allowed: true };
}

/**
 * IP del visitante. Detrás de Cloudflare + Traefik: primero `cf-connecting-ip` (lo pone Cloudflare), luego
 * `x-real-ip` y por último el primer valor de `x-forwarded-for`. Son cabeceras del cliente si alguien llega
 * directo al servidor sin pasar por Cloudflare: el límite frena abuso casual, no un ataque dirigido.
 */
export function clientIp(headers: Headers): string {
  return (
    headers.get("cf-connecting-ip")?.trim() ||
    headers.get("x-real-ip")?.trim() ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "desconocida"
  );
}

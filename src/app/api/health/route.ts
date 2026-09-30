// Comprobación de despliegue: GET /api/health → {"ok":true}
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

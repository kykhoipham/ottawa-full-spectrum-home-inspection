import { createFileRoute } from "@tanstack/react-router";
import { loadAndRefreshRating } from "@/lib/google-rating.functions";

// Called daily by a database schedule. Only refreshes when the stored rating is 24h+ old.
export const Route = createFileRoute("/api/public/hooks/refresh-google-rating")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!request.headers.get("authorization")?.startsWith("Bearer ")) {
          return new Response("Unauthorized", { status: 401 });
        }
        const r = await loadAndRefreshRating();
        return Response.json({ ok: true, checkedAt: r?.checkedAt ?? null });
      },
    },
  },
});

import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

const PLACE_ID = "ChIJ9XR-aukHzkwRkClHhphqV9M";
export const REFRESH_MS = 24 * 60 * 60 * 1000;

export type GoogleRating = {
  rating: number;
  reviewCount: number;
  mapsUri: string | null;
  checkedAt: string;
};

export function isStale(checkedAt: string, now = Date.now()) {
  return now - new Date(checkedAt).getTime() >= REFRESH_MS;
}

async function fetchFromGoogle(): Promise<Omit<GoogleRating, "checkedAt"> | null> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const mapsKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!lovableKey || !mapsKey) return null;
  const res = await fetch(
    `https://connector-gateway.lovable.dev/google_maps/places/v1/places/${PLACE_ID}`,
    {
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": mapsKey,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri",
      },
    },
  );
  if (!res.ok) {
    console.error(`Google rating fetch failed [${res.status}]: ${await res.text()}`);
    return null;
  }
  const d = (await res.json()) as { rating?: number; userRatingCount?: number; googleMapsUri?: string };
  if (typeof d.rating !== "number") return null;
  return { rating: d.rating, reviewCount: d.userRatingCount ?? 0, mapsUri: d.googleMapsUri ?? null };
}

export async function loadAndRefreshRating(): Promise<GoogleRating | null> {
    const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data } = await sb.from("google_rating").select("*").eq("id", 1).maybeSingle();
    let current: GoogleRating | null = data
      ? {
          rating: Number(data.rating),
          reviewCount: data.review_count,
          mapsUri: data.maps_uri,
          checkedAt: data.checked_at,
        }
      : null;

    if (!current || isStale(current.checkedAt)) {
      const fresh = await fetchFromGoogle();
      if (fresh) {
        const checkedAt = new Date().toISOString();
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        await supabaseAdmin.from("google_rating").upsert({
          id: 1,
          rating: fresh.rating,
          review_count: fresh.reviewCount,
          maps_uri: fresh.mapsUri,
          checked_at: checkedAt,
        });
        current = { ...fresh, checkedAt };
      }
    }
    return current;
}

export const getGoogleRating = createServerFn({ method: "GET" }).handler(loadAndRefreshRating);

// Browser-side read straight from the database: works on any host (Vercel, GitHub, etc.).
export async function readRatingFromBrowser(): Promise<GoogleRating | null> {
  const { supabase } = await import("@/integrations/supabase/client");
  const { data } = await supabase.from("google_rating").select("*").eq("id", 1).maybeSingle();
  return data
    ? { rating: Number(data.rating), reviewCount: data.review_count, mapsUri: data.maps_uri, checkedAt: data.checked_at }
    : null;
}

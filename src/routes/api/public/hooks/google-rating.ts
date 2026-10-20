import { createFileRoute } from '@tanstack/react-router';
import { createClient } from '@supabase/supabase-js';
import { googleRatingSchema } from '@/lib/google-rating';

export const Route = createFileRoute('/api/public/hooks/google-rating')({
  server: { handlers: { POST: async ({ request }) => {
    const auth = request.headers.get('authorization');
    if (!auth?.startsWith('Bearer ')) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const token = auth.slice(7);
    if (!/^[a-f0-9]{64}$/.test(token)) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    const gatewayKey = process.env['LOVABLE_API_KEY'];
    const mapsKey = process.env['GOOGLE_MAPS_API_KEY'];
    if (!url || !key || !gatewayKey || !mapsKey) return Response.json({ error: 'Refresh settings unavailable' }, { status: 503 });
    const client = createClient(url, key, {
      auth: { persistSession: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith('sb_')) headers.delete('Authorization');
        headers.set('apikey', key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { data: allowed, error } = await client.rpc('authorize_google_rating_refresh', { p_token: token });
    if (error || !allowed) return Response.json({ error: 'Unauthorized or already checked today' }, { status: 401 });
    // No caller-controlled business, URL, or request parameters; one Google call per day.
    const response = await fetch('https://connector-gateway.lovable.dev/google_maps/places/v1/places:searchText', {
      method: 'POST', headers: {
        Authorization: `Bearer ${gatewayKey}`, 'X-Connection-Api-Key': mapsKey,
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount',
      },
      body: JSON.stringify({ textQuery: 'Ottawa Full Spectrum Home Inspection 29 Cremona Crest Ottawa Ontario Canada', pageSize: 1 }),
    });
    if (!response.ok) {
      const body = await response.text();
      console.error(`Google rating refresh failed [${response.status}]: ${body}`);
      if (response.status === 403) {
        return Response.json({ error: 'Google denied this request. Check the server connection API access and restrictions.', providerStatus: 403, details: body }, { status: 403 });
      }
      return Response.json({ providerStatus: response.status, details: body }, { status: response.status });
    }
    const result = await response.json() as { places?: Array<{ displayName?: { text?: string }; formattedAddress?: string }> };
    const place = result.places?.[0];
    if (place?.displayName?.text !== 'Ottawa Full Spectrum Home Inspection' || !place.formattedAddress?.includes('29 Cremona')) {
      return Response.json({ error: 'Matching business not found; previous rating preserved' }, { status: 502 });
    }
    const parsed = googleRatingSchema.safeParse(place);
    if (!parsed.success) return Response.json({ error: 'Invalid Google rating; previous rating preserved' }, { status: 502 });
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const checkedAt = new Date().toISOString();
    const { error: saveError } = await supabaseAdmin.from('google_rating_snapshot').update({
      place_id: parsed.data.id, rating: parsed.data.rating,
      review_count: parsed.data.userRatingCount, checked_at: checkedAt,
    }).eq('id', 'ofs');
    if (saveError) return Response.json({ error: 'Could not save rating' }, { status: 500 });
    return Response.json({ success: true, checkedAt });
  } } },
});
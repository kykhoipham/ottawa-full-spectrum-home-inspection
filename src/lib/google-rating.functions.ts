import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { queryOptions } from '@tanstack/react-query';

export const getGoogleRating = createServerFn({ method: 'GET' }).handler(async () => {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error('Rating settings unavailable');
  const client = createClient(url, key, {
    auth: { persistSession: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith('sb_')) headers.delete('Authorization');
      headers.set('apikey', key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from('google_rating_snapshot')
    .select('rating,review_count,checked_at').eq('id', 'ofs').single();
  if (error) throw new Error('Saved Google rating unavailable');
  return { rating: Number(data.rating), reviewCount: Number(data.review_count), checkedAt: String(data.checked_at) };
});

export const googleRatingQueryOptions = queryOptions({
  queryKey: ['google-rating'], queryFn: () => getGoogleRating(), staleTime: 60_000,
  refetchInterval: 5 * 60_000,
});
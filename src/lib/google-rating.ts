import { z } from 'zod';

export const GOOGLE_RATING_SCHEDULE = '0 2 * * *';
export const GOOGLE_RATING_REFRESH_MS = 24 * 60 * 60 * 1000;
export const googleRatingSchema = z.object({
  id: z.string(),
  rating: z.number().min(0).max(5),
  userRatingCount: z.number().int().min(0),
});

export function formatGoogleCheckedAt(value: string) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto', month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
  }).format(new Date(value));
}
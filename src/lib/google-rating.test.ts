import { describe, it, expect } from 'vitest';
import { GOOGLE_RATING_REFRESH_MS, GOOGLE_RATING_SCHEDULE, formatGoogleCheckedAt, googleRatingSchema } from './google-rating';

describe('daily Google rating', () => {
  it('refreshes every 24 hours on a once-daily schedule', () => {
    expect(GOOGLE_RATING_REFRESH_MS).toBe(86_400_000);
    expect(GOOGLE_RATING_SCHEDULE).toBe('0 2 * * *');
  });
  it('displays the actual check time in Toronto', () => {
    expect(formatGoogleCheckedAt('2026-10-20T01:26:59Z')).toContain('9:26');
    expect(formatGoogleCheckedAt('2026-10-20T01:26:59Z')).toContain('Oct 19, 2026');
  });
  it('rejects invalid data rather than replacing a verified rating', () => {
    expect(googleRatingSchema.safeParse({ id: 'test', rating: 5.1, userRatingCount: 26 }).success).toBe(false);
    expect(googleRatingSchema.safeParse({ id: 'test', rating: 5, userRatingCount: -1 }).success).toBe(false);
  });
});
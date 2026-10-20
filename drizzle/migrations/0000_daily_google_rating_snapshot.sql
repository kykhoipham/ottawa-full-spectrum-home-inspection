CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
CREATE TABLE public.google_rating_snapshot (
 id text PRIMARY KEY DEFAULT 'ofs' CHECK (id = 'ofs'),
 place_id text,
 rating numeric NOT NULL CHECK (rating BETWEEN 0 AND 5),
 review_count integer NOT NULL CHECK (review_count >= 0),
 checked_at timestamptz NOT NULL
);
GRANT SELECT ON public.google_rating_snapshot TO anon, authenticated;
GRANT ALL ON public.google_rating_snapshot TO service_role;
ALTER TABLE public.google_rating_snapshot ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public business rating" ON public.google_rating_snapshot FOR SELECT TO anon, authenticated USING (id = 'ofs');
CREATE TABLE public.google_rating_refresh_control (
 id text PRIMARY KEY CHECK (id = 'ofs'),
 token text NOT NULL,
 last_attempt_at timestamptz
);
GRANT ALL ON public.google_rating_refresh_control TO service_role;
ALTER TABLE public.google_rating_refresh_control ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.authorize_google_rating_refresh(p_token text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE claimed text;
BEGIN
 UPDATE public.google_rating_refresh_control SET last_attempt_at = now()
 WHERE id = 'ofs' AND token = p_token
 AND (last_attempt_at IS NULL OR last_attempt_at <= now() - interval '24 hours')
 RETURNING id INTO claimed;
 RETURN claimed IS NOT NULL;
END;
$$;
REVOKE ALL ON FUNCTION public.authorize_google_rating_refresh(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.authorize_google_rating_refresh(text) TO anon, authenticated, service_role;
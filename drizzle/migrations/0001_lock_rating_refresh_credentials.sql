REVOKE ALL ON public.google_rating_refresh_control FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.google_rating_snapshot FROM anon, authenticated;
CREATE OR REPLACE FUNCTION public.authorize_google_rating_refresh(p_token text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE claimed text;
BEGIN
 UPDATE public.google_rating_refresh_control SET last_attempt_at = now()
 WHERE id = 'ofs' AND token = p_token
 AND (last_attempt_at IS NULL OR (last_attempt_at AT TIME ZONE 'UTC')::date < (now() AT TIME ZONE 'UTC')::date)
 RETURNING id INTO claimed;
 RETURN claimed IS NOT NULL;
END;
$$;
REVOKE ALL ON FUNCTION public.authorize_google_rating_refresh(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.authorize_google_rating_refresh(text) TO anon, authenticated, service_role;
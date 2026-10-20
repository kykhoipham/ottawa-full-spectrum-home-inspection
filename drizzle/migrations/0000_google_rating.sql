CREATE TABLE public.google_rating (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  rating numeric NOT NULL,
  review_count int NOT NULL,
  maps_uri text,
  checked_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.google_rating TO anon, authenticated;
GRANT ALL ON public.google_rating TO service_role;
ALTER TABLE public.google_rating ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read rating" ON public.google_rating FOR SELECT TO anon, authenticated USING (true);
INSERT INTO public.google_rating (rating, review_count, maps_uri, checked_at)
VALUES (5, 26, 'https://maps.google.com/?cid=15228757868297005456', now());
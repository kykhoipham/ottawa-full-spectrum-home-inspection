
CREATE TABLE public.inspection_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  property_address TEXT NOT NULL,
  property_type TEXT,
  square_footage TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  inspection_type TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inspection_bookings TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.inspection_bookings TO authenticated;
GRANT ALL ON public.inspection_bookings TO service_role;
ALTER TABLE public.inspection_bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a booking" ON public.inspection_bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can read bookings" ON public.inspection_bookings FOR SELECT TO authenticated USING (true);

CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a contact message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can read contact messages" ON public.contact_messages FOR SELECT TO authenticated USING (true);

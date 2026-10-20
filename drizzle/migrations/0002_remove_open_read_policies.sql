DROP POLICY IF EXISTS "Authenticated can read bookings" ON public.inspection_bookings;
DROP POLICY IF EXISTS "Authenticated can read contact messages" ON public.contact_messages;
REVOKE SELECT ON public.inspection_bookings FROM authenticated, anon;
REVOKE SELECT ON public.contact_messages FROM authenticated, anon;
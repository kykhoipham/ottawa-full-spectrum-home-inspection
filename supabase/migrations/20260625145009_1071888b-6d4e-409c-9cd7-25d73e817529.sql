DROP POLICY "Anyone can submit a booking" ON public.inspection_bookings;
CREATE POLICY "Anyone can submit a booking" ON public.inspection_bookings
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(full_name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 255
    AND email LIKE '%_@_%.__%'
    AND char_length(phone) BETWEEN 7 AND 40
    AND char_length(property_address) BETWEEN 5 AND 300
    AND (notes IS NULL OR char_length(notes) <= 2000)
  );

DROP POLICY "Anyone can submit a contact message" ON public.contact_messages;
CREATE POLICY "Anyone can submit a contact message" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(full_name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 255
    AND email LIKE '%_@_%.__%'
    AND char_length(message) BETWEEN 1 AND 4000
    AND (phone IS NULL OR char_length(phone) BETWEEN 7 AND 40)
    AND (subject IS NULL OR char_length(subject) <= 200)
  );
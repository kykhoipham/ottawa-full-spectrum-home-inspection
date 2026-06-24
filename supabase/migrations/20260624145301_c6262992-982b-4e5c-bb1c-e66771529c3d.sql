
ALTER TABLE public.inspection_bookings
  ADD CONSTRAINT inspection_bookings_full_name_len CHECK (char_length(full_name) BETWEEN 1 AND 120),
  ADD CONSTRAINT inspection_bookings_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT inspection_bookings_phone_len CHECK (char_length(phone) BETWEEN 7 AND 40),
  ADD CONSTRAINT inspection_bookings_property_address_len CHECK (char_length(property_address) BETWEEN 5 AND 300),
  ADD CONSTRAINT inspection_bookings_notes_len CHECK (notes IS NULL OR char_length(notes) <= 2000);

ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_full_name_len CHECK (char_length(full_name) BETWEEN 1 AND 120),
  ADD CONSTRAINT contact_messages_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT contact_messages_phone_len CHECK (phone IS NULL OR char_length(phone) BETWEEN 7 AND 40),
  ADD CONSTRAINT contact_messages_subject_len CHECK (subject IS NULL OR char_length(subject) <= 200),
  ADD CONSTRAINT contact_messages_message_len CHECK (char_length(message) BETWEEN 1 AND 4000);

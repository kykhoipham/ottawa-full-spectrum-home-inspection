ALTER TABLE public.inspection_bookings
  ADD CONSTRAINT inspection_bookings_property_type_len
    CHECK (property_type IS NULL OR char_length(property_type) <= 60),
  ADD CONSTRAINT inspection_bookings_square_footage_len
    CHECK (square_footage IS NULL OR char_length(square_footage) <= 40),
  ADD CONSTRAINT inspection_bookings_preferred_time_len
    CHECK (preferred_time IS NULL OR char_length(preferred_time) <= 40),
  ADD CONSTRAINT inspection_bookings_inspection_type_len
    CHECK (inspection_type IS NULL OR char_length(inspection_type) <= 60);
CREATE TABLE IF NOT EXISTS public.shortlist_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    shortlist_id uuid REFERENCES public.shortlists(id) ON DELETE CASCADE,
    candidat_id uuid REFERENCES public.candidats(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    UNIQUE(shortlist_id, candidat_id)
);

-- Retrieve candidates for a shortlist
-- SELECT c.* FROM shortlist_items si
-- JOIN candidats c ON c.id = si.candidat_id
-- WHERE si.shortlist_id = 'your-shortlist-id';

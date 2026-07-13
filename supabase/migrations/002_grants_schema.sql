CREATE TABLE grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  organization TEXT,
  url TEXT,
  amount_min NUMERIC(12,2),
  amount_max NUMERIC(12,2),
  deadline TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'identified',
    -- identified, researching, drafting, submitted, awarded, rejected
  category TEXT, -- youth sports, education, mentorship, community, general nonprofit
  eligibility_notes TEXT,
  description TEXT,
  draft_narrative TEXT,
  draft_budget TEXT,
  ai_strategy TEXT,
  notes TEXT,
  submitted_at TIMESTAMPTZ,
  awarded_amount NUMERIC(12,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_grants_status ON grants(status);
CREATE INDEX idx_grants_deadline ON grants(deadline);

CREATE TRIGGER grants_updated_at
  BEFORE UPDATE ON grants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

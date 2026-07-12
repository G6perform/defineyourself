-- Outreach Agent Schema for Define Yourself Inc.

-- Businesses discovered and tracked
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT, -- restaurant, retail, gym, etc.
  address TEXT,
  city TEXT DEFAULT 'Sacramento',
  phone TEXT,
  email TEXT,
  website TEXT,
  google_place_id TEXT UNIQUE,
  google_rating NUMERIC(2,1),
  google_reviews_count INTEGER,
  status TEXT NOT NULL DEFAULT 'discovered',
    -- discovered, contacted, opened, interested, donated, declined, unsubscribed
  notes TEXT,
  discovered_at TIMESTAMPTZ DEFAULT NOW(),
  contacted_at TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ,
  donated_amount NUMERIC(10,2),
  donated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email outreach log
CREATE TABLE outreach_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  resend_id TEXT, -- Resend email ID for tracking
  from_email TEXT NOT NULL DEFAULT 'nick@defineyourself916.org',
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL,
  body_text TEXT,
  status TEXT NOT NULL DEFAULT 'sent',
    -- sent, delivered, opened, clicked, replied, bounced, complained
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Text message log (for warm follow-ups)
CREATE TABLE outreach_texts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  direction TEXT NOT NULL DEFAULT 'outbound', -- outbound, inbound
  from_number TEXT,
  to_number TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent',
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agent settings / config
CREATE TABLE outreach_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default settings
INSERT INTO outreach_settings (key, value) VALUES
  ('daily_email_limit', '20'),
  ('discovery_radius_miles', '25'),
  ('discovery_city', 'Sacramento, CA'),
  ('from_name', 'Nick Pohl'),
  ('from_email', 'nick@defineyourself916.org'),
  ('reply_to', 'defineyourself916@gmail.com'),
  ('agent_enabled', 'true'),
  ('follow_up_days', '5'),
  ('max_follow_ups', '2');

-- Indexes
CREATE INDEX idx_businesses_status ON businesses(status);
CREATE INDEX idx_businesses_city ON businesses(city);
CREATE INDEX idx_outreach_emails_business ON outreach_emails(business_id);
CREATE INDEX idx_outreach_emails_status ON outreach_emails(status);
CREATE INDEX idx_outreach_texts_business ON outreach_texts(business_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

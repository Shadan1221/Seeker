-- ════════════════════════════════════════════════════════════════════════════
-- SEEKER — Career Intelligence Schema
-- This schema is ADDITIVE. It does NOT touch existing tables (profiles,
-- quiz_attempts, bookmarks). Run this in the Supabase SQL Editor.
-- ════════════════════════════════════════════════════════════════════════════

-- Helper function for auto-updating updated_at (idempotent)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ═══════════════ 1a. Career Intelligence ═══════════════

CREATE TABLE IF NOT EXISTS public.career_intelligence (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  career_id text NOT NULL,
  data_type text NOT NULL,
  source_url text,
  source_name text NOT NULL,
  raw_data jsonb NOT NULL,
  processed_data jsonb,
  confidence_score float DEFAULT 0.8,
  is_verified boolean DEFAULT false,
  is_active boolean DEFAULT true,
  version integer DEFAULT 1,
  refresh_interval_days integer DEFAULT 90,
  last_scraped_at timestamptz DEFAULT now(),
  next_refresh_at timestamptz DEFAULT now() + interval '90 days',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_career_intelligence_career_id ON public.career_intelligence(career_id);
CREATE INDEX IF NOT EXISTS idx_career_intelligence_data_type ON public.career_intelligence(data_type);
CREATE INDEX IF NOT EXISTS idx_career_intelligence_active ON public.career_intelligence(is_active);
CREATE INDEX IF NOT EXISTS idx_career_intelligence_refresh ON public.career_intelligence(next_refresh_at);

-- ═══════════════ 1b. College Intelligence ═══════════════

CREATE TABLE IF NOT EXISTS public.college_intelligence (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  college_name text NOT NULL,
  city text,
  state text,
  type text,
  careers text[] DEFAULT '{}',
  nirf_rank integer,
  nirf_category text,
  nirf_year integer,
  avg_package_lpa float,
  entrance_exams text[] DEFAULT '{}',
  website_url text,
  source_url text,
  confidence_score float DEFAULT 0.8,
  is_active boolean DEFAULT true,
  version integer DEFAULT 1,
  last_scraped_at timestamptz DEFAULT now(),
  next_refresh_at timestamptz DEFAULT now() + interval '365 days',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_college_intelligence_careers ON public.college_intelligence USING GIN(careers);
CREATE INDEX IF NOT EXISTS idx_college_intelligence_type ON public.college_intelligence(type);

-- ═══════════════ 1c. Exam Intelligence ═══════════════

CREATE TABLE IF NOT EXISTS public.exam_intelligence (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  exam_name text NOT NULL,
  exam_slug text UNIQUE NOT NULL,
  conducting_body text,
  careers text[] DEFAULT '{}',
  official_url text,
  notification_url text,
  exam_date text,
  registration_start text,
  registration_end text,
  application_fee_general integer,
  eligibility_summary text,
  total_seats integer,
  syllabus_summary text,
  last_year_cutoff jsonb,
  source_url text,
  confidence_score float DEFAULT 0.8,
  is_active boolean DEFAULT true,
  version integer DEFAULT 1,
  last_scraped_at timestamptz DEFAULT now(),
  next_refresh_at timestamptz DEFAULT now() + interval '30 days',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ═══════════════ 1d. Salary Intelligence ═══════════════

CREATE TABLE IF NOT EXISTS public.salary_intelligence (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  career_id text NOT NULL,
  experience_level text NOT NULL,
  salary_min_lpa float,
  salary_max_lpa float,
  salary_median_lpa float,
  city text DEFAULT 'India',
  sector text,
  sample_size integer,
  source_name text NOT NULL,
  source_url text,
  data_year integer,
  confidence_score float DEFAULT 0.7,
  is_active boolean DEFAULT true,
  last_scraped_at timestamptz DEFAULT now(),
  next_refresh_at timestamptz DEFAULT now() + interval '90 days',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_salary_intelligence_career ON public.salary_intelligence(career_id);

-- ═══════════════ 1e. Staging Table ═══════════════

CREATE TABLE IF NOT EXISTS public.pipeline_staging (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  source_name text NOT NULL,
  source_url text NOT NULL,
  data_type text NOT NULL,
  raw_html text,
  raw_json jsonb,
  parse_status text DEFAULT 'pending',
  error_message text,
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz
);

-- ═══════════════ 1f. Pipeline Run Log ═══════════════

CREATE TABLE IF NOT EXISTS public.pipeline_runs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  run_type text NOT NULL,
  status text DEFAULT 'running',
  sources_attempted integer DEFAULT 0,
  sources_succeeded integer DEFAULT 0,
  records_inserted integer DEFAULT 0,
  records_updated integer DEFAULT 0,
  records_skipped integer DEFAULT 0,
  error_log jsonb DEFAULT '[]'::jsonb,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- ═══════════════ 1g. pgvector (optional — skip if extension unavailable) ═══════════════

-- Uncomment the following if pgvector is enabled on your Supabase project:
-- CREATE EXTENSION IF NOT EXISTS vector;
-- ALTER TABLE public.career_intelligence ADD COLUMN IF NOT EXISTS embedding vector(1536);
-- CREATE INDEX idx_career_intelligence_embedding
--   ON public.career_intelligence USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- ═══════════════ 1h. Row Level Security ═══════════════

ALTER TABLE public.career_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.college_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_intelligence ENABLE ROW LEVEL SECURITY;

-- Read-only access for all users (service role bypasses RLS for writes)
DO $$ BEGIN
  CREATE POLICY "Anyone can read active career intelligence"
    ON public.career_intelligence FOR SELECT USING (is_active = true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anyone can read active college intelligence"
    ON public.college_intelligence FOR SELECT USING (is_active = true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anyone can read active exam intelligence"
    ON public.exam_intelligence FOR SELECT USING (is_active = true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anyone can read active salary intelligence"
    ON public.salary_intelligence FOR SELECT USING (is_active = true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ═══════════════ Auto-update triggers ═══════════════

DROP TRIGGER IF EXISTS career_intelligence_updated_at ON public.career_intelligence;
CREATE TRIGGER career_intelligence_updated_at
  BEFORE UPDATE ON public.career_intelligence
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS college_intelligence_updated_at ON public.college_intelligence;
CREATE TRIGGER college_intelligence_updated_at
  BEFORE UPDATE ON public.college_intelligence
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS exam_intelligence_updated_at ON public.exam_intelligence;
CREATE TRIGGER exam_intelligence_updated_at
  BEFORE UPDATE ON public.exam_intelligence
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

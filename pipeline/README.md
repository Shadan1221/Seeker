# Seeker Data Pipeline

Collects, validates, and stores career intelligence data from trusted Indian sources into Supabase.

## Setup

```bash
cd pipeline
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
playwright install chromium
```

## Configuration

Copy `.env.example` to `.env` and fill in your credentials:
- `SUPABASE_URL` — your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — the **service role** key (not anon key) for write access
- `GROQ_API_KEY` — for AI-assisted parsing of unstructured content

## Running

```bash
# Incremental run (only refreshes stale records)
python -m pipeline.runner

# Full refresh
PIPELINE_RUN_TYPE=full python -m pipeline.runner
```

## Data Sources

| Source | Data Type | Refresh |
|---|---|---|
| NIRF Rankings | Colleges | Annually |
| NTA (JEE/NEET) | Exams | Monthly |
| AmbitionBox | Salaries | Quarterly |

## Architecture

```
scrapers/ → parsers/ → validators/ → database/writer.py → Supabase
```

Each scraper collects raw HTML/JSON → parsers extract structured fields → validators
enforce Pydantic schemas → writer upserts into the production tables with versioning.

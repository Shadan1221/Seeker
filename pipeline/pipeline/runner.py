"""
Main pipeline orchestrator — scrapes, parses, validates, and upserts career
intelligence data into Supabase.
"""

import asyncio
import logging
import json
import sys
import os
from datetime import datetime

# Add parent dir to path so 'config', 'scrapers' etc. are importable
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config.sources import DATA_SOURCES
from config.settings import settings
from scrapers.nirf_scraper import NIRFScraper
from scrapers.nta_scraper import NTAScraper
from scrapers.salary_scraper import SalaryScraper
from parsers.college_parser import parse_college
from parsers.exam_parser import parse_exam
from parsers.salary_parser import parse_salary
from validators.schemas import CollegeRecord, ExamRecord, SalaryRecord
from database.writer import upsert_college, upsert_exam, upsert_salary
from database.client import supabase

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

SCRAPER_MAP = {
    "nirf_scraper": NIRFScraper,
    "nta_scraper": NTAScraper,
    "salary_scraper": SalaryScraper,
}


async def run_pipeline(run_type: str = "incremental"):
    """Run the complete data pipeline."""
    logger.info(f"Starting pipeline run: {run_type}")

    # Create run record
    run_record = supabase.table("pipeline_runs").insert({
        "run_type": run_type,
        "status": "running",
        "started_at": datetime.now().isoformat()
    }).execute()
    run_id = run_record.data[0]["id"]

    stats = {
        "attempted": 0,
        "succeeded": 0,
        "inserted": 0,
        "updated": 0,
        "skipped": 0,
        "errors": []
    }

    for source in DATA_SOURCES:
        stats["attempted"] += 1
        scraper_class = SCRAPER_MAP.get(source["scraper"])
        if not scraper_class:
            logger.warning(f"Unknown scraper: {source['scraper']}")
            stats["skipped"] += 1
            continue

        try:
            logger.info(f"Processing source: {source['name']}")
            scraper = scraper_class(source)
            raw_records = await scraper.scrape()

            if not raw_records:
                logger.warning(f"No data from {source['name']}")
                stats["skipped"] += 1
                continue

            # Parse, validate, and upsert
            processed = 0
            for raw in raw_records:
                try:
                    success = False

                    if source["data_type"] == "colleges":
                        parsed = parse_college(raw, source)
                        validated = CollegeRecord(**parsed)
                        success = await upsert_college(
                            validated.model_dump(),
                            source["refresh_interval_days"]
                        )

                    elif source["data_type"] == "exams":
                        parsed = parse_exam(raw, source)
                        validated = ExamRecord(**parsed)
                        success = await upsert_exam(
                            validated.model_dump(),
                            source["refresh_interval_days"]
                        )

                    elif source["data_type"] == "salary":
                        salary_records = parse_salary(raw, source)
                        for salary_record in salary_records:
                            validated = SalaryRecord(**salary_record)
                            success = await upsert_salary(validated.model_dump())

                    if success:
                        processed += 1

                except Exception as e:
                    logger.debug(f"Record validation failed: {e}")

            stats["succeeded"] += 1
            stats["inserted"] += processed
            logger.info(f"[{source['name']}] processed {processed}/{len(raw_records)} records")

        except Exception as e:
            stats["errors"].append({"source": source["name"], "error": str(e)})
            logger.error(f"Source {source['name']} failed: {e}")

    # Update run record
    supabase.table("pipeline_runs").update({
        "status": "completed",
        "sources_attempted": stats["attempted"],
        "sources_succeeded": stats["succeeded"],
        "records_inserted": stats["inserted"],
        "records_skipped": stats["skipped"],
        "error_log": stats["errors"],
        "completed_at": datetime.now().isoformat()
    }).eq("id", run_id).execute()

    logger.info(f"Pipeline complete: {stats}")
    return stats


if __name__ == "__main__":
    run_type = settings.pipeline_run_type
    asyncio.run(run_pipeline(run_type))

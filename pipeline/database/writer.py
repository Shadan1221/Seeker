"""Upsert logic with versioning for all intelligence tables."""

from database.client import supabase
import logging
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)


async def upsert_college(record: dict, refresh_interval_days: int = 365) -> bool:
    """Upsert a college record. Uses college_name as the unique key."""
    try:
        existing = supabase.table("college_intelligence") \
            .select("id, version") \
            .eq("college_name", record["college_name"]) \
            .execute()

        next_refresh = datetime.now() + timedelta(days=refresh_interval_days)

        if existing.data:
            version = existing.data[0].get("version", 0) + 1
            supabase.table("college_intelligence").update({
                **record,
                "version": version,
                "last_scraped_at": datetime.now().isoformat(),
                "next_refresh_at": next_refresh.isoformat(),
            }).eq("id", existing.data[0]["id"]).execute()
            logger.debug(f"Updated college: {record['college_name']} (v{version})")
        else:
            supabase.table("college_intelligence").insert({
                **record,
                "version": 1,
                "last_scraped_at": datetime.now().isoformat(),
                "next_refresh_at": next_refresh.isoformat(),
            }).execute()
            logger.debug(f"Inserted college: {record['college_name']}")

        return True
    except Exception as e:
        logger.error(f"Failed to upsert college {record.get('college_name')}: {e}")
        return False


async def upsert_exam(record: dict, refresh_interval_days: int = 30) -> bool:
    """Upsert an exam record. Uses exam_slug as the unique key."""
    try:
        existing = supabase.table("exam_intelligence") \
            .select("id, version") \
            .eq("exam_slug", record["exam_slug"]) \
            .execute()

        next_refresh = datetime.now() + timedelta(days=refresh_interval_days)

        if existing.data:
            version = existing.data[0].get("version", 0) + 1
            supabase.table("exam_intelligence").update({
                **record,
                "version": version,
                "last_scraped_at": datetime.now().isoformat(),
                "next_refresh_at": next_refresh.isoformat(),
            }).eq("id", existing.data[0]["id"]).execute()
            logger.debug(f"Updated exam: {record['exam_name']} (v{version})")
        else:
            supabase.table("exam_intelligence").insert({
                **record,
                "version": 1,
                "last_scraped_at": datetime.now().isoformat(),
                "next_refresh_at": next_refresh.isoformat(),
            }).execute()
            logger.debug(f"Inserted exam: {record['exam_name']}")

        return True
    except Exception as e:
        logger.error(f"Failed to upsert exam {record.get('exam_name')}: {e}")
        return False


async def upsert_salary(record: dict) -> bool:
    """Upsert salary data. Unique key: (career_id, experience_level, sector, city)."""
    try:
        existing = supabase.table("salary_intelligence") \
            .select("id") \
            .eq("career_id", record["career_id"]) \
            .eq("experience_level", record["experience_level"]) \
            .eq("sector", record.get("sector", "private")) \
            .eq("city", record.get("city", "India")) \
            .execute()

        if existing.data:
            supabase.table("salary_intelligence").update({
                **record,
                "last_scraped_at": datetime.now().isoformat(),
            }).eq("id", existing.data[0]["id"]).execute()
        else:
            supabase.table("salary_intelligence").insert(record).execute()

        return True
    except Exception as e:
        logger.error(f"Failed to upsert salary: {e}")
        return False

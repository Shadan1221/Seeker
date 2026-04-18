"""Incremental pipeline — only refreshes records past next_refresh_at."""

import asyncio
import logging
from datetime import datetime
from database.client import supabase

logger = logging.getLogger(__name__)


async def get_stale_sources() -> list[dict]:
    """Returns sources that need refreshing based on next_refresh_at."""
    now = datetime.now().isoformat()

    # Check each intelligence table for stale records
    stale = []

    for table_name in ["college_intelligence", "exam_intelligence", "salary_intelligence"]:
        result = supabase.table(table_name) \
            .select("id, next_refresh_at") \
            .lt("next_refresh_at", now) \
            .eq("is_active", True) \
            .limit(100) \
            .execute()

        if result.data:
            stale.append({
                "table": table_name,
                "count": len(result.data),
                "records": result.data,
            })
            logger.info(f"Found {len(result.data)} stale records in {table_name}")

    return stale

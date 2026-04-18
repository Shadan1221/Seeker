"""Full refresh pipeline — complete data rebuild from all sources."""

import logging
from .runner import run_pipeline

logger = logging.getLogger(__name__)


async def full_refresh():
    """Run a complete data refresh from all sources."""
    logger.info("Starting full data refresh")
    return await run_pipeline(run_type="full")

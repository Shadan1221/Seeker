"""LinkedIn India job posting trends scraper — placeholder for future implementation."""

from .base_scraper import BaseScraper
import logging

logger = logging.getLogger(__name__)


class JobsScraper(BaseScraper):
    """Scrapes job posting trends from LinkedIn India."""

    async def scrape(self) -> list[dict]:
        # TODO: Implement LinkedIn job trends scraping
        logger.info("Jobs scraper: not yet implemented")
        return []

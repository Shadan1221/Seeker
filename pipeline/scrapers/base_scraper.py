from abc import ABC, abstractmethod
from playwright.async_api import async_playwright
import httpx
import asyncio
import logging
from config.settings import settings

logger = logging.getLogger(__name__)


class BaseScraper(ABC):
    """Abstract base class all scrapers inherit from."""

    def __init__(self, source_config: dict):
        self.source = source_config
        self.delay = settings.request_delay_seconds

    async def fetch_html(self, url: str) -> str | None:
        """Fetch page HTML using Playwright for JS-rendered pages."""
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                page = await browser.new_page()
                await page.set_extra_http_headers({
                    "User-Agent": "Mozilla/5.0 (research bot; career-data-collection; pathseeker.app)"
                })
                await page.goto(url, timeout=settings.playwright_timeout_ms)
                await page.wait_for_load_state("networkidle")
                content = await page.content()
                await browser.close()
                await asyncio.sleep(self.delay)
                return content
        except Exception as e:
            logger.error(f"Failed to fetch {url}: {e}")
            return None

    async def fetch_json(self, url: str, params: dict = None) -> dict | None:
        """Fetch JSON from an API endpoint."""
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                resp = await client.get(url, params=params, headers={
                    "User-Agent": "Mozilla/5.0 (research bot; career-data-collection; pathseeker.app)"
                })
                resp.raise_for_status()
                await asyncio.sleep(self.delay)
                return resp.json()
        except Exception as e:
            logger.error(f"Failed to fetch JSON from {url}: {e}")
            return None

    @abstractmethod
    async def scrape(self) -> list[dict]:
        """Implement scraping logic. Return list of raw records."""
        pass

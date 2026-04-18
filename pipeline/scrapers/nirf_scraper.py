from bs4 import BeautifulSoup
from .base_scraper import BaseScraper
import logging
import re

logger = logging.getLogger(__name__)


class NIRFScraper(BaseScraper):
    """Scrapes NIRF ranking tables from nirfindia.org."""

    async def scrape(self) -> list[dict]:
        html = await self.fetch_html(self.source["url"])
        if not html:
            return []

        soup = BeautifulSoup(html, "html.parser")
        results = []

        # NIRF tables have a consistent structure — rank, institute name,
        # city, state, score. Parse the ranking table.
        table = soup.find("table", {"id": "tbl_overall"}) or \
                soup.find("table", class_=re.compile(".*ranking.*", re.I))

        if not table:
            # Try finding any table with ranking-like data
            tables = soup.find_all("table")
            for t in tables:
                headers = [th.get_text(strip=True).lower() for th in t.find_all("th")]
                if any("rank" in h or "institute" in h for h in headers):
                    table = t
                    break

        if not table:
            logger.warning(f"Could not find ranking table at {self.source['url']}")
            return []

        rows = table.find_all("tr")[1:]  # Skip header row
        for row in rows:
            cols = row.find_all("td")
            if len(cols) < 3:
                continue
            try:
                rank_text = cols[0].get_text(strip=True)
                rank_match = re.search(r'\d+', rank_text)
                rank = int(rank_match.group()) if rank_match else None
                name = cols[1].get_text(strip=True)
                city_state = cols[2].get_text(strip=True) if len(cols) > 2 else ""

                results.append({
                    "college_name": name,
                    "nirf_rank": rank,
                    "location_raw": city_state,
                    "nirf_category": self.source["name"],
                    "nirf_year": 2024,
                    "source_url": self.source["url"],
                    "source_name": self.source["name"],
                    "careers": self.source["careers"],
                })
            except (ValueError, AttributeError) as e:
                logger.debug(f"Skipping malformed row: {e}")
                continue

        logger.info(f"NIRF scraper: extracted {len(results)} colleges from {self.source['name']}")
        return results

from bs4 import BeautifulSoup
from .base_scraper import BaseScraper
import logging
import re

logger = logging.getLogger(__name__)


class NTAScraper(BaseScraper):
    """Scrapes NTA exam information pages (JEE Main, NEET UG, etc.)."""

    async def scrape(self) -> list[dict]:
        html = await self.fetch_html(self.source["url"])
        if not html:
            return []

        soup = BeautifulSoup(html, "html.parser")
        page_text = soup.get_text(" ", strip=True)

        # Extract what we can from the page
        exam_name = self.source["name"].replace("NTA ", "")

        result = {
            "exam_name": exam_name,
            "exam_slug": re.sub(r'[^a-z0-9]+', '-', exam_name.lower()).strip('-'),
            "conducting_body": "National Testing Agency (NTA)",
            "careers": self.source["careers"],
            "official_url": self.source["url"],
            "source_url": self.source["url"],
            "source_name": self.source["name"],
            "raw_text": page_text[:5000],  # For AI parsing if needed
        }

        # Try to extract dates from the page text
        date_patterns = [
            r'(?:exam\s+date|test\s+date)[:\s]*(\d{1,2}\s+\w+\s+\d{4})',
            r'(?:registration\s+start)[:\s]*(\d{1,2}\s+\w+\s+\d{4})',
            r'(?:last\s+date)[:\s]*(\d{1,2}\s+\w+\s+\d{4})',
        ]

        for pattern in date_patterns:
            match = re.search(pattern, page_text, re.IGNORECASE)
            if match:
                if 'exam' in pattern.lower():
                    result['exam_date'] = match.group(1)
                elif 'registration' in pattern.lower():
                    result['registration_start'] = match.group(1)
                elif 'last' in pattern.lower():
                    result['registration_end'] = match.group(1)

        # Try to extract fee
        fee_match = re.search(r'(?:application\s+fee|general\s+category)[:\s]*(?:Rs\.?\s*)?(\d{1,5})', page_text, re.IGNORECASE)
        if fee_match:
            result['application_fee_general'] = int(fee_match.group(1))

        logger.info(f"NTA scraper: extracted exam info for {exam_name}")
        return [result]

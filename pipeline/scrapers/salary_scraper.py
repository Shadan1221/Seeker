from bs4 import BeautifulSoup
from .base_scraper import BaseScraper
import logging
import re

logger = logging.getLogger(__name__)


class SalaryScraper(BaseScraper):
    """Scrapes salary data from AmbitionBox for Indian careers."""

    CAREER_SEARCH_TERMS = {
        "software-engineer": "software engineer",
        "data-scientist": "data scientist",
        "product-manager": "product manager",
        "cybersecurity": "cybersecurity analyst",
        "graphic-designer": "graphic designer",
        "content-creator": "content writer",
    }

    async def scrape(self) -> list[dict]:
        results = []

        for career_id in self.source.get("careers", []):
            search_term = self.CAREER_SEARCH_TERMS.get(career_id, career_id.replace("-", " "))
            url = f"https://www.ambitionbox.com/salaries/{search_term.replace(' ', '-')}-salary"

            html = await self.fetch_html(url)
            if not html:
                continue

            soup = BeautifulSoup(html, "html.parser")
            page_text = soup.get_text(" ", strip=True)

            # Try extracting salary ranges from the page
            salary_data = {
                "career_id": career_id,
                "source_name": "AmbitionBox",
                "source_url": url,
                "raw_text": page_text[:3000],
            }

            # Pattern: "₹X.XL - ₹Y.YL" or "X Lakhs - Y Lakhs"
            salary_pattern = r'(?:₹|Rs\.?\s*)(\d+\.?\d*)\s*(?:L|Lakhs?|LPA)?\s*[-–to]+\s*(?:₹|Rs\.?\s*)(\d+\.?\d*)\s*(?:L|Lakhs?|LPA)?'
            matches = re.findall(salary_pattern, page_text, re.IGNORECASE)

            if matches:
                # First match is often the headline salary range
                try:
                    min_sal = float(matches[0][0])
                    max_sal = float(matches[0][1])
                    salary_data["salary_min_lpa"] = min_sal
                    salary_data["salary_max_lpa"] = max_sal
                    salary_data["salary_median_lpa"] = round((min_sal + max_sal) / 2, 1)
                except (ValueError, IndexError):
                    pass

            results.append(salary_data)
            logger.info(f"Salary scraper: extracted data for {career_id}")

        return results

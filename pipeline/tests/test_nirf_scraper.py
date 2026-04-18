"""Tests for the NIRF scraper."""

import pytest
from unittest.mock import patch, AsyncMock
from scrapers.nirf_scraper import NIRFScraper


@pytest.fixture
def nirf_source():
    return {
        "name": "NIRF Rankings 2024",
        "url": "https://www.nirfindia.org/Rankings/2024/EngineeringRanking.html",
        "data_type": "colleges",
        "scraper": "nirf_scraper",
        "refresh_interval_days": 365,
        "careers": ["software-engineer", "data-scientist"]
    }


@pytest.fixture
def sample_nirf_html():
    return """
    <html>
    <body>
    <table id="tbl_overall">
        <tr><th>Rank</th><th>Institute</th><th>City</th></tr>
        <tr><td>1</td><td>IIT Madras</td><td>Chennai, Tamil Nadu</td></tr>
        <tr><td>2</td><td>IIT Delhi</td><td>New Delhi, Delhi</td></tr>
        <tr><td>3</td><td>IIT Bombay</td><td>Mumbai, Maharashtra</td></tr>
    </table>
    </body>
    </html>
    """


class TestNIRFScraper:
    @pytest.mark.asyncio
    async def test_scrape_parses_table(self, nirf_source, sample_nirf_html):
        scraper = NIRFScraper(nirf_source)
        with patch.object(scraper, 'fetch_html', new_callable=AsyncMock, return_value=sample_nirf_html):
            results = await scraper.scrape()
            assert len(results) == 3
            assert results[0]["college_name"] == "IIT Madras"
            assert results[0]["nirf_rank"] == 1
            assert results[1]["college_name"] == "IIT Delhi"

    @pytest.mark.asyncio
    async def test_scrape_returns_empty_on_failure(self, nirf_source):
        scraper = NIRFScraper(nirf_source)
        with patch.object(scraper, 'fetch_html', new_callable=AsyncMock, return_value=None):
            results = await scraper.scrape()
            assert results == []

    @pytest.mark.asyncio
    async def test_scrape_returns_empty_on_missing_table(self, nirf_source):
        scraper = NIRFScraper(nirf_source)
        with patch.object(scraper, 'fetch_html', new_callable=AsyncMock, return_value="<html><body>No table</body></html>"):
            results = await scraper.scrape()
            assert results == []

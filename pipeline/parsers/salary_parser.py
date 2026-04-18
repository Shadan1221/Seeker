"""Parses raw scraped salary data into SalaryRecord schemas."""

import logging

logger = logging.getLogger(__name__)


def parse_salary(raw: dict, source: dict) -> list[dict]:
    """
    Transform a raw scraped salary record into one or more SalaryRecord dicts.
    Creates entries for fresher/mid/senior based on available data.
    """
    career_id = raw.get("career_id", "")
    base_min = raw.get("salary_min_lpa")
    base_max = raw.get("salary_max_lpa")
    base_median = raw.get("salary_median_lpa")

    records = []

    if base_min is not None and base_max is not None:
        # Generate tiered salary estimates
        # Fresher: the scraped range (typically the headline figure)
        records.append({
            "career_id": career_id,
            "experience_level": "fresher",
            "salary_min_lpa": base_min,
            "salary_max_lpa": base_max,
            "salary_median_lpa": base_median or round((base_min + base_max) / 2, 1),
            "city": "India",
            "sector": "private",
            "source_name": raw.get("source_name", source.get("name", "Unknown")),
            "source_url": raw.get("source_url", source.get("url")),
            "data_year": 2024,
            "confidence_score": 0.7,
        })

        # Mid-level: ~2x fresher
        records.append({
            "career_id": career_id,
            "experience_level": "mid",
            "salary_min_lpa": round(base_min * 1.8, 1),
            "salary_max_lpa": round(base_max * 2.2, 1),
            "salary_median_lpa": round((base_min * 1.8 + base_max * 2.2) / 2, 1),
            "city": "India",
            "sector": "private",
            "source_name": raw.get("source_name", source.get("name", "Unknown")),
            "source_url": raw.get("source_url", source.get("url")),
            "data_year": 2024,
            "confidence_score": 0.6,  # Lower confidence for estimates
        })

        # Senior: ~3.5x fresher
        records.append({
            "career_id": career_id,
            "experience_level": "senior",
            "salary_min_lpa": round(base_min * 3.0, 1),
            "salary_max_lpa": round(base_max * 4.0, 1),
            "salary_median_lpa": round((base_min * 3.0 + base_max * 4.0) / 2, 1),
            "city": "India",
            "sector": "private",
            "source_name": raw.get("source_name", source.get("name", "Unknown")),
            "source_url": raw.get("source_url", source.get("url")),
            "data_year": 2024,
            "confidence_score": 0.5,
        })
    else:
        # Just pass through with raw text for AI parsing later
        records.append({
            "career_id": career_id,
            "experience_level": "fresher",
            "salary_min_lpa": None,
            "salary_max_lpa": None,
            "salary_median_lpa": None,
            "city": "India",
            "sector": "private",
            "source_name": raw.get("source_name", source.get("name", "Unknown")),
            "source_url": raw.get("source_url", source.get("url")),
            "data_year": 2024,
            "confidence_score": 0.4,
        })

    return records

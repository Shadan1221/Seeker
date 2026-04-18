"""Parses raw scraped exam data into the ExamRecord schema."""

import re
import logging

logger = logging.getLogger(__name__)


def parse_exam(raw: dict, source: dict) -> dict:
    """
    Transform a raw scraped exam record into a validated schema dict.
    """
    exam_name = raw.get("exam_name", "")
    exam_slug = raw.get("exam_slug") or re.sub(r'[^a-z0-9]+', '-', exam_name.lower()).strip('-')

    return {
        "exam_name": exam_name,
        "exam_slug": exam_slug,
        "conducting_body": raw.get("conducting_body"),
        "careers": raw.get("careers", source.get("careers", [])),
        "official_url": raw.get("official_url", source.get("url")),
        "exam_date": raw.get("exam_date"),
        "registration_start": raw.get("registration_start"),
        "registration_end": raw.get("registration_end"),
        "application_fee_general": raw.get("application_fee_general"),
        "eligibility_summary": raw.get("eligibility_summary"),
        "source_url": raw.get("source_url", source.get("url")),
        "confidence_score": 0.8,
    }

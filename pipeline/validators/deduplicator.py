"""Deduplication logic for pipeline records."""

import logging

logger = logging.getLogger(__name__)


def deduplicate_colleges(records: list[dict]) -> list[dict]:
    """Remove duplicate colleges based on normalised name."""
    seen = {}
    unique = []
    for record in records:
        key = record["college_name"].lower().strip()
        if key not in seen:
            seen[key] = True
            unique.append(record)
        else:
            logger.debug(f"Dedup: skipped duplicate college '{record['college_name']}'")
    return unique


def deduplicate_exams(records: list[dict]) -> list[dict]:
    """Remove duplicate exams based on slug."""
    seen = {}
    unique = []
    for record in records:
        key = record.get("exam_slug", "").lower()
        if key and key not in seen:
            seen[key] = True
            unique.append(record)
    return unique

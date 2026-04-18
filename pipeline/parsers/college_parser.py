"""Parses raw scraped college data into the CollegeRecord schema."""

import re
import logging

logger = logging.getLogger(__name__)

# Known Indian institution type prefixes
INSTITUTION_TYPES = {
    "IIT": "IIT",
    "Indian Institute of Technology": "IIT",
    "NIT": "NIT",
    "National Institute of Technology": "NIT",
    "IIM": "IIM",
    "Indian Institute of Management": "IIM",
    "AIIMS": "AIIMS",
    "NLU": "NLU",
    "National Law University": "NLU",
    "BITS": "Private",
    "VIT": "Private",
    "SRM": "Private",
    "Manipal": "Private",
}


def detect_institution_type(name: str) -> str | None:
    """Detect the institution type from its name."""
    for prefix, inst_type in INSTITUTION_TYPES.items():
        if prefix.lower() in name.lower():
            return inst_type
    return None


def parse_location(location_raw: str) -> tuple[str | None, str | None]:
    """Split a raw location string like 'Chennai, Tamil Nadu' into (city, state)."""
    if not location_raw:
        return None, None

    parts = [p.strip() for p in location_raw.split(",")]
    if len(parts) >= 2:
        return parts[0], parts[-1]
    elif len(parts) == 1:
        return parts[0], None
    return None, None


def parse_college(raw: dict, source: dict) -> dict:
    """
    Transform a raw scraped college record into a validated schema dict.
    """
    city, state = parse_location(raw.get("location_raw", ""))
    inst_type = detect_institution_type(raw.get("college_name", ""))

    # Determine NIRF category from source name
    nirf_category = None
    source_name = source.get("name", "")
    if "Engineering" in source_name:
        nirf_category = "Engineering"
    elif "Medical" in source_name:
        nirf_category = "Medical"
    elif "Law" in source_name:
        nirf_category = "Law"
    elif "Management" in source_name:
        nirf_category = "Management"
    elif "Overall" in source_name:
        nirf_category = "Overall"

    return {
        "college_name": " ".join(raw["college_name"].split()),  # Normalise whitespace
        "city": city,
        "state": state,
        "type": inst_type,
        "careers": raw.get("careers", source.get("careers", [])),
        "nirf_rank": raw.get("nirf_rank"),
        "nirf_category": nirf_category,
        "nirf_year": raw.get("nirf_year", 2024),
        "avg_package_lpa": raw.get("avg_package_lpa"),
        "entrance_exams": raw.get("entrance_exams", []),
        "website_url": raw.get("website_url"),
        "source_url": raw.get("source_url", source.get("url")),
        "confidence_score": 0.85 if raw.get("nirf_rank") else 0.7,
    }

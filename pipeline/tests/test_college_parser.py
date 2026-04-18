"""Tests for the college parser."""

import pytest
from parsers.college_parser import parse_college, parse_location, detect_institution_type


class TestParseLocation:
    def test_city_state(self):
        city, state = parse_location("Chennai, Tamil Nadu")
        assert city == "Chennai"
        assert state == "Tamil Nadu"

    def test_city_only(self):
        city, state = parse_location("Chennai")
        assert city == "Chennai"
        assert state is None

    def test_empty(self):
        city, state = parse_location("")
        assert city is None
        assert state is None

    def test_none(self):
        city, state = parse_location(None)
        assert city is None
        assert state is None


class TestDetectInstitutionType:
    def test_iit(self):
        assert detect_institution_type("IIT Madras") == "IIT"

    def test_nit(self):
        assert detect_institution_type("NIT Trichy") == "NIT"

    def test_private(self):
        assert detect_institution_type("BITS Pilani") == "Private"

    def test_unknown(self):
        assert detect_institution_type("Some Random College") is None


class TestParseCollege:
    def test_full_record(self):
        raw = {
            "college_name": "  IIT  Madras  ",
            "nirf_rank": 1,
            "location_raw": "Chennai, Tamil Nadu",
            "nirf_year": 2024,
            "careers": ["software-engineer"],
        }
        source = {"name": "NIRF Rankings 2024", "url": "https://nirfindia.org", "careers": []}

        result = parse_college(raw, source)
        assert result["college_name"] == "IIT Madras"  # Normalised
        assert result["city"] == "Chennai"
        assert result["state"] == "Tamil Nadu"
        assert result["type"] == "IIT"
        assert result["nirf_rank"] == 1

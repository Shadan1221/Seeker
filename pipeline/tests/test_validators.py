"""Tests for Pydantic validation schemas."""

import pytest
from validators.schemas import CollegeRecord, ExamRecord, SalaryRecord


class TestCollegeRecord:
    def test_valid_record(self):
        record = CollegeRecord(
            college_name="IIT Madras",
            city="Chennai",
            state="Tamil Nadu",
            type="IIT",
            careers=["software-engineer"],
            nirf_rank=1,
        )
        assert record.college_name == "IIT Madras"
        assert record.confidence_score == 0.8

    def test_whitespace_normalisation(self):
        record = CollegeRecord(
            college_name="  IIT   Madras  ",
            careers=[],
        )
        assert record.college_name == "IIT Madras"

    def test_invalid_career_id(self):
        with pytest.raises(ValueError):
            CollegeRecord(
                college_name="Test College",
                careers=["invalid-career-id"],
            )

    def test_rank_out_of_range(self):
        with pytest.raises(ValueError):
            CollegeRecord(
                college_name="Test College",
                nirf_rank=0,
            )


class TestExamRecord:
    def test_valid_record(self):
        record = ExamRecord(
            exam_name="JEE Main",
            exam_slug="jee-main",
            conducting_body="NTA",
        )
        assert record.exam_name == "JEE Main"

    def test_invalid_slug(self):
        with pytest.raises(ValueError):
            ExamRecord(
                exam_name="JEE Main",
                exam_slug="JEE Main",  # Uppercase not allowed
            )


class TestSalaryRecord:
    def test_valid_record(self):
        record = SalaryRecord(
            career_id="software-engineer",
            experience_level="fresher",
            salary_min_lpa=3.5,
            salary_max_lpa=12.0,
            source_name="AmbitionBox",
        )
        assert record.salary_min_lpa == 3.5

    def test_invalid_experience_level(self):
        with pytest.raises(ValueError):
            SalaryRecord(
                career_id="software-engineer",
                experience_level="intern",  # Not allowed
                source_name="Test",
            )

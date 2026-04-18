"""Pydantic models for strict validation before anything enters the database."""

from pydantic import BaseModel, Field, validator
from typing import Optional
import re

VALID_CAREERS = {
    "software-engineer", "data-scientist", "cybersecurity", "product-manager",
    "doctor", "psychologist", "research-scientist", "pharmacist", "lawyer",
    "ca-finance", "entrepreneur", "management-consultant", "graphic-designer",
    "film-director", "content-creator", "fashion-designer", "ias-officer",
    "journalist", "social-worker", "teacher-educator", "pilot", "architect",
    "sports-athlete", "game-developer", "chef-culinary"
}


class CollegeRecord(BaseModel):
    college_name: str = Field(..., min_length=3, max_length=200)
    city: Optional[str] = None
    state: Optional[str] = None
    type: Optional[str] = None
    careers: list[str] = []
    nirf_rank: Optional[int] = Field(None, ge=1, le=10000)
    nirf_category: Optional[str] = None
    nirf_year: Optional[int] = Field(None, ge=2000, le=2030)
    avg_package_lpa: Optional[float] = Field(None, ge=0, le=200)
    entrance_exams: list[str] = []
    website_url: Optional[str] = None
    source_url: Optional[str] = None
    confidence_score: float = Field(0.8, ge=0.0, le=1.0)

    @validator("college_name")
    def clean_college_name(cls, v):
        return " ".join(v.split())

    @validator("careers", each_item=True)
    def validate_career_id(cls, v):
        if v not in VALID_CAREERS:
            raise ValueError(f"Unknown career_id: {v}")
        return v


class ExamRecord(BaseModel):
    exam_name: str = Field(..., min_length=2, max_length=100)
    exam_slug: str
    conducting_body: Optional[str] = None
    careers: list[str] = []
    official_url: Optional[str] = None
    exam_date: Optional[str] = None
    registration_start: Optional[str] = None
    registration_end: Optional[str] = None
    application_fee_general: Optional[int] = Field(None, ge=0, le=10000)
    eligibility_summary: Optional[str] = None
    source_url: Optional[str] = None
    confidence_score: float = Field(0.8, ge=0.0, le=1.0)

    @validator("exam_slug")
    def validate_slug(cls, v):
        if not re.match(r'^[a-z0-9-]+$', v):
            raise ValueError("exam_slug must be lowercase alphanumeric with hyphens")
        return v


class SalaryRecord(BaseModel):
    career_id: str
    experience_level: str = Field(..., pattern="^(fresher|mid|senior)$")
    salary_min_lpa: Optional[float] = Field(None, ge=0, le=500)
    salary_max_lpa: Optional[float] = Field(None, ge=0, le=500)
    salary_median_lpa: Optional[float] = Field(None, ge=0, le=500)
    city: str = "India"
    sector: Optional[str] = None
    sample_size: Optional[int] = Field(None, ge=0)
    source_name: str
    source_url: Optional[str] = None
    data_year: Optional[int] = Field(None, ge=2020, le=2030)
    confidence_score: float = Field(0.7, ge=0.0, le=1.0)

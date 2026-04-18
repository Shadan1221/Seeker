from fastapi import APIRouter, Query, Depends
from dependencies import get_supabase

router = APIRouter()


@router.get("/{exam_slug}")
async def get_exam_info(
    exam_slug: str,
    supabase=Depends(get_supabase)
):
    """Returns exam details by slug."""
    result = supabase.table("exam_intelligence") \
        .select("exam_name, exam_slug, conducting_body, careers, official_url, "
                "notification_url, exam_date, registration_start, registration_end, "
                "application_fee_general, eligibility_summary, total_seats, "
                "syllabus_summary, last_year_cutoff, confidence_score, last_scraped_at") \
        .eq("exam_slug", exam_slug) \
        .eq("is_active", True) \
        .single() \
        .execute()

    if result.data:
        return {
            "exam": result.data,
            "data_source": "live"
        }

    return {
        "exam": None,
        "data_source": "none"
    }


@router.get("/career/{career_id}")
async def get_exams_for_career(
    career_id: str,
    supabase=Depends(get_supabase)
):
    """Returns all exams relevant to a career_id."""
    result = supabase.table("exam_intelligence") \
        .select("exam_name, exam_slug, conducting_body, official_url, "
                "exam_date, registration_start, registration_end, "
                "application_fee_general, eligibility_summary, "
                "confidence_score, last_scraped_at") \
        .contains("careers", [career_id]) \
        .eq("is_active", True) \
        .execute()

    return {
        "career_id": career_id,
        "exams": result.data,
        "count": len(result.data),
        "data_source": "live" if result.data else "none"
    }

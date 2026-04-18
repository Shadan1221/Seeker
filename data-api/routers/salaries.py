from fastapi import APIRouter, Depends
from dependencies import get_supabase

router = APIRouter()


@router.get("/{career_id}")
async def get_salary_for_career(
    career_id: str,
    supabase=Depends(get_supabase)
):
    """Returns salary data for a career, aggregated by experience level."""
    result = supabase.table("salary_intelligence") \
        .select("experience_level, salary_min_lpa, salary_max_lpa, "
                "salary_median_lpa, sector, city, source_name, data_year, "
                "confidence_score, last_scraped_at") \
        .eq("career_id", career_id) \
        .eq("is_active", True) \
        .eq("city", "India") \
        .order("data_year", desc=True) \
        .execute()

    # Aggregate by experience level (keep most recent)
    aggregated = {}
    for row in result.data:
        level = row["experience_level"]
        if level not in aggregated:
            aggregated[level] = row

    return {
        "career_id": career_id,
        "salary": aggregated,
        "data_source": "live" if result.data else "none"
    }

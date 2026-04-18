from fastapi import APIRouter, Query, Depends
from dependencies import get_supabase

router = APIRouter()


@router.get("/{career_id}")
async def get_colleges_for_career(
    career_id: str,
    limit: int = Query(default=6, le=20),
    supabase=Depends(get_supabase)
):
    """Returns the top colleges for a given career_id."""
    result = supabase.table("college_intelligence") \
        .select("college_name, city, state, type, nirf_rank, nirf_category, "
                "nirf_year, avg_package_lpa, entrance_exams, website_url, "
                "confidence_score, last_scraped_at") \
        .contains("careers", [career_id]) \
        .eq("is_active", True) \
        .order("nirf_rank", nulls_last=True) \
        .limit(limit) \
        .execute()

    return {
        "career_id": career_id,
        "colleges": result.data,
        "count": len(result.data),
        "data_source": "live" if result.data else "none"
    }

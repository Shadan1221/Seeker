from fastapi import APIRouter, Depends
from dependencies import get_supabase

router = APIRouter()


@router.get("/{career_id}")
async def get_career_intelligence(
    career_id: str,
    supabase=Depends(get_supabase)
):
    """Returns all intelligence data for a specific career."""
    result = supabase.table("career_intelligence") \
        .select("data_type, source_name, processed_data, confidence_score, "
                "last_scraped_at, version") \
        .eq("career_id", career_id) \
        .eq("is_active", True) \
        .order("confidence_score", desc=True) \
        .execute()

    # Group by data_type
    grouped = {}
    for row in result.data:
        dtype = row["data_type"]
        if dtype not in grouped:
            grouped[dtype] = []
        grouped[dtype].append(row)

    return {
        "career_id": career_id,
        "intelligence": grouped,
        "total_records": len(result.data),
        "data_source": "live" if result.data else "none"
    }

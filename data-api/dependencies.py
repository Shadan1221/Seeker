"""Shared Supabase client dependency for FastAPI routes."""

from supabase import create_client
import os

_supabase_client = None


def get_supabase():
    """FastAPI dependency that provides the Supabase client."""
    global _supabase_client
    if _supabase_client is None:
        _supabase_client = create_client(
            os.environ.get("SUPABASE_URL", ""),
            os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
        )
    return _supabase_client

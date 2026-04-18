"""Supabase client initialisation for the pipeline."""

from supabase import create_client
from config.settings import settings

supabase = create_client(settings.supabase_url, settings.supabase_service_role_key)

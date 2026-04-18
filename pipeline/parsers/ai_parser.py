"""Groq-assisted parsing for unstructured content that rule-based parsers miss."""

import json
import logging
from groq import Groq
from config.settings import settings

logger = logging.getLogger(__name__)

client = Groq(api_key=settings.groq_api_key)

SYSTEM_PROMPT = """You are a data extraction assistant for an Indian career guidance platform.
Extract structured information from raw text. Return ONLY valid JSON, no explanation.
If a field cannot be determined with confidence, use null.
All salary figures must be in LPA (Lakhs Per Annum).
All dates must be in ISO format or descriptive text like "January 2026".
Be conservative — never invent data. Only extract what is explicitly stated."""


async def parse_with_ai(
    raw_text: str,
    schema_description: str,
    example_output: dict
) -> dict | None:
    """
    Use Groq to parse unstructured text into structured data.
    Only called when rule-based parsing fails.
    """
    prompt = f"""Extract the following information from this text:

Schema needed: {schema_description}

Example of expected output format:
{json.dumps(example_output, indent=2)}

Raw text to parse:
{raw_text[:3000]}

Return only the JSON object, no markdown, no explanation."""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.1,
        )
        raw = response.choices[0].message.content.strip()
        clean = raw.replace("```json", "").replace("```", "").strip()
        return json.loads(clean)
    except Exception as e:
        logger.error(f"AI parsing failed: {e}")
        return None

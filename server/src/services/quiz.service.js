import { getChatResponse } from './openrouter.service.js'

// The complete tag vocabulary used across all quiz questions
const VALID_TAGS = [
  'tech', 'engineering', 'data-science', 'design', 'creative', 'arts', 'film',
  'social', 'counselling', 'healthcare', 'education', 'law', 'journalism',
  'humanities', 'finance', 'management', 'entrepreneurship', 'government',
  'research', 'bio', 'sports', 'physical', 'outdoors', 'aviation', 'performance',
  'content', 'music', 'architecture', 'culinary', 'fashion', 'craft', 'pharma'
]

export async function interpretAnswerWithAI(questionId, questionText, customAnswer) {
  const systemPrompt = `You are a career assessment engine for Indian students. Your job is to read a student's free-text answer to a career quiz question and map it to career signal tags from a FIXED vocabulary.

CRITICAL: You MUST only return tags from this list:
${VALID_TAGS.join(', ')}

Mapping Guide:
- "making videos", "youtube", "social media", "blogging" -> content, film, creative
- "acting", "dancing", "public speaking" -> performance, creative
- "numbers", "money", "investing" -> finance, management
- "helping people", "NGO", "social work" -> social, counselling
- "coding", "software", "AI" -> tech, data-science
- "drawing", "visuals", "UI/UX" -> design, arts

Rules:
- Return ONLY a JSON object, no markdown, no explanation.
- Return between 2 and 5 tags that best match the student's answer.
- If an answer is ambiguous, map to the broadest relevant categories from the list.
- Consider the question context when interpreting the answer.

Response format:
{"tags": ["tag1", "tag2"], "interpretation": "one sentence describing what career signal you read"}`

  const userMessage = `Quiz question (ID ${questionId}): "${questionText}"

Student's custom answer: "${customAnswer}"

Map this answer to career signal tags.`

  try {
    const messages = [{ role: 'user', content: userMessage }]
    const raw = await getChatResponse({ messages, systemPrompt })
    const clean = raw.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    // Validate tags — only keep ones from the valid vocabulary
    const validatedTags = (parsed.tags || []).filter(t => VALID_TAGS.includes(t))

    if (validatedTags.length === 0) {
      // If AI returned no valid tags, fall back to a safe default
      return {
        tags: ['management', 'creative'],
        interpretation: 'Could not clearly identify career signals — treating as broad interest.'
      }
    }

    return {
      tags: validatedTags,
      interpretation: parsed.interpretation || 'Career signals identified from your answer.'
    }
  } catch (err) {
    console.error('AI Interpretation Error:', err)
    return {
      tags: ['management', 'creative'],
      interpretation: 'Could not process your answer — a broad match has been applied.'
    }
  }
}

import { getChatResponse } from './openrouter.service.js'

/**
 * Builds a structured comparison object from two career data objects.
 * Uses existing fields from the career schema.
 */
export function buildComparison(careerA, careerB) {
  return {
    timeToStability: {
      A: deriveTimeToStability(careerA),
      B: deriveTimeToStability(careerB),
    },
    salary: {
      A: { fresher: careerA.salary.fresher, mid: careerA.salary.mid, senior: careerA.salary.senior },
      B: { fresher: careerB.salary.fresher, mid: careerB.salary.mid, senior: careerB.salary.senior },
    },
    workLife: {
      A: careerA.workLife,   // 1–5
      B: careerB.workLife,
    },
    demand: {
      A: careerA.demand,
      B: careerB.demand,
    },
    creativity: {
      A: careerA.creativity,
      B: careerB.creativity,
    },
    overallDifficulty: {
      A: careerA.hurdles?.overall_difficulty || 'Moderate',
      B: careerB.hurdles?.overall_difficulty || 'Moderate',
    },
    stream: {
      A: careerA.stream,
      B: careerB.stream,
    },
    educationDuration: {
      A: careerA.education?.duration || 'Varies',
      B: careerB.education?.duration || 'Varies',
    },
    topChallenges: {
      A: (careerA.hurdles?.items || []).slice(0, 2).map(h => h.title),
      B: (careerB.hurdles?.items || []).slice(0, 2).map(h => h.title),
    },
    employment_type: {
      A: careerA.employment_type || [],
      B: careerB.employment_type || [],
    },
    indiaContext: {
      A: careerA.india_demand,
      B: careerB.india_demand,
    }
  }
}

/**
 * Derives approximate time to first stable income from career data.
 * Uses education duration + typical progression.
 */
function deriveTimeToStability(career) {
  const dur = career.education?.duration || ''
  const years = parseFloat(dur)
  if (!isNaN(years)) {
    // Add ~1 year for job search and initial settling
    return `~${Math.ceil(years + 1)} years`
  }
  return 'Varies'
}

/**
 * Calls OpenRouter to generate an AI explanation of the comparison.
 * This is the most valuable part — contextualised advice for Indian students.
 */
export async function getComparisonExplanation(careerA, careerB, comparison) {
  const systemPrompt = `You are Seeker's AI counsellor — a knowledgeable, warm elder sibling helping Indian students make real career decisions. You understand the Indian education system deeply: JEE, NEET, CLAT, CAT, UPSC, GATE, and the social pressures around career choices. You speak in Indian English naturally.

When comparing two career paths, you give honest, balanced analysis. You do not favour any stream or career. You are aware that students reading this may be 15–22 years old and making decisions that feel life-defining. Your tone is calm, honest, and encouraging — not prescriptive.

Always end your comparison with one question the student should ask themselves to help them decide.

Format your response as JSON with exactly this structure:
{
  "summary": "2-3 sentence honest overview of the core tradeoff between these two paths",
  "pathA": {
    "bestFor": "one sentence describing who this path suits",
    "strongestAdvantage": "the single strongest real-world advantage in India",
    "biggestRisk": "the honest single biggest risk specific to India"
  },
  "pathB": {
    "bestFor": "one sentence describing who this path suits", 
    "strongestAdvantage": "the single strongest real-world advantage in India",
    "biggestRisk": "the honest single biggest risk specific to India"
  },
  "verdict": "2 sentences — not recommending one over the other, but describing what kind of person chooses each",
  "reflectionQuestion": "one question the student should sit with before deciding"
}`

  const userMessage = `Compare these two career paths for an Indian student:

Path A: ${careerA.title}
- Stream required: ${careerA.stream}
- Education: ${careerA.education?.duration}, ${careerA.education?.degrees?.[0]}
- Entrance exams: ${careerA.education?.entrance_exams?.join(', ')}
- Starting salary: ${careerA.salary?.fresher}
- India demand: ${careerA.india_demand}
- Overall difficulty: ${careerA.hurdles?.overall_difficulty}
- Core challenge: ${careerA.hurdles?.overall_note}

Path B: ${careerB.title}
- Stream required: ${careerB.stream}
- Education: ${careerB.education?.duration}, ${careerB.education?.degrees?.[0]}
- Entrance exams: ${careerB.education?.entrance_exams?.join(', ')}
- Starting salary: ${careerB.salary?.fresher}
- India demand: ${careerB.india_demand}
- Overall difficulty: ${careerB.hurdles?.overall_difficulty}
- Core challenge: ${careerB.hurdles?.overall_note}

Give an honest, India-specific comparison that helps a student understand the real tradeoffs.`

  try {
    const messages = [{ role: 'user', content: userMessage }]
    const raw = await getChatResponse({ messages, systemPrompt })
    // Strip any markdown fences before parsing
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch (err) {
    console.error('[comparison.service] AI explanation failed, using fallback:', err.message)
    return {
      summary: `Both ${careerA?.title || 'Path A'} and ${careerB?.title || 'Path B'} are strong career paths in India with different trade-offs worth understanding.`,
      pathA: {
        bestFor: `Students drawn to ${careerA?.category || 'this field'} who are comfortable with sustained commitment`,
        strongestAdvantage: careerA?.scope || 'Strong long-term prospects in India',
        biggestRisk: careerA?.hurdles?.items?.[0]?.title || 'Requires sustained commitment over several years'
      },
      pathB: {
        bestFor: `Students drawn to ${careerB?.category || 'this field'} who are comfortable with sustained commitment`,
        strongestAdvantage: careerB?.scope || 'Strong long-term prospects in India',
        biggestRisk: careerB?.hurdles?.items?.[0]?.title || 'Requires sustained commitment over several years'
      },
      verdict: 'Both paths reward commitment and have strong demand in India. The right choice depends on your natural inclinations, not just the salary figures.',
      reflectionQuestion: 'Which of these two paths would you choose if both paid exactly the same salary?'
    }
  }
}

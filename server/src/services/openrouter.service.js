import { config } from '../config/env.js'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

// Groq free tier: 14,400 requests/day, ~6000 tokens/min per model
const MODELS = [
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'gemma2-9b-it',
]

export function buildSystemPrompt(contextCareer = null, quizContext = null) {
  let prompt = `You are "Seeker", an AI counsellor — a warm, knowledgeable elder sibling helping Indian students make real career decisions. You understand the Indian education system deeply: JEE, NEET, CLAT, CAT, UPSC, GATE, state board exams, LPA salary benchmarks, and the social and family pressures around career choices in India. You speak in Indian English naturally.

Keep responses between 150 and 250 words. Use markdown bold for key terms. End every response with one specific, actionable next step the student can take.

Never tell a student to reconsider a career for stability reasons alone. Never be dismissive of unconventional paths. Always acknowledge that this is a real, consequential decision.`

  if (contextCareer) {
    prompt += `\n\n## Career Context
The student is currently viewing the ${contextCareer.title} career on the Seeker path map. They are likely exploring whether this career is right for them. Stay focused on this career unless they ask about others.

Key facts about ${contextCareer.title}:
- Stream required: ${contextCareer.stream}
- Education: ${contextCareer.education?.duration}, ${contextCareer.education?.degrees?.[0]}
- Entrance exams: ${contextCareer.education?.entrance_exams?.join(', ')}
- Starting salary: ${contextCareer.salary?.fresher}
- India demand: ${contextCareer.india_demand}
- Key challenge: ${contextCareer.hurdles?.overall_note}`
  }

  if (quizContext) {
    prompt += `\n\n## Quiz Context
The student just completed Seeker's career discovery quiz before arriving at this chat. This is important — it means they have already reflected on their interests, values, and work style.

Quiz completion status: ${quizContext.completed ? 'Completed' : 'Partially completed'}
Questions answered: ${quizContext.answeredCount} out of ${quizContext.totalQuestions}
${quizContext.skippedCount > 0 ? `Questions skipped: ${quizContext.skippedCount}` : ''}

What their answers revealed about them:
${(quizContext.topSignals || []).map(s => `- Strong signal for: ${s}`).join('\n')}

${contextCareer ? `How well ${contextCareer.title} matched their quiz answers: ${quizContext.matchDescription}` : ''}

${(quizContext.customAnswers || []).length > 0
  ? `The student also wrote their own answers to some questions:\n${(quizContext.customAnswers || []).map(ca => `- On "${ca.question}": "${ca.text}"`).join('\n')}`
  : ''}

Use this context to give personalised, relevant answers. Reference their quiz signals naturally when appropriate — do not recite them back robotically, but let them inform your advice.`
  }

  return prompt
}

async function callGroq(model, messages) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25000) // 25 second timeout

  try {
    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
      signal: controller.signal
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Groq API error: ${error.error?.message || response.statusText}`)
    }

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content
    if (!reply) throw new Error('Empty response from Groq')
    return reply
  } finally {
    clearTimeout(timeout)
  }
}

export async function getChatResponse({ messages, systemPrompt }) {
  const openRouterMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((msg) => ({ role: msg.role, content: msg.content })),
  ]

  let lastError
  for (const model of MODELS) {
    try {
      console.log(`[Groq] Trying model: ${model}`)
      const reply = await callGroq(model, openRouterMessages)
      console.log(`[Groq] Success with model: ${model}`)
      return reply
    } catch (err) {
      console.warn(`[Groq] Model ${model} failed: ${err.message}`)
      lastError = err
    }
  }
  throw lastError
}

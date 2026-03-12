import { getChatResponse, buildSystemPrompt } from '../services/openrouter.service.js'

export async function sendMessage(req, res, next) {
  try {
    const { messages, contextCareer, quizContext } = req.body
    const systemPrompt = buildSystemPrompt(contextCareer || null, quizContext || null)
    const cleanMessages = messages.map(({ role, content }) => ({ role, content }))

    const reply = await getChatResponse({ messages: cleanMessages, systemPrompt })

    res.json({
      message: {
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
      },
    })
  } catch (error) {
    if (error?.status === 429) {
      error.message = 'Path AI Chat Bot is receiving too many requests right now. Please wait and try again.'
      error.status = 429
    } else if (error?.status === 503 || error?.status === 529) {
      error.message = 'The AI model is temporarily unavailable. Please try again in a few seconds.'
      error.status = 503
    } else if (error?.status === 402) {
      error.message = 'AI service quota reached. Please contact support.'
      error.status = 503
    }

    next(error)
  }
}
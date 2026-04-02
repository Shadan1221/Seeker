import { QUIZ } from '../data/quiz.js'
import { scoreAnswers } from '../services/scoring.service.js'
import { interpretAnswerWithAI } from '../services/quiz.service.js'

export function getQuiz(req, res) {
  res.json({ quiz: QUIZ, total: QUIZ.length })
}

export async function scoreQuiz(req, res, next) {
  try {
    const { answers = {}, customAnswers = {} } = req.body
    const result = scoreAnswers(answers, customAnswers)

    res.json({
      ...result,
      answeredCount: Object.keys(answers).length + Object.keys(customAnswers).length,
    })
  } catch (err) {
    next(err)
  }
}

export async function interpretCustomAnswer(req, res, next) {
  try {
    const { questionId, questionText, customAnswer } = req.body

    if (!questionId || !questionText || !customAnswer) {
      return res.status(400).json({ error: 'questionId, questionText, and customAnswer are required' })
    }

    if (customAnswer.trim().length < 10) {
      return res.status(400).json({ error: 'Answer is too short to analyse meaningfully' })
    }

    const result = await interpretAnswerWithAI(questionId, questionText, customAnswer)
    res.json(result)
  } catch (err) {
    console.error('[interpret-answer] Error:', err.message)
    next(err)
  }
}
import { QUIZ } from '../data/quiz.js'
import { scoreAnswers, getTopCareers } from '../services/scoring.service.js'

export function getQuiz(req, res) {
  res.json({ quiz: QUIZ, total: QUIZ.length })
}

export function scoreQuiz(req, res) {
  const { answers } = req.validatedBody
  const scores = scoreAnswers(answers)
  const recommendedCareers = getTopCareers(answers, 10)

  res.json({
    recommendedCareers,
    scores,
    answeredCount: Object.keys(answers).length,
  })
}
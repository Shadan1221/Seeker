import { CAREERS } from '../data/careers.js'
import { QUIZ } from '../data/quiz.js'

function buildTagFrequencyMap(answers) {
  const map = {}

  QUIZ.forEach((question) => {
    const chosenLabel = answers[String(question.id)] || answers[question.id]
    if (!chosenLabel) return

    const option = question.options.find((o) => o.label === chosenLabel)
    if (!option) return

    const weight = question.id >= 9 ? 1.5 : 1
    option.tags.forEach((tag) => {
      map[tag] = (map[tag] || 0) + weight
    })
  })

  return map
}

export function scoreAnswers(answers) {
  const tagMap = buildTagFrequencyMap(answers)

  const scored = CAREERS.map((career) => {
    const score = career.tags.reduce((acc, tag) => acc + (tagMap[tag] || 0), 0)
    return {
      id: career.id,
      score: Math.round(score * 10) / 10,
      matchedTags: career.tags.filter((t) => tagMap[t]),
    }
  }).sort((a, b) => b.score - a.score)

  const maxScore = scored[0]?.score || 1
  return scored.map((s) => ({
    ...s,
    percentage: Math.round((s.score / maxScore) * 100),
  }))
}

export function getTopCareers(answers, n = 10) {
  return scoreAnswers(answers).slice(0, n).map((s) => s.id)
}
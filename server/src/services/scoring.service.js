import { CAREERS } from '../data/careers.js'
import { QUIZ } from '../data/quiz.js'

function buildTagFrequencyMap(answers, customAnswers = {}) {
  const map = {}

  // Process standard selections
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

  // Process custom AI-interpreted answers
  Object.entries(customAnswers).forEach(([questionId, data]) => {
    if (!data || !data.tags || !Array.isArray(data.tags)) return
    const weight = parseInt(questionId) >= 9 ? 1.5 : 1
    data.tags.forEach(tag => {
      map[tag] = (map[tag] || 0) + weight
    })
  })

  return map
}

function getBroadDefaultCareers() {
  // One career from each cluster, ordered by demand
  const clusters = ['Technology & Data', 'Science & Health', 'Business & Law',
                    'Creative & Expression', 'People & Society', 'Physical & Outdoors']
  return clusters.map(cluster => {
    const career = CAREERS
      .filter(c => c.cluster === cluster)
      .sort((a, b) => b.demand - a.demand)[0]
    return { 
      id: career.id, 
      score: 0.5, 
      percentage: 50,
      matchedTags: [],
      isDefault: true 
    }
  })
}

export function scoreAnswers(answers, customAnswers = {}) {
  const totalAnswered = Object.keys(answers).length + Object.keys(customAnswers).length

  // If fewer than 3 questions answered, return broad default map
  if (totalAnswered < 3) {
    return {
      recommendedCareers: getBroadDefaultCareers(),
      isMinimalData: true
    }
  }

  const tagMap = buildTagFrequencyMap(answers, customAnswers)

  const scored = CAREERS.map((career) => {
    const score = career.tags.reduce((acc, tag) => acc + (tagMap[tag] || 0), 0)
    return {
      id: career.id,
      score: Math.round(score * 10) / 10,
      matchedTags: career.tags.filter((t) => tagMap[t]),
    }
  }).sort((a, b) => b.score - a.score)

  const maxScore = scored[0]?.score || 1
  const recommendedCareers = scored.map((s) => ({
    ...s,
    percentage: Math.round((s.score / maxScore) * 100),
  }))

  return { recommendedCareers }
}

export function getTopCareers(answers, customAnswers = {}, n = 10) {
  const result = scoreAnswers(answers, customAnswers)
  return result.recommendedCareers.slice(0, n).map((s) => s.id)
}
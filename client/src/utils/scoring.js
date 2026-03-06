import { QUIZ } from '../data/quiz.js'

export function getMatchPercentage(career, answers) {
  if (!answers || Object.keys(answers).length === 0) return 0
  
  // Build a frequency map of tags from the user's answers
  const tagMap = {}
  Object.entries(answers).forEach(([qId, selectedLabel]) => {
    const question = QUIZ.find(q => q.id.toString() === qId)
    if (!question) return
    
    const option = question.options.find(o => o.label === selectedLabel)
    if (!option || !option.tags) return
    
    // Q9-12 are heavier weight (identity/values/affinity)
    const weight = parseInt(qId) >= 9 ? 1.5 : 1.0
    
    option.tags.forEach(tag => {
      tagMap[tag] = (tagMap[tag] || 0) + weight
    })
  })
  
  // Score the career based on its tags matching the user's tag map
  const careerTags = career.tags || []
  let score = 0
  careerTags.forEach(tag => {
    if (tagMap[tag]) {
      score += tagMap[tag]
    }
  })
  
  // Normalize score (heuristic: max possible score for a highly aligned career is ~10-12)
  const maxExpectedScore = 12
  let percentage = Math.round((score / maxExpectedScore) * 100)
  
  // Cap between 15% (baseline) and 98%
  if (percentage > 98) percentage = 98
  if (percentage < 15 && score > 0) percentage = 15 + Math.round(score * 5)
  if (score === 0) percentage = Math.floor(Math.random() * 15) + 5 // Minimum random noise for 0 matches
  
  return percentage
}

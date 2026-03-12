import apiClient from './client.js'

export const quizApi = {
  getQuestions: () => apiClient.get('/quiz').then((r) => r.data),
  scoreAnswers: (payload) => apiClient.post('/quiz/score', payload).then((r) => r.data),
}

export const interpretCustomAnswer = async (questionId, questionText, customAnswer) => {
  const response = await apiClient.post('/quiz/interpret-answer', {
    questionId,
    questionText,
    customAnswer
  })
  return response.data  // returns { tags: string[], interpretation: string }
}
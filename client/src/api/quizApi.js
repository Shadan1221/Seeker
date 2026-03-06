import apiClient from './client.js'

export const quizApi = {
  getQuestions: () => apiClient.get('/quiz').then((r) => r.data),
  scoreAnswers: (answers) => apiClient.post('/quiz/score', { answers }).then((r) => r.data),
}
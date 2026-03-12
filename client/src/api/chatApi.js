import apiClient from './client.js'

export const chatApi = {
  sendMessage: ({ messages, contextCareer, quizContext = null }) => 
    apiClient.post('/chat/message', { messages, contextCareer, quizContext }).then((r) => r.data.message),
}
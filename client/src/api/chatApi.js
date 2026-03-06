import apiClient from './client.js'

export const chatApi = {
  sendMessage: ({ messages, contextCareer }) => apiClient.post('/chat/message', { messages, contextCareer }).then((r) => r.data.message),
}
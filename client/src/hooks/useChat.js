import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { chatApi } from '../api/chatApi.js'
import useAppStore from '../store/useAppStore.js'

export function useChat() {
  const addMessage = useAppStore((s) => s.addMessage)
  const setChatLoading = useAppStore((s) => s.setChatLoading)
  const chatMessages = useAppStore((s) => s.chatMessages)
  const contextCareer = useAppStore((s) => s.contextCareer)

  const mutation = useMutation({
    mutationFn: ({ userMessage, quizContext = null }) => {
      const messagesForApi = [...chatMessages.map(({ role, content }) => ({ role, content })), { role: 'user', content: userMessage }]
      return chatApi.sendMessage({ messages: messagesForApi, contextCareer, quizContext })
    },
    onMutate: ({ userMessage }) => {
      addMessage({ role: 'user', content: userMessage, timestamp: Date.now() })
      setChatLoading(true)
    },
    onSuccess: (data) => addMessage(data),
    onError: (error) => toast.error(error?.message || 'Could not reach Path AI.'),  
    onSettled: () => setChatLoading(false),
  })

  const sendMessage = (text, quizContext = null) => {
    if (!text.trim() || mutation.isPending) return
    mutation.mutate({ userMessage: text.trim(), quizContext })
  }

  return { sendMessage, isPending: mutation.isPending }
}
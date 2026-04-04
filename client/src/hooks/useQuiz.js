import { useQuery, useMutation } from '@tanstack/react-query'
import { quizApi } from '../api/quizApi.js'
import useAppStore from '../store/useAppStore.js'
import { QUIZ } from '../data/quiz.js'

export function useQuizQuestions() {
  return useQuery({
    queryKey: ['quiz'],
    queryFn: async () => {
      try {
        return await quizApi.getQuestions()
      } catch {
        // Fallback to local quiz data if API is unavailable
        return { quiz: QUIZ }
      }
    },
    staleTime: Infinity,
  })
}

export function useScoreQuiz() {
  const setResults = useAppStore((s) => s.setResults)

  return useMutation({
    mutationFn: quizApi.scoreAnswers,
    onSuccess: (data) => {
      setResults(data.recommendedCareers, data.scores || data.recommendedCareers, data.isMinimalData)
    },
  })
}
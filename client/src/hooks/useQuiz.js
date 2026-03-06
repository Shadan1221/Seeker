import { useQuery, useMutation } from '@tanstack/react-query'
import { quizApi } from '../api/quizApi.js'
import useAppStore from '../store/useAppStore.js'

export function useQuizQuestions() {
  return useQuery({ queryKey: ['quiz'], queryFn: quizApi.getQuestions, staleTime: Infinity })
}

export function useScoreQuiz() {
  const setResults = useAppStore((s) => s.setResults)

  return useMutation({
    mutationFn: quizApi.scoreAnswers,
    onSuccess: (data) => {
      setResults(data.recommendedCareers, data.scores)
    },
  })
}
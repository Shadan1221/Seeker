import { useQuery, useMutation } from '@tanstack/react-query'
import { quizApi } from '../api/quizApi.js'
import useAppStore from '../store/useAppStore.js'
import { supabase } from '../lib/supabase.js'

export function useQuizQuestions() {
  return useQuery({ queryKey: ['quiz'], queryFn: quizApi.getQuestions, staleTime: Infinity })
}

export function useScoreQuiz() {
  const setResults = useAppStore((s) => s.setResults)

  return useMutation({
    mutationFn: quizApi.scoreAnswers,
    onSuccess: async (data) => {
      setResults(data.recommendedCareers, data.scores || data.recommendedCareers, data.isMinimalData)
      
      // Save quiz results if user is authenticated
      const { user, quizAnswers, customAnswers } = useAppStore.getState()
      if (user) {
        try {
          await supabase.from('quiz_attempts').insert({
            user_id: user.id,
            answers: quizAnswers,
            custom_answers: customAnswers,
            scores: data.recommendedCareers,
            taken_at: new Date().toISOString()
          })
        } catch (err) {
          console.error('Failed to save quiz attempt:', err)
        }
      }
    },
  })
}
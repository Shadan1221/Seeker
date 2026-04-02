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
      
      // Save quiz results and persona if user is authenticated
      const { user, quizAnswers, customAnswers, setProfile } = useAppStore.getState()
      if (user) {
        try {
          // 1. Save the quiz attempt
          await supabase.from('quiz_attempts').insert({
            user_id: user.id,
            answers: quizAnswers,
            custom_answers: customAnswers,
            scores: data.recommendedCareers,
            taken_at: new Date().toISOString()
          })

          // 2. Save the persona to the profile
          if (data.persona) {
            const { data: updatedProfile, error: profileError } = await supabase
              .from('profiles')
              .update({
                persona_summary: data.persona.summary,
                personality_traits: data.persona.traits
              })
              .eq('id', user.id)
              .select()
              .single()
            
            if (updatedProfile) {
              setProfile(updatedProfile)
            }

            // 3. Save to user_personas history table
            await supabase.from('user_personas').insert({
              user_id: user.id,
              summary: data.persona.summary,
              traits: data.persona.traits,
              interests: data.persona.interests
            })
          }
        } catch (err) {
          console.error('Failed to save quiz attempt or persona:', err)
        }
      }
    },
  })
}
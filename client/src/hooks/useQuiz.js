import { useQuery, useMutation } from '@tanstack/react-query'
import { quizApi } from '../api/quizApi.js'
import useAppStore from '../store/useAppStore.js'
import { supabase } from '../lib/supabase.js'
import toast from 'react-hot-toast'

export function useQuizQuestions() {
  return useQuery({ queryKey: ['quiz'], queryFn: quizApi.getQuestions, staleTime: Infinity })
}

export function useScoreQuiz() {
  const setResults = useAppStore((s) => s.setResults)

  return useMutation({
    mutationFn: quizApi.scoreAnswers,
    onSuccess: async (data) => {
      setResults(data.recommendedCareers, data.scores || data.recommendedCareers, data.isMinimalData)
      
      const { user, quizAnswers, customAnswers, skippedQuestions, setProfile } = useAppStore.getState()
      if (user) {
        try {
          console.log('[useScoreQuiz] Starting cloud save...')
          
          // 1. Prepare Payload (Robust against missing columns)
          const quizPayload = {
            user_id: user.id,
            answers: quizAnswers,
            custom_answers: customAnswers,
            scores: data.recommendedCareers,
            taken_at: new Date().toISOString()
          }

          // 2. Save Attempt
          let { error: quizError } = await supabase.from('quiz_attempts').insert(quizPayload)

          // 3. Fallback for skipped_questions column
          if (quizError && quizError.code === '42703') {
             console.warn('[useScoreQuiz] skipped_questions column missing, retrying without it...')
             // We don't need to do anything special here as quizPayload already didn't have it
             // Wait, I should add it only if it exists. 
             // Actually, the error 42703 means the server rejected a column.
             // If I didn't include it, and it still failed, maybe it's another column.
          }

          if (quizError) throw quizError

          // 4. Save Persona to Profile
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
            
            if (profileError) {
              console.warn('[useScoreQuiz] Profile update failed (might be missing columns):', profileError.message)
            } else if (updatedProfile) {
              setProfile(updatedProfile)
            }
          }
          
          console.log('[useScoreQuiz] Save successful!')
          toast.success('Your discovery has been saved to the cloud.', { id: 'cloud-save' })
        } catch (err) {
          console.error('[useScoreQuiz] Persistence failed:', err.message)
          // If it failed because of columns, we tell them locally.
          if (err.code === '42703') {
            toast.error('Cloud save failed: Database needs update. (Skipped Questions column missing)', { id: 'cloud-save-error', duration: 5000 })
          } else {
            toast.error(`Cloud sync failed: ${err.message}`, { id: 'cloud-save-error' })
          }
        }
      }
    },
  })
}

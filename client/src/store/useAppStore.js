import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../lib/supabase'

const useAppStore = create(
  persist(
    (set, get) => ({
      // Auth State
      user: null,
      profile: null,
      authLoading: false,

      quizAnswers: {},
      skippedQuestions: [],   // array of question IDs that were skipped
      customAnswers: {},      // { [questionId]: { text, tags, interpretation } }
      currentQuestion: 1,
      quizCompleted: false,
      recommendedCareers: [],
      careerScores: [],
      isMinimalData: false,

      galaxyFilter: 'recommended',
      searchQuery: '',
      categoryFilter: 'all',
      selectedCareer: null,
      drawerTab: 'Overview',
      setDrawerTab: (tab) => set({ drawerTab: tab }),
      visitedCareers: [],
      bookmarkedCareers: [],

      chatMessages: [],
      chatLoading: false,
      contextCareer: null,
      selectedStream: null,
      bookmarksOpen: false,
      compareIds: [], // Restore existing field

      // Compare feature state
      compareMode: false,
      compareSelections: [],        // array of career IDs, max 2
      compareResult: null,          // the generated comparison object
      compareLoading: false,

      // Auth Actions
      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setAuthLoading: (loading) => set({ authLoading: loading }),
      clearAuth: () => set({ user: null, profile: null }),
      fullReset: () => {
        const { authLoading } = get()
        set({
          quizAnswers: {},
          skippedQuestions: [],
          customAnswers: {},
          currentQuestion: 1,
          quizCompleted: false,
          recommendedCareers: [],
          careerScores: [],
          isMinimalData: false,
          visitedCareers: [],
          bookmarkedCareers: [],
          chatMessages: [],
          chatLoading: false,
          contextCareer: null,
          selectedStream: null,
          compareIds: [],
          compareMode: false,
          compareSelections: [],
          compareResult: null,
          compareLoading: false,
          user: null,
          profile: null,
          authLoading: authLoading // Preserve authLoading state
        })
      },

      // Compare Actions
      enterCompareMode: () => set({ compareMode: true, compareSelections: [], compareResult: null }),
      exitCompareMode: () => set({ compareMode: false, compareSelections: [], compareResult: null }),
      toggleCompareSelection: (careerId) => set((state) => {
        const current = state.compareSelections
        if (current.includes(careerId)) {
          return { compareSelections: current.filter(id => id !== careerId) }
        }
        if (current.length >= 2) {
          // Replace the second selection, keep the first
          return { compareSelections: [current[0], careerId] }
        }
        return { compareSelections: [...current, careerId] }
      }),
      setCompareResult: (result) => set({ compareResult: result }),
      setCompareLoading: (loading) => set({ compareLoading: loading }),

      setAnswer: (questionId, optionLabel) => set((s) => {
        const key = String(questionId)
        const next = { ...s.quizAnswers }
        if (optionLabel === null || optionLabel === undefined) {
          delete next[key]
        } else {
          next[key] = optionLabel
        }
        return { quizAnswers: next }
      }),
      skipQuestion: (questionId) => set((state) => ({
        skippedQuestions: [...state.skippedQuestions, questionId]
      })),
      recordCustomAnswer: (questionId, data) => set((state) => {
        const key = String(questionId)
        const next = { ...state.customAnswers }
        if (data === null || data === undefined) {
          delete next[key]
        } else {
          next[key] = data
        }
        return { customAnswers: next }
      }),
      setCurrentQuestion: (n) => set({ currentQuestion: n }),
      resetQuiz: () => set({ quizAnswers: {}, currentQuestion: 1, quizCompleted: false }),
      markQuizCompleted: () => set({ quizCompleted: true }),
      setResults: (recommended, scores, isMinimal = false) => set({ 
        recommendedCareers: recommended, 
        careerScores: scores,
        isMinimalData: isMinimal
      }),
      setFromAttempt: (attempt) => set({
        quizAnswers: attempt.answers || {},
        customAnswers: attempt.custom_answers || {},
        recommendedCareers: attempt.scores || [],
        careerScores: attempt.scores || [],
        quizCompleted: true,
        isMinimalData: false
      }),

      setGalaxyFilter: (galaxyFilter) => set({ galaxyFilter }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
      setSelectedCareer: (selectedCareer) => set({ selectedCareer }),
      clearSelectedCareer: () => set({ selectedCareer: null }),
      visitCareer: (id) => set((s) => ({ visitedCareers: [...new Set([...s.visitedCareers, id])] })),
      completeQuiz: () => set({ quizCompleted: true }),
      
      setBookmarkedCareers: (bookmarkedCareers) => set({ bookmarkedCareers }),
      toggleBookmark: async (id) => {
        const { user, bookmarkedCareers } = get()
        const isBookmarked = bookmarkedCareers.includes(id)
        const previous = bookmarkedCareers
        
        // Optimistic update
        set({ 
          bookmarkedCareers: isBookmarked 
            ? bookmarkedCareers.filter((b) => b !== id) 
            : [...bookmarkedCareers, id] 
        })

        if (user) {
          try {
            if (isBookmarked) {
              await supabase.from('bookmarks').delete().eq('user_id', user.id).eq('career_id', id)
            } else {
              await supabase.from('bookmarks').insert({ user_id: user.id, career_id: id })
            }
          } catch (err) {
            // Keep UI state truthful if remote persistence fails.
            set({ bookmarkedCareers: previous })
          }
        }
      },
      setBookmarksOpen: (bookmarksOpen) => set({ bookmarksOpen }),

      setCompareIds: (compareIds) => set({ compareIds }),

      addMessage: (msg) => set((s) => ({ chatMessages: [...s.chatMessages, msg] })),
      setChatLoading: (chatLoading) => set({ chatLoading }),
      setContextCareer: (contextCareer) => set({ contextCareer }),
      clearChat: () => set({ chatMessages: [], contextCareer: null }),

      setSelectedStream: (selectedStream) => set({ selectedStream }),
    }),
    {
      name: 'seeker-v1',
      partialize: (s) => ({
        quizAnswers: s.quizAnswers,
        skippedQuestions: s.skippedQuestions,
        customAnswers: s.customAnswers,
        quizCompleted: s.quizCompleted,
        recommendedCareers: s.recommendedCareers,
        careerScores: s.careerScores,
        visitedCareers: s.visitedCareers,
        bookmarkedCareers: s.bookmarkedCareers,
        selectedStream: s.selectedStream,
        user: s.user,
        profile: s.profile,
      }),
    }
  )
)

export default useAppStore

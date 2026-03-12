import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set) => ({
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

      setAnswer: (questionId, optionLabel) => set((s) => ({ quizAnswers: { ...s.quizAnswers, [String(questionId)]: optionLabel } })),
      skipQuestion: (questionId) => set((state) => ({
        skippedQuestions: [...state.skippedQuestions, questionId]
      })),
      recordCustomAnswer: (questionId, data) => set((state) => ({
        customAnswers: { ...state.customAnswers, [questionId]: data }
      })),
      setCurrentQuestion: (n) => set({ currentQuestion: n }),
      resetQuiz: () => set({ quizAnswers: {}, currentQuestion: 1, quizCompleted: false }),
      markQuizCompleted: () => set({ quizCompleted: true }),
      setResults: (recommended, scores, isMinimal = false) => set({ 
        recommendedCareers: recommended, 
        careerScores: scores,
        isMinimalData: isMinimal
      }),

      setGalaxyFilter: (galaxyFilter) => set({ galaxyFilter }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
      setSelectedCareer: (selectedCareer) => set({ selectedCareer }),
      clearSelectedCareer: () => set({ selectedCareer: null }),
      visitCareer: (id) => set((s) => ({ visitedCareers: [...new Set([...s.visitedCareers, id])] })),
      completeQuiz: () => set({ quizCompleted: true }),
      toggleBookmark: (id) => set((s) => ({ bookmarkedCareers: s.bookmarkedCareers.includes(id) ? s.bookmarkedCareers.filter((b) => b !== id) : [...s.bookmarkedCareers, id] })),
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
      }),
    }
  )
)

export default useAppStore

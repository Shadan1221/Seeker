import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set) => ({
      quizAnswers: {},
      currentQuestion: 1,
      quizCompleted: false,
      recommendedCareers: [],
      careerScores: [],

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
      compareIds: [],
      bookmarksOpen: false,

      setAnswer: (questionId, optionLabel) => set((s) => ({ quizAnswers: { ...s.quizAnswers, [String(questionId)]: optionLabel } })),
      setCurrentQuestion: (n) => set({ currentQuestion: n }),
      resetQuiz: () => set({ quizAnswers: {}, currentQuestion: 1, quizCompleted: false }),
      markQuizCompleted: () => set({ quizCompleted: true }),
      setResults: (recommended, scores) => set({ recommendedCareers: recommended, careerScores: scores }),

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
